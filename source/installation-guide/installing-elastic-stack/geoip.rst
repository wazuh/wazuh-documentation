.. Copyright (C) 2019 Wazuh, Inc.

.. _geo_ip:

Enrich events with IP Geolocation
=================================

Making use of Elasticsearch ingest pipelines, it is possible to add the geolocation information to the Wazuh alerts.


1. Create an ingest pipeline in Elasticsearch. Locate in the Elasticsearch server and run the following request:

    .. code-block:: bash

        curl -X PUT "localhost:9200/_ingest/pipeline/geoip" -H 'Content-Type: application/json' -d'
        {
            "description" : "Add geoip info",
            "processors" : [
                {
                    "geoip" : {
                        "field" : "@src_ip",
                        "target_field": "GeoLocation",
                        "properties": ["city_name", "country_name", "region_name", "location"],
                        "ignore_missing": true,
                        "ignore_failure" : true
                    }
                },
                {
                    "remove": {
                        "field": "@src_ip",
                        "ignore_missing": true,
                        "ignore_failure" : true
                    }
                }
            ]
        }
        '

2. Locate in the Wazuh manager server and modify Filebeat configuration (``/etc/filebeat/filebeat.yml``). Uncomment the ``pipeline: geoip``  setting. The configuration block should look as follow:

    .. code-block:: yaml

        output.elasticsearch:
            hosts: ['http://YOUR_ELASTIC_SERVER_IP:9200']
            pipeline: geoip
            indices:
                - index: 'wazuh-alerts-3.x-%{+yyyy.MM.dd}'

3. Restart Filebeat service to apply changes:

    .. code-block:: console

        # systemctl restart filebeat
