.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: As an alternative to the Azure Log Analytics REST API, Wazuh offers access to a Microsoft Azure Storage account.

Microsoft Azure Storage
=======================

`Microsoft Azure Storage <https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction>`__ refers to the Microsoft Azure cloud storage solution. This service provides a massively scalable object store for data objects, a messaging store for reliable messaging, a file system service for the cloud, and a NoSQL store.

.. thumbnail:: /images/cloud-security/azure/microsoft-azure-storage-diagram.png
   :align: center
   :width: 80%

As an alternative to the Azure Log Analytics REST API, Wazuh offers access to a Microsoft Azure Storage account. You can export the activity logs of the Microsoft Azure infrastructure to the storage accounts.

This section explains using the Azure portal to archive your Microsoft Azure activity logs in a storage account.

Configuration
-------------

Azure
^^^^^

Configuring the activity log export
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Select the **Audit Logs** option from the **Monitoring section** within **Microsoft Entra ID** and click on **Export Data Settings**.

   .. thumbnail:: /images/cloud-security/azure/export-data-settings.png
      :align: center
      :width: 80%

#. Click **Add diagnostic setting**.

   .. thumbnail:: /images/cloud-security/azure/add-diagnostic-setting2.png
      :align: center
      :width: 80%

#. Select the **AuditLogs** and **Archive to the storage account** checkbox, then select the subscription and Storage account to which you want to export the logs from the dropdown menu.

   .. thumbnail:: /images/cloud-security/azure/archive-to-the-storage-account.png
      :align: center
      :width: 80%

Wazuh server or agent
^^^^^^^^^^^^^^^^^^^^^

It is important to set the ``account_name`` and ``account_key`` of the storage account to authenticate. The image below shows an already configured storage account.

.. thumbnail:: /images/cloud-security/azure/storage-account-configured.png
   :align: center
   :width: 80%

Check the :ref:`credentials <getting_access_credentials>` section for guidance on configuring Microsoft Azure Storage credentials.

#. Apply the following configuration to the local configuration file ``/var/ossec/etc/ossec.conf`` of the Wazuh server or agent. This will depend on where you configured the Wazuh module for Azure:

   .. code-block:: xml

      <wodle name="azure-logs">

          <disabled>no</disabled>
          <interval>1d</interval>
          <run_on_start>yes</run_on_start>

          <storage>

                  <auth_path>/home/manager/Azure/storage_auth.txt</auth_path>
                  <tag>azure-activity</tag>

                  <container name="insights-activity-logs">
                      <blobs>.json</blobs>
                      <content_type>json_inline</content_type>
                      <time_offset>24h</time_offset>
                      <path>info-logs</path>
                  </container>

          </storage>
      </wodle>

   Where

   -  ``<auth_path>`` is the full path of where the workspace secret key is stored.
   -  ``<container>`` contains useful parameters while fetching blog storage contents.
   -  ``<container name="insights-activity-logs">`` the log container that will be streamed.
   -  ``<blobs>.json</blobs>`` is the blob format that will be downloaded.
   -  ``<time_offset>`` is the timeframe dated backward. In this case, all logs within a 24-hour timeframe will be downloaded.
   -  ``<content_type>`` is the format for storing the content of the blobs.

   Check the :doc:`Wazuh module for Azure </user-manual/reference/ossec-conf/wodle-azure-logs>` reference page to learn more about the parameters available and how to use them.

#. Restart your Wazuh server or agent, depending on where you configured the Wazuh module for Azure.

   Wazuh agent:

   .. code-block:: console

      # systemctl restart wazuh-agent

   Wazuh server:

   .. code-block:: console

      # systemctl restart wazuh-manager

Use case
^^^^^^^^

Here is an example of Microsoft Entra ID activity monitoring using the above configuration.

Create a new user
~~~~~~~~~~~~~~~~~

Create a new user in your Microsoft Azure environment using Microsoft Entra ID. A few minutes after creating the user, a new log will be available in a container named ``insights-activity-logs`` inside the Storage account specified when configuring the Activity log export.

Please refer to the :ref:`creating a user <log_analytics_use_case_creating_user>` section under the Azure Log Analytics use case.

.. thumbnail:: /images/cloud-security/azure/new-container-available.png
   :align: center
   :width: 80%

You can check the results in the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/azure/results-in-wazuh-dashboard2.png
   :align: center
   :width: 80%
