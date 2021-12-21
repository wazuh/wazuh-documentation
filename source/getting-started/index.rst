.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Get started with Wazuh. Learn about our open source community of developers, the Wazuh components, architecture, and deployment.
  
.. _getting_started:

Getting started with Wazuh
==========================

Wazuh is a free and open source platform used for threat prevention, detection, and response. It protects workloads across on-premises, virtualized, containerized, and cloud-based environments. Wazuh is widely used by thousands of organizations around the world, from small businesses to large enterprises.

Wazuh solution consists of an :ref:`endpoint security agent <wazuh_agent>` deployed to the monitored systems and a :ref:`management server <wazuh_server>`, which collects and analyzes data gathered by the agents. Moreover, Wazuh provides a search engine and data visualization tool that allows users to navigate through their security alerts.

You can also use our software as a service (SaaS), `Wazuh Cloud <https://wazuh.com/cloud/>`_ solution, where no dedicated hardware is required, and everything is ready to use.


Community and support
---------------------

.. include:: ../_templates/community.rst


How to install Wazuh
--------------------

The Wazuh solution is based on three central components and the Wazuh agent. The :ref:`Wazuh server <wazuh_server_installation>`, the :ref:`Wazuh indexer <wazuh_indexer_installation>`, and the :ref:`Wazuh dashboard <wazuh_dashboard_installation>` are the three central components in charge of analyzing, processing, and storing the data. The :ref:`Wazuh agent <installation_agents>` is a single and lightweight monitoring software deployed on the monitored endpoints to provide prevention, detection, and response capabilities.

For deploying Wazuh in your infrastructure, you can choose between two different options. All Wazuh central components are installed on the same host with an **all-in-one deployment**. On the other hand, each component is installed on a separate host as a single-node or multi-node cluster with a **distributed deployment**.


Quickstart
^^^^^^^^^^

The :ref:`Wazuh quickstart <quickstart>` lets you install all the central components on the same host using the unattended installation script. By running the automated script, you install and configure the Wazuh in just a few minutes.

The unattended installation will help you deploy Wazuh as an all-in-one, running all the central components in the same system.


Unattended or Step-by-step
^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh three central components are in charge of analyzing the data gathered by the Wazuh agents. Users are able to navigate through their security alerts thanks to the search engine and data visualization tool provided by the Wazuh solution.

Each of the central components can be installed as a single-node or multi-node cluster, and you can choose between two installation methods. The first method is the **Unattended installation**, where you install each component by using a script that automates the installation process. 

The second method is the **Step-by-step installation**, where you install each component manually following detailed step-by-step instructions. For more information about these installation methods you can check our :ref:`Installation guide <installation_guide>` section.


More deployment and integration options
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh count with multiple deployment alternatives to adapt to the needs of your environment. These alternatives are complementary to the standard deployment options described in the :ref:`Installation guide <installation_guide>`. 

Below we present a list of different deployment and integration options:

- :ref:`Deployment on Docker <wazuh_docker>`
- :ref:`Deployment on Kubernetes <wazuh_kubernetes>`
- :ref:`Deployment with Ansible <wazuh_ansible>`
- :ref:`Deployment with Puppet <wazuh_puppet>`
- :ref:`Offline installation <wazuh-offline-installation>`
- :ref:`Installation from sources <installation_from_sources>`
- :ref:`Integration with Elastic Stack basic license <basic_installation_guide>`
- :ref:`Integration with Splunk <installation_splunk>`

For information about the different deployment types, check the :ref:`Deployment options <deployment>` section. 


Wazuh Cloud
-----------

Wazuh offers `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) solution. This way, instead of installing and maintaining software, you simply access it via the Wazuh Cloud Console, a web application to manage Wazuh where all processes are greatly simplified. 

This service provides a highly flexible infrastructure to match your enterprise needs. With Wazuh Cloud, no dedicated hardware is required, the Wazuh components maintenance is done by the Wazuh team, and everything is ready to use. We provide a `14-day free trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`_ for you to create a cloud environment, a deployment that contains all the Wazuh components ready to be used.


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
