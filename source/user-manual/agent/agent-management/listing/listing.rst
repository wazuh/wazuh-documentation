.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The GET /agents request returns a list of available Wazuh agents. learn more in this section of the documentation.

Listing agents using the Wazuh server API
-----------------------------------------

The :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` request returns a list of available Wazuh agents.

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/agents?pretty=true&sort=-ip,name" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
      "data": {
     	"affected_items": [
        	{
           	"os": {
              	"arch": "x86_64",
              	"major": "7",
              	"minor": "9",
              	"name": "CentOS Linux",
              	"platform": "centos",
              	"uname": "Linux |wazuhagent |3.10.0-1160.105.1.el7.x86_64 |#1 SMP Thu Dec 7 15:39:45 UTC 2023 |x86_64",
              	"version": "7.9"
           	},
           	"node_name": "node01",
           	"name": "CentOS",
           	"registerIP": "any",
           	"version": "Wazuh v4.8.0",
           	"mergedSum": "4a8724b20dee0124ff9656783c490c4e",
           	"dateAdd": "2024-02-14T09:59:19+00:00",
           	"ip": "192.168.33.27",
           	"configSum": "ab73af41699f13fdd81903b5f23d8d00",
           	"group": [
              	"default"
           	],
           	"group_config_status": "synced",
           	"status": "active",
           	"manager": "wazuhserver",
           	"status_code": 0,
           	"id": "004",
           	"lastKeepAlive": "2024-02-14T10:32:57+00:00"
        	},
        	{
           	"os": {
              	"arch": "x86_64",
              	"codename": "Jammy Jellyfish",
              	"major": "22",
              	"minor": "04",
              	"name": "Ubuntu",
              	"platform": "ubuntu",
              	"uname": "Linux |wazuhserver |5.15.0-84-generic |#93-Ubuntu SMP Tue Sep 5 17:16:10 UTC 2023 |x86_64",
              	"version": "22.04.3 LTS"
           	},
           	"node_name": "node01",
           	"name": "wazuhserver",
           	"registerIP": "127.0.0.1",
           	"version": "Wazuh v4.8.0",
           	"dateAdd": "2024-01-17T13:28:27+00:00",
           	"ip": "127.0.0.1",
           	"group_config_status": "synced",
           	"status": "active",
           	"manager": "wazuhserver",
           	"status_code": 0,
           	"id": "000",
           	"lastKeepAlive": "9999-12-31T23:59:59+00:00"
        	}
     	],
     	"total_affected_items": 2,
     	"total_failed_items": 0,
     	"failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }
