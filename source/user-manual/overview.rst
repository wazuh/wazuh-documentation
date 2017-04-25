.. _user_manual_overview:

Overview
================

This manual provides information for users of Wazuh that is an open source project for security visibility, compliance and infrastructure monitoring. It was born as a fork of OSSEC HIDS. The manual describes how each capability works and how to configure them. Also, this section explains the Wazuh RESTful API features and configuration as well how to install, update, and contribute to :doc:`Wazuh Ruleset<ruleset/index>`.


Wazuh server
------------

The server component is the system that analyzes the data received from the agents, triggering alerts when an event matches a rule. Main components:

- **Manager**, that receives data from the agents, identify the type of information being processed and extracts relevant data elements from the log messages. Also, the alerts generated can be forwarder to :doc:`other systems<manager/output-options/index>`.

+ :doc:`RESTful API <api/index>`, which provides an interface to manage and monitor the configuration and deployment status of agents. Also it's used by the Wazuh App.

- **Filebeat**, for distributed architecture used to transfer the information from the manager to Logstash. This component has its own `documentation <https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-overview.html>`_ developed by Elastic.

Elastic Stack
-------------

Elastic Stack is a unified suite of popular open source projects for log management, including Elasticsearch, Logstash, Kibana, Filebeat, and others. The projects especially relevant to the Wazuh solution are:

- **Logstash** is a tool to collect logs, parse them, and pass them along to a storage system. `Logstash documentation <https://www.elastic.co/guide/en/logstash/current/index.html>`_ developed by Elastic.

+ **Elasticsearch** is a highly scalable full-text search and analytics engine. `Elasticsearch documentation <https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html>`_ developed by Elastic.

- **Kibana** is a flexible and intuitive web interface for mining, analyzing, and visualizing data. `Kibana documentation <https://www.elastic.co/guide/en/kibana/current/index.html>`_ developed by Elastic.

Agents
------

The Wazuh agent runs on monitored hosts that use a Windows, Linux, Solaris, BSD, or Mac operating system. It is used to collect different types of system and application data. The agent forwards the collected data to the manager through an encrypted and authenticated channel.

- **Manage agents**: In order to know how to register, remove or list the agents see :doc:`Agents <agents/index>`.

+ **Capabilities**: To learn more about the capabilities that Wazuh offers, go to the :doc:`Capabilities section <capabilities/index>`.
