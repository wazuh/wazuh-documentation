.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/basic/kibana/kibana.yml

Edit the ``/etc/kibana/kibana.yml`` file:

.. code-block:: yaml

    server.host: <kibana_ip>
    elasticsearch.hosts: ["https://<elasticsearch_ip>:9200"]
    elasticsearch.password: <elasticsearch_password>

Values to be replaced:

- ``<kibana_ip>``: by default, Kibana only listens on the loopback interface (localhost), which means that it can be only accessed from the same machine. To access Kibana from the outside it may be configured to listen on its network IP by replacing ``kibana_ip`` with Kibana’s host IP.
- ``<elasticsearch_ip>``: the host’s IP.
- ``<elasticsearch_password>``: the password generated during the Elasticsearch installation and configuration for the ``elastic`` user.

.. End of configure_kibana.rst
