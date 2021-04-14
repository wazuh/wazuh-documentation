.. Copyright (C) 2021 Wazuh, Inc.

.. _release_4_2_0:

4.2.0 Release notes
===================

This section lists the changes in version 4.2.0. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.2-7.10.2/CHANGELOG.md>`_


Wazuh core
----------

What's new
^^^^^^^^^^
This release includes new features or enhancements. 

**Core**

- `#3368 <https://github.com/wazuh/wazuh/issues/3368>`_ Wazuh has now added support for bookmarks in ``logcollector``. This allows you to follow the log file from the last read line where the agent stopped. 
- `#5652 <https://github.com/wazuh/wazuh/issues/5652>`_ Wazuh collects multi-line logs with a variable number of lines in ``logcollector``. This improved support is especially useful when dealing with logs such as Java Stack Trace, since the number of lines in the log no longer needs to be held constant for every event type.
- `#6830 <https://github.com/wazuh/wazuh/pull/6830>`_ A new option is added that lets you limit the maximum number of files read per second for File Integrity Monitoring (FIM) scan. Now, you now have more FIM control by allowing you to set the limit of the amount of data analyzed during a scheduled scan.
- `#7109 <https://github.com/wazuh/wazuh/pull/7109>`_ Wazuh adds statistics file to Logcollector. In addition to the alternative of accessing metrics via API queries, you now have the option to access this information from a file stored in an agent, according to a configurable time. This data is generated and updated every ``logcollector.state_interval`` and can be accessed at any moment. 
- `#7239 <https://github.com/wazuh/wazuh/pull/7239>`_ Wazuh provides enhanced state information by adding statistical data queries to the agent.
- `#7307 <https://github.com/wazuh/wazuh/pull/7307>`_ Quoting in commands to group arguments in the command wodle and SCA checks are allowed. Before this enhancement, the system parsed quoted substrings into the same argument but double-quotes were kept. Now, scapes and double-quotes are allowed in command lines so that you can handle arguments in command calls. 
- `#7408 <https://github.com/wazuh/wazuh/pull/7408>`_ Agent's IP detection improvement: agents running on Solaris now send their IP to the manager. 
- `#7444 <https://github.com/wazuh/wazuh/pull/7444>`_ New ``ip_update_interval`` option is added to set how often the agent refreshes its IP address.
- `#7661 <https://github.com/wazuh/wazuh/issues/7661>`_ New support is added for testing location information in Wazuh Logtest. 
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
- `#7807 <https://github.com/wazuh/wazuh/pull/7807>`_ The old implementation of Logtest is restored and renamed as ``wazuh-logtest-legacy``, improving functionality.
- `#7974 <https://github.com/wazuh/wazuh/pull/7974>`_ Wazuh adds performance improvements to Analysisd when running on multi-core hosts.
- `#8021 <https://github.com/wazuh/wazuh/pull/8021>`_ Agents now report to the manager when they stopped. That allows the manager to log an alert and immediately set their state to **disconnected**.
- `#7327 <https://github.com/wazuh/wazuh/pull/7327>`_ Wazuh building process is now independent of the installation directory. With this improvement, the embedded Python interpreter is now provided in a preinstalled, portable package, and the Wazuh resources are now accessed via a relative path to the installation directory.
- `#7175 <https://github.com/wazuh/wazuh/pull/7175>`_ The ``/etc/ossec-init.conf`` file no longer exists. 
- `#7398 <https://github.com/wazuh/wazuh/issues/7398>`_ Unused files are removed from the repository, including TAP tests.


**API**
  
- `#7200 <https://github.com/wazuh/wazuh/pull/7200>`_ Wazuh adds a new endpoint to get agents’ logcollector statistics from different components. 
- `#7588 <https://github.com/wazuh/wazuh/pull/7588>`_ Wazuh adds a new endpoint to modify the user’s ``allow_run_as`` flag, allowing you to enable or disable the parameter.
- `#7647 <https://github.com/wazuh/wazuh/pull/7647>`_ Wazuh adds a new endpoint to get CVE data on affected agents. With this new endpoint, you can query the vulnerability data of any agent.
- `#7803 <https://github.com/wazuh/wazuh/pull/7803>`_ A new API configuration validator is now added to improve validation checking processes. 
- `#6904 <https://github.com/wazuh/wazuh/issues/6904>`_ Ruleset version for ``GET /cluster/{node_id}/info`` and ``GET /manager/info`` is deprecated and removed.
- `#6909 <https://github.com/wazuh/wazuh/pull/6909>`_ ``POST /groups`` endpoint is now changed to specify the group name in a JSON body instead of in a query parameter. 
- `#7312 <https://github.com/wazuh/wazuh/pull/7312>`_ ``PUT /active-response`` endpoint function is now changed to create messages with new JSON format. 
- `#6366 <https://github.com/wazuh/wazuh/issues/6366>`_ ``DELETE /agents`` endpoint improvements: new parameters are added to the endpoint and the ``older_than`` field is now removed from the response. 
- `#7909 <https://github.com/wazuh/wazuh/pull/7909>`_ Login security controller is improved to avoid errors in Restful API reference links. 
- `#7588 <https://github.com/wazuh/wazuh/pull/7588>`_ The ``allow_run_as`` parameter is now removed from endpoints ``POST /security/users`` and ``PUT /security/users/{user_id}``.
- `#7006 <https://github.com/wazuh/wazuh/issues/7006>`_ The ``behind_proxy_server`` option is now removed from configuration.
  
**Framework**

- `#6904 <https://github.com/wazuh/wazuh/issues/6904>`_ ``update_ruleset`` script is now deprecated.

**Ruleset**
  
- `#7100 <https://github.com/wazuh/wazuh/pull/7100>`_ Wazuh now provides decoder support for UFW (Uncomplicated Firewall) and its log format. This improvement ensures the correct processing of Ubuntu default firewall logs. 
- `#6867 <https://github.com/wazuh/wazuh/pull/6867>`_ The ruleset is updated and normalized to follow the Wazuh unified standard.
- `#7316 <https://github.com/wazuh/wazuh/pull/7316>`_ CIS policy **Ensure XD/NX support is enabled** is restored for SCA.


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
`#6934 <https://github.com/wazuh/wazuh/pull/6934>`_               Fixed a bug in FIM when setting scan_time to "12am" or "12pm". 
`#6802 <https://github.com/wazuh/wazuh/pull/6802>`_               Fixed a bug in FIM that produced wrong alerts when the file limit was reached. 
`#7105 <https://github.com/wazuh/wazuh/pull/7105>`_               Fixed a bug in Analysisd that reserved the static decoder field name "command" but never used it. 
`#7073 <https://github.com/wazuh/wazuh/pull/7073>`_               Fixed evaluation of fields in the tag `<description>` of rules. 
`#6789 <https://github.com/wazuh/wazuh/pull/6789>`_               Fixed bugs in FIM that caused symbolic links to not work correctly. 
`#7018 <https://github.com/wazuh/wazuh/pull/7018>`_               Fixed path validation in FIM configuration. 
`#7018 <https://github.com/wazuh/wazuh/pull/7018>`_               Fixed a bug in the "ignore" option on FIM where realtive paths were not resolved. 
`#7268 <https://github.com/wazuh/wazuh/pull/7268>`_               Fixed a bug in FIM that wrongly detected that the file limit had been reached. 
`#7265 <https://github.com/wazuh/wazuh/pull/7265>`_               Fixed a bug in FIM that did not produce alerts when a domain user deleted a file. 
`#7359 <https://github.com/wazuh/wazuh/pull/7359>`_               Fixed Windows agent compilation with GCC 10. 
`#7332 <https://github.com/wazuh/wazuh/pull/7332>`_               Fixed a bug in FIM that caused to wrongly expand environment variables. 
`#7476 <https://github.com/wazuh/wazuh/pull/7476>`_               Fixed the inclusion of the rule description in archives when matched a rule that would not produce an alert. 
`#7495 <https://github.com/wazuh/wazuh/pull/7495>`_               Fixed a bug in the regex parser that did not accept empty strings. 
`#7414 <https://github.com/wazuh/wazuh/pull/7414>`_               Fixed a bug in FIM that did not report deleted files set with real-time in agents on Solaris. 
`#7633 <https://github.com/wazuh/wazuh/pull/7633>`_               Fixed a bug in Remoted that wrongly included the priority header in syslog when using TCP. 
`#7782 <https://github.com/wazuh/wazuh/pull/7782>`_               Fixed a stack overflow in the XML parser by limiting 1024 levels of recursion.
`#7795 <https://github.com/wazuh/wazuh/pull/7795>`_               Prevented Vulnerability Detector from scanning all the agents in the master node that are connected to another worker. 
`#7858 <https://github.com/wazuh/wazuh/pull/7858>`_               Fixed an issue in the database sync module that left dangling agent group files. 
`#7919 <https://github.com/wazuh/wazuh/pull/7919>`_               Fixed memory leaks in the regex parser in Analysisd. 
`#7905 <https://github.com/wazuh/wazuh/pull/7905>`_               Fixed a typo in the initial value for the hotfix scan ID in the agents' database schema. 
`#8003 <https://github.com/wazuh/wazuh/pull/8003>`_               Fixed a segmentation fault in Vulnerability Detector when parsing an unsupported package version format. 
`#7990 <https://github.com/wazuh/wazuh/pull/7990>`_               Fixed false positives in FIM when the inode of multiple files change, due to file inode collisions in the engine database. 
`#6932 <https://github.com/wazuh/wazuh/pull/6932>`_               Fixed the error handling when wildcarded Redhat feeds are not found. 
`#7862 <https://github.com/wazuh/wazuh/pull/7862>`_               Fixed the `equals` comparator for OVAL feeds in Vulnerability Detector. 
==============================================================    =============

**API**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#7587 <https://github.com/wazuh/wazuh/pull/7587>`_               Fixed wrong API messages returned when getting agents' upgrade results. 
`#7709 <https://github.com/wazuh/wazuh/pull/7709>`_               Fixed wrong `user` string in API logs when receiving responses with status codes 308 or 404. 
`#7867 <https://github.com/wazuh/wazuh/pull/7867>`_               Fixed API errors when cluster is disabled and node_type is worker. 
`#7798 <https://github.com/wazuh/wazuh/pull/7798>`_               Fixed redundant paths and duplicated tests in API integration test mapping script. 
`8014 <https://github.com/wazuh/wazuh/pull/8014>`_                Fixed an API integration test case failing in test_rbac_white_all and added a test case for the enable/disable run_as endpoint.
==============================================================    =============

**Ruleset**

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#7837 <https://github.com/wazuh/wazuh/issues/7837>`_             Fixed usb-storage-attached regex pattern to support blank spaces. 
`#7645 <https://github.com/wazuh/wazuh/pull/7645>`_               Fixed SCA checks for RHEL7 and CentOS 7. Thanks to J. Daniel Medeiros (@jdmedeiros). 
==============================================================    =============



Wazuh Kibana plugin
-------------------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 


Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 