.. Copyright (C) 2022 Wazuh, Inc.


.. code-block:: console

  # unzip ~/certs.zip -d ~/certs
  # rm -f ~/certs/ca/ca.key
  # mkdir /etc/elasticsearch/certs/ca -p
  # cp -R ~/certs/ca/ ~/certs/elasticsearch-X/* /etc/elasticsearch/certs/
  # mv /etc/elasticsearch/certs/elasticsearch-X.crt /etc/elasticsearch/certs/elasticsearch.crt
  # mv /etc/elasticsearch/certs/elasticsearch-X.key /etc/elasticsearch/certs/elasticsearch.key
  # chown -R elasticsearch: /etc/elasticsearch/certs
  # chmod -R 500 /etc/elasticsearch/certs
  # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*
  # rm -rf ~/certs 


.. End of include file
