.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.4.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.4.0 Release notes - 31 January 2023
=====================================

This section lists the changes in version 4.4.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.


Highlights
----------

- `#10843 <https://github.com/wazuh/wazuh/pull/10843>`_ Added support for delta events in Syscollector when data gets changed.
- `#11268 <https://github.com/wazuh/wazuh/pull/11268>`_ Added support for IPv6 on agent-manager connection and enrollment.
- `#9962 <https://github.com/wazuh/wazuh/pull/9962>`_ Vulnerability Detector now supports SUSE agents.


What's new
----------

This release includes new features or enhancements.

Manager
^^^^^^^

- `#9995 <https://github.com/wazuh/wazuh/pull/9995>`_ Added new unit tests for cluster python module and increased coverage to 99%.
- `#11190 <https://github.com/wazuh/wazuh/pull/11190>`_ Added file size limitation on cluster integrity sync.
- `#13424 <https://github.com/wazuh/wazuh/pull/13424>`_ Added unittests for CLIs script files.
- `#9962 <https://github.com/wazuh/wazuh/pull/9962>`_ Added support for SUSE in Vulnerability Detector.
- `#13263 <https://github.com/wazuh/wazuh/pull/13263>`_ Added support for Ubuntu Jammy in Vulnerability Detector.
- `#13608 <https://github.com/wazuh/wazuh/pull/13608>`_ Added a software limit to limit the number of EPS that a manager can process.
- `#11753 <https://github.com/wazuh/wazuh/pull/11753>`_ Added a new wazuh-clusterd task for agent-groups info synchronization.
- `#14950 <https://github.com/wazuh/wazuh/pull/14950>`_ Added unit tests for functions in charge of getting ruleset sync status.
- `#14950 <https://github.com/wazuh/wazuh/pull/14950>`_ Added auto-vacuum mechanism in wazuh-db.
- `#10822 <https://github.com/wazuh/wazuh/pull/10822>`_ wazuh-logtest now shows warnings about ruleset issues.
- `#12206 <https://github.com/wazuh/wazuh/pull/12206>`_ Modulesd memory is now managed by jemalloc, this helps reduce memory fragmentation.
- `#11702 <https://github.com/wazuh/wazuh/pull/11702>`_ The manager now refuses multiple connections from the same agent. 
- `#12117 <https://github.com/wazuh/wazuh/pull/12117>`_ Updated the Vulnerability Detector configuration reporting to include MSU and skip JSON Red Hat feed.
- `#12352 <https://github.com/wazuh/wazuh/pull/12352>`_ Improved the shared configuration file handling performance. 
- `#11753 <https://github.com/wazuh/wazuh/pull/11753>`_ The agent group data is now natively handled by Wazuh DB. 
- `#10710 <https://github.com/wazuh/wazuh/pull/10710>`_ Improved security at cluster zip filenames creation. 
- `#12390 <https://github.com/wazuh/wazuh/pull/12390>`_ Refactor of the core/common.py module. 
- `#12497 <https://github.com/wazuh/wazuh/pull/12497>`_ Refactor format_data_into_dictionary method of WazuhDBQuerySyscheck class. 
- `#11124 <https://github.com/wazuh/wazuh/pull/11124>`_ Limit the maximum zip size that can be created while synchronizing cluster Integrity.
- `#13065 <https://github.com/wazuh/wazuh/pull/13065>`_ Refactored the functions in charge of synchronizing files in the cluster. 
- `#13079 <https://github.com/wazuh/wazuh/pull/13079>`_ Changed MD5 hash function to BLAKE2 for cluster file comparison. 
- `#12926 <https://github.com/wazuh/wazuh/pull/12926>`_ Renamed wazuh-logtest and wazuh-clusterd scripts to follow the same scheme as the other scripts (spaces symbolized with _ instead of -).
- `#10865 <https://github.com/wazuh/wazuh/pull/10865>`_ The agent key polling module has been ported to wazuh-authd. 
- `#13741 <https://github.com/wazuh/wazuh/pull/13741>`_ Added the update field in the CPE Helper for Vulnerability Detector. 
- `#11702 <https://github.com/wazuh/wazuh/pull/11702>`_ Prevented agents with the same ID from connecting to the manager simultaneously. 
- `#13713 <https://github.com/wazuh/wazuh/pull/13713>`_ wazuh-analysisd, wazuh-remoted and wazuh-db metrics have been extended. 
- `#11753 <https://github.com/wazuh/wazuh/pull/11753>`_ Minimized and optimized wazuh-clusterd number of messages from workers to master related to agent-info and agent-groups tasks. 
- `#14244 <https://github.com/wazuh/wazuh/pull/14244>`_ Improved performance of the agent_groups CLI when listing agents belonging to a group. 
- `#14475 <https://github.com/wazuh/wazuh/pull/14475>`_ Changed wazuh-clusterd binary behaviour to kill any existing cluster processes when executed. 
- `#14791 <https://github.com/wazuh/wazuh/pull/14791>`_ Changed wazuh-clusterd tasks to wait asynchronously for responses coming from wazuh-db. 
- `#11190 <https://github.com/wazuh/wazuh/pull/11190>`_ Use zlib for zip compression in cluster synchronization. 
- `#12241 <https://github.com/wazuh/wazuh/pull/12241>`_ Added mechanism to dynamically adjust zip size limit in Integrity sync.
- `#12409 <https://github.com/wazuh/wazuh/pull/12409>`_ Removed the unused internal option wazuh_db.sock_queue_size.
- `#10940 <https://github.com/wazuh/wazuh/pull/10940>`_ Removed all the unused exceptions from the exceptions.py file.
- `#10740 <https://github.com/wazuh/wazuh/pull/10740>`_ Removed unused execute method from core/utils.py. 
- `#13119 <https://github.com/wazuh/wazuh/pull/13119>`_ Removed unused set_user_name function in framework. 
- `#12370 <https://github.com/wazuh/wazuh/pull/12370>`_ Unused internal calls to wazuh-db have been deprecated. 
- `#14542 <https://github.com/wazuh/wazuh/pull/14542>`_ Debian Stretch support in Vulnerability Detector has been deprecated.


Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#10873 <https://github.com/wazuh/wazuh/pull/10873>`_             Fixed wazuh-dbd halt procedure.
`#12098 <https://github.com/wazuh/wazuh/pull/12098>`_             Fixed compilation warnings in the manager. 
`#12516 <https://github.com/wazuh/wazuh/pull/12516>`_             Fixed a bug in the manager that did not send shared folders correctly to agents belonging to multiple groups. 
`#12834 <https://github.com/wazuh/wazuh/pull/12834>`_             Fixed the Active Response decoders to support back the top entries for source IP in reports.
`#13338 <https://github.com/wazuh/wazuh/pull/13338>`_             Fixed the feed update interval option of Vulnerability Detector for the JSON Red Hat feed. 
`#12127 <https://github.com/wazuh/wazuh/pull/12127>`_             Fixed several code flaws in the python framework. 
`#10635 <https://github.com/wazuh/wazuh/pull/10635>`_             Fixed code flaw regarding the use of XML package. 
`#10636 <https://github.com/wazuh/wazuh/pull/10636>`_             Fixed code flaw regarding permissions at group directories. 
`#10544 <https://github.com/wazuh/wazuh/pull/10544>`_             Fixed code flaw regarding temporary directory names. 
`#11951 <https://github.com/wazuh/wazuh/pull/11951>`_             Fixed code flaw regarding try, except and pass block in wazuh-clusterd. 
`#10782 <https://github.com/wazuh/wazuh/pull/10782>`_             Fixed framework datetime transformations to UTC. 
`#11866 <https://github.com/wazuh/wazuh/pull/11866>`_             Fixed a cluster error when Master-Worker tasks where not properly stopped after an exception occurred in one or both parts.
`#12831 <https://github.com/wazuh/wazuh/pull/12831>`_             Fixed cluster logger issue printing 'NoneType: None' in error logs.
`#13419 <https://github.com/wazuh/wazuh/pull/13419>`_             Fixed unhandled cluster error when reading a malformed configuration. 
`#13368 <https://github.com/wazuh/wazuh/pull/13368>`_             Fixed framework unit test failures when they are run by the root user. 
`#13405 <https://github.com/wazuh/wazuh/pull/13405>`_             Fixed a memory leak in analysisd when parsing a disabled Active Response. 
`#13590 <https://github.com/wazuh/wazuh/pull/13590>`_             Fixed Syscollector delta message handling. 
`#13892 <https://github.com/wazuh/wazuh/pull/13892>`_             Prevented wazuh-db from deleting queue/diff when cleaning databases. 
`#14981 <https://github.com/wazuh/wazuh/pull/14981>`_             Fixed multiple data race conditions in Remoted reported by ThreadSanitizer.
`#15151 <https://github.com/wazuh/wazuh/pull/15151>`_             Fixed aarch64 OS collection in Remoted to allow WPK upgrades. 
`#15165 <https://github.com/wazuh/wazuh/pull/15165>`_             Fixed a race condition in Remoted that was blocking agent connections. 
`#13531 <https://github.com/wazuh/wazuh/pull/13531>`_             Fixed Virustotal integration to support non UTF-8 characters.
`#14922 <https://github.com/wazuh/wazuh/pull/14922>`_             Fixed a bug masking as Timeout any error that might occur while waiting to receive files in the cluster.
==============================================================    =============

Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#15259 <https://github.com/wazuh/wazuh/pull/15259>`_             aaa
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4815 <https://github.com/wazuh/wazuh-kibana-app/pull/4815>`_    aaa
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4815 <https://github.com/wazuh/wazuh-kibana-app/pull/4815>`_    aaa
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4815 <https://github.com/wazuh/wazuh-kibana-app/pull/4815>`_    aaa
==============================================================    =============

Packages
^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1901 <https://github.com/wazuh/wazuh-packages/pull/1901>`__     aaa
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.4.0/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.4.0-1.2.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.4.0-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.4.0-7.17.6/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.4.0-8.2.8/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.4.0>`_
