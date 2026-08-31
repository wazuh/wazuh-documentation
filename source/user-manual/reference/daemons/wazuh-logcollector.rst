.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-logcollector program runs the Wazuh agent log collection service, which monitors log files, event channels, and command output for new events.

.. _wazuh_logcollector:

wazuh-logcollector
===================

The ``wazuh-logcollector`` executable runs the Wazuh agent log collection service.

The log collection service monitors configured log files, system logs, event channels, and command output for new events. It forwards the collected events to ``wazuh-agentd`` for transmission to the Wazuh manager.

+---------------+---------------------------------------------------------------------------------+
| Option        | Description                                                                     |
+===============+=================================================================================+
| -c <config>   | Specifies the configuration file to use. The default is etc/ossec.conf.         |
+---------------+---------------------------------------------------------------------------------+
| -d            | Runs the daemon in debug mode. Repeat the option to increase the debug level.   |
+---------------+---------------------------------------------------------------------------------+
| -f            | Runs the daemon in the foreground.                                              |
+---------------+---------------------------------------------------------------------------------+
| -h            | Displays the help message and exits.                                            |
+---------------+---------------------------------------------------------------------------------+
| -t            | Tests the configuration and exits.                                              |
+---------------+---------------------------------------------------------------------------------+
| -V            | Displays version and license information.                                       |
+---------------+---------------------------------------------------------------------------------+
