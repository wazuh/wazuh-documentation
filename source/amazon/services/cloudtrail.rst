.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_cloudtrail:

AWS CloudTrail
==============

`AWS CloudTrail <https://aws.amazon.com/cloudtrail/>`_ is a service that enables auditing of your AWS account. With CloudTrail, you can log, monitor, and retain account activity related to actions across your AWS infrastructure. This service provides event history of your AWS account activity, such as actions taken through the AWS Management Console, AWS SDKs, command line tools, and other AWS services.

Configuration
-------------

Amazon configuration
^^^^^^^^^^^^^^^^^^^^

1. From your AWS console, choose “CloudTrail” from the Deployment & Management section:

.. thumbnail:: ../../images/aws/aws-cloudtrail-1.png
    :align: center
    :width: 100%

2. Create a new trail:

.. thumbnail:: ../../images/aws/aws-cloudtrail-2.png
    :align: center
    :width: 100%

3. Provide a name for the new S3 bucket that will be used to store the CloudTrail logs (remember the name you provide here, you’ll need to reference it during plugin setup):

.. thumbnail:: ../../images/aws/aws-cloudtrail-3.png
    :align: center
    :width: 100%

Wazuh configuration
^^^^^^^^^^^^^^^^^^^

1. Open the Wazuh configuration file and add the following configuration block to enable the integration with CloudTrail. Enter the IAM credentials you created before and the AWS Account ID of the CloudTrail logs to be processed:

.. code-block:: xml

  <wodle name="aws-s3">
    <disabled>no</disabled>
    <interval>10m</interval>
    <run_on_start>yes</run_on_start>
    <skip_on_error>yes</skip_on_error>
    <bucket type="cloudtrail">
      <name>wazuh-cloudtrail</name>
      <access_key>insert_access_key</access_key>
      <secret_key>insert_secret_key</secret_key>
    </bucket>
  </wodle>

To monitor logs for multiple AWS accounts, configure multiple ``<bucket>`` options within the ``aws-s3`` wodle. Bucket tags must have a ``type`` attribute which value can be ``cloudtrail`` to monitor CloudTrail logs or ``custom`` to monitor any other type of logs, for example, Firehose ones.

*Check the user manual reference to read more details about each setting:* :ref:`AWS S3 settings <wodle_s3>`

2. Restart Wazuh in order to apply the changes:

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

Examples
--------
