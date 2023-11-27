.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.7.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.7.1 Release notes - TBD
=========================

This section lists the changes in version 4.7.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Packages
^^^^^^^^

- `#2559 <https://github.com/wazuh/wazuh-packages/pull/2559>`__ Updated Wazuh assistant help text for offline download option.
- `#2627 <https://github.com/wazuh/wazuh-packages/pull/2627>`__ Updated error message for CentOS GPG key import failure.

Resolved issues
---------------

This release resolves known issues as the following: 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#20178 <https://github.com/wazuh/wazuh/pull/20178>`__            Fixed a thread lock bug that slowed down ``wazuh-db`` performance.
`#20386 <https://github.com/wazuh/wazuh/pull/20386>`__            Fixed a bug in Vulnerability detector that skipped vulnerabilities for Windows 11 21H2.
`#5941 <https://github.com/wazuh/wazuh/pull/5941>`__              The installer now updates the ``merged.mg`` file permissions on upgrade.
==============================================================    =============

Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#20332 <https://github.com/wazuh/wazuh/pull/20332>`__            Fixed a bug that prevented the local IP address from appearing in the port inventory from macOS agents.
`#20180 <https://github.com/wazuh/wazuh/pull/20180>`__            Fixed the default Logcollector settings on macOS to collect logs out-of-the-box.
`#20169 <https://github.com/wazuh/wazuh/pull/20169>`__            Fixed a bug in the FIM decoder at ``wazuh-analysisd`` that ignored Windows Registry events from agents earlier than 4.6.0.
`#20250 <https://github.com/wazuh/wazuh/pull/20250>`__            Fixed multiple bugs in the Syscollector decoder at ``wazuh-analysisd`` that did not sanitize the input data properly.
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

=========================================================================    =============
Reference                                                                    Description
=========================================================================    =============
`#6076 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6076>`__       Fixed problem when using non latin characters in the username.
`#6104 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6104>`__       Fixed UI crash on retrieving log collection configuration for macos agent.
`#6105 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6105>`__       Fixed incorrect validation of the agent name on the Deploy new agent window.
=========================================================================    =============

Packages
^^^^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#2561 <https://github.com/wazuh/wazuh-packages/pull/2561>`__      Fixed ``network.host`` fetching in Password tool. A commented line like ``#network.host: "XXX.XXX.XXX.XXX"`` is now ignored.
`#2493 <https://github.com/wazuh/wazuh-packages/pull/2493>`__      Fixed issue where Intel64 macos packages failed to install on ARM-based machines.
`#2611 <https://github.com/wazuh/wazuh-packages/pull/2611>`__      Fixed file permissions issue in ``merged.mg`` files when updating a manager using packages update.
==============================================================     =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.7.1/CHANGELOG.md>`__
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.7.1-2.9.0/CHANGELOG.md>`__
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.7.1>`__
