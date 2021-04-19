.. Copyright (C) 2021 Wazuh, Inc.

.. _release_4_2_0:

4.2.0 Release notes
===================

This section lists the changes in version 4.2.0. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.2-7.10.2/CHANGELOG.md>`_

Highlights
----------

**Wazuh Kibana plugin**

- `#1434 <https://github.com/wazuh/wazuh-kibana-app/issues/1434>`_ New Ruleset Test tool:

Wazuh improves user experience by adding a new Ruleset Test feature under the Tools section of the Wazuh plugin menú. This feature is also included as a tool in the action bar of both the Edit Rules and Edit Decoders sections, allowing you to keep the Ruleset Test window open while you navigate through the page to edit or create a ruleset file.

The new Ruleset Test tool also integrates an input box for reading sample logs and an output box that allows you to visualize the test results. With this enhancement, you can now test sample logs directly on the Wazuh user interface and see how the ruleset reacts to specific log messages.

- `#1434 <https://github.com/wazuh/wazuh-kibana-app/issues/1434>`_ Tools menu improvements:

To improve user experience and access to Wazuh tools. The Dev Tools feature is renamed as API Console and it is now found, together with the new Ruleset Test feature, inside the new Tool section under the Wazuh plugin menu.

- `#3056 <https://github.com/wazuh/wazuh-kibana-app/pull/3056>`_ New Agent Stats section:

Wazuh adds a new Stats section that improves the visibility you have over agents’ statistics. You can access this feature by clicking Stats in the action ribbon on the Agent data overview page. This improvement allows you to visualize information fetched by the new API endpoint ``/agents/{agent_id}/stats/logcollector`` in the Wazuh user interface.

- `#3069 <https://github.com/wazuh/wazuh-kibana-app/pull/3069>`_ Agent’s new vulnerability inventory:

Wazuh now provides you with enhanced insight into the CVE that are affecting an agent. The newly added Inventory tab in the Vulnerabilities module allows you to visualize information, such as package name, package version, package architecture, and the CVE ID that affects the package, and more. You can also access the vulnerability data flyout to expand on the specifics of each vulnerability entry detailed in the Inventory.   

Wazuh core
----------

What's new
^^^^^^^^^^
This release includes new features or enhancements. 

**Core**

- `#3368 <https://github.com/wazuh/wazuh/issues/3368>`_ Wazuh has now added support for bookmarks in ``logcollector``. This allows you to follow the log file from the last read line where the agent stopped. 
- `#5652 <https://github.com/wazuh/wazuh/issues/5652>`_ Wazuh collects multi-line logs with a variable number of lines in ``logcollector``. This improved support is especially useful when dealing with logs such as Java Stack Trace, since the number of lines in the log no longer needs to be held constant for every event type.
- `#6830 <https://github.com/wazuh/wazuh/pull/6830>`_ A new option is added that lets you limit the maximum number of files read per second for File Integrity Monitoring (FIM) scan. Now, you now have more FIM control by allowing you to set the limit of the amount of data analyzed during a scheduled scan.
- `#7109 <https://github.com/wazuh/wazuh/pull/7109>`_ Wazuh adds statistics file to logcollector. In addition to the alternative of accessing metrics via API queries, you now have the option to access this information from a file stored in an agent, according to a configurable time. This data is generated and updated every ``logcollector.state_interval`` and can be accessed at any moment. 
- `#7239 <https://github.com/wazuh/wazuh/pull/7239>`_ Wazuh provides enhanced state information by adding statistical data queries to the agent.
- `#7307 <https://github.com/wazuh/wazuh/pull/7307>`_ Quoting in commands to group arguments in the command wodle and SCA checks are allowed. Before this enhancement, the system parsed quoted substrings into the same argument but double-quotes were kept. Now, scapes and double-quotes are allowed in command lines so that you can handle arguments in command calls. 
- `#7408 <https://github.com/wazuh/wazuh/pull/7408>`_ Agent's IP detection improvement: agents running on Solaris now send their IP to the manager. 
- `#7444 <https://github.com/wazuh/wazuh/pull/7444>`_ New ``ip_update_interval`` option is added to set how often the agent refreshes its IP address.
- `#7661 <https://github.com/wazuh/wazuh/issues/7661>`_ New support is added for testing location information in Wazuh logtest. 
- `#7731 <https://github.com/wazuh/wazuh/issues/7731>`_ Vulnerability detection improvement: new vulnerability detector reports are added to the Wazuh DB so you can know which CVE affect an agent.
- `#6912 <https://github.com/wazuh/wazuh/pull/6912>`_ Wazuh daemons are now renamed to follow the Wazuh unified standard. 
- `#6903 <https://github.com/wazuh/wazuh/pull/6903>`_ Wazuh CLIs and related tools are now renamed to follow Wazuh unified standard.
- `#6920 <https://github.com/wazuh/wazuh/pull/6920>`_ Wazuh internal directories are now renamed to follow Wazuh unified standard. 
- `#6759 <https://github.com/wazuh/wazuh/pull/6759>`_ FIM improvement prevents a condition that might lead to memory error. 
- `#6828 <https://github.com/wazuh/wazuh/pull/6828>`_ FIM now switches from audit in immutable mode to real-time mode for directories where who-data is not available. 
- `#7317 <https://github.com/wazuh/wazuh/pull/7317>`_ Active Response protocol changed to receive messages in JSON format that now include the full alert.
- `#7264 <https://github.com/wazuh/wazuh/pull/7264>`_ References in logs are now changed to include Wazuh product name. 
- `#7541 <https://github.com/wazuh/wazuh/pull/7541>`_ Remoted now supports both TCP and UDP protocols simultaneously.
- `#7595 <https://github.com/wazuh/wazuh/pull/7595>`_ Unit tests for the ``os_net`` library are now improved in functionality and purpose consistency.
- `#6999 <https://github.com/wazuh/wazuh/pull/6999>`_ FIM now removes the audit rules when their corresponding symbolic links change their target.
- `#7797 <https://github.com/wazuh/wazuh/pull/7797>`_ Compilation from sources now downloads the prebuilt external dependencies. This improvement helps to consume fewer resources and eliminates overhead. 
- `#7807 <https://github.com/wazuh/wazuh/pull/7807>`_ The old implementation of logtest is restored and renamed as ``wazuh-logtest-legacy``, improving functionality.
- `#7974 <https://github.com/wazuh/wazuh/pull/7974>`_ Wazuh adds performance improvements to analysisd when running on multi-core hosts.
- `#8021 <https://github.com/wazuh/wazuh/pull/8021>`_ Agents now report to the manager when they stopped. That allows the manager to log an alert and immediately set their state to "disconnected".
- `#7327 <https://github.com/wazuh/wazuh/pull/7327>`_ Wazuh building process is now independent of the installation directory. With this improvement, the embedded Python interpreter is now provided in a preinstalled, portable package, and the Wazuh resources are now accessed via a relative path to the installation directory.
- `#7175 <https://github.com/wazuh/wazuh/pull/7175>`_ The ``/etc/ossec-init.conf`` file no longer exists. 
- `#7398 <https://github.com/wazuh/wazuh/issues/7398>`_ Unused files are removed from the repository, including TAP tests.


**API**
  
- `#7200 <https://github.com/wazuh/wazuh/pull/7200>`_ Wazuh adds a new endpoint to get agents’ logcollector statistics from different components. 
- `#7588 <https://github.com/wazuh/wazuh/pull/7588>`_ Wazuh adds a new endpoint to modify the user’s ``allow_run_as`` flag, allowing you to enable or disable the parameter.
- `#7647 <https://github.com/wazuh/wazuh/pull/7647>`_ Wazuh adds a new endpoint to get CVE data on affected agents. With this new endpoint, you can query the vulnerability data of any agent.
- `#7803 <https://github.com/wazuh/wazuh/pull/7803>`_ A new API configuration validator is now added to improve validation checking processes.
- `#8115 <https://github.com/wazuh/wazuh/pull/8115>`_ Wazuh adds the capability that allows you to disable the  ``max_request_per_minute`` API configuration option by setting its value to ``0``.
- `#6904 <https://github.com/wazuh/wazuh/issues/6904>`_ Ruleset version for ``GET /cluster/{node_id}/info`` and ``GET /manager/info`` is deprecated and removed.
- `#6909 <https://github.com/wazuh/wazuh/pull/6909>`_ ``POST /groups`` endpoint is now changed to specify the group name in a JSON body instead of in a query parameter. 
- `#7312 <https://github.com/wazuh/wazuh/pull/7312>`_ ``PUT /active-response`` endpoint function is now changed to create messages with new JSON format. 
- `#6366 <https://github.com/wazuh/wazuh/issues/6366>`_ ``DELETE /agents`` endpoint improvements: new parameters are added to the endpoint and the ``older_than`` field is now removed from the response. 
- `#7909 <https://github.com/wazuh/wazuh/pull/7909>`_ Login security controller is improved to avoid errors in Restful API reference links. 
- `#8123 <https://github.com/wazuh/wazuh/pull/8123>`_ The ``PUT /agents/group/{group_id}/restart`` response format is now improved when there are no agents assigned to the group.
- `#8149 <https://github.com/wazuh/wazuh/pull/8149>`_ Agent keys used when adding agents through the Wazuh API are now obscured in the API log.
- `#7588 <https://github.com/wazuh/wazuh/pull/7588>`_ The ``allow_run_as`` parameter is now removed from endpoints ``POST /security/users`` and ``PUT /security/users/{user_id}``.
- `#7006 <https://github.com/wazuh/wazuh/issues/7006>`_ The ``behind_proxy_server`` option is now removed from configuration.
  
**Framework**

- `#6904 <https://github.com/wazuh/wazuh/issues/6904>`_ ``update_ruleset`` script is now deprecated and removed.

**Ruleset**
  
- `#7100 <https://github.com/wazuh/wazuh/pull/7100>`_ Wazuh now provides decoder support for UFW (Uncomplicated Firewall) and its log format. This improvement ensures the correct processing of Ubuntu default firewall logs. 
- `#6867 <https://github.com/wazuh/wazuh/pull/6867>`_ The ruleset is updated and normalized to follow the Wazuh unified standard.
- `#7316 <https://github.com/wazuh/wazuh/pull/7316>`_ CIS policy "Ensure XD/NX support is enabled" is restored for SCA.


Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Cluster**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#6736 <https://github.com/wazuh/wazuh/pull/6736>`_               Memory usage is now optimized and improved when creating cluster messages.
==============================================================    =============

**Core**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#6934 <https://github.com/wazuh/wazuh/pull/6934>`_               In FIM, setting ``scan_time`` to *12am* or *12pm* now works correctly. 
`#6802 <https://github.com/wazuh/wazuh/pull/6802>`_               In FIM, reaching the file limit no longer creates wrong alerts for events triggered in a monitored folder. Now, a new SQLite query fetches the information of all the files in a specific order.
`#7105 <https://github.com/wazuh/wazuh/pull/7105>`_               Issue in analysisd that reserved the static decoder field name ``command`` but it was not evaluated is resolved. From now on, it is always treated as a dynamic decoder field.
`#7073 <https://github.com/wazuh/wazuh/pull/7073>`_               The evaluation of fields in the ``description`` tag of roles now works correctly.
`#6789 <https://github.com/wazuh/wazuh/pull/6789>`_               In FIM, errors that caused symbolic links not to work correctly are now fixed.
`#7018 <https://github.com/wazuh/wazuh/pull/7018>`_               Path validation in FIM configuration is now fixed. Now, the process to validate and format a path from configuration is performed correctly.
`#7018 <https://github.com/wazuh/wazuh/pull/7018>`_               Issue with “ignore” option in FIM where relative paths are not resolved is now fixed.
`#7268 <https://github.com/wazuh/wazuh/pull/7268>`_               Issue in FIM that wrongly detected that the file limit was reached is now fixed and ``nodes_count`` database variable is checked correctly.
`#7265 <https://github.com/wazuh/wazuh/pull/7265>`_               Alerts are now successfully generated in FIM when a domain user deletes a file.  
`#7359 <https://github.com/wazuh/wazuh/pull/7359>`_               Windows agent compilation with GCC 10 is now performed successfully.
`#7332 <https://github.com/wazuh/wazuh/pull/7332>`_               Errors in FIM when expanding environment variables are now fixed. 
`#7476 <https://github.com/wazuh/wazuh/pull/7476>`_               Rule descriptions are now included in archives when the input event matches a rule, regardless of whether an alert was triggered or not.
`#7495 <https://github.com/wazuh/wazuh/pull/7495>`_               Issue with Regex parser is fixed and now accepts empty strings.
`#7414 <https://github.com/wazuh/wazuh/pull/7414>`_               In FIM, issue with ``delete`` events with real-time is now fixed. Now, deleted files in agents running on Solaris generate alerts and are correctly reported.
`#7633 <https://github.com/wazuh/wazuh/pull/7633>`_               In Remoted, the priority header is no longer included incorrectly in syslog when using TCP.
`#7782 <https://github.com/wazuh/wazuh/pull/7782>`_               Stack overflow issue in the XML parsing is now fixed by limiting the levels of recursion to 1024.
`#7795 <https://github.com/wazuh/wazuh/pull/7795>`_               Vulnerability Detector now correctly skips scanning all the agents in the master node that are connected to another worker.
`#7858 <https://github.com/wazuh/wazuh/pull/7858>`_               Wazuh database synchronization module now correctly cleans dangling agent group files.
`#7919 <https://github.com/wazuh/wazuh/pull/7919>`_               In analysisd, Regex parser issue with memory leaks is now fixed.
`#7905 <https://github.com/wazuh/wazuh/pull/7905>`_               A typo is fixed in the initial value for the hotfix scan ID in the agents' database schema.
`#8003 <https://github.com/wazuh/wazuh/pull/8003>`_               Segmentation fault issue is fixed in Vulnerability Detector when parsing an unsupported package version format.
`#7990 <https://github.com/wazuh/wazuh/pull/7990>`_               In FIM, false positives were triggered due to file ``inode`` collisions in the engine database. This issue is now fixed and FIM works properly when the ``inode`` of multiple files is changed.
`#6932 <https://github.com/wazuh/wazuh/pull/6932>`_               Issue with error handling when wildcarded RHEL feeds are not found is now fixed. 
`#7862 <https://github.com/wazuh/wazuh/pull/7862>`_               The ``equals`` comparator is fixed for OVAL feeds in Vulnerability Detector. Now, equal versions in the OVAL scan are successfully compared.
`#8098 <https://github.com/wazuh/wazuh/pull/8098>`_               In FIM, an issue that caused a Windows agent to crash when synchronizing a Windows Registry value that starts with a colon ``:`` is now resolved. ``winagent`` no longer crash during synchronization of registries.
`#8151 <https://github.com/wazuh/wazuh/pull/8151>`_               A starving hazard issue in Wazuh DB is fixed and there are no longer risks of incoming requests being stalled during database commitment.
==============================================================    =============

**API**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#7587 <https://github.com/wazuh/wazuh/pull/7587>`_               API messages when getting agents’ upgrade results are fixed and improved.
`#7709 <https://github.com/wazuh/wazuh/pull/7709>`_               Issue with wrong user strings in API logs is fixed when receiving responses with status codes 308 or 404.
`#7867 <https://github.com/wazuh/wazuh/pull/7867>`_               New variable added fixes API errors when ``cluster`` is ``disabled`` and ``node_type`` is ``worker``.
`#7798 <https://github.com/wazuh/wazuh/pull/7798>`_               API integration test mapping script is now updated, fixing redundant paths and duplicated tests.
`#8014 <https://github.com/wazuh/wazuh/pull/8014>`_               API integration test case ``test_rbac_white_all`` no longer fails and a new test case for the enable/disable ``run_as`` endpoint is added for improved consistency.
`#8148 <https://github.com/wazuh/wazuh/pull/8148>`_               Issue with thread race condition when adding or deleting agents without ``authd``  is now fixed.
==============================================================    =============

**Ruleset**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#7837 <https://github.com/wazuh/wazuh/pull/7837>`_               ``usb-storage-attached`` regex pattern is now improved to support blank spaces.
`#7645 <https://github.com/wazuh/wazuh/pull/7645>`_               SCA checks for RHEL 7 and CentOS 7 are now fixed. 
`#8111 <https://github.com/wazuh/wazuh/pull/8111>`_               Match criteria for AWS WAF rules are now fixed and improved. 
==============================================================    =============


Wazuh Kibana plugin
-------------------

This release includes new features or enhancements. 

What's new
^^^^^^^^^^

- `#1434 <https://github.com/wazuh/wazuh-kibana-app/issues/1434>`_ New Ruleset Test tool is added under the Tools menu and in the action bar of the Edit Rules and Edit Decoders sections. You can now test sample logs directly on the Wazuh user interface and see how the ruleset reacts to specific log messages.
- `#1434 <https://github.com/wazuh/wazuh-kibana-app/issues/1434>`_ Dev Tools feature is now moved under the new Tools menu and it is renamed as API Console.
- `#3056 <https://github.com/wazuh/wazuh-kibana-app/pull/3056>`_ Wazuh adds a new Stats section on the Agent data overview page that allows you to see agent’s information retrieved by ``/agents/{agent_id}/stats/logcollector`` API endpoint.
- `#3069 <https://github.com/wazuh/wazuh-kibana-app/pull/3069>`_ New vulnerability inventory is now added to the Vulnerability module, allowing you to see data on the CVE that affect your monitored agents.
- `#2925 <https://github.com/wazuh/wazuh-kibana-app/issues/2925>`_ In the Security events module, the Rows per page option of the Explore agent section is now configurable. 
- `#3051 <https://github.com/wazuh/wazuh-kibana-app/pull/3051>`_ New reminder message and restart button are now displayed in the Rules, Decoders, and CDB lists sections of the management menu for you to restart the cluster or management after importing a file.
- `#3061 <https://github.com/wazuh/wazuh-kibana-app/issues/3061>`_ The API Console section of the Tools menu now includes a logtest ``PUT`` sample for you to have as a reference.
- `#3109 <https://github.com/wazuh/wazuh-kibana-app/pull/3109>`_ A new button is added for you to recheck API connection during a health check.
- `#3111 <https://github.com/wazuh/wazuh-kibana-app/pull/3111>`_ Wazuh adds a new ``wazuh-statistics`` template and new mapping for the indices.
- `#3126 <https://github.com/wazuh/wazuh-kibana-app/pull/3126>`_ When you deploy a new agent, a new link to the Wazuh documentation is added under the "Start the agent" step of the process for you to check if the connection to the manager is successful after adding a new agent. 
- `#2892 <https://github.com/wazuh/wazuh-kibana-app/issues/2892>`_ In the Integrity monitoring module, the Top 5 users result table is now changed to improve user experience.
- `#3080 <https://github.com/wazuh/wazuh-kibana-app/pull/3080>`_ The editing process of the  ``allow_run_as`` user property is now adapted to the new ``PUT /security/users/{user_id}/run_as`` endpoint.
- `#3046 <https://github.com/wazuh/wazuh-kibana-app/pull/3046>`_ Some ossec references are now renamed to follow Wazuh unified standard.

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Wazuh Kibana plugin**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#3088 <https://github.com/wazuh/wazuh-kibana-app/pull/3088>`_    Only authorized agents are shown in the Agents stats and Visualizations dashboard.
`#3095 <https://github.com/wazuh/wazuh-kibana-app/pull/3095>`_    ``Pending`` status option for agents is now included on the Agents overview page.
`#3097 <https://github.com/wazuh/wazuh-kibana-app/pull/3097>`_    Index patter setting is now applied when choosing from existing patterns.
`#3108 <https://github.com/wazuh/wazuh-kibana-app/pull/3108>`_    Issue with space character missing on the deployment command when UDP is configured is now fixed. 
`#3110 <https://github.com/wazuh/wazuh-kibana-app/pull/3110>`_    When a node is selected in the Analysis engine section of the Statistic page, you can now correctly see the statistics of the selected node.
`#3114 <https://github.com/wazuh/wazuh-kibana-app/pull/3114>`_    When selecting a MITRE technique in the MITRE ATTACK module, the changed date filter of the flyout window no longer modifies the main date filter as well.
`#3118 <https://github.com/wazuh/wazuh-kibana-app/pull/3118>`_    Issue with the name of the TCP sessions visualization is now fixed and the average metric is now changed to total TCP sessions.
`#3120 <https://github.com/wazuh/wazuh-kibana-app/pull/3120>`_    Only authorized agents are now shown on the Events and Security alerts tables. 
`#3122 <https://github.com/wazuh/wazuh-kibana-app/pull/3122>`_    In the Agents module, ``Last keep alive`` data is now displayed correctly within the panel.
`#3128 <https://github.com/wazuh/wazuh-kibana-app/pull/3128>`_    Wazuh Kibana plugin no longer redirects to the Settings page instead of the Overview page after a health check.
`#3144 <https://github.com/wazuh/wazuh-kibana-app/pull/3144>`_    Issue with the Wazuh logo path in Kibana menu when ``server.basePath`` setting is used is now fixed.
`#3152 <https://github.com/wazuh/wazuh-kibana-app/pull/3152>`_    Issue with deprecated endpoint for creating agent groups is now fixed.
`#3163 <https://github.com/wazuh/wazuh-kibana-app/pull/3163>`_    Issue with checking process for TCP protocol in Deploy a new agent section is now fixed.
==============================================================    =============


Splunk Enterprise 8.2.1
------------------------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

- `#2021 <https://github.com/wazuh/wazuh-splunk/pull/1021>`_ Added error toast in search handler when the connection with forwarder fails
- `#1024 <https://github.com/wazuh/wazuh-splunk/pull/1024>`_ Changed query to show alert evolution on Discover
- `#1066 <https://github.com/wazuh/wazuh-splunk/pull/1066>`_ Added link to agent view in Group Agents table
- `#1052 <https://github.com/wazuh/wazuh-splunk/pull/1052>`_ Support for Python3 compatibility, deleted deprecated Python2
- `#1058 <https://github.com/wazuh/wazuh-splunk/pull/1058>`_ Applied latest Wazuh API changes to create group request

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Splunk**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#944 <https://github.com/wazuh/wazuh-splunk/issues/944>`_        Apply Wazuh tools name changing from ossect to wazuh
`#945 <https://github.com/wazuh/wazuh-splunk/issues/945>`_        Apply Wazuh daemons name changing from ossec to wazuh
`#1020 <https://github.com/wazuh/wazuh-splunk/pull/1020>`_        Fixed token cache duration
`#1042 <https://github.com/wazuh/wazuh-splunk/pull/1042>`_        Fixed issue with dynamic columns width for agents PDF report
`#1045 <https://github.com/wazuh/wazuh-splunk/pull/1045>`_        Fixed blocked app when there isn't connected with the API
`#1046 <https://github.com/wazuh/wazuh-splunk/pull/1046>`_        Fixed success toast saving agent configuration file with bad style
`#1059 <https://github.com/wazuh/wazuh-splunk/pull/1059>`_        Minor style fixes
`#1063 <https://github.com/wazuh/wazuh-splunk/pull/1063>`_        Added new error handle to Alerts Configuration views
`#1069 <https://github.com/wazuh/wazuh-splunk/pull/1069>`_        Fixed uncontrolled message error when add api fails
==============================================================    =============
