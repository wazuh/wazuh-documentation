.. _poc_slack_integration:

Slack integration
=================

Wazuh can report alerts to Slack by using the `ossec-integratordn <https://documentation.wazuh.com/current/user-manual/reference/daemons/wazuh-integratord.html>`_ daemon. Please check our `Integration with external APIs <https://documentation.wazuh.com/current/user-manual/manager/manual-integration.html>`_ for detailed information about this.

Configuration
-------------

On Wazuh manager:

- A Slack webhook must be configured before setting up this scenario.

- Configure Slack integration in ``/var/ossec/etc/ossec.conf``:

    .. code-block:: XML

        <integration>
            <name>slack</name>
            <hook_url>${replace_by_SlackHook}</hook_url>
            <level>10</level>
            <alert_format>json</alert_format>
        </integration>


Alerts
^^^^^^

- Wazuh will automatically forward alerts level 10 or higher to the provided Slack hook (the Slack channel you associated with your Slack hook will show the alerts in real time).

Affected endpoints
^^^^^^^^^^^^^^^^^^

- Wazuh manager