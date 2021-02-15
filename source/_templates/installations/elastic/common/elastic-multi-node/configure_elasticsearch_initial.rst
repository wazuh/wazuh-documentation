.. Copyright (C) 2021 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/open-distro/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

Edit the file ``/etc/elasticsearch/elasticsearch.yml``. By default, the pre-configured template includes 3 nodes, in case of having a different number of nodes, lines must be added or removed accordingly:

.. code-block:: yaml

  network.host: <elasticsearch_ip>
  node.name: node-1
  cluster.name: <elastic_cluster>
  cluster.initial_master_nodes:
          - node-1
          - node-2
          - node-3
  discovery.seed_hosts:
          - <elasticsearch_ip_node1>
          - <elasticsearch_ip_node2>
          - <elasticsearch_ip_node3>


Depending on the node type, some parameters may vary between nodes. The ``cluster.initial_master_nodes`` and the ``discovery.seed_hosts`` are lists of all the master-eligible nodes in the cluster. The parameter ``node.master: false`` must be included in every Elasticsearch node that will not be configured as master. 

Values to be replaced:

- ``<elasticsearch_ip>``: the host's IP. E.g.: ``10.0.0.2``. 
- ``<elastic_cluster>``: Elasticsearch cluster name. E.g.: ``elastic-cluster-production``.
- ``<elasticsearch_ip_nodeX>`` Elasticsearch cluster master-eligible nodes IP. E.g.: ``10.0.0.3``.
- The node certificates for each node must be specified under the ``opendistro_security.nodes_dn`` section.

    .. code-block:: yaml
        :emphasize-lines: 5

        opendistro_security.nodes_dn:
            - CN=node-1,OU=Docu,O=Wazuh,L=California,C=US
            - CN=node-2,OU=Docu,O=Wazuh,L=California,C=US
            - CN=node-3,OU=Docu,O=Wazuh,L=California,C=US
            - CN=<common_name>,OU=<operational_unit>,O=<organization_name>,L=<locality>,C=<country_code>

.. End of include file
