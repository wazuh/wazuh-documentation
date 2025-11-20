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

      Ensure you write down the secret's value section, as the UI won't let you copy it later.

.. _permissions-ms-graph-api-setup:

API permissions
---------------

Your application needs specific API permissions to retrieve logs and events from the Microsoft Graph API. The specific API permission required depends on the resource to be accessed. The comprehensive list of permissions is documented in `Microsoft Graph permissions reference <https://learn.microsoft.com/en-us/graph/permissions-reference>`__.

To configure the application permissions, go to the **API permissions** page and choose **Add a permission**.

#. Select **Microsoft Graph API** and click on **Application permissions**:

   .. thumbnail:: /images/cloud-security/ms-graph/select-api-permissions.png
      :align: center
      :width: 80%

#. Add the following relationships' permissions under the **SecurityAlert** and **SecurityIncident** sections:

   -  ``SecurityAlert.Read.All``: This permission is required to read security alerts from the ``/security/alerts_v2`` API on your tenant.
   -  ``SecurityIncident.Read.All``: This permission is required to read security incident data, including associated events/alerts from the ``/security/incidents`` API on your tenant.

   .. thumbnail:: /images/cloud-security/ms-graph/add-api-permissions.png
      :align: center
      :width: 80%
      
#. Use an admin user to **Grant admin consent** for the tenant:

   .. thumbnail:: /images/cloud-security/ms-graph/grant-admin-consent.png
      :title: API permissions Intune
      :alt: API permissions Intune
      :align: center
      :width: 100%

   .. note::
   
      An Admin account is required to Grant admin consent for Default Directory.

Wazuh server or agent
---------------------

Next, we will set the necessary configurations to allow the Wazuh module for Microsoft Graph to pull logs from the Microsoft Graph API successfully.

#. Apply the following configuration to the local configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <ms-graph>
          <enabled>yes</enabled>
          <only_future_events>yes</only_future_events>
          <curl_max_size>10M</curl_max_size>
          <run_on_start>yes</run_on_start>
          <interval>5m</interval>
          <version>v1.0</version>
          <api_auth>
            <client_id><YOUR_APPLICATION_ID></client_id>
            <tenant_id><YOUR_TENANT_ID></tenant_id>
            <secret_value><YOUR_SECRET_VALUE></secret_value>
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

   In this case, we will search for ``alerts_v2`` and incidents within the security resource at an interval of ``5m``. The logs will only be created after the Wazuh module for Microsoft Graph starts.

   Where:

   -  ``<client_id>`` (also known as an Application ID) is the unique identifier of your registered application.  
   -  ``<tenant_id>`` (also known as Directory ID) is the unique identifier for your Azure tenant  
   -  ``<secret_value>`` is the value of the client secret. It is used to authenticate the registered app on the Azure tenant.  
   -  ``<api_type>`` specifies the type of Microsoft 365 subscription plan the tenant uses. ``global`` refers to either a commercial or GCC tenant.  
   -  ``<name>`` specifies the resource's name (i.e., specific API endpoint) to query for logs.  
   -  ``<relationship>`` specifies the types of content (relationships) to obtain logs for.

2. Restart your Wazuh server or agent, depending on where you configured the Wazuh module for Microsoft Graph.

Wazuh agent:

.. code-block:: console

   # systemctl restart wazuh-agent

Wazuh server:

.. code-block:: console

   # systemctl restart wazuh-manager
       
.. note::

   Multi-tenant is not supported. You can only configure one block of ``api_auth``. To learn more about the Wazuh module for Microsoft Graph options, see the :doc:`ms-graph </user-manual/reference/ossec-conf/ms-graph-module>` reference.

Use cases
---------

Using the configuration mentioned above, we examine the following use cases:

-  Monitoring security resources.
-  Monitoring Microsoft Intune device management audit events.

Monitoring security resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

One ubiquitous alert an organisation of any size receives is spam email. In this case, we can examine a spam email containing malicious content and see how Microsoft Graph and Wazuh report on this information.

We can set up the Wazuh module for Microsoft Graph to monitor the security resource and the ``alerts_v2`` relationship within our Microsoft 365 tenant described in :ref:`Retrieving content <retrieving_content>`. We also enable **Microsoft Defender for Office 365** within the Microsoft 365 tenant. Microsoft Defender for Office 365 monitors email messages for threats such as spam and malicious attachments.

Detect malicious email
^^^^^^^^^^^^^^^^^^^^^^

Enable Microsoft Defender for Office 365 and send a malicious email to an email address in the monitored domain. A malicious email detection activity will produce a log that can be accessed using the ``alerts_v2`` relationship within the Microsoft 365 tenant.

#. Log in to `Microsoft 365 Defender portal <https://security.microsoft.com/>`__ using an admin account.
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


The Wazuh module for Microsoft Graph retrieves this log via the Microsoft Graph API. This log matches an out-of-the-box rule with ID ``99506``. This triggers an alert with the following details:

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

Monitoring device management audit events
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Intune event
~~~~~~~~~~~~

Mobile Device Management (MDM) tools, such as Microsoft Intune, enable organizations to manage devices. By integrating Microsoft Graph with Wazuh, organizations can monitor Microsoft Intune logs.

For instance, if a user updates the enrollment settings, configuring the module to monitor the ``deviceManagement`` resource, the ``auditEvents`` relationship generates a JSON like the following:

**Output**

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

In this example, you can look at rule ID ``99652``, which corresponds to the ``Microsoft Graph message "MDM Intune audit event.``

.. code-block:: xml

   <rule id="99652" level="3">
       <if_sid>99651</if_sid>
       <options>no_full_log</options>
       <field name="ms-graph.relationship">auditEvents</field>
       <description>MS Graph message: MDM Intune audit event.</description>
   </rule>

Once Wazuh connects with the Microsoft Graph API, the previous log triggers the rule and raises the following Wazuh alert:

**Output**

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


.. thumbnail:: /images/cloud-security/ms-graph/ms-graph-intune-details.png
      :align: center
      :width: 100%