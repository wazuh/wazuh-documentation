.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-monitord program runs the Wazuh manager monitoring service, which performs log rotation, alert rotation, and agent monitoring.

.. _wazuh_manager_monitord:

wazuh-manager-monitord
=========================

The ``wazuh-manager-monitord`` executable runs the Wazuh manager monitoring service.

The monitoring service performs maintenance tasks for the Wazuh manager, including log rotation, alert rotation, and agent monitoring. It helps maintain the operational state of the manager by managing monitoring-related background tasks.

For more information about the Wazuh manager architecture and services, see the :doc:`Wazuh manager </user-manual/manager/index>` section of the User Manual.

+------------------+-----------------------------------------------------------------------------------------+
| Option           | Description                                                                             |
+==================+=========================================================================================+
| -c <config>      | Specifies the configuration file to use. The default is etc/wazuh-manager.conf.         |
+------------------+-----------------------------------------------------------------------------------------+
| -d               | Runs the daemon in debug mode. Repeat the option to increase the debug level.           |
+------------------+-----------------------------------------------------------------------------------------+
| -D <directory>   | Specifies the directory to chroot and change into. The default is /var/wazuh-manager.   |
+------------------+-----------------------------------------------------------------------------------------+
| -f               | Runs the daemon in the foreground.                                                      |
+------------------+-----------------------------------------------------------------------------------------+
| -g <group>       | Specifies the group under which the daemon runs. The default is wazuh-manager.          |
+------------------+-----------------------------------------------------------------------------------------+
| -h               | Displays the help message and exits.                                                    |
+------------------+-----------------------------------------------------------------------------------------+
| -n               | Disables agent monitoring.                                                              |
+------------------+-----------------------------------------------------------------------------------------+
| -t               | Tests the configuration and exits.                                                      |
+------------------+-----------------------------------------------------------------------------------------+
| -u <user>        | Specifies the user under which the daemon runs. The default is wazuh-manager.           |
+------------------+-----------------------------------------------------------------------------------------+
| -V               | Displays version and license information.                                               |
+------------------+-----------------------------------------------------------------------------------------+
| -w <seconds>     | Specifies the time, in seconds, to wait before rotating logs and alerts.                |
+------------------+-----------------------------------------------------------------------------------------+
