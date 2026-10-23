.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Recreate the supported Wazuh indexer configuration and security settings, and migrate indexed data, when migrating from Wazuh 4.x to Wazuh 5.x.

Wazuh indexer
=============

Wazuh 5.x introduces changes to the Wazuh indexer cluster configuration, security settings, and index management. Deploy a new Wazuh indexer and recreate the supported configuration and security settings from the Wazuh 4.x deployment.

You can recreate the following Wazuh indexer configuration and security settings in Wazuh 5.x:

-  Cluster and node configuration
-  TLS certificates
-  Security configuration
-  Internal users
-  Roles and role mappings
-  External authentication providers, including LDAP, Active Directory, SAML, JWT, Kerberos, and client-certificate authentication

You can migrate Wazuh index data from the existing Wazuh 4.x indexer to the Wazuh 5.x indexer using snapshots. The migration requires a snapshot repository that is accessible to the source and destination Wazuh indexer clusters. The following sections describe how to recreate the Wazuh indexer configuration and security settings and migrate the required index data.

.. _migration_wazuh_indexer_configuration:

Wazuh indexer configuration
----------------------------

Wazuh indexer 5.x stores its configuration under ``/etc/wazuh-indexer/``. The following configuration files and directories are commonly reviewed during the migration.

+---------------------------------------------+------------------------------------------+
| Path                                        | Purpose                                  |
+=============================================+==========================================+
| ``/etc/wazuh-indexer/opensearch.yml``       | Main cluster and node configuration      |
+---------------------------------------------+------------------------------------------+
| ``/etc/wazuh-indexer/jvm.options``          | JVM heap and garbage collection settings |
+---------------------------------------------+------------------------------------------+
| ``/etc/wazuh-indexer/log4j2.properties``    | Logging configuration                    |
+---------------------------------------------+------------------------------------------+
| ``/etc/wazuh-indexer/certs/``               | Transport and HTTP TLS certificates      |
+---------------------------------------------+------------------------------------------+
| ``/etc/wazuh-indexer/opensearch-security/`` | Security plugin configuration            |
+---------------------------------------------+------------------------------------------+

.. note::

   Do not copy configuration files from a 4.x deployment directly into a 5.x deployment. Use the 4.x configuration as a reference and recreate the required settings manually in the corresponding 5.x files.

Migrate the Wazuh indexer configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on every Wazuh indexer node of the new Wazuh 5.x cluster.

#. Stop the Wazuh indexer service:

   .. code-block:: console

      # systemctl stop wazuh-indexer

#. Review the Wazuh 4.x configuration and recreate the required settings manually in the corresponding Wazuh 5.x files.

#. Update or remove the Wazuh 4.x settings that changed in Wazuh 5.x:

   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Setting                                                                                                                                                                                                      | Wazuh 5.x change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
   +==============================================================================================================================================================================================================+==============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+
   | ``compatibility.override_main_response_version``                                                                                                                                                             | Removed. The Wazuh indexer doesn't start if ``opensearch.yml`` contains this setting.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``opensearch_performance_analyzer.*``, ``plugins.anomaly_detection.*``, ``plugins.asynchronous_search.*``, ``plugins.ml_commons.*``, ``plugins.query.datasources.*``, ``plugins.neural_search.*``, ``knn.*`` | Removed. Wazuh indexer 5.x doesn't include the related plugins. Also remove the settings of the ``opensearch-observability`` plugin (observability and notebooks), which Wazuh indexer 5.x no longer includes.                                                                                                                                                                                                                                                                                                                                               |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``cluster.initial_master_nodes``                                                                                                                                                                             | Renamed to ``cluster.initial_cluster_manager_nodes``, which the Wazuh 5.x ``opensearch.yml`` already sets. Copy the node list to the new setting and don't add the old one.                                                                                                                                                                                                                                                                                                                                                                                  |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.ssl.transport.enforce_hostname_verification``, ``plugins.security.ssl.transport.resolve_hostname``                                                                                        | Renamed to ``transport.ssl.enforce_hostname_verification`` and ``transport.ssl.resolve_hostname``, which the Wazuh 5.x ``opensearch.yml`` already sets. Don't add the Wazuh 4.x settings: the Wazuh indexer doesn't start if ``opensearch.yml`` defines both the old and the new name of a setting. ``transport.ssl.enforce_hostname_verification`` is ``true`` in Wazuh 5.x (it was ``false`` in Wazuh 4.x), so each node certificate must include the node address in its subject alternative names. ``transport.ssl.resolve_hostname`` remains ``false``. |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.authcz.admin_dn``, ``plugins.security.nodes_dn``                                                                                                                                          | The distinguished name (DN) attribute order differs. Keep the values that the Wazuh 5.x package generated. If you keep the Wazuh 4.x certificates, set them to the subjects of those certificates.                                                                                                                                                                                                                                                                                                                                                           |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.ssl.*`` certificate paths                                                                                                                                                                 | The Wazuh 5.x package names the node certificate ``indexer.pem`` and ``indexer-key.pem``. To keep the Wazuh 4.x certificates, copy them to ``/etc/wazuh-indexer/certs/`` as ``indexer.pem``, ``indexer-key.pem``, ``admin.pem``, ``admin-key.pem``, and ``root-ca.pem``, so the Wazuh 5.x paths stay valid. To keep the certificates that the Wazuh 5.x package issued, don't change the paths.                                                                                                                                                              |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Multi-tenancy settings                                                                                                                                                                                       | Disabled by default in Wazuh 5.x.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.ssl.http.enabled_ciphers``, ``plugins.security.ssl.http.enabled_protocols``                                                                                                               | Not set in Wazuh 5.x, which uses the OpenSearch defaults. The Wazuh 4.x installation assistant restricted them to TLS 1.2 and four cipher suites. Copy them only if your security policy requires a restricted list.                                                                                                                                                                                                                                                                                                                                         |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.system_indices.indices``                                                                                                                                                                  | The Wazuh 5.x list drops the indices of the removed plugins and adds ``.wazuh-internal-state``. Keep the Wazuh 5.x values.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#. Review any custom JVM and logging configuration before you apply it to the Wazuh 5.x deployment. Copy only individual non-default lines into the Wazuh 5.x ``jvm.options`` and ``log4j2.properties`` files instead of replacing them. The Wazuh 5.x package sets a 1 GB JVM heap. Before you start the service, set ``-Xms`` and ``-Xmx`` to the same value: half of the RAM when the Wazuh indexer runs alone on the host, or a quarter when the Wazuh manager or the Wazuh dashboard runs on the same host.

#. Edit the security configuration files as described in the :ref:`Wazuh indexer security configuration <migration_wazuh_indexer_security_configuration>` section. Apply the configuration after you start the Wazuh indexer service on every node, as described in Apply the security configuration.

#. Start the Wazuh indexer service:

   .. code-block:: console

      # systemctl start wazuh-indexer

#. After the Wazuh indexer service is running on every node and you have applied the security configuration, verify that the nodes have joined the cluster.

   .. code-block:: console

      $ curl -k -u <USERNAME>:<PASSWORD> \
        https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v

   Where:

   -  ``<USERNAME>``: is the username of a Wazuh indexer user with permissions to query the cluster.
   -  ``<PASSWORD>``: is the password of the specified Wazuh indexer user.
   -  ``<WAZUH_INDEXER_IP>``: is the IP address or hostname of a Wazuh indexer node in the Wazuh 5.x cluster.

   .. note::

      Retrieve the generated ``WAZUH_INDEXER_ADMIN_PASSWORD`` from ``/etc/wazuh-indexer/export/credentials.env`` on the Wazuh indexer.

.. _migration_wazuh_indexer_security_configuration:

Wazuh indexer security configuration
--------------------------------------

The Wazuh indexer security configuration controls authentication, authorization, user management, and access permissions.

During the migration, review the existing Wazuh 4.x security configuration and recreate the required users, roles, role mappings, authentication providers, and security settings manually in the corresponding Wazuh 5.x files.

The security configuration is stored under ``/etc/wazuh-indexer/opensearch-security/``.

+------------------------+-----------------------------------------------------------------------------------------------------+
| File                   | Purpose                                                                                             |
+========================+=====================================================================================================+
| ``config.yml``         | Authentication and authorization configuration                                                      |
+------------------------+-----------------------------------------------------------------------------------------------------+
| ``internal_users.yml`` | Internal user accounts                                                                              |
+------------------------+-----------------------------------------------------------------------------------------------------+
| ``roles.yml``          | Role definitions                                                                                    |
+------------------------+-----------------------------------------------------------------------------------------------------+
| ``roles_mapping.yml``  | Role mappings                                                                                       |
+------------------------+-----------------------------------------------------------------------------------------------------+
| ``action_groups.yml``  | Permission groups                                                                                   |
+------------------------+-----------------------------------------------------------------------------------------------------+
| ``tenants.yml``        | Dashboard tenants                                                                                   |
+------------------------+-----------------------------------------------------------------------------------------------------+
| ``nodes_dn.yml``       | Allowed node certificate identities                                                                 |
+------------------------+-----------------------------------------------------------------------------------------------------+
| ``allowlist.yml``      | When enabled, limits every user except the super admin to the listed REST API endpoints and methods |
+------------------------+-----------------------------------------------------------------------------------------------------+
| ``audit.yml``          | Audit logging configuration                                                                         |
+------------------------+-----------------------------------------------------------------------------------------------------+

.. note::

   Before migrating the security settings, export the active Wazuh 4.x security configuration. The files on disk might not reflect the active configuration because the effective security configuration is stored in the Wazuh indexer security index.

Run the following commands on a Wazuh 4.x indexer node to export the active security configuration:

.. code-block:: console

   # install -d -o wazuh-indexer -g wazuh-indexer <BACKUP_DIRECTORY>
   # /usr/share/wazuh-indexer/bin/indexer-security-init.sh --options "-backup <BACKUP_DIRECTORY> -icl -nhnv"

Replace ``<BACKUP_DIRECTORY>`` with the directory that stores the exported files, for example ``/var/tmp/security-backup``. Use the exported ``internal_users.yml``, ``roles.yml``, and ``roles_mapping.yml`` files as the reference for the Wazuh 5.x security configuration.

Before applying the recreated security configuration, verify that the recreated roles reference valid permissions and that the role mappings reference users and roles defined in the Wazuh 5.x security configuration. Replace Wazuh 4.x index patterns in recreated roles, such as ``wazuh-alerts-*``, with the Wazuh 5.x index patterns, such as ``wazuh-events-v5-*``, ``wazuh-findings-v5-*``, and ``wazuh-states-*``. Keep the Wazuh 5.x permission names. Users with roles that reference Wazuh 4.x index patterns can log in, but the Wazuh dashboard doesn't display their data. Refer to the :doc:`user administration </user-manual/user-administration/index>` documentation for more information.

Apply the security configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After you recreate the required security configuration, apply the changes to the Wazuh indexer. Make the same changes to the files in ``/etc/wazuh-indexer/opensearch-security/`` on every Wazuh indexer node.

#. Restart the Wazuh indexer service on every node:

   .. code-block:: console

      # systemctl restart wazuh-indexer

#. Apply the security configuration. Run the script once, from a single node whose files contain all the changes, after the Wazuh indexer service is running on every node. The Wazuh indexer stores the security configuration in its security index, so the change reaches every node:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

   .. warning::

      Running ``indexer-security-init.sh`` loads the security configuration from ``/etc/wazuh-indexer/opensearch-security/`` into the Wazuh indexer security index. This can overwrite security settings previously configured through the Wazuh dashboard or security API. Ensure that the configuration files contain the security settings you want to retain before running the script. Running the script later from a node whose files lack the recreated users, roles, or role mappings removes them from the whole cluster, and the affected users can no longer log in. Keep the files in ``/etc/wazuh-indexer/opensearch-security/`` identical on every node.

#. Verify that authentication works. Log in to the Wazuh dashboard and confirm that users can authenticate and access the resources their assigned roles permit. Also verify each external authentication backend, such as LDAP or SAML, against every Wazuh indexer node before you point production traffic at the Wazuh 5.x cluster.

.. _migration_indexer_data_migration:

Indexer data migration
------------------------

You can migrate Wazuh indices from the Wazuh 4.x indexer to the Wazuh 5.x indexer using snapshots. The migration requires a snapshot repository that is accessible to both the source and destination Wazuh indexer clusters. When restored on the destination Wazuh indexer, the indices retain their indexed data and original timestamps.

The restored indices remain separate from the Wazuh 5.x indices and data streams created for new data. You can create an index pattern for the restored indices to search and analyze historical data from the **Discover** page on the Wazuh dashboard.

.. note::

   Restored indices retain their Wazuh 4.x mappings and remain separate from the Wazuh 5.x data schema. Wazuh 5.x does not write new data to the restored indices.

The following sections describe the steps required to migrate Wazuh indices from the Wazuh 4.x indexer to the Wazuh 5.x indexer.

.. note::

   Index data migration to Wazuh 5.x requires the source deployment to run Wazuh 4.4.0 or later due to snapshot compatibility requirements. Indices created before Wazuh 4.4.0 can't be restored, even if the deployment was later upgraded to Wazuh 4.4.0 or later.

Setting up a shared file system
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on a server that is accessible from both the Wazuh 4.x and Wazuh 5.x indexer clusters.

NFS server
~~~~~~~~~~

#. Create the snapshot directory:

   .. code-block:: console

      # mkdir -p /mnt/snapshots

#. Install and start the NFS service.

   -  For RPM-based distributions:

      .. code-block:: console

         # yum install -y nfs-utils
         # systemctl enable nfs-server
         # systemctl start nfs-server

   -  For Debian-based distributions:

      .. code-block:: console

         # apt -y install nfs-kernel-server
         # systemctl enable nfs-kernel-server
         # systemctl start nfs-kernel-server

#. Configure the snapshot directory as an NFS export:

   .. code-block:: console

      # echo "/mnt/snapshots <NETWORK_ADDRESS/CIDR>(rw,sync,no_root_squash,no_subtree_check)" >> /etc/exports

   Replace ``<NETWORK_ADDRESS/CIDR>`` with the network containing the Wazuh indexer nodes. For example, ``192.168.33.0/24``.

#. Apply the NFS configuration:

   .. code-block:: console

      # exportfs -a

Configure the Wazuh indexers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps on every Wazuh indexer node in the source Wazuh 4.x cluster and destination Wazuh 5.x cluster.

#. Create the snapshot repository directory:

   .. code-block:: console

      # mkdir -p /mnt/snapshots

#. Install the NFS client.

   -  RPM-based:

      .. code-block:: console

         # yum install -y nfs-utils

   -  Debian-based:

      .. code-block:: console

         # apt -y install nfs-common

#. Mount the shared NFS directory:

   .. code-block:: console

      # mount -t nfs <NFS_SERVER_IP>:/mnt/snapshots /mnt/snapshots

   Replace ``<NFS_SERVER_IP>`` with the IP address of the NFS server configured in the previous section. To keep the mount after a reboot, add ``<NFS_SERVER_IP>:/mnt/snapshots /mnt/snapshots nfs defaults 0 0`` to ``/etc/fstab``.

#. Grant the Wazuh indexers access to the directory:

   .. code-block:: console

      # chown wazuh-indexer:wazuh-indexer /mnt/snapshots

#. Add the snapshot repository path to ``/etc/wazuh-indexer/opensearch.yml``:

   .. code-block:: yaml

      path.repo:
        - /mnt/snapshots

#. Restart the Wazuh indexer:

   .. code-block:: console

      # systemctl restart wazuh-indexer

#. Verify the directory ownership:

   .. code-block:: console

      # ls -ld /mnt/snapshots

   .. note::

      In a distributed deployment, mount the shared directory and configure ``path.repo`` on every Wazuh indexer node in the cluster. In an all-in-one deployment, perform these steps on the host running the Wazuh indexer.

Set up snapshot repository on Wazuh 4.x
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

On the Wazuh 4.x dashboard, perform the following steps:

#. Click the **☰** menu, navigate to **Indexer management** > **Snapshot Management** > **Repositories**, and select **Create repository** to create a new snapshot repository.

#. Enter a **Repository name**, such as ``wazuh-4x-migration``, select the repository type **Shared file system**, enter the repository **Location** ``/mnt/snapshots``, and select **Add** to register the new repository.

   .. thumbnail:: /images/migration-to-5x/create-snapshot-repository.png
      :title: Create a snapshot repository on Wazuh 4.x
      :alt: Create a snapshot repository on Wazuh 4.x
      :align: center
      :width: 80%

Take a snapshot of the Wazuh 4.x indices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

On the Wazuh 4.x dashboard, perform the following steps:

#. Click the **☰** menu, navigate to **Indexer management** > **Snapshot Management** > **Snapshots**.

#. Select **Take snapshot** and enter a Snapshot name.

#. Select the Wazuh data indices that you want to migrate from the list. The Wazuh 4.x dashboard ignores index patterns that you type in this field and includes every index in the snapshot.

   .. warning::

      Do not include system indices or the cluster state in the migration snapshot. The snapshot is intended to transfer Wazuh 4.x historical data to the new Wazuh 5.x deployment, not the Wazuh 4.x indexer configuration. Before you restore the snapshot, verify that it contains only the Wazuh data indices you selected.

#. Select the repository you created earlier to store the snapshots.

#. Ensure **Include global state** is not selected in the **Advanced options** to prevent the snapshot from including cluster-level configuration.

#. Click **Add** to create a new snapshot. The snapshot files are saved in the repository location ``/mnt/snapshots``.

   .. thumbnail:: /images/migration-to-5x/take-snapshot-name.png
      :title: Take a snapshot of the Wazuh 4.x indices
      :alt: Take a snapshot of the Wazuh 4.x indices
      :align: center
      :width: 80%

   .. thumbnail:: /images/migration-to-5x/take-snapshot-repository.png
      :title: Select the snapshot repository
      :alt: Select the snapshot repository
      :align: center
      :width: 80%

Set up a snapshot repository on Wazuh 5.x
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the command below on the Wazuh 5.x indexer node to set up a read-only snapshot repository:

.. code-block:: bash

   # curl -k -X PUT \
     --cert /etc/wazuh-indexer/certs/admin.pem \
     --key /etc/wazuh-indexer/certs/admin-key.pem \
     "https://<WAZUH_INDEXER_IP>:9200/_snapshot/wazuh-4x-migration" \
     -H "Content-Type: application/json" \
     -d '{
       "type": "fs",
       "settings": {
         "location": "/mnt/snapshots",
         "readonly": true
       }
     }'

The command output looks similar to this:

.. code-block:: none
   :class: output

   {"acknowledged":true}

Replace ``<WAZUH_INDEXER_IP>`` with the IP address of the Wazuh 5.x indexer. In an all-in-one deployment, use ``127.0.0.1`` because the Wazuh indexer listens on the loopback address.

Restoring the snapshot on Wazuh 5.x
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps on the Wazuh 5.x deployment.

#. On the Wazuh dashboard, navigate to **Indexer management** > **Snapshot Management** > **Snapshots**. The snapshot created on the Wazuh 4.x deployment is available to the Wazuh 5.x deployment through the shared ``/mnt/snapshots`` repository. Select the migration snapshot, then click **Restore**.

   .. thumbnail:: /images/migration-to-5x/restore-snapshot-select.png
      :title: Select the migration snapshot to restore
      :alt: Select the migration snapshot to restore
      :align: center
      :width: 80%

#. Click **Restore snapshot**.

   .. thumbnail:: /images/migration-to-5x/restore-snapshot-confirm.gif
      :title: Restore the snapshot
      :alt: Restore the snapshot
      :align: center
      :width: 80%

   .. note::

      You can choose to restore specific indices or rename the indices. In the image above, we add the prefix ``restored_`` to the restored index names.

   .. warning::

      Do not restore system indices or the global cluster state into the Wazuh 5.x deployment (for example, ``.kibana*``, ``.opendistro*``).

#. Navigate to **Indexer management** > **Indexes** on the Wazuh dashboard, and filter with the prefix ``restored_`` to view the restored indices.

   .. thumbnail:: /images/migration-to-5x/restored-indices-list.png
      :title: Restored indices filtered by prefix
      :alt: Restored indices filtered by prefix
      :align: center
      :width: 80%

#. Create an index pattern to retrieve the indices' data. On the Wazuh dashboard, navigate to **Dashboards management** > **Index patterns**, then click on **Create index pattern**.

   .. thumbnail:: /images/migration-to-5x/create-index-pattern.png
      :title: Create an index pattern
      :alt: Create an index pattern
      :align: center
      :width: 80%

#. Set the **Index pattern name**, then click on **Next step**. In the image below, we use the index pattern name ``restored_wazuh*``.

   .. thumbnail:: /images/migration-to-5x/index-pattern-name.png
      :title: Set the index pattern name
      :alt: Set the index pattern name
      :align: center
      :width: 80%

#. Set the **Time field**. From the drop-down menu, select **timestamp**, then click **Create index pattern**.

   .. thumbnail:: /images/migration-to-5x/index-pattern-time-field.png
      :title: Set the index pattern time field
      :alt: Set the index pattern time field
      :align: center
      :width: 80%

#. Click the **☰** menu, navigate to **Discover** on the Wazuh dashboard to verify that the migrated indices are available. Select the Index pattern (``restored_wazuh*``) created in the previous step to view the migrated index data.

   .. thumbnail:: /images/migration-to-5x/discover-migrated-data.png
      :title: View the migrated index data from Discover
      :alt: View the migrated index data from Discover
      :align: center
      :width: 80%

From the **Discover** page, you can explore and search the migrated index data using the Wazuh dashboard.
