.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section highlights different methods to verify the connection status between a Wazuh agent and the Wazuh manager.

Wazuh agent connection
======================

This section highlights different methods to verify the connection status between a Wazuh agent and the Wazuh manager. It also discusses how to check the Wazuh agent connection to the Wazuh manager and verify the synchronization status of the Wazuh agent. These sections are outlined below:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Checking connection with the Wazuh manager
------------------------------------------

There are different ways to check the connection status between a Wazuh agent and the Wazuh manager. They include navigating the Wazuh dashboard, querying the Wazuh manager API, and reading the Wazuh agent state file. This guide highlights the different methods and contains steps to verify the network communication between a Wazuh agent and the Wazuh manager.

Using the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^

You can check the connection status of a Wazuh agent by selecting **Summary** under **Agents management** on the Wazuh dashboard.

.. thumbnail:: /images/manual/managing-agents/endpoints-summary-menu.png
   :title: Wazuh dashboard – Agents management summary menu option
   :alt: Wazuh dashboard – Agents management summary menu option
   :align: center
   :width: 80%

This option displays the **Endpoints** dashboard with a list of all enrolled Wazuh agents. The list includes the connection status of each Wazuh agent. The Wazuh dashboard also displays a summary with the number of Wazuh agents found for each possible agent connection :ref:`status <agent-connection-states>`: *Active*, *Disconnected*, *Pending*, or *Never connected*.

.. thumbnail:: /images/manual/managing-agents/endpoints-summary-dashboard.png
   :title: Agents management summary dashboard
   :alt: Agents management summary dashboard
   :align: center
   :width: 80%

Using the Wazuh manager API
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can check the :ref:`status <agent-connection-states>` of a Wazuh agent by sending a request to the Wazuh manager API to retrieve :api-ref:`statistical information from an agent <operation/api.controllers.agent_controller.get_component_stats>`. This action is performed on the Wazuh manager.

.. code-block:: none

   GET /agents/<WAZUH_AGENT_ID>/stats/agent

Output

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "status": "connected",
           "last_keepalive": "2026-05-26T14:38:38Z",
           "last_ack": "2026-05-26T14:38:53Z",
           "msg_count": 2650,
           "msg_sent": 4153,
           "msg_buffer": 0,
           "buffer_enabled": true
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "Statistical information for each agent was successfully read",
     "error": 0
   }

Reading the local wazuh-agentd.state file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can read the ``/var/ossec/var/run/wazuh-agentd.state`` file found in the endpoint to check the status of the connection. The Wazuh agent keeps reporting its connection status in this file as follows:

-  ``pending``: Waiting for acknowledgement from the Wazuh manager about the connection established.
-  ``disconnected``: No acknowledgement signal received in the last 60 seconds or lost connection.
-  ``connected``: Acknowledgement about the connection established received from the Wazuh manager.

To check the current status and verify the connection of the Wazuh agent to the Wazuh manager, run the following command on the endpoint:

.. tabs::

   .. group-tab:: Linux/Unix

      .. code-block:: console

         $ sudo grep ^status /var/ossec/var/run/wazuh-agentd.state

      Output

      .. code-block:: none
         :class: output

         status='connected'

   .. group-tab:: Windows

      .. code-block:: pwsh-session

         > Select-String -Path 'C:\Program Files (x86)\ossec-agent\wazuh-agent.state' -Pattern "^status"

      Output

      .. code-block:: none
         :class: output

         C:\Program Files (x86)\ossec-agent\wazuh-agent.state:7:status='connected'

   .. group-tab:: macOS

      .. code-block:: console

         # sudo grep ^status /Library/Ossec/var/run/wazuh-agentd.state

      Output

      .. code-block:: none
         :class: output

         status='connected'

Checking network communication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Agent communication with the Wazuh manager requires outbound connectivity from the Wazuh agent to the Wazuh manager. It uses the port ``1514/TCP`` by default.

Run the following commands on the Wazuh agent to verify if a connection to the Wazuh manager is established. The result should match the Wazuh agent and Wazuh manager IP addresses.

.. tabs::

   .. group-tab:: Linux/Unix

      .. code-block:: console

         # netstat -vatunp|grep wazuh-agentd

      Output

      .. code-block:: none
         :class: output

         tcp        0      0 192.168.1.209:59129     192.168.1.174:1514      ESTABLISHED 2384/wazuh-agentd

   .. group-tab:: Windows

      .. code-block:: pwsh-session

         > Get-NetTCPConnection -RemotePort 1514

      Output

      .. code-block:: none
         :class: output

         LocalAddress                        LocalPort RemoteAddress                       RemotePort State       AppliedSetting OwningProcess
         ------------                        --------- -------------                       ---------- -----       -------------- -------------
         192.168.1.101                       15262     192.168.1.174                       1514       Established Internet       14884

   .. group-tab:: macOS

      .. code-block:: console

         # lsof -i -P | grep ESTABLISHED | grep 1514

      Output

      .. code-block:: none
         :class: output

         wazuh-age  309          wazuh    7u  IPv4 0x146ea8aac5da611b      0t0    TCP 192.168.1.208:49246->192.168.1.174:1514 (ESTABLISHED)

Search for errors or warnings in the corresponding agent log files for troubleshooting purposes.

-  Linux/Unix: ``/var/ossec/logs/ossec.log``
-  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.log``
-  macOS: ``/Library/Ossec/logs/ossec.log``

To learn more, see the :doc:`troubleshooting <../agent-enrollment/troubleshooting>` section.

Checking the synchronization status of Wazuh agents group configuration
-----------------------------------------------------------------------

Synchronization ensures the Wazuh agent has the latest security configurations and data for consistent monitoring. To check the synchronization status of the group configuration for agents, you can use the Wazuh dashboard or the :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` Wazuh manager API endpoint.

Using the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^

Navigate to the **Agents management** > **Summary** tab in the Wazuh dashboard. Select an agent and click on **Configuration**. The image below shows that the Wazuh agent configuration is **SYNCHRONIZED**. This means that the Wazuh agent's local configuration reflects the latest settings defined on the Wazuh manager.

.. thumbnail:: /images/manual/agent/agent-config-synchronized.png
   :title: Wazuh agent configuration synchronized
   :alt: Wazuh agent configuration synchronized
   :align: center
   :width: 80%

Using the GET /agents Wazuh manager API endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the command below on the Wazuh manager or any endpoint that has connectivity with the Wazuh manager. Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh manager.

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/agents?agents_list=<WAZUH_AGENT_ID>&select=group_config_status&pretty=true" -H  "Authorization: Bearer $TOKEN"

Output

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "id": "014",
               "group_config_status": "synced"
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

Refer to the following documentation for other information on the :doc:`Wazuh manager API </user-manual/api/reference>`.
