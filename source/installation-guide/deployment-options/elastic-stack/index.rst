.. Copyright (C) 2021 Wazuh, Inc.
.. meta::
  :description: Check out how to install Wazuh with Elastic Stack basic license, deployment types, installation methods, and more. 
  
.. _basic_installation_guide:

Integration with Elastic Stack
==============================

This section aims to guide the user through the installation process of Wazuh. This installation guide will use the Elastic Stack basic license option, which contains everything included in the open source version under the Apache 2.0 license, plus some additional capabilities such as Elastic Stack Security features, Kibana alerting, and others. More information about the Wazuh components, including a brief description of each one, can be found at our :ref:`here <installation_guide>`.

Deployment types
----------------

The installation guide is divided into two independent sections: all-in-one deployment and distributed deployment, according to the chosen configuration. The installation requirements for Wazuh and Elastic Stack are similar to those described in the :ref:`requirements <installation_requirements>` section.

- All-in-one deployment: Wazuh and Elastic Stack are installed in the same host. This type of deployment is appropriate for testing and small working environments. 

- Distributed deployment: Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows high availability and scalability of the product and is convenient for large working environments.


Installation methods
---------------------

For each type of deployment, the user can choose between two installation methods:

- Unattended: Automated installation. It requires the initial input of the necessary information to perform the installation process through scripts.

- Step by step: Manual installation. Includes a detailed description of each step of the installation process.


Start deploying Wazuh server and Elastic Stack
----------------------------------------------

.. toctree::
    :maxdepth: 2

    all-in-one-deployment/index
    distributed-deployment/index
