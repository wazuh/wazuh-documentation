.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_agent_2x:

Upgrade the Wazuh agent from 2x to latest
=========================================

In order to the Wazuh agent from 2.x version to |WAZUH_LATEST| it is necessary to add the new repository for Wazuh 3.x. Choose a tab depending on the OS where the agent is installed: 

.. tabs::

  .. group-tab:: Yum

    #. Stop the Wazuh agent service: 
    
        .. code-block:: console

            # systemctl stop wazuh-agent    

    #. Add the Wazuh 3.x repository: 

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

    #. Install the new Wazuh's agent version:    

        .. code-block:: console

            # yum isntall wazuh-agent

  .. group-tab:: APT

    #. Stop the Wazuh agent service: 
    
        .. code-block:: console

            # systemctl stop wazuh-agent    

    #. Add the Wazuh 3.x repository:   

        .. code-block:: console

            # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

    #. Install the new Wazuh's agent version:

        .. code-block:: console

            # apt-get update
            # apt-get install wazuh-agent

  .. group-tab:: ZYpp

    #. Stop the Wazuh agent service: 
    
        .. code-block:: console

            # systemctl stop wazuh-agent    

    #. Add the Wazuh 3.x repository: 

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

    #. Install the new Wazuh's agent version:    

        .. code-block:: console

            # zypper install wazuh-agent

  .. group-tab:: Windows

    The agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it (both of them require **administrator rights**):

    .. tabs::
  
      .. group-tab:: Using the GUI installer

        Open the installer and follow the instructions to upgrade the agent.

          .. image:: ../../images/installation/windows.png
            :align: center

      .. group-tab:: Using the command line

        To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt (the ``/q`` argument is used for unattended installations):

        .. code-block:: console

          # wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q

    .. note::
      To learn more about the unattended installation process, please check the :ref:`Windows installation guide <wazuh_agent_package_windows>`.

Disabling repositories
----------------------

    .. include:: ../../_templates/upgrading/wazuh/disable_repository.rst
    