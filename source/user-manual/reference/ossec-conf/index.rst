.. _reference_ossec_conf:

Local configuration
=================================

The ``ossec.conf`` file is the main configuration file on the Wazuh manager, and it also plays a role on the agents. It is located at ``/var/ossec/etc/ossec.conf`` both in the manager and agent. It is recommended you back up this file before making changes to it, as an error in the configuration can completely prevent Wazuh services from starting up.

The ``ossec.conf`` file is in XML format, and all configuration options are nested in their appropriate section of the file.  In this file, the outermost XML tag is <ossec_config>.  For example, here is an example of the proper location of the *alerts* configuration section:

.. code-block:: xml

    <ossec_config>
        <alerts>
            <!--
            alerts options here
            -->
        </alerts>
    </ossec_config>

The ``agent.conf`` file is very similar to ``ossec.conf`` except that it is used to centrally distribute configuration information to agents. See more :doc:`here <../centralized-configuration>`.

Wazuh can be installed in two possible ways: the Wazuh manager uses the "server/manager" installation type and agents use the "agent" installation type.

+---------------------------------------------------------------+------------------------+
| Configuration sections                                        | Supported installations|
+===============================================================+========================+
| :doc:`active-response <active-response>`                      | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`agentless <agentless>`                                  | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`alerts <alerts>`                                        | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`client <client>`                                        | agent                  |
+---------------------------------------------------------------+------------------------+
| :doc:`command <commands>`                                     | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`database_output <database-output>`                      | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`email_alerts <email_alerts>`                            | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`global  <global>`                                       | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`integration  <integration>`                             | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`localfile <localfile>`                                  | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`remote <remote>`                                        | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`reports <reports>`                                      | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`rootcheck <rootcheck>`                                  | manager, agent         |
+---------------------------------------------------------------+------------------------+
| :doc:`ruleset <rules>`                                        | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`syscheck <syscheck>`                                    | manager, agent         |
+---------------------------------------------------------------+------------------------+
| :doc:`syslog_output <syslog-output>`                          | manager                |
+---------------------------------------------------------------+------------------------+
| :doc:`wodle name="open-scap" <wodle-openscap>`                | manager, agent         |
+---------------------------------------------------------------+------------------------+

All of the above sections must be located within the top-level ``<ossec_config>`` tag.


.. toctree::
   :hidden:
   :maxdepth: 1


   active-response
   agentless
   alerts
   client
   commands
   database-output
   email_alerts
   global
   integration
   localfile
   remote
   reports
   rootcheck
   rules
   syscheck
   syslog-output
   wodle-openscap
   verifying-configuration
