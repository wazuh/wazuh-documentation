.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.3.5 has been released. Check out our release notes to discover the changes and additions of this release.

4.3.5 Release notes - 29 June 2022
==================================

This section lists the changes in version 4.3.5. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.


What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^
- `#13915 <https://github.com/wazuh/wazuh/pull/13915>`_ The Vulnerability Detector log is improved for the case when the agent OS data is unavailable.

Wazuh agent
^^^^^^^^^^^
- `#13749 <https://github.com/wazuh/wazuh/pull/13749>`_ Package data support is extended in `Syscollector` for modern RPM agents.
- `#13898 <https://github.com/wazuh/wazuh/pull/13898>`_ Verbosity of the GitHub module logs is improved.


Ruleset
^^^^^^^
- `#13567 <https://github.com/wazuh/wazuh/pull/13567>`_ Deprecated MITRE tags in rules are removed.


Wazuh dashboard
^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ When a user goes to test a new rule in **Tools** / **Ruleset Test**, there were API messages that were not displayed. Now, this issue is fixed and the messages are displayed on the screen.
- `#4261 <https://github.com/wazuh/wazuh-kibana-app/pull/4261>`_ An authorization prompt is added in **MITRE** > **Intelligence**.
- `#4239 <https://github.com/wazuh/wazuh-kibana-app/pull/4239>`_ The reference from Manager is changed to the Wazuh server in the **Deploy new agent** guide.
- `#4267 <https://github.com/wazuh/wazuh-kibana-app/pull/4267>`_ The filtered tags are removed because they were not supported by the API endpoint.
- `#4254 <https://github.com/wazuh/wazuh-kibana-app/pull/4254>`_ The styles in visualizations are changed.


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ When a user goes to test a new rule in **Tools** / **Ruleset Test**, there were API messages that were not displayed. Now, this issue is fixed and the messages are displayed on the screen.
- `#4261 <https://github.com/wazuh/wazuh-kibana-app/pull/4261>`_ An authorization prompt is added in **MITRE** > **Intelligence**.
- `#4239 <https://github.com/wazuh/wazuh-kibana-app/pull/4239>`_ The reference from Manager is changed to the Wazuh server in the **Deploy new agent** guide. 
- `#4267 <https://github.com/wazuh/wazuh-kibana-app/pull/4267>`_ The filtered tags are removed because they were not supported by the API endpoint.
- `#4254 <https://github.com/wazuh/wazuh-kibana-app/pull/4254>`_ The styles in visualizations are changed.


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ When a user goes to test a new rule in **Tools** / **Ruleset Test**, there were API messages that were not displayed. Now, this issue is fixed and the messages are displayed on the screen.
- `#4261 <https://github.com/wazuh/wazuh-kibana-app/pull/4261>`_ An authorization prompt is added in **MITRE** > **Intelligence**.
- `#4239 <https://github.com/wazuh/wazuh-kibana-app/pull/4239>`_ The reference from Manager is changed to the Wazuh server in the **Deploy new agent** guide.
- `#4267 <https://github.com/wazuh/wazuh-kibana-app/pull/4267>`_ The filtered tags are removed because they were not supported by the API endpoint.
- `#4254 <https://github.com/wazuh/wazuh-kibana-app/pull/4254>`_ The styles in visualizations are changed.


Wazuh Splunk app
^^^^^^^^^^^^^^^^
- `#1292 <https://github.com/wazuh/wazuh-splunk/pull/1292>`_ The status Pending to the Agents sections is added.
- `#1276 <https://github.com/wazuh/wazuh-splunk/pull/1276>`_ A disabled state to the **Apply changes** button on the Agents group editor is added when no changes on the group are made.


Packages
^^^^^^^^

- `#1635 <https://github.com/wazuh/wazuh-packages/pull/1635>`_ Removed dependencies from the wazuh-indexer package.
- `#1663 <https://github.com/wazuh/wazuh-packages/pull/1663>`_ Improved how the password tool changes the API passwords. 


Other
^^^^^
- `#13811 <https://github.com/wazuh/wazuh/pull/13811>`_ The ``test_agent_PUT_endpoints.tavern.yaml`` API integration test failure in numbered branches is fixed.
- `#13790 <https://github.com/wazuh/wazuh/pull/13790>`_ The external `click` and `clickclick` Python dependencies are upgraded to 8.1.3 and 20.10.2 respectively.


Resolved issues
---------------

This release resolves known issues as the following: 


Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13662 <https://github.com/wazuh/wazuh/pull/13662>`_             The upgrade module response message has been fixed not to include null values.
`#13863 <https://github.com/wazuh/wazuh/pull/13863>`_             A string truncation warning log in wazuh-authd when enabling password authentication is fixed.
`#13587 <https://github.com/wazuh/wazuh/pull/13587>`_             A memory leak in wazuh-analysisd when overwriting a rule multiple times is fixed.
`#13907 <https://github.com/wazuh/wazuh/pull/13907>`_             The wazuh-agentd and client-auth are prevented from performing enrollment if the agent fails to validate the manager certificate.
`#13694 <https://github.com/wazuh/wazuh/pull/13694>`_             The manager compilation when enabling GeoIP support is fixed.
`#13883 <https://github.com/wazuh/wazuh/pull/13883>`_             A crash in wazuh-modulesd when getting stopped while downloading a Vulnerability Detector feed is fixed.
==============================================================    =============


Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13606 <https://github.com/wazuh/wazuh/pull/13606>`_             Agent auto-restart on shared configuration changes when running on containerized environments is fixed.
`#13880 <https://github.com/wazuh/wazuh/pull/13880>`_             An issue when attempting to run the DockerListener integration using Python 3.6 and having the Docker service stopped is fixed.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13867 <https://github.com/wazuh/wazuh/pull/13867>`_             The ``tag`` parameter of ``GET /manager/logs`` and ``GET /cluster/{node_id}/logs`` endpoints is updated to accept any string.
==============================================================    =============


Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13597 <https://github.com/wazuh/wazuh/pull/13597>`_             Fixed Eventchannel testing and improved reporting capabilities of the runtest tool.
`#13781 <https://github.com/wazuh/wazuh/pull/13781>`_             The Amazon Linux 2 SCA policy is modified to resolve a typo on control 1.1.22 and ``EMPTY_LINE`` conditions.
`#13950 <https://github.com/wazuh/wazuh/pull/13950>`_             The Amazon Linux 2 SCA policy is modified to resolve the rule and condition on control 1.5.2. 
==============================================================    =============


Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    Type error when changing screen size in agents section is fixed.
`#4235 <https://github.com/wazuh/wazuh-kibana-app/pull/4235>`_    A logged error that appeared when the ``statistics`` tasks tried to create an index with the same name, causing the second task to fail on the creation of the index because it already exists, is removed.
`#4237 <https://github.com/wazuh/wazuh-kibana-app/pull/4237>`_    A UI crash due to a query with syntax errors in ``Modules/Security events`` is fixed.
`#4240 <https://github.com/wazuh/wazuh-kibana-app/pull/4240>`_    An error when generating a module report after changing the selected agent is fixed.
`#4266 <https://github.com/wazuh/wazuh-kibana-app/pull/4266>`_    An unhandled error when a Wazuh API request failed in the dev tools is fixed.
`#4264 <https://github.com/wazuh/wazuh-kibana-app/pull/4264>`_    An error related to ``API not available`` when saving the manager configuration and restarting the manager from ``Management/Configuration/Edit configuration`` on manager mode is fixed.
`#4253 <https://github.com/wazuh/wazuh-kibana-app/pull/4253>`_    A UI problem that required scrolling to see the logs in Management/Logs and Settings/Logs is fixed.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    Type error when changing screen size in agents section is fixed.
`#4235 <https://github.com/wazuh/wazuh-kibana-app/pull/4235>`_    A logged error that appeared when the ``statistics`` tasks tried to create an index with the same name, causing the second task to fail on the creation of the index because it already exists, is removed.
`#4237 <https://github.com/wazuh/wazuh-kibana-app/pull/4237>`_    A UI crash due to a query with syntax errors in ``Modules/Security events`` is fixed.
`#4240 <https://github.com/wazuh/wazuh-kibana-app/pull/4240>`_    An error when generating a module report after changing the selected agent is fixed.
`#4266 <https://github.com/wazuh/wazuh-kibana-app/pull/4266>`_    An unhandled error when a Wazuh API request failed in the dev tools is fixed.
`#4264 <https://github.com/wazuh/wazuh-kibana-app/pull/4264>`_    An error related to ``API not available`` when saving the manager configuration and restarting the manager from ``Management/Configuration/Edit configuration`` on manager mode is fixed.
`#4253 <https://github.com/wazuh/wazuh-kibana-app/pull/4253>`_    A UI problem that required scrolling to see the logs in Management/Logs and Settings/Logs is fixed.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    Type error when changing screen size in agents section is fixed.
`#4235 <https://github.com/wazuh/wazuh-kibana-app/pull/4235>`_    A logged error that appeared when the ``statistics`` tasks tried to create an index with the same name, causing the second task to fail on the creation of the index because it already exists, is removed.
`#4237 <https://github.com/wazuh/wazuh-kibana-app/pull/4237>`_    A UI crash due to a query with syntax errors in ``Modules/Security events`` is fixed.
`#4240 <https://github.com/wazuh/wazuh-kibana-app/pull/4240>`_    An error when generating a module report after changing the selected agent is fixed.
`#4266 <https://github.com/wazuh/wazuh-kibana-app/pull/4266>`_    An unhandled error when a Wazuh API request failed in the dev tools is fixed.
`#4264 <https://github.com/wazuh/wazuh-kibana-app/pull/4264>`_    An error related to ``API not available`` when saving the manager configuration and restarting the manager from ``Management/Configuration/Edit configuration`` on manager mode is fixed.
`#4253 <https://github.com/wazuh/wazuh-kibana-app/pull/4253>`_    A UI problem that required scrolling to see the logs in Management/Logs and Settings/Logs is fixed.
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
`#1673 <https://github.com/wazuh/wazuh-packages/pull/1673>`_      The error with the installation of the file init.d to enable Wazuh service in RHEL 9 systems is fixed.
`#1675 <https://github.com/wazuh/wazuh-packages/pull/1675>`_      The error with the installation of the file sysv-init to enable Wazuh service in RHEL 9 systems is fixed. 
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
