
.. _manage_agents:

manage_agents
=============

The manage_agents program is available in both a version for server and agent installations.

The purpose of manage_agents is to provide an easy-to-use interface to handle authentication
keys for Wazuh agents. These authentication keys are required for secure (encrypted and
authenticated) communication between the Wazuh server and its affiliated agent instances.

+---------+---------------------------------------+
| Options | Descriptions                          |
+=========+=======================================+
| `-d`_   | Force agent registration              |
+---------+---------------------------------------+
| `-e`_   | Extract key for an agent              |
+---------+---------------------------------------+
| `-f`_   | Generate clients in bulk from a file  |
+---------+---------------------------------------+
| `-h`_   | Display help message                  |
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
Forces agent registration.  This option will remove the old agent if it is disconnected longer than the *<seconds>* value. Using ``0`` as the value will force the replacement of the agent without respect to disconnection time.

.. topic:: Arguments

  ``-d  <seconds>``

``-e``
------

Extract key for an agent.

.. topic:: Arguments

  ``-e <agent_id>``

.. topic:: Supported installations

  Server

``-f``
------

Generate clients in bulk from the specified file. The file is a comma-delimited file containing the IP addresses and agent names to be added.  This file should be located within /var/ossec and referenced by its path relative to /var/ossec.

.. topic:: Arguments

  ``-f  <file>``

.. topic:: Supported installations

  Server

``-h``
------

Display the help message.

``-i``
------

Import the authentication key.

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

Display the version and license information.
