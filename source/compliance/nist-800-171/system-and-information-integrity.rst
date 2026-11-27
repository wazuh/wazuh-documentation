.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet the NIST SP 800-171 System and Information Integrity requirements 3.14.2, 3.14.3, and 3.14.7 with step-by-step use cases.

System and Information Integrity (3.14)
=======================================

3.14.2 Provide protection from malicious code
---------------------------------------------

Requirement 3.14.2 states, "Provide protection from malicious code at designated locations within organizational systems."

Wazuh helps meet requirement 3.14.2 by turning the detections of antivirus engines, such as ClamAV, into findings. The ClamAV finding doesn't map to a NIST 800-171 requirement by default. To count it on the NIST 800-171 dashboard, create a custom rule that maps to 3.14.2, as described in :doc:`dashboard`.

Use case: Detecting malware with ClamAV
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh generates findings from the detections of ClamAV, an open source antivirus engine, on an Ubuntu 24.04 endpoint. ClamAV scans a file of the ``clamav-testfiles`` package. The ClamAV project provides these harmless files to test detection.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. The ``clamav`` integration decodes the ClamAV logs, and it's disabled by default. To enable it, open the menu (☰) and go to **Ruleset management** > **Overview**, and select the **Standard** space. Search for ``clamav`` in the **Integrations** table and click the integration title. Then click **Actions** and select **Enable**.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Install ClamAV and its test files on the Ubuntu 24.04 endpoint:

   .. code-block:: console

      $ sudo apt-get update
      $ sudo apt-get install -y clamav clamav-daemon clamav-testfiles

   On a new installation, wait until ``freshclam`` downloads the signature databases. The ClamAV daemon doesn't start without them. To check, run ``ls /var/lib/clamav``. The download is done when the output lists the main, daily, and bytecode database files.

#. Edit the ``/etc/clamav/clamd.conf`` file and set ``LogSyslog`` to ``true``, so that the ClamAV daemon writes its detections to the system journal. The Wazuh agent reads the system journal by default.

   .. code-block:: ini

      LogSyslog true

#. Restart the ClamAV daemon to apply the change:

   .. code-block:: console

      $ sudo systemctl restart clamav-daemon

#. Scan a test file:

   .. code-block:: console

      $ sudo clamdscan --fdpass /usr/share/clamav-testfiles/clam.exe

   The output is similar to the following:

   .. code-block:: none
      :class: output

      /usr/share/clamav-testfiles/clam.exe: Clamav.Test.File-6 FOUND

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      wazuh.integration.name:clamav and wazuh.rule.title:"Malware file detected - /usr/share/clamav-testfiles/clam.exe"

   .. thumbnail:: /images/compliance/nist-800-171/clamav-malware-finding.png
      :title: ClamAV malware finding
      :alt: ClamAV malware finding
      :align: center
      :width: 80%

#. Expand the finding. The ``event.original`` field shows the ClamAV detection, and the ``file.path`` field shows the detected file.

   .. thumbnail:: /images/compliance/nist-800-171/clamav-malware-finding-details.png
      :title: Details of the ClamAV malware finding
      :alt: Details of the ClamAV malware finding
      :align: center
      :width: 80%

3.14.3 Monitor security alerts and advisories
---------------------------------------------

Requirement 3.14.3 states, "Monitor system security alerts and advisories and take action in response."

Wazuh helps meet requirement 3.14.3 with Wazuh Cyber Threat Intelligence (CTI). The CTI Feed page shows the sync state of each feed, and the CTI Explorer shows the details of each indicator of compromise (IOC) and vulnerability record.

Use case: Confirming that threat intelligence feeds are up to date
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to check that the Wazuh CTI feeds are current.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **CTI Feed**.

#. In **Feed sync**, check that each feed shows **Up to date**. Click **Check for updates** to sync the feeds now.

   .. thumbnail:: /images/compliance/nist-800-171/cti-feed-sync.png
      :title: CTI feed sync state
      :alt: CTI feed sync state
      :align: center
      :width: 80%

#. Scroll down to **Feed content** to see how many rules, decoders, integrations, KVDBs, IOCs, and CVE records the feed delivered to your environment.

   .. thumbnail:: /images/compliance/nist-800-171/cti-feed-content.png
      :title: CTI feed content
      :alt: CTI feed content
      :align: center
      :width: 80%

Use case: Assessing a vulnerability advisory with Wazuh CTI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to look up a CVE in the CTI Explorer when you receive a new advisory.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **CTI Explorer**.

#. Enter a CVE identifier in the search bar and click **Check**. For example, enter ``CVE-2026-76312``. The result shows the CVSS score, the publication date, and the assigner of the record.

   .. thumbnail:: /images/compliance/nist-800-171/cti-explorer-cve-search.png
      :title: CTI Explorer CVE search
      :alt: CTI Explorer CVE search
      :align: center
      :width: 80%

#. Click **Open the record**. The details include the description, the affected products, the scores, and the references of the vulnerability. Click **Vulnerability Detection** in the record to see which of your endpoints the CVE affects.

   .. thumbnail:: /images/compliance/nist-800-171/cti-explorer-cve-record.png
      :title: CVE record in the CTI Explorer
      :alt: CVE record in the CTI Explorer
      :align: center
      :width: 80%

3.14.7 Identify unauthorized use of organizational systems
----------------------------------------------------------

Requirement 3.14.7 states, "Identify unauthorized use of organizational systems."

Unauthorized use includes actions such as loading kernel modules, which rootkits use to hide their activity.

Wazuh helps meet requirement 3.14.7 with detection rules that analyze the process events of your endpoints.

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

   .. thumbnail:: /images/compliance/nist-800-171/kernel-module-finding.png
      :title: Kernel module loading finding
      :alt: Kernel module loading finding
      :align: center
      :width: 80%

#. Expand the finding. The ``process.command_line`` field shows the ``modprobe dummy`` command, and the ``process.parent.name`` field shows that the command ran with ``sudo``.

   .. thumbnail:: /images/compliance/nist-800-171/kernel-module-finding-details.png
      :title: Details of the kernel module loading finding
      :alt: Details of the kernel module loading finding
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.nist_800_171`` field. The finding maps to 3.3.1, 3.4.1, 3.14.1, and 3.14.7.

   .. thumbnail:: /images/compliance/nist-800-171/kernel-module-nist-800-171-mapping.png
      :title: NIST 800-171 mapping of the kernel module loading finding
      :alt: NIST 800-171 mapping of the kernel module loading finding
      :align: center
      :width: 80%

After you finish this use case, unload the dummy kernel module and remove Sysmon for Linux from the Ubuntu endpoint:

.. code-block:: console

   $ sudo modprobe -r dummy
   $ sudo sysmon -u
   $ sudo apt-get remove -y sysmonforlinux
