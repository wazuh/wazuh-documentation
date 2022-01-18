.. Copyright (C) 2022 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _basic_wazuh_cluster:


Wazuh cluster
=============

The Wazuh server can be installed as a single-node cluster or as a multi-node cluster. The single-node installation will be performed in only one host where the Wazuh manager, the Wazuh API, and Filebeat will be installed. The multi-node installation consists of the installation of several Wazuh server nodes in different hosts that will communicate between them. This kind of installation provides high availability and load balancing.


 .. toctree::
     :maxdepth: 1

     wazuh_single_node_cluster
     wazuh_multi_node_cluster
