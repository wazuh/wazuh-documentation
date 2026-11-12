.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn which files and data a Wazuh manager cluster synchronizes from the master node to the worker nodes.

.. _wazuh_manager_cluster_data_synchronization:

Data synchronization
====================

The Wazuh manager cluster copies agent identities, enrollment credentials, and group configuration from the master node to every worker node. With that data, any node accepts a Wazuh agent, sends it the right configuration, and processes its events.

Synchronized files
------------------

The master node is the source of every synchronized file. Each worker node compares its copy with the master node every 9 seconds and receives the files that are missing or different. The worker node also deletes synchronized files that the master node doesn't have.

+-----------------------------------------+-----------------------------------------------------------------------------+-----------------------------+
| **Path**                                | **Files**                                                                   | **Mode on the worker node** |
+=========================================+=============================================================================+=============================+
| ``/etc/wazuh-manager/``                 | ``client.keys``, ``authd.pass``, and ``enrollment_tokens.json``.            | ``0660``.                   |
+-----------------------------------------+-----------------------------------------------------------------------------+-----------------------------+
| ``/etc/wazuh-manager/shared/``          | Every file, recursively. The directory holds the agent group configuration. | ``0660``.                   |
+-----------------------------------------+-----------------------------------------------------------------------------+-----------------------------+
| ``/var/wazuh-manager/var/multigroups/`` | ``merged.mg`` files, recursively.                                           | ``0660``.                   |
+-----------------------------------------+-----------------------------------------------------------------------------+-----------------------------+

The cluster skips ``wazuh-manager.conf`` and any file that ends in ``~``, ``.tmp``, ``.lock``, or ``.swp``.

These files serve the following purposes:

-  ``client.keys`` lets every node authenticate the Wazuh agents that the master node enrolled.
-  ``authd.pass`` and ``enrollment_tokens.json`` let every node accept enrollment requests with a password or an enrollment token.
-  The ``shared`` directory and the ``merged.mg`` files let every node send each Wazuh agent the configuration of its groups.

Synchronized agent data
-----------------------

Agent status and group assignments travel through the node databases instead of files. Each node keeps them in its local :doc:`wazuh-manager-db </user-manual/reference/daemons/wazuh-manager-db>` database.

-  **Agent information**: Every 10 seconds, each worker node sends the status, last keep-alive, and metadata of its agents to the master node.
-  **Agent groups**: Every 10 seconds, the master node sends new group assignments to every worker node. Each worker node checks its table against the master node and requests a full copy when the checksums keep differing.

The ``wazuh-manager-remoted`` daemon on each node caches the group membership of its agents. It refreshes the cache from the local database every 60 seconds by default. A group change can take up to one more minute to reach the agents of a node.

Data the cluster doesn't synchronize
------------------------------------

The cluster synchronizes only the files and data listed on this page. Every other file stays local to each node, and you manage it on every node.

Each node keeps the following items for itself:

-  The ``/etc/wazuh-manager/wazuh-manager.conf`` configuration file
-  The TLS certificates in ``/etc/wazuh-manager/certs/``
-  The certificate authority and local credentials in ``/etc/wazuh-manager/ca/``, ``/etc/wazuh-manager/export/``, and ``/etc/wazuh-manager/local.env``
-  The role-based access control database of the Wazuh manager API
-  Custom Wazuh signed packages (WPK) in ``/var/wazuh-manager/var/upgrade/``
-  Task tracking data in ``/var/wazuh-manager/queue/tasks/``
-  The internal options in ``/etc/wazuh-manager/wazuh-manager-internal-options.conf``

Custom decoders and key-value databases (KVDBs), which replace constant database (CDB) lists, don't travel through the cluster either. The Wazuh indexer stores them, and the engine on each node pulls them from it. Detection rules run in the Wazuh indexer, so the nodes hold no rules to synchronize.

Synchronization delays
----------------------

A change on the master node reaches the worker nodes after a short delay. During that delay, a request that lands on a worker node can fail and then succeed on retry.

-  A newly enrolled Wazuh agent is known to the master node at once and to the worker nodes a few seconds later.
-  A new enrollment token or a new enrollment password reaches the worker nodes on the next synchronization cycle.
-  A group change reaches the worker nodes on the next agent-groups cycle.

Wazuh agents recover on their own once the data arrives. For the responses that an agent receives during these delays behind a load balancer, see :ref:`Troubleshooting a load-balanced cluster <wazuh_manager_cluster_troubleshooting_a_load_balanced_cluster>`.

