.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh module for AWS might require access credentials to collect log data from the different AWS services. Learn more in this section of the documentation.

Configuring AWS credentials
===========================

You can configure the Wazuh module for AWS on the Wazuh server (which also behaves as the Wazuh agent) or on a Wazuh agent installed on a Linux endpoint. Depending on the authentication option used, the Wazuh module for AWS will require access credentials of an AWS Identity and Access Management (IAM) identity to collect log data from the different AWS services. These credentials need to be stored in a file named ``.aws/credentials`` on the Wazuh server or agent.

You need to create the credentials file using the root user because the :doc:`wazuh-modulesd </user-manual/reference/daemons/wazuh-modulesd>` daemon runs with root permission. Ensure the ``.aws/credentials`` file is saved in the home directory of the root user, therefore the absolute file path will be ``/root/.aws/credentials``. This file is required for all authentication options except IAM roles for EC2 instances.

In the following sections, we describe how to configure the Wazuh module for AWS to pull AWS services logs using these credentials.

.. contents::
   :local:
   :depth: 2
   :backlinks: none

.. _authentication_method:

Authenticating options
----------------------

Credentials can be loaded from different locations. You can specify the credentials in a file, assume an IAM role, or load them from other `Boto3 supported locations <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials>`__.

In this section, we describe the several methods of adding the AWS credentials to Wazuh and how to configure the Wazuh module for AWS to use the credentials.

.. _aws_profile:

Profiles
^^^^^^^^

Profiles represent logical groups of configuration. You can set up multiple profiles in the ``/root/.aws/credentials`` file. Each profile defines the access keys for a :ref:`previously created IAM user <iam_identities_create_iam_user>` and an AWS region. After setting up the profiles in the ``/root/.aws/credentials`` file, you must define which profile the Wazuh module for AWS will use to collect logs from AWS services.

.. note::

   An AWS region must be specified on the ``credentials`` file to make it work.

In the example below, the ``/root/.aws/credentials`` file defines the *default*, *dev*, and *prod* profiles.

.. code-block:: ini
   :emphasize-lines: 1,6,11

   [default]
   aws_access_key_id=foo
   aws_secret_access_key=bar
   region=us-east-1

   [dev]
   aws_access_key_id=foo2
   aws_secret_access_key=bar2
   region=us-east-1

   [prod]
   aws_access_key_id=foo3
   aws_secret_access_key=bar3
   region=us-east-1

It is necessary to configure the Wazuh module for AWS using the ``/var/ossec/etc/ossec.conf`` file of the Wazuh server or agent. In the example below, we configure the Wazuh module for AWS to pull Amazon CloudTrail logs from the specified bucket using the *prod* profile.

.. code-block:: xml

   <bucket type="cloudtrail">
     <name>wazuh-s3-bucket</name>
     <aws_profile>prod</aws_profile>
   </bucket>

.. _iam_roles:

IAM Roles
^^^^^^^^^

An `IAM role <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html>`__ is an identity within your AWS account with specific permissions. It's similar to an IAM user but isn't associated with a specific person. Trusted entities can also use IAM roles to interact with different AWS services.  An IAM role can be assumed by AWS services, applications running on Amazon EC2 instances, and AWS Identity and Access Management (IAM) users.

.. note::

   This authentication method requires some credentials to be previously added to the configuration using any other authentication method.

This section shows how to create a sample IAM role with read-only permissions to pull data from a bucket:

#. Go to **Services** > **Security, Identity, & Compliance** > **IAM**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/select-iam.png
      :title: Select IAM
      :alt: Select IAM
      :align: center
      :width: 80%

#. Go to **Roles** on the left side of the AWS console and click **Create role**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/create-role.png
      :title: Create role
      :alt: Create role
      :align: center
      :width: 80%

#. Choose **AWS service** as Trusted entity type, **S3** as service and **Use case** then click **Next**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/select-trusted-entity.png
      :title: Select trusted entity
      :alt: Select trusted entity
      :align: center
      :width: 80%

#. Select a previously created :doc:`policy <aws-policy>` and click **Next**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/select-policy.png
      :title: Select policy
      :alt: Select policy
      :align: center
      :width: 80%

#. Give the role a descriptive name and click **Create role**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/assign-name-to-role.png
      :title: Assign name to role
      :alt: Assign name to role
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/assign-name-to-role-and-create-role.png
      :title: Create role
      :alt: Create role
      :align: center
      :width: 80%

#. Access the role **Summary** and click on its **Policy name**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/click-a-policy.png
      :title: Click a policy
      :alt: Click a policy
      :align: center
      :width: 80%

#. Add permissions so the new role can do `sts:AssumeRole <https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html>`__ action.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/add-sts-assume.png
      :title: Add STS AssumeRole action
      :alt: Add STS AssumeRole action
      :align: center
      :width: 80%

#. Go back to the role **Summary**, go to the **Trust relationships** tab, and click **Edit trust policy**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/trust-relationship.png
      :title: Edit trust relationship
      :alt: Edit trust relationship
      :align: center
      :width: 80%

#. Add the AWS IAM user to the ``Principal`` tag and click **Update policy**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/add-user-to-principal.png
      :title: Add user to Principal
      :alt: Add user to Principal
      :align: center
      :width: 80%

#. After updating the trust policy, copy the Amazon Resource Name (ARN) of the role as this will be used to configure the Wazuh module for AWS.

   .. thumbnail:: /images/cloud-security/aws/config-aws-credentials/update-trust-policy.png
      :title: Update trust policy
      :alt: Update trust policy
      :align: center
      :width: 80%

It is necessary to configure the Wazuh module for AWS using the ``/var/ossec/etc/ossec.conf`` file of the Wazuh server or agent. In the example below, we configure the Wazuh module for AWS to pull Amazon CloudTrail logs from the specified bucket using the *default* profile and the *Wazuh-IAM-Role* IAM role.

.. code-block:: xml

   <bucket type="cloudtrail">
      <name><WAZUH_AWS_BUCKET></name>
      <aws_profile>default</aws_profile>
      <iam_role_arn>arn:aws:iam::xxxxxxxxxxx:role/Wazuh-IAM-Role</iam_role_arn>
   </bucket>

IAM roles for EC2 instances
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use IAM roles and assign them to EC2 instances so there's no need to insert authentication parameters in the ``/var/ossec/etc/ossec.conf`` file of the Wazuh server or agent. This is the recommended configuration if the Wazuh server or agent is running on an EC2 instance. Find more information about IAM roles on EC2 instances in the official `Amazon AWS documentation <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html>`__.

In the example below, we configure the Wazuh module for AWS to pull Amazon CloudTrail logs from the specified bucket using the IAM roles for EC2 instances.

.. code-block:: xml

   <bucket type="cloudtrail">
     <name><WAZUH_AWS_BUCKET></name>
   </bucket>

Environment variables
^^^^^^^^^^^^^^^^^^^^^

If you're using a single AWS account for all your buckets this could be the most suitable option for you. You have to define the following environment variables:

-  **AWS_ACCESS_KEY_ID**
-  **AWS_SECRET_ACCESS_KEY**

Run the following command on the Wazuh server or agent to configure environment variables for the IAM user. Replace ``<PASTE-ACCESS-KEY>``  and ``<PASTE-SECRET-KEY>`` with the appropriate credentials.

.. code-block:: console

   export AWS_ACCESS_KEY_ID=<PASTE-ACCESS-KEY>
   export AWS_SECRET_ACCESS_KEY=<PASTE-SECRET-KEY>

.. note::

   This option can only be used when running the Wazuh module for AWS manually.
