.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to create an IAM user group, create an AWS IAM user with access credentials, and add the user to the group.

Configure AWS IAM identities
============================

In AWS Identity and Access Management (IAM), an identity represents a human user or programmatic workload that AWS can authenticate and authorize to perform actions. The Wazuh module for AWS requires authentication and authorization through an IAM identity to integrate with :doc:`supported </cloud-security/amazon/services/supported-services/index>` AWS services.

The following sections describe how to create an IAM user group, create an IAM user with access credentials, and add the user to the group.

.. _iam_identities_create_iam_user_group:

Create an IAM user group
------------------------

#. On your AWS console, search for ``iam`` in the search bar and click **IAM** from the results.

   .. thumbnail:: /images/cloud-security/aws/config-iam-identities/search-for-IAM.png
      :title: Search IAM
      :alt: Search IAM
      :align: center
      :width: 80%

#. Go to **IAM user groups** and click **Create group** to create a new group.

   .. thumbnail:: /images/cloud-security/aws/config-iam-identities/click-create-group.png
      :title: IAM user groups
      :alt: IAM user groups
      :align: center
      :width: 80%

#. Assign a name for the group.

   .. thumbnail:: /images/cloud-security/aws/config-iam-identities/click-create-group-2.png
      :title: Create group
      :alt: Create group
      :align: center
      :width: 80%

#. Scroll down, and click **Create user group**.

   .. thumbnail:: /images/cloud-security/aws/config-iam-identities/click-create-group-3.png
      :title: Create group 2
      :alt: Create group 2
      :align: center
      :width: 80%

#. Confirm the group has been successfully created.

   .. thumbnail:: /images/cloud-security/aws/config-iam-identities/confirm-group-creation.png
      :title: Confirm group creation
      :alt: Confirm group creation
      :align: center
      :width: 80%

.. _iam_identities_create_iam_user:

Create an IAM user
------------------

Wazuh requires an AWS IAM user with the necessary permissions to collect log data from the different AWS services. Follow these steps to create a new IAM user in your AWS environment and obtain the access credentials.

#. Create a new IAM user and add it to a user group:

   #. On your AWS console, navigate to **Services** > **IAM** > **Users** > **Create user**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/create-IAM-user.png
         :title: Create user
         :alt: Create user
         :align: center
         :width: 80%

   #. Assign a username and click **Next**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/create-IAM-user-2.png
         :title: Create user - next
         :alt: Create user - next
         :align: center
         :width: 80%

   #. Assign the user to the previously created group and click **Next** to proceed.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/add-user-to-group.png
         :title: Add user to group
         :alt: Add user to group
         :align: center
         :width: 80%

   #. Review the selected options and click **Create user**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/click-create-user.png
         :title: Review and create user
         :alt: Review and create user
         :align: center
         :width: 80%

   #. Confirm the user creation.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/confirm-user-creation.png
         :title: Confirm user creation
         :alt: Confirm user creation
         :align: center
         :width: 80%

#. Obtain the necessary access credentials for the IAM user.

   #. Click the IAM user you created, go to **Security credentials**, scroll down to **Access keys,** and click **Create access key**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/security-credentials.png
         :title: Create access key from Security credentials
         :alt: Create access key from Security credentials
         :align: center
         :width: 80%

   #. Select and confirm the **Command Line Interface (CLI)** use case and click **Next**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/command-line-interface.png
         :title: Confirm CLI
         :alt: Confirm CLI
         :align: center
         :width: 80%

   #. Assign a description tag value and click **Create access key**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/create-access-key.png
         :title: Create access key
         :alt: Create access key
         :align: center
         :width: 80%

   #. Save the access credentials. You use them later to configure the Wazuh module for AWS. If you don't copy the credentials before you click **Done**, you can't recover them later. However, you can create a new secret access key.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/save-access-keys.png
         :title: Save access keys
         :alt: Save access keys
         :align: center
         :width: 80%
