.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to configure the Role-Based Access Control (RBAC) with Wazuh in this step-by-step guide of our documentation. 
  
.. _api_rbac_configuration:

Configuration
=============
.. note::

   It is necessary to log into the Wazuh API before attempting to add or modify any RBAC configuration, such as policies, roles ,users, or security rules. A detailed guide on how to log in can be found within the :doc:`Getting started <../getting-started>` section of the Wazuh API.

Set RBAC mode
-------------
As explained in the :doc:`How it works </user-manual/api/rbac/how-it-works>` section, it is possible to modify the RBAC mode and change it to ``white`` or ``black``. This can be done using the :api-ref:`PUT /security/config <operation/api.controllers.security_controller.put_security_config>` Wazuh API endpoint. It can also be restored to default using :api-ref:`DELETE /security/config <operation/api.controllers.security_controller.delete_security_config>`.

Here is an example of how to change RBAC mode using a cURL command. It is recommended to export the token to a variable as explained in :doc:`Getting started <../getting-started>` section. Replace ``DESIRED_RBAC_MODE`` with the mode to enable (``white`` or ``black``):

.. code-block:: console

    # curl -k -X PUT "https://localhost:55000/security/config?pretty=true" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"rbac_mode\":\"<DESIRED_RBAC_MODE>\"}"

.. code-block:: json
    :class: output

    {
       "message": "Configuration was successfully updated",
       "error": 0
    }

.. warning::
    All tokens are revoked for security reasons when the RBAC mode is changed. It will be necessary to log in and obtain a new token after the change.

Create a new policy
-------------------
**Policies** are used to specify which actions can be taken on the given resources. To create a new policy, use the :api-ref:`POST /security/policies <operation/api.controllers.security_controller.add_policy>` endpoint.

As an example, in order to grant access to the agents of a given customer to the "Sales-team", a policy that specifies what actions and on which agents these actions can be carried out must be created. The required policy can be defined as the following one:

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

The Wazuh API request for this particular example would be as follows:

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/security/policies?pretty=true" -H  "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"name\":\"customer_x_agents\",\"policy\":{\"actions\":[\"agent:read\"],\"resources\":[\"agent:id:001\",\"agent:id:002\",\"agent:id:003\",\"agent:id:004\"],\"effect\":\"allow\"}}"

The Wazuh API response will be something similar to this. The highlighted ID should be used later on to assign the policy to the role:

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

This will create a policy with permission to read information related to agents with ids ``001``, ``002``, ``003`` and ``004``. Additional policies can be created as long as they are not duplicated. Any policy could be modified at any given time if needed. For example, new agents could be added to an existing policy.

.. note::
    The policy ID, along with the other useful information, can be accessed at any time using the :api-ref:`GET /security/policies <operation/api.controllers.security_controller.get_policies>` endpoint. For a complete list of resources and actions, please visit :ref:`RBAC reference <api_rbac_reference>` page.


Create a new role
-----------------
**Roles** are links between users and policies. Multiple users can be assigned to the same role and a role can have multiple policies linked to it. Roles can be created using the :api-ref:`POST /security/roles <operation/api.controllers.security_controller.add_role>` endpoint.

Following the previous "Sales-team" example, the role described below will be created so the "Sales-team" can be assigned to that role later on:

.. code-block:: json

    {
      "name": "sales-team",
    }

In this case, the request for the role shown above would look like this:

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/security/roles?pretty=true" -H  "accept: application/json" -H  "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"name\":\"sales-team\"}"

The response body would be similar to this one. It is important to remember the role ID as it will be needed to link policies to this role.

.. code-block:: json
    :class: output
    :emphasize-lines: 5

    {
      "data": {
        "affected_items": [
          {
            "id": 100,
            "name": "sales-team",
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
-------------------
To create a new user, make a request to :api-ref:`POST /security/users <operation/api.controllers.security_controller.create_user>` endpoint.

This information needs to be specified in order to create a new user. As an example, its name will be "sales-member-1":

.. code-block:: json

    {
      "username": "sales-member-1",
      "password": "Sales-Member-1"
    }

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/security/users?pretty=true" -H  "accept: application/json" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"username\":\"sales-member-1\",\"password\":\"Sales-Member-1\"}"

There is a parameter called ``allow_run_as`` on the highlighted line. If set to *true*, roles can be assigned to the user based on the information of an authorization context. Visit this section to find more detailed information about :ref:`Authorization Context <authorization_context_method>`.

The output would look like the example below:

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [{
          "id": 101,
          "username": "sales-member-1",
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

Edit allow_run_as
-----------------
By default, new users will not be able to authenticate using an authorization context. To enable this option, it is necessary to enable the ``allow_run_as`` parameter for the user. To do this, make a request to :api-ref:`PUT /security/users/{user_id}/run_as <operation/api.controllers.security_controller.edit_run_as>`.

.. code-block:: console

    # curl -k -X PUT "https://localhost:55000/security/users/{user_id}/run_as?allow_run_as=true" -H  "Authorization: Bearer $TOKEN"

The output should look like this:

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [{
          "id": 101,
          "username": "sales-member-1",
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

Create a new rule
-----------------
To create a new rule, make a request to :api-ref:`POST /security/rules <operation/api.controllers.security_controller.add_rule>` endpoint.

Security rules are used to check if their content is inside an auth_context. If so, they assign the roles whose rule is met to the user who entered the auth_context. Only users whose ``allow_run_as`` is ``true`` can use authorization context based login. Find more information in the :ref:`Authorization Context<authorization_context_method>` section.


Assign policies to roles
------------------------
To assign **policies** to a certain role use the :api-ref:`POST /security/roles/{role_id}/policies <operation/api.controllers.security_controller.set_role_policy>` endpoint. The assignment can be done by simply indicating the ID of the **role** and the ID of each policy. Remember that it is possible for a role to have multiple policies assigned to it. Also a given policy can be assigned to multiple roles.

.. note::
    This endpoint has a parameter called **position** used to determine the order in which the different policies should be applied, as policies might have conflicting permissions. For more information, check out the section :ref:`Priority of roles and policies <rbac_priority>`.


Following the previous example, the "customer_x_agents" policy could be assigned to the "sales-team" role having the *role_id* (``100``) and the  *policy_id* (``100``). Here is the request:

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/security/roles/100/policies?policy_ids=100&pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "id": 100,
            "name": "sales-team",
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

Now it is possible to modify the permissions of the whole "sales-team" group by adding new policies or modifying the existing ones, instead of having to assign each permission for each member of the team individually.


Assign rules to roles
---------------------
To assign **rules** to a certain role, use the :api-ref:`POST /security/roles/{role_id}/rules <operation/api.controllers.security_controller.set_role_rule>` endpoint. The assignment can be done by simply indicating the ID of the **role** and the ID of each rule. It is possible for a role to have multiple rules assigned to it. Also, a given rule can be assigned to multiple roles.

To assign any rule, it is necessary to indicate both the rule ID and the role ID. For example, we can add the "wui_opendistro_admin" rule which ID is ``2`` to the "sales-team" role having the *role_id* (``100``). Here is the request:

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/security/roles/100/rules?rule_ids=2&pretty=true" -H  "accept: application/json" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "id": 100,
            "name": "sales-team",
            "policies": [
              100
            ],
            "users": [],
            "rules": [
              2
            ]
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "All rules were linked to role 100",
      "error": 0
    }

Assign roles to a user
----------------------
Users can be assigned to one or more roles using the :api-ref:`POST /security/users/{username}/roles <operation/api.controllers.security_controller.set_user_role>` endpoint. It is possible to add previously created users to an existing role by specifying the user ID and the role ID.

.. note::
    This endpoint has a parameter called **position** used to determine the order in which the different roles will be applied, as roles might have conflicting policies. For more information, check out the section :ref:`Priority of roles and policies <rbac_priority>`.

Following the previous example, it is possible to assign a new user named "sales-member-1" to the previously created "sales-team" role. This would be the request, having ``100`` as the *role_id* of the "sales-team":

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/security/users/101/roles?role_ids=100&pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "id": 101,
            "username": "sales-member-1",
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

The user "sales-member-1" now belongs to the "sales-team" role, so it could perform the actions established in its policies from now on.

.. _rbac_priority:

Priority of roles and policies
------------------------------
When the same role has two or more contradictory policies assigned or the same user belongs to two or more contradictory roles, the resulting permission will be determined by the priority of the policies. Let's take a look at the following example:

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

In this case, the role "example_role" is linked to the ``policy0``, which allows agent ``001`` to be read, but it is also linked to ``policy1``, which prohibits it, as seen in the highlighted lines. In this situation, the most recently added policy is applied to the role. That means the one that appears last when listing the policies of a role using the :api-ref:`GET /security/roles <operation/api.controllers.security_controller.get_roles>` endpoint will be applied, and for this example, the user won't have permission to read agent ``001``. The same happens if a user is assigned to several roles. The last role applied to a user is the one that determines the behavior in case of contradiction. The ``GET /security/users`` endpoint can be used to list the users and their assigned roles.

It is possible to specify in which position of the list (starting at 0) a policy or a role is assigned by using the ``position`` parameter when adding a new relationship between a policy and a role or between a role and a user. Thanks to this, it is possible to add a new policy and place it in a different position on the list, so if this new policy contradicts another one that is placed later, the latter one will be the policy to have its effects applied. Following this example, if the ``position`` parameter were used when adding the ``policy1`` to ``example_role`` and it was set to ``0``, then ``policy1`` would be added to ``example_role`` in the first position of the list, and the user would have access to agent ``001`` as in this case ``policy0`` would be the last policy of the list. Here is the resulting list for this case:

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

Use the following Wazuh API endpoint :api-ref:`GET /security/users/me/policies <operation/api.controllers.security_controller.get_user_me_policies>` to obtain the final processed policies for the currently logged in user:

.. code-block:: json
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
