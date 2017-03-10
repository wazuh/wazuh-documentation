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
| `Active response <active-response-index.html>`_               | manager                |
+---------------------------------------------------------------+------------------------+
| `Agentless <agentless.html>`_                                 | manager                |
+---------------------------------------------------------------+------------------------+
| `Alerts <alerts.html>`_                                       | manager                |
+---------------------------------------------------------------+------------------------+
| `Client <client.html>`_                                       | agent                  |
+---------------------------------------------------------------+------------------------+
| `Database output <database-output.html>`_                     | manager                |
+---------------------------------------------------------------+------------------------+
| `Email alerts <email_alerts.html>`_                           | manager                |
+---------------------------------------------------------------+------------------------+
| `Global  <global.html>`_                                      | manager                |
+---------------------------------------------------------------+------------------------+
| `Integration  <integration.html>`_                            | manager                |
+---------------------------------------------------------------+------------------------+
| `Local file <localfile.html>`_                                | manager                |
+---------------------------------------------------------------+------------------------+
| `Remote <remote.html>`_                                       | manager                |
+---------------------------------------------------------------+------------------------+
| `Reports <reports.html>`_                                     | manager                |
+---------------------------------------------------------------+------------------------+
| `Rootcheck <rootcheck.html>`_                                 | manager, agent         |
+---------------------------------------------------------------+------------------------+
| `Ruleset <rules.html>`_                                       | manager                |
+---------------------------------------------------------------+------------------------+
| `Syscheck <syscheck.html>`_                                   | manager, agent         |
+---------------------------------------------------------------+------------------------+
| `Syslog output <syslog-output.html>`_                         | manager                |
+---------------------------------------------------------------+------------------------+
| :ref:`Wodle OpenSCAP <wodle_openscap>`                        | manager, agent         |
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
       verifying-configuration
