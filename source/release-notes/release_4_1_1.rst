.. Copyright (C) 2021 Wazuh, Inc.

.. _release_4_1_1:

4.1.1 Release notes
===================

This section lists the changes in version 4.1.1. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.1.1-7.10.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/4.1/CHANGELOG.md>`_


Wazuh core
----------

Added
^^^^^

**External dependencies**

- Added cython (0.29.21) library to Python dependencies.
- Added xmltodict (0.12.0) library to Python dependencies.


Changed
^^^^^^^

**External dependencies**

- Upgraded Python version from 3.8.2 to 3.8.6.
- Upgraded Cryptography python library from 3.2.1 to 3.3.2.
- Upgraded cffi python library from 1.14.0 to 1.14.4.


Fixed
^^^^^

**API**

- An error with the RBAC permissions in the ``GET /groups`` endpoint. 
- A bug with Windows registries when parsing backslashes. 
- An error with the RBAC permissions when assigning multiple ``agent:group`` resources to a policy. 
- An error with search parameter when using special characters.

**AWS Module**

- A bug that caused an error when attempting to use an IAM Role with CloudWatchLogs service.

**Framework**

- A race condition bug when using RBAC expand_group function.

**Core**

- A bug in the Windows agent that did not respect the buffer EPS limit.
- A bug in Integratord that might lose alerts from Analysisd due to a race condition.



Wazuh Kibana plugin
-------------------

Added
^^^^^
- New prompt to show unsupported module for the selected agent.
- Added an ``X-Frame-Options`` header to the backend responses.

Changed
^^^^^^^
- Added toast with refresh button when new fields are loaded in dashboard
- Migrated manager and cluster files of the Wauh API endpoints and their corresponding RBAC.

Fixed
^^^^^
- A login error when AWS Elasticsearch and ODFE are used.
- An error message is displayed when changing a group's configuration although the user has the right permissions
- Fix disabled switch visual edit button when JSON content is empty in Role Mapping
- Fixed several issues when an unsupported agent (SO) is selected
- Fixed forcing a non-numeric filter value in a number type field applying a filter in the search bar of dashboards and events
- Fixed a wrong number of alerts is showed in Security Events
- Fixed searching with uncommon characters in Management groups of agents
- Replace generic ``statusCode`` error message with a better message
- Fix the SCA policy stats didn't refresh
- Fixed loading of AWS index fields even when no AWS alerts were found
- Fix some date fields format in FIM and SCA modules
- Fix a non-stop error in Manage agents when the user has no permissions
- Can't edit empty rules and decoders files that already exist in the Wazuh manager
- Support for alerts index pattern with different ID and name
- Fix the unpin button in the selection modal of agents in the menu
- Fix properly log out of Wazuh API when logging out of the application (only for OpenDistro)
- Fixed missing ``&&`` from macOS agent deployment command
- Fix prompt permissions on Framework of Mitre and Inventory of Integrity monitoring.
