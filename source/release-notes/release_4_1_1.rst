.. Copyright (C) 2020 Wazuh, Inc.

.. _release_4_1_1:

4.1.1 Release notes
===================

This section lists the changes in version 4.1.0. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.10/CHANGELOG.md>`_
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

- A bug in Windows agent that did not honor the buffer's EPS limit.
- A bug in Integratord that might lose alerts from Analysisd due to a race condition.



Wazuh Kibana plugin
-------------------

Added
^^^^^


Changed
^^^^^^^



Fixed
^^^^^
