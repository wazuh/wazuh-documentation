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
- `#13915 <https://github.com/wazuh/wazuh/pull/13915>`_ Improved the Vulnerability Detector's log when the agent's OS data is unavailable.


Wazuh agent
^^^^^^^^^^^
- `#13749 <https://github.com/wazuh/wazuh/pull/13749>`_ Extended package data support in Syscollector for modern RPM agents.
- `#13898 <https://github.com/wazuh/wazuh/pull/13898>`_ Improved verbosity of the GitHub module logs.


Ruleset
^^^^^^^
- `#13567 <https://github.com/wazuh/wazuh/pull/13567>`_ Removed deprecated MITRE tags in rules.


Other
^^^^^
- `#13811 <https://github.com/wazuh/wazuh/pull/13811>`_ Fixed ``test_agent_PUT_endpoints.tavern.yaml`` API integration test failure in numbered branches.
- `#13790 <https://github.com/wazuh/wazuh/pull/13790>`_ Upgraded external click and clickclick python dependencies to 8.1.3 and 20.10.2 respectively.


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
`#13662 <https://github.com/wazuh/wazuh/pull/13662>`_             The upgrade module's response message has been fixed not to include null values.
`#13863 <https://github.com/wazuh/wazuh/pull/13863>`_             Fixed a string truncation warning log in wazuh-authd when enabling password authentication.
`#13587 <https://github.com/wazuh/wazuh/pull/13587>`_             Fixed a memory leak in wazuh-analysisd when overwriting a rule multiple times.
`#13907 <https://github.com/wazuh/wazuh/pull/13907>`_             Prevented wazuh-agentd and client-auth from performing enrollment if the agent fails to validate the manager's certificate.
`#13694 <https://github.com/wazuh/wazuh/pull/13694>`_             Fixed manager's compilation when enabling GeoIP support.
`#13883 <https://github.com/wazuh/wazuh/pull/13883>`_             Fixed a crash in wazuh-modulesd when getting stopped while downloading a Vulnerability Detector feed.z
==============================================================    =============


Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13606 <https://github.com/wazuh/wazuh/pull/13606>`_             Fixed agent auto-restart on shared configuration changes when running on containerized environments.
`#13880 <https://github.com/wazuh/wazuh/pull/13880>`_             Fixed an issue when attempting to run the DockerListener integration using Python 3.6 and having the Docker service stopped.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13867 <https://github.com/wazuh/wazuh/pull/13867>`_             Updated tag parameter of ``GET /manager/logs`` and ``GET /cluster/{node_id}/logs`` endpoints to accept any string.
==============================================================    =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13597 <https://github.com/wazuh/wazuh/pull/13597>`_             Solved Eventchannel testing and improved reporting capabilities of the runtest tool.
`#13781 <https://github.com/wazuh/wazuh/pull/13781>`_             Modified Amazon Linux 2 SCA policy to resolve a typo on control 1.1.22 and ``EMPTY_LINE`` conditions.
`#13950 <https://github.com/wazuh/wazuh/pull/13950>`_             Modified Amazon Linux 2 SCA policy to resolve the rule and condition on control 1.5.2. 
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

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.5-rc1/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.5-1.2.0-wzd/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.5-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.5-7.17.4/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.5-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.3.5>`_
