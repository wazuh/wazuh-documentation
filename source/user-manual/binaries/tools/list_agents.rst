
.. _list_agents:

list_agents
===========

List available agents.

``list_agents`` is only available on Wazuh servers or local mode installations. It can be used to retrieve:

- a list of all Wazuh agents that successfully connected to the server in the past
- a list of all Wazuh agents currently connected to the server
- a list of all Wazuh agents that were connected to the server in the past but are currently not connected.

If an agent was added via the :ref:`manage_agents` tool but has not yet been connected to the server, it will not show up in the output of list_agents.

+---------+------------------------------------------+
| Options | Descriptions                             |
+=========+==========================================+
| `-h`_   | Display the help message                 |
+---------+------------------------------------------+
| `-a`_   | List all agents                          |
+---------+------------------------------------------+
| `-c`_   | List the connected and active agents     |
+---------+------------------------------------------+
| `-n`_   | List the not connected and active agents |
+---------+------------------------------------------+

``-h``
------

Display the help message.

``-a``
------

List all agents.

``-c``
------

List the connected and active agents.

``-n``
------

List the not connected and active agents.
