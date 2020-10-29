.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _wazuh_cluster:


Wazuh server
============


The Wazuh server can be installed as a single-node cluster or as a multi-node cluster. The single-node installation will be performed in only one host where the Wazuh manager and Filebeat will be installed. The multi-node installation consists of the installation of several Wazuh server nodes in different hosts that will communicate between them. This kind of installation provides high availability and load balancing.

During the Elastic Stack installation, the certificates necessary to secure the communication will be created, so it is recommended to start by installing Elasticsearch. 


 .. toctree::
     :maxdepth: 1

     wazuh_single_node_cluster
     wazuh_multi_node_cluster
