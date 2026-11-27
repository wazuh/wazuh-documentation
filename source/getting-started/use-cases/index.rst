.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Explore Wazuh 5.0 use cases for endpoint security, threat intelligence, security operations, and cloud security, and learn how Wazuh detects, investigates, and responds to threats.

Use cases
=========

Explore how Wazuh 5.0 addresses common security challenges across endpoints, cloud workloads, and security operations. Each use case describes a security need and explains how Wazuh detects, investigates, or responds to related threats.

The :doc:`Wazuh agent </getting-started/components/wazuh-agent>` collects security data from monitored endpoints, such as logs, system inventory, and file changes. Wazuh also monitors cloud services, including AWS, Microsoft Azure, Google Cloud, Office 365, and GitHub, and Docker container activity. Wazuh analyzes this data to detect threats, and you investigate the resulting findings on the :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`. Wazuh also maps findings to regulatory frameworks, such as PCI DSS, HIPAA, and GDPR, to help you collect compliance evidence.

The use cases are grouped into four categories that include endpoint security, threat intelligence, security operations, and cloud security. Click a use case in the following table to explore its details.

+------------------------------------------------------------+----------------------------------------------------------+------------------------------------------------------+--------------------------------------------------------------+
| **Endpoint security**                                      | **Threat intelligence**                                  | **Security operations**                              | **Cloud security**                                           |
+============================================================+==========================================================+======================================================+==============================================================+
| :doc:`Configuration assessment <configuration-assessment>` | :doc:`Threat hunting <threat-hunting>`                   | :doc:`Incident response <incident-response>`         | :doc:`Container security <container-security>`               |
+------------------------------------------------------------+----------------------------------------------------------+------------------------------------------------------+--------------------------------------------------------------+
| :doc:`Malware detection <malware-detection>`               | :doc:`Log data analysis <log-analysis>`                  | :doc:`Regulatory compliance <regulatory-compliance>` | :doc:`Posture management <posture-management>`               |
+------------------------------------------------------------+----------------------------------------------------------+------------------------------------------------------+--------------------------------------------------------------+
| :doc:`File integrity monitoring <file-integrity>`          | :doc:`Vulnerability detection <vulnerability-detection>` | :doc:`IT hygiene <it-hygiene>`                       | :doc:`Cloud workload protection <cloud-workload-protection>` |
+------------------------------------------------------------+----------------------------------------------------------+------------------------------------------------------+--------------------------------------------------------------+
|                                                            | :doc:`Case management <case-management>`                 |                                                      |                                                              |
+------------------------------------------------------------+----------------------------------------------------------+------------------------------------------------------+--------------------------------------------------------------+

Endpoint security
-----------------

The Wazuh platform secures monitored endpoints through Security Configuration Assessment (SCA), malware detection, and file integrity monitoring (FIM).

Threat intelligence
-------------------

The Wazuh unified XDR (Extended Detection and Response) and SIEM (Security Information and Event Management) platform provides threat intelligence capabilities. They help you hunt for threats, analyze log data at scale, and detect vulnerable software across your monitored endpoints.

Security operations
-------------------

The Wazuh unified XDR and SIEM platform strengthens security operations through automated response, compliance mapping, and continuous endpoint visibility.

Cloud security
--------------

The Wazuh unified XDR and SIEM platform helps organizations secure cloud environments. It monitors container activity, assesses configuration posture, and analyzes cloud provider logs and workload data.

.. toctree::
   :hidden:

   configuration-assessment
   malware-detection
   file-integrity
   threat-hunting
   log-analysis
   vulnerability-detection
   case-management
   incident-response
   regulatory-compliance
   it-hygiene
   container-security
   posture-management
   cloud-workload-protection
