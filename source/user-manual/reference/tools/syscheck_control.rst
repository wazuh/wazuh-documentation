
.. _syscheck_control:

syscheck_control
================

The syscheck_control program provides an interface for managing and viewing the integrity checking database.

+----------------------+----------------------------------------------------------+
| **-h**               | Display the help message.                                |
+----------------------+----------------------------------------------------------+
| **-l**               | List the available agents.                               |
+----------------------+----------------------------------------------------------+
| **-lc**              | List only the currently connected agents.                |
+----------------------+----------------------------------------------------------+
| **-u <id> / -u all** | Update the database for the identified or all agents.    |
+----------------------+----------------------------------------------------------+
| **-i <agent_id>**    | Print the database for the agent.                        |
+----------------------+----------------------------------------------------------+
| **-r -i**            | List the modified registry entries for the agent.        |
+                      +----------------------------------+-----------------------+
|                      | Supported installations          | Windows agents        |
+----------------------+----------------------------------+-----------------------+
| **-f <file>**        | Used with -i to print information about a modified file. |
+----------------------+----------------------------------------------------------+
| **-z**               | Used with -f to zero the auto-ignore counter.            |
+----------------------+----------------------------------------------------------+
| **-d**               | Used with -f to ignore that file.                        |
+----------------------+----------------------------------------------------------+
| **-s**               | Change the output to CSV format.                         |
+----------------------+----------------------------------------------------------+
| **-j**               | Change the output to JSON format.                        |
+----------------------+----------------------------------------------------------+
