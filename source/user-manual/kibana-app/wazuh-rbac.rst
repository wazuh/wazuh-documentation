.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: This section of the Wazuh documentation explains what a role-based access control system is and how you can use it with Wazuh. 
  
.. _wazuh-rbac:

Getting started with Wazuh RBAC
===============================
Role-based access control systems refer to security mechanisms designed to control users’ access to a system’s resources or tasks. These systems control the users’ access and distribute the different resources and actions so that system administrators can have specific users for each task or access to resources.

The main features provided by RBAC in Wazuh are:

- Allows access to Wazuh resources based on the roles and policies assigned to the users.

- It is an easy-to-use administration system that permits to manage users or entities’ permissions to the different resources of the system in a simple way.

- The users will be able to execute only the functions over which they have permissions. This way, the system administrators can isolate the workflow of each of the users.

- It allows administrators to create different categories of users with additional permissions and roles in the system.

- These actions are done through the following entities:

  - Relationships between users, roles, and policies.

  - Customized rules that allow the acquisition of permissions without creating the user-role relationship in the database. This functionality is beneficial for audits and temporary users.

In the following link, you can find more information about `how to modify the RBAC configuration <https://documentation.wazuh.com/current/user-manual/api/rbac/configuration.html>`_.



RBAC in Wazuh
-------------

RBAC manages the system resources and is a layer between the software and its clients. This layer works at a low level within the software Wazuh ensuring that all API endpoints are protected and appropriately managed.

RBAC has two authentication methods, and the first of these is access through the relationship between users and roles. This method is the classic m    ethod in which a client provides a username-password and based on the relationship of the specified user, it will obtain the designated permissions.

In the following link, you can find more information about how to `assign roles to a user <https://documentation.wazuh.com/current/user-manual/api/rbac/configuration.html#assign-roles-to-a-user>`_. 

.. thumbnail:: ../../images/kibana-app/rbac_scheme.png
    :title: Keys
    :align: left
    :width: 100%

The second method of access is based on the relationship between the rules and the roles of the system. In this way, each rule satisfied by the authorization context provided by the client will grant all the roles associated with it. Each rule can be related to one or several roles. If it is successfully checked, the user will have the permissions given by the roles associated with the satisfied rules. 

In the following link, you can find more information about `the authorization context <https://documentation.wazuh.com/current/user-manual/api/rbac/auth_context.html#authorization-context>`_. 

.. thumbnail:: ../../images/kibana-app/rbac_scheme2.png
    :title: Keys
    :align: left
    :width: 100%    

Below we will focus on the second method. This access system is based on authorization contexts, which will be checked by each of the system rules. Every rule satisfied by an authorization context will give specific roles to the user who presents the authorization context.

Wazuh RBAC system works in both non-clustered and clustered environments, being this last one transparent to it. RBAC can grant permissions on the different cluster nodes and work independently because all the information is always stored in the master node.


RBAC at Wazuh’s UI
------------------

As indicated in the scheme, an authorization context can either be created or obtained by some means. To illustrate this, we will work on a use case where there will be an environment with ten agents.

These agents are divided into two different groups. On one side, the agents 001, 002, 003, 004, 005, and 006 belong to the Framework group. On the other side, the agents 006, 007, 008, 009, and 010 belong to the group US-WEST. You can see in the picture below the current state of this environment.

.. thumbnail:: ../../images/kibana-app/0.1.overview_framework_group.png
    :title: Keys
    :align: left
    :width: 100%

.. thumbnail:: ../../images/kibana-app/0.2.overview_us-west_group.png
    :title: Keys
    :align: left
    :width: 100%    

User creation
-------------

The goal of this use case is to create a user for the Framework team. This user needs to have permissions on the agents that belong to the group with the same name. The first step is to create a Kibana user.

To do this, follow the instructions below:

- Go to the main panel and select the “Security” option.
- Once inside, select the “Internal users” option and click on the “Create internal user” button.
- Choose the name and password and click on the “Create” button.
- This user does not have any permission on Kibana, so the next thing is to add this user to the “all_access” role to access all the Wazuh’ s boards.
- Within the role, go to the tab Mapped users and then select the option Manage mapping.
- Then add the new user in the “Internal users” part.

.. thumbnail:: ../../images/kibana-app/0.3.mapped_users.png
    :title: Keys
    :align: left
    :width: 100%
    

RBAC configuration
------------------

Now it is time to go to the Wazuh web interface and move to the “Security” option. Then choose “Policies.” This menu allows users to edit any RBAC policy and define which permissions will be in the system.

These permissions will not be applied to any role until both entities are joined. Before, you need to create a new policy that gives users access to the agents of the “Framework” group. In this policy, you must select all the options the “Framework” team will perform with the agents and choose the “Framework” group.

.. thumbnail:: ../../images/kibana-app/0.4.security_policies.png
    :title: Keys
    :align: left
    :width: 100%

The next thing is to create a role for that user. To do this, go to the “Roles” tab. Inside it, by default. You can find more information about `default roles <https://documentation.wazuh.com/current/user-manual/api/rbac/reference.html#default-roles>`_ in the documentation. In this example, we will create a new role that will be assigned to our user.

This role will have a name of our choice, and it will be linked to the policy created before. This way, the user to whom this role is assigned will have permissions on the agents of the “Framework” group.

Finally, let’s link our Kibana user with the “Framework_role.” Go to the tab “Roles_mapping” and select “Create Role mapping.” To perform the mapping, choose the previously created role and select the previously created internal user.

.. thumbnail:: ../../images/kibana-app/0.8.roles_mapping_create.png
    :title: Keys
    :align: left
    :width: 100%


Test configuration
------------------

Once all these steps have been completed, authenticate with the user to verify that everything is correctly configured. Kibana’s main panel now only shows six active agents out of the ten that the system has. But in the agents’ tab is possible to see in more detail which agents are displayed.

.. thumbnail:: ../../images/kibana-app/0.5.framework_agents.png
    :title: Keys
    :align: left
    :width: 100%



Block US-WEST group
-------------------

In this example, the user has permission to see all the agents of the “Framework” group. Let’s suppose that the Framework team should not have permission to see the agents of the “US-WEST” group. The problem is that this team can see agent 006, which belongs to the group “US-WEST.” To solve this, you must create a new policy that denies the “Framework” group to see the “US-WEST” group. Then the  “Framework” group will not see agent 006 anymore.

.. note:: For this particular case it is not necessary to block the whole US-WEST group, however, this guarantees that if in the future this same case occurs (an agent belonging to both groups), the user “framework” will not be able to see it.

So let’s go back to the policy administration panel and create a new one that blocks the “US-WEST” group for the “framework” user. Once created, let’s go to the “Roles” panel and link this new policy to the role made earlier.
The policies are applied in the order they are listed so that the entire Framework group will be enabled, and then the US-WEST group will be denied. The intersection of both will also be denied as it applies after they are allowed. In the picture below, you can see the result of the role.

.. thumbnail:: ../../images/kibana-app/0.6.role_edit.png
    :title: Keys
    :align: left
    :width: 100%

Finally, you need to authenticate again with the user “framework” and check that it shows that there is one less agent in the asset counter and inside the agent’s panel because agent 006 does not appears.

.. thumbnail:: ../../images/kibana-app/0.7.login_1.png
    :title: Keys
    :align: left
    :width: 100%    

