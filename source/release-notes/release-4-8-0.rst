.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.8.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.8.0 Release notes - TBD
=========================

This section lists the changes in version 4.8.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Manager
^^^^^^^

- `#16058 <https://github.com/wazuh/wazuh/pull/16058>`__ Added new ``rollback`` query to ``wazuh-db``.
- `#18476 <https://github.com/wazuh/wazuh/pull/18476>`__ Improved ``wazuh-db`` detection of deleted database files.
- `#16893 <https://github.com/wazuh/wazuh/pull/16893>`__ Added ``timeout`` and ``retry`` parameters to the VirusTotal integration.
- `#18988 <https://github.com/wazuh/wazuh/pull/18988>`__ Extended ``wazuh-analysisd`` EPS metrics with events dropped by overload and remaining credits in the previous cycle.

Agent
^^^^^

- `#15740 <https://github.com/wazuh/wazuh/pull/15740>`__ Added snap package manager support to Syscollector.
- `#18574 <https://github.com/wazuh/wazuh/pull/18574>`__ Disabled host's IP query by Logcollector when ``ip_update_interval=0``.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#5791 <https://github.com/wazuh/wazuh-kibana-app/pull/5791>`__ Added remember server address check.

Resolved issues
---------------

This release resolves known issues as the following: 

Agent
^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#16839 <https://github.com/wazuh/wazuh/pull/16839>`__             Fixed process path retrieval in Syscollector on Windows XP.
`#16056 <https://github.com/wazuh/wazuh/pull/16056>`__             Fixed the OS version detection on Alpine Linux.
`#18642 <https://github.com/wazuh/wazuh/pull/18642>`__             Fixed Solaris 10 name not showing in the dashboard.
==============================================================     =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.8.0/CHANGELOG.md>`__
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.8.0-2.9.0/CHANGELOG.md>`__
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.8.0>`__
