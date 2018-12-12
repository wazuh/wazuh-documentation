.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_integration:

Installation
============

.. meta::
  :description: Learn how to install and configure the Wazuh module to monitor Amazon instances and services.

Prior to enabling the Wazuh rules for Amazon Web Services, follow the steps below to configure AWS to generate log messages, and store them as JSON data files in an Amazon S3 bucket. A detailed description of each of the steps can be found bellow.

.. note::

        The integration with AWS S3 can be done at the Wazuh manager (which also behaves as an agent) or directly at a Wazuh agent. This choice merely depends on how you decide to access your AWS infrastructure in your environment.

Requirements
-------------
- AWS
- Wazuh >= 3.6
- Python >= 2.7
- Pip
- Boto3

Storing AWS logs on S3
----------------------
Depending on the AWS service to be monitored, the necessary steps to follow are different.

.. note::
    Bucket encryption and all types of compression are supported, except ``Snappy``.

CloudTrail
^^^^^^^^^^

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


VPC Flow
^^^^^^^^

1. Go to Services > Storage > S3:

.. thumbnail:: ../images/aws/aws-create-firehose-1.png
    :align: center
    :width: 100%

2. Click on the *Create bucket*:

.. thumbnail:: ../images/aws/aws-create-firehose-2.png
    :align: center
    :width: 100%

3. Create a new bucket, giving it a name and clicking on the *Create* button. Don't forget to save its Bucket ARN, you'll need it later in the process:

.. thumbnail:: ../images/aws/aws-create-firehose-3.png
    :align: center
    :width: 50%

4. Go to Services > Compute > EC2:

.. thumbnail:: ../images/aws/aws-create-vpc-1.png
    :align: center
    :width: 100%

5. Go to Network & Security > Network Interfaces on the left menu. Select a network interface and select *Create a flow log* on the *Actions* menu:

.. thumbnail:: ../images/aws/aws-create-vpc-2.png
    :align: center
    :width: 100%

6. Change all fields to look like the following screenshot and paste the ARN of the previously created bucket:

.. thumbnail:: ../images/aws/aws-create-vpc-3.png
    :align: center
    :width: 100%


Other AWS Services (Guard Duty, Macie and IAM)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This section explains how to get logs from Guard Duty, Macie and IAM.

1. Go to Services > Storage > S3:

.. thumbnail:: ../images/aws/aws-create-firehose-1.png
    :align: center
    :width: 100%

2. Click on the *Create bucket*:

.. thumbnail:: ../images/aws/aws-create-firehose-2.png
    :align: center
    :width: 100%

3. Create a new bucket, giving it a name and clicking on the *Create* button:

.. thumbnail:: ../images/aws/aws-create-firehose-3.png
    :align: center
    :width: 50%

4. Go to Services > Analytics > Kinesis:

.. thumbnail:: ../images/aws/aws-create-firehose-4.png
    :align: center
    :width: 100%

4.1. If it's the first time you're using this service, you'll see the following screen. Just click on *Get started*:

.. thumbnail:: ../images/aws/aws-create-firehose-4.1.png
    :align: center
    :width: 100%

5. Click on *Create delivery stream* button:

.. thumbnail:: ../images/aws/aws-create-firehose-5.png
    :align: center
    :width: 100%

6. Put a name to your delivery stream and click on the *Next* button at the bottom of the page:

.. thumbnail:: ../images/aws/aws-create-firehose-6.png
    :align: center
    :width: 100%

7. On the next page, leave both options as *Disabled* and click on *Next*:

.. thumbnail:: ../images/aws/aws-create-firehose-7.png
    :align: center
    :width: 100%

8. Select *Amazon S3* as destination, then select the previously created S3 bucket and add a prefix where logs will be stored. AWS Firehose creates a file structure *YYYY/MM/DD/HH*, if a prefix is used the created file structure would be *firehose/YYYY/MM/DD/HH*. If a prefix is used it must be specified under the Wazuh Bucket configuration:

.. thumbnail:: ../images/aws/aws-create-firehose-8.png
    :align: center
    :width: 100%

9. You can select which compression do your prefer. Wazuh supports any kind of compression but Snappy. After that, click on *Create new or choose*:

.. thumbnail:: ../images/aws/aws-create-firehose-9.png
    :align: center
    :width: 100%

10. Give a proper name to the role and click on the *Allow* button:

.. thumbnail:: ../images/aws/aws-create-firehose-10.png
    :align: center
    :width: 100%

11. The following page is just a summary about the Firehose stream created, go to the bottom of the page and click on the *Create delivery stream* button:

.. thumbnail:: ../images/aws/aws-create-firehose-11.png
    :align: center
    :width: 100%

12. Go to Services > Management Tools > CloudWatch:

.. thumbnail:: ../images/aws/aws-create-firehose-12.png
    :align: center
    :width: 100%

13. Select *Rules* on the left menu and click on the *Create rule* button:

.. thumbnail:: ../images/aws/aws-create-firehose-13.png
    :align: center
    :width: 100%

14. Select which service do you want to get logs from using the *Service name* slider, then, click on the *Add target* button and add the previously created Firehose delivery stream there. Also, create a new role to access the delivery stream:

.. thumbnail:: ../images/aws/aws-create-firehose-14.png
    :align: center
    :width: 100%

15. Give the rule some name and click on the *Create rule* button:

.. thumbnail:: ../images/aws/aws-create-firehose-15.png
    :align: center
    :width: 100%

16. Once the rule is created, data will start to be sent to the previously created S3 bucket. Remember to first enable the service you want to monitor, otherwise you won't get any data.


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

    <wodle name="aws-s3">
      <disabled>no</disabled>
      <interval>10m</interval>
      <run_on_start>no</run_on_start>
      <skip_on_error>no</skip_on_error>
      <bucket type="cloudtrail">
        <name>wazuh-cloudtrail</name>
        <access_key>insert_access_key</access_key>
        <secret_key>insert_secret_key</secret_key>
      </bucket>
    </wodle>

To monitor logs for multiple AWS accounts, configure multiple ``<bucket>`` options within the ``aws-s3`` wodle. Bucket tags must have a ``type`` attribute which value can be ``cloudtrail`` to monitor CloudTrail logs or ``custom`` to monitor any other type of logs, for example, Firehose ones.

*Check the user manual reference to read more details about each setting:* :doc:`AWS S3 settings <../user-manual/reference/ossec-conf/wodle-s3>`

3. Restart your Wazuh system to apply the changes:

  * If you're configuring a Wazuh manager:

    a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-manager

    b. For SysV Init:

      .. code-block:: console

        # service wazuh-manager restart

  * If you're configuring a Wazuh agent:

    a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-agent

    b. For SysV Init:

      .. code-block:: console

        # service wazuh-agent restart

Authenticating options
----------------------

Credentials can be loaded from different locations, you can either specify the credentials as they are in the previous block of configuration, assume an IAM role, or load them from other `Boto3 supported locations. <http://boto3.readthedocs.io/en/latest/guide/configuration.html#configuring-credentials>`_.

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


Considerations for configuration
--------------------------------

Filtering
^^^^^^^^^
If the S3 bucket contains a long history of logs and its directory structure is organized by dates, it's possible to filter which logs will be read by Wazuh. There are multiple configuration options to do so:

* ``only_logs_after``: Allows filtering logs produced after a given date. The date format must be YYYY-MMM-DD, for example, 2018-AUG-21 would filter logs produced after the 21th of August 2018 (that day included).
* ``aws_account_id``: **This option will only work on CloudTrail buckets**. If you have logs from multiple accounts, you can filter which ones will be read by Wazuh. You can specify multiple ids separating them by commas.
* ``regions``: **This option will only work on CloudTrail buckets**. If you have logs from multiple regions, you can filter which ones will be read by Wazuh. You can specify multiple regions separating them by commas.
* ``path``: If you have your logs stored in a given path, it can be specified using this option. For example, to read logs stored in directory ``vpclogs/`` the path ``vpclogs`` need to be specified. It can also be specified with ``/`` or ``\``.

Older logs
^^^^^^^^^^

The aws-cloudtrail wodle only looks for new logs based upon the key for last processed log object, which includes the datetime stamp.  If older logs are loaded into the S3 bucket or the ``only_logs_after`` option date is set to a datetime earlier than previous executions of the wodle, the older log files will be ignored and not ingested into Wazuh.
