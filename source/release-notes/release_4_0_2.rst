.. Copyright (C) 2020 Wazuh, Inc.

.. _release_4_0_2:

4.0.2 Release notes
===================

This section lists the changes in version 4.0.2. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.0.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.0.2-7.9.3/CHANGELOG.md>`_


Wazuh core
----------

Added
^^^^^

**Core**

- Added macOS Big Sur version detection in the agent.


Changed
^^^^^^^

**API**

- ``GET /agents/summary/os``, ``GET /agents/summary/status`` and ``GET /overview/agents`` will no longer consider ``000`` as an agent.
- Increased to 64 the maximum number of characters that can be used in security users, roles, rules, and policies names.

Fixed
^^^^^

**API**

- Fixed an error with ``POST /security/roles/{role_id}/rules`` when removing role-rule relationships with admin resources.
- Fixed a timeout error with ``GET /manager/configuration/validation`` when using it in a slow environment.

**Framework**

- Fixed an error with some distributed requests when the cluster configuration is empty.
- Fixed special characters in default policies.

**Core**

- Fixed a bug in ``Remoted`` that limited the maximum agent number to ``MAX_AGENTS-3`` instead of ``MAX_AGENTS-2``.
- Fixed an error in the network library when handling disconnected sockets.
- Fixed an error in FIM when handling temporary files and registry keys exceeding the path size limit.
- Fixed a bug in FIM that stopped monitoring folders pointed by a symbolic link.



Wazuh Kibana plugin
-------------------

Added
^^^^^

- Support for Wazuh v4.0.2.

Changed
^^^^^^^

- An alerts summary table is now included in PDF reports of all modules. 
- Authentication with ``run_as`` is now available for other users besides ``wazuh-wui``.
- A notification is now displayed when no agents have been registered. 


Fixed
^^^^^

- Manager restart in rule editor did not work with Wazuh cluster enabled.
- Restored the tables in the agents reports.
- Corrected the subtraction of managers (agent 000) in agent count considering the RBAC permissions of the current user.
- Changes done via a worker API were overwritten.
- Default user field in Security Role mapping is now provided depending on whether ODFE or X-Pack is installed. 






