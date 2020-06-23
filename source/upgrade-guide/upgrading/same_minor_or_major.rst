.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_same_minor_or_major:

Upgrade from the same minor or major version
============================================

The instructions below are for upgrading the Wazuh installation within the same minor version (for example, 3.9.0 to 3.9.5)
or within the same major version (for example, from 3.8.2 to |WAZUH_LATEST|).

Upgrade the Wazuh manager and the Wazuh API
-------------------------------------------

  .. tabs::

    .. group-tab:: YUM

      .. code-block:: console

          # yum upgrade wazuh-manager wazuh-api

    .. group-tab:: APT

      .. code-block:: console

          # apt-get update
          # apt-get install wazuh-manager wazuh-api

    .. group-tab:: ZYpp

      .. code-block:: console

          # zypper update wazuh-manager wazuh-api


Upgrade the Wazuh agent
-----------------------

  .. tabs::

    .. group-tab:: YUM

      .. code-block:: console

          # yum upgrade wazuh-agent

    .. group-tab:: APT

      .. code-block:: console

          # apt-get update
          # apt-get install wazuh-agent

    .. group-tab:: ZYpp

      .. code-block:: console

          # zypper update wazuh-agent
