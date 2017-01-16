.. _architecture:

Architecture
============

ToDo

Distributed architecture
-----------------------------

.. thumbnail:: ../images/installation/installing_wazuh.png
    :title: Installing Wazuh Manager
    :align: center
    :width: 100%

Communications:

 - Wazuh Manager listens on port 1514/UDP events from the agents. It is possible to use TCP.
 - Wazuh Manager analyses the events and writes the alerts in */var/ossec/logs/alerts/alerts.json*.
 - Filebeat sends the previous file to Logstash.
 - Logstash listens on port 5000/TCP and sends the alerts to Elasticsearch.
 - Elasticsearch listens on port 9200/TCP events from Logstash.
 - Kibana visualice the information. Port 5601/TCP.
 - Finally, the Wazuh APP (inside Kibana) sends requests to the Wazuh API which it is listen on port 55000/TCP in the Manager.

Single-host architecture
-----------------------------

.. thumbnail:: ../images/installation/installing_wazuh_singlehost.png
    :title: Installing Wazuh Manager - Single-host
    :align: center
    :width: 100%
