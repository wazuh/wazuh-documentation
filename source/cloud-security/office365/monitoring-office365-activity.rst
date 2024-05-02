.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This Wazuh documentation section provides instructions for monitoring the Office 365 audit log for your organization

Monitoring Office 365 audit logs
================================

Office 365 audit log allows organization admins to quickly review the actions performed by members of your organization. It includes details such as the user who logs in, who performs an action, the type of action performed, and the time an action is performed.

This section provides instructions for monitoring the Office 365 audit log for your organization. The audit log provides information on the changes and user activities taking place in an Office 365 environment. Wazuh allows you to monitor the following activities in Office 365:

-  User activity in SharePoint Online and OneDrive for Business.
-  User activity in Exchange Online (Exchange mailbox audit logging).
-  Admin activity in SharePoint Online.
-  Admin activity in Azure Active Directory (the directory service for Office 365).
-  Admin activity in Exchange Online (Exchange admin audit logging).
-  eDiscovery activities in the security and compliance center.
-  User and admin activity in:

   -  Power BI.
   -  Microsoft Teams.
   -  Dynamics 365.
   -  Yammer.
   -  Microsoft Power Automate.
   -  Microsoft Stream.
   -  Microsoft Workplace Analytics.
   -  Microsoft Power Apps.
   -  Microsoft Forms.
-  User and admin activity for sensitivity labels for sites that use SharePoint Online or Microsoft Teams.
-  Admin activity in Briefing email and MyAnalytics.

Office 365 Management Activity API
----------------------------------

The Office 365 Management APIs provide a platform for various management tasks, including service communications, security, compliance, reporting, and auditing. It offers an interface for collecting audit logs from an Office 365 environment. Wazuh collects audit logs from Office 365 using this interface.

The Office 365 Management Activity API aggregates actions and events into tenant-specific content blobs, which are structured data tailored to each organization's Office 365 environment. These content blobs classify the information based on the type and source of the content they contain, allowing organizations to monitor and analyze actions and events within their Office 365 tenant for security auditing, compliance monitoring, and other administrative purposes.

Activity API operations based on plans
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Office 365 Management Activity API is a RESTful API that enables organizations to access and integrate audit logs and activity data from different Office 365 services. It categorizes activities based on their associated service, covering a wide range of services within the Office 365 suite. The specific activities available depend on your Office 365 subscription plan and the services you have enabled.

All API operations are restricted to a single tenant, and the root URL of the API includes a tenant ID that specifies the tenant context. The URL for the API endpoint that you use is based on the type of Office 365 subscription plan for your organization. Here is the list of the available plans and their corresponding API endpoint URLs.

-  Enterprise plan

   .. code-block:: none

      https://manage.office.com/api/v1.0/{tenant_id}/activity/feed/{operation}

-  Government Community Cloud (GCC) government plan

   .. code-block:: none

      https://manage-gcc.office.com/api/v1.0/{tenant_id}/activity/feed/{operation}

-  Government Community Cloud (GCC) High government plan

   .. code-block:: none

      https://manage.office365.us/api/v1.0/{tenant_id}/activity/feed/{operation}

-  Department of Defense (DoD) government plan

   .. code-block:: none

      https://manage.protection.apps.mil/api/v1.0/{tenant_id}/activity/feed/{operation}

Office 365 subscription plans may have different features and services included, so the available activities can vary based on your specific plan. Here are some categories of activities that you may find in the Office 365 Management API, depending on common Office 365 plans and services:

-  **Azure Active Directory (Azure AD) activities** -  Events related to the creation, modification, or deletion of users and groups in Azure AD. This also includes sign-ins, authentication events, and role assignments and changes.
-  **Exchange Online activities**: This includes email-related activities, mailbox permission changes, and changes to email properties, attachments, and folders.
-  **SharePoint Online activities**: This category includes events related to sharing documents and sites, user access rights and permissions changes, and file and folder operations.
-  **Microsoft Teams activities**: Activities relating to channel and team management, message and chat operation, and meeting-related events.
-  **Security and Compliance Center activities**: This category includes events related to compliance policies and data loss prevention (DLP). This also includes alerts for policy violations and eDiscovery activities.
-  **General activities**: Events that do not fall into specific service categories. This category may include general changes and administrative activities.

The Office 365 Management Activity API supports several operations. These include starting a subscription to receive notifications, retrieving activity data for a tenant, and stopping a subscription to discontinue data retrieval for a tenant. Using the Activity API, you can list current subscriptions, available content, and the corresponding content URLs. You can also retrieve content by using the content URL.

Below, we show how to use the Activity API to list available content and retrieve content operations.

-  **Listing available content**

   You can list the content currently available for retrieval for a specified content type. This content constitutes a collection of actions and events that occur in an Office 365 environment. To retrieve the available content, Microsoft provides the following API endpoint to retrieve data when using an Office 365 enterprise plan:

   .. code-block:: none

      Get https://manage.office.com/api/v1.0/<Tenant_ID>/activity/feed//subscriptions/content?contentType=<ContentType>&startTime=<START_TIME>&endTime=<END_TIME>

   Where:

   -  The ``<Tenant_ID>`` variable is the tenant ID for the subscription.
   -  The ``<ContentType>`` variable indicates the content type. For example, ``Audit.AzureActiveDirectory`` and ``Audit.General``.
   -  The ``<START_TIME>`` and ``<END_TIME>`` variables indicate the time range of content to return, based on when the content became available (date format: YYYY-MM-DD).

   You can list the content currently available for retrieval for the specified content type manually by following the steps below.

   #. Use the PowerShell script below to generate an access token. Create a file ``AccessToken.ps1``, then copy and paste the contents below into the file created. Replace ``<YOUR_APPLICATION_ID>``, ``<YOUR_CLIENT_SECRET>``, and ``<YOUR_TENANT_ID>`` with the correct values collected during the application registration:

      .. code-block:: pwsh-session
         :emphasize-lines: 1-3

         $clientId = "<YOUR_APPLICATION_ID>"
         $clientSecret = "<YOUR_CLIENT_SECRET>"
         $tenantId = "<YOUR_TENANT_ID>"
         $resource = "https://manage.office.com"

         $tokenEndpoint = "https://login.microsoftonline.com/$tenantId/oauth2/token"
         $tokenRequestBody = @{
             grant_type    = "client_credentials"
             client_id     = $clientId
             client_secret = $clientSecret
             resource      = $resource
         }

         $tokenResponse = Invoke-RestMethod -Uri $tokenEndpoint -Method POST -Body $tokenRequestBody
         $MyToken = $tokenResponse.access_token
         echo $MyToken

   #. Open a regular PowerShell terminal and run the commands below to execute the PowerShell script ``AccessToken.ps1`` created in the previous step:

      .. code-block:: powershell
      
         > Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
         > $accessToken = <PATH>/AccessToken.ps1

      .. note::
      
         The command ``Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`` is used to allow the execution of local scripts. Replace ``<PATH>`` with the file path to the PowerShell script.

   #. Run the command below on the same PowerShell terminal to get the list of currently available content for a content type:

      .. code-block:: powershell
      
         Invoke-RestMethod -Uri "https://manage.office.com/api/v1.0/<TENANT_ID>/activity/feed/subscriptions/content?contentType=<CONTENT_TYPE>&startTime=<START_TIME>&endTime=<END_TIME>" -Headers @{ Authorization = "Bearer $accessToken"; ContentType = "application/json" } -Method Get; $response.value 

      Replace:

      -  The ``<TENANT_ID>`` variable with a valid tenant ID.
      -  The ``<CONTENT_TYPE>`` variable with a valid content type. For example ``Audit.AzureActiveDirectory``
      -  The ``<START_TIME>`` and ``<END_TIME>`` variables with date range (format: YYYY-MM-DD)

      .. code-block:: none
         :class: output
      
         contentUri        : https://manage.office.com/api/v1.0/<Tenant_ID>/activity/feed/audit/20240129073247100003384$20*********081955691028239  			  $audit_azureactivedirectory$Audit_AzureActiveDirectory$emea0010
         contentId         : 20240129073247100003384$20*********081955691028239$audit_azureactivedirectory$Audit_AzureActiveDirectory$emea0010
         contentType       : Audit.AzureActiveDirectory
         contentCreated    : 2024-01-29T08:19:55.691Z
         contentExpiration : 2024-02-05T07:32:47.100Z
         ...

-  **Retrieving content**

   To retrieve a content blob, make a GET request against the corresponding content URI that is included in the list of available content. The returned content will be a collection of one or more actions or events in JSON format.

   .. code-block:: none
      
      GET <CONTENT_URI>

   Replace the ``<CONTENT_URI>`` variable with the value of a content URI that is included in the list of available content.

   The `Office 365 Management API documentation <https://docs.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-reference>`__ provides details on the available endpoints and response formats. You can refer to the documentation for more information.

Office 365 API requirements
---------------------------

Wazuh needs to authenticate to the Office 365 Management API to connect and pull audit logs for analysis. This process is achieved by registering an application on the Microsoft Azure portal to obtain the required credentials.

You need the following requirements to access the audit logs of Office 365 with Wazuh:

-  **The application (client) ID**: The unique ID of the application created in the Microsoft Azure portal to pull logs from Office 365.
-  **The directory (tenant) ID**: The tenant ID which is the same as the organization ID identifies which Azure Active Directory instance the application sits under.
-  **The client secret**: A shared secret known to both the application and the authorization server.

Setting up Office 365 for monitoring
------------------------------------

The Office 365 API provides an endpoint for accessing audit logs in Office 365. You need an application with the right permissions to access the Microsoft API. The following list provides a summary of the steps you need to perform on Microsoft Azure to integrate with Wazuh:

-  **Registering an app via the Microsoft Azure portal**: This step involves creating an application with unique credentials (client ID, tenant ID, and client secret) in your organization.
-  **Creating certificates and secrets**: The created application needs to authenticate to the Office 365 Management API to ensure security. This step shows how to create certificates and secrets for the application.
-  **Enabling API permissions**: The created application needs specific API permissions to request the Office 365 activity events. This step shows how to assign the appropriate permissions required to pull logs from the Office 365 Management API.

Registering an app via the Azure portal
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To authenticate with the Microsoft identity platform endpoint, you need to register an app in your `Azure portal <https://portal.azure.com>`__.

#. Sign in to your `Azure portal <https://portal.azure.com>`__.
#. Click on **New registration** in the `Microsoft Azure portal app registrations <https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade>`__ section.

   .. thumbnail:: /images/cloud-security/office365/azure-new-app-registration.png
      :title: Azure new app registration
      :alt: Azure new app registration
      :align: center
      :width: 80%

#. Fill in the name of your application, choose the desired account type, and click on the **Register** button.

   .. thumbnail:: /images/cloud-security/office365/azure-register-app.png
      :title: Azure – Register app
      :alt: Azure – Register app
      :align: center
      :width: 80%

   At this point, the application is registered.

#. Click on the **Overview** tab on the menu to view and copy the application’s ``client`` and ``tenant`` IDs.

   .. thumbnail:: /images/cloud-security/office365/azure-client-tenant-id-in-overview.png
      :title: Azure – Client and tenant IDs in overview
      :alt: Azure – Client and tenant IDs in overview
      :align: center
      :width: 80%

Creating certificates and secrets
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The application requires a certificate and secret to use during the authentication process.

#. Navigate to the **Certificates & secrets** menu and click the **New client secret** button. Then, fill in the **Description** and **Expires** fields of the new secret under the **Add a client secret** section.

   .. thumbnail:: /images/cloud-security/office365/azure-certificates-and-secrets.png
      :title: Azure – Certificates and secrets
      :alt: Azure – Certificates and secrets
      :align: center
      :width: 80%

#. Copy and save the value of the secret under the **Client secrets** section.

   .. thumbnail:: /images/cloud-security/office365/azure-client-secrets-value.png
      :title: Azure – Client secrets value
      :alt: Azure – Client secrets value
      :align: center
      :width: 80%

   .. note::
      
      Make sure you write it down because the web interface won’t let you copy it afterward.

Enabling API permissions
^^^^^^^^^^^^^^^^^^^^^^^^

The application requires specific API permissions to request Office 365 activity events. In this case, we are looking for permissions related to the https://manage.office.com resource.

Perform the following steps to configure the application permissions:

#. Navigate to the **API permissions** menu and choose **Add a permission**.

   -  Select the **Office 365 Management APIs** and click on **Application permissions**.
   -  Add the following permissions under the **ActivityFeed** group:

      -  ``ActivityFeed.Read``: Read activity data for your organization.
      -  ``ActivityFeed.ReadDlp``: Read DLP policy events including detected sensitive data.

   -  Click on the **Add permissions** button.

   .. thumbnail:: /images/cloud-security/office365/azure-request-api-permissions.png
      :title: Azure – Request API permissions
      :alt: Azure – Request API permissions
      :align: center
      :width: 80%

   .. note::
      
      Admin consent is required for API permission changes.

   .. thumbnail:: /images/cloud-security/office365/azure-admin-consent.png
      :title: Azure – Admin consent for API permission changes
      :alt: Azure – Admin consent for API permission changes
      :align: center
      :width: 80%

Setting up Wazuh for Office 365 monitoring
------------------------------------------

This section delves into the processes involved in configuring Wazuh for effective monitoring of Office 365 environments. The various aspects of the configuration process include the integration with Office 365 APIs for log collection, the activation of the dashboard visualization module for Office 365 events, and the correlation of rules.

Configuring Wazuh with Office 365 APIs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh module for Office 365 pulls audit logs from the Office 365 APIs for analysis and rule correlation. You can configure the module on either the Wazuh server or the Wazuh agent. It is recommended to configure it on the Wazuh agent to reduce the workload on the Wazuh server, thereby improving the performance of your monitoring infrastructure.

Perform the following steps to configure the Wazuh server to pull audit logs from an Office 365 environment.

#. Append the following configuration to the ``/var/ossec/etc/ossec.conf`` file. The configuration pulls only the ``Audit.SharePoint`` type of events within an interval of ``1m``.

   .. code-block:: xml
      :emphasize-lines: 8-10

      <ossec_config>
        <office365>
          <enabled>yes</enabled>
          <interval>1m</interval>
          <curl_max_size>1M</curl_max_size>
          <only_future_events>yes</only_future_events>
          <api_auth>
            <tenant_id><YOUR_TENANT_ID></tenant_id>
            <client_id><YOUR_CLIENT_ID></client_id>
            <client_secret><YOUR_CLIENT_SECRET></client_secret>
            <api_type>commercial</api_type>
          </api_auth>
          <subscriptions>
            <subscription>Audit.SharePoint</subscription>
          </subscriptions>
        </office365>
      </ossec_config>

   Where:

   -  ``<enabled>`` enables the Wazuh module for Office 365. The allowed values for this option are ``yes`` and ``no``.
   -  ``<interval>`` defines the time interval between each execution of the Wazuh module for Office 365. The allowed value is any positive number that contains a suffix character indicating a time unit, such as ``s`` (seconds), ``m`` (minutes), ``h`` (hours), and ``d`` (days). The default interval for the module execution if not specified is ``10m``.
   -  ``<curl_max_size>`` specifies the maximum size allowed for the Microsoft API response. The allowed value is any positive number that contains a suffix character indicating a size unit, such as ``b/B`` (bytes), ``k/K`` (kilobytes), ``m/M`` (megabytes), and ``g/G`` (gigabytes). The default value is ``1M``.
   -  ``<only_future_events>`` specifies the Wazuh module for Office 365 to collect only events generated after you start the Wazuh manager when the value is set to ``yes``. When the value is set to no, it collects previous events generated before you start the Wazuh manager. The default value is ``yes``, and the allowed values are ``yes`` and ``no``.
   -  The ``<api_auth>`` block configures the credential for the authentication with the Office 365 REST API. The tags ``<tenant_id>``, ``<client_id>``, ``<client_secret>``, and ``<api_type>`` are configuration tags within ``<api_auth>``.

      -  ``<tenant_id>`` specifies the tenant ID of the application registered in Azure. The allowed value is any string. Replace the variable, ``<YOUR_TENANT_ID>`` with the tenant ID of your application registered in Azure.
      -  ``<client_id>`` specifies the client ID of the application registered in Azure. The allowed value is any string. Replace the variable, ``<YOUR_CLIENT_ID>`` with the client ID of your application registered in Azure.
      -  ``<client_secret>`` specifies the client secret value of the application registered in Azure. Replace the variable, ``<YOUR_CLIENT_SECRET>`` with the client secret of your application registered in Azure.
      -  ``<api_type>`` specifies the type of Office 365 subscription plan used by the tenant. The allowed subscriptions are ``commercial``, ``gcc``, and ``gcc-high``.

   -  The ``<subscriptions>`` block configures the internal options in the Office 365 REST API.

      -  ``<subscription>`` specifies the content types from which Wazuh collects audit logs. The :ref:`subscription types <office365_module_subscriptions_subscription>` that can be configured include ``Audit.AzureActiveDirectory``, ``Audit.Exchange``, ``Audit.SharePoint``, ``Audit.General``, and ``DLP.All``.

   To learn more about the configuration options, kindly check the :doc:`Wazuh module for Office 365 </user-manual/reference/ossec-conf/office365-module>` reference guide.

#. Restart the Wazuh manager service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Configuring multiple tenants
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can configure Wazuh to monitor multiple tenants in an organization by specifying the organization’s credentials (``<tenant_id>``, ``<client_id>``, ``<client_secret>``, and ``<api_type>``) in individual ``<api_auth>`` blocks.

For example, the following configuration monitors two tenants in an organization:

.. code-block:: xml
   :emphasize-lines: 7-18

   <ossec_config>
     <office365>
       <enabled>yes</enabled>
       <interval>1m</interval>
       <curl_max_size>1M</curl_max_size>
       <only_future_events>yes</only_future_events>
       <api_auth>
         <tenant_id><YOUR_TENANT_ID_1></tenant_id>
         <client_id><YOUR_CLIENT_ID_1></client_id>
         <client_secret><YOUR_CLIENT_SECRET_1></client_secret>
         <api_type>commercial</api_type>
       </api_auth>
       <api_auth>
         <tenant_id><YOUR_TENANT_ID_2></tenant_id>
         <client_id><YOUR_CLIENT_ID_2></client_id>
         <client_secret><YOUR_CLIENT_SECRET_2></client_secret>
         <api_type>commercial</api_type>
       </api_auth>
       <subscriptions>
         <subscription>Audit.AzureActiveDirectory</subscription>
         <subscription>Audit.General</subscription>
       </subscriptions>
     </office365>
   </ossec_config>

Replace:

-  ``<YOUR_TENANT_ID_1>``, ``<YOUR_CLIENT_ID_1>``, and ``<YOUR_CLIENT_SECRET_1>`` with the organization's credentials for tenant 1.
-  ``<YOUR_TENANT_ID_2>``, ``<YOUR_CLIENT_ID_2>``, and ``<YOUR_CLIENT_SECRET_2>`` with the organization's credentials for tenant 2.

Configuring multiple subscriptions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh pulls audit logs from the following subscription types in Office 365:

-  **Audit.AzureActiveDirectory**: User identity management.
-  **Audit.Exchange**: Mail and calendaring server.
-  **Audit.SharePoint**: Web-based collaborative platform.
-  **Audit.General**: Includes all other workloads not included in the previous content types.
-  **DLP.All**: Data loss prevention workloads.

You can configure Wazuh to monitor multiple subscriptions in an organization tenant(s) by specifying the subscription type in individual ``<subscription>`` tags within the same ``<subscriptions>`` block.

For example, the following configuration pulls only the ``Audit.AzureActiveDirectory`` and ``Audit.General`` type of events within a tenant in an organization:

.. code-block:: xml
   :emphasize-lines: 14-15

   <ossec_config>
     <office365>
       <enabled>yes</enabled>
       <interval>1m</interval>
       <curl_max_size>1M</curl_max_size>
       <only_future_events>yes</only_future_events>
       <api_auth>
         <tenant_id><YOUR_TENANT_ID></tenant_id>
         <client_id><YOUR_CLIENT_ID></client_id>
         <client_secret><YOUR_CLIENT_SECRET></client_secret>
         <api_type>commercial</api_type>
       </api_auth>
       <subscriptions>
         <subscription>Audit.AzureActiveDirectory</subscription>
         <subscription>Audit.General</subscription>
       </subscriptions>
     </office365>
   </ossec_config>

Replace ``<YOUR_TENANT_ID>``, ``<YOUR_CLIENT_ID>``, and ``<YOUR_CLIENT_SECRET>`` with the organization's credentials for the tenant.

Visualizing the Office 365 activity
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh module for Office 365 provides three visualization options to gain better insight into the events that occur in Office 365. These visualization options are the **Dashboard**, **Panel**, and **Events**. Navigate to the  **Office 365** tab on the **Cloud security** section of the Wazuh dashboard to view this information.

Panel
~~~~~

This visualization option provides detailed information about the event that occurred including the top users of the service, the top client IP addresses using the service, top rules that have been triggered, and the top operations performed in Office 365.

.. thumbnail:: /images/cloud-security/office365/office365-module-panel.png
   :title: Office 365 modul panel
   :alt: Office 365 modul panel
   :align: center
   :width: 80%

Dashboard
~~~~~~~~~

The dashboard visualization option provides a comprehensive view of the actions performed in a monitored Office 365 environment. This information includes suspicious downloads, Full Access Permissions, Phishing and Malware, Events by severity over time, IP address by Users, Geolocation map, and many more as seen in the image below.

.. thumbnail:: /images/cloud-security/office365/dashboard-visualization-option.png
   :title: Office 365 dashboard visualization option
   :alt: Office 365 dashboard visualization option
   :align: center
   :width: 80%

Events
~~~~~~

The events visualization option shows the alerts generated by events that occur in the Office 365 environment. Here you can see details such as the agent name, the operation a user performs, the user who performs an action, a description of the alert, the rule level of the alert, and more fields.

This visualization also offers additional functionalities that include:

-  Event filtering based on specific fields such as rule IDs, rule groups, IP addresses, and others.
-  Dynamic searches based on structured queries.
-  Complete details of the generated alert including the full log, matched decoder, and others.

.. thumbnail:: /images/cloud-security/office365/events-visualization-option.png
   :title: Office 365 events visualization option
   :alt: Office 365 events visualization option
   :align: center
   :width: 80%

You can expand each alert entry to view additional information about the event that triggered the alert, as shown in the image below.

.. thumbnail:: /images/cloud-security/office365/events-visualization-option-expand-alert1.png
   :title: Office 365 events visualization option – Expand alert
   :alt: Office 365 events visualization option – Expand alert
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/office365/events-visualization-option-expand-alert2.png
   :title: Office 365 events visualization option – Expand alert
   :alt: Office 365 events visualization option – Expand alert
   :align: center
   :width: 80%


Use cases
---------

Detecting user login into Microsoft Azure AD
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When a user logs into the Microsoft Azure AD, the action generates an event. You can configure Wazuh to monitor and visualize these events by performing the following actions:

#. Append the following configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server:

   .. code-block:: xml
      :emphasize-lines: 8-10

      <ossec_config>
        <office365>
          <enabled>yes</enabled>
          <interval>1m</interval>
          <curl_max_size>1M</curl_max_size>
          <only_future_events>yes</only_future_events>
          <api_auth>
            <tenant_id><YOUR_TENANT_ID></tenant_id>
            <client_id><YOUR_CLIENT_ID></client_id>
            <client_secret><YOUR_CLIENT_SECRET></client_secret>
            <api_type>commercial</api_type>
          </api_auth>
          <subscriptions>
            <subscription>Audit.AzureActiveDirectory</subscription>
          </subscriptions>
        </office365>
      </ossec_config>

   Replace:

   -  The ``<YOUR_TENANT_ID>`` variable with the tenant ID of your application registered in Microsoft Azure.
   -  The ``<YOUR_CLIENT_ID>`` variable with the client ID of your application registered in Microsoft Azure.
   -  The ``<YOUR_CLIENT_SECRET>`` variable with the client secret of your application registered in Microsoft Azure.

#. Restart the Wazuh manager service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Log into your `Azure portal <https://portal.azure.com/>`__.

#. Visit the Wazuh dashboard and navigate to **Modules** > **Office 365**, then click on the **Events** tab to view the generated alerts.

   .. thumbnail:: /images/cloud-security/office365/office-365-log-in-generated-alerts.png
      :title: Office 365 log in generated alerts
      :alt: Office 365 log in generated alerts
      :align: center
      :width: 80%

   Below is the JSON format of the generated alert.

   .. code-block:: none
      :emphasize-lines: 23,56,80

      {
        "_index": "wazuh-alerts-4.x-2024.01.29",
        "_id": "vNQjVI0B9LTh695MXIMn",
        "_version": 1,
        "_score": null,
        "_source": {
          "input": {
            "type": "log"
          },
          "agent": {
            "name": "wazuh-server",
            "id": "000"
          },
          "manager": {
            "name": "wazuh-server"
          },
          "data": {
            "integration": "office365",
            "office365": {
              "AzureActiveDirectoryEventType": "1",
              "UserKey": "5a4603e7-100d-4fab-83c0-8dac779b2628",
              "ActorIpAddress": "102.244.157.118",
              "Operation": "UserLoggedIn",
              "OrganizationId": "0fea4e03-8146-453b-b889-54b4bd11565b",
              "ExtendedProperties": [
                {
                  "Value": "Redirect",
                  "Name": "ResultStatusDetail"
                },
                {
                  "Value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                  "Name": "UserAgent"
                },
                {
                  "Value": "OAuth2:Authorize",
                  "Name": "RequestType"
                }
              ],
              "IntraSystemId": "aa9ef67e-5237-49e0-9d45-587d8afc1f00",
              "Target": [
                {
                  "Type": 0,
                  "ID": "5f09333a-842c-47da-a157-57da27fcbca5"
                }
              ],
              "RecordType": "15",
              "Version": "1",
              "ModifiedProperties": [],
              "Actor": [
                {
                  "Type": 0,
                  "ID": "5a4603e7-100d-4fab-83c0-8dac779b2628"
                },
                {
                  "Type": 5,
                  "ID": "XXXXXXX@wazuh.com"
                }
              ],
              "DeviceProperties": [
                {
                  "Value": "Windows10",
                  "Name": "OS"
                },
                {
                  "Value": "Chrome",
                  "Name": "BrowserType"
                },
                {
                  "Value": "80ce5b15-c485-4128-a9ea-f9c0cdfb663d",
                  "Name": "SessionId"
                }
              ],
              "Subscription": "Audit.AzureActiveDirectory",
              "ActorContextId": "0fea4e03-8146-453b-b889-54b4bd11565b",
              "ResultStatus": "Success",
              "ObjectId": "5f09333a-842c-47da-a157-57da27fcbca5",
              "ErrorNumber": "0",
              "ClientIP": "102.244.157.118",
              "Workload": "AzureActiveDirectory",
              "UserId": "XXXXXXX@wazuh.com",
              "TargetContextId": "0fea4e03-8146-453b-b889-54b4bd11565b",
              "CreationTime": "2024-01-29T07:29:21",
              "Id": "aa9ef67e-5237-49e0-9d45-587d8afc1f00",
              "InterSystemsId": "e0e158a5-202d-4e1f-bb93-873be484222d",
              "ApplicationId": "89bee1f7-5e6e-4d8a-9f3d-ecd601259da7",
              "UserType": "0"
            },
            "aws": {
              "accountId": "",
              "region": ""
            }
          },
          "rule": {
            "firedtimes": 1,
            "mail": false,
            "level": 3,
            "hipaa": [
              "164.312.a.2.I",
              "164.312.b",
              "164.312.d",
              "164.312.e.2.II"
            ],
            "pci_dss": [
              "8.3",
              "10.6.1"
            ],
            "description": "Office 365: Secure Token Service (STS) logon events in Azure Active Directory.",
            "groups": [
              "office365",
              "AzureActiveDirectoryStsLogon"
            ],
            "id": "91545"
          },
          "location": "office365",
          "decoder": {
            "name": "json"
          },
          "id": "1706513609.3469",
          "GeoLocation": {
            "city_name": "Sangmelima",
            "country_name": "Cameroon",
            "region_name": "South",
            "location": {
              "lon": XX.XX33,
              "lat": XX.XX33
            }
          },
          "timestamp": "2024-01-29T07:33:29.195+0000"
        },
        "fields": {
          "timestamp": [
            "2024-01-29T07:33:29.195Z"
          ]
        },
        "highlight": {
          "manager.name": [
            "@opensearch-dashboards-highlighted-field@wazuh-server@/opensearch-dashboards-highlighted-field@"
          ],
          "rule.groups": [
            "@opensearch-dashboards-highlighted-field@office365@/opensearch-dashboards-highlighted-field@"
          ]
        },
        "sort": [
          1706513609195
        ]
      }

Detecting creation and deletion of user accounts in Microsoft Azure AD
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to monitor admin activities in Microsoft Azure AD (the directory service for Office 365) including creation and deletion of a user account.

Wazuh server
~~~~~~~~~~~~

Perform the following steps to configure the Wazuh server for monitoring admin activities on Microsoft Azure AD.

#. Append the following configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server:

   .. code-block:: xml

      <ossec_config>
        <office365>
          <enabled>yes</enabled>
          <interval>1m</interval>
          <curl_max_size>1M</curl_max_size>
          <only_future_events>yes</only_future_events>
          <api_auth>
            <tenant_id><YOUR_TENANT_ID></tenant_id>
            <client_id><YOUR_CLIENT_ID></client_id>
            <client_secret><YOUR_CLIENT_SECRET></client_secret>
            <api_type>commercial</api_type>
          </api_auth>
          <subscriptions>
            <subscription>Audit.AzureActiveDirectory</subscription>
          </subscriptions>
        </office365>
      </ossec_config>

   Replace:

   -  The variable, ``<YOUR_TENANT_ID>``, with the tenant ID of your application registered in Microsoft Azure.
   -  The variable, ``<YOUR_CLIENT_ID>``, with the client ID of your application registered in Microsoft Azure.
   -  The variable, ``<YOUR_CLIENT_SECRET>``, with the client secret of your application registered in Microsoft Azure.

#. Restart the Wazuh manager service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Microsoft Azure portal
~~~~~~~~~~~~~~~~~~~~~~

We create and delete a user account on the Microsoft Azure AD to generate an activity for Wazuh to monitor and display on the dashboard.

Perform the following actions to create and delete a test user account.

#. Azure Active Directory is now Microsoft Entra ID. In the Search bar of the Azure portal, type ``Microsoft Entra ID``, and click on it to access your AD.
#. Navigate to **Users** from the side menu and click on **New user** > **Create new user**.

   .. thumbnail:: /images/cloud-security/office365/azure-create-new-user.png
      :title: Azure create new user
      :alt: Azure create new user
      :align: center
      :width: 80%

#. Fill in the user’s information and click on the **Review + create** button to create the user.

   .. thumbnail:: /images/cloud-security/office365/azure-review-create-new-user.png
      :title: Azure Review+Create new user
      :alt: Azure Review+Create new user
      :align: center
      :width: 80%

#. Delete the user by selecting the **Display name** and clicking on the **Delete** button.

   .. thumbnail:: /images/cloud-security/office365/azure-delete-user.png
      :title: Azure delete user
      :alt: Azure delete user
      :align: center
      :width: 80%

Wazuh dashboard
~~~~~~~~~~~~~~~

Navigate to **Modules** > **Office 365** and click on the **Events** tab to view the generated alerts.

   .. thumbnail:: /images/cloud-security/office365/azure-create-delete-account-alerts.png
      :title: Azure account creation/deletion alerts
      :alt: Azure account creation/deletion alerts
      :align: center
      :width: 80%

Below is a sample alert of the user addition event in JSON format.

.. code-block:: json
   :emphasize-lines: 22, 24, 36, 109, 114

   {
     "_index": "wazuh-alerts-4.x-2024.01.29",
     "_id": "0NRwVY0B9LTh695MCISi",
     "_version": 1,
     "_score": null,
     "_source": {
       "input": {
         "type": "log"
       },
       "agent": {
         "name": "wazuh-server",
         "id": "000"
       },
       "manager": {
         "name": "wazuh-server"
       },
       "data": {
         "integration": "office365",
         "office365": {
           "AzureActiveDirectoryEventType": "1",
           "ResultStatus": "Success",
           "ObjectId": "testuser@wazuh.com",
           "UserKey": "10032002120F5B41@wazuh.com",
           "Operation": "Add user.",
           "OrganizationId": "0fea4e03-8146-453b-b889-54b4bd11565b",
           "ExtendedProperties": [
             {
               "Value": "{}",
               "Name": "additionalDetails"
             },
             {
               "Value": "User",
               "Name": "extendedAuditEventCategory"
             }
           ],
           "Workload": "AzureActiveDirectory",
           "IntraSystemId": "db6d1058-438e-452a-8de2-82650855e986",
           "Target": [
             {
               "Type": 2,
               "ID": "User_f1937c88-f4f2-43b3-a753-e324345e39e4"
             },
             {
               "Type": 2,
               "ID": "f1937c88-f4f2-43b3-a753-e324345e39e4"
             },
             {
               "Type": 2,
               "ID": "User"
             },
             {
               "Type": 5,
               "ID": "testuser@wazuh.com"
             },
             {
               "Type": 3,
               "ID": "100320034A719856"
             }
           ],
           "RecordType": "8",
           "Version": "1",
           "ModifiedProperties": [
             {
               "OldValue": "[]",
               "NewValue": "[\r\n  true\r\n]",
               "Name": "AccountEnabled"
             },
             {
               "OldValue": "[]",
               "NewValue": "[\r\n  \"testuser\"\r\n]",
               "Name": "DisplayName"
             },
             {
               "OldValue": "[]",
               "NewValue": "[\r\n  \"Test\"\r\n]",
               "Name": "GivenName"
             },
             {
               "OldValue": "[]",
               "NewValue": "[\r\n  \"testuser\"\r\n]",
               "Name": "MailNickname"
             },
             {
               "OldValue": "[]",
               "NewValue": "[\r\n  \"2024-01-29T13:19:12Z\"\r\n]",
               "Name": "StsRefreshTokensValidFrom"
             },
             {
               "OldValue": "[]",
               "NewValue": "[\r\n  \"User\"\r\n]",
               "Name": "Surname"
             },
             {
               "OldValue": "[]",
               "NewValue": "[\r\n  \"testuser@wazuh.com\"\r\n]",
               "Name": "UserPrincipalName"
             },
             {
               "OldValue": "[]",
               "NewValue": "[\r\n  \"Member\"\r\n]",
               "Name": "UserType"
             },
             {
               "OldValue": "",
               "NewValue": "AccountEnabled, DisplayName, GivenName, MailNickname, StsRefreshTokensValidFrom, Surname, UserPrincipalName, UserType",
               "Name": "Included Updated Properties"
             }
           ],
           "UserId": "XXXXXXX@wazuh.com",
           "TargetContextId": "0fea4e03-8146-453b-b889-54b4bd11565b",
           "Actor": [
             {
               "Type": 5,
               "ID": "XXXXXXX@wazuh.com"
             },
             {
               "Type": 3,
               "ID": "10032002120F5B41"
             },
             {
               "Type": 2,
               "ID": "User_046e51c3-4029-44c0-b57a-e80d39e4970e"
             },
             {
               "Type": 2,
               "ID": "046e51c3-4029-44c0-b57a-e80d39e4970e"
             },
             {
               "Type": 2,
               "ID": "User"
             }
           ],
           "CreationTime": "2024-01-29T13:19:12",
           "Id": "0c620dac-5a11-4478-a8fe-4c8f35d89517",
           "InterSystemsId": "1f9afa31-170c-4862-8655-5b48b00cc368",
           "Subscription": "Audit.AzureActiveDirectory",
           "UserType": "0",
           "ActorContextId": "0fea4e03-8146-453b-b889-54b4bd11565b"
         },
         "aws": {
           "accountId": "",
           "region": ""
         }
       },
       "rule": {
         "firedtimes": 1,
         "mail": false,
         "level": 6,
         "hipaa": [
           "164.312.a.2.I",
           "164.312.b"
         ],
         "pci_dss": [
           "8.1.2",
           "10.6.2"
         ],
         "description": "Office 365: Added user",
         "groups": [
           "office365",
           "AzureActiveDirectory"
         ],
         "mitre": {
           "technique": [
             "Valid Accounts",
             "Additional Cloud Credentials"
           ],
           "id": [
             "T1078",
             "T1098.001"
           ],
           "tactic": [
             "Defense Evasion",
             "Persistence",
             "Privilege Escalation",
             "Initial Access"
           ]
         },
         "id": "91709"
       },
       "location": "office365",
       "decoder": {
         "name": "json"
       },
       "id": "1706535414.239597",
       "timestamp": "2024-01-29T13:36:54.168+0000"
     },
     "fields": {
       "timestamp": [
         "2024-01-29T13:36:54.168Z"
       ]
     },
     "highlight": {
       "manager.name": [
         "@opensearch-dashboards-highlighted-field@wazuh-server@/opensearch-dashboards-highlighted-field@"
       ],
       "rule.groups": [
         "@opensearch-dashboards-highlighted-field@office365@/opensearch-dashboards-highlighted-field@"
       ]
     },
     "sort": [
       1706535414168
     ]
   }
