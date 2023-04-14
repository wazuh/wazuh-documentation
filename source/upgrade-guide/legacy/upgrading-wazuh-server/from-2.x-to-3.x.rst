.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section of the Wazuh documentation guides through the upgrade process of the Wazuh server from 2.x to 3.x.

.. _upgrading_wazuh_server_2.x_3.x:

Upgrading the Wazuh server from 2.x to 3.x
==========================================

The following steps show how to upgrade from Wazuh 2.x to Wazuh 3.x, which implies upgrading from Elastic Stack 5.x to 7.x.

To upgrade the Wazuh server, choose the appropriate tab for the desired package manager:

#. Add the new repository for Wazuh 3.x:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
          [wazuh_repo]
          gpgcheck=1
          gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
          enabled=1
          name=Wazuh repository
          baseurl=https://packages.wazuh.com/4.x/yum/
          protect=1
          EOF

      .. group-tab:: APT

        .. code-block:: console

          # echo "deb https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

      .. group-tab:: ZYpp

        .. code-block:: console

          # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH
          # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
          [wazuh_repo]
          gpgcheck=1
          gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
          enabled=1
          autorefresh=1
          name=Wazuh repository
          baseurl=https://packages.wazuh.com/4.x/yum/
          protect=1
          EOF

#. Upgrade the Wazuh manager and the Wazuh API:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # yum install wazuh-manager wazuh-api

      .. group-tab:: APT

        .. code-block:: console

          # apt-get update
          # apt-get install wazuh-manager wazuh-api

      .. group-tab:: ZYpp

        .. code-block:: console

          # zypper update wazuh-manager wazuh-api

.. note::

  The installation of the updated packages will automatically ``restart the services`` for the Wazuh manager and the Wazuh API. The Wazuh manager configuration file will be ``unmodified``, so the user will need to manually add the settings for the new capabilities. More information can be found in the :doc:`User manual </user-manual/index>`.

  After the upgrade, the old alerts will not be visualized in Kibana due to a change in the Wazuh alerts template. In order to access the old alerts and visualize them along with the new ones, the indices need to be reindexed to apply the new mapping. The process is described in the :ref:`Restore the Wazuh alerts from Wazuh 2.x <restore_alerts_2.x_3.x>` section.

Disable the Wazuh repository
----------------------------

It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues:

  .. tabs::

    .. group-tab:: YUM

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

    .. group-tab:: APT

      .. code-block:: console

        # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
        # apt-get update

      Alternatively, the user can set the package state to ``hold``, which will stop updates. It will be still possible to upgrade it manually using ``apt-get install``:

      .. code-block:: console

        # echo "wazuh-manager hold" | sudo dpkg --set-selections
        # echo "wazuh-api hold" | sudo dpkg --set-selections

    .. group-tab:: ZYpp

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

.. toctree::
    :hidden:
    :maxdepth: 2

    restore-alerts-from-2.x-to-3.x
