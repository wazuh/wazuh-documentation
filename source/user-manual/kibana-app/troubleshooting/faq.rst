.. Copyright (C) 2018 Wazuh, Inc.

.. _faq:

FAQ
===


*"Plugin installation was unsuccessful due to error "Incorrect Kibana version in plugin [wazuh]. Expected [6.2.3]; found [6.2.4]"*
----------------------------------------------------------------------------------------------------------------------------------

The Wazuh App has a file named *package.json*, it includes dependencies along more information. One included thing is the Kibana version:

.. code-block:: console

    "kibana": {
        "version": "6.2.4"
    },

Your Wazuh App must to match the Kibana installed version. If you have 6.2.4 in the *package.json* file, your installed Kibana must to be Kibana 6.2.4


*No template found for the selected index-pattern*
---------------------------------------------------

Elasticsearch needs the right template to ingest alerts on the right way, otherwise you'll have corrupted indices.

.. code-block:: console

    curl https://raw.githubusercontent.com/wazuh/wazuh/3.2/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

*None of the above solutions are matching my problem*
-----------------------------------------------------

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