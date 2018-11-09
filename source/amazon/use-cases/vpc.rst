.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_use-cases_vpc:

VPC Use cases
=============

Using an Amazon VPC (Virtual Private Cloud), you can logically isolate some of your AWS assets from the rest of your cloud infrastructure. You can actually set up your own networks in the cloud. This is why, it is usually important to monitor changes to your VPCs.

Create a VPC
------------

If a VPC is created, the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-vpc-1.png
    :align: center
    :width: 100%

If a user without proper permissions attempts to create a VPC, the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-vpc-2.png
    :align: center
    :width: 100%

Working with VPC Data
---------------------

A VPC alert contains data such as dest and source IP address, dst and source port and how many bytes were sent:

.. thumbnail:: ../../images/aws/aws-vpc-3.png
    :align: center
    :width: 100%

These alerts can be easily analyzed using visualizations like the following one:

.. thumbnail:: ../../images/aws/vpc_flow_dataviz.png
    :align: center
    :width: 100%

On that visualization you can look for peaks in your network, once you found a peak you can filter the alerts generated on that time and check which IPs were communicating. Since IP address is a field used in many AWS alerts, you'll probably found other alerts and find out what happened.
