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
3. In case a user-created RBAC resource has the same name as a default Wazuh RBAC resource, the default one is kept and the user-created one is not added to the new RBAC database file. For the RBAC Policies the same applies to their policy body (compose of its actions, resources and effects), as they must be unique.
4. Any relationships between user-created resources and default ones, such as relationships between roles and policies or roles and users, are updated to use the default resource instead, so the functionality is kept.
5. The old RBAC database file is replaced by the new one.
