.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the different services required to integrate Trusted Advisor into Wazuh.

AWS Trusted Advisor
===================

`AWS Trusted Advisor <https://aws.amazon.com/premiumsupport/technology/trusted-advisor/>`__ helps users optimize their AWS environment by following AWS best practices and providing real-time guidance to reduce costs, improve performance, and enhance security. Trusted Advisor logs reach an S3 bucket through `Amazon EventBridge <https://aws.amazon.com/eventbridge/>`__ and `Amazon Data Firehose <https://aws.amazon.com/firehose/>`__. Wazuh collects them and indexes each check result as an event. To raise findings from these events, create custom rules.

.. note::

   You must have an AWS Business Support+, AWS Enterprise Support, or AWS Unified Operations plan to create an EventBridge rule for Trusted Advisor checks. Trusted Advisor sends all its events to EventBridge in US East (N. Virginia), so create the EventBridge rule and the Firehose stream in that Region. For more information, see `changing AWS support plans <https://docs.aws.amazon.com/awssupport/latest/user/changing-support-plans.html>`__.

AWS configuration
-----------------

The following sections cover how to configure the different services required to integrate Trusted Advisor into Wazuh. The following diagram shows how Trusted Advisor events reach the S3 bucket through Amazon EventBridge and Amazon Data Firehose. Wazuh then collects them from the bucket.

.. thumbnail:: /images/cloud-security/aws/trusted-advisor/trusted.png
   :title: AWS Trusted Advisor events flow through Amazon EventBridge, Amazon Data Firehose, and an S3 bucket to Wazuh
   :alt: AWS Trusted Advisor events flow through Amazon EventBridge, Amazon Data Firehose, and an S3 bucket to Wazuh
   :align: center
   :width: 80%

Amazon Data Firehose configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create an Amazon Data Firehose delivery stream to store the Trusted Advisor logs into the desired S3 bucket so Wazuh can process them.

#. :doc:`Create a new </cloud-security/amazon/services/prerequisites/S3-bucket>` S3 bucket, or skip this step to use an existing bucket.

#. On your AWS console, search for ``amazon data firehose`` in the search bar or go to **Services** > **Analytics** > **Amazon Data Firehose**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/01-data-firehose.png
      :title: Search for Amazon Data Firehose on the AWS console
      :alt: Search for Amazon Data Firehose on the AWS console
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/02-create-firehose-stream.png
      :title: Create Firehose stream
      :alt: Create Firehose stream
      :align: center
      :width: 80%

#. Select **Direct PUT** and **Amazon S3** as the desired **Source** and **Destination**, respectively, and choose an appropriate **Firehose stream name**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/03-select-direct-put.png
      :title: Select Direct PUT as source, Amazon S3 as destination, and a Firehose stream name
      :alt: Select Direct PUT as source, Amazon S3 as destination, and a Firehose stream name
      :align: center
      :width: 80%

#. Select the desired S3 bucket as the destination. You can specify a custom prefix to change the path where AWS stores the logs. Amazon Data Firehose creates a file structure ``YYYY/MM/DD/HH``. If you use a prefix, the file structure is ``prefix-name/YYYY/MM/DD/HH``, and you must enter the same prefix as the path value in the Wazuh configuration. In this example, the prefix is ``trusted-advisor/``.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/05-select-desired-bucket.png
      :title: Select the destination S3 bucket and the trusted-advisor/ prefix
      :alt: Select the destination S3 bucket and the trusted-advisor/ prefix
      :align: center
      :width: 80%

#. Create or choose an existing IAM role to be used by Amazon Data Firehose in the **Advanced settings** section.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/06-choose-iam-role.png
      :title: Choose the IAM role in Advanced settings
      :alt: Choose the IAM role in Advanced settings
      :align: center
      :width: 80%

#. Click **Create Firehose stream** at the end of the page.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/07-create-firehose-stream.png
      :title: Firehose stream created
      :alt: Firehose stream created
      :align: center
      :width: 80%

Amazon EventBridge configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configure an Amazon EventBridge rule to send Trusted Advisor events to the Amazon Data Firehose delivery stream created in the previous step.

#. On your AWS console, search for ``eventbridge`` in the search bar or go to **Services** > **Application Integration** > **Amazon EventBridge**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/01-search-for-eventbridge.png
      :title: Search for Amazon EventBridge on the AWS console
      :alt: Search for Amazon EventBridge on the AWS console
      :align: center
      :width: 80%

#. Select **Event buses**, under **Default event bus**, click **default**, then click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/02-create-rule.png
      :title: Select the default event bus
      :alt: Select the default event bus
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/02-create-rule-2.png
      :title: Create rule on the default event bus
      :alt: Create rule on the default event bus
      :align: center
      :width: 80%

#. Select **Advanced builder**, assign a name to the EventBridge rule, and click **Next**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/03-assign-name-to-eventbridge.png
      :title: Select Advanced builder and assign a name to the EventBridge rule
      :alt: Select Advanced builder and assign a name to the EventBridge rule
      :align: center
      :width: 80%

#. In the **Build event pattern** section, choose **AWS events or EventBridge partner events** as **Event source**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/04-build-event-pattern.png
      :title: Choose AWS events or EventBridge partner events as event source
      :alt: Choose AWS events or EventBridge partner events as event source
      :align: center
      :width: 80%

#. In the **Event pattern** section, choose **AWS services** as **Event source**, **Trusted Advisor** as **AWS service**, and **All Events** as **Event type**. Click **Next**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/05-trusted-advisor-as-event-type.png
      :title: Choose Trusted Advisor as AWS service and All Events as event type
      :alt: Choose Trusted Advisor as AWS service and All Events as event type
      :align: center
      :width: 80%

#. Under **Select a target**, choose **Firehose stream** and select the stream created previously. Also, create a new role to access the delivery stream. Click **Next**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/06-choose-firehose-delivery-stream.png
      :title: Choose the Firehose stream as target
      :alt: Choose the Firehose stream as target
      :align: center
      :width: 80%

#. Review the configuration and click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/07-review-trusted-advisor-1.png
      :title: Review the configuration and create the rule
      :alt: Review the configuration and create the rule
      :align: center
      :width: 80%

After you create the rule, EventBridge sends each Trusted Advisor event to the specified S3 bucket. Make sure you enable the Trusted Advisor service, as described in the next section; otherwise, you won't get any data.

AWS Trusted Advisor configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On your AWS console, search for ``trusted advisor`` in the search bar or go to **Services** > **Management & Governance** > **Trusted Advisor**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/01-search-for-trusted-advisor.png
      :title: Search for Trusted Advisor on the AWS console
      :alt: Search for Trusted Advisor on the AWS console
      :align: center
      :width: 80%

#. Go to **Manage Trusted Advisor** in the left menu and click **Enabled**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/02-enable-trusted-advisor.png
      :title: Enable Trusted Advisor from Manage Trusted Advisor
      :alt: Enable Trusted Advisor from Manage Trusted Advisor
      :align: center
      :width: 80%

After you enable it, Trusted Advisor reviews the different checks for the AWS account. Check the `official AWS documentation <https://docs.aws.amazon.com/awssupport/latest/user/get-started-with-aws-trusted-advisor.html>`__ to learn more about the available Trusted Advisor checks.

.. _tr_advisor_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

.. include:: /_templates/cloud/amazon/bucket_policies.rst

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

After creating a policy, you can attach it directly to a user or to a group the user belongs to. In :ref:`attaching a policy to an IAM user group <attaching_policy_to_IAM_user_group>`, you see how to attach a policy to a group. More information on using other methods is available in the `AWS documentation <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-add-console>`__.

Configure Wazuh to process AWS Trusted Advisor logs
---------------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket. Set the path value to the Firehose stream prefix you entered earlier. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="custom">
          <name><WAZUH_AWS_BUCKET></name>
          <path>trusted-advisor</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent
