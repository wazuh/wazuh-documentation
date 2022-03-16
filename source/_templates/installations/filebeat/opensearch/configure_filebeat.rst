.. Copyright (C) 2022 Wazuh, Inc.

- Replace ``<elasticsearch_ip>`` with the IP address or the hostname of the Wazuh indexer server.

    .. code-block:: yaml
      :emphasize-lines: 3

       # Wazuh - Filebeat configuration file
       output.elasticsearch:
         hosts: ["<elasticsearch_ip>:9200"]
         protocol: https
         username: ${username}
         password: ${password}
         ssl.certificate_authorities:
           - /etc/filebeat/certs/root-ca.pem
         ssl.certificate: "/etc/filebeat/certs/filebeat.pem"
         ssl.key: "/etc/filebeat/certs/filebeat-key.pem"
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

.. End of include file
