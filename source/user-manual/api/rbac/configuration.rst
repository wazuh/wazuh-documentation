.. Copyright (C) 2020 Wazuh, Inc.

.. _api_rbac_configuration:

Configuration
=============
Before modifying RBAC policies, roles and more, it is necessary to log into the API. You can find a detailed guide on how to do it within the :ref:`Getting started <api_getting_started>` section of the API.

The endpoints required to manage RBAC belong to the *Security* group. To run them, this configuration guide uses the API interface. However, the command-line ``cURL`` can be used instead as explained in :ref:`Getting started <api_getting_started>`.

Set RBAC mode
-------------
You can modify the RBAC mode (which we mentioned in the :ref:`How it works <api_rbac_how_it_works>` section). To do this, you need to edit the API configuration file found in ``/var/ossec/api/configuration/api.yaml``.

.. code-block:: yaml

    rbac:
        mode: white

You can also use the endpoint ``PUT /manager/api/config`` (or PUT ``/cluster/api/config`` if you have a Wazuh cluster deployed) to perform the same action.

.. note::
    Wazuh API needs to be restarted for the changes to take effect.

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

With this policy, we have established that it is allowed to read agents 001, 002, 003 and 004. We can create more policies to our liking as long as they are not repeated. We may also change this policy at any time to, for example, add new agents.

The return response after adding the new policy should be similar to the one below. The highlighted ID should be used later to assign the policy to the role.

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

To do it, simply indicate the ID of the role inside *role_id* field and the ID of each policy inside *policy_ids* field.

In our example the *role_id* would be ``8`` (the ID of "sales-team" role) and the *policy_id* would be ``12`` (the ID of "customer_x_agents" policy). We would get a similar response body:

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

Assign users to a role
----------------------
To assign users to a role, use the endpoint ``POST /security/users/{username}/roles``.

To add an already created user to an existing role, it is only necessary to specify the user name and the ID of the role. Following the previous examples, we are going to link the user "sales-member-1" with the role "sales-team" whose ID is 8.

This would be the response body after the assignment:

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
