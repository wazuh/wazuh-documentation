.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.7.5 has been released. Check out our release notes to discover the changes and additions of this release.

4.7.5 Release notes - 30 May 2024
=================================

This section lists the changes in version 4.7.5. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#23441 <https://github.com/wazuh/wazuh/pull/23441>`__ Added a database endpoint to recalculate the hash of agent groups.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#6687 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6687>`__ Added sanitization to custom branding SVG files.

Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

===========================================================  =============
 Reference                                                   Description
===========================================================  =============
`#23447 <https://github.com/wazuh/wazuh/pull/23447>`__       Fixed an issue in a cluster task where full group synchronization was constantly triggered.
`#23216 <https://github.com/wazuh/wazuh/pull/23216>`__       Fixed race condition when creating agent database files from a template.
===========================================================  =============

Wazuh agent
^^^^^^^^^^^

===========================================================  =============
 Reference                                                   Description
===========================================================  =============
`#23468 <https://github.com/wazuh/wazuh/pull/23468>`__       Fixed segmentation fault in the logcollector multiline-regex configuration.
`#23543 <https://github.com/wazuh/wazuh/pull/23543>`__       Fixed crash in FIM module when processing paths with non UTF-8 characters.
===========================================================  =============

Wazuh dashboard
^^^^^^^^^^^^^^^

=======================================================================    =============
Reference                                                                  Description
=======================================================================    =============
`#6718 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6718>`__     Fixed a missing space in the macOS agent installation command when a password is required.
=======================================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.7.5/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.7.5-2.8.0/CHANGELOG.md>`__
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.7.5>`__
