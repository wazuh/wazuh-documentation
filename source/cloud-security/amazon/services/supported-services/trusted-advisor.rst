.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The following sections cover how to configure the different services required to integrate Trusted Advisor into Wazuh.

AWS Trusted Advisor
===================

`AWS Trusted Advisor <https://aws.amazon.com/premiumsupport/trustedadvisor/>`__ helps users optimize their AWS environment by following AWS best practices to provide real-time guidance that aims to reduce cost, increase performance, and improve security. Trusted Advisor logs can be stored in an S3 bucket thanks to `Amazon EventBridge <https://aws.amazon.com/eventbridge/>`__ and `Amazon Data Firehose <https://aws.amazon.com/kinesis/data-firehose/>`__, allowing Wazuh to process them and generate alerts using the built-in rules Wazuh provides, as well as any :doc:`custom rules <>` available.

.. note::

  You must have a Business, Enterprise On-Ramp, or Enterprise AWS Support plan to create an EventBridge rule for Trusted Advisor checks. For more information, see `changing AWS support plans <https://docs.aws.amazon.com/awssupport/latest/user/changing-support-plans.html>`__.

AWS configuration
-----------------

The following sections cover how to configure the different services required to integrate Trusted Advisor into Wazuh.

.. thumbnail:: /images/cloud-security/aws/trusted-advisor/trusted.png
   :align: center
   :width: 80%

Amazon Data Firehose configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create an Amazon Data Firehose delivery stream to store the Trusted Advisor logs into the desired S3 bucket so Wazuh can process them.

#. :doc:`Create a new S3 bucket <../prerequisites/S3-bucket>`. If you want to use an already existing one, skip this step.

#. On your AWS console, Search for "*amazon data firehose*" in the search bar at the top of the page or go to **Services** > **Analytics** > **Amazon Data Firehose**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/01-data-firehose.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/02-create-firehose-stream.png
      :align: center
      :width: 80%

#. Select **Direct PUT** and **Amazon S3** as the desired Source and Destination, respectively.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/03-select-direct-put.png
      :align: center
      :width: 80%

#. Choose an appropriate **Firehose stream name**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/04-firehose-stream-name.png
      :align: center
      :width: 80%

#. Select the desired S3 bucket as the destination. It is possible to specify a custom prefix to alter the path where AWS stores the logs. AWS Firehose creates a file structure ``YYYY/MM/DD/HH``, if a prefix is used the created file structure would be ``prefix-name/YYYY/MM/DD/HH``. If a prefix is used it must be specified under the Wazuh bucket configuration. In our case, the prefix is ``trusted-advisor/``. Select your preferred compression, Wazuh supports any kind of compression but Snappy.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/05-select-desired-bucket.png
      :align: center
      :width: 80%

#. Create or choose an existing IAM role to be used by Amazon Data Firehose in the **Advanced settings** section.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/06-choose-iam-role.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream** at the end of the page. The new firehose stream will be created and its details will be shown as follows.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/07-create-firehose-stream.png
      :align: center
      :width: 80%

Amazon EventBridge configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configure an Amazon EventBridge rule to send Trusted Advisor events to the Amazon Data Firehose delivery stream created in the previous step.

#. On your AWS console, search for "*eventbridge*" in the search bar at the top of the page or navigate to **Services** > **Application Integration** > **EventBridge**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/01-search-for-eventbridge.png
      :align: center
      :width: 80%

#. Click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/02-create-rule.png
      :align: center
      :width: 80%

#. Give a name to the EventBridge rule and select the **Rule with an event pattern** option.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/03-assign-name-to-eventbridge.png
      :align: center
      :width: 80%

#. In the **Build event pattern** section, choose **AWS events or EventBridge partner events** as **Event source**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/04-build-event-pattern.png
      :align: center
      :width: 80%

#. In the **Event pattern** section, choose **AWS services** as **Event source**, **Trusted Advisor** as **AWS service**, and **All Events** as **Event type**. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/05-trusted-advisor-as-event-type.png
      :align: center
      :width: 80%

#. Under **Select a target**, choose **Firehose stream** and select the stream created previously. Also, create a new role to access the delivery stream. Click **Next** to apply the configuration.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/06-choose-firehose-delivery-stream.png
      :align: center
      :width: 80%

#. Review the configuration and click **Create rule**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/07-review-trusted-advisor-1.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/07-review-trusted-advisor-2.png
      :align: center
      :width: 80%

Once the rule is created, every time a *Trusted Advisor* event is sent, it will be stored in the specified S3 bucket. Remember to first enable the *Trusted Advisor* service, otherwise, you won't get any data.

AWS Trusted Advisor configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On your AWS console, search for "*Trusted Advisor*" in the search bar at the top of the page or navigate to **Services** > **Management & Governance** > **Trusted Advisor**.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/01-search-for-trusted-advisor.png
      :align: center
      :width: 80%

#. Go to **Manage Trusted Advisor** in the left menu and click on the **Enabled** button.

   .. thumbnail:: /images/cloud-security/aws/trusted-advisor/02-enable-trusted-advisor.png
      :align: center
      :width: 80%

Once enabled, Trusted Advisor reviews the different checks for the AWS account. Check the `official AWS documentation <https://docs.aws.amazon.com/awssupport/latest/user/get-started-with-aws-trusted-advisor.html>`__ to learn more about the different Trusted Advisor checks available.

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon Trusted Advisor logs
------------------------------------------------------












#. Access the Wazuh configuration in **Settings** using the Wazuh UI or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the host:

    .. thumbnail:: /images/cloud-security/aws/trusted-ui-1.png
      :align: center
      :width: 80%

    .. thumbnail:: /images/cloud-security/aws/trusted-ui-2.png
      :align: center
      :width: 80%

#. Add the following :doc:`AWS S3 module </user-manual/reference/ossec-conf/wodle-s3>` configuration to the file, replacing ``wazuh-aws-wodle`` with the name of the S3 bucket:

    .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="custom">
          <name>wazuh-aws-wodle</name>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

    .. note::
      In this example, the ``aws_profile`` authentication parameter was used. Check the :doc:`credentials <../prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh UI:

    * If you're configuring a Wazuh manager:

      .. include:: /_templates/common/restart_manager.rst

    * If you're configuring a Wazuh agent:

      .. include:: /_templates/common/restart_agent.rst


The :ref:`AWS S3 module <wodle_s3>` configuration can be reviewed from **Settings** > **Cloud security monitoring** once added in the :ref:`Local configuration <reference_ossec_conf>`.

    .. thumbnail:: /images/cloud-security/aws/trusted-ui-3.png
      :align: center
      :width: 80%
