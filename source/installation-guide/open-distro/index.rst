.. Copyright (C) 2021 Wazuh, Inc.

.. _od_installation_guide:

Wazuh server
============

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.


Install Wazuh with Open Distro for Elasticsearch, which is an Apache 2.0 licensed distribution of Elasticsearch enhanced with enterprise security, alerts, SQL support, automated index management, or deep performance analysis, among other features. To learn more about each component and its capabilities, check the :ref:`Components <components>` section.

Deployment types
----------------

There are two different options for deploying Wazuh:

- **All-in-one deployment**: Wazuh and Open Distro for Elasticsearch are installed on the same host. You can choose between unattended installation, which is an automated way of installing the solution with a script, or step-by-step installation, a manual way of carrying out the process. 

- **Distributed deployment**: Each component is installed on a separate host as a single-node or multi-node cluster. This type of deployment provides high availability and scalability of the product, and it is convenient for large working environments.
  
For information on the minimum hardware requirements for the different types of deployment, check the :ref:`Requirements <installation_requirements>` section. 


Installation methods
---------------------

For each type of deployment, the user can choose between two installation methods:

- **Unattended**: You can install Wazuh using a script that automatically detects whether the operating system uses ``rpm`` or ``deb`` packages. The script also performs a health check to verify that the available system resources meet the minimal requirements.

- **Step by step**: This is a manual installation that includes a detailed description of each step of the installation process.


Start deploying Wazuh with Open Distro for Elasticsearch
--------------------------------------------------------

.. toctree::
    :maxdepth: 2

    all-in-one-deployment/index
    distributed-deployment/index
