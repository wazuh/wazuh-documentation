.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh

.. _introduction:

Introduction
============

.. meta::
  :description: Read this guide to know how to install Wazuh and the Elasticsearch integration.

Community
---------

.. include:: ../_templates/installations/introduction/community.rst

Supported platforms
-------------------

.. include:: ../_templates/installations/introduction/supported_platforms.rst

Wazuh cloud (SaaS)
------------------

.. include:: ../_templates/installations/introduction/wazuh_saas.rst

Basic concepts
--------------

.. include:: ../_templates/installations/introduction/basics.rst

Installation types
------------------

The Wazuh server and Elastic stack can be installed and operated in one of these five deployments:

- All-in-one: the Wazuh server and Elastic Stack subsystems run on a single host.

.. thumbnail:: ../images/installation/installing_wazuh_architecture_onehost.png
    :title: Installing Wazuh manager - single server architecture
    :align: center
    :width: 100%

+ Wazuh single-node cluster and Elasticsearch single-node cluster: the Wazuh server and Elastic Stack subsystems run on separate host systems.

.. thumbnail:: ../images/installation/installing_wazuh_architecture_twohosts.png
    :title: Installing Wazuh manager and Elastic stack each in a single host
    :align: center
    :width: 100%

- Wazuh multi-node cluster and Elasticsearch single-node cluster: Wazuh can be configured to work in two or more servers (multi-node cluster) and Elastic Stack in a single-node cluster.

.. thumbnail:: ../images/installation/installing_wazuh_architecture_wazuhcluster.png
    :title: Installing Wazuh manager as cluster with Elastic Stack in a single host
    :align: center
    :width: 100%

+ Wazuh host and Elasticsearch multi-node cluster: Wazuh run in a single-node cluster and Elastic Stack can be configured in three or more servers (multi-node cluster).

.. thumbnail:: ../images/installation/installing_wazuh_architecture_elkcluster.png
    :title: Installing Wazuh manager in a single host  with Elastic Stack as cluster
    :align: center
    :width: 100%

- Wazuh multi-node cluster and Elasticsearch multi-node cluster: Wazuh can be configured to work in two or more servers (cluster mode) and Elasticsearch as well.

.. thumbnail:: ../images/installation/installing_wazuh_architecture_bothcluster.png
    :title: Installing Wazuh manager as cluster with Elastic Stack as cluster
    :align: center
    :width: 100%


Components
----------

Wazuh’s main components are the agent that runs on each monitored host and the server that analyzes data received from the agents and agentless sources like syslog. In addition, the server forwards event data to an Elasticsearch cluster where information is indexed and stored.

Wazuh agent
^^^^^^^^^^^

The Wazuh agent runs on Windows, Linux, Solaris, BSD, and Mac operating systems. It is used to collect different types of system and application data that is forwarded to the Wazuh server through an encrypted and authenticated channel. In order to establish this secure channel, a registration process involving unique pre-shared keys is utilized.

The agents can be used to monitor physical servers, virtual machines and cloud instances (e.g. Amazon AWS, Azure or Google Cloud). Pre-compiled agent installation packages are available for Linux, HP-UX, AIX, Solaris, Windows, and Darwin (Mac OS X).

On Unix-based operating systems, the agent runs multiple processes which communicate with each other through a local Unix domain socket. One of those processes is in charge of the communication and data sending to the Wazuh server. On Windows systems, there is only one agent process running multiple tasks using mutexes.

Different agent tasks or processes are used to monitor the system in different ways (e.g., monitoring file integrity, reading system log messages and scanning system configurations).

The diagram below represents the internal tasks and processes that take place at the agent level:

.. thumbnail:: ../images/getting_started/wazuh_agent_processes.png
   :title: Wazuh agent components
   :align: center
   :width: 80%

All agent processes have different purposes and settings. Here is a brief description of what is done by each of them:

- **Rootcheck:** This process performs multiple tasks related to the detection of rootkits, malware and system anomalies. It also runs certain basic security checks against system configuration files.

+ **Log Collector:** This agent component is used to read operating system and application log messages, including flat log files, standard Windows event logs and even Windows Event Channels. It can also be configured to periodically run and capture the output of specific commands.

- **Syscheck:** This process performs file integrity monitoring (FIM) and can also monitor registry keys on Windows systems. It is capable of detecting changes in a file's content, ownership and other attributes, as well as noting the creation and deletion of files. While it performs periodic FIM scans by default, it can also be configured to communicate with the operating system kernel to do real-time detection of file changes and to produce a detailed change report (diffs) of text files.

+ **OpenSCAP:** This module uses published `OVAL <https://oval.mitre.org/>`_ (Open Vulnerability Assessment Language) and `XCCDF <https://scap.nist.gov/specifications/xccdf/>`_ (Extensible Configuration Checklist Description Format) baseline security profiles. By periodically scanning a system, it can find vulnerable applications or configurations that do not follow well-known standards, such as those defined in `CIS <https://benchmarks.cisecurity.org/downloads/benchmarks/>`_ (Center for Internet Security) benchmarks.

- **Agent Daemon:** This is the process that receives the data generated or collected by all other agent components. It compresses, encrypts and delivers the data to the server through an authenticated channel. This process runs in an isolated “chroot” (change root) environment, meaning that it has limited access to the monitored system. This improves the overall security of the agent because it is the only process that connects to the network.


Wazuh server
^^^^^^^^^^^^

The server component is in charge of analyzing the data received from the agents and triggering alerts when an event matches a rule (e.g. intrusion detected, file changed, configuration not compliant with policy, possible rootkit, etc...).

.. thumbnail:: ../images/getting_started/wazuh_server_processes.png
   :title: Wazuh server components
   :align: center
   :width: 80%

The server usually runs on a stand-alone physical machine, virtual machine or cloud instance and runs agent components with the purpose of monitoring itself. Below is a list of the main server components:

- **Registration service:** This is used to register new agents by provisioning and distributing pre-shared authentication keys that are unique to each agent. This process runs as a network service and supports authentication via TLS/SSL and/or by a fixed password.

+ **Remote daemon service:** This is the service that receives data from the agents. It makes use of the pre-shared keys to validate each agent's identity and to encrypt the communications between the agent and the manager.

- **Analysis daemon:** This is the process that performs data analysis. It utilizes decoders to identify the type of information being processed (e.g. Windows events, SSHD logs, web server logs, etc.) and then extract relevant data elements from the log messages (e.g. source ip, event id, user, etc.). Next, using rules, it can identify specific patterns in the decoded log records which could trigger alerts and possibly even call for automated countermeasures (active responses) like an IP ban on the firewall.

+ **RESTful API:** This provides an interface to manage and monitor the configuration and deployment status of agents. It is also used by the Wazuh web interface, which is a Kibana app.

All-in-one installation
-----------------------

The All-in-one installation guide will focus on the first installation type: all the components in the same host. Follow `this document <all_in_one>`_ to start configuring the All-in-one installation for non-production or small environments.


