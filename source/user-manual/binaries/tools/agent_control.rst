
.. _agent_control:

agent_control
=============

The agent_control program allows you to query the manager for information about any agent and also allows you to initiate a syscheck/rootcheck scan on an agent the next time it checks in.

+-------------------+---------------------------------------------------------+
| **-h**            | Display the help message                                |
+-------------------+---------------------------------------------------------+
| **-l**            | List available agents whether they are active or not.   |
+-------------------+---------------------------------------------------------+
| **-lc**           | List active agents                                      |
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
