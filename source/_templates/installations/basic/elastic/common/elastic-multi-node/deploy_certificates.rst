.. Copyright (C) 2015, Wazuh, Inc.

.. note:: If the Elasticsearch node is not the master node where the certificates were created, it necessary to remove the ``ca.key`` file: ``zip -d ~/certs.zip "ca/ca.key"``.

.. code-block:: console

  # unzip ~/certs.zip -d ~/certs
  # mkdir /etc/elasticsearch/certs/ca -p
  # cp -R ~/certs/ca/ ~/certs/elasticsearch-X/* /etc/elasticsearch/certs/
  # mv /etc/elasticsearch/certs/elasticsearch-X.crt /etc/elasticsearch/certs/elasticsearch.crt
  # mv /etc/elasticsearch/certs/elasticsearch-X.key /etc/elasticsearch/certs/elasticsearch.key
  # chown -R elasticsearch: /etc/elasticsearch/certs
  # chmod -R 500 /etc/elasticsearch/certs
  # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*
  # rm -rf ~/certs/ ~/certs.zip


.. End of include file
