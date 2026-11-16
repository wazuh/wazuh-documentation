.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add a Wazuh manager node to an all-in-one or distributed deployment to scale a Wazuh manager cluster.

.. _wazuh_manager_cluster_adding_wazuh_manager_nodes:

Adding Wazuh manager nodes
==========================

You can scale the Wazuh manager cluster horizontally by adding worker nodes. Additional nodes share the event load of a larger Wazuh agent fleet. With a load balancer in front of the cluster, agents also keep reporting when one node fails.

Every Wazuh 5.x manager is already a cluster node. A manager installed on its own is a master node with no workers. A new worker turns that master into a multi-node cluster.

Requirements for a new node
---------------------------

A new node joins the cluster only when it matches the master node on these points. A worker that breaks one of the first four requirements doesn't join, and ``/var/wazuh-manager/logs/cluster.log`` names the error code.

+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| **Requirement**                                                               | **Why it matters**                                                                                                            |
+===============================================================================+===============================================================================================================================+
| The same Wazuh version as the master node.                                    | The master refuses a worker with a different version (error ``3031``).                                                        |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| The same ``<key>`` in the ``<cluster>`` block.                                | The master node can't decrypt the messages of a worker node with another key. It logs error 3025 and closes the connection.   |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| The same ``<name>`` in the ``<cluster>`` block.                               | The master refuses a worker from another cluster (error ``3030``).                                                            |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| A unique ``<node_name>`` made of letters, digits, ``_``, and ``-.``           | The master refuses a duplicate name, its own name, or a name with other characters (errors ``3028``, ``3029``, and ``3060``). |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Certificates issued by the root certificate authority (CA) of the deployment. | Agents trust one CA. A node issued from another CA fails TLS for every agent that reaches it.                                 |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Network access to the master node on TCP port ``1516.``                       | Every worker opens its cluster connection to the master on this port.                                                         |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+

The cluster doesn't synchronize ``/etc/wazuh-manager/wazuh-manager.conf`` or the certificates in ``/etc/wazuh-manager/certs/``. You configure and provision each node on its own.

Choose the procedure for your deployment
----------------------------------------

The steps depend on how you installed Wazuh. The difference is where the root CA of the deployment lives and how the Wazuh indexer is exposed.

-  **All-in-one deployment**: The Wazuh indexer, Wazuh manager, and Wazuh dashboard run on one endpoint. You installed them with the installation assistant ``-a`` option or the all-in-one step-by-step guide. See :ref:`Add a Wazuh manager node to all-in-one deployments <wazuh_manager_cluster_add_a_wazuh_manager_node_to_all_in_one_deployments>`.
-  **Distributed deployment**: The components run on separate endpoints, and the root CA depends on how you installed them. See :ref:`Add a Wazuh manager node to distributed deployments <wazuh_manager_cluster_add_a_wazuh_manager_node_to_distributed_deployments>`.

After the new node joins the cluster, put the cluster behind a load balancer so agents reach every node through one address.

.. toctree::
   :titlesonly:
   :hidden:

   all-in-one-deployment
   distributed-deployment
