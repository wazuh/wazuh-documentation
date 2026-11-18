.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-remoted.state file was removed in Wazuh 5.0. Manager daemon statistics are now served through the API. Learn more about it here.

wazuh-remoted.state
===================

**Removed in Wazuh 5.0**. Manager daemon statistics are now served through the API:

.. code-block:: none

   GET /cluster/{node_id}/daemons/stats?daemons_list=wazuh-manager-remoted

The counters directly under ``metrics``, such as ``bytes``, ``messages`` and ``tcp_sessions``, count only the legacy TCP/UDP channel. The installer and the Wazuh manager packages enable that channel (``<remote><legacy><enabled>yes</enabled>``). It's off only when ``<enabled>`` is set to ``no`` or the ``<legacy>`` block is removed. Wazuh 5.0 agents don't use it. Statistics of the HTTPS agent server, which Wazuh 5.0 agents use, are under ``metrics.http_server``, for example the responses sent per endpoint (``responses.stateless``, ``responses.stateful``). The sample below shows the main ``http_server`` groups. Counters are cumulative since the daemon started, and durations are in microseconds. If ``wazuh-manager-remoted`` can't report them, the ``http_server`` object or some of its fields are left out. A missing field means "not reported", not zero.

Sample response:

.. code-block:: json

   {
      "data": {
         "affected_items": [
            {
               "uptime": "2026-09-04T14:47:41+00:00",
               "timestamp": "2026-09-04T16:31:17+00:00",
               "name": "wazuh-manager-remoted",
               "metrics": {
                  "bytes": {
                     "received": 351518,
                     "sent": 27768
                  },
                  "keys_reload_count": 0,
                  "messages": {
                     "received_breakdown": {
                        "control": 312,
                        "control_breakdown": {
                           "keepalive": 311,
                           "request": 0,
                           "shutdown": 0,
                           "startup": 1
                        },
                        "events_failed": 0,
                        "dequeued_after": 0,
                        "discarded": 0,
                        "events": 1160,
                        "ping": 0,
                        "unknown": 0,
                        "upgrade_ack": 0
                     },
                     "sent_breakdown": {
                        "ack": 312,
                        "discarded": 0,
                        "shared": 0
                     }
                  },
                  "queues": {
                     "received": {
                        "size": 67108864,
                        "usage": 0
                     }
                  },
                  "tcp_sessions": 1,
                  "control_messages_queue_usage": 0,
                  "control_messages_queue_breakdown": {
                     "inserted": 312,
                     "replaced": 0,
                     "processed": 312
                  },
                  "http_server": {
                     "timestamp": "2026-09-04T16:31:17Z",
                     "responses": {
                        "stateless": {
                           "total": 98220,
                           "2xx": 98213,
                           "400": 2,
                           "403": 0,
                           "409": 0,
                           "413": 1,
                           "429": 0,
                           "500": 0,
                           "503": 4,
                           "other": 0
                        },
                        "stateful": {
                           "total": 4102,
                           "2xx": 4100,
                           "400": 0,
                           "403": 0,
                           "409": 2,
                           "413": 0,
                           "429": 0,
                           "500": 0,
                           "503": 0,
                           "other": 0
                        },
                        "enroll": {
                           "total": 37,
                           "2xx": 34,
                           "400": 1,
                           "403": 2,
                           "409": 0,
                           "413": 0,
                           "429": 0,
                           "500": 0,
                           "503": 0,
                           "other": 0
                        }
                     },
                     "latency": {
                        "stateless": {
                           "count": 98213,
                           "sum": 210394821,
                           "min": 312,
                           "max": 90210,
                           "p50": 1830,
                           "p90": 4110,
                           "p99": 9920
                        }
                     },
                     "auth_rejections": {
                        "total": 5,
                        "unknown_agent": 3,
                        "bad_token": 1,
                        "body_too_large": 1
                     },
                     "enrollment": {
                        "accepted": 34,
                        "rejected_auth": 2,
                        "rejected_validation": 1
                     },
                     "keystore": {
                        "agents": 34,
                        "reloads_total": 3,
                        "reload_failures_total": 0
                     }
                  }
               }
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "Statistical information for each daemon was successfully read",
      "error": 0
   }

+--------------------------------------+----------------------------------------------------------------------------------------------------+
| Field                                | Description                                                                                        |
+======================================+====================================================================================================+
| ``http_server.responses.<endpoint>`` | Responses sent per agent endpoint, by HTTP status: ``stateless`` (events), ``stateful`` (inventory |
|                                      | synchronization), ``stats``, ``config``, ``enroll`` and ``cacerts``.                               |
+--------------------------------------+----------------------------------------------------------------------------------------------------+
| ``http_server.latency.<endpoint>``   | Request duration for ``stateless``, ``stateful`` and ``enroll``, in microseconds: count, sum, min, |
|                                      | max and the p50, p90 and p99 estimates.                                                            |
+--------------------------------------+----------------------------------------------------------------------------------------------------+
| ``http_server.auth_rejections``      | Requests refused before reaching an endpoint, by reason, for example ``unknown_agent``,            |
|                                      | ``bad_token``, ``clock_skew`` or ``body_too_large``. They aren't counted in ``responses``.         |
+--------------------------------------+----------------------------------------------------------------------------------------------------+
| ``http_server.enrollment``           | Enrollment results: accepted, rejected, rate-limited, and the state of the queue to                |
|                                      | ``wazuh-manager-authd``.                                                                           |
+--------------------------------------+----------------------------------------------------------------------------------------------------+
| ``http_server.control``              | Agent control messages: ``startup``, ``notify`` and ``shutdown``, plus errors.                     |
+--------------------------------------+----------------------------------------------------------------------------------------------------+
| ``http_server.keystore``             | Agents in the key store and key reloads.                                                           |
+--------------------------------------+----------------------------------------------------------------------------------------------------+
