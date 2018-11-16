.. Copyright (C) 2018 Wazuh, Inc.

.. _Troubleshooting_overview:

Overview
========

Due to the variety of the distributions and software settings found in physical servers, several issues can frequently be found in some points of the installation process:

- **Openjdk version not compatible**: Currently jdk9+ does not work with logstash. You should uninstall no compatible versions of Openjdk and install openjdk version 8 instead.


+ **Logstash not working properly**: Once Wazuh Server, Elastics stack and wazuh agent installation and Kibana app setup  are finished, new security events are ready to be shown in the charts. If not data is shown, alarm log (/var/ossec/logs/alerts/alerts.(json or log)) can be reviewed to compare with the shown data. When alarm logs do not fit with the shown data it is recommended to review elastic stack log files with the command cat /var/log/elasticsearch/elasticsearch.log | grep -i -E "error|warn".
If it appears this message: "no configuration found in the configured sources error in logstash", then the recommended solution is to uninstall logstash and reinstall logstash.


.. note::
  It is recommended to restart wazuh manager and agent.

