.. Copyright (C) 2020 Wazuh, Inc.

.. _manual_integration:

Integration with external APIs
==============================

The **Integrator** daemon allows Wazuh to connect to external APIs and alerting tools such as Slack, PagerDuty and VirusTotal.

Configuration
-------------

The integrations are configured on the Wazuh manager's ``ossec.conf`` file which is located inside the Wazuh installation folder (``/var/ossec/etc/``). To configure an integration, add the following configuration inside the *<ossec_config>* section:

.. code-block:: xml

  <integration>
    <name> </name>
    <hook_url> </hook_url> <!-- Required for Slack -->
    <api_key> </api_key> <!-- Required for PagerDuty and VirusTotal -->

    <!-- Optional filters -->
    <rule_id> </rule_id>
    <level> </level>
    <group> </group>
    <event_location> </event_location>
  </integration>

After enabling the daemon and configure the integrations, restart the Wazuh manager to apply the changes:

a. For Systemd:

.. code-block:: console

  # systemctl restart wazuh-manager

b. For SysV Init:

.. code-block:: console

  # service wazuh-manager restart

The full configuration reference for the Integrator daemon can be found :ref:`here <reference_ossec_integration>`.

Slack
-----

This integration allows to receive alerts into a Slack channel thanks to the `Incoming Webhooks <https://api.slack.com/incoming-webhooks>`_, a simple way to post messages from 3rd-party apps (in this case, Wazuh).

This is an example configuration for the Slack integration:

.. code-block:: xml

  <integration>
    <name>slack</name>
    <hook_url>https://hooks.slack.com/services/...</hook_url> <!-- Replace with your Slack hook URL -->
    <alert_format>json</alert_format>
  </integration>

PagerDuty
---------

`PagerDuty <https://www.pagerduty.com/>`_ is a SaaS incident response platform suitable for IT departments. This integration allows to create a service using its official API in order to receive Wazuh alerts on the Incidents Dashboard.

This is an example configuration for the PagerDuty integration:

.. code-block:: xml

  <integration>
    <name>pagerduty</name>
    <api_key>API_KEY</api_key> <!-- Replace with your PagerDuty API key -->
  </integration>

As seen on the screenshot below, alerts start coming into the dashboard:

.. thumbnail:: ../../images/manual/integration/pagerduty.png
  :title: PagerDuty Incidents Dashboard
  :align: center
  :width: 80%

VirusTotal
----------

This integration allows the inspection of malicious files using the VirusTotal database. Find more information about this at the :ref:`VirusTotal integration <virustotal-scan>` page.

This is an example configuration for the VirusTotal integration:

.. code-block:: xml

  <integration>
    <name>virustotal</name>
    <api_key>API_KEY</api_key> <!-- Replace with your VirusTotal API key -->
    <group>syscheck</group>
    <alert_format>json</alert_format>
  </integration>

Custom integration
------------------

Integrator tool is able to connect wazuh with other external software. Read the `How to integrate external software using Integrator <https://wazuh.com/blog/how-to-integrate-external-software-using-integrator//>`_ document for more information.

This is an example configuration for a custom integration:

.. code-block:: xml

  <!--Custom external Integration -->
  <integration>
    <name>custom-integration</name>
    <hook_url>WEBHOOK</hook_url>
    <level>10</level>
    <group>multiple_drops|authentication_failures</group>
    <api_key>APIKEY</api_key> <!-- Replace with your external service API key -->
    <alert_format>json</alert_format>
  </integration>
