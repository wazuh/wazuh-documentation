.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.1.1 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_1_1:

4.1.1 Release notes - 25 February 2021
======================================

This section lists the changes in version 4.1.1. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.1.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.1.1-7.10.0/CHANGELOG.md>`_


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

**API**

- Added raw parameter to ``GET /manager/configuration`` and ``GET cluster/{node_id}/configuration`` endpoints to load ``ossec.conf`` in XML format. 


Fixed
^^^^^

**API**

- An error with the RBAC permissions in the ``GET /groups`` endpoint. 
- A bug with Windows registries when parsing backslashes. 
- An error with the RBAC permissions when assigning multiple ``agent:group`` resources to a policy. 
- An error with search parameters when using special characters.

**AWS Module**

- A bug that caused an error when attempting to use an IAM Role with CloudWatchLogs service.

**Framework**

- A race condition bug when using RBAC ``expand_group`` function.
- The migration process to overwrite default RBAC policies.

**Core**

- A bug in the Windows agent that did not respect the buffer EPS limit.
- A bug in Integratord that might lose alerts from Analysisd due to a race condition.
- Silenced the error message when the Syslog forwarder reads an alert with no rule object. 
- A memory leak in Vulnerability Detector when updating NVD feeds.
- Prevented FIM from raising false positives about group name changes due to a thread unsafe function.

Removed
^^^^^^^

**API**

- Deprecated ``/manager/files`` and ``/cluster/{node_id}/files`` endpoints.


Wazuh Kibana plugin
-------------------

Added
^^^^^
- New prompt to show unsupported module for the selected agent.
- Added an ``X-Frame-Options`` header to the backend responses.

Changed
^^^^^^^
- Added toast with refresh button when new fields are loaded in dashboard.
- Migrated the Wazuh API endpoints for manager and cluster files and their corresponding RBAC.
- Enhanced generic ``statusCode`` error message to be more user friendly.

Fixed
^^^^^
- A login error when AWS Elasticsearch and ODFE are used.
- An error message that was displayed when changing a group configuration even when the user had the right permissions.
- Disabled switch visual edit button when JSON content is empty in Role Mapping.
- Disappearing menu and blank content when an unsupported agent (OS) is selected.
- Forcing a non-numeric filter value in a number type field applying a filter in the search bar of dashboards and events.
- Wrong number of alerts that were shown in Security Events.
- Search using uncommon characters in Management groups of agents.
- The SCA policy stats that did not refresh.
- AWS index fields loading even when no AWS alerts were found.
- Date fields format in FIM and SCA modules.
- Recurrent error message in Manage agents when the user has no permissions.
- An issue that prevented from editing empty rules and decoders files that already existed in the Wazuh manager.
- Support for alerts index pattern with different IDs and names.
- The unpin button in the selection modal of agents in the menu.
- Close Wazuh API session when logging out from UI.
- Missing ``&&`` in macOS agent deployment command.
- Prompt permissions on Mitre > Framework and Integrity monitoring > Inventory.
