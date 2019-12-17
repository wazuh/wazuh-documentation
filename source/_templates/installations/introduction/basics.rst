.. Copyright (C) 2019 Wazuh, Inc.


- **Wazuh agent**: the agent is a non-intrusive, lightweight and multi-platform software that runs on the monitored endpoint. Collects log data and security events. It also performs inventory and hardening scans, detects malware and system anomalies, and executes active responses.

+ **Wazuh server**: collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat.

- **Elastic Stack**: ingests and indexes data from the Wazuh server. It provides a search engine and a Wazuh user interface for configuration management and data visualization. It runs Elasticsearch and Kibana with the Wazuh plugin. Logstash is optional.

+ **Wazuh single-node cluster**:  is a single Wazuh server host.

- **Wazuh multi-node cluster**: is a group of Wazuh servers, that works together to provide high availability and load balancing. With a cluster configuration, your Wazuh infrastructure can scale as much as you need.

+ **Elasticsearch single-node cluster**: is a single Elasticsearch node.

- **Elasticsearch multi-node cluster**: is a group of Elasticsearch nodes configured to work together. It provides high availability, scalability and load balancing for data indexing and searching.

.. End of file
