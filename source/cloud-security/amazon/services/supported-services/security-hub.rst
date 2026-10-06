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
   -  :ref:`Enabling an Amazon S3 bucket to include event notifications <s3_with_event_notifications>`: The bucket sends notifications to the queue for every Security Hub object creation event.
   -  :ref:`Enabling an Amazon SQS queue <simple_queue_service>`: The Amazon Simple Queue Service (SQS) is a message queuing service that enables decoupled communication between AWS components. The Wazuh module for AWS will query the SQS for notifications of created logs in S3 and generate alerts from Security Hub logs.

#. Configure the Wazuh module for AWS to receive Amazon Security Hub events.

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

The Amazon Firehose stream serves as the channel for sending the AWS Security Hub logs to the S3 bucket. Follow the steps below to create an Amazon Firehose stream for your Amazon Security Hub logs.

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
      :title: Create EventBridge rule
      :alt: Create EventBridge rule
      :align: center
      :width: 80%

#. Enter a name for the rule and select **Rule with an event pattern**. Then click on **Next**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-eventbridge-rule2.png
      :title: Create EventBridge rule
      :alt: Create EventBridge rule
      :align: center
      :width: 80%

#. Scroll down to **Event pattern**. Select ``Security Hub`` as the **AWS service** and ``All Events`` in the **Event type**. Then click on **Next**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-eventbridge-rule3.png
      :title: Create EventBridge rule
      :alt: Create EventBridge rule
      :align: center
      :width: 80%

#. Select ``Firehose stream`` as the target, and use the Firehose stream you created in the :ref:`previous section <creating_firehose_stream>`. Click on **Next**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-eventbridge-rule4.png
      :title: Create EventBridge rule
      :alt: Create EventBridge rule
      :align: center
      :width: 80%

#. Leave the other default options and create the EventBridge rule.

The AWS documentation provides steps to configure an EventBridge rule for AWS Security Hub.

-  `Creating an event rule for automatically sent findings <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-all-findings.html#securityhub-cwe-all-findings-predefined-pattern>`__
-  `Defining a rule for using custom actions to send findings and insight results <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html#securityhub-cwe-define-rule>`__

.. _s3_with_event_notifications:

Amazon S3 bucket with event notifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to configure an S3 bucket that reports the creation of events.

#. Configure an S3 bucket as defined in the :doc:`configuring an AWS  S3 Bucket <../prerequisites/S3-bucket>` section. Provide the name you decided in the previous section.
#. Go to **Event notifications** inside the **Properties** tab. Select **Create event notification**.
#. Select **All object create** events in **Event Types**. This generates notifications for any event that creates an object in the bucket.
#. Select **SQS queue** in the **Destination** section.
#. Select **Choose** from your SQS queues. Then, choose the queue you created previously.

.. _simple_queue_service:

Amazon Simple Queue Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Amazon Simple Queue Service is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications.

In this case, it acknowledges new events to pull from the S3 bucket.

#. Set up a Standard type SQS Queue with the default configurations. You can apply an access policy similar to the following example, where ``<REGION>``, ``<AWS_ACCOUNT_ID>``, ``<S3_BUCKET>``, ``<YOUR_SQS_QUEUE_NAME>`` are your region, account ID, S3 bucket name, and SQS queue name.

   .. code-block:: json
      :emphasize-lines: 12, 15, 18

      {
      "Version": "2012-10-17",
      "Id": "SecurityHub-ID",
      "Statement": [
        {
          "Sid": "example-access-policy",
          "Effect": "Allow",
          "Principal": {
            "Service": "s3.amazonaws.com"
          },
          "Action": "SQS:SendMessage",
          "Resource": "arn:aws:sqs:<REGION>:<AWS_ACCOUNT_ID>:<AWS_ACCOUNT_ID>:<YOUR_SQS_QUEUE_NAME>",
          "Condition": {
            "StringEquals": {
              "aws:SourceAccount": "<AWS_ACCOUNT_ID>"
            },
            "ArnLike": {
              "aws:SourceArn": "arn:aws:s3:*:*:<S3_BUCKET>"
            }
          }
        }
      ]
      }

   The other settings related to this configuration are:

   -  ``"Version"`` specifies the version of the policy language being used, in this case, the version from 2012-10-17.
   -  ``"Id"`` is a unique identifier for this policy.
   -  ``"Statement"`` is an array that contains the individual permission statements for this policy.
   -  ``"Sid"`` is an optional identifier that provides a way to give the statement a unique name.
   -  ``"Effect"`` defines whether the statement results in an ``"Allow"`` or ``"Deny"`` for the specified actions.
   -  ``"Principal"`` specifies the AWS service or account allowed to access the resource, in this case, the ``"s3.amazonaws.com"`` service.
   -  ``"Action"`` specifies the action that is allowed or denied, in this case, "SQS", which allows sending messages to an SQS queue.
   -  ``"Condition"`` specifies conditional elements that must be met for the policy to take effect.
   -  ``"Resource"`` is the ARN of your SQS queue.
   -  ``"aws:SourceAccount"`` is your AWS account ID.
   -  ``"aws:SourceArn"`` is the ARN of the Amazon S3 bucket created for your Amazon Security Hub logs.

#. You can set your access policy to accept S3 notifications from different account IDs and apply different conditions. For more information, see `managing access in Amazon SQS <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-overview-of-managing-access.html>`__.

Wazuh configuration
-------------------

Authentication
^^^^^^^^^^^^^^

The available authentication methods are the following:

-  :ref:`IAM Roles <iam_roles>`
-  :ref:`Profiles <aws_profile>`

These authentication methods require providing credentials using the ``/root/.aws/credentials`` file. For more information, see :doc:`configuring AWS credentials <../prerequisites/credentials>`.

Configuration
^^^^^^^^^^^^^

You can perform the following configuration on the Wazuh server or Linux-based Wazuh agent.

#. Edit the ``/var/ossec/etc/ossec.conf`` file. Add the SQS name within the ``<sqs_name>`` tag. For example:

   .. code-block:: xml

      <wodle name="aws-s3">
          <disabled>no</disabled>
          <interval>1h</interval>
          <run_on_start>yes</run_on_start>
          <subscriber type="security_hub">
             <sqs_name>YOUR_SQS_QUEUE_NAME</sqs_name>
             <aws_profile>YOUR_AWS_CREDENTIAL_PROFILE</aws_profile>
         </subscriber>
      </wodle>

   Where:

   -  ``<interval>`` is the time taken between each log pull.
   -  ``<run_on_start>`` pulls AWS Security Hub logs each time the Wazuh server starts.
   -  ``<subscriber type="security_hub">`` are the added tags to obtain AWS Security Hub logs.
   -  ``<sqs_name>`` is the name of the Amazon SQS queue created in the previous section.

   Optional

   -  ``<service_endpoint>`` – The AWS S3 endpoint URL for data downloading from the bucket. Check :ref:`using non-default AWS endpoints <using_non-default_aws_endpoints>` for more information about VPC and FIPS endpoints.

#. Restart the Wazuh server or agent to apply the changes.

   -  Wazuh server:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # Systemctl restart Wazuh-agent

Check the :doc:`AWS S3 module </user-manual/reference/ossec-conf/wodle-s3>` reference to learn more about the available settings. Configure the following fields to set the queue and authentication configuration. For more information, check the :ref:`subscriber’s <subscribers>` reference.

.. warning::

   Every message sent to the queue is read and deleted. Make sure you only use the queue for bucket notifications.

Visualizing the events
^^^^^^^^^^^^^^^^^^^^^^

You can view these logs via the **Threat Hunting** dashboard of the agent you configured your Wazuh module for AWS.

The following dashboard shows the top 5 AWS Security Hub alerts discovered within 90 days.

.. thumbnail:: /images/cloud-security/aws/security-hub/top-5-security-hub-alerts.png
   :title: Create EventBridge rule
   :alt: Create EventBridge rule
   :align: center
   :width: 80%

The image below shows an event with a high severity.

.. thumbnail:: /images/cloud-security/aws/security-hub/high-severity-security-hub-alert.png
   :title: Create EventBridge rule
   :alt: Create EventBridge rule
   :align: center
   :width: 80%
