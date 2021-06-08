.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about how to install or deploy the Wazuh lightweight agent in Windows in this section of our installation guide. 

.. _wazuh_agent_package_windows:

Windows
=======

.. note:: In order to perform this installation, administrator privileges are required.

The first step to install the Wazuh agent on a Windows machine is to download the `Windows installer <https://packages.wazuh.com/|CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi>`_ from the :ref:`packages list<packages>`. Once downloaded, it can be installed using the command line or by following the GUI steps:

  a) Using the command line, either installation or deployment can be chosen:

    * Installation:

        In order to install the Windows agent from the command line, the installer must be run using the following command (the ``/q`` argument is used for unattended installations)

      * Using CMD: ::

	  wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q

      * Using PowerShell: ::

	  .\wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q


    * Deployment:

        Registration and agent configuration can be automated using variables. It is required to define at least the variable ``WAZUH_REGISTRATION_SERVER`` or ``AUTHD_SERVER``. The agent will use those values to register and assign a Wazuh manager for forwarding events

	* Using CMD: ::

            wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2"

	* Using PowerShell: ::

	    .\wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2"

    For other automated deployment options, please refer to the :ref:`deployment variables for Windows <deployment_variables_windows>` section.


  b) Using the GUI:


    To install the Windows agent from the GUI, run the downloaded file and follow the steps in the installation wizard. If unsure how to answer some of the prompts, simply use the default answers.

    Once installed, the agent uses a graphical user interface for configuration, opening the log file or starting and stopping the service.

        .. thumbnail:: ../../images/installation/windows-agent.png
            :align: center
            :width: 50%

    By default, all agent files will be found in: ``C:\Program Files (x86)\ossec-agent``.

Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process visit the :ref:`user manual<register_agents>` section.

Uninstall
---------

In order to uninstall the agent, the original MSI file will be needed to perform the unattended process:

    msiexec.exe /x wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /qn  