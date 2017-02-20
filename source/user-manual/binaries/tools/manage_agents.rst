
.. _manage_agents:

manage_agents
=============

``manage_agents`` is available in two versions:

- a version for Wazuh server installations
- a version for Wazuh agent installations

The purpose of manage_agents is to provide an easy-to-use interface to handle authentication
keys for Wazuh agents. These authentication keys are required for secure (encrypted and
authenticated) communication between the Wazuh server and its affiliated agent instances.

+---------+---------------------------------------+
| Options | Descriptions                          |
+=========+=======================================+
| `-d`_   | Force the agent registration          |
+---------+---------------------------------------+
| `-e`_   | Extracts key for an agent             |
+---------+---------------------------------------+
| `-f`_   | Generate clients in bluck from a file |
+---------+---------------------------------------+
| `-h`_   | Display the help message              |
+---------+---------------------------------------+
| `-i`_   | Import authentication key             |
+---------+---------------------------------------+
| `-l`_   | List available agents                 |
+---------+---------------------------------------+
| `-r`_   | Remove an agent                       |
+---------+---------------------------------------+
| `-V`_   | Display Wazuh version                 |
+---------+---------------------------------------+

``-d``
------

We have created a way to force the agent registration, option ``[-d <seconds>]`` will remove the old agent if it is disconnected since *<seconds>* value. Using ``0`` value will replace the agent in any case.

.. topic:: Arguments

  ``-d  <seconds>``

``-e``
------

Extracts key for an agent.

.. topic:: Arguments

  ``-e <agent_id>``

.. topic:: Supported installations

  Server

``-f``
------

Generate clients in bulk from ``<file>``. The file is a comma delimited file containing the IP addresses and agent names to be added.
This file should be located within /var/ossec, and referenced by its path relative to /var/ossec.

.. topic:: Arguments

  ``-f  <file>``

.. topic:: Supported installations

  Server

``-h``
------

Display the help message.

``-i``
------

Import authentication key.

.. topic:: Arguments

  ``-i <key>``

.. topic:: Supported installations

  Agent

``-l``
------

List available agents.

``-r``
------

Remove an agent.

.. topic:: Arguments

  ``-r <agent_id>``

.. topic:: Supported installations

  Server

``-V``
------

Display Wazuh Version.
