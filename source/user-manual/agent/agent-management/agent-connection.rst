.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out more about how to check the connection to the Wazuh Manager in this section of our documentation. 
  
Checking connection with the Wazuh manager
==========================================

This guide shows different ways to check the connection status between an agent and the Wazuh manager. This includes navigating the Wazuh dashboard, using the agent control utility, querying the Wazuh API, and reading the agent state file. It also contains instructions to verify the network communication between the endpoint and the server.

To learn more about installing and enrolling the Wazuh agent, see the :doc:`Wazuh agent installation guide </installation-guide/wazuh-agent/index>` and the :doc:`Agent enrollment </user-manual/agent/agent-enrollment/index>` section. 


Using the Wazuh dashboard
-------------------------

You can check the connection status of any agent by selecting the **Agents** menu option of the Wazuh dashboard.

.. thumbnail:: /images/manual/managing-agents/agents-menu.png
   :title: Wazuh dashboard Agents menu option
   :alt: Wazuh dashboard Agents menu option
   :align: center
   :width: 80%

This option shows the **Agents** dashboard with a list of all registered agents. The list includes the connection status of each agent. The dashboard also shows a summary with the number of agents found for each possible connection :ref:`status <agent-status-cycle>`: `Active`, `Disconnected`, `Pending`, `Never connected`.

.. thumbnail:: /images/manual/managing-agents/agents-dashboard.png
   :title: Wazuh Agents dashboard
   :alt: Wazuh Agents dashboard
   :align: center
   :width: 80%


Using the `agent_control` utility from the server
-------------------------------------------------

You can check the :ref:`status <agent-status-cycle>` of any agent remotely by using the :doc:`agent_control </user-manual/reference/tools/agent-control>` utility found with the Wazuh server. To get the status of an agent, run the following command replacing the ``-i`` parameter with your agent ID, for example, `001`. 

.. code-block:: console

   # /var/ossec/bin/agent_control -i <YOUR_AGENT_ID> | grep Status

.. code-block:: console
   :class: output

      Status:     Active

To list all the available agents and their status, use ``/var/ossec/bin/agent_control -l``.       


Using the Wazuh API
-------------------

In addition, you can check the :ref:`status <agent-status-cycle>` of an agent by requesting to the Wazuh API the `statistical information of an agent <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.agent_controller.get_component_stats>`_.

.. code-block:: none

   GET /agents/<YOUR_AGENT_ID>/stats/agent

.. code-block:: JSON
   :emphasize-lines: 5

   {
     "data": {
       "affected_items": [
         {
           "status": "connected",
           "last_keepalive": "2022-08-16T20:36:27Z",
           "last_ack": "2022-08-16T20:36:30Z",
           "msg_count": 1441,
           "msg_sent": 2326,
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

Reading the local `wazuh-agentd.state` file
-------------------------------------------

You can read the :doc:`wazuh-agentd.state </user-manual/reference/statistics-files/wazuh-agentd-state>` file found in the endpoint to check the status of the connection. The Wazuh agent keeps reporting its connection status in this file as follows.

-  ``pending``: Waiting for acknowledgment from the Wazuh manager about connection established.
-  ``disconnected``: No acknowledgment signal received during the last 60 seconds or lost connection.
-  ``connected``: Acknowledgment about connection established received from the Wazuh manager.

To check the current status and verify the connection of the agent with the manager, run the following command on the endpoint.

.. tabs::

   .. group-tab:: Linux/Unix

      .. code-block:: console

         $ sudo grep ^status /var/ossec/var/run/wazuh-agentd.state

      .. code-block:: console
         :class: output

         status='connected'

   .. group-tab:: Windows

      .. code-block:: Powershell

         > Select-String -Path C:\Program Files (x86)\ossec-agent\wazuh-agent.state -Pattern "^status"

      .. code-block:: console
         :class: output

         wazuh-agent.state:7:status='connected'


   .. group-tab:: macOS

      .. code-block:: console

         # sudo grep ^status /Library/Ossec/var/run/wazuh-agentd.state

      .. code-block:: console
         :class: output

         status='connected'

.. _check_network_communication:

Checking network communication
------------------------------

Agent communication with the manager requires outbound connectivity from agent to manager. It uses the port ``1514/TCP`` by default.

Use the following commands to verify if a connection to the Wazuh manager is established. The result should match the agent and manager IP addresses.

.. tabs::

   .. group-tab:: Linux/Unix

      .. code-block:: console

         # netstat -vatunp|grep wazuh-agentd

      .. code-block:: console
         :class: output

         tcp        0      0 10.0.2.15:48364      10.0.2.1:1514        ESTABLISHED 796/wazuh-agentd

   .. group-tab:: Windows

      .. code-block:: Powershell

         > Get-NetTCPConnection -RemotePort 1514


      .. code-block:: console
         :class: output

         LocalAddress                        LocalPort RemoteAddress                       RemotePort State       AppliedSetting OwningProcess
         ------------                        --------- -------------                       ---------- -----       -------------- -------------
         10.0.2.15                           48364     10.0.2.1                            1514       Established Internet       2840

   .. group-tab:: macOS

      .. code-block:: console

         # lsof -i -P | grep ESTABLISHED | grep 1514

      .. code-block:: console
         :class: output

         wazuh-age  1763          wazuh    7u  IPv4 0xca59cd921b0f1ccb      0t0    TCP 10.0.2.15:49326->10.0.2.1:1514 (ESTABLISHED)


For troubleshooting purposes, search for error or warnings in the corresponding agent log files. 

- Linux/Unix: ``/var/ossec/logs/ossec.log``

- Windows: ``C:\Program Files (x86)\ossec-agent\ossec.log``

- macOS: ``/Library/Ossec/logs/ossec.log``

To learn more, see the :doc:`Troubleshooting agent enrollment </user-manual/agent/agent-enrollment/troubleshooting>` section. 
