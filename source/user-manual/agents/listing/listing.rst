.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out how to list Wazuh agents using the Wazuh API. Learn more about it in this section of the Wazuh documentation.  
 
.. _restful-api-listing:

Listing agents using the Wazuh API
----------------------------------

The request :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` returns the list of available agents.

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/agents?pretty=true&sort=-ip,name" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
       "data": {
           "affected_items": [
               {
                   "os": {
                       "arch": "x86_64",
                       "codename": "Bionic Beaver",
                       "major": "18",
                       "minor": "04",
                       "name": "Ubuntu",
                       "platform": "ubuntu",
                       "uname": "Linux |wazuh-master |5.4.0-52-generic |#57-Ubuntu SMP Thu Oct 15 10:57:00 UTC 2020 |x86_64",
                       "version": "18.04.4 LTS",
                   },
                   "manager": "wazuh-master",
                   "status": "active",
                   "node_name": "master-node",
                   "lastKeepAlive": "9999-12-31T23:59:59Z",
                   "ip": "127.0.0.1",
                   "id": "000",
                   "version": "Wazuh v|WAZUH_CURRENT|",
                   "name": "wazuh-master",
                   "registerIP": "127.0.0.1",
                   "dateAdd": "2020-10-26T09:52:01Z",
                   "group_config_status": "synced"
               },
               {
                   "status": "never_connected",
                   "node_name": "unknown",
                   "ip": "any",
                   "id": "009",
                   "name": "wazuh-agent9",
                   "registerIP": "any",
                   "dateAdd": "1970-01-01T00:00:00Z",
                   "group_config_status": "not synced"
               }
           ],
           "total_affected_items": 2,
           "total_failed_items": 0,
           "failed_items": [],
       },
       "message": "All selected agents information was returned",
       "error": 0,
   }
