.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure the Wazuh module for AWS to collect AWS Security Hub CSPM findings and insights.

AWS Security Hub CSPM
=====================

`AWS Security Hub CSPM <https://aws.amazon.com/security-hub/>`__ automates security best practice checks and aggregates insights to help users understand their overall security posture across multiple AWS accounts. Security Hub CSPM helps users assess their compliance against security best practices. It achieves this by:

-  Running checks against security controls.
-  Generating control `findings <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings.html>`__.
-  Grouping related findings into collections called `insights <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-insights.html>`__.

AWS renamed AWS Security Hub to AWS Security Hub CSPM. This section uses AWS Security Hub CSPM, which sends findings in the AWS Security Finding Format (ASFF).

You need to perform the following to set up the integration that allows you to receive Security Hub CSPM events on your Wazuh environment:

#. Configure your AWS environment. This involves:

   -  :ref:`Enabling Security Hub CSPM <enabling_security_hub>`. There are two methods to enable AWS Security Hub CSPM in your environment. See the :ref:`Enabling Security Hub CSPM <enabling_security_hub>` section.
   -  :ref:`Creating a Firehose stream <creating_firehose_stream>`: Amazon Data Firehose delivers streaming data to destinations such as an S3 bucket. The EventBridge rule uses the Firehose stream as its target and sends it each event that matches the rule's event pattern.
   -  :ref:`Integrating Security Hub CSPM with EventBridge <integrating_security_hub_with_eventbridge>`: EventBridge allows storing Security Hub CSPM findings and insights in S3 buckets.
   -  :ref:`Amazon S3 bucket with event notifications <s3_with_event_notifications>`: The bucket sends notifications to the queue for every Security Hub CSPM object creation event.
   -  :ref:`Amazon Simple Queue Service <simple_queue_service>`: The Amazon Simple Queue Service (SQS) is a message queuing service that enables decoupled communication between AWS components. The Wazuh module for AWS queries the SQS queue for notifications of new logs in S3 and processes those Security Hub CSPM logs.

#. Configure the Wazuh module for AWS to receive AWS Security Hub CSPM events.

AWS configuration
-----------------

.. _enabling_security_hub:

Enabling Security Hub CSPM
^^^^^^^^^^^^^^^^^^^^^^^^^^

Security Hub CSPM uses AWS Config to run the checks of its security standards. Enable AWS Config resource recording in every account and region where you enable Security Hub CSPM before you enable it. For more information, see `Enabling and configuring AWS Config for Security Hub CSPM <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html>`__.

On your AWS console, search for ``security hub`` in the search bar to determine the best method for your environment. There are two ways to enable AWS Security Hub CSPM:

-  **Manual integration:** We recommend this method for standalone accounts that aren't part of AWS Organizations. The screenshot below shows how to enable AWS Security Hub CSPM using the AWS Security Hub CSPM console. Follow the `enabling Security Hub CSPM manually <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html#securityhub-manual-setup-overview>`__ guideline to find other methods to enable the AWS Security Hub CSPM.

   .. thumbnail:: /images/cloud-security/aws/security-hub/security-hub-set-up.png
      :title: Enable AWS Security Hub CSPM
      :alt: Enable AWS Security Hub CSPM
      :align: center
      :width: 80%

-  **Organizations integration**: We recommend this method for multi-account and multi-region environments. Your organization must have a delegated administrator account. Follow the `enabling Security Hub CSPM with organizations integration <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html#securityhub-orgs-setup-overview>`__ guidelines to set your AWS Security Hub CSPM using this method.

.. _creating_firehose_stream:

Creating a Firehose stream
^^^^^^^^^^^^^^^^^^^^^^^^^^

The Amazon Data Firehose stream serves as the channel for sending the AWS Security Hub CSPM logs to the S3 bucket. Follow the steps below to create an Amazon Data Firehose stream for your AWS Security Hub CSPM logs.

#. :doc:`Create a new </cloud-security/amazon/services/prerequisites/S3-bucket>` **S3** bucket, or skip this step to use an existing bucket.
#. On your AWS console, search for ``amazon data firehose`` in the search bar or go to **Services** > **Analytics** > **Amazon Data Firehose**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/01-data-firehose.png
      :title: Amazon Data Firehose console
      :alt: Amazon Data Firehose console
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-firehose-stream.png
      :title: Create Firehose stream
      :alt: Create Firehose stream
      :align: center
      :width: 80%

#. Select **Direct PUT** and **Amazon S3** as the desired **Source** and **Destination**, respectively, and choose an appropriate **Firehose stream name**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-firehose-stream2.png
      :title: Choose the Firehose stream source, destination, and name
      :alt: Choose the Firehose stream source, destination, and name
      :align: center
      :width: 80%

#. Select the desired S3 bucket as the destination. It is possible to specify a custom prefix to alter the path where AWS stores the logs. Amazon Data Firehose creates a file structure ``YYYY/MM/DD/HH``. If you use a prefix, the file structure is ``prefix-name/YYYY/MM/DD/HH``. You don't need to set the prefix in Wazuh, because the Wazuh module for AWS gets the object keys from the SQS notifications. Select GZIP or ZIP compression to match the formats that the Wazuh module for AWS supports.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-firehose-stream3.png
      :title: Firehose stream destination settings
      :alt: Firehose stream destination settings
      :align: center
      :width: 80%

#. Create or choose an existing IAM role to be used by Amazon Data Firehose in the **Advanced settings** section.

   .. thumbnail:: /images/cloud-security/aws/security-hub/06-choose-iam-role.png
      :title: Choose the Firehose stream IAM role in Advanced settings
      :alt: Choose the Firehose stream IAM role in Advanced settings
      :align: center
      :width: 80%

#. Click **Create Firehose stream** at the end of the page.

   .. thumbnail:: /images/cloud-security/aws/security-hub/07-create-firehose-stream.png
      :title: Firehose stream created
      :alt: Firehose stream created
      :align: center
      :width: 80%

.. _integrating_security_hub_with_eventbridge:

Integrating Security Hub CSPM with EventBridge
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Integrating Security Hub CSPM with EventBridge enables the storage of Security Hub CSPM events in S3 buckets.

There are three types of events available, each using a specific `EventBridge event format <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-event-formats.html>`__. The Wazuh integration takes every relevant ``detail`` and ``detail-type`` value from them.

-  Security Hub Findings - Imported: Security Hub CSPM automatically sends events of this type to EventBridge. They include new findings and updates to existing findings, each containing a single finding.
-  Security Hub Findings - Custom Action: When you trigger custom actions, Security Hub CSPM sends these events to EventBridge. The custom actions associate the events with their findings.
-  Security Hub Insight Results: This event processes the Security Hub CSPM Insights. You can use custom actions to send sets of insight results to EventBridge. Insight results are the resources that match an insight.

To send the last two types of events to EventBridge, you need to create a `custom action in Security Hub CSPM <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html>`__. Refer to the AWS Security Hub CSPM documentation to achieve this. Find more information about the `types of Security Hub CSPM integration with EventBridge <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-integration-types.html>`__.

To integrate Security Hub CSPM with EventBridge, you must create an event rule in EventBridge.

#. On your AWS console, search for ``eventbridge`` in the search bar or go to **Services** > **Application Integration** > **Amazon EventBridge**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-eventbridge-rule.png
      :title: Search for Amazon EventBridge in the AWS console
      :alt: Search for Amazon EventBridge in the AWS console
      :align: center
      :width: 80%

#. Select **Event buses**, under **Default event bus**, click **default**, then click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/02-create-rule.png
      :title: Select the default event bus
      :alt: Select the default event bus
      :align: center
      :width: 80%

   The **Create rule** page opens.

   .. thumbnail:: /images/cloud-security/aws/security-hub/02-create-rule-2.png
      :title: Create rule on the default event bus
      :alt: Create rule on the default event bus
      :align: center
      :width: 80%

#. Select **Advanced builder**, assign a name to the EventBridge rule, and click **Next**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-eventbridge-rule2.png
      :title: Define the EventBridge rule detail
      :alt: Define the EventBridge rule detail
      :align: center
      :width: 80%

#. In the **Build event pattern** section, choose **AWS events or EventBridge partner events** as **Event source**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/04-build-event-pattern.png
      :title: Choose the event source in Build event pattern
      :alt: Choose the event source in Build event pattern
      :align: center
      :width: 80%

#. In the **Event pattern** section choose **AWS services** as **Event source**, **Security Hub** as **AWS service**, and **All Events** as **Event type**. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-eventbridge-rule3.png
      :title: Security Hub event pattern
      :alt: Security Hub event pattern
      :align: center
      :width: 80%

#. Under **Select a target**, choose **Firehose stream** and select the stream created previously. Also, create a new role to access the delivery stream. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/security-hub/create-eventbridge-rule4.png
      :title: Select the Firehose stream as the target
      :alt: Select the Firehose stream as the target
      :align: center
      :width: 80%

#. Review the configuration and click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/security-hub/07-review-security-hub.png
      :title: Review and create the EventBridge rule
      :alt: Review and create the EventBridge rule
      :align: center
      :width: 80%

The AWS documentation provides steps to configure an EventBridge rule for AWS Security Hub CSPM.

-  `Creating an event rule for automatically sent findings <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-all-findings.html#securityhub-cwe-all-findings-predefined-pattern>`__
-  `Defining a rule for using custom actions to send findings and insight results <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html#securityhub-cwe-define-rule>`__

.. _s3_with_event_notifications:

Amazon S3 bucket with event notifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to configure an S3 bucket that reports the creation of events.

#. Configure an S3 bucket as defined in the :doc:`configure an AWS S3 bucket </cloud-security/amazon/services/prerequisites/S3-bucket>` section. Use the bucket that you selected as the destination of the Firehose stream.
#. Go to **Event notifications** inside the **Properties** tab, then click **Create event notification**.
#. Select **All object create events** in **Event Types**. The bucket then sends a notification for every event that creates an object in it.
#. Select **SQS queue** in the **Destination** section.
#. Select **Choose from your SQS** queues, then choose the queue you created previously.

.. _simple_queue_service:

Amazon Simple Queue Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Amazon Simple Queue Service is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications.

In this case, the queue receives the S3 notifications for new objects. The Wazuh module for AWS polls the queue to find the objects to pull from the S3 bucket.

#. Set up a **Standard** type SQS queue in the Amazon SQS console with the default configurations. You can apply an access policy similar to the following example. Replace ``<REGION>``, ``<ACCOUNT_ID>``, ``<S3_BUCKET>``, ``<SQS_NAME>`` with your region, account ID, S3 bucket name, and SQS queue name.

   .. code-block:: json
      :emphasize-lines: 12,13,14,15,18

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
          "Resource": "arn:aws:sqs:<REGION>:<ACCOUNT_ID>:<SQS_NAME>",
          "Condition": {
            "StringEquals": {
              "aws:SourceAccount": "<ACCOUNT_ID>"
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
   -  ``"Effect"`` defines whether the statement results in an "Allow" or "Deny" for the specified actions.
   -  ``"Principal"`` specifies the AWS service or account allowed to access the resource, in this case, the "s3.amazonaws.com" service.
   -  ``"Action"`` specifies the action that is allowed or denied, in this case, "SQS:SendMessage", which allows sending messages to an SQS queue.
   -  ``"Condition"`` specifies conditional elements that must be met for the policy to take effect.
   -  ``"Resource"`` is the ARN of your SQS queue.
   -  ``"aws:SourceAccount"`` is your AWS account ID.
   -  ``"aws:SourceArn"`` is the ARN of the Amazon S3 bucket created for your AWS Security Hub CSPM logs.

You can also set your access policy to accept S3 notifications from different account IDs and apply different conditions. For more information, see `managing access in Amazon SQS <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-overview-of-managing-access.html>`__.

.. _security_hub_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

Follow the :ref:`creating an AWS policy <creating_an_AWS_policy>` guide to create a policy using the Amazon Web Services console. Attach a policy like the following to the AWS identity that the Wazuh module for AWS uses. Replace ``<REGION>``, ``<ACCOUNT_ID>``, ``<SQS_NAME>``, and ``<S3_BUCKET>`` with your values.

.. code-block:: json
   :emphasize-lines: 12,22,23

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "ReadNotificationQueue",
               "Effect": "Allow",
               "Action": [
                   "sqs:GetQueueUrl",
                   "sqs:ReceiveMessage",
                   "sqs:DeleteMessage"
               ],
               "Resource": "arn:aws:sqs:<REGION>:<ACCOUNT_ID>:<SQS_NAME>"
           },
           {
               "Sid": "ReadLogBucket",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket"
               ],
               "Resource": [
                   "arn:aws:s3:::<S3_BUCKET>",
                   "arn:aws:s3:::<S3_BUCKET>/*"
               ]
           }
       ]
   }

Configure Wazuh to process AWS Security Hub CSPM logs
-----------------------------------------------------

Authentication
^^^^^^^^^^^^^^

The available authentication methods are the following:

-  :ref:`IAM roles <iam_roles>`
-  :ref:`Profiles <aws_profile>`

These authentication methods require providing credentials using the ``/root/.aws/credentials`` file. For more information, see the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section.

Configuration
^^^^^^^^^^^^^

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.
#. Add the SQS queue name to the ``<sqs_name>`` tag in the ``/var/ossec/etc/ossec.conf`` file, as in the following example. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<subscriber>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 6,7

      <wodle name="aws-s3">
          <disabled>no</disabled>
          <interval>1h</interval>
          <run_on_start>yes</run_on_start>
          <subscriber type="security_hub">
              <sqs_name><SQS_NAME></sqs_name>
              <aws_profile><PROFILE></aws_profile>
          </subscriber>
      </wodle>

   Where:

   -  ``<interval>`` is the time taken between each log pull.
   -  ``<run_on_start>`` pulls AWS Security Hub CSPM logs each time the Wazuh agent starts.
   -  ``<subscriber type="security_hub">`` are the added tags to obtain AWS Security Hub CSPM logs.
   -  ``<sqs_name>`` is the name of the Amazon SQS queue created in the previous section.

   Optional

   -  ``<service_endpoint>`` – The AWS S3 endpoint URL for data downloading from the bucket. Check :ref:`Using VPC and FIPS endpoints <using_non-default_aws_endpoints>` for more information about VPC and FIPS endpoints.

#. Restart the Wazuh agent to apply the changes.

   .. code-block:: console

      # systemctl restart wazuh-agent

Check the :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` reference to learn more about the available settings. For more information about the queue settings, check the :ref:`subscribers <subscribers>` reference.

.. warning::

   Every message sent to the queue is read and deleted. Make sure you only use the queue for bucket notifications.

Visualize the findings on the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can view these findings on the Wazuh dashboard. Go to **Amazon Web Services** > **Findings** and filter by ``observer.vendor: "AWS Security Hub"``.

Each type of Security Hub CSPM finding raises a different Wazuh finding:

-  Failed compliance checks: AWS Security Hub compliance check failed
-  Sensitive data identifications: AWS Security Hub sensitive data identified
-  Software vulnerabilities: Vulnerability detected
-  Threat detections (TTPs): IDS/IPS alert triggered

.. thumbnail:: /images/cloud-security/aws/security-hub/top-5-security-hub-alerts.png
   :title: AWS Security Hub CSPM findings on the Wazuh dashboard
   :alt: AWS Security Hub CSPM findings on the Wazuh dashboard
   :align: center
   :width: 80%

Expand a finding to see its details:

-  Security Hub CSPM finding title (``rule.description``)
-  Control ID (``rule.id``)
-  Finding description (``vulnerability.description``)
-  Workflow status (``event.reason``)
-  Product that reported it (``observer.product``)
-  AWS account and region (``cloud.account.id`` and ``cloud.region``)

.. thumbnail:: /images/cloud-security/aws/security-hub/high-severity-security-hub-alert.png
   :title: AWS Security Hub CSPM finding details
   :alt: AWS Security Hub CSPM finding details
   :align: center
   :width: 80%
