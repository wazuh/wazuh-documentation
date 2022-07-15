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
h- `#14085 <https://github.com/wazuh/wazuh/pull/14085>`_ Support for Ubuntu 22 (Jammy) is added in Vulnerability Detector.
- `#14117 <https://github.com/wazuh/wazuh/pull/14117>`_ Support for Red Hat 9 is added in Vulnerability Detector.
- `#14111 <https://github.com/wazuh/wazuh/pull/14111>`_ The shared configuration file handling performance is improved in wazuh-remoted.


Wazuh agent
^^^^^^^^^^^
- `#13837 <https://github.com/wazuh/wazuh/pull/13837>`_ The macOS codename list is updated in Syscollector.
- `#14093 <https://github.com/wazuh/wazuh/pull/14093>`_ The GitHub and Office365 integrations log messages is improved.


Ruleset
^^^^^^^
- `#13893 <https://github.com/wazuh/wazuh/pull/13893>`_ Ubuntu Linux 22.04 SCA Policy is added.
- `#13905 <https://github.com/wazuh/wazuh/pull/13905>`_ Apple macOS 12.0 Monterey SCA Policy is added.


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
- `#14121 <https://github.com/wazuh/wazuh/pull/14121>`_ The filebeat logging metrics is disabled.


Resolved issues
---------------

This release resolves known issues as the following: 


Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14098 <https://github.com/wazuh/wazuh/pull/14098>`_             The potential memory leaks in Vulnerability Detector when parsing OVAL with no criteria is fixed.
`#13957 <https://github.com/wazuh/wazuh/pull/13957>`_             A bug in Vulnerability Detector that skipped Windows 8.1 and Windows 8 agents is fixed.
`#14061 <https://github.com/wazuh/wazuh/pull/14061>`_             A bug in wazuh-db that stored duplicate Syscollector package data is fixed.
==============================================================    =============


Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13941 <https://github.com/wazuh/wazuh/pull/13941>`_             The agent shutdown when syncing Syscollector data is fixed.
`#14207 <https://github.com/wazuh/wazuh/pull/14207>`_             A bug in the agent installer that misdetected the Wazuh username is fixed.
`#14100 <https://github.com/wazuh/wazuh/pull/14100>`_             The macOS vendor data retrieval in Syscollector is fixed.
`#14106 <https://github.com/wazuh/wazuh/pull/14106>`_             A bug in the Syscollector data sync when the agent gets disconnected is fixed.
`#13980 <https://github.com/wazuh/wazuh/pull/13980>`_             A crash in the Windows agent caused by the Syscollector SMBIOS parser for Windows agents is fixed.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14152 <https://github.com/wazuh/wazuh/pull/14152>`_             The return of an exception when the user asks for agent inventory information where there is no database for it is fixed, such as never_connected agents.
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
