.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about additional considerations of the prerequisites in this section of the documentation.

Considerations for the Wazuh module for AWS configuration
=========================================================

First execution
---------------

The Wazuh module for AWS only fetches the AWS services logs from the date the module is first executed. If there are older logs that need to be fetched during the first execution of the module, you need to use the :ref:`only_logs_after <only_logs_aws_buckets>` option.

.. note::

   If you need to fetch older logs after the first execution of the Wazuh module for AWS, see the :ref:`Reparse <aws_reparse>` section.

Filtering
---------

If the S3 bucket holds a long history of logs organized by date, you can filter which logs Wazuh reads. There are multiple configuration options to do so:

-  ``only_logs_after``: Allows filtering logs produced after a given date. The date format must be ``YYYY-MMM-DD``. For example, ``2018-AUG-21`` filters logs generated on or after August 21, 2018.
-  ``aws_account_id``: This option only works on CloudTrail, VPC, and Config buckets. If you have logs from multiple accounts, you can filter which ones Wazuh reads. You can specify multiple IDs separating them by commas.
-  ``regions``: Works only with CloudTrail, VPC, Config buckets, and Inspector service. Use it to filter which regions Wazuh reads when you have logs from multiple regions. Separate multiple regions with commas.
-  ``path``: If your logs are stored in a given path in an S3 bucket, this option can be specified. For example, to read logs stored in the directory ``vpclogs/``, it is necessary to specify the path ``vpclogs`` in the Wazuh module for AWS configuration. It can also be specified with ``/`` or ``\``.
-  ``aws_organization_id``: This option only works on CloudTrail buckets. If you have configured an organization, you need to specify the name of the AWS organization by using this parameter.

In the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent, the configuration is similar to this.

.. code-block:: xml
   :emphasize-lines: 8

   <wodle name="aws-s3">
     <disabled>no</disabled>
     <interval>10m</interval>
     <run_on_start>yes</run_on_start>
     <skip_on_error>yes</skip_on_error>
     <!-- CloudTrail, two regions, path, account_id, organization_id and logs after January 2018 -->
     <bucket type="cloudtrail">
       <name><WAZUH_AWS_BUCKET></name>
       <aws_profile>default</aws_profile>
       <aws_account_id>123456789012</aws_account_id>
       <regions>us-east-1,us-east-2</regions>
       <path>wazuh-logs</path>
       <only_logs_after>2018-JAN-01</only_logs_after>
       <aws_organization_id>AWS-ORG-1</aws_organization_id>
     </bucket>
   </wodle>

Older logs
----------

The Wazuh module for AWS looks for new logs in buckets based on the key of the last processed log object. This key includes the datetime stamp. After the module has processed logs, it cannot retrieve logs that are older than the processed ones, even if you specify the :ref:`only_logs_after <only_logs_aws_buckets>` option. The logs older than the first one processed are ignored and not ingested into Wazuh. The same applies to all supported services except CloudWatch Logs.

On the other hand, when monitoring the CloudWatch Logs service, the Wazuh module for AWS can process logs older than the first one processed. To do so, specify an older ``only_logs_after`` value. The Wazuh module for AWS then processes all logs between the ``only_logs_after`` date and the first log processed, without generating duplicate events.

With this configuration in ``/var/ossec/etc/ossec.conf``, the first run of the Wazuh module for AWS processes CloudTrail logs from January 1, 2018 to the present day. If the ``only_logs_after`` value is specified after the first execution, it doesn't process the older logs.

.. code-block:: xml
   :emphasize-lines: 8,11

   <wodle name="aws-s3">
     <disabled>no</disabled>
     <interval>10m</interval>
     <run_on_start>yes</run_on_start>
     <skip_on_error>yes</skip_on_error>
     <!-- CloudTrail, two regions, and logs after January 2018 -->
     <bucket type="cloudtrail">
       <name><WAZUH_AWS_BUCKET></name>
       <aws_profile>default</aws_profile>
       <regions>us-east-1,us-east-2</regions>
       <only_logs_after>2018-JAN-01</only_logs_after>
     </bucket>
   </wodle>

.. note::

   If you need to process older logs after the Wazuh module for AWS has been executed for the first time, see the :ref:`Reparse <aws_reparse>` section.

With this configuration in ``/var/ossec/etc/ossec.conf``, the Wazuh module for AWS processes CloudWatch Logs from January 1, 2018 to the present day whenever it runs.

.. code-block:: xml
   :emphasize-lines: 10

   <wodle name="aws-s3">
     <disabled>no</disabled>
     <interval>10m</interval>
     <run_on_start>yes</run_on_start>
     <skip_on_error>yes</skip_on_error>
     <!-- CloudWatch, two regions, and logs after January 2018 -->
       <service type="cloudwatchlogs">
           <aws_profile>default</aws_profile>
           <aws_log_groups>log_group1,log_group2</aws_log_groups>
           <only_logs_after>2018-JAN-01</only_logs_after>
           <regions>us-east-1,us-west-1,eu-central-1</regions>
       </service>
   </wodle>

.. _aws_reparse:

Reparse
-------

The reparse option fetches and processes every log from the starting point until the present. The ``only_logs_after`` value sets the time for the starting point. If you don't provide an ``only_logs_after`` value, the Wazuh module for AWS uses the date of the first log processed as the starting point. This process might generate duplicate findings.

To collect and process older logs loaded into the S3 bucket, you need to run the Wazuh module for AWS manually using the ``--reparse`` option. The following example runs the Wazuh module for AWS manually using the ``--reparse`` option on a Wazuh agent.

.. code-block:: console

   # /var/ossec/wodles/aws/aws-s3 -b '<WAZUH_AWS_BUCKET>' --reparse --only_logs_after '2021-Jun-10' --debug 2

The ``--debug 2`` parameter produces verbose output. The verbose output shows that the script is working, especially when it handles a large amount of data.

.. _connection_configuration_for_retries:

Connection configuration for retries
------------------------------------

Some calls to AWS services might fail when made in highly congested environments. The :ref:`Boto3 <boto-3>` client raises ``ClientError`` exceptions describing the errors. This kind of exception often needs repeating the call, without further handling. To help retry these calls, Boto3 provides `retries <https://docs.aws.amazon.com/boto3/latest/guide/retries.html>`__. This feature allows retrying client calls to AWS services when you experience errors like ``ThrottlingException``.

You can customize two retry configurations.

-  ``retry_mode``: legacy, standard, and adaptive.

   -  **Legacy** mode is the Boto3 default retry mode. It sets the older version 1 for the retry handler. This includes:

      -  Retry attempts for a limited number of errors/exceptions.
      -  A default value of 5 for maximum call attempts.

   -  **Standard** mode sets the updated version 2 for the retry handler. It includes:

      -  Extended functionality over that found in the legacy mode where retry attempts apply to an expanded list of errors/exceptions.
      -  A default value of 3 for maximum call attempts.

   -  **Adaptive** mode is an experimental retry mode. It includes all the features of the standard mode. This mode offers flexibility in client-side retries. Retries adapt to the error/exception state response from an AWS service.

-  ``max_attempts``: The maximum number of attempts including the initial call. This configuration can override the default value set by the retry mode.

You can specify the retry configuration in the ``/root/.aws/config`` `configuration file <https://docs.aws.amazon.com/boto3/latest/guide/configuration.html#using-a-configuration-file>`__. The profile section can include the ``max_attempts``, ``retry_mode``, and ``region`` settings.

It is important to use the same profile as the one you chose as your :ref:`authentication method profile <aws_profile>`. If the authentication method lacks a profile, then the ``[default]`` profile must include the configurations. If the configuration file is missing, or the profile sets neither ``retry_mode`` nor ``max_attempts``, the Wazuh module for AWS defines the following values by default:

-  ``retry_mode=standard``
-  ``max_attempts=10``

The following example of a ``/root/.aws/config`` file sets retry parameters for the ``dev`` profile:

.. code-block:: ini

   [profile dev]
   region=us-east-1
   max_attempts=5
   retry_mode=standard

Additional configuration
^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh supports additional configuration options found in the ``/root/.aws/config`` file. The Wazuh module for AWS maps these keys to the options of the `Boto3 configuration <https://docs.aws.amazon.com/boto3/latest/guide/configuration.html>`__. Supported keys are:

-  ``region_name``
-  ``signature_version``
-  ``s3``
-  ``proxies``
-  ``proxies_config``
-  ``retries``

The following example of a ``/root/.aws/config`` file sets the supported configuration for the dev profile:

.. code-block:: ini

   [profile dev]
   region = us-east-1
   output = json
   max_attempts = 5
   retry_mode = standard

   dev.s3.max_concurrent_requests = 10
   dev.s3.max_queue_size = 1000
   dev.s3.multipart_threshold = 64MB
   dev.s3.multipart_chunksize = 16MB
   dev.s3.max_bandwidth = 50MB/s
   dev.s3.use_accelerate_endpoint = true
   dev.s3.addressing_style = virtual

   dev.proxy.host = proxy.example.com
   dev.proxy.port = 8080
   dev.proxy.username = your-proxy-username
   dev.proxy.password = your-proxy-password

   dev.proxy.ca_bundle = /path/to/ca_bundle.pem
   dev.proxy.client_cert = /path/to/client_cert.pem
   dev.proxy.use_forwarding_for_https = true

   signature_version = s3v4

.. note::

   All ``s3`` and ``proxy`` configuration sections must start with ``[profile <PROFILE_NAME>]``.

To configure multiple profiles for the Wazuh module for AWS, declare each profile section in ``/root/.aws/config`` with ``[profile <PROFILE_NAME>]``. If you don't declare a profile section in this configuration file, Wazuh uses the ``default`` profile.

Configuring multiple services
-----------------------------

The following example configures several AWS services in the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent. Put every service in one ``<wodle name="aws-s3">`` block:

.. code-block:: xml
   :emphasize-lines: 16,23,30,37,43

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

     <!-- GuardDuty, 'prod' profile -->
     <bucket type="guardduty">
       <name><WAZUH_AWS_BUCKET></name>
       <path>guardduty</path>
       <aws_profile>prod</aws_profile>
     </bucket>

     <!-- Config, 'default' profile -->
     <bucket type="config">
       <name><WAZUH_AWS_BUCKET></name>
       <path>config</path>
       <aws_profile>default</aws_profile>
     </bucket>

     <!-- Macie, 'dev' profile -->
     <bucket type="custom">
       <name><WAZUH_AWS_BUCKET></name>
       <path>macie</path>
       <aws_profile>dev</aws_profile>
     </bucket>

     <!-- CloudTrail, 'default' profile, without 'path' tag -->
     <bucket type="cloudtrail">
       <name><WAZUH_AWS_BUCKET_2></name>
       <aws_profile>default</aws_profile>
     </bucket>

     <!-- CloudTrail, 'dev' profile, and 'us-east-1' region -->
     <bucket type="cloudtrail">
       <name><WAZUH_AWS_BUCKET></name>
       <path>dev-cloudtrail</path>
       <regions>us-east-1</regions>
       <aws_profile>dev</aws_profile>
     </bucket>

   </wodle>

Where:

-  ``<disabled>`` enables or disables the Wazuh module for AWS.
-  ``<interval>`` is the time interval between module execution.
-  ``<run_on_start>`` runs the Wazuh module for AWS immediately after the Wazuh service starts.
-  ``<skip_on_error>`` skips a log with an error and continues processing other logs.
-  ``<service type>`` indicates the service configured. The available types are ``cloudwatchlogs`` and ``inspector``.
-  ``<aws_profile>`` is the name of a valid profile, from the AWS credentials or config file, with permission to access the service.
-  ``<regions>`` limits log parsing to a comma-separated list of regions.
-  ``<only_logs_after>`` parses only logs from that date onwards.
-  ``<bucket type>`` indicates the service configured.
-  ``<name>`` is the name of the S3 bucket that stores the logs.
-  ``<path>`` is the path or prefix for the bucket.

.. note::

   Check the :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` reference manual to learn more about each setting.

.. _using_non-default_aws_endpoints:

Using VPC and FIPS endpoints
----------------------------

In AWS, a VPC (Virtual Private Cloud) is a virtual network dedicated to your AWS account. It provides an isolated environment where you can launch AWS resources such as EC2 instances, RDS databases, and more.

FIPS (Federal Information Processing Standards) endpoints in AWS refer to endpoints that enforce FIPS 140-2 compliance for cryptographic modules. When you enable a FIPS endpoint, AWS ensures that any cryptographic operations performed by the endpoint use FIPS 140-2 validated cryptographic libraries.

Learn how to integrate the Wazuh module for AWS with VPC and FIPS endpoints.

VPC endpoints
^^^^^^^^^^^^^

VPC endpoints reduce VPC traffic costs by enabling direct connections to supported AWS services, eliminating the need for public IPs.

The Wazuh module for AWS can pull logs from an AWS S3 bucket regardless of the service the logs originate from. Wazuh can use VPC endpoints for this purpose if it is running within a Virtual Private Cloud (VPC). The same applies to the other AWS services the Wazuh module for AWS supports, such as CloudWatch Logs, provided that they are compatible with VPC endpoints. To check which AWS services support VPC endpoints, see `AWS services that integrate with AWS PrivateLink <https://docs.aws.amazon.com/vpc/latest/privatelink/aws-services-privatelink-support.html>`__.

Configure the ``service_endpoint`` and ``sts_endpoint`` tags in the ``/var/ossec/etc/ossec.conf`` file. These tags set the VPC endpoint URL for obtaining the data and, when you specify an IAM role, for logging in to STS.

The following is an example of a valid configuration:

.. code-block:: xml
   :emphasize-lines: 8,10,14,16,17,18,25

   <wodle name="aws-s3">
     <disabled>no</disabled>
     <interval>10m</interval>
     <run_on_start>yes</run_on_start>
     <skip_on_error>yes</skip_on_error>

     <bucket type="cloudtrail">
       <name><WAZUH_AWS_BUCKET></name>
       <aws_profile>default</aws_profile>
       <service_endpoint>https://bucket.<S3_VPC_ENDPOINT_ID>.s3.us-east-2.vpce.amazonaws.com</service_endpoint>
     </bucket>

     <bucket type="cloudtrail">
       <name><WAZUH_AWS_BUCKET_2></name>
       <aws_profile>default</aws_profile>
       <iam_role_arn>arn:aws:iam::<ACCOUNT_ID>:role/wazuh-role</iam_role_arn>
       <sts_endpoint><STS_VPC_ENDPOINT_ID>.sts.us-east-2.vpce.amazonaws.com</sts_endpoint>
       <service_endpoint>https://bucket.<S3_VPC_ENDPOINT_ID>.s3.us-east-2.vpce.amazonaws.com</service_endpoint>
     </bucket>

     <service type="cloudwatchlogs">
       <aws_profile>default</aws_profile>
       <regions>us-east-2</regions>
       <aws_log_groups>log_group_name</aws_log_groups>
       <service_endpoint>https://<LOGS_VPC_ENDPOINT_ID>.logs.us-east-2.vpce.amazonaws.com</service_endpoint>
     </service>

   </wodle>

FIPS endpoints
^^^^^^^^^^^^^^

Wazuh supports the use of AWS FIPS endpoints to comply with the `Federal Information Processing Standard (FIPS) Publication 140-2 <https://csrc.nist.gov/pubs/fips/140-2/upd2/final>`__. Depending on the service and region of choice, a different endpoint must be selected from the `AWS FIPS endpoints list <https://aws.amazon.com/compliance/fips/>`__. Specify the selected endpoint in the ``/var/ossec/etc/ossec.conf`` file using the ``service_endpoint`` tag.

The following is an example of a valid configuration.

.. code-block:: xml
   :emphasize-lines: 11

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
