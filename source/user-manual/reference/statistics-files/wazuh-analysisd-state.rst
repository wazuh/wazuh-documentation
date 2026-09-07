.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-analysisd.state file was removed in Wazuh 5.0. Manager daemon statistics are now served through the API. Learn more about it here.

.. _wazuh_analysisd_state_file:

wazuh-analysisd.state
=====================

**Removed in Wazuh 5.0**. Manager daemon statistics are now served through the API:

.. code-block:: none

   GET /cluster/{node_id}/daemons/stats?daemons_list=wazuh-manager-analysisd

Sample response:

.. code-block:: json

   {
      "data": {
         "affected_items": [
            {
               "status": "OK",
               "global": [
                  { "name": "server.events.received", "type": "counter", "enabled": true, "value": 3484 },
                  { "name": "server.bytes.received", "type": "counter", "enabled": true, "value": 996293 },
                  { "name": "agent.cache.entries", "type": "pull", "enabled": true, "value": 2 },
                  { "name": "agent.cache.evictions", "type": "counter", "enabled": true, "value": 0 },
                  { "name": "agent.cache.insertions", "type": "counter", "enabled": true, "value": 2 },
                  { "name": "agent.cache.hits", "type": "counter", "enabled": true, "value": 828 },
                  { "name": "router.events.processed", "type": "counter", "enabled": true, "value": 3484 },
                  { "name": "indexer.queue.usage.percent", "type": "pull", "enabled": true, "value": 0 },
                  { "name": "agent.cache.updates", "type": "counter", "enabled": true, "value": 0 },
                  { "name": "router.queue.size", "type": "pull", "enabled": true, "value": 0 },
                  { "name": "router.eps.30m", "type": "pull", "enabled": true, "value": 0.9177777777777778 },
                  { "name": "router.queue.usage.percent", "type": "pull", "enabled": true, "value": 0 },
                  { "name": "router.queue.bytes.usage.percent", "type": "pull", "enabled": true, "value": 0 },
                  { "name": "router.queue.bytes.used", "type": "pull", "enabled": true, "value": 0 },
                  { "name": "router.events.dropped", "type": "counter", "enabled": true, "value": 0 },
                  { "name": "router.eps.1m", "type": "pull", "enabled": true, "value": 0 },
                  { "name": "router.eps.5m", "type": "pull", "enabled": true, "value": 0.26666666666666666 },
                  { "name": "indexer.queue.size", "type": "pull", "enabled": true, "value": 0 },
                  { "name": "indexer.events.dropped", "type": "pull", "enabled": true, "value": 0 }
               ],
               "spaces": [
                  {
                     "name": "standard",
                     "metrics": [
                        { "name": "events.unclassified", "type": "counter", "enabled": true, "value": 2475 },
                        { "name": "events.discarded.postfilter", "type": "counter", "enabled": true, "value": 0 },
                        { "name": "events.discarded", "type": "counter", "enabled": true, "value": 0 },
                        { "name": "events.discarded.prefilter", "type": "counter", "enabled": true, "value": 0 }
                     ]
                  }
               ],
               "name": "wazuh-manager-analysisd",
               "uptime": "2026-09-04T14:47:40.366Z",
               "timestamp": "2026-09-04T16:31:17.719Z"
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "Statistical information for each daemon was successfully read",
      "error": 0
   }
