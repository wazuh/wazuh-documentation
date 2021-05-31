.. Copyright (C) 2021 Wazuh, Inc.

.. _office365_monitoring_activity:

.. meta::
  :description: Discover the way that Wazuh provides to monitor your organization's Office 365 activity.

Monitoring Office 365 Activity
==============================

The **audit log** allows organization admins to quickly review the actions performed by members of your organization. It includes details such as who performed the action, what the action was, and when it was performed.
This Wazuh module allows you to collect all the logs from Office 365 using its API. The Office 365 Management Activity API aggregates actions and events into tenant-specific content blobs, which are classified by the type and source of the content they contain. 

**List available content:**

This operation lists the content currently available for retrieval for the specified content type.

.. code-block:: none

    GET https://manage.office.com/api/v1.0/{client_id}/activity/feed/subscriptions/content?contentType={content_type}&startTime={start_time}&endTime={end_time}

**Retrieving content:**

To retrieve a content blob, make a GET request against the corresponding content URI that is included in the list of available content.

.. code-block:: xml

    GET {content_uri}

Office 365 API description can be found in this `link <https://docs.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-reference>`_.

Office 365 API requirements
^^^^^^^^^^^^^^^^^^^^^^^^^^^

For **Wazuh** to successfully connect to the **Office365 API**, an authentication process is required. To do this, we must provide the ``tenant_id``, ``client_id`` and ``client_secret`` of the application that we authorize in the organization.

1. Register your app

To authenticate with the Microsoft identity platform endpoint you need to register an app in your `Microsoft Azure portal app registrations <https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade>`_  section. Once there click on ``New registration``:

.. thumbnail:: ../images/office365/azure-app-new-registration.png
    :title: Register your app
    :align: center
    :width: 100%

Fill in the name of your app, choose the desired account type and click on the ``Register`` button:

.. thumbnail:: ../images/office365/1-azure-wazuh-app-register-application.png
    :title: Register your app
    :align: center
    :width: 100%

The app is now registered and you can see information about it in its overview section:

.. thumbnail:: ../images/office365/2-azure-wazuh-app-overview.png
    :title: Register your app
    :align: center
    :width: 100%

At this point we can get the ``tenant`` and ``client`` IDs:

2. Certificates & secrets

You can generate a password to use during the authentication process. Go to ``Certificates & secrets`` and click on ``New client secret``:

.. thumbnail:: ../images/office365/3-azure-wazuh-app-create-password.png
    :title: Certificates & secrets
    :align: center
    :width: 100%

.. note:: Make sure you write it down because the UI won’t let you copy it afterwards.

3. API permissions

The application needs specific API permissions to be able to request the Office 365 activity events. In this case you are looking for permissions related to the ``https://manage.office.com`` resource.

To configure the application permissions go to the ``API permissions`` page, choose ``Add a permission``, then select the Office 365 Management APIs and click on ``Application permissions``:

.. thumbnail:: ../images/office365/4-azure-wazuh-app-configure-permissions.png
    :title: API permissions
    :align: center
    :width: 100%

You need to add the following permissions under the ``ActivityFeed`` group:

``ActivityFeed.Read``. Read activity data for your organization.
``ActivityFeed.ReadDlp``. Read DLP policy events including detected sensitive data.

Wazuh configuration
^^^^^^^^^^^^^^^^^^^

Next, we will see the options we have to configure for the Wazuh integration.

Proceed to configure the ``office365`` module in the Wazuh manager. Through the following configuration, Wazuh is ready to search for logs created by Office 365 audit-log. In this case, we will search only the type of ``Audit.AzureActiveDirectory`` events within an interval of ``10m``. Those logs will be only those that were created after the module was started:

.. code-block:: xml

    <office365>
        <enabled>yes</enabled>
        <interval>10m</interval>
        <only_future_events>yes</only_future_events>
        <api_auth>
            <tenant_id>your_tenant_id</tenant_id>
            <client_id>your_client_id</client_id>
            <client_secret>your_client_secret</client_secret>
        </api_auth>
        <subscriptions>
            <subscription>Audit.Exchange</subscription>
        </subscriptions>
    </office365>

Module reference can be found :ref:`here <office365-module>`.

Using the configuration mentioned above, we will see an example of monitoring Office 365 activity.

Generate activity on Office 365
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For this example, we will start by generating some activity in our Office 365 Organization, in this case let's add a new mailbox to our team. If we do that, we can see that Office 365 will generate a new json event, something like this:

.. code-block:: json
    :class: output

    {
        "CreationTime": "2021-05-19T21:30:51",
        "Id": "xxxx-xxxx-xxxx-xxxx-xxxx",
        "Operation": "New-Mailbox",
        "OrganizationId": "xxxx-xxxx-xxxx-xxxx-xxxx",
        "RecordType": 1,
        "ResultStatus": "True",
        "UserKey": "NT AUTHORITY\\SYSTEM (w3wp)",
        "UserType": 3,
        "Version": 1,
        "Workload": "Exchange",
        "ClientIP": "[aaa:bbb:ccc:aa:aa::aa]:32132",
        "ObjectId": "xxxx.prod.outlook.com/Microsoft Exchange Hosted Organizations/org_name.onmicrosoft.com/CompliancePolicyCacheCustomTag",
        "UserId": "NT AUTHORITY\\SYSTEM (w3wp)",
        "AppId": "xxx-xxx-xxx-xxx-xxxx",
        "ClientAppId": "xxx-xxx-xxx-xxx-xxx",
        "ExternalAccess": true,
        "OrganizationName": "org_name.onmicrosoft.com",
        "OriginatingServer": "...",
        "SessionId": ""
    }

Wazuh Rules
^^^^^^^^^^^

Wazuh provides a series of rules to catch different events on Office365, for this example we will take the rule id ``91533`` which detects a ``Office 365: Events from the Exchange admin audit log.`` action.

.. code-block:: xml

    <rule id="91533" level="3">
        <if_sid>91532</if_sid>
        <field name="office_365.RecordType" type="osregex">^1$</field>
        <description>Office 365: Events from the Exchange admin audit log.</description>
        <options>no_full_log</options>
        <group>ExchangeAdmin</group>
    </rule>

If Wazuh successfully connects to Office 365 API, the events raised above will trigger these rules and cause an alert like this:

.. code-block:: json
    :emphasize-lines: 13
    :class: output

    {
        "agent": {
            "name": "agent01",
            "id": "001"
        },
        "manager": {
            "name": "manager01"
        },
        "data": {
            "office_365": {
                "CreationTime": "2021-05-19T21:30:51",
                "Id": "xxxx-xxxx-xxxx-xxxx-xxxx",
                "Operation": "New-Mailbox",
                "OrganizationId": "xxxx-xxxx-xxxx-xxxx-xxxx",
                "RecordType": 1,
                "ResultStatus": "True",
                "UserKey": "NT AUTHORITY\\SYSTEM (w3wp)",
                "UserType": 3,
                "Version": 1,
                "Workload": "Exchange",
                "ClientIP": "[aaa:bbb:ccc:aa:aa::aa]:32132",
                "ObjectId": "xxxx.prod.outlook.com/Microsoft Exchange Hosted Organizations/org_name.onmicrosoft.com/CompliancePolicyCacheCustomTag",
                "UserId": "NT AUTHORITY\\SYSTEM (w3wp)",
                "AppId": "xxx-xxx-xxx-xxx-xxxx",
                "ClientAppId": "xxx-xxx-xxx-xxx-xxx",
                "ExternalAccess": true,
                "OrganizationName": "org_name.onmicrosoft.com",
                "OriginatingServer": "...",
                "SessionId": ""
            }
        },
        "rule": {
            "firedtimes": 26,
            "mail": false,
            "level": 3,
            "description": "Office 365: Events from the Exchange admin audit log.",
            "groups":["office_365"],
            "id": "91533"
        },
        "location": "office_365",
        "decoder": {
            "name": "json"
        },
        "timestamp": "2020-03-20T12:19:08.694+0000"
    }
