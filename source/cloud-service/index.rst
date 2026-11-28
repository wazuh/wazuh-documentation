.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh Cloud is the software as a service (SaaS) edition of Wazuh, managed from Wazuh Console. Learn how to create and operate your Wazuh Cloud environments.

.. _cloud_service:

Wazuh Cloud service
===================

Wazuh is a free and open source platform that provides unified Security Information and Event Management (SIEM) and Extended Detection and Response (XDR) capabilities. It helps organizations protect workloads across on-premises, virtualized, cloud, and containerized environments.

You can deploy Wazuh in three ways:

-  **On-premises**: You install and manage the entire platform on your own infrastructure.
-  **In the cloud**: You deploy and manage Wazuh in a cloud environment under your control.
-  **With Wazuh Cloud**: You use the software as a service (SaaS) edition of Wazuh, which we host and operate.

Wazuh Cloud manages the Wazuh central components and their underlying infrastructure, including scaling, updates, and platform monitoring. Your team remains responsible for security monitoring, investigating alerts, and responding to incidents, just as it would with a self-hosted deployment.

Wazuh Console
-------------

`Wazuh Console <https://console.cloud.wazuh.com>`__ is the web application you use to manage your Wazuh services. From Wazuh Console you can:

-  Start a free trial or create a Wazuh Cloud environment, choosing its region, capacity, and support plan.
-  Open the Wazuh dashboard of each environment and retrieve its default credentials.
-  Monitor environment usage, review environment logs, and download AI reports.
-  Invite members to your organization and manage API keys.
-  Connect your self-hosted Wazuh deployments to Wazuh Cyber Threat Intelligence (CTI) feeds.
-  Manage subscriptions, payment methods, and invoices.
-  Get support.

Wazuh Cloud benefits
--------------------

-  **Managed platform**: We install, maintain, update, and monitor the Wazuh central components, reducing the operational work required from your team.
-  **Faster deployment**: Get started without provisioning hardware or installing and maintaining the central components yourself.
-  **High availability and scalability**: Use infrastructure designed to support availability, and increase the capacity of your environment from Wazuh Console as your requirements grow.
-  **Wazuh AI Analyst**: Receive weekly AI reports with actionable insights to help investigate events and strengthen your security posture.
-  **Professional Feed included**: Each Wazuh Cloud environment includes a Professional Feed seat with instant access to Wazuh CTI content.
-  **Security and regulatory compliance**: Benefit from security hardening and regular security updates. Wazuh Cloud supports compliance efforts for standards such as PCI DSS and SOC 2.
-  **Platform monitoring and support**: We continuously monitor the health of your Wazuh Cloud environment, and you have access to Wazuh technical support.

Shared responsibility model
---------------------------

With Wazuh Cloud, we run the platform and you run security operations on it.

Managed by Wazuh
^^^^^^^^^^^^^^^^

-  Hosting, deployment, and maintenance of Wazuh central components.
-  Infrastructure monitoring, scaling, and high availability.
-  Security of the underlying platform.
-  Service updates and version upgrades.

Managed by customer
^^^^^^^^^^^^^^^^^^^

-  Deploying and configuring Wazuh agents on your endpoints.
-  Defining custom detection rules, alerting policies, and integrations.
-  Managing access to Wazuh Console and to the Wazuh dashboard for your users.
-  Monitoring alerts and investigating security events in your environment.
-  Responding to incidents detected in your environment.

Learn more about Wazuh Cloud in the sections below.

.. toctree::
   :titlesonly:
   :includehidden:
   :maxdepth: 1

   getting-started/index
   your-environment/index
   AI Analyst <ai-analyst>
   organization/index
   account-billing/index
   cti/index
   archive-data/index
   apis/index
   support
   glossary
