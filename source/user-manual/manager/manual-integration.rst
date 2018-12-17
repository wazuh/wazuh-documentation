.. Copyright (C) 2018 Wazuh, Inc.

.. _manual_integration:

Integration with external APIs
==============================

The **Integrator** daemon allows Wazuh to connect to external APIs and alerting tools such as Slack, PagerDuty and VirusTotal.

Configuration
-------------

The Integrator is not enabled by default, however, it can be enabled using the following command:

  .. code-block:: console

    # /var/ossec/bin/ossec-control enable integrator

After enabling it, restart the Wazuh manager:

  a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart

The integrations are configured on the ``ossec.conf`` file which is located inside the Wazuh installation folder (``/var/ossec/etc/``). To configure an integration, add the following configuration inside the *<ossec_config>* section:

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

Slack
-----

In order to make the Slack integration work, we need to install the ``python-requests`` package:

  a) For RPM systems:

  .. code-block:: console

    # yum install python-requests

  b) For Debian systems:

  .. code-block:: console

    # apt-get install python-requests

  c) Using the Python `pip` tool:

  .. code-block:: console

    # pip install requests

This is an example configuration for the Slack integration:

.. code-block:: xml

  <integration>
    <name>slack</name>
    <hook_url>https://hooks.slack.com/services/...</hook_url>
    <alert_format>json</alert_format>
  </integration>

PagerDuty
---------

`PagerDuty <https://www.pagerduty.com/>`_ is a SaaS incident response platform suitable for IT departments. This integration allows to create a service using its official API in order to receive Wazuh alerts on the Incidents Dashboard.

This is an example configuration for the PagerDuty integration:

.. code-block:: xml

  <integration>
    <name>pagerduty</name>
    <api_key>PAGERDUTY_API_KEY</api_key>
  </integration>

As seen on the screenshot below, alerts start coming into the dashboard:

.. thumbnail:: ../../images/manual/integration/pagerduty.png
  :title: PagerDuty Incidents Dashboard
  :align: center
  :width: 80%

VirusTotal
----------

.. versionadded:: 3.0.0

This integration allows the inspection of malicious files using the VirusTotal database. Find more information about this at the :ref:`VirusTotal integration <virustotal-scan>` page.

This is an example configuration for the VirusTotal integration:

.. code-block:: xml

  <integration>
    <name>virustotal</name>
    <api_key>VIRUSTOTAL_API_KEY</api_key>
    <group>syscheck,</group>
  </integration>
