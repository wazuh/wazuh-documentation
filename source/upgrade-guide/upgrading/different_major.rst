.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_different_major:

Upgrade from different major version
====================================

The following steps show how to upgrade from Wazuh 2.x to Wazuh 3.x (which implies upgrading from Elastic Stack 5.x to 6.x).

Upgrade Wazuh manager
---------------------

#. Stop the services:

  .. tabs::

    .. group-tab:: Systemd

      .. code-block:: console

        # systemctl stop wazuh-api
        # systemctl stop wazuh-manager

    .. group-tab:: SysV Init

      .. code-block:: console

          # service wazuh-api stop
          # service wazuh-manager stop

#. Add the new repository for Wazuh 3.x:

    .. tabs::

        .. group-tab:: Yum

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

        .. group-tab:: ZYpp  

          .. code-block:: console

              # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
              [wazuh_repo]
              gpgcheck=1
              gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
              enabled=1
              name=Wazuh repository
              baseurl=https://packages.wazuh.com/3.x/yum/
              protect=1
              EOF

#. Upgrade the manager:

    .. include:: ../../_templates/upgrading/wazuh/update_manager_api.rst

.. note::
  The installation of the updated packages **will automatically restart the services** for the Wazuh manager and API. The Wazuh config file will keep **unmodified**, so the settings for the new capabilities will have to be added manually. Check the :ref:`User Manual <user_manual>` for more information.



Disabling repositories
----------------------

    .. include:: ../../_templates/upgrading/wazuh/disable_repository.rst
