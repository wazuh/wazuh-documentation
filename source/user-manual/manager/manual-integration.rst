.. Copyright (C) 2018 Wazuh, Inc.

.. _manual_integration:

Integration with external APIs
==============================

The **Integrator** is a new daemon that allows Wazuh to connect to external APIs and alerting tools such as Slack and PagerDuty.

.. versionadded:: 3.0.0

A new integration has been developed in Wazuh 3.0 that allows for the inspection of malicious files using the VirusTotal database.

The complete documentation of this new feature can be found at the :doc:`VirusTotal integration section<../capabilities/virustotal-scan/index>`.

Configuration
-------------

The Integrator is not enabled by default, however, it can be enabled using the following command:

.. code-block:: console

    # /var/ossec/bin/ossec-control enable integrator
    # /var/ossec/bin/ossec-control restart


Integrations are configured in the ``etc/ossec.conf`` file which is located inside your Wazuh installation directory.  Add the following information inside *<ossec_config> </ossec_config>* to configure integration:

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

.. code-block:: xml

    <integration>
      <name>slack</name>
      <hook_url>https://hooks.slack.com/services/...</hook_url>
      <alert_format>json</alert_format>
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
