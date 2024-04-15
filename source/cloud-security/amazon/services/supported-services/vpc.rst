.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Amazon VPC is a service that allows users to launch AWS resources in a logically isolated section of the AWS Cloud. Learn how to configure and monitor its changes with Wazuh.

.. _amazon_vpc:

Amazon Virtual Private Cloud (VPC)
==================================

`Amazon Virtual Private Cloud <https://aws.amazon.com/vpc/?nc1=h_ls>`_ (Amazon VPC) lets users provision a logically isolated section of the AWS Cloud where they can launch AWS resources in a virtual network that they define. Users have complete control over their virtual networking environment, including the selection of their own IP address range, creation of subnets, and configuration of route tables and network gateways. Users can use both IPv4 and IPv6 in their VPC for secure and easy access to resources and applications.

Amazon configuration
--------------------

#. Select an existing S3 Bucket or :doc:`create a new one </cloud-security/amazon/services/prerequisites/S3-bucket>`.

#. Go to Services > Compute > EC2:

    .. thumbnail:: /images/cloud-security/aws/aws-create-vpc-1.png
      :align: center
      :width: 70%

#. Go to Network & Security > Network Interfaces on the left menu. Select a network interface and select *Create a flow log* on the *Actions* menu:

    .. thumbnail:: /images/cloud-security/aws/aws-create-vpc-2.png
      :align: center
      :width: 70%

#. Change all fields to look like the following screenshot and paste the ARN of the previously created bucket:

    .. thumbnail:: /images/cloud-security/aws/aws-create-vpc-3.png
      :align: center
      :width: 70%

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst
    
To allow an AWS user to execute the VPC integration, it must also have a policy like the following attached:

    .. code-block:: json

      {
        "Sid": "VisualEditor0",
        "Effect": "Allow",
        "Action": "ec2:DescribeFlowLogs",
        "Resource": "*"
      }


Wazuh configuration
-------------------

#. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following block:

    .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="vpcflow">
          <name>wazuh-aws-wodle</name>
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
        

Use cases
---------

- `Create a VPC`_
- `Working with VPC Data`_

Using an Amazon VPC (Virtual Private Cloud), users can logically isolate some of their AWS assets from the rest of their cloud infrastructure. Users can actually set up their own networks in the cloud. This is why it is usually important to monitor changes to their VPCs.

Create a VPC
^^^^^^^^^^^^

If a VPC is created, the following alert will be shown on Kibana:

.. thumbnail:: /images/cloud-security/aws/aws-vpc-1.png
  :align: center
  :width: 70%

If a user without proper permissions attempts to create a VPC, the following alert will be shown on Kibana:

.. thumbnail:: /images/cloud-security/aws/aws-vpc-2.png
  :align: center
  :width: 70%

Working with VPC Data
^^^^^^^^^^^^^^^^^^^^^

A VPC alert contains data such as dest and source IP address, dst and source port, and how many bytes were sent:

.. thumbnail:: /images/cloud-security/aws/aws-vpc-3.png
  :align: center
  :width: 70%

These alerts can be easily analyzed using visualizations like the following one:

.. thumbnail:: /images/cloud-security/aws/vpc-flow-data-visualization.png
  :align: center
  :width: 70%

On that visualization users can look for peaks in their network, once they found a peak they can filter, the alerts generated on that time and check which IP addresses were communicating. Since IP address is a field used in many AWS alerts, they'll probably found other alerts and find out what happened.
