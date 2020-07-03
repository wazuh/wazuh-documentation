.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

Installation guide
==================

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

This section aims to guide the user through the process of installing the Wazuh-Elastic Stack and to explain the difference between two available kinds of deployment: the All-in-one and the Distributed. In this guide, `Open Distro for Elasticsearch <https://opendistro.github.io/>`_ and Kibana will be used. Open Distro for Elasticsearch is a fully open-source and `Apache-2.0-licensed` distribution of both Elasticsearch and Kibana.

Wazuh-Elastic Stack components
------------------------------

In the Installation guide, definitions are grouped depending on the granularity of the component, starting from the unique components and finishing in clusters:

Individual components
^^^^^^^^^^^^^^^^^^^^^

- ``Wazuh manager``: this component is in charge of analyzing the data received from the agents and triggering alerts when an event matches a rule (e.g. intrusion detected, file changed, a configuration not compliant with policy, possible rootkit, etc).

- ``Wazuh API``: this component provides an interface to manage and monitor the configuration and deployment status of the Wazuh agents and the Wazuh managers. It is also used by the Wazuh web user interface, which is the Wazuh Kibana plugin.

- ``Filebeat``: is a lightweight shipper for forwarding the Wazuh manager alerts to Elasticsearch. This guide will install ``Filebeat-oss``, which is fully open-source and `Apache 2.0-licensed`.

- ``Elasticsearch``: is a highly scalable full-text search and analytics engine. It will store all the alerts sent by the Wazuh manager. This guide will install ``Elasticsearch-oss``, which is fully open-source and `Apache 2.0-licensed`.

- ``Kibana``: is a data visualization dashboard for Elasticsearch. It provides visualization capabilities on top of the content indexed on an Elasticsearch cluster. Users can create bar, line and scatter plots, or pie charts and maps on top of large volumes of data. This guide will install ``Open Distro for Kibana``, which is fully open-source and `Apache 2.0-licensed`.

- ``Wazuh Kibana plugin``: lets users visualize and analyze Wazuh alerts stored in Elasticsearch. Provides statistics per Wazuh agent, search alerts, and filters using different visualizations. It integrates with the Wazuh API to retrieve information about the Wazuh managers and the Wazuh agents configuration, logs, ruleset, groups, and much more.

Grouped components
^^^^^^^^^^^^^^^^^^

- ``Wazuh server``: collects and analyzes data from deployed Wazuh agents and sends the alerts to Elasticsearch. It runs the Wazuh manager, the Wazuh API, and Filebeat.

- ``Elastic Stack``: the Open Distro for Elasticsearch and Kibana components can be installed on the same server. Both components working together are called Elastic Stack. It runs Kibana with the Wazuh Kibana plugin.

Clustered components
^^^^^^^^^^^^^^^^^^^^

- ``Single-node cluster``: this term is used for referring to those components that act within only one server; without communication with other servers running the same components. A Wazuh single-node cluster is a Wazuh manager server that is not connected to other Wazuh manager nodes. Similar criteria can be applied to Elasticsearch nodes.

- ``Multi-node cluster``: this term is used for referring to those components that are installed in two or more separated servers and that are configured to act together to provide high availability and load balancing. A Wazuh multi-node cluster consists on two or more servers with Wazuh servers installed on them that synchronize their data with each other. The same definition can be applied to Elasticsearch nodes. A multi-node cluster provides high availability, scalability, and load balancing for data indexing and searching. With the multi-node clusters Wazuh infrastructure can scale as much as needed.

Supported operating systems
---------------------------

The Wazuh server and Elastic Stack components can be installed in the following Linux operating systems:

- Amazon Linux 1 and 2.

- CentOS 6 or greater.

- Debian 7 or greater.

- Fedora 22 or greater.

- Oracle Linux 6 or greater.

- Red Hat Enterprise Linux 6 or greater.

- Ubuntu 12 or greater.

Types of deployment
-------------------

The Installation guide is divided into two independent sections, :ref:`All-in-one deployment <all_in_one_index>` and  :ref:`Distributed deployment <distributed_index>`. Each section contains an introduction, which presents the architecture of the deployed environment and explains what steps will be done apart from the components installation. It also provides minimal hardware requirements. The user will choose between two types of installation guides:

- ``Unattended``: automated installation guide. Requires the initial input of the information needed to accomplish the process using a script.

- ``Step by step``: manual installation guide. Each step has a description which helps to understand the process.

+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                   | All-in-one deployment                                                                                                                                    | Distributed deployment                                                                                                                                                                                                     |
+===================================================+==========================================================================================================================================================+============================================================================================================================================================================================================================+
| Purpose                                           | Appropriate for testing and small production environments                                                                                                | Ensure the high availability and scalability of all the components                                                                                                                                                         |
+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| High availability and scalability of the services | Lacks the high availability and scalability of the services as all the components are installed on the same server                                       | Provides the high availability and scalability of the services as all the components are installed on the different servers. Kibana can be installed on the same server as the Elasticsearch node, or on a separate one.   |
+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Hardware requirements                             | Lower costs as requires only one server. The detailed hardware requirements for All-in-one deployment can be found :ref:`here <all_in_one_requirements>` | Higher costs as requires a separate server for each component installed. The detailed hardware requirements for Distributed deployment can be found :ref:`here <distributed_requirements>`                                 |
+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Security of data transfer                         | Ensures the security of data transfer by providing self-generated certificates                                                                           | Ensures the security of data transfer by providing self-generated certificates                                                                                                                                             |
+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Start deploying Wazuh server and Elastic Stack
----------------------------------------------

.. toctree::
    :maxdepth: 2

    all-in-one-deployment/index
    distributed-deployment/index
