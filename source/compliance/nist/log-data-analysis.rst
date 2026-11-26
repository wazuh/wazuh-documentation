.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The log data analysis module collects and analyzes logs from applications, systems, network devices, and cloud workloads. Learn more about it in this section.

Log data analysis
=================

The Wazuh log data analysis module collects and analyzes logs from multiple sources, such as applications, systems, network devices, and cloud workloads. This data helps in resource monitoring, threat detection, and automated response.

The Wazuh log data analysis module helps you comply with the following NIST 800-53 controls:

-  **IA-4 Identifier management:** Give every user and device a unique identifier, such as a user name or a MAC or IP address, so that you can trace activity back to it.

-  **SI-4 System monitoring:** Monitor your systems at their boundaries and internally to detect attacks, signs of attacks, and unauthorized use.

The Wazuh log data analysis module analyzes logs and generates findings when it detects suspicious activities.

Use case
--------

Detect Credential Manager credential listing on Windows endpoints
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SI-4 System monitoring requires you to observe suspicious activity on your systems. Wazuh helps meet this control by detecting the listing of credentials stored in Windows Credential Manager. Attackers list these credentials to find passwords they can reuse. In this scenario, Wazuh detects the ``vaultcmd /list`` command on a monitored Windows 11 endpoint.

.. note::

   The detection rule reads Windows Security event 4688, which Windows records only when process creation auditing is on. The first step turns it on and adds the command line to the event.

#. Run the following commands in PowerShell as an administrator to audit process creation and include the command line in event 4688:

   .. code-block:: ps1con

      > auditpol /set /subcategory:"Process Creation" /success:enable
      > reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\Audit" /v ProcessCreationIncludeCmdLine_Enabled /t REG_DWORD /d 1 /f

#. Run the following command to list the vaults in Windows Credential Manager:

   .. code-block:: ps1con

      > vaultcmd /list

#. Click the upper-left menu icon (**☰**) and go to **Threat intelligence** > **Threat Hunting**, then click the **Findings** tab.

   .. thumbnail:: /images/compliance/nist/credential-manager-findings.png
      :title: Credential Manager findings
      :alt: Credential Manager findings
      :align: center
      :width: 80%

#. Expand the **Windows Credential Manager credentials listed or dumped** finding.

   The finding shows the command in ``process.command_line``, the user in ``user.name``, and the Windows event ID 4688.

   .. thumbnail:: /images/compliance/nist/credential-manager-finding-details.png
      :title: Credential Manager finding details
      :alt: Credential Manager finding details
      :align: center
      :width: 80%
