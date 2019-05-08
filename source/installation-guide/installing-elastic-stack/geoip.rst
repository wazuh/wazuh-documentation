.. Copyright (C) 2019 Wazuh, Inc.

.. _geo_ip:

Enrich events with geolocation information
==========================================

1. Create an ingest pipeline in Elasticsearch:

    .. code-blocK:: bash

        curl -X PUT "localhost:9200/_ingest/pipeline/geoip" -H 'Content-Type: application/json' -d'
        {
            "description" : "Add geoip info",
            "processors" : [
                {
                "geoip" : {
                    "field" : "@src_ip",
                    "target_field": "GeoLocation",
                    "properties": ["city_name", "country_name", "region_name", "location"],
                    "ignore_missing": true
                }
                }
            ]
        }
        '

2. Uncomment the ``geoip`` pipeline in Filebeat configuration:

    .. code-block:: yml

        output.elasticsearch:
            hosts: ['http://YOUR_ELASTIC_SERVER_IP:9200']
            pipeline: geoip
            indices:
                - index: 'wazuh-alerts-3.x-%{+yyyy.MM.dd}'

    Affected line is ``pipeline: geoip``.

3. Restart Filebeat service:

    .. code-block:: console

        # systemctl restart filebeat