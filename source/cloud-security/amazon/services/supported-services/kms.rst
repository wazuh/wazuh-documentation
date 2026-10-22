.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to monitor AWS Key Management Service (KMS) management events with Wazuh by collecting them from the AWS CloudTrail logs stored in an S3 bucket.

AWS Key Management Service (KMS)
================================

`AWS Key Management Service <https://aws.amazon.com/kms/>`__ (KMS) lets users create and manage keys and control encryption across AWS services and in their applications. AWS KMS is a secure and resilient service that uses FIPS 140-3 Security Level 3 validated hardware security modules to protect its keys. AWS KMS is integrated with AWS CloudTrail to provide users with logs of all key usage, helping meet their regulatory and compliance needs.

AWS configuration
-----------------

AWS CloudTrail records AWS KMS management events, such as ``CreateKey``, ``CreateAlias``, ``DisableKey``, and ``ScheduleKeyDeletion``, as API calls. Wazuh reads these events from the S3 bucket where CloudTrail stores its logs, so a CloudTrail trail is all you need. If you already collect AWS CloudTrail logs with Wazuh, the KMS events are already included. The following diagram shows how AWS KMS events reach the Wazuh agent through AWS CloudTrail and an S3 bucket.

.. thumbnail:: /images/cloud-security/aws/kms/key.png
   :title: AWS KMS events reaching Wazuh through AWS CloudTrail and an S3 bucket
   :alt: AWS KMS events reaching Wazuh through AWS CloudTrail and an S3 bucket
   :align: center
   :width: 80%

CloudTrail trail for AWS KMS events
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you don't have a CloudTrail trail that logs management events yet, create one. If you already have one, check that it doesn't exclude AWS KMS events and skip to the :ref:`policy configuration <kms_policy_configuration>`.

Follow these steps to create a CloudTrail trail.

#. On your AWS console, search for ``cloudtrail`` in the search bar or go to **Services** > **Management & Governance** > **CloudTrail**.

#. Click **Trails**, then click **Create trail**.

   .. thumbnail:: /images/cloud-security/aws/kms/01-create-trail.png
      :title: Create trail on the CloudTrail Trails page
      :alt: Create trail on the CloudTrail Trails page
      :align: center
      :width: 80%

#. Assign a **Trail name**. **Log file SSE-KMS encryption** is enabled by default for new trails. If you keep it, keep the ``KMSDecrypt`` statement in the policies of the next section so that Wazuh can decrypt the logs.

#. Under **Storage location**, select **Use existing S3 bucket** and enter your bucket name. If **Log file SSE-KMS encryption** is enabled, assign a name for a new AWS KMS alias or choose an existing one. Click **Next**.

   .. thumbnail:: /images/cloud-security/aws/kms/02-storage-location.png
      :title: Trail name, existing S3 bucket, and SSE-KMS encryption settings
      :alt: Trail name, existing S3 bucket, and SSE-KMS encryption settings
      :align: center
      :width: 80%

#. Under **Event type**, make sure **Management events** is selected. Set **API activity** to **Read** and **Write**, and make sure **Exclude AWS KMS events** isn't selected. Click **Next**.

   .. thumbnail:: /images/cloud-security/aws/kms/03-management-events.png
      :title: Management events with Read and Write API activity selected
      :alt: Management events with Read and Write API activity selected
      :align: center
      :width: 80%

#. Review the configuration and click **Create trail**.

   .. thumbnail:: /images/cloud-security/aws/kms/04-review-and-create-trail.png
      :title: Review the trail configuration and create the trail
      :alt: Review the trail configuration and create the trail
      :align: center
      :width: 80%

.. _kms_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

To allow an AWS user to use the Wazuh module for AWS with read-only permissions, the user must have a policy like the following attached:

.. code-block:: json
   :emphasize-lines: 12,13,20

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket"
               ],
               "Resource": [
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>"
               ]
           },
           {
               "Sid": "KMSDecrypt",
               "Effect": "Allow",
               "Action": "kms:Decrypt",
               "Resource": "arn:aws:kms:<REGION>:<ACCOUNT_ID>:key/<KEY_ID>"
           }
       ]
   }

.. include:: /_templates/cloud/amazon/delete_policy_description.rst

.. code-block:: json
   :emphasize-lines: 13,14,21

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
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>"
               ]
           },
           {
               "Sid": "KMSDecrypt",
               "Effect": "Allow",
               "Action": "kms:Decrypt",
               "Resource": "arn:aws:kms:<REGION>:<ACCOUNT_ID>:key/<KEY_ID>"
           }
       ]
   }

.. note::

   ``<WAZUH_AWS_BUCKET>`` is a placeholder. Replace it with the actual name of the bucket from which you want to retrieve logs. If your trail encrypts its log files with SSE-KMS, replace ``<REGION>``, ``<ACCOUNT_ID>``, and ``<KEY_ID>`` in the ``KMSDecrypt`` statement with the Region, account ID, and ID of that KMS key. Otherwise, remove the ``KMSDecrypt`` statement.

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

After creating a policy, you can attach it directly to a user or to a group the user belongs to. In :ref:`attaching a policy to an IAM user group <attaching_policy_to_IAM_user_group>`, you see how to attach a policy to a group. More information on using other methods is available in the `AWS documentation <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-add-console>`__.

Configure Wazuh to process AWS KMS logs
---------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket that stores your CloudTrail logs. If this agent already reads that bucket with a ``<bucket type="cloudtrail">`` block, you don't need another one. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="cloudtrail">
          <name><WAZUH_AWS_BUCKET></name>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes.

   .. code-block:: console

      # systemctl restart wazuh-agent

KMS use case
------------

AWS Key Management Service allows you to create and control cryptographic keys for securing your data. Monitoring this service with Wazuh helps you understand the availability and state of your AWS KMS keys.

Below is a use case for Wazuh findings built for AWS KMS.

Monitoring KMS key management events
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When KMS management events occur, the Wazuh dashboard shows these findings:

-  AWS KMS key created (``CreateKey``)
-  AWS KMS alias created (``CreateAlias``)
-  AWS KMS key disabled or deletion cancelled (``DisableKey``, ``CancelKeyDeletion``)
-  AWS KMS key deletion scheduled (``ScheduleKeyDeletion``)

.. thumbnail:: /images/cloud-security/aws/kms/1-monitoring-kms-key-usage.png
   :title: AWS KMS key management findings
   :alt: AWS KMS key management findings
   :align: center
   :width: 80%

You can expand the finding to see more information, such as the key policy, encryption type, and other details about the affected key.

.. thumbnail:: /images/cloud-security/aws/kms/2-monitoring-kms-key-usage.png
   :title: Details of an AWS KMS key management finding
   :alt: Details of an AWS KMS key management finding
   :align: center
   :width: 80%
