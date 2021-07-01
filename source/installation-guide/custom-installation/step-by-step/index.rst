.. Copyright (C) 2021 Wazuh, Inc.

.. _step_by_step_installation_guide:

Step-by-step mode
=================

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.


Install Wazuh with Open Distro for Elasticsearch, which is an Apache 2.0 licensed distribution of Elasticsearch enhanced with enterprise security, alerts, SQL support, automated index management, or deep performance analysis, among other features. To learn more about each component and its capabilities, check the :ref:`Components <components>` section.

Deployment types
----------------

There are two different options for deploying Wazuh:

- **All-in-one deployment**: Wazuh and Open Distro for Elasticsearch are installed on the same host. 

- **Distributed deployment**: Each component is installed on a separate host as a single-node or multi-node cluster. This type of deployment provides high availability and scalability of the product, and it is convenient for large working environments.
  
For information on the minimum hardware requirements for the different types of deployment, check the :ref:`Requirements <installation_requirements>` section. 


Start deploying Wazuh with Open Distro for Elasticsearch
--------------------------------------------------------

.. toctree::
    :maxdepth: 2

    elasticsearch
    wazuh-server
    kibana
