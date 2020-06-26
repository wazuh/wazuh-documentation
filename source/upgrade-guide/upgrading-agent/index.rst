.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh_agent:

Upgrading Wazuh agent
=====================

This section describes how to upgrade the Wazuh agent. The upgrade process depends on the version that is currently installed:

+--------------+------------+--------------------------------------------------------------------------------------------+
| Upgrade from | Upgrade to | Supported upgrade type                                                                     |
+==============+============+============================================================================================+
| 3.x          | 3.y        | :ref:`Upgrade from the same major version (3.x) <upgrading_latest_minor_agent>`            |
+--------------+------------+--------------------------------------------------------------------------------------------+
| 2.x          | 3.x        | :ref:`Upgrade from a different major version <upgrading_different_major_agent>`            |
+--------------+------------+--------------------------------------------------------------------------------------------+


.. toctree::
    :hidden:
    :maxdepth: 2

    latest_wazuh3_minor_agent
    different_major_agent
