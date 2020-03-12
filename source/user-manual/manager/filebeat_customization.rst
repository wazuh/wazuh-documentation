.. Copyright (C) 2020 Wazuh, Inc.

.. _filebeat_customization:

Filebeat customization
======================

Filebeat allows multiple inputs configuration. This feature may be useful when it is necessary to foward alerts from different sources. This can be easyly done by adding more input modules on the Filebeat's configuration file ``filebeat.yml``:

.. code-block:: console

    # Wazuh - Filebeat configuration file
    filebeat.modules:
    #  Default module
    - module: wazuh
        alerts:
        enabled: true
        archives:
        enabled: false

    # Custom input
    - module: wazuh
    alerts:
        enabled: true
        input:
        paths:
            - "/var/custom/more_alerts/alerts.json"
        fields:
            index_prefix: "wazuh-alerts-custom-"

    setup.template.json.enabled: true
    setup.template.json.path: '/etc/filebeat/wazuh-template.json'
    setup.template.json.name: 'wazuh'
    setup.template.overwrite: true
    setup.ilm.enabled: false
    output.elasticsearch.hosts: ['http://localhost:9200']
