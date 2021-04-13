.. Copyright (C) 2021 Wazuh, Inc.

.. _security_resources:

security_resources
==================

.. versionadded:: 4.2.0

The **security_resources** tool allows managing **protected RBAC resources** and accessing to restricted functionality. For more information about the different RBAC resource types, please visit the :ref:`How it works <how-it-works>` section.

Manage protected RBAC resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
  As explained in the :ref:`How it works <how-it-works>` section, a protected RBAC resource can only be managed with this CLI. Not even the Wazuh API with administrator permissions will be able to modify or delete it.

Using the CLI with the desired option, all the RBAC resources can be created, modified, deleted, linked or unlinked. These are the options:

+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Description**                            | **Short command** | **Long command**           | **Example**                                                                                                                |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Add a new protected user                   | ``-au``           | ``--add-user``             | ``-au '{"username": "USERNAME", "password": "PASSWORD", "allow_run_as": TRUE/FALSE}'``                                     |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Add a new protected role                   | ``-ar``           | ``--add-role``             | ``-ar '{"name": "ROLE_NAME"}'``                                                                                            |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Add a new protected policy                 | ``-ap``           | ``--add-policy``           | ``-ap '{"name": "POLICY_NAME", "policy": {"actions": ["agent:read"], "resources": ["agent:id:001"], "effect": "allow"}}'`` |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Add a new security rule                    | ``-aru``          | ``--add-rule``             | ``-aru '{"name": "RULE_NAME", "rule": {"MATCH": {"sample": "yes"}}}'``                                                     |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Update a protected user                    | ``-uu``           | ``--update-user``          | ``-uu USER_ID '{"username": "USERNAME", "password": "PASSWORD", "allow_run_as": TRUE/FALSE}'``                                     |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Update a protected role                    | ``-ur``           | ``--update-role``          | ``-ur ROLE_ID '{"name": "ROLE_NAME"}'``                                                                                            |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Update a protected policy                  | ``-up``           | ``--update-policy``        | ``-up POLICY_ID '{"name": "POLICY_NAME", "policy": {"actions": ["agent:read"], "resources": ["agent:id:001"], "effect": "allow"}}'`` |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Update a protected security rule           | ``-uru``          | ``--update-rule``          | ``-uru RULE_ID '{"name": "RULE_NAME", "rule": {"MATCH": {"sample": "yes"}}}'``                                                     |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Remove a protected user                    | ``-ru``           | ``--remove-user``          | ``-ru [USER_IDs]``                                                                                                         |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Remove a protected role                    | ``-rr``           | ``--remove-role``          | ``-rr [ROLE_IDs]``                                                                                                         |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Remove a protected policy                  | ``-rp``           | ``--remove-policy``        | ``-rp [POLICY_IDs]``                                                                                                       |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Remove a protected security rule           | ``-rru``          | ``--remove-rule``          | ``-rru [RULE_IDs]``                                                                                                        |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Link protected user with role/s            | ``-lur``          | ``--link-user-roles``      | ``-lur USER_ID [ROLE_IDs]``                                                                                                |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Link protected role with policy/s          | ``-lrp``          | ``--link-role-policies``   | ``-lrp ROLE_ID [POLICY_IDs]``                                                                                              |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Link protected role with security rule/s   | ``-lrru``         | ``--link-role-rules``      | ``-lrru ROLE_ID [RULE_IDs]``                                                                                               |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Unlink protected user from role/s          | ``-unur``         | ``--unlink-user-roles``    | ``-unur USER_ID [ROLE_IDs]``                                                                                               |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Unlink protected role from policy/s        | ``-unrp``         | ``--unlink-role-policies`` | ``-unrp ROLE_ID [POLICY_IDs]``                                                                                             |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+
| Unlink protected role from security rule/s | ``-unrru``        | ``--unlink-role-rules``    | ``-unrru ROLE_ID [RULE_ID]``                                                                                               |
+--------------------------------------------+-------------------+----------------------------+----------------------------------------------------------------------------------------------------------------------------+

Examples
~~~~~~~~

.. code-block:: console

  ./security_resources -au '{"username": "new_user", "password": "New_Password123", "allow_run_as": true}' -ar '{"name": "new_role"}' -ap '{"name": "incomplete_policy"}'

.. code-block:: console
  :class: output

  Resource    Method    Success         Failed
  ----------  --------  --------------  ------------------------------------------------------
  User        add       100 - new_user
  Role        add       100 - new_role
  Policy      add                       Bad format || Error 10002 - Missing fields: {'policy'}

.. code-block:: console

  ./security_resources -lur 100 100 2 3

.. code-block:: console
  :class: output

  Resource    Method    Success            Failed
  ----------  --------  -----------------  --------
  User-Role   link      100 - [100, 2, 3]

Using the Wazuh API, it can be seen that these resources were created as ``protected``:

.. code-block:: json
  :class: output
  :emphasize-lines: 23-31

  {
    "data": {
      "affected_items": [
        {
          "id": 1,
          "username": "wazuh",
          "allow_run_as": true,
          "roles": [
            1
          ],
          "resource_type": "default"
        },
        {
          "id": 2,
          "username": "wazuh-wui",
          "allow_run_as": true,
          "roles": [
            1
          ],
          "resource_type": "default"
        },
        {
          "id": 100,
          "username": "new_user",
          "allow_run_as": true,
          "roles": [
            100,
            2,
            3
          ],
          "resource_type": "protected"
        }
      ],
      "total_affected_items": 3,
      "total_failed_items": 0,
      "failed_items": []
    },
    "message": "All specified users were returned",
    "error": 0
  }

Update passwords for administrator users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The password of the administrator users can be restored in case it gets lost. This implies changing it without having to know the previous one. This feature is only allowed using this CLI. 

.. note:: The CLI will prompt a new password for every default user. Leave the input blank if no changes are desired for the current user.

To do this, the following option must be passed to the CLI: ``--change-passwords``

Example
~~~~~~~

.. note:: No password for ``wazuh-wui`` user was provided.

.. code-block:: console

  ./security_resources --change-passwords

.. code-block:: console
  :class: output

  New password for 'wazuh' (skip): 
  New password for 'wazuh-wui' (skip): 
    wazuh: UPDATED

Factory reset the RBAC database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. warning:: This will completely wipe the RBAC database, removing every ``protected`` and ``user`` resource and their relationships.

It is possible to restore the RBAC database to a fresh install state.

To do this, the following option must be passed to the CLI: ``--factory-reset``

.. code-block:: console

  ./security_resources --factory-reset

.. code-block:: console
  :class: output

  This action will completely wipe your RBAC configuration and restart it to default values. Type RESET to proceed: RESET
	  Successfully resetted RBAC database
