.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The operation of RBAC is based on the relationship between four components: users, roles, rules, and policies. Learn more here.

How it works
============

RBAC in the Wazuh server API is built around four main components:

-  **Users** - Entities who send requests to the Wazuh server API endpoints.
-  **Roles** - Collections of access rights, each defined by specific rules and policies it is associated with. A role groups rules and policies together.
-  **Rules** - Conditions under which policies apply, dictating the execution of permissions. Rules determine when a role should be applied.
-  **Policies** - Specific permissions that define allowed actions on resources.

You assign roles to users instead of individual policies. This makes permission management much easier. Update a role once, and all users with that role are affected. This structure enables users to be assigned roles that already encompass the necessary rules and policies, streamlining the permission management process by negating the need for direct policy assignment to each user. As a result, updating permissions for groups of users becomes more efficient through role adjustments.

Implementing RBAC in the Wazuh environment allows for precise access management. Consider the example below depicting fine-grained control of permissions assigned to roles within an organization:

-  **Security analysts**: They get **read-only** access to monitoring tools and incident reports. This enables them to analyze and identify potential threats without the risk of changing any configurations or data.
-  **Security engineers**: They get full **read**, **modify**, and **delete** permissions on policies, rules, and system configurations. This allows them to adjust security policies, modify system configurations, and update rules to respond to incidents.

This division of roles ensures that each team member has access tailored to their responsibilities and expertise. It enhances overall security by enforcing the principle of least privilege, giving team members only the access they need.

RBAC Policies
-------------

Policies control the Wazuh server API permissions using three elements: actions, resources, and effect.

**Actions** represent a hierarchy of actions that a user may perform, i.e what can be done. They indicate both the element to which the action belongs and the action itself (component:action). The structure they follow looks like the example below, where the restart of an agent is specified.

.. code-block:: yaml

   agent:restart

**Resources** are any entity that can be subject to an action, i.e what the action applies to. The types of resources are fixed and predefined by Wazuh (static), while the actual resources within each type are dynamic and depend on your specific environment.

Some examples of resources are "agent 001", "agents in group default" or "node of a cluster". The symbol ``*`` can be used as a wildcard to indicate all the resources of a type, instead of specifying them one by one. For example:

.. code-block:: yaml

   agent:id:001
   node:id:*

**Effect** can only be "allow" or "deny", depending on the effective permission to be applied.

.. note::

   For the complete list of resources and actions, see the :doc:`RBAC reference </user-manual/api/rbac/reference>` section.

RBAC modes
----------

You can configure RBAC in Wazuh in two distinct and opposite modes: **black** and **white**. The selected mode shapes the behavior of the policies created.

-  **White list mode**: The system forbids all actions by default. The administrator configures roles to grant permissions.
-  **Black list mode**: The system allows all actions by default. The administrator configures roles to restrict permissions.

Setting a policy's ``effect`` parameter to ``allow`` permits that policy in both black and white modes. Conversely, setting the effect to ``deny`` prohibits it in both modes. Therefore, the RBAC mode only affects actions that are not specified within each policy. It is recommended to use white mode in production for maximum security.
