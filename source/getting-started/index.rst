.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Get started with Wazuh. Learn about our open source community of developers, the Wazuh components, architecture, and deployment.
  
.. _getting-started:

Getting started
===============


Wazuh is a free and open source platform used for threat prevention, detection, and response. It protects workloads across on-premises, virtualized, containerized and cloud-based environments. Wazuh is widely used by thousands of organizations around the world, from small businesses to large enterprises.

Wazuh solution consists of an :ref:`endpoint security agent <wazuh_agent>`, deployed to the monitored systems, and a :ref:`management server <wazuh_server>`, which collects and analyzes data gathered by the agents. Besides, Wazuh has been fully integrated with the :ref:`Elastic Stack <elastic_stack>`, providing a search engine and data visualization tool that allows users to navigate through their security alerts.

Community and support
---------------------

.. include:: ../_templates/community.rst

Screenshots
-----------

.. list-table::
   :width: 100%
   :widths: 50 50

   * - .. thumbnail:: ../images/getting-started/screenshot-01-Wazuh-Security-Analytics.png
          :title: Security analytics
     - .. thumbnail:: ../images/getting-started/screenshot-02-Wazuh-Intrusion-Detection.png
          :title: Intrusion detection
   * - .. thumbnail:: ../images/getting-started/screenshot-03-Wazuh-Log-Data-Analysis.png
          :title: Log data analysis
     - .. thumbnail:: ../images/getting-started/screenshot-04-Wazuh-File-Integrity-Monitoring.png
          :title: File integrity monitoring
   * - .. thumbnail:: ../images/getting-started/screenshot-05-Wazuh-Vulnerability-Detection.png
          :title: Vulnerability detection
     - .. thumbnail:: ../images/getting-started/screenshot-06-Wazuh-Configuration-Assessment.png
          :title: Configuration assessment
   * - .. thumbnail:: ../images/getting-started/screenshot-07-Wazuh-Incident-Response.png
          :title: Incident response
     - .. thumbnail:: ../images/getting-started/screenshot-08-Wazuh-Regulatory-Compliance.png
          :title: Regulatory compliance
   * - .. thumbnail:: ../images/getting-started/screenshot-09-Wazuh-Cloud-Security.png
          :title: Cloud security
     - .. thumbnail:: ../images/getting-started/screenshot-10-Wazuh-Containers-Security.png
          :title: Containers security

Table of contents
-----------------

This document provides an overview of the Wazuh platform components and architecture. It also includes a brief description of some of the most common use cases of the solution.

.. toctree::
   :maxdepth: 1

   components/index
   architecture
   use-cases/index
