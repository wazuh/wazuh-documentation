.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, we describe how to create an AWS policy and how to attach the policy to a group.

Configuring AWS policy
======================

In AWS, a policy is an entity that links permissions with an identity or resource. The permissions in a policy determine whether a request is allowed or denied.

In this section, we describe how to create an AWS policy and how to attach the policy to a group.

Creating an AWS policy
----------------------

Depending on the AWS service that will be monitored, the AWS IAM user will need different sets of permissions. The permissions required for each AWS service are explained on each page of the :doc:`supported services <../supported-services/index>` section.

Follow the steps below on your AWS console to create an AWS policy that collects logs from an S3 bucket.

#. On the AWS console, search for ``iam`` and click **IAM** from the results.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/search-for-IAM.png
      :title: Find IAM
      :alt: Find IAM
      :align: center
      :width: 80%

#. Click **Policies** > **Create policy**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/create-policy-1.png
      :title: Create policy
      :alt: Create policy
      :align: center
      :width: 80%

#. Switch to **JSON** view, remove the default statement, and paste the following configuration. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the previously created :doc:`S3 bucket <S3-bucket>`. In this example, the policy allows the IAM user to return and retrieve an object from the specified S3 bucket.

   .. code-block:: json

      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "GetS3Logs",
                  "Effect": "Allow",
                  "Action": [
                      "s3:GetObject",
                      "s3:ListBucket"
                  ],
                  "Resource": [
                      "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                      "arn:aws:s3:::<WAZUH_AWS_BUCKET>"
                  ]
              }
          ]
      }

   #. Click **Next** to proceed to the next step.

      .. thumbnail:: /images/cloud-security/aws/config-aws-policy/create-policy.png
         :title: Create policy
         :alt: Create policy
         :align: center
         :width: 80%

   #. Click **Create policy** to create a new policy.

      .. thumbnail:: /images/cloud-security/aws/config-aws-policy/click-create-policy.png
         :title: Create policy
         :alt: Create policy
         :align: center
         :width: 80%

   #. Confirm the policy creation.

      .. thumbnail:: /images/cloud-security/aws/config-aws-policy/confirm-policy.png
         :title: Confirm policy creation
         :alt: Confirm policy creation
         :align: center
         :width: 80%

Attaching a policy to an IAM user group
---------------------------------------

After you create a policy, you can attach it to groups, users, or roles. In this guide, we show how to create a group and how to attach a policy to a group using the AWS console.

#. On the AWS console, search for ``iam`` and click **IAM** from the results.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/search-for-IAM-attach.png
      :title: Find IAM
      :alt: Find IAM
      :align: center
      :width: 80%

#. Navigate to **User groups** and click on a :ref:`previously created group <iam_identities_create_iam_user_group>`.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/click-user-group.png
      :title: Click user group
      :alt: Click user group
      :align: center
      :width: 80%

#. Navigate to **Permissions** , click on **Add permissions**, then **Attach policies**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/attach-policies.png
      :title: Attach policies
      :alt: Attach policies
      :align: center
      :width: 80%

#. Search for the policy, select the checkbox next to it, and click **Attach policies** to attach it to the group.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/select-and-attach-policy.png
      :title: Select and attach the policy
      :alt: Select and attach the policy
      :align: center
      :width: 80%

#. Confirm the policy is attached to the group.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/confirm-policy-creation.png
      :title: Confirm policy creation
      :alt: Confirm policy creation
      :align: center
      :width: 80%
