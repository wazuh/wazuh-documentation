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

**Vulnerability detector**

- Added support for Windows agents. It looks for vulnerabilities related to installed software, as well as those of the OS itself.
- Added support for Debian 10 and RHEL8.
- Vulnerability detector alerts include PCI-DSS mapping.

**Inventory**

- Added inventory of Windows Security Updates.
- Processes and ports inventory are now supported in macOS X agents.

**Log collection**

- Allowed JSON escaping for logs on Logcollector's output format.
- Added the host's primary IP to Logcollector's output format.
- Fixed Logcollector wildcards to not detect directories as log files.

**Analysis engine**

- Frequency rules now depend on the event source (agents) by default. This behavior can be switched by the option ``global_frequency``.
- Fixed the use of fields ``protocol``, ``system_name``, ``data`` and ``extra_data`` as rule fields in the analysis stage.
- The ``ossec-makelist`` binary is deprecated since the ``Analysisd`` module compiles the CDB lists on startup.

**Other fixes and improvements**

- The Wazuh agent modules now waits until the network service is ready.
- The authentication service now displays a warning message when registering to an unverified manager.
- Added a validation for avoiding agents to keep trying to connect to an invalid address indefinitely.
- Windows EventChannel alerts now include the full message with the translation of coded fields.

Wazuh API
---------

- The query parameter (``q``) now can be used to filter rules, decoders or logs.
- New endpoint I: ``PUT /agents/group/{group_id}/restart`` to restart all agents in a group.
- New endpoint II: ``GET /syscollector/:agent_id/hotfixes`` to get hotfixes info.
- Improved error descriptions for the ``PUT /agents/:agent_id/upgrade_custom API`` call.

Wazuh Ruleset
-------------

- New decoders and rules to integrate McAfee ePolicy Orchestrator in our ruleset.
- Added rules to collect events related to the Windows firewall.
- Now OSQuery logs related to internal messages appear in alerts.

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
