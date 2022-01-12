.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about distributed deployment and the unattended installation of Wazuh using scripts in this section of our documentation. 
  
.. _unattended_distributed_index:

Unattended installation
=======================

The unattended installation process consists of two scripts that automate the installation of all the components involved with both the Elasticsearch cluster and the Wazuh cluster. 

The following components are installed:

- **Elasticsearch cluster:** The script installs Open Distro for Elasticsearch and you can choose between a single-node or a multi-node installation. Additionally, the script installs Open Distro for Kibana either on the same Elasticsearch node or on a different one. The installation of Open Distro for Kibana also includes the installation of the Wazuh Kibana plugin.

- **Wazuh cluster:** The script installs the Wazuh manager and Filebeat.

During the Elasticsearch installation, the certificates needed for securing the communication are generated. Therefore, we recommend that you first install Open Distro for Elasticsearch to encrypt the communication.

.. toctree::
    :maxdepth: 1

    unattended-elasticsearch-cluster-installation
    unattended-wazuh-cluster-installation
