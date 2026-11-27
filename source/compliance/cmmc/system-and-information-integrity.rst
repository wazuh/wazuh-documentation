.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps meet the CMMC System and Information Integrity (SI) requirements, with use cases for malware detection, threat intelligence feeds, and kernel module loading.

System and Information Integrity (SI)
=====================================

SI.L1-3.14.2 Malicious Code Protection
--------------------------------------

SI.L1-3.14.2 requires you to provide protection from malicious code at designated locations within your systems. It is a Level 1 practice, so it applies to every contractor that handles FCI.

Wazuh helps meet SI.L1-3.14.2 by turning antivirus engine detections, such as ClamAV, into findings. The ClamAV finding doesn't map to a CMMC practice by default. To count it on the CMMC dashboard, create a custom rule that maps to SI.L1-3.14.2, as described in :doc:`Wazuh CMMC dashboard <wazuh-cmmc-dashboard>`.

Use case: Detecting malware with ClamAV
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh generates findings from the detections of ClamAV, an open source antivirus engine, on an Ubuntu 24.04 endpoint. ClamAV scans a file of the ``clamav-testfiles`` package. The ClamAV project provides these harmless files to test detection.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Ruleset management** > **Overview**, and select the **Standard** space. Search for ``clamav`` in the **Integrations** table and click the integration title. Then click **Actions** and select **Enable**. The ``clamav`` integration decodes the ClamAV logs, and it's disabled by default.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Install ClamAV and its test files on the Ubuntu 24.04 endpoint:

   .. code-block:: console

      $ sudo apt-get update
      $ sudo apt-get install -y clamav clamav-daemon clamav-testfiles

   On a new installation, wait until ``freshclam`` downloads the signature databases. The ClamAV daemon doesn't start without them. To check, run ``ls /var/lib/clamav``. The download is done when the output lists the main, daily, and bytecode database files.

#. Edit the ``/etc/clamav/clamd.conf`` file and set ``LogSyslog`` to ``true``, so that the ClamAV daemon writes its detections to the system journal. The Wazuh agent reads the system journal by default.

   .. code-block:: none

      LogSyslog true

#. Restart the ClamAV daemon to apply the change:

   .. code-block:: console

      $ sudo systemctl restart clamav-daemon

#. Scan a test file:

   .. code-block:: console

      $ sudo clamdscan --fdpass /usr/share/clamav-testfiles/clam.exe

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      /usr/share/clamav-testfiles/clam.exe: Clamav.Test.File-6 FOUND

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      wazuh.integration.name:clamav and wazuh.rule.title:"Malware file detected - /usr/share/clamav-testfiles/clam.exe"

   .. thumbnail:: /images/compliance/cmmc/clamav-finding.png
      :title: ClamAV finding
      :alt: ClamAV finding
      :align: center
      :width: 80%

#. Expand the finding. The ``event.original`` field shows the ClamAV detection, and the ``file.path`` field shows the detected file.

   .. thumbnail:: /images/compliance/cmmc/clamav-finding-details.png
      :title: Details of the ClamAV finding
      :alt: Details of the ClamAV finding
      :align: center
      :width: 80%

SI.L2-3.14.3 Security Alerts & Advisories
-----------------------------------------

SI.L2-3.14.3 requires you to monitor system security alerts and advisories and take action in response.

Wazuh helps meet SI.L2-3.14.3 with Wazuh CTI. The CTI Feed page shows the sync state of each feed, and the CTI Explorer shows the details of each indicator of compromise (IOC) and vulnerability record.

Use case: Confirming that threat intelligence feeds are up to date
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to check that the feeds of Wazuh CTI are current. The feeds deliver the rules, IOCs, and vulnerability records that Wazuh uses for detection.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **CTI Feed**.

#. In **Feed sync**, check that each feed shows **Up to date**. The feeds are the **Ruleset**, the **Indicators of compromise**, and the **Vulnerabilities**. Click **Check for updates** to sync the feeds now.

   .. thumbnail:: /images/compliance/cmmc/cti-feed-sync.png
      :title: Feed sync of Wazuh CTI
      :alt: Feed sync of Wazuh CTI
      :align: center
      :width: 80%

#. Scroll down to **Feed content** to see how many rules, decoders, integrations, key-value databases (KVDBs), IOCs, and CVE records the feed delivered to your environment.

   .. thumbnail:: /images/compliance/cmmc/cti-feed-content.png
      :title: Feed content of Wazuh CTI
      :alt: Feed content of Wazuh CTI
      :align: center
      :width: 80%

Use case: Assessing a vulnerability advisory with Wazuh CTI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to look up a CVE in the CTI Explorer when you receive a new advisory.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **CTI Explorer**.

#. Enter a CVE identifier in the search bar and click **Check**. For example, enter ``CVE-2026-76312``. The result shows the CVSS score, the publication date, and the assigner of the record.

   .. thumbnail:: /images/compliance/cmmc/cti-explorer-search.png
      :title: CVE search in the CTI Explorer
      :alt: CVE search in the CTI Explorer
      :align: center
      :width: 80%

#. Click **Open the record**. The details include the description, the affected products, the scores, and the references of the vulnerability. Click **Vulnerability Detection** in the record to see which of your endpoints the CVE affects.

   .. thumbnail:: /images/compliance/cmmc/cti-explorer-record.png
      :title: CVE record in the CTI Explorer
      :alt: CVE record in the CTI Explorer
      :align: center
      :width: 80%

SI.L2-3.14.7 Identify Unauthorized Use
--------------------------------------

SI.L2-3.14.7 requires you to identify unauthorized use of your systems.

Unauthorized use includes actions such as loading kernel modules, which rootkits use to hide their activity.

Wazuh helps meet SI.L2-3.14.7 with detection rules that analyze the process events of your endpoints.

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

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"Linux kernel module loaded via insmod/modprobe - modprobe dummy"

   .. thumbnail:: /images/compliance/cmmc/kernel-module-finding.png
      :title: Kernel module loading finding
      :alt: Kernel module loading finding
      :align: center
      :width: 80%

#. Expand the finding. The ``process.command_line`` field shows the ``modprobe dummy`` command, and the ``process.parent.name`` field shows that the command ran with ``sudo``.

   .. thumbnail:: /images/compliance/cmmc/kernel-module-finding-details.png
      :title: Details of the kernel module loading finding
      :alt: Details of the kernel module loading finding
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.cmmc`` field. The finding maps to AU.L2-3.3.1, CM.L2-3.4.1, SI.L2-3.14.1, and SI.L2-3.14.7.

   .. thumbnail:: /images/compliance/cmmc/kernel-module-finding-cmmc.png
      :title: CMMC requirements of the kernel module loading finding
      :alt: CMMC requirements of the kernel module loading finding
      :align: center
      :width: 80%

After you finish this use case, unload the dummy kernel module and remove Sysmon for Linux from the Ubuntu endpoint:

.. code-block:: console

   $ sudo modprobe -r dummy
   $ sudo sysmon -u
   $ sudo apt-get remove -y sysmonforlinux
