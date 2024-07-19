.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure Amazon Security Hub findings and insights fetching.

AWS Security Hub
================

.. versionadded:: 4.9.0

`AWS Security Hub <https://aws.amazon.com/security-hub/>`_ is a cloud security posture management (CSPM) service that automates security best practice checks, aggregates security alerts into a unified format, and helps the user understand the overall security posture across all of the AWS accounts.

Security Hub helps users assess their compliance against security best practices as follows:

-  Runs checks against security controls.
-  Generates control `findings <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings.html>`__.
-  Groups related findings into collections called `insights <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-insights.html>`__.

Wazuh integrates with `Amazon SQS <https://aws.amazon.com/sqs>`_ and `EventBridge <https://aws.amazon.com/eventbridge>`_ to centralize Security Hub findings and insights in a single place. To set up the integration, you need to:

#. Configure AWS. This involves the following.

   #. Enabling Amazon Security Hub.
   #. Integrating Security Hub with EventBridge.
   #. Enabling an Amazon SQS queue.
   #. Enabling an Amazon S3 bucket including Event notifications. The bucket sends notifications to the queue for every Security Hub object creation event.
#. Set up the Wazuh integration for Amazon Security Hub.

AWS configuration
-----------------

Enabling Security Hub
^^^^^^^^^^^^^^^^^^^^^

AWS Security Hub uses service-linked AWS Config rules to perform security checks for most controls. We advise to `configure AWS Config <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#securityhub-prereq-config>`_ as a prerequisite.

You have two alternative ways to enable AWS Security Hub:

-  `AWS Organizations integration <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html#securityhub-orgs-setup-overview>`_: Recommended for multi-account and multi-region environments.
-  `Manually <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html#securityhub-manual-setup-overview>`__: Recommended for standalone accounts and when the integration with AWS Organizations is unnecessary.

   .. thumbnail:: /images/aws/security-hub-set-up.png
      :align: center
      :width: 70%


You must attach the following AWS managed policies to the IAM identity.

-  `AWSSecurityHubFullAccess <https://docs.aws.amazon.com/securityhub/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-awssecurityhubfullaccess>`__ to access the Security Hub console and API operations.
-  `AWSSecurityHubOrganizationsAccess <https://docs.aws.amazon.com/securityhub/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-awssecurityhuborganizationsaccess>`__ to enable and manage the Security Hub through the Organizations integration.

.. thumbnail:: /images/aws/security-hub-policies.png
   :align: center
   :width: 70%

We recommend using `central configuration <https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html>`__ to set up and manage Security Hub for the organization. Central configuration lets the administrator customize security coverage for the organization.

Integrating Security Hub with EventBridge
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Integrating Security Hub with EventBridge allows storing Security Hub findings and insights in S3 buckets.

There are three types of events available as follows. Each type of event uses a specific `EventBridge event format <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-event-formats.html>`__. The Wazuh integration takes from the events every relevant ``detail`` field and value along with the ``detail-type`` value.

-  **Security Hub Findings - Imported**: Security Hub automatically sends events of this type to EventBridge. It includes all new findings as well as updates to existing findings. Each event contains a single finding.
-  **Security Hub Findings - Custom Action**: Security Hub sends events of this type to EventBridge when custom actions are triggered. The events are associated with the findings of the custom actions.
-  **Security Hub Insight Results**: This type of event is used to process the Security Hub Insights. You can use custom actions to send sets of insight results to EventBridge. Insight results are the resources that match an insight.

To send the last two types of events to EventBridge, you need to create a `custom action in Security Hub <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html>`__. Please refer to the Security Hub documentation to achieve this.

Find more information about each type of event in `Types of Security Hub integration with EventBridge <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-integration-types.html>`__.

To integrate Security Hub with EventBridge, you need to create the following:

-  A Firehose stream in Amazon Data Firehose
-  An event rule in EventBridge

EventBridge needs a target such as the Firehose stream. It triggers the target when it receives an event matching an event pattern. The event pattern is defined in the rule.
The AWS documentation provides steps on how to configure the rule.

-  `Creating an event rule for automatically sent findings <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-all-findings.html#securityhub-cwe-all-findings-predefined-pattern>`__
-  `Defining a rule for using custom actions to send findings and insight results <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html#securityhub-cwe-define-rule>`__

Check the :doc:`Amazon WAF integration <waf>` for a configuration example.

Amazon Simple Queue Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Set up a *Standard* type SQS Queue with the default configurations.  You can apply an Access Policy similar to the following example, where ``<region>``, ``<account-id>``, and ``<s3-bucket>`` are the region, account ID, and the name you are going to provide to the S3 bucket.

   .. code-block:: json

     {
     "Version": "2012-10-17",
     "Id": "example-ID",
     "Statement": [  
       {
         "Sid": "example-access-policy",
         "Effect": "Allow",
         "Principal": {
           "Service": "s3.amazonaws.com"
         },
         "Action": "SQS:SendMessage",
         "Resource": "arn:aws:sqs:<region>:<account-id>:<s3-bucket>",
         "Condition": {
           "StringEquals": {
             "aws:SourceAccount": "<account-id>"
           },
           "ArnLike": {
             "aws:SourceArn": "arn:aws:s3:*:*:<s3-bucket>"
           }
         }
       }
     ]
     }
  
   You can make your access policy to accept S3 notifications from different account IDs and to apply different conditions. More information in `Managing access in Amazon SQS <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-overview-of-managing-access.html>`_. 

Amazon S3 and Event Notifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To configure an S3 bucket that reports creation events, do the following.

#. Configure an S3 bucket as defined in the :doc:`Configuring an S3 Bucket <../prerequisites/S3-bucket>` section. Provide the name you decided in the previous section.
#. Once created, go to **Event notifications** inside the **Properties** tab. Select **Create event notification**. 
#. In **Event Types**, select **All object create events**. This generates notifications for any type of event that results in the creation of an object in the bucket.
#. In the **Destination** section, select **SQS queue**.
#. Select **Choose from your SQS queues**. Then, choose the queue you created previously.

Wazuh Configuration
-------------------

.. warning::
      
   Every message sent to the queue is read and deleted. Make sure you only use the queue for bucket notifications.

#. Edit the ``/var/ossec/etc/ossec.conf`` file. Add the SQS name and your `Configuration parameters`_ for the buckets service. Set them within the ``<subscriber type="security_hub">`` block. For example:

   .. code-block:: xml
      :emphasize-lines: 6,7

      <wodle name="aws-s3">
          <disabled>no</disabled>
          <interval>1h</interval>
          <run_on_start>yes</run_on_start>
          <subscriber type="security_hub">
              <sqs_name>sqs-queue</sqs_name>
              <aws_profile>default</aws_profile>
          </subscriber>
      </wodle>

   Check the :doc:`AWS S3 module </user-manual/reference/ossec-conf/wodle-s3>` reference to learn more about the available settings.

   .. note::
      
      The amount of notifications present in the queue affects the execution time of the AWS S3 module. If the ``<interval>`` value for the waiting time between executions is too short, Wazuh logs the :ref:`Interval overtaken <interval_overtaken_message>` warning into the ``ossec.log`` file.

#. Restart the Wazuh manager to apply the changes.

   .. include:: /_templates/common/restart_manager.rst

Configuration parameters
^^^^^^^^^^^^^^^^^^^^^^^^

Configure the following fields to set the queue and authentication configuration. For more information, check the :ref:`subscribers` reference.

Queue
~~~~~

-  ``<sqs_name>``: The name of the queue.
-  ``<service_endpoint>`` – *Optional*: The AWS S3 endpoint URL for data downloading from the bucket. Check :ref:`using_non-default_aws_endpoints` for more information about VPC and FIPS endpoints.

Authentication
~~~~~~~~~~~~~~

The available authentication methods are the following:

-  :ref:`IAM Roles <iam_roles>`
-  :ref:`Profiles <aws_profile>`

These authentication methods require using the ``/root/.aws/credentials`` file to provide credentials. You can find more information in :ref:`Configuring AWS credentials <amazon_credentials>`.

The available authentication configuration parameters are the following:

-  ``<aws_profile>``: A valid profile name from a :ref:`Shared Credential File <aws_profile>` or `AWS Config File <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#using-a-configuration-file>`__ with `permission to read logs from the bucket <https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-with-s3-actions.html>`__.
-  ``<iam_role_arn>``: ARN for the corresponding IAM role to assume.
-  ``<iam_role_duration>`` – *Optional*: The session duration in seconds.
-  ``<sts_endpoint>`` – *Optional*: The URL of the VPC endpoint of the AWS Security Token Service.