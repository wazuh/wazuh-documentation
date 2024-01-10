.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.9.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.9.0 Release notes - TBD
=========================

This section lists the changes in version 4.9.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#17306 <https://github.com/wazuh/wazuh/pull/17306>`__ Added alert forwarding to Fluentd.
- `#20285 <https://github.com/wazuh/wazuh/pull/20285>`__ Changed logging level of  wazuh-db ``recv()`` messages from error to debug.

Wazuh agent
^^^^^^^^^^^

- `#19753 <https://github.com/wazuh/wazuh/pull/19753>`__ Removed the directory ``/boot`` from the default FIM settings for AIX.

Ruleset
^^^^^^^

- `#19754 <https://github.com/wazuh/wazuh/pull/19754>`__ Clarified the description for rule ID ``23502`` about solved vulnerabilities.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#6145 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6145>`__ Added AngularJS dependencies.
- `#6120 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6120>`__ Removed embedded discover component. `#6235 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6235>`__ `#6254 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6254>`__ `#6285 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6285>`__
- `#6227 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6227>`__ Added support for a new index for the FIM module.
- `#6250 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6250>`__ Added agent groups edition to **Endpoints Summary**.

Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#20505 <https://github.com/wazuh/wazuh/pull/20505>`__             Fixed compilation issue for local installation.
==============================================================     =============

Wazuh agent
^^^^^^^^^^^

==============================================================     =============
Reference                                                          Description
==============================================================     =============
`#19146 <https://github.com/wazuh/wazuh/pull/19146>`__             Fixed command monitoring on Windows to support UTF-8 characters.
==============================================================     =============

Other
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#19794 <https://github.com/wazuh/wazuh/pull/19794>`__            Fixed a buffer overflow hazard in HMAC internal library.
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

=========================================================================    =============
Reference                                                                    Description
=========================================================================    =============
`#6237 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6237>`__       Fixed disappearing scripted fields when index pattern fields refreshed.
=========================================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.9.0/CHANGELOG.md>`__
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.9.0-2.11.0/CHANGELOG.md>`__
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.9.0>`__
