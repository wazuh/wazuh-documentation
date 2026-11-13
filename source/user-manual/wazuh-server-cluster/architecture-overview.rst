.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the architecture of a Wazuh manager cluster: its node types, ports, and how it scales.

Architecture overview
=====================

A Wazuh manager cluster consists of one :ref:`master node <wazuh_manager_cluster_master_node>` and any number of :ref:`worker nodes <wazuh_manager_cluster_worker_node>`. A single agent-facing address can route traffic to these nodes. Understanding how traffic reaches each node helps you plan network rules, certificates, and load balancing.


.. thumbnail:: /images/manual/wazuh-server/typical-server-cluster-architecture.png
   :title: Wazuh manager cluster architecture
   :alt: Wazuh manager cluster architecture
   :align: center
   :width: 80%

Each node in the cluster runs a complete Wazuh manager. The nodes share agent identities and group configuration through the cluster. Each node also sends its data directly to the Wazuh indexer.

-  **Wazuh agents** connect to any node, either directly or through a load balancer. Wazuh agents 5.x use the HTTPS agent API on port ``1517``.
-  **Worker nodes** receive and process events from the Wazuh agents connected to them. They forward enrollment requests to the master node over the cluster connection.
-  **The master node** serves Wazuh agents like any worker node. It also creates agent identities and runs the Wazuh manager API.
-  **The cluster connection** links each worker node to the master node. Worker nodes initiate connections to the master node, which uses them to push data to the workers.
-  **The Wazuh indexer** receives data from every node. Each node connects to the indexer using the :doc:`<indexer> </user-manual/reference/wazuh-manager-conf/indexer>` section in its own configuration.

Types of nodes
--------------

A Wazuh manager cluster has two node types: one master node and any number of worker nodes. The node type determines each node's role and which node's data takes precedence during synchronization.

You configure each node's type with the ``<node_type>`` option in the ``<cluster>`` section. The default value is ``master``. Therefore, a standalone Wazuh manager runs as a master node without any worker nodes.

A cluster can have only one master node. During synchronization, the master node's data takes precedence over the worker nodes' data. This rule keeps the cluster data consistent across all nodes.

.. note::

   The cluster doesn't synchronize ``/etc/wazuh-manager/wazuh-manager.conf``. Apply configuration changes on each node and restart the node to load them.

.. _wazuh_manager_cluster_master_node:

Master node
^^^^^^^^^^^

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
^^^^^^^^^^^

Worker nodes add processing capacity to the cluster. They serve Wazuh agents and rely on the master node for agent identity and group data.

A worker node performs the following tasks:

-  Forwards enrollment requests to the master node over the cluster connection.
-  Pulls synchronized files from the master node.
-  Receives and processes events from the Wazuh agents connected to it.
-  Sends agent status information to the master node.

If you modify a synchronized file on a worker node, the next synchronization cycle overwrites your changes with the master node's version.

Every node is installed as a master node by default. Therefore, a worker node retains its own Wazuh manager API database and the ``/etc/wazuh-manager/export/credentials.env`` file created during installation. However, the Wazuh manager API runs only on the master node. Do not use the worker node's API database or exported credentials. Use the passwords published by the master node instead.

Ports
-----

The following table lists the default ports used by a Wazuh manager cluster and identifies the nodes that listen on each port.

+-----------+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------+
| **Port**  | **Protocol**         | **Purpose**                                                                                                                                                       | **Listens on**                            |
+===========+======================+===================================================================================================================================================================+===========================================+
| ``1517``  | TCP, HTTPS           | Agent API for Wazuh agents 5.x: enrollment, events, and configuration download.                                                                                   | Every node.                               |
+-----------+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------+
| ``1514``  | TCP (default) or UDP | Legacy agent channel for Wazuh agents 4.x. Open only while the :doc:`<remote> </user-manual/reference/wazuh-manager-conf/remote>`\ ``<legacy>`` block is enabled. | Every node.                               |
+-----------+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------+
| ``1515``  | TCP, TLS             | Legacy enrollment for Wazuh agents 4.x. Worker nodes forward each request to the master node.                                                                     | Every node, when legacy enrollment is on. |
+-----------+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------+
| ``1516``  | TCP                  | Cluster connection between worker nodes and the master node. Never exposed to agents.                                                                             | Master node.                              |
+-----------+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------+
| ``55000`` | TCP, HTTPS           | Wazuh manager API.                                                                                                                                                | Master node.                              |
+-----------+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------+

Every node also connects to the Wazuh indexer, by default on port ``9200``.

.. note::

   The cluster port, the HTTPS agent port, the enrollment port, and the legacy agent port must be different. The Wazuh manager rejects a configuration where two active listeners share a port.

Scaling and availability
------------------------

Each worker node that you add increases the capacity of the cluster to serve Wazuh agents. Each worker node connects to the master node independently, so losing one worker does not affect the others. However, Wazuh agents connected directly to a failed worker cannot automatically switch to another node. They can reach another node through a load balancer that distributes connections across the cluster.

While the master node is down, existing Wazuh agents continue reporting to the worker nodes, but enrollment and group changes stop. To restore these operations, see :ref:`Master node <wazuh_manager_cluster_master_node>`.

To add nodes to an existing cluster, see :ref:`Adding Wazuh manager nodes <wazuh_manager_cluster_adding_wazuh_manager_nodes>`.

