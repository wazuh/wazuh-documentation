.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The manage_agents program is available in both versions for server and agent installations. Learn more about it in this section of the Wazuh documentation.

.. _manage_agents:

manage_agents
=============

The manage_agents program is available in both versions for server and agent installations.

The purpose of manage_agents is to provide an easy-to-use interface to handle authentication
keys for Wazuh agents. These authentication keys are required for secure (encrypted and
authenticated) communication between the Wazuh server and its affiliated agent instances.

Usage
-----

.. code-block:: none

    manage_agents -[VhljL] [-a <ip> -n <name>] [-R sec] [-D sec] [-e id] [-r id] [-i id] [-f file]

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
| **-L**        | Disables the agents registration limit.                               |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
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
| **-R <sec>**  | Remove agents with duplicated IP if registered since <sec> seconds.   |
|               |                                                                       |
|               | Using ``-R 0`` removes **any** duplicate of an agent.                 |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
| **-D <sec>**  | Remove agents with duplicated IP if disconnected since <sec> seconds. |
|               |                                                                       |
|               | Using ``-D 0`` removes **any** duplicate of a disconnected agent.     |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
| **-f <file>** | Bulk generate client keys from file.                                  |
|               |                                                                       |
|               | ``<file>`` contains lines in ``IP,NAME`` format.                      |
|               +-----------------------------+-----------------------------------------+
|               | **Supported installations** | Manager                                 |
+---------------+-----------------------------+-----------------------------------------+
