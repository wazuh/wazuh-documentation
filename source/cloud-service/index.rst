.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh Cloud is the software as a service (SaaS) edition of Wazuh. We run the platform, and your team runs security monitoring. Learn more in this section of the documentation.

Wazuh Cloud service
===================

Wazuh is a free and open source platform that provides unified Security Information and Event Management (SIEM) and Extended Detection and Response (XDR) capabilities. It helps organizations protect workloads across on-premises, virtualized, cloud, and containerized environments.

You can deploy Wazuh in three ways:

-  **On-premises**: You install and manage the entire platform on your own infrastructure.
-  **In the cloud**: You deploy and manage Wazuh in a cloud environment under your control.
-  **With Wazuh Cloud**: You use the software as a service (SaaS) edition of Wazuh, which we host and operate.

Wazuh Cloud manages the Wazuh central components and their underlying infrastructure, including scaling, updates, and platform monitoring. Your team remains responsible for security monitoring, investigating alerts, and responding to incidents, just as it would with a self-hosted deployment.

Wazuh Cloud benefits
--------------------

-  **Managed platform**: We install, maintain, update, and monitor the Wazuh central components, reducing the operational work required from your team.
-  **Faster deployment**: Get started without provisioning hardware or installing and maintaining the central components yourself.
-  **High availability and scalability**: Use infrastructure designed to support availability and scale resources as your requirements change.
-  **Wazuh AI Analyst**: Automate parts of security analysis and receive actionable insights to help investigate events and strengthen your security posture.
-  **Security and regulatory compliance**: Benefit from security hardening and regular security updates. Wazuh Cloud supports compliance efforts for standards such as PCI DSS and SOC 2.
-  **Customizable environments**: Configure data retention, integrations, and resources to suit your requirements.
-  **Platform monitoring and support**: We continuously monitor the health of your Wazuh Cloud environment, and you have access to Wazuh technical support.

Shared responsibility model
----------------------------

With Wazuh Cloud, we run the platform and you run security operations on it.

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
* Monitoring alerts and investigating security events in your environment.
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
