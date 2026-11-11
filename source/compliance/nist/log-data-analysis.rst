.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The log data analysis module collects and analyzes logs from applications, systems, network devices, and cloud workloads. Learn more about it in this section.

Log data analysis
=================

The Wazuh log data analysis module collects and analyzes logs from multiple sources, such as applications, systems, network devices, and cloud workloads. This data helps in resource monitoring, threat detection, and automated response.

The Wazuh log data analysis module helps you comply with the following NIST 800-53 controls:

-  **IA-4 Identifier management:** "*Common device identifiers include Media Access Control (MAC) addresses, Internet Protocol (IP) addresses, or device-unique token identifiers. The management of individual identifiers is not applicable to shared system accounts. Typically, individual identifiers are the usernames of the system accounts assigned to those individuals. In such instances, the account management activities of AC-2 use account names provided by IA-4. Identifier management also addresses individual identifiers not necessarily associated with system accounts. Preventing the reuse of identifiers implies preventing the assignment of previously used individual, group, role, service, or device identifiers to different individuals, groups, roles, services, or devices.*"

-  **SI-4 System monitoring:** "*System monitoring includes external and internal monitoring. External monitoring includes the observation of events occurring at external interfaces to the system. Internal monitoring includes the observation of events occurring within the system. Organizations monitor systems by observing audit activities in real-time or by observing other system aspects such as access patterns, characteristics of access, and other actions. The monitoring objectives guide and inform the determination of the events. System monitoring capabilities are achieved through a variety of tools and techniques, including intrusion detection and prevention systems, malicious code protection software, scanning tools, audit record monitoring software, and network monitoring software.*"

The above NIST 800-53 controls require you to monitor system activities in your organization. Analysis of these activities helps you keep track of security incidents and occurrences within your infrastructure. The Wazuh log data analysis module analyzes logs and generates findings when it detects suspicious activities.

Use case
--------

Detect Credential Manager credential listing on Windows endpoints
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh detects the listing of credentials stored in Windows Credential Manager, which is the observation of suspicious activity that SI-4 System monitoring requires. Attackers list these credentials to find passwords they can reuse. In this scenario, Wazuh detects the ``vaultcmd /list`` command on a monitored Windows 11 endpoint.

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
