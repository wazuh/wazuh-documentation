.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure Amazon Security Hub findings and insights fetching.

AWS Security Hub
================

.. versionadded:: 4.9.0

`AWS Security Hub <https://aws.amazon.com/security-hub/>`_ automates security best practice checks and aggregates insights to help users understand their overall security posture across multiple AWS accounts. Security Hub helps users assess their compliance against security best practices. It achieves this by:

-  Running checks against security controls.
-  Generating control `findings <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings.html>`__.
-  Grouping related findings into collections called `insights <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-insights.html>`__.

You need to perform the following to set up the integration that allows you to receive Security Hub events on your Wazuh environment:

#. Configure your AWS environment. This involves:

   -  :ref:`Enabling Amazon Security Hub <enabling_security_hub>`. There are two methods to enable Amazon Security Hub in your environment. Please see the :ref:`enabling Security Hub <enabling_security_hub>` section.
   -  :ref:`Creating a Firehose stream <creating_firehose_stream>`: The Amazon EventBridge is a serverless event bus service that makes it easy to connect applications using events from AWS services, integrated SaaS applications, and custom sources in real-time. EventBridge needs a target such as the Firehose stream. It triggers the target when it receives an event matching an event pattern defined in the rule.
   -  :ref:`Integrating Security Hub with EventBridge <integrating_security_hub_with_eventbridge>`: EventBridge allows storing Security Hub findings and insights in S3 buckets.
   -  :ref:`Enabling an Amazon S3 bucket to include event notifications <>`: The bucket sends notifications to the queue for every Security Hub object creation event.
   -  :ref:`Enabling an Amazon SQS queue <>`: The Amazon Simple Queue Service (SQS) is a message queuing service that enables decoupled communication between AWS components. The Wazuh module for AWS will query the SQS for notifications of created logs in S3 and generate alerts from Security Hub logs.

#. Configure the Wazuh module for AWS to receive Amazon Security Hub events.

.. contents::
   :local:
   :depth: 2
   :backlinks: none

Amazon configuration
--------------------

.. _enabling_security_hub:

Enabling Security Hub
^^^^^^^^^^^^^^^^^^^^^

Search for the “Security Hub” using the AWS console search bar to determine the best method that suits your environment. There are two ways to enable AWS Security Hub:

-  **Manual Integration**: We recommend this method for standalone accounts with a single organization. The screenshot below shows how to enable AWS Security Hub using the AWS Security Hub console. Please follow the `enabling Security Hub manually <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html#securityhub-manual-setup-overview>`__ guideline to find other methods to enable the AWS Security Hub.

   .. thumbnail:: /images/cloud-security/aws/security-hub/security-hub-set-up.png
      :title: Enable AWS Security Hub
      :alt: Enable AWS Security Hub
      :align: center
      :width: 80%

-  **Organizations integration**: We recommend this method for multi-account and multi-region environments. Your organization must have a delegated administrator account. Please follow the `enabling Security Hub with organizations integration <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html#securityhub-orgs-setup-overview>`__ guidelines to set your AWS Security Hub using this method.

.. _creating_firehose_stream:

Creating a Firehose stream
^^^^^^^^^^^^^^^^^^^^^^^^^^

The Amazon Firehose stream serves as the channel for sending the AWS Security Hub logs to the S3 bucket. Follow the steps below to :ref:`create an Amazon Firehose stream <>` for your Amazon Security Hub logs.

#. Go to the Amazon Data Firehose service and click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-firehose-stream.png
      :title: Create Firehose stream
      :alt: Create Firehose stream
      :align: center
      :width: 80%

#. Select **Direct PUT** as the source and **Amazon S3** as the destination.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-firehose-stream2.png
      :title: Create Firehose stream
      :alt: Create Firehose stream
      :align: center
      :width: 80%

#. Choose or create your proposed Amazon S3 bucket. You can use an Amazon S3 bucket prefix, but this is optional.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-firehose-stream3.png
      :title: Create Firehose stream
      :alt: Create Firehose stream
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

.. _integrating_security_hub_with_eventbridge:

Integrating Security Hub with EventBridge
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Integrating Security Hub with EventBridge enables the storage of Security Hub events in S3 buckets.

There are three types of events available, each using a specific `Eventbridge event format <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-event-formats.html>`__. The Wazuh integration takes every relevant ``detail`` and ``detail-type`` value from them.

-  **Security Hub Findings - Imported**: Security Hub automatically sends events of this type to EventBridge. They include new findings and updates to existing findings, each containing a single finding.
-  **Security Hub Findings - Custom Action**: When you trigger custom actions, Security Hub sends these events to EventBridge. The custom actions associate the events with their findings.
-  **Security Hub Insight Results**: This event processes the Security Hub Insights. You can use custom actions to send sets of insight results to EventBridge. Insight results are the resources that match an insight.

To send the last two types of events to EventBridge, you need to create a `custom action in Security Hub <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html>`__. Please refer to the Amazon Security Hub documentation to achieve this. Find more information about the `types of Security Hub integration with EventBridge <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-integration-types.html>`__.

To integrate Security Hub with EventBridge, you must create an event rule in EventBridge.

#. Go to the Amazon EventBridge and create a new EventBridge rule.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-eventbridge-rule.png
      :title: Create Firehose stream
      :alt: Create Firehose stream
      :align: center
      :width: 80%

#. Enter a name for the rule and select **Rule with an event pattern**. Then click on **Next**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-eventbridge-rule2.png
      :title: Create Firehose stream
      :alt: Create Firehose stream
      :align: center
      :width: 80%

#. 







You have two alternative ways to enable AWS Security Hub:

-  `AWS Organizations integration <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html#securityhub-orgs-setup-overview>`_: Recommended for multi-account and multi-region environments.
-  `Manual <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html#securityhub-manual-setup-overview>`__: Recommended for standalone accounts and when the integration with AWS Organizations is unnecessary.

If you choose the Organizations integration, you must attach the following AWS managed policies to the IAM identity.

.. thumbnail:: /images/aws/security-hub-policies.png
   :align: center
   :width: 70%

-  `AWSSecurityHubFullAccess <https://docs.aws.amazon.com/securityhub/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-awssecurityhubfullaccess>`__ to access the Security Hub console and API operations.

   .. code-block:: json

      {
         "Version": "2012-10-17",
         "Statement": [
            {
               "Sid": "SecurityHubAllowAll",
               "Effect": "Allow",
               "Action": "securityhub:*",
               "Resource": "*"
            },
            {
               "Sid": "SecurityHubServiceLinkedRole",
               "Effect": "Allow",
               "Action": "iam:CreateServiceLinkedRole",
               "Resource": "*",
               "Condition": {
                  "StringLike": {
                     "iam:AWSServiceName": "securityhub.amazonaws.com"
                  }
               }
            },
            {
               "Sid": "OtherServicePermission",
               "Effect": "Allow",
               "Action": [
                  "guardduty:GetDetector",
                  "guardduty:ListDetectors",
                  "inspector2:BatchGetAccountStatus",
                  "pricing:GetProducts"
               ],
               "Resource": "*"
            }
         ]
      }

-  `AWSSecurityHubOrganizationsAccess <https://docs.aws.amazon.com/securityhub/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-awssecurityhuborganizationsaccess>`__ to enable and manage the Security Hub through the Organizations integration.

   .. code-block:: json

      {
         "Version": "2012-10-17",
         "Statement": [
            {
               "Sid": "OrganizationPermissions",
               "Effect": "Allow",
               "Action": [
                  "organizations:ListAccounts",
                  "organizations:DescribeOrganization",
                  "organizations:ListRoots",
                  "organizations:ListDelegatedAdministrators",
                  "organizations:ListAWSServiceAccessForOrganization",
                  "organizations:ListOrganizationalUnitsForParent",
                  "organizations:ListAccountsForParent",
                  "organizations:DescribeAccount",
                  "organizations:DescribeOrganizationalUnit"
               ],
               "Resource": "*"
            },
            {
               "Sid": "OrganizationPermissionsEnable",
               "Effect": "Allow",
               "Action": "organizations:EnableAWSServiceAccess",
               "Resource": "*",
               "Condition": {
                  "StringEquals": {
                     "organizations:ServicePrincipal": "securityhub.amazonaws.com"
                  }
               }
            },
            {
               "Sid": "OrganizationPermissionsDelegatedAdmin",
               "Effect": "Allow",
               "Action": [
                  "organizations:RegisterDelegatedAdministrator",
                  "organizations:DeregisterDelegatedAdministrator"
               ],
               "Resource": "arn:aws:organizations::*:account/o-*/*",
               "Condition": {
                  "StringEquals": {
                     "organizations:ServicePrincipal": "securityhub.amazonaws.com"
                  }
               }
            }
         ]
      }

We recommend using `central configuration <https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html>`__ to set up and manage Security Hub for the organization. Central configuration lets the administrator customize security coverage for the organization.

Integrating Security Hub with EventBridge
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To integrate Security Hub with EventBridge, you need to create the following resources:

-  A Firehose stream in Amazon Data Firehose
-  An event rule in EventBridge

To send *Security Hub Findings - Custom Action* and *Security Hub Insight Results* events to EventBridge, create a `custom action in Security Hub <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html>`__.

EventBridge needs a target such as the Firehose stream. It triggers the target when it receives an event matching an event pattern. The event pattern is defined in the rule.
The AWS documentation provides steps on how to configure the rule.

-  `Creating an event rule for automatically sent findings <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-all-findings.html#securityhub-cwe-all-findings-predefined-pattern>`__
-  `Defining a rule for using custom actions to send findings and insight results <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html#securityhub-cwe-define-rule>`__

Check the :doc:`Amazon WAF integration <waf>` for a Firehose configuration example.

Amazon Simple Queue Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Set up a *Standard* type SQS Queue with the default configurations.  You can apply an Access Policy similar to the following example, where ``<region>``, ``<account-id>``, and ``<s3-bucket>`` are the region, account ID, and the name you are going to provide to the S3 bucket.

   .. code-block:: json
      :emphasize-lines: 12

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

   .. thumbnail:: /images/aws/security-hub-sqs-1.png
      :title: Create queue
      :alt: Create queue
      :align: center
      :width: 80%

   .. thumbnail:: /images/aws/security-hub-sqs-2.png
      :title: Create queue
      :alt: Create queue
      :align: center
      :width: 80%

   .. thumbnail:: /images/aws/security-hub-sqs-3.png
      :title: Create queue
      :alt: Create queue
      :align: center
      :width: 80%

You can make your access policy to accept S3 notifications from different account IDs and to apply different conditions. More information in `Managing access in Amazon SQS <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-overview-of-managing-access.html>`__.

Amazon S3 and Event Notifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To configure an S3 bucket that reports creation events, do the following.

#. Configure an S3 bucket as defined in the :doc:`Configuring an S3 Bucket <../prerequisites/S3-bucket>` section. Provide the name you decided in the previous section.
#. Once created, go to **Event notifications** inside the **Properties** tab. Select **Create event notification**.
#. In **Event Types**, select **All object create events**. This generates notifications for any type of event that results in the creation of an object in the bucket.

   .. thumbnail:: /images/aws/security-hub-s3-1.png
         :align: center
         :width: 70%

#. In the **Destination** section, select **SQS queue**.
#. Select **Choose from your SQS queues**. Then, choose the queue you created previously.

   .. thumbnail:: /images/aws/security-hub-s3-2.png
      :align: center
      :width: 70%

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

These authentication methods require using the ``/root/.aws/credentials`` file to provide credentials. You can find more information in :doc:`Configuring AWS credentials <../prerequisites/credentials>`.

The available authentication configuration parameters are the following:

-  ``<aws_profile>``: A valid profile name from a :ref:`Shared Credential File <aws_profile>` or `AWS Config File <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#using-a-configuration-file>`__ with `permission to read logs from the bucket <https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-with-s3-actions.html>`__.
-  ``<iam_role_arn>``: ARN for the corresponding IAM role to assume.
-  ``<iam_role_duration>`` – *Optional*: The session duration in seconds.
-  ``<sts_endpoint>`` – *Optional*: The URL of the VPC endpoint of the AWS Security Token Service.