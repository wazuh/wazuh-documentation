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
-  The :doc:`Installation guide </installation-guide/index>` provides instructions on how to install each central component and how to deploy Wazuh agents.

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

Building with AI and LLMs
-------------------------

You can use large language models (LLMs) to assist in building, managing, and troubleshooting your Wazuh deployment. To support accurate and efficient AI-assisted workflows, Wazuh provides plain text documentation and machine-readable guidance optimized for LLM consumption.

Plain text documentation (.md)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can access most of the Wazuh documentation as plain text Markdown files by replacing ``.html`` with ``.md`` in the URL of any documentation page.

For example:

-  HTML page: https://documentation.wazuh.com/current/quickstart.html
-  Markdown version: https://documentation.wazuh.com/current/quickstart.md

Using the Markdown version is recommended when working with LLMs because it provides:

-  **Cleaner content**: Complete documentation text with minimal formatting noise and no navigation elements.
-  **Full visibility**: Content hidden behind tabs or expandable sections in the web UI is rendered linearly.
-  **Structural clarity**: Headings, lists, and code blocks preserve document hierarchy for better parsing.
-  **Efficient context sharing**: You can copy and paste entire guides into an LLM without losing structure or meaning.

AI agent standard (/llms.txt)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh hosts an ``/llms.txt`` file at the root of the documentation domain. This file follows an emerging standard to guide AI tools and agents on how to retrieve and prioritize Wazuh documentation content. It also instructs agents to prefer the ``current`` documentation version unless another version is explicitly required.

You can access it here:
https://documentation.wazuh.com/llms.txt

Start exploring (Markdown)
^^^^^^^^^^^^^^^^^^^^^^^^^^

-  https://documentation.wazuh.com/current/quickstart.md
-  https://documentation.wazuh.com/current/user-manual/index.md

.. toctree::
   :hidden:

   components/index
   architecture
   use-cases/index
