.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh:

Upgrading Wazuh
===============

This section describes how to upgrade an existing Wazuh installation. The upgrade process depends on the version that is currently installed and the version that is going to be upgraded to:

+--------------+------------+------------------------------------------------------------------------------------------+
| Upgrade from | Upgrade to | Supported Upgrade Type                                                                   |
+==============+============+==========================================================================================+
| 2.x          | 3.x        | :ref:`Upgrade from a different major version <upgrading_different_major>`                |
+--------------+------------+------------------------------------------------------------------------------------------+
| 3.x          | 3.y        | :ref:`Upgrade from the same major version (3.x) <upgrading_latest_minor>`                |
+--------------+------------+------------------------------------------------------------------------------------------+

.. toctree::
    :hidden:
    :maxdepth: 2

    legacy/index
    same_minor_or_major
    different_major
    latest_wazuh3_minor
    restore_alerts
