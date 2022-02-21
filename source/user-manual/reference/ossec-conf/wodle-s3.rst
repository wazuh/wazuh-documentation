.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
    :description: Learn more about the local configuration of Wazuh. In this section of the documentation you can check out more about the wodle name “aws-s3”. 

.. _wodle_s3:

wodle name="aws-s3"
===================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="aws-s3">
		</wodle>

Configuration options of the AWS-S3 wodle.


Options
-------

Main options
^^^^^^^^^^^^

- `disabled`_
- `interval`_
- `run_on_start`_
- `skip_on_error`_
- `bucket type`_
- `service type`_


+-----------------------+-----------------------------+--------------------+
| Main options          | Allowed values              | Mandatory/Optional |
+=======================+=============================+====================+
| `disabled`_           | yes, no                     | Mandatory          |
+-----------------------+-----------------------------+--------------------+
| `skip_on_error`_      | yes, no                     | Optional           |
+-----------------------+-----------------------------+--------------------+
| `bucket type`_        | N/A                         | Mandatory          |
+-----------------------+-----------------------------+--------------------+

Scheduling options
^^^^^^^^^^^^^^^^^^

- `run_on_start`_
- `interval`_
- `day`_
- `wday`_
- `time`_

disabled
^^^^^^^^

Disables the AWS-S3 wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

skip_on_error
^^^^^^^^^^^^^

When unable to process and parse a log, skip it and continue processing. If set to no, the module will abort the execution once it encounters an error.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

bucket type
^^^^^^^^^^^

Defines a bucket to process. It must have its ``type`` attribute defined. It supports multiple instances of this option.

Bucket options
~~~~~~~~~~~~~~

- `bucket\\name`_
- `bucket\\aws_account_id`_
- `bucket\\aws_account_alias`_
- `bucket\\access_key`_
- `bucket\\secret_key`_
- `bucket\\aws_profile`_
- `bucket\\iam_role_arn`_
- `bucket\\iam_role_duration`_
- `bucket\\path`_
- `bucket\\path_suffix`_
- `bucket\\only_logs_after`_
- `bucket\\regions`_
- `bucket\\aws_organization_id`_
- `bucket\\discard_regex`_
- `bucket\\sts_endpoint`_
- `bucket\\service_endpoint`_


+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| Options                          | Allowed values                                              | Mandatory/Optional                            |
+==================================+=============================================================+===============================================+
| `type`_                          | cloudtrail, guardduty, vpcflow, config, custom              | Mandatory                                     |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\name`_                  | Any valid bucket name                                       | Mandatory                                     |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\aws_account_id`_        | Comma list of AWS Accounts                                  | Optional (only works with CloudTrail buckets) |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\aws_account_alias`_     | Any string                                                  | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\access_key`_            | Alphanumerical key                                          | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\secret_key`_            | Alphanumerical key                                          | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\aws_profile`_           | Any string                                                  | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\iam_role_arn`_          | IAM role ARN                                                | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\iam_role_duration`_     | Number of seconds between 900 and 3600                      | Optional (if set, it requires an iam_role_arn |
|                                  |                                                             | to be provided)                               |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\path`_                  | Prefix for S3 bucket key                                    | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\path_suffix`_           | Suffix for S3 bucket key                                    | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\only_logs_after`_       | Date (YYYY-MMM-DDD, for example 2018-AUG-21)                | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\regions`_               | Comma list of AWS regions                                   | Optional (only works with CloudTrail buckets) |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\aws_organization_id`_   | Name of AWS organization                                    | Optional (only works with CloudTrail buckets) |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\discard_regex`_         | A regex value to determine if an event should be discarded. | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\sts_endpoint`_          | The AWS Security Token Service VPC endpoint URL.            | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| `bucket\\service_endpoint`_      | The AWS S3 endpoint URL.                                    | Optional                                      |
+----------------------------------+-------------------------------------------------------------+-----------------------------------------------+

type
^^^^

Specifies type of bucket. It is an attribute of the ``bucket`` tag.

+--------------------+------------------------------------------------+
| **Default value**  | N/A                                            |
+--------------------+------------------------------------------------+
| **Allowed values** | cloudtrail, guardduty, vpcflow, config, custom |
+--------------------+------------------------------------------------+

.. note::
    Different configurations as ``macie`` has ``custom`` type.

bucket\\name
^^^^^^^^^^^^

Name of the S3 bucket from where logs are read.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any valid bucket name       |
+--------------------+-----------------------------+

bucket\\aws_account_id
^^^^^^^^^^^^^^^^^^^^^^

The AWS Account ID for the bucket logs. Only works with CloudTrail buckets.

+--------------------+-------------------------------------------+
| **Default value**  | All accounts.                             |
+--------------------+-------------------------------------------+
| **Allowed values** | Comma list of 12 digit AWS Account ID     |
+--------------------+-------------------------------------------+


bucket\\aws_account_alias
^^^^^^^^^^^^^^^^^^^^^^^^^

A user-friendly name for the AWS account.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any string                  |
+--------------------+-----------------------------+

bucket\\access_key
^^^^^^^^^^^^^^^^^^

The access key ID for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

bucket\\secret_key
^^^^^^^^^^^^^^^^^^

The secret key created for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

bucket\\aws_profile
^^^^^^^^^^^^^^^^^^^

A valid profile name from a Shared Credential File or AWS Config File with the permission to read logs from the bucket.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Valid profile name |
+--------------------+--------------------+

.. _bucket_iam_role_arn:

bucket\\iam_role_arn
^^^^^^^^^^^^^^^^^^^^

A valid role arn with permission to read logs from the bucket.

+--------------------+----------------+
| **Default value**  | N/A            |
+--------------------+----------------+
| **Allowed values** | Valid role arn |
+--------------------+----------------+

bucket\\iam_role_duration
^^^^^^^^^^^^^^^^^^^^^^^^^

A valid number of seconds that defines the duration of the session assumed when using the provided :ref:`iam_role_arn<bucket_iam_role_arn>`.

+--------------------+------------------------------------------+
| **Default value**  | N/A                                      |
+--------------------+------------------------------------------+
| **Allowed values** | Number of seconds between 900 and 3600   |
+--------------------+------------------------------------------+

bucket\\path
^^^^^^^^^^^^

If defined, the path or prefix for the bucket.

+--------------------+---------------+
| **Default value**  | N/A           |
+--------------------+---------------+
| **Allowed values** | Valid path    |
+--------------------+---------------+

bucket\\path_suffix
^^^^^^^^^^^^^^^^^^^

If defined, the suffix for the bucket. Only works with buckets which contain the folder named AWSLogs (Cloudtrail, VPC and Macie).

+--------------------+---------------+
| **Default value**  | N/A           |
+--------------------+---------------+
| **Allowed values** | Valid path    |
+--------------------+---------------+

.. _only_logs_aws_buckets:

bucket\\only_logs_after
^^^^^^^^^^^^^^^^^^^^^^^

A valid date, in YYYY-MMM-DD format. Only logs from that date onwards will be parsed.

+--------------------+-----------------------------------+
| **Default value**  | Date of execution at ``00:00:00`` |
+--------------------+-----------------------------------+
| **Allowed values** | Valid date                        |
+--------------------+-----------------------------------+

bucket\\regions
^^^^^^^^^^^^^^^

A comma-delimited list of regions to limit parsing of logs. Only works with CloudTrail buckets.

+--------------------+----------------------------------------+
| **Default value**  | All regions                            |
+--------------------+----------------------------------------+
| **Allowed values** | Comma-delimited list of valid regions  |
+--------------------+----------------------------------------+

bucket\\aws_organization_id
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Name of AWS organization. Only works with CloudTrail buckets.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Valid AWS organization name            |
+--------------------+----------------------------------------+

bucket\\discard_regex
^^^^^^^^^^^^^^^^^^^^^

A regex value to determine if an event should be discarded. It requires a `field` attribute used to specify the field of the event where the regex should be applied.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any regex or sregex expression         |
+--------------------+----------------------------------------+

Attributes:

+-----------+------------------------------------------------------------------------------------------------------+
| **field** | The event's field on which the regex should be applied to determine if the event should be skipped.  |
|           +------------------+-----------------------------------------------------------------------------------+
|           | Default value    | N/A                                                                               |
|           +------------------+-----------------------------------------------------------------------------------+
|           | Allowed values   | A str containing the full field name path                                         |
+-----------+------------------+-----------------------------------------------------------------------------------+

Usage example:

.. code-block:: console

    <discard_regex field="data.configurationItemStatus">REJECT</discard_regex>


bucket\\sts_endpoint
^^^^^^^^^^^^^^^^^^^^

The AWS Security Token Service VPC endpoint URL to be used when an IAM role is provided as the authentication method. Check the :ref:`Considerations for configuration <amazon_considerations>` page to learn more about VPC endpoints.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any valid VPC endpoint URL for STS     |
+--------------------+----------------------------------------+

bucket\\service_endpoint
^^^^^^^^^^^^^^^^^^^^^^^^

The AWS S3 endpoint URL to be used to download the data from the bucket. Check the :ref:`Considerations for configuration <amazon_considerations>` page to learn more about VPC and FIPS endpoints.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any valid endpoint URL for S3          |
+--------------------+----------------------------------------+

run_on_start
^^^^^^^^^^^^

Run evaluation immediately when service is started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

interval
^^^^^^^^

Time the module will wait for before being executed again.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 10m                                                                                                                                                  |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), M (months). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+

day
^^^

Day of the month to run the scan.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.

wday
^^^^

Day of the week to run the scan. This option is **not compatible** with the ``day`` option.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
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

.. note::

	When the ``wday`` option is set, the interval value must be a multiple of weeks. By default, the interval is set to a week.

time
^^^^

Time of the day to run the scan. It has to be represented in the format *hh:mm*.

+--------------------+-----------------------+
| **Default value**  | n/a                   |
+--------------------+-----------------------+
| **Allowed values** | Time of day *[hh:mm]* |
+--------------------+-----------------------+

.. note::

	When only the ``time`` option is set, the interval value must be a multiple of days or weeks. By default, the interval is set to a day.


service type
^^^^^^^^^^^^

Define a service to process. Must have the attribute ``type`` defined. (Supports multiple instances of this option).

Service options
~~~~~~~~~~~~~~~

- `Service\\aws_account_id`_
- `Service\\aws_account_alias`_
- `Service\\aws_log_groups`_
- `Service\\access_key`_
- `Service\\secret_key`_
- `Service\\aws_profile`_
- `Service\\iam_role_arn`_
- `Service\\iam_role_duration`_
- `Service\\only_logs_after`_
- `Service\\regions`_
- `Service\\remove_log_streams`_
- `Service\\sts_endpoint`_
- `Service\\service_endpoint`_


Service\\aws_account_id
^^^^^^^^^^^^^^^^^^^^^^^

The AWS Account ID for accessing the service.

+--------------------+-----------------------------------------------------+
| **Default value**  | All accounts.                                       |
+--------------------+-----------------------------------------------------+
| **Allowed values** | Comma-delimited list of 12 digit AWS Account ID     |
+--------------------+-----------------------------------------------------+


Service\\aws_account_alias
^^^^^^^^^^^^^^^^^^^^^^^^^^

A user-friendly name for the AWS account.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any string                  |
+--------------------+-----------------------------+

Service\\access_key
^^^^^^^^^^^^^^^^^^^

The access key ID for the IAM user with the permission to access the service.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

Service\\aws_log_groups
^^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.0.0

A comma-delimited list of log group names from where the logs should be extracted. Only works for CloudWatch Logs service.

+--------------------+------------------------------------------------+
| **Default value**  | All regions                                    |
+--------------------+------------------------------------------------+
| **Allowed values** | Comma-delimited list of valid log group names  |
+--------------------+------------------------------------------------+

Service\\secret_key
^^^^^^^^^^^^^^^^^^^

The secret key created for the IAM user with the permission to access the service.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

Service\\aws_profile
^^^^^^^^^^^^^^^^^^^^

A valid profile name from a Shared Credential File or AWS Config File with the permission to access the service.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Valid profile name |
+--------------------+--------------------+

.. _service_iam_role_arn:

Service\\iam_role_arn
^^^^^^^^^^^^^^^^^^^^^

A valid role arn with permission to access the service.

+--------------------+----------------+
| **Default value**  | N/A            |
+--------------------+----------------+
| **Allowed values** | Valid role arn |
+--------------------+----------------+

Service\\iam_role_duration
^^^^^^^^^^^^^^^^^^^^^^^^^^

A valid number of seconds that defines the duration of the session assumed when using the provided :ref:`iam_role_arn<service_iam_role_arn>`.

+--------------------+------------------------------------------+
| **Default value**  | N/A                                      |
+--------------------+------------------------------------------+
| **Allowed values** | Number of seconds between 900 and 3600   |
+--------------------+------------------------------------------+

Service\\only_logs_after
^^^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.0.0

A valid date, in YYYY-MMM-DD format. Only logs from that date onwards will be parsed. This option is only available for the CloudWatch Logs service.

+--------------------+-----------------------------------+
| **Default value**  | Date of execution at ``00:00:00`` |
+--------------------+-----------------------------------+
| **Allowed values** | Valid date                        |
+--------------------+-----------------------------------+

Service\\regions
^^^^^^^^^^^^^^^^

.. versionadded:: 4.0.0

A comma-delimited list of regions to limit parsing of logs. Only works for CloudWatch Logs service.

+--------------------+----------------------------------------+
| **Default value**  | All regions                            |
+--------------------+----------------------------------------+
| **Allowed values** | Comma-delimited list of valid regions  |
+--------------------+----------------------------------------+

Service\\remove_log_streams
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.0.0

Define whether or not to remove the log streams from the log groups after they are read by the module. Only works for CloudWatch Logs service.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

Example of configuration
------------------------

.. code-block:: xml

  <wodle name="aws-s3">
      <disabled>no</disabled>
      <remove_from_bucket>no</remove_from_bucket>
      <interval>10m</interval>
      <run_on_start>no</run_on_start>
      <skip_on_error>no</skip_on_error>
      <bucket type="cloudtrail">
          <name>s3-dev-bucket</name>
          <access_key>insert_access_key</access_key>
          <secret_key>insert_secret_key</secret_key>
          <only_logs_after>2018-JUN-01</only_logs_after>
          <regions>us-east-1,us-west-1,eu-central-1</regions>
          <path>/dev1/</path>
          <aws_account_id>123456789012</aws_account_id>
          <aws_account_alias>dev1-account</aws_account_alias>
          <discard_regex field="data.configurationItemStatus">REJECT</discard_regex>
      </bucket>
      <bucket type="cloudtrail">
          <name>s3-dev-bucket</name>
          <access_key>insert_access_key</access_key>
          <secret_key>insert_secret_key</secret_key>
          <only_logs_after>2018-JUN-01</only_logs_after>
          <regions>us-east-1,us-west-1,eu-central-1</regions>
          <path>/dev2/</path>
          <aws_account_id>112233445566</aws_account_id>
          <aws_account_alias>dev2-account</aws_account_alias>
          <discard_regex field="data.configurationItemStatus">REJECT</discard_regex>
          <service_endpoint>https://bucket.xxxxxx.s3.us-east-2.vpce.amazonaws.com</service_endpoint>
      </bucket>
      <bucket type="custom">
          <name>s3-stage-bucket</name>
          <aws_profile>stage-creds</aws_profile>
          <aws_account_id>111222333444</aws_account_id>
          <aws_account_alias>stage-account</aws_account_alias>
          <discard_regex field="data.configurationItemStatus">REJECT</discard_regex>
      </bucket>
      <bucket type="custom">
          <name>s3-prod-bucket</name>
          <iam_role_arn>arn:aws:iam::010203040506:role/ROLE_SVC_Log-Parser</iam_role_arn>
          <iam_role_duration>1300</iam_role_duration>
          <aws_account_id>11112222333</aws_account_id>
          <aws_account_alias>prod-account</aws_account_alias>
          <discard_regex field="data.configurationItemStatus">REJECT</discard_regex>
      </bucket>
      <service type="cloudwatchlogs">
          <access_key>insert_access_key</access_key>
          <secret_key>insert_secret_key</secret_key>
          <aws_log_groups>log_group1,log_group2</aws_log_groups>
          <only_logs_after>2018-JUN-01</only_logs_after>
          <regions>us-east-1,us-west-1,eu-central-1</regions>
          <discard_regex field="data.configurationItemStatus">REJECT</discard_regex>
      </service>
  </wodle>


Service\\sts_endpoint
^^^^^^^^^^^^^^^^^^^^^

The AWS Security Token Service VPC endpoint URL to be used when an IAM role is provided as the authentication method. Check the :ref:`Considerations for configuration <amazon_considerations>` page to learn more about VPC endpoints.

+--------------------+----------------------------------------+
| **Default value**  | N/A                                    |
+--------------------+----------------------------------------+
| **Allowed values** | Any valid VPC endpoint URL for STS     |
+--------------------+----------------------------------------+

Service\\service_endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^

The endpoint URL for the required AWS Service to be used to download the data from it. Check the :ref:`Considerations for configuration <amazon_considerations>` page to learn more about VPC and FIPS endpoints.

+--------------------+------------------------------------------------+
| **Default value**  | N/A                                            |
+--------------------+------------------------------------------------+
| **Allowed values** | Any valid endpoint URL for the AWS Service     |
+--------------------+------------------------------------------------+

