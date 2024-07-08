.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Integrator module allows Wazuh to connect to external APIs and alerting tools. Learn more in this section of the documentation.

Integration with external APIs
==============================

The Wazuh Integrator module allows Wazuh to connect to external APIs and alerting tools such as `Slack`_, `PagerDuty`_, `VirusTotal`_, `Shuffle`_, and `Maltiverse`_. You can also configure the Integrator module to connect to other software. These integrations empower security administrators to enhance orchestration, automate responses, and fortify their defenses against cyber threats.

Configuration
-------------

To configure an integration, add the following configuration within the ``<ossec_config>`` in the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server:

.. code-block:: xml

   <integration>
     <name> </name>
     <hook_url> </hook_url> <!-- Required for Slack, Shuffle, and Maltiverse -->
     <api_key> </api_key> <!-- Required for PagerDuty, VirusTotal, and Maltiverse -->
     <alert_format>json</alert_format> <!-- Required for Slack, PagerDuty, VirusTotal, Shuffle, and Maltiverse -->

     <!-- Optional filters -->
     <rule_id> </rule_id>
     <level> </level>
     <group> </group>
     <event_location> </event_location>
     <options> </options>
   </integration>

Where:

-  ``<name>`` indicates the name of the service to integrate with. The allowed values are ``slack``, ``pagerduty``, ``virustotal``, ``shuffle``, ``maltiverse``. For custom integrations, the name must be any string that begins with ``custom-``.
-  ``<hook_url>`` is the URL that is used for communication with the software being integrated. It's mandatory for the Slack, Shuffle, and Maltiverse integrations.
-  ``<api_key>`` is the key you would have retrieved from the PagerDuty, VirusTotal, or Maltiverse API. This is mandatory for PagerDuty, VirusTotal, and Maltiverse.
-  ``<alert_format>`` writes the alert file in the JSON format. The Integrator module makes use of this alert file to fetch field values. The allowed value is ``json``.
-  ``<rule_id>`` filters alerts by rule ID. The allowed values are comma-separated rule IDs.
-  ``<level>`` filters alerts by rule level so only alerts with the specified level or above are pushed. The allowed value is any alert level from ``0`` to ``16``.
-  ``<group>`` filters alerts by rule group. For the VirusTotal integration, only rules from the syscheck group are available. The allowed values are any rule group or comma-separated rule groups.
-  ``<event_location>`` filters alerts by where the event originated. The allowed value is any sregex expression.
-  ``<options>`` overwrites the previous fields or adds customization fields according to the information provided in the JSON object. The allowed value is json.

.. note::

   Restart the Wazuh manager when you make any changes to the configuration file. This will ensure that the changes take effect.

Restart the Wazuh manager via the command line interface with the following command:

.. include:: /_templates/common/restart_manager.rst

Optional filters
^^^^^^^^^^^^^^^^

The Wazuh Integrator module uses the optional filters fields to determine which alerts should be sent to the external platforms. Only the alerts that meet the filter conditions are sent. If no filters are specified, all alerts are sent.

The following considerations must be taken into account when the filters are set:

-  It is possible to specify multiple group names using the ``<group>`` tag with a comma-separated list. If the alert's group matches any of the groups in the list, the alert is sent, otherwise, it is ignored.
-  It is possible to specify multiple rule IDs using the ``<rule_id>`` tag with a comma-separated list. The alert is sent if the alert's rule ID matches any of the IDs in the list, otherwise, it is ignored.
-  It is possible to specify the previously described fields together. The alert is sent if both the alert's rule ID and group match any of the IDs and groups in the lists, otherwise, it is ignored.

.. note::

   It is recommended to carefully check the groups and rule identifiers mentioned above, as defining them incorrectly will result in expected alerts not being sent to the integration.

You can find the full configuration options for the Integrator module in the :doc:`integration </user-manual/reference/ossec-conf/integration>` section of the reference guide.

.. _slack_integration:

Slack
-----

Slack is a cloud-based collaboration platform that facilitates communication and teamwork within organizations. This integration uses Slack incoming webhooks and allows security professionals to receive real-time alerts directly within designated channels.

To set up this integration, perform the following steps:

#. Enable incoming webhooks and create one for your Slack channel. Follow the Slack guide on `incoming webhooks <https://api.slack.com/messaging/webhooks>`__ for this.

#. Append the configuration below to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server. Replace ``<WEBHOOK_URL>`` with your incoming webhook.

   .. code-block:: xml
      :emphasize-lines: 4

      <ossec_config>
        <integration>
          <name>slack</name>
          <hook_url><SLACK_WEBHOOK_URL></hook_url> <!-- Replace with your Slack hook URL -->
          <alert_format>json</alert_format>
        </integration>
      </ossec_config>

   .. note::

      You can set a JSON object with customization fields using the :ref:`options <integration_options_tag>` tag. Visit the `Slack API reference <https://api.slack.com/reference/messaging/attachments#legacy_fields>`__ for information about available customization fields.

#. Restart the Wazuh manager to apply the changes:

   .. include:: /_templates/common/restart_manager.rst

Once the configuration is complete, alerts start showing in the selected channel.

.. thumbnail:: /images/manual/wazuh-server/alerts-in-slack-channel.png
   :title: Alerts in selected Slack channel
   :alt: Alerts in selected Slack channel
   :align: center
   :width: 80%

.. _pagerduty_integration:

PagerDuty
---------

`PagerDuty <https://www.pagerduty.com/>`__ is a SaaS incident response platform suitable for IT departments. PagerDuty executes incident response workflows by escalating alerts to the right individuals or teams based on schedules and escalation policies. The PagerDuty integration uses the PagerDuty API to forward Wazuh alerts to its Incidents Dashboard.

To set up this integration, perform the following steps:

#. Get your Events API v2 integration key by creating a `PagerDuty new service <https://support.pagerduty.com/docs/services-and-integrations#create-a-service>`__.

#. Append the configuration below to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server. Replace ``PAGERDUTY_API_KEY`` with your PagerDuty integration key. The rule level filter is optional, and you can remove it or set another level value for the integration.

   .. code-block:: xml
      :emphasize-lines: 4

      <ossec_config>
        <integration>
          <name>pagerduty</name>
          <api_key><PAGERDUTY_API_KEY></api_key> <!-- Replace with your PagerDuty API key -->
          <level>10</level>
          <alert_format>json</alert_format> <!-- New mandatory parameter since v4.7.0 -->
        </integration>
      </ossec_config>

   .. note::

      You can set a JSON object with customization fields using the :ref:`options <integration_options_tag>` tag. Visit the `PagerDuty API reference <https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTgx-send-an-alert-event>`__ for information about available customization fields.

#. Restart the Wazuh manager to apply the changes:

   .. include:: /_templates/common/restart_manager.rst

Once the configuration is complete, alerts start showing on the Pagerduty dashboard.

.. thumbnail:: /images/manual/wazuh-server/alerts-in-pagerduty.png
   :title: Alerts in PagerDuty
   :alt: Alerts in PagerDuty
   :align: center
   :width: 80%

VirusTotal
----------

`VirusTotal <https://www.virustotal.com/gui/home/upload>`__ is an online service that analyzes files and URLs to detect viruses, worms, trojans, and other malicious content using antivirus engines and website scanners. This integration allows the inspection of malicious files using the VirusTotal database. Find more information about this on the :doc:`VirusTotal integration </user-manual/capabilities/malware-detection/virus-total-integration>` section.

To set up this integration, follow these steps:

#. Get your API key from the `VirusTotal API key <https://www.virustotal.com/gui/my-apikey>` page.

#. Edit ``/var/ossec/etc/ossec.conf`` in the Wazuh server and include a configuration block such as the following. Replace ``<VIRUSTOTAL_API_KEY>`` with your VirusTotal API key.

   .. code-block:: xml
      :emphasize-lines: 3

      <integration>
        <name>virustotal</name>
        <api_key><VIRUSTOTAL_API_KEY></api_key> <!-- Replace with your VirusTotal API key -->
        <group>syscheck</group>
        <alert_format>json</alert_format>
      </integration>

#. Restart the Wazuh manager to apply the changes:

   .. include:: /_templates/common/restart_manager.rst

Shuffle
-------

`Shuffle <https://shuffler.io/>`__ is an open source interpretation of SOAR. It transfers data throughout the enterprise with plug-and-play apps. The Shuffle integration allows forwarding Wazuh alerts into a Shuffle Workflow using a `webhook <https://shuffler.io/docs/triggers#webhook>`__.

To set up this integration, do the following:

#. Go to Shuffle, make a Workflow using the Email app, and select the version.

#. Set **Recipients** and **Subject** in the email configuration. Put ``$exec`` in the Body to include the alert information.

#. Add a webhook to the Workflow.

#. Start the webhook and copy the webhook URL.

#. Edit ``/var/ossec/etc/ossec.conf`` in the Wazuh server and include a configuration block such as the following. 

#. Replace ``<SHUFFLE_WEBHOOK_ID>`` with the Shuffle webhook ID. The rule level filter is optional. You can remove it or set another level value for the integration.

   .. code-block:: xml
      :emphasize-lines: 3

      <integration>
        <name>shuffle</name>
        <hook_url>https://shuffler.io/api/v1/hooks/<SHUFFLE_WEBHOOK_ID></hook_url> <!-- Replace with your Shuffle hook URL -->
        <level>3</level>
        <alert_format>json</alert_format>
      </integration>

   .. note::

      You can set a JSON object with customization fields using the :ref:`options <integration_options_tag>` tag. Visit the `Shuffle API reference <https://shuffler.io/docs/API>`__ for information about available customization fields.

#. Restart the Wazuh manager to apply the changes:

   .. include:: /_templates/common/restart_manager.rst

Once the configuration is complete, alerts start showing in the email inbox.

.. thumbnail:: /images/manual/wazuh-server/alerts-in-shuffle.png
   :title: Alerts in Shuffle
   :alt: Alerts in Shuffle
   :align: center
   :width: 80%

Maltiverse
----------

`Maltiverse <https://whatis.maltiverse.com/>`__ is an open source and collaborative platform for indexing and searching Indicators of Compromise (IoCs). It aggregates information from over a hundred public, private, and community threat intelligence sources.

This integration identifies IoCs in Wazuh alerts via the Maltiverse API. It generates new alerts enriched with Maltiverse data. The Maltiverse data fields are based on the threat taxonomy of the ECS standard (Elastic Common Schema).

Perform the following steps to setup this integration:

#. Get your API key from the `Maltiverse <https://www.maltiverse.com/>`__ page.

#. Edit ``/var/ossec/etc/ossec.conf`` in the Wazuh server and include a configuration block such as the following. Replace ``<MALTIVERSE_API_KEY>`` with your Maltiverse API key. The rule level filter is optional. You can remove it or set another level value for the integration.

   .. code-block:: xml
      :emphasize-lines: 5

      <integration>
        <name>maltiverse</name>
        <hook_url>https://api.maltiverse.com</hook_url>
        <level>3</level>
        <api_key><MALTIVERSE_API_KEY></api_key> <!-- Replace with your Maltiverse API key -->
        <alert_format>json</alert_format>
      </integration>

#. Restart the Wazuh manager to apply the changes:

   .. include:: /_templates/common/restart_manager.rst

Once the configuration is complete, enriched alerts start showing in the Wazuh Dashboard if applicable.

.. thumbnail:: /images/manual/wazuh-server/enriched-alerts.png
   :title: Enriched alerts in the Wazuh dashboard
   :alt: Enriched alerts in the Wazuh dashboard
   :align: center
   :width: 80%

Custom integration
------------------

The Wazuh Integrator module connects Wazuh with other external software. This is achieved by integrating the Wazuh alert system with the APIs of the software products through integration scripts.

Below is an example of a configuration block in the ``/var/ossec/etc/ossec.conf`` file for custom integration.

.. code-block:: xml

   <!--Custom external Integration -->
   <integration>
     <name>custom-integration</name>
     <hook_url><WEBHOOK></hook_url>
     <level>10</level>
     <group>multiple_drops,authentication_failures</group>
     <api_key><API_KEY></api_key> <!-- Replace with your external service API key -->
     <alert_format>json</alert_format>
    <options>{"data": "Custom data"}</options> <!-- Replace with your custom JSON object -->
   </integration>

Replace:

-  ``<WEBHOOK>`` with the webhook URL of the external application.
-  ``<API_KEY>`` with the API key of the external application.

You can get detailed information on the :doc:`configuration options </user-manual/reference/ossec-conf/integration>` for the Wazuh Integrator module in the reference guide.

Creating an integration script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You are recommended to follow the instructions below when creating an integration script:

#. Create the script in ``/var/ossec/integrations/`` directory on the Wazuh server with the same name indicated in the configuration block.

#. The script  must contain execution permissions and belong to the ``root`` user of the ``wazuh`` group. The commands below assign permissions and ownership to the ``/var/ossec/integrations/custom-script`` script.

   .. code-block:: console

      # chmod 750 /var/ossec/integrations/custom-script
      # chown root:wazuh /var/ossec/integrations/custom-script

#. The first line of the integration script must indicate its interpreter, or else Wazuh won’t know how to read and execute the script. The following example line indicates the Python interpreter:

   .. code-block:: python

      #!/usr/bin/env python

#. The script checks the following arguments because it will receive configuration options from them.

   -  The first parameter includes the location of the file that contains the alert. The  parameter is the ``/logs/alerts/alerts.json`` file passed by default in the Wazuh Integrator module:

      .. code-block:: python

         alert_file = open(sys.argv[1])

   -  The second parameter contains the API key which is the ``api_key`` option defined in the ``<integration>`` block:

      .. code-block:: python

         api_key = sys.argv[2]

   -  The third parameter contains the webhook URL which is the ``hook_url`` option defined in the ``<integration>`` block:

      .. code-block:: python

         hook_url = sys.argv[3]

   If none of the above are indicated, the parameters will be received empty.

#. Read the contents of the file indicated in the first parameter and extract, from the alert, the fields that are relevant for the integration. If JSON was used in the ``alert_format`` option, the information has to be loaded as a JSON object.

   .. code-block:: python

      alert_level = alert_json['rule']['level']
      ruleid = alert_json['rule']['id']
      description = alert_json['rule']['description']
      agentid = alert_json['agent']['id']
      agentname = alert_json['agent']['name']
      path = alert_json['syscheck']['path']

We recommend that you check the file ``/logs/alerts/alerts.json`` before starting the development of the integration script to find the format of the alerts to be interpreted.

You can see the example integration script for Jira in the `How to integrate external software using Integrator <https://wazuh.com/blog/how-to-integrate-external-software-using-integrator/>`__ blog post.