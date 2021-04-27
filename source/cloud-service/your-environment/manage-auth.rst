.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_manage_wui_access:

.. meta::
  :description: Learn about how to manage access to your WUI

Authentication and authorization
================================

You can use the native support for managing and authenticating users, or integrate with external user management systems.

.. note::
   
   You cannot log in to the Wazuh WUI of your environment with your Wazuh Cloud account. Use the default credentials or any users you created in Wazuh WUI already.
  

Native support for users and roles
----------------------------------

In the Wazuh WUI, you can add users, create roles, and mapping roles to users.

As an example, follow the next step to create an internal user with read access:

1. :ref:`Log into your WUI<cloud_getting_started_wui_access>` as administrator.

2. Go to the **Security** > **Internal users** page.

3. Click **Create internal user**. Fill the form and click on **Create** to create a user.

4. Go to the **Security** > **Roles** page.

5. Click **Create role**. Fill in the form to create the role. For a simple read-only user create it with the following specifications:

   - **Name:** Fill it with the desired name.
     
   - **Cluster permissions:** ``cluster_composite_ops_ro``

   - **Index:** ``*``

   - **Index permissions:** ``read``

   - **Tenant permissions:** ``global_tenant`` select "Read only" option.

6. Now, map the role to the appropriate user. Go to the **Security** > **Roles** page. Select the role and click on **Mapped users**, then **Manage mapping**.

7. Add the user you created on the previous steps and click on **Map** to confirm the action.

8. Finally, we need to map the user with Wazuh. Go to the **Wazuh** > **Security** > **Roles mapping** page.

9. Click on **Create role mapping**. Use the following parameters:

   - **Name:** Fill it with the desired name.

   - **Roles:** Select ``readonly`` role.

   - **Internal users:** Select the internal user created previously.

   - Add a new rule with the **User field** ``role`` and set **Value** to the name you assigned to Kibana's role from previous steps.

Now, your new user is able to access the Wazuh WUI as read-only user. To add more read-only users, you can skip the role creation part and map it to the already existing read-only role.

Integrating with external user management systems
-------------------------------------------------

You can configure Wazuh to communicate with an external user management system such as LDAP to authenticate users. Open a support ticket to perform this integration.