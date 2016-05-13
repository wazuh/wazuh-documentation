.. _manual_integrator:

Integrator
==================================

.. versionadded:: v1.1

Integrator is a new daemon that allows to connect OSSEC to external APIs and
alerting tools, such Slack and PagerDuty.

Enabling Integrator
-------------------

Integrator is not enabled by default, but it can be enabled with the following
command: ::

    $ /var/ossec/bin/ossec-control enable integrator
    $ /var/ossec/bin/ossec-control restart

Configuration
-------------

Integrations are configured at file ``etc/ossec.conf``, which is located inside
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

Basic configuration
^^^^^^^^^^^^^^^^^^^

<name>
""""""

Name of the service. Allowed values:

- ``slack``
- ``pagerduty``

<hook_url>
""""""""""

The URL provided by Slack when the integration was enabled. **Mandatory for 
Slack.**

<api_key>
"""""""""

Key got from the PagerDuty API. **Mandatory for PagerDuty.**

.. note:: You must restart OSSEC after changing the configuration.

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

Optional filters
^^^^^^^^^^^^^^^^

<level>
"""""""

Filter rules by level: push only alerts with the specified level or above.

<rule_id>
"""""""""

Filter by rule ID.

<group>
"""""""

Filter rules by category. `OS_Regex Syntax`_.

<event_location>
""""""""""""""""

Filter rules by location where they were originated. `OS_Regex Syntax`_

.. _`OS_Regex Syntax`: http://ossec-docs.readthedocs.org/en/latest/syntax/regex.html