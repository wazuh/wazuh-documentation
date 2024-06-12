.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to monitor your organization's activity via Wazuh's integration with the Microsoft Graph API in this section of our documentation.

.. _ms-graph_monitoring_activity:

Monitoring Microsoft Graph Activity
===================================

The **Microsoft Graph API** is a powerful interface that allows an organization's admins to review a wide variety of information concerning a Microsoft 365 tenant and its associated users and endpoints.
This includes details such as security scores and detected incidents as well as information like available OneDrive resources and login audit logs.

In turn, this module integrates with Microsoft Graph to bring this content-rich source of information into Wazuh. This is done through a series of `resources` and `relationships`, which describe the function, type, and content of various logs available within Microsoft Graph.

**Retrieving content:**

To retrieve a set of logs from Microsoft Graph, make a GET request against the URL delineated below:

.. code-block:: xml

    GET https://graph.microsoft.com/{version}/{resource}/{relationship}?{query-parameters}

A description of the current production version of the Microsoft Graph API can be found at the `Overview of Microsoft Graph <https://learn.microsoft.com/en-us/graph/overview?view=graph-rest-1.0>`_.

Alternatively, the API can be directly experimented with through the `Microsoft Graph Explorer <https://developer.microsoft.com/graph/graph-explorer>`_.

Microsoft Graph API Setup
-------------------------

Before **Wazuh** can begin pulling logs and other content from the Microsoft Graph API, it must be authorized and pass through an authentication process. To authenticate, Wazuh must provide the ``tenant_id``, ``client_id``, and ``secret_value`` of an authorized application, which we will register through Azure.

Registering your app
^^^^^^^^^^^^^^^^^^^^

#. To authenticate with the Microsoft identity platform endpoint, you need to register an app in your `Microsoft Azure portal application registration <https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade>`_ section. Once there, click on **New registration**:

   .. thumbnail:: /images/cloud-security/ms-graph/0-azure-app-new-registration.png
       :title: Register your app
       :alt: Register your app
       :align: center
       :width: 100%

#. Fill in the name of your app, choose the desired account type, and click on the **Register** button:

   .. thumbnail:: /images/cloud-security/ms-graph/1-azure-wazuh-app-register-application.png
       :title: Register your app
       :alt: Register your app
       :align: center
       :width: 100%

#. The app is now registered, and you can see information about it in its **Overview** section. Make sure to note down the ``client_id`` and ``tenant_id`` information:

   .. thumbnail:: /images/cloud-security/ms-graph/2-azure-wazuh-app-overview.png
       :title: Register your app
       :alt: Register your app
       :align: center
       :width: 100%

Certificates & secrets
^^^^^^^^^^^^^^^^^^^^^^
#. Generate a secret to be used during the authentication process. Go to **Certificates & secrets** and click on **New client secret**, which will then generate the secret and its ID:
   
   .. thumbnail:: /images/cloud-security/ms-graph/3-azure-wazuh-app-create-secret.png
       :title: Certificates & secrets
       :alt: Certificates & secrets
       :align: center
       :width: 100%
   
#. Ensure that the ``secret_value`` information is copied down and saved:
   
    .. thumbnail:: /images/cloud-security/ms-graph/3-azure-wazuh-app-create-secret-copy-value.png
        :title: Copy secrets value
        :alt: Copy secrets value
        :align: center
        :width: 100%
   
    .. note:: Make sure you write down the secret's value section, because the UI won't let you copy it afterward.

API permissions
^^^^^^^^^^^^^^^

The application needs specific API permissions to be able to retrieve logs and events from the Microsoft Graph API. In this case, you are looking for permissions related to the `security` resource.
   
#. To configure the application permissions, go to the **API permissions** page and choose **Add a permission**. Select **Microsoft Graph API** and click on **Application permissions**.
   
#. Add the following relationships' permissions under the **SecurityAlert** and **SecurityIncident** sections:
   
   - ``SecurityAlert.Read.All``. Read `alerts` & `alerts_v2` relationship data from your tenant.

   - ``SecurityIncident.Read.All``. Read `incident` relationship data, including associated events/alerts, from your tenant.
   
   .. thumbnail:: /images/cloud-security/ms-graph/4-azure-wazuh-app-configure-permissions.png
       :title: API permissions
       :alt: API permissions
       :align: center
       :width: 100%
      
.. note:: Admin consent is required for API permission changes.
   
.. thumbnail:: /images/cloud-security/ms-graph/4-azure-wazuh-app-configure-permissions-admin-consent.png
    :title: API permissions admin consent
    :alt: API permissions admin consent
    :align: center
    :width: 100%


Wazuh configuration
-------------------

Next, we will see the options we have to configure to allow the integration to successfully pull logs from the Microsoft Graph API.

Configure the ``ms-graph`` module in the Wazuh manager or in the Wazuh agent :doc:`configuration file </user-manual/reference/ossec-conf/index>`. Through the following configuration, Wazuh is ready to search for logs created by Microsoft Graph resources and relationships.

In this case, we will search for `alerts_v2` and `incidents` type events within the `security` resource at an interval of ``5m``. The logs will only be those that were created after the module was started:

.. code-block:: xml

    <ms-graph>
        <enabled>yes</enabled>
        <only_future_events>yes</only_future_events>
        <curl_max_size>10M</curl_max_size>
        <run_on_start>yes</run_on_start>
        <interval>5m</interval>
        <version>v1.0</version>
        <api_auth>
          <client_id>your_client_id</client_id>
          <tenant_id>your_tenant_id</tenant_id>
          <secret_value>your_secret_value</secret_value>
          <api_type>global</api_type>
        </api_auth>
        <resource>
          <name>security</name>
          <relationship>alerts_v2</relationship>
          <relationship>incidents</relationship>
        </resource>
    </ms-graph>

Using the configuration mentioned above, we can examine a classic example of a security event: malicious spam emails.

Examining Microsoft Graph logs
------------------------------

One of the more ubiquitous alerts that an organization of any size receive is spam emails. In this case, we can specifically look at an example where the spam email contains malicious content, and examine how Microsoft Graph & Wazuh report on this information.

Imagine that we have set up the Microsoft Graph module to monitor the `security` resource, and the `alerts_v2` relationship within that. Presuming that **Microsoft Defender** is enabled within our **Microsoft 365 tenant**, we would expect JSON similar to the following to be generated:

.. code-block:: json
    :class: output

    {
        "id":"xxxx-xxxx-xxxx-xxxx-xxxx",
        "providerAlertId":"xxxx-xxxx-xxxx-xxxx-xxxx",
        "incidentId":"xx",
        "status":"resolved",
        "severity":"informational",
        "classification":"truePositive",
        "determination":null,
        "serviceSource":"microsoftDefenderForOffice365",
        "detectionSource":"microsoftDefenderForOffice365",
        "detectorId":"xxxx-xxxx-xxxx-xxxx-xxxx",
        "tenantId":"xxxx-xxxx-xxxx-xxxx-xxxx",
        "title":"Email messages containing malicious file removed after delivery.",
        "description":"Emails with malicious file that were delivered and later removed -V1.0.0.3",
        "recommendedActions":"",
        "category":"InitialAccess",
        "assignedTo":"Automation",
        "alertWebUrl":"https://security.microsoft.com/alerts/xxxx-xxxx-xxxx-xxxx-xxxx?tid=xxxx-xxxx-xxxx-xxxx-xxxx",
        "incidentWebUrl":"https://security.microsoft.com/incidents/xx?tid=xxxx-xxxx-xxxx-xxxx-xxxx",
        "actorDisplayName":null,
        "threatDisplayName":null,
        "threatFamilyName":null,
        "mitreTechniques":[
            "T1566.001"
        ],
        "createdDateTime":"2022-11-13T23:48:21.9847068Z",
        "lastUpdateDateTime":"2022-11-14T00:08:37.5366667Z",
        "resolvedDateTime":"2022-11-14T00:07:25.7033333Z",
        "firstActivityDateTime":"2022-11-13T23:45:41.0593397Z",
        "lastActivityDateTime":"2022-11-13T23:47:41.0593397Z",
        "comments":[
            
        ],
        "evidence":[
            {
                "_comment":"Snipped"
            }
        ]
    }

Wazuh Rules
-----------

The Wazuh manager includes a set of pre-made rules that aid in classifying the importance and context of different events. 

In this example, we can take a look at the rule id ``99506``, which corresponds to ``MS Graph message: The alert is true positive and detected malicious activity.``, per the `Microsoft Graph documentation <https://learn.microsoft.com/en-us/graph/api/resources/security-alert?view=graph-rest-1.0#alertclassification-values>`_.

.. code-block:: xml

    <rule id="99506" level="6">
        <if_sid>99501</if_sid>
        <options>no_full_log</options>
        <field name="ms-graph.classification">truePositive</field>
        <description>MS Graph message: The alert is true positive and detected malicious activity.</description>
    </rule>

Once Wazuh connects with the Microsoft Graph API, the previous log triggers the rule and raises the following alert:

.. code-block:: json
    :emphasize-lines: 5
    :class: output

    {
        "timestamp":"2023-04-23T14:53:15.301+0000",
        "rule":{
            "id":"99506",
	        "level":6,
	        "description":"MS Graph message: The alert is true positive and detected malicious activity.",
	        "groups":["ms-graph"],
	        "firedtimes":1,
	        "mail":"false"
        },
        "agent":{
            "id":"001",
            "name":"ubuntu-bionic"
        },
        "manager":{
            "name":"ubuntu-bionic"
        },
        "id":"1623276774.47272",
        "decoder":{
            "name":"json"
        },
        "data":{
            "integration":"ms-graph",
            "ms-graph":{
                "id":"xxxx-xxxx-xxxx-xxxx-xxxx",
                "providerAlertId":"xxxx-xxxx-xxxx-xxxx-xxxx",
                "incidentId":"91",
                "status":"resolved",
                "severity":"informational",
                "classification":"truePositive",
                "determination":null,
                "serviceSource":"microsoftDefenderForOffice365",
                "detectionSource":"microsoftDefenderForOffice365",
                "detectorId":"xxxx-xxxx-xxxx-xxxx-xxxx",
                "tenantId":"xxxx-xxxx-xxxx-xxxx-xxxx",
                "title":"Email messages containing malicious file removed after delivery.",
                "description":"Emails with malicious file that were delivered and later removed -V1.0.0.3",
                "recommendedActions":"",
                "category":"InitialAccess",
                "assignedTo":"Automation",
                "alertWebUrl":"https://security.microsoft.com/alerts/xxxx-xxxx-xxxx-xxxx-xxxx?tid=xxxx-xxxx-xxxx-xxxx-xxxx",
                "incidentWebUrl":"https://security.microsoft.com/incidents/91?tid=xxxx-xxxx-xxxx-xxxx-xxxx",
                "actorDisplayName":null,
                "threatDisplayName":null,
                "threatFamilyName":null,
                "resource":"security",
                "relationship":"alerts_v2",
                "mitreTechniques":[
                    "T1566.001"
                ],
                "createdDateTime":"2022-11-13T23:48:21.9847068Z",
                "lastUpdateDateTime":"2022-11-14T00:08:37.5366667Z",
                "resolvedDateTime":"2022-11-14T00:07:25.7033333Z",
                "firstActivityDateTime":"2022-11-13T23:45:41.0593397Z",
                "lastActivityDateTime":"2022-11-13T23:47:41.0593397Z",
                "comments":[

                ],
                "evidence":[
                    {
                        "_comment":"Snipped"
                    }
                ]
            }
        }
    }
