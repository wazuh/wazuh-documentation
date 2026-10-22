.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh module for AWS might require access credentials to collect log data from the different AWS services. Learn more in this section of the documentation.

Configure AWS credentials
=========================

Depending on the authentication option, the Wazuh module for AWS needs the credentials of an IAM identity to collect log data from AWS services. These credentials need to be stored in a file named ``.aws/credentials`` on the Wazuh agent.

You need to create the credentials file using the root user because the :doc:`wazuh-modulesd </user-manual/reference/daemons/wazuh-modulesd>` daemon runs with root privileges. Make sure the ``.aws/credentials`` file is saved in the home directory of the root user, so the absolute file path is ``/root/.aws/credentials``. This file is required for all authentication options except IAM roles for EC2 instances.

The following sections describe how to configure the Wazuh module for AWS to pull AWS services logs using these credentials.

-  :ref:`Authentication options <authentication_method>`

   -  :ref:`Profiles <aws_profile>`
   -  :ref:`IAM roles <iam_roles>`
   -  :ref:`IAM roles for EC2 instances <aws_iam_roles_ec2>`

.. _authentication_method:

Authentication options
----------------------

Credentials can be loaded from different locations. You can specify the credentials in a file, assume an IAM role, or load them from other `Boto3 supported locations <https://docs.aws.amazon.com/boto3/latest/guide/credentials.html#configuring-credentials>`__.

This section describes the methods for adding AWS credentials to Wazuh and how to configure the Wazuh module for AWS to use them.

.. _aws_profile:

Profiles
^^^^^^^^

Profiles are logical groups of configuration. You can set up multiple profiles in the following files.

-  ``/root/.aws/credentials``: Each profile defines the access keys for the :ref:`previously created IAM user <iam_identities_create_iam_user>`.
-  ``/root/.aws/config``: Each corresponding profile specifies an AWS region.

In the example below, the ``/root/.aws/credentials`` file defines the ``default``, ``dev``, and ``prod`` profiles.

.. code-block:: ini
   :emphasize-lines: 1,2,3,6,7,10,11

   [default]
   aws_access_key_id=<DEFAULT_ACCESS_KEY_ID>
   aws_secret_access_key=<DEFAULT_SECRET_ACCESS_KEY>

   [dev]
   aws_access_key_id=<DEV_ACCESS_KEY_ID>
   aws_secret_access_key=<DEV_SECRET_ACCESS_KEY>

   [prod]
   aws_access_key_id=<PROD_ACCESS_KEY_ID>
   aws_secret_access_key=<PROD_SECRET_ACCESS_KEY>

The ``/root/.aws/config`` file specifies the AWS region for each profile:

.. code-block:: ini

   [default]
   region = us-east-1

   [profile dev]
   region = us-east-1

   [profile prod]
   region = us-east-1

After setting up the profiles, define which one the Wazuh module for AWS uses to collect logs. Configure this inside the ``<wodle name="aws-s3">`` block of the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent. The example below configures the module to pull AWS CloudTrail logs from the specified bucket using the ``prod`` profile.

.. code-block:: xml
   :emphasize-lines: 2

   <bucket type="cloudtrail">
     <name><WAZUH_AWS_BUCKET></name>
     <aws_profile>prod</aws_profile>
   </bucket>

Save the changes and restart the Wazuh agent service to apply the changes:

.. code-block:: console

   # systemctl restart wazuh-agent

.. _iam_roles:

IAM roles
^^^^^^^^^

An `IAM role <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html>`__ is an identity within your AWS account with specific permissions. It is similar to an IAM user but is not associated with a specific person. Trusted entities can also use IAM roles to interact with different AWS services.  AWS services, applications running on Amazon EC2 instances, and IAM users can assume an IAM role.

.. note::

   This authentication method requires credentials from another authentication method, such as a profile, to assume the role.

This section shows how to create a sample IAM role with read-only permissions to pull data from a bucket:

#. Go to **Services** > **Security, Identity, & Compliance** > **IAM**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/select-iam.png
      :title: IAM
      :alt: IAM
      :align: center
      :width: 80%

#. Go to **Roles** on the left side of the AWS console and click **Create role**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/create-role.png
      :title: IAM Create role
      :alt: IAM Create role
      :align: center
      :width: 80%

#. Select **AWS service** as **Trusted entity type**, **S3** under **Service or use case**, then click **Next**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/select-trusted-entity.png
      :title: Select trusted entity
      :alt: Select trusted entity
      :align: center
      :width: 80%

#. Select a previously created :ref:`policy <creating_an_AWS_policy>` and click **Next**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/select-policy.png
      :title: Select policy
      :alt: Select policy
      :align: center
      :width: 80%

#. Give the role a descriptive name and click **Create role**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/assign-name-to-role-and-create-role.png
      :title: Name and create the role
      :alt: Name and create the role
      :align: center
      :width: 80%

#. Access the role **Summary** and click its **Policy name**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/click-a-policy.png
      :title: Click the policy name
      :alt: Click the policy name
      :align: center
      :width: 80%

#. Switch to **JSON** view and edit the policy to allow the `sts:AssumeRole <https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html>`__ action on the new role. The IAM user gets this permission because the same policy is attached to its user group.

   .. code-block:: json
      :emphasize-lines: 13,14,15

      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "GetS3Logs",
                  "Effect": "Allow",
                  "Action": [
                      "s3:GetObject",
                      "s3:ListBucket",
                      "sts:AssumeRole"
                  ],
                  "Resource": [
                      "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                      "arn:aws:s3:::<WAZUH_AWS_BUCKET>",
                      "arn:aws:iam::<ACCOUNT_ID>:role/Wazuh-IAM-Role"
                  ]
              }
          ]
      }

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/add-sts-assume.png
      :title: Edit the policy in JSON view
      :alt: Edit the policy in JSON view
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/review-and-save-policy.png
      :title: Review and save the policy
      :alt: Review and save the policy
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/policy-updated.png
      :title: Policy updated
      :alt: Policy updated
      :align: center
      :width: 80%

#. Go back to the role **Summary**, go to the **Trust relationships** tab, and click **Edit trust policy**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/trust-relationship.png
      :title: Edit trust policy
      :alt: Edit trust policy
      :align: center
      :width: 80%

#. Add the AWS IAM user to the ``Principal`` element and click **Update policy**.

   .. code-block:: json
      :emphasize-lines: 7

      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Effect": "Allow",
                  "Principal": {
                      "AWS": "arn:aws:iam::<ACCOUNT_ID>:user/Wazuh-AWS-user"
                  },
                  "Action": "sts:AssumeRole"
              }
          ]
      }

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/add-user-to-principal.png
      :title: Add the IAM user to the Principal element
      :alt: Add the IAM user to the Principal element
      :align: center
      :width: 80%

#. After updating the trust policy, copy the ARN of the role, because you need it to configure the Wazuh module for AWS.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/update-trust-policy.png
      :title: Copy the role ARN
      :alt: Copy the role ARN
      :align: center
      :width: 80%

Configure the Wazuh module for AWS inside the ``<wodle name="aws-s3">`` block of the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent. The example below configures the Wazuh module for AWS to pull CloudTrail logs from the bucket using the ``default`` profile and the ``Wazuh-IAM-Role`` IAM role.

.. code-block:: xml
   :emphasize-lines: 2,4

   <bucket type="cloudtrail">
      <name><WAZUH_AWS_BUCKET></name>
      <aws_profile>default</aws_profile>
      <iam_role_arn>arn:aws:iam::<ACCOUNT_ID>:role/Wazuh-IAM-Role</iam_role_arn>
   </bucket>

Save the changes and restart the Wazuh agent service to apply the changes:

.. code-block:: console

   # systemctl restart wazuh-agent

.. _aws_iam_roles_ec2:

IAM roles for EC2 instances
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can assign IAM roles to EC2 instances, so you don't need authentication parameters in the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent. We recommend this configuration if the Wazuh agent runs on an EC2 instance. Find more information about IAM roles on EC2 instances in the official `AWS documentation <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html>`__.

Add the configuration inside the ``<wodle name="aws-s3">`` block of the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent. The example below configures the Wazuh module for AWS to pull CloudTrail logs from the bucket using the IAM roles for EC2 instances.

.. code-block:: xml
   :emphasize-lines: 2

   <bucket type="cloudtrail">
     <name><WAZUH_AWS_BUCKET></name>
   </bucket>

Save the changes and restart the Wazuh agent service to apply the changes:

.. code-block:: console

   # systemctl restart wazuh-agent
