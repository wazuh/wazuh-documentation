.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_validator:

wazuh_validator
================

The wazuh_validator program verifies the configuration files.

This program allows you check the different types of configuration file such as manager, agent and remote.

wazuh_validator options
-----------------------

+-------------------+---------------------------------------------------------+
| **-h**            | Display the help message                                |
+-------------------+---------------------------------------------------------+
| **-t**            | Mandatory option. Type of configuration file to be      |
|                   | tested: <manager>, <agent> or <remote>                  |
+-------------------+---------------------------------------------------------+
| **-f**            | Absolute path to config file to be tested. If this      |
|                   | option is not specified. Defaults to ``/var/ossec``     |
+-------------------+---------------------------------------------------------+