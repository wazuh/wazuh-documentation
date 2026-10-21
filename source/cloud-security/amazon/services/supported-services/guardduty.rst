.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the different services required to integrate GuardDuty into Wazuh.

Amazon GuardDuty
================

`Amazon GuardDuty <https://aws.amazon.com/guardduty/>`__ is a threat detection service that continuously monitors for malicious or unauthorized behavior to help you protect your AWS accounts and workloads. It monitors for activity, such as unusual API calls or potentially unauthorized deployments, that may indicate an account compromise. GuardDuty also detects potentially compromised instances or reconnaissance by attackers.

AWS configuration
-----------------

The following sections cover how to configure the different services required to integrate GuardDuty into Wazuh.

Amazon GuardDuty configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. :doc:`Create a new S3 bucket </cloud-security/amazon/services/prerequisites/S3-bucket>`, or skip this step to use an existing bucket.

#. On your AWS console, search for ``guardduty`` in the search bar or go to **Services** > **Security, Identity, & Compliance** > **GuardDuty**.

   .. thumbnail:: /images/cloud-security/aws/guardduty/01-search-for-guardduty.png
      :title: Search for GuardDuty on the AWS console
      :alt: Search for GuardDuty on the AWS console
      :align: center
      :width: 80%

#. Select **Enable all GuardDuty features**, click **Get started** then **Enable GuardDuty**.

   .. thumbnail:: /images/cloud-security/aws/guardduty/01-get-started-guardduty.png
      :title: Select Enable all GuardDuty features and click Get started
      :alt: Select Enable all GuardDuty features and click Get started
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/guardduty/01-enable-guardduty.png
      :title: Enable GuardDuty
      :alt: Enable GuardDuty
      :align: center
      :width: 80%

#. `S3 Protection <https://docs.aws.amazon.com/guardduty/latest/ug/s3-protection.html>`__ enables Amazon GuardDuty to monitor object-level API operations to identify potential security risks for data within your S3 buckets. In the navigation pane, under **Protection plans**, make sure **S3 Protection** is enabled.

   .. thumbnail:: /images/cloud-security/aws/guardduty/02-enable-S3-protection.png
      :title: S3 Protection enabled under Protection plans
      :alt: S3 Protection enabled under Protection plans
      :align: center
      :width: 80%

#. In the navigation pane, go to **Settings**, scroll to **Findings export options**, and click **Configure now** to configure GuardDuty to export findings to an S3 bucket.

   .. thumbnail:: /images/cloud-security/aws/guardduty/04-click-configure-now.png
      :title: Click Configure now under Findings export options
      :alt: Click Configure now under Findings export options
      :align: center
      :width: 80%

#. See the :doc:`configuring an S3 bucket </cloud-security/amazon/services/prerequisites/S3-bucket>` and `creating symmetric encryption KMS keys <https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html#create-symmetric-cmk>`__ guides on how to create an S3 bucket and KMS key. Enter the ARNs of the bucket and the key in the **S3 bucket ARN** and **KMS key ARN** fields.

   .. thumbnail:: /images/cloud-security/aws/guardduty/05-s3-and-kms-arn.png
      :title: Enter the S3 bucket ARN and the KMS key ARN
      :alt: Enter the S3 bucket ARN and the KMS key ARN
      :align: center
      :width: 80%

#. In the **Attach policy** section, click **View Policy for S3 bucket** and **View Policy for KMS key**. Copy and attach the corresponding policy to the selected S3 bucket and the KMS key. Click **Save** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/guardduty/06-view-policy-for-s3-and-kms.png
      :title: View the policies for the S3 bucket and the KMS key
      :alt: View the policies for the S3 bucket and the KMS key
      :align: center
      :width: 80%

   .. note::

      To change the S3 and KMS policies, see the `adding a bucket policy by using the Amazon S3 console <https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html>`__ and `changing a key policy <https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying.html#key-policy-modifying-how-to-console-policy-view>`__ guides.

#. Optionally, set the frequency for exporting updated GuardDuty findings to the S3 bucket, for example, 15 minutes.

   .. thumbnail:: /images/cloud-security/aws/guardduty/07-guardduty-frequency.png
      :title: GuardDuty findings export frequency
      :alt: GuardDuty findings export frequency
      :align: center
      :width: 80%

.. _guardduty_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

To use the Wazuh module for AWS with read-only permissions and decrypt the encrypted logs, an AWS user needs a policy like the following:

.. code-block:: json
   :emphasize-lines: 13,14,15

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket",
                   "kms:Decrypt"
               ],
               "Resource": [
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>",
                   "arn:aws:kms:<REGION>:<ACCOUNT_ID>:key/<KEY_ID>"
               ]
           }
       ]
   }

.. include:: /_templates/cloud/amazon/delete_policy_description.rst

.. code-block:: json
   :emphasize-lines: 14,15,16

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket",
                   "s3:DeleteObject",
                   "kms:Decrypt"
               ],
               "Resource": [
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>",
                   "arn:aws:kms:<REGION>:<ACCOUNT_ID>:key/<KEY_ID>"
               ]
           }
       ]
   }

.. note::

   ``<WAZUH_AWS_BUCKET>``, ``<REGION>``, ``<ACCOUNT_ID>``, and ``<KEY_ID>`` are placeholders. Replace them with the appropriate values.

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

After creating a policy, you can attach it directly to a user or to a group the user belongs to. In :ref:`attaching a policy to an IAM user group <attaching_policy_to_IAM_user_group>`, you see how to attach a policy to a group. More information on using other methods is available in the `AWS documentation <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-add-console>`__.

Configure Wazuh to process Amazon GuardDuty logs
------------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="guardduty">
          <name><WAZUH_AWS_BUCKET></name>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes.

   .. code-block:: console

      # systemctl restart wazuh-agent

GuardDuty use case
------------------

Amazon GuardDuty continuously monitors AWS accounts and workloads for potentially malicious or unauthorized activity. To validate the configuration, generate sample findings after you configure the findings export. On your AWS console, go to **GuardDuty** > **Settings** > **Sample findings** and select **Generate sample findings**. GuardDuty exports only the findings created after the export is configured.

Wazuh collects the sample findings through the Wazuh module for AWS. Each finding on the Wazuh dashboard has a title that describes the threat, for example, **AWS GuardDuty brute force attack detected**.

To see them, go to **Amazon Web Services** > **Findings** and filter by ``cloud.service.name: guardduty``. The screenshot below shows the ingested findings.

.. thumbnail:: /images/cloud-security/aws/guardduty/1-guardduty-sample-findings.png
   :title: GuardDuty sample findings on the Wazuh dashboard
   :alt: GuardDuty sample findings on the Wazuh dashboard
   :align: center
   :width: 80%
