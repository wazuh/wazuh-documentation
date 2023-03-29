.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to configure Amazon Security Lake.

.. _amazon_security_lake:

Amazon Security Lake
=========================

.. versionadded:: 4.5.0


Amazon Security Lake is a fully-managed security data lake service that allows you to centrally aggregate, manage, and use security-related log and event data at scale. All logs in Amazon Security Lake are formatted using the OCSF standard.
You can use the Wazuh integration for Amazon Security Lake to ingest security events from AWS services normalized to the Open Cybersecurity Schema Framework (OCSF) schema. These events will be made available as multi-event Apache Parquet objects in an S3 bucket. Each object will have a corresponding SQS notification, once ready for download. Wazuh will periodically check for new SQS notifications, download new objects, convert the files from Parquet to JSON and index each event into your Wazuh Indexer.


To set up Amazon Security Lake, you’ll need to:

#. Configure AWS to send data to Wazuh.
#. Set up Amazon Security Lake in Wazuh.
#. Verify the configuration.


AWS configuration
-----------------

Step 1: Enable Amazon Security Lake
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you haven’t already, ensure that you have enabled Amazon Security Lake by following the instructions at: https://docs.aws.amazon.com/security-lake/latest/userguide/getting-started.html#enable-service
If you have (or expect to have) multiple AWS accounts, we strongly encourage you to make use of AWS Organizations and to set up Amazon Security Lake at the Organization level.


Step 2: Create a Subscriber in Amazon Security Lake
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
After completing all required AWS prerequisites, configure a subscriber for Amazon Security Lake either via the AWS console or command line interface. This creates the resources needed to make the Amazon Security Lake events available to be consumed into your Wazuh platform deployment.

AWS Console steps
-----------------

1. Log into your AWS console.
2. Set up a subscriber.
    1. Navigate to Subscribers, and click Add subscribers.
    2. Click Create custom subscriber.
    3. On the Create subscriber page, fill out the details that apply to your deployment.
        1. Create a name for your subscriber.
        2. Choose to either collect all log and event sources, or only specific log and event sources.
        3. Select S3 as your data access method.
        4. Enter your subscriber credentials.
            1. Enter the Account ID from where you want to collect events.
            2. Enter a placeholder value as an External ID. External ID is not needed by Wazuh for Amazon Security Lake, but the field must be populated when creating a subscriber. For example, placeholder-ta-value.
            3. Under Notification details select SQS queue
        5. Click the Create button.
    4. On the Subscribers page, navigate to the My subscribers section, and click on your newly created subscriber.
    5. On the subscriber Details page, check to verify that the subscriber has been created with the correct parameters.


AWS Command Line Interface Steps
--------------------------------

Perform the following CLI command to create a subscriber:

.. code-block:: console

    $ aws securitylake create-subscriber --account-id <> --external-id <placeholder_text> --subscriber-name <subscriber-name> –access-types S3 --source-types awsSourceType=<"ROUTE53" or "VPC_FLOW" or "CLOUD_TRAIL" or "SH_FINDINGS">
    CLI Output: { "roleArn": "<IAM role ARN>", "s3BucketArn": "<S3 ARN>", "subscriptionId": "<subscription ID>"}


Create an SQS queue
-------------------

Perform the following CLI command to create an SQS Queue:
.. code-block:: console

  $ aws securitylake create-subscription-notification-configuration --create-sqs --subscription-id <subscription ID from above command>
  CLI Output: {"queueArn": "arn:aws:" }

.. note::

  For more information, see the create-subscriber and create-subscription-notification-configuration topics in the AWS CLI Command Reference manual.
  https://awscli.amazonaws.com/v2/documentation/api/latest/reference/securitylake/create-subscriber.html
  https://awscli.amazonaws.com/v2/documentation/api/latest/reference/securitylake/create-subscription-notification-configuration.html


Verify information in SQS Queue
-------------------------------

Perform the following steps in your Amazon deployment to verify the information in the SQS Queue that Security Lake creates.

1. In your AWS console, navigate to the Amazon SQS service.
2. In the Queues section, navigate to the SQS Queue that Security Lake created, and click on the name.
3. On the information page for the SQS Queue that Security Lake created, perform the following validation steps.
    
    1. Click on the Monitoring tab to verify that events are flowing into the SQS Queue.
    2. Click on the Dead-letter queue tab to verify that a dead-letter queue (DLQ) has been created. If a DLQ has not been created, see the Configuring a dead-letter queue (console) topic in the AWS documentation.


Verify events are flowing into S3 bucket
----------------------------------------

Perform the following steps in your Amazon deployment to verify that parquet events are flowing into your configured S3 buckets.

1. In your AWS console, navigate to the Amazon S3 service.
2. Navigate to the Buckets section, and click on the S3 bucket that Security Lake created for each applicable region.
3. In each applicable bucket, navigate to the Objects tab, and click through the directories to verify that Security Lake has available events flowing into the S3 bucket. If Security Lake is enabled on more than one AWS account, check to see if each applicable account number is listed, and that parquet files exist inside each account.
4. In each applicable S3 bucket, navigate to the Properties tab.
5. Navigate to Event notifications, and verify that the Security Lake SQS Queue that was created has event notifications turned on, and the data destination is the Security Lake SQS queue.


Wazuh configuration
-------------------

#. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following configuration block:

    .. code-block:: xml

        <wodle name="aws-s3">
            ...
            <subscriber type="security_lake">
                <sqs_name>sqs-security-lake-main-queue</sqs_name>
                <iam_role_arn>arn:aws:iam::example</iam_role_arn>
                <iam_role_duration>1300</iam_role_duration> 
                <aws_profile>user_profile</aws_profile>
            </subscriber>
        </wodle>

    

#. Restart Wazuh to apply the configuration changes.

    .. include:: /_templates/common/restart_manager.rst


