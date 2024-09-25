.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the different services required to integrate GuardDuty into Wazuh.

Amazon GuardDuty
================

`Amazon GuardDuty <https://aws.amazon.com/guardduty/?nc1=h_ls>`__ is a threat detection service that continuously monitors for malicious or unauthorized behavior to help you protect your AWS accounts and workloads. It monitors for activity such as unusual API calls or potentially unauthorized deployments that indicate a possible account compromise. GuardDuty also detects potentially compromised instances or reconnaissance by attackers.

AWS configuration
-----------------

The following sections cover how to configure the different services required to integrate Guard Duty into Wazuh.

Amazon GuardDuty configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. :doc:`Create a new S3 bucket <../prerequisites/S3-bucket>`. If you want to use an existing bucket, skip this step.
#. On your AWS console, search for "*guardduty*" in the search bar at the top of the page or navigate to **Services** > **Security, Identity, & Compliance** > **GuardDuty**.

   .. thumbnail:: /images/cloud-security/aws/guardduty/01-search-for-guardduty.png
      :align: center
      :width: 80%

#. `S3 Protection <https://docs.aws.amazon.com/guardduty/latest/ug/s3-protection.html>`__ enables Amazon GuardDuty to monitor object-level API operations to identify potential security risks for data within your S3 buckets. In the navigation pane, under **Protection plans**, click **S3 Protection** and enable S3 protection.

   .. thumbnail:: /images/cloud-security/aws/guardduty/02-enable-S3-protection.png
      :align: center
      :width: 80%

#. Confirm your selection.

   .. thumbnail:: /images/cloud-security/aws/guardduty/03-confirm-selection.png
      :align: center
      :width: 80%

#. In the navigation pane, go to **Settings**, scroll to **Findings export options**, and click **Configure now** to configure GuardDuty to export findings to an S3 bucket.

   .. thumbnail:: /images/cloud-security/aws/guardduty/04-click-configure-now.png
      :align: center
      :width: 80%

#. See the :doc:`configuring an S3 bucket <../prerequisites/S3-bucket>` and `creating symmetric encryption KMS keys <https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html#create-symmetric-cmk>`__ guides on how to create an S3 bucket and KMS key. Copy and paste the appropriate values into the **S3 bucket ARN** and **KMS key ARN** fields.

   .. thumbnail:: /images/cloud-security/aws/guardduty/05-s3-and-kms-arn.png
      :align: center
      :width: 80%

#. In the **Attach policy** section, click on **View Policy for S3 bucket** and **View Policy for KMS key**. Copy and attach the corresponding policy to the selected S3 bucket and the KMS key. Click **Save** to apply the configuration.

   .. note::

      For more information on how to change the S3 and KMS policies, see the `adding a bucket policy by using the Amazon S3 console <https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html>`__ and `changing a key policy <https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying.html#key-policy-modifying-how-to-console-policy-view>`__ guides.

   .. thumbnail:: /images/cloud-security/aws/guardduty/06-view-policy-for-s3-and-kms.png
      :align: center
      :width: 80%

#. You'll have an interface similar to this, you can also set the frequency for updating the S3 bucket with the GuardDuty findings. In our case, the frequency is set to 15 minutes.

   .. thumbnail:: /images/cloud-security/aws/guardduty/07-guardduty-frequency.png
      :align: center
      :width: 80%

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon GuardDuty logs
------------------------------------------------

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/guardduty/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/guardduty/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the file, replacing ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket:

   .. code-block:: xml

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

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh dashboard:

   -  Wazuh manager:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent

GuardDuty use cases
-------------------

Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the cloud. When using this service, it is highly recommended to monitor it for intrusion attempts or other unauthorized actions performed against your cloud infrastructure.

Below are some use cases for Wazuh rules built for EC2.

.. contents::
   :local:
   :depth: 2
   :backlinks: none

Brute force attacks
^^^^^^^^^^^^^^^^^^^

If an instance has an open port that is receiving a brute force attack, the following alerts with rule ID *80301* will be shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/guardduty/1-brute-force-attacks.png
   :align: center
   :width: 80%

It shows information about the attacked host, the attacker, and which port is being attacked.

.. thumbnail:: /images/cloud-security/aws/guardduty/2-brute-force-attacks.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/guardduty/3-brute-force-attacks.png
   :align: center
   :width: 80%

EC2 API Calls made from unusual network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If an API call is made from an unusual network, the following alerts with rule ID *80301*, *80302*, and *80303* will be shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/guardduty/1-ec2-api-calls-made-from-unusual-network.png
   :align: center
   :width: 80%

It shows the location of the unusual network, the user who made the API calls, and which API calls it made.

.. thumbnail:: /images/cloud-security/aws/guardduty/2-ec2-api-calls-made-from-unusual-network.png
   :align: center
   :width: 80%

Compromised EC2 instance
^^^^^^^^^^^^^^^^^^^^^^^^

If there is any indicator of a compromised EC2 instance, an alert with rule ID *80303* will be shown on the Wazuh dashboard explaining what's happening. Some examples of alerts are shown below.

.. thumbnail:: /images/cloud-security/aws/guardduty/1-compromised-ec2-instance.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/guardduty/2-compromised-ec2-instance.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/guardduty/3-compromised-ec2-instance.png
   :align: center
   :width: 80%

To sum up, the following screenshot shows some alerts generated for a compromised EC2 instance.

.. thumbnail:: /images/cloud-security/aws/guardduty/4-compromised-ec2-instance.png
   :align: center
   :width: 80%
