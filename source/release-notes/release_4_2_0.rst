.. Copyright (C) 2015, Wazuh, Inc.

:orphan:

.. meta::
      :description: Wazuh 4.2.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_0_b:

4.2.0 Release notes
===================

This section lists the changes in version 4.2.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.


Highlights
----------

**Core**

- `#3368 <https://github.com/wazuh/wazuh/issues/3368>`_, `#5652 <https://github.com/wazuh/wazuh/issues/5652>`_, `#7109 <https://github.com/wazuh/wazuh/pull/7109>`_ Logcollector improvements:

       Logcollector is now enhanced with several new features. Wazuh adds Logcollector support for bookmarks, which allows you to continue reading a log file from the last read line where the agent stopped, improving efficiency and productivity. The multi-line log support through regex lets you collect multi-line logs with a variable number of lines. The agent also generates a statistics file report during Logcollector lifetime. This means that, in addition to the alternative of accessing metrics via API queries, you now have the option to access this information from a file stored in an agent, according to a configurable time.

- `#7731 <https://github.com/wazuh/wazuh/pull/7731>`_ Visibility improvements on agent CVE inventory report:

      Wazuh now generates CVE inventory reports that give you insight into vulnerabilities that affect an agent. With this added feature, this information is now queried through the RESTful API and displayed on the user interface for analysis. This visibility improvement allows you to assess vulnerabilities affecting your monitored agents and take quick corrective action if needed.

- `#7541 <https://github.com/wazuh/wazuh/pull/7541>`_ Agent port support for TCP and UDP:

      Remoted now supports listening to TCP and UDP ports simultaneously. This new support of both protocols provides several enhanced features related to manager active check, agent connection and logging, active response, API requests, JSON formatting, and more. This new supportability also provides enhancements related to centralized configuration since now agents can be configured remotely by using the ``agent.conf`` file.

- `#6912 <https://github.com/wazuh/wazuh/pull/6912>`_ Wazuh unified standard improvements:

      The names of daemons and tools for the Wazuh product are now renamed and unified to achieve consistency and uniformity, according to the new Wazuh standards.


- `#7105 <https://github.com/wazuh/wazuh/pull/7105>`_, `#7018 <https://github.com/wazuh/wazuh/pull/7018>`_, `#7268 <https://github.com/wazuh/wazuh/pull/7268>`_, `#8224 <https://github.com/wazuh/wazuh/pull/8224>`_, `#7795 <https://github.com/wazuh/wazuh/pull/7795>`_ Stability enhancements on Wazuh features:

      Wazuh new fixes provide stability to several features of the solution, including Analysisd, File Integrity Monitoring, Remoted, and Vulnerability Detector. These changes improve user experience throughout the product.



**API**

- `#7588 <https://github.com/wazuh/wazuh/pull/7588>`_ Endpoint for ``allow_run_as`` parameter configuration:
  
      The ``allow_run_as`` parameter is now removed from endpoints to create and update API users. Now, Wazuh adds a new endpoint to modify the user’s ``allow_run_as`` flag, allowing you to enable or disable the parameter after creating a user.

- `#7647 <https://github.com/wazuh/wazuh/pull/7647>`_ CVE data endpoint integration:

      Wazuh adds a new endpoint to get CVE data on affected agents. With this new endpoint, you can query the vulnerability data of any agent and get enhanced insight into the CVE, giving you easy access to data such as package name, package version, package architecture, and the CVE ID that affects said package. 

- `#7200 <https://github.com/wazuh/wazuh/pull/7200>`_ Endpoint for Logcollector statistics:

      Wazuh adds a new endpoint to get statistics from different components such as Logcollector, allowing you to retrieve information from both managers and agents. With this enhancement, Wazuh components that generate statistics files bring this information using their own socket interface and fetch the data from a remote component.        
 
- `#6366 <https://github.com/wazuh/wazuh/issues/6366>`_ Improved ``DELETE /agents`` endpoint:

      The ``DELETE/agents`` query now integrates new parameters that allow you to customize selection, and to easily remove agents that belong to a group. With this improvement, the ``older_than`` field is also removed from the response. 

**Wazuh Kibana plugin**

- `#1434 <https://github.com/wazuh/wazuh-kibana-app/issues/1434>`_ New Ruleset Test tool:

      Wazuh improves the user experience by adding a new **Ruleset Test** feature under the Tools section of the Wazuh Kibana plugin menu. This feature is also included as a tool in the action bar of both the Edit Rules and Edit Decoders sections, allowing you to keep the **Ruleset Test** window open while you navigate through the page to edit or create a ruleset file.

      The new **Ruleset Test** tool also integrates an input box for reading sample logs and an output box that allows you to visualize the test results. With this enhancement, you can now test sample logs directly on the Wazuh user interface and see how the ruleset reacts to specific log messages.

.. raw:: html
    
    <div class="images-rn-420-container">
    <div class="images-rn-420">

.. thumbnail::  ../images/release-notes/4.2.0/ruleset-test.png 
      :align: center
      :title: New Ruleset test tool

.. thumbnail::  ../images/release-notes/4.2.0/ruleset-test-window.png
      :align: center
      :title: Ruleset test window 

.. raw:: html

    </div>      

- `#1434 <https://github.com/wazuh/wazuh-kibana-app/issues/1434>`_ Tools menu improvements:

       The **Dev Tools** feature is renamed as **API Console** and it is now found, together with the new **Ruleset Test** feature, inside the new Tools section under the Wazuh Kibana plugin menu.

.. thumbnail::  ../images/release-notes/4.2.0/new-menu.png
      :align: center
      :title: New Tools section 

- `#3056 <https://github.com/wazuh/wazuh-kibana-app/pull/3056>`_ New Agent Stats section:

      Wazuh adds a new Stats section that improves the visibility you have over agents’ statistics. You can access this feature by clicking **Stats** in the action ribbon on the Agent data overview page. This improvement allows you to visualize information fetched by the new API endpoint ``/agents/{agent_id}/stats/logcollector`` in the Wazuh user interface.

.. thumbnail::  ../images/release-notes/4.2.0/new-stats-access.png
      :align: center
      :title: New Stats button on the Agent data overview page

.. thumbnail::  ../images/release-notes/4.2.0/agent-stats-section.png
      :align: center
      :title: Agent's new Stats section

- `#3069 <https://github.com/wazuh/wazuh-kibana-app/pull/3069>`_ Agent new vulnerability inventory:

      Wazuh now gives you enhanced insight into the CVE that are affecting an agent. The newly added **Inventory** tab in the Vulnerabilities module allows you to visualize information such as package name, package version, package architecture, and the CVE ID that affects the package, and more. You can also access the vulnerability data flyout to expand on the specifics of each vulnerability entry detailed in the Inventory.   

.. thumbnail::  ../images/release-notes/4.2.0/vuln-inventory-detail.png
      :align: center
      :title: Agent new vulnerability inventory  

.. raw:: html

    </div> 
    

Breaking changes
----------------

- `#7317 <https://github.com/wazuh/wazuh/pull/7317>`_ With its Active Response capability, Wazuh now sends information to the active response executables via ``stdin`` instead of in-line arguments. Any custom active response script developed for previous versions of Wazuh needs to be adapted to accept the event information. Previous default scripts present in the ``active-response/bin`` directories are now replaced as part of the agent upgrade process. The Wazuh manager continues to send in-line arguments to Wazuh agents up to version 4.1.5. This improvement also includes new rules to match the new active response logs.
 
Wazuh core
----------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

**Cluster**

- `#8175 <https://github.com/wazuh/wazuh/pull/8175>`_ Improvements in cluster node integrity calculation make the process more efficient. Now, it calculates the MD5 of only the files that were modified since the last integrity check.
- `#8182 <https://github.com/wazuh/wazuh/pull/8182>`_ The synchronization workflow of agent information between cluster nodes is optimized and now the synchronization is performed in a single task for each worker.
- `#8002 <https://github.com/wazuh/wazuh/pull/8002>`_ Cluster logs are now changed to show more useful and essential information, improving clarity and readability.


**Core**

- `#3368 <https://github.com/wazuh/wazuh/issues/3368>`_ Wazuh adds support for bookmarks in Logcollector. This allows you to follow the log file from the last read line where the agent stopped. 
- `#5652 <https://github.com/wazuh/wazuh/issues/5652>`_ Wazuh collects multi-line logs with a variable number of lines in Logcollector. This improved support is especially useful when dealing with logs, such as Java Stack Trace, since the number of lines in the log no longer needs to be held constant for every event type.
- `#6830 <https://github.com/wazuh/wazuh/pull/6830>`_ A new option is added that lets you limit the maximum number of files read per second for File Integrity Monitoring (FIM) scan. You now have more FIM control by allowing you to set the limit of the amount of data analyzed during a scheduled scan.
- `#7109 <https://github.com/wazuh/wazuh/pull/7109>`_ Wazuh adds statistics file to Logcollector. In addition to the alternative of accessing metrics via API queries, you now have the option to access this information from a file stored in an agent, according to a configurable time. This data is generated and updated every ``logcollector.state_interval`` seconds and can be accessed at any moment. 
- `#7239 <https://github.com/wazuh/wazuh/pull/7239>`_ Wazuh provides enhanced state information by adding statistical data queries to the agent.
- `#7307 <https://github.com/wazuh/wazuh/pull/7307>`_ Quoting in commands to group arguments in the command wodle and SCA checks are allowed. Before this enhancement, the system parsed quoted substrings into the same argument but double-quotes were kept. Now, scapes and double-quotes are allowed in command lines so that you can handle arguments in command calls. 
- `#7408 <https://github.com/wazuh/wazuh/pull/7408>`_ Agent IP detection capabilities are improved and agents running on Solaris now send their IP to the manager.
- `#7444 <https://github.com/wazuh/wazuh/pull/7444>`_ A new ``ip_update_interval`` option is added to set how often the agent refreshes its IP address.
- `#7661 <https://github.com/wazuh/wazuh/issues/7661>`_ New support is added for testing location information in Wazuh logtest. 
- `#7731 <https://github.com/wazuh/wazuh/pull/7731>`_ Vulnerability Detection capabilities are now improved by adding new Vulnerability Detector reports to the Wazuh database so you can know which CVE affect an agent.
- `#8755 <https://github.com/wazuh/wazuh/pull/8755>`_ Newly added option allows you to enable or disable listening to Authd TSL port.
- `#6912 <https://github.com/wazuh/wazuh/pull/6912>`_ Wazuh daemons are now renamed to follow the Wazuh unified standard. 
- `#6903 <https://github.com/wazuh/wazuh/pull/6903>`_ Wazuh CLIs and related tools are now renamed to follow Wazuh unified standard.
- `#6920 <https://github.com/wazuh/wazuh/pull/6920>`_ Wazuh internal directories are now renamed to follow Wazuh unified standard. 
- `#6759 <https://github.com/wazuh/wazuh/pull/6759>`_ Wazuh improvement prevents a condition in FIM from possibly causing a memory error.
- `#6828 <https://github.com/wazuh/wazuh/pull/6828>`_ FIM now switches from who-data to real-time mode when Audit is in immutable mode. 
- `#7317 <https://github.com/wazuh/wazuh/pull/7317>`_ Active Response protocol changed to receive messages in JSON format that include the full alert.
- `#7264 <https://github.com/wazuh/wazuh/pull/7264>`_ References in logs are now changed to include Wazuh product name. 
- `#7541 <https://github.com/wazuh/wazuh/pull/7541>`_ Remoted now supports both TCP and UDP protocols simultaneously.
- `#7595 <https://github.com/wazuh/wazuh/pull/7595>`_ Unit tests for the ``os_net`` library are now improved in functionality and consistency.
- `#6999 <https://github.com/wazuh/wazuh/pull/6999>`_ FIM now removes the Audit rules when their corresponding symbolic links change their target.
- `#7797 <https://github.com/wazuh/wazuh/pull/7797>`_ Compilation from sources now downloads the prebuilt external dependencies. This improvement helps to consume fewer resources and eliminates overhead. 
- `#7807 <https://github.com/wazuh/wazuh/pull/7807>`_ The old implementation of logtest is restored and renamed as ``wazuh-logtest-legacy``, improving functionality.
- `#7974 <https://github.com/wazuh/wazuh/pull/7974>`_ Wazuh adds performance improvements to Analysisd when running on multi-core hosts.
- `#8021 <https://github.com/wazuh/wazuh/pull/8021>`_ Agents now notify the manager that they are stopping. This allows the manager to log an alert and immediately set their state to "disconnected".
- `#7327 <https://github.com/wazuh/wazuh/pull/7327>`_ Wazuh building process is now independent of the installation directory. With this improvement, the embedded Python interpreter is now provided in a preinstalled, portable package, and the Wazuh resources are now accessed via a relative path to the installation directory.
- `#8201 <https://github.com/wazuh/wazuh/pull/8201>`_ In the Security configuration assessment module, the error log message shown when the agent cannot connect to the SCA queue is now changed to a warning message to redefine its severity.
- `#8921 <https://github.com/wazuh/wazuh/pull/8921>`_ The agent now validates the Audit connection configuration when enabling who-data for FIM on Linux.
- `#7175 <https://github.com/wazuh/wazuh/pull/7175>`_ The ``/etc/ossec-init.conf`` file no longer exists. 
- `#7398 <https://github.com/wazuh/wazuh/issues/7398>`_ Unused files are removed from the repository, including TAP tests.
- `#7379 <https://github.com/wazuh/wazuh/pull/7379>`_ Syscollector now synchronizes its database with the manager, avoiding full data delivery on each scan.


**API**
  
- `#7200 <https://github.com/wazuh/wazuh/pull/7200>`_ Wazuh adds a new endpoint to get agent statistics from different components. 
- `#7588 <https://github.com/wazuh/wazuh/pull/7588>`_ Wazuh adds a new endpoint to modify the user’s ``allow_run_as`` flag, allowing you to enable or disable the parameter.
- `#7647 <https://github.com/wazuh/wazuh/pull/7647>`_ Wazuh adds a new endpoint to get CVE data on affected agents. You can now query the vulnerability data of any agent.
- `#7803 <https://github.com/wazuh/wazuh/pull/7803>`_ A new API configuration validator is now added to improve validation checking processes.
- `#8115 <https://github.com/wazuh/wazuh/pull/8115>`_ Wazuh adds the capability that allows you to disable the ``max_request_per_minute`` API configuration option by setting its value to ``0``.
- `#6904 <https://github.com/wazuh/wazuh/issues/6904>`_ Ruleset versions for ``GET /cluster/{node_id}/info`` and ``GET /manager/info`` are deprecated and removed.
- `#6909 <https://github.com/wazuh/wazuh/pull/6909>`_ ``POST /groups`` endpoint is now changed to specify the group name in a JSON body instead of a query parameter. 
- `#7312 <https://github.com/wazuh/wazuh/pull/7312>`_ ``PUT /active-response`` endpoint function is now changed to create messages with new JSON format. 
- `#6366 <https://github.com/wazuh/wazuh/issues/6366>`_ The ``DELETE/agents`` query now integrates new parameters that allow you to easily remove agents that belong to a group. With this improvement, the ``older_than`` field is also removed from the response.
- `#7909 <https://github.com/wazuh/wazuh/pull/7909>`_ Login security controller is improved to avoid errors in Restful API reference links. 
- `#8123 <https://github.com/wazuh/wazuh/pull/8123>`_ The ``PUT /agents/group/{group_id}/restart`` response format is now improved when there are no agents assigned to the group.
- `#8149 <https://github.com/wazuh/wazuh/pull/8149>`_ Agent keys used when adding agents through the Wazuh API are now obscured in the API log.
- `#8457 <https://github.com/wazuh/wazuh/pull/8457>`_ All agent-restart function of endpoints is now improved by removing the active-response check.
- `#8615 <https://github.com/wazuh/wazuh/pull/8615>`_ The performance of API request processing time is optimized by applying cache to token RBAC permissions extraction. Now, this process is invalidated if any resource related to the token is modified.
- `#8841 <https://github.com/wazuh/wazuh/pull/8841>`_ Wazuh default value set for the ``limit`` API parameter is 500, but now you can specify the maximum value to 100000.
- `#7588 <https://github.com/wazuh/wazuh/pull/7588>`_ The ``allow_run_as`` parameter is now removed from endpoints to create and update API users.
- `#7006 <https://github.com/wazuh/wazuh/issues/7006>`_ The ``behind_proxy_server`` option is now removed from configuration.
  
**Framework**

- `#8682 <https://github.com/wazuh/wazuh/pull/8682>`_ This enhancement improves the agent insertion algorithm when Authd is not available.
- `#6904 <https://github.com/wazuh/wazuh/issues/6904>`_ ``update_ruleset`` script is now deprecated and removed.

**Ruleset**
  
- `#7100 <https://github.com/wazuh/wazuh/pull/7100>`_ Wazuh now provides decoder support for UFW (Uncomplicated Firewall) and its log format. This improvement ensures the correct processing of Ubuntu default firewall logs. 
- `#6867 <https://github.com/wazuh/wazuh/pull/6867>`_ The ruleset is updated and normalized to follow the Wazuh unified standard.
- `#7316 <https://github.com/wazuh/wazuh/pull/7316>`_ CIS policy "Ensure XD/NX support is enabled" is restored for SCA.

**External dependencies**

- `#8886 <https://github.com/wazuh/wazuh/pull/8886>`_ Boto3, botocore, requests, s3transfer, and urllib3 Python dependencies are now upgraded to their latest stable versions.
- `#9389 <https://github.com/wazuh/wazuh/pull/9389>`_ Python is now updated to the latest stable version 3.9.6.
- GCP dependencies and pip are now upgraded to their latest stable versions.
- python-jose is upgraded to version 3.1.0.
- Wazuh now adds tabulate dependency.

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Cluster**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#6736 <https://github.com/wazuh/wazuh/pull/6736>`_               Memory usage is now optimized and improved when creating cluster messages.
`#8142 <https://github.com/wazuh/wazuh/pull/8142>`_               Error when unpacking incomplete headers in cluster messages is now fixed. Now cluster communication works correctly and the process is completed successfully.
`#8499 <https://github.com/wazuh/wazuh/pull/8499>`_               When iterating a file listed that is already deleted, the error message is now changed and shown as a debug message.
`#8901 <https://github.com/wazuh/wazuh/pull/8901>`_               An issue with cluster timeout exceptions is now fixed.
`#8872 <https://github.com/wazuh/wazuh/pull/8872>`_               An issue with KeyError that occurred when an error command is received in any cluster node is now fixed.
==============================================================    =============

**Core**

=================================================================================================================    =============
Reference                                                                                                            Description
=================================================================================================================    =============
`#6934 <https://github.com/wazuh/wazuh/pull/6934>`_                                                                  In FIM, setting ``scan_time`` to ``12am`` or ``12pm`` now works correctly. 
`#6802 <https://github.com/wazuh/wazuh/pull/6802>`_                                                                  In FIM, reaching the file limit no longer creates wrong alerts for events triggered in a monitored folder. Now, a new SQLite query fetches the information of all the files in a specific order.
`#7105 <https://github.com/wazuh/wazuh/pull/7105>`_                                                                  The issue in Analysisd that reserved the static decoder field name ``command`` but was not evaluated is resolved. From now on, it is always treated as a dynamic decoder field.
`#7073 <https://github.com/wazuh/wazuh/pull/7073>`_                                                                  The evaluation of fields in the ``description`` tag of roles now works correctly.
`#6789 <https://github.com/wazuh/wazuh/pull/6789>`_                                                                  In FIM, errors that caused symbolic links not to work correctly are now fixed.
`#7018 <https://github.com/wazuh/wazuh/pull/7018>`_                                                                  Path validation in FIM configuration is now fixed. Now, the process to validate and format a path from configuration is performed correctly.
`#7018 <https://github.com/wazuh/wazuh/pull/7018>`_                                                                  The issue with ``ignore`` option in FIM where relative paths are not resolved is now fixed.
`#7268 <https://github.com/wazuh/wazuh/pull/7268>`_                                                                  The issue in FIM that wrongly detected that the file limit was reached is now fixed and ``nodes_count`` database variable is checked correctly.
`#7265 <https://github.com/wazuh/wazuh/pull/7265>`_                                                                  Alerts are now successfully generated in FIM when a domain user deletes a file. 
`#7359 <https://github.com/wazuh/wazuh/pull/7359>`_                                                                  Windows agent compilation with GCC 10 is now performed successfully.
`#7332 <https://github.com/wazuh/wazuh/pull/7332>`_                                                                  Errors in FIM when expanding environment variables are now fixed. 
`#7476 <https://github.com/wazuh/wazuh/pull/7476>`_                                                                  Rule descriptions are now included in archives when the input event matches a rule, regardless of whether an alert was triggered or not.
`#7495 <https://github.com/wazuh/wazuh/pull/7495>`_                                                                  The regex parser is fixed and it now accepts empty strings.
`#7414 <https://github.com/wazuh/wazuh/pull/7414>`_                                                                  In FIM, an issue with ``delete`` events with real-time is now fixed. Now, deleted files in agents running on Solaris generate alerts and are correctly reported.
`#7633 <https://github.com/wazuh/wazuh/pull/7633>`_                                                                  In Remoted, the priority header is no longer included incorrectly in Syslog when using TCP.
`#7782 <https://github.com/wazuh/wazuh/pull/7782>`_                                                                  A stack overflow issue in the XML parsing is now fixed by limiting the levels of recursion to 1024.
`#7795 <https://github.com/wazuh/wazuh/pull/7795>`_                                                                  Vulnerability Detector now correctly skips scanning all the agents in the master node that are connected to another worker.
`#7858 <https://github.com/wazuh/wazuh/pull/7858>`_                                                                  Wazuh database synchronization module now correctly cleans dangling agent group files.
`#7919 <https://github.com/wazuh/wazuh/pull/7919>`_                                                                  In Analysisd, a regex parser issue with memory leaks is now fixed.
`#7905 <https://github.com/wazuh/wazuh/pull/7905>`_                                                                  A typo is fixed in the initial value for the hotfix scan ID in the agents' DB schema.
`#8003 <https://github.com/wazuh/wazuh/pull/8003>`_                                                                  A segmentation fault issue is fixed in Vulnerability Detector when parsing an unsupported package version format.
`#7990 <https://github.com/wazuh/wazuh/pull/7990>`_                                                                  In FIM, false positives were triggered due to file ``inode`` collisions in the engine DB. This issue is now fixed and FIM works properly when the ``inode`` of multiple files is changed.
`#6932 <https://github.com/wazuh/wazuh/pull/6932>`_                                                                  An issue with error handling when wildcarded RHEL feeds are not found is now fixed. 
`#7862 <https://github.com/wazuh/wazuh/pull/7862>`_                                                                  The ``equals`` comparator is fixed for OVAL feeds in Vulnerability Detector. Now, equal versions in the OVAL scan are successfully compared.
`#8098 <https://github.com/wazuh/wazuh/pull/8098>`_ `#8143 <https://github.com/wazuh/wazuh/pull/8143>`_              In FIM, an issue that caused a Windows agent to crash when synchronizing a Windows Registry value that starts with a colon ``:`` is now resolved. ``winagent`` no longer crashes during the synchronization of registries.
`#8151 <https://github.com/wazuh/wazuh/pull/8151>`_                                                                  A starving hazard issue in the Wazuh DB is fixed and there are no longer risks of incoming requests being stalled during database commitment.
`#8224 <https://github.com/wazuh/wazuh/pull/8224>`_                                                                  An issue with race condition in Remoted that, under certain circumstances, crashes when closing RID files is now fixed. Remoted now locks the KeyStore in writing mode when closing RIDs.
`#8789 <https://github.com/wazuh/wazuh/pull/8789>`_                                                                  This fix resolves a descriptor leak issue in the agent when it failed to connect to Authd.
`#8828 <https://github.com/wazuh/wazuh/pull/8828>`_                                                                  An issue related to a potential error caused by a delay in the creation of Analysisd PID file when starting the manager is now fixed.
`#8551 <https://github.com/wazuh/wazuh/pull/8551>`_                                                                  An invalid memory access hazard issue is fixed In Vulnerability Detector.
`#8571 <https://github.com/wazuh/wazuh/pull/8571>`_                                                                  When the agent reports a file with an empty ACE list, it no longer causes an error at the manager in the FIM decoder.
`#8620 <https://github.com/wazuh/wazuh/pull/8620>`_                                                                  This fix prevents the agent on macOS from getting corrupted after an operating system upgrade. 
`#8357 <https://github.com/wazuh/wazuh/pull/8357>`_                                                                  An error is fixed in the manager that prevented its configuration to be checked after a change by the API when Active response is disabled.
`#8630 <https://github.com/wazuh/wazuh/pull/8630>`_                                                                  When removing an agent, the manager now correctly removes remote counters and agent group files.
`#8905 <https://github.com/wazuh/wazuh/pull/8905>`_                                                                  This fix in the agent on Windows resolves the issue that might cause the FIM DB to be corrupted when disabling the disk sync.
`#9364 <https://github.com/wazuh/wazuh/pull/9364>`_                                                                  Logcollector on Windows no longer crashes when handling the position of the file. 
`#9285 <https://github.com/wazuh/wazuh/pull/9285>`_                                                                  In Remoted, a buffer underflow hazard when handling input messages is now fixed.
`#9547 <https://github.com/wazuh/wazuh/pull/9547>`_                                                                  In the agent, an issue that tried to verify the WPK CA certificate even when verification was disabled is now fixed.
=================================================================================================================    =============

**API**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#7587 <https://github.com/wazuh/wazuh/pull/7587>`_               API messages for agent upgrade results are fixed and improved.
`#7709 <https://github.com/wazuh/wazuh/pull/7709>`_               An issue with wrong user strings in API logs is fixed when receiving responses with status codes 308 or 404.
`#7867 <https://github.com/wazuh/wazuh/pull/7867>`_               Newly added variable fixes API errors when ``cluster`` is ``disabled`` and ``node_type`` is ``worker``.
`#7798 <https://github.com/wazuh/wazuh/pull/7798>`_               API integration test mapping script is now updated, fixing redundant paths and duplicated tests.
`#8014 <https://github.com/wazuh/wazuh/pull/8014>`_               API integration test case ``test_rbac_white_all`` no longer fails and a new test case for the enable/disable ``run_as`` endpoint is added for improved consistency.
`#8148 <https://github.com/wazuh/wazuh/pull/8148>`_               An issue related to thread race condition when adding or deleting agents without ``authd`` is now fixed.
`#8496 <https://github.com/wazuh/wazuh/pull/8496>`_               CORS (cross-origin resource sharing) is now fixed in API configuration, allowing lists to be added to ``expose_headers`` and ``allow_headers``.
`#8887 <https://github.com/wazuh/wazuh/pull/8887>`_               An issue related to api.log is fixed to avoid unhandled exceptions on API timeouts.
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

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

- `#1434 <https://github.com/wazuh/wazuh-kibana-app/issues/1434>`_ A new **Ruleset Test** tool is added under the Tools menu and in the action bar of the Edit Rules and Edit Decoders sections. You can now test sample logs directly on the Wazuh user interface and see how the ruleset reacts to specific log messages.
- `#1434 <https://github.com/wazuh/wazuh-kibana-app/issues/1434>`_ **Dev Tools** feature is now moved under the new Tools menu and it is renamed as **API Console**.
- `#3056 <https://github.com/wazuh/wazuh-kibana-app/pull/3056>`_ Wazuh adds a new **Stats** section on the Agent data overview page that allows you to see the agent information retrieved by ``/agents/{agent_id}/stats/logcollector`` API endpoint.
- `#3069 <https://github.com/wazuh/wazuh-kibana-app/pull/3069>`_ A new vulnerability inventory is now added to the Vulnerability module, allowing you to see data on the CVE that affect your monitored agents.
- `#2925 <https://github.com/wazuh/wazuh-kibana-app/issues/2925>`_ In the Security events module, the **Rows per page** option of the **Explore agent** section is now configurable. 
- `#3051 <https://github.com/wazuh/wazuh-kibana-app/pull/3051>`_ New reminder message and restart button are now displayed in the Rules, Decoders, and CDB lists sections of the management menu for you to restart the cluster or management after importing a file.
- `#3061 <https://github.com/wazuh/wazuh-kibana-app/issues/3061>`_ The API Console feature of the Tools menu now includes a logtest ``PUT`` sample for you to have as a reference.
- `#3109 <https://github.com/wazuh/wazuh-kibana-app/pull/3109>`_ A new button is added for you to recheck the API connection during a health check.
- `#3111 <https://github.com/wazuh/wazuh-kibana-app/pull/3111>`_ Wazuh adds a new ``wazuh-statistics`` template and new mapping for the indices.
- `#3126 <https://github.com/wazuh/wazuh-kibana-app/pull/3126>`_ When you deploy a new agent, a new link to the Wazuh documentation is added under the *Start the agent* step of the process for you to check if the connection to the manager is successful after adding a new agent. 
- `#3238 <https://github.com/wazuh/wazuh-kibana-app/pull/3238>`_ When you deploy a new agent, a warning message is shown under the *Install and enroll the agent* step of the process to warn you about running the command on a host with an agent already installed. This action causes the agent package to be upgraded without enrolling the agent.
- `#2892 <https://github.com/wazuh/wazuh-kibana-app/issues/2892>`_ In the Integrity monitoring module, the *Top 5 users* result table is now changed to improve user experience.
- `#3080 <https://github.com/wazuh/wazuh-kibana-app/pull/3080>`_ The editing process of the ``allow_run_as`` user property is now adapted to the new ``PUT /security/users/{user_id}/run_as`` endpoint.
- `#3046 <https://github.com/wazuh/wazuh-kibana-app/pull/3046>`_ Some ossec references are now renamed to follow Wazuh unified standard.

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Wazuh Kibana plugin**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#3088 <https://github.com/wazuh/wazuh-kibana-app/pull/3088>`_    Only authorized agents are shown in the Agents stats and Visualizations dashboard.
`#3095 <https://github.com/wazuh/wazuh-kibana-app/pull/3095>`_    *Pending* status option for agents is now included on the Agents overview page.
`#3097 <https://github.com/wazuh/wazuh-kibana-app/pull/3097>`_    Index pattern setting is now applied when choosing from existing patterns.
`#3108 <https://github.com/wazuh/wazuh-kibana-app/pull/3108>`_    An issue with space character missing on the deployment command when UDP is configured is now fixed. 
`#3110 <https://github.com/wazuh/wazuh-kibana-app/pull/3110>`_    When a node is selected in the **Analysis Engine** section of the Statistics page, you can now correctly see the statistics of the selected node.
`#3114 <https://github.com/wazuh/wazuh-kibana-app/pull/3114>`_    When selecting a MITRE technique in the MITRE ATTACK module, the changed date filter of the flyout window no longer modifies the main date filter as well.
`#3118 <https://github.com/wazuh/wazuh-kibana-app/pull/3118>`_    An issue with the name of the TCP sessions visualization is now fixed and the average metric is now changed to total TCP sessions.
`#3120 <https://github.com/wazuh/wazuh-kibana-app/pull/3120>`_    Only authorized agents are correctly shown on the Events and Security alerts tables. 
`#3122 <https://github.com/wazuh/wazuh-kibana-app/pull/3122>`_    In the Agents module, *Last keep alive* data is now displayed correctly within the panel.
`#3128 <https://github.com/wazuh/wazuh-kibana-app/pull/3128>`_    Wazuh Kibana plugin no longer redirects to the Settings page instead of the Overview page after a health check.
`#3144 <https://github.com/wazuh/wazuh-kibana-app/pull/3144>`_    An issue with the Wazuh logo path in the Kibana menu when ``server.basePath`` setting is used is now fixed.
`#3152 <https://github.com/wazuh/wazuh-kibana-app/pull/3152>`_    An issue related to a deprecated endpoint for creating agent groups is now fixed.
`#3163 <https://github.com/wazuh/wazuh-kibana-app/pull/3163>`_    This fix resolves the issue caused when checking process for TCP protocol in  **Deploy a new agent** window.
`#3181 <https://github.com/wazuh/wazuh-kibana-app/pull/3181>`_    An issue with RBAC with agent group permissions is fixed. Now, when authorized agents are specified by their group instead of their IDs, you can successfully access the Security configuration assessment module, the Integrity monitoring module, and the Configuration window on the Agents page. 
`#3232 <https://github.com/wazuh/wazuh-kibana-app/pull/3232>`_    The index pattern is now successfully created when performing the health check, preventing an API-conflict error during this process.
`#3569 <https://github.com/wazuh/wazuh-kibana-app/pull/3569>`_    *Windows updates* section is no longer displayed incorrectly when generating PDF reports for Linux agent inventories.
`#3574 <https://github.com/wazuh/wazuh-kibana-app/pull/3574>`_    Error logging is now improved and some unnecessary error messages are removed. 
==============================================================    =============


Wazuh Splunk app
----------------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

- `#1024 <https://github.com/wazuh/wazuh-splunk/pull/1024>`_ In Discover view, the search query is changed to show the alert’s evolution.
- `#1066 <https://github.com/wazuh/wazuh-splunk/pull/1066>`_ In the Agents window of the Groups page, a new link is added to the result table to access Agent view.
- `#1052 <https://github.com/wazuh/wazuh-splunk/pull/1052>`_ Wazuh is now compatible with Python3. Python2 is now deprecated and removed.
- `#1058 <https://github.com/wazuh/wazuh-splunk/pull/1058>`_ The create group ``POST`` request is adapted to the latest Wazuh API changes.

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Splunk**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#944 <https://github.com/wazuh/wazuh-splunk/issues/944>`_        Wazuh tools are now renamed to follow Wazuh unified standard. ``ossec-control`` is now ``wazuh-control`` and ``ossec-regex`` is now renamed as ``wazuh-regex``.
`#945 <https://github.com/wazuh/wazuh-splunk/issues/945>`_        Wazuh daemons are now renamed to follow Wazuh unified standard.
`#1020 <https://github.com/wazuh/wazuh-splunk/pull/1020>`_        An issue related to token cache duration is now fixed.
`#1042 <https://github.com/wazuh/wazuh-splunk/pull/1042>`_        An issue with dynamic column's width for agents PDF report is now fixed. 
`#1045 <https://github.com/wazuh/wazuh-splunk/pull/1045>`_        The issue related to the app not loading when it is not connected to the API is now fixed and information is displayed correctly. 
`#1046 <https://github.com/wazuh/wazuh-splunk/pull/1046>`_        A styling issue with success toast message for saving agent configuration is now fixed.
`#1059 <https://github.com/wazuh/wazuh-splunk/pull/1059>`_        A minor styling issue is now fixed and **Export** button on the Export Results window now works correctly when you hover over it.
`#1063 <https://github.com/wazuh/wazuh-splunk/pull/1063>`_        A new error handler message is now added to the Alerts window of the Configuration page.
`#1069 <https://github.com/wazuh/wazuh-splunk/pull/1069>`_        The error message that appears when adding an API and the connection fails is now fixed and the message content text is shown correctly.
`#1021 <https://github.com/wazuh/wazuh-splunk/pull/1021>`_        An issue with the error toast message in search handler is fixed when the connection with forwarder fails.
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.2.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.2.0-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.2.0-8.1.2/CHANGELOG.md>`_