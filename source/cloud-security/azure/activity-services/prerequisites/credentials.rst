.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn what you need to provide access credentials to the Wazuh Azure module so it can successfully connect to Azure in this section of the Wazuh documentation.

Configuring Azure credentials
=============================

It is necessary to provide access credentials to the Wazuh Azure module so it can successfully connect to Azure. The credentials required vary depending on the type of monitoring.


.. _graph_and_log_analytics_credentials:

Getting access credentials for Microsoft Graph and Log Analytics
----------------------------------------------------------------
For :doc:`Microsoft Graph </cloud-security/azure/activity-services/entra/graph>` and :doc:`Log Analytics </cloud-security/azure/activity-services/services/log-analytics>` valid ``application_id`` and ``application_key`` values are required. The necessary ``application_key`` value for a given **App Registration** in **Microsoft Entra ID** can be obtained from the **Certificates & secrets** section while the ``application_id`` can be obtained from the **Overview** section:

.. thumbnail:: /images/cloud-security/azure/log-analytics-create-key.png
    :title: Log Analytics App
    :align: center
    :width: 100%

.. thumbnail:: /images/cloud-security/azure/log-analytics-key-created.png
    :title: Log Analytics App
    :align: center
    :width: 100%


Getting access credentials for Storage
--------------------------------------
:doc:`Azure Storage </cloud-security/azure/activity-services/services/storage>` requires valid ``account_name`` and ``account_key`` values. They can be obtained in the **Access keys** section of **Storage accounts**:

.. thumbnail:: /images/cloud-security/azure/account-credentials.png
    :title: Storage
    :align: center
    :width: 100%


Authentication
--------------

To authenticate, store the credentials in a file whose content follows the `field = value` format explained below.

The fields expected to be present in the credentials file will change depending on the type of service or activity to be monitored.

.. rubric:: Microsoft Graph and Log Analytics
   :class: h5

The file must contain only two lines, one for the application ID and another one for the application key obtained previously.

.. code-block:: none

   application_id = <YOUR_APPLICATION_ID>
   application_key = <YOUR_APPLICATION_KEY>

.. rubric:: Storage
   :class: h5

The file must contain only two lines, one for the account name and the other one for the account key obtained previously:

.. code-block:: none

   account_name = <YOUR_ACCOUNT_NAME>
   account_key = <YOUR_ACCOUNT_KEY>


Regardless of the service or activity to be monitored, the authentication file is always specified in the ``ossec.conf`` configuration file using the ``<auth_path>`` tag. Take a look at the following example:

.. code-block:: none
   :emphasize-lines: 6, 17, 27

   <wodle name="azure-logs">
     <disabled>no</disabled>
     <run_on_start>yes</run_on_start>

     <log_analytics>
         <auth_path>/var/ossec/wodles/credentials/log_analytics_credentials</auth_path>

         <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>
         <request>
             <query>AzureActivity</query>
             <workspace>d6b...efa</workspace>
             <time_offset>1d</time_offset>
         </request>
     </log_analytics>

     <graph>
         <auth_path>/var/ossec/wodles/credentials/graph_credentials</auth_path>

         <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>
         <request>
             <query>auditLogs/directoryAudits</query>
             <time_offset>1d</time_offset>
         </request>
     </graph>

     <storage>
         <auth_path>/var/ossec/wodles/credentials/storage_credentials</auth_path>

         <container name="insights-operational-logs">
             <blobs>.json</blobs>
             <content_type>json_inline</content_type>
             <time_offset>24h</time_offset>
         </container>
     </storage>
   </wodle>


Check the :doc:`azure-logs wodle </user-manual/reference/ossec-conf/wodle-azure-logs>` section from the ossec.conf reference page for more information about the ``<auth_path>`` and other available parameters.

Take a look at the :doc:`azure-logs wodle </user-manual/reference/ossec-conf/wodle-azure-logs>` entry from the ``ossec.conf`` reference page for more information about the parameters.
