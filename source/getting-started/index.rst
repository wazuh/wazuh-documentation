.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Get started with Wazuh. Learn about our open source community of developers, the Wazuh components, architecture, and deployment.
  
.. _getting_started:

Getting started with Wazuh
==========================

Wazuh is a free and open source platform used for threat prevention, detection, and response. It protects workloads across on-premises, virtualized, containerized, and cloud-based environments. Wazuh is widely used by thousands of organizations around the world, from small businesses to large enterprises.

The Wazuh solution consists of an :ref:`endpoint security agent <wazuh_agent>`, which is deployed on the monitored endpoints, and of three central components in charge of analyzing, processing, and storing the data: the :ref:`Wazuh server <wazuh_server>`, :ref:`Elasticsearch <components_elasticsearch>`, and :ref:`Kibana <components_kibana>`.


Community and support
---------------------

.. include:: ../_templates/community.rst

Screenshots
-----------

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
   use-cases/index
