.. Copyright (C) 2018 Wazuh, Inc.

.. _agent_control:

agent_control
=============

The agent_control program allows you to query the manager for information about any agent and also allows you to initiate a syscheck/rootcheck scan on an agent the next time it checks in.

With this tool you can check the status of each available agent, which can be any of the following:

- Active: The agent is correctly connected to the manager.
- Pending: The agent is waiting for a response from the manager.
- Disconnected: The agent is not connected to the manager.
- Never connected: The agent has never connected to the manager.

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
| **-m**            | Show the limit of agents that can be added.             |
+-------------------+---------------------------------------------------------+
| **-s**            | Change the output to CSV format (comma delimited).      |
+-------------------+---------------------------------------------------------+
| **-j**            | Change the output to JSON format.                       |
+-------------------+---------------------------------------------------------+
