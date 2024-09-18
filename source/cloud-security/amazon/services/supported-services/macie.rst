.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure different services required to integrate AWS Macie service with Wazuh.

Amazon Macie
============

`Amazon Macie <https://aws.amazon.com/macie/>`__ is a security service that uses machine learning to automatically discover, classify, and protect sensitive data in AWS. Macie recognizes sensitive data such as personally identifiable information (PII) or intellectual property and provides you with dashboards and alerts that give visibility into how this data is being accessed or moved. The fully managed service continuously monitors data access activity for anomalies and generates detailed alerts when it detects the risk of unauthorized access or inadvertent data leaks.

AWS configuration
-----------------

The following sections cover how to configure different services required to integrate AWS Macie service with Wazuh.

.. thumbnail:: /images/cloud-security/aws/macie/macie.png
   :align: center
   :width: 80%

Amazon Data Firehose configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create an Amazon Data Firehose delivery stream to store the Amazon Macie events into the desired S3 bucket so Wazuh can process them.

#. :doc:`Create a new S3 bucket <../prerequisites/S3-bucket>`. (If you want to use an already created one, skip this step).

#. On your AWS console, Search for "*amazon data firehose*" in the search bar at the top of the page or go to **Services** > **Analytics** > **Amazon Data Firehose**.

   .. thumbnail:: /images/cloud-security/aws/macie/01-data-firehose.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/macie/02-create-firehose-stream.png
      :align: center
      :width: 80%

#. Select **Direct PUT** and **Amazon S3** as the desired **Source** and **Destination**, respectively.

   .. thumbnail:: /images/cloud-security/aws/macie/03-select-direct-put.png
      :align: center
      :width: 80%

#. Choose an appropriate **Firehose stream name**.

   .. thumbnail:: /images/cloud-security/aws/macie/04-firehose-stream-name.png
      :align: center
      :width: 80%

#. Select the desired S3 bucket as the destination. It is possible to specify a custom prefix to alter the path where AWS stores the logs. AWS Firehose creates a file structure ``YYYY/MM/DD/HH``, if a prefix is used the created file structure would be ``prefix-name/YYYY/MM/DD/HH``. If a prefix is used it must be specified under the Wazuh bucket configuration. In our case, the prefix is ``macie/``.

   .. thumbnail:: /images/cloud-security/aws/macie/05-select-desired-bucket.png
      :align: center
      :width: 80%

#. Create or choose an existing IAM role to be used by Amazon Data Firehose in the **Advanced settings** section.

   .. thumbnail:: /images/cloud-security/aws/macie/06-choose-iam-role.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream** at the end of the page. The new delivery stream will be created and its details will be shown as follows.

   .. thumbnail:: /images/cloud-security/aws/macie/07-create-firehose-stream.png
      :align: center
      :width: 80%

Amazon EventBridge configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configure an Amazon EventBridge rule to send Macie events to the Amazon Data Firehose delivery stream created in the previous step.

#. On your AWS console, search for "*eventbridge*" in the search bar at the top of the page or navigate to **Services** > **Application Integration** > **EventBridge**.

   .. thumbnail:: /images/cloud-security/aws/macie/01-search-for-eventbridge.png
      :align: center
      :width: 80%

#. Click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/macie/02-create-rule.png
      :align: center
      :width: 80%

#. Assign a name to the rule and select the **Rule with an event pattern** option.

   .. thumbnail:: /images/cloud-security/aws/macie/03-assign-name-to-eventbridge.png
      :align: center
      :width: 80%

#. In the **Build event pattern** section, choose **AWS events or EventBridge partner events** as **Event source**.

   .. thumbnail:: /images/cloud-security/aws/macie/04-build-event-pattern.png
      :align: center
      :width: 80%

#. In the **Event pattern** section, choose **AWS services** as **Event source**, **Macie** as **AWS service**, and **All Events** as **Event type**. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/macie/05-macie-as-event-type.png
      :align: center
      :width: 80%

#. Under **Select a target**, choose **Firehose delivery stream** and select the stream created previously. Also, create a new role to access the delivery stream. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/macie/06-choose-firehose-delivery-stream.png
      :align: center
      :width: 80%

#. Review the configuration and click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/macie/07-review-macie-1.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/macie/07-review-macie-2.png
      :align: center
      :width: 80%

Once the rule is created, every time a *Macie* event is sent, it will be stored in the specified S3 bucket. Remember to first enable the *Macie* service, otherwise, you won't get any data.

Amazon Macie configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On your AWS console, search for "*Amazon Macie*" in the search bar and click **Amazon Macie** from the results.

   .. thumbnail:: /images/cloud-security/aws/macie/01-search-for-macie.png
      :align: center
      :width: 80%

#. You'll have this interface if this is the first time of setting up the service, click **Get started** to proceed.

   .. thumbnail:: /images/cloud-security/aws/macie/02-click-get-started.png
      :align: center
      :width: 80%

#. Click **Enable Macie** to enable the service.

   .. thumbnail:: /images/cloud-security/aws/macie/03-enable-macie.png
      :align: center
      :width: 80%

Once enabled, Macie provides visibility into data security risks and enables automated protection against those risks. Check the `official AWS documentation <https://aws.amazon.com/macie/>`__ to learn more about the service.

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon Macie logs
--------------------------------------------

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/macie/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/macie/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS configuration </user-manual/reference/ossec-conf/wodle-s3>` to the file, replacing ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket:

   .. code-block:: xml

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

      Check the :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` reference manual to learn more about each setting.

#. Restart Wazuh in order to apply the changes:

   -  Wazuh manager:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent

Use case
--------

Amazon S3 (Simple Storage Service) provides secure and reliable storage capacity in the cloud. When using this service, it is highly recommended to monitor it to detect misconfigurations and sensitive data leakage.

Below is a use case for Wazuh alerts built for S3.

Sensitive data disclosure in S3 bucket
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When sensitive data such as financial information, credentials, and personal information are found in an S3 bucket, the following alerts with rule ID *80352* and *80354* will be displayed on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/macie/1-sensitive-data-disclosure-in-s3-bucket.png
   :align: center
   :width: 80%

You can expand the alert to see more information such as the description of the alert, and details about the affected S3 bucket.

.. thumbnail:: /images/cloud-security/aws/macie/2-sensitive-data-disclosure-in-s3-bucket.png
   :align: center
   :width: 80%
