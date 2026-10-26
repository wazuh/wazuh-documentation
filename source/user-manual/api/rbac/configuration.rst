.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure RBAC policies, roles, rules, and users in the Wazuh manager API.

Configuration
=============

.. note::

   You must authenticate to the Wazuh manager API before attempting to add or modify any RBAC configuration, such as policies, roles, users, or security rules. See the :ref:`authentication <api_getting_started_authentication>` section for authentication instructions.

Set RBAC mode
-------------

As explained in the :doc:`how it works </user-manual/api/rbac/how-it-works>` section, you can modify the RBAC mode and change it to ``white`` or ``black`` using the :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>` endpoint. You can also restore it to default with the :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>` endpoint.

Below is an example of how to change RBAC mode using a cURL command. Replace ``<DESIRED_RBAC_MODE>`` with the mode to enable (``white`` or ``black``):

.. code-block:: console

   # curl -k -X PUT "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/config?pretty=true" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"rbac_mode\":\"<DESIRED_RBAC_MODE>\"}"

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "message": "Configuration was successfully updated",
      "error": 0
   }

.. note::

   For security reasons, changing or restoring the security configuration, including the RBAC mode, revokes all tokens. You must log in again to obtain a new token after the change.

.. _api_rbac_configuration_create_a_new_policy:

Create a new policy
-------------------

Policies specify which actions you can take on given resources. You can use the :api-ref:`POST /security/policies <operation/api.controllers.security_controller.add_policy>` endpoint to create a new policy.

For example, a Managed Security Service Provider (MSSP) can grant a group of analysts in "Team Alpha" access to Wazuh agents in a specific customer's environment. To do this, you must create a policy outlining permissible actions on those agents. Define the necessary policy as follows:

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

To create this policy, use the following Wazuh manager API request:

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/policies?pretty=true" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"name\":\"customer_x_agents\",\"policy\":{\"actions\":[\"agent:read\"],\"resources\":[\"agent:id:001\",\"agent:id:002\",\"agent:id:003\",\"agent:id:004\"],\"effect\":\"allow\"}}"

The Wazuh manager API response is similar to the following. Note the highlighted policy ID, which you use later to assign the policy to the role:

.. code-block:: json
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

To retrieve the policy ID and other information, use the :api-ref:`GET /security/policies endpoint <operation/api.controllers.security_controller.get_policies>`. For a comprehensive list of resources and actions, refer to the :doc:`RBAC reference </user-manual/api/rbac/reference>` section.

Create a new role
-----------------

Roles are links between users and policies. You can assign multiple users to the same role and link multiple policies to a role. Create roles using the :api-ref:`POST /security/roles <operation/api.controllers.security_controller.add_role>` endpoint.

To continue the "Team Alpha" example in an MSSP, create the following role. You assign "Team Alpha" to it later:

.. code-block:: json

   {
     "name": "team-alpha"
   }

To create this role, use the following Wazuh manager API request:

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/roles?pretty=true" -H "accept: application/json" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"name\":\"team-alpha\"}"

The Wazuh manager API response is similar to the following. Note the highlighted role ID, which you use later to link policies to this role:

.. code-block:: json
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

.. _api_rbac_configuration_create_a_new_user:

Create a new user
-----------------

Create a new user by sending a request to the :api-ref:`POST /security/users <operation/api.controllers.security_controller.create_user>` endpoint. Specify the following information, using "alpha-member-1" as an example username:

.. code-block:: json

   {
     "username": "alpha-member-1",
     "password": "Alpha-Member-1"
   }

To create this user, use the following Wazuh manager API request:

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/users?pretty=true" -H "accept: application/json" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"username\":\"alpha-member-1\",\"password\":\"Alpha-Member-1\"}"

The Wazuh manager API response is similar to the following:

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "id": 100,
               "username": "alpha-member-1",
               "allow_run_as": false,
               "roles": []
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "User was successfully created",
      "error": 0
   }

The ``allow_run_as`` parameter on the highlighted line is set to ``false`` by default. When set to ``true``, it enables the user to log in using an authorization context (``auth_context``), which allows automatic role assignment based on rules.

See the :doc:`authorization context </user-manual/api/rbac/auth-context>` section for more details.

Edit allow_run_as
-----------------

By default, newly created users have the ``allow_run_as`` parameter set to ``false``. As a result, they cannot authenticate using an authorization context, which is required for automatic role assignment based on rules.

To enable authorization context login for a user, set ``allow_run_as`` to ``true`` using the :api-ref:`PUT /security/users/{user_id}/run_as <operation/api.controllers.security_controller.edit_run_as>` endpoint. Replace ``<USER_ID>`` with the actual ID of the user. To enable the parameter, you also need ``security:update`` on all roles (``role:id:*``), because a user with ``allow_run_as`` enabled can obtain any role that a rule maps. To disable it, you need only ``security:edit_run_as``. The change revokes the existing tokens of the user.

.. code-block:: console

   # curl -k -X PUT "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/users/<USER_ID>/run_as?allow_run_as=true" -H "Authorization: Bearer $TOKEN"

Expected successful response:

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [{
         "id": 100,
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

You assign one or more policies to a role using the :api-ref:`POST /security/roles/{role_id}/policies <operation/api.controllers.security_controller.set_role_policy>` endpoint. This endpoint requires the role ID and the policy IDs you want to link. A role can have multiple policies, and a policy can link to multiple roles.

The :api-ref:`POST /security/roles/{role_id}/policies <operation/api.controllers.security_controller.set_role_policy>` endpoint includes an optional ``position`` parameter that determines the order of policy application, because policies can conflict. For details on managing these conflicts, see the :ref:`priority of roles and policies <api_rbac_configuration_priority_of_roles_and_policies>` section.

The following request assigns the "customer_x_agents" policy from the :ref:`create a new policy <api_rbac_configuration_create_a_new_policy>` section to the "team-alpha" role. Both ``role_id`` and ``policy_id`` are 100:

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/roles/100/policies?policy_ids=100&pretty=true" -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
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

This approach simplifies permission management for all members of "team-alpha". You add or modify policies for the group rather than assigning permissions to each team member individually.

Create a new rule
-----------------

You create security rules by sending a POST request to the :api-ref:`/security/rules <operation/api.controllers.security_controller.add_rule>` endpoint. Security rules check whether the ``auth_context`` provided during login matches specific conditions. If the authorization context matches a rule, the system automatically assigns the associated role(s) to the user for that login session only.

Only users who have ``allow_run_as`` parameter set to ``true`` can use authorization context based login. See the :doc:`authorization context </user-manual/api/rbac/auth-context>` section for more details.

For example, the following rule ``alpha_rule`` assigns a role to any user whose username matches alpha-member-1:

.. code-block:: json

   {
     "name": "alpha_rule",
     "rule": {
       "FIND": {
         "username": "alpha-member-1"
       }
     }
   }

**What this rule does**

-  A user logs in and provides an ``auth_context`` that includes the key "``username``" with the value "``alpha-member-1"``.
-  The rule matches (FIND searches up to eight levels deep in the authorization context).
-  The roles linked to this rule are automatically assigned to that user for the current session.

Rules are especially useful for dynamic or temporary role assignment based on who is logging in, without needing to pre-assign roles manually.

Run the following command to create the rule:

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/rules?pretty=true" -H "accept: application/json" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"name\":\"alpha_rule\",\"rule\":{\"FIND\":{\"username\":\"alpha-member-1\"}}}"

Expected successful response:

The command output looks similar to this:

.. code-block:: json
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

Refer to the :ref:`Wazuh manager API RBAC rules <api_rbac_auth_context_rules_and_roles>` section for more information about creating rules.

Assign rules to roles
---------------------

Use the :api-ref:`POST /security/roles/{role_id}/rules <operation/api.controllers.security_controller.set_role_rule>` endpoint to assign rules directly to a specific role by specifying the role ID and the IDs of the rules. A role can have multiple rules, and you can assign a single rule to multiple roles.

To assign rules, you need to specify both the rule ID and the role ID. For example, to add ``alpha_rule`` with ID ``100`` to the ``team-alpha`` role with ``role_id`` ``100``, use this request:

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/roles/100/rules?rule_ids=100&pretty=true" -H "accept: application/json" -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
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

Use the :api-ref:`POST /security/users/{user_id}/roles <tag/Security/operation/api.controllers.security_controller.set_user_role>` endpoint to assign users to one or more roles. You can add existing users to a role by specifying the user ID and role ID you want to assign.

The :api-ref:`POST /security/users/{user_id}/roles <tag/Security/operation/api.controllers.security_controller.set_user_role>` endpoint features an optional ``position`` parameter to set the order of role application, which is crucial when roles contain conflicting policies. For more details, see :ref:`priority of roles and policies <api_rbac_configuration_priority_of_roles_and_policies>`.

For example, the following request assigns the "team-alpha" role, with ``role_id`` 100, to the user "``alpha-member-1"``. Replace ``<USER_ID>`` with the user ID returned when you created the user (100 in this example, if it is the first user you created):

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/users/<USER_ID>/roles?role_ids=100&pretty=true" -H "Authorization: Bearer $TOKEN"

Expected successful response:

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "id": 100,
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
      "message": "All roles were linked to user alpha-member-1",
      "error": 0
   }

The user can now execute actions defined in its policies by linking "``alpha-member-1``" to the "``team-alpha``" role.

.. _api_rbac_configuration_priority_of_roles_and_policies:

Priority of roles and policies
------------------------------

When a role has multiple policies or a user has multiple roles with conflicting permissions, the priority determines the final permission. For example, one policy says allow and another says deny for the same action on the same resource. A simple rule is the last applied policy or role wins.

Consider this example:

.. code-block:: yaml
   :emphasize-lines: 7,13

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

In this scenario, "example_role" links to both ``policy0``, allowing reading of agent ``001``, and ``policy1``, denying it. The system applies the most recently added policy to the role. Thus, the policy listed last when viewing the role's policies with the :api-ref:`GET /security/roles endpoint <operation/api.controllers.security_controller.get_roles>` takes precedence. Here, the user does not have permission to read agent ``001``.

The same principle applies when a user has multiple roles; the last applied role dictates behavior in conflicts.

**Controlling priority with the** ``position`` **parameter**
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can specify a policy's position in the list (starting at 0) using the ``position`` parameter when creating a new policy-role or role-user relationship. With it, you can place a new, conflicting policy in a different list position to override a subsequent policy.

For instance, if you link ``policy1`` to ``example_role`` with the ``position`` parameter set to ``0``, it takes the first position in the list. As a result, ``policy0`` applies last and grants the user read access to agent ``001``:

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

To get the information of the current user, use the :api-ref:`GET /security/users/me <operation/api.controllers.security_controller.get_user_me>` endpoint.

To see the final policies applied to the current user, use the :api-ref:`GET /security/users/me/policies <operation/api.controllers.security_controller.get_user_me_policies>` endpoint:

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/users/me/policies?pretty=true" -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "agent:create": {
            "*:*:*": "allow"
         },
         "group:create": {
            "*:*:*": "allow"
         },
         "agent:uninstall": {
            "*:*:*": "allow"
         },
         "enrollment_token:create": {
            "*:*:*": "allow"
         },
         "enrollment_token:read": {
            "*:*:*": "allow"
         },
         "enrollment_token:delete": {
            "*:*:*": "allow"
         },
         "agent:read": {
            "agent:id:*": "allow",
            "agent:group:*": "allow"
         },
         "agent:delete": {
            "agent:id:*": "allow",
            "agent:group:*": "allow"
         },
         "agent:modify_group": {
            "agent:id:*": "allow",
            "agent:group:*": "allow"
         },
         "agent:restart": {
            "agent:id:*": "allow",
            "agent:group:*": "allow"
         },
         "agent:reload": {
            "agent:id:*": "allow",
            "agent:group:*": "allow"
         },
         "agent:upgrade": {
            "agent:id:*": "allow",
            "agent:group:*": "allow"
         },
         "agent:scan_vulnerability": {
            "agent:id:*": "allow",
            "agent:group:*": "allow"
         },
         "group:read": {
            "group:id:*": "allow"
         },
         "group:delete": {
            "group:id:*": "allow"
         },
         "group:update_config": {
            "group:id:*": "allow"
         },
         "group:modify_assignments": {
            "group:id:*": "allow"
         },
         "security:create": {
            "*:*:*": "allow"
         },
         "security:create_user": {
            "*:*:*": "allow"
         },
         "security:read_config": {
            "*:*:*": "allow"
         },
         "security:update_config": {
            "*:*:*": "allow"
         },
         "security:revoke": {
            "*:*:*": "allow"
         },
         "security:edit_run_as": {
            "*:*:*": "allow"
         },
         "security:read": {
            "role:id:*": "allow",
            "policy:id:*": "allow",
            "user:id:*": "allow",
            "rule:id:*": "allow"
         },
         "security:update": {
            "role:id:*": "allow",
            "policy:id:*": "allow",
            "user:id:*": "allow",
            "rule:id:*": "allow"
         },
         "security:delete": {
            "role:id:*": "allow",
            "policy:id:*": "allow",
            "user:id:*": "allow",
            "rule:id:*": "allow"
         },
         "cluster:status": {
            "*:*:*": "allow"
         },
         "cluster:update_config": {
            "*:*:*": "allow",
            "node:id:*": "allow"
         },
         "cluster:restart": {
            "*:*:*": "allow",
            "node:id:*": "allow"
         },
         "cluster:read_api_config": {
            "node:id:*": "allow"
         },
         "cluster:read": {
            "node:id:*": "allow"
         },
         "mitre:read": {
            "*:*:*": "allow"
         },
         "cluster:read_secrets": {
            "node:id:*": "allow"
         },
         "agent:read_secrets": {
            "agent:id:*": "allow"
         },
         "rbac_mode": "white"
      },
      "message": "Current user processed policies information was returned",
      "error": 0
   }

**Use the position parameter to control policy priority**
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  Role ``example_role`` (``ID: 101``)
-  Policy ``policy-deny-read`` (``ID: 101``) deny read on ``agent:id:001``
-  Policy ``customer_x_agents`` (``ID: 100``) allow read on ``agent:id:001``

This example assumes that the role and both policies already exist. You want the ``allow`` policy to win. Assign the ``deny`` policy first (lower priority, position 0) and the ``allow`` policy second (higher priority, position 1).

Step 1: Assign the deny policy at position 0 (lower priority):

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/roles/101/policies?policy_ids=101&position=0&pretty=true" \
        -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "id": 101,
           "name": "example_role",
           "policies": [
             101
           ],
           "users": [],
           "rules": []
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "All policies were linked to role 101",
     "error": 0
   }

Step 2: Assign the allow policy at position 1 (higher priority, overrides deny):

.. code-block:: console

   # curl -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/roles/101/policies?policy_ids=100&position=1&pretty=true" \
        -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "id": 101,
           "name": "example_role",
           "policies": [
             101,
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
     "message": "All policies were linked to role 101",
     "error": 0
   }

Even though the deny policy exists, the allow policy wins because it is applied last (higher position). A user with the ``example_role`` role can now read agent 001.

Verify the order:

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/roles?pretty=true&role_ids=101" \
        -H "Authorization: Bearer $TOKEN"

.. note::

   The position parameter only applies when first assigning a policy to a role. It does not allow reordering or changing the position of policies that are already linked.
