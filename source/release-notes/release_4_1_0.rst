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

- Support for PCRE2 regular expressions in rules and decoders. 
- New **ruleset test module** to enable testing and verification of rules via the Wazuh User Interface. 
- New **upgrade module** which offers simultaneous agent upgrades over single node or cluster architecture. WPK upgrade feature has been moved to this module. 
- The Vulnerability Detector now supports macOS agents. These agents must be updated to 4.1 to scan vulnerabilities.
- Support for AWS load balancers (Application Load Balancer, Classic Load Balancer and Network Load Balancer).
- Removed limit on the number of agents that a manager can support.
- Migration of rootcheck results to Wazuh DB to remove the files with the results of each agent. 

Wazuh core
----------

Added
^^^^^

**Core**

- Negation logic for rules.
- Support for ``PCRE2`` regular expressions in rules and decoders.
- New **ruleset test module** to enable testing and verification of rules via the Wazuh User Interface. 
- New **upgrade module** which offers simultaneous agent upgrades over single node or cluster architecture. WPK upgrade feature has been moved to this module. 
- New **task module** that stores and manages all the upgrade tasks executed in the agents or managers. 
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
- Moved CA configuration section to verify WPK signatures from  the``active-response`` section to the ``agent-upgrade section``.
- The tool ossec-logtest is deprecated in favor of wazuh-logtest which uses a new testing service integrated in Analysisd.
- Modified error message to debug when multiple daemons attempt to remove an agent simultaneously.
- Replaced error message with a warning when the agent fails to reach a module. 


**API**

- The status parameter behavior in the ``DELETE /agents`` endpoint to enhance security.
- Upgraded endpoints to accept a list of agents, maximum 100 agents per request.
- Improved input validation regexes for ``names`` and ``array_names``.

**Framework**

- Refactored framework to work with the new upgrade module.
- Refactored agent upgrade CLI to work with the new upgrade module. It distributes petitions in a clustered environment.
- Rule and decoder details structure to support PCRE2.
- Refactor framework to adapt agent status changes in wazuh.db. 
- Improved performance of AWS Config integration by removing alert fields with variables such as Instance ID in its name.

Fixed
^^^^^

**Core**

- Error in ``analysisd`` when getting the ossec group ID.
- Prevented FIM from reporting configuration error when patterns in settings match no files.
- The array parsing when building JSON alerts.
- Added Firefox ESR to the CPE helper to distinguish it from Firefox when looking for vulnerabilities.
- The evaluation of packages from external sources with the official vendor feeds in Vulnerability Detector.
- The handling of duplicated tags in the Vulnerability Detector configuration.
- The validation of hotfixes gathered by Syscollector.
- The reading of the Linux OS version when ``/etc/os-release`` does not provide it.
- A false positive when comparing the minor target of CentOS packages in Vulnerability Detector.
- A zombie process leak in ``modulesd`` when using commands without a timeout.
- A race condition in Remoted that might create agent-group files with wrong permissions.
- A warning log in Wazuh DB when upgrading the global database.
- Fixed a bug in FIM on Windows that caused false positive due to changes in the host timezone or the daylight saving time when monitoring files in a FAT32 filesystem.


**API**

- An error with ``/groups/{group_id}/config`` endpoints (GET and PUT) when using complex ``localfile`` configurations.

**Framework**

- A ``cluster_control`` bug that caused an error message when running ``wazuh-clusterd`` in foreground.


Wazuh Kibana plugin
-------------------

Added
^^^^^
- Label to indicate that the wui_ rules only apply to the wazuh-wui API user. 
- Modified agent registration adding groups and architecture. 


Changed
^^^^^^^
- Support new fields of Windows Registry at FIM inventory panel.

Fixed
^^^^^
- Wazuh menu and agent menu for Solaris agents.
- Wrong shards and replicas for statistics indices and also fixed wrong prefix for monitoring indices.
- Top bar overlayed over expanded visualizations. 
- Empty inventory data in Solaris agents.
- Wrong parameters in the dev-tools autocomplete section.
- Wrong permissions on edit CDB list.
- Add the metafields when refreshing the index pattern.
- Error toast is showing about Elasticsearch users for environments without security.
- Error about Handler.error in Role Mapping.
- Fixed message in reserved users actions.
- Error 500 on Export formatted CDB list.
- Double tooltip for the wui rules label.  

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
