.. Copyright (C) 2015, Wazuh, Inc.


.. meta::
  :description: Wazuh 4.3.6 has been released. Check out our release notes to discover the changes and additions of this release.


4.3.6 Release notes - 20 July 2022
==================================

This section lists the changes in version 4.3.6. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.


What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^
- `#14085 <https://github.com/wazuh/wazuh/pull/14085>`_ Added support for Ubuntu 22 (Jammy) in Vulnerability Detector.
- `#14117 <https://github.com/wazuh/wazuh/pull/14117>`_ Addded support for Red Hat 9 in Vulnerability Detector.
- `#14111 <https://github.com/wazuh/wazuh/pull/14111>`_ Improved the shared configuration file handling performance in wazuh-remoted.


Wazuh agent
^^^^^^^^^^^
- `#13837 <https://github.com/wazuh/wazuh/pull/13837>`_ Updated macOS codename list in Syscollector. (#13837)
- `#14093 <https://github.com/wazuh/wazuh/pull/14093>`_ Improved GitHub and Office365 integrations log messages. (#14093)


Ruleset
^^^^^^^
- `#13893 <https://github.com/wazuh/wazuh/pull/13893>`_ Added Ubuntu Linux 22.04 SCA Policy. (#13893)
- `#13905 <https://github.com/wazuh/wazuh/pull/13905>`_ Added Apple macOS 12.0 Monterey SCA Policy. (#13905)

Wazuh dashboard
^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ xxx


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ xxx


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ xxx


Wazuh Splunk app
^^^^^^^^^^^^^^^^
- `#1292 <https://github.com/wazuh/wazuh-splunk/pull/1292>`_ xxx


Packages
^^^^^^^^

- `#1635 <https://github.com/wazuh/wazuh-packages/pull/1635>`_ xxx


Other
^^^^^
- `#14121 <https://github.com/wazuh/wazuh/pull/14121>`_ Disabled filebeat logging metrics. (#14121)


Resolved issues
---------------

This release resolves known issues as the following: 


Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14098 <https://github.com/wazuh/wazuh/pull/14098>`_             Fixed potential memory leaks in Vulnerability Detector when parsing OVAL with no criteria. (#14098)
`#13957 <https://github.com/wazuh/wazuh/pull/13957>`_             Fixed a bug in Vulnerability Detector that skipped Windows 8.1 and Windows 8 agents. (#13957)
`#14061 <https://github.com/wazuh/wazuh/pull/14061>`_             Fixed a bug in wazuh-db that stored duplicate Syscollector package data. (#14061)
==============================================================    =============


Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13941 <https://github.com/wazuh/wazuh/pull/13941>`_             Fixed agent shutdown when syncing Syscollector data. (#13941)
`#14207 <https://github.com/wazuh/wazuh/pull/14207>`_             Fixed a bug in the agent installer that misdetected the wazuh username. (#14207)
`#14100 <https://github.com/wazuh/wazuh/pull/14100>`_             Fixed macOS vendor data retrieval in Syscollector. (#14100)
`#14106 <https://github.com/wazuh/wazuh/pull/14106>`_             Fixed a bug in the Syscollector data sync when the agent gets disconnected. (#14106)
`#13980 <https://github.com/wazuh/wazuh/pull/13980>`_             Fixed a crash in the Windows agent caused by the Syscollector SMBIOS parser for Windows agents. (#13980)
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14152 <https://github.com/wazuh/wazuh/pull/14152>`_             Return an exception when the user asks for agent inventory information where there is no database for it, such as never_connected agents. (#14152)
==============================================================    =============


Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13597 <https://github.com/wazuh/wazuh/pull/13597>`_             xxx
==============================================================    =============


Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    xxx
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    xxx
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    xxx
==============================================================    =============


Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1290 <https://github.com/wazuh/wazuh-splunk/pull/1290>`_        xxx
==============================================================    =============

Packages
^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1673 <https://github.com/wazuh/wazuh-packages/pull/1673>`_      xxx
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.6/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.6-1.2.0-wzd/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.6-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.6-7.17.4/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.6-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.3.6>`_
