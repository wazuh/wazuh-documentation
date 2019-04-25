.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_2_2:

3.2.2 Release Notes
===================

From the Wazuh team, we continue working hard improving the existing features as well as fixing bugs. This section shows the most relevant improvements and fixes in version 3.2.2. Find more details in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.2.2/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.2.2/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.2.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.2.2-6.2.4/CHANGELOG.md>`_

Manager-agent communication
---------------------------

It has been created an input buffer in the manager side, this queue will act as a congestion control by processing all the events incoming from agents.

Between other features of this queue, it dispatches events as fast as possible avoiding any delay in the communication process, and it warns when gets full stopping to ingest more events.

In addition, the capacity of the buffer is configurable in the ``remote`` section of the :doc:`Local configuration <../user-manual/reference/ossec-conf/remote>`.

Wazuh modules
-------------

Vulnerability-detector module has an improvement within the version comparator algorithm to avoid false positive alerts. It also has been fixed the behaviour when the software inventory of an agent is missing.

Wazuh app: Kibana
-----------------

The Wazuh app received lots of new improvements for this release. In addition to several bugfixes and performance improvements, these are the major highlights for this Wazuh app version:

- New dynamic visualization loading system. Now the app loads visualizations on demand, and never store them on the ``.kibana`` index.
- A new design for the Ruleset tab, providing the information about the rules and decoders in a cleaner, more organized way.
- A new system for role detection over index patterns when using the X-Pack plugin for the Elastic Stack.
- Refinements and adjustments to the user interface.


Other relevant changes
----------------------

In addition to the previous points, another more changes included are:

- The Slack integration has been updated since some used parameters were deprecated by Slack. This integration allows Wazuh to send notifications to Slack when desired alerts are triggered.
- It has been fixed the agent group file deletion when using the Auth daemon. As well as the client of the daemon for old versions of Windows.
- Fixed the filter of the output syslog daemon when filtering by rule group.
