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
- `#8083 <https://github.com/wazuh/wazuh/pull/8083>`_ Changed the internal handling of agent keys in Remoted and Remoted to speed up key reloading.
- `#7885 <https://github.com/wazuh/wazuh/pull/7885>`_ The option <server> of the Syslog output now supports hostname resolution. 
- `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ The product's UNIX user and group have been renamed to "wazuh".
- `#7865 <https://github.com/wazuh/wazuh/pull/7865>`_ The MITRE database has been redesigned to provide full and searchable data.
- `#7358 <https://github.com/wazuh/wazuh/pull/7358>`_ The static fields related to FIM have been ported to dynamic fields in Analysisd.
- `#8351 <https://github.com/wazuh/wazuh/pull/8351>`_ Changed all randomly generated IDs used for cluster tasks. Now, uuid4 is used to ensure IDs are not repeated.
- `#8873 <https://github.com/wazuh/wazuh/pull/8873>`_ Improved sendsync error log to provide more details of the used parameters.
- `#9708 <https://github.com/wazuh/wazuh/pull/9708>`_ Changed walk_dir function to be iterative instead of recursive.
- `#10183 <https://github.com/wazuh/wazuh/pull/10183>`_ Refactored Integrity sync behavior so that new synchronizations do not start until extra-valid files are processed.
- `#10101 <https://github.com/wazuh/wazuh/pull/10101>`_ Changed cluster synchronization, now the content of the etc/shared folder is synchronized.
- `#8351 <https://github.com/wazuh/wazuh/pull/8351>`_ Changed all XML file loads. Now, defusedxml library is used to avoid possible XML-based attacks.
- `#8535 <https://github.com/wazuh/wazuh/pull/8535>`_ Changed configuration validation from execq socket to com socket.
- `#8392 <https://github.com/wazuh/wazuh/pull/8392>`_ Updated utils unittest to improve process_array function coverage.
- `#8885 <https://github.com/wazuh/wazuh/pull/8885>`_ Changed request_slice calculation to improve efficiency when accessing wazuh-db data.
- `#9273 <https://github.com/wazuh/wazuh/pull/9273>`_ Improved the retrieval of information from wazuh-db so it reaches the optimum size in a single iteration.
- `#9234 <https://github.com/wazuh/wazuh/pull/9234>`_ Optimized the way framework uses context cached functions and added a note on context_cached docstring.
- `#9332 <https://github.com/wazuh/wazuh/pull/9332>`_ Improved framework regexes to be more specific and less vulnerable.
- `#9423 <https://github.com/wazuh/wazuh/pull/9423>`_ Unified framework exceptions for non-active agents.
- `#9433 <https://github.com/wazuh/wazuh/pull/9433>`_ Changed RBAC policies to case insensitive.
- `#9548 <https://github.com/wazuh/wazuh/pull/9548>`_ Refactored framework stats module into SDK and core components to comply with Wazuh framework code standards.
- `#10309 <https://github.com/wazuh/wazuh/pull/10309>`_ Changed the size of the agents chunks sent to the upgrade socket to make the upgrade endpoints faster.
- `#9408 <https://github.com/wazuh/wazuh/pull/9408>`_ Refactored rootcheck and syscheck SDK code to make it clearer.
- `#9738 <https://github.com/wazuh/wazuh/pull/9738>`_ Adapted Azure-logs module to use Microsoft Graph API instead of Active Directory Graph API.
- `#8060 <https://github.com/wazuh/wazuh/pull/8060>`_ Analysisd now reconnects to Active Response if Remoted or Execd get restarted.
- `#10335 <https://github.com/wazuh/wazuh/pull/10335>`_ Agent key polling now supports cluster environments.
- `#10357 <https://github.com/wazuh/wazuh/pull/10357>`_ Extended support of Vulnerability Detector for Debian 11 (Bullseye).
- `#10326 <https://github.com/wazuh/wazuh/pull/10326>`_ Improved Remoted performance with an agent TCP connection sending queue.
- `#9093 <https://github.com/wazuh/wazuh/pull/9093>`_ Agent DB synchronization has been boosted by caching the last data checksum in Wazuh DB.
- `#8892 <https://github.com/wazuh/wazuh/pull/8892>`_ Logtest now scans new ruleset files when loading a new session.
- `#8237 <https://github.com/wazuh/wazuh/pull/8237>`_ CVE alerts by Vulnerability Detector now include the time of detection, severity, and score.
- `#10849 <https://github.com/wazuh/wazuh/pull/10849>`_ Fixed manager startup when <database_output> is enabled.
- `#10767 <https://github.com/wazuh/wazuh/pull/10767>`_ Changed the cluster "local_integrity" task to run in a separate process to improve overall performance.
- `#10807 <https://github.com/wazuh/wazuh/pull/10807>`_ The cluster communication with the database for agent information synchronization runs in a parallel separate process.
- `#10920 <https://github.com/wazuh/wazuh/pull/10920>`_ The cluster processing of the extra-valid files in the master node is carried out in a parallel separate process.
- `#8399 <https://github.com/wazuh/wazuh/pull/8399>`_ The data reporting for Rootcheck scans in the agent_control tool has been deprecated.
- `#8846 <https://github.com/wazuh/wazuh/pull/8846>`_ Removed old framework functions used to calculate agent status.


Agent
^^^^^

- `#8016 <https://github.com/wazuh/wazuh/pull/8016>`_ Added an option to allow the agent to refresh the connection to the manager. (#8016)
- `#8532 <https://github.com/wazuh/wazuh/pull/8532>`_ Introduced a new module to collect audit logs from GitHub. (#8532)
- `#8461 <https://github.com/wazuh/wazuh/pull/8461>`_ FIM now expands wildcarded paths in the configuration on Windows agents. (8461)
- `#8754 <https://github.com/wazuh/wazuh/pull/8754>`_ FIM reloads wildcarded paths on full scans. (8754)
- `#8306 <https://github.com/wazuh/wazuh/pull/8306>`_ Added new path_suffix option to AWS module configuration. (#8306)
- `#8331 <https://github.com/wazuh/wazuh/pull/8331>`_ Added new discard_regex option to AWS module configuration. (8331)
- `#8482 <https://github.com/wazuh/wazuh/pull/8482>`_ Added support for the S3 Server Access bucket type in AWS module. (#8482)
- `#9119 <https://github.com/wazuh/wazuh/pull/9119>`_ Added support for Google Cloud Storage buckets using a new GCP module called gcp-bucket. (#9119)
- `#9119 <https://github.com/wazuh/wazuh/pull/9119>`_ Added support for Google Cloud Storage access logs to the gcp-bucket module. (#9119)
- `#9420 <https://github.com/wazuh/wazuh/pull/9420>`_ Added support for VPC endpoints in AWS module. (#9420)
- `#9279 <https://github.com/wazuh/wazuh/pull/9279>`_ Added support for GCS access logs in the GCP module. (#9279)
- `#10198 <https://github.com/wazuh/wazuh/pull/10198>`_ Added an iam role session duration parameter to AWS module. (#10198)
- `#8826 <https://github.com/wazuh/wazuh/pull/8826>`_ Added support for variables in SCA policies. (#8826)
- `#7721 <https://github.com/wazuh/wazuh/pull/7721>`_ FIM now fills an audit rule file to support who-data although Audit is in immutable mode. (#7721)
- `#8957 <https://github.com/wazuh/wazuh/pull/8957>`_ Introduced an integration to collect audit logs from Office365. (#8957)
- `#10168 <https://github.com/wazuh/wazuh/pull/10168>`_ Added a new field DisplayVersion to Syscollector to help Vulnerability Detector match vulnerabilities for Windows. (#10168)
- `#10148 <https://github.com/wazuh/wazuh/pull/10148>`_ Added support for macOS agent upgrade via WPK. (#10148)
- `#8632 <https://github.com/wazuh/wazuh/pull/8632>`_ Added Logcollector support for macOS logs (Unified Logging System). (#8632)
- `#8381 <https://github.com/wazuh/wazuh/pull/8381>`_ The agent now reports the version of the running AIX operating system to the manager. (#8381)
- `#8604 <https://github.com/wazuh/wazuh/pull/8604>`_ Improved the reliability of the user ID parsing in FIM who-data mode on Linux. (#8604)
- `#10230 <https://github.com/wazuh/wazuh/pull/10230>`_ Reword AWS service_endpoint parameter description to suit FIPS endpoints too. (#10230)
- `#5047 <https://github.com/wazuh/wazuh/pull/5047>`_ Extended support of Logcollector for MySQL 4.7 logs. Thanks to @YoyaYOSHIDA. (#5047)
- `#9887 <https://github.com/wazuh/wazuh/pull/9887>`_ Agents running on FreeBSD and OpenBSD now report their IP address. (#9887)
- `#8202 <https://github.com/wazuh/wazuh/pull/8202>`_ Reduced verbosity of FIM debugging logs. (#8202)
- `#9992 <https://github.com/wazuh/wazuh/pull/9992>`_ The agent's IP resolution frequency has been limited to prevent high CPU load. (#9992)
- `#10236 <https://github.com/wazuh/wazuh/pull/10236>`_ Syscollector has been optimized to use lees memory. (#10236)
- `#10337 <https://github.com/wazuh/wazuh/pull/10337>`_ Added support of ZscalerOS system information in the agent. (#10337)
- `#10259 <https://github.com/wazuh/wazuh/pull/10259>`_ Syscollector has been extended to collect missing Microsoft product hotfixes. (#10259)
- `#10396 <https://github.com/wazuh/wazuh/pull/10396>`_ Updated the osquery integration to find the new osqueryd location as of version 5.0. (#10396)
- `#9123 <https://github.com/wazuh/wazuh/pull/9123>`_ The internal FIM data handling has been simplified to find files by their path instead of their inode. (#9123)
- `#9764 <https://github.com/wazuh/wazuh/pull/9764>`_ Reimplemented the WPK installer rollback on Windows. (#9764)
- `#10208 <https://github.com/wazuh/wazuh/pull/10208>`_ Active responses for Windows agents now support native fields from Eventchannel. (#10208)
- `#10651 <https://github.com/wazuh/wazuh/pull/10651>`_ Error logs by Logcollector when a file is missing have been changed to info logs. (#10651)
- `#8724 <https://github.com/wazuh/wazuh/pull/8724>`_ The agent MSI installer for Windows now detects the platform version to install the default configuration. (#8724)
- `#3659 <https://github.com/wazuh/wazuh/pull/3659>`_ Agent logs for inability to resolve the manager hostname now have info level. (#3659)
- `#10900 <https://github.com/wazuh/wazuh/pull/10900>`_ Removed oscap module files as it was already deprecated since v4.0.0. (#10900)


Resolved issues
---------------

This release resolves known issues. 


Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#8223 <https://github.com/wazuh/wazuh/pull/8223>`_               Fixed a memory defect in Remoted when closing connection handles.
`#7625 <https://github.com/wazuh/wazuh/pull/7625>`_               Fixed a timing problem in the manager that might prevent Analysisd from sending Active responses to agents.
`#8210 <https://github.com/wazuh/wazuh/pull/8210>`_               Fixed a bug in Analysisd that did not apply field lookup in rules that overwrite other ones.
`#8902 <https://github.com/wazuh/wazuh/pull/8902>`_               Prevented the manager from leaving dangling agent database files.
`#8254 <https://github.com/wazuh/wazuh/pull/8254>`_               Corrected remediation message for error code 6004.
`#8157 <https://github.com/wazuh/wazuh/pull/8157>`_               Fixed a bug when deleting non-existing users or roles in the security SDK.
`#8418 <https://github.com/wazuh/wazuh/pull/8418>`_               Fixed a bug with agent.conf file permissions when creating an agent group.
`#8422 <https://github.com/wazuh/wazuh/pull/8422>`_               Fixed wrong exceptions with wdb pagination mechanism.
`#8747 <https://github.com/wazuh/wazuh/pull/8747>`_               Fixed error when loading some rules with the \ character.
`#9216 <https://github.com/wazuh/wazuh/pull/9216>`_               Changed WazuhDBQuery class to properly close socket connections and prevent file descriptor leaks.
`#10320 <https://github.com/wazuh/wazuh/pull/10320>`_             Fixed error in the api configuration when using the agent_upgrade script.
`#10341 <https://github.com/wazuh/wazuh/pull/10341>`_             Handle JSONDecodeError in Distributed API class methods.
`#9738 <https://github.com/wazuh/wazuh/pull/9738>`_               Fixed an issue with duplicated logs in Azure-logs module and applied several improvements to it.
`#10680 <https://github.com/wazuh/wazuh/pull/10680>`_             Fixed the query parameter validation to allow usage of special chars in Azure module.
`#8394 <https://github.com/wazuh/wazuh/pull/8394>`_               Fix a bug running wazuh-clusterd process when it was already running.
`#8732 <https://github.com/wazuh/wazuh/pull/8732>`_               Allow cluster to send and receive messages with size higher than request_chunk.
`#9077 <https://github.com/wazuh/wazuh/pull/9077>`_               Fixed a bug that caused wazuh-clusterd process to not delete its pidfile when running in foreground mode and it is stopped.
`#10376 <https://github.com/wazuh/wazuh/pull/10376>`_             Fixed race condition due to lack of atomicity in the cluster synchronization mechanism.
`#10492 <https://github.com/wazuh/wazuh/pull/10492>`_             Fixed bug when displaying the dates of the cluster tasks that have not finished yet. Now n/a is displayed in these cases.
`#9196 <https://github.com/wazuh/wazuh/pull/9196>`_               Fixed missing field value_type in FIM alerts.
`#9292 <https://github.com/wazuh/wazuh/pull/9292>`_               Fixed a typo in the SSH Integrity Check script for Agentless.
`#10421 <https://github.com/wazuh/wazuh/pull/10421>`_             Fixed multiple race conditions in Remoted.
`#10390 <https://github.com/wazuh/wazuh/pull/10390>`_             The manager's agent database has been fixed to prevent dangling entries from removed agents.
`#9765 <https://github.com/wazuh/wazuh/pull/9765>`_               Fixed the alerts generated by FIM when a lookup operation on an SID fails.
`#10866 <https://github.com/wazuh/wazuh/pull/10866>`_             Fixed a bug that caused cluster agent-groups files to be synchronized multiple times unnecessarily.
`#10922 <https://github.com/wazuh/wazuh/pull/10922>`_             Fixed an issue in Wazuh DB that compiled the SQL statements multiple times unnecessarily.
`#10948 <https://github.com/wazuh/wazuh/pull/10948>`_             Fixed a crash in Analysisd when setting Active Response with agent_id = 0.
==============================================================    =============


Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed a bug in FIM that did not allow monitoring new directories in real-time mode if the limit was reached at some point. (#8784)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed a bug in FIM that threw an error when a query to the internal database returned no data. (#8941)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed an error where the IP address was being returned along with the port for Amazon NLB service.(#8362)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed AWS module to properly handle the exception raised when processing a folder without logs. (#8372
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed a bug with AWS module when pagination is needed in the bucket. (#8433)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed an error with the ipGeoLocation field in AWS Macie logs. (#8672)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Changed an incorrect debug message in the GCloud integration module. (#10333)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Data race conditions have been fixed in FIM. (#7848)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed wrong command line display in the Syscollector process report on Windows. (#10011)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Prevented Modulesd from freezing if Analysisd or Agentd get stopped before it. (#10249)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed wrong keepalive message from the agent when file merged.mg is missing. (#10405)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed missing logs from the Windows agent when it's getting stopped. (#10381)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed missing packages reporting in Syscollector for macOS due to empty architecture data. (#10524)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed FIM on Linux to parse audit rules with multiple keys for who-data. (#7506)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed Windows 11 version collection in the agent. (#10639)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed missing Eventchannel location in Logcollector configuration reporting. (#10602)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Updated CloudWatch Logs integration to avoid crashing when AWS raises Throttling errors. (#10794)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed AWS modules' log file filtering when there are logs with and without a prefix mixed in a bucket. (#10718)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed a bug on the installation script that made upgrades not to update the code of the external integration modules. (#10884)
`#0000 <https://github.com/wazuh/wazuh/pull/0000>`_               Fixed issue with AWS integration module trying to parse manually created folders as if they were files. (#10921)
==============================================================    =============





Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <xxxx>`_
- `wazuh/wazuh-kibana-app <xxx>`_
- `wazuh/wazuh-splunk <xxxx>`_