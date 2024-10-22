.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The next table contains the most relevant information about configuring each service in the ``/var/ossec/etc/ossec.conf`` file, as well as the path where the logs will be stored in the bucket if the corresponding service uses them as its storage medium

Supported services
==================

All the services except ``Inspector Classic``, ``CloudWatch Logs``, and ``Security Lake`` get their data from log files stored in an ``S3`` bucket. These services store their data into log files which are configured inside ``<bucket type='TYPE'> </bucket>`` tags, while ``Inspector Classic`` and ``CloudWatch Logs`` services are configured inside ``<service type='inspector'> </service>`` and ``<service type='cloudwatchlogs'> </service>`` tags, respectively. The ``<subscriber type='TYPE'> </subscriber>`` tags are added to obtain logs from ``Amazon Security Lake`` buckets.

The next table contains the most relevant information about configuring each service in the ``/var/ossec/etc/ossec.conf`` file, as well as the path where the logs will be stored in the bucket if the corresponding service uses them as its storage medium:

+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| **Provider** | **Service**                                              | **Configuration tag** | **Type**       | **Path to logs**                                                                                                     | **Required permission**                                          |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`CloudTrail <cloudtrail>`                           | bucket                | cloudtrail     | <WAZUH_AWS_BUCKET>/<prefix>/AWSLogs/<suffix>/<organization_id>/<ACCOUNT_ID>/CloudTrail/<REGION>/<year>/<month>/<day> | :ref:`Policy configuration <cloudtrail_policy_configuration>`    |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`VPC <vpc>`                                         | bucket                | vpcflow        | <WAZUH_AWS_BUCKET>/<prefix>/AWSLogs/<suffix>/<ACCOUNT_ID>/vpcflowlogs/<REGION>/<year>/<month>/<day>                  | :ref:`Policy configuration <vpc_policy_configuration>`           |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`Config <config>`                                   | bucket                | config         | <WAZUH_AWS_BUCKET>/<prefix>/AWSLogs/<suffix>/<ACCOUNT_ID>/Config/<REGION>/<year>/<month>/<day>                       | :ref:`Policy configuration <config_policy_configuration>`        |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`KMS <kms>`                                         | bucket                | custom         | <WAZUH_AWS_BUCKET>/<prefix>/<year>/<month>/<day>                                                                     | :ref:`Policy configuration <kms_policy_configuration>`           |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`Macie <macie>`                                     | bucket                | custom         | <WAZUH_AWS_BUCKET>/<prefix>/<year>/<month>/<day>                                                                     | :ref:`Policy configuration <macie_policy_configuration>`         |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`Trusted Advisor <trusted-advisor>`                 | bucket                | custom         | <WAZUH_AWS_BUCKET>/<prefix>/<year>/<month>/<day>                                                                     | :ref:`Policy configuration <tr_advisor_policy_configuration>`    |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`GuardDuty <guardduty>`                             | bucket                | guardduty      | <WAZUH_AWS_BUCKET>/<prefix>/<year>/<month>/<day>/<hh>                                                                | :ref:`Policy configuration <guardduty_policy_configuration>`     |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`WAF <waf>`                                         | bucket                | waf            | <WAZUH_AWS_BUCKET>/<prefix>/<year>/<month>/<day>/<hh>                                                                | :ref:`Policy configuration <waf_policy_configuration>`           |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`S3 Server Access logs <server-access>`             | bucket                | server_access  | <WAZUH_AWS_BUCKET>/<prefix>                                                                                          | :ref:`Policy configuration <server_access_policy_configuration>` |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`Inspector Classic <inspector>`                     | service               | inspector      |                                                                                                                      | :ref:`Policy configuration <inspector_policy_configuration>`     |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`CloudWatch Logs <cloudwatchlogs>`                  | service               | cloudwatchlogs |                                                                                                                      | :ref:`Policy configuration <cloudwatch_policy_configuration>`    |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`Amazon ECR Image scanning <ecr-image-scanning>`    | service               | cloudwatchlogs |                                                                                                                      | :ref:`Policy configuration <ecr_policy_configuration>`           |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Cisco        | :doc:`Umbrella <cisco-umbrella>`                         | bucket                | cisco_umbrella | <WAZUH_AWS_BUCKET>/<prefix>/<year>-<month>-<day>                                                                     | :ref:`Policy configuration <umbrella_policy_configuration>`      |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`ALB <elastic-load-balancing/alb>`                  | bucket                | alb            | <WAZUH_AWS_BUCKET>/<prefix>/AWSLogs/<ACCOUNT_ID>/elasticloadbalancing/<REGION>/<year>/<month>/<day>                  | :ref:`Policy configuration <alb_policy_configuration>`           |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`CLB <elastic-load-balancing/clb>`                  | bucket                | clb            | <WAZUH_AWS_BUCKET>/<prefix>/AWSLogs/<ACCOUNT_ID>/elasticloadbalancing/<REGION>/<year>/<month>/<day>                  | :ref:`Policy configuration <clb_policy_configuration>`           |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`NLB <elastic-load-balancing/nlb>`                  | bucket                | custom         | <WAZUH_AWS_BUCKET>/<prefix>/<year>/<month>/<day>                                                                     | :ref:`Policy configuration <nlb_policy_configuration>`           |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`Amazon Security Lake <security-lake>`              | subscriber            | security_lake  |                                                                                                                      | :ref:`Policy configuration <security_lake_policy_configuration>` |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`Custom Logs Buckets <custom-buckets>`              | subscriber            | buckets        |                                                                                                                      | :ref:`Amazon Simple Queue Service <sqs_custom_configuration>`    |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+
| Amazon       | :doc:`Security Hub <security-hub>`                       | subscriber            | security_hub   |                                                                                                                      | :ref:`Policy configuration <security_hub_policy_configuration>`  |
+--------------+----------------------------------------------------------+-----------------------+----------------+----------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------+

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
