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
     description: "Admin user"

   kibanaserver:
     hash: "<HASH>"
     reserved: true
     description: "Wazuh dashboard user"

   wazuh-manager:
     hash: "<HASH>"
     reserved: true
     backend_roles: []
     description: "Wazuh manager user"

.. note::

   The password hashes are generated for each installation. The passwords are stored in ``/etc/wazuh/credentials.env``.

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

Each role is defined as a YAML object containing the permissions assigned to that role. The following example shows the structure of the ``wazuh_manager`` role:

.. code-block:: yaml

   wazuh_manager:
     reserved: true
     cluster_permissions:
       - "cluster_composite_ops"
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

+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Role                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+========================+===================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================+
| ``wazuh_manager``      | Used by the Wazuh manager. Grants ``read`` on ``.wazuh-settings``, ``.wazuh-cti-consumers``, ``wazuh-active-responses*``, ``wazuh-threatintel-*``, and ``wazuh-findings-v5-*``; ``read`` and ``index`` on ``wazuh-events-v5-*``, ``wazuh-events-raw-v5*``, and ``wazuh-metrics-*``; ``read``, ``index``, and ``delete`` on ``wazuh-states-*`` and ``wazuh-agent-*``; and ``manage_point_in_time`` on ``.wazuh-threatintel-vulnerabilities*`` and ``wazuh-threatintel-*``. Cluster permissions: ``cluster_composite_ops`` and ``cluster_monitor``. |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``dashboard_server``   | Used by the Wazuh dashboard. Grants ``read`` and ``indices:admin/mappings/get`` on ``wazuh-*``, and the cluster permission ``cluster:admin/opensearch/notifications/configs/get``.                                                                                                                                                                                                                                                                                                                                                                |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh_ai_assistant`` | Grants ``read`` on ``wazuh-ai-assistant-sessions*``, limited by document-level security to the user's own sessions, and the ``plugin:wazuh/ai_assistant/session/write`` permission.                                                                                                                                                                                                                                                                                                                                                               |
+------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

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

Managing access control
^^^^^^^^^^^^^^^^^^^^^^^

You can create and manage users and roles through the Wazuh dashboard interface.

.. note::

   Default users and roles cannot be modified. Instead, duplicate them and modify the duplicates. You must be logged in as a user with administrative privileges (for example, ``admin``).

For step-by-step instructions on creating and managing access control resources, see the :doc:`Wazuh RBAC - How to create and map internal users </user-manual/user-administration/rbac>` documentation. It includes procedures for creating internal users, defining custom roles, configuring role mappings, and managing user permissions through the Wazuh dashboard.
