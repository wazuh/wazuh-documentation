.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure different services required to integrate AWS KMS service with Wazuh.

AWS Key Management Service (KMS)
================================
`AWS Key Management Service <https://aws.amazon.com/kms/>`__ (KMS) makes it easy for users to create and manage keys and control the use of encryption across a wide range of AWS services and in their applications. AWS KMS is a secure and resilient service that uses FIPS 140-2 validated hardware security modules to protect their keys. AWS KMS is integrated with AWS CloudTrail to provide users with logs of all key usage to help meet their regulatory and compliance needs.

AWS configuration
-----------------

The following sections cover how to configure different services required to integrate AWS KMS service with Wazuh.

.. thumbnail:: /images/cloud-security/aws/kms/key.png
   :align: center
   :width: 80%

Amazon Data Firehose configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create an Amazon Data Firehose delivery stream to store the AWS KMS events into the desired S3 bucket so Wazuh can process them.

#. :doc:`Create a new S3 bucket <../prerequisites/S3-bucket>`. (If you want to use an already created one, skip this step).

#. On your AWS console, Search for "*amazon data firehose*" in the search bar at the top of the page or go to **Services** > **Analytics** > **Amazon Data Firehose**.

   .. thumbnail:: /images/cloud-security/aws/kms/01-data-firehose.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/kms/02-create-firehose-stream.png
      :align: center
      :width: 80%

#. Select **Direct PUT** and **Amazon S3** as the desired **Source** and **Destination**, respectively.

   .. thumbnail:: /images/cloud-security/aws/kms/03-select-direct-put.png
      :align: center
      :width: 80%

#. Choose an appropriate **Firehose stream name**.

   .. thumbnail:: /images/cloud-security/aws/kms/04-firehose-stream-name.png
      :align: center
      :width: 80%

#. Select the desired S3 bucket as the destination. It is possible to specify a custom prefix to alter the path where AWS stores the logs. AWS Firehose creates a file structure ``YYYY/MM/DD/HH``, if a prefix is used the created file structure would be ``prefix-name/YYYY/MM/DD/HH``. If a prefix is used it must be specified under the Wazuh bucket configuration. In our case, the prefix is ``kms_compress_encrypted/``. Select your preferred compression, Wazuh supports any kind of compression but Snappy.

   .. thumbnail:: /images/cloud-security/aws/kms/05-select-desired-bucket.png
      :align: center
      :width: 80%

#. Create or choose an existing IAM role to be used by Amazon Data Firehose in the **Advanced settings** section.

   .. thumbnail:: /images/cloud-security/aws/kms/06-choose-iam-role.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream** at the end of the page. The new delivery stream will be created and its details will be shown as follows.

   .. thumbnail:: /images/cloud-security/aws/kms/07-create-firehose-stream.png
      :align: center
      :width: 80%

Amazon EventBridge configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configure an Amazon EventBridge rule to send KMS events to the Amazon Data Firehose delivery stream created in the previous step.

#. On your AWS console, search for "*eventbridge*" in the search bar at the top of the page or go to **Services** > **Application Integration** > **EventBridge**.

   .. thumbnail:: /images/cloud-security/aws/kms/01-search-for-eventbridge.png
      :align: center
      :width: 80%

#. Click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/kms/02-create-rule.png
      :align: center
      :width: 80%

#. Assign a name to the EventBridge rule and select the **Rule with an event pattern option**.

   .. thumbnail:: /images/cloud-security/aws/kms/03-assign-name-to-eventbridge.png
      :align: center
      :width: 80%

#. In the **Build event pattern** section, choose **AWS events or EventBridge partner events** as **Event source**.

   .. thumbnail:: /images/cloud-security/aws/kms/04-build-event-pattern.png
      :align: center
      :width: 80%

#. In the **Event pattern** section, choose **AWS services** as **Event source, Key Management Service (KMS)** as **AWS service**, and **All Events** as **Event type**. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/kms/05-kms-as-event-type.png
      :align: center
      :width: 80%

#. Under **Select a target**, choose **Firehose delivery stream** and select the stream created previously. Also, create a new role to access the delivery stream. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/kms/06-choose-firehose-delivery-stream.png
      :align: center
      :width: 80%

#. Review the configuration and click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/kms/07-review-kms-1.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/kms/07-review-kms-2.png
      :align: center
      :width: 80%

Once the rule is created, data will start to be sent to the previously created S3 bucket. Remember to first enable the service you want to monitor, otherwise, you won't get any data.

Policy configuration
^^^^^^^^^^^^^^^^^^^^






.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Wazuh configuration
-------------------

#. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following block:

    .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="custom">
          <name>wazuh-aws-wodle</name>
          <path>kms_compress_encrypted</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

    .. note::
      Check the :doc:`AWS S3 module </user-manual/reference/ossec-conf/wodle-s3>` reference manual to learn more about each setting.

#. Restart Wazuh in order to apply the changes:

    * If you're configuring a Wazuh manager:

      .. include:: /_templates/common/restart_manager.rst

    * If you're configuring a Wazuh agent:

      .. include:: /_templates/common/restart_agent.rst

