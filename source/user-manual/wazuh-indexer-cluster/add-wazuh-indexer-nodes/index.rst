.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add new Wazuh indexer nodes to an existing all-in-one or distributed Wazuh indexer cluster.

Adding new Wazuh indexer nodes to a cluster
===========================================

Adding a new node to the Wazuh indexer cluster can enhance the capacity and resilience of the security monitoring infrastructure.

The upscale process involves creating certificates, configuring existing components to connect with the new Wazuh indexer node(s), and then installing and configuring the new node(s).

We have organized the steps for upscaling the Wazuh indexer into two subsections. The choice between these methods depends on your existing deployment and the infrastructure you aim to scale up.

-  :doc:`All-in-one deployment <all-in-one-deployment>`: If you have a Wazuh deployment with the indexer, manager, and dashboard on a single node, follow the steps in this section.

-  :doc:`Distributed deployment <distributed-deployment>`: For an existing distributed deployment, follow the steps in this section.

.. note::

   For high availability, a Wazuh indexer cluster needs at least three cluster-manager-eligible nodes. Electing a cluster manager requires a majority (quorum) of the voting nodes. In a two-node cluster, only one node takes part in the vote, so if that node fails, the cluster can't elect a cluster manager and stops accepting changes. A second node adds data redundancy (replica shards) but not cluster-manager fault tolerance. Use an odd number of cluster-manager-eligible nodes, and add a third node for production deployments.

   You need root user privileges to execute the commands below.

.. toctree::
   :titlesonly:
   :hidden:

   all-in-one-deployment
   distributed-deployment
   new-wazuh-indexer-node
