.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The node types define the tasks of each node within the Wazuh server cluster. Learn more in this section of the documentation.

Types of nodes in a Wazuh server cluster
========================================

There are two types of nodes in the Wazuh server cluster, the master node and the worker node. The node types define the tasks of each node within the Wazuh server cluster and establish a hierarchy to determine which node's information takes precedence during :doc:`data synchronizations </user-manual/wazuh-server-cluster/data-synchronization>`. A Wazuh server cluster can only have one master node, during synchronizations, the data from the master node always takes precedence over the data from worker nodes. This ensures uniformity and consistency within the cluster.

.. _server-cluster-master-node:

Master node
-----------

The master node centralizes and coordinates worker nodes, ensuring the critical and required data is consistent across all nodes. It provides the centralization of the following:

-  Receiving and managing agent registration and deletion requests.
-  Creating shared configuration groups.
-  Updating custom rules, decoders, SCA policies and CDB lists.

The Wazuh agent registration details, shared configuration, CDB list, custom SCA policies, custom decoders, and rules are synchronized from the master to the workers, ensuring that all nodes have the same configuration and rulesets. During synchronization, every version of these files on the worker node is overwritten with the files from the master node.

.. _server-cluster-worker-node:

Worker node
-----------

A worker node is responsible for:

-  Redirecting Wazuh agent enrollment requests to the master node.
-  Synchronizing Wazuh agent registration details, shared configuration, CDB list, custom SCA policies, custom decoders, and rules from the master node.
-  Receiving and processing events from Wazuh agents.
-  Sending the Wazuh agent status update to the master node.

During synchronization, If any of the shared files are modified on a worker node, their contents are overwritten with the master node's contents during the next synchronization.

