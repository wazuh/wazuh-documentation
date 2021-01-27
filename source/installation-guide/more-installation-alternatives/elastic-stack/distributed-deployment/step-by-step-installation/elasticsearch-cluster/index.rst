.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh

.. _basic_elasticsearch_cluster:


Elasticsearch cluster
=====================

The Elastic Stack can be installed as a single-node cluster or as a multi-node cluster. The single-node installation will be performed in only one host where Open Distro for Elasticsearch will be installed. The multi-node installation consists of the installation of several Elastic Stack nodes in different hosts that will communicate between them. This kind of installation provides high availability and load balancing.

.. toctree::
    :maxdepth: 1

    elasticsearch-single-node-cluster
    elasticsearch-multi-node-cluster

