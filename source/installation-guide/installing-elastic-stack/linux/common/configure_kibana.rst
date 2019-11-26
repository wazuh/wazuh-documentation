.. Copyright (C) 2019 Wazuh, Inc.

Download the Kibana custom configuration file from the Wazuh repository:

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh/elastic-secured-3.10/extensions/kibana/7.x/kibana.yml


Edit the file ``/etc/kibana/kibana.yml`` as follows:

.. code-block:: console

    server.host: <kibana_ip>
    elasticsearch.hosts: https://<elasticsearch_ip>:9200
    elasticsearch.password: <elasticsearch_password>

The values to be replaced:

- ``<elasticsearch_ip>``: the host IP. i.e: ``10.0.0.2``.
- ``<kibana_ip>``: Kibana will only listen on the loopback interface (localhost) by default, which means that it can be only accessed from the same machine. To access Kibana from the outside make it listen on its network IP by replacing ``<kibana_ip>`` with the Kibana host IP. I.e: ``10.0.0.2``.
- ``<elasticsearch_password>``: The previously generated password.

.. End of include file
