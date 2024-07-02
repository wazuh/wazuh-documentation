.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Frequently asked questions about the Wazuh module for Amazon. Learn more about it in this section of the documentation.

Troubleshooting
===============

The below information is intended to assist in troubleshooting issues.

Checking if the module is running
---------------------------------

When the module runs it writes its output in the ``ossec.log`` file. This log file can be found in ``WAZUH_PATH/logs/ossec.log`` or under **App Logs** if using the Wazuh UI.

It is possible to check if the module is running without issues by looking in the ``ossec.log`` file. These are the messages that are displayed in the ``ossec.log``, depending on how the module has been configured:

- When the module is starting:

    .. code-block:: none
        :class: output

        2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Module AWS started
        2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Starting fetching of logs.


- When Scheduled scan is set:

    .. code-block:: none
        :class: output

        2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Starting fetching of logs.
        2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Fetching logs finished.


- When the module has finished its execution and is waiting until the :ref:`aws_interval` condition is met:

    .. code-block:: none
        :class: output

        2022/03/04 00:00:00 wazuh-modulesd:aws-s3: INFO: Fetching logs finished.

.. _aws_debug_mode:

Enabling debug mode
-------------------

It is possible to obtain additional information about the module's execution by enabling the debug mode. This is used to see ``INFO`` or ``DEBUG`` messages. There are three different debug levels available:

- **Debug level 0**: Only ``ERROR`` and ``WARNING`` messages are written in the ``ossec.log`` file. This is the default value.

- **Debug level 1**: In addition to ``ERROR`` and ``WARNING`` messages, ``INFO`` messages are written in the ``ossec.log`` file too. They are useful to check the execution of the module without having to manage large amounts of ``DEBUG`` messages.

- **Debug level 2**: This is the highest level of verbosity. Every message type is dump into the ``ossec.log`` file, including ``DEBUG`` messages which contain the details of the different operations performed by the module. This is the recommended mode when troubleshooting the module.


Follow these steps to enable debug mode:

#. Add the following line to the ``WAZUH_PATH/etc/local_internal_options.conf`` file, specifying the desired debug level:

    .. code-block:: none

        wazuh_modules.debug=2


#. Restart the Wazuh service.

.. include:: /_templates/common/restart_manager_or_agent.rst

.. Note::
        Don't forget to disable debug mode once the troubleshooting has finished. Leaving debug mode enabled could result in the addition of large amounts of logs in the ``ossec.log`` file.

.. _aws_events_processed:

Checking if logs are being processed
------------------------------------

The easiest way to check if the logs are being processed, regardless of the type of bucket or service configured and regardless of whether alerts are being generated or not is by using the :ref:`reference_ossec_global_logall_json` parameter.

To understand how the :ref:`reference_ossec_global_logall_json` parameter works it is necessary to learn about the flow that is followed when processing a log until the corresponding alert is displayed in the Wazuh UI. It is as follows:

#. The module downloads the logs available in AWS for the requested date and path. Check the :ref:`amazon_considerations` page to learn more about how to properly filter the logs.
#. The content of these logs is sent to the analysis engine in the form of an ``Event``.
#. The analysis engine evaluates these events and compares them with the different rules available. If the event matches any of the rules an alert is generated, which is what ultimately is shown in the Wazuh UI.

With this in mind, it is possible to make use of the :ref:`reference_ossec_global_logall_json` option. When this option is activated, Wazuh stores into the ``WAZUH_PATH/logs/archives/archives.json`` file every event sent to the analysis engine whether they tripped a rule or not. By checking this file, it is possible to determine if the AWS events are being sent to the analysis engine and therefore the module is working as expected.

.. Note::
        Don't forget to disable the :ref:`reference_ossec_global_logall_json` parameter once the troubleshooting has finished. Leaving it enabled could result in high disk space consumption.


Common problems and solutions
-----------------------------

Unable to locate credentials
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The module does not work and the following error messages appear in the ``ossec.log``:

    .. code-block:: none
        :class: output

        2022/03/03 16:01:48 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Returned exit code 12
        2022/03/03 16:01:48 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Unable to locate credentials

**Solution**

No authentication method was provided within the configuration of the module. Check the :ref:`Configuring AWS credentials <amazon_credentials>` section to learn more about the different options available and how to configure them.


Invalid credentials to access S3 Bucket
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The module does not work and the following error messages appear in the ``ossec.log``:

    .. code-block:: none
        :class: output

        2022/03/03 16:06:56 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Returned exit code 3
        2022/03/03 16:06:56 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Invalid credentials to access S3 Bucket

**Solution**

Make sure the credentials provided grant access to the requested S3 bucket and the bucket itself exists.


The config profile could not be found
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The module does not work and the following error messages appear in the ``ossec.log``:

    .. code-block:: none
        :class: output

        2022/03/03 15:49:34 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  Returned exit code 12
        2022/03/03 15:49:34 wazuh-modulesd:aws-s3: WARNING: Bucket:  -  The config profile (default) could not be found

**Solution**

Ensure the profile value specified in the configuration matches an existing one placed in ``/root/.aws/credentials``. Check the :ref:`Configuring AWS credentials <aws_profile>` section to learn more about configuring a profile for authentication.

The security token included in the request is invalid
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The module does not work and the following error messages appear in the ``ossec.log``:

    .. code-block:: none
        :class: output

        2022/03/03 16:16:18 wazuh-modulesd:aws-s3: WARNING: Service: cloudwatchlogs  -  Returned exit code 12
        2022/03/03 16:16:18 wazuh-modulesd:aws-s3: WARNING: Service: cloudwatchlogs  -  An error occurred (InvalidClientTokenId) when calling the GetCallerIdentity operation: The security token included in the request is invalid.

**Solution**

No credentials were provided to attempt to access to CloudWatch Logs or that the credentials provided don't grant access to CloudWatch Logs. Check the :ref:`Configuring AWS credentials <amazon_credentials>` section to learn more about the different options available and how to configure them.


There are no AWS alerts present in the Wazuh UI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The module is running but no alerts are displayed in the Wazuh UI.

**Solution**

First of all, review ``ERROR`` or ``WARNING`` messages in the ``ossec.log`` file by :ref:`enabling debug mode <aws_debug_mode>`. If the module is running as expected but no alerts are being generated it could mean there is no reason for alerts to be raised in first place. Check the following to verify this:

- **Make sure there is data available for the given date**.

        When running, the module requests AWS for the logs corresponding to the date indicated using the :ref:`only_logs_aws_buckets` parameter. If this parameter is not specified, it will try to obtain the logs corresponding to the day of execution. Make sure you are specifying a value for :ref:`only_logs_aws_buckets` and that there is data available for that particular date. Check the :ref:`amazon_considerations` page to learn more about how to properly filter the logs using the ``only_logs_after`` parameter.

- **Check if the events are being sent to the analysis engine**.

        A common scenario is that no alerts are being generated because the events are not matching any of the available rules. Take a look to the :ref:`aws_events_processed` section to learn how to check if the AWS logs are being sent to the analysis engine.


CloudWatch Logs integration is running but no alert is shown in the Wazuh UI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The module is running without any error or warning messages, but no alerts from CloudWatch Logs are displayed in the Wazuh UI.

**Solution**

A common scenario is that no alerts are being generated because the events are not matching any of the available rules. Take a look to the :ref:`aws_events_processed` section to learn how to check if the AWS logs are being sent to the analysis engine.

Take into account that Wazuh does not provide default rules for the different logs that can be found in CloudWatch Logs, since they can have any type of format and come from any source. Because of this, if a user wants to make use of this integration to process any custom log they will most likely have to configure their own rules for them. Take a look at the :doc:`/user-manual/ruleset/rules/custom` section to learn more about this topic.


.. _interval_overtaken_message:

Interval overtaken message is present in the ossec.log
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``Interval overtaken`` message is present in the ``ossec.log`` file.

**Solution**

Not an issue but a warning. This means the time the module required to finished the last execution was greater than the interval value defined. It is important to note that the next run will not start until the previous one is finished.


Error codes reference
---------------------

#. Errors in ``ossec.log``

    The exit codes and their possible remediation are as follows:

    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | **Code**  | **Description**                                                   | **Possible remediation**                                                                                                                             |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 1         | Unknown error                                                     | Programming error. Please, open an issue in the `Wazuh GitHub repository <https://github.com/wazuh/wazuh/issues/new/choose>`_ with the trace of the  |
    |           |                                                                   | error.                                                                                                                                               |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 2         | SIGINT                                                            | The module stopped due to an interrupt signal.                                                                                                       |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 3         | Invalid credentials to access S3 bucket                           | Make sure that your credentials are OK. For more information, see the :ref:`Configuring AWS credentials <amazon_credentials>` section.               |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 4         | boto3 module missing                                              | Install ``boto3`` library. For more information, see the :doc:`Installing dependencies <prerequisites/dependencies>` section.                        |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 5         | Unexpected error accessing SQLite DB                              | Check that no more instances of the wodle are running at the same time.                                                                              |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 6         | Unable to create SQLite DB                                        | Make sure that the wodle has the right permissions in its directory.                                                                                 |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 7         | Unexpected error querying/working with objects in S3              | Check that no more instances of the wodle are running at the same time.                                                                              |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 8         | Failed to decompress file                                         | Only ``.gz`` and ``.zip`` compression formats are supported.                                                                                         |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 9         | Failed to parse file                                              | Ensure that the log file contents have the expected structure.                                                                                       |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 10        | pyarrow module missing                                            | Install ``pyarrow`` library. For more information, see the :doc:`Installing dependencies <prerequisites/dependencies>` section.                      |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 11        | Unable to connect to Wazuh                                        | Ensure that Wazuh is running.                                                                                                                        |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 12        | Invalid type of bucket                                            | Check if the type of bucket is one of the :ref:`supported <amazon_supported_services>`.                                                              |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 13        | Error sending message to Wazuh                                    | Make sure that Wazuh is running.                                                                                                                     |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 14        | Empty bucket                                                      | Make sure that the path to the log files is correct.                                                                                                 |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 15        | Invalid VPC endpoint URL                                          | Ensure that the VPC endpoint URL provided is correct.                                                                                                |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 16        | Throttling error                                                  | AWS is receiving more than 10 requests per second. Try to run the module again when the number of requests to AWS has decreased.                     |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 17        | Invalid file key format                                           | Ensure that the file path follows the format specified in the :doc:`Wazuh documentation </cloud-security/amazon/services/supported-services/index>`  |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 18        | Invalid prefix                                                    | Make sure that the indicated path exists in the S3 bucket.                                                                                           |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 19        | The server datetime and datetime of the AWS environment differ    | Make sure that the server datetime is correctly set.                                                                                                 |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 20        | Unable to find SQS                                                | Make sure that the ``sqs_name`` value in the wodle configuration in the ``ossec.conf`` file is correct.                                              |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 21        | Failed fetch/delete from SQS                                      | Check that no more instances of the wodle are running at the same time.                                                                              |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 22        | Invalid region                                                    | Check the provided ``region`` in the ``ossec.conf`` file.                                                                                            |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
    | 23        | Profile not found                                                 | Check the provided ``aws_profile`` in the ``ossec.conf`` file.                                                                                       |
    +-----------+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
