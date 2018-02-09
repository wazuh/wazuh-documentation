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


+-----------------------+-----------------------------+
| Options               | Allowed values              |
+=======================+=============================+
| `disabled`_           | yes, no                     |
+-----------------------+-----------------------------+
| `bucket`_             | Any valid bucket name       |
+-----------------------+-----------------------------+
| `interval`_           | A positive number (seconds) |
+-----------------------+-----------------------------+
| `access_key`_         | Alphanumerical key          |
+-----------------------+-----------------------------+
| `secret_key`_         | Alphanumerical key          |
+-----------------------+-----------------------------+
| `remove_from_bucket`_ | yes, no                     |
+-----------------------+-----------------------------+
| `run_on_start`_       | yes, no                     |
+-----------------------+-----------------------------+


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

The access key ID for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

secret_key
^^^^^^^^^^

The secret key created for the IAM user with the permission to read logs from the bucket.

+--------------------+--------------------------+
| **Default value**  | N/A                      |
+--------------------+--------------------------+
| **Allowed values** | Any alphanumerical key.  |
+--------------------+--------------------------+

remove_from_bucket
^^^^^^^^^^^^^^^^^^

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


Example of configuration
------------------------

.. code-block:: xml

    <wodle name="aws-cloudtrail">
      <disabled>no</disabled>
      <bucket>wazuh-cloudtrail</bucket>
      <interval>10m</interval>
      <access_key>your_access_key</access_key>
      <secret_key>your_secret_key</secret_key>
      <remove_from_bucket>no</remove_from_bucket>
      <run_on_start>no</run_on_start>
    </wodle>
