.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides security and compliance monitoring for cloud platforms including GCP, AWS, and Microsoft Azure.

Posture management
==================

Cloud Security Posture Management (CSPM) is a set of practices that keeps cloud environments secure and compliant. CSPM continuously assesses cloud workloads to find misconfigurations, vulnerabilities, and potential threats. It also provides remediation steps that improve the security posture of cloud environments.

Wazuh provides security and compliance monitoring for multiple cloud platforms, including Google Cloud Platform (GCP), Amazon Web Services (AWS), and Microsoft Azure. The modules that collect cloud logs run on a Wazuh agent. The following sections describe CSPM for each platform.

Google Cloud Platform
---------------------

Wazuh connects with GCP through the Google Cloud publisher and subscriber services, also known as :doc:`GCP Pub/Sub </cloud-security/gcp/pubsub>`. These messaging services facilitate the transmission of log data from a GCP workload to a Wazuh instance. The image below shows the integration between GCP and Wazuh.

.. thumbnail:: /images/getting-started/use-cases/posture-management/wazuh-gcp-integration.png
   :title: Diagram of Wazuh collecting Google Cloud logs through GCP Pub/Sub
   :alt: Diagram of Wazuh collecting Google Cloud logs through GCP Pub/Sub
   :align: center
   :width: 80%

The GCP module of the Wazuh agent pulls logs from a Pub/Sub subscription. To use it, :doc:`enable the GCP integration </cloud-security/gcp/prerequisites/enabling-integration>` on the Wazuh dashboard and configure the module. The **Google Cloud** dashboard, under **Cloud security**, then shows the findings from your GCP services. See :doc:`Monitoring Google Cloud </cloud-security/gcp/index>` for the configuration.

The image below shows a finding from monitored GCP Cloud Storage audit logs on the Wazuh dashboard.

.. thumbnail:: /images/getting-started/use-cases/posture-management/using-wazuh-to-monitor-gcp.png
   :title: Using Wazuh to monitor Google Cloud Platform
   :alt: Using Wazuh to monitor Google Cloud Platform
   :align: center
   :width: 80%

Amazon Web Services
-------------------

Wazuh provides CSPM to your AWS workloads by monitoring the AWS services and instances. To monitor your AWS services, Wazuh collects and analyzes log data about your AWS infrastructure with the :doc:`Wazuh module for AWS </cloud-security/amazon/services/index>`.

You can use the **Amazon Web Services** dashboard, under **Cloud security**, to view findings related to AWS services.

.. thumbnail:: /images/getting-started/use-cases/posture-management/enabling-aws-module.png
   :title: Amazon Web Services dashboard in the Wazuh dashboard
   :alt: Amazon Web Services dashboard in the Wazuh dashboard
   :align: center
   :width: 80%

The AWS integration is disabled by default. Follow the :doc:`AWS prerequisite </cloud-security/amazon/services/prerequisites/index>` documentation to enable the AWS integration on the Wazuh dashboard and set up your Wazuh instance for AWS log collection. The documentation shows a list of the :doc:`supported AWS services </cloud-security/amazon/services/supported-services/index>` that Wazuh monitors. The images below show an :doc:`AWS Security Hub CSPM </cloud-security/amazon/services/supported-services/security-hub>` finding on the **Findings** tab and its details. The Wazuh module for AWS collects this finding through an Amazon Simple Queue Service (Amazon SQS) queue.

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

This control checks whether S3 general purpose buckets have a bucket policy that requires requests to use TLS. AWS recommends denying requests that don't use secure transport.

Microsoft Azure
---------------

Wazuh integrates with Azure through a Log Analytics workspace. An Azure Log Analytics workspace stores log data from Azure Monitor and other Azure services, such as Microsoft Defender for Cloud. The Azure module of the Wazuh agent queries the workspace to retrieve these logs. The image below shows the integration between Azure and Wazuh.

.. thumbnail:: /images/getting-started/use-cases/posture-management/azure-log-analytics-workspace-integration.png
   :title: Diagram of Wazuh collecting Azure logs through a Log Analytics workspace
   :alt: Diagram of Wazuh collecting Azure logs through a Log Analytics workspace
   :align: center
   :width: 80%

You can find detailed guidelines on configuring Wazuh to receive Azure cloud logs from a Log Analytics workspace in the :doc:`Azure Log Analytics </cloud-security/azure/platform-and-services/log-analytics>` documentation. The Azure integration is disabled by default, so :ref:`enable it on the Wazuh dashboard <azure_platform_and_services_enable_the_microsoft_azure_integration>` before Wazuh analyzes Azure logs. After you configure the module, you can retrieve *Recommendations*, *Security alerts*, and *Regulatory compliance* logs for your Azure cloud infrastructure.

The image below shows findings from Azure security posture management logs in the **Threat Hunting** dashboard.

.. thumbnail:: /images/getting-started/use-cases/posture-management/azure-security-posture-management-logs.png
   :title: Azure security posture management logs
   :alt: Azure security posture management logs
   :align: center
   :width: 80%
