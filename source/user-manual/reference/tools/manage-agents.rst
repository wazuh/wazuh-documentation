.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The manage_agents program is available in both versions for server and agent installations. Learn more about it in this section of the Wazuh documentation.

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

Examples
--------

-  List available agents:

   .. code-block:: console

      # /var/ossec/bin/manage_agents -l

   .. code-block:: none
      :class: output

      Available agents:
         ID: 001, Name: Ubuntu2404, IP: any
         ID: 002, Name: Ubuntu-2404, IP: any
         ID: 003, Name: ubuntu-desktop, IP: any
         ID: 004, Name: Ubuntu24, IP: any

-  Remove an agent:

   .. code-block:: console

      # /var/ossec/bin/manage_agents -r 004

   .. code-block:: none
      :class: output

      ****************************************
      * Wazuh v4.12.0 Agent manager.         *
      * The following options are available: *
      ****************************************
         (A)dd an agent (A).
         (E)xtract key for an agent (E).
         (L)ist already added agents (L).
         (R)emove an agent (R).
         (Q)uit.
      Choose your action: A,E,L,R or Q:
      Available agents:
         ID: 001, Name: Ubuntu2404, IP: any
         ID: 002, Name: Ubuntu-2404, IP: any
         ID: 003, Name: ubuntu-desktop, IP: any
         ID: 004, Name: Ubuntu24, IP: any
      Provide the ID of the agent to be removed (or '\q' to quit): 004
      Confirm deleting it?(y/n): y
      Agent '004' removed.

      manage_agents: Exiting.
