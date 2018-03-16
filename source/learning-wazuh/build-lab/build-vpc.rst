.. _build_lab_build_vpc:

Build the Wazuh Lab VPC
=======================

Here we will create the VPC and take care of all the VPC components that our EC2 instances will need to operate.

To get started, sign into your your AWS console `here <https://console.aws.amazon.com/console/home>`_.  If you do not already have an AWS account, sign up for one `here <https://portal.aws.amazon.com/billing/signup#/start>`_.

.. note::
  There will be costs to you to maintain a Wazuh lab environment in AWS but they should be small.  Most costs only apply when your
  instances are actually running.  It should cost you an estimated USD $3-4 per day to operate this lab with all EC2 instances
  running.  When all instances are shut down, and all Elastic IPs are released, a dormant lab would only cost around $3 per month
  (just the cost of EC2 block storage).  These are only estimates. See `here <https://aws.amazon.com/ec2/pricing/>`_ for
  authoritative details on Amazon EC2 pricing.

Create VPC
----------

Even if you already have one or more VPCs, you will be creating a new one.
Go to your `AWS VPC Dashboard <https://console.aws.amazon.com/vpc/home?#vpcs:>`_ and click **[Create VPC]**.
Specify the *Name* and *IPv4 CIDR block* below, and then click **[Yes, Create]**.

.. thumbnail:: ../../images/learning-wazuh/build-lab/new-vpc.png
    :title: New VPC
    :align: center
    :width: 75%

Subnet
------

This VPC only needs one subnet, which we will set to the same as the CIDR block of the VPC itself.  Click on
the `Subnets <https://console.aws.amazon.com/vpc/home#subnets:>`_ link in your `VPC Dashboard
<https://console.aws.amazon.com/vpc/home?#vpcs:>`_ and create a subnet with the *Name* and *IPv4 CIDR block* below.
Make sure to associate it with your "Wazuh Lab" VPC.  Then click **[Yes, Create]**.


.. thumbnail:: ../../images/learning-wazuh/build-lab/new-subnet.png
    :title: New subnet
    :align: center
    :width: 75%

Internet Gateway
----------------

Your VPC needs an Internet Gateway so it can communicate with the Internet.  Click on the `Internet Gateways
<https://console.aws.amazon.com/vpc/home#igws:>`_ in your `VPC Dashboard
<https://console.aws.amazon.com/vpc/home?#vpcs:>`_ and click **[Create Internet Gateway]**.  Name it as below and click
**[Yes, Create]**.

.. thumbnail:: ../../images/learning-wazuh/build-lab/create-gateway.png
    :title: Create gateway
    :align: center
    :width: 75%

Next click **[Attach to VPC]**, select your "Wazuh Lab" VPC and click **[Yes, Attach]**, at which point your new gateway
should appear with a green "attached" state.

Route Table
-----------

The route table for your new VPC must be associated with your subnet and gateway.  Click the `Route Tables
<https://console.aws.amazon.com/vpc/home#routetables:>`_ link in your `VPC Dashboard
<https://console.aws.amazon.com/vpc/home?#vpcs:>`_ and select the route table for your "Wazuh Lab" VPC.  Then click the
**[Routes]** tab and the **[Edit]** button, and then the **[Add another route]** button.  Add a new route with a *Destination*
of "0.0.0.0/0" and for the *Target*, click on the empty field and pick the Wazuh Lab Gateway from the list.  Click **[Save]**.
The results should look like this (exact igw- id will be different):

.. thumbnail:: ../../images/learning-wazuh/build-lab/route-table.png
    :title: Route table
    :align: center
    :width: 75%

Click on the "Subnet Associations" tab below and then on **[Edit]**.
Checkmark only your Wazuh Lab Subnet and click **[Save]**.  It should look like this:

.. thumbnail:: ../../images/learning-wazuh/build-lab/route-table-2.png
    :title: Route table 2
    :align: center
    :width: 75%

Security Groups
---------------

We will need a couple of **Security Groups**, one for your Linux instances and one for your Windows instance.
We will allow inbound SSH/HTTPS traffic to the Linux instances from the Internet and inbound RDP traffic to the Windows instance
from the Internet, while allowing unrestricted communication within the VPC and unrestricted outbound traffic.

Windows Security Group
::::::::::::::::::::::

Click on the `Security Groups <https://console.aws.amazon.com/vpc/home#securityGroups:>`_ link  in your `VPC Dashboard
<https://console.aws.amazon.com/vpc/home?#vpcs:>`_ and then click **[Create Security Group]**.  Create a security group like
below, and then click **[Yes, Create]**.

.. thumbnail:: ../../images/learning-wazuh/build-lab/sec-group-win.png
    :title: Sec Group Win
    :align: center
    :width: 75%

Next select only the "Wazuh Windows" security group, click on the **[Inbound Rules]** tab, and click **[Edit]**.
Set up two rules like below and click **[Save]**.

.. thumbnail:: ../../images/learning-wazuh/build-lab/sec-group-win-2.png
    :title: Sec Group Win
    :align: center
    :width: 75%

Linux Security Group
::::::::::::::::::::

Click again on **[Create Security Group]**.  Create a security group like below, and then click **[Yes, Create]**.

.. thumbnail:: ../../images/learning-wazuh/build-lab/sec-group-lin.png
    :title: Sec Group Lin
    :align: center
    :width: 75%

Next select only the "Wazuh Linux" security group, click on the **[Inbound Rules]** tab, and click **[Edit]**.
Set up two rules like below and click **[Save]**.

.. thumbnail:: ../../images/learning-wazuh/build-lab/sec-group-lin-2.png
    :title: Sec Group Lin
    :align: center
    :width: 75%


SSH key pair
------------

You need to set up a **Key Pair** to use in authenticating with the EC2 instances you are about to launch.  Go to your
`EC2 Dashboard <https://console.aws.amazon.com/ec2/v2/home>`_ and click on **[Create Key Pair]**.  Name it "Wazuh Lab"
and click **[Create]**.  Your web browser should automatically download the key file **WazuhLab.pem** at this point.

.. thumbnail:: ../../images/learning-wazuh/build-lab/key-pair.png
    :title: Key Pair
    :align: center
    :width: 75%

Hold onto this file.  You will need it to gain access to your EC2 instances once they are launched.
