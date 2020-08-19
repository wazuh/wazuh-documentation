.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh_server:

Upgrading the Wazuh server
==========================

This section describes how to upgrade the Wazuh server, from Wazuh 3.x to newest, which implies upgrading to the latest compatible version of Elastic Stack or Open Distro for Elasticsearch Stack. 

To upgrade the Wazuh server choose the appropriate tab for the desired package manager:

.. tabs::

  .. group-tab:: YUM

    If the Wazuh repository is disabled it is necessary to enable it to get the latest packages:

    .. code-block:: console

        # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

    Upgrade the Wazuh manager to the latest version:

    .. code-block:: console

        # yum upgrade wazuh-manager

  .. group-tab:: APT

    If the Wazuh repository is disabled it is necessary to enable it to get the latest packages. This step is not necessary if the packages are set to a ``hold`` state and the repository is enabled:

    .. code-block:: console

      # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list

    Upgrade the Wazuh manager to the latest version:

    .. code-block:: console

        # apt-get update
        # apt-get install wazuh-manager

  .. group-tab:: ZYpp

    If the Wazuh repository is disabled it is necessary to enable it to get the latest packages:

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/wazuh.repo

    Upgrade the Wazuh manager to the latest version:

    .. code-block:: console

        # zypper update wazuh-manager


.. note::
  The configuration file of the Wazuh manager will not be replaced in upgrades if you modified it, so the user will need to manually add the settings for the new capabilities. More information can be found in the :ref:`User manual <user_manual>`.

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

    Alternatively, the user can set the package state to ``hold``, which will stop updates. It will be still possible to upgrade it manually using ``apt-get install``:

    .. code-block:: console

      # echo "wazuh-manager hold" | sudo dpkg --set-selections

  .. group-tab:: ZYpp

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

Next step
---------

The next step consists on :ref:`upgrading Elasticsearch, Kibana and Filebeat<upgrade_elasticsearch_filebeat_kibana>`.
