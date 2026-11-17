.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add new Wazuh indexer nodes to an existing all-in-one or distributed Wazuh indexer cluster.

Adding new Wazuh indexer nodes to a cluster
===========================================

Adding a new node to the Wazuh indexer cluster can enhance the capacity and resilience of the security monitoring infrastructure.

The upscale process involves creating certificates, configuring existing components to connect with the new Wazuh indexer node(s), and then installing and configuring the new node(s).

We have organized the steps for upscaling the Wazuh indexer into three subsections. Follow :doc:`All-in-one deployment <all-in-one-deployment>` or :doc:`Distributed deployment <distributed-deployment>`, depending on your existing deployment, and then :doc:`New Wazuh indexer node <new-wazuh-indexer-node>` on the new node.

-  :doc:`All-in-one deployment <all-in-one-deployment>`: If you have a Wazuh deployment with the indexer, manager, and dashboard on a single node, follow the steps in this section.

-  :doc:`Distributed deployment <distributed-deployment>`: For an existing distributed deployment, follow the steps in this section.

-  :doc:`New Wazuh indexer node <new-wazuh-indexer-node>`: After either method, follow the steps in this section on the new Wazuh indexer node.

.. note::

   For high availability, a Wazuh indexer cluster needs at least three cluster-manager-eligible nodes. Electing a cluster manager requires a majority (quorum) of the voting nodes. In a two-node cluster, only one node takes part in the vote, so if that node fails, the cluster can't elect a cluster manager and stops accepting changes. A second node adds data redundancy (replica shards) but not cluster-manager fault tolerance. Use an odd number of cluster-manager-eligible nodes, and add a third node for production deployments.

   You need root user privileges to execute the commands below.

.. toctree::
   :titlesonly:
   :hidden:

   all-in-one-deployment
   distributed-deployment
   new-wazuh-indexer-node
