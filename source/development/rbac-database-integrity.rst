.. Copyright (C) 2022 Wazuh, Inc.

RBAC database integrity
=======================

The integrity of the RBAC database is checked when the API starts. The result of this check determines whether the database needs an update or not. The integrity check allows us the following:

-  Upgrade to a Wazuh version when this version includes breaking changes in the RBAC database structure or new default resources.
-  Restore the RBAC database with its default RBAC resources if it was manually deleted. This allows restoring the RBAC database to a fresh install state if needed.

   .. warning::

      User-created resources are lost when the database is restored with default resources. 

How the database upgrade process works
--------------------------------------

During the RBAC database integrity check, Wazuh compares its RBAC database version with the installed one. If they don't match, the database upgrade process is triggered.

Here is an abridged list of steps performed during the database upgrade process:

#. A new RBAC database file is created and the default Wazuh RBAC resources for the installed version are added to it.

#. Every user-created RBAC resource is migrated from the old database to the new one, maintaining its ID, name and so forth.

#. In case a user-created RBAC resource coincides with one of the new default Wazuh RBAC resources:

   #. If the user-created *user* has the same *name* as a default user, the first one is renamed appending *‘_user’* to its name.

   #. If the user-created *role* has the same *name* as a default role, the first one is renamed appending *'_user'* to its name.

   #. If the user-created *rule* has the same *name* or *body* as a default rule, the relationships of the first one are migrated to the new default rule.

   #. If the user-created *policy* has the same *name* or *body* as a default policy, the relationships of the first one are migrated to the new default policy.

#. Any relationships between RBAC user-created resources are added to the new database.

#. Any relationships between RBAC user-created resources and default ones are updated:

   #. If the default resource does not exist in the new version, the relationships between user-created resources and the deleted resource are removed.

   #. If the default resource has a different ID in the new version, the relationships between user-created resources and the default resource are updated to match the new ID and keep the old functionality.

   #. In any other case, the relationships between user-created resources and the default resources are kept.

#. The old RBAC database file is replaced by the new one.

Migration examples
------------------

After upgrading from a Wazuh version with RBAC database version 0 to 1, ``WAZUH_PATH/logs/api.log``:

.. code-block:: none
    :class: output

    2022/06/17 09:44:04 INFO: Checking RBAC database integrity...
    2022/06/17 09:44:04 INFO: /var/ossec/api/configuration/security/rbac.db file was detected
    2022/06/17 09:44:04 INFO: RBAC database migration required. Current version is 0 but it should be 1. Upgrading RBAC database to version 1
    2022/06/17 09:44:09 INFO: /var/ossec/api/configuration/security/rbac.db database upgraded successfully
    2022/06/17 09:44:09 INFO: RBAC database integrity check finished successfully
    2022/06/17 09:44:12 INFO: Listening on ['0.0.0.0', '::']:55000..

After upgrading from a Wazuh version with RBAC database version 0 to 1, with the old DB having a user that is a default user in the new version:

``WAZUH_PATH/logs/api.log``:

.. code-block:: none
    :class: output

    2022/06/17 10:00:21 INFO: /var/ossec/api/configuration/security/rbac.db file was detected
    2022/06/17 10:00:21 INFO: RBAC database migration required. Current version is 0 but it should be 1. Upgrading RBAC database to version 1
    2022/06/17 10:00:25 WARNING: User 100 (example) is part of the new default users. Renaming it to 'example_user'
    2022/06/17 10:00:26 INFO: /var/ossec/api/configuration/security/rbac.db database upgraded successfully
    2022/06/17 10:00:26 INFO: RBAC database integrity check finished successfully
    2022/06/17 10:00:29 INFO: Listening on ['0.0.0.0', '::']:55000..

``GET /security/users`` response:

.. code-block:: json
    :class: output

    {
      "data": {
        "affected_items": [
          {
            "id": 1,
            "username": "wazuh",
            "allow_run_as": true,
            "roles": [
              1
            ]
          },
          {
            "id": 2,
            "username": "wazuh-wui",
            "allow_run_as": true,
            "roles": [
              1
            ]
          },
          {
            "id": 3,
            "username": "example",
            "allow_run_as": true,
            "roles": []
          },
          {
            "id": 100,
            "username": "example_user",
            "allow_run_as": false,
            "roles": [
              100
            ]
          }
        ],
        "total_affected_items": 4,
        "total_failed_items": 0,
        "failed_items": []
      },
      "message": "All specified users were returned",
      "error": 0
    }
