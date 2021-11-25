.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
    :description: Learn more about the step-by-step installation of Wazuh and the installation of Elasticsearch cluster, Wazuh cluster and Kibana. Get started with Wazuh. 
    
Step-by-step installation
=========================

The following sections provide information about how to install each involved component. During the Elasticsearch cluster installation, the certificates necessary to secure the communication will be created, so it is recommended to start by installing Elasticsearch.

Every component described below will be installed on a dedicated host, except Kibana, that can be installed either on a dedicated host or along with Elasticsearch.

- **Elasticsearch cluster**
    
    - :ref:`Elasticsearch single-node cluster <basic_elasticsearch_single_node_cluster>`
    - :ref:`Elasticsearch multi-node cluster <basic_elasticsearch_multi_node_cluster>`

- **Wazuh cluster**

    - :ref:`Wazuh single-node cluster <basic_wazuh_single_node_cluster>`
    - :ref:`Wazuh multi-node cluster <basic_wazuh_multi_node_cluster>`

- **Kibana**

    - :ref:`Kibana installation <basic_kibana>`


.. toctree::
    :maxdepth: 2
    :hidden:

    elasticsearch-cluster/index
    wazuh-cluster/index
    kibana/index