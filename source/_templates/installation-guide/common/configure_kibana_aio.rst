.. Copyright (C) 2019 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh/elastic-secured-3.10/extensions/kibana/7.x/kibana_aio.yml

Edit the file ``/etc/kibana/kibana.yml``:

.. code-block:: yaml

  server.host: "KIBANA_IP"
  elasticsearch.hosts: ["https://YOUR_ELASTIC_SERVER_IP:9200"]
  elasticsearch.password: "ELASTIC_GENERATED_PASSWORD"

The values to be replaced:

- ``YOUR_ELASTIC_SERVER_IP``: the host IP. i.e: ``10.0.0.2``. If you have more than one Elasticsearch node, you can separate the nodes with commas.
- ``KIBANA_IP``: Kibana will only listen on the loopback interface (localhost) by default, which means that it can be only accessed from the same machine. To access Kibana from the outside make it listen on its network IP by replacing ``kibana_ip`` with the Kibana host IP. I.e: ``10.0.0.2``.
- ``ELASTIC_GENERATED_PASSWORD``: The password generated in step 5. I.e: ``IJB8YtGoTgrpaPdGZbSO``.

.. End of certificates_creation_aio.rst
