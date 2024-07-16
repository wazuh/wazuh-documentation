.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In the following sections, we describe how to create an IAM user group, how to create an AWS IAM user with access credentials, and how to add the user to the group.

Configuring AWS IAM Identities
==============================

In AWS Identity and Access Management (IAM), an identity represents a human user or programmatic workload that can be authenticated and authorized to perform actions in AWS. The Wazuh module for AWS requires authentication and authorization through an IAM identity to integrate with :doc:`supported </cloud-security/amazon/services/supported-services/index>` AWS services.

In the following sections, we describe how to create an IAM user group, how to create an AWS IAM user with access credentials, and how to add the user to the group.

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

#. 