.. Copyright (C) 2018 Wazuh, Inc.

.. _build_lab:

Prepare your Wazuh Lab Environment
==================================

The Learning Wazuh labs are built for use in a dedicated Amazon Virtual Private Cloud environment.  With some
adjustments, you could certainly get the labs to work with other kinds of hosts, but these labs have been specifically
tested to give a consistent end-user experience using EC2 instances in a dedicated VPC as described below.  We
recommend you use this environment not only for learning but later for Wazuh-related testing as well.

The following steps will lead you through building the "Wazuh Lab" AWS VPC.  You will then launch four EC2 instances to populate
your new VPC with systems to interact with in the upcoming labs.  Lastly, you will perform basic installation of
all needed Wazuh-related and Elastic-related applications.  In the actual labs, you will configure and reconfigure the applications
as you focus on one aspect after another of the Wazuh solution.

.. thumbnail:: ../../images/learning-wazuh/build-lab/vpc-diagram.png
    :title: VPC Diagram
    :align: center
    :width: 75%

.. toctree::
    :maxdepth: 1
    :caption: Steps

    build-vpc
    launch-ec2-instances
    access-ec2-instances
    install-wazuh-server
    install-elastic-stack
    kibana-setup
    install-linux-agents
    install-windows-agent
