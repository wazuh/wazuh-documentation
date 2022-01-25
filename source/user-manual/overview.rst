.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh is a comprehensive open source cybersecurity platform. In our user manual you can find out how to configure and use each of the Wazuh components. 
  
.. _user_manual_overview:

Overview
========

Wazuh is a comprehensive and open source platform  for threat detection, security monitoring, incident response and regulatory compliance. This manual describes how to configure and use each of Wazuh components, which consist of the Wazuh server, the Wazuh agent, and Elastic Stack.

Wazuh server
------------

The Wazuh server is based on a suite of applications where each application or component is designed to accomplish a certain task. These components work together to:

- analyze data received from various logs,
- trigger alerts when a log event matches a rule,
- register new clients/agents, and
- send data to the Elastic Stack server.

Components
``````````
- The **Wazuh manager** receives and analyzes data from the agents using decoders and rules that have been created to trigger security alerts. The manager is also used to distribute configuration files to the agents, to monitor their status and to send control messages to trigger automatic actions at the agent level.

+ The **Registration Service** uses a secure mechanism to register agents without any intervention from the server side.

- The :doc:`RESTful API <api/index>` provides an interface to manage and monitor the configuration of the manager and agents. It is used to register agents, inspect the manager log messages, decoders and rules and provide useful information related to the agents, including their status, operating system details, and alerts related to file integrity monitoring and rootchecks.

+ **Filebeat** is used to forward alerts data from Wazuh manager to Elasticsearch. This component has its own `documentation <https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-overview.html>`_ developed by Elastic.

Elastic Stack
-------------

Elastic Stack is used to index, browse and visualize Wazuh alerts data. In addition, the Wazuh app for Kibana is also used to visualize configuration settings, rules, decoders, and agent's status information. Dashboards used for this visualization include, but are not limited to, policy monitoring, compliance and file integrity.


Components
``````````

- The **Wazuh app** is a Kibana plugin designed to display Wazuh related information providing a RESTful API web interface. This interface makes administration of the Wazuh manager and Wazuh agents easy and powerful.


- **Elasticsearch** is a highly scalable full-text search and analytics engine. It is used to index alerts data and historical agents status information. More information can be found at the `Elasticsearch official documentation <https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html>`_.

+ **Kibana** is a flexible and intuitive web interface for mining, analyzing, and visualizing data. In combination with the Wazuh Kibana app, it is used as the Wazuh web user interface (WUI). More information can be found at the `Kibana official documentation <https://www.elastic.co/guide/en/kibana/current/index.html>`_.

Wazuh agents
------------

The Wazuh agent runs on monitored systems and is responsible for collecting log and event data, performing policy monitoring scans, detecting malware and rootkits and triggering alerts when monitored files are modified. It communicates with the Wazuh server through an encrypted and authenticated channel.

Components
``````````

- **Rootcheck** performs rootkit and malware detection on every system where the agent is installed.

+ **Log monitoring/analysis** collects and analyzes system logs looking for any suspicious activity.

- **Syscheck** runs periodically to check for changes to any configured file (or registry entry on Windows).
