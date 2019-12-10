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

Start deploying Wazuh and Elastic Stack
---------------------------------------

Start deploying the Elasticsearch cluster by choosing one of the following guide depending of your needs:

+----------------------------+-----------------------------------------------------------------------------+
| Elasticsearch cluster type | Guide                                                                       |
+============================+=============================================================================+
| Single-node cluster        | :ref:`Elasticsearch single-node cluster<elasticsearch_single_node_cluster>` |
+----------------------------+-----------------------------------------------------------------------------+
| Multi-node cluster         | :ref:`Elasticsearch multi-node cluster<elasticsearch_multi_node_cluster>`   |
+----------------------------+-----------------------------------------------------------------------------+

.. note::
  Before installing the components, please confirm that the time synchronization service is configured and working on your servers. This is most commonly done with **NTP**.  For more information, go to `Debian/Ubuntu <https://help.ubuntu.com/lts/serverguide/NTP.html>`_ or `CentOS/RHEL/Fedora/Amazon Linux/Oracle Linux/OpenSUSE/SUSE <http://www.tecmint.com/install-ntp-server-in-centos/>`_.

