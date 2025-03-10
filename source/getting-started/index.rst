.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Get started with Wazuh. Learn about our open source community of developers, the Wazuh components, architecture, and deployment.
  
Getting started with Wazuh
==========================

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. It protects workloads across on-premises, virtualized, containerized, and cloud-based environments.

Wazuh helps organizations and individuals to protect their data assets against security threats. It is widely used by thousands of organizations worldwide, from small businesses to large enterprises.

Check this Getting Started for an overview of the Wazuh platform :doc:`components <components/index>`, :doc:`architecture <architecture>`, and common :doc:`use cases <use-cases/index>`.

Community and support
---------------------

.. include:: ../_templates/community.rst

How to install Wazuh
--------------------

The Wazuh solution is composed of three :doc:`central platform components <components/index>` and a single universal :doc:`agent </installation-guide/wazuh-agent/index>`. For installing Wazuh in your infrastructure, you can check the following sections of our documentation:

-  The :doc:`Quickstart </quickstart>` is an automated way of installing Wazuh in just a few minutes.
-  The :doc:`Installation guide </installation-guide/index>` provides instructions on how to install each central component and how to deploy the Wazuh agents.

Wazuh Cloud
-----------

The `Wazuh Cloud <https://wazuh.com/cloud/>`_ is our software as a service (SaaS) solution. We provide a `14-day free trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`_ for you to create a cloud environment and get the best out of our SaaS solution. Check the :doc:`Cloud service </cloud-service/index>` documentation for more information.

Screenshots
-----------

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
