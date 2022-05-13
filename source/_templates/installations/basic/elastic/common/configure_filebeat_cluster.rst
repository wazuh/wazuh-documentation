.. Copyright (C) 2022 Wazuh, Inc.

.. code-block:: yaml

  output.elasticsearch.hosts: <elasticsearch_ip>:9200
  output.elasticsearch.password: <elasticsearch_password>

``<elasticsearch_ip>`` must be replaced with the IP address or the hostname of the Elasticsearch server and ``<elasticsearch_password>`` with the password previously generated for the ``elastic`` user.

The following settings must be changed:

.. code-block:: yaml

  output.elasticsearch.ssl.certificate: /etc/filebeat/certs/filebeat-X.crt
  output.elasticsearch.ssl.key: /etc/filebeat/certs/filebeat-X.key

The ``X`` must be replaced with the number defined in the ``instances.yml`` definition step when installing Elasticsearch.

.. End of include file
