.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh in production environment

.. _installation_guide_introduction:

Introduction
============


This section covers different options to set up Wazuh with Elastic Stack in a production environment. Although the guide :ref:`Quick start environment guide<installation_guide>` could be used in smalls production environments, it not designed for high availability, scalability, etc. This guide will help you to configure an environment with different levels of distribution and so, scalable environments with high availability.


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

Start deploying Wazuh server and Elastic Stack
----------------------------------------------

The guide starts with the Elasticsearch section. Once Elasticsearch is configured, the guide will drive you into the Wazuh cluster installation document. The following table shows the two Elasticsearch options depending on your needs:

+----------------------------+-----------------------------------------------------------------------------+
| Elasticsearch cluster type | Guide                                                                       |
+============================+=============================================================================+
| Single-node cluster        | :ref:`Elasticsearch single-node cluster<elasticsearch_single_node_cluster>` |
+----------------------------+-----------------------------------------------------------------------------+
| Multi-node cluster         | :ref:`Elasticsearch multi-node cluster<elasticsearch_multi_node_cluster>`   |
+----------------------------+-----------------------------------------------------------------------------+

After configured the Wazuh server - Elastic Stack environment, the Wazuh agent must be installed in every endpoint to be monitored. Follow the guide :ref:`Wazuh agent installation guide<installation_agents>` for start deploying the Wazuh agents.
