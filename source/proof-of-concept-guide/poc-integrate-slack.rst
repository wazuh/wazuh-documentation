.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh can be integrated with Slack to report alerts through messages sent to the platform. Learn more about this in this PoC.

:orphan:
  
.. _poc_slack_integration:

Slack integration
=================

You can connect Wazuh to external APIs and alerting tools such as `Slack <https://slack.com/>`_. This integration allows reporting alerts through messages sent to the platform by using the :ref:`wazuh-integratord <wazuh-integratord>` deamon.

For more information about integrations, check the :ref:`manual_integration` section of the documentation.


Configuration
-------------

Configure your environment as follows to test the PoC.

#. `Create a Slack webhook <https://api.slack.com/messaging/webhooks>`_. This is a unique URL to which Wazuh will send messages with the alerts.

#. Replace ``YOUR_SLACK_WEBHOOK`` in the below configuration with the URL obtained in the previous step. Set this Slack integration configuration in ``/var/ossec/etc/ossec.conf`` at the Wazuh manager.

    .. code-block:: XML

        <integration>
            <name>slack</name>
            <hook_url>YOUR_SLACK_WEBHOOK</hook_url> <!-- Replace with your Slack Webhook -->
            <level>10</level>
            <alert_format>json</alert_format>
        </integration>

#. Restart the Wazuh manager to apply the configuration changes.

    .. code-block:: console

        # systemctl restart wazuh-manager

Steps to generate the alerts
----------------------------

No action is required. Wazuh automatically forwards alerts level 10 or higher to the provided Slack webhook.

Query the alerts
----------------

The Slack channel you associated your Slack webhook with will show the alerts in real time.

.. thumbnail:: ../images/poc/Slack-integration.png
          :title: Slack integration
          :align: center
          :wrap_image: No

