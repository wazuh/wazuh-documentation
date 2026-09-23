.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Troubleshoot common Wazuh indexer cluster issues, including service startup failures, TLS handshake errors, cluster formation problems, and cluster health warnings.

Troubleshooting
===============

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Symptom
     - Action
   * - The service fails to start, and the log reports that memory locking was requested but could not be enabled.
     - Run ``systemctl show wazuh-indexer -p LimitMEMLOCK`` and confirm that it prints ``LimitMEMLOCK=infinity``. If it prints a different value, create the systemd drop-in described in :ref:`step 4 of Wazuh indexer cluster tuning <wazuh_indexer_cluster_tuning>`, run ``systemctl daemon-reload``, and restart the service. Verify with the memory locking check in the :doc:`Cluster management <cluster-management>` table.
   * - The service fails to start, and the log reports that the maximum number of virtual memory areas is too low.
     - Increase the kernel setting with ``sysctl -w vm.max_map_count=262144`` and persist it in ``/etc/sysctl.conf``.
   * - A node does not join the cluster, and the logs show TLS handshake or authentication errors between nodes.
     - Verify that ``plugins.security.nodes_dn`` on every node contains the exact Distinguished Name of every node certificate, and that the files in ``/etc/wazuh-indexer/certs`` are owned by ``wazuh-indexer`` with permissions ``400``.
   * - The cluster does not form, and the logs report that the cluster manager was not discovered.
     - Check that ``discovery.seed_hosts`` lists the correct addresses on every node, that port ``9300`` is open between the nodes, and that ``cluster.initial_cluster_manager_nodes`` was consistent across all nodes at the first bootstrap.
   * - The cluster health is yellow.
     - One or more replica shards are unassigned. This is not the expected state on any deployment, including a single-node one. Wazuh indices use ``index.auto_expand_replicas 0-1``, so a healthy single node reports green.

       Review ``GET _cat/shards/wazuh-*?v`` to find the unassigned shards.

       Run ``GET _cluster/allocation/explain?pretty`` for the reason, and confirm that all nodes are running and below the disk usage watermarks.
   * - The cluster health is red.
     - One or more primary shards are unassigned, and part of the data is unavailable. Check for stopped nodes and verify the available disk space on each node, since the disk usage watermarks stop shard allocation on almost-full nodes.
   * - The Wazuh indexer credentials were lost.
     - Run the :doc:`Wazuh passwords tool </user-manual/user-administration/password-management>` on any Wazuh indexer node to set a new password, for example, ``bash wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -u admin -p <NEW_PASSWORD>``, then update the Wazuh manager keystore and the Wazuh dashboard configuration.
