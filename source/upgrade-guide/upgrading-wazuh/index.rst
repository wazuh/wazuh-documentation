.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh:

Upgrading the Wazuh server
==========================

This section describes how to upgrade the Wazuh server, including the Wazuh manager and the Wazuh API. The process depends on the version that is currently installed:

+--------------+------------+------------------------------------------------------------------------------------------+
| Upgrade from | Upgrade to | Supported upgrade type                                                                   |
+==============+============+==========================================================================================+
| 3.x          | 3.y        | :ref:`Upgrade from the same major version (3.x) <upgrading_latest_minor>`                |
+--------------+------------+------------------------------------------------------------------------------------------+
| 2.x          | 3.x        | :ref:`Upgrade from a different major version <upgrading_different_major>`                |
+--------------+------------+------------------------------------------------------------------------------------------+

.. toctree::
    :hidden:
    :maxdepth: 2

    latest_wazuh3_minor
    different_major
