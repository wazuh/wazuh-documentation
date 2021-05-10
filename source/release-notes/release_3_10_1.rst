.. Copyright (C) 2021 Wazuh, Inc.

.. _release_3_10_1:

3.10.1 Release notes
====================

This section lists the changes in version 3.10.1. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.10.1/CHANGELOG.md>`_

Wazuh core
----------

- Fix error in Remoted when reloading agent keys (locked mutex disposal).
- Fix invalid read error in Remoted counters.

Wazuh API
---------

- Fixed error after removing a high volume of agents from a group using the Wazuh API.
