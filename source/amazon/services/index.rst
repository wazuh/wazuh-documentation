.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_services:

Monitoring AWS services
=======================

.. meta::
  :description: Learn how to install and configure the Wazuh module to monitor Amazon instances and services.

The Wazuh module for AWS (``aws-s3``) provides capabilities to monitor some AWS services. Each of the sections below contain detailed instructions to configure and set up all of the supported services, and also the required Wazuh configuration to collect the logs.

This module requires some dependencies in order to work, and also the right credentials in order to access to the services. Take a look at the :ref:`amazon_configuration` section before proceeding.

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
