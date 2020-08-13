.. Copyright (C) 2020 Wazuh, Inc.

.. _api_rbac_configuration:

Configuration
=============
Before modifying RBAC policies, roles and more, it is necessary to log into the API. You can find a detailed guide on how to do it within the :ref:`Getting started <api_getting_started>` section of the API.

Set RBAC mode
-------------
You can modify the RBAC mode (as explained in the :ref:`How it works <api_rbac_how_it_works>` section). This is a security configuration so it is necessary to use the security endpoint ``/security/config``, specifically the ``PUT`` method. To do so, you can run the following cURL command, replacing your token and the desired mode (white/black).

.. code-block:: console

    # curl -X PUT "https://localhost:55000/v4/security/config?pretty=true" -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -d "{\"rbac_mode\":\"<DESIRED_RBAC_MODE>\"}"

.. code-block:: json
    :class: output

    {
       "message": "Configuration successfully updated"
    }

You can also change other settings (not related to RBAC) such as the duration of the JWT tokens, as well as checking the current configuration using the ``GET`` method or restoring the default configuration using the ``DELETE`` method.

.. note::
    All tokens are revoked for security reasons when the RBAC mode is changed. It will be necessary to log in and obtain a new token after the change.

Create a new policy
-------------------
To create new policies, use the endpoint ``POST /security/policies``.

Let's assume a use case where we want to grant the Sales-team access to the agents of a certain customer. We are going to create a policy that specifies what actions and on which agents can be carried out. To do this, we would need to add the following block inside the request body of the endpoint mentioned above.

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

The request would be as follows:

.. code-block:: console

    # curl -X POST "https://localhost:55000/v4/security/policies?pretty=true" -H  "Authorization: Bearer <YOUR_JWT_TOKEN>" -d "{\"name\":\"customer_x_agents\",\"policy\":{\"actions\":[\"agent:read\"],\"resources\":[\"agent:id:001\",\"agent:id:002\",\"agent:id:003\",\"agent:id:004\"],\"effect\":\"allow\"}}" -k

With this policy, we have established that it is allowed to read information related to agents 001, 002, 003 and 004. We can create more policies to our liking as long as they are not repeated. We may also change this policy at any time to, for example, add new agents.

The response after adding the new policy should be similar to the one below. The highlighted ID should be used later on to assign the policy to the role.

.. code-block:: json
    :class: output
    :emphasize-lines: 5

    {
      "data": {
        "affected_items": [
          {
            "id": 12,
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
      "message": "Policy created correctly"
    }

We can query the policy ID at any time, along with the other information, using the endpoint ``GET /security/policies``. For a complete list of resources and actions, please visit :ref:`RBAC reference <api_rbac_reference>`.

Create a new role
-----------------
To create new roles, use the endpoint ``POST /security/roles``

The link between users and policies is **roles**. Therefore, for the previous example of the Sales-team, we are going to create a role to which later assign all the members of the team.

.. code-block:: json
    :emphasize-lines: 4,5,6

    {
      "name": "sales-team",
      "rule": {
        "MATCH": {
          "definition": "sales-team"
        }
      }
    }

.. note::
    The highlighted lines are designed for a future feature, still in development. It does not affect the functionality.

The request with the information showed above would look like this:

.. code-block:: console

    # curl -X POST "https://localhost:55000/v4/security/roles?pretty=true" -H  "Authorization: Bearer <YOUR_JWT_TOKEN>" -d "{\"name\":\"sales-team\",\"rule\":{\"MATCH\":{\"definition\":\"sales-team\"}}}"

The response body would be this. Remember that the ID is needed to link policies to this role.

.. code-block:: json
    :class: output
    :emphasize-lines: 5

    {
      "data": {
        "affected_items": [
          {
            "id": 8,
            "name": "sales-team",
            "rule": {
              "MATCH": {
                "definition": "sales-team"
              }
            },
            "policies": [],
            "users": []
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "Role created correctly"
    }

Assign policies to roles
------------------------
To assign policies to a certain role, use the endpoint ``POST /security/roles/{role_id}/policies``

To do it, simply indicate the ID of the role and the ID of each policy. There is another parameter called *position*. It is an advanced parameter used to determine the order in which the different policies are applied, as policies might have conflicting permissions. For more information, check out the section :ref:`Priority of roles and policies <rbac_priority>`.

In our example the *role_id* would be ``8`` (the ID of "sales-team" role) and the *policy_id* would be ``12`` (the ID of "customer_x_agents" policy). This would be the request:

.. code-block:: console

    # curl -X POST "https://localhost:55000/v4/security/roles/8/policies?policy_ids=12&pretty=true" -H  "Authorization: Bearer <YOUR_JWT_TOKEN>"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "id": 8,
            "name": "sales-team",
            "rule": {
              "MATCH": {
                "definition": "sales-team"
              }
            },
            "policies": [
              12
            ],
            "users": []
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "All policies were linked to role 8"
    }

We could modify the permissions of the whole group by adding new policies or modifying the existing ones. Thanks to that, we prevent modifying the permissions on each user individually, which would take more time.

Assign roles to a user
----------------------
To assign roles to a user, use the endpoint ``POST /security/users/{username}/roles``.

To add an already created user to an existing role, it is only necessary to specify the user name and the ID of the role. There is another parameter called *position*. It is an advanced parameter used to determine the order in which the different roles are applied, as roles might have conflicting policies. For more information, check out the section :ref:`Priority of roles and policies <rbac_priority>`.

Following the previous examples, we are going to link the user "sales-member-1" with the role "sales-team" whose ID is 8. This would be the request:

.. code-block:: console

    # curl -X POST "https://localhost:55000/v4/security/users/sales-member-1/roles?role_ids=8&pretty=true" -H  "Authorization: Bearer <YOUR_JWT_TOKEN>"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "username": "sales-member-1",
            "roles": [
              8
            ]
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "All roles were linked to user sales-member-1"
    }

All members assigned to the "sales-team" role could perform the actions established in its policies.

.. _rbac_priority:

Priority of roles and policies
------------------------------
When the same role have two or more contradictory policies assigned or the same user belong to two or more contradictory roles, some sort of priority is necessary to determine which permissions should ultimately be applied. For example:

.. code-block:: yaml
    :class: output
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

In the example above, the role "example_role" is related to a ``policy0`` which allows agent 001 to be read. It is also related to ``policy1`` which prohibits it, as seen in the highlighted lines. In this situation, the most recently added policy is applied to the role. That is, the one that appears last when listing the policies of a role (``GET /security/roles``). The same happens with the roles of a user. The last role applied to a user is the one that determines the behavior of contradictory policies (``GET /security/users``).

When adding a new relationship between a policy and a role or between a role and a user, we can use a ``position`` parameter (starts at zero) to specify the position of the role or policy within the list. Thanks to this, we can add, for example, a new policy that is not in the last position, so that the contradictory actions it may have will not be applied.

