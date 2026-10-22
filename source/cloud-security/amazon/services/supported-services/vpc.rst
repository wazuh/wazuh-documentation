.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the Amazon VPC service to integrate with Wazuh.

Amazon Virtual Private Cloud (VPC)
==================================

`Amazon Virtual Private Cloud <https://aws.amazon.com/vpc/?nc1=h_ls>`__ (Amazon VPC) lets users provision a logically isolated section of the AWS Cloud. There, they can launch AWS resources in a virtual network they define. Users have complete control over their virtual networking environment. That environment includes their IP address range, subnets, route tables, and network gateways. Users can use both IPv4 and IPv6 in their VPC for secure and easy access to resources and applications.

AWS configuration
-----------------

The following sections cover how to configure the Amazon VPC service to integrate with Wazuh.

Amazon VPC configuration
^^^^^^^^^^^^^^^^^^^^^^^^

#. Select an existing S3 bucket or :doc:`create a new one </cloud-security/amazon/services/prerequisites/S3-bucket>`, then copy the Amazon Resource Name (ARN) of the S3 bucket.

   .. thumbnail:: /images/cloud-security/aws/vpc/01-go-to-s3-bucket.png
      :title: Copy the ARN of the S3 bucket
      :alt: Copy the ARN of the S3 bucket
      :align: center
      :width: 80%

#. On your AWS console, go to **Services** > **Compute** > **EC2**.

   .. thumbnail:: /images/cloud-security/aws/vpc/02-go-to-ec2.png
      :title: Go to EC2 in the Compute services menu
      :alt: Go to EC2 in the Compute services menu
      :align: center
      :width: 80%

#. Go to **Network & Security** > **Network Interfaces** on the left menu. Select a network interface and select **Create flow log** on the **Actions** menu.

   .. thumbnail:: /images/cloud-security/aws/vpc/03-create-flow-logs.png
      :title: Create flow log on the Actions menu of a network interface
      :alt: Create flow log on the Actions menu of a network interface
      :align: center
      :width: 80%

#. Set **Filter** to **All** so that the flow log records accepted and rejected traffic, and choose a **Maximum aggregation interval**. For **Destination**, select **Send to an Amazon S3 bucket** and paste the ARN of the bucket from step 1 in **S3 bucket ARN**. Keep **AWS default format** as the **Log record format** and click **Create flow log**.

   .. thumbnail:: /images/cloud-security/aws/vpc/04-flow-log-settings-1.png
      :title: Flow log settings with the filter, aggregation interval, and S3 bucket ARN
      :alt: Flow log settings with the filter, aggregation interval, and S3 bucket ARN
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/vpc/04-flow-log-settings-2.png
      :title: Flow log record format settings and the Create flow log button
      :alt: Flow log record format settings and the Create flow log button
      :align: center
      :width: 80%

.. _vpc_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

.. include:: /_templates/cloud/amazon/read_only_policy_description.rst

.. code-block:: json
   :emphasize-lines: 12,13

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket"
               ],
               "Resource": [
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>"
               ]
           },
           {
               "Sid": "DescribeFlowLogs",
               "Effect": "Allow",
               "Action": "ec2:DescribeFlowLogs",
               "Resource": "*"
           }
       ]
   }

.. include:: /_templates/cloud/amazon/delete_policy_description.rst

.. code-block:: json
   :emphasize-lines: 13,14

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket",
                   "s3:DeleteObject"
               ],
               "Resource": [
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>"
               ]
           },
           {
               "Sid": "DescribeFlowLogs",
               "Effect": "Allow",
               "Action": "ec2:DescribeFlowLogs",
               "Resource": "*"
           }
       ]
   }

.. note::

   ``<WAZUH_AWS_BUCKET>`` is a placeholder. Replace it with the actual name of the bucket from which you want to retrieve logs.

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to yes in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

.. include:: /_templates/cloud/amazon/attach_policy.rst

Both policies above include the ``DescribeFlowLogs`` statement, because the Wazuh module for AWS calls ``ec2:DescribeFlowLogs`` to find the flow logs before it reads the bucket. If you prefer to grant this permission in a separate policy, remove the statement from the policy above and attach the following policy as well:

.. code-block:: json

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "DescribeFlowLogs",
               "Effect": "Allow",
               "Action": "ec2:DescribeFlowLogs",
               "Resource": "*"
           }
       ]
   }

Configure Wazuh to process Amazon VPC logs
------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

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

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes.

   .. code-block:: console

      # systemctl restart wazuh-agent

VPC use cases
-------------

-  :ref:`Create a VPC <aws_vpc_create_vpc>`
-  :ref:`Monitor rejected network traffic <aws_vpc_monitor_rejected_network_traffic>`

Monitor changes to your VPCs, because they control how your AWS resources are isolated from the rest of your cloud infrastructure.

.. _aws_vpc_create_vpc:

Create a VPC
^^^^^^^^^^^^

If a VPC is created, the AWS VPC created finding is shown on the Wazuh dashboard. This finding comes from AWS CloudTrail logs, so it needs the :doc:`AWS CloudTrail configuration </cloud-security/amazon/services/supported-services/cloudtrail>`.

.. thumbnail:: /images/cloud-security/aws/vpc/1-create-a-vpc.png
   :title: AWS VPC created finding
   :alt: AWS VPC created finding
   :align: center
   :width: 80%

.. _aws_vpc_monitor_rejected_network_traffic:

Monitor rejected network traffic
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

VPC flow logs record the IP traffic of the network interfaces in your VPC. When a security group or network ACL rejects a connection, the Cloud firewall or WAF connection denied or blocked finding is shown on the Wazuh dashboard. It shows the source and destination addresses and ports, and the protocol.

Accepted connections appear as events and don't raise findings. To see them, go to **Explore** > **Discover**, select the ``wazuh-events-v5*`` index pattern, and filter by ``wazuh.integration.decoders: decoder/aws-vpcflow/0`` and ``event.action: connection-established``.

.. thumbnail:: /images/cloud-security/aws/vpc/1-monitor-rejected-network-traffic.png
   :title: Cloud firewall or WAF connection denied or blocked findings
   :alt: Cloud firewall or WAF connection denied or blocked findings
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/vpc/2-monitor-rejected-network-traffic.png
   :title: Details of the Cloud firewall or WAF connection denied or blocked finding
   :alt: Details of the Cloud firewall or WAF connection denied or blocked finding
   :align: center
   :width: 80%
