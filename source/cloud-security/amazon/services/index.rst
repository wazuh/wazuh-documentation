.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh module for AWS  enables monitoring of various AWS services by collecting logs of these services and analyzing the logs with the Wazuh ruleset. Learn more in this section of the documentation.

Monitoring AWS based services
=============================

The Wazuh module for AWS  enables monitoring of various AWS services by collecting logs of these services and analyzing the logs with the Wazuh ruleset. This allows Wazuh to trigger alerts based on EC2 instance configuration, unauthorized behavior of users and systems, data stored on S3, and more. Thereby providing detailed information about activities within the AWS infrastructure.

Each section below contains detailed instructions to configure and set up all of the supported AWS services, and also the required Wazuh configuration to collect logs from these services. It also includes steps to resolve common issues that you may encounter.

This module requires several dependencies to work, and also the right credentials to access the AWS services. Take a look at the :doc:`prerequisites </cloud-security/amazon/services/prerequisites/index>` section before proceeding.

.. toctree::
   :maxdepth: 1

   prerequisites/index
   supported-services/index
   troubleshooting
