.. Copyright (C) 2019 Wazuh, Inc.

.. _upgrading_latest_minor:

Upgrade from the same major version (3.x)
=========================================

The following steps show how to upgrade to the latest available version of Wazuh 3.x (which implies upgrading to the latest version of Elastic Stack 6.x).

Starting the upgrade
--------------------

If you followed our :ref:`manager <installation>` or :ref:`agents <installation_agents>` installation guides, probably you disabled the repository in order to avoid undesired upgrades. It's necessary to enable them again to get the last packages.

a) CentOS/RHEL/Fedora:

  .. code-block:: console

    # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

b) Debian/Ubuntu:

  This step is not necessary if you set the packages to the ``hold`` state instead of disabling the repositories.

  .. code-block:: console

    # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list

Upgrade the Wazuh manager and API
----------------------------------

a) CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-manager wazuh-api

b) Debian/Ubuntu:

.. code-block:: console

    # apt-get update 
    # apt-get install wazuh-manager wazuh-api

.. note::
  The installation of the updated packages **will automatically restart the services** for the Wazuh manager, API and agents. Your Wazuh config file will keep **unmodified**, so you'll need to manually add the settings for the new capabilities. Check the :ref:`User Manual <user_manual>` for more information.

Upgrade the Wazuh agent
-----------------------

a) CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-agent

b) Debian/Ubuntu:

  .. code-block:: console

    # apt-get update 
    # apt-get install wazuh-agent

c) Windows:

  The agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it (both of them require **administrator rights**):

  * Using the GUI installer:

  Open the installer and follow the instructions to upgrade the agent.

    .. image:: ../../images/installation/windows.png
      :align: center

  * Using the command line:

  To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt (the ``/q`` argument is used for unattended installations):

  .. code-block:: console

    # wazuh-agent-3.9.2-1.msi /q

.. note::
  To learn more about the unattended installation process, you can check the :ref:`Windows installation guide <wazuh_agent_windows>`.

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

Next steps
----------

Once you have updated the manager and API you are ready to :ref:`upgrade the elastic stack <upgrading-elastic-stack>`.
