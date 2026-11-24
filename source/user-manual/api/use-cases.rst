.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section provides use cases that demonstrate some of the potential of the Wazuh manager API.

Wazuh manager API use cases
===========================

You can use the Wazuh manager API to check the health of the Wazuh manager, read its logs, and enroll, query, restart, upgrade, and delete Wazuh agents. You can send each request from **Dev Tools** in the Wazuh dashboard or with cURL from a terminal. These use cases apply to Wazuh |WAZUH_CURRENT|.

Using the Wazuh dashboard
-------------------------

The following use cases demonstrate how to manage the Wazuh manager and Wazuh agents using the Wazuh manager API through the Wazuh dashboard.

Wazuh manager operations
^^^^^^^^^^^^^^^^^^^^^^^^

You can use the Wazuh manager API to check the status, statistics, and logs of the Wazuh manager and to restart it. Review the :api-ref:`API manager reference <tag/Cluster>` for more information on managing the Wazuh manager using the Wazuh manager API.

The following use cases show how to check and restart the Wazuh manager.

Retrieving the Wazuh manager daemon status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the Wazuh manager API to retrieve the current status of all Wazuh manager daemons. The ``/cluster/<NODE_ID>/status`` endpoint shows whether each Wazuh manager daemon is running and ready. Use it to check the health of the Wazuh manager and to troubleshoot it.

Follow these steps to retrieve the Wazuh daemon status:

#. Navigate to **Server management** > **Dev Tools** to open the Wazuh manager API Console.
#. Set the method and endpoint to ``GET /cluster/<NODE_ID>/status``, where ``<NODE_ID>`` is the name of the Wazuh manager node. You can get the node name with :api-ref:`GET /cluster/local/info <operation/api.controllers.cluster_controller.get_cluster_node>`.
#. Click **Send request**, the play icon on the request line. The Wazuh manager API returns a response similar to the following:

   .. thumbnail:: /images/manual/api/retrieve-wazuh-manager-daemon-status.png
      :title: Retrieve the Wazuh manager daemon status
      :alt: Retrieve the Wazuh manager daemon status
      :align: center
      :width: 80%

   .. code-block:: json
      :class: output

      {
        "data": {
          "affected_items": [
            {
              "wazuh-manager-analysisd": {
                "ready": true,
                "running": true,
                "spaces": {
                  "standard": {
                    "available": true,
                    "enabled": true,
                    "status": "ready",
                    "hash": "4d4c932690ee59e3001242b53c884142bf26009e97de1f81dcb21f2600bed2f8",
                    "last_successful_update": 1795513664
                  },
                  "custom": {
                    "available": false,
                    "enabled": false,
                    "status": "ready",
                    "hash": "",
                    "last_successful_update": 0
                  }
                },
                "ioc": {
                  "hash_sha256": {
                    "available": true,
                    "status": "ready",
                    "hash": "d5628a5aacc74e804d4d098dda94b88845b27ac514e21edae4510fac8c6e5ac9",
                    "last_successful_update": 1795514663
                  },
                  "connection": {
                    "available": true,
                    "status": "ready",
                    "hash": "77322bb39d7cd028ca65a5bc96f5f6023f5ed1437d458269bc6b518b6c324a42",
                    "last_successful_update": 1795514507
                  },
                  "hash_sha1": {
                    "available": true,
                    "status": "ready",
                    "hash": "aa4ddfe0a3cfcf5c1414234269899193a0aea6ed0a7432a4d44a368a6df8737e",
                    "last_successful_update": 1795514652
                  },
                  "url_domain": {
                    "available": true,
                    "status": "ready",
                    "hash": "a3fd426e63f8b031dd4847269a5e7060ee0167d8398ab1cfdc0139d6a20692ff",
                    "last_successful_update": 1795514645
                  },
                  "url_full": {
                    "available": true,
                    "status": "ready",
                    "hash": "0bf762ef949d53210dff67a18532eb262ad191b181e2fd4b9968d67e136d73a6",
                    "last_successful_update": 1795514537
                  },
                  "hash_md5": {
                    "available": true,
                    "status": "ready",
                    "hash": "0e6f7700d6d6910410032e5f343b60051b4b04610d2379228448fb1d1fb31b6e",
                    "last_successful_update": 1795514649
                  }
                },
                "geo": {
                  "asn": {
                    "available": true,
                    "status": "ready",
                    "hash": "f635e293e2129a591bf8c69978662037",
                    "last_successful_update": 1795513571
                  },
                  "city": {
                    "available": true,
                    "status": "ready",
                    "hash": "234dac66f57614f2d7de20ab60c398fc",
                    "last_successful_update": 1795513571
                  }
                }
              },
              "wazuh-manager-authd": {
                "ready": true,
                "running": true
              },
              "wazuh-manager-remoted": {
                "ready": true,
                "running": true,
                "keystore": {
                  "readable": true,
                  "agents_loaded": 2,
                  "entries_skipped": 0
                },
                "enrollment_password": {
                  "ready": true
                }
              },
              "wazuh-manager-clusterd": {
                "ready": true,
                "running": true
              },
              "wazuh-manager-modulesd": {
                "ready": false,
                "running": true,
                "modules": {
                  "vulnerability-detector": {
                    "available": false,
                    "enabled": true,
                    "last_successful_update": 0,
                    "offset": 0,
                    "status": "updating"
                  },
                  "inventory-sync": {
                    "available": true
                  },
                  "content-manager": {
                    "available": true
                  },
                  "task-manager": {
                    "available": true
                  }
                }
              },
              "wazuh-manager-db": {
                "ready": true,
                "running": true,
                "global": {
                  "available": true
                }
              },
              "wazuh-manager-apid": {
                "ready": true,
                "running": true
              },
              "ready": false
            }
          ],
          "total_affected_items": 1,
          "total_failed_items": 0,
          "failed_items": []
        },
        "message": "Node status was successfully read in specified node",
        "error": 0
      }

Retrieving Wazuh manager daemon statistics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use the Wazuh manager API to retrieve real-time statistics for the Wazuh manager daemon. The ``/cluster/<NODE_ID>/daemons/stats`` endpoint returns detailed metrics for components such as ``wazuh-manager-remoted``, ``wazuh-manager-analysisd``, and ``wazuh-manager-db``. The information retrieved from these daemons helps administrators monitor event processing, queue usage, and database activity on the manager.

Follow these steps to retrieve Wazuh daemon statistics:

#. Navigate to **Server management** > **Dev Tools** to open the Wazuh manager API Console.
#. Set the method and endpoint to ``GET /cluster/<NODE_ID>/daemons/stats``, where ``<NODE_ID>`` is the name of the Wazuh manager node.
#. Click **Send request**, the play icon on the request line. The Wazuh manager API returns a response similar to the following:

   .. thumbnail:: /images/manual/api/retrieve-wazuh-manager-daemon-statistics.png
      :title: Retrieve Wazuh manager daemon statistics
      :alt: Retrieve Wazuh manager daemon statistics
      :align: center
      :width: 80%

   .. code-block:: json
      :class: output

      {
        "data": {
          "affected_items": [
            {
              "uptime": "2026-11-24T10:01:19+00:00",
              "timestamp": "2026-11-24T10:11:35+00:00",
              "name": "wazuh-manager-remoted",
              "metrics": {
                "bytes": {
                  "received": 0,
                  "sent": 0
                },
                "keys_reload_count": 0,
                "messages": {
                  "received_breakdown": {
                    "control": 0,
                    "control_breakdown": {
                      "keepalive": 0,
                      "request": 0,
                      "shutdown": 0,
                      "startup": 0
                    },
                    "events_failed": 0,
                    "dequeued_after": 0,
                    "discarded": 0,
                    "events": 0,
                    "ping": 0,
                    "unknown": 0,
                    "upgrade_ack": 0
                  },
                  "sent_breakdown": {
                    "ack": 0,
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
                "tcp_sessions": 0,
                "tcp_sessions_unassociated": 0,
                "control_messages_queue_usage": 0,
                "control_messages_queue_breakdown": {
                  "inserted": 0,
                  "replaced": 0,
                  "processed": 0
                },
                "http_server": {
                  "timestamp": "2026-11-24T10:11:35Z",
                  "responses": {
                    "stateless": {
                      "400": 0,
                      "403": 0,
                      "409": 0,
                      "413": 0,
                      "429": 0,
                      "500": 0,
                      "503": 0,
                      "total": 20,
                      "2xx": 20,
                      "other": 0
                    },
                    "stateful": {
                      "400": 0,
                      "403": 0,
                      "409": 0,
                      "413": 0,
                      "429": 0,
                      "500": 0,
                      "503": 14,
                      "total": 15,
                      "2xx": 1,
                      "other": 0
                    },
                    "stats": {
                      "400": 0,
                      "403": 0,
                      "409": 0,
                      "413": 0,
                      "429": 0,
                      "500": 0,
                      "503": 0,
                      "total": 0,
                      "2xx": 0,
                      "other": 0
                    },
                    "config": {
                      "400": 0,
                      "403": 0,
                      "409": 0,
                      "413": 0,
                      "429": 0,
                      "500": 0,
                      "503": 0,
                      "total": 2,
                      "2xx": 2,
                      "other": 0
                    },
                    "enroll": {
                      "400": 0,
                      "403": 0,
                      "409": 0,
                      "413": 0,
                      "429": 0,
                      "500": 0,
                      "503": 0,
                      "total": 0,
                      "2xx": 0,
                      "other": 0
                    },
                    "cacerts": {
                      "400": 0,
                      "403": 0,
                      "409": 0,
                      "413": 0,
                      "429": 0,
                      "500": 0,
                      "503": 0,
                      "total": 0,
                      "2xx": 0,
                      "other": 0
                    }
                  },
                  "latency": {
                    "stateless": {
                      "count": 20,
                      "sum": 43482,
                      "min": 475,
                      "max": 6716,
                      "p50": 960,
                      "p90": 6656,
                      "p99": 6656
                    },
                    "stateful": {
                      "count": 15,
                      "sum": 118709,
                      "min": 691,
                      "max": 87818,
                      "p50": 2304,
                      "p90": 5632,
                      "p99": 87818
                    },
                    "enroll": {
                      "count": 0,
                      "sum": 0,
                      "min": 0,
                      "max": 0,
                      "p50": 0,
                      "p90": 0,
                      "p99": 0
                    }
                  },
                  "auth_rejections": {
                    "total": 0,
                    "unknown_agent": 0,
                    "invalid_signature": 0,
                    "bad_token": 0,
                    "identity_mismatch": 0,
                    "clock_skew": 0,
                    "unusable_key": 0,
                    "address_not_allowed": 0,
                    "enrollment_key_unavailable": 0,
                    "payload_mismatch": 0,
                    "body_too_large": 0,
                    "bad_encoding": 0,
                    "malformed": 0,
                    "token_unknown": 0,
                    "token_expired": 0,
                    "token_revoked": 0,
                    "agent_busy": 0
                  },
                  "enrollment": {
                    "accepted": 0,
                    "rejected_auth": 0,
                    "rejected_validation": 0,
                    "disabled": 0,
                    "authd_error": 0,
                    "authd_unavailable": 0,
                    "authd_queue": {
                      "depth": 0,
                      "capacity": 256,
                      "rejected_total": 0
                    },
                    "rate_limited": 0,
                    "rate_limit": {
                      "limit": 100,
                      "burst": 200,
                      "available": 200
                    }
                  },
                  "control": {
                    "startup": 2,
                    "notify": 124,
                    "shutdown": 2,
                    "rejected": 0,
                    "wdb_error": 0,
                    "task_fetch": 124,
                    "task_fetch_error": 0,
                    "registry_agents": 2,
                    "wdb_latency": {
                      "count": 153,
                      "sum": 69848,
                      "min": 110,
                      "max": 13703,
                      "p50": 176,
                      "p90": 960,
                      "p99": 5632
                    }
                  },
                  "keystore": {
                    "agents": 2,
                    "entries_skipped": 0,
                    "reloads_total": 1,
                    "reload_failures_total": 0
                  },
                  "downstream": {
                    "downstream_5xx": 14,
                    "route_mismatch": 0,
                    "errors": {
                      "connect": 0,
                      "connect_timeout": 0,
                      "write_timeout": 0,
                      "response_timeout": 0,
                      "transport": 0,
                      "protocol": 0,
                      "response_too_large": 0
                    },
                    "deferred": {
                      "capacity": 128,
                      "inflight": 0,
                      "rejected_total": 0
                    }
                  },
                  "backpressure": {
                    "available_bytes": 268435456,
                    "inflight_bytes": 0,
                    "inflight_requests": 0,
                    "rejected_total": 0,
                    "connections_open": 0,
                    "connections_max": 256
                  },
                  "downloads": {
                    "started": 1,
                    "rejected": 0,
                    "not_found": 0,
                    "open_error": 0,
                    "bytes_total": 15485689
                  },
                  "tls": {
                    "cert_expiry_days": 3649,
                    "ca_matches_leaf": 1
                  },
                  "cacerts": {
                    "served": 0,
                    "not_found": 0,
                    "ca_mismatch": 0,
                    "rate_limited": 0,
                    "rate_limit": {
                      "limit": 50,
                      "burst": 100,
                      "available": 100
                    }
                  },
                  "vd_scan": {
                    "requests_total": 0,
                    "accepted": 0,
                    "version_mismatch": 0,
                    "queue_full": 0,
                    "invalid_agent": 0,
                    "vd_error": 0,
                    "indexer_unavailable": 0
                  }
                }
              }
            },
            {
              "status": "OK",
              "global": [
                {
                  "name": "server.events.received",
                  "type": "counter",
                  "enabled": true,
                  "value": 363
                },
                {
                  "name": "server.bytes.received",
                  "type": "counter",
                  "enabled": true,
                  "value": 143658
                },
                {
                  "name": "agent.cache.evictions",
                  "type": "counter",
                  "enabled": true,
                  "value": 1
                },
                {
                  "name": "agent.cache.insertions",
                  "type": "counter",
                  "enabled": true,
                  "value": 2
                },
                {
                  "name": "agent.cache.hits",
                  "type": "counter",
                  "enabled": true,
                  "value": 18
                },
                {
                  "name": "router.events.id_failed",
                  "type": "counter",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "agent.cache.entries",
                  "type": "pull",
                  "enabled": true,
                  "value": 1
                },
                {
                  "name": "router.events.malformed",
                  "type": "counter",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "router.events.processed",
                  "type": "counter",
                  "enabled": true,
                  "value": 363
                },
                {
                  "name": "indexer.events.requeued",
                  "type": "pull",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "indexer.queue.size",
                  "type": "pull",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "indexer.events.dropped",
                  "type": "pull",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "indexer.events.deduplicated",
                  "type": "pull",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "router.queue.usage.percent",
                  "type": "pull",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "router.queue.bytes.usage.percent",
                  "type": "pull",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "indexer.queue.usage.percent",
                  "type": "pull",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "agent.cache.updates",
                  "type": "counter",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "router.queue.size",
                  "type": "pull",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "router.eps.30m",
                  "type": "pull",
                  "enabled": true,
                  "value": 0.20166666666666666
                },
                {
                  "name": "router.queue.bytes.used",
                  "type": "pull",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "router.events.dropped",
                  "type": "counter",
                  "enabled": true,
                  "value": 0
                },
                {
                  "name": "router.eps.1m",
                  "type": "pull",
                  "enabled": true,
                  "value": 0.016666666666666666
                },
                {
                  "name": "router.eps.5m",
                  "type": "pull",
                  "enabled": true,
                  "value": 0.27
                }
              ],
              "spaces": [
                {
                  "name": "standard",
                  "metrics": [
                    {
                      "name": "events.unclassified",
                      "type": "counter",
                      "enabled": true,
                      "value": 122
                    },
                    {
                      "name": "events.discarded.postfilter",
                      "type": "counter",
                      "enabled": true,
                      "value": 0
                    },
                    {
                      "name": "events.discarded",
                      "type": "counter",
                      "enabled": true,
                      "value": 0
                    },
                    {
                      "name": "events.discarded.prefilter",
                      "type": "counter",
                      "enabled": true,
                      "value": 0
                    }
                  ]
                }
              ],
              "name": "wazuh-manager-analysisd",
              "uptime": "2026-11-24T10:01:18.351Z",
              "timestamp": "2026-11-24T10:11:35.754Z"
            },
            {
              "uptime": "2026-11-24T10:01:18+00:00",
              "timestamp": "2026-11-24T10:11:35+00:00",
              "name": "wazuh-manager-db",
              "metrics": {
                "queries": {
                  "received": 365,
                  "received_breakdown": {
                    "global": 365,
                    "global_breakdown": {
                      "db": {
                        "backup": 0,
                        "sql": 133,
                        "commit": 0
                      },
                      "tables": {
                        "agent": {
                          "delete-agent": 0,
                          "disconnect-agents": 3,
                          "get-agent-info": 5,
                          "get-agents-by-connection-status": 0,
                          "get-all-agents": 1,
                          "get-distinct-groups": 62,
                          "recalculate-agent-group-hashes": 0,
                          "insert-agent": 0,
                          "select-agent-group": 126,
                          "set-agent-groups": 0,
                          "sync-agent-groups-get": 0,
                          "sync-agent-info-get": 0,
                          "sync-agent-info-set": 0,
                          "update-agent-data": 23,
                          "update-connection-status": 2,
                          "update-status-code": 2,
                          "update-keepalive": 0,
                          "set-agent-credentials": 0
                        },
                        "belongs": {
                          "get-group-agents": 0
                        },
                        "group": {
                          "delete-group": 0,
                          "find-group": 1,
                          "insert-agent-group": 0,
                          "select-groups": 1
                        }
                      }
                    },
                    "mitre": 0,
                    "mitre_breakdown": {
                      "db": {
                        "sql": 0
                      }
                    }
                  }
                },
                "time": {
                  "execution": 41,
                  "execution_breakdown": {
                    "global": 41,
                    "global_breakdown": {
                      "db": {
                        "open": 1,
                        "backup": 0,
                        "sql": 9,
                        "commit": 0
                      },
                      "tables": {
                        "agent": {
                          "delete-agent": 0,
                          "disconnect-agents": 0,
                          "get-agent-info": 0,
                          "get-agents-by-connection-status": 0,
                          "get-all-agents": 0,
                          "get-distinct-groups": 5,
                          "recalculate-agent-group-hashes": 0,
                          "insert-agent": 0,
                          "select-agent-group": 4,
                          "set-agent-groups": 0,
                          "sync-agent-groups-get": 0,
                          "sync-agent-info-get": 0,
                          "sync-agent-info-set": 0,
                          "update-agent-data": 18,
                          "update-connection-status": 0,
                          "update-status-code": 0,
                          "update-keepalive": 0,
                          "set-agent-credentials": 0
                        },
                        "belongs": {
                          "get-group-agents": 0
                        },
                        "group": {
                          "delete-group": 0,
                          "find-group": 0,
                          "insert-agent-group": 0,
                          "select-groups": 0
                        }
                      }
                    },
                    "mitre": 0,
                    "mitre_breakdown": {
                      "db": {
                        "sql": 0
                      }
                    }
                  }
                }
              }
            }
          ],
          "total_affected_items": 3,
          "total_failed_items": 0,
          "failed_items": []
        },
        "message": "Statistical information for each daemon was successfully read",
        "error": 0
      }

Retrieving Wazuh manager logs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use the Wazuh manager API to retrieve log messages generated by the Wazuh manager.

The ``/cluster/<NODE_ID>/logs`` endpoint provides insight into module activity, scan progress, errors, warnings, and other operational events. The endpoint helps troubleshoot Wazuh manager components such as the vulnerability scanner, the content updater, and ``wazuh-manager-remoted``.

Follow these steps to retrieve the last 100 log messages generated by the Wazuh manager:

#. Navigate to **Server management** > **Dev Tools** to open the Wazuh manager API Console.
#. Set the method and endpoint to ``GET /cluster/<NODE_ID>/logs?limit=100``, where ``<NODE_ID>`` is the name of the Wazuh manager node.
#. Click **Send request**, the play icon on the request line. The Wazuh manager API returns a response similar to the following:

   .. thumbnail:: /images/manual/api/retrieve-wazuh-manager-logs.png
      :title: Retrieve Wazuh manager logs
      :alt: Retrieve Wazuh manager logs
      :align: center
      :width: 80%

   .. code-block:: json
      :class: output

      {
        "data": {
          "affected_items": [
            {
              "timestamp": "2026-11-24T10:11:29Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 207500 documents so far, cursor '1334911', 609s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:11:27Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 207100 documents so far, cursor '1334830', 607s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:10:27Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 205100 documents so far, cursor '1325576', 547s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:10:25Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 204700 documents so far, cursor '1325503', 545s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:09:32Z",
              "tag": "wazuh-manager-authd",
              "level": "warning",
              "description": "Enrollment token address '10.42.1.79' is an IP address: the token stops working if the manager's address changes. Use a DNS name if the manager's IP address can change."
            },
            {
              "timestamp": "2026-11-24T10:09:32Z",
              "tag": "wazuh-manager-remoted:token-key-source",
              "level": "info",
              "description": "Enrollment token store reloaded from '/etc/wazuh-manager/enrollment_tokens.json' (2 token(s) with a credential)."
            },
            {
              "timestamp": "2026-11-24T10:09:32Z",
              "tag": "wazuh-manager-authd",
              "level": "info",
              "description": "Enrollment token 'FxgwdDGavnlgKvnVDMnoYA' minted for '10.42.1.79' (expires 1795558172, max_uses 10, credential yes), description Wazuh agent enrollment"
            },
            {
              "timestamp": "2026-11-24T10:09:26Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 200800 documents so far, cursor '1305486', 486s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:09:25Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 200400 documents so far, cursor '1305139', 485s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:09:21Z",
              "tag": "wazuh-manager-remoted:forwarder",
              "level": "warning",
              "description": "The inventory sync server answered HTTP 503 for 8 request(s) in the last 114 s; answering 503."
            },
            {
              "timestamp": "2026-11-24T10:08:23Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 195700 documents so far, cursor '1272558', 423s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:08:23Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 196100 documents so far, cursor '1273635', 423s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:07:27Z",
              "tag": "wazuh-manager-remoted:forwarder",
              "level": "warning",
              "description": "The inventory sync server answered HTTP 503 for 4 request(s) in the last 366 s; answering 503."
            },
            {
              "timestamp": "2026-11-24T10:07:23Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 193300 documents so far, cursor '1261745', 363s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:07:21Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 192800 documents so far, cursor '1260020', 361s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:06:22Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 186900 documents so far, cursor '1214287', 302s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:06:21Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 186500 documents so far, cursor '1213811', 301s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:05:21Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 168300 documents so far, cursor '1107861', 241s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:05:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 167900 documents so far, cursor '1107413', 240s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:04:23Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Synchronized IOC type 'hash_sha256'"
            },
            {
              "timestamp": "2026-11-24T10:04:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 146200 documents so far, cursor '933357', 180s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:04:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 146600 documents so far, cursor '933426', 180s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:04:12Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Synchronized IOC type 'hash_sha1'"
            },
            {
              "timestamp": "2026-11-24T10:04:12Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Changes detected for IOC type 'hash_sha256', updating..."
            },
            {
              "timestamp": "2026-11-24T10:04:09Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Synchronized IOC type 'hash_md5'"
            },
            {
              "timestamp": "2026-11-24T10:04:09Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Changes detected for IOC type 'hash_sha1', updating..."
            },
            {
              "timestamp": "2026-11-24T10:04:05Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Synchronized IOC type 'url_domain'"
            },
            {
              "timestamp": "2026-11-24T10:04:05Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Changes detected for IOC type 'hash_md5', updating..."
            },
            {
              "timestamp": "2026-11-24T10:03:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 107900 documents so far, cursor '725510', 120s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:03:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 108300 documents so far, cursor '725299', 120s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:02:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 0 (1/2) in progress — 56500 documents so far, cursor '613600', 60s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:02:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Slice 1 (2/2) in progress — 56600 documents so far, cursor '614665', 60s elapsed"
            },
            {
              "timestamp": "2026-11-24T10:02:17Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Synchronized IOC type 'url_full'"
            },
            {
              "timestamp": "2026-11-24T10:02:17Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Changes detected for IOC type 'url_domain', updating..."
            },
            {
              "timestamp": "2026-11-24T10:01:47Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Synchronized IOC type 'connection'"
            },
            {
              "timestamp": "2026-11-24T10:01:47Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Changes detected for IOC type 'url_full', updating..."
            },
            {
              "timestamp": "2026-11-24T10:01:20Z",
              "tag": "wazuh-manager-modulesd:vulnerability-scanner",
              "level": "info",
              "description": "CVE feed not yet available — per-agent scans deferred until initial load completes."
            },
            {
              "timestamp": "2026-11-24T10:01:20Z",
              "tag": "wazuh-manager-modulesd:vulnerability-scanner:server",
              "level": "info",
              "description": "vulnerability detector server bound to 'queue/sockets/vd-http.sock' (mode 0660, 2 I/O thread(s), 2 concurrent accept(s), max 1024 connection(s), 64 reserved for control, 960 data session(s), 268435456 byte in-flight budget, 268152832 byte body cap, 282624 byte per-request overhead; timeouts s: header=10 body=30 response=3600 write=10 drain=2)."
            },
            {
              "timestamp": "2026-11-24T10:01:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Consumer 'cti:catalog:consumer:vulnerabilities' in index '.wazuh-cti-consumers' is ready. Starting feed download."
            },
            {
              "timestamp": "2026-11-24T10:01:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Global-map documents present in '.wazuh-threatintel-vulnerabilities'. Starting initial load."
            },
            {
              "timestamp": "2026-11-24T10:01:20Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "IndexerDownloader: Starting initial full load (slices=2)"
            },
            {
              "timestamp": "2026-11-24T10:01:20Z",
              "tag": "wazuh-manager-remoted:forwarder",
              "level": "warning",
              "description": "The inventory sync server answered HTTP 503 for 1 request(s) so far; answering 503."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "[IOC::Sync] Changes detected for IOC type 'connection', updating..."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:communication",
              "level": "info",
              "description": "Starting remoted module (port=1517, cluster='wazuh', workerNode=false)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:client-keys",
              "level": "info",
              "description": "Loaded 2 agent key(s) from '/etc/wazuh-manager/client.keys'."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:downstream",
              "level": "info",
              "description": "Downstream UDS client started (4 I/O thread(s))."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:downstream",
              "level": "info",
              "description": "Downstream UDS client started (1 I/O thread(s))."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:downstream",
              "level": "info",
              "description": "Downstream UDS client started (1 I/O thread(s))."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:password-key-source",
              "level": "info",
              "description": "Enrollment password loaded from '/etc/wazuh-manager/authd.pass'."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:downstream",
              "level": "info",
              "description": "Downstream UDS client started (1 I/O thread(s))."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:downstream",
              "level": "info",
              "description": "Downstream UDS client started (1 I/O thread(s))."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:token-key-source",
              "level": "info",
              "description": "Enrollment token store loaded from '/etc/wazuh-manager/enrollment_tokens.json' (1 token(s) with a credential)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:http-server",
              "level": "info",
              "description": "HTTP server listening on https://0.0.0.0:1517 (4 I/O thread(s), 8 worker thread(s), max body 10485760 bytes, in-flight budget 268435456 bytes, max 256 connection(s))."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:http-server",
              "level": "info",
              "description": "All HTTP endpoints are served under the global prefix '/wazuh-manager' (e.g. https://0.0.0.0:1517/wazuh-manager/stateless); unprefixed paths answer 404; agents must send the full prefixed target."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:communication",
              "level": "info",
              "description": "remoted HTTP server started."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:remoted-module:admin",
              "level": "info",
              "description": "remoted admin server bound to 'queue/sockets/remote-admin-http.sock' (mode 0660, 2 I/O thread(s), 2 concurrent accept(s), max 64 connection(s), 16 reserved for control, 48 data session(s), 268435456 byte in-flight budget, 268152832 byte body cap, 282624 byte per-request overhead; timeouts s: header=10 body=30 response=300 write=10 drain=2)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:communication",
              "level": "info",
              "description": "remoted admin server listening on 'queue/sockets/remote-admin-http.sock' (routes: GET /, GET /metrics, GET /status, and GET /tls)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted",
              "level": "info",
              "description": "Started (pid: 45110). Listening on port 1514/TCP (secure)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:communication",
              "level": "info",
              "description": "remoted module worker thread running."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted",
              "level": "info",
              "description": "legacy_task_delivery: poller thread started (startup delay 65s, poll interval 900s)"
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd",
              "level": "info",
              "description": "Started (pid: 45191)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:control",
              "level": "info",
              "description": "Starting control thread."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:content-updater",
              "level": "info",
              "description": "Started (pid: 45191)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:vulnerability-scanner",
              "level": "info",
              "description": "Started (pid: 45191)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:keystore-server",
              "level": "info",
              "description": "Started (pid: 45191)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:keystore-server",
              "level": "info",
              "description": "keystore server listening on 'queue/sockets/keystore.sock'."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:inventory-sync-server",
              "level": "info",
              "description": "Started (pid: 45191)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:inventory-sync-server",
              "level": "info",
              "description": "Dispatching start; the module binds its socket asynchronously and reports under its own tag."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:inventory-sync-server",
              "level": "info",
              "description": "Starting inventory sync server (cluster='wazuh')."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:database",
              "level": "info",
              "description": "Started (pid: 45191)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:inventory-sync-server",
              "level": "info",
              "description": "inventory sync server worker thread running."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:task-manager:http",
              "level": "info",
              "description": "task manager server bound to 'queue/sockets/task-http.sock' (mode 0660, 2 I/O thread(s), 2 concurrent accept(s), max 1024 connection(s), 64 reserved for control, 960 data session(s), 268435456 byte in-flight budget, 8388608 byte body cap, 282624 byte per-request overhead; timeouts s: header=10 body=30 response=300 write=10 drain=2)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:task-manager:http",
              "level": "info",
              "description": "Listening on 'queue/sockets/task-http.sock'"
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:task-manager",
              "level": "info",
              "description": "Task manager started: 4 executor workers, database 'queue/tasks/tasks.db'"
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:inventory-sync-server:server",
              "level": "info",
              "description": "inventory sync server bound to 'queue/sockets/inventory-sync-http.sock' (mode 0660, 4 I/O thread(s), 2 concurrent accept(s), max 1024 connection(s), 64 reserved for control, 960 data session(s), 268435456 byte in-flight budget, 268152832 byte body cap, 282624 byte per-request overhead; timeouts s: header=10 body=30 response=300 write=10 drain=2)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:inventory-sync-server",
              "level": "info",
              "description": "inventory sync server listening on 'queue/sockets/inventory-sync-http.sock' (routes: GET /, GET /metrics, /stateful, /stats, /config, /_internal/agents/delete and /_internal/vd/scan; 2 sync worker(s))."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:inventory-sync-server",
              "level": "info",
              "description": "The indexer is reachable; inventory documents can be delivered."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-remoted:vd-client",
              "level": "warning",
              "description": "Failed to query VD offset: status=0 (1 occurrence(s) so far)."
            },
            {
              "timestamp": "2026-11-24T10:01:19Z",
              "tag": "wazuh-manager-modulesd:vulnerability-scanner",
              "level": "info",
              "description": "The local feed database is incomplete at startup: required global maps are missing. Clearing updater state to force a clean rebuild."
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-authd",
              "level": "info",
              "description": "1 enrollment token(s) loaded from '/etc/wazuh-manager/enrollment_tokens.json'."
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-authd",
              "level": "info",
              "description": "Started (pid: 44885)."
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-authd",
              "level": "info",
              "description": "Using the existing enrollment password from '/etc/wazuh-manager/authd.pass'. To rotate the password, delete the file and restart."
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-authd",
              "level": "info",
              "description": "Accepting connections on port 1515. Shared-password enrollment is required."
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-db",
              "level": "info",
              "description": "Started (pid: 44894)."
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-db",
              "level": "info",
              "description": "wazuh-db HTTP server bound to 'queue/sockets/wdb-http.sock' (mode 0660, 4 I/O thread(s), 2 concurrent accept(s), max 1024 connection(s), 64 reserved for control, 960 data session(s), 268435456 byte in-flight budget, 268152832 byte body cap, 282624 byte per-request overhead; timeouts s: header=10 body=30 response=300 write=10 drain=2)."
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Store initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Content Manager initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "KVDB initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "IOC initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "GEO initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Fast metrics initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Schema initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "HLP initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Scheduler initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Indexer Connector initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Stream logger initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Builder initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Content Manager CRUD Service initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Raw Event Indexer initialized"
            },
            {
              "timestamp": "2026-11-24T10:01:18Z",
              "tag": "wazuh-manager-analysisd",
              "level": "info",
              "description": "Orchestrator initialized and started with event queue size: 131072, events per second: unlimited, max bytes: 33554432."
            }
          ],
          "total_affected_items": 1200,
          "total_failed_items": 0,
          "failed_items": []
        },
        "message": "Logs were successfully read in specified node",
        "error": 0
      }

The preceding output shows a detailed view of the Wazuh manager logs, including module activity, scan progress, errors, warnings, and other operational events.

Restarting the Wazuh manager cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use the Wazuh manager API to initiate a coordinated restart of the manager nodes within your environment. The ``/cluster/restart`` endpoint allows you to trigger a restart across the cluster to make sure that configuration changes or updates are properly applied. Every Wazuh manager node restarts, so send the request when a short interruption is acceptable.

Follow these steps to restart the Wazuh manager cluster nodes:

#. Navigate to **Server management** > **Dev Tools** to open the Wazuh manager API Console.
#. Set the method and endpoint to ``PUT /cluster/restart``.
#. Click **Send request**, the play icon on the request line. The Wazuh manager API returns a response similar to the following:

   .. thumbnail:: /images/manual/api/restart-wazuh-manager-cluster.png
      :title: Restart Wazuh manager cluster
      :alt: Restart Wazuh manager cluster
      :align: center
      :width: 80%

   .. code-block:: json
      :class: output

      {
        "data": {
          "affected_items": [
            "node01"
          ],
          "total_affected_items": 1,
          "total_failed_items": 0,
          "failed_items": []
        },
        "message": "Restart request sent to all specified nodes",
        "error": 0
      }

The preceding output lists the Wazuh manager nodes that received the restart request. The restart takes about 10 seconds on a single node, and Dev Tools returns an ``ECONNREFUSED`` error until it finishes. Then run :api-ref:`GET /cluster/<NODE_ID>/status <operation/api.controllers.cluster_controller.get_status_node>` to confirm that the Wazuh manager daemons are running again. On a multi-node cluster, worker nodes can take a minute or more to reconnect to the master node. Until a worker node reconnects, ``GET /cluster/<NODE_ID>/status`` for that node returns error ``1730``. Run :api-ref:`GET /cluster/nodes <operation/api.controllers.cluster_controller.get_cluster_nodes>` to confirm that every node is connected.

Wazuh agent operations
^^^^^^^^^^^^^^^^^^^^^^

You can use the Wazuh manager API to manage Wazuh agents, including enrolling, querying, restarting, and upgrading them. Review the :api-ref:`API reference <tag/Agents>` to find out more about managing Wazuh agents using the Wazuh manager API.

The following use cases show how to enroll, query, restart, and upgrade Wazuh agents.

Generating a Wazuh agent enrollment key
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow these steps to generate a key for enrolling a new Wazuh agent:

#. Navigate to **Server management** > **Dev Tools**, then paste the following query:

   .. code-block:: none

      POST /agents
      {
        "name": "UBUNTU_AGENT_01"
      }

   Where:

   -  ``UBUNTU_AGENT_01`` is a unique name for the Wazuh agent.
   -  This request adds a Wazuh agent with this name to the Wazuh manager and returns its client key. The Wazuh agent shows as never connected until an endpoint uses the key. If a Wazuh agent with the same name already exists, the request fails with error ``1705``. If one with the same IP address exists, it fails with error ``1706``. To replace it, set ``force.enabled`` to ``true`` in the request body. By default, the Wazuh manager then replaces it only if it has been disconnected and registered for more than one hour.

#. Click **Send request**, the play icon on the request line. The Wazuh manager responds with the ID and client key of the new Wazuh agent:

   .. thumbnail:: /images/manual/api/generate-wazuh-agent-enrollment-key.png
      :title: Generate Wazuh agent enrollment key
      :alt: Generate Wazuh agent enrollment key
      :align: center
      :width: 80%

   .. code-block:: json
      :class: output

      {
        "data": {
          "id": "004",
          "key": "MDA0IFVCVU5UVV9BR0VOVF8wMSBhbnkgNjM5N2IzNDkwODE5MzdjN2Q0Njk2ZmM1NTk2N2UwMDJmOTViZjcyNjA3MTMxZTkxNjYxYTFjNzA3MDZjOGMwZA=="
        },
        "error": 0
      }

The preceding output shows the ID and client key of the new Wazuh agent. To use the key on a Linux endpoint, run ``/var/ossec/bin/``\ :doc:`manage_agents </user-manual/reference/tools/manage-agents>` as root, enter ``I`` to import a key, and paste the key value from the output when prompted. Don't pass the key with the ``-i`` option, because other processes can read command-line arguments and the shell saves them in its history. Then set ``<endpoint>`` in the ``<manager>`` section of ``/var/ossec/etc/ossec.conf`` to the Wazuh manager IP address, and start the Wazuh agent. To enroll a new Wazuh agent without a key, use an enrollment token, as shown in the next section. A Wazuh agent added this way has no copy of the Wazuh manager CA, so it doesn't verify the Wazuh manager certificate. To install the CA, run ``wazuh-agent-auth --certs-only`` with an enrollment token.

Enrolling a Wazuh agent with an enrollment token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An enrollment token lets a new Wazuh agent enroll with the Wazuh manager without the shared enrollment password. The Wazuh agent sends its enrollment request over HTTPS to port 1517 on the Wazuh manager. Each token contains the Wazuh manager address and a fingerprint of the Wazuh manager certificate authority (CA). You can also limit how long the token is valid and how many Wazuh agents can use it.

Install the Wazuh agent package on the endpoint first. Then follow these steps to create an enrollment token and use it to enroll a Wazuh agent on Linux, macOS, or Windows:

#. Navigate to **Server management** > **Dev Tools**, then paste the following request:

   .. code-block:: none

      POST /agents/enrollment-tokens
      {
        "address": "<WAZUH_MANAGER_IP_ADDRESS>",
        "ttl": "12h",
        "max_uses": 10,
        "description": "Wazuh agent enrollment"
      }

   Where:

   -  ``<WAZUH_MANAGER_IP_ADDRESS>`` is the IP address or FQDN of the Wazuh manager. It must match a name in the certificate of the Wazuh manager HTTPS listener. Otherwise, the request fails with error ``1768``, "Enrollment token refused", with the detail ``address not in certificate SAN``. To list those names, run :api-ref:`GET /cluster/<NODE_ID>/daemons/remoted/tls <operation/api.controllers.cluster_controller.get_remoted_tls_node>` and read ``listener.sans`` in the response. On an all-in-one installation, the names are the hostname and private IP address of the Wazuh manager, plus the loopback addresses. A default installation might not include a public address, so Wazuh agents outside the Wazuh manager network must use one of these names. To use another address, see :ref:`Enrollment token refused: address not in certificate SAN <agent_enrollment_token_refused_san>`.
   -  ``ttl`` is how long the token stays valid; for example, ``12h``.
   -  ``max_uses`` is the number of Wazuh agents that can enroll with the token. The default, ``0``, allows unlimited uses, and the default ``ttl`` is 30 days.
   -  ``description`` is an optional label that helps you identify the token.

#. Click **Send request**, the play icon on the request line. The Wazuh manager API returns a response similar to the following:

   .. thumbnail:: /images/manual/api/create-wazuh-agent-enrollment-token.png
      :title: Create a Wazuh agent enrollment token
      :alt: Create a Wazuh agent enrollment token
      :align: center
      :width: 80%

   .. code-block:: json
      :class: output

      {
        "data": {
          "token": "eyJ2ZXIiOjXXXXXXXXXX0xb05LeTdlZEdlOFRPMXRmWSJ9",
          "id": "BScUoAzDO2foKqDNyV5kKw",
          "address": "10.42.1.79",
          "expires": "2026-11-24T22:15:34+00:00",
          "pin_hex": "7e0a20c1126a21bd40121834dd51acd5c042e527a48e9610f3ed06c0dbf1c191"
        },
        "error": 0
      }

Copy the ``token`` value. The Wazuh manager API returns the token only in this response.

Then enroll the Wazuh agent on the endpoint. Follow the steps for its operating system:

**Linux**

#. On the Linux endpoint, run the following command to save the token to a file that only the root user can read. Paste the token, press **Enter**, then press **Ctrl** + **D**:

   .. code-block:: console

      # (umask 077; cat > /root/wazuh-enrollment.tok)

   Don't pass the token as a command-line argument. Other processes can read command-line arguments, and the shell saves them in its history.

#. Stop the Wazuh agent:

   .. code-block:: console

      # systemctl stop wazuh-agent

#. Enroll the Wazuh agent with the token:

   .. code-block:: console

      # /var/ossec/bin/wazuh-agent-auth --token-file /root/wazuh-enrollment.tok

   The Wazuh agent name and groups come from the ``<enrollment>`` section of ``/var/ossec/etc/ossec.conf``. If the Wazuh agent is already enrolled, add ``--force-enroll`` to enroll it again. The Wazuh agent then gets a new ID. If the Wazuh manager still has a Wazuh agent with this name, it usually refuses the enrollment with a ``Duplicate name`` error. By default, it replaces the existing Wazuh agent only when that Wazuh agent has been disconnected and registered for more than one hour. Delete that Wazuh agent first, as shown in :ref:`Deleting Wazuh agents <api_use_cases_deleting_wazuh_agents>`. Add ``--dry-run`` to list the changes the command makes without contacting the Wazuh manager.

#. Start the Wazuh agent to load its new identity:

   .. code-block:: console

      # systemctl start wazuh-agent

#. Delete the token file:

   .. code-block:: console

      # rm /root/wazuh-enrollment.tok

**macOS**

#. On the macOS endpoint, run the following command to save the token to a file that only the root user can read. Paste the token, press **Enter**, then press **Ctrl** + **D**:

   .. code-block:: console

      # (umask 077; cat > /var/root/wazuh-enrollment.tok)

#. Stop the Wazuh agent:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control stop

#. Enroll the Wazuh agent with the token:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-agent-auth --token-file /var/root/wazuh-enrollment.tok

   The Wazuh agent name and groups come from the ``<enrollment>`` section of ``/Library/Ossec/etc/ossec.conf``. If the Wazuh agent is already enrolled, add ``--force-enroll`` to enroll it again. The Wazuh agent then gets a new ID. If the Wazuh manager still has a Wazuh agent with this name, it usually refuses the enrollment with a ``Duplicate name`` error. By default, it replaces the existing Wazuh agent only when that Wazuh agent has been disconnected and registered for more than one hour. Delete that Wazuh agent first, as shown in :ref:`Deleting Wazuh agents <api_use_cases_deleting_wazuh_agents>`.

#. Start the Wazuh agent:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control start

#. Delete the token file:

   .. code-block:: console

      # rm /var/root/wazuh-enrollment.tok

**Windows**

Run the following commands in PowerShell as an administrator.

#. Save the token to a file in your temporary folder. Paste the token when prompted:

   .. code-block:: powershell

      > Read-Host -Prompt "Enrollment token" | Set-Content -NoNewline -Path "$env:TEMP\wazuh-enrollment.tok"

#. Stop the Wazuh agent:

   .. code-block:: powershell

      > Stop-Service -Name WazuhSvc

#. Enroll the Wazuh agent with the token:

   .. code-block:: powershell

      > & "C:\Program Files (x86)\ossec-agent\wazuh-agent-auth.exe" --token-file "$env:TEMP\wazuh-enrollment.tok"

   The Wazuh agent name and groups come from the ``<enrollment>`` section of ``C:\Program Files (x86)\ossec-agent\ossec.conf``. If the Wazuh agent is already enrolled, add ``--force-enroll`` to enroll it again. The Wazuh agent then gets a new ID. If the Wazuh manager still has a Wazuh agent with this name, it usually refuses the enrollment with a ``Duplicate name`` error. By default, it replaces the existing Wazuh agent only when that Wazuh agent has been disconnected and registered for more than one hour. Delete that Wazuh agent first, as shown in :ref:`Deleting Wazuh agents <api_use_cases_deleting_wazuh_agents>`.

#. Start the Wazuh agent:

   .. code-block:: powershell

      > Start-Service -Name WazuhSvc

#. Delete the token file:

   .. code-block:: powershell

      > Remove-Item "$env:TEMP\wazuh-enrollment.tok"

To list the enrollment tokens, run :api-ref:`GET /agents/enrollment-tokens <operation/api.controllers.agent_controller.get_enrollment_tokens>`. The response shows each token's ID, expiry date, and number of uses, but not the token itself. To revoke a token before it expires, run :api-ref:`DELETE /agents/enrollment-tokens/<TOKEN_ID> <operation/api.controllers.agent_controller.delete_enrollment_token>`.

.. thumbnail:: /images/manual/api/list-wazuh-agent-enrollment-tokens.png
   :title: List the Wazuh agent enrollment tokens
   :alt: List the Wazuh agent enrollment tokens
   :align: center
   :width: 80%

Querying the Wazuh agents
~~~~~~~~~~~~~~~~~~~~~~~~~

The ``/agents`` endpoint returns information about the enrolled Wazuh agents. For example, you can query for all inactive Wazuh agents. This is useful for troubleshooting Wazuh agent health issues.

#. Navigate to **Server management** > **Dev Tools**, then paste the following query:

   .. code-block:: none

      GET /agents?status=disconnected,pending,never_connected&select=ip,name

#. Click **Send request**, the play icon on the request line. The Wazuh manager API returns information about the IP and enrolled name of all inactive Wazuh agents:

   .. thumbnail:: /images/manual/api/query-wazuh-agents.png
      :title: Querying the Wazuh agents
      :alt: Querying the Wazuh agents
      :align: center
      :width: 80%

   .. code-block:: json
      :class: output

      {
        "data": {
          "affected_items": [
            {
              "ip": "any",
              "name": "UBUNTU_AGENT_01",
              "id": "004"
            }
          ],
          "total_affected_items": 1,
          "total_failed_items": 0,
          "failed_items": []
        },
        "message": "All selected agents information was returned",
        "error": 0
      }

The preceding output shows the ID, name, and IP address of each Wazuh agent that is disconnected, pending, or never connected.

Restarting a Wazuh agent remotely
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh agents can be restarted using the Wazuh manager API from the Wazuh dashboard. Follow these steps to restart a Wazuh agent.

#. Navigate to **Server management** > **Dev Tools**, then paste the following query:

   .. code-block:: none

      PUT /agents/001/restart

   Where:

   -  ``001`` is the ID of the Wazuh agent to restart.

#. Click **Send request**, the play icon on the request line. The Wazuh manager API returns a response similar to the following:

   .. thumbnail:: /images/manual/api/restart-wazuh-agent-remotely.png
      :title: Restart a Wazuh agent remotely
      :alt: Restart a Wazuh agent remotely
      :align: center
      :width: 80%

   .. code-block:: json
      :class: output

      {
        "data": {
          "affected_items": [
            "001"
          ],
          "total_affected_items": 1,
          "total_failed_items": 0,
          "failed_items": [],
          "nodes": {
            "node01": {
              "affected_items": [
                "001"
              ]
            }
          }
        },
        "message": "Restart command was sent to all agents",
        "error": 0
      }

The preceding output shows the Wazuh agent that received the restart command.

Upgrading the Wazuh agents
~~~~~~~~~~~~~~~~~~~~~~~~~~

To upgrade a Wazuh agent, you can use the ``/agents/upgrade`` endpoint. You can specify the IDs of Wazuh agents to upgrade, separated by commas, or specify ``all`` to upgrade every enrolled Wazuh agent. The Wazuh agents must run an older version than the Wazuh manager, and the Wazuh manager must be able to reach the WPK package repository. The Wazuh agents must also reach port 1517 on the Wazuh manager. If they can't, the upgrade stops before installing, and the Wazuh agent stays on 4.x. A Wazuh agent that already runs the version of the Wazuh manager returns error ``1820``. Wazuh agents on 4.x must run version 4.14.0 or later, or the request returns error ``1819``. Upgrade older Wazuh agents to 4.14.x first. The Wazuh manager checks for pending upgrades for 4.x Wazuh agents every 900 seconds by default. The upgrade can start up to 15 minutes after the request.

#. Navigate to **Server management** > **Dev Tools**, then paste the following query:

   .. code-block:: none

      PUT /agents/upgrade?agents_list=001

   Where:

   -  ``001`` is the ID of the Wazuh agent to upgrade. The ``agents_list`` parameter accepts a comma-separated list of Wazuh agent IDs. You can also use ``all`` to send the request to all Wazuh agents.

#. Click **Send request**, the play icon on the request line. The Wazuh manager API returns a response similar to the following:

   .. code-block:: json
      :class: output

      {
        "data": {
          "affected_items": [
            "001"
          ],
          "total_affected_items": 1,
          "total_failed_items": 0,
          "failed_items": [],
          "nodes": {
            "node01": {
              "affected_items": [
                "001"
              ]
            }
          }
        },
        "message": "All upgrade tasks were created",
        "error": 0
      }

The preceding output shows the upgrade task created for the Wazuh agent. The response doesn't report whether the upgrade succeeds. To check the result, run ``GET /agents?agents_list=001&select=version,status`` until the Wazuh agent reports the new version.

Using an authenticated terminal
-------------------------------

The following use cases demonstrate how to manage Wazuh agents using the Wazuh manager API through an authenticated terminal.

Prerequisites
^^^^^^^^^^^^^

Your terminal must reach port 55000 on the Wazuh manager. After an all-in-one installation with the :doc:`installation assistant </user-manual/reference/installation-utilities/installation-assistant>`, such as the :doc:`Quickstart </quickstart>`, the Wazuh manager API accepts connections only from the Wazuh manager itself. To send requests from another host, change ``host`` as described in :ref:`Change the default host and port <api_securing_api_change_the_default_host_and_port>`.

Generate a JWT to authenticate with the Wazuh manager API by making a cURL request. Replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address or fully qualified domain name (FQDN) of the Wazuh manager. Replace ``<USER>`` with the Wazuh manager API user ``wazuh`` by default, and ``<PASSWORD>`` with its password:

.. code-block:: console

   # TOKEN=$(curl -s -u <USER>:<PASSWORD> -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/user/authenticate?raw=true")

Run ``echo $TOKEN`` to confirm that the token was generated:

.. code-block:: console

   # echo $TOKEN

The command output looks similar to this:

.. code-block:: none
   :class: output

   eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eXXXXXXXXXXXXXXXXdsvGzjz

The following requests use this token to authenticate with the Wazuh manager API. The token expires after 900 seconds by default. When a request returns ``401``, run the first command again to get a new token.

.. note::

   The password of the ``wazuh`` user is in the ``WAZUH_MANAGER_API_PASSWORD`` variable of the ``/etc/wazuh-manager/export/credentials.env`` file on the Wazuh manager. Only the root user can read this file. In a distributed deployment, the password is in the ``wazuh-install-files/credentials.env`` file inside the ``wazuh-install-files.tar`` archive that the installation assistant creates. The ``admin`` account of the Wazuh dashboard can't authenticate with the Wazuh manager API. You can also reset the password for the Wazuh manager API user if you have forgotten it.

Wazuh agent management
^^^^^^^^^^^^^^^^^^^^^^

You can use the Wazuh manager API from a terminal to delete Wazuh agents and to summarize them by status, operating system, and group. Review the :api-ref:`API reference <tag/Agents>` to find out more about managing Wazuh agents using the Wazuh manager API.

The following use cases show how to delete and summarize Wazuh agents.

.. _api_use_cases_deleting_wazuh_agents:

Deleting Wazuh agents
~~~~~~~~~~~~~~~~~~~~~

Using the Wazuh manager API, you can delete specific Wazuh agents, or every Wazuh agent that matches a filter such as connection status or time since the last keepalive. Refer to the :api-ref:`Wazuh manager API reference <tag/Agents>` to see other categories that can be queried.

#. Run the following request:

   .. code-block:: console

      # curl -k -X DELETE "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents?agents_list=<AGENT_ID>&status=all&older_than=1&pretty=true" -H "Authorization: Bearer $TOKEN"

   .. warning::

      This request deletes every Wazuh agent that matches the filters. Check the ``agents_list`` value before you run it, because ``all`` deletes every Wazuh agent.

Where:

-  ``<AGENT_ID>`` is the ID of the Wazuh agent. You can also pass a comma-separated list of Wazuh agent IDs, or ``all``. ``status=all`` deletes the Wazuh agents, regardless of their connection status. This parameter is required. ``older_than=1`` includes Wazuh agents whose last keepalive is older than one second. Without it, only Wazuh agents whose last keepalive is older than seven days are deleted.

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         "001"
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "All selected agents were deleted",
     "error": 0
   }

The preceding output shows the deleted Wazuh agent. The Wazuh agent on the endpoint keeps running and retries enrollment. Stop or uninstall the Wazuh agent on the endpoint, or enroll it again with an enrollment token and ``--force-enroll``.

Getting a summary of Wazuh agent information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use the ``/agents/summary`` endpoint to return a summary of the available Wazuh agents, operating systems, status, and groups.

#. Run the following command to retrieve information about the registered Wazuh agents:

   .. code-block:: console

      # curl -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents/summary?pretty=true" -H "Authorization: Bearer $TOKEN"

   The command output looks similar to this:

   .. code-block:: json
      :class: output

      {
        "data": {
          "status": {
            "active": 2,
            "disconnected": 0,
            "never_connected": 0,
            "pending": 0
          },
          "os": {
            "ubuntu": 1,
            "windows": 1
          },
          "groups": {
            "default": 2
          }
        },
        "error": 0
      }

The preceding output shows the number of Wazuh agents by status, operating system, and group.
