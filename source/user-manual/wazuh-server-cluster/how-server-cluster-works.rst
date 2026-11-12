.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the wazuh-manager-clusterd daemon connects the master and worker nodes of a Wazuh manager cluster and which tasks it runs.

How the Wazuh manager cluster works
===================================

The ``wazuh-manager-clusterd`` daemon runs on every node and manages communication between the master and worker nodes. Its connections and periodic tasks keep the cluster synchronized and determine what appears in the cluster logs.

Cluster connections
-------------------

Each worker node opens its own connection to the master node using the address specified in ``<nodes><node>`` and the port specified in ``<port>``. The master node accepts these connections and pushes data to workers over them. A problem with one worker node does not affect the connections or synchronization of other workers.

The cluster encrypts all traffic between nodes. Both ends derive per-connection keys from the shared ``<key>`` value. Therefore, every node must use the same key.

When a worker node connects, the master node validates the connection. The following table lists the conditions under which the master node refuses it.

+-----------------------------------------------------------------------------------+----------------+
| **Condition**                                                                     | **Error code** |
+===================================================================================+================+
| The worker node name has characters other than letters, digits, ``_``, and ``-``. | ``3060``       |
+-----------------------------------------------------------------------------------+----------------+
| A connected worker node already uses the same name.                               | ``3028``       |
+-----------------------------------------------------------------------------------+----------------+
| The worker node name equals the master node name.                                 | ``3029``       |
+-----------------------------------------------------------------------------------+----------------+
| The worker node ``<name>`` value differs from the master node cluster name.       | ``3030``       |
+-----------------------------------------------------------------------------------+----------------+
| The worker node runs a different Wazuh version.                                   | ``3031``       |
+-----------------------------------------------------------------------------------+----------------+

If a worker node uses a different key, the master node cannot decrypt its messages. It logs error ``3025`` and closes the connection. If the master node closes the connection before the handshake completes three times in a row, the worker node logs a warning. A worker node that loses its connection retries every 10 seconds.


.. thumbnail:: /images/manual/wazuh-server/server-cluster-diagram.png
   :title: Wazuh manager cluster diagram
   :alt: Wazuh manager cluster diagram
   :align: center
   :width: 80%

Periodic tasks
--------------

The daemon runs independent tasks on each node. These tasks use fixed intervals that you cannot change through the configuration.

+--------------------------+-------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| **Task**                 | **Runs on** | **Interval**                   | **Purpose**                                                                                                                                         |
+==========================+=============+================================+=====================================================================================================================================================+
| Keep alive               | Worker node | 60 s                           | Sends a keep-alive message to the master node. After two failed attempts in a row, the worker node disconnects.                                     |
+--------------------------+-------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Keep alive check         | Master node | 60 s                           | Closes the connection of a worker node that sent no keep-alive message for 120 s.                                                                   |
+--------------------------+-------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Integrity check and sync | Worker node | 9 s                            | Sends the metadata of the synchronized files to the master node. The master node returns the files that are missing, different, or extra.           |
+--------------------------+-------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Local integrity          | Master node | 8 s                            | Recalculates the BLAKE2b hash and modification time of the synchronized files once for all worker nodes.                                            |
+--------------------------+-------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Agent-info sync          | Worker node | 10 s                           | Sends the status, last keep-alive, and metadata of its agents to the master node database.                                                          |
+--------------------------+-------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Local agent-groups       | Master node | 10 s, after a 30 s start delay | Reads new agent group assignments from the master node database and sends them to every connected worker node.                                      |
+--------------------------+-------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Agent-groups receive     | Worker node | On each message                | Applies the group assignments and compares checksums with the master node. After five mismatches in a row, the worker node requests the full table. |
+--------------------------+-------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+

For the files and data these tasks move, see :ref:`Data synchronization <wazuh_manager_cluster_data_synchronization>`.

Local cluster socket
--------------------

Local processes reach the cluster through the ``/var/wazuh-manager/queue/sockets/cluster-internal.sock`` socket. The ``wazuh-manager-clusterd`` daemon creates it on every node with mode ``0660``.

-  The :doc:`cluster_control </user-manual/reference/tools/cluster-control>` tool and the Wazuh manager API use the socket for node lists, health data, and distributed API requests.
-  On a worker node, :doc:`wazuh-manager-authd </user-manual/reference/daemons/wazuh-manager-authd>` and :doc:`wazuh-manager-remoted </user-manual/reference/daemons/wazuh-manager-remoted>` use the socket to forward enrollment and group requests to the master node.

When the socket doesn't answer, the Wazuh manager daemons retry 10 times before they give up.

Wazuh indexer tasks
-------------------

The configuration schema requires ``<indexer><hosts>`` on every node. Therefore, the daemon also runs tasks that depend on the Wazuh indexer. It starts these tasks only when the Wazuh indexer is reachable.

-  Every node retrieves Active Response requests from the Wazuh indexer.
-  The master node updates the group and cluster name of disconnected agents in the indexed documents.
-  The master node takes periodic metrics snapshots.

If the daemon cannot load the ``<indexer>`` section, it logs ``Indexer configuration is unavailable; Indexer tasks will not be started.`` and skips these tasks.

Cluster logs
------------

The ``wazuh-manager-clusterd`` daemon writes all its messages to ``/var/wazuh-manager/logs/cluster.log`` on each node. Each message carries the name of the task that produced it, such as ``Integrity check`` or ``Agent-info sync``.

