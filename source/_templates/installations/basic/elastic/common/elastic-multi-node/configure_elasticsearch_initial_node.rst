.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/basic/elasticsearch/elasticsearch_cluster_initial_node.yml

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

- ``<elasticsearch_ip>``: the host's IP. E.g.: ``10.0.0.2``. The value ``0.0.0.0`` is an acceptable IP address and will bind to all network interfaces.
- ``<elasticsearch_ip_nodeX>`` Elasticsearch cluster master-eligible nodes IP. E.g.: ``10.0.0.3``.

For more information, please see `important discovery and cluster formation settings <https://www.elastic.co/guide/en/elasticsearch/reference/7.6/discovery-settings.html#discovery-settings>`_.

.. End of include file
