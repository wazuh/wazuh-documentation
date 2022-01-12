.. Copyright (C) 2022 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://packages.wazuh.com/resources/4.2/open-distro/kibana/7.x/kibana.yml


Edit the ``/etc/kibana/kibana.yml`` file:

.. code-block:: yaml

    server.host: <kibana_ip>
    elasticsearch.hosts: "https://<elasticsearch_ip>:9200"

Values to be replaced:

- ``<kibana_ip>``: by default, Kibana only listens on the loopback interface (localhost), which means that it can be only accessed from the same host. To access Kibana from the outside it may be configured to listen on its network IP address by replacing ``kibana_ip`` with Kibana's host IP. The value ``0.0.0.0`` will accept all the available IPs of the host.
- ``<elasticsearch_ip>``: the host's IP address. In case of having more than one Elasticsearch node, Kibana can be configured to connect to multiple Elasticsearch nodes in the same cluster. The IPs of the nodes can be separated with commas. Eg. ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``

.. End of configure_kibana.rst
