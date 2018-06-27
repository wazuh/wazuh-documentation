.. Copyright (C) 2018 Wazuh, Inc.

.. _wodle_cloudtrail:

wodle name="aws-cloudtrail"
===========================

.. versionadded:: 3.2.0

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="aws-cloudtrail">
		</wodle>

Configuration options of the AWS-CloudTrail wodle.


Options
-------

- `disabled`_
- `bucket`_
- `interval`_
- `access_key`_
- `secret_key`_
- `remove_from_bucket`_
- `run_on_start`_
- `skip_on_error`_
- `cloudtrail`_


+-----------------------+-----------------------------+--------------------+
| Options               | Allowed values              | Mandatory/Optional |
+=======================+=============================+====================+
| `disabled`_           | yes, no                     | Mandatory          |
+-----------------------+-----------------------------+--------------------+
| `bucket`_             | Any valid bucket name       | Deprecated         |
+-----------------------+-----------------------------+--------------------+
| `interval`_           | A positive number (seconds) | Mandatory          |
+-----------------------+-----------------------------+--------------------+
| `run_on_start`_       | yes, no                     | Mandatory          |
+-----------------------+-----------------------------+--------------------+
| `access_key`_         | Alphanumerical key          | Deprecated         |
+-----------------------+-----------------------------+--------------------+
| `secret_key`_         | Alphanumerical key          | Deprecated         |
+-----------------------+-----------------------------+--------------------+
| `remove_from_bucket`_ | yes, no                     | Optional           |
+-----------------------+-----------------------------+--------------------+
| `skip_on_error`_      | yes, no                     | Optional           |
+-----------------------+-----------------------------+--------------------+
| `cloudtrail`_         | N/A                         | Mandatory          |
+-----------------------+-----------------------------+--------------------+

disabled
^^^^^^^^

Disables the CloudTrail wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

bucket
^^^^^^^

.. deprecated::Unknown

Name of the S3 bucket from where logs are read.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any valid bucket name       |
+--------------------+-----------------------------+

interval
^^^^^^^^

Frequency for reading from the S3 bucket.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 10m                                                                                                                                      |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+

access_key
^^^^^^^^^^

.. deprecated::Unknown

The access key ID for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

secret_key
^^^^^^^^^^

.. deprecated::Unknown

The secret key created for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

remove_from_bucket
^^^^^^^^^^^^^^^^^^

.. deprecated::Unknown

Define if you want to remove logs from your S3 bucket after they are read by the wodle.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

run_on_start
^^^^^^^^^^^^^

Run evaluation immediately when service is started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

skip_on_error
^^^^^^^^^^^^^

When unable to process and parse a CloudTrail log, skip the log and continue processing

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

cloudtrail
^^^^^^^^^^^^^

Define an CloudTrail to process.

Options
-------

- `cloudtrail\bucket`_
- `cloudtrail\aws_account_id`_
- `cloudtrail\aws_account_alias`_
- `cloudtrail\access_key`_
- `cloudtrail\secret_key`_
- `cloudtrail\aws_profile`_
- `cloudtrail\iam_role_arn`_
- `cloudtrail\trail_prefix`_
- `cloudtrail\only_logs_after`_
- `cloudtrail\region`_

+----------------------------------+-----------------------------+--------------------+
| Options                          | Allowed values              | Mandatory/Optional |
+==================================+=============================+====================+
| `cloudtrail\bucket`_             | Any valid bucket name       | Mandatory          |
+----------------------------------+-----------------------------+--------------------+
| `cloudtrail\aws_account_id`_     | 12-digit AWS account ID     | Mandatory          |
+----------------------------------+-----------------------------+--------------------+
| `cloudtrail\aws_account_alias`_  | Any string                  | Optional           |
+----------------------------------+-----------------------------+--------------------+
| `cloudtrail\access_key`_         | Alphanumerical key          | Optional           |
+----------------------------------+-----------------------------+--------------------+
| `cloudtrail\secret_key`_         | Alphanumerical key          | Optional           |
+----------------------------------+-----------------------------+--------------------+
| `cloudtrail\aws_profile`_        | yes, no                     | Optional           |
+----------------------------------+-----------------------------+--------------------+
| `cloudtrail\iam_role_arn`_       | IAM role ARN                | Optional           |
+----------------------------------+-----------------------------+--------------------+
| `cloudtrail\trail_prefix`_       | Prefix for S3 bucket key    | Optional           |
+----------------------------------+-----------------------------+--------------------+
| `cloudtrail\only_logs_after`_    | Date                        | Optional           |
+----------------------------------+-----------------------------+--------------------+
| `cloudtrail\region`_             | Comma list of AWS regions   | Optional           |
+----------------------------------+-----------------------------+--------------------+

cloudtrail\bucket
^^^^^^^^^^^^^^^^^

Name of the S3 bucket from where logs are read.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any valid bucket name       |
+--------------------+-----------------------------+

cloudtrail\aws_account_id
^^^^^^^^^^^^^^^^^^^^^^^^^

The AWS Account ID for the CloudTrail logs.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | 12 digit AWS Account ID     |
+--------------------+-----------------------------+


cloudtrail\aws_account_alias
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A user-friendly name for the AWS account.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any string                  |
+--------------------+-----------------------------+

cloudtrail\access_key
^^^^^^^^^^^^^^^^^^^^^

The access key ID for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

cloudtrail\secret_key
^^^^^^^^^^^^^^^^^^^^^

The secret key created for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

cloudtrail\aws_profile
^^^^^^^^^^^^^^^^^^^^^^

A valid profile name from a Shared Credential File or AWS Config File with the permission to read logs from the bucket.
See here for more:  https://boto3.readthedocs.io/en/latest/guide/configuration.html#shared-credentials-file

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Valid profile name |
+--------------------+--------------------+

cloudtrail\iam_role_arn
^^^^^^^^^^^^^^^^^^^^^^^

A valid role arn with permission to read logs from the bucket.

+--------------------+----------------+
| **Default value**  | N/A            |
+--------------------+----------------+
| **Allowed values** | Valid role arn |
+--------------------+----------------+

cloudtrail\trail_prefix
^^^^^^^^^^^^^^^^^^^^^^^

If defined, the prefix for the CloudTrail.

+--------------------+---------------+
| **Default value**  | N/A           |
+--------------------+---------------+
| **Allowed values** | Valid Prefix  |
+--------------------+---------------+

cloudtrail\only_logs_after
^^^^^^^^^^^^^^^^^^^^^^^^^^

A valid date, in YYYY-MMM-DD format, that only logs from after that date will be parsed.  All logs from before that date will be skipped.

+--------------------+-------------+
| **Default value**  | 1970-JAN-01 |
+--------------------+-------------+
| **Allowed values** | Valid date  |
+--------------------+-------------+

cloudtrail\region
^^^^^^^^^^^^^^^^^

A comma-delimited list of regions to limit parsing of logs.

+--------------------+----------------------------------------+
| **Default value**  | All regions                            |
+--------------------+----------------------------------------+
| **Allowed values** | Comma-delimited list of valid regions  |
+--------------------+----------------------------------------+

* Note: The script currently excludes US-GovCloud and China regions.


Example of configuration
------------------------

.. code-block:: xml

  <wodle name="aws-cloudtrail">
      <disabled>no</disabled>
      <remove_from_bucket>no</remove_from_bucket>
      <interval>10m</interval>
      <run_on_start>no</run_on_start>
      <error_not_skip>no<error_not_skip>
      <cloudtrail>
          <bucket>cloudtrail-bucket</bucket>
          <access_key>insert_access_key</access_key>
          <secret_key>insert_secret_key</secret_key>
          <only_logs_after>2018-JUN-01</only_logs_after>
          <region>us-east-1,us-west-1,eu-central-1</region>
          <aws_account_id>123456789012</aws_account_id>
          <aws_account_alias>dev-account</aws_account_alias>
      </cloudtrail>
  </wodle>
