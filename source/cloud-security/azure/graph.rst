.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, you will learn how to monitor your Microsoft Entra ID activity using the Microsoft Graph REST API.

Microsoft Graph
===============

In this section, you will learn how to monitor your Microsoft Entra ID activity using the Microsoft Graph REST API. This section contains:

-  :ref:`Azure configuration <azure_configuration>`
-  :ref:`Wazuh configuration <wazuh_configuration>`
-  :ref:`Microsoft Entra ID use case <microsoft_entra_ID_use_case>`

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

Wazuh can process Microsoft Entra ID activity reports using the above endpoints. Each one of them requires you to execute a different query. You will place these queries within the command block of your Wazuh module for Azure :ref:`configuration <wazuh_configuration>`.

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

To use the Log Analytics API to retrieve the logs, we must generate an application key to authenticate the Log Analytics API. Follow the steps below to generate the application key.

#. Select **Certificates & secrets**, then select **New client secret** to generate a key.

   .. thumbnail:: /images/cloud-security/azure/new-client-secret2.png
      :align: center
      :width: 80%

#. Give an appropriate **description**, set a preferred duration for the key, and then click **Add**.

   .. thumbnail:: /images/cloud-security/azure/add-client-secret2.png
      :align: center
      :width: 80%

#. Copy the key **value**. This would be later used for authentication.

   .. note::

      Copy the key before exiting this page, as it will only be displayed once. If you do not copy it before exiting the page, you will have to generate a fresh key.

   .. thumbnail:: /images/cloud-security/azure/copy-client-secret3.png
      :align: center
      :width: 80%

.. _wazuh_configuration:

Wazuh server or agent
^^^^^^^^^^^^^^^^^^^^^

You will use the ``key`` and ``ID`` of the application saved during the previous steps here. In this case, both fields were saved in a file for authentication. Check the :ref:`configure_azure_credentials` section for more information about this topic.

#. Apply the following configuration to the local configuration file ``/var/ossec/etc/ossec.conf`` of the Wazuh server or agent. This will depend on where you configured the Wazuh module for Azure:

   .. code-block:: xml
      :emphasize-lines: 12

      <wodle name="azure-logs">
        <disabled>no</disabled>
        <wday>Monday</wday>
        <time>2:00</time>
        <run_on_start>no</run_on_start>

        <graph>
          <auth_path>/var/ossec/wodles/azure/credentials</auth_path>
          <tenantdomain>wazuh.com</tenantdomain>
          <request>
              <tag>microsoft-entra_id</tag>
              <query>auditLogs/directoryAudits</query>
              <time_offset>1d</time_offset>
          </request>
        </graph>

      </wodle>

   Where:

   -  ``<auth_path>`` is the full path of where the workspace secret key is stored.
   -  ``<tenantdomain>`` is the tenant domain name. You can obtain this from the **Overview** section in Microsoft Entra ID
   -  ``<wday>`` is the day of the week scheduled for the scan
   -  ``<query>`` is the path to where the audit logs are stored.
   -  ``<time>`` is the time scheduled for the scan.
   -  ``<time_offset>`` set to ``1d`` means that only the log data from the last day is parsed.

#. Restart your Wazuh server or agent, depending on where you configured the Wazuh module for Azure.

   Wazuh agent:

   .. code-block:: console

      # systemctl restart wazuh-agent

   Wazuh server:

   .. code-block:: console

      # systemctl restart wazuh-manager

Check the :doc:`Wazuh module for Azure </user-manual/reference/ossec-conf/wodle-azure-logs>` reference for more information about using the different available parameters. Please see the :ref:`wazuh_azure_authentication_file` section for guidance on how to set up credentials to monitor your Microsoft Entra ID.

.. warning::

   The field ``tenantdomain`` is mandatory. You can obtain it from the **Overview** section in **Microsoft Entra ID**.

Use case
^^^^^^^^

.. _microsoft_entra_ID_use_case:

Monitoring Microsoft Entra ID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`Microsoft Entra ID <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis>`__ is the identity and directory management service that combines essential directory services, application access management, and identity protection in a single solution.

Wazuh can monitor the Microsoft Entra ID (ME-ID) service using the activity reports provided by the `Microsoft Graph REST API <https://docs.microsoft.com/en-us/graph/overview>`__. Microsoft Graph API can perform read operations on directory data and objects on Microsoft Entra ID applications.

.. thumbnail:: /images/cloud-security/azure/microsoft-entra-ID.png
   :align: center
   :width: 80%

Here is an example of Microsoft Entra ID activity monitoring using the above configuration.

Create a new user
~~~~~~~~~~~~~~~~~

Create a new user in Azure. A successful user creation activity will produce a log to reflect it. You can retrieve this log using the auditLogs/directoryAudits query.

#. Navigate to **Users** > **All users**, select **New user** > **Create new user**.

   .. thumbnail:: /images/cloud-security/azure/click-new-user.png
      :align: center
      :width: 80%

#. Fill in the required details and click **Review + create**. The user is now created.

You can check for the result of the successful user creation in the **Audit logs** section of **Microsoft Entra ID**.

.. thumbnail:: /images/cloud-security/azure/user-creation-result.png
   :align: center
   :width: 80%

Once the integration is running, the results will be available in the **Security Events** tab of the **Wazuh dashboard**.

.. thumbnail:: /images/cloud-security/azure/ms-graph-results-in-wazuh-dashboard1.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/azure/ms-graph-results-in-wazuh-dashboard2.png
   :align: center
   :width: 80%
