.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Wazuh indexer cluster architecture and the node roles available in a Wazuh indexer cluster.

Cluster architecture and node types
===================================

You can deploy the Wazuh indexer as a single-node instance or as a multi-node cluster. A multi-node cluster provides high availability and horizontal scalability. In a multi-node cluster, a cluster manager is elected from the cluster manager-eligible nodes to coordinate cluster-wide operations. By default, every node stores data and serves queries.

Wazuh indexer nodes run with the following roles by default:

+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| Node role                 | Description                                                                                                                                       |
+===========================+===================================================================================================================================================+
| ``cluster_manager``       | Eligible for election as the cluster manager. The elected node maintains the cluster state, tracks nodes, and decides where shards are allocated. |
+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| ``data``                  | Stores shards and executes data-related operations such as indexing, search, and aggregations.                                                    |
+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| ``ingest``                | Runs ingest pipelines that pre-process documents before indexing.                                                                                 |
+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| ``remote_cluster_client`` | Allows the node to act as a client to remote clusters, for example, for cross-cluster search.                                                     |
+---------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
