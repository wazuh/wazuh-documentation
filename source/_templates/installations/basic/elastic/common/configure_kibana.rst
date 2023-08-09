.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://packages.wazuh.com/4.5/tpl/elastic-basic/kibana.yml


Edit the ``/etc/kibana/kibana.yml`` file:

.. code-block:: yaml

    server.host: <kibana_ip>
    elasticsearch.hosts: "https://<elasticsearch_DN>:9200"
    elasticsearch.password: <elasticsearch_password>

Values to be replaced:

- ``<kibana_ip>``: by default, Kibana only listens on the loopback interface (localhost), which means that it can be only accessed from the same machine. To access Kibana from the outside, it may be configured to listen on its network IP address by replacing ``kibana_ip`` with Kibana host IP address.
- ``<elasticsearch_DN>``: the host's domain name. In case of having more than one Elasticsearch node, Kibana can be configured to connect to multiple Elasticsearch nodes in the same cluster. The nodes' domain names can be separated with commas. Eg. ``["https://elasticsearch_DN1:9200", "https://elasticsearch_DN2:9200","https://elasticsearch_DN3:9200"]``
- ``<elasticsearch_password>``: the password generated during the Elasticsearch installation and configuration for the ``elastic`` user.

.. End of configure_kibana.rst
