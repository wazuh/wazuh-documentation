.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.4.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.4.0 Release notes - 28 March 2023
======================================

This section lists the changes in version 4.4.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

This new version of Wazuh brings new features and adds support for some Linux distributions and integrations. For more details, the highlights of Wazuh 4.4.0 are listed below:

- IPv6 support for the enrollment process and the agent-manager connection
- Vulnerability detection support for SUSE agents
- Wazuh indexer and dashboard are now based on OpenSearch 2.4.1 version
- Rework of Ubuntu Linux 20.04 and 22.04 SCA policies
- Support for Azure Integration in Linux agents

Below you can find more information about each of these highlights.

Wazuh 4.4.0 brings IPv6 support when connecting and enrolling an agent to a manager. The IPv6 protocol can handle packets more effectively, enhance performance, and boost security. This new feature allows agents to register and connect through an IPv6 address.

SUSE agents now natively support vulnerabilities detection. Wazuh added full support for SUSE Linux Enterprise Server and Desktop operating systems versions 11, 12, and 15. The vulnerability Detector now scans the programs identified by ``syscollector``, looking to report vulnerabilities described in the `SUSE OVAL <https://www.suse.com/support/security/oval/>`_ and the `NVD <https://nvd.nist.gov/>`_ databases.

Wazuh indexer and dashboard bump to OpenSearch 2.4.1. The Wazuh indexer and the Wazuh dashboard are based on OpenSearch, an open source search and analytics project derived from Elasticsearch and Kibana. We generated and tested the ``wazuh-indexer`` Debian and RPM packages with OpenSearch 2.4.1 and the ``wazuh-dashboard`` Debian and RPM packages with OpenSearch dashboards 2.4.1. This way, we avoid earlier version vulnerabilities and incorporate new functionalities.

To solve some errors in the previous Ubuntu Linux 20.04 SCA Policy, we reworked the Ubuntu Linux 20.04 and 22.04 SCA policies. As part of this task, we used the *CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0* to update Ubuntu Linux 22.04 SCA Policy.

Wazuh added support for Azure Integration in Linux agents. Now this integration can run for both agents and managers. We modified the packages generation process to support Azure in those agents that are installed using the WPK packages. Each new WPK package contains all the updated binaries and source code, and the installer updates all files and binaries to support Azure integration.

Finally, it’s essential to remark that we maintain support for all installation alternatives. Indeed we maintain and extend this support by adding more recent versions.

.. Note::
   Starting with Wazuh v4.5.0, the central components will only support the Amazon Linux, RHEL, CentOS, and Ubuntu operating systems whose versions are officially supported by their vendors. Wazuh agents will maintain their current support status.

Breaking changes
----------------

This release includes some breaking changes, such as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#10865 <https://github.com/wazuh/wazuh/pull/10865>`_ The agent key polling module has been ported to ``wazuh-authd``. 

RESTful API
^^^^^^^^^^^

- `#14119 <https://github.com/wazuh/wazuh/pull/14119>`_ Added new setting ``upload_wazuh_configuration`` to the Wazuh API configuration. The old parameter ``remote_commands`` is now part of this setting.
- `#14230 <https://github.com/wazuh/wazuh/pull/14230>`_ Deprecated ``GET /manager/stats/analysisd``, ``GET /manager/stats/remoted``, ``GET /cluster/{node_id}stats/analysisd``, and ``GET /cluster/{node_id}stats/remoted`` API endpoints. Use new endpoints ``GET /manager/daemons/stats`` and ``/cluster/{node_id}/daemons/stats``, respectively. 
- `#16231 <https://github.com/wazuh/wazuh/pull/16231>`_ Removed RBAC group assignments' related permissions from ``DELETE /groups`` to improve performance and changed response structure.

Ruleset
^^^^^^^
- Wazuh ruleset has been updated, and you can check the changes in the following :ref:`list <ruleset_whats_new>`. If you have a custom set of decoders and rules, please check the changes done.

What's new
----------

This version includes new features or improvements, such as the following:

Wazuh manager
^^^^^^^^^^^^^

- `#9995 <https://github.com/wazuh/wazuh/pull/9995>`_ Added new unit tests for cluster Python module and increased coverage to 99%.
- `#11190 <https://github.com/wazuh/wazuh/pull/11190>`_ Added file size limitation on cluster integrity sync.
- `#13424 <https://github.com/wazuh/wazuh/pull/13424>`_ Added ``unittests`` for CLIs script files.
- `#9962 <https://github.com/wazuh/wazuh/pull/9962>`_ Added support for SUSE in Vulnerability Detector.
- `#13263 <https://github.com/wazuh/wazuh/pull/13263>`_ Added support for Ubuntu Jammy in Vulnerability Detector.
- `#13608 <https://github.com/wazuh/wazuh/pull/13608>`_ Added a software limit to restrict the number of ``EPS`` a manager can process.
- `#11753 <https://github.com/wazuh/wazuh/pull/11753>`_ Added a new ``wazuh-clusterd`` task for ``agent-groups`` info synchronization.
- `#14950 <https://github.com/wazuh/wazuh/pull/14950>`_ Added unit tests for functions in charge of getting ruleset sync status.
- `#14950 <https://github.com/wazuh/wazuh/pull/14950>`_ Added auto-vacuum mechanism in ``wazuh-db``.
- `#10843 <https://github.com/wazuh/wazuh/pull/10843>`_ Delta events in Syscollector when data gets changed may now produce alerts.  
- `#10822 <https://github.com/wazuh/wazuh/pull/10822>`_ ``wazuh-logtest`` now shows warnings about ruleset issues.
- `#12206 <https://github.com/wazuh/wazuh/pull/12206>`_ ``Modulesd`` memory is now managed by ``jemalloc`` to help reduce memory fragmentation.
- `#12117 <https://github.com/wazuh/wazuh/pull/12117>`_ Updated the Vulnerability Detector configuration reporting to include MSU and skip JSON Red Hat feed.
- `#12352 <https://github.com/wazuh/wazuh/pull/12352>`_ Improved the shared configuration file handling performance. 
- `#11753 <https://github.com/wazuh/wazuh/pull/11753>`_ The agent group data is now natively handled by Wazuh DB. 
- `#10710 <https://github.com/wazuh/wazuh/pull/10710>`_ Improved security at cluster ``zip`` filenames creation. 
- `#12390 <https://github.com/wazuh/wazuh/pull/12390>`_ The ``core/common.py`` module is refactored. 
- `#12497 <https://github.com/wazuh/wazuh/pull/12497>`_ The ``format_data_into_dictionary`` method of ``WazuhDBQuerySyscheck`` class is refactored. 
- `#11124 <https://github.com/wazuh/wazuh/pull/11124>`_ The maximum zip size that can be created while synchronizing cluster Integrity is limited.
- `#13065 <https://github.com/wazuh/wazuh/pull/13065>`_ The functions in charge of synchronizing files in the cluster are refactored. 
- `#13079 <https://github.com/wazuh/wazuh/pull/13079>`_ Changed ``MD5`` hash function to ``BLAKE2`` for cluster file comparison. 
- `#12926 <https://github.com/wazuh/wazuh/pull/12926>`_ Renamed ``wazuh-logtest`` and ``wazuh-clusterd`` scripts to follow the same scheme as the other scripts (spaces symbolized with ``_`` instead of ``-``).
- `#13741 <https://github.com/wazuh/wazuh/pull/13741>`_ Added the update field in the CPE Helper for Vulnerability Detector. 
- `#11702 <https://github.com/wazuh/wazuh/pull/11702>`_ The agents with the same ID are prevented from connecting to the manager simultaneously. 
- `#13713 <https://github.com/wazuh/wazuh/pull/13713>`_ ``wazuh-analysisd``, ``wazuh-remoted``, and ``wazuh-db`` metrics have been extended. 
- `#11753 <https://github.com/wazuh/wazuh/pull/11753>`_ ``wazuh-clusterd`` number of messages are minimized and optimized from workers to master related to ``agent-info`` tasks. 
- `#14244 <https://github.com/wazuh/wazuh/pull/14244>`_ The performance of the ``agent_groups`` CLI is improved when listing agents belonging to a group. 
- `#14475 <https://github.com/wazuh/wazuh/pull/14475>`_ Changed ``wazuh-clusterd`` binary behavior to kill any existing cluster processes when executed. 
- `#14791 <https://github.com/wazuh/wazuh/pull/14791>`_ Changed ``wazuh-clusterd`` tasks to wait asynchronously for responses coming from ``wazuh-db``. 
- `#11190 <https://github.com/wazuh/wazuh/pull/11190>`_ Use ``zlib`` for ``zip`` compression in cluster synchronization. 
- `#12241 <https://github.com/wazuh/wazuh/pull/12241>`_ Added mechanism to dynamically adjust ``zip`` size limit in Integrity sync.
- `#12409 <https://github.com/wazuh/wazuh/pull/12409>`_ Removed the unused internal option ``wazuh_db.sock_queue_size``.
- `#10940 <https://github.com/wazuh/wazuh/pull/10940>`_ Removed all the unused exceptions from the ``exceptions.py`` file.
- `#10740 <https://github.com/wazuh/wazuh/pull/10740>`_ Removed unused execute method from ``core/utils.py``. 
- `#13119 <https://github.com/wazuh/wazuh/pull/13119>`_ Removed unused ``set_user_name`` function in framework. 
- `#12370 <https://github.com/wazuh/wazuh/pull/12370>`_ Unused internal calls to ``wazuh-db`` have been deprecated. 
- `#14542 <https://github.com/wazuh/wazuh/pull/14542>`_ Debian Stretch support in Vulnerability Detector has been deprecated.
- `#15853 <https://github.com/wazuh/wazuh/pull/15853>`_ The status field in SCA is deprecated.
- `#16066 <https://github.com/wazuh/wazuh/pull/16066>`_ Agent group guessing now writes the new group directly on the master node based on the configuration hash.
- `#16098 <https://github.com/wazuh/wazuh/pull/16098>`_ Added cascading deletion of membership table entries when deleting a group.
- `#16499 <https://github.com/wazuh/wazuh/pull/16499>`_ Changed ``agent_groups`` CLI output so affected agents are not printed when deleting a group.


Wazuh agent
^^^^^^^^^^^

- `#11756 <https://github.com/wazuh/wazuh/pull/11756>`_ Added support of CPU frequency data provided by Syscollector on Raspberry Pi.
- `#11450 <https://github.com/wazuh/wazuh/pull/11450>`_ Added support for IPv6 address collection in the agent.
- `#11833 <https://github.com/wazuh/wazuh/pull/11833>`_ Added the process startup time data provided by Syscollector on macOS.
- `#11571 <https://github.com/wazuh/wazuh/pull/11571>`_ Added support for package retrieval in Syscollector for openSUSE Tumbleweed and Fedora 34.
- `#11640 <https://github.com/wazuh/wazuh/pull/11640>`_ Added the process startup time data provided by Syscollector on macOS.
- `#11796 <https://github.com/wazuh/wazuh/pull/11796>`_ Added support for package data provided by Syscollector on Solaris.
- `#10843 <https://github.com/wazuh/wazuh/pull/10843>`_ Added support for delta events in Syscollector when data gets changed. 
- `#12035 <https://github.com/wazuh/wazuh/pull/12035>`_ Added support for pre-installed Windows packages in Syscollector. 
- `#11268 <https://github.com/wazuh/wazuh/pull/11268>`_ Added support for IPv6 on agent-manager connection and enrollment. 
- `#12582 <https://github.com/wazuh/wazuh/pull/12582>`_ Added support for CIS-CAT Pro v3 and v4 to the CIS-CAT integration module.
- `#10870 <https://github.com/wazuh/wazuh/pull/10870>`_ Added support for using the Azure integration module in Linux agents. 
- `#11852 <https://github.com/wazuh/wazuh/pull/11852>`_ Added new error messages when using invalid credentials with the Azure integration.
- `#12515 <https://github.com/wazuh/wazuh/pull/12515>`_ Added reparse option to CloudWatchLogs and Google Cloud Storage integrations. 
- `#14726 <https://github.com/wazuh/wazuh/pull/14726>`_ Wazuh Agent can now be built and run on Alpine Linux. 
- `#15054 <https://github.com/wazuh/wazuh/pull/15054>`_ Added native Shuffle integration. 
- `#11587 <https://github.com/wazuh/wazuh/pull/11587>`_ Improved the free RAM data provided by Syscollector. 
- `#12752 <https://github.com/wazuh/wazuh/pull/12752>`_ The Windows installer (MSI) now provides signed DLL files.
- `#12748 <https://github.com/wazuh/wazuh/pull/12748>`_ Changed the group ownership of the ``Modulesd`` process to root.
- `#12750 <https://github.com/wazuh/wazuh/pull/12750>`_ Some parts of ``Agentd`` and Execd were refactored.
- `#10478 <https://github.com/wazuh/wazuh/pull/10478>`_ Handled new exceptions in the external integration modules.
- `#11828 <https://github.com/wazuh/wazuh/pull/11828>`_ Optimized the number of calls to DB maintenance tasks performed by the AWS integration. 
- `#12404 <https://github.com/wazuh/wazuh/pull/12404>`_ Improved the reparse setting performance by removing unnecessary queries from external integrations.
- `#12478 <https://github.com/wazuh/wazuh/pull/12478>`_ Updated and expanded Azure module logging functionality to use the ``ossec.log`` file.
- `#12647 <https://github.com/wazuh/wazuh/pull/12647>`_ Improved the error management of the Google Cloud integration. 
- `#12769 <https://github.com/wazuh/wazuh/pull/12769>`_ The ``logging`` tag in GCloud integration is deprecated. It now uses ``wazuh_modules`` debug value to set the verbosity level.
- `#12849 <https://github.com/wazuh/wazuh/pull/12849>`_ The ``last_dates.json`` file of the Azure module was deprecated in favor of a new ORM and database.
- `#12929 <https://github.com/wazuh/wazuh/pull/12929>`_ Improved the error handling in AWS integration's ``decompress_file`` method.
- `#11190 <https://github.com/wazuh/wazuh/pull/11190>`_ The compress/decompress Cluster's methods are now improved. Now we use ``zlib`` for ``zip`` compression in cluster synchronization.
- `#11354 <https://github.com/wazuh/wazuh/pull/11354>`_ The exception handling on Wazuh Agent for Windows was changed to DWARF2.
- `#14696 <https://github.com/wazuh/wazuh/pull/14696>`_ The root CA certificate for WPK upgrade has been updated. 
- `#14822 <https://github.com/wazuh/wazuh/pull/14822>`_ Agents on macOS now report the OS name as "macOS" instead of "Mac OS X".
- `#14816 <https://github.com/wazuh/wazuh/pull/14816>`_ The Systemd service stopping policy has been updated. 
- `#14793 <https://github.com/wazuh/wazuh/pull/14793>`_ Changed how the AWS module handles ``ThrottlingException`` adding default values for connection retries in case no config file is set.
- `#15404 <https://github.com/wazuh/wazuh/pull/15404>`_ The agent for Windows now verifies its libraries to prevent side loading. 
- `#14543 <https://github.com/wazuh/wazuh/pull/14543>`_ Azure and AWS credentials are deprecated in the configuration authentication option.

RESTful API
^^^^^^^^^^^

- `#10620 <https://github.com/wazuh/wazuh/pull/10620>`_ Added new API integration tests for a Wazuh environment without a cluster configuration.
- `#11731 <https://github.com/wazuh/wazuh/pull/11731>`_ Added ``wazuh-modulesd`` tags to ``GET /manager/logs`` and ``GET /cluster/{node_id}/logs`` endpoints.
- `#12438 <https://github.com/wazuh/wazuh/pull/12438>`_ Added Python decorator to soft deprecate API endpoints adding deprecation headers to their responses.
- `#12486 <https://github.com/wazuh/wazuh/pull/12486>`_ Added new exception to inform that ``/proc`` directory is not found or permissions to see its status are not granted.
- `#12362 <https://github.com/wazuh/wazuh/pull/12362>`_ Added new field and filter to ``GET /agents`` response to retrieve agent groups configuration synchronization status.
- `#12498 <https://github.com/wazuh/wazuh/pull/12498>`_ Added agent groups configuration synchronization status to ``GET /agents/summary/status`` endpoint. 
- `#11171 <https://github.com/wazuh/wazuh/pull/11171>`_ Added JSON log handling.
- `#12029 <https://github.com/wazuh/wazuh/pull/12029>`_ Added integration tests for IPv6 agent's registration.
- `#12887 <https://github.com/wazuh/wazuh/pull/12887>`_ Enable ordering count in ``/groups`` endpoints by Agents.
- `#12092 <https://github.com/wazuh/wazuh/pull/12092>`_ Added a hash to API logs to identify users logged in with authorization context. 
- `#14295 <https://github.com/wazuh/wazuh/pull/14295>`_ Added logic to API logger to renew its streams if needed on every request.
- `#14401 <https://github.com/wazuh/wazuh/pull/14401>`_ Added ``GET /manager/daemons/stats`` and ``GET /cluster/{node_id}/daemons/stats`` API endpoints. 
- `#14464 <https://github.com/wazuh/wazuh/pull/14464>`_ Added ``GET /agents/{agent_id}/daemons/stats`` API endpoint. 
- `#14471 <https://github.com/wazuh/wazuh/pull/14471>`_ Added the possibility to get the configuration of the ``wazuh-db`` component in active configuration endpoints.
- `#15084 <https://github.com/wazuh/wazuh/pull/15084>`_ Added distinct and select parameters to ``GET /sca/{agent_id}`` and ``GET /sca/{agent_id}/checks/{policy_id}`` endpoints.
- `#15290 <https://github.com/wazuh/wazuh/pull/15290>`_ Added new endpoint to run vulnerability detector on-demand scans (``PUT /vulnerability``).
- `#11341 <https://github.com/wazuh/wazuh/pull/11341>`_ Improved ``GET /cluster/healthcheck`` endpoint and ``cluster_control -i more`` CLI call in loaded cluster environments. 
- `#12551 <https://github.com/wazuh/wazuh/pull/12551>`_ Changed API version and ``upgrade_version`` filters to work with different version formats.
- `#9413 <https://github.com/wazuh/wazuh/pull/9413>`_ Renamed ``GET /agents/{agent_id}/group/is_sync`` endpoint to ``GET /agents/group/is_sync`` and added new ``agents_list`` parameter.
- `#10397 <https://github.com/wazuh/wazuh/pull/10397>`_ Added ``POST /security/user/authenticate`` endpoint and marked ``GET /security/user/authenticate`` endpoint as deprecated.
- `#12526 <https://github.com/wazuh/wazuh/pull/12526>`_ Adapted framework code to ``agent-group`` changes to use the new ``wazuh-db`` commands.
- `#13791 <https://github.com/wazuh/wazuh/pull/13791>`_ Updated default timeout for ``GET /mitre/software`` to avoid timing out in slow environments after the MITRE DB update to v11.2.
- `#14119 <https://github.com/wazuh/wazuh/pull/14119>`_ Changed API settings related to remote commands. The ``remote_commands`` section will be held within ``upload_wazuh_configuration``.
- `#14233 <https://github.com/wazuh/wazuh/pull/14233>`_ Improved API unauthorized responses to be more accurate.
- `#14259 <https://github.com/wazuh/wazuh/pull/14259>`_ Updated framework functions that communicate with the request socket to use remote instead.
- `#14766 <https://github.com/wazuh/wazuh/pull/14766>`_ Improved parameter validation for API endpoints that require component and configuration parameters.
- `#15017 <https://github.com/wazuh/wazuh/pull/15017>`_ Improved ``GET /sca/{agent_id}/checks/{policy_id}`` API endpoint performance.
- `#15334 <https://github.com/wazuh/wazuh/pull/15334>`_ Improved exception handling when connecting to Wazuh sockets.
- `#15671 <https://github.com/wazuh/wazuh/pull/15671>`_ Modified ``_group_names and _group_names_or_all`` regexes to avoid invalid group names.
- `#15747 <https://github.com/wazuh/wazuh/pull/15747>`_ Changed ``GET /sca/{agent_id}/checks/{policy_id}`` endpoint filters and response to remove the ``status`` field. 
- `#12595 <https://github.com/wazuh/wazuh/pull/12595>`_ Removed ``never_connected`` agent status limitation when assigning agents to groups.
- `#12053 <https://github.com/wazuh/wazuh/pull/12053>`_ Removed null remediations from failed API responses.
- `#12365 <https://github.com/wazuh/wazuh/pull/12365>`_ ``GET /agents/{agent_id}/group/is_sync`` endpoint is deprecated.

.. _ruleset_whats_new:

Ruleset
^^^^^^^

- `#13594 <https://github.com/wazuh/wazuh/pull/13594>`_ Added support for new sysmon events. 
- `#13595 <https://github.com/wazuh/wazuh/pull/13595>`_ Added new detection rules using Sysmon ID 1 events. 
- `#13596 <https://github.com/wazuh/wazuh/pull/13596>`_ Added new detection rules using Sysmon ID 3 events. 
- `#13630 <https://github.com/wazuh/wazuh/pull/13630>`_ Added new detection rules using Sysmon ID 7 events.
- `#13637 <https://github.com/wazuh/wazuh/pull/13637>`_ Added new detection rules using Sysmon ID 8 events.
- `#13639 <https://github.com/wazuh/wazuh/pull/13639>`_ Added new detection rules using Sysmon ID 10 events.
- `#13631 <https://github.com/wazuh/wazuh/pull/13631>`_ Added new detection rules using Sysmon ID 11 events.
- `#13636 <https://github.com/wazuh/wazuh/pull/13636>`_ Added new detection rules using Sysmon ID 13 events.
- `#13673 <https://github.com/wazuh/wazuh/pull/13673>`_ Added new detection rules using Sysmon ID 20 events.
- `#13638 <https://github.com/wazuh/wazuh/pull/13638>`_ Added new PowerShell ScriptBlock detection rules.
- `#15157 <https://github.com/wazuh/wazuh/pull/15157>`_ Added HPUX 11i SCA policies using bastille and without bastille.
- `#15072 <https://github.com/wazuh/wazuh/pull/15072>`_ Updated ruleset according to new API log changes when the user is logged in with authorization context.
- `#13579 <https://github.com/wazuh/wazuh/pull/13579>`_ Updated ``0580-win-security_rules.xml`` rules.
- `#13622 <https://github.com/wazuh/wazuh/pull/13622>`_ Updated Wazuh MITRE ATT&CK database to version 11.3.
- `#13633 <https://github.com/wazuh/wazuh/pull/13633>`_ Updated detection rules in ``0840-win_event_channel.xml``.
- `#15070 <https://github.com/wazuh/wazuh/pull/15070>`_ SCA policy for Ubuntu Linux 20.04 rework.
- `#15051 <https://github.com/wazuh/wazuh/pull/15051>`_ Updated Ubuntu Linux 22.04 SCA Policy with CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0.

Other
^^^^^

- `#12733 <https://github.com/wazuh/wazuh/pull/12733>`_ Added unit tests to the component in ``Analysisd`` that extracts the IP address from events.
- `#12518 <https://github.com/wazuh/wazuh/pull/12518>`_ Added ``python-json-logger`` dependency.
- `#10773 <https://github.com/wazuh/wazuh/pull/10773>`_ The Ruleset test suite is prevented from restarting the manager.
- `#14839 <https://github.com/wazuh/wazuh/pull/14839>`_ The pthread's ``rwlock`` was replaced with a FIFO-queueing read-write lock.
- `#15809 <https://github.com/wazuh/wazuh/pull/15809>`_ Updated Python dependency certifi to 2022.12.7.
- `#15896 <https://github.com/wazuh/wazuh/pull/15896>`_ Updated Python dependency future to 0.18.3.
- `#16317 <https://github.com/wazuh/wazuh/pull/16317>`_ Updated Werkzeug to 2.2.3. 
- `#16317 <https://github.com/wazuh/wazuh/pull/16317>`_ Updated Flask to 2.0.0. 
- `#16317 <https://github.com/wazuh/wazuh/pull/16317>`_ Updated itsdangerous to 2.0.0. 
- `#16317 <https://github.com/wazuh/wazuh/pull/16317>`_ Updated Jinja2 to 3.0.0. 
- `#16317 <https://github.com/wazuh/wazuh/pull/16317>`_ Updated MarkupSafe to 2.1.2. 


Wazuh dashboard
^^^^^^^^^^^^^^^

- `#4323 <https://github.com/wazuh/wazuh-kibana-app/pull/4323>`_ Added the option to sort by the agents count in the group table.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ `#5143 <https://github.com/wazuh/wazuh-kibana-app/pull/5143>`_ `#5177 <https://github.com/wazuh/wazuh-kibana-app/pull/5177>`_ Added agent synchronization status in the agent module.
- `#4739 <https://github.com/wazuh/wazuh-kibana-app/pull/4739>`_ The input name was added so that when the user adds a value, the variable ``WAZUH_AGENT_NAME`` with its value appears in the installation command.
- `#4512 <https://github.com/wazuh/wazuh-kibana-app/pull/4512>`_ Redesign the SCA table from the agent's dashboard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ The plugin setting description displayed in the UI, and the configuration file are enhanced.
- `#4503 <https://github.com/wazuh/wazuh-kibana-app/pull/4503>`_ `#4785 <https://github.com/wazuh/wazuh-kibana-app/pull/4785>`_ Added validation to the plugin settings in the form of ``Settings/Configuration`` and the endpoint to update the plugin configuration.
- `#4505 <https://github.com/wazuh/wazuh-kibana-app/pull/4505>`_ `#4798 <https://github.com/wazuh/wazuh-kibana-app/pull/4798>`_ `#4805 <https://github.com/wazuh/wazuh-kibana-app/pull/4805>`_ Added new plugin settings to customize the header and footer on the PDF reports.
- `#4507 <https://github.com/wazuh/wazuh-kibana-app/pull/4507>`_ Added a new plugin setting to enable or disable the customization.
- `#4504 <https://github.com/wazuh/wazuh-kibana-app/pull/4504>`_ Added the ability to upload an image for the ``customization.logo.*`` settings in ``Settings/Configuration``.
- `#4867 <https://github.com/wazuh/wazuh-kibana-app/pull/4867>`_ Added macOS version to wizard deploy agent.
- `#4833 <https://github.com/wazuh/wazuh-kibana-app/pull/4833>`_ Added PowerPC architecture in Red Hat 7, in the section **Deploy new agent**.
- `#4831 <https://github.com/wazuh/wazuh-kibana-app/pull/4831>`_ Added a centralized service to handle the requests.
- `#4873 <https://github.com/wazuh/wazuh-kibana-app/pull/4873>`_ Added ``data-test-subj`` create policy.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Added extra steps message and a new command for Windows XP and Windows server 2008, added Alpine agent with all its steps.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Deploy new agent section: Added link for additional steps to Alpine OS.
- `#4970 <https://github.com/wazuh/wazuh-kibana-app/pull/4970>`_ Added file saving conditions in File Editor.
- `#5021 <https://github.com/wazuh/wazuh-kibana-app/pull/5021>`_ `#5028 <https://github.com/wazuh/wazuh-kibana-app/pull/5028>`_ Added character validation to avoid invalid agent names in the section **Deploy new agent**. 
- `#5063 <https://github.com/wazuh/wazuh-kibana-app/pull/5063>`_ Added default selected options in Deploy Agent page. 
- `#5166 <https://github.com/wazuh/wazuh-kibana-app/pull/5166>`_ Added the server address and Wazuh protocol definition in the **Deploy new agent** section. 
- `#4103 <https://github.com/wazuh/wazuh-kibana-app/pull/4103>`_ Changed the HTTP verb from ``GET`` to ``POST`` in the requests to login to the Wazuh API.
- `#4376 <https://github.com/wazuh/wazuh-kibana-app/pull/4376>`_ `#5071 <https://github.com/wazuh/wazuh-kibana-app/pull/5071>`_ `5131 <https://github.com/wazuh/wazuh-kibana-app/pull/5131>`_ Improved alerts summary performance.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ `#5076 <https://github.com/wazuh/wazuh-kibana-app/pull/5076>`_ Improved ``Agents Overview`` performance.
- `#4529 <https://github.com/wazuh/wazuh-kibana-app/pull/4529>`_ `#4964 <https://github.com/wazuh/wazuh-kibana-app/pull/4964>`_ Improved the message displayed when a version mismatches between the Wazuh API and the Wazuh APP.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ Independently load each dashboard from the ``Agents Overview`` page.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ The endpoint ``/agents/summary/status`` response was adapted. 
- `#4458 <https://github.com/wazuh/wazuh-kibana-app/pull/4458>`_ Updated and added operating systems, versions, architectures commands of Install and enroll the agent and commands of Start the agent in the deploy new agent section.
- `#4776 <https://github.com/wazuh/wazuh-kibana-app/pull/4776>`_ `#4954 <https://github.com/wazuh/wazuh-kibana-app/pull/4954>`_ Added cluster's IP and protocol as suggestions in the agent deployment wizard.
- `#4851 <https://github.com/wazuh/wazuh-kibana-app/pull/4851>`_ Show the OS name and OS version in the agent installation wizard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ Changed the endpoint that updates the plugin configuration to support multiple settings.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Updated the ``winston`` dependency to ``3.5.1``.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Updated the ``pdfmake`` dependency to ``0.2.6``.
- `#4992 <https://github.com/wazuh/wazuh-kibana-app/pull/4992>`_ The button to export the app logs is now disabled when there are no results instead of showing an error toast.
- `#5031 <https://github.com/wazuh/wazuh-kibana-app/pull/5031>`_ Unify the SCA check result label name.
- `#5062 <https://github.com/wazuh/wazuh-kibana-app/pull/5062>`_ Updated ``mocha`` dependency to ``10.1.0``.
- `#5062 <https://github.com/wazuh/wazuh-kibana-app/pull/5062>`_ Updated ``pdfmake`` dependency to ``0.2.7``.
- `#4491 <https://github.com/wazuh/wazuh-kibana-app/pull/4491>`_ Removed custom styles from Kibana 7.9.0.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Removed the ``angular-chart.js`` dependency.
- `#5062 <https://github.com/wazuh/wazuh-kibana-app/pull/5062>`_ `#5089 <https://github.com/wazuh/wazuh-kibana-app/pull/5089>`_ Remove the ``pug-loader`` dependency.

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `#4323 <https://github.com/wazuh/wazuh-kibana-app/pull/4323>`_ Added the option to sort by the agents count in the group table.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ `#5143 <https://github.com/wazuh/wazuh-kibana-app/pull/5143>`_ `#5177 <https://github.com/wazuh/wazuh-kibana-app/pull/5177>`_ Added agent synchronization status in the agent module.
- `#4739 <https://github.com/wazuh/wazuh-kibana-app/pull/4739>`_ Added the ability to set the name of the agent using the deployment wizard.
- `#4739 <https://github.com/wazuh/wazuh-kibana-app/pull/4739>`_ The input name was added so that when the user adds a value, the variable ``WAZUH_AGENT_NAME`` with its value appears in the installation command.
- `#4512 <https://github.com/wazuh/wazuh-kibana-app/pull/4512>`_ Redesign the SCA table from the agent's dashboard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ The plugin setting description displayed in the UI, and the configuration file are enhanced.
- `#4503 <https://github.com/wazuh/wazuh-kibana-app/pull/4503>`_ `#4785 <https://github.com/wazuh/wazuh-kibana-app/pull/4785>`_ Added validation to the plugin settings in the form of ``Settings/Configuration`` and the endpoint to update the plugin configuration.
- `#4505 <https://github.com/wazuh/wazuh-kibana-app/pull/4505>`_ `#4798 <https://github.com/wazuh/wazuh-kibana-app/pull/4798>`_ `#4805 <https://github.com/wazuh/wazuh-kibana-app/pull/4805>`_ Added new plugin settings to customize the header and footer on the PDF reports.
- `#4507 <https://github.com/wazuh/wazuh-kibana-app/pull/4507>`_ Added a new plugin setting to enable or disable the customization.
- `#4504 <https://github.com/wazuh/wazuh-kibana-app/pull/4504>`_ Added the ability to upload an image for the ``customization.logo.*`` settings in ``Settings/Configuration``.
- `#4867 <https://github.com/wazuh/wazuh-kibana-app/pull/4867>`_ Added macOS version to wizard deploy agent.
- `#4833 <https://github.com/wazuh/wazuh-kibana-app/pull/4833>`_ Added PowerPC architecture in Red Hat 7, in the section **Deploy new agent**.
- `#4831 <https://github.com/wazuh/wazuh-kibana-app/pull/4831>`_ Added a centralized service to handle the requests.
- `#4873 <https://github.com/wazuh/wazuh-kibana-app/pull/4873>`_ Added ``data-test-subj`` create policy.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Added extra steps message and a new command for Windows XP and Windows Server 2008, added Alpine agent with all its steps.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Deploy new agent section: Added link for additional steps to Alpine os.
- `#4970 <https://github.com/wazuh/wazuh-kibana-app/pull/4970>`_ Added file saving conditions in File Editor.
- `#5021 <https://github.com/wazuh/wazuh-kibana-app/pull/5021>`_ `#5028 <https://github.com/wazuh/wazuh-kibana-app/pull/5028>`_ Added character validation to avoid invalid agent names in the section **Deploy new agent**. 
- `#5063 <https://github.com/wazuh/wazuh-kibana-app/pull/5063>`_ Added default selected options in Deploy Agent page.
- `#5166 <https://github.com/wazuh/wazuh-kibana-app/pull/5166>`_ Added the server address and Wazuh protocol definition in the **Deploy new agent** section. 
- `#4103 <https://github.com/wazuh/wazuh-kibana-app/pull/4103>`_ Changed the HTTP verb from ``GET`` to ``POST`` in the requests to login to the Wazuh API.
- `#4376 <https://github.com/wazuh/wazuh-kibana-app/pull/4376>`_ `#5071 <https://github.com/wazuh/wazuh-kibana-app/pull/5071>`_ `#5131 <https://github.com/wazuh/wazuh-kibana-app/pull/5131>`_ Improved alerts summary performance.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ `#5076 <https://github.com/wazuh/wazuh-kibana-app/pull/5076>`_ Improved ``Agents Overview`` performance.
- `#4529 <https://github.com/wazuh/wazuh-kibana-app/pull/4529>`_ `#4964 <https://github.com/wazuh/wazuh-kibana-app/pull/4964>`_ Improved the message displayed when a version mismatches between the Wazuh API and the Wazuh APP.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ Independently load each dashboard from the ``Agents Overview`` page.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ The endpoint ``/agents/summary/status`` response was adapted. 
- `#4458 <https://github.com/wazuh/wazuh-kibana-app/pull/4458>`_ Updated and added operating systems, versions, architectures commands of Install and enroll the agent and commands of Start the agent in the deploy new agent section.
- `#4776 <https://github.com/wazuh/wazuh-kibana-app/pull/4776>`_ `#4954 <https://github.com/wazuh/wazuh-kibana-app/pull/4954>`_ Added cluster's IP and protocol as suggestions in the agent deployment wizard.
- `#4851 <https://github.com/wazuh/wazuh-kibana-app/pull/4851>`_ Show the OS name and OS version in the agent installation wizard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ Changed the endpoint that updates the plugin configuration to support multiple settings.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Updated the ``winston`` dependency to ``3.5.1``.
- `#4992 <https://github.com/wazuh/wazuh-kibana-app/pull/4992>`_ The button to export the app logs is now disabled when there are no results, instead of showing an error toast.
- `#5062 <https://github.com/wazuh/wazuh-kibana-app/pull/5062>`_ Updated ``mocha`` dependency to ``10.1.0``.
- `#5031 <https://github.com/wazuh/wazuh-kibana-app/pull/5031>`_ Unify the SCA check result label name.
- `#5014 <https://github.com/wazuh/wazuh-kibana-app/pull/5014>`_ Removed the ``angular-chart.js`` dependency.
- `#5062 <https://github.com/wazuh/wazuh-kibana-app/pull/5062>`_ Removed the ``pug-loader`` dependency.
- `#5102 <https://github.com/wazuh/wazuh-kibana-app/pull/5102>`_ Removed unused file related to agent menu.

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `#4323 <https://github.com/wazuh/wazuh-kibana-app/pull/4323>`_ Added the option to sort by the agents count in the group table.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ `#5143 <https://github.com/wazuh/wazuh-kibana-app/pull/5143>`_ `#5177 <https://github.com/wazuh/wazuh-kibana-app/pull/5177>`_ Added agent synchronization status in the agent module.
- `#4739 <https://github.com/wazuh/wazuh-kibana-app/pull/4739>`_ The input name was added so that when the user adds a value, the variable ``WAZUH_AGENT_NAME`` with its value appears in the installation command.
- `#4512 <https://github.com/wazuh/wazuh-kibana-app/pull/4512>`_ Redesign the SCA table from the agent's dashboard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ The plugin setting description displayed in the UI, and the configuration file are enhanced.
- `#4503 <https://github.com/wazuh/wazuh-kibana-app/pull/4503>`_ `#4785 <https://github.com/wazuh/wazuh-kibana-app/pull/4785>`_ Added validation to the plugin settings in the form of ``Settings/Configuration`` and the endpoint to update the plugin configuration.
- `#4505 <https://github.com/wazuh/wazuh-kibana-app/pull/4505>`_ `#4798 <https://github.com/wazuh/wazuh-kibana-app/pull/4798>`_ `#4805 <https://github.com/wazuh/wazuh-kibana-app/pull/4805>`_ Added new plugin settings to customize the header and footer on the PDF reports.
- `#4507 <https://github.com/wazuh/wazuh-kibana-app/pull/4507>`_ Added a new plugin setting to enable or disable the customization.
- `#4504 <https://github.com/wazuh/wazuh-kibana-app/pull/4504>`_ Added the ability to upload an image for the ``customization.logo.*`` settings in ``Settings/Configuration``.
- `#4867 <https://github.com/wazuh/wazuh-kibana-app/pull/4867>`_ Added macOS version to wizard deploy agent.
- `#4833 <https://github.com/wazuh/wazuh-kibana-app/pull/4833>`_ Added PowerPC architecture in Red Hat 7, in the section **Deploy new agent**.
- `#4831 <https://github.com/wazuh/wazuh-kibana-app/pull/4831>`_ Added a centralized service to handle the requests.
- `#4873 <https://github.com/wazuh/wazuh-kibana-app/pull/4873>`_ Added ``data-test-subj`` create policy.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Added extra steps message and a new command for Windows XP and Windows server 2008, added Alpine agent with all its steps.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Deploy new agent section: Added link for additional steps to Alpine os.
- `#4970 <https://github.com/wazuh/wazuh-kibana-app/pull/4970>`_ Added file saving conditions in File Editor.
- `#5021 <https://github.com/wazuh/wazuh-kibana-app/pull/5021>`_ `#5028 <https://github.com/wazuh/wazuh-kibana-app/pull/5028>`_ Added character validation to avoid invalid agent names in the section **Deploy new agent**. 
- `#5063 <https://github.com/wazuh/wazuh-kibana-app/pull/5063>`_ Added default selected options in Deploy Agent page.
- `#5166 <https://github.com/wazuh/wazuh-kibana-app/pull/5166>`_ Added the server address and Wazuh protocol definition in the **Deploy new agent** section. 
- `#4103 <https://github.com/wazuh/wazuh-kibana-app/pull/4103>`_ Changed the HTTP verb from ``GET`` to ``POST`` in the requests to login to the Wazuh API.
- `#4376 <https://github.com/wazuh/wazuh-kibana-app/pull/4376>`_ `#5071 <https://github.com/wazuh/wazuh-kibana-app/pull/5071>`_ `#5131 <https://github.com/wazuh/wazuh-kibana-app/pull/5131>`_ Improved alerts summary performance.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ `#5076 <https://github.com/wazuh/wazuh-kibana-app/pull/5076>`_ Improved ``Agents Overview`` performance.
- `#4529 <https://github.com/wazuh/wazuh-kibana-app/pull/4529>`_ `#4964 <https://github.com/wazuh/wazuh-kibana-app/pull/4964>`_ Improved the message displayed when a version mismatches between the Wazuh API and the Wazuh APP.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ Independently load each dashboard from the ``Agents Overview`` page.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ The endpoint ``/agents/summary/status`` response was adapted. 
- `#4458 <https://github.com/wazuh/wazuh-kibana-app/pull/4458>`_ Updated and added operating systems, versions, architectures commands of Install and enroll the agent and commands of Start the agent in the deploy new agent section.
- `#4776 <https://github.com/wazuh/wazuh-kibana-app/pull/4776>`_ `#4954 <https://github.com/wazuh/wazuh-kibana-app/pull/4954>`_ Added cluster's IP and protocol as suggestions in the agent deployment wizard.
- `#4851 <https://github.com/wazuh/wazuh-kibana-app/pull/4851>`_ Show the OS name and OS version in the agent installation wizard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ Changed the endpoint that updates the plugin configuration to support multiple settings.
- `#4972 <https://github.com/wazuh/wazuh-kibana-app/pull/4972>`_ The button to export the app logs is now disabled when there are no results instead of showing an error toast.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Updated the ``winston`` dependency to ``3.5.1``.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Updated the ``pdfmake`` dependency to ``0.2.6``.
- `#4992 <https://github.com/wazuh/wazuh-kibana-app/pull/4992>`_ The button to export the app logs is now disabled when there are no results instead of showing an error toast.
- `#5062 <https://github.com/wazuh/wazuh-kibana-app/pull/5062>`_ Updated ``mocha`` dependency to ``10.1.0``.
- `#5062 <https://github.com/wazuh/wazuh-kibana-app/pull/5062>`_ Updated ``pdfmake`` dependency to ``0.2.7``.
- `#5031 <https://github.com/wazuh/wazuh-kibana-app/pull/5031>`_ Unify the SCA check result label name.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Removed the ``angular-chart.js`` dependency.
- `#5062 <https://github.com/wazuh/wazuh-kibana-app/pull/5062>`_ Removed the ``pug-loader`` dependency.
- `#5103 <https://github.com/wazuh/wazuh-kibana-app/pull/5103>`_ Removed unused file related to agent menu. 

Wazuh Splunk app
^^^^^^^^^^^^^^^^

- `#1355 <https://github.com/wazuh/wazuh-splunk/pull/1355>`_ Added agent's synchronization statistics.
- `#1355 <https://github.com/wazuh/wazuh-splunk/pull/1355>`_ Updated the response handlers for the ``/agents/summary/status`` endpoint.


Packages 
^^^^^^^^
- `#1980 <https://github.com/wazuh/wazuh-packages/pull/1980>`_ The Wazuh dashboard is now based on OpenSearch dashboards 2.4.1.  
- `#1979 <https://github.com/wazuh/wazuh-packages/pull/1979>`_ The Wazuh indexer is now based on OpenSearch 2.4.1. 
- `#1715 <https://github.com/wazuh/wazuh-packages/pull/1715>`_ Added the Alpine package build.    
- `#1770 <https://github.com/wazuh/wazuh-packages/pull/1770>`_ The ``wazuh-certs-tool.sh`` now supports multiple IP addresses for each node. 
- `#1167 <https://github.com/wazuh/wazuh-packages/pull/1167>`_ Added the Azure wodle files to the Solaris 11 and RPM agent SPEC files.  
- `#1379 <https://github.com/wazuh/wazuh-packages/pull/1379>`_ Added the new ``wodles/gcloud`` files and folders to the Solaris 11 SPEC file.
- `#1453 <https://github.com/wazuh/wazuh-packages/pull/1453>`_ Added ``orm.py`` to the Solaris 11 SPEC file.
- `#1299 <https://github.com/wazuh/wazuh-packages/pull/1299>`_ Applied the changes required for the new ``agent-group`` mechanism. 
- `#1569 <https://github.com/wazuh/wazuh-packages/pull/1569>`_ Removed unnecessary plugins from the default Wazuh dashboard. 
- `#1602 <https://github.com/wazuh/wazuh-packages/pull/1602>`_ Simplified the Splunk packages builder. 
- `#1687 <https://github.com/wazuh/wazuh-packages/pull/1687>`_ Installed ``open-vm-tools`` in the OVA. 
- `#1699 <https://github.com/wazuh/wazuh-packages/pull/1699>`_ Added a custom path option for the Wazuh indexer packages. 
- `#1751 <https://github.com/wazuh/wazuh-packages/pull/1751>`_ Updated the Wazuh dashboard loading screen. 
- `#1823 <https://github.com/wazuh/wazuh-packages/pull/1823>`_ The ``indexer-security-init.sh`` now accepts DNS names as network hosts.
- `#1154 <https://github.com/wazuh/wazuh-packages/pull/1154>`_ The Wazuh passwords tool is now able to obtain the IP address of an interface from the configuration file.
- `#1839 <https://github.com/wazuh/wazuh-packages/pull/1839>`_ The Wazuh installation assistant now uses ``apt-get`` instead of ``apt``.
- `#1831 <https://github.com/wazuh/wazuh-packages/pull/1831>`_ The base creation is now integrated within the ``build_packages.sh`` script.
- `#1838 <https://github.com/wazuh/wazuh-packages/pull/1838>`_ Changed the internal directory in the base container.
- `#1473 <https://github.com/wazuh/wazuh-packages/pull/1473>`_ Changed method from ``GET`` to ``POST`` in the API login requests.
- `#1882 <https://github.com/wazuh/wazuh-packages/pull/1882>`_ Added changes to distribute the ``libstdc++`` and ``libgcc_s`` to wazuh-packages. 
- `#1890 <https://github.com/wazuh/wazuh-packages/pull/1890>`_ Updated permissions in the Wazuh indexer and Wazuh dashboard. 
- `#1876 <https://github.com/wazuh/wazuh-packages/pull/1876>`_ Removed the deprecated ``apt-key`` utility from the Wazuh installation assistant.
- `#1904 <https://github.com/wazuh/wazuh-packages/pull/1904>`_ Parameterized the Wazuh dashboard script. 
- `#1929 <https://github.com/wazuh/wazuh-packages/pull/1929>`_ Added the Wazuh dashboard light loading screen logo in dark mode. 
- `#1930 <https://github.com/wazuh/wazuh-packages/pull/1930>`_ Added the *Distribution version matrix* section in the wazuh-packages ``README.md`` file.
- `#1961 <https://github.com/wazuh/wazuh-packages/pull/1961>`_ Added ``ossec.conf`` file generation and improved SPECs on the Alpine packages.
- `#1343 <https://github.com/wazuh/wazuh-packages/pull/1343>`_ Signed the Windows dynamic link library files.
 


Resolved issues
---------------

This release resolves known issues, such as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#10873 <https://github.com/wazuh/wazuh/pull/10873>`_             Fixed ``wazuh-dbd`` halt procedure.
`#12098 <https://github.com/wazuh/wazuh/pull/12098>`_             Fixed compilation warnings in the manager. 
`#12516 <https://github.com/wazuh/wazuh/pull/12516>`_             Fixed a bug in the manager that did not send shared folders correctly to agents belonging to multiple groups. 
`#12834 <https://github.com/wazuh/wazuh/pull/12834>`_             Fixed the Active Response decoders to support back the top entries for source IP in reports.
`#13338 <https://github.com/wazuh/wazuh/pull/13338>`_             Fixed the feed update interval option of Vulnerability Detector for the JSON Red Hat feed. 
`#12127 <https://github.com/wazuh/wazuh/pull/12127>`_             Fixed several code flaws in the Python framework. 
`#10635 <https://github.com/wazuh/wazuh/pull/10635>`_             Fixed code flaw regarding the use of XML package. 
`#10636 <https://github.com/wazuh/wazuh/pull/10636>`_             Fixed code flaw regarding permissions at group directories. 
`#10544 <https://github.com/wazuh/wazuh/pull/10544>`_             Fixed code flaw regarding temporary directory names. 
`#11951 <https://github.com/wazuh/wazuh/pull/11951>`_             Fixed code flaw regarding ``try``, ``except`` and ``pass`` code block in ``wazuh-clusterd``. 
`#10782 <https://github.com/wazuh/wazuh/pull/10782>`_             Fixed framework datetime transformations to UTC. 
`#11866 <https://github.com/wazuh/wazuh/pull/11866>`_             Fixed a cluster error when Master-Worker tasks were not properly stopped after an exception occurred in one or both parts.
`#12831 <https://github.com/wazuh/wazuh/pull/12831>`_             Fixed cluster logger issue printing ``NoneType: None`` in error logs.
`#13419 <https://github.com/wazuh/wazuh/pull/13419>`_             Fixed unhandled cluster error when reading a malformed configuration. 
`#13368 <https://github.com/wazuh/wazuh/pull/13368>`_             Fixed framework unit test failures when run by the root user. 
`#13405 <https://github.com/wazuh/wazuh/pull/13405>`_             Fixed a memory leak in ``analysisd`` when parsing a disabled Active Response. 
`#13892 <https://github.com/wazuh/wazuh/pull/13892>`_             ``wazuh-db`` is prevented from deleting queue/diff when cleaning databases. 
`#14981 <https://github.com/wazuh/wazuh/pull/14981>`_             Fixed multiple data race conditions in Remoted reported by ThreadSanitizer.
`#15151 <https://github.com/wazuh/wazuh/pull/15151>`_             Fixed ``aarch64`` OS collection in Remoted to allow WPK upgrades. 
`#15165 <https://github.com/wazuh/wazuh/pull/15165>`_             Fixed a race condition in Remoted that was blocking agent connections. 
`#13531 <https://github.com/wazuh/wazuh/pull/13531>`_             Fixed Virustotal integration to support non UTF-8 characters.
`#14922 <https://github.com/wazuh/wazuh/pull/14922>`_             Fixed a bug masking as Timeout any error that might occur while waiting to receive files in the cluster.
`#15876 <https://github.com/wazuh/wazuh/pull/15876>`_             Fixed a read buffer overflow in ``wazuh-authd`` when parsing requests. 
`#16012 <https://github.com/wazuh/wazuh/pull/16012>`_             Applied workaround for ``bpo-46309`` used in a cluster to ``wazuh-db`` communication.
`#16233 <https://github.com/wazuh/wazuh/pull/16233>`_             Let the database module synchronize the agent group data before assignments.
`#16321 <https://github.com/wazuh/wazuh/pull/16321>`_             Fixed memory leaks in wazuh-analysisd when parsing and matching rules. 
==============================================================    =============

Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#7687 <https://github.com/wazuh/wazuh/pull/7687>`_               Fixed collection of maximum user data length.
`#10772 <https://github.com/wazuh/wazuh/pull/10772>`_             Fixed missing fields in Syscollector on Windows 10.
`#11227 <https://github.com/wazuh/wazuh/pull/11227>`_             Fixed the process startup time data provided by Syscollector on Linux.
`#11837 <https://github.com/wazuh/wazuh/pull/11837>`_             Fixed network data reporting by Syscollector related to tunnel or VPN interfaces.
`#12066 <https://github.com/wazuh/wazuh/pull/12066>`_             V9FS file system is skipped at Rootcheck to prevent false positives on WSL.
`#9067 <https://github.com/wazuh/wazuh/pull/9067>`_               Fixed double file handle closing in Logcollector on Windows. 
`#11949 <https://github.com/wazuh/wazuh/pull/11949>`_             Fixed a bug in Syscollector that may prevent the agent from stopping when the manager connection is lost.
`#12148 <https://github.com/wazuh/wazuh/pull/12148>`_             Fixed internal exception handling issues on Solaris 10.
`#12300 <https://github.com/wazuh/wazuh/pull/12300>`_             Fixed duplicate error message IDs in the log. 
`#12691 <https://github.com/wazuh/wazuh/pull/12691>`_             Fixed compilation warnings in the agent.
`#12147 <https://github.com/wazuh/wazuh/pull/12147>`_             Fixed the ``skip_on_error`` parameter of the AWS integration module, which was set to ``True`` by default.
`#12381 <https://github.com/wazuh/wazuh/pull/12381>`_             Fixed AWS DB maintenance with Load Balancer Buckets.
`#12650 <https://github.com/wazuh/wazuh/pull/12650>`_             Fixed AWS integration's ``test_config_format_created_date`` unit test. 
`#12630 <https://github.com/wazuh/wazuh/pull/12630>`_             Fixed ``created_date`` field for LB and Umbrella integrations.
`#13185 <https://github.com/wazuh/wazuh/pull/13185>`_             Fixed AWS integration database maintenance error management.
`#13674 <https://github.com/wazuh/wazuh/pull/13674>`_             The default delay at GitHub integration has been increased to 30 seconds. 
`#14706 <https://github.com/wazuh/wazuh/pull/14706>`_             Logcollector has been fixed to allow locations containing colons (:). 
`#13835 <https://github.com/wazuh/wazuh/pull/13835>`_             Fixed system architecture reporting in Syscollector on Apple Silicon devices.
`#14190 <https://github.com/wazuh/wazuh/pull/14190>`_             The C++ standard library and the GCC runtime library are now included with Wazuh.
`#13877 <https://github.com/wazuh/wazuh/pull/13877>`_             Fixed missing inventory cleaning message in Syscollector.
`#15322 <https://github.com/wazuh/wazuh/pull/15322>`_             Fixed WPK upgrade issue on Windows agents due to process locking. 
`#13044 <https://github.com/wazuh/wazuh/pull/13044>`_             Fixed FIM injection vulnerability when using ``prefilter_cmd`` option.
`#14525 <https://github.com/wazuh/wazuh/pull/14525>`_             Fixed the parse of ALB logs splitting ``client_port``, ``target_port`` and ``target_port_list`` in separated ``ip`` and ``port`` for each key.
`#15335 <https://github.com/wazuh/wazuh/pull/15335>`_             Fixed a bug that prevents processing Macie logs with problematic ipGeolocation values.
`#15584 <https://github.com/wazuh/wazuh/pull/15584>`_             Fixed GCP integration module error messages.
`#15575 <https://github.com/wazuh/wazuh/pull/15575>`_             Fixed an error that prevented the agent on Windows from stopping correctly.
`#16140 <https://github.com/wazuh/wazuh/pull/16140>`_             Fixed Azure integration credentials link.
==============================================================    =============

RESTful API
^^^^^^^^^^^

============================================================================================================    =============
Reference                                                                                                       Description
============================================================================================================    =============
`#12302 <https://github.com/wazuh/wazuh/pull/12302>`_                                                           Fixed copy functions used for the backup files and upload endpoints to prevent incorrect metadata.
`#11010 <https://github.com/wazuh/wazuh/pull/11010>`_                                                           Fixed a bug regarding ids not being sorted with cluster disabled in Active Response and Agent endpoints.
`#10736 <https://github.com/wazuh/wazuh/pull/10736>`_                                                           Fixed a bug where ``null`` values from ``wazuh-db`` were returned in API responses.
`#12063 <https://github.com/wazuh/wazuh/pull/12063>`_                                                           Connections through ``WazuhQueue`` will be closed gracefully in all situations. 
`#12450 <https://github.com/wazuh/wazuh/pull/12450>`_                                                           Fixed exception handling when trying to get the active configuration of a valid but not configured component.
`#12700 <https://github.com/wazuh/wazuh/pull/12700>`_                                                           Fixed ``api.yaml`` path suggested as remediation at ``exception.py``.
`#12768 <https://github.com/wazuh/wazuh/pull/12768>`_                                                           Fixed ``/tmp`` access error in containers of API integration tests environment. 
`#13096 <https://github.com/wazuh/wazuh/pull/13096>`_                                                           The API will return an exception when the user asks for agent inventory information, and there is no database for it (never connected agents). 
`#13171 <https://github.com/wazuh/wazuh/pull/13171>`_ `#13386 <https://github.com/wazuh/wazuh/pull/13386>`_     Improved regex used for the ``q`` parameter on API requests with special characters and brackets.
`#12592 <https://github.com/wazuh/wazuh/pull/12592>`_                                                           Removed ``board_serial`` from syscollector integration tests expected responses.
`#12557 <https://github.com/wazuh/wazuh/pull/12557>`_                                                           Removed cmd field from expected responses of syscollector integration tests.
`#12611 <https://github.com/wazuh/wazuh/pull/12611>`_                                                           Reduced the maximum number of groups per agent to 128 and adjusted group name validation.
`#14204 <https://github.com/wazuh/wazuh/pull/14204>`_                                                           Reduced amount of memory required to read CDB lists using the API.
`#14237 <https://github.com/wazuh/wazuh/pull/14237>`_                                                           Fixed a bug where the cluster health check endpoint and CLI would add an extra active agent to the master node.
`#15311 <https://github.com/wazuh/wazuh/pull/15311>`_                                                           Fixed bug that prevents updating the configuration when using various ``<ossec_conf>`` blocks from the API.
`#15194 <https://github.com/wazuh/wazuh/pull/15194>`_                                                           Fixed vulnerability API integration tests' healthcheck.
============================================================================================================    =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#11613 <https://github.com/wazuh/wazuh/pull/11613>`_             Fixed ``OpenWRT`` decoder fixed to parse UFW logs.    
`#14807 <https://github.com/wazuh/wazuh/pull/14807>`_             Bug fix in ``wazuh-api-fields`` decoder.
`#13567 <https://github.com/wazuh/wazuh/pull/13567>`_             Fixed deprecated MITRE tags in rules.
`#15241 <https://github.com/wazuh/wazuh/pull/15241>`_             SCA checks IDs are not unique.
`#14513 <https://github.com/wazuh/wazuh/pull/14513>`_             Fixed regex in check 5.1.1 of Ubuntu 20.04 SCA.
`#15251 <https://github.com/wazuh/wazuh/pull/15251>`_             Removed wrong Fedora Linux SCA default policies.
`#15156 <https://github.com/wazuh/wazuh/pull/15156>`_             SUSE Linux Enterprise 15 SCA Policy duplicated check ids 7521 and 7522.      
==============================================================    =============

Other
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14165 <https://github.com/wazuh/wazuh/pull/14165>`_             Fixed Makefile to detect CPU architecture on Gentoo Linux.          
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

=============================================================================================================================================================================================    =============
Reference                                                                                                                                                                                        Description
=============================================================================================================================================================================================    =============
`#4425 <https://github.com/wazuh/wazuh-kibana-app/pull/4425>`_                                                                                                                                   Fixed nested fields filtering in dashboards tables and KPIs.
`#4428 <https://github.com/wazuh/wazuh-kibana-app/pull/4428>`_                                                                                                                                   Fixed nested field rendering in security alerts table details.
`#4539 <https://github.com/wazuh/wazuh-kibana-app/pull/4539>`_                                                                                                                                   Fixed a bug where the Wazuh logo was used instead of the custom one.
`#4516 <https://github.com/wazuh/wazuh-kibana-app/pull/4516>`_                                                                                                                                   Fixed rendering problems of the ``Agent Overview`` section in low resolutions.
`#4595 <https://github.com/wazuh/wazuh-kibana-app/pull/4595>`_                                                                                                                                   Fixed issue when logging out from Wazuh when SAML is enabled.
`#4710 <https://github.com/wazuh/wazuh-kibana-app/pull/4710>`_ `#4728 <https://github.com/wazuh/wazuh-kibana-app/pull/4728>`_ `#4971 <https://github.com/wazuh/wazuh-kibana-app/pull/4971>`_     Fixed server errors with code 500 when the Wazuh API is not reachable / up.
`#4653 <https://github.com/wazuh/wazuh-kibana-app/pull/4653>`_ `#5010 <https://github.com/wazuh/wazuh-kibana-app/pull/5010>`_                                                                    Fixed pagination to SCA table.
`#4849 <https://github.com/wazuh/wazuh-kibana-app/pull/4849>`_                                                                                                                                   Fixed ``WAZUH_PROTOCOL`` param suggestion.
`#4876 <https://github.com/wazuh/wazuh-kibana-app/pull/4876>`_ `#4880 <https://github.com/wazuh/wazuh-kibana-app/pull/4880>`_                                                                    Raspbian OS, Ubuntu, Amazon Linux, and Amazon Linux 2 commands now change when a different architecture is selected in the wizard deploy agent.
`#4929 <https://github.com/wazuh/wazuh-kibana-app/pull/4929>`_                                                                                                                                   Disabled unmapped fields filter in Security Events alerts table.
`#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_                                                                                                                                   Deploy new agent section: Fixed how macOS versions and architectures were displayed, fixed how agents were displayed, and fixed how Ubuntu versions were displayed.
`#4943 <https://github.com/wazuh/wazuh-kibana-app/pull/4943>`_                                                                                                                                   Fixed agent deployment instructions for HP-UX and Solaris. 
`#4638 <https://github.com/wazuh/wazuh-kibana-app/pull/4638>`_ `#5046 <https://github.com/wazuh/wazuh-kibana-app/pull/5046>`_                                                                    Fixed a bug that caused the flyouts to close when clicking inside them.
`#4981 <https://github.com/wazuh/wazuh-kibana-app/pull/4981>`_                                                                                                                                   Fixed the manager option in the agent deployment section.
`#4999 <https://github.com/wazuh/wazuh-kibana-app/pull/4999>`_ `#5031 <https://github.com/wazuh/wazuh-kibana-app/pull/5031>`_                                                                    Fixed Inventory checks table filters by stats.
`#4962 <https://github.com/wazuh/wazuh-kibana-app/pull/4962>`_                                                                                                                                   Fixed commands in the deploy new agent section(most of the commands are missing ``-1``).
`#4968 <https://github.com/wazuh/wazuh-kibana-app/pull/4968>`_                                                                                                                                   Fixed agent installation command for macOS in the deploy new agent section.
`#4942 <https://github.com/wazuh/wazuh-kibana-app/pull/4942>`_                                                                                                                                   Fixed agent graph in OpenSearch dashboard.
`#4984 <https://github.com/wazuh/wazuh-kibana-app/pull/4984>`_                                                                                                                                   Fixed commands in the deploy new agent section(most of the commands are missing ``-1``).
`#4975 <https://github.com/wazuh/wazuh-kibana-app/pull/4975>`_                                                                                                                                   Fixed default last scan date parser to be able to catch dates returned by Wazuh API when no vulnerabilities scan has been made.
`#5035 <https://github.com/wazuh/wazuh-kibana-app/pull/5035>`_                                                                                                                                   A solaris command has been fixed. 
`#5045 <https://github.com/wazuh/wazuh-kibana-app/pull/5045>`_                                                                                                                                   Fixed commands: AIX, openSUSE, Alpine, SUSE 11, Fedora, HP-UX, Oracle Linux 5, Amazon Linux 2, CentOS 5. Changed the word ``or higher`` in buttons to ``+``.Fixed validations for HP-UX, Solaris and Alpine. 
`#5069 <https://github.com/wazuh/wazuh-kibana-app/pull/5069>`_                                                                                                                                   Fixed error in Github module PDF report. 
`#5098 <https://github.com/wazuh/wazuh-kibana-app/pull/5098>`_                                                                                                                                   Fixed password input in deploy new agent section. 
`#5094 <https://github.com/wazuh/wazuh-kibana-app/pull/5094>`_                                                                                                                                   Fixed error when clicking on the selectors of agents in the group agents management.
`#5092 <https://github.com/wazuh/wazuh-kibana-app/pull/5092>`_                                                                                                                                   Fixed menu content panel is displayed in the wrong place. 
`#5101 <https://github.com/wazuh/wazuh-kibana-app/pull/5101>`_                                                                                                                                   Fixed greyed and disabled menu section names.
`#5107 <https://github.com/wazuh/wazuh-kibana-app/pull/5107>`_                                                                                                                                   Fixed misspelling in the NIST module.
`#5150 <https://github.com/wazuh/wazuh-kibana-app/pull/5150>`_                                                                                                                                   Fixed Statistic cronjob bulk document insert.
`#5137 <https://github.com/wazuh/wazuh-kibana-app/pull/5137>`_                                                                                                                                   Fixed the style of the buttons showing more event information in the event view table.
`#5144 <https://github.com/wazuh/wazuh-kibana-app/pull/5144>`_                                                                                                                                   Fixed Inventory module for Solaris agents.
`#5167 <https://github.com/wazuh/wazuh-kibana-app/pull/5167>`_                                                                                                                                   Fixed the module information button in Office365 and Github Panel tab to open the nav drawer.
`#5200 <https://github.com/wazuh/wazuh-kibana-app/pull/5200>`_                                                                                                                                   Fixed a UI crash due to ``external_references`` field could be missing in some vulnerability data.
`#5273 <https://github.com/wazuh/wazuh-kibana-app/pull/5273>`_                                                                                                                                   Fixed the Wazuh main menu is not displayed when the navigation menu is locked.
`#5286 <https://github.com/wazuh/wazuh-kibana-app/pull/5286>`_                                                                                                                                   The event view is now working correctly after fixing a problem that occurred when *Lucene* language was selected in the search bar. 
`#5285 <https://github.com/wazuh/wazuh-kibana-app/pull/5285>`_ `#5295 <https://github.com/wazuh/wazuh-kibana-app/pull/5295>`_                                                                    Fixed the incorrect use of the connection secure property by Deploy Agent.
`#5291 <https://github.com/wazuh/wazuh-kibana-app/pull/5291>`_                                                                                                                                   Head rendering in the agent view has been corrected.
=============================================================================================================================================================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

=============================================================================================================================================================================================    =============
Reference                                                                                                                                                                                        Description
=============================================================================================================================================================================================    =============
`#4425 <https://github.com/wazuh/wazuh-kibana-app/pull/4425>`_                                                                                                                                   Fixed nested fields filtering in dashboards tables and KPIs.
`#4428 <https://github.com/wazuh/wazuh-kibana-app/pull/4428>`_                                                                                                                                   Fixed nested field rendering in security alerts table details.
`#4539 <https://github.com/wazuh/wazuh-kibana-app/pull/4539>`_                                                                                                                                   Fixed a bug where the Wazuh logo was used instead of the custom one.
`#4516 <https://github.com/wazuh/wazuh-kibana-app/pull/4516>`_                                                                                                                                   Fixed rendering problems of the ``Agent Overview`` section in low resolutions.
`#4595 <https://github.com/wazuh/wazuh-kibana-app/pull/4595>`_                                                                                                                                   Fixed issue when logging out from Wazuh when SAML is enabled.
`#4710 <https://github.com/wazuh/wazuh-kibana-app/pull/4710>`_ `#4728 <https://github.com/wazuh/wazuh-kibana-app/pull/4728>`_ `#4971 <https://github.com/wazuh/wazuh-kibana-app/pull/4971>`_     Fixed server errors with code 500 when the Wazuh API is not reachable / up.
`#4653 <https://github.com/wazuh/wazuh-kibana-app/pull/4653>`_ `#5010 <https://github.com/wazuh/wazuh-kibana-app/pull/5010>`_                                                                    Fixed pagination to SCA table.
`#4849 <https://github.com/wazuh/wazuh-kibana-app/pull/4849>`_                                                                                                                                   Fixed ``WAZUH_PROTOCOL`` param suggestion.
`#4876 <https://github.com/wazuh/wazuh-kibana-app/pull/4876>`_ `#4880 <https://github.com/wazuh/wazuh-kibana-app/pull/4880>`_                                                                    Raspbian OS, Ubuntu, Amazon Linux, and Amazon Linux 2 commands now change when a different architecture is selected in the wizard deploy agent.
`#4929 <https://github.com/wazuh/wazuh-kibana-app/pull/4929>`_                                                                                                                                   Disabled unmapped fields filter in Security Events alerts table.
`#4981 <https://github.com/wazuh/wazuh-kibana-app/pull/4981>`_                                                                                                                                   Fixed the manager option in the agent deployment section.
`#4999 <https://github.com/wazuh/wazuh-kibana-app/pull/4999>`_ `#5031 <https://github.com/wazuh/wazuh-kibana-app/pull/5031>`_                                                                    Fixed Inventory checks table filters by stats.
`#4962 <https://github.com/wazuh/wazuh-kibana-app/pull/4962>`_                                                                                                                                   Fixed commands in the deploy new agent section(most of the commands are missing ``-1``).
`#4968 <https://github.com/wazuh/wazuh-kibana-app/pull/4968>`_                                                                                                                                   Fixed agent installation command for macOS in the deploy new agent section.
`#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_                                                                                                                                   Deploy new agent section: Fixed how macOS versions and architectures were displayed, fixed how agents were displayed, and fixed how Ubuntu versions were displayed.
`#4943 <https://github.com/wazuh/wazuh-kibana-app/pull/4943>`_                                                                                                                                   Fixed agent deployment instructions for HP-UX and Solaris.
`#4999 <https://github.com/wazuh/wazuh-kibana-app/pull/4999>`_                                                                                                                                   Fixed Inventory checks table filters by stats.
`#4975 <https://github.com/wazuh/wazuh-kibana-app/pull/4975>`_                                                                                                                                   Fixed default last scan date parser to be able to catch dates returned by Wazuh API when no vulnerabilities scan has been made.
`#5035 <https://github.com/wazuh/wazuh-kibana-app/pull/5035>`_                                                                                                                                   A Solaris command has been fixed.     
`#5045 <https://github.com/wazuh/wazuh-kibana-app/pull/5045>`_                                                                                                                                   Fixed commands: AIX, openSUSE, Alpine, SUSE 11, Fedora, HP-UX,Oracle Linux 5, Amazon Linux 2, CentOS 5. Changed the word ``or higher`` in buttons to ``+``.Fixed validations for HP-UX, Solaris and Alpine. 
`#5069 <https://github.com/wazuh/wazuh-kibana-app/pull/5069>`_                                                                                                                                   Fixed error in Github module PDF report. 
`#5098 <https://github.com/wazuh/wazuh-kibana-app/pull/5098>`_                                                                                                                                   Fixed password input in deploy new agent section. 
`#5094 <https://github.com/wazuh/wazuh-kibana-app/pull/5094>`_                                                                                                                                   Fixed error when clicking on the selectors of agents in the group agents management.
`#5107 <https://github.com/wazuh/wazuh-kibana-app/pull/5107>`_                                                                                                                                   Fixed misspelling in the NIST module.
`#5150 <https://github.com/wazuh/wazuh-kibana-app/pull/5150>`_                                                                                                                                   Fixed Statistic cronjob bulk document insert.
`#5137 <https://github.com/wazuh/wazuh-kibana-app/pull/5137>`_                                                                                                                                   Fixed the style of the buttons showing more event information in the event view table.
`#5144 <https://github.com/wazuh/wazuh-kibana-app/pull/5144>`_                                                                                                                                   Fixed Inventory module for Solaris agents.
`#5200 <https://github.com/wazuh/wazuh-kibana-app/pull/5200>`_                                                                                                                                   Fixed a UI crash due to ``external_references`` field could be missing in some vulnerability data.
`#5285 <https://github.com/wazuh/wazuh-kibana-app/pull/5285>`_ `#5295 <https://github.com/wazuh/wazuh-kibana-app/pull/5295>`_                                                                    Fixed the incorrect use of the connection secure property by Deploy Agent.
`#5291 <https://github.com/wazuh/wazuh-kibana-app/pull/5291>`_                                                                                                                                   Head rendering in the agent view has been corrected.
=============================================================================================================================================================================================    =============

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

=============================================================================================================================================================================================    =============
Reference                                                                                                                                                                                        Description
=============================================================================================================================================================================================    =============
`#4425 <https://github.com/wazuh/wazuh-kibana-app/pull/4425>`_                                                                                                                                   Fixed nested fields filtering in dashboards tables and KPIs.
`#4428 <https://github.com/wazuh/wazuh-kibana-app/pull/4428>`_ `#4925 <https://github.com/wazuh/wazuh-kibana-app/pull/4925>`_                                                                    Fixed nested field rendering in security alerts table details.
`#4539 <https://github.com/wazuh/wazuh-kibana-app/pull/4539>`_                                                                                                                                   Fixed a bug where the Wazuh logo was used instead of the custom one.
`#4516 <https://github.com/wazuh/wazuh-kibana-app/pull/4516>`_                                                                                                                                   Fixed rendering problems of the ``Agent Overview`` section in low resolutions.
`#4595 <https://github.com/wazuh/wazuh-kibana-app/pull/4595>`_                                                                                                                                   Fixed issue when logging out from Wazuh when SAML is enabled.
`#4710 <https://github.com/wazuh/wazuh-kibana-app/pull/4710>`_ `#4728 <https://github.com/wazuh/wazuh-kibana-app/pull/4728>`_ `#4971 <https://github.com/wazuh/wazuh-kibana-app/pull/4971>`_     Fixed server errors with code 500 when the Wazuh API is not reachable / up.
`#4653 <https://github.com/wazuh/wazuh-kibana-app/pull/4653>`_ `#5010 <https://github.com/wazuh/wazuh-kibana-app/pull/5010>`_                                                                    Fixed pagination to SCA table.
`#4849 <https://github.com/wazuh/wazuh-kibana-app/pull/4849>`_                                                                                                                                   Fixed ``WAZUH_PROTOCOL`` param suggestion.
`#4876 <https://github.com/wazuh/wazuh-kibana-app/pull/4876>`_ `#4880 <https://github.com/wazuh/wazuh-kibana-app/pull/4880>`_                                                                    Raspbian OS, Ubuntu, Amazon Linux, and Amazon Linux 2 commands now change when a different architecture is selected in the wizard deploy agent.
`#4929 <https://github.com/wazuh/wazuh-kibana-app/pull/4929>`_                                                                                                                                   Disabled unmapped fields filter in Security Events alerts table.
`#4832 <https://github.com/wazuh/wazuh-kibana-app/pull/4832>`_ `#4838 <https://github.com/wazuh/wazuh-kibana-app/pull/4838>`_                                                                    Fixed the agents wizard OS styles and their versions.
`#4981 <https://github.com/wazuh/wazuh-kibana-app/pull/4981>`_                                                                                                                                   Fixed the manager option in the agent deployment section.
`#4999 <https://github.com/wazuh/wazuh-kibana-app/pull/4999>`_ `#5031 <https://github.com/wazuh/wazuh-kibana-app/pull/5031>`_                                                                    Fixed Inventory checks table filters by stats #4999 #5031
`#4962 <https://github.com/wazuh/wazuh-kibana-app/pull/4962>`_                                                                                                                                   Fixed commands in the deploy new agent section(most of the commands are missing ``-1``).
`#4968 <https://github.com/wazuh/wazuh-kibana-app/pull/4968>`_                                                                                                                                   Fixed agent installation command for macOS in the deploy new agent section.
`#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_                                                                                                                                   Deploy new agent section: Fixed how macOS versions and architectures were displayed, fixed how agents were displayed, and fixed how Ubuntu versions were displayed.
`#4943 <https://github.com/wazuh/wazuh-kibana-app/pull/4943>`_                                                                                                                                   Fixed agent deployment instructions for HP-UX and Solaris.
`#4999 <https://github.com/wazuh/wazuh-kibana-app/pull/4999>`_                                                                                                                                   Fixed Inventory checks table filters by stats.
`#4983 <https://github.com/wazuh/wazuh-kibana-app/pull/4983>`_                                                                                                                                   Fixed agent installation command for macOS in the deploy new agent section.
`#4975 <https://github.com/wazuh/wazuh-kibana-app/pull/4975>`_                                                                                                                                   Fixed default last scan date parser to be able to catch dates returned by Wazuh API when no vulnerabilities scan has been made.
`#5035 <https://github.com/wazuh/wazuh-kibana-app/pull/5035>`_                                                                                                                                   A Solaris command has been fixed.     
`#5045 <https://github.com/wazuh/wazuh-kibana-app/pull/5045>`_                                                                                                                                   Fixed commands: AIX, openSUSE, Alpine, SUSE 11, Fedora, HP-UX, Oracle Linux 5, Amazon Linux 2, CentOS 5. Changed the word ``or higher`` in buttons to ``+``.Fixed validations for HP-UX, Solaris and Alpine. 
`#5069 <https://github.com/wazuh/wazuh-kibana-app/pull/5069>`_                                                                                                                                   Fixed error in Github module PDF report. 
`#5098 <https://github.com/wazuh/wazuh-kibana-app/pull/5098>`_                                                                                                                                   Fixed password input in deploy new agent section. 
`#5094 <https://github.com/wazuh/wazuh-kibana-app/pull/5094>`_                                                                                                                                   Fixed error when clicking on the selectors of agents in the group agents management.
`#5107 <https://github.com/wazuh/wazuh-kibana-app/pull/5107>`_                                                                                                                                   Fixed misspelling in the NIST module.
`#5150 <https://github.com/wazuh/wazuh-kibana-app/pull/5150>`_                                                                                                                                   Fixed Statistic cronjob bulk document insert.
`#5137 <https://github.com/wazuh/wazuh-kibana-app/pull/5137>`_                                                                                                                                   Fixed the style of the buttons showing more event information in the event view table.
`#5144 <https://github.com/wazuh/wazuh-kibana-app/pull/5144>`_                                                                                                                                   Fixed Inventory module for Solaris agents.
`#5200 <https://github.com/wazuh/wazuh-kibana-app/pull/5200>`_                                                                                                                                   Fixed a UI crash due to ``external_references`` field could be missing in some vulnerability data.
`#5285 <https://github.com/wazuh/wazuh-kibana-app/pull/5285>`_ `#5295 <https://github.com/wazuh/wazuh-kibana-app/pull/5295>`_                                                                    Fixed the incorrect use of the connection secure property by Deploy Agent.
`#5291 <https://github.com/wazuh/wazuh-kibana-app/pull/5291>`_                                                                                                                                   Head rendering in the agent view has been corrected.
=============================================================================================================================================================================================    =============

Packages
^^^^^^^^

=====================================================================     =============
Reference                                                                 Description
=====================================================================     =============
`#1091 <https://github.com/wazuh/wazuh-packages/pull/1091>`_              Updated ``g++`` to fix an undefined behavior on openSUSE Tumbleweed.  
`#976 <https://github.com/wazuh/wazuh-packages/pull/976>`_                Added the missing ``tar`` dependency in the Wazuh installation assistant.
`#1196 <https://github.com/wazuh/wazuh-packages/pull/1196>`_              Fixed the RPM wazuh-agent package build. 
`#1431 <https://github.com/wazuh/wazuh-packages/pull/1431>`_              Fixed a compilation error on CentOS 5 and CentOS 7, as well as the building of the Docker images for CentOS 5 on the i386 architecture.
`#1611 <https://github.com/wazuh/wazuh-packages/pull/1611>`_              Fixed the Solaris 11 generation branch. 
`#1653 <https://github.com/wazuh/wazuh-packages/pull/1653>`_              Fixed the log cleaning command in the OVA generation. 
`#1661 <https://github.com/wazuh/wazuh-packages/pull/1661>`_              Fixed the ``invoke.rc`` call. 
`#1674 <https://github.com/wazuh/wazuh-packages/pull/1674>`_              Fixed RHEL9 ``init.d`` file installation. 
`#1675 <https://github.com/wazuh/wazuh-packages/pull/1675>`_              Fixed RHEL9 ``sysv-init`` error.  
`#1650 <https://github.com/wazuh/wazuh-packages/pull/1650>`_              Fixed the package building for Arch Linux. 
`#1688 <https://github.com/wazuh/wazuh-packages/pull/1688>`_              Updated the ``generate_ova.sh`` script.  
`#2019 <https://github.com/wazuh/wazuh-packages/pull/2019>`_              Removed error logs from the OVA.  
`#1905 <https://github.com/wazuh/wazuh-packages/pull/1905>`_              Fixed service enablement in SUSE packages. 
`#1877 <https://github.com/wazuh/wazuh-packages/pull/1877>`_              Fixed package conflicts between the ``wazuh-manager`` and ``azure-cli`` on CentOS 8.
`#1779 <https://github.com/wazuh/wazuh-packages/pull/1779>`_              Fixed the Wazuh installation assistant all-in-one deployment on Fedora 36. 
`#1812 <https://github.com/wazuh/wazuh-packages/pull/1812>`_              Fixed the RHEL and CentOS SCA template generation.
`#1826 <https://github.com/wazuh/wazuh-packages/pull/1826>`_              Fixed the ``wazuh-certs-tool.sh`` behavior when the given command does not match the content of the ``config.yml`` file.
`#1824 <https://github.com/wazuh/wazuh-packages/pull/1824>`_              Added ``daemon-reload`` at the end of the rollback function.
`#1836 <https://github.com/wazuh/wazuh-packages/pull/1836>`_              Fixed the Wazuh offline installation messages.
`#1898 <https://github.com/wazuh/wazuh-packages/pull/1898>`_              Removed `Wazuh dashboard` and `Wazuh indexer` `init.d` service for RHEL9.
`#1925 <https://github.com/wazuh/wazuh-packages/pull/1925>`_              Removed a black square icon from the Wazuh dashboard.
`#1963 <https://github.com/wazuh/wazuh-packages/pull/1963>`_              An issue that didn't allow the Wazuh installation assistant to create certificates for more than 9 nodes is now fixed.
`#1987 <https://github.com/wazuh/wazuh-packages/pull/1987>`_              Removed the ``init.d`` service for Wazuh dashboard RPM.  
`#1983 <https://github.com/wazuh/wazuh-packages/pull/1983>`_              `requestHeadersWhitelist` is deprecated and has been replaced by `requestHeadersAllowlist`. 
`#1986 <https://github.com/wazuh/wazuh-packages/pull/1986>`_              The Wazuh installation assistant now shows a message indicating that the Wazuh indexer was removed.
`#2018 <https://github.com/wazuh/wazuh-packages/pull/2018>`_              Disabled the expanded header by default in the Wazuh dashboard. 
`#1932 <https://github.com/wazuh/wazuh-packages/pull/1932>`_              Added flag mechanism to configure the protection for untrusted libraries verification. 
`#1727 <https://github.com/wazuh/wazuh-packages/pull/1727>`_              Added a fix to avoid GLIBC crash.
=====================================================================     =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.4.0/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.4.0-2.4.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.4.0-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.4.0-7.17.9/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.4.0-8.2/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.4.0>`_

