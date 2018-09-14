.. Copyright (C) 2018 Wazuh, Inc.

.. _upgrading_wazuh:

Upgrading Wazuh
======================

This section describes how to upgrade an existing Wazuh installation. The upgrade process depends on the version that is currently installed and the version that you want to upgrade to:

+--------------+------------+---------------------------------------------------------------------------------+
| Upgrade from | Upgrade to | Supported Upgrade Type                                                          |
+==============+============+=================================================================================+
| 1.x          | 2.x        | :ref:`Upgrade from a legacy version <upgrading_wazuh_legacy>`                   |
+--------------+------------+---------------------------------------------------------------------------------+
| 2.0.x        | 2.0.y      | :ref:`Upgrade from the same minor version <upgrading_same_minor>` (where y > x) |
+--------------+------------+---------------------------------------------------------------------------------+
| 2.0.x        | 2.1.y      | :ref:`Upgrade from the same major version <upgrading_same_major>`               |
+--------------+------------+---------------------------------------------------------------------------------+
| 2.x.y        | 3.x.y      | :ref:`Upgrade from a different major version <upgrading_different_major>`       |
+--------------+------------+---------------------------------------------------------------------------------+
| 3.x.y        | Latest 3.x | :ref:`Upgrade to the latest version of Wazuh 3 <upgrading_latest_minor>`        |
+--------------+------------+---------------------------------------------------------------------------------+

.. warning::
    Wazuh v2.x uses different indices and templates than Wazuh v1.x, so you will not be able to see the previous alerts using Kibana. In order to access these alerts, you will have to reindex the previous indices.

.. note::
    If you run into an issue during the upgrade process, feel free to ask for help in our `mailing list <https://groups.google.com/d/forum/wazuh>`_. The Wazuh team and other users of the Open Source community may be able to assist you.


.. toctree::
    :hidden:
    :maxdepth: 2

    legacy/index
    same_minor
    same_major
    different_major
    latest_wazuh3_minor
    restore_alerts
