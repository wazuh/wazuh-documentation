.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure RBAC policies, roles, rules, and users in the Wazuh server API.

Configuration
=============

.. note::

   You must authenticate to the Wazuh server API before attempting to add or modify any RBAC configuration, such as policies, roles, users, or security rules. The :doc:`getting started <../getting-started>` section contains authentication instructions.

Set RBAC mode
-------------

As explained in the :doc:`how it works <how-it-works>` section, you can modify the RBAC mode and change it to ``white`` or ``black`` using the :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>` endpoint. You can also restore it to default with the :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>` endpoint.

Below is an example of how to change RBAC mode using a cURL command. Replace ``<DESIRED_RBAC_MODE>`` with the mode to enable (``white`` or ``black``):

.. code-block:: console

   # curl -k -X PUT "https://localhost:55000/security/config?pretty=true" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"rbac_mode\":\"<DESIRED_RBAC_MODE>\"}"

.. code-block:: none
   :class: output

   {
      "message": "Configuration was successfully updated",
      "error": 0
   }

.. note::

   For security reasons, changing the RBAC mode revokes all tokens. You will need to log in again to obtain a new token after the change.

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

To retrieve the policy ID and other information, use the :api-ref:`GET /security/policies <operation/api.controllers.security_controller.get_policies>` endpoint. For a comprehensive list of resources and actions, refer to the :doc:`RBAC reference <reference>` page.

Create a new role
-----------------

Roles are links between users and policies. You can assign multiple users to the same role and link multiple policies to a role. Create roles using the :api-ref:`POST /security/roles <operation/api.controllers.security_controller.add_role>` endpoint.

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

Create a new user by sending a request to the :api-ref:`POST /security/users <operation/api.controllers.security_controller.create_user>` endpoint. Specify the following information, using "alpha-member-1" as an example username:

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

The ``allow_run_as`` parameter on the highlighted line is set to ``false`` by default. When set to ``true``, it enables the user to log in using an authorization context (``auth_context``), which allows automatic role assignment based on rules.

See the :doc:`authorization context <auth-context>` section for more details.

Edit allow_run_as
-----------------

By default, newly created users have the ``allow_run_as`` parameter set to ``false``. This means they cannot authenticate using an authorization context which is required for automatic role assignment based on rules.

To enable authorization context login for a user, set ``allow_run_as`` to ``true`` using the :api-ref:`PUT /security/users/{user_id}/run_as <operation/api.controllers.security_controller.edit_run_as>` endpoint. Replace ``<USER_ID>`` with the actual ID of the user.

.. code-block:: console

   # curl -k -X PUT "https://localhost:55000/security/users/<USER_ID>/run_as?allow_run_as=true" -H  "Authorization: Bearer $TOKEN"

Expected successful response:

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

You assign one or more policies to a role using the :api-ref:`POST /security/roles/{role_id}/policies <operation/api.controllers.security_controller.set_role_policy>` endpoint. This endpoint requires the role ID and the policy IDs you want to link. A role can have multiple policies, and a policy can link to multiple roles.

The :api-ref:`POST /security/roles/{role_id}/policies <operation/api.controllers.security_controller.set_role_policy>` endpoint includes an optional ``position`` parameter that determines the order of policy application, as some policies may conflict. For details on managing these conflicts, see the :ref:`rbac_priority` section.

For example, to assign the ``customer_x_agents`` policy created in the :ref:`create a new policy <create-a-new-policy>` section to the ``team-alpha`` role with *role_id* ``100`` and *policy_id* ``100``, use the following request:

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

You create security rules by sending a POST request to the :api-ref:`/security/rules <operation/api.controllers.security_controller.add_rule>` endpoint. Security rules check whether the ``auth_context`` provided during login matches specific conditions. If the authorization context matches a rule, the system automatically assigns the associated role(s) to the user for that login session only.

Only users who have ``allow_run_as`` parameter set to ``true`` can use authorization context based login. See the :doc:`authorization context <auth-context>` section for more details.

For example, the following rule ``alpha_rule`` assigns a role any user whose username matches ``alpha-member-1``:

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

-  When a user logs in and provides an ``auth_context`` that includes the key ``username`` with the value ``alpha-member-1``,
-  the rule matches (FIND looks for an exact match),
-  and the role(s) linked to this rule are automatically assigned to that user for the current session.

This is especially useful for dynamic or temporary role assignment based on who is logging in, without needing to pre-assign roles manually.

Run the following command to create the rule:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/rules?pretty=true" -H  "accept: application/json" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"name\":\"alpha_rule\",\"rule\":{\"FIND\":{\"username\":\"alpha-member-1\"}}}"

Expected successful response:

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

Refer to the :ref:`Wazuh server API RBAC rules <auth_context_rules_and_roles>` section for more information about creating rules.

Assign rules to roles
---------------------

Use the :api-ref:`POST /security/roles/{role_id}/rules <operation/api.controllers.security_controller.set_role_rule>` endpoint to assign rules directly to a specific role by specifying the role ID and the IDs of the rules. A role can have multiple rules, and you can assign a single rule to multiple roles.

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

Use the :api-ref:`POST /security/users/{username}/roles <operation/api.controllers.security_controller.set_user_role>` endpoint to assign users to one or more roles. You can add existing users to a role by specifying the user ID and role ID you want to assign.

The :api-ref:`POST /security/users/{username}/roles <operation/api.controllers.security_controller.set_user_role>` endpoint features an optional ``position`` parameter to set the order of role application, which is crucial when roles contain conflicting policies. For more details, see :ref:`rbac_priority`.

Following the previous example, you can assign ``team-alpha`` role, with *role_id* ``100`` to the user ``alpha-member-1``, with user ID ``101``, use this request:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/users/101/roles?role_ids=100&pretty=true" -H  "Authorization: Bearer $TOKEN"

Expected successful response:

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

When a role has multiple policies or a user has multiple roles with conflicting permissions (for example, one policy says allow and another says deny for the same action on the same resource), the priority determines the final permission. A simple rule is the last applied policy or role wins.

Consider this example:

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

In this scenario, ``example_role`` links to both ``policy0``, allowing reading of agent ``001``, and ``policy1``, denying it. The system applies the most recently added policy to the role. Thus, the policy listed last when viewing the role's policies with the :api-ref:`GET /security/roles <operation/api.controllers.security_controller.get_roles>` endpoint takes precedence. Here, the user would not have permission to read agent ``001``.

The same principle applies when a user has multiple roles; the last applied role dictates behavior in conflicts.

**Controlling priority with the** ``position`` **parameter**

You can specify a policy's position in the list (starting at 0) using the ``position`` parameter when creating a new policy-role or role-user relationship. This allows placing a new, conflicting policy in a different list position to override a subsequent policy.

For instance, setting ``policy1`` to position ``0`` in ``example_role`` would move it to the first position in the list, making ``policy0`` apply last and grant the user read access to agent ``001``:

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

To see the final policies applied to the current user, use the :api-ref:`GET /security/users/me/policies <operation/api.controllers.security_controller.get_user_me_policies>` endpoint:

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

Practical example
^^^^^^^^^^^^^^^^^

Using the position parameter to control policy priority
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Suppose you have already created:

-  Role ``example_role`` (ID: 100)
-  Policy ``policy-deny-read`` (ID: 101) deny read on ``agent:id:001``
-  Policy ``policy-allow-read`` (ID: 100) allow read on ``agent:id:001``

You want the ``allow`` policy to win, so you assign the ``deny`` policy first (lower priority, position 0), and the ``allow`` policy second (higher priority, position 1).

Step 1: Assign the deny policy at position 0 (lower priority):

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/roles/100/policies?policy_ids=101&position=0&pretty=true" \
       -H "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "id": 100,
           "name": "example_role",
           "policies": [
             101               // ← deny policy added first (position 0)
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

Step 2: Assign the allow policy at position 1 (higher priority -- will override deny):

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/security/roles/100/policies?policy_ids=100&position=1&pretty=true" \
       -H "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "id": 100,
           "name": "example_role",
           "policies": [
             101,              // ← deny (position 0 – lower)
             100               // ← allow (position 1 – higher, wins!)
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

Even though the deny policy exists, the allow policy wins because it is applied last (higher position). The user can now read agent ``001``.

Verify the order:

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/security/roles?pretty=true&role_ids=100" \
       -H "Authorization: Bearer $TOKEN"

.. note::

   The ``position`` parameter only applies when first assigning a policy to a role. It does not allow reordering or changing the position of policies that are already linked.
