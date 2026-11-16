.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the master and worker node types of a Wazuh manager cluster and the tasks each node performs.

.. _wazuh_manager_cluster_types_of_nodes:

Types of nodes
==============

A Wazuh manager cluster has two node types: one master node and any number of worker nodes. The node type determines each node's role and which node's data takes precedence during synchronization.

You configure each node's type with the ``<node_type>`` option in the ``<cluster>`` section. The default value is ``master``. Therefore, a standalone Wazuh manager runs as a master node without any worker nodes.

A cluster can have only one master node. During synchronization, the master node's data takes precedence over the worker nodes' data. This rule keeps the cluster data consistent across all nodes.

.. note::

   The cluster doesn't synchronize ``/etc/wazuh-manager/wazuh-manager.conf``. Apply configuration changes on each node and restart the node to load them.

.. _wazuh_manager_cluster_master_node:

Master node
-----------

The master node coordinates the cluster and keeps critical data consistent across all nodes. It owns every operation that creates or changes an agent identity.

The master node performs these tasks:

-  Accepts the worker node connections on the cluster port, ``1516`` by default.
-  Creates the identity of every new Wazuh agent, including enrollment requests that worker nodes forward.
-  Mints enrollment tokens.
-  Runs the Wazuh manager API. The :doc:`wazuh-manager-control </user-manual/reference/tools/wazuh-manager-control>` script starts :doc:`wazuh-manager-apid </user-manual/reference/daemons/wazuh-manager-apid>` only on the master node.
-  Applies group changes and agent deletions, which go through the Wazuh manager API.
-  Replicates agent keys, enrollment credentials, and group configuration to the worker nodes.
-  Serves Wazuh agents like any worker node.

The following table shows which agent operations any node handles and which ones need the master node.

+-----------------------------------------------------------+-----------------------+---------------------------------------+
| **Operation**                                             | **Any node**          | **Master node only**                  |
+===========================================================+=======================+=======================================+
| Events, inventory, statistics, and configuration download | Yes.                  | No.                                   |
+-----------------------------------------------------------+-----------------------+---------------------------------------+
| Enrollment over port ``1517`` or legacy port ``1515``     | Accepted on any node. | The master node creates the identity. |
+-----------------------------------------------------------+-----------------------+---------------------------------------+
| Minting enrollment tokens                                 | No.                   | Yes.                                  |
+-----------------------------------------------------------+-----------------------+---------------------------------------+
| Group changes and agent deletion                          | No.                   | Yes, through the Wazuh manager API.   |
+-----------------------------------------------------------+-----------------------+---------------------------------------+

While the master node is down, enrollment and group changes stop. Wazuh agents that are already enrolled continue reporting to the worker nodes. The cluster does not elect a new master node because each node's role is fixed by its ``<node_type>`` setting.

To restore these operations, bring the master node back online. If you can't, promote a worker node. In its ``<cluster>`` section, set ``<node_type>`` to master, ``<bind_addr>`` to an address the other worker nodes reach, and ``<nodes><node>`` to its own address. Then restart it. On the other worker nodes, update ``<nodes><node>`` to point to the new master node, then restart them. Also, point the Wazuh dashboard to the new master node because only the master node runs the Wazuh manager API.

The cluster does not replicate the Wazuh manager API user database. Therefore, the promoted node uses the API passwords configured on that node during installation.

.. _wazuh_manager_cluster_worker_node:

Worker node
-----------

Worker nodes add processing capacity to the cluster. They serve Wazuh agents and rely on the master node for agent identity and group data.

A worker node performs the following tasks:

-  Forwards enrollment requests to the master node over the cluster connection.
-  Pulls synchronized files from the master node.
-  Receives and processes events from the Wazuh agents connected to it.
-  Sends agent status information to the master node.

If you modify a synchronized file on a worker node, the next synchronization cycle overwrites your changes with the master node's version.

Every node is installed as a master node by default. Therefore, a worker node retains its own Wazuh manager API database and the ``/etc/wazuh-manager/export/credentials.env`` file created during installation. However, the Wazuh manager API runs only on the master node. Do not use the worker node's API database or exported credentials. Use the passwords published by the master node instead.
