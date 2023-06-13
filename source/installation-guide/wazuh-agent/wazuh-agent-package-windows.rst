.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on Windows systems in this section of our Installation Guide.

.. _wazuh_agent_package_windows:

Installing Wazuh agents on Windows endpoints
============================================

The agent runs on the endpoint you want to monitor and communicates with the Wazuh server, sending data in near real-time through an encrypted and authenticated channel. Monitor your Windows systems with Wazuh, from Windows XP to the latest available versions including Windows 11 and Windows Server 2022.

.. note:: To perform the installation, administrator privileges are required.

#. To start the installation process, download the `Windows installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_WINDOWS|/windows/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi>`_. 

#. Select the installation method you want to follow: command line interface (CLI) or graphical user interface (GUI).

        .. tabs::
    
          .. group-tab:: CLI

             To deploy the Wazuh agent on your endpoint, choose one of the command shell alternatives and edit the ``WAZUH_MANAGER`` variable so that it contains the Wazuh manager IP address or hostname.

             - Using CMD:

               .. code-block:: none

                  wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2"

             -  Using PowerShell:

                .. code-block:: none

                  .\wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2"


              For additional deployment options such as agent name, agent group, and registration password, see the :doc:`Deployment variables for Windows </user-manual/deployment-variables/deployment-variables-windows>` section.

              The installation process is now complete, and the Wazuh agent is successfully installed and configured. You can start the Wazuh agent from the GUI or by running:

              .. code-block:: none

                NET START Wazuh

             Once started, the Wazuh agent will start the enrollment process and register with the manager.

              .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables. To learn more about the different registration methods, see the :doc:`Wazuh agent enrollment </user-manual/agent-enrollment/index>` section.
               



          .. group-tab:: GUI

                To install the Wazuh agent on your system, run the Windows installer and follow the steps in the installation wizard. If you are not sure how to answer some of the prompts, use the default answers. Once installed, the agent uses a GUI for configuration, opening the log file, and starting or stopping the service.

                    .. thumbnail:: ../../images/installation/windows-agent.png                        
                        :align: center
                        :width: 100%
                        :title: Windows agent manager
                        :alt: Windows agent manager
            
              The installation process is now complete, and the Wazuh agent is successfully installed on your Windows endpoint. The next step is to register and configure the agent to communicate with the Wazuh server. To perform this action, see the :doc:`Wazuh agent enrollment </user-manual/agent-enrollment/index>` section.                 
 

 By default, all agent files are stored in ``C:\Program Files (x86)\ossec-agent`` after the installation.


Uninstall a Wazuh agent
-----------------------

To uninstall the agent, the original Windows installer file is required to perform the unattended process:

  .. code-block:: none
  
      msiexec.exe /x wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /qn  

The Wazuh agent is now completely removed from your Windows endpoint.
