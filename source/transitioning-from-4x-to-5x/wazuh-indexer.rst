.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Recreate the supported Wazuh indexer configuration and security settings when transitioning from Wazuh 4.x to Wazuh 5.x.

Wazuh indexer
=============

The Wazuh indexer in Wazuh 5.x is based on OpenSearch 3.x and changes cluster configuration, security configuration, and index management. Deploy a new Wazuh indexer cluster and recreate the supported configuration and security settings from the Wazuh 4.x deployment.

You can recreate the following Wazuh indexer components in Wazuh 5.x:

-  Cluster and node configuration
-  TLS certificates
-  Security configuration
-  Internal users
-  Roles and role mappings
-  External authentication providers, including LDAP, Active Directory, SAML, JWT, Kerberos, and client-certificate authentication

You cannot recreate or restore indexed data, indices, and snapshots from Wazuh 4.x in Wazuh 5.x because of changes to the index schemas, mappings, and underlying OpenSearch platform.

Wazuh indexer configuration
---------------------------

Wazuh indexer 5.x stores its configuration under ``/etc/wazuh-indexer/``. Review the existing Wazuh 4.x configuration and recreate the required settings manually in the corresponding Wazuh 5.x files.

The following files are commonly reviewed during the transition.

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

Configuration changes between Wazuh 4.x and 5.x
-----------------------------------------------

Review the following settings before reuse:

+--------------------------------------------------+---------------------+---------------------------------------------------------------------------------+
| 4.x setting                                      | 5.x replacement     | Notes                                                                           |
+==================================================+=====================+=================================================================================+
| ``opensearch_performance_analyzer.*``            | Removed             | The Performance Analyzer plugin is no longer included. Remove related settings. |
+--------------------------------------------------+---------------------+---------------------------------------------------------------------------------+
| ``compatibility.override_main_response_version`` | Removed             | Used for legacy Filebeat compatibility in Wazuh 4.x. Remove this setting.       |
+--------------------------------------------------+---------------------+---------------------------------------------------------------------------------+
| Multi-tenancy settings                           | Disabled by default | Dashboard multi-tenancy is disabled by default in 5.x.                          |
+--------------------------------------------------+---------------------+---------------------------------------------------------------------------------+

Procedure
---------

Perform the following steps on the new Wazuh 5.x host.

#. Stop the Wazuh indexer service.

   .. code-block:: console

      # systemctl stop wazuh-indexer

#. Review the Wazuh 4.x configuration and recreate the required settings manually in the corresponding Wazuh 5.x files.

#. Copy the required TLS certificates to ``/etc/wazuh-indexer/certs/`` and update the certificate paths in ``opensearch.yml``.

#. Review any custom JVM and logging configuration before you apply it to the Wazuh 5.x deployment.

#. Complete the security configuration described in the :ref:`Security configuration <transitioning_wazuh_indexer_security_configuration>` section.

#. Start the Wazuh indexer service.

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-indexer
      # systemctl start wazuh-indexer

#. Verify that the node joins the cluster.

   .. code-block:: console

      $ curl -k -u <USERNAME>:<PASSWORD> \
        https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v

.. _transitioning_wazuh_indexer_security_configuration:

Wazuh indexer security configuration
------------------------------------

The Wazuh indexer security configuration controls authentication, authorization, user management, and access permissions through the OpenSearch Security plugin.

During the transition, review the existing Wazuh 4.x security configuration and recreate the required users, roles, role mappings, authentication providers, and security settings manually in the corresponding Wazuh 5.x files. You can reuse existing password hashes where applicable.

The security configuration is stored under ``/etc/wazuh-indexer/opensearch-security/``.

+------------------------+------------------------------------------------+
| File                   | Purpose                                        |
+========================+================================================+
| ``config.yml``         | Authentication and authorization configuration |
+------------------------+------------------------------------------------+
| ``internal_users.yml`` | Internal user accounts                         |
+------------------------+------------------------------------------------+
| ``roles.yml``          | Role definitions                               |
+------------------------+------------------------------------------------+
| ``roles_mapping.yml``  | Role mappings                                  |
+------------------------+------------------------------------------------+
| ``action_groups.yml``  | Permission groups                              |
+------------------------+------------------------------------------------+
| ``tenants.yml``        | Dashboard tenants                              |
+------------------------+------------------------------------------------+
| ``nodes_dn.yml``       | Allowed node certificate identities            |
+------------------------+------------------------------------------------+
| ``allowlist.yml``      | Restricted API access configuration            |
+------------------------+------------------------------------------------+
| ``audit.yml``          | Audit logging configuration                    |
+------------------------+------------------------------------------------+

.. note::

   Before you migrate security settings, export the active Wazuh 4.x security configuration. The files on disk might not reflect the active configuration because the OpenSearch Security plugin stores the effective configuration in the security index. Use the `backup procedure <https://documentation.wazuh.com/4.14/migration-guide/creating/index.html>`__ to export the active configuration before you reuse any settings.

Validate all migrated users, roles, permissions, and authentication settings against the Wazuh indexer 5.x access control model before you apply the configuration.

Apply the security configuration
--------------------------------

After you recreate the required security configuration, apply the changes to the Wazuh indexer.

#. Apply the security configuration.

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

#. Restart the Wazuh indexer service.

   .. code-block:: console

      # systemctl restart wazuh-indexer

#. Verify that authentication works. Log in to the Wazuh dashboard and confirm that users can authenticate and access the resources their assigned roles permit.
