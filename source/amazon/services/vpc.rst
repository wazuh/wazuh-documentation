.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_vpc:

Amazon VPC
==========

`Amazon Virtual Private Cloud <https://aws.amazon.com/vpc/?nc1=h_ls>`_ (Amazon VPC) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways. You can use both IPv4 and IPv6 in your VPC for secure and easy access to resources and applications.

Amazon configuration
--------------------

1. Go to Services > Storage > S3:

.. thumbnail:: ../../images/aws/aws-create-firehose-1.png
  :align: center
  :width: 100%

2. Click on the *Create bucket*:

.. thumbnail:: ../../images/aws/aws-create-firehose-2.png
  :align: center
  :width: 100%

3. Create a new bucket, giving it a name and clicking on the *Create* button. Don't forget to save its Bucket ARN, you'll need it later in the process:

.. thumbnail:: ../../images/aws/aws-create-firehose-3.png
  :align: center
  :width: 50%

4. Go to Services > Compute > EC2:

.. thumbnail:: ../../images/aws/aws-create-vpc-1.png
  :align: center
  :width: 100%

5. Go to Network & Security > Network Interfaces on the left menu. Select a network interface and select *Create a flow log* on the *Actions* menu:

.. thumbnail:: ../../images/aws/aws-create-vpc-2.png
  :align: center
  :width: 100%

6. Change all fields to look like the following screenshot and paste the ARN of the previously created bucket:

.. thumbnail:: ../../images/aws/aws-create-vpc-3.png
  :align: center
  :width: 100%

Wazuh configuration
-------------------

1. Open the configuration file and add the following block:

.. code-block:: xml

  <wodle name="aws-s3">
    <disabled>no</disabled>
    <interval>10m</interval>
    <run_on_start>yes</run_on_start>
    <skip_on_error>yes</skip_on_error>
    <bucket type="vpcflow">
      <name>wazuh-aws-wodle</name>
      <path>vpc</path>
      <aws_profile>default</aws_profile>
    </bucket>
  </wodle>

.. note::
  Check the :ref:`AWS S3 module <wodle_s3>` reference manual to learn more about each setting.

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
