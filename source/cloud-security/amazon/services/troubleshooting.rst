.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section is intended to assist in troubleshooting issues.

Troubleshooting
===============

Use the following information to troubleshoot issues with the Wazuh module for AWS.

Checking if the Wazuh module for AWS is running
-----------------------------------------------

The Wazuh module for AWS runs on the Wazuh agent and writes its messages to ``/var/ossec/logs/ossec.log`` on that agent. Depending on the module configuration, the file shows the following messages:

-  When the Wazuh module for AWS is starting:

   .. code-block:: none
      :class: output

      2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Module AWS started
      2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Starting fetching of logs.

-  When scheduled scan is set:

   .. code-block:: none
      :class: output

      2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Starting fetching of logs.
      2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Fetching logs finished.

-  When the Wazuh module for AWS has finished its execution and is waiting until the :ref:`interval <aws_interval>` condition is met:

   .. code-block:: none
      :class: output

      2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Fetching logs finished.

.. _aws_debug_mode:

Enabling debug mode
-------------------

You can get more information about the Wazuh module for AWS execution by enabling debug mode. Debug mode adds ``DEBUG`` messages to the file. There are three debug levels:

-  Debug level 0: ``INFO``, ``WARNING``, and ``ERROR`` messages are written in the ``/var/ossec/logs/ossec.log`` file. Level 0 is the default.
-  Debug level 1: The module also writes its own ``DEBUG`` messages, for example, the command it runs for each bucket or service.
-  Debug level 2: The highest level of verbosity. The module also writes the ``DEBUG`` output of each run, including the error that AWS returned. We recommend level 2 when troubleshooting the Wazuh module for AWS.

Follow these steps to enable debug mode:

#. Add the following line to the ``/var/ossec/etc/local_internal_options.conf`` file of the Wazuh agent, specifying the desired debug level:

   .. code-block:: ini

      wazuh_modules.debug=2

#. Restart the Wazuh agent.

   .. code-block:: console

      # systemctl restart wazuh-agent

.. note::

   Disable debug mode after you finish troubleshooting. Leaving debug mode enabled can result in the addition of large amounts of logs in the ``/var/ossec/logs/ossec.log`` file.

.. _aws_events_processed:

Checking if logs are being processed
------------------------------------

To verify log processing for any bucket or service, check the ``wazuh-events-v5*`` index pattern. This works even when no findings are generated. Go to **Explore** > **Discover** on the Wazuh dashboard and select the ``wazuh-events-v5*`` index pattern. To see every event that the Wazuh module for AWS sends, filter by ``wazuh.protocol.location: Wazuh-AWS``. This includes CloudWatch Logs events that other integrations decode.

The following event processing workflow shows how Wazuh processes logs from the Wazuh module for AWS and displays the resulting findings on the Wazuh dashboard:

#. **Log collection:** The Wazuh module for AWS retrieves logs from the configured AWS services according to its configuration. See :doc:`considerations for the Wazuh module for AWS configuration </cloud-security/amazon/services/prerequisites/considerations>` for information about filtering the logs.
#. **Log normalization:** The module sends the collected logs to the Wazuh manager. There, the data analysis engine uses decoders to parse, normalize, and enrich the raw events into structured data that follows the Wazuh Common Schema (WCS).
#. **Rule matching:** The Wazuh manager forwards the normalized events to the Wazuh indexer. Detectors on the indexer evaluate the events against the configured detection rules at regular intervals. When an event matches a rule, the indexer generates a finding and enriches it with event and rule metadata.
#. **Finding indexing:** The Wazuh indexer indexes and stores the generated findings, making them available for search and investigation.
#. **Finding visualization:** The Wazuh dashboard retrieves the indexed findings from the Wazuh indexer, allowing users to search, filter, analyze, and investigate them.

Common problems and solutions
-----------------------------

Unable to locate credentials
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh module for AWS does not work and the following error messages appear in the ``/var/ossec/logs/ossec.log`` file:

.. code-block:: none
   :class: output

   2022/03/03 16:01:48 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Returned exit code 12
   2022/03/03 16:01:48 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Unable to locate credentials

Solution
~~~~~~~~

No authentication method was provided within the configuration of the Wazuh module for AWS. Check the :doc:`configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different options available and how to configure them.

Invalid credentials to access S3 Bucket
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh module for AWS does not work and the following error messages appear in the ``/var/ossec/logs/ossec.log`` file:

.. code-block:: none
   :class: output

   2022/03/03 16:06:56 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Returned exit code 3
   2022/03/03 16:06:56 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Invalid credentials to access S3 Bucket

Solution
~~~~~~~~

Make sure the secret access key matches the access key ID, the credentials grant access to the S3 bucket, and the bucket exists. An access key ID that doesn't exist returns exit code 1 and ``Unknown error`` instead. To see the error that AWS returned, for example, ``InvalidAccessKeyId``, enable debug mode at level 2.

No profile was found in the user config file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh module for AWS does not work and the following error messages appear in the ``/var/ossec/logs/ossec.log`` file:

.. code-block:: none
   :class: output

   2022/03/03 15:49:34 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Returned exit code 23
   2022/03/03 15:49:34 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  No profile named: 'profile prod' was found in the user config file

Solution
~~~~~~~~

Make sure the ``aws_profile`` value has a section in both files: ``[<PROFILE>]`` in ``/root/.aws/credentials`` and ``[profile <PROFILE>]`` in ``/root/.aws/config``. A profile defined only in ``/root/.aws/credentials`` returns this error. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about configuring a profile for authentication.

The security token included in the request is invalid
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh module for AWS does not work and the following error messages appear in the ``/var/ossec/logs/ossec.log`` file:

.. code-block:: none
   :class: output

   2022/03/03 16:16:18 wazuh-modulesd:aws-s3: WARNING: Service: cloudwatchlogs  -  Returned exit code 12
   2022/03/03 16:16:18 wazuh-modulesd:aws-s3: WARNING: Service: cloudwatchlogs  -  An error occurred (InvalidClientTokenId) when calling the GetCallerIdentity operation: The security token included in the request is invalid.

Solution
~~~~~~~~

The access key ID in your credentials isn't valid. It might be wrong, deleted, or deactivated. Use an active access key ID and its matching secret access key. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different options available and how to configure them.

There are no AWS events present on the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh module for AWS is running but no events are displayed on the Wazuh dashboard.

Solution
~~~~~~~~

First of all, review ``ERROR`` or ``WARNING`` messages in the ``/var/ossec/logs/ossec.log`` file by :ref:`enabling debug mode <aws_debug_mode>`. If the Wazuh module for AWS runs as expected but no events appear, check the following:

-  Make sure there is data available for the given date.

   When running, the Wazuh module for AWS requests AWS for the logs corresponding to the date indicated using the :ref:`only_logs_after <only_logs_aws_buckets>` parameter. If this parameter is not specified, it tries to obtain the logs corresponding to the day of execution. Make sure you are specifying a value for :ref:`only_logs_after <only_logs_aws_buckets>` and that there is data available for that particular date. Check the :doc:`considerations for configuration </cloud-security/amazon/services/prerequisites/considerations>` page to learn more about how to properly filter the logs using the ``only_logs_after`` parameter.

-  Check if the events are being sent to the analysis engine.

   Events that don't match any rule don't raise findings, but they still appear in Discover. See the :ref:`Checking if logs are being processed <aws_events_processed>` section to check whether the AWS logs reach the analysis engine.

CloudWatch Logs collection is running but no finding is shown on the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh module for AWS is running without any error or warning messages, but no findings from CloudWatch Logs are displayed on the Wazuh dashboard.

Solution
~~~~~~~~

A common scenario is that the events don't match any of the available rules, so no findings are generated. See the :ref:`Checking if logs are being processed <aws_events_processed>` section to check whether the AWS logs reach the analysis engine.

CloudWatch Logs events can have any format and come from any source. Wazuh decodes each event with the integration that matches its format, and that integration's rules raise the findings. For example, a syslog sshd line raises the Failed authentication attempt finding. To process logs in a custom format, create your own rules. See the :doc:`Create a security analytics detection workflow </user-manual/data-analysis/detection-workflow>` section to learn more about this topic.

.. _interval_overtaken_message:

Interval overtaken message is present in the log file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``Interval overtaken`` message is present in the ``/var/ossec/logs/ossec.log`` file.

Solution
~~~~~~~~

Not an issue but a warning. The warning means the last execution took longer than the configured interval. It is important to note that the next run doesn't start until the previous one finishes.

Error codes reference
---------------------

The following table lists the errors in the ``/var/ossec/logs/ossec.log`` file of the Wazuh agent, with their exit codes and possible remediation:

+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code | Description                                                    | Possible remediation                                                                                                                                                                                                                                                                          |
+======+================================================================+===============================================================================================================================================================================================================================================================================================+
| 1    | Unknown error                                                  | Enable debug mode at level 2 to see the error. If AWS returned it, for example, ``InvalidAccessKeyId``, check your credentials and configuration. Otherwise, open an issue in the `Wazuh GitHub repository <https://github.com/wazuh/wazuh/issues/new/choose>`__ with the trace of the error. |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 2    | SIGINT, or invalid argument                                    | The Wazuh module for AWS stopped due to an interrupt signal, or an argument isn't valid, for example, a region in the wrong format.                                                                                                                                                           |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 3    | Invalid credentials to access S3 bucket                        | Make sure that your credentials are correct. For more information, see the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section.                                                                                                              |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 4    | boto3 module missing                                           | Install ``boto3`` library. For more information, see the :doc:`Install dependencies </cloud-security/amazon/services/prerequisites/dependencies>` section.                                                                                                                                    |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 5    | Unexpected error accessing SQLite DB                           | Check that no more instances of the Wazuh module for AWS are running at the same time.                                                                                                                                                                                                        |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 6    | Unable to create SQLite DB                                     | Make sure that the Wazuh module for AWS has the right permissions in its directory.                                                                                                                                                                                                           |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 7    | Unexpected error querying/working with objects in S3           | Check that no more instances of the Wazuh module for AWS are running at the same time.                                                                                                                                                                                                        |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 8    | Failed to decompress file                                      | Only ``.gz`` and ``.zip`` compression formats are supported.                                                                                                                                                                                                                                  |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 9    | Failed to parse file                                           | Make sure that the log file contents have the expected structure.                                                                                                                                                                                                                             |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 10   | pyarrow module missing                                         | Install ``pyarrow`` library. For more information, see the :doc:`Install dependencies </cloud-security/amazon/services/prerequisites/dependencies>` section.                                                                                                                                  |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 11   | Unable to connect to Wazuh                                     | Make sure that the Wazuh agent is running.                                                                                                                                                                                                                                                    |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 12   | Invalid type of bucket, or AWS credentials error               | For Unable to locate credentials or an invalid security token, check your AWS credentials. Otherwise, check that the type of bucket is one of the :doc:`supported </cloud-security/amazon/services/supported-services/index>` types.                                                          |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 13   | Error sending message to Wazuh                                 | Make sure that Wazuh is running.                                                                                                                                                                                                                                                              |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 14   | Empty bucket                                                   | Make sure that the path to the log files is correct.                                                                                                                                                                                                                                          |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 15   | Invalid VPC endpoint URL                                       | Make sure that the VPC endpoint URL you provide is correct.                                                                                                                                                                                                                                   |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 16   | Throttling error, or a failed CloudWatch Logs request          | AWS is receiving more than 10 requests per second. Try to run the Wazuh module for AWS again when the number of requests to AWS has decreased. For more information see the :ref:`connection configuration for retries <connection_configuration_for_retries>` section.                       |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 17   | Invalid file key format                                        | Make sure that the file path follows the format specified in the :doc:`supported services </cloud-security/amazon/services/supported-services/index>`.                                                                                                                                        |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 18   | Invalid prefix                                                 | Make sure that the indicated path exists in the S3 bucket.                                                                                                                                                                                                                                    |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 19   | The server datetime and datetime of the AWS environment differ | Make sure that the server datetime is correctly set.                                                                                                                                                                                                                                          |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 20   | Unable to find SQS                                             | Make sure that the ``<sqs_name>`` value in the Wazuh module for AWS configuration in the ``/var/ossec/etc/ossec.conf`` file is correct.                                                                                                                                                       |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 21   | Failed fetch/delete from SQS                                   | Check that no more instances of the Wazuh module for AWS are running at the same time.                                                                                                                                                                                                        |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 22   | Invalid region                                                 | Check the provided ``<regions>`` in the ``/var/ossec/etc/ossec.conf`` file.                                                                                                                                                                                                                   |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 23   | Profile not found                                              | Check the provided ``aws_profile`` in the ``/var/ossec/etc/ossec.conf`` file, and that ``/root/.aws/config`` has a ``[profile <PROFILE>]`` section for it.                                                                                                                                    |
+------+----------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
