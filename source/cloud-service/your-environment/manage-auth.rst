.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_manage_wui_access:

.. meta::
  :description: Learn about how to manage access to your WUI

Authentication and authorization
================================

You can use the native support for managing and authenticating users, or integrate with external user management systems.

.. note::
   
   You cannot log in to Wazuh WUI of your environment with your Wazuh Cloud account. To log in to Wazuh WUI, use the default credentials you downloaded from the Wazuh Cloud Console page or the credentials of any user you already created in Wazuh WUI.
  

Native support for users and roles
----------------------------------

The Wazuh WUI allows you to add users, create roles, and mapping roles to users.

Follow these steps to create an internal user with read access as an example:

1. :ref:`Log into your WUI<cloud_getting_started_wui_access>` as administrator.

2. Click the upper-left menu icon to open the options, select **Security** and then **Internal users** to open the internal users page.

3. Click **Create internal user**, complete the empty fields with the requested information, and click **Create** to create a user.

4. To map the user to the appropriate role, follow these steps:
   
   #. Go to **Security**, select **Roles** to open the page, and click the name of the role selected to open the window.
   #. Select the **Mapped users** tab and click **Manage mapping**.
   #. Add the user you created in the previous steps and click **Map** to confirm the action.

5. To map the user with Wazuh, follow these steps:
   
   #. Go to the Wazuh WUI, click **Wazuh** to open the menu, select **Security**, and then **Roles mapping** to open the page.
   #. Click **Create role mapping** and complete the empty fields with the following parameters:
   
      - Role mapping name: Assign a name to the role mapping.
      - Roles: Select the Wazuh roles that you want map to the user.
      - Internal users: Select the internal user created previously.
   #. Click **Save role mapping** to save and map the user with Wazuh.

Now, your new user is able to access the Wazuh WUI. 

Set an user as admin
--------------------

After creating an internal user and mapping the user to Wazuh, you need to follow these steps to give administrator permissions to the user:

1. :ref:`Log into your WUI<cloud_getting_started_wui_access>` as administrator.

2. Click the upper-left menu icon to open the options, select **Security** and then **Roles** to open the roles page.

4. Click the **all_access** role to open the role detail.

5. Select the **Mapped users** tab and click **Manage mapping**.
 
6. Add the user you created in the previous steps and click **Map** to confirm the action.

4. To map the user as administrator with Wazuh, repeat the step 5 of the **Create internal user* guide, but for the **Roles** parameter select just ``administrator`` role.


Set an user as read-only
-----------------------

After creating an internal user and mapping the user to Wazuh, you need to follow these steps to give read-only permissions to the user:

1. :ref:`Log into your WUI<cloud_getting_started_wui_access>` as administrator.

2. Click the upper-left menu icon to open the options, select **Security** and then **Roles** to open the roles page.

3. Click **Create role**, complete the empty fields with the following parameters, and then click **Create** to complete the task. 
   
   - Name: Assign a name to the role.
     
   - Cluster permissions: ``cluster_composite_ops_ro``

   - Index: ``*``

   - Index permissions: ``read``

   - Tenant permissions: ``global_tenant`` and select the **Read only** option.

4. To map the user as read-only with Wazuh, repeat the step 5 of the **Create internal user* guide, but for the **Roles** parameter select just ``readonly`` role.

To add more read-only users, you can skip the role creation task and map them to the already existing read-only role.


Integrating with external user management systems
-------------------------------------------------

You can configure Wazuh to communicate with an external user management system such as LDAP to authenticate users. Open a support ticket through the **Help** section on your Wazuh Cloud Console to perform this integration.