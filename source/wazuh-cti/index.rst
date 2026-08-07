.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh CTI is an independent, centrally maintained platform that provides security content and cyber threat intelligence used across Wazuh capabilities.

.. _wazuh_cti:

Wazuh CTI
=========

Wazuh Cyber Threat Intelligence (CTI) is an independent, centrally maintained platform that provides security content and cyber threat intelligence through a publicly accessible website. It provides detection content, indicators of compromise (IoCs), and vulnerability intelligence that Wazuh synchronizes to support event enrichment, threat detection, and vulnerability detection. The Wazuh CTI service can also be accessed through the `Wazuh CTI website <https://cti.wazuh.com/vulnerabilities/cves>`__. Currently, the website provides access only to vulnerability intelligence, allowing users to browse CVE data and related vulnerability information.

The Wazuh indexer consumes CTI content through the Wazuh Content Manager, which retrieves and synchronizes updates from the Wazuh CTI platform. Once synchronized, the content is available to the Wazuh capabilities that use it. For example, the normalization engine uses the detection content and indicators of compromise (IoCs) during event processing, while the Vulnerability Scanner module uses vulnerability intelligence to identify vulnerabilities affecting monitored endpoints.

Wazuh CTI provides the following categories of content:

-  Detection content: Security content used to process and analyze events.
-  Indicators of compromise: Threat intelligence used to enrich security events.
-  Vulnerability intelligence: Vulnerability data used to identify known vulnerabilities affecting monitored endpoints.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      how-it-works
      managing-wazuh-cti
      troubleshooting
