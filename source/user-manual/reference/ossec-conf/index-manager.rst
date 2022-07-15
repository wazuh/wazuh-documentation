.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the Wazuh local configuration, including configuration sections and supported installations, in this section of our documentation. 

.. _reference_manager_conf:

Manager configuration (manager.conf)
====================================

.. warning::
    Upgrade from an older version than v5.0.0 creates a new manager.conf file and the current configuration is saved into ossec.conf.backup file, restarting configuration from zero.

The ``manager.conf`` file is the main configuration file on the Wazuh manager. It is located at ``/var/ossec/etc/manager.conf`` on Linux machines. It is recommended to back up this file before making changes to it. A configuration error might prevent Wazuh services from starting up.

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

Wazuh can be installed in two ways: as a manager by using the "server/manager" installation type and as an agent by using the "agent" installation type.

+-----------------------------------------------------------------+
| Configuration sections                                          |
+=================================================================+
| :doc:`active-response-manager <active-response-manager>`        |
+-----------------------------------------------------------------+
| :doc:`agentless <agentless>`                                    |
+-----------------------------------------------------------------+
| :doc:`agent-upgrade-manager <agent-upgrade-manager>`            |
+-----------------------------------------------------------------+
| :doc:`alerts <alerts>`                                          |
+-----------------------------------------------------------------+
| :doc:`auth <auth>`                                              |
+-----------------------------------------------------------------+
| :doc:`cluster <cluster>`                                        |
+-----------------------------------------------------------------+
| :doc:`command <commands>`                                       |
+-----------------------------------------------------------------+
| :doc:`database_output <database-output>`                        |
+-----------------------------------------------------------------+
| :doc:`email_alerts <email-alerts>`                              |
+-----------------------------------------------------------------+
| :doc:`fluent-forward <fluent-forward>`                          |
+-----------------------------------------------------------------+
| :doc:`global <global>`                                          |
+-----------------------------------------------------------------+
| :doc:`github <github-module>`                                   |
+-----------------------------------------------------------------+
| :doc:`integration <integration>`                                |
+-----------------------------------------------------------------+
| :doc:`labels-manager <labels-manager>`                          |
+-----------------------------------------------------------------+
| :doc:`localfile <localfile>`                                    |
+-----------------------------------------------------------------+
| :doc:`logging-manager <logging-manager>`                        |
+-----------------------------------------------------------------+
| :doc:`office365 <office365-module>`                             |
+-----------------------------------------------------------------+
| :doc:`remote <remote>`                                          |
+-----------------------------------------------------------------+
| :doc:`reports <reports>`                                        |
+-----------------------------------------------------------------+
| :doc:`rootcheck <rootcheck>`                                    |
+-----------------------------------------------------------------+
| :doc:`rule_test <rule-test>`                                    |
+-----------------------------------------------------------------+
| :doc:`ruleset <ruleset>`                                        |
+-----------------------------------------------------------------+
| :doc:`sca <sca>`                                                |
+-----------------------------------------------------------------+
| :doc:`socket <socket>`                                          |
+-----------------------------------------------------------------+
| :doc:`syscheck <syscheck>`                                      |
+-----------------------------------------------------------------+
| :doc:`syslog_output <syslog-output>`                            |
+-----------------------------------------------------------------+
| :doc:`task-manager <task-manager>`                              |
+-----------------------------------------------------------------+
| :doc:`vulnerability-detector <vuln-detector>`                   |
+-----------------------------------------------------------------+
| :doc:`wazuh_db <wazuh-db-config>`                               |
+-----------------------------------------------------------------+
| :doc:`wodle name="agent-key-polling" <wodle-agent-key-polling>` |
+-----------------------------------------------------------------+
| :doc:`wodle name="aws-s3" <wodle-s3>`                           |
+-----------------------------------------------------------------+
| :doc:`wodle name="azure-logs" <wodle-azure-logs>`               |
+-----------------------------------------------------------------+
| :doc:`wodle name="cis-cat" <wodle-ciscat>`                      |
+-----------------------------------------------------------------+
| :doc:`wodle name="command" <wodle-command>`                     |
+-----------------------------------------------------------------+
| :doc:`wodle name="docker-listener" <wodle-docker>`              |
+-----------------------------------------------------------------+
| :doc:`wodle name="open-scap" <wodle-openscap>`                  |
+-----------------------------------------------------------------+
| :doc:`wodle name="osquery" <wodle-osquery>`                     |
+-----------------------------------------------------------------+
| :doc:`wodle name="syscollector" <wodle-syscollector>`           |
+-----------------------------------------------------------------+
| :doc:`gcp-pubsub <gcp-pubsub>`                                  |
+-----------------------------------------------------------------+
| :doc:`gcp-bucket <gcp-bucket>`                                  |
+-----------------------------------------------------------------+

All of the above sections must be located within the top-level ``<wazuh_config>`` tag. In case of adding another ``<wazuh_config>`` tag, it may override the values set on the previous tag.


.. toctree::
   :hidden:
   :maxdepth: 1

   active-response-manager
   agent-upgrade-manager
   agentless
   alerts
   auth
   cluster
   commands
   database-output
   email-alerts
   fluent-forward
   gcp-pubsub
   global
   github-module
   integration
   labels-manager
   localfile
   logging-manager
   remote
   reports
   rootcheck
   rule-test
   ruleset
   sca
   socket
   syscheck
   syslog-output
   task-manager
   vuln-detector
   wodle-agent-key-polling
   wodle-azure-logs
   wodle-ciscat
   wodle-command
   wodle-docker
   wodle-openscap
   wodle-osquery
   wodle-s3
   wodle-syscollector
   gcp-bucket
   wazuh-db-config
   verifying-configuration
