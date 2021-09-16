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
- `#9779 <https://github.com/wazuh/wazuh/pull/9779>`_ Authd now correctly refuses enrollment attempts if the agent already holds a valid key.

Agent
^^^^^

- `#9907 <https://github.com/wazuh/wazuh/pull/9907>`_ Syscollector scan performance is optimized.
- `#9927 <https://github.com/wazuh/wazuh/pull/9927>`_ The Google Cloud Pub/Sub integration module rework increases the number of processed events per second allowing multithreading and enhancing performance. Also, a new ``num_threads`` option is added to module configuration.
- `#9964 <https://github.com/wazuh/wazuh/pull/9964>`_ google-cloud-pubsub dependency is now upgraded to the latest stable version (2.7.1).
- `#9943 <https://github.com/wazuh/wazuh/pull/9443>`_ The WPK installer rollback is reimplemented on Linux.

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

- `#3170 <https://github.com/wazuh/wazuh-kibana-app/pull/3170>`_ **Wazuh support** links are added to the Kibana help menu. You now get quick access to the Wazuh **Documentation**, **Slack channel**, **Projects on GitHub**, and **Google Group**.
- `#3184 <https://github.com/wazuh/wazuh-kibana-app/pull/3184>`_ You now can access group details directly by using the ``group`` query parameter in the URL. 
- `#3222 <https://github.com/wazuh/wazuh-kibana-app/pull/3222>`_ `#3292 <https://github.com/wazuh/wazuh-kibana-app/pull/3292>`_ A new configuration is added to disable Wazuh App access from X-Pack/ODFE role.
- `#3221 <https://github.com/wazuh/wazuh-kibana-app/pull/3221>`_ New confirmation message is now displayed when closing a form.
- `#3274 <https://github.com/wazuh/wazuh-kibana-app/pull/3274>`_ New modal message is now added when creating a new rule/decoder.
- `#3503 <https://github.com/wazuh/wazuh-kibana-app/pull/3503>`_ Wazuh introduces a new functionality to change and customize app logos.
- `#3592 <https://github.com/wazuh/wazuh-kibana-app/pull/3592>`_ The link to the Wazuh documentation Upgrade guide is now included in the message shown when the Wazuh API version and the Wazuh App version mismatch.
- `#3160 <https://github.com/wazuh/wazuh-kibana-app/pull/3160>`_ To improve user experience, module titles are now removed from the dashboards.
- `#3174 <https://github.com/wazuh/wazuh-kibana-app/pull/3174>`_ The default ``wazuh.monitoring.creation`` app setting is changed from ``d`` to ``w``.
- `#3174 <https://github.com/wazuh/wazuh-kibana-app/pull/3174>`_ The default ``wazuh.monitoring.shards`` app setting is changed from ``2`` to ``1``.
- `#3189 <https://github.com/wazuh/wazuh-kibana-app/pull/3189>`_ SHA1 field is removed from the **Windows Registry** details pane. 
- `#3250 <https://github.com/wazuh/wazuh-kibana-app/pull/3250>`_ Removed tooltip from header breadcrumb to improve readability.
- `#3197 <https://github.com/wazuh/wazuh-kibana-app/pull/3197>`_ Refactoring of the Health check component improves user experience.
- `#3210 <https://github.com/wazuh/wazuh-kibana-app/issues/3210>`_ When deploying a new agent, the **Install and enroll the agent** command now specifies the version in the package downloaded name.
- `#3243 <https://github.com/wazuh/wazuh-kibana-app/pull/3243>`_ In the vulnerabilities **Inventory**, the restriction that only allowed current active agents’ information to be shown is removed. Now, it displays the vulnerabilities table regardless of whether the agent is connected or not. 
- `#3175 <https://github.com/wazuh/wazuh-kibana-app/pull/3175>`_ To improve user experience of the Wazuh Kibana API, the **Index pattern** selector and **API** selector are moved to the header bar.
- `#3258 <https://github.com/wazuh/wazuh-kibana-app/pull/3258>`_ Health check actions' notifications are refactored and the process can now be run in debug mode.
- `#3355 <https://github.com/wazuh/wazuh-kibana-app/pull/3355>`_ Visualizations and object configuration are refactored, improving readability.
- `#3349 <https://github.com/wazuh/wazuh-kibana-app/pull/3349>`_ Changed the way kibana-vis hides the visualization while loading. This improvement prevents errors caused by having a 0 height visualization.


Wazuh Splunk app
^^^^^^^^^^^^^^^^

- `#1083 <https://github.com/wazuh/wazuh-splunk/pull/1083>`_ Added MITRE ATT&CK framework integration.
- `#1076 <https://github.com/wazuh/wazuh-splunk/pull/1076>`_ Added MITRE ATT&CK dashboard integration.
- `#1109 <https://github.com/wazuh/wazuh-splunk/pull/1109>`_ Added CVE Dashboard
- `#1104 <https://github.com/wazuh/wazuh-splunk/pull/1104>`_ Added new source type selector to customize queries used by dashboards
- `#1107 <https://github.com/wazuh/wazuh-splunk/pull/1107>`_ Added quick settings to improve the view and selection of API, index, and source type
- Support for Splunk 8.1.4. 
- Support for Splunk 8.2.2

Resolved issues
---------------

This release resolves known issues. 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9647 <https://github.com/wazuh/wazuh/pull/9647>`_               A false positive in Vulnerability Detector is no longer generated when packages have multiple conditions in the OVAL feed.
`#9042 <https://github.com/wazuh/wazuh/pull/9042>`_               This fix prevents pending agents from keeping their state indefinitely in the manager. 
`#9088 <https://github.com/wazuh/wazuh/pull/9088>`_               An issue in Remoted is fixed. Now, it checks the group an agent belongs to when it receives the keep-alive message and avoids agents in *connected* state with no group assignation.
`#9278 <https://github.com/wazuh/wazuh/pull/9278>`_               An issue in Analysisd that caused the value of the rule option ``noalert`` to be ignored is now fixed.
`#9378 <https://github.com/wazuh/wazuh/pull/9378>`_               Fixed Authd's startup to set up the PID file before loading keys.
`#9295 <https://github.com/wazuh/wazuh/pull/9295>`_               An issue in Authd that delayed the agent timestamp update when removing agents is now fixed. 
`#9705 <https://github.com/wazuh/wazuh/pull/9705>`_               An error in Wazuh DB that held wrong agent timestamp data is now resolved.
`#9942 <https://github.com/wazuh/wazuh/pull/9942>`_               An issue in Remoted that kept deleted shared files in the multi-groups' merged.mg file is now fixed. 
`#9987 <https://github.com/wazuh/wazuh/pull/9987>`_               An issue in Analysisd that overwrote its queue socket when launched in test mode  is now resolved. 
`#9775 <https://github.com/wazuh/wazuh/pull/9775>`_               AWS WAF log parsing error is fixed and log parsing now works correctly when there are multiple dictionaries in one line. 
==============================================================    =============


Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9710 <https://github.com/wazuh/wazuh/pull/9710>`_               This fix prevents the manager from hashing the shared configuration too often.
`#9310 <https://github.com/wazuh/wazuh/pull/9310>`_               Memory leak is fixed in Logcollector when re-subscribing to Windows EventChannel.
`#9967 <https://github.com/wazuh/wazuh/pull/9967>`_               Memory leak is fixed in the agent when enrolling for the first time with no previous key. 
`#9934 <https://github.com/wazuh/wazuh/pull/9934>`_               CloudWatchLogs log stream limit, when there are more than 50 log streams, is now removed.
`#9897 <https://github.com/wazuh/wazuh/pull/9897>`_               Fixed a problem on the Windows installer and now, with this fix, the agent can be successfully uninstalled or upgraded.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9984 <https://github.com/wazuh/wazuh/pull/9984>`_               An issue with distributed API calls when the cluster is disabled is now fixed. 
==============================================================    =============

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#3159 <https://github.com/wazuh/wazuh-kibana-app/pull/3159>`_    Cluster visualization screen flickering is fixed.
`#3161 <https://github.com/wazuh/wazuh-kibana-app/pull/3161>`_    Links now work correctly when using ``server.basePath`` Kibana setting.
`#3173 <https://github.com/wazuh/wazuh-kibana-app/pull/3173>`_    In the Vulnerabilities module, a filter error is resolved and PDF reports are generated with complete *Summary* information.
`#3234 <https://github.com/wazuh/wazuh-kibana-app/pull/3234>`_    Fixed typo error in the **Configuration** tab of the **Settings** page.
`#3217 <https://github.com/wazuh/wazuh-kibana-app/pull/3217>`_    In the agent summary of the Agents data overview page, fields no longer overlapped under certaing circumstances and are correctly displayed.
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
`#3240 <https://github.com/wazuh/wazuh-kibana-app/pull/3240>`_    A new improvement is implemented to hide the navbar Wazuh label.

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
`#1103 <https://github.com/wazuh/wazuh-splunk/pull/1103>`_        Fixed missing node name for agent overview
`#1103 <https://github.com/wazuh/wazuh-splunk/pull/1103>`_        Fixed missing columns for some tables in reports
`#1112 <https://github.com/wazuh/wazuh-splunk/pull/1112>`_        Fixed expand row feature in Agent File Integrity Monitoring
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https:xxxx>`_
- `wazuh/wazuh-kibana-app <https://xxxx>`_
- `wazuh/wazuh-splunk <https://xxxx>`_