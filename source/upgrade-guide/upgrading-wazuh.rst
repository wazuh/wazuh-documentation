.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh_server:

Upgrading the Wazuh server
==========================

This section describes how to upgrade the Wazuh server, including the Wazuh manager and the Wazuh API, from Wazuh 3.x to Wazuh 3.y, which implies upgrading to the latest compatible version of Elastic Stack.

Upgrading the Wazuh server
--------------------------

.. tabs::

  .. group-tab:: YUM

    If the Wazuh repository is disabled it is necessary to enable it to get the latest packages:

    .. code-block:: console

        # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

    * All-in-one deployment and Distributed deployment - Wazuh master node:

      Upgrade the Wazuh manager and the Wazuh API to the latest version:

      .. code-block:: console

          # yum upgrade wazuh-manager wazuh-api

    * Distributed deployment - Wazuh worker node:

      Upgrade the Wazuh manager to the latest version:

      .. code-block:: console

          # yum upgrade wazuh-manager

  .. group-tab:: APT

    If the Wazuh repository is disabled it is necessary to enable it to get the latest packages. This step is not necessary if the packages are set to a ``hold`` state and the repository is enabled:

    .. code-block:: console

      # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list

    * All-in-one deployment and Distributed deployment - Wazuh master node:

      Upgrade the Wazuh manager and the Wazuh API to the latest version:

      .. code-block:: console

          # apt-get update
          # apt-get install wazuh-manager wazuh-api

    * Distributed deployment - Wazuh worker node:

      Upgrade the Wazuh manager to the latest version:

      .. code-block:: console

          # apt-get update
          # apt-get install wazuh-manager

  .. group-tab:: ZYpp

    If the Wazuh repository is disabled it is necessary to enable it to get the latest packages:

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/wazuh.repo

    * All-in-one deployment and Distributed deployment - Wazuh master node:

      Upgrade the Wazuh manager and the Wazuh API to the latest version:

      .. code-block:: console

          # zypper update wazuh-manager wazuh-api

    * Distributed deployment - Wazuh worker node:

      Upgrade the Wazuh manager to the latest version:

      .. code-block:: console

          # zypper update wazuh-manager   

.. note::
  The installation of the updated packages will automatically ``restart the services`` for the Wazuh manager and the Wazuh API. The Wazuh manager's configuration file will be ``unmodified``, so the user will need to manually add the settings for the new capabilities. More information can be found in the :ref:`User manual <user_manual>`.

  If Wazuh is run in a multi-node cluster, it is necessary to upgrade all the Wazuh managers to the same version. Otherwise, the Wazuh nodes will not join the cluster.

Disabling the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues:

.. tabs::

  .. group-tab:: YUM

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

  .. group-tab:: APT

    This step is not necessary if the user set the packages to a ``hold`` state instead of disabling the repository.

    .. code-block:: console

      # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
      # apt-get update

  .. group-tab:: ZYpp

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

Next step
---------

The next step consists on :ref:`upgrading Elastic Stack <upgrading_elastic_stack>`.
