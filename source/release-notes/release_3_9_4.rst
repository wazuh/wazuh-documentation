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

- The attributes of FIM alerts will no longer depend on race conditions between realtime and whodata modes.
- Wazuh-DB will delete all information stored about an agent immediately after its removal.
- Avoided critical errors in Remoted when handling invalid connections
- Fixed a bug when processing maximum length IPs in agents.
- Logcollector will prioritize the file monitoring options specified in the shared configuration.
- Analysisd will not break due to a race condition when handling JSON objects.
- SCA wodle will not generate inconsistencies in the database when policy IDs are duplicated.
- The cluster engine will not have a race condition with Remoted when synchronizing some files.
- Avoided the possibility of generating a handler leak when using whodata mode for Windows.

Wazuh apps
----------

-
