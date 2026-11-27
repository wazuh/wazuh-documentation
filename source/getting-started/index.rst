.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Get started with Wazuh. Learn about our open source community of developers, the Wazuh components, architecture, and deployment.
  
Getting started with Wazuh
==========================

Wazuh is a free and open source security platform that unifies XDR (Extended Detection and Response) and SIEM (Security Information and Event Management) capabilities. It protects workloads across on-premises, virtualized, containerized, and cloud environments. Wazuh helps individuals and organizations of all sizes protect their data assets against security threats. Organizations worldwide use the platform, from small businesses to large enterprises.

Wazuh components are licensed under the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`__ (GPLv2), the `GNU Affero General Public License, version 3 <https://www.gnu.org/licenses/agpl-3.0.en.html>`__ (AGPLv3), and the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`__ (ALv2).

This guide provides an overview of the Wazuh platform, including its :doc:`components <components/index>`, :doc:`architecture <architecture>`, and common :doc:`use cases <use-cases/index>`.

Community and support
---------------------

.. include:: ../_templates/community.rst

How to install Wazuh
--------------------

Wazuh consists of three :doc:`central platform components <components/index>` and a single universal :doc:`agent <components/wazuh-agent>`.

Install Wazuh on your own infrastructure with one of the following options:

-  The :doc:`Quickstart </quickstart>` uses the :doc:`Wazuh installation assistant </user-manual/reference/installation-utilities/installation-assistant>` to install all the central components on one endpoint in just a few minutes.
-  The :doc:`Installation guide </installation-guide/index>` shows how to install each central component on one or more endpoints and how to deploy Wazuh agents.

Building with AI and LLMs
-------------------------

You can use large language models (LLMs) to assist in building, managing, and troubleshooting your Wazuh deployment. To support accurate and efficient AI-assisted workflows, Wazuh provides plain text documentation and machine-readable guidance optimized for LLM consumption.

Plain text documentation (.md)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Every page of the Wazuh documentation has a plain text Markdown version. To get it, replace ``.html`` with ``.md`` in the page URL.

For example:

-  **HTML page**: https://documentation.wazuh.com/5.0-rc/quickstart.html
-  **Markdown version**: https://documentation.wazuh.com/5.0-rc/quickstart.md

We recommend the Markdown version when you work with LLMs because it provides:

-  **Cleaner content**: Complete documentation text with minimal formatting noise and no navigation elements.
-  **Full visibility**: Content hidden behind tabs or expandable sections on the web page is rendered linearly.
-  **Structural clarity**: Headings, lists, and code blocks preserve document hierarchy for better parsing.
-  **Efficient context sharing**: You can copy and paste entire guides into an LLM without losing structure or meaning.

AI agent standard (/llms.txt)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh hosts an ``/llms.txt`` file at the root of the documentation domain. This file follows an emerging standard to guide AI tools and agents on how to retrieve and prioritize Wazuh documentation content. It also instructs agents to prefer the ``current`` documentation version unless another version is explicitly required.

The file is at https://documentation.wazuh.com/llms.txt.

Markdown versions of key pages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  `Quickstart <https://documentation.wazuh.com/5.0-rc/quickstart.md>`__
-  `User manual <https://documentation.wazuh.com/5.0-rc/user-manual/index.md>`__

Screenshots of Wazuh dashboards
-------------------------------

The following screenshots show dashboards of some of the Wazuh capabilities, including threat hunting, file integrity monitoring, security configuration assessment, vulnerability detection, regulatory compliance, IT hygiene, and others.

.. list-table::
   :width: 100%
   :widths: 50 50

   * - .. thumbnail:: ../images/getting-started/dashboard-overview.png
          :title: Dashboard overview
          :alt: Dashboard overview
     - .. thumbnail:: ../images/getting-started/it-hygiene-dashboard.png
          :title: IT hygiene
          :alt: IT hygiene
   * - .. thumbnail:: ../images/getting-started/configuration-assessment-dashboard.png
          :title: Security configuration assessment
          :alt: Security configuration assessment
     - .. thumbnail:: ../images/getting-started/vulnerability-detection-dashboard.png
          :title: Vulnerability detection
          :alt: Vulnerability detection
   * - .. thumbnail:: ../images/getting-started/threat-hunting-dashboard.png
          :title: Threat hunting
          :alt: Threat hunting
     - .. thumbnail:: ../images/getting-started/fim-dashboard.png
          :title: File integrity monitoring
          :alt: File integrity monitoring
   * - .. thumbnail:: ../images/getting-started/cti-explorer-dashboard.png
          :title: CTI Explorer
          :alt: CTI Explorer
     - .. thumbnail:: ../images/getting-started/cti-feed-dashboard.png
          :title: CTI Feed
          :alt: CTI Feed
   * - .. thumbnail:: ../images/getting-started/regulatory-compliance-hipaa.png
          :title: Regulatory compliance - HIPAA
          :alt: Regulatory compliance - HIPAA
     - .. thumbnail:: ../images/getting-started/regulatory-compliance-cmmc.png
          :title: Regulatory compliance - CMMC
          :alt: Regulatory compliance - CMMC
   * - .. thumbnail:: ../images/getting-started/case-management-dashboard.png
          :title: Case management
          :alt: Case management
     - .. thumbnail:: ../images/getting-started/case-management-cases.png
          :title: Case management - Cases
          :alt: Case management - Cases
   * - .. thumbnail:: ../images/getting-started/mitre-attack-dashboard.png
          :title: MITRE ATT&CK
          :alt: MITRE ATT&CK
     - .. thumbnail:: ../images/getting-started/incident-response-dashboard.png
          :title: Incident response
          :alt: Incident response

.. toctree::
   :hidden:

   components/index
   architecture
   use-cases/index
