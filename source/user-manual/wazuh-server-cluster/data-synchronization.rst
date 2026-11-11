.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn which files the Wazuh manager cluster synchronizes from the master node to the worker nodes, and which ones each node keeps on its own.

Data synchronization
====================

The master node synchronizes the files that any node needs to accept and serve Wazuh agents. Every file goes from the master node to the worker nodes:

+--------------------------------------------------+-------------------------------------------------------------------------+
| Path                                             | Files                                                                   |
+==================================================+=========================================================================+
| ``/etc/wazuh-manager/``                          | ``client.keys``, the Wazuh agent keys. ``authd.pass``, the enrollment   |
|                                                  | password. ``enrollment_tokens.json``, the enrollment tokens.            |
+--------------------------------------------------+-------------------------------------------------------------------------+
| ``/etc/wazuh-manager/shared/``                   | Every file, recursively: the shared configuration of the agent groups.  |
+--------------------------------------------------+-------------------------------------------------------------------------+
| ``/var/wazuh-manager/var/multigroups/``          | ``merged.mg`` files, recursively: the configuration of agents that      |
|                                                  | belong to several groups.                                               |
+--------------------------------------------------+-------------------------------------------------------------------------+

Each worker node compares its files with the master node every 9 seconds and gets the missing and different ones. A new Wazuh agent or enrollment token is therefore unknown to the worker nodes for a few seconds. The worker nodes also send the status of their Wazuh agents, such as the last keep-alive, to the master node every 10 seconds, and the master node sends the agent group assignments to the worker nodes.

The cluster doesn't synchronize anything else. Each node keeps its own copy of the following:

-  ``/etc/wazuh-manager/wazuh-manager.conf``. Apply a configuration change on each node.
-  ``/etc/wazuh-manager/certs/``, ``/etc/wazuh-manager/ca/``, ``/etc/wazuh-manager/export/`` and ``/etc/wazuh-manager/local.env``. See :doc:`Certificates deployment </user-manual/wazuh-server-cluster/certificates-deployment>`.
-  The Wazuh manager API database, ``/var/wazuh-manager/api/configuration/security/rbac.db``. Only the master node uses it.
-  ``/var/wazuh-manager/var/upgrade/``. Place a custom WPK package on every node before you upgrade Wazuh agents with it.
-  ``/var/wazuh-manager/queue/tasks/``. Each node tracks its own task delivery.

The Wazuh 5.0 manager doesn't keep rules, decoders, CDB lists, or SCA policies on the nodes. The Wazuh manager gets its detection content from the Wazuh indexer.
