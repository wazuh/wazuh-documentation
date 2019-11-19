.. Copyright (C) 2019 Wazuh, Inc.

Edit the file ``/etc/filebeat/filebeat.yml`` and replace ``YOUR_ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elasticsearch server and ``password_generated_for_elastic`` by the previous step generated password.

.. code-block:: yaml

  output.elasticsearch.hosts: ['YOUR_ELASTIC_SERVER_IP:9200']
  output.elasticsearch.password: "ELASTIC_GENERATED_PASSWORD"

.. End of configure_filebeat.rst
