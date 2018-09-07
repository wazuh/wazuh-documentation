.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_6_1:

3.6.1 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.6.1. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.6.1/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.6.1/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.6.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.6.1-6.4.0/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.6.1-7.1.2/CHANGELOG.md>`_

Wazuh core
----------

This release is a patch version that fixes some issues encountered in v3.6.0. Some of them are listed below:

- The *agent.name* field has been put back to the alerts in JSON format. On the other hand, we've fixed a problem in the *location* description of the plain-text alerts.
- Vulnerability Detector has been improved to support Debian Sid (the unstable version).
- We have also optimized the memory management on agents for AIX and HP-UX systems.
- The daemon start and stop list has been reordered in the agent service.
- We have corrected the actual recursion level limit in FIM real-time mode.
- We have improved the AWS integration parser and its capabilities.
- Some other fixes have been applied on this version.

Wazuh API
---------

In this version, the API makes it possible to send Active Response requests, including custom commands that are not declared in the configuration.

For instance: ::

    curl -u foo:bar -k -X PUT -d '{"command":"restart-ossec0", "arguments": ["-", "null", "(from_the_server)", "(no_rule_id)"]}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/active-response/001?pretty"

    {
      "error": 0,
      "message": "Command sent."
    }
