.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.6.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.6.0 Release notes - TBD
=========================

This section lists the changes in version 4.6.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^
- `#13034 <https://github.com/wazuh/wazuh/pull/13034>`_ Added support for Amazon Linux 2022 in Vulnerability Detector.
- `#13559 <https://github.com/wazuh/wazuh/pull/13559>`_ ``wazuh-authd`` can now generate X509 certificates.
- `#14659 <https://github.com/wazuh/wazuh/pull/14659>`_ ``wazuh-remoted`` now checks the size of the files to avoid malformed merged.mg.
- `#14024 <https://github.com/wazuh/wazuh/pull/14024>`_ Added a limit option for the Rsync dispatch queue size.
- `#14026 <https://github.com/wazuh/wazuh/pull/14026>`_ Added a limit option for the Rsync thread pool.
- `#14549 <https://github.com/wazuh/wazuh/pull/14549>`_ ``wazuh-authd`` now shows a warning when deprecated forcing options are present in the configuration.
- `#14804 <https://github.com/wazuh/wazuh/pull/14804>`_ The agent now notifies the manager when Active Response fails to run ``netsh``.

Agent
^^^^^
- `#14763 <https://github.com/wazuh/wazuh/pull/14763>`_ Added Audit policy change detection in FIM for Windows.
- `#13264 <https://github.com/wazuh/wazuh/pull/13264>`_ FIM option ``fim_check_ignore`` now applies to files and directories.
- `#14784 <https://github.com/wazuh/wazuh/pull/14784>`_ Unit tests have been added to the shared JSON handling library.
- `#14476 <https://github.com/wazuh/wazuh/pull/14476>`_ Unit tests have been added to the shared SQLite handling library.
- `#13878 <https://github.com/wazuh/wazuh/pull/13878>`_ Unused option ``local_ip`` for agent configuration has been deleted.

Ruleset
^^^^^^^
- `#14138 <https://github.com/wazuh/wazuh/pull/14138>`_ The SSHD decoder has been improved to catch disconnection events.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#5197 <https://github.com/wazuh/wazuh-kibana-app/pull/5197>`_ `#5274 <https://github.com/wazuh/wazuh-kibana-app/pull/5274>`_ `#5298 <https://github.com/wazuh/wazuh-kibana-app/pull/5298>`_ `#5409 <https://github.com/wazuh/wazuh-kibana-app/pull/5409>`_ Added ``rel="noopener noreferrer"`` in documentation links.
- `#5203 <https://github.com/wazuh/wazuh-kibana-app/pull/5203>`_ Added ``ignore`` and ``restrict`` options to Syslog configuration.
- `#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_ Added the ``extensions.github`` and ``extensions.office`` settings to the default configuration file.
- `#4163 <https://github.com/wazuh/wazuh-kibana-app/pull/4163>`_ Added new global error treatment (client-side).
- `#5201 <https://github.com/wazuh/wazuh-kibana-app/pull/5201>`_ Changed of regular expression in RBAC.
- `#5384 <https://github.com/wazuh/wazuh-kibana-app/pull/5384>`_ Migrate the timeFilter, metaFields, maxBuckets health checks inside the pattern check.

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `#5197 <https://github.com/wazuh/wazuh-kibana-app/pull/5197>`_ `#5274 <https://github.com/wazuh/wazuh-kibana-app/pull/5274>`_ `#5298 <https://github.com/wazuh/wazuh-kibana-app/pull/5298>`_ `#5409 <https://github.com/wazuh/wazuh-kibana-app/pull/5409>`_ Added ``rel="noopener noreferrer"`` in documentation links.
- `#5203 <https://github.com/wazuh/wazuh-kibana-app/pull/5203>`_ Added ``ignore`` and ``restrict`` options to Syslog configuration.
- `#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_ Added the ``extensions.github`` and ``extensions.office`` settings to the default configuration file.
- `#4163 <https://github.com/wazuh/wazuh-kibana-app/pull/4163>`_ Added new global error treatment (client-side).
- `#5201 <https://github.com/wazuh/wazuh-kibana-app/pull/5201>`_ Changed of regular expression in RBAC.
- `#5384 <https://github.com/wazuh/wazuh-kibana-app/pull/5384>`_ Migrate the timeFilter, metaFields, maxBuckets health checks inside the pattern check.

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- `#5197 <https://github.com/wazuh/wazuh-kibana-app/pull/5197>`_ `#5274 <https://github.com/wazuh/wazuh-kibana-app/pull/5274>`_ `#5298 <https://github.com/wazuh/wazuh-kibana-app/pull/5298>`_ `#5409 <https://github.com/wazuh/wazuh-kibana-app/pull/5409>`_ Added ``rel="noopener noreferrer"`` in documentation links.
- `#5203 <https://github.com/wazuh/wazuh-kibana-app/pull/5203>`_ Added ``ignore`` and ``restrict`` options to Syslog configuration.
- `#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_ Added the ``extensions.github`` and ``extensions.office`` settings to the default configuration file.
- `#4163 <https://github.com/wazuh/wazuh-kibana-app/pull/4163>`_ Added new global error treatment (client-side).
- `#5201 <https://github.com/wazuh/wazuh-kibana-app/pull/5201>`_ Changed of regular expression in RBAC.
- `#5384 <https://github.com/wazuh/wazuh-kibana-app/pull/5384>`_ Migrate the timeFilter, metaFields, maxBuckets health checks inside the pattern check.

Wazuh Splunk app
^^^^^^^^^^^^^^^^

- `#1395 <https://github.com/wazuh/wazuh-splunk/pull/1395>`_ Added Files and Registries limits sections in configurations.

Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13979 <https://github.com/wazuh/wazuh/pull/13979>`_             Fixed ``wazuh-remoted`` not updating total bytes sent in UDP.
`#14356 <https://github.com/wazuh/wazuh/pull/14356>`_             Fixed translation of packages with a missing version in CPE Helper for Vulnerability Detector.
`#14174 <https://github.com/wazuh/wazuh/pull/14174>`_             Fixed undefined behavior issues in Vulnerability Detector unit tests.
`#14019 <https://github.com/wazuh/wazuh/pull/14019>`_             Fixed permission error when producing FIM alerts.
`#15164 <https://github.com/wazuh/wazuh/pull/15164>`_             Fixed memory leaks ``wazuh-authd``.
==============================================================    =============

Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13534 <https://github.com/wazuh/wazuh/pull/13534>`_             Fixed the architecture of the dependency URL for macOS.
`#13588 <https://github.com/wazuh/wazuh/pull/13588>`_             Fixed a path length limitation that prevented FIM from reporting changes on Windows.
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4828 <https://github.com/wazuh/wazuh-kibana-app/pull/4828>`_    Fixed trailing hyphen character for OS value in the list of agents.
`#4909 <https://github.com/wazuh/wazuh-kibana-app/pull/4909>`_    Fixed an issue that caused incorrect visualization of IPv6 addresses.
`#4911 <https://github.com/wazuh/wazuh-kibana-app/pull/4911>`_    Fixed several typos in the code, by @jctello.
`#4917 <https://github.com/wazuh/wazuh-kibana-app/pull/4917>`_    Fixed the display of more than one protocol in the Global configuration section.
`#4918 <https://github.com/wazuh/wazuh-kibana-app/pull/4918>`_    Handling endpoint response is done when there is no data to show.
`#4894 <https://github.com/wazuh/wazuh-kibana-app/pull/4894>`_    Fixed references to Elasticsearch in Wazuh-stack plugin.
`#5135 <https://github.com/wazuh/wazuh-kibana-app/pull/5135>`_    Fixed two errors that appeared in the console in **Settings > Configuration** section.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_    Fixed the GitHub and Office 365 module visibility configuration for each API host was not kept when changing/upgrading the plugin.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_    Fixed the GitHub and Office 365 modules that appeared in the main menu when they were not configured.
`#5364 <https://github.com/wazuh/wazuh-kibana-app/pull/5364>`_    Fixed TypeError in FIM Inventory using a new error handler.
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4828 <https://github.com/wazuh/wazuh-kibana-app/pull/4828>`_    Fixed trailing hyphen character for OS value in the list of agents.
`#4909 <https://github.com/wazuh/wazuh-kibana-app/pull/4909>`_    Fixed an issue that caused incorrect visualization of IPv6 addresses.
`#4911 <https://github.com/wazuh/wazuh-kibana-app/pull/4911>`_    Fixed several typos in the code, by @jctello.
`#4917 <https://github.com/wazuh/wazuh-kibana-app/pull/4917>`_    Fixed the display of more than one protocol in the Global configuration section.
`#4918 <https://github.com/wazuh/wazuh-kibana-app/pull/4918>`_    Handling endpoint response is done when there is no data to show.
`#5135 <https://github.com/wazuh/wazuh-kibana-app/pull/5135>`_    Fixed two errors that appeared in the console in **Settings > Configuration** section.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_    Fixed the GitHub and Office 365 module visibility configuration for each API host was not kept when changing/upgrading the plugin.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_    Fixed the GitHub and Office 365 modules that appeared in the main menu when they were not configured.
`#5364 <https://github.com/wazuh/wazuh-kibana-app/pull/5364>`_    Fixed TypeError in FIM Inventory using a new error handler.
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4828 <https://github.com/wazuh/wazuh-kibana-app/pull/4828>`_    Fixed trailing hyphen character for OS value in the list of agents.
`#4909 <https://github.com/wazuh/wazuh-kibana-app/pull/4909>`_    Fixed an issue that caused incorrect visualization of IPv6 addresses.
`#4911 <https://github.com/wazuh/wazuh-kibana-app/pull/4911>`_    Fixed several typos in the code, by @jctello.
`#4917 <https://github.com/wazuh/wazuh-kibana-app/pull/4917>`_    Fixed the display of more than one protocol in the Global configuration section.
`#4918 <https://github.com/wazuh/wazuh-kibana-app/pull/4918>`_    Handling endpoint response is done when there is no data to show.
`#5135 <https://github.com/wazuh/wazuh-kibana-app/pull/5135>`_    Fixed two errors that appeared in the console in **Settings > Configuration** section.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_    Fixed the GitHub and Office 365 module visibility configuration for each API host was not kept when changing/upgrading the plugin.
`#5376 <https://github.com/wazuh/wazuh-kibana-app/pull/5376>`_    Fixed the GitHub and Office 365 modules that appeared in the main menu when they were not configured.
`#5364 <https://github.com/wazuh/wazuh-kibana-app/pull/5364>`_    Fixed TypeError in FIM Inventory using a new error handler.
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.6.0-2.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.6.0-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.6.0-7.17.9/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.6.0-8.2/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.6.0>`_
