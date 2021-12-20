.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Get started with Wazuh. Learn about our open source community of developers, the Wazuh components, architecture, and deployment.
  
.. _getting_started:

Getting started with Wazuh
==========================

What is Wazuh?
--------------

Wazuh is a free and open source platform used for threat prevention, detection, and response. You can install Wazuh to protect workloads across on-premises, virtualized, containerized, and cloud-based environments. 

Wazuh is widely used by thousands of organizations around the world, from small businesses to large enterprises. You can also use our software as a service (SaaS), Wazuh Cloud solution, where no dedicated hardware is required, and everything is ready to use.

The Wazuh solution is based on three central components and the Wazuh agent. The :ref:`Wazuh server <wazuh_server_installation>`, the :ref:`Wazuh indexer <wazuh_indexer_installation>`, and the :ref:`Wazuh dashboard <wazuh_dashboard_installation>` are the three central components in charge of analyzing, processing, and storing the data. 

The :ref:`Wazuh agent <installation_agents>` is a single and lightweight monitoring software deployed on the monitored endpoints to provide prevention, detection, and response capabilities. Moreover, Wazuh provides a search engine and data visualization tool that allows users to navigate through their security alerts.


Community and support
---------------------

.. include:: ../_templates/community.rst


How to install Wazuh
--------------------

For deploying Wazuh in your infrastructure, you can choose between two different options. All Wazuh central components are installed on the same host with an **all-in-one deployment**. On the other hand, each component is installed on a separate host as a single-node or multi-node cluster with a **distributed deployment**.


Quickstart
^^^^^^^^^^

The :ref:`Wazuh quickstart <quickstart>` allows you to easily install all the central components on the same host using the unattended installation script. By running the automated script, you install and configure the Wazuh in just a few minutes.

The Wazuh three central components, the :ref:`Wazuh server <wazuh_server_installation>`, the :ref:`Wazuh indexer <wazuh_indexer_installation>`, and the :ref:`Wazuh dashboard <wazuh_dashboard_installation>`, are in charge of analyzing the data gathered by the Wazuh agents, providing a search engine and data visualization tool that allow users to navigate through their security alerts.


Standard installation
^^^^^^^^^^^^^^^^^^^^^

Each of the central component can be installed as a single-node or multi-node cluster and you can choose between two installation method. The **Unattended installation** method where you install each component by using a script that automates the installation process.Then the **Step-by-step installation** method where you install each component manually following detailed step-by-step instructions.


Wazuh Cloud
^^^^^^^^^^^

Wazuh offers `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. This means that instead of installing and maintaining software, you simply access it via the Wazuh Cloud Console, a web application to manage Wazuh where all processes are greatly simplified. This service provides a highly flexible infrastructure to match your enterprise needs. With Wazuh Cloud, no dedicated hardware is required, the Wazuh components maintenance is done by the Wazuh team, and everything is ready to use. 

We provide a `14-day free trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`_ for you to create a cloud environment, a deployment that contains all the Wazuh components ready to be used.


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
