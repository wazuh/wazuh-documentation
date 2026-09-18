.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, you will learn how to monitor your Microsoft Entra ID activity using the Microsoft Graph REST API.

Microsoft Graph
===============

You can use the Wazuh module for Azure to collect Microsoft Graph activity logs from multiple Azure services (including Microsoft Entra ID) via the Microsoft Graph REST API.

In this section, you learn how to monitor your Microsoft Entra ID activity using the Microsoft Graph REST API. This section contains:

-  :ref:`Azure configuration <azure_graph_block_configuration>`
-  :ref:`Wazuh configuration <wazuh_graph_block_agent>`
-  :ref:`Microsoft Entra ID use case <microsoft_entra_ID_graph_block_use_case>`

The following Microsoft Graph REST API endpoints support auditing and monitoring activities in Microsoft Entra ID.

+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| **Report type**                                                                                                           | **Query**                     |
+===========================================================================================================================+===============================+
| `Directory audits <https://docs.microsoft.com/en-us/graph/api/directoryaudit-list?view=graph-rest-1.0&tabs=http>`_        | ``auditLogs/directoryAudits`` |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| `Sign-ins <https://docs.microsoft.com/en-us/graph/api/signin-list?view=graph-rest-1.0&tabs=http>`_                        | ``auditLogs/signIns``         |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| `Provisioning <https://docs.microsoft.com/en-us/graph/api/provisioningobjectsummary-list?view=graph-rest-1.0&tabs=http>`_ | ``auditLogs/provisioning``    |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+

These endpoints let administrators and developers monitor and audit Microsoft Entra ID activities for security, compliance, and operational purposes.

Wazuh can process Microsoft Entra ID activity reports using the above endpoints. Each requires a different query. Place these queries in the ``<query>`` field of the ``<request>`` block in your :ref:`Wazuh module for Azure configuration <wazuh_graph_block_agent>`.

.. _azure_graph_block_configuration:

Configuration
-------------

Create the application
^^^^^^^^^^^^^^^^^^^^^^^

This section explains how to create an application that uses the Microsoft Graph REST API. You can also configure an existing application. Skip this step if you already have an existing application.

#. In the **Microsoft Entra ID** panel, select **App registrations**. Then, select **New registration**.

   .. thumbnail:: /images/cloud-security/azure/new-app-registration.png
      :align: center
      :width: 80%

#. Give the app a descriptive name, select the appropriate **account type**, and click **Register**.

   .. thumbnail:: /images/cloud-security/azure/register-application.png
      :align: center
      :width: 80%

   The app is now registered.

   .. thumbnail:: /images/cloud-security/azure/app-registrations.png
      :align: center
      :width: 80%

Grant permissions to the application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Click on the application, go to the **Overview** section, and save the **Application (client) ID** for later authentication.

   .. thumbnail:: /images/cloud-security/azure/save-application-ID2.png
      :align: center
      :width: 80%

#. Select the **Add a permission** option in the **API permissions** section.

   .. thumbnail:: /images/cloud-security/azure/add-api-permission2.png
      :align: center
      :width: 80%

#. Search for "**Microsoft Graph**" and select the API.

   .. thumbnail:: /images/cloud-security/azure/select-microsoft-graph-api.png
      :align: center
      :width: 80%

#. Select the permissions in **Application permissions** that align with your infrastructure. In this case, the ``AuditLog.Read.All`` permissions are granted. Then, click **Add permissions**.

   .. thumbnail:: /images/cloud-security/azure/add-api-permissions.png
      :align: center
      :width: 80%

#. Use an admin user to **Grant admin consent** for the tenant.

   .. thumbnail:: /images/cloud-security/azure/grant-admin-consent2.png
      :align: center
      :width: 80%

Obtain the application key for authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To use the Microsoft Graph API to retrieve logs, we must generate an application key to authenticate. Follow the steps below to generate the application key.

#. Select **Certificates & secrets**, then select **New client secret** to generate a key.

   .. thumbnail:: /images/cloud-security/azure/new-client-secret2.png
      :align: center
      :width: 80%

#. Give an appropriate description, set a preferred duration for the key, and then click **Add**.

   .. thumbnail:: /images/cloud-security/azure/add-client-secret2.png
      :align: center
      :width: 80%

#. Copy the key **value**. Use this for authentication in a later section.

   .. note::

      Copy the key before exiting this page, as it is displayed once. If you do not copy it before exiting the page, you must generate a new key.

   .. thumbnail:: /images/cloud-security/azure/copy-client-secret3.png
      :align: center
      :width: 80%

.. _wazuh_graph_block_agent:

Wazuh agent
^^^^^^^^^^^

We use the ``(client) ID`` and ``key`` of the application saved during the previous steps here. In this case, both fields were saved in a file for authentication. Check the :ref:`authentication <configure_azure_credentials>` section for more information about configuring Azure credentials.

#. Apply the following configuration to the local configuration file ``/var/ossec/etc/ossec.conf`` of the Wazuh agent:

   .. code-block:: xml
      :emphasize-lines: 12

      <wodle name="azure-logs">
         <disabled>no</disabled>
         <wday>Monday</wday>
         <time>2:00</time>
         <run_on_start>yes</run_on_start>

         <graph>
            <auth_path>/var/ossec/wodles/credentials/<GRAPH_CREDENTIALS></auth_path>
            <tenantdomain><YOUR_TENANT_DOMAIN></tenantdomain>
            <request>
               <tag>microsoft-entra_id</tag>
               <query>auditLogs/directoryAudits</query>
               <time_offset>1d</time_offset>
            </request>
         </graph>
      </wodle>

   Where:

   -  ``<auth_path>`` is the full path of the file holding the application ID and application key. Replace ``<GRAPH_CREDENTIALS>`` with your authentication credentials file name.
   -  ``<tenantdomain>`` is the tenant domain name. You can obtain this from the **Overview** section in Microsoft Entra ID. Replace the ``<YOUR_TENANT_DOMAIN>`` value with your tenant domain.
   -  ``<wday>`` is the day of the week scheduled for the scan.
   -  ``<query>`` is the Microsoft Graph endpoint to request.
   -  ``<time>`` is the time scheduled for the scan.
   -  ``<time_offset>`` set to ``1d`` means that only the log data from the last day is parsed.

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Check the :doc:`Wazuh module for Azure </user-manual/reference/ossec-conf/wodle-azure-logs>` reference for more information about using the different available parameters. See the :ref:`Wazuh Azure authentication file <wazuh_azure_authentication_file>` section for guidance on setting up credentials to monitor your Microsoft Entra ID.

.. note::

   The field ``tenantdomain`` is mandatory. You can obtain it from the **Overview** section in Microsoft Entra ID.

.. _microsoft_entra_ID_graph_block_use_case:

Use case
--------

Monitor Microsoft Entra ID
^^^^^^^^^^^^^^^^^^^^^^^^^^^

`Microsoft Entra ID <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis>`__ is the identity and directory management service that combines essential directory services, application access management, and identity protection in a single solution.

Wazuh can monitor the Microsoft Entra ID (ME-ID) service using the activity reports provided by the `Microsoft Graph REST API <https://docs.microsoft.com/en-us/graph/overview>`__. Microsoft Graph API can perform read operations on directory data and objects in Microsoft Entra ID applications.

.. thumbnail:: /images/cloud-security/azure/microsoft-entra-ID.png
   :align: center
   :width: 80%

Here is an example of Microsoft Entra ID activity monitoring using the above configuration.

Monitor a new user creation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a new user in Azure. A successful user creation activity produces a log entry. You can retrieve this log using the ``auditLogs/directoryAudits`` query.

#. Navigate to **Users** \> **All users**, select **New user** \> **Create new user**.

   .. thumbnail:: /images/cloud-security/azure/click-new-user.png
      :align: center
      :width: 80%

#. Fill in the required details and click **Review + create**. The user is now created.

   You can check the result of the successful user creation in the **Audit logs** section of **Microsoft Entra ID**.

   .. thumbnail:: /images/cloud-security/azure/user-creation-result.png
      :align: center
      :width: 80%

   The results are available in the **Threat Hunting** tab of the Wazuh dashboard.

   .. thumbnail:: /images/cloud-security/azure/ms-graph-results-in-wazuh-dashboard1.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/azure/ms-graph-results-in-wazuh-dashboard2.png
      :align: center
      :width: 80%
