.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh for AWS module provides capabilities for monitoring AWS-based services. Learn how to install and configure it to monitor Amazon instances and services.  

.. _amazon_supported_services:

Supported services
==================

All the services except ``Inspector Classic`` and ``CloudWatch Logs`` get their data from log files stored in an ``S3`` bucket. These services store their data into log files which are configured inside ``<bucket type='TYPE'> </bucket>`` tags, while ``Inspector Classic`` and ``CloudWatch Logs`` services are configured inside ``<service type='inspector'> </service>`` and ``<service type='cloudwatchlogs'> </service>`` tags, respectively.

.. versionadded:: 4.4.2

The ``<subscriber type='TYPE'> </subscriber>`` tags are added in order to obtain logs from ``Amazon Security Lake`` buckets.

The next table contains the most relevant information about configuring each service in the ``ossec.conf`` file, as well as the path where the logs will be stored in the bucket if the corresponding service uses them as its storage medium:

+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| **Provider** | **Service**                                                                   | **Configuration tag** | **Type**       | **Path to logs**                                                                                                 |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`CloudTrail <cloudtrail>`                                                | bucket                | cloudtrail     | <bucket_name>/<prefix>/AWSLogs/<suffix>/<organization_id>/<account_id>/CloudTrail/<region>/<year>/<month>/<day>  |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`VPC <vpc>`                                                              | bucket                | vpcflow        | <bucket_name>/<prefix>/AWSLogs/<suffix>/<account_id>/vpcflowlogs/<region>/<year>/<month>/<day>                   |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`Config <config>`                                                        | bucket                | config         | <bucket_name>/<pdocix>/AWSLogs/<suffix>/<account_id>/Config/<region>/<year>/<month>/<day>                        |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`ALB <elastic-load-balancing/alb>`                                       | bucket                | alb            | <bucket_name>/<pdocix>/AWSLogs/<account_id>/elasticloadbalancing/<region>/<year>/<month>/<day>                   |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`CLB <elastic-load-balancing/clb>`                                       | bucket                | clb            | <bucket_name>/<pdocix>/AWSLogs/<account_id>/elasticloadbalancing/<region>/<year>/<month>/<day>                   |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`NLB <elastic-load-balancing/nlb>`                                       | bucket                | nlb            | <bucket_name>/<pdocix>/AWSLogs/<account_id>/elasticloadbalancing/<region>/<year>/<month>/<day>                   |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`KMS <kms>`                                                              | bucket                | custom         | <bucket_name>/<pdocix>/<year>/<month>/<day>                                                                      |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`Macie <macie>`                                                          | bucket                | custom         | <bucket_name>/<pdocix>/<year>/<month>/<day>                                                                      |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`Trusted Advisor <trusted-advisor>`                                      | bucket                | custom         | <bucket_name>/<pdocix>/<year>/<month>/<day>                                                                      |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`GuardDuty Native <guardduty>`                                           | bucket                | guardduty      | <bucket_name>/<pdocix>/AWSLogs/<suffix>/<account_id>/GuardDuty/<region>/<year>/<month>/<day>                     |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`GuardDuty Firehose <guardduty>`                                         | bucket                | guardduty      | <bucket_name>/<pdocix>/<year>/<month>/<day>/<hh>                                                                 |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`WAF <waf>`                                                              | bucket                | waf            | <bucket_name>/<prefix>/AWSLogs/<suffix>/<account_id>/WAFLogs/<region>/<acl_name>/<year>/<month>/<day>/<hh>/<mm>  |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`S3 Server Access logs <server-access>`                                  | bucket                | server_access  | <bucket_name>/<pdocix>                                                                                           |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`Inspector Classic <inspector>`                                          | service               | inspector      |                                                                                                                  |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`CloudWatch Logs <cloudwatchlogs>`                                       | service               | cloudwatchlogs |                                                                                                                  |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`Amazon ECR Image scanning <ecr-image-scanning>`                         | service               | cloudwatchlogs |                                                                                                                  |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`Amazon Security Lake <security-lake>`                                   | subscriber            | security_lake  |                                                                                                                  |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`Custom Logs Buckets <custom-buckets>`                                   | subscriber            | buckets        |                                                                                                                  |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Amazon       | :doc:`Security Hub <security-hub>`                                            | subscriber            | security_hub   |                                                                                                                  |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+
| Cisco        | :doc:`Umbrella <cisco-umbrella>`                                              | bucket                | cisco_umbrella | <bucket_name>/<prefix>/<year>-<month>-<day>                                                                      |
+--------------+-------------------------------------------------------------------------------+-----------------------+----------------+------------------------------------------------------------------------------------------------------------------+

.. toctree::
    :maxdepth: 1
    :hidden:

    cloudtrail
    vpc
    config
    kms
    macie
    trusted-advisor
    guardduty
    waf
    server-access
    inspector
    cloudwatchlogs
    ecr-image-scanning
    cisco-umbrella
    elastic-load-balancing/index
    security-lake
    custom-buckets
    security-hub