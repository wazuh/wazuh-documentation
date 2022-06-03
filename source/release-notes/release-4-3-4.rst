.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
      :description: Wazuh 4.3.4 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_3_4:

4.3.4 Release notes
===================

This section lists the changes in version 4.3.4. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.


Manager
^^^^^^^

`#13437 <https://github.com/wazuh/wazuh/pull/13437>`_ Integratord now tries to read alerts indefinitely, instead of performing 3 attempts.
`#13626 <https://github.com/wazuh/wazuh/pull/13626>`_ Adds a timeout for remote queries made by the Office 365, GitHub, and Agent Update modules.


Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_ `#4188 <https://github.com/wazuh/wazuh-kibana-app/pull/4188>`_ Added the pending agent status to some sections that was missing.


Wazuh Splunk app
^^^^^^^^^^^^^^^^

- Wazuh Splunk app is now compatible with Wazuh 4.3.4. 


Resolved issues
---------------

This release resolves known issues. 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13621 <https://github.com/wazuh/wazuh/pull/13621>`_             Fixed bug in agent_groups CLI when removing agent groups.
`#13459 <https://github.com/wazuh/wazuh/pull/13459>`_             Fixed linux compilation errors with GCC 12.
`#13604 <https://github.com/wazuh/wazuh/pull/13604>`_             Fixed a crash in wazuh-analysisd when overwriting a rule with a configured active response.
`#13666 <https://github.com/wazuh/wazuh/pull/13666>`_             Fixed a crash in wazuh-db when it cannot open a database file.
`#13566 <https://github.com/wazuh/wazuh/pull/13566>`_             Fixed the vulnerability feed parsing mechanism, now truncates excessively long values (This problem was detected during Ubuntu Bionic feed update).
`#13679 <https://github.com/wazuh/wazuh/pull/13679>`_             Fixed a crash in wazuh-maild when parsing an alert with no full log and containing arrays of non-strings.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13550 <https://github.com/wazuh/wazuh/pull/13550>`_             Updated default timeouts for GET /mitre/software and GET /mitre/techniques to avoid timing out in slow environments.
==============================================================    =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13560 <https://github.com/wazuh/wazuh/pull/13560>`_             Fixed the prematch criteria of sshd-disconnect decoder.
==============================================================    =============


Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    Replaced the visualization of Status panel in Agents.
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    Replaced the visualization of policy in Modules/Security configuration assessment/Inventory.
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    Consistency in the colors and labels used for the agent status.
`#4169 <https://github.com/wazuh/wazuh-kibana-app/pull/4169>`_    Replaced how the full and partial scan dates are displayed in the Details panel of Vulnerabilities/Inventory.
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    Fixed that the platform visualizations didn't use some definitions related to the UI on Kibana 7.10.2.
`#4167 <https://github.com/wazuh/wazuh-kibana-app/pull/4167>`_    Fixed a toast message with a successful process appeared when removing an agent of a group in Management/Groups and the agent appears in the agent list after refreshing the table.
`#4176 <https://github.com/wazuh/wazuh-kibana-app/pull/4176>`_    Fixed import of an empty rule or decoder file.
`#4180 <https://github.com/wazuh/wazuh-kibana-app/pull/4180>`_    Fixed overwriting of rule and decoder imports.
`#4157 <https://github.com/wazuh/wazuh-kibana-app/pull/4157>`_    Maintain the filters when clicking on the Visualize button of a document field from <Module>/Events and redirects to the lens plugin.
==============================================================    =============


Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1327 <https://github.com/wazuh/wazuh-splunk/pull/1327>`_        Improved Splunk search-handler event management to avoid forwarder toast error mis-interpretation.
`#1329 <https://github.com/wazuh/wazuh-splunk/pull/1329>`_        Fixed unhandled expired session when requesting Splunk DB documents.
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.4/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.4-1.2.0-wzd/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.4-7.17.3/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.4-8.2.6/CHANGELOG.md>`_