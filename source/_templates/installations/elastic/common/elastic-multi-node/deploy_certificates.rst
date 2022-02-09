.. Copyright (C) 2022 Wazuh, Inc.

#. Replace ``elasticsearch-node-name`` with your Elasticsearch node name, the same used in ``instances.yml`` to create the certificates, and move the certificates to their corresponding location.  The ``certs.tar`` file should be placed in ~/ (root home user folder).

    .. code-block:: console

      # node_name=elasticsearch-node-name
      
    .. code-block:: console
      
      # mkdir /etc/elasticsearch/certs
      # mv ~/certs.tar /etc/elasticsearch/certs/
      # cd /etc/elasticsearch/certs/
      # tar -xf certs.tar $node_name.pem $node_name-key.pem root-ca.pem
      # mv /etc/elasticsearch/certs/$node_name.pem /etc/elasticsearch/certs/elasticsearch.pem
      # mv /etc/elasticsearch/certs/$node_name-key.pem /etc/elasticsearch/certs/elasticsearch-key.pem

#. If Kibana will be installed in this node, keep the certificates file. Otherwise, remove it to increase security  ``rm -f certs.tar``.

.. End of include file
