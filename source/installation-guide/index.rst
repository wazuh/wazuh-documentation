.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh_stack_installation_guide:


Wazuh Stack installation guide
==============================

This section aims to guide the user through the process of installing Wazuh and its multiple components. A brief explanation about each component and its capabilities can be found in the :ref:`getting started <components>` section. 

There are two main sections of this guide devoted to the installation of the Wazuh and Elasticsearch servers, depending on the Elasticsearch flavor that the user choose.
A section dedicated to the recommended requirements and another section as an alternative to do the installation using packages instead of repositories.

The following diagram shows a typical installation: 

.. thumbnail:: ../images/getting_started/data_flow.png
  :align: center
  :width: 100%


Elasticsearch flavors
---------------------

The user can select among these two flavors of Elasticsearch the one that better suits their environment:

- Open Distro for Elasticsearch:  Is an Apache 2.0-licensed distribution of Elasticsearch enhanced with enterprise security, alerting, SQL support, automated index management, deep performance analysis, among other features. Open Distro for Elasticsearch is 100% open source and community-driven.

- Elastic Stack:  In this installation guide, the basic license option will be used, this includes everything in the Open Source under Apache 2.0 version plus some extra capabilities like core Elastic Stack Security features, Kibana alerting and more.

Deployment types
----------------

- All-in-one deployment: In this case, Wazuh with Open Distro for Elasticsearch or Elastic Stack are installed in the same host, this type of deployment is suitable for testing and small working environments. 

.. thumbnail:: ../images/installation/all-in-one.png
  :align: center
  :width: 100%

- Distributed deployment: Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows the high availability and scalability of the product and is suitable for large working environments.  

.. thumbnail:: ../images/installation/distributed.png
  :align: center
  :width: 100%

- Wazuh Cloud: All components are hosted in our PCI-DSS certified SaaS solution and maintained by our team. With Wazuh cloud no dedicated hardware is required and everything is ready to use. This service offers a flexible infrastructure to match your enterprise's need. For more information visit `Wazuh Cloud <https://wazuh.com/cloud/>`_.

.. thumbnail:: ../images/installation/cloud.png
  :align: center
  :width: 100%


Installation methods
---------------------

Once the desired configuration is selected the user can choose between two installation methods:

- Unattended installation: Uses scripts to automatically install and configure all the components.

- Step-by-step installation: A manual way of doing the installation that includes a detailed explanation of every step of the installation process.

Requirements
------------

This guide also includes a requirements section that specifies the supported operating systems and the minimum recommended hardware specifications to guarantee the expected performance.  

Packages list
-------------

This installation guide provides instructions to configure the official repositories to do the installations, alternatively, the installation can be done using packages.  A list of all the available packages can be found in the packages list section.  

.. toctree::
    :maxdepth: 1
    
    requirements
    open-distro/index
    elastic-stack/index
    packages-list
