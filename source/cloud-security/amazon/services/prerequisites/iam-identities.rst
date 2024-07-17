.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In the following sections, we describe how to create an IAM user group, how to create an AWS IAM user with access credentials, and how to add the user to the group.

Configuring AWS IAM Identities
==============================

In AWS Identity and Access Management (IAM), an identity represents a human user or programmatic workload that can be authenticated and authorized to perform actions in AWS. The Wazuh module for AWS requires authentication and authorization through an IAM identity to integrate with :doc:`supported <../supported-services/index>` AWS services.

In the following sections, we describe how to create an IAM user group, how to create an AWS IAM user with access credentials, and how to add the user to the group.

.. _iam_identities_create_iam_user_group:

Creating an IAM user group
--------------------------

#. Create a user group that an AWS IAM user will be added to.

   #. On the AWS console, search for ``iam`` and click **IAM** from the results.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/search-for-iam.png
         :title: Find IAM
         :alt: Find IAM
         :align: center
         :width: 80%

   #. Go to **User groups** and click **Create group** to create a new group.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/click-create-group.png
         :title: Click Create group
         :alt: Click Create group
         :align: center
         :width: 80%

   #. Assign a name for the group, scroll down, and click **Create group**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/click-create-group-2.png
         :title: Click Create group 2
         :alt: Click Create group 2
         :align: center
         :width: 80%

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/click-create-group-3.png
         :title: Click Create group 3
         :alt: Click Create group 3
         :align: center
         :width: 80%

   #. Confirm the group has been successfully created.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/confirm-group-creation.png
         :title: Confirm group creation
         :alt: Confirm group creation
         :align: center
         :width: 80%

Creating an IAM user
--------------------

Wazuh requires an AWS IAM user with the necessary permissions to collect log data from the different AWS services. We show below how to create a new IAM user in your AWS environment and obtain the access credentials.

#. Create a new IAM user and add it to a user group:

   #. On your AWS console, navigate to **Services** > **IAM** > **Users** > **Create user**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/create-IAM-user.png
         :title: Create IAM user
         :alt: Create IAM user
         :align: center
         :width: 80%

   #. Assign a username and click **Next**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/create-IAM-user-2.png
         :title: Create IAM user
         :alt: Create IAM user
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
         :title: Click Create user
         :alt: Click Create user
         :align: center
         :width: 80%

   #. Confirm the user creation

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/confirm-user-creation.png
         :title: Confirm user creation
         :alt: Confirm user creation
         :align: center
         :width: 80%

#. Obtain the necessary access credentials for the IAM user.

   #. Click on the created IAM user, go to **Security credentials**, scroll down to **Access keys**, and click **Create access key**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/security-credentials.png
         :title: Create access key
         :alt: Create access key
         :align: center
         :width: 80%

   #. Select and confirm the **Command Line Interface (CLI)** use case and click **Next**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/command-line-interface.png
         :title: Command Line Interface selection
         :alt: Command Line Interface selection
         :align: center
         :width: 80%

   #. Assign a description tag value and click **Create access key**.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/create-access-key.png
         :title: Create access key
         :alt: Create access key
         :align: center
         :width: 80%

   #. Save the access credentials, you will use them later to configure the Wazuh module for AWS. If you don't copy the credentials before you click **Done**, you cannot recover it later. However, you can create a new secret access key.

      .. thumbnail:: /images/cloud-security/aws/config-iam-identities/save-access-keys.png
         :title: Save access keys
         :alt: Save access keys
         :align: center
         :width: 80%

Depending on the service that will be monitored, the AWS IAM user will need a different set of permissions. The permissions required for each service are explained on each page of the supported services listed in the :doc:`supported services </cloud-security/amazon/services/supported-services/index>` section.
