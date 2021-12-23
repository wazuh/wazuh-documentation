.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Get started with Wazuh. Learn about our open source community of developers, the Wazuh components, architecture, and deployment.
  
.. _getting_started:


Getting started with Wazuh
==========================

Wazuh is a free and open source security platform used for threat prevention, detection, and response. It protects workloads across on-premises, virtualized, containerized, and cloud-based environments. 

With Wazuh, you get a high-performance host-based intrusion detection system (HIDS) that helps organizations and individuals to protect their data assets against security threats. It is widely used by thousands of organizations worldwide, from small businesses to large enterprises.

You can also try `Wazuh Cloud <https://wazuh.com/cloud/>`_, our software as a service (SaaS) where no dedicated hardware is required, and you can work efficiently within a ready-to-use cloud environment.


Community and support
---------------------

.. include:: ../_templates/community.rst


How to install Wazuh
--------------------

The Wazuh solution is composed of :ref:`three central platform components <components>` called the Wazuh server, the Wazuh indexer, the Wazuh dashboard, and a single universal agent called the :ref:`Wazuh agent <installation_agents>`. 

For deploying Wazuh in your infrastructure, you can read the following sections of our documentation:

- The :ref:`Wazuh quickstart <quickstart>` shows you how to install all the central components on the same host using the unattended installation script with an all-in-one deployment. 
- The :ref:`Installation guide <installation_guide>` section shows you how to install each component using the Unattended or the Step-by-step installation methods.


Wazuh Cloud
-----------

`Wazuh Cloud <https://wazuh.com/cloud/>`_ is the right solution when you prefer to work in a cloud environment with a deployment containing all the Wazuh components ready to be used. This service provides a highly flexible infrastructure to match the requirements of your organization.

Wazuh Cloud is our software as a service (SaaS) solution. With this option, you don't need to install and maintain any kind of software. You only need to access the Wazuh Cloud Console, a web application that will help you manage Wazuh in a simple way, where all processes are greatly simplified. 

You don't need more dedicated hardware. Let our team be in charge of maintaining the Wazuh components while you take advantage of this ready-to-use cloud environment. Feel free to try our `14-day free trial <https://console.cloud.wazuh.com/sign-up?landing=trial>`_. Here you can create your cloud environment with a deployment that contains all the Wazuh components ready to work.


More valuable resources
-----------------------

- :ref:`Deployment options <deployment>`: Here, you will find instructions on how to deploy Wazuh using ready-to-use machines, using containers, using orchestration tools, installing offline, installing from sources, and integrations with commercial options.  
- :ref:`Capabilities <capabilities>`: Learn more about Wazuh capabilities, how they work, their configuration, FAQs, and practical examples on how to use our solution.
- :ref:`Proof of Concept guide <poc_guide>`: Here, you get to explore how to set up the Wazuh environment to test or demo the different product capabilities.


Other items in this section
---------------------------

This document provides an overview of the Wazuh platform components and architecture. It also includes a brief description of some of the most common use cases of the solution.

.. toctree::
   :maxdepth: 1

   components/index
   architecture
   use-cases/index
