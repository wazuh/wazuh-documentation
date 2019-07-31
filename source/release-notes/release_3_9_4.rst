.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_9_4:

3.9.4 Release notes
===================

This section shows the most relevant improvements and fixes in version 3.9.4. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.9.4/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.9.4-7.2.0/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.9.4-7.3.0/CHANGELOG.md>`_


Wazuh core
----------

- Fixed bug when applying the parent directory options to FIM alerts.
- Prevented the manager from blocking when WazuhDB ignores agent deletion requests.
- Remoted will no longer handle messages from disconnected agents.
- Fixed a bug that overwrites agent information with certain IPs.
- Logcollector will allow overwriting the <localfile> blocks indicated in the shared configuration over those indicated in ossec.conf if they have the same <location> value.
- Analysisd will not break due to a race condition when handling JSON objects.
- SCA will not generate inconsistencies in the database on the manager side when policy IDs are duplicated.
- The cluster engine will not have a race condition with Remoted when synchronizing some files.
- A handler leaking hazard has been fixed in the FIM who-data engine on Windows.

Wazuh apps
----------

- Allowed filtering by clicking a column in rules/decoders tables.
- Allowed open file in rules table clicking on the file column.
- Improved Kibana app performance.
- Removed path filter from custom rules and decoders.
- Now path column in rules and decoders is shown.
- Removed SCA overview dashboard.
- Disabled last custom column removal.
- Agents messages across sections have been unificated.
- Fixed check storeded APIs.
- Improved wz-table performance.
- Fixed inconsistent data between visualizations and tables in Overview Security Events.
- Timezone applied in cluster status.
- Fixed Overview Security Events report when wazuh.monitoring is disabled.
- Now duplicated visualization toast errors are handled.
- Fixed not properly updated breadcrumb in ruleset section.
- Implicit filters can't be destroyed now.
