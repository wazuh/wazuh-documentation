.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh security platform protects cloud workloads by monitoring the infrastructure at the endpoint and cloud infrastructure levels.

Cloud workload protection
=========================

The Wazuh security platform provides threat detection, configuration compliance, and continuous monitoring for on-premises, cloud, and hybrid environments. Wazuh protects cloud workloads by monitoring the infrastructure at two levels:

-  **Endpoint level**: monitoring cloud instances or virtual machines using the lightweight :doc:`Wazuh agent </getting-started/components/wazuh-agent>`.
-  **Cloud infrastructure level**: monitoring cloud service activity by collecting and analyzing data from the provider API. Wazuh supports AWS, Microsoft Azure, and Google Cloud.

The following sections describe some benefits of using Wazuh to enhance security operations, protect cloud-native applications, and facilitate compliance efforts for a secure cloud environment.

Cloud log data analysis and retention
-------------------------------------

Cloud environments generate large amounts of log data, vital for identifying security incidents. The Wazuh rules and decoders are responsible for parsing and analyzing log data to detect anomalous events. Wazuh collects and analyzes log data from various cloud platforms and services, such as AWS, Azure, Google Cloud, Office 365, and GitHub.

The image below is an example of an AWS dashboard on Wazuh showing the trend of events collected from the cloud infrastructure.

.. thumbnail:: /images/getting-started/use-cases/cloud-workload-protection/aws-dashboard.png
   :title: AWS dashboard on Wazuh
   :alt: AWS dashboard on Wazuh
   :align: center
   :width: 80%

Wazuh monitors and logs activities in the cloud, providing a centralized view of user actions across the entire cloud infrastructure. Wazuh has out-of-the-box rules to detect suspicious or unauthorized activities. In addition to the in-built rules, users can :doc:`create custom rules </user-manual/ruleset/rules/custom>` to consolidate threat detection.

Amazon Web Services
^^^^^^^^^^^^^^^^^^^

Wazuh has dedicated modules for :doc:`monitoring and securing AWS cloud infrastructure </cloud-security/amazon/index>`. Some of the AWS services that Wazuh monitors include:

-  **Amazon GuardDuty** is a threat detection service that continuously monitors for malicious activity and unauthorized behavior, ensuring the protection of AWS accounts, workloads, and data stored in Amazon S3.
-  **Amazon Inspector** is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS.
-  **Amazon Key Management Service (KMS)** is used for cryptographic key management across AWS services. 
-  **Amazon Macie** is a fully managed data security and privacy service. It automatically detects unencrypted S3 buckets, publicly accessible buckets, and buckets shared with external AWS accounts.
-  **Amazon Virtual Private Cloud (VPC)** provisions a logically isolated section of the AWS Cloud where AWS resources can be launched on a virtual network defined by the user.
-  **AWS Config** assesses, audits, and evaluates the configurations of your AWS resources. It helps the users review changes in configurations and relationships between AWS resources.
-  **AWS CloudTrail** enables governance, compliance, operational auditing, and risk auditing of your AWS account. With CloudTrail, you can log, continuously monitor, and retain account activity related to actions across your AWS infrastructure.
-  **AWS Trusted Advisor** helps users reduce costs, increase performance, and improve security by optimizing their AWS environment. It provides real-time guidance to help users provision their resources following AWS best practices.
-  **AWS Web Application Firewall (WAF)** helps protect your web applications or APIs against common web exploits that might affect availability, compromise security, or consume excessive resources.

Microsoft Azure
^^^^^^^^^^^^^^^

The Wazuh module for Azure pulls logs from the Azure platform to monitor it.

The module collects data from the following Azure services:

-  **Log Analytics API**: The Log Analytics API is a core component of the Azure Monitor service and is used to aggregate and analyze log data. The sources of such data are cloud applications, operating systems, and Azure resources. The Wazuh module for Azure is capable of querying the Log Analytics API, pulling the logs collected by the Azure Monitor service.
-  **Blob Storage API**: Logs from Azure services are optionally pushed to Azure Blob Storage. Specifically, it is possible to configure an Azure service to export logs to a container in a storage account created for that purpose. The Wazuh agent then downloads those logs through the Blob Storage API.
-  **Microsoft Graph API**: The Azure module reads Microsoft Graph resources, such as the Microsoft Entra ID audit and sign-in logs. Wazuh uses these logs to monitor identity events, such as new users, user property changes, and disabled accounts.

Google Cloud Platform
^^^^^^^^^^^^^^^^^^^^^

Wazuh monitors Google Cloud services by pulling events from the Google Pub/Sub messaging service, a middleware for event ingestion and delivery. This integration helps detect threats targeting your Google Cloud assets. For more information, see :doc:`Monitoring Google Cloud </cloud-security/gcp/index>`.

Office 365
^^^^^^^^^^

Wazuh includes a dedicated module designed to interact with the Office 365 Management Activity API. This module is responsible for fetching logs from Office 365 and making them available for analysis within the Wazuh platform. The Management Activity API serves as the source of audit logs for Office 365, containing information about various actions and events within the Office 365 environment. These logs are organized into tenant-specific content blobs and classified based on their content type and source. Wazuh performs analysis, alerting, and reporting on these logs, enhancing the security and compliance monitoring capabilities within the Office 365 environment. For more information, see :doc:`Monitoring Office 365 activity </cloud-security/office365/monitoring-office365-activity>`.

GitHub
^^^^^^

The Wazuh GitHub module pulls audit logs from the GitHub API. These logs record actions by organization members, including who performed the action, what the action was, such as a repository creation or an access change, and when it happened. Wazuh collects, processes, and stores these logs for analysis and reporting. For more information, see :doc:`Monitoring GitHub activity </cloud-security/github/monitoring-github-activity>`.

Protect cloud-native applications
---------------------------------

Wazuh provides protection for cloud-native applications, safeguarding them against security threats and vulnerabilities. It integrates with Docker through the Docker listener module, allowing it to monitor and analyze container activity in real time. Wazuh forwards the events that the Docker daemon reports, such as container creation, startup, and removal, so you can investigate container activity.

The image below shows findings generated from a monitored Docker infrastructure.

.. thumbnail:: /images/getting-started/use-cases/cloud-workload-protection/docker-infrastructure-alerts.png
   :title: Findings generated from a monitored Docker infrastructure
   :alt: Findings generated from a monitored Docker infrastructure
   :align: center
   :width: 80%

Some additional use cases for using Wazuh to monitor cloud-native applications are:

-  :ref:`Monitoring Docker runtime activities <monitoring_docker_runtime_activities>`

Furthermore, the Wazuh integration with cloud service providers enables monitoring and analysis of cloud-native application logs, ensuring comprehensive visibility into the environment and facilitating effective security operations.

Promote security operations in the cloud
----------------------------------------

Wazuh promotes security operations within cloud environments by allowing security teams to detect and respond to threats, mitigating damages, and reducing the overall impact on the cloud infrastructure. Furthermore, Wazuh facilitates red and blue team activities. The platform's customizable rules enable organizations to simulate attacks and test their security defenses. Blue teams can use the insights gained on Wazuh from red team activities to fine-tune their security measures and strengthen their defenses. The following blog posts show how to simulate cloud attacks with the Stratus Red Team tool and detect them with Wazuh:

-  `Adversary emulation on AWS with Stratus Red Team and Wazuh <https://wazuh.com/blog/adversary-emulation-on-aws-with-stratus-red-team-and-wazuh/>`__
-  `Adversary emulation on GCP with Stratus Red Team and Wazuh <https://wazuh.com/blog/adversary-emulation-on-gcp-with-stratus-red-team-and-wazuh/>`__

.. thumbnail:: /images/getting-started/use-cases/cloud-workload-protection/detection-results.png
   :title: Detection results
   :alt: Detection results
   :align: center
   :width: 80%

The centralized logging and reporting capabilities of Wazuh simplify compliance management within cloud environments. It helps organizations meet regulatory requirements by capturing and storing audit trails, ensuring accountability, and facilitating the investigation of security incidents. Refer to the :doc:`Wazuh dashboard  </getting-started/components/wazuh-dashboard>` documentation for more information about how Wazuh aids analysis, reporting, and compliance efforts.