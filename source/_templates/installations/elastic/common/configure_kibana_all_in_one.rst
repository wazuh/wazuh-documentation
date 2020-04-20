.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/kibana/7.x/kibana_all_in_one.yml

Edit the ``/etc/kibana/kibana.yml`` file:

.. code-block:: yaml

    server.host: <kibana_ip>

Values to be replaced:

- ``<kibana_ip>``: by default, Kibana only listens on the loopback interface (localhost), which means that it can be only accessed from the same machine. To access Kibana from the outside it may be configured to listen on its network IP by replacing ``kibana_ip`` with Kibana’s host IP. ``0.0.0.0`` is a valid IP address and will bind to all network interfaces.

.. End of configure_kibana.rst
