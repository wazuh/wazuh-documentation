.. Copyright (C) 2021 Wazuh, Inc.

.. _rbac_database_integrity:

RBAC database integrity
=======================

The RBAC database integrity will be checked every time the wazuh-manager service starts to determine if the database should be updated. The integrity check allows us to cover the following cases:

- Allow the introduction of breaking changes in the RBAC database structure or its default resources in future releases.
- Restore the RBAC database with its default RBAC resources if it was manually deleted, being able to restore the RBAC database to a fresh install state if needed.

.. warning::
  If the RBAC database is manually deleted it will be restored with the default resources, but any user-created resources will be lost.


How the database upgrade process works
--------------------------------------

During the RBAC database integrity check Wazuh will compare the RBAC database version with the current Wazuh version installed. If they don't match, the database upgrade process will be triggered.

Here is an abridged list of steps performed during the database upgrade process:

1. A new RBAC database file will be created and the actual default Wazuh RBAC resources for the installed release will be added to it.
2. Any user-created RBAC resources, including both protected and user type resources, will be migrated from the old database to the new one, maintaining their IDs, names and so on.
3. In case a user-created RBAC resource has the same name as a default Wazuh RBAC resource, the default one will be kept and the user one won't be added to the new RBAC database file. For the RBAC Policies the same applies to their policy body (compose of its actions, resources and effects), as they must be unique.
4. Any relationship between a user-created resource and a default one, such as relationships between roles and polcies or roles and users, will be updated to use the default resource instead, so the functionality will be kept.
5. The old RBAC database file will be replaced by the new one.
