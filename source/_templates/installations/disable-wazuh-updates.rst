.. Copyright (C) 2015, Wazuh, Inc.

.. note::

   **Recommended Action**: Disable Wazuh Updates.

   We recommend disabling the Wazuh package repositories after installation to prevent accidental upgrades that could break the environment.

   Execute the following command to disable the Wazuh repository:

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT (Debian/Ubuntu)

         .. code-block:: console

            # sed -i "s/^deb /#deb /" /etc/apt/sources.list.d/wazuh.list
            # apt update

.. End of include file
