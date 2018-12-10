.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon:

Using Wazuh to Monitor AWS
==========================

.. meta::
  :description: Discover how Wazuh can help you to monitor your Amazon AWS infrastructure.
  :author: Wazuh, Inc.

.. versionadded:: 3.2.0

Wazuh provides the ability to read AWS logs directly from AWS S3 buckets. Amazon support is now a built-in Wazuh capability, giving you the ability to search, analyze, and alert on AWS CloudTrail, GuardDuty, Macie, IAM, and VPC Flow log data.

This section provides instructions to configure the integration with S3 with both CloudTrail and Custom S3 buckets. In addition, it explains different use cases, as examples of how the rules can be customized for alerting on specific events.

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       installation
       use-cases/index
       troubleshooting
