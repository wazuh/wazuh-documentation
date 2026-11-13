.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer includes a Security plugin to secure access to the cluster and the data it stores. Find more information in this section of the documentation.

Security
========

The Wazuh indexer includes a Security plugin to secure access to the cluster and the data it stores. The plugin provides authentication, authorization, transport encryption, and role-based access control (RBAC), ensuring that only authenticated users and trusted services can access cluster resources.

The Security plugin is enabled by default and is configured during the Wazuh installation process. It secures communication between cluster nodes using TLS, authenticates users and services, and enforces permissions that control access to cluster operations, indices, and other resources.

In addition to protecting the cluster, the Security plugin manages security resources such as internal users, roles, role mappings, action groups, and tenants. These resources define how users authenticate and the permissions they receive when interacting with the Wazuh indexer.

Security configuration
----------------------

The Security plugin stores its configuration in the following directory by default:

.. code-block:: none

   /etc/wazuh-indexer/opensearch-security/

This directory contains the YAML configuration files used to initialize and manage the Security plugin configuration. These files are loaded into the security index during installation and can also be used during administrative operations such as migration or recovery.

For routine administration, Wazuh recommends using the Wazuh dashboard Security application to manage security resources. Directly modifying the configuration files is reserved for installation, migration, backup and restore, or other advanced administrative tasks.

Security configuration files
----------------------------

The Security plugin stores its configuration across several YAML files, each responsible for a specific aspect of the security configuration. These files define the security resources and settings that control authentication, authorization, access control, and cluster trust. During installation, the security configuration is initialized using these files, and they can also be used during administrative tasks such as backup and restore or migration.

The following table describes the primary configuration files used by the Wazuh indexer.

+------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| Configuration file     | Description                                                                                                                      |
+========================+==================================================================================================================================+
| ``config.yml``         | Configures global security settings, including authentication domains, authentication backends, and HTTP authentication methods. |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| ``internal_users.yml`` | Defines internal user accounts, including password hashes, backend roles, and user attributes.                                   |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| ``roles.yml``          | Defines security roles and the cluster, index, and tenant permissions assigned to each role.                                     |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| ``roles_mapping.yml``  | Maps users and backend roles to one or more security roles.                                                                      |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| ``action_groups.yml``  | Defines reusable permission groups that simplify role configuration.                                                             |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| ``tenants.yml``        | Defines tenants used to isolate dashboards and other saved objects between users or teams.                                       |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| ``nodes_dn.yml``       | Lists the distinguished names (DNs) of trusted node certificates that are permitted to join the cluster.                         |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| ``allowlist.yml``      | Defines REST API endpoints that can bypass specific security checks when explicitly permitted.                                   |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| ``audit.yml``          | Configures audit logging, including which event categories, users, and requests the Security plugin records, and                 |
|                        | compliance auditing of the security configuration. See :ref:`Audit logs <wazuh_indexer_security_audit_logs>`.                    |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------+

Access control
--------------

The Wazuh indexer uses Role-Based Access Control (RBAC) to regulate access to cluster resources and data. RBAC provides a flexible authorization model by assigning permissions to roles instead of directly to users. Users are then associated with one or more roles, which determine the actions they can perform and the resources they can access.

The Security plugin uses several security resources to implement access control, including internal users, roles, role mappings, action groups, and tenants. Together, these resources define how users authenticate, how permissions are assigned, and how access to cluster operations, indices, and dashboard resources is controlled.

Access control supports both locally managed users and users authenticated through external identity providers such as LDAP, Active Directory, SAML, or OpenID Connect (OIDC). Regardless of the authentication method, authorization is performed using the same RBAC model.

The following sections describe the access control model and the security resources used to manage authorization in the Wazuh indexer.

Access control model
^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer determines whether a user can perform an operation by evaluating the user's assigned security roles. Rather than granting permissions directly to users, the Security plugin uses role mappings to associate users or backend roles with one or more security roles. Each role defines the cluster, index, and tenant permissions available to the user.

The authorization process follows these steps:

#. The user authenticates with the Wazuh indexer using an internal account or an external identity provider.
#. The Security plugin identifies the authenticated user and any associated backend roles.
#. Role mappings associate the user or backend roles with one or more security roles.
#. The assigned security roles define the permissions available to the user.
#. The Security plugin evaluates the requested operation and either grants or denies access based on the assigned permissions.

Internal users
^^^^^^^^^^^^^^

Internal users are user accounts managed locally by the Wazuh indexer Security plugin. They are stored in the internal user database. They are used to authenticate administrators, service accounts, and other users that require direct access to the Wazuh indexer.

Each internal user is assigned one or more security roles through role mappings. These roles determine the cluster operations, indices, and tenants the user can access.

By default, Wazuh creates several reserved internal users that enable communication between the Wazuh components and provide administrative access to the cluster. Reserved users are managed by the system and are not to be modified.

Internal user configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Security plugin defines internal users in the following configuration file:

.. code-block:: none

   /etc/wazuh-indexer/opensearch-security/internal_users.yml

This file contains the metadata for the internal user database together with the definitions of all local user accounts. Each user entry specifies the authentication and authorization attributes associated with that account.

The following example shows the structure of the ``internal_users.yml`` configuration file.

.. code-block:: yaml

   ---
   # This is the internal user database
   # The hash value is a bcrypt hash and can be generated with plugin/tools/hash.sh

   _meta:
     type: "internalusers"
     config_version: 2

   admin:
     hash: "<HASH>"
     reserved: true
     backend_roles:
     - "admin"
     description: "Demo admin user"

   kibanaserver:
     hash: "<HASH>"
     reserved: true
     description: "Demo OpenSearch Dashboards user"

   wazuh-manager:
     hash: "<HASH>"
     reserved: true
     backend_roles: []
     description: "Wazuh Manager user with write-only access to stateless (events) indexes, read/write/delete access to stateful (states) indexes, and read access to consumers, threat intelligence content, and active-responses indexes."

.. note::

   The password hashes are generated for each installation. The passwords are stored in ``/etc/wazuh-indexer/export/credentials.env``. On the Wazuh manager, the password of the ``wazuh-manager`` user is stored in the keystore, in the ``/var/wazuh-manager/queue/keystore/`` directory.

The following table describes the main elements of the configuration file:

+-------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Element                       | Description                                                                                                                                                                                            |
+===============================+========================================================================================================================================================================================================+
| ``_meta``                     | Defines metadata for the configuration file, including the configuration type (internalusers) and the configuration version.                                                                           |
+-------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``User name``                 | Each top-level key represents an internal user account. For example, ``admin``, ``kibanaserver``, and ``wazuh-manager``.                                                                               |
+-------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hash``                      | Stores the *bcrypt* hash of the user's password. Passwords are never stored in plain text. Password hashes can be generated using the Security plugin password hashing tool.                           |
+-------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``reserved``                  | Indicates whether the user is a reserved system account. Reserved users are protected from modification or deletion through standard administrative operations.                                        |
+-------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``backend_roles``             | Lists the backend roles assigned to the user. Backend roles are mapped to security roles in roles_mapping.yml and determine the permissions granted to the user.                                       |
+-------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``opendistro_security_roles`` | Assigns security roles directly to the user. This field is retained for compatibility with legacy Open Distro/OpenSearch Security configurations and is generally not recommended for new deployments. |
+-------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``attributes``                | Defines optional custom attributes that can be associated with the user. These attributes can be used by the Security plugin or external integrations.                                                 |
+-------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``description``               | Provides a human-readable description of the user account and its intended purpose.                                                                                                                    |
+-------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Default internal users
""""""""""""""""""""""

The default ``internal_users.yml`` file includes the following reserved internal user accounts.

**OpenSearch users**

+------------------+----------------------------------------------------------------------------------------------+
| User             | Purpose                                                                                      |
+==================+==============================================================================================+
| ``admin``        | Default administrator account with full access to the cluster.                               |
+------------------+----------------------------------------------------------------------------------------------+
| ``kibanaserver`` | Reserved internal account used by the Wazuh dashboard to communicate with the Wazuh indexer. |
+------------------+----------------------------------------------------------------------------------------------+

**Wazuh users**

+-------------------+------------------------------------------------------------------+
| User              | Purpose                                                          |
+===================+==================================================================+
| ``wazuh-manager`` | Used by the Wazuh manager to communicate with the Wazuh indexer. |
+-------------------+------------------------------------------------------------------+

Roles
^^^^^

Roles define the permissions granted to users within the Wazuh indexer. Rather than assigning permissions directly to users, the Security plugin groups permissions into roles, which are then assigned to users or backend roles through role mappings.

Each role can define permissions for cluster operations, indices, data streams, and tenants. This enables administrators to implement fine-grained access control based on operational responsibilities while following the principle of least privilege.

Role configuration
~~~~~~~~~~~~~~~~~~

The Security plugin stores role definitions in the following configuration file:

.. code-block:: none

   # /etc/wazuh-indexer/opensearch-security/roles.yml

This file contains the security roles used by the Wazuh indexer. This includes roles provided by the underlying OpenSearch Security plugin and additional roles required by Wazuh components and plugins. During installation, these definitions are loaded into the security index and are used to authorize authenticated users.

Role definition
~~~~~~~~~~~~~~~

Each role is defined as a YAML object containing the permissions assigned to that role. The following abridged example shows the structure of the ``wazuh_manager`` role. The Wazuh platform roles table lists its full permissions:

.. code-block:: yaml

   wazuh_manager:
     reserved: true
     cluster_permissions:
       - "cluster_composite_ops"
       - "indices:data/read/scroll/clear"
       - "cluster_monitor"
     index_permissions:
       - index_patterns:
           - "wazuh-states-*"
           - "wazuh-agent-*"
         allowed_actions:
           - "read"
           - "index"
           - "delete"
       - index_patterns:
           - "wazuh-events-v5-*"
           - "wazuh-events-raw-v5*"
           - "wazuh-metrics-*"
         allowed_actions:
           - "read"
           - "index"
     tenant_permissions: []

The following table describes the most commonly used fields.

+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Field                   | Description                                                                                                                                                                                                                   |
+=========================+===============================================================================================================================================================================================================================+
| ``_meta``               | Defines metadata for the configuration file, including the resource type and configuration version.                                                                                                                           |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Role name``           | The unique identifier of the role.                                                                                                                                                                                            |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``reserved``            | Indicates whether the role is managed by the system. Reserved roles are not to be modified or deleted unless explicitly instructed by the documentation.                                                                      |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hidden``              | Determines whether the role is visible in administrative interfaces.                                                                                                                                                          |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``static``              | Indicates whether the role is system-defined and cannot be modified through normal administrative operations.                                                                                                                 |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cluster_permissions`` | Defines permissions that apply to cluster-wide operations.                                                                                                                                                                    |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``index_permissions``   | Defines permissions for one or more indices or index patterns.                                                                                                                                                                |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``index_patterns``      | Specifies the indices or index patterns to which the permissions apply.                                                                                                                                                       |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``allowed_actions``     | Lists the actions or action groups granted for the specified indices. The ``allowed_actions`` field can reference individual permissions or predefined action groups such as ``read``, ``index``, ``delete``, and ``manage``. |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tenant_permissions``  | Defines permissions granted for one or more tenants.                                                                                                                                                                          |
+-------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Default roles
~~~~~~~~~~~~~

The default ``/etc/wazuh-indexer/opensearch-security/roles.yml`` file contains roles provided by both the OpenSearch Security plugin and the Wazuh platform.

**OpenSearch Security roles**

The underlying OpenSearch Security plugin provides a large number of predefined roles that support the Wazuh indexer features and plugins. These include roles for:

-  Alerting
-  Notifications
-  Anomaly Detection
-  Security Analytics
-  Snapshot Management
-  Index Management
-  Machine Learning
-  Observability
-  Flow Framework
-  Forecasting
-  Search Relevance
-  Other plugins

These roles are intended to support the corresponding Wazuh indexer functionality and are not to be modified.

**Wazuh platform roles**

Wazuh defines the following reserved roles that provide the permissions required by Wazuh components to access Wazuh indices.

+------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Role                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+========================+========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+
| ``wazuh_manager``      | Used by the Wazuh manager. Grants ``read`` on ``.wazuh-settings``, ``.wazuh-cti-consumers``, ``wazuh-active-responses*``, ``wazuh-threatintel-*``, and ``wazuh-findings-v5-*``; ``read`` and ``index`` on ``wazuh-events-v5-*``, ``wazuh-events-raw-v5*``, and ``wazuh-metrics-*``; ``read``, ``index``, and ``delete`` on ``wazuh-states-*`` and ``wazuh-agent-*``; and ``manage_point_in_time`` on ``.wazuh-threatintel-vulnerabilities*`` and ``wazuh-threatintel-*``. Cluster permissions: ``cluster_composite_ops``, ``indices:data/read/scroll/clear``, and ``cluster_monitor``. |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``dashboard_server``   | Used by the Wazuh dashboard. Grants ``read`` and ``indices:admin/mappings/get`` on ``wazuh-*``, and the cluster permission ``cluster:admin/opensearch/notifications/configs/get``.                                                                                                                                                                                                                                                                                                                                                                                                     |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh_ai_assistant`` | Grants ``read`` on ``wazuh-ai-assistant-sessions*``, limited by document-level security to the user's own sessions, and the ``plugin:wazuh/ai_assistant/session/write`` permission. The document-level security filter applies to every user, including ``admin``.                                                                                                                                                                                                                                                                                                                     |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

These roles are assigned to Wazuh reserved internal user accounts through role mappings and provide the minimum permissions required for normal platform operation.

Role mappings
^^^^^^^^^^^^^

Role mappings associate users or backend roles with one or more security roles. While roles define the permissions available within the Wazuh indexer, role mappings determine which authenticated users receive those permissions.

When a user successfully authenticates, the Security plugin evaluates the configured role mappings and assigns the corresponding security roles. The permissions granted by those roles are then used to authorize requests to the Wazuh indexer.

Role mappings support both internal users managed by the Security plugin and users authenticated through external identity providers such as LDAP, Active Directory, SAML, or OpenID Connect (OIDC).

Role mapping configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~

The Security plugin stores role mappings in the following configuration file:

.. code-block:: none

   /etc/wazuh-indexer/opensearch-security/roles_mapping.yml

This file defines the association between users, backend roles, and security roles. During installation, these mappings are loaded into the security index and are subsequently used to determine the permissions assigned to authenticated users. The configuration includes role mappings provided by the underlying OpenSearch Security plugin and additional mappings required by Wazuh components.

Role mapping definition
~~~~~~~~~~~~~~~~~~~~~~~

Each role mapping associates a security role with one or more users, backend roles, or hosts.

The following example shows the structure of a Wazuh role mapping.

.. code-block:: yaml

   wazuh_manager:
     reserved: true
     hidden: false
     users:
       - "wazuh-manager"

The following table describes the most commonly used fields.

+-----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Field                 | Description                                                                                                                                                    |
+=======================+================================================================================================================================================================+
| ``_meta``             | Defines metadata for the configuration file, including the resource type and configuration version.                                                            |
+-----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Role name``         | The name of the security role to which the mapping applies.                                                                                                    |
+-----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``reserved``          | Indicates whether the mapping is managed by the system. Reserved mappings are not to be modified or deleted unless explicitly instructed by the documentation. |
+-----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hidden``            | Determines whether the mapping is displayed in administrative interfaces.                                                                                      |
+-----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``users``             | Lists the internal users assigned to the security role.                                                                                                        |
+-----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``backend_roles``     | Lists backend roles that are mapped to the security role after successful authentication.                                                                      |
+-----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``hosts``             | Restricts the mapping to requests originating from specific hosts.                                                                                             |
+-----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``and_backend_roles`` | Requires additional backend roles before the mapping is applied. This field is typically used with external authentication providers.                          |
+-----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

Default role mappings
"""""""""""""""""""""

The default ``roles_mapping.yml`` file contains role mappings provided by both the OpenSearch Security plugin and the Wazuh platform.

**OpenSearch Security role mappings**

+-------------------+-------------------------------------------------------------------------+
| Role mapping      | Description                                                             |
+===================+=========================================================================+
| ``all_access``    | Maps users with the admin backend role to the all_access security role. |
+-------------------+-------------------------------------------------------------------------+
| ``kibana_server`` | Maps the kibanaserver service account to the kibana_server role.        |
+-------------------+-------------------------------------------------------------------------+

These mappings are intended to support the underlying OpenSearch functionality and are not to be modified.

**Wazuh platform role mappings**

Wazuh adds the following role mappings that associate its reserved internal user accounts with the minimum permissions required for normal platform operation.

+------------------------+-------------------+
| Role mapping           | Mapped users      |
+========================+===================+
| ``dashboard_server``   | kibanaserver      |
+------------------------+-------------------+
| ``wazuh_manager``      | wazuh-manager     |
+------------------------+-------------------+
| ``wazuh_ai_assistant`` | ``*`` (all users) |
+------------------------+-------------------+

These mappings ensure that the Wazuh manager and Wazuh dashboard have only the permissions required to perform their respective functions.

Wazuh permissions
^^^^^^^^^^^^^^^^^

The Wazuh indexer ships action groups for the actions that its plugins register, such as ``plugin:wazuh/settings/write`` for ``cluster:admin/setup/settings/update``. You can grant either name in the roles you define. Error messages show the action name. The default roles use only some of them.

Setup module permissions
~~~~~~~~~~~~~~~~~~~~~~~~

-  ``plugin:wazuh/settings/write``: update the Wazuh settings (``PUT /_plugins/_setup/settings``).
-  ``plugin:wazuh/ai_assistant/session/write``: create, update, and delete the user's own AI assistant sessions. The ``wazuh_ai_assistant`` role grants it to every user.
-  ``plugin:wazuh/ai_assistant/settings/read`` and ``plugin:wazuh/ai_assistant/settings/write``: read and change the AI assistant providers, settings, and field policy.

Content Manager module permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``plugin:content_manager/<RESOURCE>/create``, ``/update``, and ``/delete``, and the ``plugin:content_manager/<RESOURCE>/*`` group of all three, where ``<RESOURCE>`` is ``integration``, ``decoder``, ``rule``, ``kvdb``, or ``filter``.
-  ``plugin:content_manager/policy/update``: create or update a space policy. ``plugin:content_manager/policy/resources/get``: list the resources of a space.
-  ``plugin:content_manager/update``: trigger an on-demand CTI synchronization.
-  ``plugin:content_manager/subscription/get``, ``/post``, and ``/delete``: read, create or update, and delete the CTI subscription.
-  ``plugin:content_manager/promote/get`` and ``/post``: preview and run a promotion. ``plugin:content_manager/promote/*`` groups both.
-  ``plugin:content_manager/logtest``: run the combined log test. ``plugin:content_manager/logtest/detection`` and ``/normalization`` run each phase on its own.
-  ``plugin:content_manager/space/delete``: reset a space, or clear only its normalization or detection resources.
-  ``plugin:content_manager/version/check``: check for newer Wazuh releases (``GET /_plugins/_content_manager/version/check``).

Security Analytics module permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``cluster:admin/wazuh/securityanalytics/detector/write``, ``detector/delete``, and ``detector/set_enabled``
-  ``cluster:admin/wazuh/securityanalytics/logtype/write`` and ``logtype/delete``
-  ``cluster:admin/wazuh/securityanalytics/rule/write``, ``rule/delete``, ``rule/custom/write``, and ``rule/custom/delete``
-  ``cluster:admin/wazuh/securityanalytics/rules/evaluate`` and ``space/delete``

No Wazuh role and no default role mapping grants the upstream ``cluster:admin/opensearch/securityanalytics/*`` actions, so out of the box only users with the ``all_access`` role, such as ``admin``, can call them. The reserved ``security_analytics_full_access`` role includes them, but it isn't mapped to any user by default. This includes ``cluster:admin/opensearch/securityanalytics/detector/write``, which turns a detector on or off.

Sensitive configuration endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following endpoints change configuration with a high impact on the platform. No default role holds their permissions, so out of the box only users with the ``all_access`` role, such as ``admin``, can call them. To delegate one, create a role that grants its permission. Two of these endpoints also write to an index with the caller's permissions, so the role needs the extra permissions listed for them.

-  ``PUT /_plugins/_content_manager/policy/{space}``: ``cluster:admin/content_manager/policy/update``, plus the ``cluster_composite_ops`` cluster permission and ``read`` and ``index`` on ``wazuh-threatintel-*``. Turn it off with ``plugins.content_manager.catalog.policy_update.enabled: false``.
-  ``POST /_plugins/_content_manager/update``: ``cluster:admin/content_manager/update/trigger``. Turn it off with ``plugins.content_manager.catalog.update_on_demand: false``.
-  ``PUT /_plugins/_setup/settings``: ``plugin:wazuh/settings/write``, plus the ``cluster_composite_ops`` cluster permission and ``index`` on ``.wazuh-settings``. Turn it off with ``plugins.setup.settings_update.enabled: false``.

Set these settings in ``/etc/wazuh-indexer/opensearch.yml``. A turned-off endpoint returns ``403 Forbidden`` for every caller, including ``admin``. This is intended for externally managed deployments.

Plugin-internal indices
~~~~~~~~~~~~~~~~~~~~~~~

The Content Manager module uses the following indices for its own bookkeeping, in its own security context. Don't grant custom roles index permissions on them. A role without them works the same.

-  ``.wazuh-content-manager-resource-locks``: short-lived locks that serialize the resource-limit check when content is created.
-  ``.wazuh-cti-consumers``: CTI synchronization state for each consumer. The ``wazuh_manager`` role grants ``read`` on it so that the Wazuh manager can read the synchronization state.
-  ``.wazuh-content-manager-jobs``: Job Scheduler metadata for the synchronization and telemetry jobs.

Managing access control
^^^^^^^^^^^^^^^^^^^^^^^

You can create and manage users and roles through the Wazuh dashboard interface.

.. note::

   Default users and roles cannot be modified. Instead, duplicate them and modify the duplicates. You must be logged in as a user with administrative privileges (for example, ``admin``).

For step-by-step instructions on creating and managing access control resources, see the :doc:`Wazuh RBAC - How to create and map internal users </user-manual/user-administration/rbac>` documentation. It includes procedures for creating internal users, defining custom roles, configuring role mappings, and managing user permissions through the Wazuh dashboard.

.. _wazuh_indexer_security_audit_logs:

Audit logs
----------

The Security plugin records security-relevant activity as audit events, such as failed logins, requests denied for missing permissions, and changes to users, roles, and the rest of the security configuration. The Wazuh indexer stores these events in the ``security-auditlogs`` data stream.

Audit log storage
^^^^^^^^^^^^^^^^^

The ``/etc/wazuh-indexer/opensearch.yml`` file installed by the Wazuh indexer package sends audit events to the ``security-auditlogs`` data stream.

The Security plugin creates the data stream when it records the first audit event. Only users with access to the ``security-auditlogs`` data stream can read the events. By default, this is the ``admin`` user. The data stream name is outside the ``wazuh-*`` pattern on purpose, because the Wazuh dashboard reads ``wazuh-*`` indices on behalf of every dashboard user.

Audit log retention
^^^^^^^^^^^^^^^^^^^

The ``security-auditlogs-policy`` ISM policy manages the data stream. It rolls the data stream over every 30 days, or earlier when a primary shard reaches 20 GB or 200 million documents. It deletes each backing index 90 days after the index is created.

This policy is a Wazuh default policy, so don't edit it. To keep audit events for a different period, create a custom policy as described in :ref:`Creating a custom retention policy <wazuh_indexer_indices_creating_custom_retention_policy>`. Follow the procedure with ``security-auditlogs-policy`` as the default policy and apply ``.ds-security-auditlogs-*`` as the backing indices.

Recorded events
^^^^^^^^^^^^^^^

By default, the Wazuh indexer records the following audit events:

-  Failed logins, as ``FAILED_LOGIN`` events.
-  Requests denied for missing permissions, as ``MISSING_PRIVILEGES`` events. The event includes the permission that was checked.
-  Index administration requests, as ``INDEX_EVENT`` events. These include reads of index templates, mappings, and data streams, so a tool that polls these APIs with an administrative user adds one event per call.
-  Changes to users, roles, role mappings, and the rest of the security configuration, as ``COMPLIANCE_INTERNAL_CONFIG_WRITE`` events. The event records the user who made the change and the configuration type, but not the changed content.

The following activity isn't recorded by default:

-  Successful requests, the ``AUTHENTICATED`` and ``GRANTED_PRIVILEGES`` categories. These categories record every successful request, including each request the Wazuh dashboard makes for a logged-in user, and can quickly fill the disk of a small deployment.
-  Requests from the ``kibanaserver`` user, which the Wazuh dashboard uses for its own requests.
-  Flush requests, ``indices:admin/flush*``. The upgrade procedure flushes the cluster right before stopping each node, and a stopping node can't store the resulting events.

The audit events include the body of REST requests. The security REST API doesn't record passwords sent to it. Other request bodies are stored as sent, so avoid sending secrets in requests that can be denied or audited.

Viewing audit events
^^^^^^^^^^^^^^^^^^^^

To view audit events in the Wazuh dashboard, log in as a user with access to the ``security-auditlogs`` data stream, such as ``admin``. Create an index pattern for ``security-auditlogs*`` with ``@timestamp`` as the time field, and open it in Discover. To create the index pattern, go to **Dashboard management** > **Dashboards Management** > **Index patterns** and click **Create index pattern**. Enter ``security-auditlogs*``, select ``@timestamp`` as the time field, and click **Create index pattern**. Then go to **Explore** > **Discover** and select ``security-auditlogs*``.

You can also query the data stream from **Dev Tools**. For example, the following request returns the 20 most recent failed logins:

.. code-block:: none

   GET security-auditlogs/_search
   {
     "size": 20,
     "sort": [{ "@timestamp": "desc" }],
     "query": { "term": { "audit_category.keyword": "FAILED_LOGIN" } }
   }

The following fields are the most useful. Text fields also have a ``.keyword`` sub-field for exact matches and aggregations, for example, ``audit_category.keyword``.

-  ``audit_category``: event type, for example, ``FAILED_LOGIN``, ``MISSING_PRIVILEGES``, or ``COMPLIANCE_INTERNAL_CONFIG_WRITE``.
-  ``audit_request_effective_user``: user the request ran as.
-  ``audit_request_remote_address``: address the request came from.
-  ``audit_rest_request_method`` and ``audit_rest_request_path``: REST request that produced the event.
-  ``audit_request_privilege``: permission that was checked.
-  ``audit_trace_resolved_indices``: indices the request touched.
-  ``audit_request_body``: request body.

Changing the recorded events
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Security plugin stores the audit configuration in the security index. You can change it in the following ways:

-  In the Wazuh dashboard, go to **Indexer management** > **Users and data access** > **Audit logs**. Changes apply immediately.
-  In the ``/etc/wazuh-indexer/opensearch-security/audit.yml`` file. After editing the file, run the following command on a Wazuh indexer node to load it into the security index:

   .. code-block:: console

      # OPENSEARCH_JAVA_HOME=/usr/share/wazuh-indexer/jdk /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh \
        -f /etc/wazuh-indexer/opensearch-security/audit.yml -t audit -icl -nhnv \
        -cacert /etc/wazuh-indexer/certs/root-ca.pem \
        -cert /etc/wazuh-indexer/certs/admin.pem -key /etc/wazuh-indexer/certs/admin-key.pem \
        -h 127.0.0.1

Loading ``audit.yml`` replaces the whole audit configuration, including changes made on the **Audit logs** page.

To record successful logins, remove the ``AUTHENTICATED`` category from the ``disabled_rest_categories`` and ``disabled_transport_categories`` lists. This category records every successful request.
