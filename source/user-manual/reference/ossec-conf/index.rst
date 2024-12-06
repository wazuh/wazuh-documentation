.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the Wazuh local configuration, including configuration sections and supported installations, in this section of our documentation.

.. _reference_ossec_conf:

Local configuration (ossec.conf)
================================

The ``ossec.conf`` file is the main configuration file on the Wazuh manager, and it also plays an important role on the agents. It is located at ``/var/ossec/etc/ossec.conf`` both in the manager and agent on Linux machines. On Windows agents, we can find it at ``C:\Program Files (x86)\ossec-agent\ossec.conf``. It is recommended to back up this file before making changes to it. A configuration error may prevent Wazuh services from starting up.

The ``ossec.conf`` file is in XML format, and all of its configuration options are nested in their appropriate section of the file. In this file, the outermost XML tag is ``<ossec_config>``. There can be more than one ``<ossec_config>`` tag.

Here is an example of the proper location of the *alerts* configuration section:

.. code-block:: xml

    <ossec_config>
        <alerts>
            <!--
            alerts options here
            -->
        </alerts>
    </ossec_config>

The ``agent.conf`` file is very similar to ``ossec.conf`` but ``agent.conf`` is used to centrally distribute configuration information to agents. See more :doc:`here <../centralized-configuration>`.

Wazuh can be installed in two ways: as a manager by using the "server/manager" installation type and as an agent by using the "agent" installation type.

+---------------------------------------------------------------------+------------------------+
| Configuration sections                                              | Supported installations|
+=====================================================================+========================+
| :doc:`active-response <active-response>`                            | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`agentless <agentless>`                                        | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`agent-upgrade <agent-upgrade>`                                | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`alerts <alerts>`                                              | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`auth <auth>`                                                  | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`client <client>`                                              | agent                  |
+---------------------------------------------------------------------+------------------------+
| :doc:`client_buffer <client-buffer>`                                | agent                  |
+---------------------------------------------------------------------+------------------------+
| :doc:`cluster <cluster>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`command <commands>`                                           | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`database_output <database-output>`                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`email_alerts <email-alerts>`                                  | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`fluent-forward <fluent-forward>`                              | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`global  <global>`                                             | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`github <github-module>`                                       | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`indexer <indexer>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`integration  <integration>`                                   | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`labels  <labels>`                                             | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`localfile <localfile>`                                        | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`logging <logging>`                                            | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`ms-graph <ms-graph-module>`                                   | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`office365 <office365-module>`                                 | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`remote <remote>`                                              | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`reports <reports>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`rootcheck <rootcheck>`                                        | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`rule_test <rule-test>`                                        | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`ruleset <ruleset>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`sca <sca>`                                                    | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`socket <socket>`                                              | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`syscheck <syscheck>`                                          | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`syslog_output <syslog-output>`                                | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`task-manager <task-manager>`                                  | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`vulnerability-detection <vuln-detector>`                      | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`wazuh_db <wazuh-db-config>`                                   | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="agent-key-polling" <wodle-agent-key-polling>`     | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="aws-s3" <wodle-s3>`                               | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="azure-logs" <wodle-azure-logs>`                   | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="command" <wodle-command>`                         | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="docker-listener" <wodle-docker>`                  | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="osquery" <wodle-osquery>`                         | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="syscollector" <wodle-syscollector>`               | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`gcp-pubsub <gcp-pubsub>`                                      | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`gcp-bucket <gcp-bucket>`                                      | manager, agent         |
+---------------------------------------------------------------------+------------------------+

All of the above sections must be located within the top-level ``<ossec_config>`` tag. In the case of adding another ``<ossec_config>`` tag, it may override the values set on the previous tag.


.. toctree::
   :hidden:
   :maxdepth: 1


   active-response
   agentless
   agent-upgrade
   alerts
   auth
   client
   client-buffer
   cluster
   commands
   database-output
   email-alerts
   global
   github-module
   indexer
   integration
   labels
   localfile
   logging
   ms-graph-module
   office365-module
   remote
   reports
   rootcheck
   sca
   rule-test
   ruleset
   socket
   syscheck
   syslog-output
   task-manager
   fluent-forward
   gcp-pubsub
   gcp-bucket
   vuln-detector
   wodle-command
   wodle-s3
   wodle-syscollector
   wazuh-db-config
   wodle-osquery
   wodle-docker
   wodle-azure-logs
   wodle-agent-key-polling
   verifying-configuration
