.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, we describe how to create an AWS policy and how to attach the policy to a group.

Configure AWS policy
====================

In AWS, a policy is an entity that links permissions with an identity or resource. The permissions in a policy determine whether a request is allowed or denied.

The following sections describe how to create an AWS policy and attach it to a group.

.. _creating_an_AWS_policy:

Create an AWS policy
--------------------

The AWS IAM user needs a different set of permissions for each AWS service you monitor. The permissions required for each AWS service are explained on each page of the :doc:`supported services </cloud-security/amazon/services/supported-services/index>` section. An IAM user group can hold up to 10 managed policies by default. When you monitor more than ten services, combine their statements into fewer policies.

Follow the steps below on your AWS console to create an AWS policy that allows reading logs from an S3 bucket.

#. On your AWS console, search for ``iam`` in the search bar and click **IAM** from the results.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/search-for-IAM.png
      :title: Search IAM
      :alt: Search IAM
      :align: center
      :width: 80%

#. Click **Policies** > **Create policy**

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/create-policy-1.png
      :title: Create policy
      :alt: Create policy
      :align: center
      :width: 80%

#. Switch to **JSON** view, remove the default statement, and paste the following configuration. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the previously created :doc:`S3 bucket </cloud-security/amazon/services/prerequisites/S3-bucket>`. In this example, the policy allows the IAM user to list the specified S3 bucket and retrieve its objects.

   .. code-block:: json
      :emphasize-lines: 12,13

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
      :title: Specify the policy permissions
      :alt: Specify the policy permissions
      :align: center
      :width: 80%

#. Name the policy and click **Create policy** to create a new policy.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/click-create-policy.png
      :title: Name and create the policy
      :alt: Name and create the policy
      :align: center
      :width: 80%

#. Confirm the policy creation.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/confirm-policy.png
      :title: Confirm policy creation
      :alt: Confirm policy creation
      :align: center
      :width: 80%

.. _attaching_policy_to_IAM_user_group:

Attach a policy to an IAM user group
------------------------------------

After you create a policy, you can attach it to groups, users, or roles. Follow these steps to attach a policy to the group you created earlier, using the AWS console.

#. On your AWS console, search for ``iam`` in the search bar and click **IAM** from the results.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/search-for-IAM-attach.png
      :title: Search IAM
      :alt: Search IAM
      :align: center
      :width: 80%

#. Navigate to **IAM** **user groups** and click a :ref:`previously created <iam_identities_create_iam_user_group>` group.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/click-user-group.png
      :title: IAM user group
      :alt: IAM user group
      :align: center
      :width: 80%

#. On the **Permissions** tab, click **Add permissions** > **Attach policies**.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/attach-policies.png
      :title: IAM Policy
      :alt: IAM Policy
      :align: center
      :width: 80%

#. Search for the policy, select the checkbox next to it, and click **Attach policies** to attach it to the group.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/select-and-attach-policy.png
      :title: Attach policy to group
      :alt: Attach policy to group
      :align: center
      :width: 80%

#. Confirm the policy is attached to the group.

   .. thumbnail:: /images/cloud-security/aws/config-aws-policy/confirm-policy-creation.png
      :title: Confirm policy
      :alt: Confirm policy
      :align: center
      :width: 80%
