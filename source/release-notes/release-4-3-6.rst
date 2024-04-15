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

- `#14085 <https://github.com/wazuh/wazuh/pull/14085>`_ Support for Ubuntu 22 (Jammy) is added in Vulnerability Detector.
- `#14117 <https://github.com/wazuh/wazuh/pull/14117>`_ Support for Red Hat 9 is added in Vulnerability Detector.
- `#14111 <https://github.com/wazuh/wazuh/pull/14111>`_ The shared configuration file handling performance is improved in wazuh-remoted.

Wazuh agent
^^^^^^^^^^^

- `#13837 <https://github.com/wazuh/wazuh/pull/13837>`_ The macOS codename list is updated in Syscollector.
- `#14093 <https://github.com/wazuh/wazuh/pull/14093>`_ The GitHub and Office365 integrations log messages are improved.

Ruleset
^^^^^^^

- `#13893 <https://github.com/wazuh/wazuh/pull/13893>`_ Ubuntu Linux 22.04 SCA policy is added.
- `#13905 <https://github.com/wazuh/wazuh/pull/13905>`_ Apple macOS 12.0 Monterey SCA policy is added.


Wazuh Splunk app
^^^^^^^^^^^^^^^^

- `#1351 <https://github.com/wazuh/wazuh-splunk/pull/1351>`_ The documentation links are updated to match their respective title on the Wazuh documentation page.
- `#1354 <https://github.com/wazuh/wazuh-splunk/pull/1354>`_ The use of all tags to filter Wazuh Server logs is re-allowed.

Packages
^^^^^^^^

-  `#1706 <https://github.com/wazuh/wazuh-packages/pull/1706>`__ The text of the password tool help option is improved.
-  `#1696 <https://github.com/wazuh/wazuh-packages/pull/1696>`__ The passwords.wazuh file is renamed to wazuh-passwords.txt.
-  `#1697 <https://github.com/wazuh/wazuh-packages/pull/1697>`__ Wazuh dashboard users wazuh_admin and wazuh_user and roles wazuh_ui_user and wazuh_ui_admin are removed from the installation templates.
-  `#1718 <https://github.com/wazuh/wazuh-packages/pull/1718>`__ The periodic Filebeat metrics are disabled.
-  `#1683 <https://github.com/wazuh/wazuh-packages/pull/1683>`__ New Darwin 21 SCA file for macOS 12 added.
-  `#1684 <https://github.com/wazuh/wazuh-packages/pull/1684>`__ New Ubuntu 22 SCA file added.

Other
^^^^^

- `#14121 <https://github.com/wazuh/wazuh/pull/14121>`_ The Filebeat logging metrics are disabled.

Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14098 <https://github.com/wazuh/wazuh/pull/14098>`_             The potential memory leaks in Vulnerability Detector when parsing OVAL with no criteria are fixed.
`#13957 <https://github.com/wazuh/wazuh/pull/13957>`_             A bug in Vulnerability Detector that skipped Windows 8.1 and Windows 8 agents is fixed.
`#14061 <https://github.com/wazuh/wazuh/pull/14061>`_             A bug in wazuh-db that stored duplicate Syscollector package data is fixed.
==============================================================    =============

Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13941 <https://github.com/wazuh/wazuh/pull/13941>`_             The agent shutdown when syncing Syscollector data is fixed.
`#14207 <https://github.com/wazuh/wazuh/pull/14207>`_             A bug in the agent installer that incorrectly detected the Wazuh username is fixed.
`#14100 <https://github.com/wazuh/wazuh/pull/14100>`_             The macOS vendor data retrieval in Syscollector is fixed.
`#14106 <https://github.com/wazuh/wazuh/pull/14106>`_             A bug in the Syscollector data sync when the agent gets disconnected is fixed.
`#13980 <https://github.com/wazuh/wazuh/pull/13980>`_             A crash in the Windows agent caused by the Syscollector SMBIOS parser for Windows agents is fixed.
==============================================================    =============

RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14152 <https://github.com/wazuh/wazuh/pull/14152>`_             The return of an exception when the user asks for agent inventory information where there is no database for it is fixed, such as ``never_connected`` agents.
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4326 <https://github.com/wazuh/wazuh-kibana-app/pull/4326>`_    An error distinguishing conjunction operators (AND, OR) in the search bar component is fixed.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Some link titles  are changed to match their documentation section title.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Missing documentation references to the Agent's overview, Agent's Integrity monitoring, and Agent's Inventory data sections, when the agent has never connected are fixed.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    The links to the web documentation are changed and now point to the plugin short version instead of current.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Missing documentation link in the Docker Listener module is fixed.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Some links to web documentation that didn't work are fixed.
`#4307 <https://github.com/wazuh/wazuh-kibana-app/pull/4307>`_    Now, errors on the action buttons of Rules/Decoders/CDB Lists' tables are displayed.
`#4330 <https://github.com/wazuh/wazuh-kibana-app/pull/4330>`_    Changed reports inputs and usernames.
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4326 <https://github.com/wazuh/wazuh-kibana-app/pull/4326>`_    An error distinguishing conjunction operators (AND, OR) in the search bar component is fixed.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Some link titles are changed to match their documentation section title.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Missing documentation references to the Agent's overview, Agent's Integrity monitoring, and Agent's Inventory data sections, when the agent has never connected are fixed.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    The links to the web documentation are changed and now point to the plugin short version instead of current.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Missing documentation link in the Docker Listener module is fixed.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Some links to web documentation that didn't work are fixed.
`#4307 <https://github.com/wazuh/wazuh-kibana-app/pull/4307>`_    Now, errors on the action buttons of Rules/Decoders/CDB Lists' tables are displayed.
`#4330 <https://github.com/wazuh/wazuh-kibana-app/pull/4330>`_    Changed reports inputs and usernames.
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4326 <https://github.com/wazuh/wazuh-kibana-app/pull/4326>`_    An error distinguishing conjunction operators (AND, OR) in the search bar component is fixed.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Some link titles are changed to match their documentation section title.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Missing documentation references to the Agent's overview, Agent's Integrity monitoring, and Agent's Inventory data sections, when the agent has never connected are fixed.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    The links to the web documentation are changed and now point to the plugin short version instead of current.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Missing documentation link to the Docker Listener module is fixed.
`#4301 <https://github.com/wazuh/wazuh-kibana-app/pull/4301>`_    Some links to web documentation that didn't work are fixed.
`#4307 <https://github.com/wazuh/wazuh-kibana-app/pull/4307>`_    Now, errors on the action buttons of Rules/Decoders/CDB Lists' tables are displayed.
`#4330 <https://github.com/wazuh/wazuh-kibana-app/pull/4330>`_    Changed reports inputs and usernames.
==============================================================    =============

Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1351 <https://github.com/wazuh/wazuh-splunk/pull/1351>`_        Some links to web documentation that didn't work are fixed.
`#1296 <https://github.com/wazuh/wazuh-splunk/pull/1296>`_        An error on the DevTools where the payload was not being sent, that caused the request to fail is fixed.
==============================================================    =============

Packages
^^^^^^^^
==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1713 <https://github.com/wazuh/wazuh-packages/pull/1713>`__     An error when upgrading using symlinks is fixed.
`#1721 <https://github.com/wazuh/wazuh-packages/pull/1721>`__     An error with the installation assistant API in single Wazuh manager nodes is fixed.
`#1726 <https://github.com/wazuh/wazuh-packages/pull/1726>`__     A problem with Filebeat found in systems using GLIBC is fixed.
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.6/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.6-1.2.0-wzd/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.6-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.6-7.17.5/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.6-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.3.6>`_
