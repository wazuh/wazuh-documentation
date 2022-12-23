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

Wazuh manager
^^^^^^^^^^^^^

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
- `#14244 <https://github.com/wazuh/wazuh/pull/14244>`_ Improved performance of the ``agent_groups`` CLI when listing agents belonging to a group. 
- `#14475 <https://github.com/wazuh/wazuh/pull/14475>`_ Changed wazuh-clusterd binary behaviour to kill any existing cluster processes when executed. 
- `#14791 <https://github.com/wazuh/wazuh/pull/14791>`_ Changed wazuh-clusterd tasks to wait asynchronously for responses coming from wazuh-db. 
- `#11190 <https://github.com/wazuh/wazuh/pull/11190>`_ Use zlib for zip compression in cluster synchronization. 
- `#12241 <https://github.com/wazuh/wazuh/pull/12241>`_ Added mechanism to dynamically adjust zip size limit in Integrity sync.
- `#12409 <https://github.com/wazuh/wazuh/pull/12409>`_ Removed the unused internal option ``wazuh_db.sock_queue_size``.
- `#10940 <https://github.com/wazuh/wazuh/pull/10940>`_ Removed all the unused exceptions from the exceptions.py file.
- `#10740 <https://github.com/wazuh/wazuh/pull/10740>`_ Removed unused execute method from core/utils.py. 
- `#13119 <https://github.com/wazuh/wazuh/pull/13119>`_ Removed unused set_user_name function in framework. 
- `#12370 <https://github.com/wazuh/wazuh/pull/12370>`_ Unused internal calls to wazuh-db have been deprecated. 
- `#14542 <https://github.com/wazuh/wazuh/pull/14542>`_ Debian Stretch support in Vulnerability Detector has been deprecated.

Wazuh agent
^^^^^^^^^^^

- `#11756 <https://github.com/wazuh/wazuh/pull/11756>`_ Added support of CPU frequency data provided by Syscollector on Raspberry Pi.
- `#11450 <https://github.com/wazuh/wazuh/pull/11450>`_ Added support for IPv6 address collection in the agent.
- `#11833 <https://github.com/wazuh/wazuh/pull/11833>`_ Added the process startup time data provided by Syscollector on macOS.
- `#11571 <https://github.com/wazuh/wazuh/pull/11571>`_ Added support of package retrieval in Syscollector for OpenSUSE Tumbleweed and Fedora 34.
- `#11640 <https://github.com/wazuh/wazuh/pull/11640>`_ Added the process startup time data provided by Syscollector on macOS. Thanks to @LubinLew.
- `#11796 <https://github.com/wazuh/wazuh/pull/11796>`_ Added support for package data provided by Syscollector on Solaris.
- `#10843 <https://github.com/wazuh/wazuh/pull/10843>`_ Added support for delta events in Syscollector when data gets changed. 
- `#12035 <https://github.com/wazuh/wazuh/pull/12035>`_ Added support for pre-installed Windows packages in Syscollector. 
- `#11268 <https://github.com/wazuh/wazuh/pull/11268>`_ Added support for IPv6 on agent-manager connection and enrollment. 
- `#12582 <https://github.com/wazuh/wazuh/pull/12582>`_ Added support for CIS-CAT Pro v3 and v4 to the CIS-CAT integration module. Thanks to @hustliyilin.
- `#10870 <https://github.com/wazuh/wazuh/pull/10870>`_ Added support for the use of the Azure integration module in Linux agents. 
- `#11852 <https://github.com/wazuh/wazuh/pull/11852>`_ Added new error messages when using invalid credentials with the Azure integration.
- `#12515 <https://github.com/wazuh/wazuh/pull/12515>`_ Added reparse option to CloudWatchLogs and Google Cloud Storage integrations. 
- `#14726 <https://github.com/wazuh/wazuh/pull/14726>`_ Wazuh Agent can now be built and run on Alpine Linux. 
- `#15054 <https://github.com/wazuh/wazuh/pull/15054>`_ Added native Shuffle integration. 
- `#11587 <https://github.com/wazuh/wazuh/pull/11587>`_ Improved the free RAM data provided by Syscollector. 
- `#12752 <https://github.com/wazuh/wazuh/pull/12752>`_ The Windows installer (MSI) now provides signed DLL files.
- `#12748 <https://github.com/wazuh/wazuh/pull/12748>`_ Changed the group ownership of the Modulesd process to root.
- `#12750 <https://github.com/wazuh/wazuh/pull/12750>`_ Some parts of Agentd and Execd have got refactored.
- `#10478 <https://github.com/wazuh/wazuh/pull/10478>`_ Handled new exception in the external integration modules.
- `#11828 <https://github.com/wazuh/wazuh/pull/11828>`_ Optimized the number of calls to DB maintenance tasks performed by the AWS integration. 
- `#12404 <https://github.com/wazuh/wazuh/pull/12404>`_ Improved the reparse performance by removing unnecessary queries from external integrations.
- `#12478 <https://github.com/wazuh/wazuh/pull/12478>`_ Updated and expanded Azure module logging functionality to use the ossec.log file.
- `#12647 <https://github.com/wazuh/wazuh/pull/12647>`_ Improved the error management of the Google Cloud integration. 
- `#12769 <https://github.com/wazuh/wazuh/pull/12769>`_ Deprecated ``logging`` tag in GCloud integration. It now uses ``wazuh_modules`` debug value to set the verbosity level.
- `#12849 <https://github.com/wazuh/wazuh/pull/12849>`_ The last_dates.json file of the Azure module has been deprecated in favour of a new ORM and database.
- `#12929 <https://github.com/wazuh/wazuh/pull/12929>`_ Improved the error handling in AWS integration's ``decompress_file`` method.
- `#11190 <https://github.com/wazuh/wazuh/pull/11190>`_ Use zlib for zip compression in cluster synchronization.
- `#11354 <https://github.com/wazuh/wazuh/pull/11354>`_ The exception handling on Wazuh Agent for Windows has been changed to DWARF2.
- `#14696 <https://github.com/wazuh/wazuh/pull/14696>`_ The root CA certificate for WPK upgrade has been updated. 
- `#14822 <https://github.com/wazuh/wazuh/pull/14822>`_ Agents on macOS now report the OS name as "macOS" instead of "Mac OS X".
- `#14816 <https://github.com/wazuh/wazuh/pull/14816>`_ The Systemd service stopping policy has been updated. 
- `#14793 <https://github.com/wazuh/wazuh/pull/14793>`_ Changed how the AWS module handles ``ThrottlingException`` adding default values for connection retries in case no config file is set.
- `#14543 <https://github.com/wazuh/wazuh/pull/14543>`_ Deprecated Azure and AWS credentials in the configuration authentication option.

RESTful API
^^^^^^^^^^^

- `#10620 <https://github.com/wazuh/wazuh/pull/10620>`_ Added new API integration tests for a Wazuh environment without a cluster configuration.
- `#11731 <https://github.com/wazuh/wazuh/pull/11731>`_ Added wazuh-modulesd tags to ``GET /manager/logs`` and ``GET /cluster/{node_id}/logs`` endpoints.
- `#12438 <https://github.com/wazuh/wazuh/pull/12438>`_ Added python decorator to soft deprecate API endpoints adding deprecation headers to their responses.
- `#12486 <https://github.com/wazuh/wazuh/pull/12486>`_ Added new exception to inform that /proc directory is not found or permissions to see its status are not granted.
- `#12362 <https://github.com/wazuh/wazuh/pull/12362>`_ Added new field and filter to ``GET /agents`` response to retrieve agent groups configuration synchronization status.
- `#12498 <https://github.com/wazuh/wazuh/pull/12498>`_ Added agent groups configuration synchronization status to ``GET /agents/summary/status`` endpoint. 
- `#11171 <https://github.com/wazuh/wazuh/pull/11171>`_ Added JSON log handling.
- `#12029 <https://github.com/wazuh/wazuh/pull/12029>`_ Added integration tests for IPv6 agent's registration.
- `#12887 <https://github.com/wazuh/wazuh/pull/12887>`_ Enable ordering by Agents count in ``/groups`` endpoints.
- `#12092 <https://github.com/wazuh/wazuh/pull/12092>`_ Added hash to API logs to identify users logged in with authorization context. 
- `#14119 <https://github.com/wazuh/wazuh/pull/14119>`_ Added new ``limits`` section to the ``upload_wazuh_configuration`` section in the Wazuh API configuration.
- `#14295 <https://github.com/wazuh/wazuh/pull/14295>`_ Added logic to API logger to renew its streams if needed on every request.
- `#14401 <https://github.com/wazuh/wazuh/pull/14401>`_ Added ``GET /manager/daemons/stats`` and ``GET /cluster/{node_id}/daemons/stats`` API endpoints. 
- `#14464 <https://github.com/wazuh/wazuh/pull/14464>`_ Added ``GET /agents/{agent_id}/daemons/stats`` API endpoint. 
- `#14471 <https://github.com/wazuh/wazuh/pull/14471>`_ Added the possibility to get the configuration of the ``wazuh-db`` component in active configuration endpoints.
- `#15084 <https://github.com/wazuh/wazuh/pull/15084>`_ Added distinct and select parameters to GET /sca/{agent_id} and GET /sca/{agent_id}/checks/{policy_id} endpoints.
- `#15290 <https://github.com/wazuh/wazuh/pull/15290>`_ Added new endpoint to run vulnerability detector on-demand scans (``PUT /vulnerability``).
- `#11341 <https://github.com/wazuh/wazuh/pull/11341>`_ Improved ``GET /cluster/healthcheck`` endpoint and ``cluster_control -i more`` CLI call in loaded cluster environments. 
- `#12595 <https://github.com/wazuh/wazuh/pull/12595>`_ Removed ``never_connected`` agent status limitation when trying to assign agents to groups.
- `#12551 <https://github.com/wazuh/wazuh/pull/12551>`_ Changed API version and upgrade_version filters to work with different version formats.
- `#9413 <https://github.com/wazuh/wazuh/pull/9413>`_ Renamed ``GET /agents/{agent_id}/group/is_sync`` endpoint to ``GET /agents/group/is_sync`` and added new ``agents_list`` parameter.
- `#10397 <https://github.com/wazuh/wazuh/pull/10397>`_ Added ``POST /security/user/authenticate`` endpoint and marked ``GET /security/user/authenticate`` endpoint as deprecated.
- `#12526 <https://github.com/wazuh/wazuh/pull/12526>`_ Adapted framework code to agent-group changes to use the new wazuh-db commands.
- `#13791 <https://github.com/wazuh/wazuh/pull/13791>`_ Updated default timeout for ``GET /mitre/software`` to avoid timing out in slow environments after the MITRE DB update to v11.2.
- `#14119 <https://github.com/wazuh/wazuh/pull/14119>`_ Changed API settings related to remote commands. The ``remote_commands`` section will be hold within ``upload_wazuh_configuration``.
- `#14233 <https://github.com/wazuh/wazuh/pull/14233>`_ Improved API unauthorized responses to be more accurate.
- `#14259 <https://github.com/wazuh/wazuh/pull/14259>`_ Updated framework functions that communicate with the request socket to use remote instead.
- `#14766 <https://github.com/wazuh/wazuh/pull/14766>`_ Improved parameter validation for API endpoints that require component and configuration parameters.
- `#15017 <https://github.com/wazuh/wazuh/pull/15017>`_ Improved GET /sca/{agent_id}/checks/{policy_id} API endpoint performance.
- `#15334 <https://github.com/wazuh/wazuh/pull/15334>`_ Improved exception handling when trying to connect to Wazuh sockets.
- `#15671 <https://github.com/wazuh/wazuh/pull/15671>`_ Modified _group_names and _group_names_or_all regexes to avoid invalid group names.
- `#12053 <https://github.com/wazuh/wazuh/pull/12053>`_ Removed null remediations from failed API responses.
- `#12365 <https://github.com/wazuh/wazuh/pull/12365>`_ Deprecated ``GET /agents/{agent_id}/group/is_sync`` endpoint.
- `#14230 <https://github.com/wazuh/wazuh/pull/14230>`_ Deprecated ``GET /manager/stats/analysisd``, ``GET /manager/stats/remoted``, ``GET /cluster/{node_id}stats/analysisd``, and ``GET /cluster/{node_id}stats/remoted`` API endpoints.

Other
^^^^^

- `#12733 <https://github.com/wazuh/wazuh/pull/12733>`_ Added unit tests to the component in Analysisd that extracts the IP address from events.
- `#12518 <https://github.com/wazuh/wazuh/pull/12518>`_ Added ``python-json-logger`` dependency.
- `#10773 <https://github.com/wazuh/wazuh/pull/10773>`_  Prevented the Ruleset test suite from restarting the manager.
- `#14839 <https://github.com/wazuh/wazuh/pull/14839>`_ The pthread's rwlock has been replaced with a FIFO-queueing read-write lock.

Wazuh dashboard
^^^^^^^^^^^^^^^

- `#4323 <https://github.com/wazuh/wazuh-kibana-app/pull/4323>`_ Added the option to sort by the agents count in the group table.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ Added agent synchronization status in the agent module.
- `#4739 <https://github.com/wazuh/wazuh-kibana-app/pull/4739>`_ The input name was added and when the user adds a value the variable WAZUH_AGENT_NAME with its value appears in the installation command.
- `#4512 <https://github.com/wazuh/wazuh-kibana-app/pull/4512>`_ Redesign the SCA table from agent's dashboard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ Enhanced the plugin setting description displayed in the UI and the configuration file.
- `#4503 <https://github.com/wazuh/wazuh-kibana-app/pull/4503>`_ `#4785 <https://github.com/wazuh/wazuh-kibana-app/pull/4785>`_ Added validation to the plugin settings in the form of Settings/Configuration and the endpoint to update the plugin configuration.
- `#4505 <https://github.com/wazuh/wazuh-kibana-app/pull/4505>`_ `#4798 <https://github.com/wazuh/wazuh-kibana-app/pull/4798>`_ `#4805 <https://github.com/wazuh/wazuh-kibana-app/pull/4805>`_ Added new plugin settings to customize the header and footer on the PDF reports.
- `#4507 <https://github.com/wazuh/wazuh-kibana-app/pull/4507>`_ Added a new plugin setting to enable or disable the customization.
- `#4504 <https://github.com/wazuh/wazuh-kibana-app/pull/4504>`_ Added the ability to upload an image for the customization.logo.* settings in Settings/Configuration.
- `#4867 <https://github.com/wazuh/wazuh-kibana-app/pull/4867>`_ Added macOS version to wizard deploy agent.
- `#4833 <https://github.com/wazuh/wazuh-kibana-app/pull/4833>`_ Added powerPC architecture in redhat7, in the section 'Deploy new agent'.
- `#4831 <https://github.com/wazuh/wazuh-kibana-app/pull/4831>`_ Added a centralized service to handle the requests.
- `#4873 <https://github.com/wazuh/wazuh-kibana-app/pull/4873>`_ Added data-test-subj create policy.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Added extra steps message and new command for windows xp and windows server 2008, added alpine agent with all its steps.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Deploy new agent section: Added link for additional steps to alpine os.
- `#4970 <https://github.com/wazuh/wazuh-kibana-app/pull/4970>`_ Added file saving conditions in File Editor.
- `#5021 <https://github.com/wazuh/wazuh-kibana-app/pull/5021>`_ `#5028 <https://github.com/wazuh/wazuh-kibana-app/pull/5028>`_ Added character validation to avoid invalid agent names in the section 'Deploy new agent'. 
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Deploy new agent section: Added link for additional steps to alpine os.
- `#4103 <https://github.com/wazuh/wazuh-kibana-app/pull/4103>`_ Changed the HTTP verb from GET to POST in the requests to login to the Wazuh API.
- `#4376 <https://github.com/wazuh/wazuh-kibana-app/pull/4376>`_ Improved alerts summary performance.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ Improved Agents Overview performance.
- `#4529 <https://github.com/wazuh/wazuh-kibana-app/pull/4529>`_ `#4964 <https://github.com/wazuh/wazuh-kibana-app/pull/4964>`_ Improved the message displayed when there is a versions mismatch between the Wazuh API and the Wazuh APP.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ Independently load each dashboard from the Agents Overview page.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ The endpoint /agents/summary/status response was adapted. 
- `#4458 <https://github.com/wazuh/wazuh-kibana-app/pull/4458>`_ Updated and added operating systems, versions, architectures commands of Install and enroll the agent and commands of Start the agent in the deploy new agent section.
- `#4776 <https://github.com/wazuh/wazuh-kibana-app/pull/4776>`_ `#4954 <https://github.com/wazuh/wazuh-kibana-app/pull/4954>`_ Added cluster's IP and protocol as suggestions in the agent deployment wizard.
- `#4851 <https://github.com/wazuh/wazuh-kibana-app/pull/4851>`_ Show OS name and OS version in the agent installation wizard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ Changed the endpoint that updates the plugin configuration to support multiple settings.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Updated the winston dependency to 3.5.1.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Updated the pdfmake dependency to 0.2.6.
- `#4992 <https://github.com/wazuh/wazuh-kibana-app/pull/4992>`_ The button to export the app logs is now disabled when there are no results, instead of showing an error toast.
- `#4491 <https://github.com/wazuh/wazuh-kibana-app/pull/4491>`_ Removed custom styles from kibana 7.9.0.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Removed the angular-chart.js dependency.

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `#4323 <https://github.com/wazuh/wazuh-kibana-app/pull/4323>`_ Added the option to sort by the agents count in the group table.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ Added agent synchronization status in the agent module.
- `#4739 <https://github.com/wazuh/wazuh-kibana-app/pull/4739>`_ Added the ability to set the name of the agent using the deployment wizard.
- `#4512 <https://github.com/wazuh/wazuh-kibana-app/pull/4512>`_ Redesign the SCA table from agent's dashboard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ Enhanced the plugin setting description displayed in the UI and the configuration file.
- `#4503 <https://github.com/wazuh/wazuh-kibana-app/pull/4503>`_ `#4785 <https://github.com/wazuh/wazuh-kibana-app/pull/4785>`_ Added validation to the plugin settings in the form of Settings/Configuration and the endpoint to update the plugin configuration.
- `#4505 <https://github.com/wazuh/wazuh-kibana-app/pull/4505>`_ `#4798 <https://github.com/wazuh/wazuh-kibana-app/pull/4798>`_ `#4805 <https://github.com/wazuh/wazuh-kibana-app/pull/4805>`_ Added new plugin settings to customize the header and footer on the PDF reports.
- `#4507 <https://github.com/wazuh/wazuh-kibana-app/pull/4507>`_ Added a new plugin setting to enable or disable the customization.
- `#4504 <https://github.com/wazuh/wazuh-kibana-app/pull/4504>`_ Added the ability to upload an image for the customization.logo.* settings in Settings/Configuration.
- `#4867 <https://github.com/wazuh/wazuh-kibana-app/pull/4867>`_ Added macOS version to wizard deploy agent.
- `#4833 <https://github.com/wazuh/wazuh-kibana-app/pull/4833>`_ Added powerPC architecture in redhat7, in the section 'Deploy new agent'.
- `#4831 <https://github.com/wazuh/wazuh-kibana-app/pull/4831>`_ Added a centralized service to handle the requests.
- `#4873 <https://github.com/wazuh/wazuh-kibana-app/pull/4873>`_ Added data-test-subj create policy.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Added extra steps message and new command for windows xp and windows server 2008, added alpine agent with all its steps.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Deploy new agent section: Added link for additional steps to alpine os.
- `#4970 <https://github.com/wazuh/wazuh-kibana-app/pull/4970>`_ Added file saving conditions in File Editor.
- `#5021 <https://github.com/wazuh/wazuh-kibana-app/pull/5021>`_ `#5028 <https://github.com/wazuh/wazuh-kibana-app/pull/5028>`_ Added character validation to avoid invalid agent names in the section 'Deploy new agent'. 
- `#4103 <https://github.com/wazuh/wazuh-kibana-app/pull/4103>`_ Changed the HTTP verb from GET to POST in the requests to login to the Wazuh API.
- `#4376 <https://github.com/wazuh/wazuh-kibana-app/pull/4376>`_ Improved alerts summary performance.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ Improved Agents Overview performance.
- `#4529 <https://github.com/wazuh/wazuh-kibana-app/pull/4529>`_ `#4964 <https://github.com/wazuh/wazuh-kibana-app/pull/4964>`_ Improved the message displayed when there is a versions mismatch between the Wazuh API and the Wazuh APP.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ Independently load each dashboard from the Agents Overview page.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ The endpoint /agents/summary/status response was adapted. 
- `#4458 <https://github.com/wazuh/wazuh-kibana-app/pull/4458>`_ Updated and added operating systems, versions, architectures commands of Install and enroll the agent and commands of Start the agent in the deploy new agent section.
- `#4776 <https://github.com/wazuh/wazuh-kibana-app/pull/4776>`_ `#4954 <https://github.com/wazuh/wazuh-kibana-app/pull/4954>`_ Added cluster's IP and protocol as suggestions in the agent deployment wizard.
- `#4851 <https://github.com/wazuh/wazuh-kibana-app/pull/4851>`_ Show OS name and OS version in the agent installation wizard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ Changed the endpoint that updates the plugin configuration to support multiple settings.
- `#4972 <https://github.com/wazuh/wazuh-kibana-app/pull/4972>`_ The button to export the app logs is now disabled when there are no results, instead of showing an error toast.
- `#5014 <https://github.com/wazuh/wazuh-kibana-app/pull/5014>`_ Updated the winston dependency to 3.5.1.
- `#5014 <https://github.com/wazuh/wazuh-kibana-app/pull/5014>`_ Removed the angular-chart.js dependency.

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `#4323 <https://github.com/wazuh/wazuh-kibana-app/pull/4323>`_ Added the option to sort by the agents count in the group table.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ Added agent synchronization status in the agent module.
- `#4739 <https://github.com/wazuh/wazuh-kibana-app/pull/4739>`_ The input name was added and when the user adds a value the variable WAZUH_AGENT_NAME with its value appears in the installation command.
- `#4512 <https://github.com/wazuh/wazuh-kibana-app/pull/4512>`_ Redesign the SCA table from agent's dashboard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ Enhanced the plugin setting description displayed in the UI and the configuration file.
- `#4503 <https://github.com/wazuh/wazuh-kibana-app/pull/4503>`_ `#4785 <https://github.com/wazuh/wazuh-kibana-app/pull/4785>`_ Added validation to the plugin settings in the form of Settings/Configuration and the endpoint to update the plugin configuration.
- `#4505 <https://github.com/wazuh/wazuh-kibana-app/pull/4505>`_ `#4798 <https://github.com/wazuh/wazuh-kibana-app/pull/4798>`_ `#4805 <https://github.com/wazuh/wazuh-kibana-app/pull/4805>`_ Added new plugin settings to customize the header and footer on the PDF reports.
- `#4507 <https://github.com/wazuh/wazuh-kibana-app/pull/4507>`_ Added a new plugin setting to enable or disable the customization.
- `#4504 <https://github.com/wazuh/wazuh-kibana-app/pull/4504>`_ Added the ability to upload an image for the customization.logo.* settings in Settings/Configuration.
- `#4867 <https://github.com/wazuh/wazuh-kibana-app/pull/4867>`_ Added macOS version to wizard deploy agent.
- `#4833 <https://github.com/wazuh/wazuh-kibana-app/pull/4833>`_ Added powerPC architecture in redhat7, in the section 'Deploy new agent'.
- `#4831 <https://github.com/wazuh/wazuh-kibana-app/pull/4831>`_ Added a centralized service to handle the requests.
- `#4873 <https://github.com/wazuh/wazuh-kibana-app/pull/4873>`_ Added data-test-subj create policy.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Added extra steps message and new command for windows xp and windows server 2008, added alpine agent with all its steps.
- `#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_ Deploy new agent section: Added link for additional steps to alpine os.
- `#4970 <https://github.com/wazuh/wazuh-kibana-app/pull/4970>`_ Added file saving conditions in File Editor.
- `#5021 <https://github.com/wazuh/wazuh-kibana-app/pull/5021>`_ `#5028 <https://github.com/wazuh/wazuh-kibana-app/pull/5028>`_ Added character validation to avoid invalid agent names in the section 'Deploy new agent'. 
- `#4103 <https://github.com/wazuh/wazuh-kibana-app/pull/4103>`_ Changed the HTTP verb from GET to POST in the requests to login to the Wazuh API.
- `#4376 <https://github.com/wazuh/wazuh-kibana-app/pull/4376>`_ Improved alerts summary performance.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ Improved Agents Overview performance.
- `#4529 <https://github.com/wazuh/wazuh-kibana-app/pull/4529>`_ `#4964 <https://github.com/wazuh/wazuh-kibana-app/pull/4964>`_ Improved the message displayed when there is a versions mismatch between the Wazuh API and the Wazuh APP.
- `#4363 <https://github.com/wazuh/wazuh-kibana-app/pull/4363>`_ Independently load each dashboard from the Agents Overview page.
- `#3874 <https://github.com/wazuh/wazuh-kibana-app/pull/3874>`_ The endpoint /agents/summary/status response was adapted. 
- `#4458 <https://github.com/wazuh/wazuh-kibana-app/pull/4458>`_ Updated and added operating systems, versions, architectures commands of Install and enroll the agent and commands of Start the agent in the deploy new agent section.
- `#4776 <https://github.com/wazuh/wazuh-kibana-app/pull/4776>`_ `#4954 <https://github.com/wazuh/wazuh-kibana-app/pull/4954>`_ Added cluster's IP and protocol as suggestions in the agent deployment wizard.
- `#4851 <https://github.com/wazuh/wazuh-kibana-app/pull/4851>`_ Show OS name and OS version in the agent installation wizard.
- `#4501 <https://github.com/wazuh/wazuh-kibana-app/pull/4501>`_ Changed the endpoint that updates the plugin configuration to support multiple settings.
- `#4972 <https://github.com/wazuh/wazuh-kibana-app/pull/4972>`_ The button to export the app logs is now disabled when there are no results, instead of showing an error toast.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Updated the winston dependency to 3.5.1.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Updated the pdfmake dependency to 0.2.6.
- `#4992 <https://github.com/wazuh/wazuh-kibana-app/pull/4992>`_ The button to export the app logs is now disabled when there are no results, instead of showing an error toast.
- `#4985 <https://github.com/wazuh/wazuh-kibana-app/pull/4985>`_ Removed the angular-chart.js dependency.

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
`#7687 <https://github.com/wazuh/wazuh/pull/7687>`_               Fixed collection of maximum user data length. Thanks to @LubinLew.
`#10772 <https://github.com/wazuh/wazuh/pull/10772>`_             Fixed missing fields in Syscollector on Windows 10.
`#11227 <https://github.com/wazuh/wazuh/pull/11227>`_             Fixed the process startup time data provided by Syscollector on Linux. Thanks to @LubinLew.
`#11837 <https://github.com/wazuh/wazuh/pull/11837>`_             Fixed network data reporting by Syscollector related to tunnel or VPN interfaces.
`#12066 <https://github.com/wazuh/wazuh/pull/12066>`_             Skipped V9FS file system at Rootcheck to prevent false positives on WSL.
`#9067 <https://github.com/wazuh/wazuh/pull/9067>`_               Fixed double file handle closing in Logcollector on Windows. 
`#11949 <https://github.com/wazuh/wazuh/pull/11949>`_             Fixed a bug in Syscollector that may prevent the agent from stopping when the manager connection is lost.
`#12148 <https://github.com/wazuh/wazuh/pull/12148>`_             Fixed internal exception handling issues on Solaris 10.
`#12300 <https://github.com/wazuh/wazuh/pull/12300>`_             Fixed duplicate error message IDs in the log. 
`#12691 <https://github.com/wazuh/wazuh/pull/12691>`_             Fixed compilation warnings in the agent.
`#12147 <https://github.com/wazuh/wazuh/pull/12147>`_             Fixed the ``skip_on_error`` parameter of the AWS integration module, which was set to ``True`` by default.
`#12381 <https://github.com/wazuh/wazuh/pull/12381>`_             Fixed AWS DB maintenance with Load Balancer Buckets.
`#12650 <https://github.com/wazuh/wazuh/pull/12650>`_             Fixed AWS integration's ``test_config_format_created_date`` unit test. 
`#12630 <https://github.com/wazuh/wazuh/pull/12630>`_             Fixed created_date field for LB and Umbrella integrations.
`#13185 <https://github.com/wazuh/wazuh/pull/13185>`_             Fixed AWS integration database maintenance error managament.
`#13674 <https://github.com/wazuh/wazuh/pull/13674>`_             The default delay at GitHub integration has been increased to 30 seconds. 
`#14706 <https://github.com/wazuh/wazuh/pull/14706>`_             Logcollector has been fixed to allow locations containing colons (:). 
`#13835 <https://github.com/wazuh/wazuh/pull/13835>`_             Fixed system architecture reporting in Logcollector on Apple Silicon devices.
`#14190 <https://github.com/wazuh/wazuh/pull/14190>`_             The C++ standard library and the GCC runtime library is included with Wazuh.
`#13877 <https://github.com/wazuh/wazuh/pull/13877>`_             Fixed missing inventory cleaning message in Syscollector.
`#15322 <https://github.com/wazuh/wazuh/pull/15322>`_             Fixed WPK upgrade issue on Windows agents due to process locking. 
`#13044 <https://github.com/wazuh/wazuh/pull/13044>`_             Fixed FIM injection vulnerabilty when using ``prefilter_cmd`` option.
`#14525 <https://github.com/wazuh/wazuh/pull/14525>`_             Fixed the parse of ALB logs splitting ``client_port``, ``target_port`` and ``target_port_list`` in separated ``ip`` and ``port`` for each key.
`#15335 <https://github.com/wazuh/wazuh/pull/15335>`_             Fixed a bug that prevent processing Macie logs with problematic ipGeolocation values.
`#15584 <https://github.com/wazuh/wazuh/pull/15584>`_             Fixed GCP integration module error messages.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#12302 <https://github.com/wazuh/wazuh/pull/12302>`_             Fixed copy functions used for the backup files and upload endpoints to prevent incorrent metadata.
`#11010 <https://github.com/wazuh/wazuh/pull/11010>`_             Fixed a bug regarding ids not being sorted with cluster disabled in Active Response and Agent endpoints.
`#10736 <https://github.com/wazuh/wazuh/pull/10736>`_             Fixed a bug where ``null`` values from wazuh-db where returned in API responses.
`#12063 <https://github.com/wazuh/wazuh/pull/12063>`_             Connections through ``WazuhQueue`` will be closed gracefully in all situations. 
`#12450 <https://github.com/wazuh/wazuh/pull/12450>`_             Fixed exception handling when trying to get the active configuration of a valid but not configured component.
`#12700 <https://github.com/wazuh/wazuh/pull/12700>`_             Fixed api.yaml path suggested as remediation at exception.py
`#12768 <https://github.com/wazuh/wazuh/pull/12768>`_             Fixed /tmp access error in containers of API integration tests environment. 
`#13096 <https://github.com/wazuh/wazuh/pull/13096>`_             The API will return an exception when the user asks for agent inventory information and there is no database for it (never connected agents). 
`#13171 <https://github.com/wazuh/wazuh/pull/13171>`_             Improved regex used for the ``q`` parameter on API requests with special characters and brackets.
`#13386 <https://github.com/wazuh/wazuh/pull/13386>`_             Improved regex used for the ``q`` parameter on API requests with special characters and brackets.
`#12592 <https://github.com/wazuh/wazuh/pull/12592>`_             Removed board_serial from syscollector integration tests expected responses.
`#12557 <https://github.com/wazuh/wazuh/pull/12557>`_             Removed cmd field from expected responses of syscollector integration tests.
`#12611 <https://github.com/wazuh/wazuh/pull/12611>`_             Reduced maximum number of groups per agent to 128 and adjusted group name validation.
`#14204 <https://github.com/wazuh/wazuh/pull/14204>`_             Reduced amount of memory required to read CDB lists using the API.
`#14237 <https://github.com/wazuh/wazuh/pull/14237>`_             Fixed a bug where the cluster health check endpoint and CLI would add an extra active agent to the master node.
`#15311 <https://github.com/wazuh/wazuh/pull/15311>`_             Fixed bug that prevent updating the configuration when using various <ossec_conf> blocks from the API.
`#15194 <https://github.com/wazuh/wazuh/pull/15194>`_             Fixed vulnerability API integration tests' healthcheck.
==============================================================    =============

Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#11613 <https://github.com/wazuh/wazuh/pull/11613>`_             Fixed OpenWRT decoder fixed to parse UFW logs.          
==============================================================    =============

Other
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14165 <https://github.com/wazuh/wazuh/pull/14165>`_             Fixed Makefile to detect CPU archivecture on Gentoo Linux.          
==============================================================    =============

Wazuh dashboard
^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4425 <https://github.com/wazuh/wazuh-kibana-app/pull/4425>`_    Fixed nested fields filtering in dashboards tables and KPIs.
`#4428 <https://github.com/wazuh/wazuh-kibana-app/pull/4428>`_    Fixed nested field rendering in security alerts table details.
`#4539 <https://github.com/wazuh/wazuh-kibana-app/pull/4539>`_    Fixed a bug where the Wazuh logo was used instead of the custom one.
`#4516 <https://github.com/wazuh/wazuh-kibana-app/pull/4516>`_    Fixed rendering problems of the Agent Overview section in low resolutions.
`#4595 <https://github.com/wazuh/wazuh-kibana-app/pull/4595>`_    Fixed issue when logging out from Wazuh when SAML is enabled.
`#4710 <https://github.com/wazuh/wazuh-kibana-app/pull/4710>`_    Fixed server errors with code 500 when the Wazuh API is not reachable / up.
`#4653 <https://github.com/wazuh/wazuh-kibana-app/pull/4653>`_    Fixed pagination to SCA table.
`#4849 <https://github.com/wazuh/wazuh-kibana-app/pull/4849>`_    Fixed WAZUH_PROTOCOL param suggestion.
`#4876 <https://github.com/wazuh/wazuh-kibana-app/pull/4876>`_    Raspbian OS, Ubuntu, Amazon Linux and Amazon Linux 2 commands in the wizard deploy agent now change when a different architecture is selected.
`#4929 <https://github.com/wazuh/wazuh-kibana-app/pull/4929>`_    Disabled unmapped fields filter in Security Events alerts table.
`#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_    Deploy new agent section: Fixed the way macos versions and architectures were displayed, fixed the way agents were displayed, fixed the way ubuntu versions were displayed.
`#4943 <https://github.com/wazuh/wazuh-kibana-app/pull/4943>`_    Fixed agent deployment instructions for HP-UX and Solaris. 
`#4638 <https://github.com/wazuh/wazuh-kibana-app/pull/4638>`_    Fixed a bug that caused the flyouts to close when clicking inside them.
`#4981 <https://github.com/wazuh/wazuh-kibana-app/pull/4981>`_    Fixed the manager option in the agent deployment section.
`#4962 <https://github.com/wazuh/wazuh-kibana-app/pull/4962>`_    Fixed commands in the deploy new agent section(most of the commands are missing '-1').
`#4968 <https://github.com/wazuh/wazuh-kibana-app/pull/4968>`_    Fixed agent installation command for macOS in the deploy new agent section.
`#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_    Deploy new agent section: Fixed the way macos versions and architectures were displayed, fixed the way agents were displayed, fixed the way ubuntu versions were displayed.
`#4943 <https://github.com/wazuh/wazuh-kibana-app/pull/4943>`_    Fixed agent deployment instructions for HP-UX and Solaris.
`#4999 <https://github.com/wazuh/wazuh-kibana-app/pull/4999>`_    Fixed Inventory checks table filters by stats.
`#4942 <https://github.com/wazuh/wazuh-kibana-app/pull/4942>`_    Fixed agent graph in opensearch dashboard.
`#4962 <https://github.com/wazuh/wazuh-kibana-app/pull/4962>`_    Fixed commands in the deploy new agent section(most of the commands are missing '-1').
`#4968 <https://github.com/wazuh/wazuh-kibana-app/pull/4968>`_    Fixed agent installation command for macOS in the deploy new agent section.
`#4984 <https://github.com/wazuh/wazuh-kibana-app/pull/4984>`_    Fixed commands in the deploy new agent section(most of the commands are missing '-1').
`#4975 <https://github.com/wazuh/wazuh-kibana-app/pull/4975>`_    Fixed vulnerabilities default last scan date formatter.
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.10.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4425 <https://github.com/wazuh/wazuh-kibana-app/pull/4425>`_    Fixed nested fields filtering in dashboards tables and KPIs.
`#4428 <https://github.com/wazuh/wazuh-kibana-app/pull/4428>`_    Fixed nested field rendering in security alerts table details.
`#4539 <https://github.com/wazuh/wazuh-kibana-app/pull/4539>`_    Fixed a bug where the Wazuh logo was used instead of the custom one.
`#4516 <https://github.com/wazuh/wazuh-kibana-app/pull/4516>`_    Fixed rendering problems of the Agent Overview section in low resolutions.
`#4595 <https://github.com/wazuh/wazuh-kibana-app/pull/4595>`_    Fixed issue when logging out from Wazuh when SAML is enabled.
`#4710 <https://github.com/wazuh/wazuh-kibana-app/pull/4710>`_    Fixed server errors with code 500 when the Wazuh API is not reachable / up.
`#4653 <https://github.com/wazuh/wazuh-kibana-app/pull/4653>`_    Fixed pagination to SCA table.
`#4849 <https://github.com/wazuh/wazuh-kibana-app/pull/4849>`_    Fixed WAZUH_PROTOCOL param suggestion.
`#4876 <https://github.com/wazuh/wazuh-kibana-app/pull/4876>`_    Raspbian OS, Ubuntu, Amazon Linux and Amazon Linux 2 commands in the wizard deploy agent now change when a different architecture is selected.
`#4929 <https://github.com/wazuh/wazuh-kibana-app/pull/4929>`_    Disabled unmapped fields filter in Security Events alerts table.
`#4981 <https://github.com/wazuh/wazuh-kibana-app/pull/4981>`_    Fixed the manager option in the agent deployment section.
`#4962 <https://github.com/wazuh/wazuh-kibana-app/pull/4962>`_    Fixed commands in the deploy new agent section(most of the commands are missing '-1').
`#4968 <https://github.com/wazuh/wazuh-kibana-app/pull/4968>`_    Fixed agent installation command for macOS in the deploy new agent section.
`#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_    Deploy new agent section: Fixed the way macos versions and architectures were displayed, fixed the way agents were displayed, fixed the way ubuntu versions were displayed.
`#4943 <https://github.com/wazuh/wazuh-kibana-app/pull/4943>`_    Fixed agent deployment instructions for HP-UX and Solaris.
`#4999 <https://github.com/wazuh/wazuh-kibana-app/pull/4999>`_    Fixed Inventory checks table filters by stats.
`#4975 <https://github.com/wazuh/wazuh-kibana-app/pull/4975>`_    Fixed vulnerabilities default last scan date formatter.
`#5035 <https://github.com/wazuh/wazuh-kibana-app/pull/5035>`_    A solaris command has been fixed.
==============================================================    =============

Wazuh Kibana plugin for Kibana 7.16.x and 7.17.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#4425 <https://github.com/wazuh/wazuh-kibana-app/pull/4425>`_    Fixed nested fields filtering in dashboards tables and KPIs.
`#4428 <https://github.com/wazuh/wazuh-kibana-app/pull/4428>`_    Fixed nested field rendering in security alerts table details.
`#4539 <https://github.com/wazuh/wazuh-kibana-app/pull/4539>`_    Fixed a bug where the Wazuh logo was used instead of the custom one.
`#4516 <https://github.com/wazuh/wazuh-kibana-app/pull/4516>`_    Fixed rendering problems of the Agent Overview section in low resolutions.
`#4595 <https://github.com/wazuh/wazuh-kibana-app/pull/4595>`_    Fixed issue when logging out from Wazuh when SAML is enabled #4595
`#4710 <https://github.com/wazuh/wazuh-kibana-app/pull/4710>`_    Fixed server errors with code 500 when the Wazuh API is not reachable / up.
`#4653 <https://github.com/wazuh/wazuh-kibana-app/pull/4653>`_    Fixed pagination to SCA table.
`#4849 <https://github.com/wazuh/wazuh-kibana-app/pull/4849>`_    Fixed WAZUH_PROTOCOL param suggestion.
`#4876 <https://github.com/wazuh/wazuh-kibana-app/pull/4876>`_    Raspbian OS, Ubuntu, Amazon Linux and Amazon Linux 2 commands in the wizard deploy agent now change when a different architecture is selected.
`#4929 <https://github.com/wazuh/wazuh-kibana-app/pull/4929>`_    Disabled unmapped fields filter in Security Events alerts table.
`#4832 <https://github.com/wazuh/wazuh-kibana-app/pull/4832>`_    Fixed the agents wizard OS styles and their versions.
`#4981 <https://github.com/wazuh/wazuh-kibana-app/pull/4981>`_    Fixed the manager option in the agent deployment section.
`#4962 <https://github.com/wazuh/wazuh-kibana-app/pull/4962>`_    Fixed commands in the deploy new agent section(most of the commands are missing '-1').
`#4968 <https://github.com/wazuh/wazuh-kibana-app/pull/4968>`_    Fixed agent installation command for macOS in the deploy new agent section.
`#4933 <https://github.com/wazuh/wazuh-kibana-app/pull/4933>`_    Deploy new agent section: Fixed the way macos versions and architectures were displayed, fixed the way agents were displayed, fixed the way ubuntu versions were displayed.
`#4943 <https://github.com/wazuh/wazuh-kibana-app/pull/4943>`_    Fixed agent deployment instructions for HP-UX and Solaris.
`#4999 <https://github.com/wazuh/wazuh-kibana-app/pull/4999>`_    Fixed Inventory checks table filters by stats.
`#4983 <https://github.com/wazuh/wazuh-kibana-app/pull/4983>`_    Fixed agent installation command for macOS in the deploy new agent section.
`#4962 <https://github.com/wazuh/wazuh-kibana-app/pull/4962>`_    Fixed commands in the deploy new agent section(most of the commands are missing '-1').
`#4975 <https://github.com/wazuh/wazuh-kibana-app/pull/4975>`_    Fixed vulnerabilities default last scan date formatter.
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
