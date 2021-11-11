.. _poc_aws_monitoring:

Amazon AWS infrastructure monitoring
====================================

This POC shows how the Wazuh module for AWS (aws-s3) enables log data gathering from different AWS sources. 

To learn more about monitoring AWS resources, see the `Using Wazuh to monitor AWS <amazon>`_ section of the documentation.

Configuration
-------------

Configure your environment as follows to test the POC.

#. Enable ``aws-s3`` wodle in the ``/var/ossec/etc/ossec.conf`` configuration file at the Wazuh manager endpoint.

   .. code-block:: XML

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <remove_from_bucket>no</remove_from_bucket>
        <interval>30m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>no</skip_on_error>
        <bucket type="cloudtrail">
            <name>wazuh-cloudtrail</name>
            <access_key>${replace_by_your_AwsAccessKey}</access_key>
            <secret_key>${replace_by_your_AwsSecretKey}</secret_key>
            <only_logs_after>2021-AUG-01</only_logs_after>
        </bucket>
        <bucket type="guardduty">
            <name>wazuh-aws-wodle</name>
            <path>guardduty</path>
            <access_key>${replace_by_your_AwsAccessKey}</access_key>
            <secret_key>${replace_by_your_AwsSecretKey}</secret_key>
            <only_logs_after>2021-AUG-01</only_logs_after>
        </bucket>
        <bucket type="custom">
            <name>wazuh-aws-wodle</name>
            <path>macie</path>
            <access_key>${replace_by_your_AwsAccessKey}</access_key>
            <secret_key>${replace_by_your_AwsSecretKey}</secret_key>
            <only_logs_after>2021-AUG-01</only_logs_after>
        </bucket>
        <bucket type="vpcflow">
            <name>wazuh-aws-wodle</name>
            <path>vpc</path>
            <access_key>${replace_by_your_AwsAccessKey}</access_key>
            <secret_key>${replace_by_your_AwsSecretKey}</secret_key>
            <only_logs_after>2021-AUG-01</only_logs_after>
        </bucket>
        <service type="inspector">
            <access_key>${replace_by_your_AwsAccessKey}</access_key>
            <secret_key>${replace_by_your_AwsSecretKey}</secret_key>
        </service>
      </wodle>

#. Restart Wazuh manager to apply changes.
  
    .. code-block:: console

        # systemctl restart wazuh-manager

Steps to generate the alerts
----------------------------

- No action is required. Alerts are automatically generated from AWS logs when using out-of-the-box rules; they appear as soon as they are fetched from the AWS S3 bucket.

Query the alerts
----------------

Related alerts can be found with:

- ``rule.groups: "amazon"``

Affected endpoints
------------------

- Wazuh manager host
