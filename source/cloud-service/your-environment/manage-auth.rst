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

Creating and setting a Wazuh read-only user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow these steps to create an internal user, create a new role mapping, and give read-only permissions to the user.

#. Log into your :doc:`Wazuh dashboard </cloud-service/getting-started/access-wazuh-wui>` as administrator.

#. Click the upper-left menu icon **☰** and expand **Indexer management** then click on **Security**, and then **Internal users** to open the internal users' page.

#. Click **Create internal user**, complete the empty fields with the requested information, and click **Create** to complete the action.

#. Follow these steps to map the user to the appropriate role:

   #. Click **Create role**, complete the empty fields with the following parameters, and then click **Create** to complete the task.

      - **Name**: Assign a name to the role.
      - **Cluster permissions**: ``cluster_composite_ops_ro``
      - **Index**: ``*``
      - **Index permissions**: ``read``
      - **Tenant permissions**: ``global_tenant`` and select the **Read only** option.

   #. Select the **Mapped users** tab and click **Manage mapping**.
   #. Add the user you created in the previous steps and click **Map** to confirm the action.

#. Follow these steps to map the user with Wazuh:

   #. Click the upper-left menu icon **☰** and expand **Server management** then click on **Security**.
   #. On the **Security** page, go to the **Roles mapping** pane.
   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select ``readonly``.
      - **Internal users**: Select the internal user created previously.

   #. Click **Save role mapping** to save and map the user with Wazuh as *read-only*. 

To add more read-only users, you can skip the role creation task and map the users to the already existing read-only role.


Integrating with external user management systems
-------------------------------------------------

You can configure Wazuh to communicate with an external user management system such as LDAP to authenticate users. Open a support ticket through the **Help** section on your Wazuh Cloud Console to perform this integration.
