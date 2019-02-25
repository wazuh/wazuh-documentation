.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_8_2:

3.8.2 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.8.2. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.8.2/CHANGELOG.md>`_

Wazuh core
----------

- Fixed a segmentation fault when using ``<accumulate>`` rules attribute.
- Fixed an issue in Wazuh modules daemon configuration when ``<command>`` was used and no ``<tag>`` was set.
- Event channel decoder for Windows now escapes backslashes properly and it's not adding spurious trailing spaces in some fields.
