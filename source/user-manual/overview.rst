.. _user_manual_overview:

.. warning::

    You are looking at documentation for an older release. Not what you want? See the `current release documentation <https://documentation.wazuh.com/current/user-manual/overview.html>`_.

Overview
========

Wazuh is an open source project that provides security visibility, compliance and infrastructure monitoring capabilities. The project was born as a fork of OSSEC HIDS, and has evolved into a comprehensive solution by implementing new functionalities and integrating other tools like OpenSCAP and Elasticsearch.

This manual describes how to configure and use each one of Wazuh components: Wazuh server, Wazuh agent, and Elastic Stack.

Wazuh server
------------

The Wazuh server is the system that analyzes the data received from the agents, triggering alerts when an event matches a rule. It is also used to monitor and control the configuration and status of registered agents. Main components of this server are:

- **Manager**: It receives data and analyzes data from the agents. To do that it uses decoders and rules that have been crafted to trigger security alerts. The manager is also used to distribute configuration files to the agents, and to monitor their status. In addition, it can send control messages to trigger automatic actions at an agent level.

+ :doc:`RESTful API <api/index>`: It provides an interface to manage and monitor the configuration of the manager and agents. It can be also used to inspect the manager log messages, decoders, and rules. In addition, it provides useful information related to the agents, including their status, operating system details, and file integrity monitoring and rootcheck alerts.

- **Filebeat**: It is used in distributed architectures (where the Wazuh server and Elastic Stack live in different systems) to forward the alerts data to Logstash. This component has its own `documentation <https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-overview.html>`_ developed by Elastic.

Elastic Stack
-------------

Elastic Stack is used to indexing, browse and visualize Wazuh alerts data. In addition, the Wazuh app for Kibana can be used to visualize configuration settings, rules, and decoders, agents status, information, and provides dashboards for policy, compliance and file integrity monitoring.

- **Logstash** is used to ingest data coming from one or more Wazuh servers, feeding the Elasticsearch cluster. In addition, it enriches alerts adding Geolocation metadata. More information at `Logstash official documentation <https://www.elastic.co/guide/en/logstash/current/index.html>`_.

+ **Elasticsearch** is a highly scalable full-text search and analytics engine. It is used to index alerts data and historical agents status information. More information at `Elasticsearch official documentation <https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html>`_.

- **Kibana** is a flexible and intuitive web interface for mining, analyzing, and visualizing data. In combination with our Wazuh Kibana app, it is used as Wazuh web user interface (WUI). More information at `Kibana official documentation <https://www.elastic.co/guide/en/kibana/current/index.html>`_.

Agents
------

The Wazuh agent runs on monitored systems and is in charge of collecting log and event data, performing policy monitoring scans, detecting malware and rootkits and alert when watched files are modified. It communicates with the Wazuh server through an encrypted and authenticated channel.

- **Manage agents**: In order to know how to register, remove or list the agents see :doc:`Agents <agents/index>`.

+ **Capabilities**: To learn more about the capabilities that Wazuh offers, go to the :doc:`Capabilities section <capabilities/index>`.
