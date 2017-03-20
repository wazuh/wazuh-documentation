.. _reference_ossec_conf:

Main configuration
===================

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

The ``agent.conf`` file is very similar to ``ossec.conf`` except that it is used to centrally distribute configuration information to agents. See more `here <../centralized-agent-configuration.html>`_.

Wazuh can be installed in two possible ways: the Wazuh manager uses the "server/manager" installation type and agents use the "agent" installation type.

+---------------------------------------------------------------+------------------------+
| Configuration sections                                        | Supported installations|
+===============================================================+========================+
| `active-response <active-response-index.html>`_               | manager                |
+---------------------------------------------------------------+------------------------+
| `agentless <agentless.html>`_                                 | manager                |
+---------------------------------------------------------------+------------------------+
| `alerts <alerts.html>`_                                       | manager                |
+---------------------------------------------------------------+------------------------+
| `client <client.html>`_                                       | agent                  |
+---------------------------------------------------------------+------------------------+
| `database_output <database-output.html>`_                     | manager                |
+---------------------------------------------------------------+------------------------+
| `email_alerts <email_alerts.html>`_                           | manager                |
+---------------------------------------------------------------+------------------------+
| `global  <global.html>`_                                      | manager                |
+---------------------------------------------------------------+------------------------+
| `integration  <integration.html>`_                            | manager                |
+---------------------------------------------------------------+------------------------+
| `localfile <localfile.html>`_                                 | manager                |
+---------------------------------------------------------------+------------------------+
| `remote <remote.html>`_                                       | manager                |
+---------------------------------------------------------------+------------------------+
| `reports <reports.html>`_                                     | manager                |
+---------------------------------------------------------------+------------------------+
| `rootcheck <rootcheck.html>`_                                 | manager, agent         |
+---------------------------------------------------------------+------------------------+
| `ruleset <rules.html>`_                                       | manager                |
+---------------------------------------------------------------+------------------------+
| `syscheck <syscheck.html>`_                                   | manager, agent         |
+---------------------------------------------------------------+------------------------+
| `syslog_output <syslog-output.html>`_                         | manager                |
+---------------------------------------------------------------+------------------------+
| `wodle name="open-scap" <wodle-openscap.html>`_               | manager, agent         |
+---------------------------------------------------------------+------------------------+

All of the above sections must be located within the top-level ``<ossec_config>`` tag.

.. topic:: Configuration sections

    .. toctree::
       :maxdepth: 1


       active-response-index
       agentless
       alerts
       client
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
