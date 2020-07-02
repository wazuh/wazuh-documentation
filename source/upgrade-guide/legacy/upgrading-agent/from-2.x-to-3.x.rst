.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_agent_2.x_3.x:

Upgrading the Wazuh agent from 2.x to 3.x
=========================================

The following steps show how to upgrade the Wazuh agent from 2.x to 3.x.

Upgrading the Wazuh agent
-------------------------

#. Stop the service:

    .. code-block:: console

      # systemctl stop wazuh-agent

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

      .. group-tab:: ZYpp

        .. code-block:: console

          # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH
          # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
          [wazuh_repo]
          gpgcheck=1
          gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
          enabled=1
          autorefresh=1
          name=Wazuh repository
          baseurl=https://packages.wazuh.com/3.x/yum/
          protect=1
          EOF

#. Upgrade the Wazuh agent:

    .. tabs::


      .. group-tab:: YUM

        .. code-block:: console

          # yum install wazuh-agent


      .. group-tab:: APT

        .. code-block:: console

          # apt-get update
          # apt-get install wazuh-agent

      .. group-tab:: ZYpp

        .. code-block:: console

          # zypper update wazuh-agent

      .. group-tab:: Windows

        The Wazuh agent upgrade process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it, both require ``administrator rights``:

        - Using the GUI installer:

          Open the installer and follow the instructions to upgrade the Wazuh agent:

            .. image:: ../../../images/installation/windows.png
              :align: center

        - Using the command line:

          To upgrade the Wazuh agent from the command line, run the installer using Windows PowerShell or the command prompt. The ``/q`` argument is used for unattended installations:

            .. code-block:: console

              # wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q

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



Disabling the Wazuh repository
------------------------------

It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or lower version than the Wazuh manager:

  .. tabs::

    .. group-tab:: YUM

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

    .. group-tab:: APT

      .. code-block:: console

        # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
        # apt-get update

      Alternately, the user can set the package state to ``hold``, which will stop updates. The user can still upgrade it manually using ``apt-get install`` command:

      .. code-block:: console

        # echo "wazuh-manager hold" | sudo dpkg --set-selections
        # echo "wazuh-api hold" | sudo dpkg --set-selections
        # echo "wazuh-agent hold" | sudo dpkg --set-selections

    .. group-tab:: ZYpp

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo
