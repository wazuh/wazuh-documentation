.. Copyright (C) 2019 Wazuh, Inc.

.. _amazon_troubleshooting:

Troubleshooting
===============

.. meta::
  :description: Frequently asked questions about the Wazuh module for Amazon.

The below information is intended to assist in troubleshooting issues.


Testing the integration
-----------------------

After configuring the module successfully users can expect to see the following log messages in their agent log file: ``/var/ossec/logs/ossec.log``

1. Module starting:

.. code-block:: console

    2018/01/12 18:47:09 wazuh-modulesd:aws-cloudtrail: INFO: Module AWS-CloudTrail started


2. Scheduled scan:

.. code-block:: console

    2018/01/12 18:49:10 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs started
    2018/01/12 18:49:11 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs finished.


Troubleshooting
---------------

1. Errors in ossec.log

When an error occurs when trying to collect and parse logs for a CloudTrail, the ossec.log will output an error such as below:

The number is the AWS Account ID provided for the CloudTrail, and the name in the parenthesis is the AWS Account Alias (if provided).

.. code-block:: console

    2018/06/28 14:31:09 wazuh-modulesd:aws-cloudtrail: WARNING: CloudTrail: 012345678901(Prod)  -  Returned exit code 3.
    2018/06/28 14:31:09 wazuh-modulesd:aws-cloudtrail: WARNING: CloudTrail: 012345678901(Prod)  -  Invalid credentials to access S3 Bucket

The exit codes are as follows:


+-------+------------------------------------------------------+
| Code  | Description                                          |
+-------+------------------------------------------------------+
| 1     | Unknown error                                        |
+-------+------------------------------------------------------+
| 2     | Error parsing configuration (bucket name, keys, etc) |
+-------+------------------------------------------------------+
| 3     | Invalid credentials to access S3 bucket              |
+-------+------------------------------------------------------+
| 4     | boto3 module missing                                 |
+-------+------------------------------------------------------+
| 5     | Unexpected error accessing SQLite DB                 |
+-------+------------------------------------------------------+
| 6     | Unable to create SQLite DB                           |
+-------+------------------------------------------------------+
| 7     | Unexpected error querying/working with objects in S3 |
+-------+------------------------------------------------------+
| 8     | Failed to decompress file                            |
+-------+------------------------------------------------------+
| 9     | Failed to parse file                                 |
+-------+------------------------------------------------------+
| 10    | Failed to execute DB cleanup                         |
+-------+------------------------------------------------------+
| 11    | Unable to connect to Wazuh                           |
+-------+------------------------------------------------------+
| 12    | SIGINT                                               |
+-------+------------------------------------------------------+
| 13    | Error sending message to Wazuh                       |
+-------+------------------------------------------------------+



2. Debugging configuration:

If users are unable to determine the issues from the ossec.log, users can run the modules in debug mode.  With Wazuh running, stop the moduled

.. code-block:: console

    # pkill wazuh-modulesd

Start wazuh-modulesd in the foreground in debug mode

.. code-block:: console

    # /var/ossec/bin/wazuh-modulesd -fd

+--------+-----------------------------------------------------------+
| Debug  | Description                                               |
+--------+-----------------------------------------------------------+
| -fd    | Basic debug                                               |
+--------+-----------------------------------------------------------+
| -fdd   | Verbose debug                                             |
+--------+-----------------------------------------------------------+
| -fddd  | Extremely verbose debug (Warning: generates logs of msgs) |
+--------+-----------------------------------------------------------+

This will print debug data to the console and log.  The debug will also output the command that the wodle is using to execute the Python script for each CloudTrail.  If a particular CloudTrail is causing problems, this command can be manually executed, increasing the debug level from 1 (basic) to 3 (extremely verbose)

.. code-block:: console

    # 2018/06/28 18:11:02 wazuh-modulesd:aws-cloudtrail: DEBUG: Launching CloudTrail Command: /var/ossec/wodles/aws/aws.py --bucket s3-prod-bucket --iam_role_arn arn:aws:iam::001122334455:role/ROLE_Log-Parser --aws_account_id 012345678901 --aws_account_alias prod --only_logs_after 2018-JUN-01 --debug 2 --skip_on_error


3. Time interval is shorter than the time taken to pull log data:

In this case a simple warning will be displayed. There is no impact in the event data fetching process and the module will keep running.

.. code-block:: console

    2018/01/12 19:10:37 wazuh-modulesd:aws-cloudtrail: WARNING: Interval overtaken.

4. Wrong AWS service path:

If users get any trouble related to "paths", check if the AWS files path is correct:

  **AWS Cloudtrail**

    <bucket_name>/<prefix>/AWSLogs/<account_id>/CloudTrail/<region>/<year>/<month>/<day>

  **AWS Config**

    <bucket_name>/<prefix>/AWSLogs/<account_id>/Config/<region>/<year>/<month>/<day>/ConfigHistory
    <bucket_name>/<prefix>/AWSLogs/<account_id>/Config/<region>/<year>/<month>/<day>/ConfigSnapshot

  **AWS Guardduty**

    <bucket_name>/<prefix>/<year>/<month>/<day>/<hh>

  **AWS Custom bucket**

    <bucket_name>/<prefix>/<year>/<month>/<day>

  **AWS VPC**

    <bucket_name>/<prefix>/AWSLogs/<account_id>/vpcflowlogs/<region>/<year>/<month>/<day>

  **Use case**

    AmazonS3/config/AWSLogs/1308927/Config/EU-West/2019/01/12/file.log

    AmazonFirstBucket/store/2019/01/9/logs.log
