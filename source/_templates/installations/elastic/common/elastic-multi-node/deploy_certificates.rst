.. Copyright (C) 2020 Wazuh, Inc.

This guide assumes that the file ``certs.tar`` is placed in ~/ (root home user folder).

The ``X`` must be replaced with the corresponding node number:

.. code-block:: console

  # mkdir /etc/elasticsearch/certs
  # mv ~/certs.tar /etc/elasticsearch/certs/
  # cd /etc/elasticsearch/certs/
  # tar -xf certs.tar node-X.pem node-X.key node-X_http.pem node-X_http.key root-ca.pem
  # mv /etc/elasticsearch/certs/node-X.pem /etc/elasticsearch/certs/elasticsearch.pem
  # mv /etc/elasticsearch/certs/node-X.key /etc/elasticsearch/certs/elasticsearch.key
  # mv /etc/elasticsearch/certs/node-X_http.pem /etc/elasticsearch/certs/elasticsearch_http.pem
  # mv /etc/elasticsearch/certs/node-X_http.key /etc/elasticsearch/certs/elasticsearch_http.key

.. End of include file
