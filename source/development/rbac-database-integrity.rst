.. Copyright (C) 2022 Wazuh, Inc.

.. _rbac_database_integrity:

RBAC database integrity
=======================

The RBAC database integrity is checked every time the wazuh-manager service starts to determine if the database should be updated. The integrity check allows us to cover the following cases:

- Allow the introduction of breaking changes in the RBAC database structure or its default resources in future releases.
- Restore the RBAC database with its default RBAC resources if it was manually deleted, being able to restore the RBAC database to a fresh install state if needed.

.. warning::
  If the RBAC database is manually deleted, it is restored with the default resources. Other resources created by the user are, therefore, lost.


How the database upgrade process works
--------------------------------------

During the RBAC database integrity check, Wazuh compares the RBAC database version with the current Wazuh version installed. If they don't match, the database upgrade process is triggered.

Here is an abridged list of steps performed during the database upgrade process:

1. A new RBAC database file is created and the default Wazuh RBAC resources for the installed version are added to it.
2. Every user-created RBAC resource is migrated from the old database to the new one, maintaining its ID, name and so on.
3. In case a user-created RBAC resource coincides with one of the new default Wazuh RBAC resources:
    3.1. If a user-created **user** has the same **name** as a default user, both are considered the same. The user-created user is renamed to its name + '_user'.
    3.2. If a user-created **role** has the same **name** as a default role, both are considered the same. The user-created role is renamed to its name + '_user'.
    3.3. If a user-created **rule** has the same **name** and **body** as a default rule, both are considered the same. The user-created rule relationships are migrated to the new default rule.
    3.4. If a user-created **policy** has the same **name** and **body** as a default policy, both are considered the same. The user-created policy relationships are migrated to the new default policy.
4. Any relationships between RBAC user-created resources are added to the new database.
4. Any relationships between RBAC user-created resources and default ones are updated:
    4.1. If the default resource does not exist in the new version, the relationships between user-created resources and the deleted resource are removed.
    4.2. If the default resource has a different ID in the new version, the relationships between user-created resources and the default resource are updated to match the new ID and keep the old functionality.
    4.3. In any other case, the relationships between user-created resources and the default resources are kept.
5. The old RBAC database file is replaced by the new one.
