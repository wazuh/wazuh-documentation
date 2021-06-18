.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on Windows systems. 

.. _wazuh_agent_package_windows:

Installing Wazuh agents on Windows systems
==========================================

The installation of a Wazuh agent on a Windows system uses deployment variables that facilitate the task of installing, registering, and configuring the agent. The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. Alternatively, if you want to download the Wazuh agent package directly or check the compatible versions, see the :ref:`packages list <packages>` section. 

.. note:: To perform the installation, administrator privileges are required.

#. To start the installation process, download the `Windows installer <https://packages.wazuh.com/|CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi>`_. 

#. Select the installation method you want to follow: command line interface (CLI) or graphical user interface (GUI).

        .. tabs::
    
          .. group-tab:: CLI
    
             To deploy the Wazuh agent to your system, choose one of the command shell alternatives and edit the ``WAZUH_MANAGER`` and ``WAZUH_REGISTRATION_SERVER`` variables so that they contain the Wazuh manager IP address or hostname.
 
             - Using CMD:

               .. code-block:: none

                  wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2"
 
             -  Using PowerShell:

                .. code-block:: none
 
                  .\wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2"


              For additional deployment options such as agent name, agent group, and registration password, see the :ref:`Deployment variables for Windows <deployment_variables_windows>` section.

              The installation process is now complete and the Wazuh agent is successfully installed, registered, and configured, running on your Windows system.
               

            
          .. group-tab:: GUI

                To install the Wazuh agent on your system, run the Windows installer and follow the steps in the installation wizard. If you are not sure how to answer some of the prompts, use the default answers. Once installed, the agent uses a GUI for configuration, opening the log file, and starting or stopping the service.
            
                    .. thumbnail:: ../../images/installation/windows-agent.png
                        :align: center
                        :width: 50%
            
              The installation process is now complete and the Wazuh agent is successfully installed on your Windows system. The next step is to register and configure the agent to communicate with the Wazuh manager. To perform this action, see the :ref:`Registering Wazuh agents <register_agents>` section.                 
 

 By default, all agent files are stored in ``C:\Program Files (x86)\ossec-agent`` after the installation.


Uninstall a Wazuh agent
-----------------------

To uninstall the agent, the original MSI file is required to perform the unattended process:

  .. code-block:: none
  
      msiexec.exe /x wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /qn  

The Wazuh agent is now completely removed from your Windows system.