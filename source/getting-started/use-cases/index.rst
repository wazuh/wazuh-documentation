.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Explore Wazuh 5.0 use cases for endpoint security, threat intelligence, security operations, and cloud security, and learn how Wazuh detects, investigates, and responds to threats.

Use cases
=========

Explore how Wazuh 5.0 capabilities address common security challenges across endpoints, cloud workloads, and security operations. Each use case describes a security need and explains how Wazuh detects, investigates, or responds to related threats.

The :doc:`Wazuh agent </getting-started/components/wazuh-agent>` collects logs, system inventory, and file integrity data from monitored endpoints and forwards the data to the :doc:`Wazuh manager </getting-started/components/wazuh-manager>`. The Wazuh normalization engine decodes and maps each event to the Wazuh Common Schema (WCS). The :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>` stores the events and evaluates them against detection rules to generate findings. You investigate these findings on the :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`.

Wazuh also monitors cloud services, including Amazon Web Services (AWS), Microsoft Azure, Google Cloud, Office 365, and GitHub, through their APIs. In containerized environments, the Docker listener module of the Wazuh agent collects Docker Engine events to support container activity monitoring.

Wazuh maps findings and Security Configuration Assessment (SCA) checks to regulatory frameworks and security standards. Supported frameworks include the Payment Card Industry Data Security Standard (PCI DSS), the Health Insurance Portability and Accountability Act (HIPAA), and the General Data Protection Regulation (GDPR). Wazuh also supports NIST SP 800-53, NIST SP 800-171, ISO 27001, NIS2, CMMC, FedRAMP, and the Trust Services Criteria (TSC). SCA policies also assess endpoints against the Center for Internet Security (CIS) Benchmarks. These mappings help you collect evidence for compliance assessments.

The use cases are grouped into four categories that include endpoint security, threat intelligence, security operations, and cloud security. Select a use case in the following table to explore its details.

+------------------------------------------------------------+----------------------------------------------------------+------------------------------------------------------+------------------------------------------------+
| **Endpoint security**                                      | **Threat intelligence**                                  | **Security operations**                              | **Cloud security**                             |
+============================================================+==========================================================+======================================================+================================================+
| :doc:`Configuration assessment <configuration-assessment>` | :doc:`Threat hunting <threat-hunting>`                   | :doc:`Incident response <incident-response>`         | :doc:`Container security <container-security>` |
+------------------------------------------------------------+----------------------------------------------------------+------------------------------------------------------+------------------------------------------------+
| :doc:`File integrity monitoring <file-integrity>`          | :doc:`Log data analysis <log-analysis>`                  | :doc:`Regulatory compliance <regulatory-compliance>` |                                                |
+------------------------------------------------------------+----------------------------------------------------------+------------------------------------------------------+------------------------------------------------+
|                                                            | :doc:`Vulnerability detection <vulnerability-detection>` | :doc:`IT hygiene <it-hygiene>`                       |                                                |
+------------------------------------------------------------+----------------------------------------------------------+------------------------------------------------------+------------------------------------------------+

.. rubric:: Endpoint security

The Wazuh platform secures monitored endpoints through Security Configuration Assessment (SCA), malware detection, and File integrity monitoring (FIM).

.. rubric:: Threat intelligence

The Wazuh unified XDR and SIEM platform provides threat intelligence capabilities. They help you hunt for threats, analyze log data at scale, and detect vulnerable software across your monitored endpoints.

.. rubric:: Security operations

The Wazuh unified XDR (Extended Detection and Response) and SIEM (Security Information and Event Management) platform strengthens security operations through automated response, compliance mapping, and continuous endpoint visibility.

.. rubric:: Cloud security

The Wazuh unified XDR and SIEM platform helps organizations monitor cloud environments by analyzing container activity, assessing configuration posture, and collecting and analyzing cloud provider logs and workload data.

.. toctree::
   :hidden:

   configuration-assessment
   file-integrity
   threat-hunting
   log-analysis
   vulnerability-detection
   incident-response
   regulatory-compliance
   it-hygiene
   container-security
