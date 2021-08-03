.. Copyright (C) 2021 Wazuh, Inc.

.. _getting_started:

Getting started with Wazuh
==========================

.. meta::
  :description: Get started with the Wazuh open source security platform. 

Wazuh is a free and open source platform used for threat prevention, detection, and response. It protects workloads across on-premises, virtualized, containerized and cloud-based environments. Wazuh is widely used by thousands of organizations around the world, from small businesses to large enterprises.

Wazuh solution consists of an :ref:`endpoint security agent <wazuh_agent>`, deployed to the monitored systems, and a :ref:`management server <wazuh_server>`, which collects and analyzes data gathered by the agents. Moreover, Wazuh provides a search engine and data visualization tool that allows users to navigate through their security alerts.

Community and support
---------------------

.. include:: ../_templates/community.rst

Capabilities
------------

.. list-table::
   :width: 100%
   :widths: 50 50

   * - .. thumbnail:: ../images/getting_started/screenshot_01_security_analytics.png
          :title: Security analytics
     - .. thumbnail:: ../images/getting_started/screenshot_02_intrusion_detection.png
          :title: Intrusion detection
   * - .. thumbnail:: ../images/getting_started/screenshot_03_log_data_analysis.png
          :title: Log data analysis
     - .. thumbnail:: ../images/getting_started/screenshot_04_file_integrity_monitoring.png
          :title: File integrity monitoring
   * - .. thumbnail:: ../images/getting_started/screenshot_05_vulnerability_detection.png
          :title: Vulnerability detection
     - .. thumbnail:: ../images/getting_started/screenshot_06_configuration_assessment.png
          :title: Configuration assessment
   * - .. thumbnail:: ../images/getting_started/screenshot_07_incident_response.png
          :title: Incident response
     - .. thumbnail:: ../images/getting_started/screenshot_08_regulatory_compliance.png
          :title: Regulatory compliance
   * - .. thumbnail:: ../images/getting_started/screenshot_09_cloud_security.png
          :title: Cloud security
     - .. thumbnail:: ../images/getting_started/screenshot_10_containers_security.png
          :title: Containers security

Table of contents
-----------------

This document provides an overview of the Wazuh platform components and architecture. It also includes a brief description of some of the most common use cases of the solution.

.. toctree::
   :maxdepth: 1

   components/index
   architecture
   use_cases/index
