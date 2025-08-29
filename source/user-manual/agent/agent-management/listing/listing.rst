.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The GET /agents request returns a list of available Wazuh agents. learn more in this section of the documentation.

Listing agents using the Wazuh server API
-----------------------------------------

The :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` request returns a list of available Wazuh agents.

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents?pretty=true&sort=-ip,name" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

	{
	   "data": {
	      "affected_items": [
	         {
	            "os": {
	               "arch": "x86_64",
	               "major": "9",
	               "name": "CentOS Stream",
	               "platform": "centos",
	               "uname": "Linux |ag-centos9s |5.14.0-391.el9.x86_64 |#1 SMP PREEMPT_DYNAMIC Tue Nov 28 20:35:49 UTC 2023 |x86_64",
	               "version": "9"
	            },
	            "name": "ag-centos9s",
	            "lastKeepAlive": "2025-08-18T18:40:48+00:00",
	            "version": "Wazuh v4.12.0",
	            "group": [
	               "default"
	            ],
	            "id": "001",
	            "status": "active",
	            "manager": "centos8a",
	            "registerIP": "any",
	            "mergedSum": "cb5dc59d195320bb20b6039a519a8c0e",
	            "ip": "172.16.1.85",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "group_config_status": "synced",
	            "node_name": "wazuh-1",
	            "dateAdd": "2025-08-18T16:49:29+00:00",
	            "status_code": 0
	         },
	         {
	            "os": {
	               "arch": "x86_64",
	               "codename": "Jammy Jellyfish",
	               "major": "22",
	               "minor": "04",
	               "name": "Ubuntu",
	               "platform": "ubuntu",
	               "uname": "Linux |ag-ubuntu22 |5.15.0-91-generic |#101-Ubuntu SMP Tue Nov 14 13:30:08 UTC 2023 |x86_64",
	               "version": "22.04.3 LTS"
	            },
	            "name": "ag-ubuntu22",
	            "lastKeepAlive": "2025-08-18T18:40:40+00:00",
	            "version": "Wazuh v4.12.0",
	            "group": [
	               "default"
	            ],
	            "id": "002",
	            "status": "active",
	            "manager": "centos8b",
	            "registerIP": "any",
	            "mergedSum": "cb5dc59d195320bb20b6039a519a8c0e",
	            "ip": "172.16.1.83",
	            "configSum": "ab73af41699f13fdd81903b5f23d8d00",
	            "group_config_status": "synced",
	            "node_name": "wazuh-2",
	            "dateAdd": "2025-08-18T17:05:02+00:00",
	            "status_code": 0
	         },
	         {
	            "os": {
	               "arch": "x86_64",
	               "major": "8",
	               "minor": "5",
	               "name": "CentOS Linux",
	               "platform": "centos",
	               "uname": "Linux |centos8a |4.18.0-348.7.1.el8_5.x86_64 |#1 SMP Wed Dec 22 13:25:12 UTC 2021 |x86_64",
	               "version": "8.5"
	            },
	            "name": "centos8a",
	            "lastKeepAlive": "9999-12-31T23:59:59+00:00",
	            "version": "Wazuh v4.12.0",
	            "id": "000",
	            "status": "active",
	            "manager": "centos8a",
	            "registerIP": "127.0.0.1",
	            "ip": "127.0.0.1",
	            "group_config_status": "synced",
	            "node_name": "wazuh-1",
	            "dateAdd": "2025-08-18T16:33:54+00:00",
	            "status_code": 0
	         }
	      ],
	      "total_affected_items": 3,
	      "total_failed_items": 0,
	      "failed_items": []
	   },
	   "message": "All selected agents information was returned",
	   "error": 0
	}
