.. Copyright (C) 2019 Wazuh, Inc.

.. meta::
  :description: Discover how Wazuh can help you to monitor your Amazon Web Services (AWS) infrastructure.

Instances and services
======================

.. versionadded:: 3.2.0

Wazuh helps to increase the security of an AWS infrastructure in two different, complementary ways:

- **Installing the Wazuh agent on the instances** to monitor the activity inside them. It collects different types of system and application data and forwards it to the Wazuh manager. Different agent tasks or processes are used to monitor the system in different ways (e.g., monitoring file integrity, reading system log messages and scanning system configurations).
- **Monitoring AWS services** to collect and analyze log data about the infrastructure. Thanks to the module for AWS, Wazuh can trigger alerts based on the events obtained from these services, which provide rich and complete information about the infrastructure, such as the instances configuration, unauthorized behavior, data stored on S3, and more.

In this section you can learn about this two methods, what they do and how to configure and set them up.

.. _amazon_instances:

Monitoring AWS instances
------------------------

Installing the Wazuh agent on the AWS EC2 instances provides information and monitorization about what's going on inside of them.

The agent runs as a service on the instance, and collects different types of system and application data that forwards to the Wazuh manager through an encrypted and authenticated channel.

Thanks to the Wazuh agent, there are some capabilities available to monitor the instances:

- :ref:`Log data collection <manual_log_analysis>`
- :ref:`File integrity monitoring <manual_file_integrity>`
- :ref:`Anomaly and malware detection <manual_anomaly_detection>`
- :ref:`Security policy monitoring <manual_policy_monitoring>`
- :ref:`System inventory <syscollector>`
- :ref:`Vulnerability detection <vulnerability-detection>`

To learn more about the different Wazuh capabilities, check out :ref:`this section <user_manual>`.

.. note::
  To install the Wazuh agent, follow the instructions available on the :ref:`agent installation guide <installation_agents>`.

.. _amazon_services:

Monitoring AWS services
-----------------------

The Wazuh module for AWS (``aws-s3``) provides capabilities to monitor some AWS services. Each of the sections below contain detailed instructions to configure and set up all of the supported services, and also the required Wazuh configuration to collect the logs.

This module requires some dependencies in order to work, and also the right credentials in order to access to the services. Take a look at the :ref:`amazon_configuration` section before proceeding.

.. note::
  Bucket encryption and all types of compression are supported, except ``Snappy``.

List of supported AWS services:

- :ref:`s3_bucket`
- :ref:`amazon_cloudtrail`
- :ref:`amazon_config`
- :ref:`amazon_vpc`
- :ref:`amazon_guardduty`
- :ref:`amazon_macie`
- :ref:`amazon_kms`
- :ref:`amazon_inspector`
- :ref:`amazon_trusted_advisor`
