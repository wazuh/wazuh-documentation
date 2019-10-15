.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_11_0:

3.11.0 Release notes
====================

This section shows the most relevant improvements and fixes in version 3.11.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.11.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.11.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.11.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.11.0-7.4.0/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.11.0-7.3.0/CHANGELOG.md>`_

Wazuh core
----------
- Vulnerability detector module now supports Windows Agents. 
- The Wazuh agent modules now waits until the network service is ready.
- The ossec-makelist binary is now deprecated and the Analysisd module compiles the CDB lists on each restart. 
- Wazuh agent now checks if the ``MANAGER_IP`` is a valid IP or hostname. This prevents the agents to keep trying to connect to an invalid address indefinitely.
- Under certain conditions Authd was overwriting an agent with the same IP, now it outputs a duplicated IP error. 
- Processes and ports inventory are now supported in macOS X agents.
- Bug fixed while entering a wildcard path in localfile and creating folders inside that path.

Wazuh API
---------

- The query parameter (``q``) now can be used to filter rules, decoders or logs.
- New endpoint I: ``PUT /agents/group/{group_id}/restart`` to restart all agents in a group.
- New endpoint II: ``GET /syscollector/:agent_id/hotfixes`` to get hotfixes info.
- Improved error descriptions for the ``PUT /agents/:agent_id/upgrade_custom API`` call.

Wazuh Ruleset
-------------

- New decoders and rules to integrate McAfee ePolicy Orchestrator in our ruleset.
- The frequency rules are now source dependant(increased for the same agent by default). The new ``global_frequency`` rules option allows making frequency rules not source dependant.
- Ruleset ``protocol``, ``system_name``, ``data`` and ``extra_data`` fields are now correctly recognized in the events parsing and rule checking.

Wazuh Kibana App
----------------
- Support for Kibana v7.4.0
- The API credentials configuration has been moved from the .wazuh index to the wazuh.yml configuration file. Now the hosts API configuration is done from this file and not from the application.
- Reporting module events are now logged in the Wazuh App logs.
- The index pattern selector is now hidden in case that only one index exists.
- Fixed error exporting as CSV the files into a group.

Wazuh Splunk App
----------------
- CDB lists names are now correctly displayed.
- Fixed a bug in Syscheck section when generating a PDF configuration summary.

**Other additions and improvements for both Apps**

- The new log collection option ``<reconnect_time>`` is included in the Log collection configuration section.
- Rules/Decoders/CDB-lists files can be uploaded using a Drag & Drop feature.
- Extended the "Add new agent" guide.
- Opening an empty file is now correctly handled and doesn't lead to an unexpected error.
