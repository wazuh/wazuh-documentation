.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_vpc:

Amazon VPC
==========

`Amazon Virtual Private Cloud <https://aws.amazon.com/vpc/?nc1=h_ls>`_ (Amazon VPC) lets users provision a logically isolated section of the AWS Cloud where they can launch AWS resources in a virtual network that they define. Users have complete control over their virtual networking environment, including selection of their own IP address range, creation of subnets, and configuration of route tables and network gateways. Users can use both IPv4 and IPv6 in their VPC for secure and easy access to resources and applications.

Amazon configuration
--------------------

1. Select an existing S3 Bucket or :ref:`create a new one. <S3_bucket>` 

2. Go to Services > Compute > EC2:

.. thumbnail:: ../../images/aws/aws-create-vpc-1.png
  :align: center
  :width: 70%

3. Go to Network & Security > Network Interfaces on the left menu. Select a network interface and select *Create a flow log* on the *Actions* menu:

.. thumbnail:: ../../images/aws/aws-create-vpc-2.png
  :align: center
  :width: 70%

4. Change all fields to look like the following screenshot and paste the ARN of the previously created bucket:

.. thumbnail:: ../../images/aws/aws-create-vpc-3.png
  :align: center
  :width: 70%


Wazuh configuration
-------------------

1. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following block:

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

Use cases
---------

- `Create a VPC`_
- `Working with VPC Data`_

Using an Amazon VPC (Virtual Private Cloud), users can logically isolate some of their AWS assets from the rest of their cloud infrastructure. Users can actually set up their own networks in the cloud. This is why, it is usually important to monitor changes to their VPCs.

Create a VPC
^^^^^^^^^^^^

If a VPC is created, the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-vpc-1.png
  :align: center
  :width: 70%

If an user without proper permissions attempts to create a VPC, the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-vpc-2.png
  :align: center
  :width: 70%

Working with VPC Data
^^^^^^^^^^^^^^^^^^^^^

A VPC alert contains data such as dest and source IP address, dst and source port and how many bytes were sent:

.. thumbnail:: ../../images/aws/aws-vpc-3.png
  :align: center
  :width: 70%

These alerts can be easily analyzed using visualizations like the following one:

.. thumbnail:: ../../images/aws/vpc_flow_dataviz.png
  :align: center
  :width: 70%

On that visualization users can look for peaks in their network, once they found a peak they can filter, the alerts generated on that time and check which IPs were communicating. Since IP address is a field used in many AWS alerts, they'll probably found other alerts and find out what happened.

.. note::
  If while configuring the permissions policy we're asked for special permissions, we need to add the next block into the policy file:

  Navigate to Services > VPC > Policies > Policy file.

    .. code-block:: xml

      {
        "Sid": "VisualEditor0",
        "Effect": "Allow",
        "Action": "ec2:DescribeFlowLogs",
        "Resource": "*"
      }
