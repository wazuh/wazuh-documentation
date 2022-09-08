.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out the prerequisites to monitor AWS-based services with Wazuh. See how to configure an S3 Bucket and AWS credentials, and how to install dependencies.
  
.. _amazon_prerequisites:

Prerequisites
=============

.. meta::
  :description: Learn how to install and configure the Wazuh module to monitor Amazon instances and services.

This module requires dependencies in order to work, and also the right credentials in order to access the services. Take a look at the elements of this section before proceeding.

.. note::
  Bucket encryption and all types of compression are supported, except ``Snappy``.

.. toctree::
  :maxdepth: 1

  S3-bucket
  credentials
  dependencies
  considerations
