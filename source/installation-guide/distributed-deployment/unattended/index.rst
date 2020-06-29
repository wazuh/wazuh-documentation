.. Copyright (C) 2020 Wazuh, Inc.

.. _unattended_distributed_index:

Unattended installation
=======================

The unattended installation method consist on two scripts that will automatize the installation of all the componnets involved for both, the Wazuh cluster and the Elasticsearch cluster. The following components will be installed:

- **Elasticsearch cluster:** The script will install an Elasticsearch node. 

- **Wazuh cluster:** The script will install the Wazuh manager, the Wazuh API and Filebeat on its OSS version.

.. toctree::
    :maxdepth: 1

    unattended-elasticsearch-clusterinstallation
    unattended-wazuh-cluster-installation