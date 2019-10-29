.. Copyright (C) 2019 Wazuh, Inc.

.. _amazon_considerations:

Considerations for configuration
================================

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

The ``aws-s3`` Wazuh module only looks for new logs based upon the key for last processed log object, which includes the datetime stamp. If older logs are loaded into the S3 bucket or the ``only_logs_after`` option date is set to a datetime earlier than previous executions of the module, the older log files will be ignored and not ingested into Wazuh.


Configuring multiple services
-----------------------------

Below there is an example of different services configuration:

.. code-block:: xml

  <wodle name="aws-s3">
    <disabled>no</disabled>
    <interval>10m</interval>
    <run_on_start>yes</run_on_start>
    <skip_on_error>yes</skip_on_error>

    <service type="inspector">
      <aws_profile>default</aws_profile>
      <regions>us-east-1,us-east-2</regions>
      <only_logs_after>2018-JAN-01</only_logs_after>
    </service>

    <bucket type="guardduty">
      <name>wazuh-aws-wodle</name>
      <path>guardduty</path>
      <aws_profile>production</aws_profile>
    </bucket>

    <bucket type="config">
      <name>wazuh-aws-wodle</name>
      <path>config</path>
      <aws_profile>default</aws_profile>
    </bucket>

    <bucket type="custom">
      <name>wazuh-aws-wodle</name>
      <path>kms_compress_encrypted</path>
      <aws_profile>dev</aws_profile>
    </bucket>

    <bucket type="cloudtrail">
      <name>wazuh-cloudtrail</name>
      <access_key>XXXXXXXXXX</access_key>
      <secret_key>XXXXXXXXXX</secret_key>
    </bucket>

    <bucket type="cloudtrail">
      <name>wazuh-aws-wodle</name>
      <path>cloudtrail-govcloud</path>
      <regions>us-gov-east-1</regions>
      <aws_profile>default</aws_profile>
    </bucket>

    <bucket type="cloudtrail">
      <name>wazuh-aws-wodle</name>
      <path>cloudtrail-govcloud</path>
      <regions>us-gov-west-1</regions>
      <aws_profile>default</aws_profile>
    </bucket>

  </wodle>
