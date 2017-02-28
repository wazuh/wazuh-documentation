.. _reference_ossec_conf:

Main configuration
===================

Introducction
^^^^^^^^^^^^^^^
The ``ossec.conf`` file is the main configuration file on the Wazuh manager, and it also plays a role on the agents. It is located at ``/var/ossec/etc/ossec.conf``. It is recommended you back up this file before making changes to it, as an error in the configuration can completely prevent Wazuh services from starting up.

ossec.conf
^^^^^^^^^^^
The ``ossec.conf`` file is in XML format, and all configuration options are nested in their appropriate section of the file.  In this file, the outermost XML tag is <ossec_config>.  For example, here is an example of the proper location of the *alerts* configuration section:

.. code-block:: xml

    <ossec_config>
        <alerts>
            <!--
            alerts options here
            -->
        </alerts>
    </ossec_config>
    
agent.conf
^^^^^^^^^^^
The ``agent.conf`` file is very similar to ``ossec.conf`` except that it is used to centrally distribute configuration information to agents.  See more `here <../centralized-agent-configuration.html>`_.

Installation types
^^^^^^^^^^^^^^^^^^^^^^
Wazuh can be installed in three possible ways.  The Wazuh manager uses the "server" installation type.  Agents use the "agent" installation type.  The 3rd type is local, which basically sets up a single system as a self-managing agent, but that is a rather limited way to use Wazuh in most corporate environments.

+---------------------------------------------------------------+------------------------+
| Configuration Sections                                        | Supported installations|
+===============================================================+========================+
| `Active response <active-response-index.html>`_               | server, local          |
+---------------------------------------------------------------+------------------------+
| `Agentless <agentless.html>`_                                 | server, local          |
+---------------------------------------------------------------+------------------------+
| `Alerts <alerts.html>`_                                       | server, local          |
+---------------------------------------------------------------+------------------------+
| `Client <client.html>`_                                       | agent                  |
+---------------------------------------------------------------+------------------------+
| `Database output <database-output.html>`_                     | server, local          |
+---------------------------------------------------------------+------------------------+
| `Email alerts <email_alerts.html>`_                           | server, local          |
+---------------------------------------------------------------+------------------------+
| `Global  <global.html>`_                                      | server, local          |
+---------------------------------------------------------------+------------------------+
| `Integration  <integration.html>`_                            | server, local          |
+---------------------------------------------------------------+------------------------+
| `Local file <localfile.html>`_                                | server, local          |
+---------------------------------------------------------------+------------------------+
| `Remote <remote.html>`_                                       | server                 |
+---------------------------------------------------------------+------------------------+
| `Reports <reports.html>`_                                     | server, local          |
+---------------------------------------------------------------+------------------------+
| `Rootcheck <rootcheck.html>`_                                 | server, local, agent   |
+---------------------------------------------------------------+------------------------+
| `Ruleset <rules.html>`_                                       | server, local          |
+---------------------------------------------------------------+------------------------+
| `Syscheck <syscheck.html>`_                                   | server, local, agent   |
+---------------------------------------------------------------+------------------------+
| `Syslog output <syslog-output.html>`_                         | server, local          |
+---------------------------------------------------------------+------------------------+
| :ref:`Wodle OpenSCAP <wodle_openscap>`                        | server, local, agent   |
+---------------------------------------------------------------+------------------------+

All of the above sections must be located within the top-level ``<ossec_config>`` tag.

.. topic:: Sections

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
