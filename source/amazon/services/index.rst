.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_services:

Monitoring AWS services
=======================

.. meta::
  :description: Learn how to install and configure the Wazuh module to monitor Amazon instances and services.

Prior to enabling the Wazuh rules for Amazon Web Services, follow the steps below to configure AWS to generate log messages, and store them as JSON data files in an Amazon S3 bucket. A detailed description of each of the steps can be found bellow.

Depending on the AWS service to be monitored, the necessary steps to follow are different.

.. note::
  Bucket encryption and all types of compression are supported, except ``Snappy``.

.. topic:: Contents

  .. toctree::
    :maxdepth: 1

    cloudtrail
    config
    vpc
    guardduty
    macie
    kms
    inspector
    trusted-advisor
