.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to configure Amazon Custom Logs Buckets fetching.

.. _amazon_custom_logs:

Custom Logs Buckets
===================

.. versionadded:: 4.6.0

`Amazon Simple Queue Service (Amazon SQS)  <https://aws.amazon.com/sqs/>`_ is a fully managed message queuing service that offers secure, durable, and available hosted queues to decouple and scale software systems and components.
It allows sending, storing, and receiving messages between software components at any volume, without losing messages or requiring other services to be available. These features make it an optimal component to associate with Amazon S3 Buckets to consume any type of log.

Combining Amazon SQS with Amazon S3 buckets, allows Wazuh to fetch any JSON, CSV or plain text logs, originated in AWS or not, and process the events inside them.

.. note::
  It is a precondition of the module for the CSV logs to have the corresponding column headers to be properly processed.

To set up the Wazuh integration for Custom Logs Buckets, you need to do the following:

    #. Create an AWS SQS Queue.
    #. Configure an S3 bucket to send notifications to the queue for every object creation event.

AWS configuration
-----------------

Amazon Simple Queue Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Set up a **Standard** type SQS Queue with the default configurations and apply the following **Access Policy**:

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

  
.. note::
     This is an example Access Policy. It can be modified to accept S3 notifications from different ``<account-id>`` values or to apply different conditions. More information `here <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-overview-of-managing-access.html>`_. 

Amazon S3 and Event Notifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The steps to have an S3 bucket reporting creation events are:

#. Configure an S3 bucket as defined in the :ref:`Configuring an S3 Bucket <s3_bucket>` section with the name provided in the previous section.
#. Once created, go to **Event notifications** and select **Create event notification**. 
#. In **Event Types**, select **All object create events**. This will generate notifications for any type of event that results in the creation of an object in the bucket.
#. In the **Destination** section, select **SQS queue** and **Choose from your SQS queues**, choosing the created queue in the previous step.


Wazuh Configuration
-------------------

Buckets Subscriber section in ossec.conf 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Set the configuration inside the section ``<subscriber type="buckets">``. You can find this tag inside the ``<wodle name="aws-s3">`` section of the ``/var/ossec/etc/ossec.conf`` file.

.. code-block:: xml

        <wodle name="aws-s3">
            <disabled>no</disabled>
            <interval>1h</interval>
            <run_on_start>yes</run_on_start>
            <subscriber type="buckets">
                <sqs_name>sqs-queue</sqs_name>
                <aws_profile>profile</aws_profile>
                <iam_role_arn>arn:aws:iam::example</iam_role_arn>
                <iam_role_duration>1300</iam_role_duration> 
                <discard_regex field="field">REGEX</discard_regex>
                <sts_endpoint>sts-endpoint-IAM</sts_endpoint>
                <service_endpoint>s3.region.amazonaws.com</service_endpoint>
            </subscriber>
        </wodle>

After setting the required parameters, restart the Wazuh manager to apply the changes:

.. include:: /_templates/common/restart_manager.rst
Please note that the module's time of execution varies depending on the number of notifications present in the queue. If the ``<interval>`` value is less than the required time of execution, the :ref:`Interval overtaken<interval_overtaken_message>` message will be displayed in the ``ossec.log`` file.

   .. warning::
      
      Every message sent to the queue will be read and deleted, make sure that the queue is only used for bucket notifications.

Parameters
^^^^^^^^^^

The following fields inside the section allow you to configure the queue and authenticate:

Queue configuration
~~~~~~~~~~~~~~~~~~~

*   ``<sqs_name>`` : The name of the queue.
*   ``<service_endpoint>``- Optional: The AWS S3 endpoint URL to be used to download the data from the bucket. Check :ref:`Considerations for configuration <amazon_considerations>` for more information about VPC and FIPS endpoints.

Authentication
~~~~~~~~~~~~~~

The available authentication methods are :ref:`IAM Roles <iam_roles>` or  :ref:`Profiles <aws_profile>`.

*   ``<profile>``: A valid profile name from a Shared Credential File or AWS Config File with the permission to read logs from the bucket.
*   ``<iam_role_arn>``: ARN for the corresponding IAM role to assume.
*   ``<iam_role_duration>`` - Optional: The session duration in seconds.
*   ``<sts_endpoint>`` - Optional: The URL of the VPC endpoint of the AWS Security Token Service.

    .. note::
        This authentication method requires adding credentials to the configuration using the ``/root/.aws/credentials`` file.



More information about the different authentication methods can be found in the :ref:`Configuring AWS credentials <amazon_credentials>` documentation.
