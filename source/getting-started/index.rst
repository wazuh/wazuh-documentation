.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Get started with Wazuh. Learn about our open source community of developers, the Wazuh components, architecture, and deployment.
  
Getting started with Wazuh
==========================

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. It protects workloads across on-premises, virtualized, containerized, and cloud-based environments.

Wazuh helps individuals and organizations of all sizes to protect their data assets against security threats and is widely used worldwide, from small businesses to large enterprises.

This guide provides an overview of the Wazuh platform, including its :doc:`components <components/index>`, :doc:`architecture <architecture>`, and common :doc:`use cases <use-cases/index>`.

Community and support
---------------------

.. include:: ../_templates/community.rst

How to install Wazuh
--------------------

The Wazuh solution is composed of three :doc:`central platform components <components/index>` and a single universal :doc:`agent </installation-guide/wazuh-agent/index>`. To install Wazuh in your infrastructure, refer to the following sections of our documentation:

-  The :doc:`Quickstart </quickstart>` provides an automated way to install Wazuh on a single server in just a few minutes.
-  The :doc:`Installation guide </installation-guide/index>` provides instructions on how to install each central component and how to deploy the Wazuh agents.

Screenshots of Wazuh dashboards
-------------------------------

The following screenshots show dashboards of some of the Wazuh capabilities, including threat hunting, file integrity monitoring, security configuration assessment, vulnerability detection, regulatory compliance, and others.

.. list-table::
   :width: 100%
   :widths: 50 50

   * - .. thumbnail:: ../images/getting-started/configuration-assessment-dashboard.png
          :title: Security configuration assessment
          :alt: Security configuration assessment
     - .. thumbnail:: ../images/getting-started/fim-dashboard.png
          :title: File integrity monitoring
          :alt: File integrity monitoring
   * - .. thumbnail:: ../images/getting-started/it-hygiene-dashboard.png
          :title: IT hygiene
          :alt: IT hygiene
     - .. thumbnail:: ../images/getting-started/mitre-attack-dashboard.png
          :title: MITRE ATT&CK
          :alt: MITRE ATT&CK
   * - .. thumbnail:: ../images/getting-started/regulatory-compliance-gdpr.png
          :title: Regulatory compliance - GDPR
          :alt: Regulatory compliance - GDPR
     - .. thumbnail:: ../images/getting-started/regulatory-compliance-nist.png
          :title: Regulatory compliance - NIST
          :alt: Regulatory compliance - NIST
   * - .. thumbnail:: ../images/getting-started/threat-hunting-dashboard.png
          :title: Threat hunting
          :alt: Threat hunting
     - .. thumbnail:: ../images/getting-started/vulnerability-detection-dashboard.png
          :title: Vulnerability detection
          :alt: Vulnerability detection

.. toctree::
   :hidden:

   components/index
   architecture
