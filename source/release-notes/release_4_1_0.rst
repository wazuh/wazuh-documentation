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

- The Vulnerability Detector now supports macOS agents. These agents must be updated to 4.1 in order scan vulnerabilities.


Wazuh core
----------

Added
^^^^^

**Core**
- Allow negation of expressions in rules.
- Support for PCRE2 regular expressions in rules and decoders.
- Added new ruleset test module. Allow testing and verification of rules and decoders using Wazuh User Interface.
- Added new upgrade module. WPK upgrade feature has been moved to this module, which offers support for cluster architecture and simultaneous upgrades.
- Added new task module. This module stores and manages all the tasks that are executed in the agents or managers.
- Let the time interval to detect that an agent got disconnected configurable. Deprecate parameter ``DISCON_TIME``.
- Added support to macOS in Vulnerability Detector.
- Added the capability to perform FIM on values in the Windows Registry.

**API**
- Added endpoints to query and manage Rootcheck data.
- Added new endpoint to check status of tasks.
- Added new endpoints to run the logtest tool and delete a logtest session.
- Added debug2 mode for API log and improved debug mode.
- Added missing secure headers for API responses.
- Added new config option to disable uploading configurations containing remote commands.

**AWS module**
- Added support for AWS load balancers (Application Load Balancer, Classic Load Balancer and Network Load Balancer).

**Framework**
- Added new framework modules to use the logtest tool.
- Improved ``q`` parameter on rules, decoders and cdb-lists modules to allow multiple nested fields.

Changed
^^^^^^^

**Core**
-Removed the limit of agents that a manager can support.
    -Migration of rootcheck results to Wazuh DB to remove the files with the results of each agent.
    -Designed new mechanism to close RIDS files when agents are disconnected.
-Moved CA configuration section to verify WPK signatures from active-response section to agent-upgrade section.
-Changed error message to debug when multiple daemons attempt to remove an agent simultaneously
-Changed error message to warning when the agent fails to reach a module.

**API**
- Changed the status parameter behavior in the ``DELETE /agents`` endpoint to enhance security.
- Changed upgrade endpoints to accept a list of agents, maximum 100 agents per request.
- Improved input validation regexes for ``names`` and ``array_names``.

**Framework**
- Refactored framework to work with new upgrade module.
- Refactored agent upgrade CLI to work with new ugprade module. It distributes petitions in a clustered environment.
- Changed rule and decoder details structure to support PCRE2.
- Changed access to agent status.
- Improved AWS Config integration to avoid performance issues by removing alert fields with variables such as Instance ID in its name.

Fixed
^^^^^

**Core**
- Fixed error in Analysisd when getting the ossec group ID.
- Prevented FIM from reporting configuration error when setting patterns that match no files.
- Fixed the array parsing when building JSON alerts.
- Added Firefox ESR to the CPE helper to distinguish it from Firefox when looking for vulnerabilities.
- Fixed the evaluation of packages from external sources with the official vendor feeds in Vulnerability Detector.
- Fixed the handling of duplicated tags in the Vulnerability Detector configuration.
- Fixed the validation of hotfixes gathered by Syscollector.
- Fixed the reading of the Linux OS version when ``/etc/os-release`` does not provide it.
- Fixed a false positive when comparing the minor target of CentOS packages in Vulnerability Detector.
- Fixed a zombie process leak in Modulesd when using commands without a timeout.
- Fixed a race condition in Remoted that might create agent-group files with wrong permissions.
- Fixed a warning log in Wazuh DB when upgrading the global database.
- Fixed a bug in FIM on Windows that caused false positive due to changes in the host timezone or the daylight saving time when monitoring files in a FAT32 filesystem.
- Fixed the purge of the Redhat vulnerabilities database before updating it.

**API**
- Fixed an error with ``/groups/{group_id}/config`` endpoints (GET and PUT) when using complex ``localfile`` configurations.

**Framework**
- Fixed a ``cluster_control`` bug that caused an error message when running ``wazuh-clusterd`` in foreground.
- Fixed a bug with ``add_manual``(agents) function when ``authd`` is disabled.

Wazuh Kibana plugin
-------------------

Wazuh ruleset
-------------

Added
^^^^^
- Let the Ruleset update tool to bypass the version check with the force option.
- Added new AWS Config-History rules to make it more granular by including every item status supported.
- Several hundred new SCA policies added for various operating systems

Changed
^^^^^^^
- FIM rules have been adapted to the improvements for Windows Registry monitoring.

Fixed
^^^^^
- Updated MITRE techniques in web rules.
- Fixed Sonicwall predecoder to accept whitespaces at the beginning.
