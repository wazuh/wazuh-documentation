.. _manual_integration:

Integration with external APIs
==================================

Integrator is a new daemon that allows to connect Wazuh to external APIs and
alerting tools, such Slack and PagerDuty.

Enabling Integrator
-------------------

Integrator is not enabled by default, but it can be enabled with the following
command: ::

    $ /var/ossec/bin/ossec-control enable integrator
    $ /var/ossec/bin/ossec-control restart

Configuration
-------------

Integrations are configured in the file ``etc/ossec.conf``, which is located inside
your OSSEC installation directory. Add inside *<ossec_config></ossec_config>* tags your integration like this:
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



Integrating with Slack
^^^^^^^^^^^^^^^^^^^^^^

::

    <integration>
      <name>slack</name>
      <hook_url>https://hooks.slack.com/services/...</hook_url>
    </integration>

Integrating with PagerDuty
^^^^^^^^^^^^^^^^^^^^^^^^^^

::

    <integration>
      <name>pagerduty</name>
      <api_key>MYKEY</api_key>
    </integration>
