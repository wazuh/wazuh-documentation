.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP Storage module allows you to fetch logs from Google Storage. Learn more about the module's usage in this section.

.. _gcp_access_logs:

Usage logs & storage logs
=========================

Google Cloud Storage offers `usage logs and storage logs <https://cloud.google.com/storage/docs/access-logs>`__, also known as access logs, in the form of CSV files that can be downloaded. Usage logs provide information for all of the requests made on a specified bucket and are created hourly. Storage logs provide information about the storage consumption of that bucket for the last day and are created daily. Once set up, usage logs and storage logs are automatically created as new objects in the specified bucket.

To process Storage and Access logs, Wazuh makes use of the ``gcp-bucket`` module. Configure the ``gcp-bucket`` module either in the Wazuh manager or the Wazuh agent. To do so,  modify the :doc:`ossec.conf </user-manual/reference/ossec-conf/index>` configuration file. Check the :ref:`gcp-bucket configuration reference <gcp-bucket>` to learn more.


Setting up log delivery to a Google Cloud Storage bucket
--------------------------------------------------------

The log delivery for any bucket must be set up manually using the gsutil tool, the XML API, or the JSON API. Follow the `Google Cloud Storage <https://cloud.google.com/storage/docs/access-logs#delivery>`__  documentation for the most up-to-date instructions on how to enable this feature.


Example of configuration
------------------------

.. code-block:: xml

 <gcp-bucket>
    <run_on_start>yes</run_on_start>
    <interval>1m</interval>
    <bucket type="access_logs">
        <name>wazuh-test-bucket</name>
        <credentials_file>credentials.json</credentials_file>
        <only_logs_after>2021-JUN-01</only_logs_after>
        <path>access_logs/</path>
        <remove_from_bucket>no</remove_from_bucket>
    </bucket>
 </gcp-bucket>
