.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # mkdir /etc/kibana/certs/ca -p
  # cp -R /etc/elasticsearch/certs/ca/ /etc/kibana/certs/
  # cp /etc/elasticsearch/certs/elasticsearch.key /etc/kibana/certs/kibana.key
  # cp /etc/elasticsearch/certs/elasticsearch.crt /etc/kibana/certs/kibana.crt
  # chown -R kibana:kibana /etc/kibana/
  # chmod -R 500 /etc/kibana/certs
  # chmod 440 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*

.. End of copy_certificates_kibana_elastic_server.rst
