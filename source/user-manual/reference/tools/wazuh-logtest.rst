.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh-logtest:

wazuh-logtest
=============

.. versionadded:: 4.0.0

The wazuh-logtest program is a useful tool when working with Wazuh rules.  This tool allows the testing and verification of rules against provided log examples inside a sandbox in analysisd. This can also assist with writing and debugging custom rules and troubleshooting false positives and negatives.

+-------------------------------------------+--------------------------------------------------------------------------------+
| **-d**                                    | Run as a Print debug output to the terminal.                                   |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-h**                                    | Display the help message.                                                      |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-U <rule-id:alert-level:decoder-name>** | This option will cause ossec-logtest to return a zero exit status if the test  |
|                                           |                                                                                |
|                                           | results for the provided log line match the criteria in the arguments.         |
|                                           |                                                                                |
|                                           | Only one log line should be supplied for this to be useful.                    |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-V**                                    | Display the version and license information for Wazuh and ossec-logtest.       |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-q**                                    | Quiet excecution.                                                              |
+-------------------------------------------+--------------------------------------------------------------------------------+