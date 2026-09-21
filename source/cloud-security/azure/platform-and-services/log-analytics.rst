.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section shows how to set up a qualified application or client to use the Azure Log Analytics REST API and gives a use case.

Microsoft Azure Log Analytics
=============================

`Microsoft Azure Log Analytics <https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview>`__ is a service that monitors your Microsoft Azure infrastructure, offering query capabilities that allow you to perform advanced searches specific to your data.

The Microsoft Azure Log Analytics service helps you analyze and search Azure activity logs across all your Azure subscriptions, providing information about operations performed on your subscription resources.

.. thumbnail:: /images/cloud-security/azure/log-analytics-activity-send.png
   :align: center
   :width: 80%

Configuration
-------------

Microsoft Azure
^^^^^^^^^^^^^^^

You can query data collected by Log Analytics using the Azure Log Analytics REST API, which uses the Microsoft Entra ID authentication scheme. You need a qualified application or client to use the Azure Log Analytics REST API. You must configure this manually on the Microsoft Azure portal.

The process below details how to create an application using the Azure Log Analytics REST API. You can also configure an existing application. Skip the `Create the application`_ step if you already have an existing application.

Create the application
~~~~~~~~~~~~~~~~~~~~~~

Navigate to the Microsoft Entra ID panel in the Microsoft Azure portal to create a new application for Azure Log Analytics.

#. Select the **App registrations** option from the **Microsoft Entra ID** panel. Then, select **New registration**.

   .. thumbnail:: /images/cloud-security/azure/new-app-registration.png
      :align: center
      :width: 80%

#. Define the user-facing display name for the application and select **Register**.

   .. thumbnail:: /images/cloud-security/azure/register-an-application.png
      :align: center
      :width: 80%

Grant permissions to the application
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Select **All applications** from **App registration** and refresh it to view your list of applications. In our case, our application's display name is **LogAnalyticsApp**.

   .. thumbnail:: /images/cloud-security/azure/application-display-name.png
      :align: center
      :width: 80%

#. Go to the **Overview** section and save the **Application (client) ID** for later authentication.

   .. thumbnail:: /images/cloud-security/azure/save-application-ID.png
      :align: center
      :width: 80%

#. Go to the **API permissions** section and click on **Add a permission**.

   .. thumbnail:: /images/cloud-security/azure/add-api-permission.png
      :align: center
      :width: 80%

#. Search for the **Log Analytics API**.

   .. thumbnail:: /images/cloud-security/azure/search-log-analytics-api.png
      :align: center
      :width: 80%

#. Select the **Data.Read** permission and click **Add permissions**.

   .. thumbnail:: /images/cloud-security/azure/select-read-log-analytics.png
      :align: center
      :width: 80%

#. Use an admin user to **Grant admin consent** for the tenant.

   .. thumbnail:: /images/cloud-security/azure/grant-admin-consent.png
      :align: center
      :width: 80%

Grant the application access to the Azure Log Analytics API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Access **Log Analytics workspaces** and create a new workspace or choose an existing one.

   .. thumbnail:: /images/cloud-security/azure/create-log-analytics-workspace.png
      :align: center
      :width: 80%

#. Copy the ``Workspace ID`` value from the **Overview** section.

   .. thumbnail:: /images/cloud-security/azure/copy-workspace-ID.png
      :align: center
      :width: 80%

#. Go to the **Access control (IAM)** section, click **Add**, and select **Add role assignment** to add the required role to the application.

   .. thumbnail:: /images/cloud-security/azure/add-role-assignment.png
      :align: center
      :width: 80%

#. Select the **Log Analytics Reader** role from the **Job functions role** tab.

   .. thumbnail:: /images/cloud-security/azure/select-reader-role.png
      :align: center
      :width: 80%

#. Select **User, group, or service principal** from the **Members** tab. Click **Select members** and find the App registration created previously.

   .. thumbnail:: /images/cloud-security/azure/select-members.png
      :align: center
      :width: 80%

#. Click **Review + assign** to finish.

Send logs to the Workspace
~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a diagnostic setting to collect logs and send them to the Azure Log Analytics Workspace created in the previous steps.

#. Return to **Microsoft Entra ID**, scroll down on the left menu bar, and select the **Diagnostic settings** section.
#. Click on **Add diagnostic setting**.

   .. thumbnail:: /images/cloud-security/azure/add-diagnostic-setting.png
      :align: center
      :width: 80%

#. Choose the log categories you want to collect from under **Categories**. Select the **Send to Log Analytics workspace** option under **Destination details**. Select the **Log Analytics Workspace** you created in the previous steps.

   .. thumbnail:: /images/cloud-security/azure/choose-categories.png
      :align: center
      :width: 80%

#. Click on **Save**.

Azure Log Analytics streams the selected categories to your workspace.

Wazuh requires valid credentials to pull logs from Azure Log Analytics. Look at the :ref:`authentication <configure_azure_credentials>` section to learn how to generate a client secret to access the registered application.

Wazuh agent
^^^^^^^^^^^

You need to authorize the Wazuh module for Azure to access your Azure Log Analytics. For more information on setting up authorization, see the :ref:`authentication <configure_azure_credentials>` section.

#. Apply the following configuration to the local configuration file ``/var/ossec/etc/ossec.conf`` of the Wazuh agent.

   .. code-block:: xml
      :emphasize-lines: 6, 7, 11

      <wodle name="azure-logs">
         <disabled>no</disabled>
         <run_on_start>yes</run_on_start>

         <log_analytics>
            <auth_path>/var/ossec/wodles/credentials/<LOG_ANALYTICS_CREDENTIALS></auth_path>
            <tenantdomain><YOUR_TENANT_DOMAIN></tenantdomain>
            <request>
               <tag>azure-auditlogs</tag>
               <query>AuditLogs</query>
               <workspace><WORKSPACE_ID></workspace>
               <time_offset>1d</time_offset>
            </request>
         </log_analytics>
      </wodle>

   Where:

   -  ``<auth_path>`` is the full path of the file holding the ``application_id`` and ``application_key``, created in the authentication section.
   -  ``<tenantdomain>`` is the tenant domain name. You can obtain this from the **Overview** section in Microsoft Entra ID. Replace ``<YOUR_TENANT_DOMAIN>`` with your tenant domain.
   -  ``<workspace>`` is the workspace ID that you need for authentication. Replace ``<WORKSPACE_ID>`` with your workspace ID.
   -  ``<time_offset>`` is the timeframe, counted backward. In this case, it downloads all logs from the past 24 hours.

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

The configuration above allows Wazuh to search through any query using the ``tag`` value as the identifier.

Check the reference for more information about the :doc:`Wazuh module for Azure </user-manual/reference/ossec-conf/wodle-azure-logs>`.

.. _azure_log_analtytics_use_case:

Use case
--------

Here is an example of monitoring infrastructure activity using the Azure application created above.

.. _log_analytics_use_case_creating_user:

Monitor a new user creation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps outlined below to create a user on Microsoft Entra ID:

#. Navigate to **Microsoft Entra ID** and select **All users**.
#. Click on **New User**.

   .. thumbnail:: /images/cloud-security/azure/click-new-user.png
      :align: center
      :width: 80%

#. Select **Create new user**.

   .. thumbnail:: /images/cloud-security/azure/create-new-user.png
      :align: center
      :width: 80%

#. Provide the necessary details for the user you want to create, and then click **Create** to complete the creation.

   .. thumbnail:: /images/cloud-security/azure/create-new-user2.png
      :align: center
      :width: 80%

Visualizing the findings on the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once set up, you can check the results in the **Wazuh dashboard**.

.. thumbnail:: /images/cloud-security/azure/results-in-wazuh-dashboard.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/azure/results-in-wazuh-dashboard-details.png
   :align: center
   :width: 80%
