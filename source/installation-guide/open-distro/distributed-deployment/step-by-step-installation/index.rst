.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: The Wazuh server can be installed as a single-node cluster or as a multi-node cluster. Learn more about these two types of installation in our documentation. 
  
Step-by-step installation
=========================

You install and configure the Wazuh server and Elastic Stack by following a step-by-step deployment process of each involved component. During the installation, the certificates needed for securing the communication are generated. Therefore, we recommend that you first install Open Distro for Elasticsearch to encrypt the communication.

For a distributed deployment, each of the following components is installed on their dedicated server. If needed, Kibana can optionally be installed on the same server as an Elasticsearch node.


- **Elasticsearch cluster:** 

    - :ref:`Elasticsearch single-node cluster <elasticsearch_single_node_cluster>`
    - :ref:`Elasticsearch multi-node cluster <elasticsearch_multi_node_cluster>`

- **Wazuh cluster:** 

    - :ref:`Wazuh single-node cluster <wazuh_single_node_cluster>`
    - :ref:`Wazuh multi-node cluster <wazuh_multi_node_cluster>`

- **Kibana:** 

    - :ref:`Kibana installation <kibana>`



    
.. toctree::
    :maxdepth: 2
    :hidden:

    elasticsearch-cluster/index
    wazuh-cluster/index
    kibana/index
