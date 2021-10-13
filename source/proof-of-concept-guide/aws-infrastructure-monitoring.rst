.. _poc_aws_monitoring:

Amazon AWS infrastructure monitoring
====================================

Wazuh module for AWS (aws-s3) enables log data gathering from different AWS sources. You can find a detailed guide on how to Monitor AWS resources in Wazuh `AWS Monitoring guide <https://https://documentation.wazuh.com/current/amazon/>`_.

Configuration
-------------

- Enable ``aws-s3`` wodle in ``/var/ossec/etc/ossec.conf`` in the Wazuh manager configuration file:

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

- Restart Wazuh manager to apply changes:
  
      .. code-block:: console

        service wazuh-manager restart

Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Alerts are automatically generated from AWS logs (when using out-of-the-box rules). They will appear as soon as they are fetched from the AWS S3 bucket.

Alerts
^^^^^^
Related alerts can be found with:

- ``rule.groups: "amazon"``

Affected endpoint
^^^^^^^^^^^^^^^^^

- Wazuh manager