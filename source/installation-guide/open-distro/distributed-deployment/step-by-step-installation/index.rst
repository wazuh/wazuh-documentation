.. Copyright (C) 2021 Wazuh, Inc.

Step-by-step installation
=========================

You install and configure the Wazuh server and Elastic Stack by following a step-by-step deployment process of each involved component.
For a distributed deployment, each of the following components is installed on their dedicated server, except for Kibana, which can optionally be installed on the same server as an Elasticsearch node.


- **Elasticsearch cluster:** The Elastic Stack can be installed as a single-node cluster or as a multi-node cluster. The single-node installation is performed on only one host, where Open Distro for Elasticsearch is installed. The multi-node installation consists of the installation of several Elastic Stack nodes on different hosts that communicate among them. This kind of installation provides high availability and load balancing.


    - :ref:`Elasticsearch single-node cluster <elasticsearch_single_node_cluster>`
    - :ref:`Elasticsearch multi-node cluster <elasticsearch_multi_node_cluster>`

- **Wazuh cluster:** The Wazuh server can be installed as a single-node cluster or as a multi-node cluster. The single-node installation is performed on only one host where the Wazuh manager, the Wazuh API, and Filebeat are installed. The multi-node installation consists of the installation of several Wazuh server nodes on different hosts that communicate among them. This kind of installation provides high availability and load balancing.


    - :ref:`Wazuh single-node cluster <wazuh_single_node_cluster>`
    - :ref:`Wazuh multi-node cluster <wazuh_multi_node_cluster>`

- **Kibana:** Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch.

    - :ref:`Kibana installation <kibana>`


It is highly recommended to first install Open Distro for Elasticsearch since the certificates needed for securing the communication are created during its installation.

    
.. toctree::
    :maxdepth: 2
    :hidden:

    elasticsearch-cluster/index
    wazuh-cluster/index
    kibana/index
