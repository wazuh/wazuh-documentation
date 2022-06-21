.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh 4.0.2 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_0_2:

4.0.2 Release notes - 24 November 2020
======================================

This section lists the changes in version 4.0.2. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.0.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.0.2-7.9.3/CHANGELOG.md>`_


Wazuh core
----------

Added
^^^^^

**Core**

- Version detection in the agent for macOS Big Sur.


Changed
^^^^^^^

**API**

- ``GET /agents/summary/os``, ``GET /agents/summary/status`` and ``GET /overview/agents`` will no longer consider ``000`` as an agent.
- Increased to 64 the maximum number of characters that can be used in security users, roles, rules, and policies names.

Fixed
^^^^^

**API**

- Error with ``POST /security/roles/{role_id}/rules`` when removing role-rule relationships with admin resources.
- Timeout error with ``GET /manager/configuration/validation`` when using it in a slow environment.

**Framework**

- Error with some distributed requests when the cluster configuration is empty.
- Special characters in default policies.

**Core**

- Bug in Remoted that limited the maximum agent number to ``MAX_AGENTS-3`` instead of ``MAX_AGENTS-2``.
- Error in the network library when handling disconnected sockets.
- Error in FIM when handling temporary files and registry keys exceeding the path size limit.
- Bug in FIM that stopped monitoring folders pointed by a symbolic link.
- Race condition in FIM that could cause Syscheckd to stop unexpectedly.



Wazuh Kibana plugin
-------------------

Added
^^^^^

- Support for Wazuh v4.0.2.

Changed
^^^^^^^

- An alert summary table is now included in PDF reports of all modules. 
- Authentication with ``run_as`` is now available for other users besides ``wazuh-wui``.
- A notification is now displayed when no agents have been registered. 
- API security entities between 0 and 99 are now reserved.


Fixed
^^^^^

- Manager restart in rule editor with Wazuh cluster enabled.
- Restored the tables in the agents reports.
- Corrected the subtraction of managers (agent 000) in agent count considering the RBAC permissions of the current user.
- Changes done via a worker API were overwritten.
- Default user field in Security Role mapping is now provided depending on whether ODFE or X-Pack is installed. 
- Bug that replaced index-pattern title with its ID during the updating process.
