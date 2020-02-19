.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh in production environment

.. _installation_guide_introduction:

Introduction
============


This section covers different options to set up Wazuh with Elastic Stack in a production environment. Although the :ref:`Jumpstart to Wazuh<all_in_one>` guide could be used in small production environments, it not designed for high availability, scalable, environments. This section will help you to configure an environment with different levels of distribution and, in consequence, scalable environments with high availability.


Community
---------

.. include:: ../../_templates/installations/introduction/community.rst

Supported platforms
-------------------

.. include:: ../../_templates/installations/introduction/supported_platforms.rst

Wazuh cloud (SaaS)
------------------

.. include:: ../../_templates/installations/introduction/wazuh_saas.rst

Basic concepts
--------------

.. include:: ../../_templates/installations/introduction/basics.rst

Architecture
------------

The following image summarizes the architecture possibilities with regards to single-node or multi-node cluster in Wazuh and Elasticsearch.

.. thumbnail:: ../../images/installation/installing_wazuh_basic_production.png
    :title: Elastic ports diagram
    :align: center
    :width: 100%

This architecture diagram represents a Wazuh - Elastic Stack production environment. The set of Wazuh agents (on the left) may communicate with the Wazuh cluster through a load balancer, but this is not required and may be omitted.

The Wazuh cluster (center) can be configured as a single-node cluster (only one server with a Wazuh manager installed) or a multi-node cluster (two or more Wazuh managers distributed over two or more servers). Only the master Wazuh cluster node will have the Wazuh API installed. All the Wazuh cluster servers will have Filebeat installed.

An Elasticsearch cluster (right side) may consist of one or more nodes.

Kibana (above Elasticsearch cluster) will retrieve data from both clusters, Wazuh and Elasticsearch. It will show data in a comprehensive way.


Start deploying Wazuh server and Elastic Stack
----------------------------------------------

The guide starts with the Elasticsearch section. Once Elasticsearch is configured, the guide will drive you into the Wazuh cluster installation document.
There are two Elasticsearch configuration types: single node cluster or multi-node cluster. Follow the option that meets your needs:

- :ref:`Elasticsearch single-node cluster<elasticsearch_single_node_cluster>`
- :ref:`Elasticsearch multi-node cluster<elasticsearch_multi_node_cluster>`
