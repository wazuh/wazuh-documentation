.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh/elastic-secured-3.10/extensions/kibana/7.x/kibana.yml

The file ``/etc/kibana/kibana.yml`` has to be edited:

.. code-block:: yaml

    server.host: <kibana_ip>
    elasticsearch.hosts: https://<elasticsearch_ip>:9200
    elasticsearch.password: <elasticsearch_password>

Values to be replaced:

- ``<kibana_ip>``: Kibana will only listen on the loopback interface (localhost) by default, which means that it can be only accessed from the same machine. To access Kibana from the outside make it listen on its network IP by replacing ``kibana_ip`` with the Kibana's host IP.
- ``<elasticsearch_ip>``: the host IP. In case of having more than one Elasticsearch node, the nodes can be separated with commas.
- ``<elasticsearch_password>``: The password generated in Elasticsearch installation and configuration for ``elastic`` user.

.. End of configure_kibana.rst
