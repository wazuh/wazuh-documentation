.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure Custom Logs Buckets to integrate with Wazuh.

Custom Logs Buckets
===================

`Amazon Simple Queue Service (Amazon SQS) <https://aws.amazon.com/sqs/>`__ is a fully managed message queuing service. It offers secure, durable, and available hosted queues to decouple and scale software systems and components. It allows sending, storing, and receiving messages between software components at any volume, without losing messages or requiring other services to be available. These features make it an optimal component to associate with Amazon S3 buckets to consume any type of log.

Combining Amazon SQS with Amazon S3 buckets allows Wazuh to collect JSON, CSV, and plain text logs from any custom path. These logs don't need to come from AWS. Wazuh indexes these logs as events of the ``aws`` integration, with each log unparsed in the ``event.original`` field. To parse your log format and raise findings, create decoders and rules as described in :doc:`Create a security analytics detection workflow </user-manual/data-analysis/detection-workflow>`.

.. note::

   To properly process CSV logs, they must include column headers.

To collect logs from Custom Logs Buckets, you need to do the following:

#. Create an Amazon SQS queue.
#. Configure an S3 bucket. For every object creation event, the bucket sends notifications to the queue.

.. _amazon_custom_logs_configuration:

AWS configuration
-----------------

The following sections cover how to configure Custom Logs Buckets to integrate with Wazuh.

.. _sqs_custom_configuration:

Amazon Simple Queue Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create a **Standard** type SQS queue in the Amazon SQS console with the default configurations. You can apply an access policy like the following example. Replace ``<REGION>``, ``<ACCOUNT_ID>``, ``<SQS_NAME>``, and ``<S3_BUCKET>`` with your region, account ID, SQS queue name, and the name you give the S3 bucket.

.. code-block:: json
   :emphasize-lines: 12,15,18

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

You can configure your access policy to accept S3 notifications from different account IDs and to apply different conditions. For more information, see `managing access in Amazon SQS <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-overview-of-managing-access.html>`__.

Amazon S3 and Event Notifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To configure an S3 bucket that reports creation events, do the following.

#. Configure an S3 bucket as defined in the :doc:`configuring an S3 bucket </cloud-security/amazon/services/prerequisites/S3-bucket>` section. Provide the name you decided in the previous section.
#. After you create the bucket, go to **Event notifications** inside the **Properties** tab, then click **Create event notification**.
#. In **Event Types**, select **All object create events**. The bucket then sends a notification for every event that creates an object in it.
#. In the **Destination** section, select **SQS queue**, then select **Choose from your SQS queues**.
#. Choose the queue you created previously.

.. _custom_logs_buckets_policy_configuration:

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

.. _custom_logs_buckets_configuration_parameters:

Configuration parameters
------------------------

Configure the following fields to set the queue and authentication configuration. For more information, check the :ref:`subscribers <subscribers>` reference.

Queue
^^^^^

-  ``<sqs_name>``: The name of the queue.
-  Optional – ``<service_endpoint>``: The AWS S3 endpoint URL for data downloading from the bucket. Check :ref:`Using VPC and FIPS endpoints <using_non-default_aws_endpoints>` for more information about VPC and FIPS endpoints.

Authentication
^^^^^^^^^^^^^^

The available authentication methods are the following:

-  :ref:`IAM roles <iam_roles>`
-  :ref:`Profiles <aws_profile>`

These authentication methods require using the ``/root/.aws/credentials`` file to provide credentials. You can find more information in the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section.

The available authentication configuration parameters are the following:

-  ``<aws_profile>``: A valid profile name from a shared credentials file or AWS config file with permission to read logs from the bucket.
-  ``<iam_role_arn>``: Amazon Resource Name (ARN) for the corresponding IAM role to assume.
-  Optional – ``<iam_role_duration>``: The session duration in seconds.
-  Optional – ``<sts_endpoint>``: The URL of the VPC endpoint of the AWS Security Token Service.

Configure Wazuh to process logs from Custom Logs Buckets
--------------------------------------------------------

.. warning::

   Every message sent to the queue is read and deleted. Make sure you only use the queue for bucket notifications.

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.
#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Configure the ``<subscriber type="buckets">`` section with your SQS queue name and the required :ref:`configuration parameters <custom_logs_buckets_configuration_parameters>` for the buckets service. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<subscriber>`` section to it. For example:

   .. code-block:: xml
      :emphasize-lines: 6,7

      <wodle name="aws-s3">
          <disabled>no</disabled>
          <interval>1h</interval>
          <run_on_start>yes</run_on_start>
          <subscriber type="buckets">
              <sqs_name><SQS_NAME></sqs_name>
              <aws_profile>default</aws_profile>
          </subscriber>
      </wodle>

   Check the :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` reference manual to learn more about the available settings.

   .. note::

      The number of notifications in the queue affects the execution time of the Wazuh module for AWS. If the ``<interval>`` value for the waiting time between executions is too short, the :ref:`interval overtaken <interval_overtaken_message>` warning is logged into the ``/var/ossec/logs/ossec.log`` file.

#. Save the changes and restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Visualize events on the Wazuh dashboard
---------------------------------------

Go to **Explore** > **Discover**, select the ``wazuh-events-v5*`` index pattern, and filter by ``wazuh.integration.name:aws and not event.kind:*``. This filter shows the AWS events that no decoder parsed, including your custom logs. Expand an event and check ``event.original`` to see the log, its S3 bucket, and its file.

.. thumbnail:: /images/cloud-security/aws/custom-logs-buckets/1-custom-logs-buckets-events.png
   :title: Custom Logs Buckets events on the Wazuh dashboard
   :alt: Custom Logs Buckets events on the Wazuh dashboard
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/custom-logs-buckets/2-custom-logs-buckets-events.png
   :title: Custom Logs Buckets event details with the event.original field
   :alt: Custom Logs Buckets event details with the event.original field
   :align: center
   :width: 80%
