.. Copyright (C) 2020 Wazuh, Inc.

.. _basic_installation_guide:

Wazuh and Elastic Stack
=======================

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

This section aims to guide the user through the process of installing Wazuh. In this installation guide the basic license option of Elastic Stack will be used, this includes everything in the Open Source under Apache 2.0 version plus some extra capabilities like core Elastic Stack Security features, Kibana alerting and more.

One of two types of deployments may be chosen depending on the environment where these components will be installed: :ref:`all-in-one <basic_all_in_one_index>` or a :ref:`distributed <basic_distributed_index>`.


Wazuh components
----------------

In the Installation guide, definitions are grouped depending on the granularity of the component, starting from the unique components and finishing in clusters:

Individual components
^^^^^^^^^^^^^^^^^^^^^

- ``Wazuh manager``: This component is in charge of analyzing the data received from the agents and triggering alerts when an event matches a rule (e.g. intrusion detected, file changed, a configuration not compliant with policy, possible rootkit, etc).

- ``Wazuh API``: This component provides an interface to manage and monitor the configuration and deployment status of the Wazuh agents and the Wazuh managers. It is also used by the Wazuh web user interface, which is the Wazuh Kibana plugin. Starting with `Wazuh 4.0` the Wazuh API is embedded in the Wazuh manager.

- ``Filebeat``: Is a lightweight shipper for forwarding the Wazuh manager alerts to Elasticsearch.

- ``Elasticsearch``: Is a highly scalable full-text search and analytics engine. It will store all the alerts sent by the Wazuh manager. This guide will install Elasticsearch with basic license.

- ``Kibana``: Is a data visualization dashboard for Elasticsearch. It provides visualization capabilities on top of the content indexed on an Elasticsearch cluster. Users can create bar, line and scatter plots, or pie charts and maps on top of large volumes of data.

- ``Wazuh Kibana plugin``: Allows users to visualize and analyze Wazuh alerts stored in Elasticsearch. Provides statistics per Wazuh agent, search alerts, and filters using different visualizations. It integrates with the Wazuh API to retrieve information about the Wazuh managers and the Wazuh agents configuration, logs, ruleset, groups, and much more.

Grouped components
^^^^^^^^^^^^^^^^^^

- ``Wazuh server``: Collects and analyzes data from deployed Wazuh agents and sends the alerts to Elasticsearch. It runs the Wazuh manager, the Wazuh API, and Filebeat.

- ``Elastic Stack``: Elasticsearch and Kibana can be installed on the same server. Both components working together are called Elastic Stack. It runs Kibana with the Wazuh Kibana plugin.

Clustered components
^^^^^^^^^^^^^^^^^^^^

- ``Single-node cluster``: This term is used for referring to those components that act within only one server; without communication with other servers running the same components. A Wazuh single-node cluster is a Wazuh manager server that is not connected to other Wazuh manager nodes. Similar criteria can be applied to Elasticsearch nodes.

- ``Multi-node cluster``: This term is used for referring to those components that are installed in two or more separated servers and that are configured to act together to provide high availability and load balancing. A Wazuh multi-node cluster consists of two or more servers with Wazuh servers installed on them that synchronize their data with each other. The same definition can be applied to Elasticsearch nodes. A multi-node cluster provides high availability, scalability, and load balancing for data indexing and searching. With the multi-node clusters Wazuh infrastructure can scale as much as needed.


Deployment types
----------------

The Installation guide is divided into two independent sections, :ref:`all-in-one deployment <basic_all_in_one_index>` and :ref:`distributed deployment <basic_distributed_index>` according to the chosen configuration. Information about the minimal hardware requirements for the different deployments types can be found :ref:`here <installation_requirements>`. In each section, the user can choose between two types of installation:

- ``Unattended``: Automated installation. Requires the initial input of the information needed to accomplish the process using a script.

- ``Step by step``: Manual installation. Includes a detailed description of every step of the installation process.

+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                   | All-in-one deployment                                                                                                                                          | Distributed deployment                                                                                                                                                                                                     |
+===================================================+================================================================================================================================================================+============================================================================================================================================================================================================================+
| Purpose                                           | Appropriate for testing and small production environments.                                                                                                     | Ensure the high availability and scalability of all the components.                                                                                                                                                        |
+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| High availability and scalability of the services | Lacks the high availability and scalability of the services as all the components are installed on the same server.                                            | Provides the high availability and scalability of the services as all the components are installed on the different servers. Kibana can be installed on the same server as the Elasticsearch node, or on a separate one.   |
+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Hardware requirements                             | Lower costs as requires only one server.                                                                                                                       | Higher costs as requires a separate server for each component installed.                                                                                                                                                   |
+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Security of data transfer                         | Ensures the security of data transfer by providing self-generated certificates.                                                                                | Ensures the security of data transfer by providing self-generated certificates.                                                                                                                                            |
+---------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+


Start deploying Wazuh server and Elastic Stack
----------------------------------------------

.. toctree::
    :maxdepth: 2

    all-in-one-deployment/index
    distributed-deployment/index
