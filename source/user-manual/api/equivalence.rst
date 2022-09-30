.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Wazuh API v4 introduces several new endpoints and also modifies or removes some of the old ones. Learn how to migrate from the Wazuh API 3.X in this section.

.. Migrating from the Wazuh API 3.X

Migrating from the Wazuh API 3.X
================================

Wazuh API v4 introduces several new endpoints and also modifies or removes some of the old ones. The biggest change for all existing endpoints is the new response format. Endpoint responses have been changed according to the new RBAC standard and will no longer have ``items`` and ``totalitems`` fields. Most responses will have the following structure instead:

.. code-block:: json
    :class: output

    {
       "data": {
          "affected_items": [],
          "total_affected_items": 0,
          "total_failed_items": 0,
          "failed_items": [],
       },
       "message": "",
       "error": 0
    }


Migrating users
-----------------

The Wazuh API users are not migrated when upgrading the Wazuh API from 3.X to 4.X and newer versions. It is not recommended to migrate the users since there are numerous security changes to the Wazuh API.
However, it is easy to create new users and assign them the administrator role with the following API requests (substitute <username> and <password>):

**Create new user** (:api-ref:`POST /security/users <operation/api.controllers.security_controller.create_user>`)

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/security/users" -H  "Authorization: Bearer $TOKEN"  -H  "Content-Type: application/json" -d "{\"username\":\"<username>\",\"password\":\"<password>\"}"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "id": 3,
            "username": "<wazuh>",
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

**Assign administrator role** (:api-ref:`POST /security/users/{user_id}/roles <operation/api.controllers.security_controller.set_user_role>`)

.. code-block:: console

    # curl -k -X POST "https://localhost:55000/security/users/3/roles?role_ids=1" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "id": 3,
            "username": "<wazuh>",
            "allow_run_as": false,
            "roles": [
              1
            ]
          }
        ],
        "total_affected_items": 1,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "All roles were linked to user <wazuh>",
      "error": 0
    }
