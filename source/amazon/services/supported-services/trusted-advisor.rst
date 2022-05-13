.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: AWS Trusted Advisor is a service that helps users reduce cost by optimizing their AWS environment. Learn how to configure and monitor it with Wazuh.

.. _amazon_trusted_advisor:

AWS Trusted Advisor
===================

`AWS Trusted Advisor <https://aws.amazon.com/premiumsupport/trustedadvisor/>`_ provides real time guidance to help users reduce cost, increase performance, and improve security by optimizing their AWS environment following AWS best practices. Trusted Advisor logs can be stored into a S3 bucket thanks to `Amazon EventBridge <https://aws.amazon.com/eventbridge/>`_ and `Amazon Kinesis Data Firehose <https://aws.amazon.com/kinesis/data-firehose/>`_, allowing Wazuh to process them and generate alerts using the built-in rules Wazuh provides, as well as any :ref:`custom rules <ruleset_custom>` available.

Amazon configuration
--------------------

Learn how to configure the different services required to integrate Trusted Advisor into Wazuh:

    .. thumbnail:: ../../../images/aws/trusted-advisor.png
      :align: center
      :width: 100%

Amazon Kinesis configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create an Amazon Kinesis Data Firehose delivery stream to be able to store the Trusted Advisor logs into the desired S3 bucket so Wazuh can process them.

#. :ref:`Create a new <S3_bucket>` S3 bucket. (If you want to use an already existing one, skip this step).

#. Search for ``kinesis`` in the search bar at the top of the page or go to ``Services`` > ``Analytics`` > ``Kinesis``:

    .. thumbnail:: ../../../images/aws/trusted-kinesis-0.png
      :align: center
      :width: 100%

#. Select the ``Kinesis Data Firehose`` option and then click in the ``Create delivery stream`` button:

    .. thumbnail:: ../../../images/aws/trusted-kinesis-1.png
      :align: center
      :width: 100%

#. Select ``Direct PUT`` and ``Amazon S3`` as the desired Source and Destination, respectively:

    .. thumbnail:: ../../../images/aws/trusted-kinesis-2.png
      :align: center
      :width: 100%

#. Choose an appropriate ``Delivery stream name``:

    .. thumbnail:: ../../../images/aws/trusted-kinesis-3.png
      :align: center
      :width: 100%

#. Leave both ``Data transformation`` and ``Record format conversion`` options disabled:

    .. thumbnail:: ../../../images/aws/trusted-kinesis-4.png
      :align: center
      :width: 100%

#. Select the desired S3 bucket as the destination. It is possible to specify a custom prefix to alter the path where AWS store the logs. AWS Firehose creates a file structure ``YYYY/MM/DD/HH``, if a prefix is used the created file structure would be ``prefix-name/YYYY/MM/DD/HH``. If a prefix is used it must be specified under the Wazuh Bucket configuration:

    .. thumbnail:: ../../../images/aws/trusted-kinesis-5.png
      :align: center
      :width: 100%

#. Create or choose an existing IAM role to be used by Kinesis Data Firehose to access within the ``Advanced settings`` section, if required:

    .. thumbnail:: ../../../images/aws/trusted-kinesis-6.png
      :align: center
      :width: 100%

#. Click on the ``Create delivery stream`` button at the end of the page. The new Delivery stream will be created and its details will be shown as follows:

    .. thumbnail:: ../../../images/aws/trusted-kinesis-7.png
      :align: center
      :width: 100%


Amazon EventBridge configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configure an Amazon EventBridge rule to send Trusted Advisor events to the Amazon Kinesis Data Firehose delivery stream created in the previous step.

#. Search for ``EventBridge`` in the search bar at the top of the page or go to ``Services`` > ``Application Integration`` > ``EventBridge``:

    .. thumbnail:: ../../../images/aws/trusted-eventbridge-1.png
      :align: center
      :width: 100%

#. Click on the ``Create rule`` button:

    .. thumbnail:: ../../../images/aws/trusted-eventbridge-2.png
      :align: center
      :width: 70%

#. Give an appropriated name for the EventBridge rule:

    .. thumbnail:: ../../../images/aws/trusted-eventbridge-3.png
      :align: center
      :width: 100%

#. In the ``Define pattern`` section choose ``Event pattern``, then ``Pre-defined pattern by service``. Select ``AWS`` and ``Trusted Advisor`` as the ``Service provider`` and ``Service name``, respectively. Choose ``All Events`` as the desired ``Event type``:

    .. thumbnail:: ../../../images/aws/trusted-eventbridge-4.png
      :align: center
      :width: 100%

#. Select the Firehose delivery stream created following the Kinesis steps as the ``Target`` for this EventBridge rule. Create a new role or specify an existing one for this resource if required:

    .. thumbnail:: ../../../images/aws/trusted-eventbridge-5.png
      :align: center
      :width: 100%


#. Scroll down and click on ``Create rule``. The new rule will now be present in the ``Amazon EventBridge`` > ``Rules`` section, ready to be used. From now on, every time a Trusted Advisor event is sent, it will be stored in the specified S3 bucket. Remember to enable the Trusted Advisor service first, otherwise no data will be processed:

    .. thumbnail:: ../../../images/aws/trusted-eventbridge-6.png
      :align: center
      :width: 70%

AWS Trusted Advisor configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Search for ``Trusted Advisor`` in the search bar at the top of the page or go to ``Services`` > ``Management & Governance`` > ``Trusted Advisor``:

    .. thumbnail:: ../../../images/aws/trusted-advisor-1.png
      :align: center
      :width: 70%

#. Go to ``Preferences`` in the left menu and click on the ``Enable Trusted Advisor`` button:

    .. thumbnail:: ../../../images/aws/trusted-advisor-2.png
      :align: center
      :width: 70%

Once enabled, Trusted Advisor reviews the different checks for the AWS account. Check the `official AWS documentation <https://docs.aws.amazon.com/awssupport/latest/user/get-started-with-aws-trusted-advisor.html>`_ to learn more about the different Trusted Advisor Checks available.


Policy configuration
++++++++++++++++++++

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Wazuh configuration
-------------------

#. Access the Wazuh configuration in ``Wazuh`` > ``Management`` > ``Configuration`` using the Wazuh UI or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the host:

    .. thumbnail:: ../../../images/aws/trusted-ui-1.png
      :align: center
      :width: 100%

    .. thumbnail:: ../../../images/aws/trusted-ui-2.png
      :align: center
      :width: 100%

#. Add the following :ref:`AWS S3 module <wodle_s3>` configuration to the file, replacing ``wazuh-aws-wodle`` with the name of the S3 bucket:

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
      In this example the ``aws_profile`` authentication parameter was used. Check the :ref:`credentials <amazon_credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart Wazuh in order to apply the changes. The service can be manually restarted using the following command outside the Wazuh UI:

    * If you're configuring a Wazuh manager:

      a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-manager

      b. For SysV Init:

      .. code-block:: console

        # service wazuh-manager restart

    * If you're configuring a Wazuh agent:

      a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-agent

      b. For SysV Init:

      .. code-block:: console

        # service wazuh-agent restart

The :ref:`AWS S3 module <wodle_s3>` configuration can be accessed and modified from the ``Wazuh`` > ``Management`` > ``Configuration`` > ``Cloud security monitoring`` once add it in the :ref:`Local configuration <reference_ossec_conf>`

    .. thumbnail:: ../../../images/aws/trusted-ui-3.png
      :align: center
      :width: 70%
