.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.7.3 has been released. Check out our release notes to discover the changes and additions of this release.

4.7.3 Release notes - 4 March 2024
==================================

This section lists the changes in version 4.7.3. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

===========================================================  =============
 Reference                                                   Description
===========================================================  =============
`#21997 <https://github.com/wazuh/wazuh/pull/21997>`__       Resolved a transitive mutex locking issue in wazuh-db that was impacting performance.
`#21977 <https://github.com/wazuh/wazuh/pull/21977>`__       Wazuh DB internal SQL queries have been optimized by tuning database indexes to improve performance.
===========================================================  =============

Wazuh dashboard
^^^^^^^^^^^^^^^

=======================================================================    =============
Reference                                                                  Description
=======================================================================    =============
`#6458 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6458>`__     Fixed an error when uploading CDB lists.
=======================================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.7.3/CHANGELOG.md>`__
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.7.3-2.8.0/CHANGELOG.md>`__
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.7.3>`__
