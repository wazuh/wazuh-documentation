.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-analysisd program runs the Wazuh Normalization Engine, the core event processing component of the Wazuh manager.

.. _wazuh_manager_analysisd:

wazuh-manager-analysisd
==========================

The ``wazuh-manager-analysisd`` executable runs the Wazuh Normalization Engine, the core event processing component of the Wazuh manager.

The normalization engine receives events from monitored endpoints and from the Vulnerability Scanner module, decodes and normalizes them, enriches them with additional context, evaluates them against configured security policies, and produces processed events that are sent to the configured outputs.

In Wazuh 5.0, the normalization engine replaces the legacy event analysis pipeline used in previous versions and serves as the primary event processing engine for the Wazuh manager.

For more information about the normalization engine architecture, event processing pipeline, and internal modules, see the :doc:`Wazuh normalization Engine </user-manual/manager/wazuh-normalization-engine>` section of the User manual.

+----------+----------------------------------------------------------------------------------------------+
| Option   | Description                                                                                  |
+==========+==============================================================================================+
| -d       | Runs the daemon in debug mode. Repeat the option (for example, -dd) to increase the          |
|          | verbosity of debug messages.                                                                 |
+----------+----------------------------------------------------------------------------------------------+
| -f       | Runs the daemon in the foreground instead of as a background process.                        |
+----------+----------------------------------------------------------------------------------------------+
| -h       | Displays the help message and exits.                                                         |
+----------+----------------------------------------------------------------------------------------------+
| -t       | Tests the configuration and exits.                                                           |
+----------+----------------------------------------------------------------------------------------------+
