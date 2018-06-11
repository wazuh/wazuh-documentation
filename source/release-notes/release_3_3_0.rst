.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_3_0:

3.3.0 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.3.0. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.3.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.3.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.3.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.3.0-6.2.4/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.3.0-7.1.1/CHANGELOG.md>`_

Wazuh core
----------

- Now *Logcollector* supports multiple socket output.
- Allowed static field parameters insertiong on rules comments.
- Included millisecond timing in timestamp to JSON events.
- Added an option in *Analysisd* to set input event offset for plugin decoders.
- Allow decoders mix plugin and multiregex children.
- Several bugfixes and improvements for the Python framework, *Logcollector*, the Agentless daemon and the cluster.

Wazuh API
---------

- Added filter by group on the ``GET /agents`` call.
- Added filter by status on the ``GET /agents/groups/:group_id`` and ``GET /agents/groups/:group_id`` calls.
- The ``limit`` parameter has been modified to retrieve all items using ``limit=0``.
- Several bugfixes and performance improvements.

Wazuh app for Kibana
--------------------

- New design for the *Overview* and *Agents* tabs, following a breadcrumbs-based navigability to change between different sections.
- New Reporting option, for generating logs about the current state of the visualizations on the *Overview* and *Agents* tabs.
- New filters for agent version and cluster node on the *Agents Preview* tab.
- Added a warning when your system doesn't have more than 3GB of RAM.
- Several bugfixes and performance improvements.

Wazuh app for Splunk
--------------------

- Added monitoring for collecting periodical agent status data.
- New tab for GDPR alerts.
- Added multi-index support.
- Several bugfixes and performance improvements.
