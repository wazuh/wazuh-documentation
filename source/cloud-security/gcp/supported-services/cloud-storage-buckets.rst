.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: 
  
Monitoring Google Cloud Storage buckets
=======================================

Google Cloud Storage offers `usage logs and storage logs <https://cloud.google.com/storage/docs/access-logs>`__, also known as access logs, in the form of CSV files that can be downloaded. Usage logs provide information for all of the requests made on a specified bucket and are created hourly. Storage logs provide information about the storage consumption of that bucket for the last day and are created daily. Once set up, usage logs and storage logs are automatically created as new objects in the specified bucket. The Wazuh module for Google Cloud Storage buckets collects these logs from the bucket and processes the events using defined :doc:`threat detection rules and decoders </user-manual/ruleset/index>`.

Configuring Google Cloud Storage buckets
----------------------------------------

This section describes how to create a bucket and enable logging. If you do not have credentials, follow the steps in the :doc:`configuring Google Cloud credentials <../prerequisites/credentials>` section.

Setting up log delivery to a Google Cloud Storage bucket
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You need to create Storage buckets and enable logging before logs can be delivered to them. The log delivery for any bucket must be set up using the Google Cloud Shell, ``gsutil`` tool, the XML API, or the JSON API. Follow the `usage logs and storage logs <https://cloud.google.com/storage/docs/access-logs>`__ documentation for the most up-to-date instructions on enabling this feature.

In the following steps, we use the Google Cloud Shell to create a bucket and enable logging.

#. On Google Cloud Console, click the Shell button to activate **Cloud Shell** and authenticate your Google Cloud SDK.

   .. thumbnail:: /images/cloud-security/gcp/gcp-activate-cloud-shell.png
      :title: Activate Cloud shell
      :alt: Activate Cloud shell
      :align: center
      :width: 80%

#. Create a bucket to store your logs using the following command:

   .. code-block:: none

      $ gcloud storage buckets create gs://<YOUR_BUCKET_NAME>

   Replace ``<YOUR_BUCKET_NAME>`` with your bucket name.
   
   Make sure to follow the `Google naming guidelines <https://cloud.google.com/storage/docs/buckets?hl=en&_ga=2.141378354.-1842411037.1699881597#naming>`__ to name your bucket.

#. Grant Google Cloud Storage the ``roles/storage.objectCreator`` role to the bucket:

   .. code-block:: none

      $ gcloud storage buckets add-iam-policy-binding gs://<YOUR_BUCKET_NAME> --member=group:cloud-storage-analytics@google.com --role=roles/storage.objectCreator

#. Enable logging for your bucket using the ``--log-bucket`` flag:

   .. code-block:: none

      $ gcloud storage buckets update  gs://<YOUR_BUCKET_NAME> --log-bucket=gs://<YOUR_BUCKET_NAME>

#. Check logging status:

   .. code-block:: none

      $ gcloud storage buckets describe gs://<YOUR_BUCKET_NAME> --format="default(logging_config)"

If logging is enabled, the server returns the logging configuration in the response:

.. code-block:: none

   logging_config:
     logBucket: <YOUR_BUCKET_NAME>
     logObjectPrefix: <YOUR_BUCKET_NAME>

If logging is not enabled, the following is returned:

.. code-block:: none

   null

Configuring the Wazuh module for Google Cloud Storage buckets
-------------------------------------------------------------

Perform the following steps to configure the Wazuh module for Google Cloud Storage buckets to read logs from a Cloud Storage bucket. You can perform these steps on your Wazuh server or Wazuh agent.

#. Add the following configuration within the ``<ossec_config>`` block in the ``/var/ossec/etc/ossec.conf`` configuration file of your endpoint:

   .. code-block:: xml

      <gcp-bucket>
         <run_on_start>yes</run_on_start>
         <interval>1m</interval>
         <bucket type="access_logs">
             <name><YOUR_BUCKET_NAME></name>
             <credentials_file>/var/ossec/wodles/gcloud/<YOUR_AUTHENTICATION_FILE></credentials_file>
         </bucket>
      </gcp-bucket>

   Where:

   -  ``<run_on_start>``: Schedules the module to run on the start or restart of the Wazuh manager or agent service, depending on where the module is configured. 
   -  ``<interval>``: Sets a time interval between module execution.
   -  ``<name>``: Contains the name of the Google Cloud Storage bucket from which logs are read.
   -  ``<credentials_file>``: Contains the path to the Google Cloud credentials file. If you do not have credentials yet, follow the steps in the :doc:`configuring Google Cloud credentials <../prerequisites/credentials>` section.

   Replace ``<YOUR_BUCKET_NAME>`` with your bucket name and ``<YOUR_AUTHENTICATION_FILE>`` with the name of your credential file.

   See the :doc:`gcp-bucket </user-manual/reference/ossec-conf/gcp-bucket>` section for more information on configuring the Wazuh module for Google Cloud Storage buckets.

#. Restart the Wazuh manager or agent service to apply the changes:

   .. tabs::

      .. group-tab:: Wazuh manager

         .. code-block:: console

            # systemctl restart wazuh-manager

      .. group-tab:: Wazuh agent

         .. code-block:: console

            # systemctl restart wazuh-agent

Visualizing the events on the Wazuh dashboard
---------------------------------------------

Apply one of the filters below on the Wazuh dashboard to filter for Google Cloud storage and usage logs.

-  ``data.gcp.resource.type`` ``is`` ``gcs_bucket``.

   .. thumbnail:: /images/cloud-security/gcp/filter-cloud-storage-logs-resource-type.png
      :title: Filter Google Cloud storage and usage logs – Resource type
      :alt: Filter Google Cloud storage and usage logs – Resource type
      :align: center
      :width: 80%

-  ``data.gcp.source`` ``is`` ``gcp_bucket``.

   .. thumbnail:: /images/cloud-security/gcp/filter-cloud-storage-logs-source.png
      :title: Filter Google Cloud storage and usage logs – Source
      :alt: Filter Google Cloud storage and usage logs – Source
      :align: center
      :width: 80%

Available logs must appear as shown in the picture below.

.. thumbnail:: /images/cloud-security/gcp/cloud-storage-available-logs.png
   :title: Google Cloud Storage – Available logs alerts
   :alt: Google Cloud Storage – Available logs alerts
   :align: center
   :width: 80%

Considerations for the Google Cloud Storage buckets integration
---------------------------------------------------------------

Configuring multiple buckets
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can configure the Wazuh server or agent to pull logs from multiple buckets. To do so, you must add multiple ``<bucket>`` blocks within the ``<gcp-bucket>`` section of the Wazuh server or agent configuration file.

Find below an example configuration for multiple buckets:

.. code-block:: xml

   <gcp-bucket>
      <run_on_start>yes</run_on_start>
      <interval>1m</interval>
      <bucket type="access_logs">
          <name>wazuh-test-bucket</name>
          <credentials_file>/var/ossec/wodles/gcloud/wazuh-test-bucket-credentials.json</credentials_file>
      </bucket>

      <bucket type="access_logs">
          <name>wazuh-test-bucket-2</name>
          <credentials_file>/var/ossec/wodles/gcloud/wazuh-test-bucket2-credentials.json</credentials_file>
          <only_logs_after>2021-JUN-01</only_logs_after>
          <path>access_logs/</path>
      </bucket>

      <bucket type="access_logs">
          <name>wazuh-test-bucket-3</name>
          <credentials_file>/var/ossec/wodles/gcloud/wazuh-test-bucket3-credentials.json</credentials_file>
          <path>access_logs</path>
          <remove_from_bucket>no</remove_from_bucket>
      </bucket>

    </gcp-bucket>

Where:

-  ``<name>``:Contains the name of the Google Cloud Storage bucket from which logs are read.
-  ``<credentials_file>``:Contains the path to the Google Cloud credentials file.
-  ``<only_logs_after>``: Parses logs from a specific date onwards. It must follow the `YYYY-MM-DD` format.
-  ``<remove_from_bucket>``: Sets whether the logs should be removed from the Google Cloud Storage bucket once they are read. The possible values are ``no`` and ``yes``.

.. note::
   
   Only the ``<name>`` and ``<credentials_file>`` options are mandatory. Take a close look at :doc:`bucket options </user-manual/reference/ossec-conf/gcp-bucket>`.

Restart the Wazuh manager or agent service to apply the changes:

.. tabs::

   .. group-tab:: Wazuh manager

      .. code-block:: console

         # systemctl restart wazuh-manager

   .. group-tab:: Wazuh agent

      .. code-block:: console

         # systemctl restart wazuh-agent

First execution
^^^^^^^^^^^^^^^

If no :ref:`only_logs_after <gcp_bucket_only_logs_after>` value is provided, the module will only fetch the logs of the date of the execution.

Creation time in Google Cloud Storage bucket contents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When using the ``only_logs_after`` tag, the Wazuh module checks the creation time of each item in the Google Cloud Storage bucket to determine if a file should be processed or not. This means that if the user manually moves any blob inside the specified bucket, its creation date changes, and the Wazuh module for Google Cloud Storage processes it again as it is considered a new blob.

Any date in the file's name is ignored, and only the creation date is used to determine whether or not a file should be processed.

Older logs
^^^^^^^^^^

The Wazuh module for Cloud Storage buckets only looks for new logs in buckets based on the key of the last processed log object, which includes the ``datetime`` stamp. When the ``only_logs_after`` option date is set to a ``datetime`` earlier than previous module executions, the system will ignore older logs.

Logging level
^^^^^^^^^^^^^

The Google Cloud integration uses the :ref:`wazuh_modules.debug <wazuh_modules_options>` level to set its verbosity level. This switches between different logging levels for debugging and troubleshooting purposes.

Reparse
^^^^^^^

Using the reparse option will re-fetch all Google Cloud Storage bucket logs from the starting date of the integration until the present.

.. warning::
   
   Using this option will generate duplicate alerts.

To fetch and process older logs, manually run the ``/var/ossec/wodles/gcloud/gcloud`` tool using the ``--reparse`` option.

.. code-block:: console

   # /var/ossec/wodles/gcloud/gcloud --integration_type access_logs --bucket_name 'wazuh-example-bucket' --credentials_file credentials.json --reparse --only_logs_after '2021-Jun-10' --log_level 2

Where:

-  ``--only_logs_after`` parameter sets the time for the starting point. If you don't provide an ``only_logs_after`` value, the module uses the date of the first file processed.
- ``--log_level 2`` parameter gets a verbose output. This is useful to show that the script works, especially when handling a large amount of data.
