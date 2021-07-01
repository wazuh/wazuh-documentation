.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: The Wazuh server can be installed as a single node cluster or as a multi-node cluster. Learn more about these two types of installation in our documentation. 

.. _wazuh_cluster:


Wazuh cluster
=============

The Wazuh server can be installed as a single-node cluster or as a multi-node cluster. The single-node installation is performed on only one host where the Wazuh manager, the Wazuh API, and Filebeat are installed. The multi-node installation process consists of installing several Wazuh server nodes on different hosts that communicate among them. This kind of installation provides high availability and load balancing.



 .. toctree::
     :maxdepth: 1

     wazuh_single_node_cluster
     wazuh_multi_node_cluster
