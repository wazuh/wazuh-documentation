.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://packages.wazuh.com/4.5/tpl/elastic-basic/elasticsearch_cluster_initial_node.yml

The file ``/etc/elasticsearch/elasticsearch.yml`` has to be edited:

.. code-block:: yaml

  network.host: <elasticsearch_ip>
  node.name: elasticsearch-1
  cluster.name: elasticsearch_cluster
  cluster.initial_master_nodes:
          - elasticsearch-1
          - elasticsearch-2
          - elasticsearch-3
  discovery.seed_hosts:
          - <elasticsearch_ip_node1>
          - <elasticsearch_ip_node2>
          - <elasticsearch_ip_node3>

Depending on the node type, some parameters may vary between nodes. ``cluster.initial_master_nodes`` and ``discovery.seed_hosts`` are lists of all the master-eligible nodes in the cluster. The parameter ``node.master: false`` must be included in every Elasticsearch node that will not be configured as master.

Values to be replaced:

- ``<elasticsearch_ip>``: the host's IP. E.g.: ``10.0.0.2``. 
- ``<elasticsearch_ip_nodeX>`` Elasticsearch cluster master-eligible nodes IP. E.g.: ``10.0.0.3``.

.. End of include file
