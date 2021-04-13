.. Copyright (C) 2021 Wazuh, Inc.

.. _api_rbac_how_it_works:

How it works
============

The operation of RBAC is based on the relationship between four components: **users**, **roles**, **rules** and **policies**. Policies and rules are associated with roles, and each user can belong to one or more roles.

Since the policies are not directly related to users, it is not necessary to assign them to each user. Simply assign the user to the appropriate role. The process of updating the permissions of an entire group of users is also made easier thanks to this structure.

After configuring RBAC, there will be users that can only see and do certain actions on specified resources that have previously been established. For example, it can be ensured that members of a Security-team have 'read' access to all agents, while the Sales-team has 'read' and 'modify' permissions only to agents in their department (but not delete permissions).

RBAC Policies
-------------
Policies control the Wazuh API permissions using three elements: actions, resources, and effect.

**Actions** represent a hierarchy of actions that a user may perform. They indicate both the element to which the action belongs and the action itself. The structure they follow looks like the example below, where restarting agent is specified.

.. code-block:: console

      agent:restart

**Resources** are any entity that can be subject to an action. The set of resources is dynamic, but the types are static. Some examples of resources are "agent 001", "agents in group default" or "node of a cluster". The symbol ``*`` can be used as a wildcard to indicate all the resources of a type, instead of specifying them one by one. For example:

.. code-block:: console

    agent:id:001
    node:id:*

**Effect** can only be "allow" or "deny", depending on the effective permission to be applied.

.. note::
    For a complete list of resources and actions, please visit :ref:`RBAC reference <api_rbac_reference>`.

RBAC modes
----------

RBAC in Wazuh can be configured in two different and opposite ways: **black** and **white**. The choice of one mode or another determines what will the behaviour of the created policies be. If the parameter ``effect`` of a policy is set to ``allow``, that policy will be allowed in both black and white mode. If the effect is ``deny``, it will be denied in both black and white. Therefore, the RBAC mode only affects those actions that are not specified within each policy.

- **White list mode:** everything is forbidden. The administrator configures roles to give permissions.
- **Black list mode:** everything is allowed. The administrator configures roles to restrict permissions.

RBAC resource types
-------------------

Every RBAC resource (policies, roles, rules and users) can be classified regarding its resource or protection type used to determine whether the Wazuh API should be able to remove or modify that given RBAC resource. There are 3 different resource types:

- **User resources:** A regular RBAC resource created using the Wazuh API. It is NOT protected and can be modified or removed using the Wazuh API by any user as long as it belongs to the appropriate RBAC Role. Check :ref:`RBAC reference <api_rbac_reference>` to learn more about the actions required to create RBAC resources.

- **Protected resources:** A special RBAC resource. It is protected so it cannot be modified or removed using the Wazuh API even if the user has the appropriate RBAC role. It must be manually created, updated or removed by using the :ref:`security_resources <security_resources>` tool instead.

- **Default resources:** A default Wazuh RBAC resource. It cannot be modified or removed by any user. The default resources are managed by Wazuh and could be added, updated or removed in different Wazuh releases. Neither the Wazuh API nor the CLI tool are able to update or remove the default resources. However, they can be used by the user as any other resource. As an example, it is possible to create a custom Role and assign to it a default policy.

.. note::
    Any RBAC policy, role, rule or user created using the Wazuh API will be created with the `user` type. The :ref:`security_resources <security_resources>` tool can be used to create, modify or remove `protected` resources.
