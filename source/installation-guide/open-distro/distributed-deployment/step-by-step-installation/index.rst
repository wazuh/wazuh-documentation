.. Copyright (C) 2021 Wazuh, Inc.

Step-by-step installation
=========================

The following sections provide information about how to install each involved component. During the Open Distro for Elasticsearch cluster installation, the certificates necessary to secure the communication will be created, so it is recommended to start by installing Open Distro for Elasticsearch.

For a distributed deployment, each of the following components will be installed on their dedicated server, except for Kibana, which can optionally be installed on the same server as an Elasticsearch node.


- **Elasticsearch cluster**

    - :ref:`Elasticsearch single-node cluster <elasticsearch_single_node_cluster>`
    - :ref:`Elasticsearch multi-node cluster <elasticsearch_multi_node_cluster>`

- **Wazuh cluster**

    - :ref:`Wazuh single-node cluster <wazuh_single_node_cluster>`
    - :ref:`Wazuh multi-node cluster <wazuh_multi_node_cluster>`

- **Kibana**

    - :ref:`Kibana installation <kibana>`


.. toctree::
    :maxdepth: 2
    :hidden:

    elasticsearch-cluster/index
    wazuh-cluster/index
    kibana/index
