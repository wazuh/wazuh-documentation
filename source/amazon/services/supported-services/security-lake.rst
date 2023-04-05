.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to configure Amazon Security Lake.

.. _amazon_security_lake:

Amazon Security Lake
=========================

.. versionadded:: 4.5.0


Amazon Security Lake is a fully-managed security data lake service that consolidates data from multiple AWS and other services optimizing storage costs and performance at scale.

All logs in Amazon Security Lake use the Open Cybersecurity Schema Framework (OCSF) standard for the formatting. You can use the Wazuh integration for Amazon Security Lake to ingest security events from AWS services.

These events are available as multi-event Apache Parquet objects in an S3 bucket. Each object has a corresponding SQS notification, once it's ready for download.

Wazuh periodically checks for new SQS notifications, downloads new objects, converts the files from Parquet to JSON and indexes each event into the Wazuh indexer.
To set up the Wazuh integration for Amazon Security Lake as a subscriber, you need to do the following:

    #. Create a subscriber in Amazon Security Lake.
    #. Set up the Wazuh integration for Amazon Security Lake.

AWS configuration
-----------------

Enabling Amazon Security Lake
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you haven't already, ensure that you have enabled Amazon Security Lake by following the instructions at `Getting started - Amazon Security Lake <https://docs.aws.amazon.com/security-lake/latest/userguide/getting-started.html#enable-service>`_ .

For multiple AWS accounts, we strongly encourage you to use AWS Organizations and to set up Amazon Security Lake at the Organization level.


Creating a Subscriber in Amazon Security Lake
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After completing all required AWS prerequisites, configure a subscriber for Amazon Security Lake via the AWS console. This creates the resources you need to make the Amazon Security Lake events available for consumption into your Wazuh platform deployment.

Setting up a subscriber in the AWS Console
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Logging in and navigating
~~~~~~~~~~~~~~~~~~~~~~~~~

#. Log into your AWS console and navigate to **Security Lake**.
#. Navigate to Subscribers, and click **Create subscriber** to get to the Create subscriber page.


Creating a subscriber
~~~~~~~~~~~~~~~~~~~~~

#. Create a descriptive name for your subscriber. For example, Wazuh.
#. Choose to either collect all log and event sources, or only specific log and event sources.
#. Select S3 as your data access method.
#. Enter the *AWS account ID* for the account you are currently logged into.
#. Enter a placeholder value in **External ID**. For example, *placeholder-ta-value*. While Wazuh doesn't need an External ID for Amazon Security Lake, you still have to populate the field when creating a subscriber.
#. Under **Notification details** select SQS queue.
#. Click the **Create** button to get to the Subscribers pages.

Reviewing the subscriber
~~~~~~~~~~~~~~~~~~~~~~~~

#. Navigate to **My subscribers** section, and click on your newly created subscriber to get to the Subscriber Details page.
#. Check that AWS created the subscriber with the correct parameters.
#. Save the *SQS queue name*. You need the name of the Subscription endpoint for later on, when verifying the information in the SQS queue.

Verifying information in SQS Queue
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow these steps in your Amazon deployment to verify the information for the SQS Queue that Security Lake creates.

#. In your AWS console, navigate to the **Amazon Simple Queue Service**.
#. In the **Queues** section, navigate to the queue that Security Lake created. Click on its name.
#. In the information page for the queue, click on the **Monitoring** tab. Verify that events are flowing in by looking at the *Approximate Number Of Messages Visible* graph and confirming the number is increasing.

Verifying events are flowing into S3 bucket
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow these steps in your Amazon deployment to verify that parquet events are flowing into your configured S3 buckets.

#. In your AWS console, navigate to the Amazon S3 service.
#. Navigate to the **Buckets** section, and click on the S3 bucket name that Security Lake created for each applicable region. These bucket names start with the prefix *aws-security-data-lake* .
#. In each applicable bucket, navigate to the **Objects** tab. Click through the directories to verify that Security Lake has available events flowing into the S3 bucket. Check that new files with the ``.gz.parquet`` extension appear.
    - If you enabled Security Lake on more than one AWS account, check if you see each applicable account number listed. Check that parquet files exist inside each account.
#. In each applicable S3 bucket, navigate to the **Properties** tab and verify in the **Event notifications** section that the data destination is the Security Lake SQS queue.


Wazuh configuration
-------------------

Dependencies
^^^^^^^^^^^^

PyArrow is a Python package that allows for efficient manipulation of data, particularly Parquet files. Security lake creates Parquet files in the AWS S3 Buckets. PyArrow is useful to read these files containing the events.
To install the dependency, execute the following command:

.. code-block:: console

  $ <WAZUH_PATH>/framework/python/bin/pip3 install pyarrow==11.0.0


Security Lake section in ossec.conf 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Set the configuration inside the section ``<subscriber type="security_lake">``. You can find this tag inside the ``<wodle name="aws-s3">`` section of the ``ossec.conf`` file.

.. code-block:: xml

        <wodle name="aws-s3">
            <disabled>no</disabled>
            <interval>1h</interval>
            <run_on_start>yes</run_on_start>
            <subscriber type="security_lake">
                <sqs_name>sqs-security-lake-main-queue</sqs_name>
                <iam_role_arn>arn:aws:iam::account-id:role/ASL-Role</iam_role_arn>
                <iam_role_duration>1300</iam_role_duration>
                <aws_profile>user_profile</aws_profile>
                <sts_endpoint>sts-endpoint-IAM</sts_endpoint>
                <service_endpoint>s3-vpc-endpoint</service_endpoint>     
            </subscriber>
        </wodle>


After setting the required parameters, restart Wazuh in order to apply the changes with the following command:

.. code-block:: console

    $ systemctl restart wazuh-manager

Please note that the module's time of execution varies depending on the number of notifications present in the queue.


Parameters
^^^^^^^^^^

The following fields inside the section allow you to configure the queue and authenticate:

Queue configuration
~~~~~~~~~~~~~~~~~~~

*   ``<sqs_name>`` : The name of the queue
*   ``<service_endpoint>``- Optional: The AWS S3 endpoint URL to be used to download the data from the bucket. Check :ref:`Considerations for configuration <amazon_considerations>` for more information about VPC and FIPS endpoints.

Authentication
~~~~~~~~~~~~~~

There are two ways to set the authentication for the lake:

Using an IAM role (recommended):
""""""""""""""""""""""""""""""""

*   ``<iam_role_arn>``: ARN for the corresponding IAM role to assume.
*   ``<iam_role_duration>`` – Optional: The session duration in seconds.
*   ``<sts_endpoint>`` – Optional: The URL of the VPC endpoint of the AWS Security Token Service.

    .. note::
        Note: This authentication method requires some credentials to be previously added to the configuration using any other authentication method, e.g. using the ``/root/.aws/credentials`` file.

Configuring an IAM role
"""""""""""""""""""""""

If you choose to authenticate using IAM, you must perform the following modifications to the IAM role:

Configuring the role

#. Follow these steps to modify the Security Lake subscriber role. You have to associate an existing user with the role.
#. In your AWS console, navigate to the Amazon IAM service.
#. In your Amazon IAM service, navigate to the Roles page.
#. In the Roles page, select the Role name of the subscription role notification that was created as part of the Security Lake subscriber provisioning process.
#. In the Summary page, navigate to the Trust relationships tab to modify the Trusted entity policy.
#. Modify the Trusted entity policy with the following updates:
#. Remove any reference to the External ID that was created during the Security Lake subscriber provisioning process.
#. In the stanza containing the ARN, attach the username from your target user account to the end of the ARN. This step connects a user to the role. It lets you configure the Security Lake service with the secret access key. See the following example Trust entity:

    .. code-block:: JSON

        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "1",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "arn:aws:iam::<account-id>:user/<user-account>"
                    },
                    "Action": "sts:AssumeRole"
                }
            ]
        }


Granting a user permissions to switch roles
"""""""""""""""""""""""""""""""""""""""""""

Follow these steps to configure the user permissions:

#. In your Amazon IAM service, navigate to the Users page.
#. In the Users page, select the Username of the user you have connected to the role.
#. Add the following permission to switch to the new roles:

    .. code-block:: JSON

        {
            "Version": "2012-10-17",
            "Statement": [
                {
                "Sid": "VisualEditor1",
                "Effect": "Allow",
                "Action": "sts:AssumeRole",
                "Resource": "arn:aws:iam::<account-id>:role/<resource>"
                }
            ]
        }

Using a profile (optional)
""""""""""""""""""""""""""

*   ``<aws_profile>``: The name of credential profile to use

More information about the different authentication methods can be found: :ref:`Configuring AWS credentials <amazon_credentials>`.



