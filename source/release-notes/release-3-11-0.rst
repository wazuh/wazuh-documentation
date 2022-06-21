.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh 3.11.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_3_11_0:

3.11.0 Release notes - 23 December 2019
=======================================

This section shows the most relevant improvements and fixes in version 3.11.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.11.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.11.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.11.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.11.0-7.5.1/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/tree/v3.11.0-8.0.0/CHANGELOG.md>`_

Wazuh core
----------

**Vulnerability detector**

- Windows support. Thanks to a combination of NVD feed and the Microsoft Security guide, the module is able to detect system vulnerabilities and software vulnerabilities.
- Added support for Debian 10 and RHEL 8.
- Vulnerability detector alerts include PCI-DSS mapping.

**Inventory**

- Added extraction for Windows Security Updates (hotfixes).
- Processes and ports are now supported in macOS.

**Log collection**

- Allowed JSON escaping for logs in the output format.
- Added the host's primary IP address in the output format.
- Wildcards don't detect directories as log files any more.

**Analysis engine**

- Frequency based rules aggregate the counter for the same event source by default. Introduced a new setting to toggle this behavior: ``global_frequency``.
- Fields ``protocol``, ``system_name``, ``data`` and ``extra_data`` can now be used for event matching in rules creation.
- The ``ossec-makelist`` binary has been deprecated. The ``Analysisd`` daemon will compile the CDB lists on the startup.

**Other fixes and improvements**

- The Wazuh agent now waits until the network service is ready before start.
- The agent key request service now displays a warning message when registering to an unverified manager.
- Improved ``<address>`` field validation at agent start up.
- Windows EventChannel alerts now include the full message with the coded field translation.

Wazuh API
---------

- The query parameter (``q``) now can be used for filtering rules, decoders and logs.
- New endpoint I: ``PUT /agents/group/{group_id}/restart`` for restarting all agents assigned to a group.
- New endpoint II: ``GET /syscollector/:agent_id/hotfixes`` for listing the system hotfixes (Windows).
- Improved error descriptions for the ``PUT /agents/:agent_id/upgrade_custom API`` call.

Wazuh Ruleset
-------------

- New decoders and rules for McAfee ePolicy Orchestrator.
- Added rules to collect events related to the Windows firewall.
- OSQuery logs related to internal messages appear in alerts.

Wazuh WUI for Kibana
---------------------
- Support for Kibana: v6.8.6, v7.5.1.
- Support for OpenDistro: v1.3.0.
- The API credentials configuration has been migrated from the ``.wazuh`` index to the ``wazuh.yml`` configuration file. Now the hosts API configuration is managed from this configuration file instead from the WUI.
- Reporting module events are now logged in the Wazuh WUI logs.
- The index pattern selector is now hidden in case that only one index exists.
- Fixed CSV export for files in a agents group.

Wazuh WUI for Splunk
---------------------
- CDB lists names are now correctly displayed.
- Fixed a bug in Syscheck section when generating the PDF configuration summary.

**Other additions and improvements**

- The new log collection option ``<reconnect_time>`` is included in the Log collection configuration section.
- Rules/Decoders/CDB-lists files can be uploaded using a Drag & Drop feature.
- Extended the "Add new agent" guide.
- Opening an empty file is now correctly handled and doesn't lead to an unexpected error.
