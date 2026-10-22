.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-remoted program runs the Wazuh manager agent connection service, which receives and forwards events from Wazuh agents.

.. _wazuh_manager_remoted:

wazuh-manager-remoted
========================

The ``wazuh-manager-remoted`` executable runs the Wazuh manager agent connection service.

The agent connection service establishes and maintains secure communication with Wazuh agents. It receives events from connected agents, decrypts and enriches them with connection metadata, and forwards them to the Wazuh Normalization Engine for processing.

By default, the service listens for Wazuh 5.x agent connections over HTTPS on port 1517. It also listens on the legacy TCP port 1514 for Wazuh 4.x agents.

For more information about the agent connection service and its configuration, see the :doc:`Agent connection service </user-manual/manager/wazuh-manager-services>` section of the User Manual.

+------------------+------------------------------------------------------------------------------------------------+
| Option           | Description                                                                                    |
+==================+================================================================================================+
| -c <config>      | Specifies the configuration file to use. The default is /etc/wazuh-manager/wazuh-manager.conf. |
+------------------+------------------------------------------------------------------------------------------------+
| -d               | Runs the daemon in debug mode. Repeat the option to increase the debug level.                  |
+------------------+------------------------------------------------------------------------------------------------+
| -D <directory>   | Specifies the directory to chdir into. The default is /var/wazuh-manager.                      |
+------------------+------------------------------------------------------------------------------------------------+
| -f               | Runs the daemon in the foreground.                                                             |
+------------------+------------------------------------------------------------------------------------------------+
| -g <group>       | Specifies the group under which the daemon runs. The default is wazuh-manager.                 |
+------------------+------------------------------------------------------------------------------------------------+
| -h               | Displays the help message and exits.                                                           |
+------------------+------------------------------------------------------------------------------------------------+
| -m               | Prevents the creation of the shared merged file (read-only).                                   |
+------------------+------------------------------------------------------------------------------------------------+
| -t               | Tests the configuration and exits.                                                             |
+------------------+------------------------------------------------------------------------------------------------+
| -u <user>        | Specifies the user under which the daemon runs. The default is wazuh-manager.                  |
+------------------+------------------------------------------------------------------------------------------------+
| -V               | Displays version and license information.                                                      |
+------------------+------------------------------------------------------------------------------------------------+
