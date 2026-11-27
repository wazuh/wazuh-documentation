.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to migrate Wazuh indices between Wazuh indexer clusters using snapshots in this section of the documentation.

Migrating Wazuh indices
=======================


This section focuses on migrating Wazuh indices by using snapshots. This helps to restore findings from one Wazuh indexer cluster to another without losing the original timestamp. There are two methods:

-  :ref:`Using a local repository <migrating_wazuh_indices_local_repository>`
-  :ref:`Using a shared file system (NFS) <migrating_wazuh_indices_nfs>`

.. _migrating_wazuh_indices_local_repository:

Using a local repository
------------------------

In this method, you set up a repository for storing snapshots on the source and destination Wazuh indexer nodes. Then, you copy the snapshots taken on the source Wazuh indexer to the destination Wazuh indexer and restore the snapshots to complete the Wazuh index migration.

.. note::

   This method works only when the source and destination Wazuh indexer clusters each have a single node. On a multi-node cluster, every node must read and write the same repository location. Use the method in :ref:`Using a shared file system (NFS) <migrating_wazuh_indices_nfs>` instead.

Snapshot repository directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer package sets ``path.repo`` to ``/var/lib/wazuh-indexer/backup`` in ``/etc/wazuh-indexer/opensearch.yml`` and creates the directory empty, owned by ``wazuh-indexer:wazuh-indexer`` with mode ``750``. A filesystem snapshot repository can only be registered under a directory listed in ``path.repo``, so you can register one in this directory from the Wazuh dashboard or the Wazuh indexer API without editing ``opensearch.yml`` or restarting the Wazuh indexer. In the Wazuh indexer Docker image, the directory is ``/usr/share/wazuh-indexer/backup``.

.. note::

   An upgrade keeps the existing ``opensearch.yml`` file, so a node installed before this setting existed might not have it. The upgrade creates the directory. On DEB-based systems, the package manager offers its own copy of the file during the upgrade. On RPM-based systems, the new file is saved as ``/etc/wazuh-indexer/opensearch.yml.rpmnew``. If ``/etc/wazuh-indexer/opensearch.yml`` has no ``path.repo`` line, add ``path.repo: ["/var/lib/wazuh-indexer/backup"]`` to it on every Wazuh indexer node, then restart the Wazuh indexer with ``systemctl restart wazuh-indexer``. The setting is read only at startup.

.. note::

   The ``/var/lib/wazuh-indexer/backup`` directory is on the data disk. Snapshots stored there count toward the Wazuh indexer disk watermarks, and they don't survive the loss of that disk. For snapshots that must survive it, use a different location.

Using a different location
~~~~~~~~~~~~~~~~~~~~~~~~~~

To store snapshots in another directory, for example ``/mnt/snapshots``, perform the following steps on the source and destination Wazuh indexer nodes. Use a location outside ``/etc/wazuh-indexer``, ``/usr/share/wazuh-indexer``, ``/var/lib/wazuh-indexer``, and ``/var/log/wazuh-indexer``, which the Wazuh indexer package manages. To use the default directory, skip to Set up snapshot repository.

#. Create a target directory for the snapshot repository in the ``/mnt`` directory:

   .. code-block:: console

      # mkdir /mnt/snapshots

#. Grant the ``wazuh-indexer`` user ownership of the ``/mnt/snapshots`` directory:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /mnt/snapshots

#. Add the configuration: ``path.repo: /mnt/snapshots`` to the ``/etc/wazuh-indexer/opensearch.yml`` file to specify the repository path. The Wazuh indexer already sets ``path.repo`` to ``/var/lib/wazuh-indexer/backup``. Add ``/mnt/snapshots`` to that line instead of adding a second ``path.repo`` line, because a second line stops the Wazuh indexer from starting with a ``Duplicate field 'path.repo'`` error:

   **Example:**

   .. code-block:: yaml

      path.repo: ["/var/lib/wazuh-indexer/backup", "/mnt/snapshots"]

#. Restart the Wazuh indexer to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-indexer

   .. note::

      Make sure to confirm that the ``/mnt/snapshots`` directory has the ``wazuh-indexer:wazuh-indexer`` ownership on the Wazuh indexer nodes by running ``ls -ld /mnt/snapshots``.

.. _migrating_wazuh_indices_setup_snapshot_repository:

Set up snapshot repository
^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the source and destination Wazuh dashboards to register the snapshot repository directory as the snapshot storage location:

#. Click the **upper left menu ☰** > **Indexer management** > **Snapshot Management** > **Repositories**, and select **+ Create repository** to create a new snapshot repository.
#. Enter a repository name, select the repository type **Shared file system**, enter the repository location ``/var/lib/wazuh-indexer/backup``, or the directory you added to ``path.repo``, and select **Add** to register the new repository.

   .. thumbnail:: /images/manual/wazuh-indexer/local-create-snapshot-repository.png
      :title: Create snapshot repository
      :alt: Create snapshot repository
      :align: center
      :width: 80%

Take snapshot
^^^^^^^^^^^^^

Perform the following steps on the source Wazuh dashboard to take a snapshot:

#. Click the **upper left menu ☰** > **Indexer management** > **Snapshot Management** > **Snapshots**.
#. Select **+ Take snapshot**, and enter a Snapshot name.
#. Click **Select or input source indexes or index patterns**, and type ``wazuh-findings``. Wait for the list to load, then click the ``wazuh-findings*`` entry in the list. If no index or pattern is selected when you select **Add**, the snapshot includes every index in the cluster. After the snapshot completes, open it on the Snapshots page and check that it lists only the .ds-wazuh-findings-v5-\* indices.
#. Select the earlier created repository to store the snapshots.
#. **Optional**: Select **Advanced options** and check the **Include cluster state in snapshots** and **Ignore unavailable indices** option.

   .. thumbnail:: /images/manual/wazuh-indexer/local-include-cluster-state-option.png
      :title: Include cluster state in snapshots option
      :alt: Include cluster state in snapshots option
      :align: center
      :width: 80%

#. Select **Add** to create a new snapshot.

The snapshot files are saved in the repository location ``/var/lib/wazuh-indexer/backup`` on the source Wazuh indexer node.

Migrate snapshot
^^^^^^^^^^^^^^^^

Follow the steps below to migrate the Wazuh index snapshots from the source to the destination Wazuh indexer node. The commands use the default ``/var/lib/wazuh-indexer/backup`` directory. If you use a different location, replace it with that location.

Source Wazuh indexer node
~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps on the source Wazuh indexer node to archive and copy the snapshot files to the destination Wazuh indexer node:

#. Create a tar file ``snapshots.tar``, from the snapshot files in the ``/var/lib/wazuh-indexer/backup`` directory.

   .. code-block:: console

      # tar -C /var/lib/wazuh-indexer/backup -cvf snapshots.tar .

#. Copy the tar file to the destination Wazuh indexer node:

   .. code-block:: console

      # scp snapshots.tar <USERNAME>@<IP_ADDRESS>:.

   Replace:

   -  ``<USERNAME>``: with the username of the destination Wazuh indexer node.
   -  ``<IP_ADDRESS>``: with the IP address of the destination Wazuh indexer node.

Destination Wazuh indexer node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps on the destination Wazuh indexer node to unarchive the snapshot files and move them to the ``/var/lib/wazuh-indexer/backup`` directory:

#. Untar the ``snapshots.tar`` file. This command adds all the snapshot files to the ``/var/lib/wazuh-indexer/backup`` directory on the destination server.

   .. code-block:: console

      # tar -xvf <FULL_PATH>/snapshots.tar -C /var/lib/wazuh-indexer/backup

   Replace:

   -  ``<FULL_PATH>``: with the full path to ``snapshots.tar`` file on the destination Wazuh indexer node.

Restore snapshot
^^^^^^^^^^^^^^^^

To complete the Wazuh index migration, restore the snapshots taken from the source Wazuh indexer to the destination Wazuh indexer. Perform the following steps on the destination Wazuh dashboard:

.. note::

   Perform the steps in the :ref:`Set up snapshot repository <migrating_wazuh_indices_setup_snapshot_repository>` section on the destination Wazuh cluster before you restore the snapshot.

#. Click the **upper left menu ☰** > **Indexer management** > **Snapshot Management** > **Snapshots**, and select **Refresh** to reload the Snapshots page. The snapshot in the repository location ``/var/lib/wazuh-indexer/backup`` will show on the destination Wazuh dashboard.
#. Select the snapshot and click **Restore**.

   .. thumbnail:: /images/manual/wazuh-indexer/local-select-snapshot-restore.png
      :title: Select the snapshot and restore
      :alt: Select the snapshot and restore
      :align: center
      :width: 80%

#. Specify your preferred restore option to **Restore all indices in the snapshot** or **Restore specific indices**. Select your preferred option for renaming the indices, and select all that applies under **Advanced options**. If the snapshot includes the cluster state, clear **Restore cluster state from snapshots**. It's selected by default, and the restore then fails with a ``security_exception`` (403).

   .. thumbnail:: /images/manual/wazuh-indexer/local-restore-snapshot-advanced-options.png
      :title: Restore snapshot advanced options
      :alt: Restore snapshot advanced options
      :align: center
      :width: 80%

#. Click **Restore snapshot** to complete the migration process.

.. note::

   The destination Wazuh indexer already has its own ``wazuh-findings-v5-*`` data streams, because the Setup module creates them at startup. The Wazuh dashboard can only restore them as renamed, hidden, plain indices (for example ``restored_.ds-wazuh-findings-v5-other-000001``), even when you select **Do not rename**. These indices don't match the ``wazuh-findings*`` index pattern. To restore the findings as data streams under their original names, use **Indexer management** > **Dev Tools** on the destination node. The first request deletes any findings already stored on the destination:

   .. code-block:: none

      DELETE _data_stream/wazuh-findings-v5-*

   Run the second request to restore the findings. The request names the backing indices as well as the data streams. With the data stream pattern alone, the restore fails with 403 Forbidden (no permissions for []).

   .. code-block:: none
      :emphasize-lines: 1

      POST _snapshot/<REPOSITORY_NAME>/<SNAPSHOT_NAME>/_restore
      {
        "indices": "wazuh-findings-v5-*,.ds-wazuh-findings-v5-*",
        "include_global_state": false
      }

   Replace ``<REPOSITORY_NAME>`` and ``<SNAPSHOT_NAME>`` with their respective values.

.. _migrating_wazuh_indices_nfs:

Using a shared file system (NFS)
--------------------------------

To migrate Wazuh indices, you can also use a Network File System (NFS) to create a shared file system for the snapshot repository. A dedicated endpoint is used to install and configure NFS, and the source and destination Wazuh indexer nodes are connected to the shared file system. This allows the destination Wazuh indexer node to access the snapshots and restore it to complete the Wazuh indices migration. Mount the shared file system at the same path on every Wazuh indexer node, and list that path in ``path.repo``. An ``fs`` repository on a cluster must be one shared file system mounted at the same path on every node. Use a location outside ``/etc/wazuh-indexer``, ``/usr/share/wazuh-indexer``, ``/var/lib/wazuh-indexer``, and ``/var/log/wazuh-indexer``, which the Wazuh indexer package manages. This guide uses ``/mnt/snapshots``.

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

      # echo "/mnt/snapshots <NETWORK_ADDRESS/CIDR>(rw,sync,no_root_squash,no_subtree_check)" | tee -a /etc/exports

   For example:

   .. code-block:: console

      # echo "/mnt/snapshots 192.168.0.0/24(rw,sync,no_root_squash,no_subtree_check)" | tee -a /etc/exports

   Where:

   -  ``rw`` - Allows both read and write access to the shared directory.
   -  ``sync`` - Forces the NFS server to write changes to the disk immediately, making the file system synchronous.
   -  ``no_root_squash`` - Allows the "root" user on the NFS client system to have full, unrestricted access to files on the NFS server. Any root user on a host in ``<NETWORK_ADDRESS/CIDR>`` can then read and change the snapshots, so limit the export to the addresses of the Wazuh indexer nodes.
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

#. Mount the shared directory ``/mnt/snapshots`` on the Wazuh indexer nodes. Replace the ``<NFS_SERVER_IP>`` variable with the IP address of the NFS server:

   .. code-block:: console

      # mount -t nfs <NFS_SERVER_IP>:/mnt/snapshots /mnt/snapshots

#. Grant the ``wazuh-indexer`` user ownership of the ``/mnt/snapshots`` directory:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /mnt/snapshots

#. Add the configuration: ``path.repo: /mnt/snapshots`` to the ``/etc/wazuh-indexer/opensearch.yml`` file to specify the repository path. The Wazuh indexer already sets ``path.repo`` to ``/var/lib/wazuh-indexer/backup``. Add ``/mnt/snapshots`` to that line instead of adding a second ``path.repo`` line, because a second line stops the Wazuh indexer from starting with a ``Duplicate field 'path.repo'`` error. Edit only that line, as in the following example. Don't replace the rest of the file, because it contains this node's name, certificate DNs, and audit settings:

   **Example:**

   .. code-block:: yaml

      path.repo: ["/var/lib/wazuh-indexer/backup", "/mnt/snapshots"]

#. Restart the Wazuh indexer to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-indexer

   .. note::

      Make sure to confirm that the ``/mnt/snapshots`` directory has the ``wazuh-indexer:wazuh-indexer`` ownership on the Wazuh indexer nodes by running ``ls -ld /mnt/snapshots``. The ``wazuh-indexer`` user and group must have the same UID and GID on every Wazuh indexer node, because each node writes to the shared file system as its own ``wazuh-indexer`` account. Check them by running ``id wazuh-indexer`` on each node.

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
#. Click **Select or input source indexes or index patterns**, and type ``wazuh-findings``. Wait for the list to load, then click the ``wazuh-findings*`` entry in the list. If no index or pattern is selected when you select Add, the snapshot includes every index in the cluster. After the snapshot completes, open it on the **Snapshots** page and check that it lists only the ``.ds-wazuh-findings-v5-*`` indices.
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

   Perform the steps in the :ref:`Set up snapshot repository <migrating_wazuh_indices_setup_snapshot_repository_nfs>` section on the destination Wazuh cluster before you restore the snapshot.

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

   Run the second request to restore the findings. The request names the backing indices as well as the data streams. With the data stream pattern alone, the restore fails with ``403 Forbidden`` (``no permissions for []``).

   .. code-block:: none
      :emphasize-lines: 1

      POST _snapshot/<REPOSITORY_NAME>/<SNAPSHOT_NAME>/_restore
      {
        "indices": "wazuh-findings-v5-*,.ds-wazuh-findings-v5-*",
        "include_global_state": false
      }

   Replace ``<REPOSITORY_NAME>`` and ``<SNAPSHOT_NAME>`` with their respective values.

