.. Copyright (C) 2020 Wazuh, Inc.

.. _api_rbac_configuration:

Configuration
=============
.. note::
    It is necessary to log into the API before attempting to add or modify any RBAC configuration, such as policies, roles or users. A detailed guide on how to log in can be found within the :ref:`Getting started <api_getting_started>` section of the API.

Set RBAC mode
-------------
As explained in the :ref:`How it works <api_rbac_how_it_works>` section, it's possible to modify the RBAC mode and change it to ``white`` or ``black``. This can be done by using the ``PUT /security/config`` endpoint.

Here is an example of how to change RBAC mode using a cURL command. The ``YOUR_JWT_TOKEN`` must be replaced with a valid token (see :ref:`Getting started <api_getting_started>` for more information about logging into the API) and ``DESIRED_RBAC_MODE`` with the mode to enable ("black" or "white"):

.. code-block:: console

    # curl -X PUT "https://localhost:55000/v4/security/config?pretty=true" -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -d "{\"rbac_mode\":\"<DESIRED_RBAC_MODE>\"}"

.. code-block:: json
    :class: output

    {
       "message": "Configuration successfully updated"
    }

It is possible to change other non-RBAC settings such as the duration of JWT tokens, as well as to check the current configuration using the ``GET /security/config`` endpoint. Additionally, default settings can be restored using the ``DELETE /security/config`` endpoint.

.. warning::
    All tokens are revoked for security reasons when the RBAC mode is changed. It will be necessary to log in and obtain a new token after the change.

Create a new policy
-------------------
**Policies** are used to specify which actions can be taken on the given resources. To create a new policy use the ``POST /security/policies`` endpoint.

As an example, in order to grant access to the agents of a given customer to the "Sales-team", a policy that specifies what actions and on which agents those actions can be carried out must be created. The required policy can be defined like the following one:

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

It is possible to use the ``POST /security/policies`` endpoint to create the desired policy. The API request for this particular example would be as follows:

.. code-block:: console

    # curl -X POST "https://localhost:55000/v4/security/policies?pretty=true" -H  "Authorization: Bearer <YOUR_JWT_TOKEN>" -d "{\"name\":\"customer_x_agents\",\"policy\":{\"actions\":[\"agent:read\"],\"resources\":[\"agent:id:001\",\"agent:id:002\",\"agent:id:003\",\"agent:id:004\"],\"effect\":\"allow\"}}" -k

The API response will be something similar to this. The highlighted ID should be used later on to assign the policy to the role:

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

This will create a policy with permission to read information related to agents with ids ``001``, ``002``, ``003`` and ``004``. Additional policies can be created as long as they are not duplicated. Any policy could be modified at any given time if needed, so for example new agents could be added to an existing policy.

.. note::
    The policy ID, along with the other useful information, can be accessed at any time using the ``GET /security/policies`` endpoint. For a complete list of resources and actions, please visit :ref:`RBAC reference <api_rbac_reference>` page.


Create a new role
-----------------
**Roles** are links between users and policies. Multiple users can be assigned to the same role and a role can have multiple policies linked to it. Roles can be created using the ``POST /security/roles`` endpoint.

Following the previous "Sales-team" example, the role described below will be created so the "Sales-team" can be assigned to that role later on:

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
    The highlighted lines are intended for future feature still under development. They currently have no effect.

As before, the creation of that role can be requested using an API endpoint. In this case, the request for the role shown above would look like this:

.. code-block:: console

    # curl -X POST "https://localhost:55000/v4/security/roles?pretty=true" -H  "Authorization: Bearer <YOUR_JWT_TOKEN>" -d "{\"name\":\"sales-team\",\"rule\":{\"MATCH\":{\"definition\":\"sales-team\"}}}"

The response body would be similar to this one. It is important to remember the ID as it will be needed to link policies to this role.

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
To assign **policies** to a certain role use the ``POST /security/roles/{role_id}/policies`` endpoint. The assigment can be done by simply indicating the ID of the **role** and the ID of each policy. Remember that it is possible to a role to have multiple policies assigned and a given policy can be assigned to multiple roles.

.. note::
    This endpoint has a parameter called **position** used to determine the order in which the different policies should be applied, as policies might have conflicting permissions. For more information, check out the section :ref:`Priority of roles and policies <rbac_priority>`.


Following the previous example, the "customer_x_agents" policy could be assigned to the "sales-team" role having the *role_id* (``8``) and the  *policy_id* (``12``). Here is the request:

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
Now it is possible to modify the permissions of the whole "sales-team" group by adding new policies or modifying the existing ones, instead of having to assign each permission for each member of the team individually.

Assign roles to a user
----------------------
Users can be assigned to one or more roles using the ``POST /security/users/{username}/roles`` endpoint. It is possible to add previously created users to an existing role by specifying the user name and the ID of the role.

.. note::
    This endpoint has a parameter called **position** used to determine the order in which the different roles will be applied, as roles might have conflicting policies. For more information, check out the section :ref:`Priority of roles and policies <rbac_priority>`.

Following the previous example, it is possible to assign a new user named "sales-member-1" to the previously created "sales-team" role. This would be the request, having ``8```as the *role_id* of the "sales-team":

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

The user "sales-member-1" now belongs to the "sales-team" role, so it could perform the actions established in its policies from now on.

.. _rbac_priority:

Priority of roles and policies
------------------------------
When the same role has two or more contradictory policies assigned or the same user belong to two or more contradictory roles the resulting permission will be determined by the priority of the policies. Let's take a look to the following example:

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

In this case, the role "example_role" is linked to the ``policy0`` which allows agent ``001`` to be read, but it is also linked to ``policy1``, which prohibits it, as seen in the highlighted lines. In this situation, the most recently added policy is applied to the role. That means the one that appears last when listing the policies of a role using the ``GET /security/roles`` endpoint will be applied and for this example the user won't have permission to read agent ``001``. The same happens if a user is assigned to several roles. The last role applied to a user is the one that determines the behavior in case of contradiction. The ``GET /security/users`` endpoint can be used to list the users and its assigned roles.

It is possible to specify in which position of the list (starting at 0) a policy or a role is assigned by using the ``position`` parameter when adding a new relationship between a policy and a role or between a role and a user. Thanks to this, it is possible to add a new policy and place it in a different position of the list, so if this new policy contradicts another one that is placed later, the later one will be the policy to have their effects applied. Following this example, if the ``position`` parameter were used when adding the ``policy1`` to ``example_role`` and it was set to ``0``, then ``policy1`` would be added to ``example_role`` in the first position of the list and the user would have access to agent ``001`` as in this case ``policy0`` would be the last policy of the list. Here is the resulting list for this case:

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
