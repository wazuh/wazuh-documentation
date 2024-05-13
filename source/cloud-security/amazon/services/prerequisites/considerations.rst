.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about some considerations that must be taken into account when configuring the Wazuh module for AWS.

.. _amazon_considerations:

Considerations for configuration
================================

First execution
---------------

If no :ref:`only_logs_after <only_logs_aws_buckets>` value is provided, the module will only fetch the logs of the date of the execution.

Filtering
---------

If the S3 bucket contains a long history of logs and its directory structure is organized by dates, it's possible to filter which logs will be read by Wazuh. There are multiple configuration options to do so:

* ``only_logs_after``: Allows filtering logs produced after a given date. The date format must be YYYY-MMM-DD, for example, 2018-AUG-21 would filter logs produced after the 21st of August 2018 (that day included).
* ``aws_account_id``: **This option will only work on CloudTrail, VPC, and Config buckets**. If you have logs from multiple accounts, you can filter which ones will be read by Wazuh. You can specify multiple ids separating them by commas.
* ``regions``: **This option will only work on CloudTrail, VPC and Config buckets, and Inspector service**. If you have logs from multiple regions, you can filter which ones will be read by Wazuh. You can specify multiple regions separating them by commas. It is mandatory to specify the region when configuring an S3 bucket from an AWS GovCloud region (available GovCloud regions are ``us-gov-east-1`` and ``us-gov-west-1``).
* ``path``: If you have your logs stored in a given path, it can be specified using this option. For example, to read logs stored in directory ``vpclogs/`` the path ``vpclogs`` need to be specified. It can also be specified with ``/`` or ``\``.
* ``aws_organization_id``: **This option will only work on CloudTrail buckets.** If you have configured an organization, you need to specify the name of the ``AWS`` organization by using this parameter.

Older logs
----------

The ``aws-s3`` Wazuh module only looks for new logs in buckets based on the key of the last processed log object, which includes the datetime stamp. If older logs are loaded into the S3 bucket or the :ref:`only_logs_after <only_logs_aws_buckets>` option date is set to a datetime earlier than previous executions of the module, the older log files will be ignored and not ingested into Wazuh.

On the other hand, the ``CloudWatch Logs`` module can process logs older than the first one processed. To do so, specify an older ``only_logs_after`` value, and the module will process all logs between the value set for ``only_logs_after`` and the first log executed without generating duplicate alerts.


Reparse
-------

.. warning::

   Using the ``reparse`` option will fetch and process all the logs from the starting date until the present. This process may generate duplicate alerts.

To fetch and process older logs, you need to manually run the module using the ``--reparse`` option.

The ``only_logs_after`` value sets the time for the starting point. If you don't provide an ``only_logs_after`` value, the module uses the date of the first file processed.

Find an example of running the module on a manager using the ``--reparse`` option. ``/var/ossec`` is the Wazuh installation path.

.. code-block:: console

  # /var/ossec/wodles/aws/aws-s3 -b 'wazuh-example-bucket' --reparse --only_logs_after '2021-Jun-10' --debug 2

The ``--debug 2`` parameter gets a verbose output. This is useful to show the script is working, specially when handling a large amount of data.

Connection configuration for retries
------------------------------------

Some calls to AWS services might fail when made in highly congested environments. The `Boto-3 <https://boto3.amazonaws.com/v1/documentation/api/latest/index.html>`__ client raises `ClientError` exceptions describing the errors. This kind of exception often needs repeating the call, without further handling. To help retry these calls, Boto3 provides `Retries <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/retries.html>`__. This feature allows retrying client calls to AWS services when you experience errors like ``ThrottlingException``.

Users can customize two retry configurations.

-  ``retry_mode``: legacy, standard, and adaptive.

   -  **Legacy** mode is the default retry mode. It sets the older version 1 for the retry handler. This includes:

      -  Retry attempts for a limited number of errors/exceptions.
      -  A default value of 5 for maximum call attempts.

   -  **Standard** mode sets the updated version 2 for the retry handler. It includes:

      -  Extended functionality over that found in the legacy mode where retry attempts apply to an expanded list of errors/exceptions.
      -  A default value of 3 for maximum call attempts.

   -  **Adaptive** mode is an experimental retry mode. It includes all the features of the standard mode. This mode offers flexibility in client-side retries. Retries adapt to the error/exception state response from an AWS service.

-  ``max_attempts``: The maximum number of attempts including the initial call. This configuration can override the default value set by the retry mode.

You can specify the retry configuration in the ``~/.aws/config`` `configuration file <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#using-a-configuration-file>`__. The profile section must include the ``max_attempts``, ``retry_mode``, and ``region`` settings.

It's important to match this profile section with the :ref:`authentication method profile <aws_profile>`. If the authentication method lacks a profile, then the ``[default]`` profile section must include the configurations. If the configuration file is missing, the `aws-s3` Wazuh module defines the following values by default:

-  ``retry_mode=standard``
-  ``max_attempts=10``

The following example of a ``~/.aws/config`` file sets the retry parameters for the *dev* profile:

.. code-block:: ini

   [profile dev]
   region=us-east-1
   max_attempts=5
   retry_mode=standard

.. note::
   When using a profile different to ``default``, ensure the profile name includes the prefix word ``profile``.

Additional configuration
~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh supports additional configuration options found in the ``.aws/config file``. The supported keys are the primary keys stated in the `boto3 configuration <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html>`_. Supported keys are:

- region_name
- signature_version
- s3
- proxies
- proxies_config
- retries

The following example of a ``~/.aws/config`` file sets the supported configuration for the *dev* profile:

.. code-block:: ini

   [profile dev]
   region = us-east-1
   output = json
   max_attempts = 5
   retry_mode = standard

   s3.max_concurrent_requests = 10
   s3.max_queue_size = 1000
   s3.multipart_threshold = 64MB
   s3.multipart_chunksize = 16MB
   s3.max_bandwidth = 50MB/s
   s3.use_accelerate_endpoint = true
   s3.addressing_style = virtual

   proxy.host = proxy.example.com
   proxy.port = 8080
   proxy.username = your-proxy-username
   proxy.password = your-proxy-password

   proxy.ca_bundle = /path/to/ca_bundle.pem
   proxy.client_cert = /path/to/client_cert.pem
   proxy.use_forwarding_for_https = true

   signature_version = s3v4

To configure multiple profiles for the integration, declare each profile section in ``~/.aws/config`` with ``[profile <PROFILE-NAME>]``. If you don't declare a profile section in this configuration file, Wazuh uses the ``default`` profile.

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

    <!-- CloudTrail, 'default' profile, without 'path' tag -->
    <bucket type="cloudtrail">
      <name>wazuh-cloudtrail</name>
      <aws_profile>default</aws_profile>
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

.. _using_non-default_aws_endpoints:

Using non-default AWS endpoints
-------------------------------

VPC endpoints
~~~~~~~~~~~~~

VPC endpoints can help reduce the traffic cost in your VPC by allowing connections from the VPC to the AWS services that support it, without having to rely on their public IP to connect to the AWS Services. As the ``aws-s3`` Wazuh module connects to the AWS S3 service to access the data from the S3 buckets, regardless of the service they come from, VPC endpoints can be used, as long as Wazuh runs in the VPC. The same applies to the AWS services the ``aws-s3`` Wazuh module supports, such as CloudWatchLogs, provided that they are compatible with VPC endpoints. The list of AWS services supporting VPC endpoints can be checked `here <https://docs.aws.amazon.com/vpc/latest/privatelink/integrated-services-vpce-list.html>`_.

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
      <aws_profile>default</aws_profile>
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
