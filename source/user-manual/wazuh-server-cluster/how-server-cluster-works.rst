.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the wazuh-manager-clusterd daemon connects the nodes of a Wazuh manager cluster, which tasks it runs, and how to check the cluster.

How the Wazuh server cluster works
==================================

The ``wazuh-manager-clusterd`` daemon runs on every node and connects the nodes in a master-worker architecture. Each worker node opens the connection to the master node address set in the ``<nodes>`` option, and the master node answers and sends data over that connection. Each worker-master connection is independent: if a worker node becomes unavailable, the other worker nodes keep their connection and synchronization.

The cluster traffic is encrypted with keys derived from the cluster ``<key>`` for each connection. See :doc:`Security requirements </user-manual/wazuh-server-cluster/security-requirements>`.

The master node refuses a worker node in these cases. The worker node logs ``Could not connect to master: <ERROR>`` in its cluster log:

+-----------+-----------------------------------------------------------------------------------+
| Error     | Cause                                                                             |
+===========+===================================================================================+
| ``3060``  | The worker node name has characters other than letters, digits, ``_`` and ``-``.  |
+-----------+-----------------------------------------------------------------------------------+
| ``3028``  | A worker node with the same name is already connected.                            |
+-----------+-----------------------------------------------------------------------------------+
| ``3029``  | The worker node has the same name as the master node.                             |
+-----------+-----------------------------------------------------------------------------------+
| ``3030``  | The cluster ``<name>`` is different.                                              |
+-----------+-----------------------------------------------------------------------------------+
| ``3031``  | The Wazuh version is different.                                                   |
+-----------+-----------------------------------------------------------------------------------+

When the cluster ``<key>`` is different, the master node can't decrypt the messages of the worker node. It logs error ``3025``, ``Could not decrypt message``, and closes the connection. The worker node logs ``The master closed the connection`` and, after three attempts in a row, a warning that asks you to check the cluster key. A worker node that loses its connection tries again every 10 seconds.

Periodic tasks
--------------

The following tasks run at fixed intervals:

+---------------------------------+---------+----------+----------------------------------------------------------------------------------+
| Task                            | Node    | Interval | Description                                                                      |
+=================================+=========+==========+==================================================================================+
| Keep-alive                      | Worker  | 60 s     | Sends a keep-alive message to the master node. After two failed attempts in a    |
|                                 |         |          | row, the worker node disconnects.                                                |
+---------------------------------+---------+----------+----------------------------------------------------------------------------------+
| Keep-alive check                | Master  | 60 s     | Closes the connection of a worker node that has sent no keep-alive message for   |
|                                 |         |          | 120 seconds.                                                                     |
+---------------------------------+---------+----------+----------------------------------------------------------------------------------+
| Integrity                       | Worker  | 9 s      | Sends the checksums of its synchronized files to the master node, which sends    |
|                                 |         |          | back the missing and different files and the list of extra files to delete.      |
+---------------------------------+---------+----------+----------------------------------------------------------------------------------+
| Local integrity                 | Master  | 8 s      | Calculates the BLAKE2b hash and modification time of its synchronized files, so  |
|                                 |         |          | it doesn't repeat this for each worker node.                                     |
+---------------------------------+---------+----------+----------------------------------------------------------------------------------+
| Agent information               | Worker  | 10 s     | Sends the status, keep-alive and metadata of its Wazuh agents to the master      |
|                                 |         |          | node.                                                                            |
+---------------------------------+---------+----------+----------------------------------------------------------------------------------+
| Agent groups                    | Master  | 10 s     | Sends the new agent group assignments to every connected worker node. The task   |
|                                 |         |          | starts 30 seconds after the master node.                                         |
+---------------------------------+---------+----------+----------------------------------------------------------------------------------+

Local processes, such as ``cluster_control`` and the Wazuh manager API, reach the cluster through the ``/var/wazuh-manager/queue/sockets/cluster-internal.sock`` socket.

Cluster logs
------------

``wazuh-manager-clusterd`` writes its logs to ``/var/wazuh-manager/logs/cluster.log``. It rotates the file at midnight into ``/var/wazuh-manager/logs/cluster/<YEAR>/<MONTH>/cluster.log-<DAY>.gz``.

To increase the log level, set ``wazuh_clusterd.debug`` in ``/etc/wazuh-manager/wazuh-manager-internal-options.conf``, or run ``wazuh-manager-control enable debug``. See :ref:`Internal configuration <reference_internal_options>`.

Checking the cluster
--------------------

Run ``cluster_control`` on any node:

.. code-block:: console

   # /var/wazuh-manager/bin/cluster_control -l

The command lists the connected nodes, with their name, type, version, and address:

.. code-block:: none
   :class: output

   NAME          TYPE    VERSION  ADDRESS
   master-node   master  5.0.0    10.0.0.3
   worker-node1  worker  5.0.0    10.0.0.4

Other options:

-  ``-a`` lists the Wazuh agents with their ID, name, IP address, status, and version. Add ``-fs`` with ``active``, ``disconnected``, ``never_connected``, or ``pending`` to filter them.
-  ``-i`` shows the last synchronizations of each worker node. ``-i more`` shows a detailed report of every node.
-  ``-fn <NODE_NAME>`` limits ``-l`` or ``-i`` to the named nodes.
