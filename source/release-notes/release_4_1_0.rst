.. Copyright (C) 2020 Wazuh, Inc.

.. _release_4_1_0:

4.1.0 Release notes
===================

This section lists the changes in version 4.1.0. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.9/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/4.1/CHANGELOG.md>`_

Highlights
----------

- Support for PCRE2 regular expressions in rules and decoders has been added.
- New **ruleset test module** to enable testing and verification of rules via the Wazuh User Interface. 
- New **upgrade module** that provides simultaneous agent upgrades in single node or cluster architecture. The WPK upgrade functionality has been moved to this module. 
- The Vulnerability Detector now supports macOS agents. These agents must be updated to 4.1 to scan vulnerabilities.
- Support for AWS load balancers (Application Load Balancer, Classic Load Balancer and Network Load Balancer).
- Removed the limit on the number of agents a manager can support.
- Migration of rootcheck results to Wazuh DB in order to delete the files with the results of each agent.

Wazuh core
----------

Added
^^^^^

**Core**

- Negation logic for rules.
- Support for ``PCRE2`` regular expressions in rules and decoders.
- New **ruleset test module** to enable testing and verification of rules via the Wazuh User Interface. 
- New **upgrade module** that provides simultaneous agent upgrades in single node or cluster architecture. WPK upgrade functionality has been moved to this module.
- New **task module** that collects and manages all the upgrade tasks executed in the agents or managers. 
- Let the time interval to detect that an agent got disconnected configurable. Deprecate parameter ``DISCON_TIME``.
- Vulnerability Detector support for macOS. 
- Capability to perform FIM on values in the Windows Registry.

**API**

- New endpoints to query and manage ``rootcheck`` data.
- New endpoint to check task status. 
- New endpoints to run the ``logtest`` tool and delete a ``logtest`` session.
- ``debug2`` mode for API log and improved debug mode.

**AWS module**

- Support for AWS load balancers: Application Load Balancer, Classic Load Balancer, and Network Load Balancer.

**Framework**

- New framework modules to use the ``logtest`` tool.
- Improved ``q`` parameter on rules, decoders, and ``cdb-lists`` modules to allow multiple nested fields.

Changed
^^^^^^^

**Core**

- Removed limit on the number of agents that a manager can support.
- Migration of rootcheck results to Wazuh DB to remove the files with the results of each agent.
- New mechanism to close RIDS files when agents are disconnected.
- Moved CA configuration section to verify WPK signatures from  the ``active-response`` section to the ``agent-upgrade section``.
- The ossec-logtest tool is deprecated and replaced by wazuh-logtest, which uses a new testing service integrated in Analysisd.
- Modified the error message to debug when multiple daemons attempt to remove an agent simultaneously.
- Replaced the error message with a warning when the agent fails to reach a module. 


**API**

- The status parameter behavior in the ``DELETE /agents`` endpoint to enhance security.
- Upgraded endpoints to accept a list of agents, maximum 100 agents per request.
- Improved input validation regexes for ``names`` and ``array_names``.

**Framework**

- Refactored framework to work with the new upgrade module.
- Refactored agent upgrade CLI to work with the new upgrade module. It distributes petitions in a clustered environment.
- Rule and decoder details structure to support PCRE2.
- Refactor framework to adapt agent status changes in wazuh.db. 
- Improved the performance of AWS Config integration by removing alert fields with variables such as Instance ID in its name.

Fixed
^^^^^

**Core**

- An error in ``analysisd`` when getting the ossec group ID.
- Prevented FIM from reporting configuration error when patterns in settings match no files.
- The array parsing when building JSON alerts.
- Added Firefox ESR to the CPE helper to distinguish it from Firefox when looking for vulnerabilities.
- The evaluation of packages from external sources with the official vendor feeds in Vulnerability Detector.
- The handling of duplicated tags in the Vulnerability Detector configuration.
- The validation of hotfixes gathered by Syscollector.
- The reading of the Linux OS version when ``/etc/os-release`` does not provide it.
- A false positive when comparing the minor target of CentOS packages in Vulnerability Detector.
- A zombie process leaks in ``modulesd`` when using commands without a timeout.
- A race condition in Remoted that might create agent-group files with wrong permissions.
- A warning log in Wazuh DB when upgrading the global database.
- Fixed a bug in FIM on Windows that caused false positives due to changes in the host timezone or the daylight saving time when monitoring files in a FAT32 filesystem.


**API**

- An error with ``/groups/{group_id}/config`` endpoints (GET and PUT) when using complex ``localfile`` configurations.

**Framework**

- A ``cluster_control`` bug that caused an error message when running ``wazuh-clusterd`` in foreground.



Wazuh Kibana plugin - Revision 4101
-----------------------------------

Added
^^^^^
- Check the max buckets by default in health check and increase them. 
- Added a prompt warning in role mapping if run_as is false or he is not allowed to use it by API. 

Changed
^^^^^^^
- Support new fields of Windows Registry at FIM inventory panel.
- Added on FIM Inventory Windows Registry registry_key and registry_value items from syscheck.
- Uncheck agents after an action in agents groups management.
- Unsaved rule files when edit or create a rule with invalid content.

Fixed
^^^^^
- Server error Invalid token specified: Cannot read property 'replace' of undefined.
- Show empty files rules and decoders.
- Wrong hover texts in CDB lists actions.
- Access to forbidden agents information when exporting agents list.
- The decoder detail view is not displayed.
- The complex search using the Wazuh API query filter in search bars.
- Validation to check userPermissions are not ready yet.
- Clear visualizations manager list when switching tabs. Fixes PDF reports filters.
- Strange box shadow in Export popup panel in Management > Groups.
- Wrong command on alert when data folder does not exist.
- Agents table OS field sorting: Changes agents table field os_name to os.name,os.version to make it sortable. 
- Diff parsed datetime between agent detail and agents table.
- Allow access to Agents section with agent:group action permission.
- Filters does not work on modals with search bar.
- Wrong package name in deploy new agent.
- Number agents not show on pie onMouseEvent.
- Fixed off Kibana Query Language in search bar of Controls/Inventory modules.
- Number of agents do not show on the pie chart tooltip in agents preview.



Wazuh Kibana plugin
-------------------

Added
^^^^^
- A label to indicate that the `wui_` rules only apply to the wazuh-wui API user. 
- Each user can only view their own reports. 
- Wazuh data directory moved from optimize to data Kibana directory.
- Adapt the app to the new Kibana platform.
- Modified agent registration adding groups and architecture. 


Changed
^^^^^^^
- Support new fields of Windows Registry at FIM inventory panel.
- Replaced wazuh Wazuh API user by wazuh-wui in the default configuration. 

Fixed
^^^^^
- Wazuh menu and agent menu for Solaris agents.
- Wrong shards and replicas for statistics indices and also fixed wrong prefix for monitoring indices.
- Top bar overlayed over expanded visualizations. 
- Empty inventory data in Solaris agents.
- Wrong parameters in the dev-tools autocomplete section.
- Wrong permissions on edit CDB list.
- Add the metafields when refreshing the index pattern.
- An error toast is displayed on Elasticsearch users for non-secure environments.
- Error about Handler.error in Role Mapping.
- Fixed message in reserved users actions.
- Error 500 on Export formatted CDB list.
- Double tooltip for the wui rules label.
- Create an index pattern even if there are not available indices. 
- Report creation dates set to 1970-01-01T00:00:00.000Z.
- A bug for missing commands in Ubuntu/Debian and Centos.
- A bug that shows an hour before in ``/security-events/dashboard``. 

Wazuh ruleset
-------------

Added
^^^^^
- Let the ruleset update tool to bypass the version check with the force option.
- New AWS Config-History rules to make it more granular by including every item status supported.
- Several hundred new SCA policies added for various operating systems.

Changed
^^^^^^^
- FIM rules have been adapted to the improvements for Windows Registry monitoring.

Fixed
^^^^^
- Updated MITRE techniques in web rules.
- Sonicwall predecoder to accept whitespaces at the beginning.
