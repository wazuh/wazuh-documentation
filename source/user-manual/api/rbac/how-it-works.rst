.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The operation of RBAC is based on the relationship between four components: users, roles, rules, and policies. Learn more here.

How it works
============

The operation of RBAC on the Wazuh server API relies on the interactions among four key components: users, roles, rules, and policies.

-  Users are entities who send requests to the Wazuh server API endpoints.
-  Roles are essentially collections of access rights, each defined by specific rules and policies it is associated with.
-  Rules determine the conditions under which policies apply, dictating the execution of permissions.
-  Policies are detailed sets of permissions that outline the allowed actions on various resources.

This structure enables users to be assigned roles that already encompass the necessary rules and policies, streamlining the permission management process by negating the need for direct policy assignment to each user. As a result, updating permissions for groups of users becomes more efficient through role adjustments.

Implementing RBAC in the Wazuh environment allows for precise access management. Consider the example below depicting fine-grained control of permissions assigned to roles within an organization:

-  **Security analysts**: They get *read-only* access to monitoring tools and incident reports. This enables them to analyze and identify potential threats without the risk of changing any configurations or data.
-  **Security engineers**: They receive roles with *read*, *modify*, and *delete* permissions for a wider range of resources. This allows them to adjust security policies, modify system configurations, and update rules to respond to incidents.

This division of roles ensures that each team member has access tailored to their responsibilities and expertise. It enhances overall security by enforcing the principle of least privilege, giving team members only the access they need.

RBAC Policies
-------------

Policies control the Wazuh server API permissions using three elements: actions, resources, and effect.

**Actions** represent a hierarchy of actions that a user may perform. They indicate both the element to which the action belongs and the action itself. The structure they follow looks like the example below, where the restart of an agent is specified.

.. code-block:: yaml

   agent:restart

**Resources** are any entity that can be subject to an action. The set of resources is dynamic, but the types are static. Some examples of resources are "agent 001", "agents in group default" or "node of a cluster". The symbol ``*`` can be used as a wildcard to indicate all the resources of a type, instead of specifying them one by one. For example:

.. code-block:: yaml

   agent:id:001
   node:id:*

**Effect** can only be "allow" or "deny", depending on the effective permission to be applied.

.. note::

   Please visit the :doc:`RBAC reference </user-manual/api/rbac/reference>` for a complete list of resources and actions.

RBAC modes
----------

You can configure RBAC in Wazuh in two distinct and opposite modes: *black* and *white*. The selected mode shapes the behavior of the policies created. Setting a policy's ``effect`` parameter to ``allow`` permits that policy in both black and white modes. Conversely, setting the effect to ``deny`` prohibits it in both modes. Therefore, the RBAC mode only affects actions that are not specified within each policy.

-  **White list mode**: The system forbids all actions by default. The administrator configures roles to grant permissions.
-  **Black list mode**: The system allows all actions by default. The administrator configures roles to restrict permissions.

Configuration

.. note::

   You must log into the Wazuh server API before attempting to add or modify any RBAC configuration, such as policies, roles, users, or security rules. The :ref:`getting started <api_log_in>` section contains a detailed guide on how to log into the Wazuh server API.

Set RBAC mode
-------------

As explained in the :doc:`how it works <how-it-works>` section, you can modify the RBAC mode and change it to ``white`` or ``black`` using the `PUT /security/config <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.put_security_config>`__ endpoint. You can also restore it to default with the `DELETE /security/config <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.delete_security_config>`__ endpoint.

Here is an example of how to change RBAC mode using a cURL command. We recommend that you export the authentication token to an environment variable as explained in the :ref:`getting started <api_log_in>` section. Replace ``<DESIRED_RBAC_MODE>`` with the mode to enable (``white`` or ``black``):

.. code-block:: console

   # curl -k -X PUT "https://localhost:55000/security/config?pretty=true" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"rbac_mode\":\"<DESIRED_RBAC_MODE>\"}"

.. code-block:: none
   :class: output

   {
      "message": "Configuration was successfully updated",
      "error": 0
   }

.. warning::

   For security reasons, changing the RBAC mode revokes all tokens. You will need to log in again to obtain a new token after the change.

Create a new policy
-------------------

Policies specify which actions you can take on given resources. You can use the `POST /security/policies <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.add_policy>`__ endpoint to create a new policy.

For example, a Managed Security Service Provider (MSSP) can grant a group of analysts in “Team Alpha” access to Wazuh agents in a specific customer’s environment. To do this, you must create a policy outlining permissible actions on those agents. Define the necessary policy as follows:

.. code-block:: json

   {
     "name": "customer_x_agents",
     "policy": {
       "actions": [
         "agent:read"
       ],
       "resources": [
         "agent:id:001",
         "agent:id:002",
         "agent:id:003",
         "agent:id:004"
       ],
       "effect": "allow"
     }
   }

To create this policy, use the following Wazuh server API request:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/policies?pretty=true" -H  "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"name\":\"customer_x_agents\",\"policy\":{\"actions\":[\"agent:read\"],\"resources\":[\"agent:id:001\",\"agent:id:002\",\"agent:id:003\",\"agent:id:004\"],\"effect\":\"allow\"}}"

The Wazuh server API response will be something similar to this. Note the highlighted policy ID as this will be used later on to assign the policy to the role:

.. code-block:: none
   :class: output
   :emphasize-lines: 5

   {
     "data": {
       "affected_items": [
         {
           "id": 100,
           "name": "customer_x_agents",
           "policy": {
             "actions": [
               "agent:read"
             ],
             "resources": [
               "agent:id:001",
               "agent:id:002",
               "agent:id:003",
               "agent:id:004"
             ],
             "effect": "allow"
           },
           "roles": []
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "Policy was successfully created",
     "error": 0
   }

This policy grants read access to Wazuh agents with IDs ``001``, ``002``, ``003``, and ``004``. You can create additional policies as needed and modify any policy, for example, to add new agents.

To retrieve the policy ID and other information, use the `GET /security/policies <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.get_policies>`__ endpoint. For a comprehensive list of resources and actions, refer to the :doc:`RBAC reference <reference>` page.

Create a new role
-----------------

Roles are links between users and policies. You can assign multiple users to the same role and link multiple policies to a role. Create roles using the `POST /security/roles <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.add_role>`__ endpoint.

Building on the previous example of "Team Alpha" in an MSSP, we will create the role described below to assign "Team Alpha" to it later:

.. code-block:: json

   {
     "name": "team-alpha"
   }

To create this role, use the following Wazuh server API request:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/roles?pretty=true" -H  "accept: application/json" -H  "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"name\":\"team-alpha\"}"

The Wazuh server API response will be something similar to this. Note the highlighted role ID as this will be used later on to link policies to this role:

.. code-block:: none
   :class: output
   :emphasize-lines: 5

   {
     "data": {
       "affected_items": [
         {
           "id": 100,
           "name": "team-alpha",
           "policies": [],
           "users": [],
           "rules": []
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "Role was successfully created",
     "error": 0
   }

.. _api_rbac_user:

Create a new user
-----------------

Create a new user by sending a request to the `POST /security/users <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.create_user>`__ endpoint. Specify the following information, using "alpha-member-1" as an example username:

.. code-block:: json

   {
     "username": "alpha-member-1",
     "password": "Alpha-Member-1"
   }

To create this user, use the following Wazuh server API request:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/users?pretty=true" -H  "accept: application/json" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"username\":\"alpha-member-1\",\"password\":\"Alpha-Member-1\"}"

The Wazuh server API response will be something similar to this:

.. code-block:: none
   :class: output
   :emphasize-lines: 6

   {
     "data": {
       "affected_items": [{
         "id": 101,
         "username": "alpha-member-1",
         "allow_run_as": false,
         "roles": []
       }],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "User was successfully created",
     "error": 0
   }


The ``allow_run_as`` parameter on the highlighted line, when set to true, enables the assignment of roles to the user based on the :doc:`authorization context <auth-context>` information.

Edit allow_run_as
-----------------

By default, new users cannot authenticate using an authorization context. To enable this option, activate the ``allow_run_as`` parameter for the user by sending a request to `PUT /security/users/{user_id}/run_as <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.edit_run_as>`__ endpoint.

.. code-block:: console

   # curl -k -X PUT "https://localhost:55000/security/users/<USER_ID>/run_as?allow_run_as=true" -H  "Authorization: Bearer $TOKEN"

Replace ``<USER_ID>`` with the user’s ID.

The output should look like this:

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [{
         "id": 101,
         "username": "alpha-member-1",
         "allow_run_as": true,
         "roles": []
       }],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "Parameter allow_run_as has been enabled for the user",
     "error": 0
   }

Assign policies to roles
------------------------

Use the `POST /security/roles/{role_id}/policies <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.set_role_policy>`__ endpoint to assign policies to a specific role by specifying the role's ID and the IDs of the policies. A role can have multiple policies, and a policy can link to multiple roles.

The `POST /security/roles/{role_id}/policies <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.set_role_policy>`__ endpoint includes a position parameter that determines the order of policy application, as some policies may conflict. For details on managing these conflicts, see the :ref:`rbac_priority` section.

For example, to assign the ``customer_x_agents`` policy to the ``team-alpha`` role with *role_id* ``100`` and *policy_id* ``100``, use the following request:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/roles/100/policies?policy_ids=100&pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "id": 100,
           "name": "team-alpha",
           "policies": [
             100
           ],
           "users": [],
           "rules": []
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "All policies were linked to role 100",
     "error": 0
   }

This approach simplifies permission management for all members of "team-alpha" by allowing you to add or modify policies for the group rather than assigning permissions to each team member individually.

Create a new rule
-----------------

To create a new rule, make a request to the `POST /security/rules <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.add_rule>`__ endpoint. Security rules are used to check if their content is inside an ``auth_context``. If so, they assign the roles whose rule is met to the user who entered the ``auth_context``. Only users whose ``allow_run_as`` is true can use authorization context based login. Find more information in the :doc:`authorization context <auth-context>` section. For example, consider the following rule ``alpha_rule`` to match the ``alpha-member-1`` user:

.. code-block:: json

   {
     "name": "alpha_rule",
     "rule": {
       "FIND": {
         "username": "alpha-member-1"
       }
     }
   }

Run the following command to create the rule:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/rules?pretty=true" -H  "accept: application/json" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"name\":\"alpha_rule\",\"rule\":{\"FIND\":{\"username\":\"alpha-member-1\"}}}"

.. code-block:: none
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "id": 100,
               "name": "alpha_rule",
               "rule": {
                  "FIND": {
                     "username": "alpha-member-1"
                  }
               },
               "roles": []
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "Security rule was successfully created",
      "error": 0
   }

Refer to the :ref:`Wazuh server API RBAC rules <>` section for more information about creating rules.

Assign rules to roles
---------------------

Use the `POST /security/roles/{role_id}/rules <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.set_role_rule>`__ endpoint to assign rules directly to a specific role by specifying the role ID and the IDs of the rules. A role can have multiple rules, and you can assign a single rule to multiple roles.

To assign rules, you need to specify both the rule ID and the role ID. For example, to add ``alpha_rule`` with ID ``100`` to the ``team-alpha`` role with *role_id* ``100``, use this request:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/roles/100/rules?rule_ids=100&pretty=true" -H  "accept: application/json" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "id": 100,
               "name": "team-alpha",
               "policies": [
                  100
               ],
               "users": [
                  100
               ],
               "rules": [
                  100
               ]
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All security rules were linked to role 100",
      "error": 0
   }

Assign roles to a user
----------------------

Use the `POST /security/users/{username}/roles <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.set_user_role>`__ endpoint to assign users to one or more roles. You can add existing users to a role by specifying the user ID and role ID.

The `POST /security/users/{username}/roles <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.set_user_role>`__ endpoint features a position parameter to set the order of role application, which is crucial when roles contain conflicting policies. For more details, see :ref:`rbac_priority`.

Following the previous example, you can assign the user ``alpha-member-1`` to the ``team-alpha`` role, with *role_id* ``100``, use this request:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/users/101/roles?role_ids=100&pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "id": 101,
           "username": "alpha-member-1",
           "allow_run_as": true,
           "roles": [
             100
           ]
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "All roles were linked to user sales-member-1",
     "error": 0
   }

The user can now execute actions defined in its policies by linking ``alpha-member-1`` to the ``team-alpha`` role.

.. _rbac_priority:

Priority of roles and policies
------------------------------

When a role has two or more conflicting policies assigned or a user belongs to conflicting roles, the priority of the policies determines the final permission. Consider this example:

.. code-block:: yaml
   :emphasize-lines: 7, 13

   example_role:
       policy0:
           actions:
               agent:read
           resources:
               agent:id:001
           effect: allow
       policy1:
           actions:
               agent:read
           resources:
               agent:id:001
           effect: deny

In this scenario, ``example_role`` links to both ``policy0``, allowing reading of agent ``001``, and ``policy1``, denying it. The system applies the most recently added policy to the role. Thus, the policy listed last when viewing the role's policies with the `GET /security/roles <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.get_roles>`__ endpoint takes precedence. Here, the user would not have permission to read agent ``001``. The same principle applies when a user has multiple roles; the last applied role dictates behavior in conflicts.

You can specify a policy or the position of the role in the list (starting at 0) using the ``position`` parameter when creating a new policy-role or role-user relationship. This allows placing a new, conflicting policy in a different list position to override a subsequent policy. For instance, setting ``policy1`` to position ``0`` in ``example_role`` would move it to the first position in the list, making ``policy0`` apply last and grant the user read access to agent ``001``:

.. code-block:: yaml
   :emphasize-lines: 7,13

   example_role:
       policy1:
           actions:
               agent:read
           resources:
               agent:id:001
           effect: deny
       policy0:
           actions:
               agent:read
           resources:
               agent:id:001
           effect: allow

To see the final policies applied to the current user, use the `GET /security/users/me/policies <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.security_controller.get_user_me_policies>` endpoint:

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/security/users/me/policies?pretty=true" -H "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
     "data": {
       "agent:read": {
           "agent:id:001": "allow"
       },
       "rbac_mode": "white"
           "roles": []
     },
     "message": "Current user processed policies information was returned",
     "error": 0
   }
