.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Wazuh manager cluster, how its nodes work together, and how to add nodes and balance Wazuh agent connections.

Wazuh server cluster
====================

The Wazuh server cluster consists of multiple Wazuh manager nodes: one master node and any number of worker nodes. This deployment strategy provides horizontal scalability and improves performance. In an environment with many endpoints to monitor, combine it with a :doc:`load balancer </user-manual/wazuh-server-cluster/load-balancers>`, so Wazuh agents reach the cluster through one address and their connections are distributed across the nodes.

Every Wazuh 5.0 manager is a cluster node, even when it runs alone: a single Wazuh manager is a master node with no worker nodes.

.. topic:: Content

   .. toctree::
      :titlesonly:

      architecture-overview
      security-requirements
      types-of-nodes
      how-server-cluster-works
      cluster-nodes-configuration
      data-synchronization
      certificates-deployment
      adding-new-server-nodes/index
      agent-connections
      load-balancers
