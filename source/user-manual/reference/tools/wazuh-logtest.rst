.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh-logtest:

wazuh-logtest
=============

.. versionadded:: 4.0.0

`wazuh-logtest` tool allows the testing and verification of rules against provided log examples inside a sandbox in `ossec-analysisd`. Helpful when writing and debugging custom rules and decoders, troubleshooting false positives and negatives.

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
| **-V**                                    | Display the version and license information for Wazuh and wazuh-logtest.       |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-q**                                    | Quiet excecution.                                                              |
+-------------------------------------------+--------------------------------------------------------------------------------+