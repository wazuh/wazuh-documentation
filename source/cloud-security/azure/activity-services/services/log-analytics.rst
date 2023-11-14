.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Azure Log Analytics is a service that monitors Azure infrastructures offering query capabilities. Learn how to use Log Analytics with Wazuh in this section.
  
.. _azure_log_analytics:

Using Azure Log Analytics
=========================

`Azure Log Analytics <https://docs.microsoft.com/en-us/azure/log-analytics/log-analytics-overview>`_ is a service that monitors your infrastructure offering query capabilities that allow you to perform advanced searches specific to your data.

The Log Analytics solution helps you to analyze and search the Azure activity log in all your Azure subscriptions, providing information about the operations performed with the resources of your subscriptions.

.. thumbnail:: /images/cloud-security/azure/log-analytics-activity-send.png
    :title: Microsoft Azure resources
    :align: center
    :width: 60%

The data collected by Log Analytics can be consulted through the **Azure Log Analytics REST API**. The Azure Log Analytics API uses the Microsoft Entra ID authentication scheme.

A qualified application or client is required to use the Azure Log Analytics REST API. This must be configured manually on the Microsoft Azure portal.

- `Setting up the application`_
- `Azure Log Analytics use case`_

Setting up the application
---------------------------

The process explained below details the creation of an application that will use the Azure Log Analytics REST API. It is also possible to configure an existing application. If this is the case, skip the **Creating the application** step.

Creating the application
^^^^^^^^^^^^^^^^^^^^^^^^

In the **Microsoft Entra ID** panel, select the option **App registrations**. Then, select **New registration**.

.. thumbnail:: /images/cloud-security/azure/log-analytics-app-1.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Giving permissions to the application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Go to the **Overview** section and save the **Application (client) ID** for later authentication.

.. thumbnail:: /images/cloud-security/azure/log-analytics-app-2.png
    :title: Log Analytics App
    :align: center
    :width: 100%

2. Go to the **API permissions** section and add the required permissions to the application.

.. thumbnail:: /images/cloud-security/azure/log-analytics-app-3.png
    :title: Log Analytics App
    :align: center
    :width: 100%

3. Search for the **Log Analytics API**.

.. thumbnail:: /images/cloud-security/azure/log-analytics-app-4.png
    :title: Log Analytics App
    :align: center
    :width: 100%

4. Select the **Read Log Analytics data** permission from **Applications permissions**.

.. thumbnail:: /images/cloud-security/azure/log-analytics-app-5.png
    :title: Log Analytics App
    :align: center
    :width: 100%

5. Grant admin consent for the tenant domain used for the permission added in the previous step. This must be done by an admin user.

.. thumbnail:: /images/cloud-security/azure/log-analytics-app-6.png
    :title: Log Analytics App
    :align: center
    :width: 100%


Giving the application access to the Log Analytics API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Access **Log Analytics workspaces** and create a new workspace or choose an existing one.

   .. thumbnail:: /images/cloud-security/azure/log-analytics-workspace-1.png
      :title: Log Analytics App
      :align: center
      :width: 100%

#. In the **Overview** section, copy the ``Workspace Id`` value. The Wazuh configuration needs it to make requests to the API.

   .. thumbnail:: /images/cloud-security/azure/log-analytics-workspace-2.png
      :title: Log Analytics App
      :align: center
      :width: 100%

#. In the **Access control (IAM)** section, click **Add** and select **Add role assignment** to add the required role to the application.

   .. thumbnail:: /images/cloud-security/azure/log-analytics-workspace-3.png
      :title: Log Analytics App
      :align: center
      :width: 100%

#. In the **Role** tab, select the **Log Analytics Reader** role.

   .. thumbnail:: /images/cloud-security/azure/log-analytics-workspace-4.png
      :title: Log Analytics App
      :align: center
      :width: 100%

#. In the **Members** tab, select **User, group, or service principal** under **Assign access to**. Then, click **Select members** under **Members** and find the App registration created previously.

   .. thumbnail:: /images/cloud-security/azure/log-analytics-workspace-5.png
      :title: Log Analytics App
      :align: center
      :width: 100%

#. Click **Review + assign** to finish.

Sending logs to the Workspace
-----------------------------

To collect logs and send them to the Log Analytics Workspace created in the previous steps, you need to create a **diagnostic setting**.

#. Go back to **Microsoft Entra ID**, scroll down on the left menu bar, and select the **Diagnostic settings** section. Click on **Add diagnostic setting**.

   .. thumbnail:: /images/cloud-security/azure/log-analytics-diagnostic-1.png
      :title: Log Analytics App
      :align: center
      :width: 100%

#. Choose the log categories you want to collect from, under **Logs Categories**. Check the **Send to Log Analytics workspace** option under **Destination details**. Select the Log Analytics Workspace you created in previous steps.

   .. thumbnail:: /images/cloud-security/azure/log-analytics-diagnostic-2.png
      :title: Log Analytics App
      :align: center
      :width: 100%

#. Click on **Save**.

Now, Azure Log Analytics can stream new logs in the selected categories to your workspace.

Obtaining the application key for authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh requires valid credentials to pull logs from Log Analytics. Take a look at the :ref:`credentials <graph_and_log_analytics_credentials>` section to learn how to generate a client secret so you can access the App registration.


Azure Log Analytics use case
----------------------------

Here is an example of monitoring the activity of the infrastructure using the previously mentioned Azure application.

Creating a user
^^^^^^^^^^^^^^^

An easy way to test this is to create a new user in Microsoft Entra ID. A few minutes after the creation of the user, a new log will be available for Log Analytics reflecting this change. The log can be checked using the ``AuditLogs`` query, by accessing **Log Analytics** and running the ``AuditLogs`` query.

.. thumbnail:: /images/cloud-security/azure/log-analytics-new-user.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Wazuh configuration
^^^^^^^^^^^^^^^^^^^

Proceed with configuring the ``azure-logs`` module in the local configuration (``ossec.conf``). The `key and ID of the application` saved during the configuration of the application will be used here, as well as the `workspace ID`. In this case, both fields were saved in a `file` for authentication. Check the :doc:`credentials </cloud-security/azure/activity-services/prerequisites/credentials>` reference for more information about this topic.

Through the following configuration, Wazuh is ready to search for any query accepted by Azure Log Analytics. This example configuration includes a representative ``tag`` and will be scheduled for every Monday at 02:00, using an offset of one day, which means only the log data from the last day will be parsed:

.. code-block:: xml

    <wodle name="azure-logs">
        <disabled>no</disabled>
        <run_on_start>no</run_on_start>

        <log_analytics>
            <auth_path>/var/ossec/wodles/credentials/log_analytics_credentials</auth_path>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-auditlogs</tag>
                <query>AuditLogs</query>
                <workspace>d6b...efa</workspace>
                <time_offset>1d</time_offset>
            </request>

        </log_analytics>
    </wodle>

Check the reference for more information about the :doc:`Azure module </user-manual/reference/ossec-conf/wodle-azure-logs>`.

.. warning:: The field ``tenantdomain`` is mandatory. It can be obtained from the **Overview** section in Microsoft Entra ID.

Wazuh Rules
^^^^^^^^^^^

The following rules are already included in Wazuh by default. With them, it it possible to monitor the infrastructure activity and get the related alerts.

.. code-block:: xml

    <rule id="87801" level="5">
        <decoded_as>json</decoded_as>
        <field name="azure_tag">azure-log-analytics</field>
        <description>Azure: Log analytics</description>
    </rule>

    <rule id="87810" level="3">
        <if_sid>87801</if_sid>
        <field name="Type">AzureActivity</field>
        <description>Azure: Log analytics activity</description>
    </rule>

    <rule id="87811" level="3">
        <if_sid>87810</if_sid>
        <field name="OperationName">\.+</field>
        <description>Azure: Log analytics: $(OperationName)</description>
    </rule>


Alert visualization
^^^^^^^^^^^^^^^^^^^

Once the Wazuh configuration is set and the ``azure-logs`` module is running using the previous configuration, the event will be processed. The results can be checked in the Wazuh dashboard:

.. thumbnail:: /images/cloud-security/azure/new-user-event.png
    :title: Log Analytics App
    :align: center
    :width: 100%
