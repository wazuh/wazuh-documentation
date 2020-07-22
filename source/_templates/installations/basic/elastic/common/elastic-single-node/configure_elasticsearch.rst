.. Copyright (C) 2020 Wazuh, Inc.

Once Elasticsearch is installed it can be configured by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/basic/elasticsearch/elasticsearch.yml

The first three lines in the ``/etc/elasticsearch/elasticsearch.yml`` file must be edited:

.. code-block:: yaml

  network.host: <elasticsearch_ip>
  node.name: <node_name>
  cluster.initial_master_nodes: <node_name>

``<elasticsearch_ip>`` and ``<node_name>`` have to be replaced with the desired values (host IP and name). For ``<elasticsearch_ip>`` the value ``0.0.0.0`` is an acceptable IP address and will bind to all network interfaces.

.. End of include file
