.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

Installation guide
==================

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

This section aims to guide the user through the process of installing Wazuh and its multiple components, beginning with a brief explanation of the different components and configurations available.

Wazuh components
----------------

In this section, definitions are grouped depending on the granularity of the component, starting from the individual components and ending with clustered components:

Individual components
^^^^^^^^^^^^^^^^^^^^^

- ``Wazuh manager``: This component is in charge of analyzing the security data received from Wazuh agents, cloud services and network devices. The Wazuh manager triggers alerts when an event matches a rule, for example, an intrusion detected, file changed, a configuration not being compliant with policy, possible rootkit, among others.

- ``Wazuh API``: This component provides an interface to manage and monitor the configuration and deployment status of the Wazuh agents and the Wazuh managers. It is also used by the Wazuh web user interface, which is the Wazuh Kibana plugin. Starting with `Wazuh 4.0` the Wazuh API is embedded in the Wazuh manager.

- ``Filebeat``: Is a lightweight data shipper used for forwarding the Wazuh manager alerts to Elasticsearch. It will enrich the data with the wazuh pipelines which include geoIP information and it will also configure the Wazuh index templates.

- ``Elasticsearch``: Is a highly scalable full-text search and analytics engine. It will store all the alerts sent by the Wazuh manager and securely expose this data to queries from tools like Kibana. Among many features Elasticsearch allows users to configure data replication, backup and lifecycle management.

- ``Kibana``: Is a data visualization dashboard for Elasticsearch provided over a web server with enterprise-grade security. It provides visualization capabilities on top of the content indexed on an Elasticsearch cluster. Users can seamlessly create many types of visualizations over large volumes of data, including bar, line and scatter plots, pie charts and maps. Additionally, management capabilities are included for Elasticsearch and is highly extensible with the use of plugins.

- ``Wazuh Kibana plugin``: Is an integration created by the Wazuh development team to visualize and analyze Wazuh alerts stored in Elasticsearch. Provides statistics per Wazuh agent, queries alerts, and filters using different visualizations. It integrates with the Wazuh API to manage the configuration and retrieve information about the Wazuh managers and the Wazuh agents, allowing users to query the current status of their environment as well as run on-demand scans and modify the ruleset and configuration of their Wazuh deployment.

Grouped components
^^^^^^^^^^^^^^^^^^

- ``Wazuh server``: Collects and analyzes security data from various sources in your environment, including deployed Wazuh agents, sends the alerts to Elasticsearch and executes additional integration and remediation actions. This server runs the Wazuh manager, the Wazuh API, and Filebeat.

- ``Elasticsearch server``: Receives the information from the Wazuh server, indexes and securely exposes it so it is made available for queries. A web interface is provided for accessing and managing this data. Kibana can be installed in the same server as Elasticsearch or in a different one. 

Clustered components
^^^^^^^^^^^^^^^^^^^^

- ``Single-node cluster``: This term is used for referring to those components that act within a single server; without communication with other servers running the same components. A Wazuh single-node cluster is a Wazuh manager server that is not connected to other Wazuh manager nodes. Similar criterion is applied to Elasticsearch nodes.

- ``Multi-node cluster``: This term is used for referring to those components that are installed in two or more separate servers and are configured to act together to provide high availability and load balancing. A Wazuh multi-node cluster consists of two or more servers with Wazuh servers installed on them that synchronize their data with each other. The same definition is applied to Elasticsearch nodes. A multi-node cluster provides high availability, scalability, and load balancing for data indexing and searching. By incorporating additional cluster nodes of Wazuh components, an infrastructure can scale to adapt to the needs of any environment.

Elasticsearch flavors
---------------------

The user can select among these two flavors of Elasticsearch the one that better suits their environment:

- Open Distro for Elasticsearch:  Is an Apache 2.0-licensed distribution of Elasticsearch enhanced with enterprise security, alerting, SQL support, automated index management, deep performance analysis, among other features. Open Distro for Elasticsearch is 100% open source and community driven.

- Elastic Stack:  In this installation guide, the basic license option will be used, this includes everything in the Open Source under Apache 2.0 version plus some extra capabilities like core Elastic Stack Security features, Kibana alerting and more.

Deployment types
----------------

- All-in-one deployment: In this case, Wazuh with Open Distro for Elasticsearch or Elastic Stack are installed in the same host, this type of deployment is suitable for testing and small working environments. 

- Distributed deployment: Each component is installed in a separate host and can also be installed in a multi-node cluster. This type of deployment allows the high availability and scalability of the product and is suitable for large working environments.  

Types of installation
---------------------

Once the desired configuration is selected the user can choose between two types of installation:

- Unattended installation: Uses scripts to automatically install and configure all the components.

- Step-by-step installation: A manual way of doing the installation that includes a detailed explanation of every step of the installation process.

Requirements
------------

This guide also includes a requirements section that specifies the supported operating systems and the minimum recommended hardware specifications to guarantee the expected performance.  

Packages list
-------------

This installation guide provides instructions to configure the official repositories to do the installations, alternatively, the installation can be done using packages.  A list of all the available packages can be found in the packages list section.  


.. toctree::
    :maxdepth: 1
    
    requirements
    open-distro/index
    basic/index
    packages-list
