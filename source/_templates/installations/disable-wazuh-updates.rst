.. Copyright (C) 2015, Wazuh, Inc.

.. note::

   **Recommended Action**: Disable Wazuh Updates.

   We recommend disabling the Wazuh package repositories after installing all components on this server to prevent accidental upgrades.

   Execute the following command only after completing all installations:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # sed -i "s/^deb /#deb /" /etc/apt/sources.list.d/wazuh.list
            # apt update

      .. group-tab:: YUM

         .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

      .. group-tab:: DNF

         .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

.. End of include file
