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
             "type": "linux",
             "version": "8.5.2111"
           },
           "lastKeepAlive": "2026-05-28T15:07:38+00:00",
           "ip": "192.168.1.209",
           "group": ["default", "dbms", "webserver", "apache"],
           "name": "CentOS",
           "registerIP": "any",
           "id": "016",
           "status_code": 0,
           "dateAdd": "2026-05-28T14:01:38+00:00",
           "version": "v5.0.0",
           "status": "active"
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "All selected agents information was returned",
     "error": 0
   }
