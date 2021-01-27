.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_ossec_conf:

Local configuration (ossec.conf)
================================

The ``ossec.conf`` file is the main configuration file on the Wazuh manager and it also plays an important role on the agents. It is located at ``/var/ossec/etc/ossec.conf`` both in the manager and agent on Linux machines. On Windows agents, we can find it at ``C:\Program Files (x86)\ossec-agent\ossec.conf``. It is recommended to back up this file before making changes on it. A configuration error may prevent Wazuh services from starting up.

The ``ossec.conf`` file is in XML format and all of its configuration options are nested in their appropriate section of the file. In this file, the outermost XML tag is ``<wazuh_config>``. There can be more than one ``<wazuh_config>`` tag.

Here is an example of the proper location of the *alerts* configuration section:

.. code-block:: xml

    <wazuh_config>
        <alerts>
            <!--
            alerts options here
            -->
        </alerts>
    </wazuh_config>

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
| :doc:`client_buffer <client_buffer>`                                | agent                  |
+---------------------------------------------------------------------+------------------------+
| :doc:`cluster <cluster>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`command <commands>`                                           | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`database_output <database-output>`                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`email_alerts <email_alerts>`                                  | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`fluent-forward <fluent-forward>`                              | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`global  <global>`                                             | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`integration  <integration>`                                   | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`labels  <labels>`                                             | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`localfile <localfile>`                                        | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`logging <logging>`                                            | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`remote <remote>`                                              | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`reports <reports>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`rootcheck <rootcheck>`                                        | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`rule_test <rule_test>`                                        | manager                |
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
| :doc:`vulnerability-detector <vuln-detector>`                       | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="agent-key-polling" <wodle-agent-key-polling>`     | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="aws-s3" <wodle-s3>`                               | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="azure-logs" <wodle-azure-logs>`                   | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="cis-cat" <wodle-ciscat>`                          | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="command" <wodle-command>`                         | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="docker-listener" <wodle-docker>`                  | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="open-scap" <wodle-openscap>`                      | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="osquery" <wodle-osquery>`                         | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="syscollector" <wodle-syscollector>`               | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`gcp-pubsub <gcp-pubsub>`                                      | manager, agent         |
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
   client
   client_buffer
   cluster
   commands
   database-output
   email_alerts
   global
   integration
   labels
   localfile
   logging
   remote
   reports
   rootcheck
   sca
   rule_test
   ruleset
   socket
   syscheck
   syslog-output
   task-manager
   fluent-forward
   gcp-pubsub
   wodle-openscap
   wodle-command
   wodle-ciscat
   wodle-s3
   wodle-syscollector
   vuln-detector
   wodle-osquery
   wodle-docker
   wodle-azure-logs
   wodle-agent-key-polling
   verifying-configuration
