.. _reference_ossec_conf:

Main configuration
===================

Introducction
^^^^^^^^^^^^^^^
``ossec.conf`` is the main configuration file to all the capabilities. It is located at ``/var/ossec/etc/ossec.conf``. It's a good a idea to backup your info before configure ossec.conf, because the file could become corrupt if improperly modified. It's essential for Wazuh to function properly.

ossec.conf
^^^^^^^^^^^
XML excerpt to show location for *alerts* section:

.. code-block:: xml

    <ossec_config>
        <alerts>
            <!--
            alerts options here
            -->
        </alerts>
    </ossec_config>

+---------------------------------------------------------------+------------------------+
| Sections                                                      | Supported installations|
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

All previous sections must be configured within the ``<ossec_config>`` tag.

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
       localfile
       remote
       reports
       rootcheck
       rules
       syscheck
       syslog-output
       wodle-openscap
