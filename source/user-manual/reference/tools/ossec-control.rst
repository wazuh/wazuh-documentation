.. Copyright (C) 2018 Wazuh, Inc.

.. _ossec-control:

ossec-control
=============

The ossec-control script is used to start, stop, configure, or check on the status of Wazuh processes. This script can enable or disable client-syslog, database logging, agentless configurations, integration with slack and pagerduty, and debug mode.

.. note::
    We recommend to use the ``systemctl`` or ``service`` commands (depending on your OS) to **start**, **stop** or **restart** the Wazuh service. This will avoid inconsistencies between the *service* status and the *processes* status.

+-------------+---------------------------------------------------------------------------------------------------------+
| **start**   | Start the Wazuh processes.                                                                              |
+-------------+---------------------------------------------------------------------------------------------------------+
| **stop**    | Stop the Wazuh processes.                                                                               |
+-------------+---------------------------------------------------------------------------------------------------------+
| **restart** | Restart the Wazuh processes.                                                                            |
+-------------+---------------------------------------------------------------------------------------------------------+
| **reload**  | Restart all Wazuh processes except ossec-execd.                                                         |
|             |                                                                                                         |
|             | This allows an agent to reload without losing active response status.                                   |
|             |                                                                                                         |
|             | This option is not available on a local Wazuh installation.                                             |
+-------------+---------------------------------------------------------------------------------------------------------+
| **status**  | Determine which Wazuh processes are running.                                                            |
+-------------+---------------------------------------------------------------------------------------------------------+
| **enable**  | Enable Wazuh functionality.                                                                             |
+             +-----------------+---------------+-----------------------------------------------------------------------+
|             |                 | debug         | Run all Wazuh daemons in debug mode.                                  |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+
| **disable** | Disable Wazuh functionality.                                                                            |
+             +-----------------+---------------+-----------------------------------------------------------------------+
|             |                 | debug         | Turn off debug mode.                                                  |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+

.. note::
    To use the database option, Database support must be compiled in during initial installation.
