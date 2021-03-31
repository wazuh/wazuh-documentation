.. Copyright (C) 2021 Wazuh, Inc.

.. _od_installation_guide:

Wazuh server
============

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

This section provides the user with the necessary information to perform the installation of Wazuh with Open Distro for Elasticsearch, which is an Apache 2.0 licensed distribution of Elasticsearch enhanced with enterprise security, alerts, SQL support, automated index management, or deep performance analysis, among other features. Find out more about Wazuh components by visiting our :ref:`here <installation_guide>`.

Deployment types
----------------

The installation guide is divided into two independent sections: all-in-one deployment and distributed deployment, according to the chosen configuration. 

Information on the minimum hardware requirements for the different types of deployment is provided in the :ref:`here <installation_requirements>`.

- All-in-one deployment: Wazuh and Open Distro for Elasticsearch are installed in the same host. This type of deployment is appropriate for testing and small working environments.  

- Distributed deployment: Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows high availability and scalability of the product and is convenient for large working environments.


Installation methods
---------------------

For each type of deployment, the user can choose between two installation methods:

- Unattended: Automated installation. It requires the initial input of the necessary information to perform the installation process through scripts.

- Step by step: Manual installation. Includes a detailed description of each step of the installation process.


Start deploying Wazuh with Open Distro for Elasticsearch
--------------------------------------------------------

.. toctree::
    :maxdepth: 2

    all-in-one-deployment/index
    distributed-deployment/index
