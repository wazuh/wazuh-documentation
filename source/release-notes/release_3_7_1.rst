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

New features for Kibana plugin
------------------------------

The Wazuh app for Kibana comes with full compatibility with the latest version of the Elastic Stack, 6.5.1. The main highglights for this app include:

- A new autocomplete functionality for the **Dev tools** tab, so now the user can start typing an API request to see a list of suggestions.
- The **Dev tools** page now allows ``PUT``, ``POST`` and ``DELETE`` requests.
- Increased number of rows on the **Inventory data** tables. Moreover, the *Network ports* table now includes more information.

In addition to this, some refinements and bugfixes were added for better stability and overall performance.

New features for Splunk plugin
------------------------------

The Wazuh app for Splunk is now compatible with the latest version of Splunk Enterprise, 7.2.1. The main highglights for this app include:

- Added extension management functionality. Similar to the Kibana app, now you can enable/disable extensions to show or hide different app tabs and pages.
- Added the **Export as CSV** button for *Agents*, *Rules*, *Decoders*, *Groups* and *Logs* tables.
- Added the **VirusTotal** tab.
- Added the XML viewer for the **Management/Agents > Configuration** tabs.

In addition to this, code refactoring, visual/ UI adjustments and bugfixes were added for better stability and overall performance.
