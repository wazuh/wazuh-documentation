.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-execd program runs the Wazuh agent command execution service, which runs commands and active response scripts on the monitored endpoint.

.. _wazuh_execd:

wazuh-execd
===========

The ``wazuh-execd`` executable runs the Wazuh agent command execution service.

The command execution service runs configured commands and active response scripts on the monitored endpoint. These actions can be triggered by the Wazuh manager in response to detected security events.

+---------------+---------------------------------------------------------------------------------+
| Option        | Description                                                                     |
+===============+=================================================================================+
| -c <config>   | Specifies the configuration file to use. The default is etc/ossec.conf.         |
+---------------+---------------------------------------------------------------------------------+
| -d            | Runs the daemon in debug mode. Repeat the option to increase the debug level.   |
+---------------+---------------------------------------------------------------------------------+
| -f            | Runs the daemon in the foreground.                                              |
+---------------+---------------------------------------------------------------------------------+
| -g <group>    | Specifies the group under which the daemon runs. The default is wazuh.          |
+---------------+---------------------------------------------------------------------------------+
| -h            | Displays the help message and exits.                                            |
+---------------+---------------------------------------------------------------------------------+
| -t            | Tests the configuration and exits.                                              |
+---------------+---------------------------------------------------------------------------------+
| -V            | Displays version and license information.                                       |
+---------------+---------------------------------------------------------------------------------+
