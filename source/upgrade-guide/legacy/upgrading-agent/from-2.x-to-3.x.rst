.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section of the Wazuh documentation guides through the upgrade process of the Wazuh agent from 2.x to 3.x.
  
.. _upgrading_agent_2.x_3.x:

Upgrading the Wazuh agent from 2.x to 3.x
=========================================

The following steps show how to upgrade the Wazuh agent from 2.x to 3.x.

Upgrading the Wazuh agent
-------------------------

To upgrade the Wazuh agent, choose the appropriate tab for the desired operating system:

    .. tabs::


      .. group-tab:: YUM

        Add the new repository for Wazuh 3.x:

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

        Upgrade the Wazuh agent:

        .. code-block:: console

          # yum install wazuh-agent

        It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or lower version than the Wazuh manager:

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT

        Add the new repository for Wazuh 3.x:

        .. code-block:: console

          # echo "deb https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

        Upgrade the Wazuh agent:

        .. code-block:: console

          # apt-get update
          # apt-get install wazuh-agent

        It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or lower version than the Wazuh manager:

        .. code-block:: console

          # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
          # apt-get update

        Alternatively, the user can set the package state to ``hold``, which will stop updates. It will be still possible to upgrade it manually using ``apt-get install``:

        .. code-block:: console

          # echo "wazuh-agent hold" | sudo dpkg --set-selections

      .. group-tab:: ZYpp

        Add the new repository for Wazuh 3.x:

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

        Upgrade the Wazuh agent:

        .. code-block:: console

          # zypper update wazuh-agent

        It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or lower version than the Wazuh manager:

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

      .. group-tab:: Windows

        The Wazuh agent upgrade process for Windows systems requires to download the latest available installer from the :doc:`packages list </installation-guide/packages-list>`. There are two ways of using it, both require ``administrator rights``:

        - Using the GUI installer:

          Open the installer and follow the instructions to upgrade the Wazuh agent:

            .. thumbnail:: ../../../images/installation/windows.png    
              :title: Windows agent
              :align: left
              :width: 100%


        - Using the command line:

          To upgrade the Wazuh agent from the command line, run the installer using Windows PowerShell or the command prompt. The ``/q`` argument is used for unattended installations:

            .. code-block:: console

              # wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q

          .. note::
            To learn more about the unattended installation process, please read the :ref:`Windows installation guide <wazuh_agent_package_windows>`.


      .. group-tab:: MacOS X

          On MacOS X system the Wazuh agent upgrade can be done by deleting the previous version and installing the newest version of the Wazuh agent from scratch. As the Wazuh agent's ``ossec.conf`` configuration file will be overwritten it is recommended to backup the old configuration file and import previous settings where needed.

          More information about the process can be found in the :ref:`Wazuh agent installation and deployment on MacOS X <wazuh_agent_package_macos>` section.


      .. group-tab:: Unix based systems

          On the Unix based systems the Wazuh agent upgrade can be done by deleting the previous version and installing the newest version of the Wazuh agent from scratch. As the Wazuh agent's ``ossec.conf`` configuration file will be overwritten it is recommended to backup the old configuration file and import previous settings where needed.

          More information about the process can be found following the appropriate link for the desired operating system:

          - :ref:`Wazuh agent installation and deployment on AIX <wazuh_agent_package_aix>`.

          - :ref:`Wazuh agent installation on HP-UX <wazuh_agent_package_hpux>`.

          - :ref:`Wazuh agent installation on Solaris <wazuh_agent_solaris>`.
