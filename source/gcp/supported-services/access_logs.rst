.. Copyright (C) 2021 Wazuh, Inc.

.. _gcp_access_logs:

Usage logs & Storage logs
=========================

.. note::
    This service is supported by Wazuh using the **gcp-bucket** module. Details on how to configure this module can be found :ref:`here <gcp-bucket>`.

Google Cloud Storage offers `usage logs and storage logs <https://cloud.google.com/storage/docs/access-logs>`__, also known as access logs, in the form of CSV files that can be downloaded. Usage logs provide information for all of the requests made on a specified bucket and are created hourly. Storage logs provide information about the storage consumption of that bucket for the last day and are created daily. Once set up, usage logs and storage logs are automatically created as new objects in the specified bucket.

.. note:: To be able to send VPC Flow logs to Wazuh, Cloud Logging must be configured to export these logs to Pub/Sub first. More information about how Pub/Sub works and how to configure it :ref:`here <pubsub>`.


Setting up log delivery to a Google Cloud Storage bucket
--------------------------------------------------------

The log delivery for any bucket must be set up manually using the gsutil tool, the XML API or the JSON API. Follow its `official documentation <https://cloud.google.com/storage/docs/access-logs#delivery>`__ for the most up-to-date instructions on how to enable this feature.


Example of configuration
---------------------

.. code-block:: xml

 <gcp-bucket>
    <run_on_start>yes</run_on_start>
    <interval>1m</interval>
    <logging>debug</logging>
    <bucket type="access_logs">
        <name>wazuh-test-bucket</name>
        <credentials_file>credentials.json</credentials_file>
        <only_logs_after>2021-JUN-01</only_logs_after>
        <path>access_logs/</path>
        <remove_from_bucket>no</remove_from_bucket>
    </bucket>
</gcp-bucket>