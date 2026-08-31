.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-syscheckd program runs the Wazuh agent file integrity monitoring service, which monitors configured files and directories for changes.

.. _wazuh_syscheckd:

wazuh-syscheckd
================

The ``wazuh-syscheckd`` executable runs the Wazuh agent file integrity monitoring service.

The file integrity monitoring service monitors configured files and directories for creation, modification, and deletion. It records file attributes and cryptographic checksums, then detects changes by comparing the current state of monitored files with the previously recorded state.

On supported Windows endpoints, the service can also monitor changes to configured Windows Registry keys and values.

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
