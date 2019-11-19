.. Copyright (C) 2019 Wazuh, Inc.

Download the Kibana configuration file from the Wazuh repository:

  .. code-block:: console

    # curl -so /etc/kibana/kibana_aio.yml https://raw.githubusercontent.com/wazuh/wazuh/elk-secured/extensions/kibana/7.x/kibana.yml

Edit the file ``/etc/kibana/kibana.yml``

  .. code-block:: yaml

    server.host: "KIBANA_IP"
    elasticsearch.hosts: ["https://YOUR_ELASTIC_SERVER_IP:9200"]
    elasticsearch.password: "<ELASTIC_GENERATED_PASSWORD>"

Replace ``<KIBANA_IP>`` and ``<YOUR_ELASTIC_SERVER_IP>`` with your host IP. ``<ELASTIC_GENERATED_PASSWORD>`` is the password generated in Installing Elasticsearch section.

.. End of edit_kibana_yml_aio.rst