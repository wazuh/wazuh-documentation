.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: This section of the Wazuh documentation explains what a role-based access control system is and how you can use it with Wazuh. 
  
.. _wazuh-rbac:

Wazuh role-based access control
===============================

Wazuh RBAC allows access to Wazuh resources based on the roles and policies assigned to the users. It is an easy-to-use administration system that permits to manage users or entities’ permissions to the different resources of the system in a simple way. The users will be able to execute only the functions over which they have permissions. 

Learn how to create internal users and map them with Wazuh in the below sections.

- `Creating and setting a Wazuh admin user`_
- `Creating and setting a Wazuh read-only user`_ 
- `Creating an internal user and mapping it to Wazuh`_
- `Use case: Give a user permissions to manage an agents group`_


Creating and setting a Wazuh admin user
---------------------------------------

Follow these steps to create an internal user, create a new role mapping, and give administrator permissions to the user.

#. Log into Kibana as administrator.

#. Click the upper-left menu icon to open the options, select **Security** and then **Internal users** to open the internal users page.

#. Click **Create internal user**, complete the empty fields with the requested information, and click **Create** to complete the action.

#. To map the user to the appropriate role, follow these steps:

   #. Click the upper-left menu icon to open the options, select **Security** and then **Roles** to open the roles page.

   #. Search for the **all_access** role in the roles' list and select it to open the details window.

   #. Select the **Mapped users** tab and click **Manage mapping**.
   
   #. Add the user you created in the previous steps and click **Map** to confirm the action.

#. To map the user with Wazuh, follow these steps:
   
   #. Click **Wazuh** to open the menu, select **Security** and then **Roles mapping** to open the page.
   #. Click **Create Role mapping** and complete the empty fields with the following parameters:
   
      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select ``administrator``.
      - **Internal users**: Select the internal user created previously.
  
   #. Click **Save role mapping** to save and map the user with Wazuh as *administrator*. 

   For the role mapping to take effect, enable ``run_as`` in ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` configuration file. Restart the Kibana service and clear your browser cache and cookies.


Creating and setting a Wazuh read-only user
-------------------------------------------

Follow these steps to create an internal user, create a new role mapping, and give read-only permissions to the user.

#. Log into Kibana as administrator.

#. Click the upper-left menu icon to open the options, select **Security** and then **Internal users** to open the internal users page.

#. Click **Create internal user**, complete the empty fields with the requested information, and click **Create** to complete the action.

#. To map the user to the appropriate role, follow these steps:

   #. Click the upper-left menu icon to open the options, select **Security** and then **Roles** to open the roles page.

   #. Click **Create role**, complete the empty fields with the following parameters, and then click **Create** to complete the task. 
     
      - **Name**: Assign a name to the role.
       
      - **Cluster permissions**: ``cluster_composite_ops_ro``

      - **Index**: ``*``

      - **Index permissions**: ``read``

      - **Tenant permissions**: ``global_tenant`` and select the **Read only** option.

   #. Select the **Mapped users** tab and click **Manage mapping**.
   
   #. Add the user you created in the previous steps and click **Map** to confirm the action.   

#. To map the user with Wazuh, follow these steps:

   #. Click **Wazuh** to open the menu, select **Security** and then **Roles mapping** to open the page.

   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select ``readonly``.
      - **Internal users**: Select the internal user created previously.

   #. Click **Save role mapping** to save and map the user with Wazuh as *read-only*. 

   For the role mapping to take effect, enable ``run_as`` in ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` configuration file. Restart the Kibana service and clear your browser cache and cookies.


Creating an internal user and mapping it to Wazuh
-------------------------------------------------

Follow these steps to create an internal user and map it to a given role.

#. Log into Kibana as administrator.

#. Click the upper-left menu icon to open the options, select **Security** and then **Internal users** to open the internal users page.

#. Click **Create internal user**, complete the empty fields with the requested information, and click **Create** to complete the action.

#. To map the user to a given role, follow these steps:
   
   #. Go to **Security**, select **Roles** to open the page, and click the name of the role selected to open the window.
   #. Select the **Mapped users** tab and click **Manage mapping**.
   #. Add the user you created in the previous steps and click **Map** to confirm the action.

#. To map the user with Wazuh, follow these steps:
   
   #. Click **Wazuh** to open the menu, select **Security** and then **Roles mapping** to open the page.
   #. Click **Create Role mapping** and complete the empty fields with the following parameters:
   
      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select the Wazuh roles that you want to map the user with.
      - **Internal users**: Select the internal user created previously.
  
   #. Click **Save role mapping** to save and map the user with Wazuh.

   For the role mapping to take effect, enable ``run_as`` in ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` configuration file. Restart the Kibana service and clear your browser cache and cookies.


Use case: Give a user permissions to manage an agents group
-----------------------------------------------------------

In this use case, we have an environment with five agents and we want to create a user with permissions to manage an agent group. Agents **001**, **002**, and **005** belong to the ``Team_A`` group whereas agents **003**, **004**, and **005** belong to the ``Team_B`` group. To learn more on how to create agents groups see :ref:`Grouping agents <grouping-agents>`. 

.. thumbnail:: ../../images/kibana-app/rbac/environment.png
    :title: Keys
    :align: center
    :width: 100%

To prepare the environment, add a label in the ``Team_A`` centralized configuration ``agent.conf``. To learn more, see :ref:`Agent labels <labels>`. 

  .. code-block:: console

      <agent_config>
      	<labels>
      		<label key="group">Team_A</label>
      	</labels>
      </agent_config>

Follow these steps to create an internal user and give them permissions to manage an agents group. 

#. Log into Kibana as administrator.

#. Click the upper-left menu icon to open the available options, select **Security** and then **Internal users** to open the internal users page.

#. Click **Create internal user**, complete the empty fields with the requested information, and click **Create** to complete the action.

#. To create a custom role and map the user to it, follow these steps:
   
   #. Go to **Security**, select **Roles** to open the page.
   #. Click **Create role**, complete the empty fields with the following parameters: 
     
      - **Name**: Assign a name to the role.
       
      - **Cluster permissions**: ``cluster_composite_ops_ro``

      - **Index**: ``*``

      - **Index permissions**: ``read``

   #. Click **Add another index permission** and unfold the new section **Add index permission**. Complete the empty fields with the following parameters: 

      - **Index**: ``wazuh-alerts*`` 

      - **Index permissions**: ``read``

      - **Document level security**: 
      
        .. code-block:: console

          {
            "bool": {
              "must": {
                "match": {
                  "agent.labels.group": "Team_A"
                }
              }
            }
          }

   #. Click **Add another index permission** and unfold the new section **Add index permission**. Complete the empty fields with the following parameters: 

      - **Index**: ``wazuh-monitoring*`` 

      - **Index permissions**: ``read``

      - **Document level security**: 

        .. code-block:: console
     
          {
            "bool": {
              "must": {
                "match": {
                  "group": "Team_A"
                }
              }
            }
          }          
            

   #. Under **Tenant permissions** select **Tenant**: ``global_tenant`` and the **Read only** option.
   #. Click **Create** to complete the task.    
   #. Select the **Mapped users** tab and click **Manage mapping**.
   #. Add the user you created in the previous steps and click **Map** to confirm the action.

#. To map the user with Wazuh, follow these steps:
   
   #. Click **Wazuh** to open the menu, select **Security** and then **Policies** to open the policies page.
   #. Click **Create policy** and complete the empty fields with the requested information.
   
      - **Policy name**: Assign a name to the new policy. 
      - **Action**: Select the actions that the user is allowed to perform, for example, ``agent:read``, and click **Add**. Select as many actions as needed. 
      - **Resource**: Select ``agent:group``.
      - **Resource identifier**: Write the name of the agents group, for example, ``Team_A``, and click **Add**. You can add as many resources as needed. 
      - **Select an effect**: Select ``Allow``.  
       
       .. thumbnail:: ../../images/kibana-app/rbac/create_policy.png
          :title: Keys
          :align: center
          :width: 100%
    
   #. Click **Create policy** to complete the action.
   #. Click **Roles** to open the tab, click **Create Role**, and fill the empty fields with the requested information. 

      - **Role name**: Assign a name to the new role. 
      - **Policies**: Select the policy created previously. 
    
       .. thumbnail:: ../../images/kibana-app/rbac/create_role.png
          :title: Keys
          :align: center
          :width: 100%


   #. Click **Create role** to confirm the action.
   #. Click **Create Role mapping** and complete the empty fields with the requested information.
   
      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select the role created previously. 
      - **Internal users**: Select the internal user created previously.

       .. thumbnail:: ../../images/kibana-app/rbac/create_new_role_mapping.png
          :title: Keys
          :align: center
          :width: 100%
  
   #. Click **Save role mapping** to finish the action. 

   For the role mapping to take effect, enable ``run_as`` in ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` configuration file. Restart the Kibana service and clear your browser cache and cookies.


You have now created a new internal user and mapped it to manage a Wazuh agents group. Authenticate with the new user and open the Wazuh Kibana plugin, see that only ``Team_A`` agents' alerts and information are displayed.  


.. thumbnail:: ../../images/kibana-app/rbac/team_A_agents.png
    :title: Keys
    :align: center
    :width: 100%







