.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.4.3 has been released. Check out our release notes to discover the changes and additions of this release.

4.4.3 Release notes - TBD
=========================

This section lists the changes in version 4.4.3. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Agent
^^^^^
- `#16521 <https://github.com/wazuh/wazuh/pull/16521>`_ Added support for Apple Silicon processors to the macOS agent.
- `#2211 <https://github.com/wazuh/wazuh-packages/pull/2211>`_ Prevented the installer from checking the old users ``ossecm`` and ``ossecr`` on upgrade.
- `#17195 <https://github.com/wazuh/wazuh/pull/17195>`_ Changed the deployment variables capture on macOS.

Ruleset
^^^^^^^
- `#17202 <https://github.com/wazuh/wazuh/pull/17202>`_ Unified the SCA policy names.

Resolved issues
---------------

This release resolves known issues as the following: 

Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#2217 <https://github.com/wazuh/wazuh-packages/pull/2217>`_      Removed the temporary file "ossec.confre" after upgrade on macOS. 
`#2208 <https://github.com/wazuh/wazuh-packages/pull/2208>`_      Prevented the installer from corrupting the agent configuration on macOS when deployment variables were defined on upgrade.
`#2218 <https://github.com/wazuh/wazuh-packages/pull/2218>`_      Fixed the installation on macOS by removing calls to launchctl.
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.4.3/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.4.3>`_