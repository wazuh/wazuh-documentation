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

   * - .. thumbnail:: ../images/getting-started/threat-hunting.png
          :title: Threat Hunting 
          :alt: Threat Hunting 
     - .. thumbnail:: ../images/getting-started/malware-detection.png
          :title: Malware detection
          :alt: Malware detection 
   * - .. thumbnail:: ../images/getting-started/file-integrity-monitoring.png
          :title: File Integrity Monitoring
          :alt: File Integrity Monitoring 
     - .. thumbnail:: ../images/getting-started/vulnerability-detection.png
          :title: Vulnerability Detection  
          :alt: Vulnerability Detection  
   * - .. thumbnail:: ../images/getting-started/mitre-attack.png
          :title: Mitre Att&ck
          :alt: Mitre Att&ck
     - .. thumbnail:: ../images/getting-started/configuration-assessment.png
          :title: Security configuration assessment   
          :alt: Security configuration assessment   
   * - .. thumbnail:: ../images/getting-started/endpoints-summary.png
          :title: Summary 
          :alt: Summary 
     - .. thumbnail:: ../images/getting-started/aws.png
          :title: Amazon Web Services 
          :alt: Amazon Web Services 
   * - .. thumbnail:: ../images/getting-started/github.png
          :title: GitHub 
          :alt: GitHub 
     - .. thumbnail:: ../images/getting-started/pci-dss.png
          :title: PCI DSS
          :alt: PCI DSS

.. toctree::
   :hidden:

   components/index
   architecture
   use-cases/index
