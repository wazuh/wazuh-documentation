.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh:

Upgrading Wazuh
===============

This section describes how to upgrade an existing Wazuh installation. The upgrade process depends on the version that is currently installed and the version that you want to upgrade to:

+--------------+------------+------------------------------------------------------------------------------------------+
| Upgrade from | Upgrade to | Supported Upgrade Type                                                                   |
+==============+============+==========================================================================================+
| 2.x          | 3.x        | :ref:`Upgrade from a different major version <upgrading_different_major>`                |
+--------------+------------+------------------------------------------------------------------------------------------+
| 3.x          | 3.y        | :ref:`Upgrade from the same major version (3.x) <upgrading_latest_minor>`                |
+--------------+------------+------------------------------------------------------------------------------------------+

.. note::
    If you run into an issue during the upgrade process, feel free to ask for help in our `mailing list <https://groups.google.com/d/forum/wazuh>`_. The Wazuh team and other users of the Open Source community may be able to assist you.

.. toctree::
    :hidden:
    :maxdepth: 2

    legacy/index
    same_minor_or_major
    different_major
    latest_wazuh3_minor
    restore_alerts
