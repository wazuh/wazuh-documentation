.. Copyright (C) 2019 Wazuh, Inc.

.. _upgrading_different_major:

Upgrade from different major version
====================================

The following steps show how to upgrade from Wazuh 2.x to Wazuh 3.x (which implies upgrading from Elastic Stack 5.x to 6.x).

Upgrade Wazuh manager
---------------------

1. Stop the services:

  .. code-block:: console

    # systemctl stop wazuh-api
    # systemctl stop wazuh-manager

2. Add the new repository for Wazuh 3.x.

  a) For CentOS/RHEL/Fedora:

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

  b) For Debian/Ubuntu:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

3. Upgrade the manager.

  a) Upgrade the Wazuh manager on CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install wazuh-manager

  b) Upgrade the Wazuh manager on Debian/Ubuntu:

    .. code-block:: console

      # apt-get update
      # apt-get install wazuh-manager

4. Upgrade the API.

  a) Upgrade the Wazuh API on CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install wazuh-api

  b) Upgrade the Wazuh API on Debian/Ubuntu:

    .. code-block:: console

      # apt-get install wazuh-api

Upgrade Wazuh agent
-------------------

1. Stop the service:

  .. code-block:: console

    # systemctl stop wazuh-agent

2. Add the new repository for Wazuh 3.x.

  a) For CentOS/RHEL/Fedora:

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

  b) For Debian/Ubuntu:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

3. Upgrade the agent.

  a) Upgrade the Wazuh agent on CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install wazuh-agent

  b) Upgrade the Wazuh agent on Debian/Ubuntu:

    .. code-block:: console

      # apt-get update
      # apt-get install wazuh-agent

  c) For Windows:

  The agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it (both of them require **administrator rights**):

  * Using the GUI installer:

  Open the installer and follow the instructions to upgrade the agent.

    .. image:: ../../images/installation/windows.png
      :align: center

  * Using the command line:

  To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt (the ``/q`` argument is used for unattended installations):

  .. code-block:: console

    # wazuh-agent-3.9.0-1.msi /q

.. note::
  To learn more about the unattended installation process, you can check the :ref:`Windows installation guide <wazuh_agent_windows>`.

Disable the Wazuh repository
----------------------------

We recommend that the Wazuh repository be disabled in order to prevent accidental upgrades. To disable the repository, follow these steps:

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

  b) For Debian/Ubuntu:

    .. code-block:: console

      # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
      # apt-get update

    Alternately, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

    .. code-block:: console

      # echo "wazuh-manager hold" | sudo dpkg --set-selections
      # echo "wazuh-api hold" | sudo dpkg --set-selections
      # echo "wazuh-agent hold" | sudo dpkg --set-selections