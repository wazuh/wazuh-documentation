.. Copyright (C) 2021 Wazuh, Inc.

.. _od_installation_guide:

Wazuh server
============

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

The Wazuh server analyzes data received from the agents, processing it through decoders and rules, and using threat intelligence to look for well-known IOCs. The server is also used to manage the agents, configuring and upgrading them remotely when necessary.

Install Wazuh with Open Distro for Elasticsearch, which is an Apache 2.0 licensed distribution of Elasticsearch enhanced with enterprise security, alerts, SQL support, automated index management, or deep performance analysis, among other features. To learn more about each component and its capabilities, check the :ref:`Components <components>` section.

Deployment types
----------------

Wazuh allows you to adapt the deployment process according to your enterprise needs. You can choose between two alternatives for deploying a Wazuh installation.

For information on the minimum hardware requirements for the different types of deployment, check the :ref:`Requirements <installation_requirements>` section. 

- All-in-one deployment: Wazuh and Open Distro for Elasticsearch are installed on the same host. This type of deployment is appropriate for testing and small working environments. 

- Distributed deployment: Each component is installed on a separate host as a single-node or multi-node cluster. This type of deployment allows high availability and scalability of the product and is convenient for large working environments.
  

Installation methods
---------------------

For each type of deployment, the user can choose between two installation methods:

- Unattended: This is an automated installation that requires the initial input of the necessary information to perform the installation process through scripts.

- Step by step: This is a manual installation that includes a detailed description of each step of the installation process.


Start deploying Wazuh with Open Distro for Elasticsearch
--------------------------------------------------------

.. toctree::
    :maxdepth: 2

    all-in-one-deployment/index
    distributed-deployment/index
