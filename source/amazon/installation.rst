.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_integration:

Installation
============

Prior to enabling the Wazuh rules for Amazon Web Services, follow the steps below to configure AWS to generate log messages, and store them as JSON data files in an Amazon S3 bucket. A detailed description of each of the steps can be found below.

.. note::

        The integration with AWS Cloudtrail can be done at the Wazuh manager (which also behaves as an agent) or directly at a Wazuh agent. This choice merely depends on how you decide to access your AWS infrastructure in your environment.

Requirements
-------------
- AWS CloudTrail
- Wazuh >= 3.2
- Python >= 2.7
- Pip
- Boto3

Subscribe to CloudTrail
-----------------------

1. From your AWS console, choose “CloudTrail” from the Deployment & Management section:

.. thumbnail:: ../images/aws/aws-cloudtrail-1.png
    :align: center
    :width: 100%

2. Create a new trail:

.. thumbnail:: ../images/aws/aws-cloudtrail-2.png
    :align: center
    :width: 100%

3. Provide a name for the new S3 bucket that will be used to store the CloudTrail logs (remember the name you provide here, you’ll need to reference it during plugin setup):

.. thumbnail:: ../images/aws/aws-cloudtrail-3.png
    :align: center
    :width: 100%

Create an IAM User
------------------

Wazuh will need a user with permissions to pull the CloudTrail log data from your S3 bucket. The easiest way to accomplish this is by creating a new IAM user for your account. We will only allow it to read data from the S3 bucket.

1. Create new user:

Navigate to Services > IAM > Users

.. thumbnail:: ../images/aws/aws-user.png
    :align: center
    :width: 100%

Click on "Next: Permissions" to continue.

2. Create policy:

We will attach this policy later to the user we are creating.

.. thumbnail:: ../images/aws/aws-create-policy.png
    :align: center
    :width: 100%

Check that your new policy looks like this:

.. thumbnail:: ../images/aws/aws-summary-policy.png
    :align: center
    :width: 100%

Raw output for the example policy:

.. code-block:: json

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket",
                   "s3:DeleteObject"
               ],
               "Resource": [
                   "arn:aws:s3:::wazuh-cloudtrail",
                   "arn:aws:s3:::wazuh-cloudtrail/*"
               ]
           }
       ]
   }

.. note::

        The s3:DeleteObject action is only required if the CloudTrail logs will be removed from the S3 bucket by the wodle.


3. Attach policy:

.. thumbnail:: ../images/aws/aws-attach-policy.png
    :align: center
    :width: 100%

4. Confirm user creation and get credentials:

.. thumbnail:: ../images/aws/aws-summary-user.png
    :align: center
    :width: 100%

Save the credentials, you will use them later to configure the module.

Installing dependencies
-----------------------

Python Boto3 module is required on the system running the Wazuh module to pull AWS events. This will usually be one of your agents (or your manager).

Pip
^^^

Pip can be used as Python package manager to install the required module. In order to use it, we will start installing this tool.

a) CentOS/RHEL/Fedora:

.. code-block:: console

    # yum install python-pip

b) Debian/Ubuntu:

.. code-block:: console

    # apt-get update && apt-get install python-pip

c) From sources:

.. code-block:: console

    # curl -O https://bootstrap.pypa.io/get-pip.py
    # python get-pip.py

.. _Boto3:

Boto3
^^^^^^

Boto3 is the official package supported by Amazon to manage AWS resources. It will be used to download the log messages from the S3 Bucket.

.. code-block:: console

    # pip install boto3

Plugin configuration
--------------------

1. Open Wazuh configuration file:

.. code-block:: console

    # vi /var/ossec/etc/ossec.conf

2. Add the following block of configuration to enable the integration, enter the AWS IAM User credentials you created before and the AWS Account ID of the CloudTrail logs to be processed:

.. code-block:: xml


    <wodle name="aws-cloudtrail">
      <disabled>no</disabled>
      <interval>10m</interval>
      <run_on_start>no</run_on_start>
      <error_not_skip><error_not_skip>
      <cloudtrail>
        <bucket>wazuh-cloudtrail</bucket>
        <access_key>insert_access_key</access_key>
        <secret_key>insert_secret_key</secret_key>
        <aws_account_id>insert_account_id</aws_account_id>
      </cloudtrail>
    </wodle>

To monitor CloudTrail logs for multiple AWS accounts, configure multiple <cloudtrail> options within the aws-cloudtrail wodle

*Check the user manual reference to read more details about each setting:* :doc:`AWS CloudTrail settings <../user-manual/reference/ossec-conf/wodle-cloudtrail>`

.. note::

        Credentials can be loaded from different locations, you can either specify the credentials as they are in the previous block of configuration, assume an IAM role, or load them from other `Boto3 supported locations. <http://boto3.readthedocs.io/en/latest/guide/configuration.html#configuring-credentials>`_ (including the use of profiles)

3. Restart your Wazuh system to apply the changes:

.. code-block:: console

    # /var/ossec/bin/ossec-control restart

Considerations for configuration
--------------------------------

- If the S3 bucket contains a long history of CloudTrail logs, and it is not desired to ingest these old logs into Wazuh, it is recommended to configure the only_logs_after option to skip the older logs on initial execution.
- The aws-cloudtrail wodle only looks for new logs based upon the key for last processed log object, which includes the datetime stamp.  If older logs are loaded into the S3 bucket or the only_logs_after option date is set to a datetime earlier than previous executions of the wodle, the older log files will be ignored and not ingested into Wazuh.





