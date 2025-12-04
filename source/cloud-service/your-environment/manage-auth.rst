.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can use the native support for managing and authenticating users or integrate with external user management systems.

Authentication and authorization
================================

You can use the native support for managing and authenticating users or integrate with external user management systems.

.. note::

   You cannot log in to the Wazuh dashboard with your Wazuh Cloud account credentials. To log in to the Wazuh dashboard, use the default credentials from the Wazuh Cloud Console or credentials for a dashboard user you created.

Native support for users and roles
----------------------------------

The Wazuh dashboard allows you to add users, create roles, and map roles to users. The following sections highlight more on this.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

.. _cloud_manage_auth_create_internal_user:

Creating an internal user
^^^^^^^^^^^^^^^^^^^^^^^^^

Follow these steps to create an internal user.

#. Log in to the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Indexer management** and select **Security**.
#. Select **Internal users** on the left pane, click **Create internal user** and complete the fields.
#. Click **Create** to complete the action.


   .. thumbnail:: /images/cloud-service/create-internal-user.gif
      :title: Create internal user
      :alt: Create internal user
      :align: center
      :width: 80%

Managing Wazuh indexer roles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Indexer roles are the core way of controlling access to your Wazuh indexer cluster. Roles contain any combination of cluster-wide permission, index-specific permissions, document and field-level security, and tenants. These roles define what a user can query, view, or manage within the indexer (logs, alerts, dashboards).

.. note::

   You cannot customize reserved roles. Create a custom role with the same permissions or duplicate a reserved role to customize it. Then you map users to these roles so that users gain those permissions.

Follow these steps to create an indexer role using existing roles templates:

#. Log in to the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Indexer management** and select **Security**.
#. Click on **Roles** on the left panel and select a role with the required permissions.
#. Click **Actions** at the top section and select **Duplicate**.
#. Fill in the required information on the **Duplicate Role** page.
#. Click **Create** to complete the process.

   .. thumbnail:: /images/cloud-service/managing-indexer-roles.gif
      :title: Managing indexer roles
      :alt: Managing indexer roles
      :align: center
      :width: 80%

Mapping users to Wazuh indexer roles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh indexer role mappings are how users are granted access to indexed data in Wazuh. While indexer roles define the set of permissions available (such as searching logs, viewing alerts, or managing index patterns), role mappings connect those roles to individual users or user groups. This allows administrators to control who can query data, build dashboards, or access specific indices.

Follow these steps to map users to appropriate indexer roles:

#. Log in to the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Indexer management** and select **Security**.
#. Click on **Roles** on the left panel and search for the role created previously.
#. Click the role name to open the window.
#. Select the **Mapped users** tab and click **Manage mapping**.
#. Add the internal user and click **Map** to confirm the action.

   .. thumbnail:: /images/cloud-service/mapping-users-to-indexer-roles.gif
      :title: Mapping users to Wazuh indexer roles
      :alt: Mapping users to Wazuh indexer roles
      :align: center
      :width: 80%

Managing Wazuh server roles
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh server roles are the primary way of controlling access to the Wazuh platform. They define what actions a user can perform within the Wazuh server and dashboard. Server roles may include permissions to manage agents, configure rules, adjust settings, or perform read-only operations. By assigning roles, administrators can control who is allowed to view alerts, enroll or remove agents, modify security configurations, or access sensitive management functions.

.. note::

   Policies assigned during a role creation define the permissions associated with the role. Explore the **Policies** pane before creating a role to understand the actions and other components that make a policy.

In most cases, the available roles are sufficient for day to day operations. However, depending on user requirements, new roles can be created.

Follow these steps to create a server role:

#. Log in to the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Server management** and select **Security**.
#. On the **Security** page, go to the **Roles** pane.
#. Click **Create role**.
#. Provide a name for the new role and select your preferred policies from the list.
#. Click **Create role** to complete the process.

   .. thumbnail:: /images/cloud-service/managing-server-roles.gif
      :title: Managing Wazuh server roles
      :alt: Managing Wazuh server roles
      :align: center
      :width: 80%

Mapping users to Wazuh server roles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh server role mappings are how permissions are assigned to users in the Wazuh platform. While server roles define what actions are possible, role mappings connect those roles to specific users or user groups. This ensures that the right people have the appropriate level of access to manage agents, configure rules, or view alerts. By managing role mappings, administrators control who can perform operational and administrative tasks within Wazuh.

Follow these steps to map users to server roles:

#. Log in to the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Server management** and select **Security**.
#. On the **Security** page, go to the **Roles mapping** pane.
#. Click **Create Role mapping**.
#. Assign a name to the role mapping.
#. Select the roles you want to map the user with.
#. Select the internal user.
#. Click **Save role mapping** to save and map the user with the role.

   .. thumbnail:: /images/cloud-service/mapping-users-to-server-roles.gif
      :title: Mapping users to Wazuh server roles
      :alt: Mapping users to Wazuh server roles
      :align: center
      :width: 80%

Creating and setting a Wazuh admin user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps in the :ref:`Creating an internal user <cloud_manage_auth_create_internal_user>` section to create an internal user. Once the user has been created, follow these steps to create the required indexer role and map the created user to the role:

#. Log in to the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Indexer management** and select **Security**.
#. Click **Roles** to open the page and search for the **all_access** role in the list.
#. Select it, click **Actions** and select **Duplicate**.
#. Assign a name to the new role, then click **Create** to confirm the action.
#. On the newly created role page, select the **Mapped users** tab and click **Manage mapping**.
#. Add the user and click **Map** to confirm the action.

   .. thumbnail:: /images/cloud-service/creating-admin-user.gif
      :title: Creating and setting a Wazuh admin user
      :alt: Creating and setting a Wazuh admin user
      :align: center
      :width: 80%

Follow these steps to create the required server role mapping, and map the user with the role to assign admin permissions:

#. Click the upper-left menu icon **☰**, expand **Server management** and select **Security**.
#. On the **Security** page, go to the **Roles mapping** pane.
#. Click **Create Role mapping**.
#. Assign a name to the role mapping.
#. Select **administrator** in the role field.
#. Select the internal user.
#. Click **Save role mapping** to save and map the user as an administrator.

   .. thumbnail:: /images/cloud-service/create-server-role-mapping.gif
      :title: Creating server role mapping
      :alt: Creating server role mapping
      :align: center
      :width: 80%

Creating and setting a Wazuh read-only user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps in the :ref:`Creating an internal user <cloud_manage_auth_create_internal_user>` section to create an internal user. Once the user has been created, follow these steps to create the required indexer role and map the created user to the role:

#. Log in to the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Indexer management** and select **Security**.
#. Click **Roles** to open the page and click **Create role**.
#. Assign a name to the new role.
#. Select the following options in the empty fields:

   #. Cluster permissions: **cluster_composite_ops_ro**
   #. Index: **\***
   #. Index permissions: **read**
   #. Tenant permissions: **global_tenant** and select the **Read only** option.

#. Click **Create** to complete the process.
#. On the newly created role page, select the **Mapped users** tab and click **Manage mapping**.
#. Add the user and click **Map** to confirm the action.

   .. thumbnail:: /images/cloud-service/creating-read-only-user.gif
      :title: Creating and setting a Wazuh read-only user
      :alt: Creating and setting a Wazuh read-only user
      :align: center
      :width: 80%

Follow these steps to create the required server role mapping, and map the user with the role to assign read-only permissions:

#. Click the upper-left menu icon **☰**, expand **Server management** and select **Security**.
#. Go to the **Roles mapping** pane on the **Security** page.
#. Click **Create Role mapping**.
#. Assign a name to the role mapping.
#. Select **readonly** in the role field.
#. Select the internal user.
#. Click **Save role mapping** to save and map the user with the read-only role.

   .. thumbnail:: /images/cloud-service/create-server-role-mapping-ro.gif
      :title: Creating server role mapping
      :alt: Creating server role mapping
      :align: center
      :width: 80%

To add more read-only users, you can skip the role creation task and map the users to the already existing read-only role.

Integrating with external user management systems
--------------------------------------------------

In many organizations, user access is centrally managed through directory services such as Active Directory, Keycloak, or other identity providers. Integrating Wazuh Cloud with these external systems ensures that authentication and authorization are consistent with existing security policies. This approach simplifies user management, improves compliance, and reduces the overhead of maintaining separate accounts just for Wazuh.

Wazuh Cloud supports integration with external user management systems such as LDAP for authentication. To enable this feature, open a support ticket through the **Help** section in your Wazuh Cloud Console, and the Wazuh Support team will guide you through the setup process.
