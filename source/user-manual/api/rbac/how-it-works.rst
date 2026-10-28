.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The operation of RBAC is based on the relationship between four components: users, roles, rules, and policies. Learn more here.

How it works
============

RBAC in the Wazuh manager API is built around four main components, which link each user to the permissions it holds.

-  **Users**: Entities who send requests to the Wazuh manager API endpoints.
-  **Roles**: Collections of access rights, each defined by specific rules and policies it is associated with. A role groups rules and policies together.
-  **Rules**: Conditions under which policies apply, dictating the execution of permissions. Rules determine when a role applies.
-  **Policies**: Specific permissions that define allowed actions on resources.

You assign roles to users instead of individual policies, which makes permission management much easier. Update a role once, and every user with that role picks up the change. A role already carries its rules and policies, so you never assign a policy to a user directly. As a result, updating permissions for groups of users becomes more efficient through role adjustments.

RBAC in the Wazuh environment allows for precise access management. Consider the following example depicting fine-grained control of permissions assigned to roles within an organization:

-  **Security analysts**: They get **read-only** access to monitoring tools and incident reports. This access enables them to analyze and identify potential threats without the risk of changing any configurations or data.
-  **Security engineers**: They get full **read**, **modify**, and **delete** permissions on policies, rules, and system configurations. These permissions allow them to adjust security policies, modify system configurations, and update rules to respond to incidents.

This division of roles ensures that each team member has access tailored to their responsibilities and expertise. It enhances overall security by enforcing the principle of least privilege, giving team members only the access they need.

RBAC policies
-------------

Policies control the Wazuh manager API permissions using three elements: actions, resources, and effect.

An action is what a user can do. It names both the component the action belongs to and the action itself, written as ``component:action``. The structure it follows looks like the example below, where the restart of an agent is specified.

.. code-block:: none

   agent:restart

A resource is any entity that an action applies to. The types of resources are fixed and predefined by Wazuh (static), while the actual resources within each type are dynamic and depend on your specific environment.

Examples of resources are "agent 001", "agents in group default", and "node of a cluster". The symbol ``*`` can be used as a wildcard to indicate all the resources of a type, instead of specifying them one by one. For example:

.. code-block:: none

   agent:id:001
   node:id:*

**Effect** can only be "allow" or "deny", depending on the effective permission to be applied.

Secret values have actions of their own, so permission to read or change a configuration does not reveal them. Without ``cluster:read_secrets`` on the answering node, ``GET /cluster/local/config``, the ``GET /cluster/{node_id}/configuration`` endpoints, ``GET /groups/{group_id}/configuration``, and ``GET /groups/{group_id}/files/{file_name}`` show the enrollment password, the cluster key, and other credential values as ``\*\*\*\*\*``. ``PUT /cluster/{node_id}/configuration`` also requires ``cluster:read_secrets`` to set a new cluster key or change the indexer section.

``GET /agents/{agent_id}/key`` returns the key of an agent only to a user with ``agent:read_secrets`` on that agent, and ``agent:read`` does not grant it. The default ``secrets_read`` policy grants ``cluster:read_secrets`` on ``node:id:*`` and ``agent:read_secrets`` on ``agent:id:*``, and only the administrator role includes it.

.. note::

   For the complete list of resources and actions, see the :doc:`RBAC reference </user-manual/api/rbac/reference>` section.

RBAC modes
----------

You can configure RBAC in Wazuh in two distinct and opposite modes: **black** and **white**. The selected mode shapes the behavior of the policies created. The default mode is white.

-  **White mode**: The system forbids all actions by default. The administrator configures roles to grant permissions.
-  **Black mode**: The system allows all actions by default. The administrator configures roles to restrict permissions.

A policy whose effect parameter is allow permits its actions in both black and white modes. Conversely, setting the effect to ``deny`` prohibits it in both modes. Therefore, the RBAC mode only affects actions that are not specified within each policy. It is recommended to use white mode in production for maximum security.
