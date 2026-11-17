.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides security and compliance monitoring for cloud platforms including GCP, AWS, and Microsoft Azure.

Posture management
==================

Cloud Service Posture Management (CSPM) encompasses a set of practices aimed at safeguarding the security and compliance of cloud environments. This involves the ongoing assessment and monitoring of cloud workloads to pinpoint misconfigurations, vulnerabilities, and potential threats. CSPM also offers actionable remediation steps for addressing security risks, ultimately bolstering the overall security posture of cloud environments.

Wazuh provides security and compliance monitoring for various cloud platforms, including Google Cloud Platform (GCP), Amazon Web Services (AWS), and Microsoft Azure. The following sections describe CSPM for each platform.

Google Cloud Platform
---------------------

Wazuh connects with GCP through the Google Cloud publisher and subscriber services, also known as GCP Pub/Sub. These messaging services facilitate the transmission of log data from a GCP workload to a Wazuh instance. The image below shows the integration between GCP and Wazuh.

.. thumbnail:: /images/getting-started/use-cases/posture-management/wazuh-gcp-integration.png
   :title: Integration between Wazuh and Google Cloud Platform
   :alt: Integration between Wazuh and Google Cloud Platform
   :align: center
   :width: 80%

The GCP module of the Wazuh agent pulls logs from a Pub/Sub subscription. After you configure it, the **Google Cloud** section of the Wazuh dashboard shows the logs from your GCP services. See :doc:`Monitoring Google Cloud </cloud-security/gcp/index>` for the configuration.

.. thumbnail:: /images/getting-started/use-cases/posture-management/using-wazuh-to-monitor-gcp.png
   :title: Using Wazuh to monitor Google Cloud Platform
   :alt: Using Wazuh to monitor Google Cloud Platform
   :align: center
   :width: 80%

The image below shows an example log received from a monitored GCP instance on the Wazuh dashboard.

.. thumbnail:: /images/getting-started/use-cases/posture-management/wazuh-dashboard-gcp-example-log.png
   :title: Example GCP log on the Wazuh dashboard
   :alt: Example GCP log on the Wazuh dashboard
   :align: center
   :width: 80%

Amazon Web Services
-------------------

Wazuh provides CSPM to your AWS workloads by monitoring the AWS services and instances. Monitoring your AWS services includes collecting and analyzing log data about your AWS infrastructure using the :doc:`Wazuh module for AWS </cloud-security/amazon/services/index>`.

You can use the Amazon Web Services module in the Wazuh dashboard to view logs related to AWS services.

.. thumbnail:: /images/getting-started/use-cases/posture-management/enabling-aws-module.png
   :title: Enabling AWS module in the Wazuh dashboard
   :alt: Enabling AWS module in the Wazuh dashboard
   :align: center
   :width: 80%

Follow the :doc:`AWS prerequisite </cloud-security/amazon/services/prerequisites/index>` documentation to set up your Wazuh instance for AWS log collection. The documentation shows a list of the :doc:`supported AWS services </cloud-security/amazon/services/supported-services/index>` that Wazuh can monitor. The image below shows an AWS Security Hub finding that the AWS module collects through an Amazon SQS queue.

.. thumbnail:: /images/getting-started/use-cases/posture-management/amazon-security-hub-log.png
   :title: AWS Security Hub finding collected by the Wazuh AWS module
   :alt: AWS Security Hub finding collected by the Wazuh AWS module
   :align: center
   :width: 80%

.. thumbnail:: /images/getting-started/use-cases/posture-management/amazon-security-hub-log-details.png
   :title: Details of an AWS Security Hub finding on the Wazuh dashboard
   :alt: Details of an AWS Security Hub finding on the Wazuh dashboard
   :align: center
   :width: 80%

This control is designed to assess the security configuration of S3 buckets by verifying that user permissions are not granted through access control lists (ACLs). AWS recommends AWS Identity and Access Management (IAM) policies instead of S3 bucket ACLs to manage user permissions.

Microsoft Azure
---------------

Wazuh integrates with Azure using the Log Analytics Workspace. The Azure Log Analytics workspace is a service that facilitates storing log data from Azure Monitor and other Azure services, such as Microsoft Defender for Cloud. Wazuh provides a native integration module for Azure that retrieves logs from the Log Analytics Workspace.

.. thumbnail:: /images/getting-started/use-cases/posture-management/azure-log-analytics-workspace-integration.png
   :title: Azure Log Analytics Workspace integration with Wazuh overview
   :alt: Azure Log Analytics Workspace integration with Wazuh overview
   :align: center
   :width: 80%

You can find detailed guidelines on configuring Wazuh to receive Azure Cloud logs using the Log Analytics Workspace in the :doc:`Azure Log Analytics </cloud-security/azure/platform-and-services/log-analytics>` documentation. Once configured, you can set up your Wazuh deployment to retrieve *Recommendations*, *Security alerts*, and *Regulatory compliance* logs for your Azure cloud infrastructure.

The image below shows Azure security posture management logs received on Wazuh.

.. thumbnail:: /images/getting-started/use-cases/posture-management/azure-security-posture-management-logs.png
   :title: Azure security posture management logs
   :alt: Azure security posture management logs
   :align: center
   :width: 80%
