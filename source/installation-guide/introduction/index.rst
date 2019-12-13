.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh in production environment

.. _installation_guide_introduction:

Introduction
============


This section covers different options to set up Wazuh with Elastic Stack in a production environment. Although the guide :ref:`Quick start environment guide<installation_guide_aio>` could be used in smalls production environments, it not designed for high available, scalable, environments. This guide will help you to configure an environment with different levels of distribution and so, scalable environments with high availability.


Community
---------

.. include:: ../../_templates/installations/introduction/community.rst

Supported platforms
-------------------

.. include:: ../../_templates/installations/introduction/supported_platforms.rst

Wazuh cloud (SAAS)
------------------

.. include:: ../../_templates/installations/introduction/wazuh_saas.rst

Basic concepts
--------------

.. include:: ../../_templates/installations/introduction/basics.rst

Architecture
------------

The following image resume the architecture possibilities referring to single-node or multi-node cluster in Wazuh and Elasticsearch.

.. thumbnail:: ../../images/installation/installing_wazuh_basic_production.png
    :title: Elastic ports diagram
    :align: center
    :width: 100%

On the left side, the set of wazuh agents is represented. The Wazuh agents can communicate with the Wazuh cluster through a load balancer but it is not required, the load balancer can be removed.

On the center, it is represented the Wazuh cluster, which can be one a single-node Wazuh cluster (only one server with Wazuh server installed) or it can be two or more Wazuh managers distributed in two or more servers. Only the master Wazuh cluster node will have the Wazuh API. All the servers will have Filebeat installed.

On the right side, it is represented the Elasticsearch cluster. An Elasticsearch cluster may consist of one or more nodes.

On the right bottom side Kibana. This component will retrieve data from both clusters, Wazuh and Elasticsearch. It will show data in a comprehensive way.

Start deploying Wazuh server and Elastic Stack
----------------------------------------------

The guide starts with the Elasticsearch section. Once Elasticsearch is configured, the guide will drive you into the Wazuh cluster installation document.
There are two Elasticsearch configuration type: single node cluster or multi-node cluster. Follow one option depending of your needs:

- :ref:`Elasticsearch single-node cluster<elasticsearch_single_node_cluster>`
- :ref:`Elasticsearch multi-node cluster<elasticsearch_multi_node_cluster>`

After configured the Wazuh server - Elastic Stack environment, the Wazuh agent must be installed in every endpoint to be monitored. Follow the guide :ref:`Wazuh agent installation guide<installation_agents>` for start deploying the Wazuh agents.
