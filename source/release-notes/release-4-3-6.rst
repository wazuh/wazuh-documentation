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
- `#13915 <https://github.com/wazuh/wazuh/pull/13915>`_ The Vulnerability Detector log is improved for the case when the agent OS data is unavailable.

Wazuh agent
^^^^^^^^^^^
- `#13749 <https://github.com/wazuh/wazuh/pull/13749>`_ Package data support is extended in `Syscollector` for modern RPM agents.


Ruleset
^^^^^^^
- `#13567 <https://github.com/wazuh/wazuh/pull/13567>`_ Deprecated MITRE tags in rules are removed.


Wazuh dashboard
^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ When a user goes to test a new rule in **Tools** / **Ruleset Test**, there were API messages that were not displayed. Now, this issue is fixed and the messages are displayed on the screen.


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ When a user goes to test a new rule in **Tools** / **Ruleset Test**, there were API messages that were not displayed. Now, this issue is fixed and the messages are displayed on the screen.


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- `#4244 <https://github.com/wazuh/wazuh-kibana-app/pull/4244>`_ When a user goes to test a new rule in **Tools** / **Ruleset Test**, there were API messages that were not displayed. Now, this issue is fixed and the messages are displayed on the screen.


Wazuh Splunk app
^^^^^^^^^^^^^^^^
- `#1292 <https://github.com/wazuh/wazuh-splunk/pull/1292>`_ The status Pending to the Agents sections is added.


Packages
^^^^^^^^

- `#1635 <https://github.com/wazuh/wazuh-packages/pull/1635>`_ Removed dependencies from the wazuh-indexer package.


Other
^^^^^
- `#13811 <https://github.com/wazuh/wazuh/pull/13811>`_ The ``test_agent_PUT_endpoints.tavern.yaml`` API integration test failure in numbered branches is fixed.


Resolved issues
---------------

This release resolves known issues as the following: 


Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13662 <https://github.com/wazuh/wazuh/pull/13662>`_             The upgrade module response message has been fixed not to include null values.
==============================================================    =============


Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#13606 <https://github.com/wazuh/wazuh/pull/13606>`_             Agent auto-restart on shared configuration changes when running on containerized environments is fixed.
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
==============================================================    =============


Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    Type error when changing screen size in agents section is fixed.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    Type error when changing screen size in agents section is fixed.
==============================================================    =============


Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4233 <https://github.com/wazuh/wazuh-kibana-app/pull/4233>`_    Type error when changing screen size in agents section is fixed.
==============================================================    =============


Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1290 <https://github.com/wazuh/wazuh-splunk/pull/1290>`_        Outdated documentation links have been updated.
==============================================================    =============

Packages
^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1673 <https://github.com/wazuh/wazuh-packages/pull/1673>`_      The error with the installation of the file init.d to enable Wazuh service in RHEL 9 systems is fixed.
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
