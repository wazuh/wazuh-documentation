.. Copyright (C) 2019 Wazuh, Inc.

Download the Elasticsearch configuration file from the Wazuh repository:

  .. code-block:: console

    # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/elk-secured/extensions/elasticsearch/7.x/elasticsearch.yml

Edit the file ``/etc/elasticsearch/elasticsearch.yml``

  .. code-block:: yaml

    network.host: <elasticsearch_ip>
    node.name: <node_name>
    cluster.initial_master_nodes: ["<node_name>"]

Replace ``<elasticsearch_ip>`` and ``<node_name>`` with your desired values (host IP and host name). For ``<elasticsearch_ip>`` the value ``0.0.0.0`` is an acceptable IP address and will bind to all network interfaces.

.. End of edit_elastic_yml_single_node.rst