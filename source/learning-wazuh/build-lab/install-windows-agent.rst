.. Copyright (C) 2018 Wazuh, Inc.

.. _build_lab_install_windows_agent:

Install the Windows Wazuh Agent
===============================

Download the Wazuh Agent package
--------------------------------

1. Log into your Windows Agent instance via Remote Desktop as Administrator.

2. Open Internet Explorer and paste the following into the address bar:

  .. code-block:: console

    https://packages.wazuh.com/3.x/windows/wazuh-agent-3.1.0-1.msi

3. Hit <Enter>. In the Warning dialog, click **[Add]** and then **[Add]** again, and then **[Close]**.

4. Re-paste the above link into the address bar and hit <Enter> again.  Click **[Save]**.  The MSI installer is now in your Downloads folder.


Run the installer to both install and self-register
---------------------------------------------------

1. Click the "Search Windows" icon (magnifying glass in bottom left of screen).  Type: "powershell" and right click on Windows PowerShell

    .. thumbnail:: ../../images/learning-wazuh/build-lab/pshell-1.png
        :title: powershell
        :width: 40%

2. Click "Run as administrator"

3. In PowerShell, change to the Downloads directory with "cd Downloads"

4. Then run the installer with this command line:

    .. code-block:: console

        .\\wazuh-agent-3.1.0-1.msi /q ADDRESS="172.30.0.10" AUTHD_SERVER="172.30.0.10" PROTOCOL="tcp" PASSWORD="please123" AGENT_NAME="windows-agent"

    It should look like tis

    .. thumbnail:: ../../images/learning-wazuh/build-lab/pshell-2.png
        :title: powershell
        :align: center
        :width: 100%

5.  A black window will pop up briefly and disappear.  The Windows agent should now be installed and registered.  Close PowerShell.


Create a shortcut to the Wazuh Agent Manager tool on the desktop
----------------------------------------------------------------

(This is only for lab purposes.  In production you will rarely call this tool.)

1. Open File Explorer (Windows-key + E).

2. Navigate to the ossec-agent directory and find **win32ui**.

    .. thumbnail:: ../../images/learning-wazuh/build-lab/find-wui.png
        :title: find wui
        :align: center
        :width: 100%

3. Right click and drag the "win32ui" file onto the desktop, release and pick "Create shortcuts here"

4. Right click on the newly created shortcut, and click "Properties", then click **[Advanced]**.

5. Checkmark "Run as Administrator" and click **[OK]** and then **[OK]** again.

6. Close File Explorer.


Run the Wazuh Agent Manager and confirm it is running and connected to the Wazuh Manager
----------------------------------------------------------------------------------------

1. Double-click on the win32ui-Shortcut icon on your desktop.  It should look like this:

    .. thumbnail:: ../../images/learning-wazuh/build-lab/agent-manager.png
        :title: powershell
        :width: 40%


2. Click View->View Logs.  You should find record of the agent successfully connecting to the Wazuh Manager.

    .. code-block:: console

        2018/01/17 02:27:24 ossec-agent: INFO: (4102): Connected to the server (172.30.0.10:1514).


Observe that Wazuh Manager is aware of all the connected agents.
----------------------------------------------------------------

Switch over to your Wazuh Server SSH window and run these commands, looking for your self-registered agents.

    .. code-block:: console

        [root@wazuh-server ossec]# agent_control -l

        Wazuh agent_control. List of available agents:
        ID: 000, Name: wazuh-server (server), IP: 127.0.0.1, Active/Local
        ID: 001, Name: linux-agent, IP: any, Active
        ID: 002, Name: elastic-server, IP: any, Active
        ID: 003, Name: windows-agent, IP: any, Active

        List of agentless devices:


    .. code-block:: console

        [root@wazuh-server ~]# grep "agent connected"  /var/ossec/logs/alerts/alerts.log -B1 -A1
        2018 Jan 17 01:17:58 (linux-agent) any->ossec
        Rule: 501 (level 3) -> 'New ossec agent connected.'
        ossec: Agent started: 'linux-agent->any'.
        --
        2018 Jan 17 01:24:20 (elastic-server) any->ossec
        Rule: 501 (level 3) -> 'New ossec agent connected.'
        ossec: Agent started: 'elastic-server->any'.
        --
        2018 Jan 17 02:27:23 (windows-agent) any->ossec
        Rule: 501 (level 3) -> 'New ossec agent connected.'
        ossec: Agent started: 'windows-agent->any'.
