.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh manager cluster distributes Wazuh agent connections and event processing across master and worker nodes.

Wazuh manager cluster
=====================

The Wazuh manager cluster runs multiple Wazuh manager nodes as a single service. It distributes Wazuh agent connections and event processing across nodes, allowing the deployment to scale horizontally as you add endpoints.

Every Wazuh manager is a cluster node, even in a single-node deployment. A standalone Wazuh manager consists of one master node with no worker nodes. To scale the deployment, add worker nodes that connect to the master node.

You can combine the cluster with a network :ref:`load balancer <wazuh_manager_cluster_load_balancers_for_the_wazuh_manager_cluster>`. The load balancer provides a single address for the Wazuh agents and distributes their connections across the cluster nodes.

Cluster at a glance
-------------------

The cluster follows a set of rules that shape how you plan, secure, and scale it. The following sections explain each rule in detail.

-  A cluster has exactly one master node and any number of worker nodes.
-  The ``wazuh-manager-clusterd`` daemon runs on every node. Worker nodes connect to the master node on port ``1516`` by default.
-  The master node replicates agent keys, enrollment credentials, and group configuration to worker nodes.
-  Every node accepts Wazuh agent connections on HTTPS port ``1517``.
-  Only the master node creates agent identities and runs the Wazuh manager API.
-  Each node maintains its own configuration file and TLS certificates. The cluster does not replicate these files.


.. topic:: Contents

   The following pages explain the cluster, then show how to configure, scale, and connect it.

   .. toctree::
      :titlesonly:

      architecture-overview
      security-requirements
      how-server-cluster-works
      cluster-nodes-configuration
      data-synchronization
      certificates-deployment
      adding-new-server-nodes/index
      agent-connections
      load-balancers
      troubleshooting-load-balanced-cluster

