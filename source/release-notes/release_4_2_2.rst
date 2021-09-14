.. meta::
      :description: Wazuh 4.2.2 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_2:

4.2.2 Release notes
===================

This section lists the changes in version 4.2.2. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

- `#9927 <https://github.com/wazuh/wazuh/pull/9927>`_ The Google Cloud Pub/Sub integration module rework increases the number of processed events per second allowing multithreading. Also, a new ``num_threads`` option is added to module configuration.


- `#3175 <https://github.com/wazuh/wazuh-kibana-app/pull/3175>`_
- `#3503 <https://github.com/wazuh/wazuh-kibana-app/pull/3503>`_
- `#3222 <https://github.com/wazuh/wazuh-kibana-app/pull/3222>`_

+ Splunk

What's new
----------

This release includes new features or enhancements. 

Manager
^^^^^^^

- `#9133 <https://github.com/wazuh/wazuh/pull/9133>`_ The agent's inventory data on the manager is correctly cleaned up when Syscollector is disabled.
- `#9779 <https://github.com/wazuh/wazuh/pull/9779>`_ Authd now refuses enrollment attempts if the agent already holds a valid key.

Agent
^^^^^

- `#9907 <https://github.com/wazuh/wazuh/pull/9907>`_ Syscollector scan performance is optimized.
- `#9927 <https://github.com/wazuh/wazuh/pull/9927>`_ The Google Cloud Pub/Sub integration module rework increases the number of processed events per second allowing multithreading. Also, a new ``num_threads`` option is added to module configuration.
- `#9964 <https://github.com/wazuh/wazuh/pull/9964>`_ google-cloud-pubsub dependency is now upgraded to the latest stable version (2.7.1).
- `#9943 <https://github.com/wazuh/wazuh/pull/9443>`_ The WPK installer rollback is reimplemented on Linux.

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

- `#3170 <https://github.com/wazuh/wazuh-kibana-app/pull/3170>`_ **Wazuh support** links are added to the Kibana help menu. You now get quick access to the Wazuh **Documentation**, **Slack channel**, **Projects on GitHub**, and **Google Group**.
- `#3184 <https://github.com/wazuh/wazuh-kibana-app/pull/3184>`_ You now can access group details directly by using the ``group`` query parameter in the URL. 
- `#3222 <https://github.com/wazuh/wazuh-kibana-app/pull/3222>`_ `#3292 <https://github.com/wazuh/wazuh-kibana-app/pull/3292>`_ A new configuration is added to disable Wazuh App access from X-Pack/ODFE role.
- `#3221 <https://github.com/wazuh/wazuh-kibana-app/pull/3221>`_ New confirmation message is now added when closing a form.
- `#3240 <https://github.com/wazuh/wazuh-kibana-app/pull/3240>`_ A new improvement is implemented to hide navbar Wazuh label.
- `#3274 <https://github.com/wazuh/wazuh-kibana-app/pull/3274>`_ New modeal message is now added when creating new rule/decoder.
- `#3503 <https://github.com/wazuh/wazuh-kibana-app/pull/3503>`_ Wazuh introduces a new functionality to change and customize app logos.
- `#3592 <https://github.com/wazuh/wazuh-kibana-app/pull/3592>`_ The link to the Wazuh documentation Upgrade guide is now included in the message shown when the Wazuh API version and the Wazuh App version mismatch.

- `#3160 <https://github.com/wazuh/wazuh-kibana-app/pull/3160>`_ To improve user experience, module titles are now removed from the dashboards.
- `#3174 <https://github.com/wazuh/wazuh-kibana-app/pull/3174>`_ The default ``wazuh.monitoring.creation`` app setting is changed from ``d`` to ``w``.
- `#3174 <https://github.com/wazuh/wazuh-kibana-app/pull/3174>`_ The default ``wazuh.monitoring.shards`` app setting is changed from ``2`` to ``1``.
- `#3189 <https://github.com/wazuh/wazuh-kibana-app/pull/3189>`_ SHA1 field is removed from **Windows Registry** details pane. 
- `#3250 <https://github.com/wazuh/wazuh-kibana-app/pull/3250>`_ Removed tooltip in header breadcrumb.
- `#3197 <https://github.com/wazuh/wazuh-kibana-app/pull/3197>`_ Refactored the Health check component.
- `#3210 <https://github.com/wazuh/wazuh-kibana-app/issues/3210>`_ Added version in package downloaded name in agent deploy command.
- `#3243 <https://github.com/wazuh/wazuh-kibana-app/pull/3243>`_ Removed restriction to allow only current active agents from vulnerability inventory.
- `#3175 <https://github.com/wazuh/wazuh-kibana-app/pull/3175>`_ Move API selector and Index Pattern Selector to the header bar.
- `#3258 <https://github.com/wazuh/wazuh-kibana-app/pull/3258>`_ Health check actions notifications refactored and added debug mode.
- `#3355 <https://github.com/wazuh/wazuh-kibana-app/pull/3355>`_ Improved visualizations object configuration readability.
- `#3349 <https://github.com/wazuh/wazuh-kibana-app/pull/3349>`_ Changed the way kibana-vis hides the visualization while loading, this should prevent errors caused by having a 0 height visualization.


Wazuh Splunk app
^^^^^^^^^^^^^^^^

- `#1083 <https://github.com/wazuh/wazuh-splunk/pull/1083>`_ Added MITRE ATT&CK Framework integration.
- `#1076 <https://github.com/wazuh/wazuh-splunk/pull/1076>`_ Added MITRE ATT&CK Dashboard integration.
- Support for Splunk v8.1.4

Resolved issues
---------------

This release resolves known issues. 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9647 <https://github.com/wazuh/wazuh/pull/9647>`_               Fixed a false positive in Vulnerability Detector when packages have multiple conditions in the OVAL feed.
`#9042 <https://github.com/wazuh/wazuh/pull/9042>`_               Prevented pending agents from keeping their state indefinitely in the manager. 
`#9088 <https://github.com/wazuh/wazuh/pull/9088>`_               Fixed Remoted to avoid agents in connected state with no group assignation.
`#9278 <https://github.com/wazuh/wazuh/pull/9278>`_               Fixed a bug in Analysisd that ignored the value of the rule option ``noalert``.
`#9378 <https://github.com/wazuh/wazuh/pull/9378>`_               Fixed Authd's startup to set up the PID file before loading keys.
`#9295 <https://github.com/wazuh/wazuh/pull/9295>`_               Fixed a bug in Authd that delayed the agent timestamp update when removing agents. 
`#9705 <https://github.com/wazuh/wazuh/pull/9705>`_               Fixed a bug in Wazuh DB that held wrong agent timestamp data.
`#9942 <https://github.com/wazuh/wazuh/pull/9942>`_               Fixed a bug in Remoted that kept deleted shared files in the multi-groups' merged.mg file. 
`#9987 <https://github.com/wazuh/wazuh/pull/9987>`_               Fixed a bug in Analysisd that overwrote its queue socket when launched in test mode. 
`#9775 <https://github.com/wazuh/wazuh/pull/9775>`_               Fixed AWS WAF log parsing when there are multiple dicts in one line. 
==============================================================    =============


Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9710 <https://github.com/wazuh/wazuh/pull/9710>`_               Prevented the manager from hashing the shared configuration too often.
`#9310 <https://github.com/wazuh/wazuh/pull/9310>`_               Fixed a memory leak in Logcollector when re-subscribing to Windows Eventchannel.
`#9967 <https://github.com/wazuh/wazuh/pull/9967>`_               Fixed Remoted to avoid agents in connected state with no group assignation.
`#9934 <https://github.com/wazuh/wazuh/pull/9934>`_               Removed CloudWatchLogs log stream limit when there are more than 50 log streams.
`#9897 <https://github.com/wazuh/wazuh/pull/9897>`_               Fixed Authd's startup to set up the PID file before loading keys.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9984 <https://github.com/wazuh/wazuh/pull/9984>`_               Fixed a bug with distributed API calls when the cluster is disabled. 
==============================================================    =============

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#3159 <https://github.com/wazuh/wazuh-kibana-app/pull/3159>`_    Fixed screen flickers in Cluster visualization.
`#3161 <https://github.com/wazuh/wazuh-kibana-app/pull/3161>`_    Fixed the broken links when using ``server.basePath`` Kibana setting.
`#3173 <https://github.com/wazuh/wazuh-kibana-app/pull/3173>`_    Fixed filter in reports.
`#3234 <https://github.com/wazuh/wazuh-kibana-app/pull/3234>`_    Fixed typo error in Settings/Configuration.
`#3217 <https://github.com/wazuh/wazuh-kibana-app/pull/3217>`_    Fixed fields overlap in the agent summary screen.
`#3257 <https://github.com/wazuh/wazuh-kibana-app/pull/3257>`_    Fixed Ruleset Test, each request is made in a different session instead of all in the same session.
`#3237 <https://github.com/wazuh/wazuh-kibana-app/pull/3237>`_    Fixed the ``Visualize`` button is not displaying when expanding a field in the Events sidebar.
`#3244 <https://github.com/wazuh/wazuh-kibana-app/pull/3244>`_    Fix modules are missing in the agent menu.
`#3260 <https://github.com/wazuh/wazuh-kibana-app/pull/3260>`_    Fix improving and removing WUI error logs.
`#3272 <https://github.com/wazuh/wazuh-kibana-app/pull/3272>`_    Fix some errors of PDF reports.
`#3289 <https://github.com/wazuh/wazuh-kibana-app/pull/3289>`_    Fix TypeError when selecting macOS agent deployment in a Safari Browser.
`#3297 <https://github.com/wazuh/wazuh-kibana-app/pull/3297>`_    Fix error in how the SCA check's checks are displayed.
`#3241 <https://github.com/wazuh/wazuh-kibana-app/pull/3241>`_    Fixed message of error when add sample data fails.
`#3244 <https://github.com/wazuh/wazuh-kibana-app/pull/3244>`_    Fixed modules are missing in the agent menu.
`#3303 <https://github.com/wazuh/wazuh-kibana-app/pull/3303>`_    Fixed Alerts Summary of modules for reports.
`#3315 <https://github.com/wazuh/wazuh-kibana-app/pull/3315>`_    Fixed dark mode visualization background in pdf reports.
`#3309 <https://github.com/wazuh/wazuh-kibana-app/pull/3309>`_    Adapt Kibana integrations to Kibana 7.11 and 7.12. 
`#3306 <https://github.com/wazuh/wazuh-kibana-app/pull/3306>`_    Fixed error agent view does not render correctly.
`#3326 <https://github.com/wazuh/wazuh-kibana-app/pull/3326>`_    Fixed miscalculation in table column width in PDF reports.
`#3323 <https://github.com/wazuh/wazuh-kibana-app/pull/3323>`_    Normalized visData table property for 7.12 retro-compatibility.
`#3355 <https://github.com/wazuh/wazuh-kibana-app/pull/3355>`_    Fixed error that caused the labels in certain visualizations to overlap.
`#3358 <https://github.com/wazuh/wazuh-kibana-app/pull/3358>`_    Fixed export to csv button in dashboards tables.
`#3345 <https://github.com/wazuh/wazuh-kibana-app/pull/3345>`_    Fixed Elastic UI breaking changes in 7.12.
`#3347 <https://github.com/wazuh/wazuh-kibana-app/pull/3347>`_    Fixed Wazuh main menu and breadcrumb render issues.
`#3397 <https://github.com/wazuh/wazuh-kibana-app/pull/3397>`_    Fixed generation of huge logs from backend errors.
`#3593 <https://github.com/wazuh/wazuh-kibana-app/pull/3593>`_    Fixed vulnerabilities flyout not showing alerts if the vulnerability had a field missing.
==============================================================    =============

Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1070 <https://github.com/wazuh/wazuh-splunk/pull/1070>`_        Cannot pin search filters on Edge - Chip style collapses.
`#1074 <https://github.com/wazuh/wazuh-splunk/pull/1074>`_        Tables without server side pagination.
`#1077 <https://github.com/wazuh/wazuh-splunk/pull/1077>`_        Fixed gear icon in fim table.
`#1078 <https://github.com/wazuh/wazuh-splunk/pull/1078>`_        Added cache control.
`#1084 <https://github.com/wazuh/wazuh-splunk/pull/1084>`_        Fixed error where tables unset their loading state before finishing API calls.
`#1083 <https://github.com/wazuh/wazuh-splunk/pull/1083>`_        Fixed search bar queries with spaces.
`#1083 <https://github.com/wazuh/wazuh-splunk/pull/1083>`_        Fixed pinned fields ending with curly brackets.
`#1099 <https://github.com/wazuh/wazuh-splunk/pull/1099>`_        Fixed issues for Splunk Cloud compatibility.
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https:xxxx>`_
- `wazuh/wazuh-kibana-app <https://xxxx>`_
- `wazuh/wazuh-splunk <https://xxxx>`_