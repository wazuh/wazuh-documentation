.. Copyright (C) 2018 Wazuh, Inc.

.. _kibana_troubleshooting:

Troubleshooting
===============

**"Plugin installation was unsuccessful due to error "Incorrect Kibana version in plugin [wazuh]. Expected [6.2.3]; found [6.2.4]"**

    The Wazuh App has a file named *package.json*, it includes dependencies along more information. One included thing is the Kibana version:

    .. code-block:: console

        "kibana": {
            "version": "6.2.4"
        },

    Your Wazuh App must to match the Kibana installed version. If you have 6.2.4 in the *package.json* file, your installed Kibana must to be Kibana 6.2.4


**No template found for the selected index-pattern**

    Elasticsearch needs the right template to ingest alerts on the right way, otherwise you'll have corrupted indices.

    .. code-block:: console

        curl https://raw.githubusercontent.com/wazuh/wazuh/3.2/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

**Wazuh RESTful API seems to be down**

    It means your Wazuh API could be unavailable. Since the Wazuh App needs data from the Wazuh API, it must to be available for the Wazuh App.

    If you are using systemd, please check the status as follow:

        .. code-block:: console
            
            # systemctl status wazuh-api


    If you are using sysv init, please check the status as follow:

        .. code-block:: console
            
            # service wazuh-api status

    If the above suggestion says the Wazuh API is up, try to fetch data using the CLI from the Kibana server to the Wazuh API server:

        .. code-block:: console
            
            # curl api_user:api_pass@api_url:55000/version

    If the *curl* command fails but the Wazuh API is running properly, it means you have a connectivity problem between servers.


**Don't see alerts in the Wazuh App**

    First step is to check if indeed there are no alerts in Elasticsearch.

    .. code-block:: console
        
        # curl elastic_ip:9200/_cat/indices/wazuh-alerts-3.x-*

    If you don't see any index created it means you have no alerts in Elasticsearch. Check next steps to get it solved.

    If you are using a **single-host** architecture check if Logstash is reading your *alerts.json* file:

    .. code-block:: console
        
        # lsof /var/ossec/logs/alerts/alerts.json

    You should see two processes reading the *alerts.json* file: *ossec-analysisd* and *java*

    If you are using a **distributed** architecture check if Filebeat is reading your *alerts.json* file:

    .. code-block:: console
        
        # lsof /var/ossec/logs/alerts/alerts.json

    You should see two processes reading the *alerts.json* file: *ossec-analysisd* and *filebeat*

**API version mismatch. Expected v3.2.0**

    The Wazuh App uses the Wazuh API to fetch some information, they are compatible between patch versions, this means you could 
    use Wazuh App designed for Wazuh 3.2.1 with a Wazuh API 3.2.2.

    You can't use Wazuh API 3.3.0 with a Wazuh App designed for Wazuh 3.0.0.

**None of the above solutions are matching my problem**

    All the technologies we are using have their own logs files, so you could check them and look for error messages and warning messages.

    Check the Elastic stack log files:

    .. code-block:: console

        # cat /var/log/elasticsearch/elasticsearch.log | grep -i -E "error|warn"
        # cat /var/log/filebeat/filebeat | grep -i -E "error|warn"
        # cat /var/log/logstash/logstash-plain.log | grep -i -E "error|warn"

    Check the Wazuh App log file:

    .. code-block:: console

        # cat /usr/share/kibana/plugins/wazuh-logs/wazuhapp.log | grep -i -E "error|warn"

    Check the Wazuh Manager log file:

    .. code-block:: console

        # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"
    
Also you have the Google mailing group:

    https://groups.google.com/forum/#!forum/wazuh

Additionally you could open a new issue on GitHub repository:

    https://github.com/wazuh/wazuh-kibana-app/issues