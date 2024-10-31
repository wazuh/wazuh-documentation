.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh module for Azure enables centralized logging, threat detection, and compliance management of your Microsoft Azure environments from your Wazuh deployment.

Monitoring Azure platform and services
======================================

The `Azure Monitor Logs <https://docs.microsoft.com/en-us/azure/azure-monitor/logs/data-platform-logs>`__ collects and organizes logs and performance data from monitored resources, including Azure services, virtual machines, and applications. This insight is sent to Wazuh using the Azure Log Analytics REST API or by directly accessing the contents of a Microsoft Azure Storage account. The Wazuh module for Azure enables centralized logging, threat detection, and compliance management of your Microsoft Azure environments from your Wazuh deployment.

The Wazuh module for Azure requires dependencies and credentials to access your Microsoft Azure logs. These dependencies are available by default on the Wazuh manager, but you must install them when you use a Wazuh agent for the integration. Take a look at the `Prerequisites`_ section before proceeding.

Prerequisites
-------------

Installing dependencies
^^^^^^^^^^^^^^^^^^^^^^^

.. |service| replace:: Azure

.. include:: /_templates/cloud/notes.rst

Python
~~~~~~

.. |py_cloud_cont_min| replace:: |PYTHON_CLOUD_CONTAINERS_MIN|
.. |py_cloud_cont_max| replace:: |PYTHON_CLOUD_CONTAINERS_MAX|

.. include:: /_templates/cloud/python_installation.rst

.. |module_script| replace:: ``/var/ossec/wodles/azure/azure-logs``

.. include:: /_templates/cloud/pip_installation.rst

Azure Storage client library for Python
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need the libraries in the command below to set up your Wazuh agent endpoint and monitor your Microsoft Azure platform and services.

.. tabs::

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install azure-storage-blob==12.20.0 azure-storage-common==2.1.0 azure-common==1.1.25 cryptography==3.3.2 cffi==1.14.4 pycparser==2.20 six==1.14.0 python-dateutil==2.8.1 requests==2.25.1 certifi==2022.12.07 chardet==3.0.4 idna==2.9 urllib3==1.26.18 SQLAlchemy==2.0.23 pytz==2020.1

   .. group-tab:: Python 3.11–3.12

      .. code-block:: console

         # pip3 install --break-system-packages azure-storage-blob==12.20.0 azure-storage-common==2.1.0 azure-common==1.1.25 cryptography==3.3.2 cffi==1.14.4 pycparser==2.20 six==1.14.0 python-dateutil==2.8.1 requests==2.25.1 certifi==2022.12.07 chardet==3.0.4 idna==2.9 urllib3==1.26.18 SQLAlchemy==2.0.23 pytz==2020.1

      .. note::

         If you use a virtual environment, remove the ``--break-system-packages`` parameter from the above command.

.. _configure_azure_credentials:

Configuring Azure credentials
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :doc:`Wazuh module for Azure </user-manual/reference/ossec-conf/wodle-azure-logs>` must have access credentials to connect to Azure successfully. The credentials required vary depending on the type of monitoring. These include:

-  Access credentials for Microsoft Graph and Azure Log Analytics
-  Access credentials for Microsoft Azure Storage

The following sections provide an overview of how you can create these credentials.

.. _graph_and_log_analytics_credentials:

Getting access credentials for Microsoft Graph and Azure Log Analytics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need valid application_id and application_key values to authenticate connection from the Wazuh module for Azure.

Follow the steps below to obtain an ``application_id`` and ``application_key``:

#. Go to Microsoft Entra ID and navigate to the registered application.

   .. thumbnail:: /images/cloud-security/azure/navigate-to-registered-application.png
      :align: center
      :width: 80%

#. Go to the **Certificates & secrets** section of the chosen application, then generate a secret key by selecting **New client secret**.

   .. thumbnail:: /images/cloud-security/azure/new-client-secret.png
      :align: center
      :width: 80%

#. Give the key a descriptive name and specify the duration for which the key should remain active, then select **Add**.

   .. thumbnail:: /images/cloud-security/azure/add-client-secret.png
      :align: center
      :width: 80%

#. Copy the ``Value`` and the ``Secret ID``. Ensure you securely store these values, as you can only view them once. The ``Value`` is the ``application_key``.

   .. thumbnail:: /images/cloud-security/azure/copy-client-secret.png
      :align: center
      :width: 80%

#. Copy the ``application_id`` value for your registered application from the **Overview** section.

   .. thumbnail:: /images/cloud-security/azure/copy-client-secret2.png
      :align: center
      :width: 80%

.. _getting_access_credentials:

Getting access credentials for Microsoft Azure Storage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Microsoft Azure Storage requires valid ``account_name`` and ``account_key`` values. You can obtain them in the **Access keys** section of **Storage accounts** on your Azure environment. Follow the Microsoft guide to `create a storage account <https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal>`__.

The section below shows the steps to retrieving the Microsoft Azure Storage account key.

#. Go to the **Storage accounts** section of your Microsoft Azure environment and select the account of interest.

   .. thumbnail:: /images/cloud-security/azure/select-storage-account.png
      :align: center
      :width: 80%

#. Navigate to **Access keys** located on the left pane to access the ``account_name`` and ``account_key`` values.

   .. thumbnail:: /images/cloud-security/azure/navigate-to-access-keys.png
      :align: center
      :width: 80%

.. _wazuh_azure_authentication_file:

Wazuh Azure authentication file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To authenticate your Microsoft Azure environment to Wazuh, you must store your credentials in a file using the format ``field = value``.

The fields expected to be present in the credentials file depend on the type of service or activity you are monitoring.

Microsoft Azure Log Analytics and Graph
.......................................

The file must contain only two lines, one for the ``application_id`` and another for the ``application_key`` obtained previously:

.. code-block:: ini

   application_id = <YOUR_APPLICATION_ID>
   application_key = <YOUR_APPLICATION_KEY>

Microsoft Azure Storage
.......................

The file must contain only two lines, one for the ``account_name`` and the other one for the ``account_key`` obtained previously:

.. code-block:: ini

   account_name = <YOUR_ACCOUNT_NAME>
   account_key = <YOUR_ACCOUNT_KEY>

Specify the authentication file in the ``/var/ossec/etc/ossec.conf`` configuration file using the ``<auth_path>`` tag, regardless of the service or activity you monitor. Take a look at the following example:

.. code-block:: xml
   :emphasize-lines: 6, 16, 25

   <wodle name="azure-logs">
     <disabled>no</disabled>
     <run_on_start>yes</run_on_start>

     <log_analytics>
        <auth_path>/var/ossec/wodles/credentials/log_analytics_credentials</auth_path>
         <tenantdomain>wazuh.com</tenantdomain>
         <request>
             <query>AzureActivity</query>
             <workspace>12345678-90ab-cdef-1234-567890abcdef</workspace>
             <time_offset>1d</time_offset>
         </request>
     </log_analytics>

     <graph>
        <auth_path>/var/ossec/wodles/credentials/graph_credentials</auth_path>
         <tenantdomain>wazuh.com</tenantdomain>
         <request>
             <query>auditLogs/directoryAudits</query>
             <time_offset>1d</time_offset>
         </request>
     </graph>

   <storage>
        <auth_path>/var/ossec/wodles/credentials/storage_credentials</auth_path>
         <container name="insights-activity-logs">
             <blobs>.json</blobs>
             <content_type>json_inline</content_type>
             <time_offset>24h</time_offset>
         </container>
     </storage>
   </wodle>

For more information on ``<auth_path>``, look at the :doc:`Wazuh module for Azure </user-manual/reference/ossec-conf/wodle-azure-logs>` reference page.

Adding more than one ``request`` block simultaneously in the same configuration is possible. The Wazuh module for Azure would process each request sequentially. The above configuration is an example. It includes Microsoft Azure Log Analytics, Graph, and Storage configuration blocks.

Reparse
~~~~~~~

.. warning::

   The ``reparse`` option will fetch and process all the logs from the starting date until the present. This process may generate duplicate alerts.

To fetch and process older Azure logs, you must run the Wazuh module for Azure using the ``--reparse`` option.

The ``la_time_offset`` value sets the time as an offset for the starting point. If you don't provide a ``la_time_offset`` value, the Wazuh module for Azure returns to the date it processed the first file.

The following code block shows an example of running the Wazuh module for Azure on a Wazuh manager using the ``--reparse`` option:

.. code-block:: console

   # /var/ossec/wodles/azure/azure-logs --log_analytics --la_auth_path credentials_example --la_tenant_domain 'wazuh.example.domain' --la_tag azure-activity --la_query "AzureActivity" --workspace example-workspace --la_time_offset 50d --debug 2 --reparse

The ``--debug 2`` parameter gets a verbose output. This output is helpful to show that the script works, especially when handling a large amount of data.