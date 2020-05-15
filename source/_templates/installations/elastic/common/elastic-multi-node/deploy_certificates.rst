.. Copyright (C) 2020 Wazuh, Inc.

Copy the  ``certs.tar`` file into each Elasticsearch node, except the master node, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

The ``X`` must be replaced with the number used in the certificate name defined for the corresponding Elasticsearch server:

.. code-block:: console

  # mkdir /etc/elasticsearch/certs
  # mv ~/certs.tar /etc/elasticsearch/certs/
  # cd /etc/elasticsearch/certs/
  # tar -xf certs.tar /etc/elasticsearch/certs/nodeX* /etc/elasticsearch/certs/root-ca.pem
  # mv /etc/elasticsearch/certs/nodeX.pem /etc/elasticsearch/certs/elasticsearch.pem
  # mv /etc/elasticsearch/certs/nodeX.key /etc/elasticsearch/certs/elasticsearch.key
  # mv /etc/elasticsearch/certs/nodeX_http.pem /etc/elasticsearch/certs/elasticsearch_http.pem
  # mv /etc/elasticsearch/certs/nodeX_http.key /etc/elasticsearch/certs/elasticsearch_http.key

.. End of include file
