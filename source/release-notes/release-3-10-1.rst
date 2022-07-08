.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 3.10.1 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_3_10_1:

3.10.1 Release notes - 19 September 2019
========================================

This section lists the changes in version 3.10.1. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.10.1/CHANGELOG.md>`_

Wazuh core
----------

- Fix error in Remoted when reloading agent keys (locked mutex disposal).
- Fix invalid read error in Remoted counters.

Wazuh API
---------

- Fixed error after removing a high volume of agents from a group using the Wazuh API.
