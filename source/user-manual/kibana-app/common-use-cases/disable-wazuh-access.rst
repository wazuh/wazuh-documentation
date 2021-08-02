.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_disable_wazuh_access:

.. meta::
  :description: Learn about how to disable access to Wazuh App from Kibana

Disable access to Wazuh App
===========================

Sometimes you need to restring access to the Wazuh App for Kibana, to achieve it follow these steps:

1. Login into Kibana as administrator.

2. Click the upper-left menu icon to open the options, select **Security** and then **Roles** to open the roles page.

3. Click **Create role**, complete the empty fields with the following parameters, and then click **Create** to complete the task.
   
   - Name: Assign a name to the role.

   - Index: ``wazuh*``

   - Index permissions: keep empty to denied all permissions

4. Select the **Mapped users** tab and click **Manage mapping**.
 
5. Add the user you created in the previous steps and click **Map** to confirm the action.

6. Set in your :ref: `wazuh.yml <../reference/config-file` the config **disabled_roles** the new role and any other that you need to disable Wazuh app for.

.. code-block:: yaml

  disabled_roles:
      - my_wazuh_disabled_role    
