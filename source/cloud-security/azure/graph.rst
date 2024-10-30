.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, you will learn how to monitor your Microsoft Entra ID activity using the Microsoft Graph REST API.

Microsoft Graph
===============

In this section, you will learn how to monitor your Microsoft Entra ID activity using the Microsoft Graph REST API. This section contains:

-  :ref:`Azure configuration <azure_configuration>`
-  :ref:`Wazuh configuration <>`
-  :ref:`Microsoft Entra ID use case <>`

The following are endpoints in the Microsoft Graph REST API related to auditing and monitoring activities in Microsoft Entra ID.

+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| **Report type**                                                                                                           | **Query**                     |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| `Directory audits <https://docs.microsoft.com/en-us/graph/api/directoryaudit-list?view=graph-rest-1.0&tabs=http>`_        | ``auditLogs/directoryaudits`` |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| `Sign-ins <https://docs.microsoft.com/en-us/graph/api/signin-list?view=graph-rest-1.0&tabs=http>`_                        | ``auditLogs/signIns``         |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| `Provisioning <https://docs.microsoft.com/en-us/graph/api/provisioningobjectsummary-list?view=graph-rest-1.0&tabs=http>`_ | ``auditLogs/provisioning``    |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+

These endpoints allow administrators and developers to monitor and audit activities within Microsoft Entra ID for security, compliance, and operational purposes.

Wazuh can process Microsoft Entra ID activity reports using the above endpoints. Each one of them requires you to execute a different query. You will place these queries within the command block of your Wazuh module for Azure :ref:`configuration <>`.

Configuration
-------------

.. _azure_configuration:

Azure
^^^^^

Creating the application
~~~~~~~~~~~~~~~~~~~~~~~~

This section explains creating an application using the Azure Log Analytics REST API. However, it is also possible to configure an existing application. If this is the case, skip this step.

#. In the **Microsoft Entra ID** panel, select **App registrations**. Then, select **New registration**.

   .. thumbnail:: /images/cloud-security/azure/new-app-registration2.png
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

Granting permissions to the application
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Click on the application, go to the **Overview** section, and save the **Application (client) ID** for later authentication.

   .. thumbnail:: /images/cloud-security/azure/save-application-ID2.png
      :align: center
      :width: 80%

#. Select the **Add a permission** option in the **API permissions** section.

   .. thumbnail:: /images/cloud-security/azure/add-api-permission2.png
      :align: center
      :width: 80%

#. Search for *"Microsoft Graph"* and select the API.

   .. thumbnail:: /images/cloud-security/azure/select-microsoft-graph-api.png
      :align: center
      :width: 80%

#. Select the permissions in **Applications permissions** that align with your infrastructure. In this case, ``AuditLog.Read.All`` permissions will be granted. Then, click **Add permissions**.

   .. thumbnail:: /images/cloud-security/azure/add-api-permissions.png
      :align: center
      :width: 80%

#. Use an admin user to **Grant admin consent** for the tenant.

   .. thumbnail:: /images/cloud-security/azure/grant-admin-consent2.png
      :align: center
      :width: 80%

Obtaining the application key for authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
