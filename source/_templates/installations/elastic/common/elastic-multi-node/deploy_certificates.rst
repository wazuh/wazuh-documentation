.. Copyright (C) 2020 Wazuh, Inc.

Copy the  ``certs.tar`` file into each Elasticsearch node, except the master node, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

The ``X`` must be replaced with the number used in the certificate name defined for the corresponding Elasticsearch server:

.. code-block:: console

  # mkdir /etc/elasticsearch/certs
  # mv ~/certs.tar /etc/elasticsearch/certs/
  # cd /etc/elasticsearch/certs/
  # tar -xf certs.tar
  # mv /etc/elasticsearch/certs/elasticsearch-X.pem /etc/elasticsearch/certs/elasticsearch.pem
  # mv /etc/elasticsearch/certs/elasticsearch-X.key /etc/elasticsearch/certs/elasticsearch.key

.. End of include file
