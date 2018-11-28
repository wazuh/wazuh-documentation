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

Wazuh is capable of reading logs from the :ref:`Linux Audit events <system_call_monitoring>`. Each generated event is triggered by a defined rule and must have a key to be identified by Wazuh in order to perform a more accurate analysis.

In this new version, it's possible to collect Audit events using custom keys. The new ``<audit_key>`` tag can be used to define the keys on the ``<syscheck><whodata>`` block from the :ref:`configuration file <reference_ossec_conf>`.

With this option, you can add other rule's keys generated manually or by other methods. It allows monitoring directories with Audit that have other associated rules. The Integrity Monitoring engine will filter the events looking for these keys.

Agent group reassignment
------------------------

When adding an agent to a specific group (or multiple groups), it can be automatically re-assigned to the same groups even if the agent is registered under another name or ID. This was always the default behavior and it couldn't be changed.

As of now, this reassignment is disabled by default but it can be enabled using the new ``remoted.guess_agent_group`` setting on the :ref:`internal options <reference_internal_options>` configuration file.

Bugfixes
--------

The :ref:`Vulnerability detector <vulnerability-detection>` received some stability improvements and restored support for Amazon Linux.

This release of Wazuh is focused on bringing bugfixes to the core component. Along with multiple refinements to the features introduced in Wazuh 3.7.0, some bugs reported by the community were added too.

New features for Kibana plugin
------------------------------

The Wazuh app for Kibana comes with full compatibility with the latest version of the Elastic Stack, 6.5.1. The main highlights for this app include:

- A new **auto-complete feature** for the Dev tools tab, so now the user can start typing an API request to see a list of suggestions.

In addition to this, some refinements and bugfixes were added for better stability and overall performance.

New features for Splunk plugin
------------------------------

The Wazuh app for Splunk is now compatible with the latest version of Splunk Enterprise, 7.2.1. The main highlights for this app include:

- The app now supports **extensions**. The user can enable/disable them to show or hide different app sections.
- Added the **VirusTotal** tab.
- The **Dev tools** page now allows ``PUT``, ``POST`` and ``DELETE`` requests.
- Added the **Export as CSV** button for *Agents*, *Rules*, *Decoders*, *Groups* and *Logs* tables.

In addition to this, code refactoring, visual/ UI adjustments, and bugfixes were added for better stability and overall performance.
