.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon:

Monitoring AWS
==========================

.. meta::
  :description: Discover how Wazuh can help you to monitor your Amazon Web Services (AWS) infrastructure.

.. versionadded:: 3.2.0

Wazuh helps to increase the security of an AWS infrastructure in two different, complementary ways:

- **Installing the Wazuh agent on the instances** to monitor the activity inside them. It collects different types of system and application data and forwards it to the Wazuh manager. Different agent tasks or processes are used to monitor the system in different ways (e.g., monitoring file integrity, reading system log messages and scanning system configurations).
- **Monitoring AWS services** to collect and analyze log data about the infrastructure. Thanks to the module for AWS, Wazuh can trigger alerts based on the events obtained from these services, which provide rich and complete information about the infrastructure, such as the instances configuration, unauthorized behavior, data stored on S3, and more.

In this section you can learn about this two methods, what they do and how to configure and set them up.

.. topic:: Contents

  .. toctree::
    :maxdepth: 2

    instances
    services/index
    configuration/index
    troubleshooting
