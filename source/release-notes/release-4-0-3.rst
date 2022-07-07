.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh 4.0.3 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_0_3:

4.0.3 Release notes - 30 November 2020
======================================

This section lists the changes in version 4.0.3. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.0.3/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.0.3-7.9.3/CHANGELOG.md>`_


Wazuh core
----------


Fixed
^^^^^

**API**

- API timeouts with ``GET /agents`` call in loaded cluster environments.
- Timeout issue related with ``GET /manager/configuration/validation`` and ``GET /cluster/configuration/validation`` in big environments. 
- Timeout and performance issue related with ``GET /overview`` agents request in loaded cluster environments.


Wazuh Kibana plugin
-------------------

Added
^^^^^

- Support for Wazuh v4.0.3.
