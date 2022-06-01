.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn about some considerations that must be taken into account when configuring the Wazuh module for AWS.
  
.. _amazon_considerations:

Considerations for configuration
================================

First execution
---------------

If no :ref:`only_logs_after <only_logs_aws_buckets>` value was provided, the module will only fetch the logs of the date of the execution.

Filtering
---------

If the S3 bucket contains a long history of logs and its directory structure is organized by dates, it's possible to filter which logs will be read by Wazuh. There are multiple configuration options to do so:

* ``only_logs_after``: Allows filtering logs produced after a given date. The date format must be YYYY-MMM-DD, for example, 2018-AUG-21 would filter logs produced after the 21th of August 2018 (that day included).
* ``aws_account_id``: **This option will only work on CloudTrail, VPC and Config buckets**. If you have logs from multiple accounts, you can filter which ones will be read by Wazuh. You can specify multiple ids separating them by commas.
* ``regions``: **This option will only work on CloudTrail, VPC and Config buckets and Inspector service**. If you have logs from multiple regions, you can filter which ones will be read by Wazuh. You can specify multiple regions separating them by commas. It is mandatory to specify the region when configuring a S3 bucket from an AWS GovCloud region (available GovCloud regions are ``us-gov-east-1`` and ``us-gov-west-1``).
* ``path``: If you have your logs stored in a given path, it can be specified using this option. For example, to read logs stored in directory ``vpclogs/`` the path ``vpclogs`` need to be specified. It can also be specified with ``/`` or ``\``.
* ``aws_organization_id``: **This option will only work on CloudTrail buckets.** If you have configured an organization, you need to specify the name of the ``AWS`` organization by using this parameter.

Older logs
----------

The ``aws-s3`` Wazuh module only looks for new logs in buckets based upon the key of the last processed log object, which includes the datetime stamp. If older logs are loaded into the S3 bucket or the :ref:`only_logs_after <only_logs_aws_buckets>` option date is set to a datetime earlier than previous executions of the module, the older log files will be ignored and not ingested into Wazuh.

On the other hand, the ``CloudWatch Logs`` module can process logs older than the first one processed. To do so, specify an older ``only_logs_after`` value, and the module will process all logs between the value set for ``only_logs_after`` and the first log executed without generating duplicate alerts.


Reparse
~~~~~~~

.. note::
  Option not available for CloudWatch Logs.

.. warning::
  Using the ``reparse`` option will fetch and process every log from the starting date until the present. This process may generate duplicate alerts.

To process older logs, it's necessary to manually execute the module using the ``--reparse`` or ``-o`` option. Executing the module with this option will use the ``only_logs_after`` value provided to fetch and process every log from that date until the present. If no ``only_logs_after`` value was provided, it will use the date of the first file processed.

Below there is an example of a manual execution of the module using the ``--reparse`` option on a manager, being ``/var/ossec`` the Wazuh installation path:

.. code-block:: console

  # cd /var/ossec/wodles/aws
  # ./aws-s3 -b 'wazuh-example-bucket' --reparse --only_logs_after '2021-Jun-10' --debug 2

The ``--debug 2`` parameter was used to get a verbose output since by default the script won't print anything on the terminal, and it could seem like it's not working when it could be handling a great amount of data instead.

Configuring multiple services
-----------------------------

Below there is an example of different services configuration:

.. code-block:: xml

  <wodle name="aws-s3">
    <disabled>no</disabled>
    <interval>10m</interval>
    <run_on_start>yes</run_on_start>
    <skip_on_error>yes</skip_on_error>

    <!-- Inspector, two regions, and logs after January 2018 -->
    <service type="inspector">
      <aws_profile>default</aws_profile>
      <regions>us-east-1,us-east-2</regions>
      <only_logs_after>2018-JAN-01</only_logs_after>
    </service>

    <!-- GuardDuty, 'production' profile -->
    <bucket type="guardduty">
      <name>wazuh-aws-wodle</name>
      <path>guardduty</path>
      <aws_profile>production</aws_profile>
    </bucket>

    <!-- Config, 'default' profile -->
    <bucket type="config">
      <name>wazuh-aws-wodle</name>
      <path>config</path>
      <aws_profile>default</aws_profile>
    </bucket>

    <!-- KMS, 'dev' profile -->
    <bucket type="custom">
      <name>wazuh-aws-wodle</name>
      <path>kms_compress_encrypted</path>
      <aws_profile>dev</aws_profile>
    </bucket>

    <!-- CloudTrail, authentication with hardcoded keys (not recommended), without 'path' tag -->
    <bucket type="cloudtrail">
      <name>wazuh-cloudtrail</name>
      <access_key>XXXXXXXXXX</access_key>
      <secret_key>XXXXXXXXXX</secret_key>
    </bucket>

    <!-- CloudTrail, 'gov1' profile, and 'us-gov-east-1' GovCloud region -->
    <bucket type="cloudtrail">
      <name>wazuh-aws-wodle</name>
      <path>cloudtrail-govcloud</path>
      <regions>us-gov-east-1</regions>
      <aws_profile>gov1</aws_profile>
    </bucket>

    <!-- CloudTrail, 'gov2' profile, and 'us-gov-west-1' GovCloud region -->
    <bucket type="cloudtrail">
      <name>wazuh-aws-wodle</name>
      <path>cloudtrail-govcloud</path>
      <regions>us-gov-west-1</regions>
      <aws_profile>gov2</aws_profile>
    </bucket>

  </wodle>


Using non-default AWS endpoints
-------------------------------

VPC endpoints
~~~~~~~~~~~~~

VPC endpoints can help reduce the traffic bill in your VPC by allowing connections from the VPC to the AWS services that support it, without having to rely on their public IP to connect to the AWS Services. As the ``aws-s3`` Wazuh module connects to the AWS S3 service to access the data from the S3 buckets, regardless of the service they come from, VPC endpoints can be used, as long as Wazuh runs in the VPC. The same applies to the AWS services the ``aws-s3`` Wazuh module supports, such as CloudWatchLogs, provided that they are compatible with VPC endpoints. The list of AWS services supporting VPC endpoints can be checked `here <https://docs.aws.amazon.com/vpc/latest/privatelink/integrated-services-vpce-list.html>`_.

The `service_endpoint` and `sts_endpoint` tags can be used to specify the VPC endpoint URL for obtaining the data and for logging into STS when an IAM role was specified, respectively. Here is an example of a valid configuration:

.. code-block:: xml

  <wodle name="aws-s3">
    <disabled>no</disabled>
    <interval>10m</interval>
    <run_on_start>yes</run_on_start>
    <skip_on_error>yes</skip_on_error>

    <bucket type="cloudtrail">
      <name>wazuh-cloudtrail</name>
      <aws_profile>default</aws_profile>
      <service_endpoint>https://bucket.xxxxxx.s3.us-east-2.vpce.amazonaws.com</service_endpoint>
    </bucket>

    <bucket type="cloudtrail">
      <name>wazuh-cloudtrail-2</name>
      <access_key>xxxxxx</access_key>
      <secret_key>xxxxxx</secret_key>
      <iam_role_arn>arn:aws:iam::xxxxxxxxxxx:role/wazuh-role</iam_role_arn>
      <sts_endpoint>xxxxxx.sts.us-east-2.vpce.amazonaws.com</sts_endpoint>
      <service_endpoint>https://bucket.xxxxxx.s3.us-east-2.vpce.amazonaws.com</service_endpoint>
    </bucket>

    <service type="cloudwatchlogs">
      <aws_profile>default</aws_profile>
      <regions>us-east-2</regions>
      <aws_log_groups>log_group_name</aws_log_groups>
      <service_endpoint>https://xxxxxx.logs.us-east-2.vpce.amazonaws.com</service_endpoint>
    </service>

  </wodle>

FIPS endpoints
~~~~~~~~~~~~~~

Wazuh supports the use of AWS FIPS endpoints to comply with the `Federal Information Processing Standard (FIPS) Publication 140-2 <https://csrc.nist.gov/publications/detail/fips/140/2/final>`_. Depending on the service and region of choice, a different endpoint must be selected from the `AWS FIPS endpoints list <https://aws.amazon.com/compliance/fips/>`_. Specify the selected endpoint in the ``ossec.conf`` file using the ``service_endpoint`` tag.

The following is an example of a valid configuration.

.. code-block:: xml

  <wodle name="aws-s3">
    <disabled>no</disabled>
    <interval>10m</interval>
    <run_on_start>yes</run_on_start>
    <skip_on_error>yes</skip_on_error>

    <service type="cloudwatchlogs">
      <aws_profile>default</aws_profile>
      <regions>us-east-2</regions>
      <aws_log_groups>log_group_name</aws_log_groups>
      <service_endpoint>logs-fips.us-east-2.amazonaws.com</service_endpoint>
    </service>

  </wodle>
