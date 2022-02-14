.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on Windows systems in this section of our Installation Guide.

.. _wazuh_agent_package_windows:

Installing Wazuh agents on Windows systems
==========================================

The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. Monitor your Windows systems with Wazuh, from Windows XP to the latest available versions including Windows 11 and Windows Server 2022.

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

              The installation process is now complete and the Wazuh agent is successfully installed, registered, and configured.

              .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables. To learn more about the different registration methods, see the :ref:`Registering Wazuh agents <register_agents>` section.
               

            
          .. group-tab:: GUI

                To install the Wazuh agent on your system, run the Windows installer and follow the steps in the installation wizard. If you are not sure how to answer some of the prompts, use the default answers. Once installed, the agent uses a GUI for configuration, opening the log file, and starting or stopping the service.
            
                    .. thumbnail:: ../../images/installation/windows-agent.png
                        :align: center
                        :width: 50%
            
              The installation process is now complete and the Wazuh agent is successfully installed on your Windows system. The next step is to register and configure the agent to communicate with the Wazuh manager. To perform this action, see the :ref:`Registering Wazuh agents <register_agents>` section.                 
 

 By default, all agent files are stored in ``C:\Program Files (x86)\ossec-agent`` after the installation.


Uninstall a Wazuh agent
-----------------------

To uninstall the agent, the original Windows installer file is required to perform the unattended process:

  .. code-block:: none
  
      msiexec.exe /x wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /qn  

The Wazuh agent is now completely removed from your Windows system.
