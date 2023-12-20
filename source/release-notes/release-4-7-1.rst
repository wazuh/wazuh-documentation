.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.7.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.7.1 Release notes - 20 December 2023
======================================

This section lists the changes in version 4.7.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Agent
^^^^^

- `#20616 <https://github.com/wazuh/wazuh/pull/20616>`__ Improved WPK upgrade scripts to ensure safe execution and backup generation.

Other
^^^^^

- `#20149 <https://github.com/wazuh/wazuh/pull/20149>`__ Upgraded external ``certifi`` library dependency version to ``2023.07.22``.
- `#20149 <https://github.com/wazuh/wazuh/pull/20149>`__ Upgraded external ``requests`` library dependency version to ``2.31.0``.
- `#18800 <https://github.com/wazuh/wazuh/issues/18800>`__ Upgraded embedded Python version to ``3.9.18``.

Packages
^^^^^^^^

- `#2559 <https://github.com/wazuh/wazuh-packages/pull/2559>`__ Updated Wazuh assistant help text for offline download option.
- `#2627 <https://github.com/wazuh/wazuh-packages/pull/2627>`__ Updated error message for CentOS GPG key import failure.
- `#2624 <https://github.com/wazuh/wazuh-packages/pull/2624>`__ Added macOS 14 Sonoma SCA files.

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
`#19993 <https://github.com/wazuh/wazuh/pull/19993>`__            Fixed an insecure request warning in the Shuffle integration.
`#19888 <https://github.com/wazuh/wazuh/pull/19888>`__            Fixed a bug that corrupted cluster logs when rotated.
`#20580 <https://github.com/wazuh/wazuh/pull/20580>`__            Fixed a bug causing the Canonical feed parser to fail in Vulnerability Detector.
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
`#20284 <https://github.com/wazuh/wazuh/pull/20284>`__            Added the ``pyarrow_hotfix`` dependency to fix the pyarrow ``CVE-2023-47248`` vulnerability in the AWS integration.
`#20598 <https://github.com/wazuh/wazuh/pull/20598>`__            Fixed a bug that allowed two simultaneous updates to occur through WPK.
==============================================================    =============

RESTful API
^^^^^^^^^^^

=========================================================    =============
Reference                                                    Description
=========================================================    =============
`#18423 <https://github.com/wazuh/wazuh/pull/18423>`__       Fixed inconsistencies in the behavior of the ``q`` parameter of some endpoints.
`#18495 <https://github.com/wazuh/wazuh/pull/18495>`__       Fixed a bug in the ``q`` parameter of the ``GET /groups/{group_id}/agents`` endpoint.
`#19533 <https://github.com/wazuh/wazuh/pull/19533>`__       Fixed bug in the regular expression used to reject non ASCII characters in some endpoints.
=========================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

=========================================================================    =============
Reference                                                                    Description
=========================================================================    =============
`#6076 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6076>`__       Fixed problem when using non latin characters in the username.
`#6104 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6104>`__       Fixed UI crash on retrieving log collection configuration for macos agent.
`#6105 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6105>`__       Fixed incorrect validation of the agent name on the Deploy new agent window.
`#6184 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6184>`__       Fixed missing columns in the agent table of **Groups**.
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
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.7.1-2.8.0/CHANGELOG.md>`__
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.7.1>`__
