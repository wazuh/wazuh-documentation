.. Copyright (C) 2022 Wazuh, Inc.

In this section definitions will be grouped depending on the granularity of the component, starting from the unique components and finishing in clusters.

Individual components
^^^^^^^^^^^^^^^^^^^^^

* Wazuh agent: is a non-intrusive, lightweight and multi-platform software that runs on the monitored endpoint. Collects log data and security events. It also performs inventory and hardening scans, detects malware and system anomalies, and executes active responses.

* Wazuh manager: this component is in charge of analyzing the data received from the agents and triggering alerts when an event matches a rule (e.g. intrusion detected, file changed, configuration not compliant with policy, possible rootkit, etc…).

* Wazuh API: this component provides an interface to manage and monitor the configuration and deployment status of agents and managers. It is also used by the Wazuh web interface, which is a Kibana plugin.

* Filebeat: is a lightweight shipper for forwarding the Wazuh manager alerts to Elasticsearch.

* Elasticsearch: is a highly scalable full-text search and analytics engine. It will store all the alerts sent by the Wazuh manager.

* Kibana: is a data visualization dashboard for Elasticsearch. It provides visualization capabilities on top of the content indexed on an Elasticsearch cluster. Users can create bar, line and scatter plots, or pie charts and maps on top of large volumes of data.

* Wazuh Kibana plugin: lets users visualize and analyze Wazuh alerts stored in Elasticsearch. Provides statistics per agent, search alerts and filter using different visualizations. It integrates with the Wazuh API to retrieve information about manager and agents configuration, logs, ruleset, groups and much more.

Grouped components
^^^^^^^^^^^^^^^^^^

* Wazuh server: collects and analyzes data from deployed agents and sends the alerts to Elasticsearch. It runs the Wazuh manager, the Wazuh API and Filebeat.

* Elastic Stack: the Elasticsearch and Kibana components can be installed on the same server. Both components installed together are called Elastic Stack. It runs Kibana with the Wazuh plugin. Logstash may be optionally installed.

Clustered components
^^^^^^^^^^^^^^^^^^^^

* Single-node cluster: this term is used for referring to those components that act within only one server; without communication with other servers running the same components. A Wazuh single-node cluster is a Wazuh manager server that is not connected to other manager nodes. A similar criteria can be applied to Elasticsearch nodes.

* Multi-node cluster: this term is used for referring to those components that are installed in two or more separate servers and that are configured to act together to provide high availability and load balancing. A Wazuh multi-node cluster consists of two or more servers with the Wazuh managers installed on them that synchronize their data with each other. The same definition can be applied to Elasticsearch nodes. A multi-node cluster provides high availability, scalability and load balancing for data indexing and searching. With the multi-node clusters Wazuh infrastructure can scale as much as needed.

.. End of file
