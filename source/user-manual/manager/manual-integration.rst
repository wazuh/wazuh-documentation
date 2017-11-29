.. _manual_integration:

Integration with external APIs
==================================

Integrator is a new daemon that allows the connection of Wazuh to external APIs and alerting tools such as Slack and PagerDuty.

.. versionadded:: 3.0.0

For Wazuh 3.0 it has been developed a new integration that allows to inspect malicious files using the VirusTotal database.

The complete documentation about this new feature can be found at the :doc:`VirusTotal integration section<../capabilities/virustotal-scan/index>`.

Configuration
-------------------

Integrator is not enabled by default.  Integrator is enabled using the following command:

.. code-block:: console

    # /var/ossec/bin/ossec-control enable integrator
    # /var/ossec/bin/ossec-control restart


Integrations are configured in the file ``etc/ossec.conf``, which is located inside your Wazuh installation directory. Add the following inside *<ossec_config> </ossec_config>* to configure this integration:

.. code-block:: xml

    <integration>
         <name> </name>
         <hook_url> </hook_url>
         <api_key> </api_key>

      <!-- Optional filters -->

         <rule_id> </rule_id>
         <level> </level>
         <group> </group>
         <event_location> </event_location>
    </integration>

Integration with Slack
----------------------

.. code-block:: xml

    <integration>
      <name>slack</name>
      <hook_url>https://hooks.slack.com/services/...</hook_url>
    </integration>


Integration with PagerDuty
---------------------------

.. code-block:: xml

    <integration>
      <name>pagerduty</name>
      <api_key>MYKEY</api_key>
    </integration>


Integration with VirusTotal
----------------------------

.. code-block:: xml

    <integration>
      <name>virustotal</name>
      <api_key>VirusTotal_API_Key</api_key>
      <group>syscheck,</group>
    </integration>
