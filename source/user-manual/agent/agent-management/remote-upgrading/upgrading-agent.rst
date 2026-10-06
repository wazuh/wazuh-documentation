.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: A Wazuh agent can be upgraded remotely using the command line and through the Wazuh server API. learn more in this section of the documentation.

Upgrading the Wazuh agent
=========================

A Wazuh agent can be upgraded remotely using the command line and through the Wazuh server API.

.. warning::

   It is recommended to use the Wazuh server API to upgrade agents if running a Wazuh cluster.

Using the command line
----------------------

To upgrade agents using the command line, use the :doc:`/var/ossec/bin/agent_upgrade </user-manual/reference/tools/agent-upgrade>` tool as follows:

#. List all outdated agents using the ``-l`` parameter:

   .. code-block:: console

      # /var/ossec/bin/agent_upgrade -l

   .. code-block:: none
      :class: output

      ID    Name                               Version
      002   VM_Debian9                         Wazuh v4.7.2
      003   VM_Debian8                         Wazuh v4.7.2
      009   VM_WinServ2016                     Wazuh v4.7.2

      Total outdated agents: 3

#. Upgrade the Wazuh agent using the ``-a`` parameter followed by the agent ID (here, the agent ID is *003*):

   .. code-block:: console

      # /var/ossec/bin/agent_upgrade -a 003

   .. code-block:: none
      :class: output

      Upgrading...

      Upgraded agents:
      	Agent 003 upgraded: Wazuh v4.7.2 -> Wazuh v4.8.0

#. Following the upgrade, the Wazuh agent is automatically restarted. Check the agent version to ensure it has been properly upgraded as follows:

   .. code-block:: console

      # /var/ossec/bin/agent_control -i 003

   .. code-block:: none
      :class: output

      Agent ID:   003
      Agent Name: wazuh-agent2
      IP address: any/any
      Status: 	Active

      Operating system:	Linux |wazuh-agent2 |5.8.0-7625-generic |#26~1604441477~20.10~d41e407-Ubuntu SMP Wed Jul 4 01:25:00 UTC 2 |x86_64
      Client version:  	Wazuh v4.8.0
      Configuration hash:  e2f47d482da37c099fa1d6e4c43b523c
      Shared file hash:	aabb92f4a8cba49c7c6045c1aa80fbd3
      Last keep alive: 	1604927114

      Syscheck last started at:  Mon Jul 9 13:00:55 2024
      Syscheck last ended at:	Mon Jul 9 13:00:56 2024

      Rootcheck last started at: Mon Jul 9 13:00:57 2024

Using the RESTful API
----------------------

#. List all outdated agents using endpoint :api-ref:`GET /agents/outdated <operation/api.controllers.agent_controller.get_agent_outdated>`. Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh server:

   .. code-block:: console

      # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/agents/outdated?pretty=true" -H  "Authorization: Bearer $TOKEN"

   .. code-block:: none
      :class: output

      {
      	"data": {
          	"affected_items": [
              	{"version": "Wazuh v4.7.2", "id": "002", "name": "VM_Debian9"},
              	{"version": "Wazuh v4.7.2", "id": "003", "name": "VM_Debian8"},
              	{"version": "Wazuh v4.7.2", "id": "009", "name": "VM_WinServ2016"},
          	],
          	"total_affected_items": 3,
          	"total_failed_items": 0,
          	"failed_items": [],
      	},
      	"message": "All selected agents information was returned",
      	"error": 0,
      }

#. Upgrade the Wazuh agent using endpoint :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>` (here, we upgrade agents with ID *002* and *003*). Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh server:

   .. code-block:: console

      # curl -k -X PUT "https://<WAZUH_MANAGER_IP>:55000/agents/upgrade?agents_list=002,003&pretty=true" -H  "Authorization: Bearer $TOKEN"

   .. code-block:: none
      :class: output

      {
        "data": {
      	"affected_items": [
        	{
          	"agent": "002",
          	"task_id": 1
        	},
        	{
          	"agent": "003",
          	"task_id": 2
        	}
      	],
      	"total_affected_items": 2,
      	"total_failed_items": 0,
      	"failed_items": []
        },
        "message": "All upgrade tasks were created",
        "error": 0
      }

   The ``agents_list`` parameter in the :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>` and :api-ref:`PUT /agents/upgrade_custom <operation/api.controllers.agent_controller.put_upgrade_custom_agents>` endpoints allows the value ``all``. When this value is set, an upgrade request will be sent to all Wazuh agents.

   When upgrading more than 3000 Wazuh agents at the same time, it is highly recommended that the parameter ``wait_for_complete`` be set to true to avoid a possible API timeout.

   This recommendation is based on testing with a Wazuh manager on a server with a 2.5 GHz AMD EPYC 7000 series processor and 4 GiB memory. Using an agent list with 3000 agents or fewer on a system with similar or better specifications guarantees a response before the API timeout occurs.

#. Check the upgrade results using endpoint :api-ref:`GET /agents/upgrade_result <operation/api.controllers.agent_controller.get_agent_upgrade>`. Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh server:

   .. code-block:: console

      # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/agents/upgrade_result?agents_list=002,003&pretty=true" -H  "Authorization: Bearer $TOKEN"

   .. code-block:: none
      :class: output

      {
        "data": {
      	"affected_items": [
        	{
          	"message": "Success",
          	"agent": "002",
          	"task_id": 1,
          	"node": "worker2",
          	"module": "upgrade_module",
          	"command": "upgrade",
          	"status": "Updated",
          	"create_time": "2024-07-09T17:13:45Z",
          	"update_time": "2024-07-09T17:14:07Z"
        	},
        	{
          	"message": "Success",
          	"agent": "003",
          	"task_id": 2,
          	"node": "worker1",
          	"module": "upgrade_module",
          	"command": "upgrade",
          	"status": "Updated",
          	"create_time": "2024-07-09T17:13:45Z",
          	"update_time": "2024-07-09T17:14:11Z"
        	}
      	],
      	"total_affected_items": 2,
      	"total_failed_items": 0,
      	"failed_items": []
        },
        "message": "All upgrade tasks were returned",
        "error": 0
      }

#. Following the upgrade, the Wazuh agents are automatically restarted. Check the version of the Wazuh agents to ensure they have been properly upgraded using endpoint :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>`:

   .. code-block:: console

      # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/agents?agents_list=002,003&pretty=true&select=version" -H  "Authorization: Bearer $TOKEN"

   .. code-block:: json
      :class: output

      {
        "data": {
      	"affected_items": [
        	{
          	"id": "002",
          	"version": "Wazuh 4.8.0"
        	},
        	{
          	"id": "003",
          	"version": "Wazuh 4.8.0"
        	}
      	],
      	"total_affected_items": 2,
      	"total_failed_items": 0,
      	"failed_items": []
        },
        "message": "All selected agents information was returned",
        "error": 0
      }
