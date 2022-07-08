.. Copyright (C) 2015, Wazuh, Inc.

Copy the Elasticsearch certificates into the Filebeat configuration folder:

.. code-block:: console

  # mkdir /etc/filebeat/certs/ca -p
  # cp -R /etc/elasticsearch/certs/ca/ /etc/filebeat/certs/
  # cp /etc/elasticsearch/certs/elasticsearch.key /etc/filebeat/certs/filebeat.key
  # cp /etc/elasticsearch/certs/elasticsearch.crt /etc/filebeat/certs/filebeat.crt
  # chmod -R 500 /etc/filebeat/certs
  # chmod 440 /etc/filebeat/certs/ca/ca.* /etc/filebeat/certs/filebeat.*

.. End of copy_certificates_filebeat.rst
