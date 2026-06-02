.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: There are different ways to list the Wazuh agents enrolled in the Wazuh manager. Learn more in this section of the documentation.

List agents
===========

There are different ways to list the Wazuh agents enrolled in the Wazuh manager. These include querying the Wazuh manager API and using the Wazuh dashboard.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

List agents using the Wazuh dashboard
-------------------------------------

You can list and view basic information about all enrolled agents by navigating to **Agents management** > **Summary** in the Wazuh dashboard:

.. thumbnail:: /images/wazuh-dashboard/agent-management/agents-preview.png
   :title: Listing agents from the Wazuh dashboard
   :alt: Listing agents from the Wazuh dashboard
   :align: center
   :width: 80%

List agents using the Wazuh manager API
---------------------------------------

The :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` request returns a list of available Wazuh agents.

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/agents?pretty=true&sort=-ip,name" -H  "Authorization: Bearer $TOKEN"

Output

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "arch": "x86_64",
                  "major": "8",
                  "minor": "5",
                  "name": "CentOS Linux",
                  "platform": "centos",
                  "version": "8.5.2111"
               },
               "node_name": "manager",
               "mergedSum": "3b3873b68b99e95a9bb5b2b42c799c3b",
               "lastKeepAlive": "2026-05-28T15:07:38+00:00",
               "ip": "192.168.1.209",
               "group": [
                  "default",
                  "dbms",
                  "webserver",
                  "apache"
               ],
               "name": "CentOS",
               "registerIP": "any",
               "id": "016",
               "status_code": 0,
               "dateAdd": "2026-05-28T14:01:38+00:00",
               "version": "v5.0.0",
               "status": "active",
               "group_config_status": "synced"
            },
            {
               "os": {
                  "arch": "x86_64",
                  "major": "11",
                  "minor": "7",
                  "name": "macOS",
                  "platform": "darwin",
                  "version": "11.7.10"
               },
               "node_name": "manager",
               "mergedSum": "ca35f9148a3273413eccb79f149f4757",
               "lastKeepAlive": "2026-05-28T15:07:38+00:00",
               "ip": "192.168.1.208",
               "group": [
                  "default"
               ],
               "name": "macOS",
               "registerIP": "any",
               "id": "015",
               "status_code": 0,
               "dateAdd": "2026-05-28T12:22:15+00:00",
               "version": "v4.14.5",
               "status": "pending",
               "group_config_status": "synced"
            },
            {
               "os": {
                  "arch": "x86_64",
                  "major": "24",
                  "minor": "04",
                  "name": "Ubuntu",
                  "platform": "ubuntu",
                  "version": "24.04.3 LTS (Noble Numbat)"
               },
               "node_name": "manager",
               "mergedSum": "d744b55e9ca7812834d6ce1a0aa09320",
               "lastKeepAlive": "2026-05-28T15:07:31+00:00",
               "ip": "192.168.1.185",
               "group": [
                  "apache"
               ],
               "name": "Ubuntu",
               "registerIP": "any",
               "id": "012",
               "status_code": 0,
               "dateAdd": "2026-05-28T08:45:38+00:00",
               "version": "v5.0.0",
               "status": "active",
               "group_config_status": "synced"
            },
            {
               "os": {
                  "arch": "x86_64",
                  "major": "10",
                  "minor": "0",
                  "name": "Microsoft Windows 11 Home",
                  "platform": "windows",
                  "version": "10.0.26200.8457"
               },
               "node_name": "manager",
               "mergedSum": "ca35f9148a3273413eccb79f149f4757",
               "lastKeepAlive": "2026-05-28T15:07:41+00:00",
               "ip": "192.168.1.101",
               "group": [
                  "default"
               ],
               "name": "Windows",
               "registerIP": "any",
               "id": "014",
               "status_code": 0,
               "dateAdd": "2026-05-28T11:47:14+00:00",
               "version": "v5.0.0",
               "status": "active",
               "group_config_status": "synced"
            }
         ],
         "total_affected_items": 4,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }
