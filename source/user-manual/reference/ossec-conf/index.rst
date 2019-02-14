.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_conf:

Local configuration (ossec.conf)
================================

The ``ossec.conf`` file is the main configuration file on the Wazuh manager and it also plays an important role on the agents. It is located at ``/var/ossec/etc/ossec.conf`` both in the manager and agent. It is recommended that you back up this file before making changes to it, as an error in the configuration can prevent Wazuh services from starting up.

The ``ossec.conf`` file is in XML format and all of its configuration options are nested in their appropriate section of the file.  In this file, the outermost XML tag is ``<ossec_config>``.  Here is an example of the proper location of the *alerts* configuration section:

.. code-block:: xml

    <ossec_config>
        <alerts>
            <!--
            alerts options here
            -->
        </alerts>
    </ossec_config>

The ``agent.conf`` file is very similar to ``ossec.conf`` except that it is used to centrally distribute configuration information to agents. See more :doc:`here <../centralized-configuration>`.

Wazuh can be installed in two ways: as a manager by using the "server/manager" installation type and as an agent by using the "agent" installation type.

+---------------------------------------------------------------------+------------------------+
| Configuration sections                                              | Supported installations|
+=====================================================================+========================+
| :doc:`active-response <active-response>`                            | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`agentless <agentless>`                                        | manager                |
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
| :doc:`configuration assessment <configuration_assessment>`          | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`ruleset <ruleset>`                                            | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`socket <socket>`                                              | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`syscheck <syscheck>`                                          | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`syslog_output <syslog-output>`                                | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="open-scap" <wodle-openscap>`                      | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="command" <wodle-command>`                         | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="cis-cat" <wodle-ciscat>`                          | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="aws-s3" <wodle-s3>`                               | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="syscollector" <wodle-syscollector>`               | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="vulnerability-detector" <wodle-vuln-detector>`    | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="osquery" <wodle-osquery>`                         | manager, agent         |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="docker" <wodle-docker>`                           | agent                  |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="azure-logs" <wodle-azure-logs>`                   | manager                |
+---------------------------------------------------------------------+------------------------+
| :doc:`wodle name="agent-key-polling" <wodle-agent-key-polling>`     | manager                |
+---------------------------------------------------------------------+------------------------+


All of the above sections must be located within the top-level ``<ossec_config>`` tag.


.. toctree::
   :hidden:
   :maxdepth: 1


   active-response
   agentless
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
   configuration_assessment
   ruleset
   socket
   syscheck
   syslog-output
   wodle-openscap
   wodle-command
   wodle-ciscat
   wodle-s3
   wodle-syscollector
   wodle-vuln-detector
   wodle-osquery
   wodle-docker
   wodle-azure-logs
   wodle-agent-key-polling
   verifying-configuration
