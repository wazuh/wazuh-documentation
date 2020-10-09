.. Copyright (C) 2020 Wazuh, Inc.

.. _basic_installation_guide:

Wazuh with Elastic Stack
========================

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

This section aims to guide the user through the process of installing Wazuh. In this installation guide, the basic license option of Elastic Stack will be used, this includes everything in the Open Source version under Apache 2.0 license plus some extra capabilities like core Elastic Stack Security features, Kibana alerting and more. More information about the Wazuh components, including a brief description of each one, may be found :ref:`here <installation_guide>`.

Deployment types
----------------

The Installation guide is divided into two independent sections, all-in-one deployment and distributed deployment according to the chosen configuration. The requirements of the Wazuh and Elastic Stack installation are similiar to the ones described in the :ref:`requirements <installation_requirements>` section.

- All-in-one deployment: In this case, Wazuh and Elastic Stack are installed in the same host, this type of deployment is suitable for testing and small working environments. 

- Distributed deployment: Each component is installed in a separate host and can also be installed in a multi-node cluster. This type of deployment allows the high availability and scalability of the product and is suitable for large working environments. 


Installation methods
---------------------

For each type of deployment, the user can choose between two installation methods:

- Unattended: Automated installation. Requires the initial input of the information needed to accomplish the installation process using scripts.

- Step by step: Manual installation. Includes a detailed description of every step of the installation process.


Start deploying Wazuh server and Elastic Stack
----------------------------------------------

.. toctree::
    :maxdepth: 2

    all-in-one-deployment/index
    distributed-deployment/index
