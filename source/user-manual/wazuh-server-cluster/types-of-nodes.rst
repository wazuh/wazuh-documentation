.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the master and worker nodes of a Wazuh manager cluster and the tasks of each.

Types of nodes in a Wazuh server cluster
========================================

There are two types of nodes in the Wazuh server cluster, set with the :ref:`node_type <reference_wazuh_manager_conf_cluster_node_type>` option:

-  Master node
-  Worker node

A Wazuh server cluster has only one master node. During :doc:`data synchronization </user-manual/wazuh-server-cluster/data-synchronization>`, data from the master node always takes precedence over data from worker nodes, which keeps the cluster consistent.

.. note::

   The cluster doesn't synchronize ``/etc/wazuh-manager/wazuh-manager.conf``. Apply a configuration change on each node, and restart that node.

.. _server-cluster-master-node:

Master node
-----------

The master node coordinates the cluster. It does the following:

-  Creates the identities of the Wazuh agents. A worker node forwards the enrollment requests it receives to the master node.
-  Creates enrollment tokens.
-  Runs the Wazuh manager API. ``wazuh-manager-control`` starts ``wazuh-manager-apid`` only on the master node, so agent deletion, group management, and every other API operation go through it.
-  Accepts the connections of the worker nodes on the cluster port, ``1516`` by default.

If the master node is down, the connected Wazuh agents keep sending events to the worker nodes, but enrollment and group changes stop.

.. _server-cluster-worker-node:

Worker node
-----------

A worker node does the following:

-  Forwards Wazuh agent enrollment requests to the master node.
-  Gets the synchronized files from the master node.
-  Receives and processes events from Wazuh agents.
-  Sends the status of its Wazuh agents to the master node.

If a synchronized file is changed on a worker node, the next synchronization replaces it with the master node's version.
