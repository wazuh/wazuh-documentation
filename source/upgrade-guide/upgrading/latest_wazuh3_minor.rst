.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_latest_minor:

Upgrade from the same major version (3.x)
=========================================

The following steps show how to upgrade to the latest available version of Wazuh 3.x (which implies upgrading to the latest version of Elastic Stack 6.x).

Starting the upgrade
--------------------

If you followed our :ref:`manager <wazuh_server_installation>` or :ref:`agents <installation_agents>` installation guides, probably you disabled the repository in order to avoid undesired upgrades. It's necessary to enable them again to get the last packages.

a) CentOS/RHEL/Fedora:

  .. code-block:: console

    # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

b) Debian/Ubuntu:

  This step is not necessary if you set the packages to the ``hold`` state instead of disabling the repositories.

  .. code-block:: console

    # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list

c) OpenSUSE:

  .. code-block:: console

    # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/wazuh.repo

Upgrade the Wazuh manager and API
----------------------------------

a) CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-manager wazuh-api

b) Debian/Ubuntu:

.. code-block:: console

    # apt-get update
    # apt-get install wazuh-manager wazuh-api

c) OpenSUSE:

.. code-block:: console

    # zypper update wazuh-manager wazuh-api

.. note::
  The installation of the updated packages **will automatically restart the services** for the Wazuh manager, API and agents. Your Wazuh config file will keep **unmodified**, so you'll need to manually add the settings for the new capabilities. Check the :ref:`User Manual <user_manual>` for more information.

Upgrade the Wazuh agent
-----------------------

Since the Wazuh 3.x version it is possible to upgrade the agents from the manager or locally.

Upgrading the agents remotely from the manager is possible thanks to the agent_upgrade tools and the Wazuh API. You may check it in the  :ref:`Upgrading agent<upgrading-agent>` section.

To perform the upgrade locally you have to follow the next steps:

a) CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-agent

b) Debian/Ubuntu:

  .. code-block:: console

    # apt-get update
    # apt-get install wazuh-agent

c) OpenSUSE:

  .. code-block:: console

    # zypper update wazuh-agent

d) Windows:

  The agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it (both of them require **administrator rights**):

  * Using the GUI installer:

  Open the installer and follow the instructions to upgrade the agent.

    .. image:: ../../images/installation/windows.png
      :align: center

  * Using the command line:

  To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt (the ``/q`` argument is used for unattended installations):

  .. code-block:: console

    # wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q

.. note::
  To learn more about the unattended installation process, you can check the :ref:`Windows installation guide <wazuh_agent_package_windows>`.

Finishing the Wazuh upgrade
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You've finished upgrading your Wazuh installation to the latest version. Now you can disable again the Wazuh repositories in order to avoid undesired upgrades and compatibility issues.

a) CentOS/RHEL/Fedora:

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

b) Debian/Ubuntu:

  This step is not necessary if you set the packages to the ``hold`` state instead of disabling the repositories.

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
    # apt-get update

c) OpenSUSE:

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

Next steps
----------

Once you have updated the Wazuh manager and API you are ready to :ref:`upgrade the Elastic Stack<installation_elastic_legacy>`.

You might also want to check our :ref:`compatibility matrix <compatibility_matrix>` in order to look at the Elastic stack version you need to use.
