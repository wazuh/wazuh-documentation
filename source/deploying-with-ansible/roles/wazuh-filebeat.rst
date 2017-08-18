.. _ansible-wazuh-filebeat:

Filebeat
--------------

Filebeat could be using in conjuntion with Wazuh Manager to send events and alerts to Logstash node, this role will install Filebeat, you can customize the installation with this variables:

- **filebeat_output_logstash_hosts:** define logstash node(s) to be use (default: ``127.0.0.1:5000``).
