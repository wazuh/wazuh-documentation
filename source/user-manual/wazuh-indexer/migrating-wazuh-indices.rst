.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to  migrate Wazuh indices keeping the original timestamp in this section of the documentation.

Migrating Wazuh indices
=======================

In this section, we focus on migrating Wazuh indices by using snapshots. This helps to restore alerts from one Wazuh indexer cluster to another without losing the original timestamp.

.. _migrating_indices_setup_shared_file_system:

Setup shared file system
------------------------

We recommend the use of a Network File System (NFS) to create a shared file system for the snapshot repository.

NFS server
^^^^^^^^^^

Perform the following steps to set up NFS on a dedicated server:

#. Create a target directory for the snapshot repository in the ``/mnt`` directory:

   .. code-block:: console

      # mkdir /mnt/snapshots

#. Install NFS by running the following commands:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum update
            # yum install -y nfs-utils
            # yum install exportfs
            # systemctl enable nfs-server
            # systemctl start nfs-server

      .. group-tab:: APT

         .. code-block:: console

            # apt -y install nfs-kernel-server
            # systemctl start nfs-kernel-server.service
#. Add the ``/mnt/snapshots`` directory to the ``/etc/exports`` file using the command below. Replace the ``<NETWORK_ADDRESS/CIDR>`` variable with your network address.

   .. code-block:: console

      # echo "/mnt/snapshots     <NETWORK_ADDRESS/CIDR>(rw,sync,no_root_squash,no_subtree_check)" | sudo tee -a /etc/exports

   Where:

   -  ``rw`` - Allows both read and write access to the shared directory.
   -  ``sync`` - Forces the NFS server to write changes to the disk immediately, making the file system synchronous.
   -  ``no_root_squash`` - Allows the "root" user on the NFS client system to have full, unrestricted access to files on the NFS server.
   - ``no_subtree_check`` - Disables subtree checking, which can improve performance for large directory trees.

#. Apply the NFS configuration:

   .. code-block:: console

      # exportfs -a

.. _migrating_indices_wazuh_indexer:

Wazuh indexer
^^^^^^^^^^^^^

Perform the following steps on the Wazuh indexer node (s) to complete the shared file system setup.

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

#. Add the configuration: ``path.repo: /mnt/snapshots`` to the ``/etc/wazuh-indexer/opensearch.yml`` file to specify the repository path:

   .. code-block:: yaml
      :emphasize-lines: 10

      network.host: "127.0.0.1"
      node.name: "node-1"
      cluster.initial_master_nodes:
      - "node-1"
      cluster.name: "wazuh-cluster"

      node.max_local_storage_nodes: "3"
      path.data: /var/lib/wazuh-indexer
      path.logs: /var/log/wazuh-indexer
      path.repo: /mnt/snapshots

      plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/wazuh-indexer.pem
      plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
      plugins.security.ssl.http.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
      plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/wazuh-indexer.pem
      plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/wazuh-indexer-key.>plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
      plugins.security.ssl.http.enabled: true
      plugins.security.ssl.transport.enforce_hostname_verification: false
      plugins.security.ssl.transport.resolve_hostname: false
      plugins.security.ssl.http.enabled_ciphers:
        - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
        - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
        - "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
        - "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
      plugins.security.ssl.http.enabled_protocols:
        - "TLSv1.2"
      plugins.security.authcz.admin_dn:
      - "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      plugins.security.check_snapshot_restore_write_privileges: true
      plugins.security.enable_snapshot_restore_privilege: true
      plugins.security.nodes_dn:
      - "CN=indexer,OU=Wazuh,O=Wazuh,L=California,C=US"
      plugins.security.restapi.roles_enabled:
      - "all_access"
      - "security_rest_api_access"

      plugins.security.system_indices.enabled: true
      plugins.security.system_indices.indices: [".opendistro-alerting-config", ".opendistro-alert>
      ### Option to allow Filebeat-oss 7.10.2 to work ###
      compatibility.override_main_response_version: true

#. Restart the Wazuh indexer to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-indexer

.. warning::

   Make sure to confirm that the ``/mnt/snapshots`` directory has the ``wazuh-indexer:wazuh-indexer`` ownership on the Wazuh indexer nodes using the ``ll`` utility.

Repeat the :ref:`Setup shared file system > Wazuh indexer <migrating_indices_wazuh_indexer>` steps on the destination Wazuh indexer(s) to use the NFS share directory, ``/mnt/snapshots``, as its snapshot repository.

.. _migrating_indices_setup_snapshot_repository:

Setup snapshot repository
-------------------------

On the Wazuh dashboard, perform the following steps:

#. Click on the **upper left menu ☰**, go to **Indexer management** > **Snapshot Management** > **Repositories**, and select **Create repository** to create a new snapshot repository.
#. Enter a repository name, select the repository type **Shared file system**, enter the repository location ``/mnt/snapshots``, and select **Add** to register the new repository.

   .. thumbnail:: /images/manual/wazuh-indexer/create-snapshot-repository.gif
      :title: Create snapshot repository
      :alt: Create snapshot repository
      :align: center
      :width: 80%

Repeat the above steps on the destination Wazuh cluster to set up a similar snapshot repository.

Take snapshots
--------------

#. Click on the **upper left menu ☰**, and go to **Indexer management** > **Snapshot Management** > **Snapshots**.
#. Select **Take snapshot**, and enter a Snapshot name.
#. Select or input source index patterns.
#. Select the earlier created repository to store the snapshots.
#. Select **Advanced options** and check the **Include cluster state in snapshots** option.

   .. thumbnail:: /images/manual/wazuh-indexer/include-cluster-state-option.png
      :title: Include cluster state in snapshots option
      :alt: Include cluster state in snapshots option
      :align: center
      :width: 80%

#. Select **Add** to create a new snapshot.

The snapshot files are saved in the repository location ``/mnt/snapshots``.

   .. thumbnail:: /images/manual/wazuh-indexer/snapshot-file-saved.gif
      :title: Snapshot file saved
      :alt: Snapshot file saved
      :align: center
      :width: 80%

Restore snapshots
-----------------

To complete the Wazuh indices migration steps, restore the snapshots taken from the old Wazuh indexers to the destination Wazuh indexers. Perform the following steps on the destination Wazuh indexer.

.. note::

   It is necessary to have performed the steps in the :ref:`Setup shared file system <migrating_indices_setup_shared_file_system>` and :ref:`Setup snapshot repository <migrating_indices_setup_snapshot_repository>` sections on the destination Wazuh cluster before proceeding to **Restore snapshots**.

#. Restart the Wazuh indexer nodes in the destination Wazuh cluster to load the snapshot files using the command:

   .. code-block:: console

      # systemctl restart wazuh-indexer

#. Click on the **upper left menu ☰**, go to **Indexer management** > **Snapshot Management** > **Snapshots**, and refresh the Snapshots page. The snapshots in the repository location ``/mnt/snapshots`` will show on the destination Wazuh cluster’s dashboard.

#. Select the snapshot and click on **Restore**. Delete the ``restored_`` prefix to restore the indices to their original names. The ``restored_`` prefix exists to avoid conflicting index names.

#. Select **Advanced options** and make sure all the options are unchecked.

   .. thumbnail:: /images/manual/wazuh-indexer/restore-snapshot-advanced-options.png
      :title: Restore snapshot advanced options
      :alt: Restore snapshot advanced options
      :align: center
      :width: 80%

#. Select **Restore snapshot** to complete the migration process.

   .. thumbnail:: /images/manual/wazuh-indexer/restore-snapshot.gif
      :title: Restore snapshot
      :alt: Restore snapshot
      :align: center
      :width: 80%
