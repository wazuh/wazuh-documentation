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

Follow these steps to create an internal user, map it to its appropriate role, and create a new role mapping.

#. :ref:`Log into your WUI<cloud_getting_started_wui_access>` as administrator.

#. Click the upper-left menu icon to open the options, select **Security** and then **Internal users** to open the internal users page.

#. Click **Create internal user**, complete the empty fields with the requested information, and click **Create** to create a user.

#. To map the user to the appropriate role, follow these steps:
   
   #. Go to **Security**, select **Roles** to open the page, and click the name of the role selected to open the window.
   #. Select the **Mapped users** tab and click **Manage mapping**.
   #. Add the user you created in the previous steps and click **Map** to confirm the action.

#. To map the user with Wazuh, follow these steps:
   
   #. Go to the Wazuh WUI, click **Wazuh** to open the menu, select **Security**, and then **Roles mapping** to open the page.
   #. Click **Create Role mapping** and complete the empty fields with the following parameters:
   
      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select the Wazuh roles that you want to map with the user.
      - **Internal users**: Select the internal user created previously.
  
   #. Click **Save role mapping** to save and map the user with Wazuh.


Set a user as admin
^^^^^^^^^^^^^^^^^^^

After creating an internal user and mapping the user to Wazuh, you need to follow these steps to give administrator permissions to the user.

#. :ref:`Log into your WUI<cloud_getting_started_wui_access>` as administrator.

#. Click the upper-left menu icon to open the options, select **Security** and then **Roles** to open the roles page.

#. Search for the **all_access** role in the roles' list and select it to open the details window.

#. Select the **Mapped users** tab and click **Manage mapping**.
 
#. Add the user you created in the previous steps and click **Map** to confirm the action.

#. To map the user with Wazuh, follow these steps:
   
   #. Go to the Wazuh WUI, click **Wazuh** to open the menu, select **Security**, and then **Roles mapping** to open the page.
   #. Click **Create Role mapping** and complete the empty fields with the following parameters:
   
      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select ``administrator``.
      - **Internal users**: Select the internal user created previously.
  
   #. Click **Save role mapping** to save and map the user with Wazuh as *administrator*. 



Set a user as read-only
^^^^^^^^^^^^^^^^^^^^^^^

After creating an internal user and mapping the user to Wazuh, you need to follow these steps to give read-only permissions to the user.

#. :ref:`Log into your WUI<cloud_getting_started_wui_access>` as administrator.

#. Click the upper-left menu icon to open the options, select **Security** and then **Roles** to open the roles page.

#. Click **Create role**, complete the empty fields with the following parameters, and then click **Create** to complete the task. 
   
   - **Name**: Assign a name to the role.
     
   - **Cluster permissions**: ``cluster_composite_ops_ro``

   - **Index**: ``*``

   - **Index permissions**: ``read``

   - **Tenant permissions**: ``global_tenant`` and select the **Read only** option.

#. To map the user with Wazuh, follow these steps:

   #. Go to the Wazuh WUI, click **Wazuh** to open the menu, select **Security**, and then **Roles mapping** to open the page.

   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select ``readonly``.
      - **Internal users**: Select the internal user created previously.

   #. Click **Save role mapping** to save and map the user with Wazuh as *read-only*. 

To add more read-only users, you can skip the role creation task and map the users to the already existing read-only role.


Integrating with external user management systems
-------------------------------------------------

You can configure Wazuh to communicate with an external user management system such as LDAP to authenticate users. Open a support ticket through the **Help** section on your Wazuh Cloud Console to perform this integration.