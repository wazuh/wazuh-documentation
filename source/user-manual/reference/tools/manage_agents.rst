
.. _manage_agents:

manage_agents
=============

The manage_agents program is available in both a version for server and agent installations.

The purpose of manage_agents is to provide an easy-to-use interface to handle authentication
keys for Wazuh agents. These authentication keys are required for secure (encrypted and
authenticated) communication between the Wazuh server and its affiliated agent instances.

Usage
-----

.. code-block:: none

    manage_agents -[VhljL] [-a <ip> -n <name>] [-F sec] [-e id] [-r id] [-i id] [-f file]

Options
-------
+---------------+-----------------------------------------------------------------------+
| **-V**        | Version and license message.                                          |
+---------------+-----------------------------------------------------------------------+
| **-h**        | This help message.                                                    |
+---------------+-----------------------------------------------------------------------+
| **-j**        | Use JSON output.                                                      |
+---------------+-----------------------------------------------------------------------+
| **-l**        | List available agents.                                                |
+---------------+-----------------------------------------------------------------------+
| **-L**        | Disables the agents registration limit                                |
+---------------+-----------------------------------------------------------------------+
| **-a <ip>**   | Add new agent.                                                        |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
| **-n <name>** | Name for new agent. Only valid along with *-a*.                       |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
| **-e <id>**   | Extracts key for an agent.                                            |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
| **-r <id>**   | Remove an agent.                                                      |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
| **-i <id>**   | Import authentication key.                                            |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Agent                                   |
+---------------+-----------------------------+-----------------------------------------+
| **-F <sec>**  | Remove agents with duplicated IP if disconnected since <sec> seconds. |
|               |                                                                       |
|               | With ``-F 0`` it will **always** remove duplicated agents.            |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
| **-f <file>** | Bulk generate client keys from file.                                  |
|               |                                                                       |
|               | ``<file>`` contains lines in ``IP,NAME`` format.                      |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
