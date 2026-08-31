.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-modulesd program runs the Wazuh agent module manager service, which loads and coordinates Wazuh agent modules.

.. _wazuh_modulesd:

wazuh-modulesd
===============

The ``wazuh-modulesd`` executable runs the Wazuh agent module manager service.

The module manager service loads, manages, and coordinates Wazuh agent modules. These modules provide endpoint security capabilities such as security configuration assessment, system inventory collection, command monitoring, and integration with supported external services.

For more information about the capabilities provided by the Wazuh agent, see the :doc:`Wazuh agent section </user-manual/agent/index>` of the User Manual.

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
