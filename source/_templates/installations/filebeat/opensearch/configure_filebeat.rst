.. Copyright (C) 2021 Wazuh, Inc.

.. tabs::



  .. group-tab:: Wazuh indexer single-node cluster


    .. code-block:: yaml
      :emphasize-lines: 3,9,10

      # Wazuh - Filebeat configuration file
      output.elasticsearch:
        hosts: ["<indexer_ip>:9700"]
        protocol: https
        username: "admin"
        password: "admin"
        ssl.certificate_authorities:
          - /etc/filebeat/certs/root-ca.pem
        ssl.certificate: "/etc/filebeat/certs/<filebeat-node-certificate-name>.pem"
        ssl.key: "/etc/filebeat/certs/<filebeat-node-certificate-name>-key.pem"
      setup.template.json.enabled: true
      setup.template.json.path: '/etc/filebeat/wazuh-template.json'
      setup.template.json.name: 'wazuh'
      setup.ilm.overwrite: true
      setup.ilm.enabled: false

      filebeat.modules:
        - module: wazuh
          alerts:
            enabled: true
          archives:
            enabled: false

    - Replace ``<indexer_ip>`` with the IP address or the hostname of the Opensearch server.
    - Replace ``<filebeat-node-certificate-name>`` with the certificate name for your Filebeat node, for example, ``filebeat``.

  .. group-tab:: Wazuh indexer multi-node cluster


    .. code-block:: yaml
      :emphasize-lines: 3,9,10

      # Wazuh - Filebeat configuration file
      output.elasticsearch:
        hosts: ["<indexer_ip_node_1>:9700", "<indexer_ip_node_2>:9700", "<indexer_ip_node_3>:9700"]
        protocol: https
        username: "admin"
        password: "admin"
        ssl.certificate_authorities:
          - /etc/filebeat/certs/root-ca.pem
        ssl.certificate: "/etc/filebeat/certs/<filebeat-node-certificate-name>.pem"
        ssl.key: "/etc/filebeat/certs/<filebeat-node-certificate-name>-key.pem"
      setup.template.json.enabled: true
      setup.template.json.path: '/etc/filebeat/wazuh-template.json'
      setup.template.json.name: 'wazuh'
      setup.ilm.overwrite: true
      setup.ilm.enabled: false

      filebeat.modules:
        - module: wazuh
          alerts:
            enabled: true
          archives:
            enabled: false

    - Replace ``<indexer_ip_node_x>`` with the IP address or the hostname of the Opensearch server.
    - Replace ``<filebeat-node-certificate-name>`` with the certificate name for your Filebeat node, for example, ``filebeat``.


.. End of include file
