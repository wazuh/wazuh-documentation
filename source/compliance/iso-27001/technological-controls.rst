.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet ISO 27001 Annex A technological controls A.8.2, A.8.7, A.8.8, A.8.15, A.8.19, and A.8.20 with step-by-step use cases.

Technological controls
======================

A.8.2 Privileged access rights
------------------------------

Control A.8.2 requires the organization to restrict and manage the allocation and use of privileged access rights.

Wazuh helps meet the A.8.2 control by generating a finding for each command that a user runs with ``sudo`` on a monitored Linux endpoint. Each finding records the user, the target user, and the command.

Use case: Detecting privileged commands run with sudo
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh detects a user who reads the ``/etc/shadow`` file with ``sudo`` on an Ubuntu 24.04 endpoint. This file stores the password hashes of the local accounts.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Run the following command on the Ubuntu endpoint as a user with ``sudo`` rights:

   .. code-block:: console

      $ sudo head -1 /etc/shadow

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab.

#. Enter the following query in the search bar and press **Enter**:

   .. code-block:: none

      wazuh.integration.name:system-auth and process.command_line:*shadow*

   .. thumbnail:: /images/compliance/iso-27001/threat-hunting-sudo-shadow-query.png
      :title: Threat Hunting findings for the sudo command
      :alt: Threat Hunting findings for the sudo command
      :align: center
      :width: 80%

#. Expand the ``Sudo command executed`` finding. The ``event.original`` field shows the user who ran the command and the target user, and the ``process.command_line`` field shows the command.

   .. thumbnail:: /images/compliance/iso-27001/sudo-command-finding-details.png
      :title: Sudo command executed finding details
      :alt: Sudo command executed finding details
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.iso_27001`` field. The finding maps to A.8.2 Privileged access rights, A.8.5 Secure authentication, and A.8.15 Logging.

   .. thumbnail:: /images/compliance/iso-27001/sudo-command-compliance-field.png
      :title: ISO 27001 controls of the Sudo command executed finding
      :alt: ISO 27001 controls of the Sudo command executed finding
      :align: center
      :width: 80%

A.8.7 Protection against malware
--------------------------------

Control A.8.7 requires the organization to implement malware protection, supported by appropriate user awareness.

Protection against malware includes detecting malicious behavior on endpoints. Rootkits, for example, often load a kernel module to hide their processes, files, and network connections.

Wazuh helps meet the A.8.7 control with detection rules for process and file events, rootkit detection, file integrity monitoring with threat intelligence, and antivirus integrations. This page shows the detection rules. For examples of the other capabilities, see :doc:`Malware detection </user-manual/capabilities/malware-detection/index>`.

Use case: Detecting kernel module loading on an Ubuntu endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh detects a user who loads a kernel module with ``insmod`` or ``modprobe`` on an Ubuntu 24.04 endpoint. The detection uses the process creation events of Sysmon for Linux. You load the ``dummy`` network driver, a harmless module that ships with the Ubuntu kernel.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Add the Microsoft package repository to the Ubuntu 24.04 endpoint and install the ``sysmonforlinux`` package:

   .. code-block:: console

      $ curl -fsSL https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -o /tmp/packages-microsoft-prod.deb
      $ sudo dpkg -i /tmp/packages-microsoft-prod.deb
      $ sudo apt-get update
      $ sudo apt-get install -y sysmonforlinux

#. Create a ``sysmon-config.xml`` file with the following content. It logs every process creation:

   .. code-block:: xml

      <Sysmon schemaversion="4.81">
        <EventFiltering>
          <RuleGroup name="" groupRelation="or">
            <ProcessCreate onmatch="exclude"/>
          </RuleGroup>
        </EventFiltering>
      </Sysmon>

#. Install Sysmon for Linux with the configuration file:

   .. code-block:: console

      $ sudo sysmon -accepteula -i sysmon-config.xml

   The Wazuh agent reads the system journal by default, which includes the Sysmon for Linux events. To also detect persistence techniques with Sysmon for Linux, see :doc:`Detecting reverse shells and persistence on Linux </user-manual/capabilities/malware-detection/use-cases/reverse-shells-persistence>`.

#. Load the ``dummy`` kernel module and check that it is loaded:

   .. code-block:: console

      $ sudo modprobe dummy
      $ lsmod | grep dummy

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**) and go to **Threat intelligence** > **Threat Hunting**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"Linux kernel module loaded via insmod/modprobe - modprobe dummy"

   .. thumbnail:: /images/compliance/iso-27001/kernel-module-finding.png
      :title: Threat Hunting finding for the kernel module
      :alt: Threat Hunting finding for the kernel module
      :align: center
      :width: 80%

#. Expand the finding. The ``process.command_line`` field shows the ``modprobe dummy`` command, and the ``process.parent.name`` field shows that the command ran with ``sudo``.

   .. thumbnail:: /images/compliance/iso-27001/kernel-module-finding-details.png
      :title: Kernel module finding details
      :alt: Kernel module finding details
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.iso_27001`` field. The finding maps to A.8.7 Protection against malware and A.8.19 Installation of software on operational systems, among other controls.

   .. thumbnail:: /images/compliance/iso-27001/kernel-module-compliance-field.png
      :title: ISO 27001 controls of the kernel module finding
      :alt: ISO 27001 controls of the kernel module finding
      :align: center
      :width: 80%

After you finish this use case, unload the dummy kernel module and remove Sysmon for Linux from the Ubuntu endpoint:

.. code-block:: console

   $ sudo modprobe -r dummy
   $ sudo sysmon -u
   $ sudo apt-get remove -y sysmonforlinux

A.8.8 Management of technical vulnerabilities
---------------------------------------------

Control A.8.8 requires the organization to obtain information about the technical vulnerabilities of the information systems, evaluate its exposure to them, and take appropriate measures.

Wazuh helps meet the A.8.8 control with the Vulnerability Detection module. It correlates the software inventory of each endpoint with the vulnerability content of Wazuh CTI. It reports the vulnerable packages, the severity of each vulnerability, and whether a fixed version is available.

Use case: Prioritizing critical vulnerabilities that have a fix
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to find the critical vulnerabilities of an Ubuntu endpoint that a package upgrade fixes.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**) and go to **Threat intelligence** > **Vulnerability Detection**.

#. Click **Explore agent** and select the Ubuntu endpoint. The **Dashboard** tab shows the vulnerabilities by severity, the top vulnerable packages, and the most common vulnerability scores.

   .. thumbnail:: /images/compliance/iso-27001/vulnerability-detection-dashboard.png
      :title: Vulnerability Detection dashboard
      :alt: Vulnerability Detection dashboard
      :align: center
      :width: 80%

#. Switch to the **Inventory** tab. In **Severity**, select **Critical**.

#. Check the ``vulnerability.scanner.condition`` column. A condition such as ``Fixed in 157.0`` means that a fixed version exists, so upgrading the package removes the vulnerability.

   .. thumbnail:: /images/compliance/iso-27001/vulnerability-detection-inventory-critical.png
      :title: Critical vulnerabilities in the Vulnerability Detection inventory
      :alt: Critical vulnerabilities in the Vulnerability Detection inventory
      :align: center
      :width: 80%

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Upgrade the vulnerable package on the endpoint. For example, for a Debian package:

   .. code-block:: console
      :emphasize-lines: 2

      $ sudo apt-get update
      $ sudo apt-get install --only-upgrade <PACKAGE_NAME>

   Replace ``<PACKAGE_NAME>`` with the name of the vulnerable package. After the next inventory scan, Wazuh generates a ``Wazuh VD - Vulnerability <CVE_ID> remediated`` finding for each vulnerability that the upgrade resolves. The inventory scan runs every hour. To run it now, restart the Wazuh agent. To see the findings, open **Threat intelligence** > **Vulnerability Detection**, select the Ubuntu endpoint, switch to the **Findings** tab, and search for ``wazuh.rule.title:*remediated*``.

A.8.15 Logging
--------------

Control A.8.15 requires the organization to produce, store, protect, and analyze logs that record activities, exceptions, faults, and other relevant events.

Wazuh helps meet the A.8.15 control by collecting endpoint logs, storing findings in the Wazuh indexer, and generating reports from them.

Use case: Generating an ISO 27001 report for an audit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to generate a PDF report of the ISO 27001 findings of a period, which you can share with auditors.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**) and go to **Security operations** > **Regulatory Compliance**, then click the **ISO 27001** tab.

#. Select the period of the report in the time picker, for example, **Last 30 days**.

#. Click the options menu (**⋮**) in the upper-right corner and select **Generate report**.

   .. thumbnail:: /images/compliance/iso-27001/generate-report-menu.png
      :title: Generate report option
      :alt: Generate report option
      :align: center
      :width: 80%

#. Keep the **Generating report** dialog open until the Wazuh dashboard shows **Successfully generated report**. Your browser downloads the report as a PDF file.

   .. thumbnail:: /images/compliance/iso-27001/generating-report-dialog.png
      :title: Successfully generated report message
      :alt: Successfully generated report message
      :align: center
      :width: 80%

#. To download the report again later, click **Reports** in the confirmation message. The **Reports** table of the **Reporting** page lists each report with its creation time.

   .. thumbnail:: /images/compliance/iso-27001/reports-table.png
      :title: Reporting page Reports table
      :alt: Reporting page Reports table
      :align: center
      :width: 80%

A.8.19 Installation of software on operational systems
-------------------------------------------------------

Control A.8.19 requires the organization to implement procedures and measures to securely manage software installation on operational systems.

Unauthorized software and malware often install a service so that they start with the system. Reviewing new services helps you confirm that only approved software runs on your endpoints.

Wazuh helps meet the A.8.19 control with log data analysis and the IT Hygiene module. Windows records event ID 7045 in the System event log each time a service is installed. Wazuh generates a ``System service installed`` finding for it. The IT Hygiene module keeps an inventory of the installed packages and services on each endpoint.

Use case: Detecting a new service on a Windows endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh detects a new service on a Windows 11 endpoint.

Windows endpoint
~~~~~~~~~~~~~~~~

#. Run the following command in PowerShell as an administrator to create a service named ``RemoteSupportAgent``:

   .. code-block:: ps1con

      > sc.exe create RemoteSupportAgent binPath= "C:\Windows\System32\notepad.exe" start= demand DisplayName= "Remote Support Agent"

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**) and go to **Threat intelligence** > **Threat Hunting**, click **Explore agent**, and select the Windows endpoint. Then switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"System service installed - Remote Support Agent"

   One finding matches.

   .. thumbnail:: /images/compliance/iso-27001/system-service-installed-finding.png
      :title: Threat Hunting finding for the new service
      :alt: Threat Hunting finding for the new service
      :align: center
      :width: 80%

#. Expand the finding. The ``service.name`` and ``process.executable`` fields describe the new service, and ``event.code`` shows the Windows event ID.

   .. thumbnail:: /images/compliance/iso-27001/system-service-finding-details.png
      :title: System service installed finding details
      :alt: System service installed finding details
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.iso_27001`` field. The finding maps to A.8.19 Installation of software on operational systems, among other controls.

   .. thumbnail:: /images/compliance/iso-27001/system-service-compliance-field.png
      :title: ISO 27001 controls of the System service installed finding
      :alt: ISO 27001 controls of the System service installed finding
      :align: center
      :width: 80%

#. Open the menu (**☰**) and go to **Security operations** > **IT Hygiene**. Click **Explore agent**, select the Windows endpoint, and switch to the **Services** tab. Turn on **Advanced filters** and enter the following query:

   .. code-block:: none

      service.name:"Remote Support Agent"

   The **Remote Support Agent** service appears in the services inventory of the Windows endpoint.

   .. thumbnail:: /images/compliance/iso-27001/it-hygiene-services-inventory.png
      :title: IT Hygiene Services tab
      :alt: IT Hygiene Services tab
      :align: center
      :width: 80%

After you finish this use case, delete the test service on the Windows endpoint:

.. code-block:: ps1con

   > sc.exe delete RemoteSupportAgent

A.8.20 Networks security
------------------------

Control A.8.20 requires the organization to secure, manage, and control networks and network devices to protect the information in systems and applications.

A host firewall controls the network traffic reaching each endpoint, limiting the services an attacker can reach.

Wazuh helps meet the A.8.20 control with the Security Configuration Assessment (SCA) module. It scans monitored endpoints against policies based on the Center for Internet Security (CIS) benchmarks and reports each failed check.

Use case: Enabling the host firewall on an Ubuntu endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to find and fix the failed CIS check 35622, **Ensure ufw service is enabled.**, on an Ubuntu 24.04 endpoint.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**) and go to **Endpoint security** > **Configuration Assessment**.

#. Click **Explore agent**, select the Ubuntu endpoint, and switch to the **Inventory** tab.

#. In **Check**, search for and select **Ensure ufw service is enabled.** The ``check.result`` column shows **Failed** while UFW is inactive.

   .. thumbnail:: /images/compliance/iso-27001/sca-ufw-check-failed.png
      :title: Failed Ensure ufw service is enabled check
      :alt: Failed Ensure ufw service is enabled check
      :align: center
      :width: 80%

#. Click the inspect icon of the check to open its details. The ``check.compliance.iso_27001`` field shows A.8.20, A.8.21, and A.8.15.

   .. thumbnail:: /images/compliance/iso-27001/sca-ufw-check-details.png
      :title: Ensure ufw service is enabled check details
      :alt: Ensure ufw service is enabled check details
      :align: center
      :width: 80%

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Run the following commands on the Ubuntu endpoint to allow SSH connections and enable UFW. Allow SSH before you enable UFW, or enabling UFW can close your SSH session:

   .. code-block:: console

      $ sudo ufw allow 22/tcp
      $ sudo systemctl unmask ufw.service
      $ sudo systemctl --now enable ufw.service
      $ sudo ufw --force enable

#. Restart the Wazuh agent to run a new SCA scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
~~~~~~~~~~~~~~~

#. In **Configuration Assessment**, switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"Wazuh SCA check passed - Ensure ufw service is enabled."

   The finding shows that check 35622 now passes.

   .. thumbnail:: /images/compliance/iso-27001/sca-ufw-check-passed.png
      :title: Passed Ensure ufw service is enabled check
      :alt: Passed Ensure ufw service is enabled check
      :align: center
      :width: 80%
