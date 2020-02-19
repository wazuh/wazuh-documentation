.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/elastic-secured-3.10/extensions/elasticsearch/7.x/elasticsearch_cluster.yml

Edit the file ``/etc/elasticsearch/elasticsearch.yml``

.. code-block:: yaml

  network.host: <elasticsearch_ip>
  node.name: <node_name>
  cluster.name: <elastic_cluster>
  cluster.initial_master_nodes:
          - <master_node_1>
          - <master_node_2>
          - <master_node_3>
  discovery.seed_hosts:
          - <elasticsearch_ip_node1>
          - <elasticsearch_ip_node2>
          - <elasticsearch_ip_node3>

The values to be replaced:

- ``<elasticsearch_ip>``: the host IP. I.e: ``10.0.0.2``. The value ``0.0.0.0`` is an acceptable IP address and will bind to all network interfaces.
- ``<node_name>``: The node name. I.e: ``elastic-master1``.
- ``<elastic_cluster>``: The cluster name. I.e: ``elastic-cluster-production``.
- ``<elasticsearch_ip_nodeX>``: others Elasticsearch cluster nodes IPs. I.e: ``10.0.0.3``.
- ``<master_node_X>``: others elasticsearch master node names. I.e: ``elastic-master2``.

Depending on the node type, some parameters may vary between nodes. You should include the parameter ``node.master: false`` in every Elasticsearch node that you don't want to configure as master.

.. End of include file
