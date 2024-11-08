.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh must be authorized before it can pull logs and other content from the Microsoft Graph API.

Microsoft Graph API setup
=========================

Wazuh must be authorized before it can pull logs and other content from the Microsoft Graph API. This authentication process is possible using the ``tenant_id``, ``client_id``, and ``secret_value`` of an authorized application, which we will register through Azure.

Registering your app
--------------------

#. Register an application to authenticate with the Microsoft identity platform endpoint.

   .. thumbnail:: /images/cloud-security/azure/new-app-registration.png
      :align: center
      :width: 80%

#. Fill in the name of your app, choose the desired **account type**, and click on the **Register** button:

   .. thumbnail:: /images/cloud-security/ms-graph/register-application.png
      :align: center
      :width: 80%

The app is now registered; you can see information about it in its **Overview** section. Make sure to note down the ``client_id`` and ``tenant_id`` information:

.. thumbnail:: /images/cloud-security/ms-graph/note-down-information.png
   :align: center
   :width: 80%

Certificates & secrets
----------------------

#. Generate a secret you will use for the authentication process. Go to **Certificates & secrets** and click on **New client secret**, which will then generate the secret and its ID:

   .. thumbnail:: /images/cloud-security/ms-graph/add-new-client-secret.png
      :align: center
      :width: 80%

#. Ensure to copy and save the ``secret_value`` information:

   .. thumbnail:: /images/cloud-security/ms-graph/save-secret.png
      :align: center
      :width: 80%

   .. note::

      Ensure you write down the secret's value section because the UI won't let you copy it afterward.

API permissions
---------------

Your application needs specific API permissions to retrieve logs and events from the Microsoft Graph API, such as permissions related to the ``security`` and ``deviceManagement`` resources.

To configure the application permissions, go to the **API permissions** page and choose **Add a permission**.

#. Select **Microsoft Graph API** and click on **Application permissions**.
#. Add the following relationships' permissions under the **SecurityAlert** and **SecurityIncident** sections:

   -  ``SecurityAlert.Read.All``: This permission is required to read security alerts from the ``/security/alerts_v2`` API on your tenant.
   -  ``SecurityIncident.Read.All``: This permission is required to read security incident data, including associated events/alerts from the ``/security/incidents`` API on your tenant.

   .. thumbnail:: /images/cloud-security/ms-graph/add-api-permissions.png
      :align: center
      :width: 80%

#. Add the following relationships' permissions under the **DeviceManagementApps** and **DeviceManagementManagedDevices** sections:

   - ``DeviceManagementApps.Read.All``. Read `auditEvents` & `detectedApps` relationship data from your tenant.

   - ``DeviceManagementManagedDevices.Read.All``. Read `auditEvents` & `managedDevices` relationship data from your tenant.

   .. thumbnail:: /images/cloud-security/ms-graph/4-azure-wazuh-app-configure-permissions-intune.png
      :title: API permissions Intune
      :alt: API permissions Intune
      :align: center
      :width: 100%

.. note::

   Admin consent is required for API permission changes.

Wazuh server or agent
---------------------

Next, we will see the necessary configuration to allow the integration to successfully pull logs from the Microsoft Graph API.

#. Apply the following configuration to the local configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml
      :emphasize-lines: 15-17,20,21

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
          <resource>
            <name>deviceManagement</name>
            <relationship>auditEvents</relationship>
          </resource>
      </ms-graph>

   The configuration monitors specific events at an interval of ``5m``.

   -  ``alerts_v2`` and ``incidents`` within the ``security`` resource.
   -  ``auditEvents`` within the ``deviceManagement`` resource.

   Only logs created after the Wazuh module for Microsoft Graph starts are monitored.

   Where:

   -  ``<client_id>`` (also known as an Application ID) is the unique identifier of your registered application.
   -  ``<tenant_id>`` (also known as Directory ID) is the unique identifier for your Azure tenant
   -  ``<secret_value>`` is the value of the client secret. It is used to authenticate the registered app on the Azure tenant.
   -  ``<api_type>`` specifies the type of Microsoft 365 subscription plan the tenant uses. global refers to either a commercial or GCC tenant.
   -  ``<name>`` specifies the resource's name (i.e., specific API endpoint) to query for logs.
   -  ``<relationship>`` specifies the types of content (relationships) to obtain logs for.

   .. note::

      Multi-tenant is not supported. You can only configure one block of ``api_auth``. To learn more about the Wazuh module for Microsoft Graph options, see the :doc:`ms-graph </user-manual/reference/ossec-conf/ms-graph-module>` reference.

Use case
--------

Using the configuration mentioned above, you can examine two examples as follows.

-  Malicious email as an example of a security event.
-  Change enrollment configuration as an example of an Intune event.

Monitoring security resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

One of the more ubiquitous alerts that an organization of any size receives is spam emails. In this case, we can specifically examine an example of a spam email containing malicious content and examine how Microsoft Graph & Wazuh report on this information.

We can set up the Wazuh module for Microsoft Graph to monitor the security resource and the ``alerts_v2`` relationship within our Microsoft 365 tenant described in :ref:`Retrieving content <retrieving_content>`. We also enable **Microsoft Defender for Office 365** within the Microsoft 365 tenant. Microsoft Defender for Office 365 monitors email messages for threats such as spam and malicious attachments.

Detect malicious email
^^^^^^^^^^^^^^^^^^^^^^

Enable Microsoft Defender for Office 365 and send a malicious email to an email address in the monitored domain. A malicious email detection activity will produce a log that can be accessed using the ``alerts_v2`` relationship within the Microsoft 365 tenant.

#. Login to `Microsoft 365 Defender portal <https://security.microsoft.com/>`__ using an admin account.
#. Navigate to **Policies & rules** > **Threat policies** > **Preset Security Policies**.
#. Toggle the **Standard protection is off** button under **Standard protection**.
#. Click on **Manage protection settings** and follow the prompt to set up the policies.

When Microsoft Defender for Office 365 detects a malicious email event, a log similar to the following is generated. You can view this event using the **Alerts** tab of the Microsoft Defender for Office 365 page:

   .. code-block:: none
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


The Wazuh module for Microsoft Graph retrieves this log via Microsoft Graph API. This log matches an out-of-the-box rule with ID ``99506``. This triggers an alert with the following details:

   .. code-block:: none
      :class: output

      {
          "timestamp":"2024-08-29T14:53:15.301+0000",
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

The alert is seen on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/ms-graph/alert-on-wazuh-dashboard.png
   :align: center
   :width: 80%

Intune event
^^^^^^^^^^^^

Mobile Device Management (MDM) tools like Microsoft Intune enable organizations to manage devices. By integrating Microsoft Graph with Wazuh, organizations can monitor Microsoft Intune logs.

For instance, if a user updates the enrollment settings, configuring the module to monitor the ``deviceManagement`` resource and the ``auditEvents`` relationship might generate a JSON like the following one:

.. code-block:: json
   :class: output

   {
       "id":"xxxx-xxxx-xxxx-xxxx-xxxx",
       "displayName": "Create DeviceEnrollmentConfiguration",
       "componentName": "Enrollment",
       "activity": null,
       "activityDateTime": "2024-08-09T18:29:00.7023255Z",
       "activityType": "Create DeviceEnrollmentConfiguration",
       "activityOperationType": "Create",
       "activityResult": "Success",
       "correlationId":"xxxx-xxxx-xxxx-xxxx-xxxx",
       "category": "Enrollment",
       "actor": {
           "auditActorType": "ItPro",
           "userPermissions": [
               "*"
           ],
           "applicationId":"xxxx-xxxx-xxxx-xxxx-xxxx",
           "applicationDisplayName": "Microsoft Intune portal extension",
           "userPrincipalName": "xxx@xxx.com",
           "servicePrincipalName": null,
           "ipAddress": null,
           "userId":"xxxx-xxxx-xxxx-xxxx-xxxx"
       },
       "resources": [
           {
               "displayName": "Test restriction",
               "auditResourceType": "DeviceEnrollmentLimitConfiguration",
               "resourceId":"xxxx-xxxx-xxxx-xxxx-xxxx",
               "modifiedProperties": [
                   {
                       "displayName": "Id",
                       "oldValue": null,
                       "newValue":"xxxx-xxxx-xxxx-xxxx-xxxx_Limit"
                   },
                   {
                       "displayName": "Limit",
                       "oldValue": null,
                       "newValue": "5"
                   },
                   {
                       "displayName": "Description",
                       "oldValue": null,
                       "newValue": ""
                   },
                   {
                       "displayName": "Priority",
                       "oldValue": null,
                       "newValue": "1"
                   },
                   {
                       "displayName": "CreatedDateTime",
                       "oldValue": null,
                       "newValue": "8/9/2024 6:29:00 PM"
                   },
                   {
                       "displayName": "LastModifiedDateTime",
                       "oldValue": null,
                       "newValue": "8/9/2024 6:29:00 PM"
                   },
                   {
                       "displayName": "Version",
                       "oldValue": null,
                       "newValue": "1"
                   },
                   {
                       "displayName": "DeviceEnrollmentConfigurationType",
                       "oldValue": null,
                       "newValue": "Limit"
                   },
                   {
                       "displayName": "DeviceManagementAPIVersion",
                       "oldValue": null,
                       "newValue": "5023-03-29"
                   },
                   {
                       "displayName": "$Collection.RoleScopeTagIds[0]",
                       "oldValue": null,
                       "newValue": "Default"
                   }
               ]
           }
       ]
   }

In this example, you can take a look at the rule id ``99652``, which corresponds to ``MS Graph message: MDM Intune audit event.``.

.. code-block:: xml

   <rule id="99652" level="3">
       <if_sid>99651</if_sid>
       <options>no_full_log</options>
       <field name="ms-graph.relationship">auditEvents</field>
       <description>MS Graph message: MDM Intune audit event.</description>
   </rule>

Once Wazuh connects with the Microsoft Graph API, the previous log triggers the rule and raises the following alert:

.. code-block:: json
   :emphasize-lines: 5
   :class: output

   {
       "timestamp": "2024-08-09T18:29:03.362+0000",
       "rule": {
           "id": "99652",
           "level": 3,
           "description": "MS Graph message: MDM Intune audit event.",
           "firedtimes": 1,
           "mail": false,
           "groups": [
               "ms-graph"
           ]
       },
       "agent": {
           "id": "001",
           "name":"ubuntu-bionic"
       },
       "manager": {
           "name":"ubuntu-bionic"
       },
       "id": "1723228143.38630",
       "decoder": {
           "name": "json"
       },
       "data": {
           "integration": "ms-graph",
           "ms-graph": {
               "id": "xxxx-xxxx-xxxx-xxxx-xxxx",
               "displayName": "Create DeviceEnrollmentConfiguration",
               "componentName": "Enrollment",
               "activity": null,
               "activityDateTime": "2024-08-09T18:29:00.7023255Z",
               "activityType": "Create DeviceEnrollmentConfiguration",
               "activityOperationType": "Create",
               "activityResult": "Success",
               "correlationId": "xxxx-xxxx-xxxx-xxxx-xxxx",
               "category": "Enrollment",
               "actor": {
                   "auditActorType": "ItPro",
                   "userPermissions": [
                       "*"
                   ],
                   "applicationId": "xxxx-xxxx-xxxx-xxxx-xxxx",
                   "applicationDisplayName": "Microsoft Intune portal extension",
                   "userPrincipalName": "xxx@xxx.com",
                   "servicePrincipalName": null,
                   "ipAddress": null,
                   "userId": "xxxx-xxxx-xxxx-xxxx-xxxx"
               },
               "resources": [
                   {
                       "displayName": "Test restriction",
                       "auditResourceType": "DeviceEnrollmentLimitConfiguration",
                       "resourceId": "xxxx-xxxx-xxxx-xxxx-xxxx",
                       "modifiedProperties": [
                           {
                               "displayName": "Id",
                               "oldValue": null,
                               "newValue": "xxxx-xxxx-xxxx-xxxx-xxxx_Limit"
                           },
                           {
                               "displayName": "Limit",
                               "oldValue": null,
                               "newValue": "5"
                           },
                           {
                               "displayName": "Description",
                               "oldValue": null,
                               "newValue": ""
                           },
                           {
                               "displayName": "Priority",
                               "oldValue": null,
                               "newValue": "1"
                           },
                           {
                               "displayName": "CreatedDateTime",
                               "oldValue": null,
                               "newValue": "8/9/2024 6:29:00 PM"
                           },
                           {
                               "displayName": "LastModifiedDateTime",
                               "oldValue": null,
                               "newValue": "8/9/2024 6:29:00 PM"
                           },
                           {
                               "displayName": "Version",
                               "oldValue": null,
                               "newValue": "1"
                           },
                           {
                               "displayName": "DeviceEnrollmentConfigurationType",
                               "oldValue": null,
                               "newValue": "Limit"
                           },
                           {
                               "displayName": "DeviceManagementAPIVersion",
                               "oldValue": null,
                               "newValue": "5023-03-29"
                           },
                           {
                               "displayName": "$Collection.RoleScopeTagIds[0]",
                               "oldValue": null,
                               "newValue": "Default"
                           }
                       ]
                   }
               ],
               "resource": "deviceManagement",
               "relationship": "auditEvents"
           }
       },
       "location": "ms-graph"
   }
