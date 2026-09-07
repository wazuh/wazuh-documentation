.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-remoted.state file was removed in Wazuh 5.0. Manager daemon statistics are now served through the API. Learn more about it here.

wazuh-remoted.state
===================

**Removed in Wazuh 5.0**. Manager daemon statistics are now served through the API:

.. code-block:: none

   GET /cluster/{node_id}/daemons/stats?daemons_list=wazuh-manager-remoted

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
