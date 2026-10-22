.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure different services required to integrate AWS Macie service with Wazuh.

Amazon Macie
============

`Amazon Macie <https://aws.amazon.com/macie/>`__ is a security service that uses machine learning to automatically discover, classify, and protect sensitive data in AWS. Macie recognizes sensitive data, such as personally identifiable information (PII) or intellectual property. It provides dashboards and alerts that show how this data is accessed or moved. The fully managed service continuously monitors data access activity for anomalies and generates detailed alerts when it detects potential unauthorized access or inadvertent data leaks.

AWS configuration
-----------------

The following sections cover how to configure the services required to integrate Amazon Macie with Wazuh. The following diagram shows how Amazon Macie events reach the Wazuh agent through Amazon EventBridge, Amazon Data Firehose, and an S3 bucket.

.. thumbnail:: /images/cloud-security/aws/macie/macie.png
   :title: Amazon Macie events flow through Amazon EventBridge, Amazon Data Firehose, and an S3 bucket to Wazuh
   :alt: Amazon Macie events flow through Amazon EventBridge, Amazon Data Firehose, and an S3 bucket to Wazuh
   :align: center
   :width: 80%

Amazon Data Firehose configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create an Amazon Data Firehose delivery stream to store the Amazon Macie events into the desired S3 bucket so Wazuh can process them.

#. :doc:`Create a new </cloud-security/amazon/services/prerequisites/S3-bucket>` S3 bucket, or skip this step to use an existing bucket.

#. On your AWS console, search for ``amazon data firehose`` in the search bar or go to **Services** > **Analytics** > **Amazon Data Firehose**.

   .. thumbnail:: /images/cloud-security/aws/macie/01-data-firehose.png
      :title: Search for Amazon Data Firehose on the AWS console
      :alt: Search for Amazon Data Firehose on the AWS console
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/macie/02-create-firehose-stream.png
      :title: Create Firehose stream
      :alt: Create Firehose stream
      :align: center
      :width: 80%

#. Select **Direct PUT** and **Amazon S3** as the desired **Source** and **Destination**, respectively, and choose an appropriate **Firehose stream name**.

   .. thumbnail:: /images/cloud-security/aws/macie/03-select-direct-put.png
      :title: Select Direct PUT as source, Amazon S3 as destination, and a Firehose stream name
      :alt: Select Direct PUT as source, Amazon S3 as destination, and a Firehose stream name
      :align: center
      :width: 80%

#. Select the desired S3 bucket as the destination. You can specify a custom prefix to change the path where AWS stores the logs. Amazon Data Firehose creates a file structure ``YYYY/MM/DD/HH``. If you use a prefix, the file structure is ``prefix-name/YYYY/MM/DD/HH``, and you must specify the prefix under the Wazuh bucket configuration. In this example, the prefix is ``macie/``.

   .. thumbnail:: /images/cloud-security/aws/macie/05-select-desired-bucket.png
      :title: Select the destination S3 bucket and the macie/ prefix
      :alt: Select the destination S3 bucket and the macie/ prefix
      :align: center
      :width: 80%

#. Create or choose an existing IAM role to be used by Amazon Data Firehose in the **Advanced settings** section.

   .. thumbnail:: /images/cloud-security/aws/macie/06-choose-iam-role.png
      :title: Choose the IAM role in Advanced settings
      :alt: Choose the IAM role in Advanced settings
      :align: center
      :width: 80%

#. Click **Create Firehose stream** at the end of the page.

   .. thumbnail:: /images/cloud-security/aws/macie/07-create-firehose-stream.png
      :title: Firehose stream created
      :alt: Firehose stream created
      :align: center
      :width: 80%

Amazon EventBridge configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configure an Amazon EventBridge rule to send Macie events to the Amazon Data Firehose delivery stream created in the previous step.

#. On your AWS console, search for ``eventbridge`` in the search bar or go to **Services** > **Application Integration** > **Amazon EventBridge**.

   .. thumbnail:: /images/cloud-security/aws/macie/01-search-for-eventbridge.png
      :title: Search for Amazon EventBridge on the AWS console
      :alt: Search for Amazon EventBridge on the AWS console
      :align: center
      :width: 80%

#. Select **Event buses**, under **Default event bus**, click **default**, then click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/macie/02-create-rule.png
      :title: Select the default event bus
      :alt: Select the default event bus
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/macie/02-create-rule-2.png
      :title: Create rule on the default event bus
      :alt: Create rule on the default event bus
      :align: center
      :width: 80%

#. Select **Advanced builder**, assign a name to the EventBridge rule, and click **Next**.

   .. thumbnail:: /images/cloud-security/aws/macie/03-assign-name-to-eventbridge.png
      :title: Select Advanced builder and assign a name to the EventBridge rule
      :alt: Select Advanced builder and assign a name to the EventBridge rule
      :align: center
      :width: 80%

#. In the **Build event pattern** section, choose **AWS events or EventBridge partner events** as **Event source**.

   .. thumbnail:: /images/cloud-security/aws/macie/04-build-event-pattern.png
      :title: Choose AWS events or EventBridge partner events as event source
      :alt: Choose AWS events or EventBridge partner events as event source
      :align: center
      :width: 80%

#. In the **Event pattern** section, choose **AWS services** as **Event source**, **Macie** as **AWS service**, and **All Events** as **Event type**. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/macie/05-macie-as-event-type.png
      :title: Choose Macie as AWS service and All Events as event type
      :alt: Choose Macie as AWS service and All Events as event type
      :align: center
      :width: 80%

#. Under **Select a target**, choose Firehose stream and select the stream created previously. Also, create a new role to access the delivery stream. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/macie/06-choose-firehose-delivery-stream.png
      :title: Choose the Firehose stream as target
      :alt: Choose the Firehose stream as target
      :align: center
      :width: 80%

#. Review the configuration and click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/macie/07-review-macie-1.png
      :title: Review the configuration and create the rule
      :alt: Review the configuration and create the rule
      :align: center
      :width: 80%

After you create the rule, EventBridge sends each Macie event to the specified S3 bucket. Make sure you enable the Macie service, as described in the next section; otherwise, you won't get any data.

Amazon Macie configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On your AWS console, search for ``macie`` in the search bar and click **Amazon Macie** from the results.

   .. thumbnail:: /images/cloud-security/aws/macie/01-search-for-macie.png
      :title: Search for Amazon Macie on the AWS console
      :alt: Search for Amazon Macie on the AWS console
      :align: center
      :width: 80%

#. If you're setting up Macie for the first time, click **Get started** to proceed.

   .. thumbnail:: /images/cloud-security/aws/macie/02-click-get-started.png
      :title: Click Get started
      :alt: Click Get started
      :align: center
      :width: 80%

#. Click **Enable Macie** to enable the service.

   .. thumbnail:: /images/cloud-security/aws/macie/03-enable-macie.png
      :title: Enable Macie
      :alt: Enable Macie
      :align: center
      :width: 80%

   After you enable it, Macie inventories your S3 buckets and evaluates their security and access controls. It analyzes the objects in them only through sensitive data discovery jobs or automated sensitive data discovery. Check the `official AWS documentation <https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html>`__ to learn more about the service.

#. Create a sensitive data discovery job to generate sensitive data findings. In the Macie navigation pane, select **Jobs** and click **Create job**.

#. Choose **Select specific buckets**, select the bucket you want to monitor, and follow the wizard to create the job.

#. In the navigation pane, under **Settings**, select **Automated sensitive data discovery**. It's enabled by default for new Macie accounts. If it's disabled, click **Enable**. Automated discovery samples objects across your buckets, so its first findings can take up to 48 hours.

Macie publishes new findings to Amazon EventBridge, and the EventBridge rule forwards them to the S3 bucket.

.. _macie_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

.. include:: /_templates/cloud/amazon/bucket_policies.rst

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

After creating a policy, you can attach it directly to a user or to a group to which the user belongs. In :ref:`attaching a policy to an IAM user group <attaching_policy_to_IAM_user_group>`, you see how to attach a policy to a group. More information on using other methods is available in the `AWS documentation <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-add-console>`__.

Configure Wazuh to process Amazon Macie logs
--------------------------------------------

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
          <path>macie</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

      Check the :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` reference manual to learn more about each setting.

#. Save the changes and restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Macie use case
--------------

Amazon S3 (Simple Storage Service) provides secure and reliable storage capacity in the cloud. We recommend that you monitor this service to detect misconfigurations and sensitive data leakage.

The following use case shows Wazuh findings for Amazon Macie.

Sensitive data disclosure in S3 bucket
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When Macie finds sensitive data, such as financial information, credentials, or personal information, in an S3 bucket, it generates sensitive data findings. Each finding title ends with its Macie finding type, for example, **AWS Macie high severity finding - SensitiveData:S3Object/Multiple**. Low and medium severity findings are titled **AWS Macie finding**, followed by the type.

To see them, go to **Amazon Web Services** > **Findings** and filter by ``wazuh.rule.title:*Macie*``.

.. thumbnail:: /images/cloud-security/aws/macie/1-sensitive-data-disclosure-in-s3-bucket.png
   :title: Amazon Macie findings on the Wazuh dashboard
   :alt: Amazon Macie findings on the Wazuh dashboard
   :align: center
   :width: 80%

You can expand a finding to see more information, including its description and details about the affected S3 bucket.

.. thumbnail:: /images/cloud-security/aws/macie/2-sensitive-data-disclosure-in-s3-bucket.png
   :title: Amazon Macie finding details
   :alt: Amazon Macie finding details
   :align: center
   :width: 80%
