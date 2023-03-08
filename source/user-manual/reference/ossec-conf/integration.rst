.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_ossec_integration:

integration
===========

.. topic:: XML section name

  .. code-block:: xml

    <integration>
    </integration>

This configures the manager to :ref:`connect Wazuh to external APIs <manual_integration>` and alerting tools such as Slack, PagerDuty and VirusTotal.

Customizable options
--------------------

- `name`_
- `hook_url`_
- `api_key`_
- `level`_
- `rule_id`_
- `group`_
- `event_location`_
- `alert_format`_
- `max_log`_
- `options`_

name
^^^^

This indicates the service to integrate with.

+--------------------+---------------------------------------------------------------------+
| **Default value**  | n/a                                                                 |
+--------------------+---------------------------------------------------------------------+
| **Allowed values** | slack, pagerduty, virustotal, any string that begins with 'custom-' |
+--------------------+---------------------------------------------------------------------+

.. note::
  In the case of custom external integration, name must begin with ``custom-`` for example: ``custom-myintegration``. Read the `How to integrate external software using Integrator <https://wazuh.com/blog/how-to-integrate-external-software-using-integrator//>`_ document for more information.

hook_url
^^^^^^^^

This is the URL provided by Slack when integration is enabled on the Slack side. This is **mandatory for Slack.**

+--------------------+-----------+
| **Default value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | Slack URL |
+--------------------+-----------+

api_key
^^^^^^^

This is the key that you would have retrieved from the PagerDuty or VirusTotal API. This is **mandatory for PagerDuty and VirusTotal.**

+--------------------+------------------------------+
| **Default value**  | n/a                          |
+--------------------+------------------------------+
| **Allowed values** | PagerDuty/VirusTotal Api key |
+--------------------+------------------------------+

Optional filters
----------------

level
^^^^^

This filters alerts by rule level so that only alerts with the specified level or above are pushed.

+--------------------+------------------------------+
| **Default value**  | n/a                          |
+--------------------+------------------------------+
| **Allowed values** | Any alert level from 0 to 16 |
+--------------------+------------------------------+

rule_id
^^^^^^^

This filters alerts by rule ID.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Comma-separated rule IDs |
+--------------------+--------------------------+

group
^^^^^

This filters alerts by rule group. For the VirusTotal integration, only rules from the `syscheck` group are available.

+--------------------+-------------------------------------------------+
| **Default value**  | n/a                                             |
+--------------------+-------------------------------------------------+
| **Allowed values** | Any rule group or comma-separated rule groups.  |
+--------------------+-------------------------------------------------+

event_location
^^^^^^^^^^^^^^

This filters alerts by where the event originated. Follows the :ref:`OS_Regex Syntax<os_regex_syntax>`.

+--------------------+-----------------------------------------------------------+
| **Default value**  | n/a                                                       |
+--------------------+-----------------------------------------------------------+
| **Allowed values** | Any single log file.                                      |
+--------------------+-----------------------------------------------------------+

alert_format
^^^^^^^^^^^^

This writes the alert file in the JSON format. The Integrator makes use this file to fetch fields values.

+--------------------+-----------------------------------------------------------+
| **Default value**  | n/a                                                       |
+--------------------+-----------------------------------------------------------+
| **Allowed values** | json                                                      |
+--------------------+-----------------------------------------------------------+

max_log
^^^^^^^

The maximum length of an alert snippet that will be sent to the Integrator.  Longer strings will be truncated with ``...``

+--------------------+-----------------------------------------------------------+
| **Default value**  | 165                                                       |
+--------------------+-----------------------------------------------------------+
| **Allowed values** | Any integer from 165 to 1024 inclusive.                   |
+--------------------+-----------------------------------------------------------+

options
^^^^^^^

This overwrites the previous fields or adds customizable fields according to the information provided in the JSON object.

+--------------------+-----------------------------------------------------------+
| **Default value**  | n/a                                                       |
+--------------------+-----------------------------------------------------------+
| **Allowed values** | json                                                      |
+--------------------+-----------------------------------------------------------+

Configuration example
---------------------

.. code-block:: xml

  <!-- Integration with Slack -->
  <integration>
    <name>slack</name>
    <hook_url>https://hooks.slack.com/services/...</hook_url> <!-- Replace with your Slack hook URL -->
    <level>10</level>
    <group>multiple_drops|authentication_failures</group>
    <alert_format>json</alert_format>
    <options>json</options>
  </integration>

  <!-- Integration with PagerDuty -->
  <integration>
    <name>pagerduty</name>
    <api_key>API_KEY</api_key> <!-- Replace with your PagerDuty API key -->
    <options>JSON</options> <!-- Replace with your JSON object -->
  </integration>

  <!-- Integration with VirusTotal -->
  <integration>
    <name>virustotal</name>
    <api_key>API_KEY</api_key> <!-- Replace with your VirusTotal API key -->
    <group>syscheck</group>
    <alert_format>json</alert_format>
    <options>JSON</options> <!-- Replace with your JSON object -->
  </integration>

  <!--Custom external Integration -->
  <integration>
    <name>custom-integration</name>
    <hook_url>WEBHOOK</hook_url>
    <level>10</level>
    <group>multiple_drops|authentication_failures</group>
    <api_key>APIKEY</api_key> <!-- Replace with your external service API key -->
    <alert_format>json</alert_format>
    <options>JSON</options> <!-- Replace with your JSON object -->
  </integration>