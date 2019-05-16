.. Copyright (C) 2019 Wazuh, Inc.

.. _rootcheck_control:

rootcheck_control
=================

The ``rootcheck_control`` tool allows for the management of the policy monitoring and system auditing database that is stored on the server side.

Anomalies detected by the rootcheck functionality can be listed, and categorized into resolved and outstanding issues.

This tool can also display the last time that ossec-rootcheck was run.

+----------------------+-------------------------------------------------------+
| **-h**               | Display the help message.                             |
+----------------------+-------------------------------------------------------+
| **-l**               | List the available agents.                            |
+----------------------+-------------------------------------------------------+
| **-lc**              | List only the currently connected agents.             |
+----------------------+-------------------------------------------------------+
| **-ln**              | List only the currently disconnected agents.          |
+----------------------+-------------------------------------------------------+
| **-u <id> / -u all** | Update the database for the identified or all agents. |
+----------------------+-------------------------------------------------------+
| **-i <agent_id>**    | Print the database for the agent.                     |
+----------------------+-------------------------------------------------------+
| **-r**               | Used with -i to print all the resolved issues.        |
+----------------------+-------------------------------------------------------+
| **-q**               | Used with -i to print all the outstanding issues.     |
+----------------------+-------------------------------------------------------+
| **-L**               | Used with -i print the last scan.                     |
+----------------------+-------------------------------------------------------+
| **-s**               | Change the output to CSV format.                      |
+----------------------+-------------------------------------------------------+
| **-j**               | Change the output to JSON format.                     |
+----------------------+-------------------------------------------------------+
