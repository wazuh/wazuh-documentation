.. Copyright (C) 2015, Wazuh, Inc.

.. _wazuh-logtest:

wazuh-logtest
=============

.. versionadded:: 4.1.0

`wazuh-logtest` tool allows the testing and verification of rules against provided log examples inside a sandbox in `wazuh-analysisd`. Helpful when writing and debugging custom rules and decoders, troubleshooting false positives and negatives.

+-------------------------------------------+--------------------------------------------------------------------------------+
| **-d**                                    | Run as a Print debug output to the terminal.                                   |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-h**                                    | Display the help message.                                                      |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-U <rule-id:alert-level:decoder-name>** | This option will cause wazuh-logtest to return a zero exit status if the test  |
|                                           |                                                                                |
|                                           | results for the provided log line match the criteria in the arguments.         |
|                                           |                                                                                |
|                                           | Only one log line should be supplied for this to be useful.                    |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-l <location>**                         | Set custom location.                                                           |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-V**                                    | Display the version and license information for Wazuh and wazuh-logtest.       |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-q**                                    | Quiet execution.                                                               |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-v**                                    | Display the verbose results.                                                   |
+-------------------------------------------+--------------------------------------------------------------------------------+

.. note::

    -v is the key option to troubleshoot a rule or decoder problem.
