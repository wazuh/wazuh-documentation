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
