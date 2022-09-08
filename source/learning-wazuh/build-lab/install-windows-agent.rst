.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn more about how to prepare your Wazuh Lab Environment. In this section, we show you how to install the Windows Wazuh agent. 

Install the Windows Wazuh agent
===============================

Use the following procedure to install, register and configure a Wazuh agent on a Windows system.

Run the installer to download, install and self-register the Wazuh agent
------------------------------------------------------------------------

.. note::
   
   You will need administrator privileges to perform this installation. PowerShell 3.0 or greater is required.

#. Log into your Windows Agent instance.

#. Click the **Search Windows** icon (magnifying glass in the bottom left of screen).  Type: "PowerShell" and right-click on Windows PowerShell.

   .. thumbnail:: ../../images/learning-wazuh/build-lab/pshell-1.png
      :title: powershell
      :align: center
      :width: 80%

#. Click **Run as administrator**.

#. Download and run the installer with the following command line. Make sure to replace the IP address in ``WAZUH_MANAGER`` and ``WAZUH_REGISTRATION_SERVER`` with your Wazuh manager IP address or FQDN. 

   .. code-block:: console

      Invoke-WebRequest -Uri https://packages.wazuh.com/4.x/windows/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi -OutFile ${env:tmp}\wazuh-agent-|WAZUH_CURRENT_WINDOWS|.msi; msiexec.exe /i ${env:tmp}\wazuh-agent-|WAZUH_CURRENT_WINDOWS|.msi /q WAZUH_MANAGER='<WAZUH_MANAGER_IP_ADDRESS>' WAZUH_REGISTRATION_SERVER='<WAZUH_MANAGER_IP_ADDRESS>' WAZUH_REGISTRATION_PASSWORD='please123' WAZUH_AGENT_NAME="windows-agent"
    
#. Start the agent. 

   .. code-block:: console
      
      NET START WazuhSvc


Create a shortcut to the Wazuh agent Manager tool on the taskbar
----------------------------------------------------------------

(This is only for lab purposes.  In production you will rarely open this tool.)

#. Open File Explorer (Windows-key + E).

#. Navigate to the ``C:\Program files(x86)\ossec-agent`` directory and find the
   **win32ui** executable.

   .. thumbnail:: ../../images/learning-wazuh/build-lab/find-wui.png
      :align: center
      :width: 80%

#. Right-click the **win32ui** file and select **Pin to the taskbar**.

Run the Wazuh agent Manager and confirm it is running and connected to the Wazuh manager
----------------------------------------------------------------------------------------

#. Click on the Wazuh icon on your taskbar.  It should look like this:

   .. thumbnail:: ../../images/learning-wazuh/build-lab/agent-manager.png
      :align: center
      :width: 80%

#. By clicking on **View** > **View Logs**  you should find a record of the agent successfully receiving a valid key and connecting to the Wazuh manager.

#. By clicking on **Manage**, you can **Star**, **Stop** and **Restart** the agent. 

On the Wazuh dashboard, click **Wazuh** > **Agents** to review all the registered agents and their status.  

.. note::
   
   The ``C:\Program Files (x86)\ossec-agent\wazuh-agent.state`` file contains several useful pieces of information about the state of the Wazuh agent connection with the Wazuh manager.  See the file content itself for more information.
