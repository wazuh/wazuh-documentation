.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_7_1:

3.7.1 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.7.1. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.7.1/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.7.1/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.7.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.7.1-6.5.1/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.7.1-7.2.1/CHANGELOG.md>`_

Collecting more Audit events
----------------------------

The Wazuh Integrity Monitoring engine (FIM engine) is capable of reading logs from the :ref:`Linux Audit events <system_call_monitoring>`. Each generated event is triggered by a defined rule and must have a key to be identified by Wazuh in order to perform a more accurate analysis.

In this new version, the FIM engine was improved and now can collect Audit events using custom keys. The new ``<audit_key>`` tag can be used to define the keys on the ``<syscheck><whodata>`` block from the :ref:`configuration file <reference_ossec_conf>`.

With this option, you can add other rule's keys generated manually or by other methods. It allows monitoring directories with Audit that have other associated rules. The Integrity Monitoring engine will filter the events looking for these keys.

Agent group reassignment
------------------------

When adding an agent to a specific group it can be automatically re-assigned to the same one even if the agent is registered under another name or ID. This was always the default behavior and it couldn't be changed.

As of now, this reassignment is disabled by default but it can be enabled again using the new ``remoted.guess_agent_group`` setting on the :ref:`internal options <reference_internal_options>` configuration file.

Other minor improvements
------------------------

Wazuh 3.7.1 includes some other improvements to the main funcionality. For example, the ``host-deny.sh`` script from :ref:`Active Response <automatic_remediation>` now includes support for IPv6.

Additionally, the logs generated on debugging mode now include tracing information such as PID, function, file and line number.

Bugfixes
--------

This release of Wazuh is focused on bringing bugfixes to the core component. Along with multiple refinements to the features introduced in Wazuh 3.7.0, some bugs reported by the community were added too.

The :ref:`Vulnerability detector <vulnerability-detection>` received some stability improvements and the support for Amazon Linux was restored. As a result, the Ruleset was updated to include new rules to alert in case of issues when comparing software package versions.

The Integrity Monitoring engine received improvements for *who-data* and bugfixes to address some errors under certain configurations, the content of FIM alerts, fetching the active configuration remotely, and more.

New features for Kibana plugin
------------------------------

The main highlights for the Wazuh app for Kibana include a new **auto-complete feature** for the Dev tools tab, so now the user can start typing an API request to see a list of suggestions.

In addition to this, some refinements and bugfixes were added for better stability and overall performance.

New features for Splunk plugin
------------------------------

The main highlights for the Wazuh app for Splunk include:

- Support for **extensions**. The user can enable/disable them to show or hide different app sections.
- New tabs for **VirusTotal** and **CIS-CAT** alerts.
- Added an **Export as CSV** button for *Agents*, *Rules*, *Decoders*, *Groups* and *Logs* tables.
- Added support for ``PUT``, ``POST`` and ``DELETE`` requests on the **Dev tools** tab, along with ``GET`` requests.

In addition to this, code refactoring, visual/ UI adjustments, and bugfixes were added for better stability and overall performance.
