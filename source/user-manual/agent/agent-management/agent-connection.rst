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

This option displays the **Summary** dashboard with a list of all enrolled Wazuh agents. The list includes the connection status of each Wazuh agent. The Wazuh dashboard also displays a summary with the number of Wazuh agents found for each possible agent connection :ref:`status <agent-connection-states>`: *Active*, *Disconnected*, *Pending*, or *Never connected*.

.. thumbnail:: /images/manual/managing-agents/endpoints-summary-dashboard.png
   :title: Agents management summary dashboard
   :alt: Agents management summary dashboard
   :align: center
   :width: 80%

Using the Wazuh manager API
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can check the :ref:`status <agent-connection-states>` of a Wazuh agent by sending a request to the Wazuh manager API. This action is performed on the Wazuh manager.

.. code-block:: none

   GET /agents?agents_list=<WAZUH_AGENT_ID>

The output looks like this:

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [
         {
           ...
           "status": "active",
           ...
           "id": "001",
           "name": "agent5",
           ...
         }
       ],
     ...
   }

.. _reading_wazuh_agentd_state_file:

Reading the local wazuh-agentd.state file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can read the ``/var/ossec/var/run/wazuh-agentd.state`` file (``C:\Program Files (x86)\ossec-agent\wazuh-agent.state`` on Windows) found in the endpoint to check the status of the connection. The Wazuh agent keeps reporting its connection status in this file as follows:

-  ``pending``: Waiting for acknowledgement from the Wazuh manager about the connection established.
-  ``disconnected``: No acknowledgement signal received in the last 60 seconds, or three times :ref:`notify_time <reference_ossec_agent>` if ``notify_time`` is 60 or more, or lost connection. This is the Wazuh agent's own view. The Wazuh manager marks it as disconnected only after ``agents_disconnection_time``, 15 minutes by default. See :ref:`Agent connection states <agent-connection-states>`.
-  ``connected``: The Wazuh agent connected to the Wazuh manager in the last ``notify_time`` seconds, 10 by default.

To check the current status and verify the connection of the Wazuh agent to the Wazuh manager, run the following command on the endpoint:

.. tabs::

   .. group-tab:: Linux/Unix

      .. code-block:: console

         $ sudo grep ^status /var/ossec/var/run/wazuh-agentd.state

      The output looks like this:

      .. code-block:: none
         :class: output

         status='connected'

   .. group-tab:: Windows

      .. code-block:: pwsh-session

         > Select-String -Path 'C:\Program Files (x86)\ossec-agent\wazuh-agent.state' -Pattern "^status"

      The output looks like this:

      .. code-block:: none
         :class: output

         C:\Program Files (x86)\ossec-agent\wazuh-agent.state:7:status='connected'

   .. group-tab:: macOS

      .. code-block:: console

         # sudo grep ^status /Library/Ossec/var/run/wazuh-agentd.state

      The output looks like this:

      .. code-block:: none
         :class: output

         status='connected'

Checking network communication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh agent communication with the Wazuh manager requires outbound connectivity from the Wazuh agent to the Wazuh manager on port ``1517/TCP`` (HTTPS) by default.

Run the following command on the Wazuh agent to verify that it reaches the Wazuh manager.

.. tabs::

   .. group-tab:: Linux/Unix

      .. code-block:: console

         # nc -zv <WAZUH_MANAGER_ADDRESS> 1517

      The command output looks similar to this:

      .. code-block:: none
         :class: output

         Connection to 192.168.71.15 1517 port [tcp/*] succeeded!

   .. group-tab:: Windows

      .. code-block:: pwsh-session

         > Test-NetConnection <WAZUH_MANAGER_ADDRESS> -Port 1517

      The command output looks similar to this:

      .. code-block:: none
         :class: output

         ComputerName     : 192.168.71.15
         RemotePort       : 1517
         TcpTestSucceeded : True

   .. group-tab:: macOS

      .. code-block:: console

         # nc -zv <WAZUH_MANAGER_ADDRESS> 1517

      The command output looks similar to this:

      .. code-block:: none
         :class: output

         Connection to 192.168.71.15 port 1517 [tcp/vpac] succeeded!

To confirm that the Wazuh agent is connected, check its status as described in :ref:`Reading the local wazuh-agentd.state file <reading_wazuh_agentd_state_file>`.

Search for errors or warnings in the corresponding agent log files for troubleshooting purposes.

-  Linux/Unix: ``/var/ossec/logs/ossec.log``
-  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.log``
-  macOS: ``/Library/Ossec/logs/ossec.log``

To learn more, see the :doc:`troubleshooting <../agent-enrollment/troubleshooting>` section.

Checking the synchronization status of Wazuh agents group configuration
-----------------------------------------------------------------------

Synchronization ensures the Wazuh agent has the latest security configurations and data for consistent monitoring. To check the synchronization status of the group configuration for agents, you can use the Wazuh dashboard.

Using the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^

Navigate to the **Agents management** > **Summary** tab in the Wazuh dashboard. Select an agent and click on **Configuration**. The image below shows the Wazuh agent configuration. The **Reported N minutes ago** label at the top shows when the Wazuh agent last reported its configuration to the Wazuh manager. Click **Refresh** to request the current configuration from the Wazuh agent.

.. thumbnail:: /images/manual/agent/agent-config-synchronized.png
   :title: Wazuh agent configuration
   :alt: Wazuh agent configuration
   :align: center
   :width: 80%
