.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_manage_wui_access:

.. meta::
  :description: Learn about how to manage access to your WUI

Manage WUI access
=================

When an environment is created you are granted access to its WUI to interact with it. More users can be added to access the WUI besides the administrator.

Granting WUI access to others
-----------------------------

Follow these steps to achieve a simple read-only access for new users:

1. :ref:`Log into your WUI<cloud_getting_started_wui_access>` as administrator (``wazuh_admin`` by default).

2. Create a user for Kibana: Click on Kibana's menu. Select the **Management** drop-down menu. Then, select **Security** option. Select the **Internal users** option and click on **Create internal user**. Here, you will be able to specify credentials for your new user and create it.

3. Assign a read-only role to Kibana user: On the same **Security** option from previous step, select the **Roles** option, and click on **Create role**. On this menu, you can create users according to your needs. For a simple read-only user create it with the following specifications:

   - **Name:** Fill it with the desired name.
     
   - **Cluster permissions:** ``cluster_composite_ops_ro``

   - **Index:** ``*``

   - **Index permissions:** ``read``

   - **Tenant permissions:** ``global_tenant`` select "Read only" option.

4. Map your user to this role. Now that the role has been created you should be able to see its management tab (You may also get to this page by clicking in said role in the list shown in previous step's **Roles** option). Here select **Mapped users** and select **Manage mapping**. Add the user you created on previous steps and click on **Map** to confirm the action.

5. Map your user with Wazuh RBAC (Role-Based Access Control) roles: Click on the Wazuh App icon, click on the app's drop-down menu and select **Security**, followed by **Roles mapping** option. Here, click on **Create role mapping**. To achieve the read-only configuration create it with the following parameters:

   - **Name:** Fill it with the desired name.

   - **Roles:** Select ``readonly`` role.

   - **Internal users:** Select the internal user created previously.

   - Add a new rule with **User field** ``role`` and set **Value** to the name you assigned to Kibana's role from previous steps.

Now your new user will be able to access your WUI as a read-only user. To add more read-only users, you can skip the role creation part and map it to the already existing read-only role.

Additionally, to achieve a granular access on your users it is possible to define specific roles and policies. Then, add users to the new roles to grant specific permissions. . Use :ref:`RBAC documentation<api_rbac>` for this purpose.
