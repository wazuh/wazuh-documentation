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
- `#6580 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6580>`__ Migrated from AngularJS to ReactJS. `#6555 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6555>`__ `#6618 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6618>`__ `#6613 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6613>`__ `#6631 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6631>`__
- `#6120 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/6120>`__ Removed embedded discover component. `#6235 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6235>`__ `#6254 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6254>`__ `#6285 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6285>`__ `#6288 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6288>`__ `#6286 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6286>`__ `#6459 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6459>`__ `#6438 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6438>`__ `#6434 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6434>`__
- `#6227 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6227>`__ Added support for a new index for the FIM module.
- `#6268 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6268>`__ Refactored the **Endpoints Summary** charts.
- `#6250 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6250>`__ Added agent groups edition to **Endpoints Summary**. `#6274 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6274>`__
- `#6476 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6476>`__ Added a filter to select outdated agents and the **Upgrade** agent action to **Endpoints Summary**. `#6501 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6501>`__ `#6529 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6529>`__
- `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Changed the way the configuration is managed in the backend side. `#6519 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6519>`__ `#6573 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6573>`__
- `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Added a migration task to setup the configuration using a configuration file.
- `#6337 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6337>`__ Moved the content of the **API is down** and **Check connection** views to the **Server APIs** view.
- `#6545 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6545>`__ Added macOS log collection tab.
- `#6481 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6481>`__ Removed the ``GET /api/timestamp`` API endpoint.
- `#6481 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6481>`__ Removed the ``PUT /api/update-hostname/{id}`` API endpoint.
- `#6481 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6481>`__ Removed the ``DELETE /hosts/remove-orphan-entries`` API endpoint.
- `#6573 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6573>`__ Enhanced the validation for ``enrollment.dns`` on App Settings application.
- `#6607 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6607>`__ Implemented the option to control configuration editing via API endpoints and UI.
- `#6572 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6572>`__ Added the **Journald** log collector tab.
- `#6482 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6482>`__ Implemented new data source feature on MITRE ATT&CK module.

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
`#21455 <https://github.com/wazuh/wazuh/pull/21455>`__             Fixed an error in Windows agents preventing whodata policies loading.
`#21595 <https://github.com/wazuh/wazuh/pull/21595>`__             Fixed an unexpected error where the manager received messages with a reported size not corresponding to the bytes received.
`#21729 <https://github.com/wazuh/wazuh/pull/21729>`__             Prevented backup failures during WPK upgrades. A dependency check for the tar package was added.
`#22210 <https://github.com/wazuh/wazuh/pull/22210>`__             Fixed a crash of the agent due to a library incompatibility.
`#21728 <https://github.com/wazuh/wazuh/pull/21728>`__             Fixed an error of the Osquery integration on Windows that prevented loading ``osquery.conf``.
`#22588 <https://github.com/wazuh/wazuh/pull/22588>`__             Fixed a crash in the agent Rootcheck component when using ``<ignore>``.
`#20425 <https://github.com/wazuh/wazuh/pull/20425>`__             Fixed the agent not deleting the ``wazuh-agent.state`` file in Windows when stopped.
==============================================================     =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#22178 <https://github.com/wazuh/wazuh/pull/22178>`__            Added parsing of the optional ``node=`` log heading field to Audit decoders.
==============================================================    =============

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
