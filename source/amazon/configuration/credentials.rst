.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_credentials:

Configuring AWS credentials
===========================

Create an IAM User
------------------

Wazuh will need a user with permissions to pull the CloudTrail log data from your S3 bucket. The easiest way to accomplish this is by creating a new IAM user for your account. We will only allow it to read data from the S3 bucket.

1. Create new user:

Navigate to Services > IAM > Users

.. thumbnail:: ../../images/aws/aws-user.png
  :align: center
  :width: 100%

Click on "Next: Permissions" to continue.

2. Create policy:

We will attach this policy later to the user we are creating.

.. thumbnail:: ../../images/aws/aws-create-policy.png
  :align: center
  :width: 100%

Check that your new policy looks like this:

.. thumbnail:: ../../images/aws/aws-summary-policy.png
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

.. thumbnail:: ../../images/aws/aws-attach-policy.png
  :align: center
  :width: 100%

4. Confirm user creation and get credentials:

.. thumbnail:: ../../images/aws/aws-summary-user.png
  :align: center
  :width: 100%

Save the credentials, you will use them later to configure the module.

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

.. thumbnail:: ../../images/aws/aws-create-role-1.png
    :align: center
    :width: 100%

2. Select Roles in the right menu and click on the *Create role* button:

.. thumbnail:: ../../images/aws/aws-create-role-2.png
    :align: center
    :width: 100%

3. Select S3 service and click on *Next: Permissions* button:

.. thumbnail:: ../../images/aws/aws-create-role-4.png
    :align: center
    :width: 100%

4. Select the previously created policy:

.. thumbnail:: ../../images/aws/aws-create-role-5.png
    :align: center
    :width: 100%

5. Click on *Create role* button:

.. thumbnail:: ../../images/aws/aws-create-role-6.png
    :align: center
    :width: 100%

6. Access to role summay and click on its policy name:

.. thumbnail:: ../../images/aws/aws-create-role-7.png
    :align: center
    :width: 100%

7. Add permissions so the new role can do *sts:AssumeRole* action:

.. thumbnail:: ../../images/aws/aws-create-role-8.png
    :align: center
    :width: 100%

8. Come back to the role's summary, go to *Trust relationships* tab and click on *Edit trust relationship* button:

.. thumbnail:: ../../images/aws/aws-create-role-9.png
    :align: center
    :width: 100%

9. Add your user to the *Principal* tag and click on *Update Trust Policy* button:

.. thumbnail:: ../../images/aws/aws-create-role-10.png
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

IAM roles for EC2 instances
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use IAM roles and assign them to EC2 instances so there's no need to insert authentication parameters on the ``ossec.conf`` file. This is the recommended configuration. Find more information about IAM roles on EC2 instances in the official `Amazon AWS documentation <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html>`_.

This is an example configuration:

.. code-block:: xml

  <bucket type="cloudtrail">
    <name>my-bucket</name>
  </bucket>
