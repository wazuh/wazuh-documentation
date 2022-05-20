.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
    :description: Learn more about how to prepare your Wazuh Lab Environment. In this section, we show you how to install the Windows Wazuh agent. 

.. _build_lab_install_windows_agent:

Install the Windows Wazuh agent
===============================

Run the installer to download, install and self-register the Wazuh agent
------------------------------------------------------------------------

1. Log into your Windows Agent instance via Remote Desktop as Administrator. Remember to use the password you obtained `previously <access-ec2-instances.html#rdp-access-to-windows-instance>`_.

2. Click the **"Search Windows"** icon (magnifying glass in bottom left of screen).  Type: **"powershell"** and right click on Windows PowerShell

    .. thumbnail:: ../../images/learning-wazuh/build-lab/pshell-1.png
        :title: powershell
        :width: 40%

3. Click **"Run as administrator"**

4. In PowerShell, change to the Downloads directory with **"cd Downloads"**

5. Then download and run the installer with this command line:

    .. code-block:: console

        Invoke-WebRequest -Uri https://packages.wazuh.com/4.x/windows/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi -OutFile wazuh-agent.msi; ./wazuh-agent.msi /q WAZUH_MANAGER='172.30.0.10' WAZUH_REGISTRATION_SERVER='172.30.0.10' WAZUH_REGISTRATION_PASSWORD="please123" WAZUH_AGENT_NAME="windows-agent"

    It should look like this

    .. thumbnail:: ../../images/learning-wazuh/build-lab/pshell-2.png
        :title: powershell
        :align: center
        :width: 100%

6.  A black window will pop up briefly and disappear.  The Windows agent should
    now be installed and registered.  Close PowerShell.


Create a shortcut to the Wazuh agent Manager tool on the taskbar
----------------------------------------------------------------

(This is only for lab purposes.  In production you will rarely open this tool.)

1. Open File Explorer (Windows-key + E).

2. Navigate to the ``C:\Program files(x86)\ossec-agent`` directory and find the
   **win32ui** executable.

    .. thumbnail:: ../../images/learning-wazuh/build-lab/find-wui.png
        :title: find wui
        :align: center
        :width: 100%

3. Right click the "win32ui" file and select "Pin to the taskbar".


Run the Wazuh agent Manager and confirm it is running and connected to the Wazuh manager
----------------------------------------------------------------------------------------

1. Click on the Wazuh icon on your taskbar.  It should look like this:

    .. thumbnail:: ../../images/learning-wazuh/build-lab/agent-manager.png
        :title: powershell
        :width: 40%


2. Click on View->View Logs.  You should find record of the agent successfully connecting to the Wazuh manager.

    .. code-block:: none
        :class: output

        2019/11/22 12:05:23 wazuh-agent: INFO: (4102): Connected to the server (172.30.0.10:1514/tcp).


Observe that the Wazuh manager is aware of all the connected agents.
--------------------------------------------------------------------

Switch over to your Wazuh Server SSH window and run these commands, looking for
your self-registered agents.

    .. code-block:: console

        [root@wazuh-manager centos]# /var/ossec/bin/agent_control -l

    .. code-block:: none
        :class: output

    .. code-block:: none
        :class: output

        Wazuh agent_control. List of available agents:
           ID: 000, Name: wazuh-manager (server), IP: 127.0.0.1, Active/Local
           ID: 001, Name: linux-agent, IP: 172.30.0.30, Active
           ID: 002, Name: elastic-server, IP: 172.30.0.20, Active
           ID: 003, Name: windows-agent, IP: 172.30.0.40, Active

        List of agentless devices:

    .. code-block:: console

        [root@wazuh-manager centos]# grep "agent connected"  /var/ossec/logs/alerts/alerts.log -B1 -A1

    .. code-block:: none
        :class: output

        2019 Nov 22 11:41:35 (linux-agent) 172.30.0.30->ossec
        Rule: 501 (level 3) -> 'New ossec agent connected.'
        ossec: Agent started: 'linux-agent->172.30.0.30'.
        --
        2019 Nov 22 11:48:26 (elastic-server) 172.30.0.20->ossec
        Rule: 501 (level 3) -> 'New ossec agent connected.'
        ossec: Agent started: 'elastic-server->172.30.0.20'.
        --
        2019 Nov 22 12:05:23 (windows-agent) 172.30.0.40->ossec
        Rule: 501 (level 3) -> 'New ossec agent connected.'
        ossec: Agent started: 'windows-agent->172.30.0.40'.
