.. Copyright (C) 2019 Wazuh, Inc.

.. code-block:: yaml

  output.elasticsearch.hosts: <elasticsearch_ip>:9200
  output.elasticsearch.password: <elasticsearch_password>

Replace ``elasticsearch_ip`` with the IP address or the hostname of the Elasticsearch server and ``elasticsearch_password`` with the previously generated password.

The following settings must be changed:

.. code-block:: yaml

  output.elasticsearch.ssl.certificate: /etc/filebeat/certs/filebeat-X.crt
  output.elasticsearch.ssl.key: /etc/filebeat/certs/filebeat-X.key

Replace the ``X`` by the number defined in the ``instances.yml`` definition step when installing Elasticsearch.

.. End of include file
