.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Amazon VPC lets users provision a logically isolated section of the AWS Cloud where they can launch AWS resources in a virtual network that they define.

Amazon Virtual Private Cloud (VPC)
==================================

`Amazon Virtual Private Cloud <https://aws.amazon.com/vpc/?nc1=h_ls>`__ (Amazon VPC) lets users provision a logically isolated section of the AWS Cloud where they can launch AWS resources in a virtual network that they define. Users have complete control over their virtual networking environment, including the selection of their IP address range, creation of subnets, and configuration of route tables and network gateways. Users can use both IPv4 and IPv6 in their VPC for secure and easy access to resources and applications.

Amazon configuration
--------------------

The following sections cover how to configure the Amazon VPC service to integrate with Wazuh.

#. Go to `S3 buckets <https://s3.console.aws.amazon.com/>`__, select an existing S3 bucket or create a new one, then copy the Amazon Resource Name (ARN) of the S3 bucket.

   .. thumbnail:: /images/cloud-security/aws/vpc/01-go-to-s3-bucket.png
      :align: center
      :width: 80%

#. On your AWS console, go to **Services** > **Compute** > **EC2**.

   .. thumbnail:: /images/cloud-security/aws/vpc/02-go-to-ec2.png
      :align: center
      :width: 80%

#. Go to **Network & Security** > **Network Interfaces** on the left menu. Select a network interface and select **Create flow log** on the **Actions** menu.

   .. thumbnail:: /images/cloud-security/aws/vpc/03-create-flow-logs.png
      :align: center
      :width: 80%

#. Change all fields to look like the following screenshot and paste the Amazon Resource Name (ARN) of the previously created bucket.

   .. thumbnail:: /images/cloud-security/aws/vpc/04-flow-log-settings-1.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/vpc/04-flow-log-settings-2.png
      :align: center
      :width: 80%

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

Configure Wazuh to process Amazon VPC logs
------------------------------------------

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/vpc/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/vpc/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS configuration </user-manual/reference/ossec-conf/wodle-s3>` to the file, replacing ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket:

   .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="vpcflow">
          <name><WAZUH_AWS_BUCKET></name>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      In this example, the ``aws_profile`` authentication parameter was used. Check the :doc:`credentials <../prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh dashboard:

   -  Wazuh manager:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent

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
