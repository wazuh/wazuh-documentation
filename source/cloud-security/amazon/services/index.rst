.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh module for AWS enables monitoring of various AWS services by collecting and analyzing their logs with the Wazuh ruleset.

Monitoring AWS-based services
=============================

The Wazuh module for AWS enables monitoring of various AWS services by collecting logs of these services and analyzing the logs with the Wazuh ruleset. Wazuh raises findings on EC2 instance configuration, unauthorized behavior of users and systems, data stored on S3, and more. These findings give detailed information about activities within your AWS infrastructure.

Each section below explains how to set up a supported AWS service and configure Wazuh to collect its logs. It also includes steps to resolve common issues that you might encounter.

The Wazuh module for AWS requires dependencies and credentials to access the AWS services. Take a look at the :doc:`prerequisites </cloud-security/amazon/services/prerequisites/index>` section before proceeding.

.. toctree::
   :maxdepth: 1

   prerequisites/index
   supported-services/index
   troubleshooting
