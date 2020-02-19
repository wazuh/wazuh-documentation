.. Copyright (C) 2020 Wazuh, Inc.

.. _components:

Components
==========

Wazuh’s main components are the agent, that runs on each monitored endpoint, and the server that analyzes data received from the agents and also from agentless sources like syslog or external APIs. In addition, the server forwards event data to an Elasticsearch cluster where information is indexed and stored.

Wazuh agent
-----------

The Wazuh agent runs on Linux, Windows, macOS, Solaris, AIX, and other operating systems. It can be deployed to laptops, desktops, servers, cloud instances or virtual machines. It provides threats detection and prevention capabilities, and it is used to collect different types of system and application data that it forwards to the Wazuh server through an encrypted and authenticated channel. In order to establish this secure channel, a registration process involving unique pre-shared keys is utilized.

The Wazuh agent does have a modular architecture, where different components take care of different tasks (e.g. monitoring the file system, reading log messages, collecting inventory data or scanning system configurations). Users can enable or disable agent modules via configuration settings, adapting the solution to their particular use cases.

The diagram below represents the agent architecture and components:

.. thumbnail:: ../images/getting_started/wazuh_agent_architecture.png
   :title: Wazuh agent components
   :align: center
   :width: 100%

All agent modules have different purposes and settings. Here is a brief description of what is done by each of them:

- **Log collector:** This agent component is capable of reading flat log files and Windows event logs, collecting operating system and application log messages. It does support XPath filters for Windows events, and recognizes multi-line formats (e.g. Linux Audit logs). It can also enrich JSON events with additional metadata.

+ **Commmand execution:** Agents have the ability to run authorized commands periodically, collecting their output and reporting it back to the Wazuh server for further analysis. This module can be used to meet different use cases (e.g. monitor hard disk space left). 

- **File integrity monitoring (FIM):** This module monitors the file system, reporting when files are created, deleted or modified. It keeps track of file attributes, permissions, ownership and content. When an event occurs, it captures who, what and when details in real time. Additionally, this module builds and maintains a database with the state of the monitored files, allowing queries to be run remotely.

+ **Security configuration assessment (SCA):** This component provides continuous configuration assessment, utilizing out-of-the-box checks based on the Center of Internet Security (CIS) benchmarks. Users can also create their own SCA checks to monitor and enforce their security policies.

- **System inventory:** This agent module periodically runs scans, collecting inventory data such as operating system version, network interfaces, running processes, installed applications and a list of open ports. Scan results are stored into SQL databases that can be queried remotely.

+ **Malware detection:** Using a non-signature based approach, this component is capable of detecting anomalies and possible presence of rootkits. Monitoring system calls, it looks for hidden processes, hidden files or hidden ports. 

- **Active response:** This module runs automatic actions when threats are detected. Among other things, it can block a network connection, stop a running process or delete a malicious file. Custom responses can also be created by users when necessary (e.g. run a binary in a sandbox, capture a network connection traffic, scan a file with an antivirus, etc.).

+ **Containers security monitoring:** This agent module is integrated with the Docker Engine API in order to monitor changes in a containarized environment. For example, it detects changes to container images, network configuration or data volumes. Besides, it alerts on containers running in privileged mode and on users executing commands in a running container.

- **Cloud security monitoring:** This component monitors cloud providers such as Amazon AWS or Microsoft Azure, communicating natively with their APIs. It is capable of detecting changes to the cloud infrastructure (e.g. a new user is created, a security group is modified, a cloud instance is stopped, etc.), and collecting cloud services log data (e.g. AWS Cloudtrail, AWS Macie, AWS GuardDuty, Azure Active Directory, etc.)

The Wazuh agent itself delivers the data, generated or collected by all of the different agent modules, to the Wazuh server. It does so through a secure channel, providing data encryption and compression in real time. Additionally, it does implement flow control mechanisms to avoid flooding, queueing events when necessary and protecting the network bandwidth. 

Wazuh server
------------

The server component is in charge of analyzing the data received from the agents and triggering alerts when an event matches a rule (e.g. intrusion detected, file changed, configuration not compliant with policy, possible rootkit, etc...).

.. thumbnail:: ../images/getting_started/wazuh_server_processes.png
   :title: Wazuh server components
   :align: center
   :width: 80%

The server usually runs on a stand-alone physical machine, virtual machine or cloud instance and runs agent components with the purpose of monitoring itself. Below is a list of the main server components:

- **Registration service:** This is used to register new agents by provisioning and distributing pre-shared authentication keys that are unique to each agent. This process runs as a network service and supports authentication via TLS/SSL and/or by a fixed password.

+ **Remote daemon service:** This is the service that receives data from the agents. It makes use of the pre-shared keys to validate each agent's identity and to encrypt the communications between the agent and the manager.

- **Analysis daemon:** This is the process that performs data analysis. It utilizes decoders to identify the type of information being processed (e.g. Windows events, SSHD logs, web server logs, etc.) and then extract relevant data elements from the log messages (e.g. source ip, event id, user, etc.). Next, by using rules, it can identify specific patterns in the decoded log records which could trigger alerts and possibly even call for automated countermeasures (active responses) like an IP ban on the firewall.

+ **RESTful API:** This provides an interface to manage and monitor the configuration and deployment status of agents. It is also used by the Wazuh web interface, which is a Kibana app.


Elastic Stack
-------------

Elastic Stack is a unified suite of popular open source projects for log management, including Elasticsearch, Kibana, Filebeat, and others. The projects that are especially relevant to the Wazuh solution are:

- **Elasticsearch:** A highly scalable, full-text search and analytics engine. Elasticsearch is distributed, meaning the data (indices) are divided into shards and each shard can have zero or more replicas.
- **Kibana:** A flexible and intuitive web interface for mining, analyzing, and visualizing data. It runs on top of the content indexed on an Elasticsearch cluster.
- **Filebeat:** A lightweight forwarder used to convey logs across a network, usually to Elasticsearch.

Wazuh integrates with Elastic Stack to provide a feed of already decoded log messages to be indexed by Elasticsearch, as well as a real-time web console for alert and log data analysis. In addition, the Wazuh user interface (running on top of Kibana) can be used for management and monitoring of your Wazuh infrastructure.

An Elasticsearch *index* is a collection of documents that have somewhat similar characteristics (like certain common fields and shared data retention requirements). Wazuh utilizes as many as three different indices, created daily, to store different event types:

- **wazuh-alerts:** Index for alerts generated by the Wazuh server each time an event trips a rule.

+ **wazuh-events:** Index for all events (archive data) received from the agents whether or not they trip a rule.

- **wazuh-monitoring:** Index for data related to agent status over time. It is used by the web interface to represent when individual agents are or have been “Active”, “Disconnected” or “Never connected”.

An index is composed of documents. For the indices above, documents are individual alerts, archived events or status events.

An Elasticsearch index is divided into one or more shards and each shard can optionally have one or more replicas. Each primary and replica shard is an individual Lucene index. Thus, an Elasticsearch index is made up of many Lucene indexes. When a search is run on an Elasticsearch index, the search is executed on all the shards in parallel and the results are merged. Dividing Elasticsearch indexes into multiple shards and replicas is used in multiple-node Elasticsearch clusters with the purpose of scaling out searches and for high availability. Single-node Elasticsearch clusters normally have only one shard per index and no replicas.
