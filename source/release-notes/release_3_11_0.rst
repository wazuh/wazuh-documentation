.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_11_0:

3.11.0 Release notes
====================

This section shows the most relevant improvements and fixes in version 3.11.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.11.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.11.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.11.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/KIBANATAGHERE/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.11.0-7.3.0/CHANGELOG.md>`_

Wazuh core
----------

- When starting the Wazuh agent, it now waits until the network service is ready.
- The system details collection module now supports processes and ports inventory on macOS X systems.
- Analysisd module is now in charge of CDB lists compiling on each restart.
- The frequency rules are now source dependant(increased for the same agent by default). The new ``global_frequency`` rules option allows making frequency rules not source dependant.
- Wazuh agent now checks if the ``MANAGER_IP`` is a valid IP or hostname. It avoids agents to keep trying to connect to an invalid address indefinitely.
- Eventchannel sourced alerts now maintain its Windows original format. Coded fields now have a pretty formatted output.
- Clearer agent-auth help messages.
- Fixed makefile debug flags.
- Fixed ruleset ``protocol``, ``system_name``, ``data`` and ``extra_data`` fields. Now are correctly recognized in the events parsing and rule checking.
- Under certain conditions Authd was overwriting an agent with the same IP, now it outputs a duplicated IP error. 
- If we monitored a file that contained the filename of a nodiff configured file in its filename, it was also configured as nodiff. This is now fixed.
- Bug fixed while indicating a wildcard path in localfile and creating folders inside that path.
- Slack integration now correctly shows Agentless alerts.
- Agent labels format now appear by levels as it is encoded in the related JSON.
- Fixed a modulesd race condition that leads cluster to occasionally fail when copying agent-info


Wazuh API
---------

- The query parameter (q) now can be used filter rules, decoders or logs 
- New endpoint ``PUT /agents/group/{group_id}/restart`` to restart all agents in a group 
- Improved error descriptions for the ``PUT /agents/:agent_id/upgrade_custom API`` call


Wazuh Kibana App
----------------




Wazuh Splunk App
----------------

- Rules/Decoders/CDB-lists files can be uploaded using a Drag & Drop feature.
- The new log collection option ``<reconnect_time>`` is included in the Log collection Splunk configuration section.
- The agent's labels information is now displayed in a clearer way. Also, CDB lists names are now correctly displayed.
- Opening an empty file doesn't lead to an unexpected error.
- Fixed a bug in Syscheck section when generating a PDF configuration summary.
