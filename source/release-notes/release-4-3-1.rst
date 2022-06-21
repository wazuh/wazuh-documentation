.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
      :description: Wazuh 4.3.1 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_3_1:

4.3.1 Release notes
===================

This section lists the changes in version 4.3.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.


What's new
----------

This release includes new features or enhancements.


Wazuh dashboard
^^^^^^^^^^^^^^^

- `#4142 <https://github.com/wazuh/wazuh-kibana-app/pull/4142>`_ Added a warning about the PowerShell version requirement in the Windows agent installation wizard.




Wazuh Splunk app
^^^^^^^^^^^^^^^^

- `#1322 <https://github.com/wazuh/wazuh-splunk/pull/1322>`_ Added a warning about the PowerShell version requirement in the Windows agent installation wizard. 

- `#1323 <https://github.com/wazuh/wazuh-splunk/pull/1323>`_ The compatibility checks of the app have been changed to simplify the release flow. 



Resolved issues
---------------

This release resolves known issues. 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13439 <https://github.com/wazuh/wazuh/pull/13439>`_             A crash when overwritten rules are triggered is fixed.  
`#13439 <https://github.com/wazuh/wazuh/pull/13439>`_             A memory leak when loading overwritten rules is fixed. 
`#13439 <https://github.com/wazuh/wazuh/pull/13439>`_             The use of relationship labels in overwritten rules is now fixed. 
`#13430 <https://github.com/wazuh/wazuh/pull/13430>`_             The regex used to transform into datetime in the logtest framework function is fixed. 
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13178 <https://github.com/wazuh/wazuh/pull/13178>`_             The API response when using sort in Agent upgrade related endpoints is now fixed. 
==============================================================    =============

Ruleset
^^^^^^^

===============================================================    =============
Reference                                                          Description
===============================================================    =============
`#13409 <https://github.com/wazuh/wazuh/pull/13409>`_              Fixed rule 92656, added field condition ``win.eventdata.logonType`` equals 10 to avoid false positives.
===============================================================    =============


Wazuh dashboard
^^^^^^^^^^^^^^^

===============================================================    =============
Reference                                                          Description
===============================================================    =============
`#4141 <https://github.com/wazuh/wazuh-kibana-app/pull/4141>`_     Enhanced the output of the Ruleset Test tool. An error that caused falsy values to be displayed as undefined is now fixed. 
===============================================================    =============


Wazuh Splunk app
^^^^^^^^^^^^^^^^

===============================================================    =============
Reference                                                          Description
===============================================================    =============
`#1320 <https://github.com/wazuh/wazuh-splunk/pull/1320>`_         Fixed the render condition of a toast message related to the forwarder when there is no data of agents and the agent deployment guide is displayed in the **Agents** section. 
`#1318 <https://github.com/wazuh/wazuh-splunk/pull/1318>`_         The access to **Management/Configuration** due to missing permissions when the manager cluster is disabled is now fixed. 
===============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.1/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.1-7.17.3/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.1-8.2/CHANGELOG.md>`_