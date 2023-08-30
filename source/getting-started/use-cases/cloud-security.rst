.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about the Cloud security monitoring provided by Wazuh to monitor Amazon Web Services, Microsoft Azure, and Google Cloud Platform. 

Cloud security
==============

The Wazuh security platform provides threat detection, configuration compliance, and continuous monitoring for multicloud and hybrid environments. It protects cloud workloads by monitoring the infrastructure at two levels:

-  **Endpoint level**: monitoring cloud instances or virtual machines using the lightweight :doc:`Wazuh security agent <../components/wazuh-agent>`.

-  **Cloud infrastructure level**: monitoring cloud services and activity by collecting and analyzing data from the provider API. Amazon AWS, Microsoft Azure, and Google Cloud Platform are supported.

Amazon Web Services
-------------------

The :doc:`Wazuh agent <../components/wazuh-agent>` also provides a module to monitor and secure your AWS cloud infrastructure. This module collects AWS services log data from S3 buckets and forwards collected log messages to the :doc:`Wazuh server <../components/wazuh-server>`, where events are analyzed using out-of-the-box Wazuh rules for AWS.

The following list describes some of the AWS services that Wazuh can monitor:

- :doc:`Amazon Guardduty </cloud-security/amazon/services/supported-services/guardduty>`: threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts, workloads, and data stored in Amazon S3.

- :doc:`Amazon Inspector </cloud-security/amazon/services/supported-services/inspector>`: automated security assessment service that helps improve the security and compliance of applications deployed on AWS.

- :doc:`Amazon Key Management Service (KMS) </cloud-security/amazon/services/supported-services/kms>`: used to create and manage cryptographic keys and control their use across a wide range of AWS services.

- :doc:`Amazon Macie </cloud-security/amazon/services/supported-services/macie>`: fully managed data security and data privacy service. It automatically detects unencrypted S3 buckets, publicly accessible buckets, and buckets shared with external AWS accounts.

- :doc:`Amazon Virtual Private Cloud (VPC) </cloud-security/amazon/services/supported-services/vpc>`: provisions a logically isolated section of the AWS Cloud where AWS resources can be launched on a virtual network defined by the user.

- :doc:`AWS Config </cloud-security/amazon/services/supported-services/config>`: assess, audit, and evaluate the configurations of your AWS resources. It assists the users review changes in configurations and relationships between AWS resources.

- :doc:`AWS Cloudtrail </cloud-security/amazon/services/supported-services/cloudtrail>`: enables governance, compliance, operational auditing, and risk auditing of your AWS account. With CloudTrail, you can log, continuously monitor, and retain account activity related to actions across your AWS infrastructure.

- :doc:`AWS Trusted Advisor </cloud-security/amazon/services/supported-services/trusted-advisor>`: helps users reduce cost, increase performance, and improve security by optimizing their AWS environment. It provides real-time guidance to help users provision their resources following AWS best practices.

- :doc:`AWS Web Application Firewall (WAF) </cloud-security/amazon/services/supported-services/waf>`: helps protect your web applications or APIs against common web exploits that may affect availability, compromise security, or consume excessive resources.

See below an example of an alert generated when an AWS security group is deleted:

.. code-block:: json
   :emphasize-lines: 11,19,29,40
   :class: output accordion-output

   {
     "agent": {
         "id": "000",
         "name": "wazuh-manager-master"
     },
     "data": {
         "aws": {
             "awsRegion": "us-west-1",
             "aws_account_id": "1234567890",
             "eventID": "12ab34c-1234-abcd-1234-123456789",
             "eventName": "DeleteSecurityGroup",
             "eventSource": "ec2.amazonaws.com",
             "eventTime": "2020-08-06T15:13:07Z",
             "eventType": "AwsApiCall",
             "eventVersion": "1.05",
             "recipientAccountId": "0987654321",
             "requestID": "12345678-abcd-efgh-1234-123456789",
             "requestParameters": {
                 "groupId": "sg-12345678901234567"
             },
             "responseElements": {
                 "_return": "true",
                 "requestId": "12345678-abcd-efgh-1234-123456789"
             },
             "source": "cloudtrail",
             "sourceIPAddress": "cloudformation.amazonaws.com",
             "userAgent": "cloudformation.amazonaws.com",
             "userIdentity": {
                 "accountId": "1234567890",
                 "arn": "arn:aws:iam::1234567890:user/john.doe",
                 "invokedBy": "cloudformation.amazonaws.com",
                 "principalId": "ABCDEFGHIJKLMNH",
                 "sessionContext": {
                     "attributes": {
                         "creationDate": "2020-08-06T09:08:14Z",
                         "mfaAuthenticated": "false"
                     }
                 },
                 "type": "IAMUser",
                 "userName": "john.doe"
             }
         },
         "integration": "aws"
     },
     "rule": {
         "description": "AWS Cloudtrail: ec2.amazonaws.com - DeleteSecurityGroup.",
         "id": "80202",
         "level": 3
     }
     "timestamp": "2020-08-06T15:47:14.334+0000"
   }

Example of AWS dashboard:

.. thumbnail:: /images/getting-started/use-cases/aws-security-dashboard.png
   :title: AWS security dashboard
   :alt: AWS security dashboard
   :align: center
   :width: 80%
   :wrap_image: No

You can find more information on how to use Wazuh to monitor AWS in our :doc:`documentation </cloud-security/amazon/index>`.

Microsoft Azure
---------------

The :doc:`Wazuh agent <../components/wazuh-agent>` module for Microsoft Azure makes it easy to pull Azure platform logs. In particular, it is designed to obtain data from the following services:

- :doc:`Log Analytics API </cloud-security/azure/activity-services/services/log-analytics>`: The Log Analytics API is a core component of the Azure Monitor service, which is used to aggregate and analyze log data. The sources of such data are cloud applications, operating systems, and Azure resources. The Wazuh module for Azure is capable of querying the Log Analytics API, pulling the logs collected by the Azure monitor service.

- :doc:`Blob Storage API </cloud-security/azure/activity-services/services/storage>`: Logs from Azure services are optionally pushed to Azure Blob Storage. Specifically, it is possible to configure an Azure service to export logs to a container in a storage account created for that purpose. Afterward, the Wazuh agent will download those logs via its integration with the Blob Storage API.

- :doc:`Active Directory Graph API </cloud-security/azure/activity-services/active-directory/graph>`: The Azure Active Directory Graph API provides access to AZURE AD through REST API endpoints. It is used by Wazuh to monitor Active Directory events (e.g., creation of a new user, update of user properties, disable of user accounts, etc.).

See below an example of an Azure alert:

.. code-block:: json
   :emphasize-lines: 14,16
   :class: output

   {
     "agent": {
         "id": "000",
         "name": "wazuh-manager-master-0"
     },
     "data": {
         "Category": "Administrative",
         "ResourceProvider": "Microsoft.Compute",
         "TenantId": "d4cd75e6-7i2e-554d-b604-3811e9914fea",
         "ActivityStatus": "Started",
         "Type": "AzureActivity",
         "OperationId": "d4elf2e7-65d8-2824-gf44-37742d81c00f",
         "ResourceId": "/WazuhGroup/providers/Microsoft.Compute/virtualMachines/Logstash",
         "OperationName": "Microsoft.Compute/virtualMachines/start/action",
         "CorrelationId": "d4elf2e7-65d8-2824-gf44-37742d81c00f",
         "Resource": "Logstash",
         "Level": "Informational",
         "Caller": "john.doe@email.com",
         "TimeGenerated": "2020-05-25T15:43:16.52Z",
         "ResourceGroup": "WazuhGroup",
         "SubscriptionId": "v1153d2d-ugl4-4221-bc88-40365el115gg",
         "EventSubmissionTimestamp": "2020-05-25T15:43:36.109Z",
         "CallerIpAddress": "83.49.98.225",
         "EventDataId": "69db115c-45ds-664b-4275-a684a72b8df2",
         "SourceSystem": "Azure"
     },
     "rule": {
         "description": "Azure: Log analytics: Microsoft.Compute/virtualMachines/start/action",
         "id": "62723",
         "level": 3
     },
     "timestamp": "2020-05-25T15:45:51.432+0000"
   }

You can find more information on how to use Wazuh to monitor Microsoft Azure in our :doc:`documentation </cloud-security/azure/index>`.

Google Cloud Platform
---------------------

Wazuh monitors Google Cloud services by pulling events from the Google Pub/Sub messaging service, which is used as a middleware for events ingestion and delivery. This integration helps detect threats targeting your Google Cloud assets.

See below an example of an alert generated when a known bad actor (a source IP address with low reputation) tries to get a list of Pods running in Google Kubernetes Engine (GKE):

.. code-block:: json
   :emphasize-lines: 32,34
   :class: output

   {
     "agent": {
         "id": "000",
         "name": "wazuh-manager-master"
     },
     "data": {
         "insertId": "b2c2e792-aaa9-4422-82d0-de32940b1234",
         "labels": {
             "authorization": {
                 "k8s": {
                     "io/decision": "allow"
                 }
             }
         },
         "logName": "projects/gke-audit-logs/logs/cloudaudit.googleapis.com%2Fdata_access",
         "operation": {
             "first": "true",
             "id": "b2c2e792-aaa9-4422-82d0-de32940b1234",
             "last": "true",
             "producer": "k8s.io"
         },
         "protoPayload": {
             "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
             "authenticationInfo": {
                 "principalEmail": "john.doe@email.com"
             },
             "authorizationInfo": [{
                 "granted": true,
                 "permission": "io.k8s.core.v1.pods.list",
                 "resource": "core/v1/namespaces/default/pods"
             }],
             "methodName": "io.k8s.core.v1.pods.list",
             "requestMetadata": {
                 "callerIp": "35.195.195.195",
                 "callerSuppliedUserAgent": "kubectl/v1.18.6 (linux/amd64) kubernetes/dff82dc"
             },
             "resourceName": "core/v1/namespaces/default/pods",
             "serviceName": "k8s.io"
         },
         "receiveTimestamp": "2020-08-17T17:09:19.068723691Z",
         "resource": {
             "labels": {
                 "cluster_name": "wazuh",
                 "location": "us-central1-c",
                 "project_id": "gke-audit-logs"
             },
             "type": "k8s_cluster"
         },
         "timestamp": "2020-08-17T17:09:05.043988Z"
     },
     "rule": {
         "description": "Malicious GKE request origin for io.k8s.core.v1.pods.list operation.",
         "id": "400003",
         "level": 10
     },
     "timestamp": "2020-08-17T17:09:25.832+0000"
   }

You can find more information on how to use Wazuh to monitor the Google cloud platform in :doc:`/cloud-security/gcp/index`.
