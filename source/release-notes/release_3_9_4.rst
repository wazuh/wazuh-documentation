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

- FIM could apply incorrect options for ``<directories>`` entries if there is another entry for a child directory.
- Wazuh DB did not remove a database file until it's commited. Now, the database will be closed immediately.
- Let Remoted clean the incoming buffer for closed connections. This will prevent Remoted from handling invalid connections.
- Fixed a bug in the agent that could made it truncate its IP address within the control message.
- Logcollector could remove duplicate ``<localfile>`` stanzas incorrectly.
- Fix a bug in Analysisd that could potentially make it crash while handling JSON objects.
- Prevent SCA from producing inconsistencies in the database on the manager side when policy IDs are duplicated.
- Fixed a race condition hazard between Clusterd and Remoted while synchronizing agent-related files.
- Fixed a handler leaking hazard in the FIM who-data engine on Windows.

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
