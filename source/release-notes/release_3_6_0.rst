.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_6_0:

3.6.0 Release notes
===================

This section shows the most relevant improvements and fixes in version 3.6.0. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.6.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.6.0-6.4.0/CHANGELOG.md>`_

Wazuh core
----------

This section shows the main features introduced in this new version for the Wazuh core.

Logcollector
^^^^^^^^^^^^

Logcollector has been enhanced with two new features:

- Now it works in multithread mode. This will improve the throughput and prevent delays among outputs.
- Wildcard reloading is now supported: files that match a wild-carded location will be monitored, no need to restart the agent.

File integrity monitoring
^^^^^^^^^^^^^^^^^^^^^^^^^

The **policy monitoring** (rootcheck) and **file integrity monitoring** (syscheck) engines now run independently, so they both can perform a scan at the same time.

Two new features have been added to **file integrity monitoring**:

- Tags for monitored items. This will make alert matching and classification easier.
- A new option to limit the recursion level (scanning folder depth) has been introduced.

Wazuh modules
^^^^^^^^^^^^^

- Introducing a re-work of the AWS S3 integration, now supporting CloudTrail, GuardDuty, Macie, IAM, and VPC Flow log data.
- The download of OVAL files for Vulnerability Detector has been fixed since Red Hat has changed its protocol to send this files.
- Custom command execution (wodle command) supports MD5/SHA1/SHA256 validation of the target binary for execution authorization.

Log analysis and management
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- The manager will provide remote message statistics, including counting of messages received or dropped, and number of active TCP sessions.
- The size limit for logs has been extended from 6 KiB to 64 KiB.
- The analysis engine now interprets the *hostname* field of the input logs as the name of the agent, instead of name+IP. This allows CDB list lookup of agent name.

Wazuh app for Kibana
--------------------

- Support for Kibana v6.4.0.
- Added new options to config.yml to change shards and replicas settings for wazuh-monitoring indices.
- Improved building package procedure.
- The welcome tabs in Overview and Agents have been updated with a new name and description for the existing sections.
- Adapted for Internet Explorer 11.

Wazuh app for Splunk
--------------------

The Splunk app has been redesigned from the ground based on Material Design.

- SplunkJS framework (RequireJS + BackboneJS + JQuery) has been wrapped into AngularJS.
- Brand new menus, tabs, filters and settings.
- Dynamic visualizations, granting improved performance.
- Dynamic filter queries.

You can follow our installation guide to test it out: https://documentation.wazuh.com/current/installation-guide/installing-splunk/index.html
