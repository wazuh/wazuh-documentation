.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_integration:

integration
===========

.. topic:: XML section name

  .. code-block:: xml

    <integration>
    </integration>

This configures the manager to :ref:`connect Wazuh to external APIs <manual_integration>` and alerting tools such as Slack, PagerDuty and VirusTotal.

Options
-------

- `name`_
- `hook_url`_
- `api_key`_
- `level`_
- `rule_id`_
- `group`_
- `event_location`_
- `alert_format`_
- `max_log`_

name
^^^^

This indicates the service to integrate with.

+--------------------+------------------------------+
| **Default value**  | n/a                          |
+--------------------+------------------------------+
| **Allowed values** | slack, pagerduty, virustotal |
+--------------------+------------------------------+

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

+--------------------+---------------------------------------------------------------------------+
| **Default value**  | n/a                                                                       |
+--------------------+---------------------------------------------------------------------------+
| **Allowed values** | Any rule group is allowed. Multiple groups should be separated with comma |
+--------------------+---------------------------------------------------------------------------+

event_location
^^^^^^^^^^^^^^

This filters alerts by where the event originated. Follows the `OS_Regex Syntax`_.

.. _`OS_Regex Syntax`: http://ossec-docs.readthedocs.org/en/latest/syntax/regex.html

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
  </integration>

  <!-- Integration with PagerDuty -->
  <integration>
    <name>pagerduty</name>
    <api_key>API_KEY</api_key> <!-- Replace with your PagerDuty API key -->
  </integration>

  <!-- Integration with VirusTotal -->
  <integration>
    <name>virustotal</name>
    <api_key>API_KEY</api_key> <!-- Replace with your VirusTotal API key -->
    <group>syscheck</group>
    <alert_format>json</alert_format>
  </integration>
