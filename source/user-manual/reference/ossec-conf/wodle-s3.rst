.. Copyright (C) 2018 Wazuh, Inc.

.. _wodle_s3:

wodle name="aws-s3"
===================

.. versionadded:: 3.2.0

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="aws-s3">
		</wodle>

Configuration options of the AWS-S3 wodle.


Options
-------

- `disabled`_
- `interval`_
- `access_key`_
- `secret_key`_
- `remove_from_bucket`_
- `run_on_start`_
- `skip_on_error`_
- `bucket`_


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
| `bucket type`_        | N/A                         | Mandatory          |
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

.. deprecated::3.6.0

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

.. deprecated::3.6.0

The access key ID for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

secret_key
^^^^^^^^^^

.. deprecated::3.6.0

The secret key created for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

remove_from_bucket
^^^^^^^^^^^^^^^^^^

.. deprecated::3.6.0

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

bucket type
^^^^^^^^^^^

Defines a bucket to process. Must have its attribute ``type`` defined. (Supports multiple instances of this option).

Bucket options
~~~~~~~~~~~~~~

- `bucket\\name`_
- `bucket\\aws_account_id`_
- `bucket\\aws_account_alias`_
- `bucket\\access_key`_
- `bucket\\secret_key`_
- `bucket\\aws_profile`_
- `bucket\\iam_role_arn`_
- `bucket\\path`_
- `bucket\\only_logs_after`_
- `bucket\\regions`_

+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| Options                          | Allowed values                                                             | Mandatory/Optional                            |
+==================================+============================================================================+===============================================+
| `type`_                          | cloudtrail, guardduty, inspector, VPC, kms, macie, trusted-advisor, config | Mandatory                                     |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\name`_                  | Any valid bucket name                                                      | Mandatory                                     |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\aws_account_id`_        | Comma list of AWS Accounts                                                 | Optional (only works with CloudTrail buckets) |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\aws_account_alias`_     | Any string                                                                 | Optional                                      |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\access_key`_            | Alphanumerical key                                                         | Optional                                      |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\secret_key`_            | Alphanumerical key                                                         | Optional                                      |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\aws_profile`_           | Any string                                                                 | Optional                                      |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\iam_role_arn`_          | IAM role ARN                                                               | Optional                                      |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\path`_                  | Prefix for S3 bucket key                                                   | Optional                                      |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\only_logs_after`_       | Date (YYYY-MMM-DDD, for example 2018-AUG-21)                               | Optional                                      |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+
| `bucket\\regions`_               | Comma list of AWS regions                                                  | Optional (only works with CloudTrail buckets) |
+----------------------------------+----------------------------------------------------------------------------+-----------------------------------------------+

type
^^^^

Specifies type of bucket. Is an attribute of the ``bucket`` tag.

+--------------------+---------------------------------------------------------------------------+
| **Default value**  | N/A                                                                       |
+--------------------+---------------------------------------------------------------------------+
| **Allowed values** | cloudtrail, guardduty, inspector, VPC, kms, macie, trusted-advisor, config |
+--------------------+---------------------------------------------------------------------------+


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

bucket\\iam_role_arn
^^^^^^^^^^^^^^^^^^^^

A valid role arn with permission to read logs from the bucket.

+--------------------+----------------+
| **Default value**  | N/A            |
+--------------------+----------------+
| **Allowed values** | Valid role arn |
+--------------------+----------------+

bucket\\path
^^^^^^^^^^^^

If defined, the path or prefix for the bucket.

+--------------------+---------------+
| **Default value**  | N/A           |
+--------------------+---------------+
| **Allowed values** | Valid path    |
+--------------------+---------------+

bucket\\only_logs_after
^^^^^^^^^^^^^^^^^^^^^^^

A valid date, in YYYY-MMM-DD format, that only logs from after that date will be parsed.  All logs from before that date will be skipped.

+--------------------+-------------+
| **Default value**  | 1970-JAN-01 |
+--------------------+-------------+
| **Allowed values** | Valid date  |
+--------------------+-------------+

bucket\\regions
^^^^^^^^^^^^^^^^^^^

A comma-delimited list of regions to limit parsing of logs. Only works with CloudTrail buckets.

+--------------------+----------------------------------------+
| **Default value**  | All regions                            |
+--------------------+----------------------------------------+
| **Allowed values** | Comma-delimited list of valid regions  |
+--------------------+----------------------------------------+


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
      </bucket>
      <bucket type="custom">
          <name>s3-stage-bucket</name>
          <aws_profile>stage-creds</aws_profile>
          <aws_account_id>111222333444</aws_account_id>
          <aws_account_alias>stage-account</aws_account_alias>
      </bucket>
      <bucket type="custom">
          <name>s3-prod-bucket</name>
          <iam_role_arn>arn:aws:iam::010203040506:role/ROLE_SVC_Log-Parser</iam_role_arn>
          <aws_account_id>11112222333</aws_account_id>
          <aws_account_alias>prod-account</aws_account_alias>
      </bucket>
  </wodle>
