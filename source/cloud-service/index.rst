.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh Cloud hosts and manages all central components in a unified, secure environment. Learn more in this section of the documentation.

Wazuh Cloud service
===================

Wazuh is a free and open source platform that delivers unified Security Information and Event Management (SIEM) and Extended Detection and Response (XDR) capabilities. It protects workloads across on-premises, virtualized, cloud, and containerized environments.

You can deploy Wazuh in three ways:

-  On-premises, managed entirely by you.
-  In your own cloud environment, under your control.
-  With Wazuh Cloud, a fully managed service operated by Wazuh.

Wazuh Cloud hosts and manages all central components in a unified, secure environment. The service provides fast provisioning, automated scaling, ongoing updates, and operational management, so you can focus on security operations rather than infrastructure.

Wazuh Cloud benefits
--------------------

-  **Fully managed service**: We take care of installation, scaling, updates, and monitoring of Wazuh components.
-  **Immediate time-to-value**: A ready-to-use solution, with no additional hardware or software required, driving down the cost and complexity.
-  **High availability and scalability**: A flexible infrastructure that you can tailor to meet specific needs and upgrade it to the most appropriate tier.
-  **Wazuh AI security analyst**: Automate your security analysis and receive actionable insights to help you understand and strengthen your security posture.
-  **Security and regulatory compliance**: Fully protected data, regular application of security patches and hardening practices. Compliant with PCI DSS and SOC2.
-  **Customizable environments**: Tailor retention, integrations, and resources to match your needs.
-  **Support and monitoring**: Continuous monitoring of the platform and access to Wazuh technical support.

Shared responsibility model
----------------------------

With Wazuh Cloud, responsibilities are divided between the service and the customer.

Managed by Wazuh
^^^^^^^^^^^^^^^^

* Hosting, deployment, and maintenance of Wazuh central components.
* Infrastructure monitoring, scaling, and high availability.
* Security of the underlying platform.
* Service updates and version upgrades.

Managed by customer
^^^^^^^^^^^^^^^^^^^

* Deploying and configuring Wazuh agents on your endpoints.
* Defining custom detection rules, alerting policies, and integrations.
* Managing access control for your users.
* Responding to incidents detected in your environment.

Learn more about Wazuh Cloud in the sections below.

.. toctree::
   :titlesonly:
   :includehidden:
   :maxdepth: 1

   getting-started/index
   your-environment/index
   AI Analyst <ai-analyst>
   account-billing/index
   archive-data/index
   apis/index
   cli/index
   glossary
