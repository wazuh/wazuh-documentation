.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on Windows systems. 

.. _wazuh_agent_package_windows:

Installing Wazuh agents on Windows systems
==========================================

The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. The installation of a Wazuh agent on a Windows system uses deployment variables that facilitate the task of installing, registering, and configuring the agent. Alternatively, if you want to download the Wazuh agent package directly or check the compatible versions, see the :ref:`packages list <packages>` section . 

.. note:: To perform the installation, administrator privileges are required.

#. Download the `Windows installer <https://packages.wazuh.com/|CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi>`_. 

#. Select between command line or Graphical User Interface:

        .. tabs::
    
          .. group-tab:: Command line
    
             Edit the ``WAZUH_MANAGER`` and ``WAZUH_REGISTRATION_SERVER`` variables to contain the Wazuh managers IP address or hostname, and proceed to deploy the agent in your system using command line:
 
             - Using CMD:

               .. code-block:: none

                  wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2"
 
             -  Using PowerShell:

                .. code-block:: none
 
                  .\wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2"


               For additional deployment options, like agent name, agent group, and registration password, see :ref:`Deployment variables for Windows <deployment_variables_windows>`.


               You now have an installed, registered and configured Wazuh agent reporting to the Wazuh manager.

            
          .. group-tab:: GUI

                Run the Windows installer and follow the steps in the installation wizard. If unsure how to answer some of the prompts, use the default answers. Once installed, the agent uses a graphical user interface for configuration, opening the log file or starting and stopping the service.
            
                    .. thumbnail:: ../../images/installation/windows-agent.png
                        :align: center
                        :width: 50%
            
                You now have an installed Wazuh agent, the next step is to register and configure it to communicate with the Wazuh manager. See :ref:`Registering Wazuh agents <register_agents>`.                 
 

 By default, all agent files are stored in: ``C:\Program Files (x86)\ossec-agent``.


Uninstall
---------

In order to uninstall the agent, the original MSI file will be needed to perform the unattended process:

  .. code-block:: none
  
      msiexec.exe /x wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /qn  