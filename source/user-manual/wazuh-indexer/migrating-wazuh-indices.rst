.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to migrate Wazuh indices between Wazuh indexer clusters using snapshots in this section of the documentation.

Migrating Wazuh indices
=======================

This section focuses on migrating Wazuh indices by using snapshots. This helps to restore findings from one Wazuh indexer cluster to another without losing the original timestamp. We make use of two methods:

-  :ref:`Using a local repository <migrating_wazuh_indices_local_repository>`
-  :ref:`Using a shared file system (NFS) <migrating_wazuh_indices_nfs>`

.. _migrating_wazuh_indices_local_repository:

Using a local repository
------------------------

In this method, you set up a repository for storing snapshots on the source and destination Wazuh indexer nodes. Then, we copy the snapshots taken on the source Wazuh indexer to the destination Wazuh indexer and restore the snapshots to complete the Wazuh index migration.

.. note::

   This method works only when the source and destination Wazuh indexer clusters each have a single node. On a multi-node cluster, every node must read and write the same repository location. Use the method in :ref:`Using a shared file system (NFS) <migrating_wazuh_indices_nfs>` instead.

Create snapshot directory
^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following configuration on the source and destination Wazuh indexer nodes to set up the ``/mnt/snapshots`` directory to store snapshots.

#. Create a target directory for the snapshot repository in the ``/mnt`` directory:

   .. code-block:: console

      # mkdir /mnt/snapshots

#. Grant the ``wazuh-indexer`` user ownership of the ``/mnt/snapshots`` directory:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /mnt/snapshots

#. Add the configuration: ``path.repo: /mnt/snapshots`` to the ``/etc/wazuh-indexer/opensearch.yml`` file to specify the repository path. The Wazuh indexer already sets ``path.repo`` to ``/var/lib/wazuh-indexer/backup``. Add ``/mnt/snapshots`` to that line instead of adding a second ``path.repo`` line, because a second line stops the Wazuh indexer from starting with a ``Duplicate field 'path.repo'`` error:

   **Example:**

   .. code-block:: yaml
      :emphasize-lines: 19

      network.host: "127.0.0.1"
      node.name: "node-1"
      cluster.initial_cluster_manager_nodes:
      - "node-1"
      #- "node-2"
      #- "node-3"
      cluster.name: "wazuh-cluster"
      #discovery.seed_hosts:
      #  - "node-1-ip"
      #  - "node-2-ip"
      #  - "node-3-ip"
      node.max_local_storage_nodes: "3"
      path.data: /var/lib/wazuh-indexer
      path.logs: /var/log/wazuh-indexer
      # Default location for filesystem snapshot repositories, so one can be registered with no further
      # configuration. This is only a default: change or extend the list to keep backups elsewhere, for
      # example on a mounted volume. It applies to fs and url repositories; s3, azure and hdfs do not
      # use it. The directory ships empty.
      path.repo: ["/var/lib/wazuh-indexer/backup", "/mnt/snapshots"]

      plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/indexer.pem
      plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/indexer-key.pem
      plugins.security.ssl.http.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
      plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/indexer.pem
      plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/indexer-key.pem
      plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
      plugins.security.ssl.http.enabled: true
      # AEAD suites only
      plugins.security.ssl.http.enabled_ciphers:
      - "TLS_AES_128_GCM_SHA256"
      - "TLS_AES_256_GCM_SHA384"
      - "TLS_CHACHA20_POLY1305_SHA256"
      - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
      - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
      - "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
      - "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
      - "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
      - "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256"
      - "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256"
      - "TLS_DHE_RSA_WITH_AES_256_GCM_SHA384"
      - "TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
      plugins.security.ssl.transport.enabled_ciphers:
      - "TLS_AES_128_GCM_SHA256"
      - "TLS_AES_256_GCM_SHA384"
      - "TLS_CHACHA20_POLY1305_SHA256"
      - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
      - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
      - "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
      - "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
      - "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
      - "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256"
      - "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256"
      - "TLS_DHE_RSA_WITH_AES_256_GCM_SHA384"
      - "TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
      transport.ssl.enforce_hostname_verification: true
      transport.ssl.resolve_hostname: false

      # Filled in by resolve-credentials.sh with the DN of the admin certificate.
      plugins.security.authcz.admin_dn:
      - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=admin"
      plugins.security.check_snapshot_restore_write_privileges: true
      plugins.security.enable_snapshot_restore_privilege: true
      # Filled in by resolve-credentials.sh with the DN of this node's own certificate.
      plugins.security.nodes_dn:
      - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=wazuh-VirtualBox"
      plugins.security.restapi.roles_enabled:
      - "all_access"
      - "security_rest_api_access"

      # Store audit events in the security-auditlogs data stream
      plugins.security.audit.type: internal_opensearch_data_stream
      plugins.security.audit.config.data_stream.name: security-auditlogs

      plugins.security.system_indices.enabled: true
      plugins.security.system_indices.indices: [".opendistro-alerting-config", ".opendistro-alerting-alert*", ".opendistro-reports-*", ".opensearch-notifications-*", ".replication-metadata-store", ".wazuh-internal-state"]
      cluster.default_number_of_replicas: 0
      bootstrap.memory_lock: true

      # Resilience under heap pressure (small heaps, e.g. 2 GB): shed work — reject (429)
      # and cancel runaway searches instead of letting the JVM heap exhaust and crash.
      search_backpressure.mode: enforced                    # actually cancel heavy search tasks (default only logs)
      search_backpressure.search_shard_task.heap_percent_threshold: 0.04  # a shard task is a cancellation candidate from 4% of the heap (default 0.5%, ~10 MB on 2 GB), above the manager's inventory sync batches
      indices.breaker.total.use_real_memory: true           # account real heap used, not just reserved bytes
      indices.breaker.total.limit: 80%                      # trip early (default 95%); leaves headroom for Lucene flush/merge
      indexing_pressure.memory.limit: 10%                   # cap in-flight indexing bytes; reject excess bulk

      # Use no replicas by default on ISM internal indices
      plugins.index_state_management.history.number_of_replicas: 0

      # Default max scroll context keep alive
      search.max_keep_alive: "4h"

#. Restart the Wazuh indexer to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-indexer

   .. note::

      Make sure to confirm that the ``/mnt/snapshots`` directory has the ``wazuh-indexer:wazuh-indexer`` ownership on the Wazuh indexer nodes by running ``ls -ld /mnt/snapshots``.

.. _migrating_wazuh_indices_setup_snapshot_repository:

Set up snapshot repository
^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the source and destination Wazuh dashboards to configure the ``/mnt/snapshots`` directory as the snapshot storage location:

#. Click the **upper left menu ☰** > **Indexer management** > **Snapshot Management** > **Repositories**, and select **+ Create repository** to create a new snapshot repository.
#. Enter a repository name, select the repository type **Shared file system**, enter the repository location ``/mnt/snapshots``, and select **Add** to register the new repository.

   .. thumbnail:: /images/manual/wazuh-indexer/create-snapshot-repository.png
      :title: Create snapshot repository
      :alt: Create snapshot repository
      :align: center
      :width: 80%

Take snapshot
^^^^^^^^^^^^^

Perform the following steps on the source Wazuh dashboard to take a snapshot:

#. Click the **upper left menu ☰** > **Indexer management** > **Snapshot Management** > **Snapshots**.
#. Select **+ Take snapshot**, and enter a Snapshot name.
#. Click **Select or input indexes or index patterns**, and type ``wazuh-findings``. Wait for the list to load, then select the ``wazuh-findings*`` entry from the list. Don't select **Add wazuh-findings\*** as a custom option, because the Wazuh dashboard doesn't send custom options. If no index or pattern is selected when you select **Add**, the snapshot includes every index in the cluster. After the snapshot completes, open it on the **Snapshots** page and check that it lists only the ``.ds-wazuh-findings-v5-*`` indices.
#. Select the earlier created repository to store the snapshots.
#. **Optional**: Select **Advanced options** and check the **Include cluster state in snapshots** and **Ignore unavailable indices** option.

   .. thumbnail:: /images/manual/wazuh-indexer/include-cluster-state-option.png
      :title: Include cluster state in snapshots option
      :alt: Include cluster state in snapshots option
      :align: center
      :width: 80%

#. Select **Add** to create a new snapshot.

The snapshot files are saved in the repository location ``/mnt/snapshots`` on the source Wazuh indexer node.

Migrate snapshot
^^^^^^^^^^^^^^^^

Follow the steps below to migrate the Wazuh index snapshots from the source to the destination Wazuh indexer node.

Source Wazuh indexer node
~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps on the source Wazuh indexer node to archive and copy the snapshot files to the destination Wazuh indexer node:

#. Create a tar file ``snapshots.tar``, from the snapshot files in the ``/mnt/snapshots`` directory.

   .. code-block:: console

      # tar -C /mnt/snapshots -cvf snapshots.tar .

#. Copy the tar file to the destination Wazuh indexer node:

   .. code-block:: console

      # scp snapshots.tar <USERNAME>@<IP_ADDRESS>:.

   Replace:

   -  ``<USERNAME>``: with the username of the destination Wazuh indexer node.
   -  ``<IP_ADDRESS>``: with the IP address of the destination Wazuh indexer node.

Destination Wazuh indexer node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps on the destination Wazuh indexer node to unarchive the snapshot files and move them to the ``/mnt/snapshots`` directory:

#. Untar the ``snapshots.tar`` file. This command adds all the snapshot files to the ``/mnt/snapshots`` directory on the destination server.

   .. code-block:: console

      # tar -xvf <FULL_PATH>/snapshots.tar -C /mnt/snapshots

   Replace:

   -  ``<FULL_PATH>``: with the full path to ``snapshots.tar`` file on the destination Wazuh indexer node.

Restore snapshot
^^^^^^^^^^^^^^^^

To complete the Wazuh index migration, restore the snapshots taken from the source Wazuh indexer to the destination Wazuh indexer. Perform the following steps on the destination Wazuh dashboard:

.. note::

   It is necessary to have performed the steps in the :ref:`Set up a snapshot repository section <migrating_wazuh_indices_setup_snapshot_repository>` on the destination Wazuh cluster before proceeding to **Restore snapshots**.

#. Restart the Wazuh indexer node in the destination Wazuh cluster to load the snapshot files using the command:

   .. code-block:: console

      # systemctl restart wazuh-indexer

#. Click the **upper left menu ☰** > **Indexer management** > **Snapshot Management** > **Snapshots**, and select **Refresh** to reload the Snapshots page. The snapshot in the repository location ``/mnt/snapshots`` will show on the destination Wazuh dashboard.
#. Select the snapshot and click **Restore**.

   .. thumbnail:: /images/manual/wazuh-indexer/select-snapshot-restore.png
      :title: Select the snapshot and restore
      :alt: Select the snapshot and restore
      :align: center
      :width: 80%

#. Specify your preferred restore option to **Restore all indices in the snapshot** or **Restore specific indices**. Select your preferred option for renaming the indices, and select all that applies under **Advanced options**. If the snapshot includes the cluster state, clear **Restore cluster state from snapshots**. It's selected by default, and the restore then fails with a ``security_exception`` (403).

   .. thumbnail:: /images/manual/wazuh-indexer/restore-snapshot-advanced-options.png
      :title: Restore snapshot advanced options
      :alt: Restore snapshot advanced options
      :align: center
      :width: 80%

#. Click **Restore snapshot** to complete the migration process.

.. note::

   The destination Wazuh indexer already has its own ``wazuh-findings-v5-*`` data streams, because the Setup module creates them at startup. The Wazuh dashboard can only restore them as renamed, hidden, plain indices (for example ``restored_.ds-wazuh-findings-v5-other-000001``), even when you select **Do not rename**. These indices don't match the ``wazuh-findings*`` index pattern. To restore the findings as data streams under their original names, use **Indexer management** > **Dev Tools** on the destination node. The first request deletes any findings already stored on the destination:

   .. code-block:: none

      DELETE _data_stream/wazuh-findings-v5-*

   Run the second request to restore the findings.

   .. code-block:: none
      :emphasize-lines: 1

      POST _snapshot/<REPOSITORY_NAME>/<SNAPSHOT_NAME>/_restore
      {
        "indices": "wazuh-findings-v5-*",
        "include_global_state": false
      }

   Replace ``<REPOSITORY_NAME>`` and ``<SNAPSHOT_NAME>`` with their respective values.

.. _migrating_wazuh_indices_nfs:

Using a shared file system (NFS)
--------------------------------

To migrate Wazuh indices, we also use a Network File System (NFS) to create a shared file system for the snapshot repository. A dedicated endpoint is used to install and configure NFS, and the source and destination Wazuh indexer nodes are connected to the shared file system. This allows the destination Wazuh indexer node to access the snapshots and restore it to complete the Wazuh indices migration.

NFS server
^^^^^^^^^^

Perform the following steps to set up NFS on a dedicated endpoint:

#. Create a target directory for the snapshot repository in the ``/mnt`` directory:

   .. code-block:: console

      # mkdir /mnt/snapshots

#. Install NFS by running the following commands:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum update
            # yum install -y nfs-utils
            # systemctl enable nfs-server
            # systemctl start nfs-server

      .. group-tab:: APT

         .. code-block:: console

            # apt -y install nfs-kernel-server
            # systemctl start nfs-kernel-server.service

#. Add the ``/mnt/snapshots`` directory to the ``/etc/exports`` file using the command below. Replace the ``<NETWORK_ADDRESS/CIDR>`` variable with your network address.

   .. code-block:: console

      # echo "/mnt/snapshots <NETWORK_ADDRESS/CIDR>(rw,sync,no_root_squash,no_subtree_check)" | sudo tee -a /etc/exports

   For example:

   .. code-block:: console

      # echo "/mnt/snapshots 192.168.0.0/24(rw,sync,no_root_squash,no_subtree_check)" | sudo tee -a /etc/exports

   Where:

   -  ``rw`` - Allows both read and write access to the shared directory.
   -  ``sync`` - Forces the NFS server to write changes to the disk immediately, making the file system synchronous.
   -  ``no_root_squash`` - Allows the "root" user on the NFS client system to have full, unrestricted access to files on the NFS server.
   -  ``no_subtree_check`` - Disables subtree checking, which can improve performance for large directory trees.

#. Apply the NFS configuration:

   .. code-block:: console

      # exportfs -a

Wazuh indexer
^^^^^^^^^^^^^

Perform the following steps on the source and destination Wazuh indexer nodes to complete the shared file system setup.

#. Create a target directory for the snapshot repository in the ``/mnt`` directory:

   .. code-block:: console

      # mkdir /mnt/snapshots

#. Install the NFS client:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install nfs-utils

      .. group-tab:: APT

         .. code-block:: console

            # apt -y install nfs-common

#. Mount the shared directory ``/mnt/snapshots`` on the Wazuh indexer node(s). Replace the ``<NFS_SERVER_IP>`` variable with the IP address of the NFS server:

   .. code-block:: console

      # mount -t nfs <NFS_SERVER_IP>:/mnt/snapshots /mnt/snapshots

#. Grant the ``wazuh-indexer`` user ownership of the ``/mnt/snapshots`` directory:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /mnt/snapshots

#. Add the configuration: ``path.repo: /mnt/snapshots`` to the ``/etc/wazuh-indexer/opensearch.yml`` file to specify the repository path. The Wazuh indexer already sets ``path.repo`` to ``/var/lib/wazuh-indexer/backup``. Add ``/mnt/snapshots`` to that line instead of adding a second ``path.repo`` line, because a second line stops the Wazuh indexer from starting with a ``Duplicate field 'path.repo'`` error. Edit only that line, as in the following example. Don't replace the rest of the file, because it contains this node's name, certificate DNs, and audit settings:

   **Example:**

   .. code-block:: yaml
      :emphasize-lines: 19

      network.host: "127.0.0.1"
      node.name: "node-1"
      cluster.initial_cluster_manager_nodes:
      - "node-1"
      #- "node-2"
      #- "node-3"
      cluster.name: "wazuh-cluster"
      #discovery.seed_hosts:
      #  - "node-1-ip"
      #  - "node-2-ip"
      #  - "node-3-ip"
      node.max_local_storage_nodes: "3"
      path.data: /var/lib/wazuh-indexer
      path.logs: /var/log/wazuh-indexer
      # Default location for filesystem snapshot repositories, so one can be registered with no further
      # configuration. This is only a default: change or extend the list to keep backups elsewhere, for
      # example on a mounted volume. It applies to fs and url repositories; s3, azure and hdfs do not
      # use it. The directory ships empty.
      path.repo: ["/var/lib/wazuh-indexer/backup", "/mnt/snapshots"]

      plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/indexer.pem
      plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/indexer-key.pem
      plugins.security.ssl.http.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
      plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/indexer.pem
      plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/indexer-key.pem
      plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
      plugins.security.ssl.http.enabled: true
      # AEAD suites only
      plugins.security.ssl.http.enabled_ciphers:
      - "TLS_AES_128_GCM_SHA256"
      - "TLS_AES_256_GCM_SHA384"
      - "TLS_CHACHA20_POLY1305_SHA256"
      - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
      - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
      - "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
      - "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
      - "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
      - "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256"
      - "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256"
      - "TLS_DHE_RSA_WITH_AES_256_GCM_SHA384"
      - "TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
      plugins.security.ssl.transport.enabled_ciphers:
      - "TLS_AES_128_GCM_SHA256"
      - "TLS_AES_256_GCM_SHA384"
      - "TLS_CHACHA20_POLY1305_SHA256"
      - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
      - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
      - "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
      - "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
      - "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
      - "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256"
      - "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256"
      - "TLS_DHE_RSA_WITH_AES_256_GCM_SHA384"
      - "TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
      transport.ssl.enforce_hostname_verification: true
      transport.ssl.resolve_hostname: false

      # Filled in by resolve-credentials.sh with the DN of the admin certificate.
      plugins.security.authcz.admin_dn:
      - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=admin"
      plugins.security.check_snapshot_restore_write_privileges: true
      plugins.security.enable_snapshot_restore_privilege: true
      # Filled in by resolve-credentials.sh with the DN of this node's own certificate.
      plugins.security.nodes_dn:
      - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=wazuh-VirtualBox"
      plugins.security.restapi.roles_enabled:
      - "all_access"
      - "security_rest_api_access"

      # Store audit events in the security-auditlogs data stream
      plugins.security.audit.type: internal_opensearch_data_stream
      plugins.security.audit.config.data_stream.name: security-auditlogs

      plugins.security.system_indices.enabled: true
      plugins.security.system_indices.indices: [".opendistro-alerting-config", ".opendistro-alerting-alert*", ".opendistro-reports-*", ".opensearch-notifications-*", ".replication-metadata-store", ".wazuh-internal-state"]
      cluster.default_number_of_replicas: 0
      bootstrap.memory_lock: true

      # Resilience under heap pressure (small heaps, e.g. 2 GB): shed work — reject (429)
      # and cancel runaway searches instead of letting the JVM heap exhaust and crash.
      search_backpressure.mode: enforced                    # actually cancel heavy search tasks (default only logs)
      search_backpressure.search_shard_task.heap_percent_threshold: 0.04  # a shard task is a cancellation candidate from 4% of the heap (default 0.5%, ~10 MB on 2 GB), above the manager's inventory sync batches
      indices.breaker.total.use_real_memory: true           # account real heap used, not just reserved bytes
      indices.breaker.total.limit: 80%                      # trip early (default 95%); leaves headroom for Lucene flush/merge
      indexing_pressure.memory.limit: 10%                   # cap in-flight indexing bytes; reject excess bulk

      # Use no replicas by default on ISM internal indices
      plugins.index_state_management.history.number_of_replicas: 0

      # Default max scroll context keep alive
      search.max_keep_alive: "4h"

#. Restart the Wazuh indexer to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-indexer

   .. note::

      Make sure to confirm that the ``/mnt/snapshots`` directory has the ``wazuh-indexer:wazuh-indexer`` ownership on the Wazuh indexer nodes by running ``ls -ld /mnt/snapshots``.

.. _migrating_wazuh_indices_setup_snapshot_repository_nfs:

Set up snapshot repository
^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the source and destination Wazuh dashboards to configure the ``/mnt/snapshots`` directory as the snapshot storage location:

#. Click the **upper left menu ☰** > **Indexer management** > **Snapshot Management** > **Repositories**, and select **+ Create repository** to create a new snapshot repository.
#. Enter a repository name, select the repository type **Shared file system**, enter the repository location ``/mnt/snapshots``, and select **Add** to register the new repository.

   .. thumbnail:: /images/manual/wazuh-indexer/create-snapshot-repository.png
      :title: Create snapshot repository
      :alt: Create snapshot repository
      :align: center
      :width: 80%

Take snapshot
^^^^^^^^^^^^^

Perform the following steps on the source Wazuh dashboard to take a snapshot:

#. Click the **upper left menu ☰** > **Indexer management** > **Snapshot Management** > **Snapshots**.
#. Select **+ Take snapshot**, and enter a Snapshot name.
#. Click **Select or input indexes or index patterns**, and type ``wazuh-findings``. Wait for the list to load, then select the ``wazuh-findings*`` entry from the list. Don't select **Add wazuh-findings\*** as a custom option, because the Wazuh dashboard doesn't send custom options. If no index or pattern is selected when you select **Add**, the snapshot includes every index in the cluster. After the snapshot completes, open it on the **Snapshots** page and check that it lists only the ``.ds-wazuh-findings-v5-*`` indices.
#. Select the earlier created repository to store the snapshots.
#. **Optional**: Select **Advanced options** and check the **Include cluster state in snapshots** and **Ignore unavailable indices** option.

   .. thumbnail:: /images/manual/wazuh-indexer/include-cluster-state-option.png
      :title: Include cluster state in snapshots option
      :alt: Include cluster state in snapshots option
      :align: center
      :width: 80%

#. Select **Add** to create a new snapshot.

The snapshot files are saved in the repository location ``/mnt/snapshots`` on the source Wazuh indexer node.

Restore snapshot
^^^^^^^^^^^^^^^^

To complete the Wazuh index migration, restore the snapshots taken from the source Wazuh indexer to the destination Wazuh indexer. Perform the following steps on the destination Wazuh dashboard:

.. note::

   It is necessary to have performed the steps in the :ref:`Set up a snapshot repository section <migrating_wazuh_indices_setup_snapshot_repository_nfs>` on the destination Wazuh cluster before proceeding to **Restore snapshots**.

#. Restart the Wazuh indexer node in the destination Wazuh cluster to load the snapshot files using the command:

   .. code-block:: console

      # systemctl restart wazuh-indexer

#. Click the **upper left menu ☰** > **Indexer management** > **Snapshot Management** > **Snapshots**, and select **Refresh** to reload the Snapshots page. The snapshot in the repository location ``/mnt/snapshots`` will show on the destination Wazuh dashboard.
#. Select the snapshot and click **Restore**.

   .. thumbnail:: /images/manual/wazuh-indexer/select-snapshot-restore.png
      :title: Select the snapshot and restore
      :alt: Select the snapshot and restore
      :align: center
      :width: 80%

#. Specify your preferred restore option to **Restore all indices in the snapshot** or **Restore specific indices**. Select your preferred option for renaming the indices, and select all that applies under **Advanced options**. If the snapshot includes the cluster state, clear **Restore cluster state from snapshots**. It's selected by default, and the restore then fails with a ``security_exception`` (403).

   .. thumbnail:: /images/manual/wazuh-indexer/restore-snapshot-advanced-options.png
      :title: Restore snapshot advanced options
      :alt: Restore snapshot advanced options
      :align: center
      :width: 80%

#. Click **Restore snapshot** to complete the migration process.

.. note::

   The destination Wazuh indexer already has its own ``wazuh-findings-v5-*`` data streams, because the Setup module creates them at startup. The Wazuh dashboard can only restore them as renamed, hidden, plain indices (for example ``restored_.ds-wazuh-findings-v5-other-000001``), even when you select **Do not rename**. These indices don't match the ``wazuh-findings*`` index pattern. To restore the findings as data streams under their original names, use **Indexer management** > **Dev Tools** on the destination node. The first request deletes any findings already stored on the destination:

   .. code-block:: none

      DELETE _data_stream/wazuh-findings-v5-*

   Run the second request to restore the findings.

   .. code-block:: none
      :emphasize-lines: 1

      POST _snapshot/<REPOSITORY_NAME>/<SNAPSHOT_NAME>/_restore
      {
        "indices": "wazuh-findings-v5-*",
        "include_global_state": false
      }

   Replace ``<REPOSITORY_NAME>`` and ``<SNAPSHOT_NAME>`` with their respective values.
