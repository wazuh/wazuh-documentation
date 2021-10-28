.. _poc_slack_integration:

Slack integration
=================

Report alerts to a `Slack <https://slack.com/>`_ channel with the :ref:`wazuh-integratord` daemon.

Check our :ref:`manual_integration` for detailed information about integrations.

Configuration
-------------

#. `Create a Slack webhook <https://api.slack.com/messaging/webhooks>`_. This is a unique URL to which Wazuh will send messages with the alerts.

#. Replace ``YOUR_SLACK_WEBHOOK`` in the below configuration with the url obtained in the previous step. Set this Slack integration configuration in ``/var/ossec/etc/ossec.conf`` at the Wazuh manager endpoint.

    .. code-block:: XML

        <integration>
            <name>slack</name>
            <hook_url>YOUR_SLACK_WEBHOOK</hook_url> <!-- Replace with your Slack Webhook -->
            <level>10</level>
            <alert_format>json</alert_format>
        </integration>

Steps to generate the alerts
----------------------------

No action required. Wazuh will automatically forward alerts level 10 or higher to the provided Slack webhook.

Alerts
------

The Slack channel you associated with your Slack webhook will show the alerts in real time.

Affected endpoints
------------------

* Wazuh manager endpoint
