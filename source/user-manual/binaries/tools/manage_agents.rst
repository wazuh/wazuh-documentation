
.. _manage_agents:

manage_agents
=============

manage_agents is available in two versions:

- a version for OSSEC server installations
- a version for OSSEC agent installations

The purpose of manage_agents is to provide an easy-to-use interface to handle authentication
keys for OSSEC agents. These authentication keys are required for secure (encrypted and
authenticated) communication between the OSSEC server and its affiliated agent instances.

+---------+---------------------------------------+
| Options | Descriptions                          |
+=========+=======================================+
| `-V`_   | Display OSSEC version                 |
+---------+---------------------------------------+
| `-h`_   | Display the help message              |
+---------+---------------------------------------+
| `-l`_   | List available agents                 |
+---------+---------------------------------------+
| `-e`_   | Extracts key for an agent             |
+---------+---------------------------------------+
| `-r`_   | Remove an agent                       |
+---------+---------------------------------------+
| `-i`_   | Import authentication key             |
+---------+---------------------------------------+
| `-f`_   | Generate clients in bluck from a file |
+---------+---------------------------------------+

``-V``
------

Display OSSEC Version.

``-h``
------

Display the help message.

``-l``
------

List available agents.


``-e``
------

Extracts key for an agent.

.. topic:: Arguments

  -e <agent_id>

.. topic:: Supported installations

  Server


``-r``
------

Remove an agent.

.. topic:: Arguments

  -r <agent_id>

.. topic:: Supported installations

  Server



``-i``
------

Import authentication key.

.. topic:: Arguments

  -i <key>

.. topic:: Supported installations

  Agent

``-f``
------

Generate clients in bulk from <file>. The file is a comma delimited file containing the IP addresses and agent names to be added.
This file should be located within /var/ossec, and referenced by its path relative to /var/ossec.

.. topic:: Arguments

  -f  <file>

.. topic:: Supported installations

  Server
