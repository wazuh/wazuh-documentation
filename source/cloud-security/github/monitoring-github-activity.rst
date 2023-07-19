.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover the way that Wazuh provides to monitor your organization's GitHub activity. Check out this section of our documentation to learn more about it.

.. _github_monitoring_activity:

Monitoring GitHub Activity
==========================

The `audit log` allows organization admins to quickly review the actions performed by members of your organization. It includes details such as who performed the action, what the action was, and when it was performed.
This Wazuh module allows you to collect all the logs from GitHub using its API:

.. code-block:: xml

    GET /orgs/{org}/audit-log

The GitHub API description can be found in this `link <https://docs.github.com/en/rest>`_.

.. note::

    To access Git events in the `audit log`, you must use the `audit log` REST API. The `audit log` REST API is available for users of GitHub Enterprise Cloud only.

GitHub requirements
^^^^^^^^^^^^^^^^^^^

For **Wazuh** to successfully connect to the **GitHub API**, an authentication process is required. To do this, we must provide the name of the organization on GitHub and personal access tokens.
The Personal Access Tokens (PATs) are an alternative to using passwords for authentication on GitHub when using the GitHub API.

.. note::

    To use this endpoint, you must be an organization owner, and you must use an access token with the ``admin:org`` scope.

`Click here <https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token#creating-a-token>`_ to learn how to create one.

Wazuh configuration
^^^^^^^^^^^^^^^^^^^

Next, we will see the options we have to configure for the Wazuh integration.

Configure the ``github`` module either in the Wazuh manager or the Wazuh agent. To do so, modify the :doc:`ossec.conf </user-manual/reference/ossec-conf/index>` configuration file. We will use the data that we took previously as the **organization name** and the **PATs**. Through the following configuration, Wazuh is ready to search for logs created by GitHub audit-log. In this case, we will search only the type of ``git`` events within an interval of ``1m``. Those logs will be only those that were created after the module was started:

.. code-block:: xml

    <github>
        <enabled>yes</enabled>
        <interval>1m</interval>
        <time_delay>1m</time_delay>
        <curl_max_size>1M</curl_max_size>
        <only_future_events>yes</only_future_events>
        <api_auth>
            <org_name>insert_organization_name</org_name>
            <api_token>insert_personal_access_token</api_token>
        </api_auth>
        <api_parameters>
            <event_type>git</event_type>
        </api_parameters>
    </github>

To learn more, check the :ref:`github-module` module reference.

Using the configuration mentioned above, we will see an example of monitoring GitHub activity.

Generate activity on GitHub
^^^^^^^^^^^^^^^^^^^^^^^^^^^

For this example, we will start by generating some activity in our GitHub Organization, in this case, let's add a new member to our team. If we do that, we can see that GitHub will generate a new json event, something like this:

.. code-block:: json
    :class: output

    {
        "actor": "User",
        "data": {
            "team": "org_name/team_name"
        },
        "org": "org_name",
        "created_at": 1619032221869,
        "action": "team.add_member",
        "user": "User",
    }

Wazuh Rules
^^^^^^^^^^^

Wazuh provides a series of rules to catch different events on GitHub, for this example we will take the rule id ``91393`` which detects a ``GitHub Team add member`` action.

.. code-block:: xml

    <!-- team.add_member -->

    <rule id="91393" level="5">
        <if_sid>91392</if_sid>
        <action>team.add_member</action>
        <description>GitHub Team add member.</description>
        <options>no_full_log</options>
        <group>git_team</group>
    </rule>

If Wazuh successfully connects to GitHub, the events raised above will trigger these rules and cause an alert like this:

.. code-block:: json
    :emphasize-lines: 5,6,16
    :class: output

    {
        "timestamp":"2021-04-29T16:40:33.955+0000",
        "rule": {
            "level":5,
            "description":"GitHub Team add member.",
            "id":"91393",
            "firedtimes":8,
            "mail":false,
            "groups": ["github","git"]
        },
        "agent": {
            "id":"000",
            "name":"ubuntu"
        },
        "manager": {
            "name":"ubuntu-bionic"
        },
        "id":"1619714433.146108",
        "decoder": {
            "name":"json"
        },
        "data": {
            "github": {
                "action":"team.add_member",
                "actor":"member_name",
                "@timestamp":"1619031743300.000000",
                "org":"org_name",
                "created_at":"1619031743300.000000",
                "user":"User",
                "_document_id":"9Z1pUC7N0GBf4ZzZFQEXpA",
                "source":"github"
            }
        },
        "location":"github"
    }