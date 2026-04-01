.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The node types define the tasks of each node within the Wazuh server cluster. Learn more in this section of the documentation.

Types of nodes in a Wazuh server cluster
========================================

There are two types of nodes in the Wazuh server cluster:

-  Master node
-  Worker node

The node types define the tasks of each node within the Wazuh server cluster and establish a hierarchy to determine which node's information takes precedence during :doc:`data synchronizations </user-manual/wazuh-server-cluster/data-synchronization>`. A Wazuh server cluster can only have one master node. During synchronizations, data from the master node always takes precedence over that from worker nodes. This ensures uniformity and consistency within the cluster.

.. note::

   Configuration changes to ``/var/ossec/etc/ossec.conf`` file on the master node are not automatically synchronized to the worker nodes. Manually replicate the configuration and restart the nodes to apply the changes.

.. _server-cluster-master-node:

Master node
-----------

The master node centralizes and coordinates worker nodes, ensuring the critical and required data is consistent across all nodes. It provides the centralization of the following:

-  Receiving and managing agent registration and deletion requests.
-  Creating shared configuration groups.
-  Updating custom rules, decoders, SCA policies and CDB lists.

The Wazuh agent registration details, shared configuration, CDB list, custom SCA policies, custom decoders, and rules are synchronized from the master to the workers, ensuring that all Wazuh server nodes have the same configuration and rulesets. During synchronization, every version of these files on the worker node is overwritten with the files from the master node.

.. _server-cluster-worker-node:

Worker node
-----------

A worker node executes data processing tasks and supports the master node by performing the following functions:

-  Redirecting Wazuh agent enrollment requests to the master node.
-  Synchronizing Wazuh agent registration details, shared configuration, CDB list, custom SCA policies, custom decoders, and rules from the master node.
-  Receiving and processing events from Wazuh agents.
-  Sending the Wazuh agent status update to the master node.

During synchronization, if any of the ``cluster-synchronized`` files on a worker node, such as agent keys, shared configuration, agent group assignments, custom rules, decoders, SCA policies, or CDB lists, are modified locally on the worker, those files are overwritten with the master node's versions in the next synchronization cycle.

