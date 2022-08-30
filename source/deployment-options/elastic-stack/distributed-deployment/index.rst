.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn more about the step-by-step installation of Wazuh and the installation of Elasticsearch cluster, Wazuh cluster and Kibana. Get started with Wazuh. 
    
Distributed deployment
======================

The following sections provide information about how to install each involved component. During the Elasticsearch cluster installation, the certificates necessary to secure the communication will be created, so it is recommended to start by installing Elasticsearch.

Every component described below will be installed on a dedicated host, except Kibana, which can be installed either on a dedicated host or along with Elasticsearch.

- **Elasticsearch cluster**
    
    - :doc:`Elasticsearch single-node cluster </deployment-options/elastic-stack/distributed-deployment/elasticsearch-cluster/elasticsearch-single-node-cluster>` 
    - :doc:`Elasticsearch multi-node cluster </deployment-options/elastic-stack/distributed-deployment/elasticsearch-cluster/elasticsearch-multi-node-cluster>`

- **Wazuh cluster**

    - :doc:`Wazuh single-node cluster </deployment-options/elastic-stack/distributed-deployment/wazuh-cluster/wazuh-single-node-cluster>` 
    - :doc:`Wazuh multi-node cluster </deployment-options/elastic-stack/distributed-deployment/wazuh-cluster/wazuh-multi-node-cluster>`

- **Kibana**

    - :doc:`Kibana installation </deployment-options/elastic-stack/distributed-deployment/kibana/index>` 


.. toctree::
    :maxdepth: 2
    :hidden:

    elasticsearch-cluster/index
    wazuh-cluster/index
    kibana/index