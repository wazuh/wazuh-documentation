.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn to query the manager for information about any agent or initiate a syscheck/rootcheck scan on an agent using the agent_control program. 

agent_control
=============

The agent_control program allows you to query the manager for information about any agent and also allows you to initiate a syscheck/rootcheck scan on an agent the next time it checks in.

With this tool, you can check the status of each available agent, which can be any of the following:

-  **Active**: The agent is correctly connected to the manager.
-  **Pending**: The agent is waiting for a response from the manager.
-  **Disconnected**: The agent is not connected to the manager.
-  **Never connected**: The agent has never connected to the manager.

agent_control options
---------------------

+-------------------+---------------------------------------------------------+
| **-h**            | Display the help message                                |
+-------------------+---------------------------------------------------------+
| **-l**            | List available agents whether they are active or not.   |
+-------------------+---------------------------------------------------------+
| **-lc**           | List only the currently connected agents.               |
+-------------------+---------------------------------------------------------+
| **-ln**           | List only the currently disconnected agents.            |
+-------------------+---------------------------------------------------------+
| **-i <agent_id>** | Extract information from an agent                       |
+-------------------+---------------------------------------------------------+
| **-R <agent_id>** | Restart the Wazuh processes on the agent                |
+-------------------+---------------------------------------------------------+
| **-r**            | Run the integrity/rootcheck checking on agents.         |
|                   |                                                         |
|                   | This must be used in conjunction with options -a or -u. |
+-------------------+---------------------------------------------------------+
| **-a**            | Utilizes all agents                                     |
+-------------------+---------------------------------------------------------+
| **-u <agent_id>** | Perform the requested action on the specified agent.    |
+-------------------+---------------------------------------------------------+

agent_control options for Active Response
-----------------------------------------

+-------------------+---------------------------------------------------------+
| **-b <IP>**       | Blocks the specified IP address.                        |
+-------------------+---------------------------------------------------------+
| **-f <ar>**       | Used with -b, specifies which response to run.          |
+-------------------+---------------------------------------------------------+
| **-L**            | List available active responses.                        |
+-------------------+---------------------------------------------------------+
| **-s**            | Change the output to CSV format (comma delimited).      |
+-------------------+---------------------------------------------------------+
| **-j**            | Change the output to JSON format.                       |
+-------------------+---------------------------------------------------------+

.. note::

   The active-response identifier for use with the ``-f`` option is composed of the command name followed by the value indicated in the ``timeout`` option (active-response block). If ``timeout_allowed`` (command block) is set to no, or no timeout has been specified, the number next to the command name is 0.

   You can verify the identifier of an active response with the first column of ``/var/ossec/etc/shared/ar.conf``.

Example
-------

Restart an agent:

.. code-block:: console

   # /var/ossec/bin/agent_control -R -u 001

.. code-block:: none
   :class: output

   Wazuh agent_control: Restarting agent: 001
