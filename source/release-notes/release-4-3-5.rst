.. Copyright (C) 2022 Wazuh, Inc.


.. meta::
  :description: Wazuh 4.3.5 has been released. Check out our release notes to discover the changes and additions of this release.


4.3.5 Release notes - 29 June 2022
==================================

This section lists the changes in version 4.3.5. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.


Wazuh manager
^^^^^^^^^^^^^


Wazuh dashboard
^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ Added to the interface API messages in the Ruleset test module.
- `#4261 <https://github.com/wazuh/wazuh-kibana-app/pull/4261>`_ Added authorization prompt in Mitre > Intelligence.
- `#4239 <https://github.com/wazuh/wazuh-kibana-app/pull/4239>`_ Changed the reference from Manager to Wazuh server in the guide to deploy a new agent.
- `#4267 <https://github.com/wazuh/wazuh-kibana-app/pull/4267>`_ Removed the filtered tags because they were not supported by the API endpoint.
- `#4254 <https://github.com/wazuh/wazuh-kibana-app/pull/4254>`_ Changed styles in visualizations.


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ Added to the interface API messages in the Ruleset test module.
- `#4261 <https://github.com/wazuh/wazuh-kibana-app/pull/4261>`_ Added authorization prompt in Mitre > Intelligence.
- `#4239 <https://github.com/wazuh/wazuh-kibana-app/pull/4239>`_ Changed the reference from Manager to Wazuh server in the guide to deploy a new agent.
- `#4267 <https://github.com/wazuh/wazuh-kibana-app/pull/4267>`_ Removed the filtered tags because they were not supported by the API endpoint.
- `#4254 <https://github.com/wazuh/wazuh-kibana-app/pull/4254>`_ Changed styles in visualizations.



Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ Added to the interface API messages in the Ruleset test module.
- `#4261 <https://github.com/wazuh/wazuh-kibana-app/pull/4261>`_ Added authorization prompt in Mitre > Intelligence.
- `#4239 <https://github.com/wazuh/wazuh-kibana-app/pull/4239>`_ Changed the reference from Manager to Wazuh server in the guide to deploy a new agent.
- `#4267 <https://github.com/wazuh/wazuh-kibana-app/pull/4267>`_ Removed the filtered tags because they were not supported by the API endpoint.
- `#4254 <https://github.com/wazuh/wazuh-kibana-app/pull/4254>`_ Changed styles in visualizations.


Wazuh Splunk app
^^^^^^^^^^^^^^^^
- `#1292 <https://github.com/wazuh/wazuh-splunk/pull/1292>`_ Added the status Pending to the Agents sections.
- `#1276 <https://github.com/wazuh/wazuh-splunk/pull/1276>`_ Added a disabled state to the Apply changes button on the Agents group editor when no changes on the group are made.


Packages
^^^^^^^^



Resolved issues
---------------

This release resolves known issues. 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               0000 
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#0001 <https://github.com/wazuh/wazuh/pull/0000>`_               0000
==============================================================    =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#0002 <https://github.com/wazuh/wazuh/pull/0000>`_               0000 
==============================================================    =============


Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    Fixed type error when changing screen size in agents section.
`#4235 <https://github.com/wazuh/wazuh-kibana-app/pull/4235>`_    Removed a logged error that appeared when the ``statistics`` tasks tried to create an index with the same name, causing the second task to fail on the creation of the index because it already exists.
`#4237 <https://github.com/wazuh/wazuh-kibana-app/pull/4237>`_    Fixed a UI crash due to a query with syntax errors in ``Modules/Security events``.
`#4240 <https://github.com/wazuh/wazuh-kibana-app/pull/4240>`_    Fixed an error when generating a module report after changing the selected agent.
`#4266 <https://github.com/wazuh/wazuh-kibana-app/pull/4266>`_    Fixed an unhandled error when a Wazuh API request failed in the dev tools.
`#4264 <https://github.com/wazuh/wazuh-kibana-app/pull/4264>`_    Fixed an error related to ``API not available`` when saving the manager configuration and restarting the manager from ``Management/Configuration/Edit configuration`` on manager mode.
`#4253 <https://github.com/wazuh/wazuh-kibana-app/pull/4253>`_    Fixed a UI problem that required scrolling to see the logs in Management/Logs and Settings/Logs.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    Fixed type error when changing screen size in agents section.
`#4235 <https://github.com/wazuh/wazuh-kibana-app/pull/4235>`_    Removed a logged error that appeared when the ``statistics`` tasks tried to create an index with the same name, causing the second task to fail on the creation of the index because it already exists.
`#4237 <https://github.com/wazuh/wazuh-kibana-app/pull/4237>`_    Fixed a UI crash due to a query with syntax errors in ``Modules/Security events``.
`#4240 <https://github.com/wazuh/wazuh-kibana-app/pull/4240>`_    Fixed an error when generating a module report after changing the selected agent.
`#4266 <https://github.com/wazuh/wazuh-kibana-app/pull/4266>`_    Fixed an unhandled error when a Wazuh API request failed in the dev tools.
`#4264 <https://github.com/wazuh/wazuh-kibana-app/pull/4264>`_    Fixed an error related to ``API not available`` when saving the manager configuration and restarting the manager from ``Management/Configuration/Edit configuration`` on manager mode.
`#4253 <https://github.com/wazuh/wazuh-kibana-app/pull/4253>`_    Fixed a UI problem that required scrolling to see the logs in Management/Logs and Settings/Logs.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    Fixed type error when changing screen size in agents section.
`#4235 <https://github.com/wazuh/wazuh-kibana-app/pull/4235>`_    Removed a logged error that appeared when the ``statistics`` tasks tried to create an index with the same name, causing the second task to fail on the creation of the index because it already exists.
`#4237 <https://github.com/wazuh/wazuh-kibana-app/pull/4237>`_    Fixed a UI crash due to a query with syntax errors in ``Modules/Security events``.
`#4240 <https://github.com/wazuh/wazuh-kibana-app/pull/4240>`_    Fixed an error when generating a module report after changing the selected agent.
`#4266 <https://github.com/wazuh/wazuh-kibana-app/pull/4266>`_    Fixed an unhandled error when a Wazuh API request failed in the dev tools.
`#4264 <https://github.com/wazuh/wazuh-kibana-app/pull/4264>`_    Fixed an error related to ``API not available`` when saving the manager configuration and restarting the manager from ``Management/Configuration/Edit configuration`` on manager mode.
`#4253 <https://github.com/wazuh/wazuh-kibana-app/pull/4253>`_    Fixed a UI problem that required scrolling to see the logs in Management/Logs and Settings/Logs.
==============================================================    =============


Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1290 <https://github.com/wazuh/wazuh-splunk/pull/1290>`_        Outdated documentation links have been updated.
`#1343 <https://github.com/wazuh/wazuh-splunk/pull/1343>`_        The Alerts view from the MITRE section has been hardened in case of errors during the requests to the API (for example timeouts).
==============================================================    =============


Packages
^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#0004 <https://github.com/wazuh/wazuh-packages/pull/0000>`_      0000 
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.5/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.5-1.2.0-wzd/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.5-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.5-7.17.4/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.5-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.3.5>`_
