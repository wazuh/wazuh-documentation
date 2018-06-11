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

Logcollector now supports socket connection for log output mirroring. This feature allows to send the same event to the Wazuh manager and to a 3rd party log processor like Fluent Bit. You can find more information :ref:`here <reference_ossec_socket>`.

We have also introduced an event formatter in the log collector to build custom events, this allows to add some data into the event. Read more about it on :ref:`this section <ruleset_json-decoder>`.

As of this version, the timestamp of the alerts in JSON format will include milliseconds.

The analysis engine includes new options for the :ref:`plugin decoders <decoders_syntax>` to set the input offset with respect to the prematch expression or the parent decoder.

Plugin decoders and multi-regex decoders are some powerful features for log analysis. This version makes possible to use the together.

The implementation of the Agentless daemon has been improved for enhanced security.

Some other fixes and improvements have been introduced in the Framework and the Cluster.

Wazuh API
---------

The API now has filters by group on the ``GET /agents`` call and by status on the ``GET /agents/groups/:group_id`` and ``GET /agents/groups/:group_id`` calls.

Now the ``limit`` parameter has been modified to retrieve all items using ``limit=0``.

In addition to this, several bugfixes and performance improvements for the API have been added.

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
- Now the ``.wazuh`` index will be the default one if no one is selected.
- Several bugfixes and performance improvements.
