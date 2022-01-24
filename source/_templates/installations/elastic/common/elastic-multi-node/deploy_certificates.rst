.. Copyright (C) 2022 Wazuh, Inc.

#. Replace ``<elasticsearch-node-name>`` with your Elasticsearch node name, the same used in ``instances.yml`` to create the certificates, and move the certificates to their corresponding location. We assume that you placed a copy of ``certs.tar`` in your current folder (``./``).

    .. code-block:: console

      # NODE_NAME=<elasticsearch-node-name>
      
    .. code-block:: console
      
      # mkdir /etc/elasticsearch/certs
      # tar -xf ./certs.tar -C /etc/elasticsearch/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv /etc/elasticsearch/certs/$NODE_NAME.pem /etc/elasticsearch/certs/elasticsearch.pem
      # mv /etc/elasticsearch/certs/$NODE_NAME-key.pem /etc/elasticsearch/certs/elasticsearch-key.pem

#. If you want to later install Kibana on this node, keep the certificates file. Otherwise, remove it with ``rm -f ./certs.tar`` to increase security.


.. End of include file
