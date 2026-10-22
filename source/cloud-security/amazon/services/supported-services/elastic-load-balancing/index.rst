.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
   :description: Learn how to configure the Amazon ALB, CLB, and NLB Elastic Load Balancer services to integrate with Wazuh.

Elastic Load Balancers
======================

Elastic Load Balancing automatically distributes incoming traffic across multiple targets, such as EC2 instances, containers, and IP addresses, in one or more Availability Zones. It monitors the health of its registered targets and routes traffic only to the healthy targets. The following sections explain the different types of load balancers available and how to configure and monitor them with Wazuh:

.. toctree::
   :titlesonly:

   Amazon Application Load Balancer (ALB)<alb>
   Amazon Classic Load Balancer (CLB)<clb>
   Amazon Network Load Balancer (NLB)<nlb>
