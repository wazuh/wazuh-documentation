.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_manager_conf:

Manager configuration (manager.conf)
====================================

The ``manager.conf`` file is the main configuration file on the Wazuh manager. It is located at ``/var/ossec/etc/manager.conf`` on Linux machines.. It is recommended to back up this file before making changes on it. A configuration error may prevent Wazuh services from starting up.

The ``manager.conf`` file is in XML format and all of its configuration options are nested in their appropriate section of the file. In this file, the outermost XML tag is ``<wazuh_config>``. There can be more than one ``<wazuh_config>`` tag.

Here is an example of the proper location of the *alerts* configuration section:

.. code-block:: xml

    <wazuh_config>
        <alerts>
            <!--
            alerts options here
            -->
        </alerts>
    </wazuh_config>

The ``shared/agent.conf`` file is very similar to ``manager.conf`` but ``shared/agent.conf`` is used to centrally distribute configuration information to agents. See more :doc:`here <../centralized-configuration>`.

Wazuh can be installed in two ways: as a manager by using the "server/manager" installation type and as an agent by using the "agent" installation type.

+---------------------------------------------------------------------+------------------------+
| Configuration sections                                              | Supported installations|
+=====================================================================+========================+
| :doc:`active-response <active-response>`                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`agentless <agentless>`                                        | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`agent-upgrade <agent-upgrade>`                                | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`alerts <alerts>`                                              | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`auth <auth>`                                                  | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`cluster <cluster>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`command <commands>`                                           | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`database_output <database-output>`                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`email_alerts <email_alerts>`                                  | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`global  <global>`                                             | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`integration  <integration>`                                   | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`labels  <labels>`                                             | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`logging <logging>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`remote <remote>`                                              | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`reports <reports>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`rule_test <rule_test>`                                        | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`ruleset <ruleset>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`syslog_output <syslog-output>`                                | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`task-manager <task-manager>`                                  | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`vulnerability-detector <vuln-detector>`                       | manager                |
+---------------------------------------------------------------------+------------------------+

All of the above sections must be located within the top-level ``<wazuh_config>`` tag. In case of adding another ``<wazuh_config>`` tag, it may override the values set on the previous tag.


.. toctree::
   :hidden:
   :maxdepth: 1


   active-response
   agentless
   agent-upgrade
   alerts
   auth
   cluster
   commands
   database-output
   email_alerts
   global
   integration
   labels
   logging
   remote
   reports
   rule_test
   ruleset
   syslog-output
   task-manager
   vuln-detector
   verifying-configuration
