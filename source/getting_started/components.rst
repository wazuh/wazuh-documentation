.. _components:

Components
==========

Wazuh main components are the agent, that runs on the monitored host, and the manager that analyzes data received from the agents. In addition, the manager talks to an Elasticsearch cluster, where information is indexed and stored.

Wazuh agent
-----------

The Wazuh agent component runs on the monitored hosts, and is used to collect different type of system data. The agent forwards the collected data to the Wazuh manager, through an encrypted and authenticated channel. In order to stablish this communication, it uses pre-shared keys, that are obtained through a registration processes.

The agent has been already pre-compiled and package to support the following Operating Systems: Linux, AIX, Solaris, Windows, Darwin (Mac OS X).

On Unix based operating systems, the agent runs multiple processes that communicate internally through a Unix domain socket with the process that communicates with the manager. On Windows systems there is only one agent process running multiple tasks using mutexes.

Different agent tasks or processes are used to monitor the system in different ways. For example, to monitor files integrity, read the system log messages, or scan the system configuration and applications.

The diagram below represents the internal tasks and processes that take place at an agent level:

.. image:: ../images/agent_1024x1016.png
   :align: center
   :width: 80%

All agent processes have different purposes and configuration settings. Here is a description of what is done by each one of them:

- **Rootcheck:** This process performs multiple tasks related to the detection of rootkits, malware and anomalies. It also runs policy monitoring checks that inspect system configuration files.

+ **Log Collector:** This agent component is used to read operating system or application log messages. It can also be configured to run commands periodically, capturing the output. 

- **Syscheck:** This process takes care of monitoring file integrity. It can also monitor registry keys on Windows systems. It is capable of detecting changes in the contents of a file, attributes or ownership. It talks to the operating system kernel to do real-time detection.

+ **OpenSCAP:** This module is an OVAL (Open Vulnerability Assessment Language) that periodically scans the system looking for vulnerable applications, or configurations that do not follow well known standards as defined by CIS (Center of Internet Security) hardening guides.

- **Agent Daemon:** This is the process that receives the data generated or collected by all other agent components. It takes care of compressing, encrypting and delivering the data to the manager through an authenticated channel. This process runs in a “chroot” (change root) environment, meaning that has limited access to the monitored system, improving the overall security of the software, as this is the only process that the agent runs that is exposed to the network.

Wazuh manager
-------------

The manager component is the system that analyzes the data received from the agents, triggering alerts when an event matches a rule (e.g. intrusion detected, file changed, configuration not compliant with policy, possible rootkit...).

.. image:: ../images/manager_1024x872.png
   :align: center
   :width: 80%

The manager usually runs in a standalone server, virtual machine or cloud instance. This server typically will also run an instance of the agent that will be reporting locally to the manager processes. Below is the list of the main manager components:

- **Registration service:** It is used to register new agents by distributing pre-shared keys that are unique per agent. This process runs as a network service and supports TLS/SSL communications.

+ **Remote daemon service:** It is the service receiving data from the agents. It makes use of the pre-shared keys to validate agent’s identity, and to dynamically build a new key that is use to decipher the received data. 

- **Analysis daemon:** It is the process that performs the data analysis, utilizing decoders to identify the type of information being processed (e.g. Windows events, SSHD log messages, Apache web server log messages...). Once the data is decoded, it will also use rules to identify text patterns and trigger alerts.

+ **RESTful API:** Provides an interface to manage and monitor the configuration and deployment of the solution. It is also used by Wazuh WUI (that runs in the form of a Kibana App).


Elastic Stack
-------------

Elastic Stack is the combination of three popular Open Source projects for log management, known as Elasticsearch, Logstash and Kibana.

- Elasticsearch is a highly scalable full-text search and analytics engine.
- Logstash is a tool to collect logs, parse them, and store them for later use.
- Kibana is a flexible and intuitive visualization dashboard.

Wazuh integration with Elastic Stack provides a real-time alerts management console, as well as a scalable and flexible way to store data for as long as needed.

Elasticsearch is a distributed, RESTful search and analytics engine capable of solving a growing number of use cases. As the heart of the Elastic Stack, it centrally stores your data so you can discover the expected and uncover the unexpected. It is based on Apache Lucene information retrieval library.

An Elasticsearch *index* is a data structure, that defines the mapping for multiple “types” (logical categories defined for documents that have a set of common fields). An index is a collection of documents that have somewhat similar characteristics. Wazuh utilizes three different indices, created daily, to define structures for different type of events:

- wazuh-alerts: Index for alerts generated by the Wazuh manager, when a certain event matches a decoder/rule.
- wazuh-events: Index for all the events (archives data) received from the agents. It includes all raw log messages collected.
- wazuh-monitoring: Index for data related to agent’s status, used by the WUI to get the historical information on status. Possible values are “Active”, “Disconnected” or “Never connected”.

An index is composed by documents. For the indices above, documents are single instances of alerts, archived events or status events.

Lucene basic data structure, the inverted index, maps terms to documents. A term is a unit of search. A simple search with multiple terms is then done by looking up all the terms and their occurrences, and take the intersection (for AND searches) or the union (for OR searches) of the sets of occurrences to get the resulting list of documents.

An Elasticsearch index is made up of one or more shards, which can have zero or more replicas. These are all individual Lucene indexes. That is, an Elasticsearch index is made up of many Lucene indexes. When a search is run in an Elasticsearch index, the search is executed on all the shards and merged.
