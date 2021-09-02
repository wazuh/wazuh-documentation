.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: This section of the Wazuh documentation explains what a role-based access control system is and how you can use it with Wazuh. 
  
.. _wazuh-rbac:

Getting started with Wazuh RBAC
===============================

Role-based access control systems refer to security mechanisms designed to control users’ access to a system’s resources or tasks. In this sense, these systems control the access of the different users. Also, they serve to distribute the additional resources and actions so that system administrators can have specific users for each task or access to resources.

The main features provided by RBAC in Wazuh are:

- Allows access to Wazuh resources based on the roles and policies assigned to the users.
- It is an easy-to-use administration system that permits to manage users or entities’ permissions to the different resources of the system in a simple way.
- The users will be able to execute only the functions over which they have permissions. - - This way, the system administrators can isolate the workflow of each of them.
- It allows administrators to create different categories of users with additional permissions and roles in the system.

These actions are done through the following entities:

- Relationships between users, roles, and policies.
- Customized rules that allow the acquisition of permissions without creating the user-role relationship in the database. This functionality is beneficial for audits and temporary users.
  
More information about how to add or modify any RBAC configuration can be found `here <https://documentation.wazuh.com/current/user-manual/api/rbac/configuration.html>`_.


RBAC in Wazuh
-------------

RBAC manage the system resources and is a layer between the software and its clients. This layer works at a low level within the software Wazuh ensuring that all endpoints of the API are protected and appropriately managed.

RBAC has two methods of authentication and the first of these is the access through the relationship between users and roles. This method is the classic method in which a client provides a username-password, and based on the relationship of the specified user, it will obtain the designated permissions for it. You can find more information about this method here. 

.. thumbnail:: ../../images/kibana-app/rbac_scheme.png
    :title: Keys
    :align: left
    :width: 100%

The second method of access is based on the relationship between the rules and the roles of the system. In this way, each rule satisfied by the authorization context provided by the administrator will grant all the roles associated with it. Each rule can be associated with one or several roles, so if it is successfully checked, the user will have the permissions given by the roles associated with the satisfied rules. You can find more information about this method here. 

.. thumbnail:: ../../images/kibana-app/rbac_scheme2.png
    :title: Keys
    :align: left
    :width: 100%    

Below we will focus on the second method. This access system is based on the use of authorization contexts, which will be checked by each of the system rules. Every rule satisfied by an authorization context will give certain roles to the user who presents the authorization context.

Wazuh RBAC system works in both non-clustered and clustered environments, this last one being totally transparent to it. RBAC can grant permissions on the different nodes of a cluster and work independently due to all the information in the master node.

