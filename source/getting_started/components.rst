.. _components:

Components
==========

Wazuh's main components are the agent that runs on each monitored host, and the manager that analyzes data received from the agents and from other agentless sources like syslog. In addition, the manager forwards event data to an Elasticsearch cluster, where information is indexed and stored.

Wazuh agent
-----------

The Wazuh agent runs on monitored hosts that use a Windows, Linux, Solaris, BSD, or Mac operating system.  It is used to collect different types of system and application data. The agent forwards the collected data to the Wazuh manager through an encrypted and authenticated channel. In order to establish this secure channel, a registration process involving unique pre-shared keys is utilized.

Pre-compiled agent installation packages are already available for these operating systems: Linux, AIX, Solaris, Windows, and Darwin (Mac OS X).

On Unix-based operating systems, the agent runs multiple processes that communicate through a local Unix domain socket with the process that communicates with the manager. On Windows systems there is only one agent process running multiple tasks using mutexes.

Different agent tasks or processes are used to monitor the system in different ways (e.g., monitoring file integrity, reading system log messages, and scanning system configurations).

The diagram below represents the internal tasks and processes that take place at the agent level:

.. thumbnail:: ../images/agent_1024x1016.png
   :title: Agent components
   :align: center
   :width: 80%

All agent processes have different purposes and configuration settings. Here is a description of what is done by each of them:

- **Rootcheck:** This process performs multiple tasks related to the detection of rootkits, malware and system anomalies. It also runs certain basic security checks against system configuration files.

+ **Log Collector:** This agent component is used to read operating system and application log messages, including flat log files, standard Windows event logs, and even Windows Event Channels. It can also be configured to periodically run and capture the output of specific commands. 

- **Syscheck:** This process performs file integrity monitoring (FIM). It can also monitor registry keys on Windows systems. It is capable of detecting changes in a file's content, ownership, or other attributes, as well as noting creation and deletion of files. While it performs periodic FIM scans by default, it can also be configured to communicate with the operating system kernel to do real-time detection of file changes, as well as to report on the details of changes (diffs) to textual files.

+ **OpenSCAP:** This module uses published `OVAL <https://oval.mitre.org/>`_ (Open Vulnerability Assessment Language) and `XCCDF <https://scap.nist.gov/specifications/xccdf/>`_ (Extensible Configuration Checklist Description Format) baseline security profiles to periodically scan the system looking for vulnerable applications or configurations that do not follow well-known standards such as those defined in `CIS <https://benchmarks.cisecurity.org/downloads/benchmarks/>`_ (Center for Internet Security) benchmarks.

- **Agent Daemon:** This is the process that receives the data generated or collected by all other agent components. It compresses, encrypts and delivers the data to the manager through an authenticated channel. This process runs in an isolated “chroot” (change root) environment, meaning that it has limited access to the monitored system.  This improves the overall security of the agent, as this is the only process that the agent runs that connects to the network.

Wazuh manager
-------------

The manager component is the system that analyzes the data received from the agents, triggering alerts when an event matches a rule (e.g. intrusion detected, file changed, configuration not compliant with policy, possible rootkit, etc...).

.. thumbnail:: ../images/manager_1024x872.png
   :title: Manager components
   :align: center
   :width: 80%

The manager usually runs on a stand-alone physical server, virtual machine, or cloud instance. This server typically will also run local agent components for the purpose of monitoring itself. Below is the list of the main manager components:

- **Registration service:** This is used to register new agents by provisioning and distributing pre-shared agent authentication keys that are unique to each agent. This process runs as a network service and supports authentication via TLS/SSL and/or by a fixed password.

+ **Remote daemon service:** This is the service that receives data from the agents. It makes use of the pre-shared keys to validate each agent's identity, and to dynamically build a new key that is use to decipher the received data. 

- **Analysis daemon:** This is the process that performs the data analysis, utilizing decoders to identify the type of information being processed (e.g. Windows events, SSHD log messages, Apache web server log messages...). Once the data is decoded, it will also use rules to identify text patterns and trigger alerts.

+ **RESTful API:** This provides an interface to manage and monitor the configuration and deployment of the solution. It is also used by Wazuh web interface, which is a Kibana app.


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
