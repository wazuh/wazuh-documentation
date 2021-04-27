.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh-control:

wazuh-control
=============

.. versionadded:: 4.2

The wazuh-control script is used to start, stop, configure, check on the status of Wazuh processes and enable the debug mode.

.. note::
    We recommend to use the ``systemctl`` or ``service`` commands (depending on your OS) to **start**, **stop** or **restart** the Wazuh service. This will avoid inconsistencies between the *service* status and the *processes* status.

+-------------+---------------------------------------------------------------------------------------------------------+
| **start**   | Start the Wazuh processes.                                                                              |
+-------------+---------------------------------------------------------------------------------------------------------+
| **stop**    | Stop the Wazuh processes.                                                                               |
+-------------+---------------------------------------------------------------------------------------------------------+
| **restart** | Restart the Wazuh processes.                                                                            |
+-------------+---------------------------------------------------------------------------------------------------------+
| **reload**  | Restart all Wazuh processes except wazuh-execd.                                                         |
|             |                                                                                                         |
|             | This allows an agent to reload without losing active response status.                                   |
|             |                                                                                                         |
|             | This option is not available on a local Wazuh installation.                                             |
+-------------+---------------------------------------------------------------------------------------------------------+
| **status**  | Determine which Wazuh processes are running.                                                            |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+
| **enable**  |  debug          | Run all Wazuh daemons in debug mode.                                                  |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+
| **disable** | debug           | Turn off debug mode.                                                                  |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+

.. note::
    To use the database option, Database support must be compiled in during initial installation.
