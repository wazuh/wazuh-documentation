.. _manual_integration:

Integration with external APIs
==================================

Integrator is a new daemon that allows the connection of Wazuh to external APIs and alerting tools such as Slack and PagerDuty.

Configuration
-------------------

Integrator is not enabled by default.  Integrator is enabled using the following command:
::

    $ /var/ossec/bin/ossec-control enable integrator
    $ /var/ossec/bin/ossec-control restart


Integrations are configured in the file ``etc/ossec.conf``, which is located inside your Wazuh installation directory. Add the following inside *<ossec_config> </ossec_config>* to configure this integration:
::

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

::

    <integration>
      <name>slack</name>
      <hook_url>https://hooks.slack.com/services/...</hook_url>
    </integration>

Integratiion with PagerDuty
---------------------------

::

    <integration>
      <name>pagerduty</name>
      <api_key>MYKEY</api_key>
    </integration>
