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
- `#21690 <https://github.com/wazuh/wazuh/pull/21690>`__ Improved debugging logs for Windows registry monitoring configuration. Now the ``Wrong registry value type`` warnings include the registry path to help troubleshooting. Thanks to Zafer Balkan (@zbalkan).
- `#21287 <https://github.com/wazuh/wazuh/pull/21287>`__ Added Amazon Linux 1 and Amazon Linux 2023 support for the Wazuh installation assistant.

Ruleset
^^^^^^^

- `#19754 <https://github.com/wazuh/wazuh/pull/19754>`__ Clarified the description for rule ID ``23502`` about solved vulnerabilities.

Other
^^^^^

- `#20778 <https://github.com/wazuh/wazuh/pull/20778>`__ Upgraded external OpenSSL library dependency version used by Wazuh from V1 to V3.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#6145 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6145>`__ Added AngularJS dependencies.
- `#6120 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6120>`__ Removed embedded discover component. `#6235 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6235>`__ `#6254 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6254>`__ `#6285 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6285>`__ `#6288 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6288>`__ `#6286 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6286>`__ `#6459 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6459>`__
- `#6227 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6227>`__ Added support for a new index for the FIM module.
- `#6268 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6268>`__ Refactored the **Endpoints Summary** charts.
- `#6250 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6250>`__ Added agent groups edition to **Endpoints Summary**.
- `#6274 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6274>`__ Added global actions for adding and removing groups on agents to the **Endpoints Summary**.
- `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Changed the way the configuration is defined and stored.
- `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Added a migration task to setup the configuration using a configuration file.
- `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Added the ability to manage the API hosts from the Server APIs. `#6519 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6519>`__
- `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Changed the view of API is down and check connection to Server APIs application.
- `#6476 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6476>`__ Added the **Upgrade** agent action to **Endpoints Summary**.

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
