.. Copyright (C) 2021 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/kibana/7.x/kibana.yml


Edit the ``/etc/kibana/kibana.yml`` file:

.. code-block:: yaml

    server.host: <kibana_ip>
    elasticsearch.hosts: "https://<elasticsearch_ip>:9200"
    elasticsearch.password: <elasticsearch_password>

Values to be replaced:

- ``<kibana_ip>``: by default, Kibana only listens on the loopback interface (localhost), which means that it can be only accessed from the same machine. To access Kibana from the outside it may be configured to listen on its network IP by replacing ``kibana_ip`` with Kibana's host IP.
- ``<elasticsearch_ip>``: the host's IP. In case of having more than one Elasticsearch node, Kibana can be configured to connect to multiple Elasticsearch nodes in the same cluster. The nodes' IPs can be separated with commas. Eg. ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``
- ``<elasticsearch_password>``: the password generated during the Elasticsearch installation and configuration for the ``elastic`` user.

.. End of configure_kibana.rst
