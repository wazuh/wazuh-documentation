.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-modulesd program runs the Wazuh manager module manager service, which loads and coordinates Wazuh manager modules.

.. _wazuh_manager_modulesd:

wazuh-manager-modulesd
=========================

The ``wazuh-manager-modulesd`` executable runs the Wazuh manager module manager service.

The module manager service loads, manages, and coordinates the execution of Wazuh manager modules. These modules extend the functionality of the Wazuh manager by providing additional capabilities and background services.

For more information about the available manager modules and their configuration, see the :ref:`Wazuh manager <normalization_engine_modules>` section of the User Manual.

+----------+-----------------------------------------------------------------------------------+
| Option   | Description                                                                       |
+==========+===================================================================================+
| -d       | Increases the debug level. Repeat the option to further increase the verbosity.   |
+----------+-----------------------------------------------------------------------------------+
| -f       | Runs the daemon in the foreground.                                                |
+----------+-----------------------------------------------------------------------------------+
| -h       | Displays the help message and exits.                                              |
+----------+-----------------------------------------------------------------------------------+
| -t       | Tests the configuration and exits.                                                |
+----------+-----------------------------------------------------------------------------------+
