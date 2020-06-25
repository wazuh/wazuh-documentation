.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_different_major:

Upgrade from a different major version
======================================

The following steps show how to upgrade from Wazuh 2.x to Wazuh 3.x, which implies upgrading from Elastic Stack 5.x to 7.x.

Upgrade the Wazuh manager
-------------------------

#. Stop the services:

    .. code-block:: console

      # systemctl stop wazuh-api
      # systemctl stop wazuh-manager

#. Add the new repository for Wazuh 3.x.:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
          [wazuh_repo]
          gpgcheck=1
          gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
          enabled=1
          name=Wazuh repository
          baseurl=https://packages.wazuh.com/3.x/yum/
          protect=1
          EOF

      .. group-tab:: APT

        .. code-block:: console

          # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Upgrade the Wazuh manager:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # yum install wazuh-manager

      .. group-tab:: APT

        .. code-block:: console

          # apt-get update
          # apt-get install wazuh-manager

#. Upgrade the Wazu API:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # yum install wazuh-api

      .. group-tab:: APT

        .. code-block:: console

          # apt-get install wazuh-api

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

      Alternately, the user can set the package state to ``hold``, which will stop updates. The user can still upgrade it manually using ``apt-get install`` command.

      .. code-block:: console

        # echo "wazuh-manager hold" | sudo dpkg --set-selections
        # echo "wazuh-api hold" | sudo dpkg --set-selections
        # echo "wazuh-agent hold" | sudo dpkg --set-selections

.. toctree::
    :hidden:
    :maxdepth: 2

    restore_alerts
