.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to create Wazuh dashboard users and assign them roles in your Wazuh Cloud environment, including admin and read-only users.

.. _cloud_manage_auth:

Authentication and authorization
================================

Each Wazuh Cloud environment has its own users for the Wazuh dashboard. This page explains how to create Wazuh dashboard users in your environment and give them administrator or read-only permissions.

.. note::

   Wazuh Console accounts and Wazuh dashboard users are separate. You can't log in to the Wazuh dashboard with your Wazuh Console credentials. To log in to the Wazuh dashboard for the first time, use the default credentials shown by **See credentials** in Wazuh Console. See :doc:`Access the Wazuh dashboard </cloud-service/getting-started/access-wazuh-wui>`.

Permissions in the Wazuh dashboard come from two kinds of roles:

-  **Indexer roles** control access to the indexed data, such as alerts and events. You manage them under **Indexer management** > **Users and data access**.
-  **Wazuh roles** control what users can do in the Wazuh platform, such as managing agents or viewing their configuration. You manage them under **Server management** > **API access control**.

A user needs both: an indexer role to see the data and a Wazuh role mapping to use the Wazuh features.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

.. _cloud_manage_auth_create_internal_user:

Creating an internal user
-------------------------

#. Log in to the Wazuh dashboard as an administrator.
#. Click the upper-left menu icon **☰**, go to **Indexer management** > **Users and data access**, and then select **Internal users**.
#. Click **Create internal user**.
#. Enter a username and a password.
#. Click **Create**.

To give the user permissions, map the user to an indexer role and create a Wazuh role mapping for the user:

#. Click **☰**, go to **Indexer management** > **Users and data access**, and then select **Roles**.
#. Select the role you want to give the user.
#. Select the **Mapped users** tab and click **Manage mapping**.
#. Add the user and click **Map**.
#. Click **☰**, go to **Server management** > **API access control**, and then select **Roles mapping**.
#. Click **Create Role mapping** and complete the fields:

   -  **Role mapping name**: a name for the role mapping.
   -  **Roles**: the Wazuh roles to give the user. Wazuh includes default roles such as ``administrator``, ``readonly``, ``agents_admin``, and ``cluster_readonly``.
   -  **Internal users**: the user you created.

#. Click **Save role mapping**.

.. TODO: Confirm with engineering that run_as (wazuh_core.hosts.default.run_as) is enabled on Wazuh Cloud 5.0 environments so role mappings take effect without customer action.

Creating an admin user
----------------------

#. Log in to the Wazuh dashboard as an administrator.
#. Click **☰**, go to **Indexer management** > **Users and data access**, and then select **Internal users**.
#. Click **Create internal user**, enter a username and a password, and type ``admin`` as the **Backend role**.
#. Click **Create**.
#. Click **☰**, go to **Server management** > **API access control**, and then select **Roles mapping**.
#. Click **Create Role mapping** and complete the fields:

   -  **Role mapping name**: a name for the role mapping.
   -  **Roles**: ``administrator``.
   -  **Internal users**: the user you created.

#. Click **Save role mapping**.

Creating a read-only user
-------------------------

#. Log in to the Wazuh dashboard as an administrator.
#. Click **☰**, go to **Indexer management** > **Users and data access**, and then select **Internal users**.
#. Click **Create internal user**, enter a username and a password, and click **Create**.
#. Click **☰**, go to **Indexer management** > **Users and data access**, and then select **Roles**.
#. Click **Create role** and complete the fields:

   -  **Name**: a name for the role.
   -  **Cluster permissions**: ``cluster_composite_ops_ro``.
   -  **Index**: ``*``.
   -  **Index permissions**: ``read``.

#. Click **Create**.
#. Select the **Mapped users** tab and click **Manage mapping**.
#. Add the user and click **Map**.
#. Click **☰**, go to **Server management** > **API access control**, and then select **Roles mapping**.
#. Click **Create Role mapping** and complete the fields:

   -  **Role mapping name**: a name for the role mapping.
   -  **Roles**: ``readonly``.
   -  **Internal users**: the user you created.

#. Click **Save role mapping**.

To add more read-only users, create the users and map them to the read-only indexer role and role mapping you already created.

The read-only user can't change anything, and some pages show a permission error or an empty list. Don't map the user to the ``kibana_user`` role, because it gives write access to the Wazuh dashboard configuration.

External identity providers
---------------------------

To authenticate Wazuh dashboard users with an external identity provider, such as LDAP or a SAML provider, contact Wazuh support. In Wazuh Console, in the sidebar, under **Help**, select **Support**.

.. TODO: Confirm with engineering which external identity providers Wazuh Cloud 5.0 environments support and how customers request them.
