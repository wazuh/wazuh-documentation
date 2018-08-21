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


Authenticating options
----------------------

There are multiple authenticating methods that can be used:

Environment variables
^^^^^^^^^^^^^^^^^^^^^

If you're using a single AWS account for all your buckets this could be the most suitable option for you. You just have to define the following environment variables:

* ``AWS_ACCESS_KEY_ID``
* ``AWS_SECRET_ACCESS_KEY``

Profiles
^^^^^^^^

You can define profiles in your credentials file (``~/.aws/credentials``) and specify those profiles on the bucket configuration. 

For example, the following credentials file defines three different profiles: *default*, *dev* and *prod*.

.. code-block:: ini

    [default]
    aws_access_key_id=foo
    aws_secret_access_key=bar

    [dev]
    aws_access_key_id=foo2
    aws_secret_access_key=bar2

    [prod]
    aws_access_key_id=foo3
    aws_secret_access_key=bar3


To use the *prod* profile in the AWS integration you would use the following bucket configuration:

.. code-block:: xml

    <bucket type="cloudtrail">
      <name>my-bucket</name>
      <aws_profile>prod</aws_profile>
   </bucket>


IAM Roles
^^^^^^^^^

.. warning::
    This authentication method requires some credentials to be previously added to the configuration using any other authentication method.

IAM Roles can also be used to access the S3 bucket. Follow these steps to create one:

1. Go to Services > Security, Identity & Compliance > IAM.

.. thumbnail:: ../images/aws/aws-create-role-1.png
    :align: center
    :width: 100%

2. Select Roles in the right menu and click on the *Create role* button:

.. thumbnail:: ../images/aws/aws-create-role-2.png
    :align: center
    :width: 100%

3. Select S3 service and click on *Next: Permissions* button:

.. thumbnail:: ../images/aws/aws-create-role-4.png
    :align: center
    :width: 100%

4. Select the previously created policy:

.. thumbnail:: ../images/aws/aws-create-role-5.png
    :align: center
    :width: 100%

5. Click on *Create role* button:

.. thumbnail:: ../images/aws/aws-create-role-6.png
    :align: center
    :width: 100%

6. Access to role summay and click on its policy name:

.. thumbnail:: ../images/aws/aws-create-role-7.png
    :align: center
    :width: 100%

7. Add permissions so the new role can do *sts:AssumeRole* action:

.. thumbnail:: ../images/aws/aws-create-role-8.png
    :align: center
    :width: 100%

8. Come back to the role's summary, go to *Trust relationships* tab and click on *Edit trust relationship* button:

.. thumbnail:: ../images/aws/aws-create-role-9.png
    :align: center
    :width: 100%

9. Add your user to the *Principal* tag and click on *Update Trust Policy* button:

.. thumbnail:: ../images/aws/aws-create-role-10.png
    :align: center
    :width: 100%


Once your role is created, just paste it on the bucket configuration:

.. code-block:: xml

    <bucket type="cloudtrail">
      <name>my-bucket</name>
      <access_key>xxxxxx</access_key>
      <secret_key>xxxxxx</secret_key>
      <iam_role_arn>arn:aws:iam::xxxxxxxxxxx:role/wazuh-role</iam_role_arn>
   </bucket>

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





