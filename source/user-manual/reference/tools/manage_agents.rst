
.. _manage_agents:

manage_agents
=============

The manage_agents program is available in both a version for server and agent installations.

The purpose of manage_agents is to provide an easy-to-use interface to handle authentication
keys for Wazuh agents. These authentication keys are required for secure (encrypted and
authenticated) communication between the Wazuh server and its affiliated agent instances.

+-------------------+---------------------------------------------------------------------------------------------------------+
| **-d <seconds>**  | Forces agent registration.                                                                              |
|                   |                                                                                                         |
|                   | This option will remove the old agent if it is disconnected longer than the *<seconds>* value.          |
|                   |                                                                                                         |
|                   | Using ``0`` as the value will force the replacement of the agent without respect to disconnection time. |
+-------------------+---------------------------------------------------------------------------------------------------------+
| **-e <agent_id>** | Extract key for an agent.                                                                               |
+                   +-------------------------------------------------------------+-------------------------------------------+
|                   | Supported installations                                     | Server                                    |
+-------------------+-------------------------------------------------------------+-------------------------------------------+
| **-f**            | Generate clients in bulk from the specified file.                                                       |
|                   |                                                                                                         |
|                   | The file is a comma-delimited file containing the IP addresses and agent names to be added.             |
|                   |                                                                                                         |
|                   | This file should be located within /var/ossec and referenced by its path relative to /var/ossec.        |
+                   +-------------------------------------------------------------+-------------------------------------------+
|                   | Supported installations                                     | Server                                    |
+-------------------+-------------------------------------------------------------+-------------------------------------------+
| **-h**            | Display the help message.                                                                               |
+-------------------+---------------------------------------------------------------------------------------------------------+
| **-i <key>**      | Import the authentication key.                                                                          |
+                   +-------------------------------------------------------------+-------------------------------------------+
|                   | Supported installations                                     | agent                                     |
+-------------------+-------------------------------------------------------------+-------------------------------------------+
| **-l**            | List available agents.                                                                                  |
+-------------------+---------------------------------------------------------------------------------------------------------+
| **-r <agent_id>** | Remove an agent.                                                                                        |
+                   +-------------------------------------------------------------+-------------------------------------------+
|                   | Supported installations                                     | server                                    |
+-------------------+-------------------------------------------------------------+-------------------------------------------+
| **-V**            | Display the version and license information.                                                            |
+-------------------+---------------------------------------------------------------------------------------------------------+
