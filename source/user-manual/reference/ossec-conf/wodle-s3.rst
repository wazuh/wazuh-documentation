.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn more about the local configuration of Wazuh. In this section of the documentation you can learn more about the configuration options of the Wazuh integration with AWS.

.. _wodle_s3:

wodle name="aws-s3"
===================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="aws-s3">
		</wodle>

After adding an ``aws-s3`` section, it is mandatory to define at least one :ref:`bucket<buckets>`, :ref:`service <services>` or :ref:`subscriber<subscribers>`. It is possible to configure multiple buckets, services and subscribers inside the same ``aws-s3`` section.

The options available to use inside the ``aws-s3`` section are the following:

disabled
~~~~~~~~

Disables the AWS-S3 wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+
| **Mandatory**      | yes                         |
+--------------------+-----------------------------+

skip_on_error
~~~~~~~~~~~~~

When unable to process and parse a log, skip it and continue processing. If set to no, the module will abort the execution once it encounters an error.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+
| **Mandatory**      | no      |
+--------------------+---------+

run_on_start
~~~~~~~~~~~~

Run the module immediately after the Wazuh service starts.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+
| **Mandatory**      | no      |
+--------------------+---------+

.. _aws_interval:

interval
~~~~~~~~

The amount of time the module will wait for before running again.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 10m                                                                                                                                                  |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that must contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), M (months).   |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Mandatory**      | no                                                                                                                                                   +
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+

day
~~~

Day of the month to run the scan.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+
| **Mandatory**      | no                       |
+--------------------+--------------------------+

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.

wday
~~~~

Day of the week to run the scan. This option is **not compatible** with the ``day`` option.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the week:         |
|                    |  - sunday/sun            |
|                    |  - monday/mon            |
|                    |  - tuesday/tue           |
|                    |  - wednesday/wed         |
|                    |  - thursday/thu          |
|                    |  - friday/fri            |
|                    |  - saturday/sat          |
+--------------------+--------------------------+
| **Mandatory**      | no                       |
+--------------------+--------------------------+


.. note::

	When the ``wday`` option is set, the interval value must be a multiple of weeks. By default, the interval is set to a week.

time
~~~~

Time of the day to run the scan. It has to be in the hh:mm format.

+--------------------+-----------------------+
| **Default value**  | N/A                   |
+--------------------+-----------------------+
| **Allowed values** | Time of day *[hh:mm]* |
+--------------------+-----------------------+
| **Mandatory**      | no                    |
+--------------------+-----------------------+

.. note::

    If only the ``time`` option is set, the interval value must be a multiple of days, weeks, or months. By default, the interval is set to a day.


.. _buckets:

Buckets
~~~~~~~

It is necessary to specify the type as an attribute of the ``bucket`` tag to indicate the service configured. More information about the supported services and their associated types on :doc:`AWS supported services </cloud-security/amazon/services/supported-services/index>`.

	.. code-block:: xml

		<bucket type="cloudtrail">

		</bucket>

The available types are:  ``cloudtrail``, ``guardduty``, ``vpcflow``, ``config``, ``custom``, ``cisco_umbrella``, ``waf``, ``alb``, ``clb``, ``nlb``, and ``server_access``.

+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| Options                                | Allowed values                                              | Mandatory/Optional                            |
+========================================+=============================================================+===============================================+
| :ref:`bucket_name`                     | Any valid bucket name                                       | Mandatory                                     |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_aws_account_id`           | Comma-separated list of AWS Accounts                        | Optional (only works with CloudTrail buckets) |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_account_alias`            | Any string                                                  | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_access_key`               | Alphanumerical key                                          | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_secret_key`               | Alphanumerical key                                          | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_aws_profile`              | Any string                                                  | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_iam_role_arn`             | IAM role ARN                                                | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_iam_role_duration`        | Number of seconds between 900 and 3600                      | Optional (if set, it requires an iam_role_arn |
|                                        |                                                             | to be provided)                               |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_path`                     | Prefix for S3 bucket key                                    | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_path_suffix`              | Suffix for S3 bucket key                                    | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`only_logs_aws_buckets`           | Date (YYYY-MMM-DDD, for example 2018-AUG-21)                | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_regions`                  | Comma-separated list of AWS regions                         | Optional (only works with CloudTrail buckets) |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_aws_organization_id`      | Name of AWS organization                                    | Optional (only works with CloudTrail buckets) |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_discard_regex`            | A regex to determine if an event must be discarded          | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_remove_from_bucket`       | A value to determine if each log file is deleted once it    | Optional                                      |
|                                        | has been collected by the module                            |                                               |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_sts_endpoint`             | The AWS Security Token Service VPC endpoint URL             | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`bucket_service_endpoint`         | The AWS S3 endpoint URL                                     | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+

.. _bucket_name:

name
^^^^

Name of the S3 bucket from where logs are read.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any valid bucket name       |
+--------------------+-----------------------------+

.. _bucket_aws_account_id:

aws_account_id
^^^^^^^^^^^^^^

The AWS Account ID for the bucket logs. Only works with CloudTrail buckets.

+--------------------+--------------------------------------------------+
| **Default value**  | All accounts                                     |
+--------------------+--------------------------------------------------+
| **Allowed values** | Comma-separated list of 12 digit AWS Account IDs |
+--------------------+--------------------------------------------------+


.. _bucket_account_alias:

aws_account_alias
^^^^^^^^^^^^^^^^^

A user-friendly name for the AWS account.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any string                  |
+--------------------+-----------------------------+

.. _bucket_access_key:

access_key
^^^^^^^^^^

The access key ID for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key   |
+--------------------+--------------------------+

.. _bucket_secret_key:


secret_key
^^^^^^^^^^

The secret key created for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key   |
+--------------------+--------------------------+

.. _bucket_aws_profile:

aws_profile
^^^^^^^^^^^

A valid profile name from a Shared Credential File or AWS Config File with the permission to read logs from the bucket.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Valid profile name |
+--------------------+--------------------+

.. _bucket_iam_role_arn:

iam_role_arn
^^^^^^^^^^^^

A valid role ARN with permission to read logs from the bucket.

+--------------------+----------------+
| **Default value**  | N/A            |
+--------------------+----------------+
| **Allowed values** | Valid role ARN |
+--------------------+----------------+

.. _bucket_iam_role_duration:

iam_role_duration
^^^^^^^^^^^^^^^^^

A valid number of seconds that defines the duration of the session assumed when using the provided :ref:`iam_role_arn<bucket_iam_role_arn>`.

+--------------------+------------------------------------------+
| **Default value**  | N/A                                      |
+--------------------+------------------------------------------+
| **Allowed values** | Number of seconds between 900 and 3600   |
+--------------------+------------------------------------------+

.. _bucket_path:

path
^^^^

If defined, the path or prefix for the bucket.

+--------------------+---------------+
| **Default value**  | N/A           |
+--------------------+---------------+
| **Allowed values** | Valid path    |
+--------------------+---------------+

.. _bucket_path_suffix:

path_suffix
^^^^^^^^^^^

If defined, the suffix for the bucket. Only works with buckets that contain the folder named AWSLogs (Cloudtrail, VPC, and Macie).

+--------------------+---------------+
| **Default value**  | N/A           |
+--------------------+---------------+
| **Allowed values** | Valid path    |
+--------------------+---------------+

.. _only_logs_aws_buckets:

only_logs_after
^^^^^^^^^^^^^^^

A valid date, in YYYY-MMM-DD format. Only logs from that date onwards will be parsed.

+--------------------+-----------------------------------+
| **Default value**  | Date of execution at ``00:00:00`` |
+--------------------+-----------------------------------+
| **Allowed values** | Valid date                        |
+--------------------+-----------------------------------+

.. _bucket_regions:

regions
^^^^^^^

A comma-separated list of regions to limit parsing of logs. Only works with CloudTrail buckets.

+--------------------+----------------------------------------+
| **Default value**  | All regions                            |
+--------------------+----------------------------------------+
| **Allowed values** | Comma-separated list of valid regions  |
+--------------------+----------------------------------------+

.. _bucket_aws_organization_id:

aws_organization_id
^^^^^^^^^^^^^^^^^^^

Name of AWS organization. Only works with CloudTrail buckets.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Valid AWS organization name            |
+--------------------+----------------------------------------+

.. _bucket_discard_regex:

discard_regex
^^^^^^^^^^^^^

A regular expression to determine if an event must be discarded. It requires a mandatory ``field`` attribute. If the field is present in the event log, the regex is applied to it. For example, ``userIdentity.principalID`` for the following AWS CloudTrail log example:

.. code-block:: json
   :emphasize-lines: 5

   {
      "eventVersion": "1.09",
      "userIdentity": {
          "type": "IAMUser",
          "principalId": "EXAMPLE6E4XEGITWATV6R",
          "arn": "arn:aws:iam::123456789012:user/Mary_Major",
          "accountId": "123456789012",
          "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
          "userName": "Mary_Major",
          "sessionContext": {
              "attributes": {
                  "creationDate": "2023-07-19T21:11:57Z",
                  "mfaAuthenticated": "false"
              }
          }
      },
      "eventTime": "2023-07-19T21:33:41Z",
      "eventSource": "cloudtrail.amazonaws.com",
      "eventName": "StartLogging",
      "awsRegion": "us-east-1",
      "sourceIPAddress": "192.0.2.0",
      "userAgent": "aws-cli/2.13.5 Python/3.11.4 Linux/4.14.255-314-253.539.amzn2.x86_64 exec-env/CloudShell exe/x86_64.amzn.2 prompt/off command/cloudtrail.start-logging",
      "requestParameters": {
          "name": "myTrail"
      },
      "responseElements": null,
      "requestID": "9d478fc1-4f10-490f-a26b-EXAMPLE0e932",
      "eventID": "eae87c48-d421-4626-94f5-EXAMPLEac994",
      "readOnly": false,
      "eventType": "AwsApiCall",
      "managementEvent": true,
      "recipientAccountId": "123456789012",
      "eventCategory": "Management",
      "tlsDetails": {
          "tlsVersion": "TLSv1.2",
          "cipherSuite": "ECDHE-RSA-AES128-GCM-SHA256",
          "clientProvidedHostHeader": "cloudtrail.us-east-1.amazonaws.com"
      },
      "sessionCredentialFromConsole": "true"
   }


.. note::
    This log is the raw event log fetched from the AWS Bucket.


+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any regex or sregex expression         |
+--------------------+----------------------------------------+

Attributes:

+-----------+------------------------------------------------------------------------+
| **field** | The event field where to apply the regex                               |
|           +------------------+-----------------------------------------------------+
|           | Default value    | N/A                                                 |
|           +------------------+-----------------------------------------------------+
|           | Allowed values   | A str containing the full field name path           |
+-----------+------------------+-----------------------------------------------------+

Usage example for the ``cloudtrail`` bucket type:

.. code-block:: console

    <discard_regex field="userIdentity.principalID">EXAMPLE6E4XEGITWATV6R</discard_regex>

.. _bucket_remove_from_bucket:

remove_from_bucket
^^^^^^^^^^^^^^^^^^

A value to determine if each log file is deleted once it has been collected by the module.

+--------------------+-----------------------+
| **Default value**  | no                    |
+--------------------+-----------------------+
| **Allowed values** | yes, no               |
+--------------------+-----------------------+


.. _bucket_sts_endpoint:

sts_endpoint
^^^^^^^^^^^^

The AWS Security Token Service VPC endpoint URL to be used when an IAM role is provided as the authentication method. Check the :doc:`Considerations for configuration </cloud-security/amazon/services/prerequisites/considerations>` page to learn more about VPC endpoints.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any valid VPC endpoint URL for STS     |
+--------------------+----------------------------------------+

.. _bucket_service_endpoint:

service_endpoint
^^^^^^^^^^^^^^^^

The AWS S3 endpoint URL to be used to download the data from the bucket. Check the :doc:`Considerations for configuration </cloud-security/amazon/services/prerequisites/considerations>` page to learn more about VPC and FIPS endpoints.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any valid endpoint URL for S3          |
+--------------------+----------------------------------------+

.. _services:

Services
~~~~~~~~

It is necessary to specify the type as an attribute of the ``service`` tag to indicate the service configured. More information about the supported services and their associated types on :doc:`AWS supported services </cloud-security/amazon/services/supported-services/index>`.

	.. code-block:: xml

		<service type="cloudwatchlogs">

		</service>

The available types are: ``cloudwatchlogs``, and ``inspector``.

+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| Options                                | Allowed values                                              | Mandatory/Optional                            |
+========================================+=============================================================+===============================================+
| :ref:`service_aws_account_id`          | Comma-separated list of 12 digit AWS Account IDs            | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_aws_account_alias`       | Any string                                                  | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_aws_log_groups`          | Comma-separated list of valid log group names               | Mandatory for CloudWatch Logs                 |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_access_key`              | Any alphanumerical key                                      | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_secret_key`              | Any alphanumerical key                                      | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_aws_profile`             | Valid profile name                                          | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_discard_regex`           | A regex to determine if an event must be discarded          | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_iam_role_arn`            | Valid role ARN                                              | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_iam_role_duration`       | Number of seconds between 900 and 3600                      | Optional (if set, it requires an iam_role_arn |
|                                        |                                                             | to be provided)                               |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_only_logs_after`         | Valid date in YYYY-MMM-DD format                            | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_regions`                 | Comma-separated list of valid regions                       | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_remove_log_streams`      | yes, no                                                     | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_sts_endpoint`            | Any valid VPC endpoint URL for STS                          | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`service_service_endpoint`        | Any valid endpoint URL for the AWS Service                  | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+

.. _service_aws_account_id:

aws_account_id
^^^^^^^^^^^^^^

The AWS Account ID for accessing the service.

+--------------------+-----------------------------------------------------+
| **Default value**  | All accounts                                        |
+--------------------+-----------------------------------------------------+
| **Allowed values** | Comma-separated list of 12 digit AWS Account IDs    |
+--------------------+-----------------------------------------------------+

.. _service_aws_account_alias:

aws_account_alias
^^^^^^^^^^^^^^^^^

A user-friendly name for the AWS account.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any string                  |
+--------------------+-----------------------------+

.. _service_access_key:

access_key
^^^^^^^^^^

The access key ID for the IAM user with the permission to access the service.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key   |
+--------------------+--------------------------+

.. _service_aws_log_groups:

aws_log_groups
^^^^^^^^^^^^^^

A comma-separated list of log group names from where the logs should be extracted. This option is mandatory for CloudWatch Logs, and only works with that service.

+--------------------+------------------------------------------------+
| **Default value**  | N/A                                            |
+--------------------+------------------------------------------------+
| **Allowed values** | Comma-separated list of valid log group names  |
+--------------------+------------------------------------------------+

.. _service_secret_key:

secret_key
^^^^^^^^^^

The secret key created for the IAM user with the permission to access the service.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key   |
+--------------------+--------------------------+

.. _service_aws_profile:

aws_profile
^^^^^^^^^^^

A valid profile name from a Shared Credential File or AWS Config File with the permission to access the service.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Valid profile name |
+--------------------+--------------------+

.. _service_discard_regex:

discard_regex
^^^^^^^^^^^^^

A regular expression to determine if an event must be discarded.

-  For ``inspector``, it requires a mandatory ``field`` attribute which must be present in the fetched event. The regex is applied to the event field specified with this attribute.
-  For ``cloudwatchlogs``, the ``field`` attribute is optional. You can omit it, for example, when monitoring Cloudwatch logs in JSON format and plain text.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any regex or sregex expression         |
+--------------------+----------------------------------------+

Attributes:

+-----------+-----------------------------------------------------------------------+
| **field** | The event field where to apply the regex                              |
|           +------------------+----------------------------------------------------+
|           | Default value    | N/A                                                |
|           +------------------+----------------------------------------------------+
|           | Allowed values   | A str containing the full field name path          |
+-----------+------------------+----------------------------------------------------+

Usage example for the ``inspector`` service type:

.. code-block:: console

    <discard_regex field="assetAttributes.agentId">i-instanceID</discard_regex>

Usage example only for ``cloudwatchlogs``:

.. code-block:: console

    <discard_regex>.*Log:.*</discard_regex>

.. _service_iam_role_arn:

iam_role_arn
^^^^^^^^^^^^

A valid role ARN with permission to access the service.

+--------------------+----------------+
| **Default value**  | N/A            |
+--------------------+----------------+
| **Allowed values** | Valid role ARN |
+--------------------+----------------+

.. _service_iam_role_duration:

iam_role_duration
^^^^^^^^^^^^^^^^^

A valid number of seconds that defines the duration of the session assumed when using the provided :ref:`iam_role_arn<service_iam_role_arn>`.

+--------------------+------------------------------------------+
| **Default value**  | N/A                                      |
+--------------------+------------------------------------------+
| **Allowed values** | Number of seconds between 900 and 3600   |
+--------------------+------------------------------------------+

.. _service_only_logs_after:

only_logs_after
^^^^^^^^^^^^^^^

A valid date, in YYYY-MMM-DD format. Only logs from that date onwards will be parsed. This option is only available for the CloudWatch Logs service.

+--------------------+-----------------------------------+
| **Default value**  | Date of execution at ``00:00:00`` |
+--------------------+-----------------------------------+
| **Allowed values** | Valid date in YYYY-MMM-DD format  |
+--------------------+-----------------------------------+

.. _service_regions:

regions
^^^^^^^

A comma-separated list of regions to limit parsing of logs.

+--------------------+----------------------------------------+
| **Default value**  | All regions                            |
+--------------------+----------------------------------------+
| **Allowed values** | Comma-separated list of valid regions  |
+--------------------+----------------------------------------+

.. _service_remove_log_streams:

remove_log_streams
^^^^^^^^^^^^^^^^^^

Define whether or not to remove the log streams from the log groups after they are read by the module. Only works for CloudWatch Logs service.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. _service_sts_endpoint:

sts_endpoint
^^^^^^^^^^^^

The AWS Security Token Service VPC endpoint URL to be used when an IAM role is provided as the authentication method. Check the :doc:`Considerations for configuration </cloud-security/amazon/services/prerequisites/considerations>` page to learn more about VPC endpoints.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any valid VPC endpoint URL for STS     |
+--------------------+----------------------------------------+

.. _service_service_endpoint:

service_endpoint
^^^^^^^^^^^^^^^^

The endpoint URL for the required AWS Service to be used to download the data from it. Check the :doc:`Considerations for configuration </cloud-security/amazon/services/prerequisites/considerations>` page to learn more about VPC and FIPS endpoints.

+--------------------+------------------------------------------------+
| **Default value**  | N/A                                            |
+--------------------+------------------------------------------------+
| **Allowed values** | Any valid endpoint URL for the AWS Service     |
+--------------------+------------------------------------------------+

.. _subscribers:

Subscribers
~~~~~~~~~~~

It is necessary to specify the type as an attribute of the ``subscriber`` tag to indicate the service configured. More information about the supported services and their associated types on :doc:`AWS supported services </cloud-security/amazon/services/supported-services/index>`.

	.. code-block:: xml

		<subscriber type="security_lake">

		</subscriber>

The currently available types are:

-  ``security_lake``
-  ``buckets``
-  ``security_hub``

+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| Options                                | Allowed values                                              | Mandatory/Optional                            |
+========================================+=============================================================+===============================================+
| :ref:`subscriber_sqs_name`             | Any valid SQS name                                          | Mandatory                                     |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`subscriber_iam_role_arn`         | Valid role ARN                                              | Mandatory for Amazon Security Lake            |
|                                        |                                                             | Subscription                                  |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`subscriber_external_id`          | Valid external ID                                           | Mandatory for Amazon Security Lake            |
|                                        |                                                             | Subscription                                  |
|                                        |                                                             | (not available for Custom Logs Buckets        |
|                                        |                                                             | and Amazon Security Hub)                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`subscriber_aws_profile`          | Valid profile name                                          | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`subscriber_iam_role_duration`    | Number of seconds between 900 and 3600                      | Optional (if set, it requires an iam_role_arn |
|                                        |                                                             | to be provided)                               |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`subscriber_discard_regex`        | A regex value to determine if an event must be discarded    | Optional                                      |
|                                        |                                                             | (only available for Custom Logs Buckets       |
|                                        |                                                             | and Amazon Security Hub)                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`subscriber_sts_endpoint`         | Any valid VPC endpoint URL for STS                          | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`subscriber_service_endpoint`     | Any valid endpoint URL for S3                               | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+

.. _subscriber_sqs_name:

sqs_name
^^^^^^^^

Name of the SQS from where notifications are pulled.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any valid SQS name          |
+--------------------+-----------------------------+

.. _subscriber_external_id:

external_id
^^^^^^^^^^^

External ID to use when assuming the role.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Valid external ID  |
+--------------------+--------------------+

.. _subscriber_iam_role_arn:

iam_role_arn
^^^^^^^^^^^^

A valid role ARN with permission to access the service.

+--------------------+----------------+
| **Default value**  | N/A            |
+--------------------+----------------+
| **Allowed values** | Valid role ARN |
+--------------------+----------------+

.. _subscriber_iam_role_duration:

iam_role_duration
^^^^^^^^^^^^^^^^^

A valid number of seconds that defines the duration of the session assumed when using the provided :ref:`iam_role_arn<subscriber_iam_role_arn>`.

+--------------------+------------------------------------------+
| **Default value**  | N/A                                      |
+--------------------+------------------------------------------+
| **Allowed values** | Number of seconds between 900 and 3600   |
+--------------------+------------------------------------------+

.. _subscriber_aws_profile:

aws_profile
^^^^^^^^^^^

A valid profile name from a Shared Credential File or AWS Config File with the permission to access the service.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Valid profile name |
+--------------------+--------------------+

.. _subscriber_discard_regex:

discard_regex
^^^^^^^^^^^^^

A regular expression to determine if an event must be discarded. JSON and CSV logs require a mandatory ``field`` attribute. If the field is present in the event log, the regex is applied to it. For example, ``userIdentity.principalID`` for the following AWS CloudTrail log example:

.. code-block:: json
   :emphasize-lines: 5

   {
      "eventVersion": "1.09",
      "userIdentity": {
          "type": "IAMUser",
          "principalId": "EXAMPLE6E4XEGITWATV6R",
          "arn": "arn:aws:iam::123456789012:user/Mary_Major",
          "accountId": "123456789012",
          "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
          "userName": "Mary_Major",
          "sessionContext": {
              "attributes": {
                  "creationDate": "2023-07-19T21:11:57Z",
                  "mfaAuthenticated": "false"
              }
          }
      },
      "eventTime": "2023-07-19T21:33:41Z",
      "eventSource": "cloudtrail.amazonaws.com",
      "eventName": "StartLogging",
      "awsRegion": "us-east-1",
      "sourceIPAddress": "192.0.2.0",
      "userAgent": "aws-cli/2.13.5 Python/3.11.4 Linux/4.14.255-314-253.539.amzn2.x86_64 exec-env/CloudShell exe/x86_64.amzn.2 prompt/off command/cloudtrail.start-logging",
      "requestParameters": {
          "name": "myTrail"
      },
      "responseElements": null,
      "requestID": "9d478fc1-4f10-490f-a26b-EXAMPLE0e932",
      "eventID": "eae87c48-d421-4626-94f5-EXAMPLEac994",
      "readOnly": false,
      "eventType": "AwsApiCall",
      "managementEvent": true,
      "recipientAccountId": "123456789012",
      "eventCategory": "Management",
      "tlsDetails": {
          "tlsVersion": "TLSv1.2",
          "cipherSuite": "ECDHE-RSA-AES128-GCM-SHA256",
          "clientProvidedHostHeader": "cloudtrail.us-east-1.amazonaws.com"
      },
      "sessionCredentialFromConsole": "true"
   }


.. note::
    This log is the raw event log fetched from the AWS Bucket.


+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any regex or sregex expression         |
+--------------------+----------------------------------------+

Attributes:

+-----------+----------------------------------------------------------------+
| **field** | The event field where to apply the regex                       |
|           +------------------+---------------------------------------------+
|           | Default value    | N/A                                         |
|           +------------------+---------------------------------------------+
|           | Allowed values   | A str containing the full field name path   |
+-----------+------------------+---------------------------------------------+

Usage example for ``Cloudtrail`` fetched events:

.. code-block:: console

    <discard_regex field="userIdentity.principalID">EXAMPLE6E4XEGITWATV6R</discard_regex>

Usage example only for plain text logs:

.. code-block:: console

    <discard_regex>.*Log:.*</discard_regex>

.. _subscriber_sts_endpoint:

sts_endpoint
^^^^^^^^^^^^

The AWS Security Token Service VPC endpoint URL to be used when an IAM role is provided as the authentication method. Check the :doc:`Considerations for configuration </cloud-security/amazon/services/prerequisites/considerations>` page to learn more about VPC endpoints.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any valid VPC endpoint URL for STS     |
+--------------------+----------------------------------------+

.. _subscriber_service_endpoint:

service_endpoint
^^^^^^^^^^^^^^^^

The AWS S3 endpoint URL to be used to download the data from the bucket. Check the :doc:`Considerations for configuration </cloud-security/amazon/services/prerequisites/considerations>` page to learn more about VPC and FIPS endpoints.

+--------------------+------------------------------------------------+
| **Default value**  | N/A                                            |
+--------------------+------------------------------------------------+
| **Allowed values** | Any valid endpoint URL for S3                  |
+--------------------+------------------------------------------------+


Example of configuration
~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

  <wodle name="aws-s3">
      <disabled>no</disabled>
      <interval>10m</interval>
      <run_on_start>no</run_on_start>
      <skip_on_error>no</skip_on_error>
      <bucket type="cloudtrail">
          <name>s3-dev-bucket</name>
          <aws_profile>default</aws_profile>
          <only_logs_after>2018-JUN-01</only_logs_after>
          <regions>us-east-1,us-west-1,eu-central-1</regions>
          <path>/dev1/</path>
          <aws_account_id>123456789012</aws_account_id>
          <aws_account_alias>dev1-account</aws_account_alias>
          <discard_regex field="userIdentity.userName">john.doe</discard_regex>
          <remove_from_bucket>yes<remove_from_bucket>
      </bucket>
      <bucket type="cloudtrail">
          <name>s3-dev-bucket</name>
          <aws_profile>default</aws_profile>
          <only_logs_after>2018-JUN-01</only_logs_after>
          <regions>us-east-1,us-west-1,eu-central-1</regions>
          <path>/dev2/</path>
          <aws_account_id>112233445566</aws_account_id>
          <aws_account_alias>dev2-account</aws_account_alias>
          <discard_regex field="userIdentity.userName">john.smith</discard_regex>
          <service_endpoint>https://bucket.xxxxxx.s3.us-east-2.vpce.amazonaws.com</service_endpoint>
      </bucket>
      <bucket type="custom">
          <name>s3-stage-bucket</name>
          <aws_profile>stage-creds</aws_profile>
          <aws_account_id>111222333444</aws_account_id>
          <aws_account_alias>stage-account</aws_account_alias>
          <discard_regex field="detail.check-item-detail.Status">Green</discard_regex>
      </bucket>
      <bucket type="custom">
          <name>s3-prod-bucket</name>
          <iam_role_arn>arn:aws:iam::010203040506:role/ROLE_SVC_Log-Parser</iam_role_arn>
          <iam_role_duration>1300</iam_role_duration>
          <aws_account_id>11112222333</aws_account_id>
          <aws_account_alias>prod-account</aws_account_alias>
          <discard_regex field="detail.status">OK</discard_regex>
          <remove_from_bucket>yes<remove_from_bucket>
      </bucket>
      <service type="cloudwatchlogs">
          <aws_profile>default</aws_profile>
          <aws_log_groups>log_group1,log_group2</aws_log_groups>
          <only_logs_after>2018-JUN-01</only_logs_after>
          <regions>us-east-1,us-west-1,eu-central-1</regions>
          <discard_regex>.*Log Hostname1:.*</discard_regex>
      </service>
      <subscriber type="security_lake">
        <sqs_name>sqs-security-lake-main-queue</sqs_name>
        <external_id>wazuh-external-id-value</external_id>
        <iam_role_arn>arn:aws:iam::010203040506:role/ASL-Role</iam_role_arn>
      </subscriber>
      <subscriber type="buckets">
        <sqs_name>sqs-custom-logs-queue</sqs_name>
        <aws_profile>dev</aws_profile>
      </subscriber>
      <subscriber type="security_hub">
        <sqs_name>sqs-custom-logs-queue</sqs_name>
        <aws_profile>dev</aws_profile>
      </subscriber>
  </wodle>
