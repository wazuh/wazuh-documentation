.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.3.4 has been released. Check out our release notes to discover the changes and additions of this release.

4.3.4 Release notes - 8 June 2022
=================================

This section lists the changes in version 4.3.4. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.


Wazuh manager
^^^^^^^^^^^^^

- `#13437 <https://github.com/wazuh/wazuh/pull/13437>`_ Integratord now tries to read alerts indefinitely, instead of performing 3 attempts.
- `#13626 <https://github.com/wazuh/wazuh/pull/13626>`_ A timeout for remote queries made by the Office 365, GitHub, and Agent Update modules is added.


Wazuh dashboard
^^^^^^^^^^^^^^^

- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_ `#4188 <https://github.com/wazuh/wazuh-kibana-app/pull/4188>`_ The ``pending`` agent status is added to some sections where it was missing.
- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    The visualization of ``Status`` panel in Agents is replaced.
- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    The visualization of policy in ``Modules/Security configuration assessment/Inventory`` is replaced.
- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_  `#4199 <https://github.com/wazuh/wazuh-kibana-app/issues/4199>`_  Consistency is improved in the colors and labels used for the agent status.
- `#4169 <https://github.com/wazuh/wazuh-kibana-app/pull/4169>`_    How the full and partial scan dates are displayed in the ``Details`` panel of ``Vulnerabilities/Inventory`` is replaced.

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_ `#4188 <https://github.com/wazuh/wazuh-kibana-app/pull/4188>`_ The ``pending`` agent status is added to some sections where it was missing.
- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    The visualization of ``Status`` panel in Agents is replaced.
- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    The visualization of policy in ``Modules/Security configuration assessment/Inventory`` is replaced.
- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_   `#4199 <https://github.com/wazuh/wazuh-kibana-app/issues/4199>`_ Consistency is improved in the colors and labels used for the agent status.
- `#4169 <https://github.com/wazuh/wazuh-kibana-app/pull/4169>`_    How the full and partial scan dates are displayed in the ``Details`` panel of ``Vulnerabilities/Inventory`` is replaced.

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_ `#4188 <https://github.com/wazuh/wazuh-kibana-app/pull/4188>`_ The ``pending`` agent status is added to some sections where it was missing.
- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    The visualization of ``Status`` panel in Agents is replaced.
- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    The visualization of policy in ``Modules/Security configuration assessment/Inventory`` is replaced.
- `#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    Consistency is improved in the colors and labels used for the agent status.
- `#4169 <https://github.com/wazuh/wazuh-kibana-app/pull/4169>`_    How the full and partial scan dates are displayed in the ``Details`` panel of ``Vulnerabilities/Inventory`` is replaced.

Wazuh Splunk app
^^^^^^^^^^^^^^^^

- `#1327 <https://github.com/wazuh/wazuh-splunk/pull/1327>`_        Splunk search-handler event management is improved to avoid forwarder toast error misinterpretation. 


Packages
^^^^^^^^

- `#1595 <https://github.com/wazuh/wazuh-packages/pull/1595>`_      Splunk packages builder is simplified. 
- `#1606 <https://github.com/wazuh/wazuh-packages/pull/1606>`_      The Wazuh logo on the login page is updated. 
- `#1628 <https://github.com/wazuh/wazuh-packages/pull/1628>`_      Support for Ubuntu 22 is added. 
- `#1548 <https://github.com/wazuh/wazuh-packages/pull/1548>`_      The installation assistant now changes the Wazuh API default passwords. 

Resolved issues
---------------

This release resolves known issues. 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13621 <https://github.com/wazuh/wazuh/pull/13621>`_             A bug in ``agent_groups`` CLI when removing agent groups is fixed.
`#13459 <https://github.com/wazuh/wazuh/pull/13459>`_             Linux compilation errors with GCC 12 are fixed.
`#13604 <https://github.com/wazuh/wazuh/pull/13604>`_             A crash in wazuh-analysisd when overwriting a rule with a configured active response is fixed.
`#13666 <https://github.com/wazuh/wazuh/pull/13666>`_             A crash in wazuh-db when it cannot open a database file is fixed. 
`#13566 <https://github.com/wazuh/wazuh/pull/13566>`_             The vulnerability feed parsing mechanism now truncates excessively long values (This problem was detected during Ubuntu Bionic feed update).
`#13679 <https://github.com/wazuh/wazuh/pull/13679>`_             A crash in wazuh-maild when parsing an alert with no full log and containing arrays of non-strings is fixed.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13550 <https://github.com/wazuh/wazuh/pull/13550>`_             The default timeouts for ``GET /mitre/software`` and ``GET /mitre/techniques`` are updated to avoid timing out in slow environments.
==============================================================    =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13560 <https://github.com/wazuh/wazuh/pull/13560>`_             The prematch criteria of ``sshd-disconnect`` decoder is fixed.
==============================================================    =============


Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    When the platform visualizations didn't use some definitions related to the UI on Kibana 7.10.2 is now fixed.
`#4167 <https://github.com/wazuh/wazuh-kibana-app/pull/4167>`_    A toast message with a successful process appeared when removing an agent of a group in ``Management/Groups`` and the agent appears in the agent list after refreshing the table is fixed.
`#4176 <https://github.com/wazuh/wazuh-kibana-app/pull/4176>`_    The import of an empty rule or decoder file is fixed.
`#4180 <https://github.com/wazuh/wazuh-kibana-app/pull/4180>`_    The overwriting of rule and decoder imports is now fixed.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    When the platform visualizations didn't use some definitions related to the UI on Kibana 7.10.2 is now fixed.
`#4167 <https://github.com/wazuh/wazuh-kibana-app/pull/4167>`_    A toast message with a successful process appeared when removing an agent of a group in ``Management/Groups`` and the agent appears in the agent list after refreshing the table is fixed.
`#4176 <https://github.com/wazuh/wazuh-kibana-app/pull/4176>`_    The import of an empty rule or decoder file is fixed.
`#4180 <https://github.com/wazuh/wazuh-kibana-app/pull/4180>`_    The overwriting of rule and decoder imports is now fixed.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4166 <https://github.com/wazuh/wazuh-kibana-app/pull/4166>`_    When the platform visualizations didn't use some definitions related to the UI on Kibana 7.10.2 is now fixed.
`#4167 <https://github.com/wazuh/wazuh-kibana-app/pull/4167>`_    A toast message with a successful process appeared when removing an agent of a group in ``Management/Groups`` and the agent appears in the agent list after refreshing the table is fixed.
`#4176 <https://github.com/wazuh/wazuh-kibana-app/pull/4176>`_    The import of an empty rule or decoder file is fixed.
`#4180 <https://github.com/wazuh/wazuh-kibana-app/pull/4180>`_    The overwriting of rule and decoder imports is now fixed.
`#4157 <https://github.com/wazuh/wazuh-kibana-app/pull/4157>`_    Wazuh now maintains the filters when clicking on the ``Visualize`` button of a document field from ``<Module>/Events`` and redirects to the ``lens`` plugin.
`#4198 <https://github.com/wazuh/wazuh-kibana-app/pull/4198>`_    Missing background in the status graph tooltip in agents is fixed.
`#4219 <https://github.com/wazuh/wazuh-kibana-app/pull/4219>`_    The problem allowing to remove the filters from the module is fixed.
==============================================================    =============


Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1329 <https://github.com/wazuh/wazuh-splunk/pull/1329>`_        Unhandled expired session when requesting Splunk DB documents is fixed.
==============================================================    =============


Packages
^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1613 <https://github.com/wazuh/wazuh-packages/pull/1613>`_      Suse init script installation in agent is fixed. 
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.4/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.4-1.2.0-wzd/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.4-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.4-7.17.4/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.4-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.3.4>`_
