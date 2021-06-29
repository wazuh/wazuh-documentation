.. Copyright (C) 2021 Wazuh, Inc.

.. _gcp_considerations:

Considerations for configuration
================================

Older logs
----------

The ``gcp-pubsub`` Wazuh module only looks for new logs based upon the key for last processed log object, which includes the datetime stamp. If older logs are loaded into the Cloud Storage or the ``only_logs_after`` option date is set to a datetime earlier than previous executions of the module, the older log files will be ignored and not ingested into Wazuh.


Creation time in Google Cloud Storage bucket contents
-----------------------------------------------------

The ``gcp-bucket`` Wazuh module will use the creation time for each blob inside the provided Cloud Storage bucket to determine the date to which each log file corresponds. This means if the user manually moves any file inside the specified bucket its creation time will be updated and the ``gcp-module`` will assume the file is new.

When using the ``only_logs_after`` tag the Wazuh module will use the creation time of each blob to determine if it should be processed. Any date in the file's name will be ignored. Only creation date is used to determine whether a file should be processed.


Configuring multiple Google Cloud Storage bucket
------------------------------------------------

Below there is an example of a configuration using more than one bucket:

.. code-block:: xml

 <gcp-bucket>
    <run_on_start>yes</run_on_start>
    <interval>1m</interval>
    <logging>debug</logging>

    <bucket type="access_logs">
        <name>wazuh-test-bucket</name>
        <credentials_file>credentials.json</credentials_file>
    </bucket>

    <bucket type="access_logs">
        <name>wazuh-test-bucket-2</name>
        <credentials_file>credentials.json</credentials_file>
        <only_logs_after>2021-JUN-01</only_logs_after>
        <path>access_logs/</path>
    </bucket>

    <bucket type="access_logs">
        <name>wazuh-test-bucket-3</name>
        <credentials_file>credentials.json</credentials_file>
        <path>access_logs</path>
        <remove_from_bucket>no</remove_from_bucket>
    </bucket>

</gcp-bucket>
