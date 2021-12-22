.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Get started with Wazuh. Learn about our open source community of developers, the Wazuh components, architecture, and deployment.
  
.. _getting_started:


Getting started with Wazuh
==========================

Wazuh is a free and open source security platform used for threat prevention, detection, and response. It protects workloads across on-premises, virtualized, containerized, and cloud-based environments. 

With Wazuh you get a high-performance host-based intrusion detection system (HIDS) that helps organizations and individuals to protect their data assets against security threats. It is widely used by thousands of organizations worldwide, from small businesses to large enterprises.

You can also try `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS). Where no dedicated hardware is required, and you can work efficiently within a ready-to-use cloud environment.


Community and support
---------------------

.. include:: ../_templates/community.rst


How to install Wazuh
--------------------

For deploying Wazuh in your infrastructure, you can choose between two different options. With an **all-in-one deployment** all Wazuh central components are installed on the same host. On the other hand, each component is installed on a separate host as a single-node or multi-node cluster with a **distributed deployment**.

The Wazuh solution is composed of three central platform components and a single universal agent. The :ref:`Wazuh server <wazuh_server_installation>`, the :ref:`Wazuh indexer <wazuh_indexer_installation>`, and the :ref:`Wazuh dashboard <wazuh_dashboard_installation>` are the three central components which collects and analyzes the data gathered by the agents. The :ref:`Wazuh agent <installation_agents>` is a single and lightweight monitoring software deployed on the monitored endpoints to provide prevention, detection, and response capabilities.


Quickstart
^^^^^^^^^^

The :ref:`Wazuh quickstart <quickstart>` lets you install all the central components on the same host using the unattended installation script. You can easily deploy and configure the Wazuh solution in just minutes. This installation method will help you run all the central components in the same system with an all-in-one deployment.

In the quickstart section, you can also check the :ref:`installation requirements <installation_requirements>`. Here you can access the hardware requirements and the supported operating systems to ensure you meet the minimum requirements before installing.


Unattended or Step-by-step
^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh three central components are in charge of analyzing the data gathered by the Wazuh agents. Users are able to navigate through their security alerts thanks to the search engine and data visualization tool provided by the Wazuh solution.

Each of the central components can be installed as a single-node or multi-node cluster, and you can choose between two installation methods. The first method is the **Unattended installation**, where you install each component by using a script that automates the installation process. 

The second method is the **Step-by-step installation**, where you install each component manually following detailed step-by-step instructions. You can check our :ref:`Installation guide <installation_guide>` section for more information about these installation methods.


Wazuh Cloud
-----------

`Wazuh Cloud <https://wazuh.com/cloud/>`_ is the right solution when you prefer to work in a cloud environment with a deployment containing all the Wazuh components ready to be used. This service provides a highly flexible infrastructure to match the requirements of your organization.

Wazuh Cloud is our software as a service (SaaS) solution. You don't need to install and maintain any kind of software. You only need to access the Wazuh Cloud Console, a web application that will help you manage Wazuh in a simple way, where all processes are greatly simplified. 

You don't need more dedicated hardware. Let our team be in charge of maintaining the Wazuh components while you take advantage of this ready-to-use cloud environment.

Feel free to try our `14-day free trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`_. Here you can create your cloud environment with a deployment that contains all the Wazuh components ready to work.


Useful resources
----------------

- :ref:`Deployment options <deployment>`: Here you will find instructions on how to deploy Wazuh using ready-to-use machines, using containers, using orchestration tools, installing offline, installing from sources, and integrations with commercial options.  
- :ref:`Capabilities <capabilities>`: Learn more about Wazuh capabilities, how they work, their configuration, FAQs, and practical examples on how to use our solution.
- :ref:`Proof of Concept guide <poc_guide>`: Here you get to explore how to set up the Wazuh environment to test or demo the different product capabilities.


Table of contents
-----------------

This document provides an overview of the Wazuh platform components and architecture. It also includes a brief description of some of the most common use cases of the solution.

.. toctree::
   :maxdepth: 1

   components/index
   architecture
   use-cases/index
