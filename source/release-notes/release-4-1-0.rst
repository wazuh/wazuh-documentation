.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.1.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_1_0:

4.1.0 Release notes - 15 February 2021
======================================

This section lists the changes in version 4.1.0. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.1.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.10/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/4.1/CHANGELOG.md>`_

Highlights
----------

- Added support for regular expressions negation and PCRE2 format in rules and decoders.
- New **ruleset test module** managed by the analysis daemon allowing testing sessions of rules and decoders.
- New **upgrade module** that provides simultaneous agent upgrades in a single node or cluster architecture.
- The Vulnerability Detector now supports macOS agents. These agents must be updated to 4.1 to scan vulnerabilities.
- Support for AWS load balancers logs: Application Load Balancer, Classic Load Balancer, and Network Load Balancer.
- Removed the limit on the number of agents a manager can support.
- New endpoints to query and manage Rootcheck data.
- Support for Open Distro for Elasticsearch 1.12.0.
- Support for Elastic Stack basic license 7.10.0 and 7.10.2.

Wazuh core
----------

Added
^^^^^

**Core**

- Negation logic for rules.
- Support for ``PCRE2`` regular expressions in rules and decoders.
- New **ruleset test module** managed by the analysis daemon allowing testing sessions of rules and decoders.
- New **upgrade module** that provides simultaneous agent upgrades in a single node or cluster architecture. WPK upgrade functionality has been moved to this module.
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

- Support for AWS load balancers logs: Application Load Balancer, Classic Load Balancer, and Network Load Balancer.

**Framework**

- New framework modules to use the ``logtest`` tool.
- Improved ``q`` parameter on rules, decoders, and ``cdb-lists`` modules to allow multiple nested fields.

Changed
^^^^^^^

**Core**

- Removed limit on the number of agents that a manager can support.
- Migration of rootcheck results to Wazuh DB to remove the files with the results of each agent.
- New mechanism to close RIDS files when agents are disconnected.
- Moved CA configuration section to verify WPK signatures from the ``active-response`` section to the ``agent-upgrade section``.
- The ossec-logtest tool is deprecated and replaced by wazuh-logtest, which uses a new testing service integrated in Analysisd.
- Modified the error message to debug when multiple daemons attempt to remove an agent simultaneously.
- Replaced the error message with a warning when the agent fails to reach a module. 


**API**

- The status parameter behavior in the ``DELETE /agents`` endpoint to enhance security.
- Allow agent upgrade endpoints to accept a list of agents, maximum 100 agents per request.
- Improved input validation regexes for ``names`` and ``array_names``.

**Framework**

- Refactored framework to work with the new upgrade module.
- Refactored agent upgrade CLI to work with the new upgrade module. It distributes petitions in a clustered environment.
- Rule and decoder details structure to support PCRE2.
- Refactored framework to adapt agent status changes in ``wazuh.db``. 
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
- A bug in FIM on Windows that caused false positives due to changes in the host timezone or the daylight saving time when monitoring files in a FAT32 filesystem.


**API**

- An error with ``/groups/{group_id}/config`` endpoints (GET and PUT) when using complex ``localfile`` configurations.

**Framework**

- A ``cluster_control`` bug that caused an error message when running ``wazuh-clusterd`` in foreground.


Wazuh Kibana plugin
-------------------

Added
^^^^^
- Check the Kibana max buckets config by default in health-check and increase them. 
- A warning in the role mapping section if the ``run_as`` setting is disabled.
- A label to indicate that the ``wui_`` rules only apply to the ``wazuh-wui`` API user. 

Changed
^^^^^^^

- Adapted the Wazuh Kibana plugin to the new Kibana platform.
- Wazuh config directory moved from ``/usr/share/kibana/optimize`` to ``/usr/share/kibana/data`` Kibana directory.
- Support on FIM Inventory Windows Registry for the new scheme with registry_key and registry_value from syscheck.
- Uncheck agents after an action in agents groups management.
- Unsave rule files when editing or creating a rule with invalid content.
- Replaced Wazuh API user with ``wazuh-wui`` in the default configuration.
- Add agent id to the reports name in Agent Inventory and Modules.
- Allow access to the Agents section with ``agent:group`` resource permission.
- Added vulnerabilities module for macOS agents. 


Fixed
^^^^^
- Server error Invalid token specified: Cannot read property 'replace' of undefined.
- Show empty rules and decoders files.
- Wrong hover texts in CDB list actions.
- Access to forbidden agents information when exporting agents list. 
- The complex search using the Wazuh API query filter in search bars.
- Validation to check if ``userPermissions`` are not ready yet.             
- Agents table OS field sorting: Changed agents table field ``os_name`` to ``os.name,os.version`` to make it sortable.
- Different parsed ``datetime`` between agent detail and agents overview table.
- An error with the agents status pie chart tooltip that did not display the number of agents on the first hover.   
- Menu crash when Solaris agents are selected. 
- Report's creation dates set to 1970-01-01T00:00:00.000Z in some OS. 
- Missing commands for Ubuntu/Debian and CentOS on the Deploy new agent section. 
- Different hours displayed on Alerts List section in some dashboards. 
- Permissions to access agents when policy agent:read is set.
- SCA permissions for agents views and dashboards.
- Settings of statistics indices creation that did not work properly. 


Wazuh ruleset
-------------

Added
^^^^^
- The ruleset update tool is now able to bypass the version check with the force option.
- New AWS Config-History rules to make it more granular by including every item status supported.
- Several hundred new SCA policies for various operating systems.

Changed
^^^^^^^
- FIM rules have been adapted to the improvements for Windows Registry monitoring.

Fixed
^^^^^
- Updated MITRE techniques in web rules.
- Sonicwall predecoder to accept whitespaces at the beginning.
