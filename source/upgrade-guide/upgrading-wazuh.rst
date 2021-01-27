.. Copyright (C) 2021 Wazuh, Inc.

.. _upgrading_wazuh_server:

Upgrading the Wazuh manager
===========================

This section describes how to upgrade the Wazuh manager, from Wazuh 3.x to the latest available version, which includes upgrading to the latest compatible version of Open Distro for Elasticsearch or Elastic Stack basic licence. 

.. note::
  To reduce the downtime of the servers it is recommended to upgrade the master node first

.. note:: Root user privileges are required to execute all the commands described below.

To upgrade the Wazuh manager choose the appropriate tab for the desired package manager:

.. tabs::

  .. group-tab:: Yum

    .. include:: ../_templates/installations/basic/wazuh/yum/add_repository_aio.rst

    3. Clean the YUM cache:

      .. code-block:: console

        # yum clean all
    
    4. Upgrade the Wazuh manager to the latest version:

      .. code-block:: console

          # yum upgrade wazuh-manager

  .. group-tab:: APT

    .. include:: ../_templates/installations/basic/wazuh/deb/add_repository_aio.rst

    4. Upgrade the Wazuh manager to the latest version:

      .. code-block:: console

          # apt-get install wazuh-manager

  .. group-tab:: ZYpp

    .. include:: ../_templates/installations/basic/wazuh/zypp/add_repository_aio.rst

    3. Upgrade the Wazuh manager to the latest version:

      .. code-block:: console

          # zypper update wazuh-manager


.. note::
  The configuration file of the Wazuh manager will not be replaced in upgrades if you modified it, so the user will need to manually add the settings for the new capabilities. More information can be found in the :ref:`User manual <user_manual>`.

  If Wazuh is run in a multi-node cluster, it is necessary to upgrade all the Wazuh managers to the same version. Otherwise, the Wazuh nodes will not join the cluster.

Disabling the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues:

.. tabs::

  .. group-tab:: Yum

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
