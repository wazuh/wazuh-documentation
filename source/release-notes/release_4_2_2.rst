.. meta::
      :description: Wazuh 4.2.2 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_2:

4.2.2 Release notes
===================

This section lists the changes in version 4.2.2. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

- `#9779 <https://github.com/wazuh/wazuh/pull/9779>`_ Authd now correctly refuses enrollment attempts if the agent already holds a valid key.


- `#9927 <https://github.com/wazuh/wazuh/pull/9927>`_ The Google Cloud Pub/Sub integration module rework increases the number of processed events per second allowing multithreading. Also, a new ``num_threads`` option is added to module configuration.

- `#3175 <https://github.com/wazuh/wazuh-kibana-app/pull/3175>`_ To improve user experience of the Wazuh Kibana API, the **Index pattern** selector and **API** selector are moved to the header bar.
- `#3503 <https://github.com/wazuh/wazuh-kibana-app/pull/3503>`_ Wazuh introduces a new functionality to change and customize app logos.


- `#1107 <https://github.com/wazuh/wazuh-splunk/pull/1107>`_ Added quick settings to improve the view and selection of API, index, and source type

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
- `#3349 <https://github.com/wazuh/wazuh-kibana-app/pull/3349>`_ Changed the way kibana-vis hides the visualization while loading. This improvement prevents errors caused by having a 0 height visualization.


Wazuh Splunk app
^^^^^^^^^^^^^^^^

- `#1083 <https://github.com/wazuh/wazuh-splunk/pull/1083>`_ Added MITRE ATT&CK framework integration.
- `#1076 <https://github.com/wazuh/wazuh-splunk/pull/1076>`_ Added MITRE ATT&CK dashboard integration.
- `#1109 <https://github.com/wazuh/wazuh-splunk/pull/1109>`_ Added CVE Dashboard
- `#1104 <https://github.com/wazuh/wazuh-splunk/pull/1104>`_ Added new source type selector to customize queries used by dashboards
- `#1107 <https://github.com/wazuh/wazuh-splunk/pull/1107>`_ Added quick settings to improve the view and selection of API, index, and source type
- `#1118 <https://github.com/wazuh/wazuh-splunk/pull/1118>`_ Upgrades jQuery version from 2.1.0 to 3.5.0
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
`#3217 <https://github.com/wazuh/wazuh-kibana-app/pull/3217>`_    In the agent summary of the **Agents** data overview page, fields no longer overlap under certain circumstances and are correctly displayed.
`#3257 <https://github.com/wazuh/wazuh-kibana-app/pull/3257>`_    An issue when using the **Ruleset Test** is now fixed. Now, all requests are made in the session unless you click **Clear session**.
`#3237 <https://github.com/wazuh/wazuh-kibana-app/pull/3237>`_    **Visualize** button issue is resolved and the button is displayed when expanding a field in the **Events** tab sidebar.
`#3244 <https://github.com/wazuh/wazuh-kibana-app/pull/3244>`_    Some modules were missing from the Agents data overview page. This issue is fixed and they are now successfully displayed.
`#3260 <https://github.com/wazuh/wazuh-kibana-app/pull/3260>`_    With this fix, *App log messages* are improved and WUI error logs removed.
`#3272 <https://github.com/wazuh/wazuh-kibana-app/pull/3272>`_    Some errors on PDF reports are fixed.
`#3289 <https://github.com/wazuh/wazuh-kibana-app/pull/3289>`_    When deploying a new agent, selecting macOS as the operating system in a Safari browser no longer generates a TypeError.
`#3297 <https://github.com/wazuh/wazuh-kibana-app/pull/3297>`_    An issue in the Security configuration assessment module is fixed. SCA checks are displayed correctly.
`#3241 <https://github.com/wazuh/wazuh-kibana-app/pull/3241>`_    An issue with an error message when adding sample data fails is fixed.
`#3303 <https://github.com/wazuh/wazuh-kibana-app/pull/3303>`_    An error in reports is fixed and now the **Alerts Summary** of modules is generated completely.
`#3315 <https://github.com/wazuh/wazuh-kibana-app/pull/3315>`_    Fixed dark mode visualization background in PDF reports.
`#3309 <https://github.com/wazuh/wazuh-kibana-app/pull/3309>`_    Kibana integrations are now adapted to Kibana 7.11 and 7.12. 
`#3306 <https://github.com/wazuh/wazuh-kibana-app/pull/3306>`_    An issue is fixed in the **Agents** overview window and is now rendered correctly.
`#3326 <https://github.com/wazuh/wazuh-kibana-app/pull/3326>`_    Fixed an issue with miscalculation of table width in PDF reports. With this fix, tables are displayed correctly.
`#3323 <https://github.com/wazuh/wazuh-kibana-app/pull/3323>`_    ``visData`` table property is normalized for 7.12 backward compatibility and **Alerts Summary** table is shown in PDF reports.
`#3358 <https://github.com/wazuh/wazuh-kibana-app/pull/3358>`_    Export-to-CSV buttons in dashboard tables are now fixed.
`#3345 <https://github.com/wazuh/wazuh-kibana-app/pull/3345>`_    Fixed Elastic UI breaking changes errors in 7.12.
`#3347 <https://github.com/wazuh/wazuh-kibana-app/pull/3347>`_    Wazuh main menu and breadcrumb render issues are now fixed.
`#3397 <https://github.com/wazuh/wazuh-kibana-app/pull/3397>`_    This fix prevents some errors from causing a massive increase in logs size.
`#3593 <https://github.com/wazuh/wazuh-kibana-app/pull/3593>`_    Fixed an issue in the Vulnerabilities pane that did not show alerts if the vulnerability had a field missing.
`#3240 <https://github.com/wazuh/wazuh-kibana-app/pull/3240>`_    This fix correctly hides the navbar Wazuh label.
`#3355 <https://github.com/wazuh/wazuh-kibana-app/pull/3355>`_    Labels of some visualizations no longer overlap, improving readability. 
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