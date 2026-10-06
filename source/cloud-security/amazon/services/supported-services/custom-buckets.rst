.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure Custom Logs Buckets to integrate with Wazuh.

Custom Logs Buckets
===================

`Amazon Simple Queue Service (Amazon SQS) <https://aws.amazon.com/sqs/>`__ is a fully managed message queuing service. It offers secure, durable, and available hosted queues to decouple and scale software systems and components. It allows sending, storing, and receiving messages between software components at any volume, without losing messages or requiring other services to be available. These features make it an optimal component to associate with Amazon S3 buckets to consume any type of log.

Combining Amazon SQS with Amazon S3 buckets allows Wazuh to collect JSON, CSV, and plain text logs from any custom path. The origin of these logs don't even need to be AWS.

.. note::

   To properly process CSV logs, they must include column headers.

To set up the Wazuh integration for Custom Logs Buckets, you need to do the following:

#. Create an AWS SQS Queue.
#. Configure an S3 bucket. For every object creation event, the bucket sends notifications to the queue.

.. _amazon_custom_logs_configuration:

AWS configuration
-----------------

The following sections cover how to configure Custom Logs Buckets to integrate with Wazuh.

.. _sqs_custom_configuration:

Amazon Simple Queue Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Set up a *Standard* type SQS Queue with the default configurations. You can apply an Access Policy similar to the following example, where ``<REGION>``, ``<ACCOUNT_ID>``, ``<SQS-NAME>``, and ``<S3-BUCKET>`` are the region, account ID, the SQS Queue name, and the name you are going to provide to the S3 bucket.

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
          "Resource": "arn:aws:sqs:<REGION>:<ACCOUNT_ID>:<SQS-NAME>",
          "Condition": {
            "StringEquals": {
              "aws:SourceAccount": "<ACCOUNT_ID>"
            },
            "ArnLike": {
              "aws:SourceArn": "arn:aws:s3:*:*:<S3-BUCKET>"
            }
          }
        }
      ]
      }

You can make your access policy to accept S3 notifications from different account IDs and to apply different conditions. More information in `Managing access in Amazon SQS <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-overview-of-managing-access.html>`__.

Amazon S3 and Event Notifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To configure an S3 bucket that reports creation events, do the following.

#. Configure an S3 bucket as defined in the :doc:`configuring an S3 bucket <../prerequisites/S3-bucket>` section. Provide the name you decided in the previous section.
#. Once created, go to **Event notifications** inside the **Properties** tab. Select **Create event notification**.
#. In **Event Types**, select **All object create events**. This generates notifications for any type of event that results in the creation of an object in the bucket.
#. In the **Destination section**, select the following options:

   -  **SQS queue**
   -  **Choose from your SQS queues**

#. Choose the queue you created previously.

.. _custom_logs_buckets_configuration_parameters:

Configuration parameters
------------------------

Configure the following fields to set the queue and authentication configuration. For more information, check the :ref:`subscribers <subscribers>` reference.

Queue
^^^^^

-  ``<sqs_name>``: The name of the queue.
-  ``<service_endpoint>`` – *Optional*: The AWS S3 endpoint URL for data downloading from the bucket. Check :ref:`using_non-default_aws_endpoints` for more information about VPC and FIPS endpoints.

Authentication
^^^^^^^^^^^^^^

The available authentication methods are the following:

-  :ref:`IAM roles <iam_roles>`
-  :ref:`Profiles <aws_profile>`

These authentication methods require using the ``/root/.aws/credentials`` file to provide credentials. You can find more information in :doc:`configuring AWS credentials <../prerequisites/credentials>`.

The available authentication configuration parameters are the following:

-  ``<aws_profile>``: A valid profile name from a :ref:`Shared Credential File <aws_profile>` or `AWS Config File <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#using-a-configuration-file>`__ with `permission to read logs from the bucket <https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-with-s3-actions.html>`__.
-  ``<iam_role_arn>``: Amazon Resource Name (ARN) for the corresponding IAM role to assume.
-  ``<iam_role_duration>`` – *Optional*: The session duration in seconds.
-  ``<sts_endpoint>`` – *Optional*: The URL of the VPC endpoint of the AWS Security Token Service.

Configure Wazuh to process logs from Custom Logs Buckets
--------------------------------------------------------

.. warning::

   Every message sent to the queue is read and deleted. Make sure you only use the queue for bucket notifications.

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/custom-logs-buckets/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/custom-logs-buckets/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the SQS name and your :ref:`configuration parameters <custom_logs_buckets_configuration_parameters>` for the buckets service. Set this inside ``<subscriber type="buckets">``. For example:

   .. code-block:: xml
      :emphasize-lines: 6, 7

      <wodle name="aws-s3">
          <disabled>no</disabled>
          <interval>1h</interval>
          <run_on_start>yes</run_on_start>
          <subscriber type="buckets">
              <sqs_name>sqs-queue</sqs_name>
              <aws_profile>default</aws_profile>
          </subscriber>
      </wodle>

   Check the :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` reference manual to learn more about the available settings.

.. note::

   The amount of notifications present in the queue affects the execution time of the Wazuh module for AWS. If the ``<interval>`` value for the waiting time between executions is too short, the :ref:`interval overtaken <interval_overtaken_message>` warning is logged into the ``/var/ossec/logs/ossec.log`` file.

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh dashboard:

   -  Wazuh manager:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent
