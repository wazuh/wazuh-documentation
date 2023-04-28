.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.4.2 has been released. Check out our release notes to discover the changes and additions of this release.

4.4.2 Release notes - 28 April 2023
===================================

This section lists the changes in version 4.4.2. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Agent
^^^^^
- `#16515 <https://github.com/wazuh/wazuh/pull/16515>`_ Added a new module to integrate with Amazon Security Lake as a subscriber.
- `#16847 <https://github.com/wazuh/wazuh/pull/16847>`_ Added support for localfile blocks deployment.
- `#16743 <https://github.com/wazuh/wazuh/pull/16743>`_ Changed ``netstat`` command on macOS agents.

Ruleset
^^^^^^^
- `#15566 <https://github.com/wazuh/wazuh/pull/15566>`_ Added macOS 13.0 Ventura SCA policy. 
- `#15567 <https://github.com/wazuh/wazuh/pull/15567>`_ Added new ruleset for macOS 13 Ventura and older versions.
- `#16549 <https://github.com/wazuh/wazuh/pull/16549>`_ Added new base ruleset for log sources collected from Amazon Security Lake.

Other
^^^^^
- `#16692 <https://github.com/wazuh/wazuh/pull/16692>`_ Added ``pyarrow`` and ``numpy`` Python dependencies.

Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#16394 <https://github.com/wazuh/wazuh/pull/16394>`_             Fixed a bug causing agent groups tasks status in the cluster not to be stored. 
`#16478 <https://github.com/wazuh/wazuh/pull/16478>`_             Fixed memory leaks in Vulnerability Detector after disk failures. 
`#15957 <https://github.com/wazuh/wazuh/pull/15957>`_             Remove unused variable in ``wazuh-authd`` to fix a ``String not null terminated`` coverity finding.
`#16530 <https://github.com/wazuh/wazuh/pull/16530>`_             Fixed a pre-decoder problem with the + symbol in the macOS ULS timestamp.
==============================================================    =============

Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#16517 <https://github.com/wazuh/wazuh/pull/16517>`_             Fixed an issue with MAC address reporting on Windows systems.
`#16857 <https://github.com/wazuh/wazuh/pull/16857>`_             Fixed Windows unit tests hanging during execution.
==============================================================    =============

RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#16381 <https://github.com/wazuh/wazuh/pull/16381>`_             Fixed agent insertion when no key is specified using POST /agents/insert endpoint.
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.4.2/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.4.2-2.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.4.2-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.4.2-7.17.9/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.4.2-8.2/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.4.2>`_