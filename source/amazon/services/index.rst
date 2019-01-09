.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_services:

Monitoring AWS services
=======================

.. meta::
  :description: Learn how to install and configure the Wazuh module to monitor Amazon instances and services.

Prior to enabling the Wazuh integration for any of the following AWS services, follow the steps below to configure AWS to generate log messages, and store them as JSON data files in an Amazon S3 bucket. Each of the supported services contain detailed instructions to achieve this, and also the required Wazuh configuration to collect the logs.

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
