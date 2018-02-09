.. _amazon:

AWS CloudTrail
==========================================

.. versionadded:: 3.2.0

Wazuh provides the ability to read your AWS CloudTrail logs directly from your AWS S3 bucket. Amazon CloudTrail support is built-in Wazuh, giving you the ability to search, analyze, and alert on AWS CloudTrail log data.

This section provides instructions to configure the integration. It also explains different use cases as examples of how the rules can be customized for alerting on specific events from IAM, EC2 and VPC.

The diagram below shows how a log message about an AWS event flows from AWS to a Wazuh agent. Once the agent reads the message, it sends it to the Wazuh manager which analyses it with decoders and rules. When a rule matches, an alert is triggered if the rule severity is high enough.

.. thumbnail:: ../images/aws/aws-diagram.png
    :align: center
    :width: 100%

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       installation
       use-cases/index
