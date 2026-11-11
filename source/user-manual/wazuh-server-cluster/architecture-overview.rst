.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the architecture of a Wazuh manager cluster, with a master node, worker nodes, and a load balancer for the Wazuh agents.

Architecture overview
=====================

The following diagram shows a typical Wazuh server cluster architecture:

.. thumbnail:: /images/manual/wazuh-server/typical-server-cluster-architecture.png
   :title: Typical Wazuh server cluster architecture
   :alt: Typical Wazuh server cluster architecture
   :align: center
   :width: 80%

The cluster has one :ref:`master node <server-cluster-master-node>` and one or more :ref:`worker nodes <server-cluster-worker-node>`. Every node serves the same Wazuh agent API on port 1517, so Wazuh agents can report to any node. The master node also creates the agent identities and runs the Wazuh manager API. Each node sends its data to the Wazuh indexer.

A Wazuh 5.0 agent connects to a single address. To distribute the agents across the nodes and keep them connected when a node fails, point them to a :doc:`load balancer </user-manual/wazuh-server-cluster/load-balancers>` in front of the nodes.
