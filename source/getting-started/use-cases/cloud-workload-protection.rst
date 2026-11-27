.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh security platform protects cloud workloads by monitoring the infrastructure at the endpoint and cloud infrastructure levels.

Cloud workload protection
=========================

The Wazuh security platform provides threat detection, configuration compliance, and continuous monitoring for on-premises, cloud, and hybrid environments.

Wazuh protects cloud workloads by monitoring the infrastructure at two levels:

-  **Endpoint level**: Wazuh monitors cloud instances or virtual machines with the lightweight :doc:`Wazuh agent </getting-started/components/wazuh-agent>`.
-  **Cloud infrastructure level**: Wazuh monitors cloud service activity by collecting and analyzing data from the provider API. Wazuh supports AWS, Microsoft Azure, and Google Cloud.

The following sections describe how Wazuh enhances security operations, protects cloud-native applications, and supports compliance in cloud environments.

Cloud log data analysis and retention
-------------------------------------

Cloud environments generate large amounts of log data, vital for identifying security incidents. Wazuh decoders normalize this log data, and detection rules analyze it to detect anomalous events. Wazuh collects and analyzes log data from multiple cloud platforms and services, such as AWS, Azure, Google Cloud, Office 365, and GitHub. A Wazuh agent runs the module that collects the logs from each service.

The image below shows the trend of findings from the cloud infrastructure on the **Amazon Web Services** dashboard.

.. thumbnail:: /images/getting-started/use-cases/cloud-workload-protection/aws-dashboard.png
   :title: AWS dashboard on Wazuh
   :alt: AWS dashboard on Wazuh
   :align: center
   :width: 80%

Wazuh monitors and logs activities in the cloud, providing a centralized view of user actions across the entire cloud infrastructure. Wazuh has out-of-the-box rules to detect suspicious or unauthorized activities. In addition to the built-in rules, users can create :ref:`custom detection rules <data_analysis_create_custom_rule>` to consolidate threat detection.

Amazon Web Services
^^^^^^^^^^^^^^^^^^^

The :doc:`Wazuh module for AWS </cloud-security/amazon/services/index>` monitors and secures AWS cloud infrastructure. The AWS services that Wazuh monitors include the following:

-  :doc:`Amazon GuardDuty </cloud-security/amazon/services/supported-services/guardduty>` is a threat detection service that continuously monitors AWS accounts, workloads, and Amazon S3 data for malicious activity and unauthorized behavior.
-  :doc:`Amazon Inspector </cloud-security/amazon/services/supported-services/inspector>` is an automated vulnerability management service that scans Amazon EC2 instances, container images in Amazon ECR, and AWS Lambda functions for software vulnerabilities.
-  :doc:`AWS Key Management Service (AWS KMS) </cloud-security/amazon/services/supported-services/kms>` manages cryptographic keys across AWS services.
-  :doc:`Amazon Macie </cloud-security/amazon/services/supported-services/macie>` is a fully managed data security and privacy service. It automatically detects unencrypted S3 buckets, publicly accessible buckets, and buckets shared with external AWS accounts.
-  :doc:`Amazon Virtual Private Cloud (Amazon VPC) </cloud-security/amazon/services/supported-services/vpc>` lets you launch AWS resources in a logically isolated virtual network that you define.
-  :doc:`AWS Config </cloud-security/amazon/services/supported-services/config>` assesses, audits, and evaluates the configurations of your AWS resources. It helps the users review changes in configurations and relationships between AWS resources.
-  :doc:`AWS CloudTrail </cloud-security/amazon/services/supported-services/cloudtrail>` enables governance, compliance, operational auditing, and risk auditing of your AWS account. With CloudTrail, you can log, continuously monitor, and retain account activity related to actions across your AWS infrastructure.
-  :doc:`AWS Trusted Advisor </cloud-security/amazon/services/supported-services/trusted-advisor>` helps users reduce costs, increase performance, and improve security by optimizing their AWS environment. It provides real-time guidance to help users provision their resources following AWS best practices.
-  :doc:`AWS Web Application Firewall (AWS WAF) </cloud-security/amazon/services/supported-services/waf>` protects your web applications and APIs against common web exploits that affect availability, security, or resource use.

Microsoft Azure
^^^^^^^^^^^^^^^

The Wazuh module for Azure pulls logs from the Azure platform to monitor it.

The module collects data from the following Azure services:

-  :doc:`Log Analytics API </cloud-security/azure/platform-and-services/log-analytics>`: The Log Analytics API is a core component of Azure Monitor. It aggregates and analyzes log data from cloud applications, operating systems, and Azure resources. The Wazuh module for Azure queries this API to pull the logs that Azure Monitor collects.
-  :doc:`Blob Storage API </cloud-security/azure/platform-and-services/storage>`: You can configure an Azure service to export its logs to a container in a dedicated Azure Blob Storage account. The Wazuh agent then downloads those logs through the Blob Storage API.
-  :doc:`Microsoft Graph API </cloud-security/azure/platform-and-services/graph>`: The Azure module reads Microsoft Graph resources, such as the Microsoft Entra ID audit and sign-in logs. Wazuh uses these logs to monitor identity events, such as new users, user property changes, and disabled accounts.

Google Cloud Platform
^^^^^^^^^^^^^^^^^^^^^

Wazuh monitors Google Cloud services by pulling events from the Google Pub/Sub messaging service, a middleware for event ingestion and delivery. This integration helps detect threats targeting your Google Cloud assets. For more information, see :doc:`Monitoring Google Cloud </cloud-security/gcp/index>`.

Office 365
^^^^^^^^^^

The Wazuh module for Office 365 pulls audit logs from the Office 365 Management Activity API. These logs record user and administrator actions across the Office 365 environment. Wazuh analyzes the logs and generates findings that support security and compliance monitoring of Office 365. For more information, see :doc:`Monitoring Office 365 activity </cloud-security/office365/monitoring-office365-activity>`.

GitHub
^^^^^^

The Wazuh GitHub module pulls audit logs from the GitHub API. These logs record actions by organization members, such as a repository creation or an access change. Each entry shows who performed the action and when it happened. Wazuh collects, processes, and stores these logs for analysis and reporting. For more information, see :doc:`Monitoring GitHub activity </cloud-security/github/monitoring-github-activity>`.

Protect cloud-native applications
---------------------------------

Wazuh provides protection for cloud-native applications, safeguarding them against security threats and vulnerabilities. It integrates with Docker through the :doc:`Docker listener module </user-manual/capabilities/container-security/monitoring-docker>`, allowing it to monitor and analyze container activity in real time. Wazuh forwards the events that the Docker daemon reports, such as container creation, startup, and removal, so you can investigate container activity.

The image below shows findings generated from a monitored Docker infrastructure.

.. thumbnail:: /images/getting-started/use-cases/cloud-workload-protection/docker-infrastructure-alerts.png
   :title: Findings generated from a monitored Docker infrastructure
   :alt: Findings generated from a monitored Docker infrastructure
   :align: center
   :width: 80%

For more ways to monitor cloud-native applications with Wazuh, see the following use cases:

-  :ref:`Monitoring Docker runtime activities <monitoring_docker_runtime_activities>`
-  :ref:`Monitoring container runtime logs <container_security_use_cases_monitoring_container_runtime_logs>`
-  :ref:`Detecting suspicious activity in Docker containers <container_security_use_cases_detecting_suspicious_activity_in_docker_containers>`

The Wazuh integrations with cloud service providers also collect cloud-native application logs, which gives you visibility into the environment and supports security operations.

Promote security operations in the cloud
----------------------------------------

Wazuh helps security teams detect and respond to threats in cloud environments, which limits damage and reduces the impact on the cloud infrastructure. Wazuh also supports red and blue team exercises. Red teams simulate attacks with dedicated tools, such as Stratus Red Team, and Wazuh detects them with its standard and custom rules. Blue teams use the resulting findings to tune their security measures and strengthen their defenses.

The image below shows findings that Wazuh generates from AWS CloudTrail events in the **Threat Hunting** dashboard.

.. thumbnail:: /images/getting-started/use-cases/cloud-workload-protection/detection-results.png
   :title: Detection results
   :alt: Detection results
   :align: center
   :width: 80%

The centralized logging and reporting capabilities of Wazuh simplify compliance management within cloud environments. These capabilities help organizations meet regulatory requirements by capturing and storing audit trails, ensuring accountability, and facilitating the investigation of security incidents. Refer to the :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>` documentation for more information about how Wazuh aids analysis, reporting, and compliance efforts.
