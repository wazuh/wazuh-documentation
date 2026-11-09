"""Synthetic HTTP/queue tests for the downloadable Integrator example."""

import importlib.machinery
import importlib.util
import json
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

import requests

loader = importlib.machinery.SourceFileLoader(
    "custom_ismalicious", str(Path(__file__).parents[1] / "custom-ismalicious")
)
spec = importlib.util.spec_from_loader(loader.name, loader)
module = importlib.util.module_from_spec(spec)
loader.exec_module(module)


class IntegratorTests(unittest.TestCase):
    def test_private_ip_excluded_public_ip_deduplicated(self):
        alert = {
            "data": {
                "srcip": "10.0.0.1",
                "dstip": "8.8.8.8",
                "win": {"eventdata": {"destinationIp": "8.8.8.8"}},
            }
        }
        self.assertEqual(module.indicators_from_alert(alert), [("8.8.8.8", "ip")])

    def test_dns_and_preferred_hash(self):
        alert = {
            "data": {"win": {"eventdata": {"queryName": "example.invalid"}}},
            "syscheck": {"sha256_after": "a" * 64, "md5_after": "b" * 32},
        }
        self.assertEqual(
            module.indicators_from_alert(alert),
            [("example.invalid", "domain"), ("a" * 64, "hash")],
        )

    def test_no_recursive_enrichment(self):
        self.assertEqual(
            module.indicators_from_alert(
                {"rule": {"groups": ["ismalicious"]}, "data": {"dstip": "8.8.8.8"}}
            ),
            [],
        )

    @patch("requests.get")
    def test_unknown_hash_is_not_safe(self, get):
        get.return_value = Mock(
            status_code=200,
            json=Mock(
                return_value={
                    "malicious": False,
                    "lookupStatus": "unknown",
                    "riskScore": {"score": 0},
                }
            ),
        )
        result = module.lookup("a" * 64, "hash", "synthetic-encoded-credential")
        self.assertEqual(result["verdict"], "unknown")
        self.assertEqual(result["status"], "ok")

    @patch("requests.get")
    def test_context_rows_do_not_become_detections(self, get):
        get.return_value = Mock(
            status_code=200,
            json=Mock(
                return_value={
                    "malicious": False,
                    "sources": [{"name": "context"}],
                    "confidence": None,
                }
            ),
        )
        result = module.lookup("example.invalid", "domain", "secret")
        self.assertEqual(result["verdict"], "unknown")
        self.assertIsNone(result["blocklist_hits"])
        self.assertIsNone(result["confidence"])

    @patch("requests.get")
    def test_malicious_evidence_and_separate_confidence(self, get):
        get.return_value = Mock(
            status_code=200,
            json=Mock(
                return_value={
                    "malicious": True,
                    "evidence": {"verdict": "malicious", "reasons": ["synthetic"]},
                    "riskScore": {"score": 91},
                    "confidence": {"score": 63},
                    "blocklistHits": 2,
                }
            ),
        )
        result = module.lookup("8.8.8.8", "ip", "secret")
        self.assertEqual(
            (result["verdict"], result["risk_score"], result["confidence"]),
            ("malicious", 91, 63),
        )
        self.assertFalse(get.call_args.kwargs["allow_redirects"])
        self.assertEqual(get.call_args.kwargs["params"]["query"], "8.8.8.8")

    @patch("requests.get")
    def test_errors_are_explicit_not_clean(self, get):
        for status in (401, 403, 429, 500, 302):
            get.return_value = Mock(status_code=status)
            result = module.lookup("8.8.8.8", "ip", "secret")
            self.assertEqual(
                (result["status"], result["verdict"], result["http_status"]),
                ("error", "unknown", status),
            )

    @patch("requests.get", side_effect=requests.Timeout)
    def test_timeout(self, get):
        self.assertEqual(module.lookup("8.8.8.8", "ip", "secret")["status"], "error")

    @patch("requests.get")
    def test_invalid_json(self, get):
        get.return_value = Mock(status_code=200, json=Mock(side_effect=ValueError))
        self.assertEqual(module.lookup("8.8.8.8", "ip", "secret")["status"], "error")

    def test_queue_retains_original_agent_without_secret(self):
        result = {"status": "ok", "verdict": "unknown"}
        message = module.queue_message(
            {"id": "synthetic", "agent": {"id": "001", "name": "lab", "ip": "any"}},
            result,
        )
        self.assertTrue(message.startswith("1:[001] (lab) any->ismalicious:"))
        data = json.loads(message.split("->ismalicious:", 1)[1])
        self.assertEqual(data["original_alert_id"], "synthetic")
        self.assertNotIn("credential", message)

    @patch.object(module.socket, "socket")
    def test_unix_queue_transport(self, sock):
        module.send_to_queue("synthetic")
        client = sock.return_value.__enter__.return_value
        client.connect.assert_called_once_with(module.QUEUE)
        client.send.assert_called_once_with(b"synthetic")


if __name__ == "__main__":
    unittest.main()
