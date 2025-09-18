.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-control script is used to start, stop, configure, and check the status of Wazuh processes. Learn more about it in this section.

wazuh-control
=============

The wazuh-control script is used to start, stop, configure, check on the status of Wazuh processes and enable the debug mode.

.. note::
    We recommend using the ``systemctl`` or ``service`` commands (depending on your OS) to **start**, **stop** or **restart** the Wazuh service. This will avoid inconsistencies between the *service* status and the *processes* status.

The ``-j`` option is used for enabling JSON output format, but only in Wazuh server installations.

+-------------+---------------------------------------------------------------------------------------------------------+
| **start**   | Start the Wazuh processes.                                                                              |
+-------------+---------------------------------------------------------------------------------------------------------+
| **stop**    | Stop the Wazuh processes.                                                                               |
+-------------+---------------------------------------------------------------------------------------------------------+
| **restart** | Restart the Wazuh processes.                                                                            |
+-------------+---------------------------------------------------------------------------------------------------------+
| **reload**  | Restart all Wazuh processes except wazuh-execd.                                                         |
|             |                                                                                                         |
|             | This allows an agent to reload without losing Active Response status.                                   |
|             |                                                                                                         |
|             | This option is not available on a local Wazuh installation.                                             |
+-------------+---------------------------------------------------------------------------------------------------------+
| **status**  | Determine which Wazuh processes are running.                                                            |
+-------------+---------------------------------------------------------------------------------------------------------+
| **info**    | Prints the Wazuh installation type, version, and revision in environment variables format.              |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+
| **info**    |    [-v -r -t]   | Only one option at the time, prints the value of: version, revision or type.          |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+
| **enable**  |  debug          | Run all Wazuh daemons in debug mode.                                                  |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+
| **disable** | debug           | Turn off debug mode.                                                                  |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+

.. note::
    To use the database option, Database support must be compiled in during initial installation.

Examples
--------

-  Show status of Wazuh processes:

   .. code-block:: console

      # /var/ossec/bin/wazuh-control status

   .. code-block:: none
      :class: output

      wazuh-clusterd not running...
      wazuh-modulesd is running...
      wazuh-monitord is running...
      wazuh-logcollector is running...
      wazuh-remoted is running...
      wazuh-syscheckd is running...
      wazuh-analysisd is running...
      wazuh-maild not running...
      wazuh-execd is running...
      wazuh-db is running...
      wazuh-authd is running...
      wazuh-agentlessd not running...
      wazuh-integratord not running...
      wazuh-dbd not running...
      wazuh-csyslogd not running...
      wazuh-apid is running...

-  Print the value of Wazuh version:

   .. code-block:: console

      # /var/ossec/bin/wazuh-control info -v

   .. code-block:: none
      :class: output

      v|WAZUH_CURRENT|
