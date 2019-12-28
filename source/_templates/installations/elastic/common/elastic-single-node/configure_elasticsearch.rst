.. Copyright (C) 2019 Wazuh, Inc.

Once Elasticsearch is installed we need to configure it by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/elastic-secured-3.10/extensions/elasticsearch/7.x/elasticsearch.yml

Edit the file ``/etc/elasticsearch/elasticsearch.yml``

.. code-block:: yaml

  network.host: <elasticsearch_ip>
  node.name: <node_name>
  cluster.initial_master_nodes: <node_name>

Replace ``<elasticsearch_ip>`` and ``<node_name>`` with your desired values (host IP and host name). For ``<elasticsearch_ip>`` the value ``0.0.0.0`` is an acceptable IP address and will bind to all network interfaces.


**Alternative Method**

.. code-block:: console

  # ip=$(ip route get 8.8.8.8 | awk -F"src " 'NR==1{split($2,a," ");print a[1]}')
  # sed -i "s/^#network.host: 192.168.0.1/network.host: $ip/" /etc/elasticsearch/elasticsearch.yml
  # sed -i 's/^#node\.name: node\-1/node\.name: node\-1/'i /etc/elasticsearch/elasticsearch.yml
  # sed -i 's/^#cluster\.initial_master_nodes: \["node-1", "node-2"]/cluster.initial_master_nodes: ["node-1"]'/i /etc/elasticsearch/elasticsearch.yml

Perform each command line by line.


.. End of include file
