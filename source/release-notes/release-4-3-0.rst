.. meta::
      :description: Wazuh 4.3.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_3_0:

4.3.0 Release notes
===================

This section lists the changes in version 4.3.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.

Manager
^^^^^^^

- Changed the internal handling of agent keys in Remoted and Remoted to speed up key reloading. `#8083 <https://github.com/wazuh/wazuh/pull/8083>`_
- The option <server> of the Syslog output now supports hostname resolution. `#7885 <https://github.com/wazuh/wazuh/pull/7885>`_
- The product's UNIX user and group have been renamed to "wazuh". `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_
- The MITRE database has been redesigned to provide full and searchable data. `#7865 <https://github.com/wazuh/wazuh/pull/7865>`_
- The static fields related to FIM have been ported to dynamic fields in Analysisd. `#7358 <https://github.com/wazuh/wazuh/pull/7358>`_
- Changed all randomly generated IDs used for cluster tasks. Now, uuid4 is used to ensure IDs are not repeated. `#8351 <https://github.com/wazuh/wazuh/pull/8351>`_
- Improved sendsync error log to provide more details of the used parameters. `#8873 <https://github.com/wazuh/wazuh/pull/8873>`_
- Changed walk_dir function to be iterative instead of recursive. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9708)
- Refactored Integrity sync behavior so that new synchronizations do not start until extra-valid files are processed. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10183)
- Changed cluster synchronization, now the content of the etc/shared folder is synchronized. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10101)
- Changed all XML file loads. Now, defusedxml library is used to avoid possible XML-based attacks. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (8351)
- Changed configuration validation from execq socket to com socket. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#8535)
- Updated utils unittest to improve process_array function coverage. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#8392)
- Changed request_slice calculation to improve efficiency when accessing wazuh-db data. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#8885)
- Improved the retrieval of information from wazuh-db so it reaches the optimum size in a single iteration. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9273)
- Optimized the way framework uses context cached functions and added a note on context_cached docstring. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9234)
- Improved framework regexes to be more specific and less vulnerable. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9332)
- Unified framework exceptions for non-active agents. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9423)
- Changed RBAC policies to case insensitive. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9433)
- Refactored framework stats module into SDK and core components to comply with Wazuh framework code standards. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9548)
- Changed the size of the agents chunks sent to the upgrade socket to make the upgrade endpoints faster. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10309)
- Refactored rootcheck and syscheck SDK code to make it clearer. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9408)
- Adapted Azure-logs module to use Microsoft Graph API instead of Active Directory Graph API. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9738)
- Analysisd now reconnects to Active Response if Remoted or Execd get restarted. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#8060)
- Agent key polling now supports cluster environments. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10335)
- Extended support of Vulnerability Detector for Debian 11 (Bullseye). `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10357)
- Improved Remoted performance with an agent TCP connection sending queue. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10326)
- Agent DB synchronization has been boosted by caching the last data checksum in Wazuh DB. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#9093)
- Logtest now scans new ruleset files when loading a new session. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#8892)
- CVE alerts by Vulnerability Detector now include the time of detection, severity, and score. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#8237)
- Fixed manager startup when <database_output> is enabled. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10849)
- Changed the cluster "local_integrity" task to run in a separate process to improve overall performance. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10767)
- The cluster communication with the database for agent information synchronization runs in a parallel separate process. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10807)
- The cluster processing of the extra-valid files in the master node is carried out in a parallel separate process. `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ (#10920)





Resolved issues
---------------

This release resolves known issues. 

Manager
^^^^^^^

- `#8178 <https://github.com/wazuh/wazuh/pull/8178>`_ Added support for Arch Linux OS in Vulnerability Detector. Thanks to Aviel Warschawski (@avielw).
- `#8749 <https://github.com/wazuh/wazuh/pull/8749>`_ Added a log message in the `cluster.log` file to notify that wazuh-clusterd has been stopped.
- `#9077 <https://github.com/wazuh/wazuh/pull/9077>`_ Added message with the PID of `wazuh-clusterd` process when launched in foreground mode.
- `#10492 <https://github.com/wazuh/wazuh/pull/10492>`_ Added time calculation when extra information is requested to the `cluster_control` binary.
- `#9209 <https://github.com/wazuh/wazuh/pull/9209>`_ Added a context variable to indicate origin module in socket communication messages.
- `#9733 <https://github.com/wazuh/wazuh/pull/9733>`_ Added unit tests for framework/core files to increase coverage.
- `#9204 <https://github.com/wazuh/wazuh/pull/9204>`_ Added a verbose mode in the wazuh-logtest tool.
- `#8830 <https://github.com/wazuh/wazuh/pull/8830>`_ Added Vulnerability Detector support for Amazon Linux.
- `#10693 <https://github.com/wazuh/wazuh/pull/10693>`_ Introduced new option `<force>` to set the behavior when Authd finds conflicts on agent enrollment requests.
- `#9099 <https://github.com/wazuh/wazuh/pull/9099>`_ Added saniziters to the unit tests execution.
- `#8237 <https://github.com/wazuh/wazuh/pull/8237>`_ Vulnerability Detector introduces vulnerability inventory.
  - The manager will only deliver alerts when new vulnerabilities are detected in agents or when they stop applying.



^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============

==============================================================    =============


^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============

==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <xxxx>`_
- `wazuh/wazuh-kibana-app <xxx>`_
- `wazuh/wazuh-splunk <xxxx>`_