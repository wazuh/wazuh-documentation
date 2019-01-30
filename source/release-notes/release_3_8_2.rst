.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_8_2:

3.8.2 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.8.2. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.8.2/CHANGELOG.md>`_

Wazuh core
----------

- Fixed a segmentation fault when parsing a log from OpenLDAP and using the option ``<accumulate>`` at the same time.
- Fixed an issue related to Wazuh modules daemon which were crashing if a ``<command>`` is present in the configuration without using ``<tag>``.
- The EventChannel decoder for Windows has been improved, now it escapes backslashes properly and it's not adding spurious trailing spaces in some fields.