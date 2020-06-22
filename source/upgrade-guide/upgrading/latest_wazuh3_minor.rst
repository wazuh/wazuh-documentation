.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_latest_minor:

Upgrade from the same major version (3.x)
=========================================

The following steps show how to upgrade to the latest available version of Wazuh 3.x, which implies upgrading to the latest compatible version of Elastic Stack.

Starting the upgrade
--------------------

Following the Wazuh :ref:`manager <installation_guide>` or the Wazuh :ref:`agents <installation_agents>` installation guides, the user probably disabled the repository in order to avoid undesired upgrades. It's necessary to enable them again to get the last packages:

.. tabs::

  .. group-tab:: YUM

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

  .. group-tab:: APT

    This step is not necessary if you set the packages to the ``hold`` state instead of disabling the repositories.

    .. code-block:: console

      # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list

  .. group-tab:: ZYpp

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/wazuh.repo


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


.. note::
  The installation of the updated packages will automatically ``restart the services`` for the Wazuh manager, the Wazuh API and the Wazuh agents. The Wazuh configuration file will keep ``unmodified``, so the user will need to manually add the settings for the new capabilities. More information can be found in :ref:`User Manual <user_manual>`.

Upgrade the Wazuh agent
-----------------------

Since the Wazuh 3.x version it is possible to upgrade the Wazuh agents from the Wazuh manager or locally.

Upgrading the Wazuh agents remotely from the Wazuh manager is possible thanks to the ``agent_upgrade`` tools and the Wazuh API. More information can be found in the :ref:`Upgrading agent<upgrading-agent>` section.

To perform the upgrade locally follow the instructions depending on the Wazuh agent's operating system:

-  CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-agent

-  Debian/Ubuntu:

  .. code-block:: console

    # apt-get update
    # apt-get install wazuh-agent

-  OpenSUSE:

  .. code-block:: console

    # zypper update wazuh-agent

-  Windows:

  The Wazuh agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using the installer, both of them require ``administrator rights``:

  .. tabs::

    .. group-tab:: Using the GUI installer

      Open the installer and follow the instructions to upgrade the Wazuh agent:

        .. image:: ../../images/installation/windows.png
          :align: center


    .. group-tab:: Using the command line

      To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt. The ``/q`` argument is used for unattended installations:

      .. code-block:: console

        # wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q

  .. note::

    To learn more about the unattended installation process, please read :ref:`Windows installation guide <wazuh_agent_package_windows>`.

Disabling the Wazuh repositories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is recommended to disable the Wazuh repositories in order to avoid undesired upgrades and compatibility issues:

.. tabs::

  .. group-tab:: YUM

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

  .. group-tab:: APT

    This step is not necessary if the user set the packages to the ``hold`` state instead of disabling the repositories.

    .. code-block:: console

      # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
      # apt-get update

  .. group-tab:: ZYpp

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo


Next steps
----------

The next step consists on :ref:`upgrading the Elastic Stack <elastic_stack_packages_legacy>`.
