.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Recreate the supported Wazuh indexer configuration and security settings, and keep access to Wazuh 4.x indexed data, when transitioning from Wazuh 4.x to Wazuh 5.x.

Wazuh indexer
=============

Wazuh 5.x introduces changes to the Wazuh indexer cluster configuration, security settings, and index management. Deploy a new Wazuh indexer and recreate the supported configuration and security settings from the Wazuh 4.x deployment. For Docker or Kubernetes deployments, see :doc:`Docker and Kubernetes deployments <docker-kubernetes-deployments>`.

You can recreate the following Wazuh indexer configuration and security settings in Wazuh 5.x:

-  Cluster and node configuration
-  Security configuration
-  Internal users
-  Roles and role mappings
-  External authentication providers, including LDAP, Active Directory, SAML, JWT, Kerberos, and client-certificate authentication

Wazuh 4.x indexed data isn't migrated. The following sections describe how to recreate the Wazuh indexer configuration and security settings. To keep access to historical data, see :ref:`Indexed data <migration_indexer_data_migration>`.

.. _migration_wazuh_indexer_configuration:

Wazuh indexer configuration
---------------------------

Wazuh 5.x indexer stores its configuration under ``/etc/wazuh-indexer/``. The following configuration files and directories are commonly reviewed during the transition.

+---------------------------------------------+--------------------------------------------------------------------------------------------------------+
| Path                                        | Purpose                                                                                                |
+=============================================+========================================================================================================+
| ``/etc/wazuh-indexer/opensearch.yml``       | Main cluster and node configuration                                                                    |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``/etc/wazuh-indexer/jvm.options``          | JVM heap and garbage collection settings                                                               |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``/etc/wazuh-indexer/log4j2.properties``    | Logging configuration                                                                                  |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``/etc/wazuh-indexer/certs/``               | Transport and HTTP TLS certificates. Keep the certificates that the Wazuh 5.x package issued.          |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``/etc/wazuh-indexer/opensearch-security/`` | Security plugin configuration                                                                          |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``/etc/wazuh-indexer/ca/``                  | Certificate authority that signed the node certificates, including its private key                     |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``/etc/wazuh-indexer/export/``              | Passwords, CA certificate, and client certificates published for the Wazuh manager and Wazuh dashboard |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``/etc/wazuh-indexer/local.env``            | Optional values that you set, such as passwords. The package never writes this file.                   |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``/etc/wazuh-indexer/opensearch.keystore``  | Secure settings, such as SMTP credentials                                                              |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------+

.. note::

   Don't copy the Wazuh 4.x configuration files into the Wazuh 5.x deployment. Recreate the settings that you need in the Wazuh 5.x files.

Recreate the Wazuh indexer configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on every Wazuh indexer node of the new Wazuh 5.x cluster.

#. Stop the Wazuh indexer service:

   .. code-block:: console

      # systemctl stop wazuh-indexer

#. Recreate your custom Wazuh 4.x settings, such as ``cluster.routing.allocation.disk.watermark.*``, into the Wazuh 5.x files. Update or remove the settings that changed in Wazuh 5.x:

   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Setting                                                                                                                                                                                                      | Wazuh 5.x change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
   +==============================================================================================================================================================================================================+==============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+
   | ``compatibility.override_main_response_version``                                                                                                                                                             | Removed. The Wazuh indexer doesn't start if ``opensearch.yml`` contains this setting.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``opensearch_performance_analyzer.*``, ``plugins.anomaly_detection.*``, ``plugins.asynchronous_search.*``, ``plugins.ml_commons.*``, ``plugins.query.datasources.*``, ``plugins.neural_search.*``, ``knn.*`` | Removed. Wazuh 5.x indexer doesn't include the related plugins. Also remove the settings of the ``opensearch-observability`` plugin (observability and notebooks), which Wazuh 5.x indexer no longer includes.                                                                                                                                                                                                                                                                                                                                               |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``cluster.initial_master_nodes``                                                                                                                                                                             | Renamed to ``cluster.initial_cluster_manager_nodes``, which the Wazuh 5.x ``opensearch.yml`` already sets. Copy the node list to the new setting and don't add the old one.                                                                                                                                                                                                                                                                                                                                                                                  |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.ssl.transport.enforce_hostname_verification``, ``plugins.security.ssl.transport.resolve_hostname``                                                                                        | Renamed to ``transport.ssl.enforce_hostname_verification`` and ``transport.ssl.resolve_hostname``, which the Wazuh 5.x ``opensearch.yml`` already sets. Don't add the Wazuh 4.x settings: the Wazuh indexer doesn't start if ``opensearch.yml`` defines both the old and the new name of a setting. ``transport.ssl.enforce_hostname_verification`` is ``true`` in Wazuh 5.x (it was ``false`` in Wazuh 4.x). Each node certificate must include the node address in its subject alternative names. ``transport.ssl.resolve_hostname`` remains ``false``.    |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.authcz.admin_dn``, ``plugins.security.nodes_dn``                                                                                                                                          | The distinguished name (DN) attribute order differs. Keep the values that the Wazuh 5.x package generated. In a cluster, add the DN of every node to ``plugins.security.nodes_dn`` on every node.                                                                                                                                                                                                                                                                                                                                                            |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.ssl.*`` certificate paths                                                                                                                                                                 | The Wazuh 5.x package names the node certificate ``indexer.pem`` and ``indexer-key.pem``. Keep the certificates that the Wazuh 5.x package issued, and don't change the paths.                                                                                                                                                                                                                                                                                                                                                                               |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Multi-tenancy settings                                                                                                                                                                                       | Disabled by default in Wazuh 5.x.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.ssl.http.enabled_ciphers``                                                                                                                                                                | The Wazuh 5.x ``opensearch.yml`` already sets ``plugins.security.ssl.http.enabled_ciphers`` and ``plugins.security.ssl.transport.enabled_ciphers``. To restrict them, edit these lists. Don't copy the Wazuh 4.x settings.                                                                                                                                                                                                                                                                                                                                   |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | ``plugins.security.system_indices.indices``                                                                                                                                                                  | The Wazuh 5.x list drops the indices of the removed plugins and adds ``.wazuh-internal-state``. Keep the Wazuh 5.x values.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#. Copy only the lines that you changed in Wazuh 4.x, such as the heap size (``-Xms`` and ``-Xmx``), into the Wazuh 5.x ``jvm.options`` and ``log4j2.properties`` files. Don't copy lines that contain ``java.security.manager``, ``secure_sm``, ``java.security.policy``, or ``opensearch-performance-analyzer``. The Wazuh 5.x indexer doesn't start if ``jvm.options`` contains them. To find the lines that you changed, compare each file with the default file of the same Wazuh 4.x version.

#. Don't copy the Wazuh 4.x ``opensearch.keystore`` file. On a Wazuh 4.x node, list its entries with ``/usr/share/wazuh-indexer/bin/opensearch-keystore`` list, and add the ones you still need on every Wazuh 5.x node. Skip ``keystore.seed`` and the entries of plugins that Wazuh 5.x no longer includes.

#. Edit the security configuration files as described in the :ref:`Wazuh indexer security configuration <migration_wazuh_indexer_security_configuration>` section.

#. Start the Wazuh indexer service:

   .. code-block:: console

      # systemctl start wazuh-indexer

#. Apply the security configuration, as described in :ref:`Apply the security configuration <migration_apply_security_configuration>`. Then verify that the nodes have joined the cluster:

   .. code-block:: console
      :emphasize-lines: 1

      # curl --cacert /etc/wazuh-indexer/export/ca.pem -u <USERNAME>:<PASSWORD> \
        https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v

   Where:

   -  ``<USERNAME>`` is the username of a Wazuh indexer user with permissions to query the cluster.
   -  ``<PASSWORD>`` is the password of the specified Wazuh indexer user.
   -  ``<WAZUH_INDEXER_IP>`` is the IP address or hostname of a Wazuh indexer node in the Wazuh 5.x cluster.

   .. note::

      Retrieve the generated ``WAZUH_INDEXER_ADMIN_PASSWORD`` from ``/etc/wazuh-indexer/export/credentials.env`` on the Wazuh indexer node. To print only the value, run ``grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-`` on the Wazuh indexer node.

.. _migration_wazuh_indexer_security_configuration:

Wazuh indexer security configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer security configuration controls authentication, authorization, user management, and access permissions.

During the transition, review the existing Wazuh 4.x security configuration and recreate the required users, roles, role mappings, authentication providers, and security settings manually in the corresponding Wazuh 5.x files.

The security configuration is stored under ``/etc/wazuh-indexer/opensearch-security/``. For the file formats, see :doc:`Security </user-manual/wazuh-indexer/security>`.

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

   Before recreating the security settings, export the active Wazuh 4.x security configuration. The files on disk might not reflect the active configuration because the effective security configuration is stored in the Wazuh indexer security index.

Run the following commands on a Wazuh 4.x indexer node to export the active security configuration:

.. code-block:: console

   # BACKUP_DIRECTORY=/var/tmp/security-backup
   # install -d -m 700 -o wazuh-indexer -g wazuh-indexer $BACKUP_DIRECTORY
   # /usr/share/wazuh-indexer/bin/indexer-security-init.sh --options "-backup $BACKUP_DIRECTORY -icl -nhnv"
   # chmod 600 $BACKUP_DIRECTORY/*

The ``-icl`` option ignores the cluster name, and the ``-nhnv`` option turns off host name verification. Review every exported file. Recreate your custom entries of ``internal_users.yml``, ``roles.yml``, ``roles_mapping.yml``, and ``action_groups.yml`` in the Wazuh 5.x files, and compare ``config.yml`` for authentication backends. Keep ``nodes_dn.yml`` and ``allowlist.yml`` as Wazuh 5.x has them. The export also writes ``whitelist.yml``, the earlier name of ``allowlist.yml``. Wazuh 5.x doesn't use this file, and you don't need to recreate it. Don't recreate the Wazuh 4.x default users ``logstash``, ``readall``, ``kibanaro``, ``snapshotrestore``, and ``anomalyadmin``.

Before applying the recreated security configuration, verify that the recreated roles reference valid permissions and that the role mappings reference users and roles defined in the Wazuh 5.x security configuration.

Replace the Wazuh 4.x index patterns in recreated roles: ``wazuh-alerts-*`` with ``wazuh-findings-v5-*``, ``wazuh-archives-*`` with ``wazuh-events-v5-*``, and ``wazuh-monitoring-*`` and ``wazuh-statistics-*`` with ``wazuh-metrics-*``. Keep ``wazuh-states-*``. Wazuh 5.x stores events and findings instead of alerts. For the Wazuh 5.x indices, see :doc:`Wazuh indices </user-manual/wazuh-indexer/wazuh-indexer-indices>`. A role lists its permissions in ``cluster_permissions`` and in the ``allowed_actions`` of ``index_permissions``. Check that each permission and action group exists in Wazuh 5.x. Users with roles that reference Wazuh 4.x index patterns can log in, but the Wazuh dashboard doesn't display their data. For more information, see the :doc:`user administration </user-manual/user-administration/index>` documentation. A read-only role also needs ``wazuh-agent-config*``, the index pattern that the **Discover** page opens by default.

A user gets permissions through a role mapping. The ``roles_mapping.yml`` file maps the user, or one of its backend roles, to a role, and the role grants the permissions. To recreate access, start with each custom user in ``internal_users.yml`` and its backend roles. Copy the role mappings that use them, then the roles that those mappings reference, and skip the reserved roles that Wazuh 5.x already has. If a role uses a custom action group, add the group at the end of the Wazuh 5.x ``action_groups.yml`` and keep the existing groups. For the file formats, see :doc:`Security </user-manual/wazuh-indexer/security>`.

If you added users or backend roles to reserved role mappings, such as ``all_access``, ``readall``, or ``kibana_user``, add them to the same mappings in the Wazuh 5.x ``roles_mapping.yml`` and keep the existing entries. For example, add the backend role of your single sign-on administrators to ``all_access``.

Rewrite document-level security (DLS) and field-level security (FLS) with the Wazuh 5.x field names. For example, replace ``agent.name`` with ``wazuh.agent.name`` in DLS queries, and ``full_log`` with ``event.original`` in FLS fields.

.. _migration_apply_security_configuration:

Apply the security configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After you recreate the required security configuration, apply the changes to the Wazuh indexer. Make the same changes to the files in ``/etc/wazuh-indexer/opensearch-security/`` on every Wazuh indexer node.

#. If you use single sign-on (SSO), configure it before you apply the security configuration. In ``config.yml``, set ``kibana_url`` to the Wazuh 5.x dashboard address, and add the dashboard redirect and ACS URLs on the identity provider (IdP). To keep Wazuh 4.x sign-in working during the transition, create a second IdP client with its own ``sp.entity_id``. Copy the SAML metadata files to every Wazuh indexer node, and add the SSO settings to ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` on the Wazuh 5.x dashboard. For more information, see :doc:`Single sign-on </user-manual/user-administration/single-sign-on/index>`.

#. Make sure that the Wazuh indexer service is running on every node:

   .. code-block:: console

      # systemctl start wazuh-indexer

#. Apply the security configuration. Run the script once, from a single node whose files contain all the changes, after the Wazuh indexer service is running on every node. The Wazuh indexer stores the security configuration in its security index, and the change reaches every node:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

   .. warning::

      Running ``indexer-security-init.sh`` loads the security configuration from ``/etc/wazuh-indexer/opensearch-security/`` into the Wazuh indexer security index. This can overwrite security settings previously configured through the Wazuh dashboard or security API. Ensure that the configuration files contain the security settings you want to retain before running the script. Running the script later from a node whose files lack the recreated users, roles, or role mappings removes them from the whole cluster, and the affected users can no longer log in. Keep the files in ``/etc/wazuh-indexer/opensearch-security/`` identical on every node.

#. Verify that authentication works. Log in to the Wazuh dashboard and confirm that users can authenticate and access the resources their assigned roles permit. Also verify each external authentication backend, such as LDAP or SAML, against every Wazuh indexer node before you point production traffic at the Wazuh 5.x cluster.

.. _migration_indexer_data_migration:

Indexed data
------------

Wazuh 4.x indexed data isn't migrated to Wazuh 5.x. Wazuh 5.x uses new index schemas, and there is no reindex path from Wazuh 4.x data. To keep access to historical data, keep the Wazuh 4.x environment after the transition. Stop sending data to the Wazuh 4.x indexer, and optionally mark the Wazuh 4.x indices read-only. Keep the Wazuh 4.x dashboard connected to the Wazuh 4.x indexer to search the data. Decommission the Wazuh 4.x environment when your retention period ends.
