.. _upgrading_wazuh:

.. warning::

    You are looking at documentation for an older release. Not what you want? See the `current release documentation <https://documentation.wazuh.com/current/installation-guide/upgrading/index.html>`_.

Upgrading Wazuh
======================

This section describes how to upgrade an existing Wazuh installation. The upgrade process depends on the version that is currently installed and the version that you want to upgrade to:

+--------------+--------------+-------------------------------------------------------------------------------------+
| Upgrade from | Upgrade to   | Supported Upgrade Type                                                              |
+==============+==============+=====================================================================================+
| 1.x          | 2.x          | :ref:`Upgrade from a legacy version <upgrading_wazuh_legacy>`                       |
+--------------+--------------+-------------------------------------------------------------------------------------+
| 2.0.x        | 2.0.y        | :ref:`Upgrade from the same minor version <upgrading_same_minor>` (where y > x)     |
+--------------+--------------+-------------------------------------------------------------------------------------+

.. warning::
    Wazuh v2 uses different index names and templates than Wazuh v1. For that reason, you will not able to see the alerts previous to the upgrade in Wazuh App. If you need to access them, you will need to reindex the previous indices.

.. note::
    If you find any issue during the upgrade process, feel free to ask for help in our `mailing list <https://groups.google.com/d/forum/wazuh>`_. The Wazuh team and other users of the Open Source community may be able to assist you.


.. toctree::
    :hidden:
    :maxdepth: 2

    legacy/index
    same_minor
