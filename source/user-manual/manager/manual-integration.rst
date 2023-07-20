.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the Integrator daemon, which allows Wazuh to connect to external APIs, as well as alerting tools such as Slack, PagerDuty, VirusTotal, and Shuffle.
  
.. _manual_integration:

Integration with external APIs
==============================

The *Integrator* daemon allows Wazuh to connect to external APIs and alerting tools such as Slack, PagerDuty, VirusTotal, Shuffle and Maltiverse.

Configuration
-------------

The integrations are configured on the Wazuh manager ``ossec.conf`` file. You can find this file in the Wazuh installation folder ``/var/ossec/etc/``. To configure an integration, add the following configuration within the ``<ossec_config>`` section:

.. code-block:: xml

  <integration>
    <name> </name>
    <hook_url> </hook_url> <!-- Required for Slack, Shuffle and Maltiverse -->
    <api_key> </api_key> <!-- Required for PagerDuty, VirusTotal and Maltiverse -->
    <alert_format>json</alert_format> <!-- Required for Slack, VirusTotal, Shuffle and Maltiverse -->

    <!-- Optional filters -->
    <rule_id> </rule_id>
    <level> </level>
    <group> </group>
    <event_location> </event_location>
  </integration>


After enabling the daemon and configuring the integrations, restart the Wazuh manager to apply the changes:

.. include:: /_templates/common/restart_manager.rst


Optional filters
^^^^^^^^^^^^^^^^

The `Integrator` daemon uses the `optional filters` fields to determine which alerts should be sent to the external platforms. Only the alerts that meet the filter conditions are sent. If no filters are specified, all alerts are sent.

The following considerations must be taken into account when the filters are set:
   
   - It is possible to specify multiple group names using the ``<group>`` field with a comma-separated list. If the alert's group matches any of the groups in the list, the alert is sent. Otherwise, it is ignored.
   - It is possible to specify multiple rule IDs using the ``<rule_id>`` field with a comma-separated list. If the alert's rule ID matches any of the IDs in the list, the alert is sent. Otherwise, it is ignored.
   - It is possible to specify the previously described fields together. If both the alert's rule ID and group match any of the IDs and groups in the lists, the alert is sent. Otherwise, it is ignored.

.. note::
  It is recommended to carefully check the groups and rule identifiers mentioned above, as defining them incorrectly will result in expected alerts not being sent to the integration.

The full configuration reference for the Integrator daemon can be found :ref:`here <reference_ossec_integration>`.

Slack
-----

This integration uses Slack Incoming Webhooks and allows posting Wazuh alerts into a Slack channel.

To set up this integration, follow these steps.

#. Enable Incoming Webhooks and create one for your Slack channel. Follow the Slack guide on `Incoming Webhooks <https://api.slack.com/messaging/webhooks>`__ for this.

#. Edit ``/var/ossec/etc/ossec.conf`` in the Wazuh server and include a configuration block such as the following. Replace ``WEBHOOK_URL`` with your Incoming Webhook URL.

   .. code-block:: xml

     <integration>
       <name>slack</name>
       <hook_url>WEBHOOK_URL</hook_url> <!-- Replace with your Slack hook URL -->
       <alert_format>json</alert_format>
     </integration>

#. Restart the Wazuh manager to apply the changes.

   .. include:: /_templates/common/restart_manager.rst

Once the configuration is complete, alerts start showing in the selected channel.

.. thumbnail:: /images/manual/integration/slack.png
  :title: Alerts in Slack channel
  :alt: Alerts in Slack channel
  :align: center
  :width: 50%

PagerDuty
---------

`PagerDuty <https://www.pagerduty.com/>`_ is a SaaS incident response platform suitable for IT departments. The Pagerduty integration uses the Pagerduty API to forward Wazuh alerts to its Incidents Dashboard.

To set up this integration, do the following.

#. Get your own *Events API v2* integration key by creating a `Pagerduty new service <https://support.pagerduty.com/docs/services-and-integrations#create-a-service>`__.

#. Edit ``/var/ossec/etc/ossec.conf`` in the Wazuh server and include a configuration block such as the following. Replace ``API_KEY`` with your Pagerduty integration key. The rule level filter is optional and you can remove it or set another level value for the integration.

   .. code-block:: xml
      :emphasize-lines: 3

      <integration>
        <name>pagerduty</name>
        <api_key>API_KEY</api_key> <!-- Replace with your PagerDuty API key -->
        <level>10</level>
      </integration>

#. Restart the Wazuh manager to apply the changes.

   .. include:: /_templates/common/restart_manager.rst

Once the configuration is complete, alerts start showing on the Pagerduty dashboard.

.. thumbnail:: /images/manual/integration/pagerduty.png
   :title: Wazuh alert in the PagerDuty Incidents dashboard
   :alt: Wazuh alert in the PagerDuty Incidents dashboard
   :align: center
   :width: 80%

VirusTotal
----------

This integration allows the inspection of malicious files using the VirusTotal database. Find more information about this on the :doc:`VirusTotal integration </user-manual/capabilities/malware-detection/virus-total-integration>` page.

To set up this integration, follow these steps.

#. Get your API key from the `Virustotal API key <https://www.virustotal.com/gui/my-apikey>`__ page.

#. Edit ``/var/ossec/etc/ossec.conf`` in the Wazuh server and include a configuration block such as the following. Replace ``API_KEY`` with your Virustotal API key.

   .. code-block:: xml
      :emphasize-lines: 3
  
      <integration>
        <name>virustotal</name>
        <api_key>API_KEY</api_key> <!-- Replace with your VirusTotal API key -->
        <group>syscheck</group>
        <alert_format>json</alert_format>
      </integration>

#. Restart the Wazuh manager to apply the changes.

   .. include:: /_templates/common/restart_manager.rst

Shuffle
-------

`Shuffle <https://shuffler.io/>`__ is an Open Source interpretation of SOAR. It transfers data throughout the enterprise with plug-and-play Apps. The Shuffle integration allows forwarding Wazuh alerts into a Shuffle Workflow using a `webhook <https://shuffler.io/docs/triggers#webhook>`__.

To set up this integration, do the following.

#. Go to Shuffle and make a Workflow.

#. Set **Recipients** and **Subject** in the email configuration. Put ``$exec`` in the **Body** to include the alert information.

#. Add a webhook to the Workflow.

#. Start the webhook and copy the webhook URL.

#. Edit ``/var/ossec/etc/ossec.conf`` in the Wazuh server and include a configuration block such as the following. Replace ``https://shuffler.io/api/v1/hooks/webhook_WEBHOOK_ID`` with the webhook URL. The rule level filter is optional. You can remove it or set another level value for the integration.

   .. code-block:: xml
      :emphasize-lines: 3

      <integration>
         <name>shuffle</name>
         <hook_url>https://shuffler.io/api/v1/hooks/webhook_WEBHOOK_ID</hook_url> <!-- Replace with your Shuffle hook URL -->
         <level>3</level>
         <alert_format>json</alert_format>
      </integration>

#. Restart the Wazuh manager to apply the changes.

   .. include:: /_templates/common/restart_manager.rst

Once the configuration is complete, alerts start showing in the email inbox.

.. thumbnail:: /images/manual/integration/shuffle.png
   :title: Shuffle email alert
   :alt: Shuffle email alert
   :align: center
   :width: 80%

Maltiverse
----------

`Maltiverse <https://whatis.maltiverse.com/>`__ is an open and collaborative platform for indexing and searching Indicators of Compromise (IoCs) which works as a broker for Threat intelligence sources that are aggregated from more than a hundred different public, private and community sources. This integration enriches any alert generated by Wazuh via the Maltiverse API, inserting new fields in case of match and following the threat taxonomy of the ECS standard (Elastic Common Schema).

To set up this integration, do the following.

#. Get your API key from the `Maltiverse <https://www.maltiverse.com>`__ page.

#. Edit ``/var/ossec/etc/ossec.conf`` in the Wazuh server and include a configuration block such as the following. Replace ``API_KEY`` with your Maltiverse API key. The rule level filter is optional. You can remove it or set another level value for the integration.

   .. code-block:: xml
      :emphasize-lines: 3

      <integration>
         <name>custom-maltiverse</name>
         <hook_url>https://api.maltiverse.com</hook_url>
         <level>3</level>
         <api_key>API_KEY</api_key> <!-- Replace with your Maltiverse API key --> 
         <alert_format>json</alert_format>
      </integration>

#. Restart the Wazuh manager to apply the changes.

   .. include:: /_templates/common/restart_manager.rst

Once the configuration is complete, if any alerts contain fields matching any IoC, these will be enriched and displayed in the Wazuh Dashboard.

.. thumbnail:: /images/manual/integration/maltiverse.png
   :title: Maltiverse alert
   :alt: Maltiverse alert
   :align: center
   :width: 80%


Custom integration
------------------

The integrator tool is able to connect Wazuh with other external software. Read the `How to integrate external software using Integrator <https://wazuh.com/blog/how-to-integrate-external-software-using-integrator//>`_ document for more information.

Below, you can find an example of a configuration block in the ``ossec.conf`` file for custom integration.

.. code-block:: xml

  <!--Custom external Integration -->
  <integration>
    <name>custom-integration</name>
    <hook_url>WEBHOOK</hook_url>
    <level>10</level>
    <group>multiple_drops,authentication_failures</group>
    <api_key>APIKEY</api_key> <!-- Replace with your external service API key -->
    <alert_format>json</alert_format>
  </integration>
