.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh FIM module tracks the activities performed within monitored directories or files to gain extensive information on file creation, modification, and deletion. Learn more in this use case.
    
File integrity monitoring
=========================

**File Integrity Monitoring** (FIM) involves monitoring the integrity of files and directories to detect and alert when there are file addition, modification, or deletion events. FIM provides an important layer of protection for sensitive files and data by routinely scanning and verifying the integrity of those assets. It identifies file changes that could be indicative of a cyberattack and generates alerts for further investigation and remediation if necessary.

The Wazuh open source :doc:`File Integrity Monitoring </user-manual/capabilities/file-integrity/index>` module tracks the activities performed within monitored directories or files to gain extensive information on file creation, modification, and deletion. When a file is changed, Wazuh compares its checksum against a pre-computed baseline and triggers an alert if it finds a mismatch.

The open source FIM module performs real-time monitoring and scheduled scans depending on the level of sensitivity of the monitored files.

Viewing File Integrity Monitoring scan results
----------------------------------------------

You can find a dedicated **File Integrity Monitoring** module in the Wazuh dashboard where all file integrity events triggered from monitored endpoints are reported. This increases visibility as it provides valuable information on the status of monitored directories and their potential impact on the security posture. The :doc:`Wazuh FIM dashboard </user-manual/capabilities/file-integrity/interpreting-fim-module-analysis>` has three different sections to view FIM analysis results; **Inventory, Dashboard, and Events**.

#. The **Inventory** section displays a list of all files that the FIM module has indexed. Each file has entry information including the filename, last modification date, user, user ID, group, and file size.

   .. thumbnail:: /images/getting-started/use-cases/fim/fim-module-inventory.png
      :title: File Integrity Monitoring module inventory
      :alt: File Integrity Monitoring module inventory
      :align: center
      :width: 80%

#. The **Dashboard** section shows an overview of the events triggered by the FIM module for all monitored endpoints. You can also streamline it to show the events for a selected monitored endpoint.

   .. thumbnail:: /images/getting-started/use-cases/fim/fim-dashboard.png
      :title: File Integrity Monitoring dashboard
      :alt: File Integrity Monitoring dashboard
      :align: center
      :width: 80%

#. The **Events** section shows the alerts triggered by the FIM module. It displays details such as the agent name, the file path of the monitored file, the type of FIM event, a description of the alert, and the rule level of each alert.

   .. thumbnail:: /images/getting-started/use-cases/fim/fim-alerts.png
      :title: File Integrity Monitoring module alerts
      :alt: File Integrity Monitoring module alerts
      :align: center
      :width: 80%

Below are common use cases the Wazuh FIM module would assist you in monitoring within your environment.

Monitoring file integrity
-------------------------

Modifications to configuration files and file attributes are frequent occurrences within endpoints in an IT infrastructure. However, if not validated, there may be unauthorized and inadvertent changes that could affect the behavior of the endpoints or the applications running in them. The Wazuh FIM module runs periodic scans on specific files and directories to detect  file changes in real time. It scans the designated files to create a baseline of the current state. It checks for file modifications by comparing checksums and attribute values to the baseline, generating alerts if discrepancies are found.

The Wazuh FIM module supports various configuration options that enable effective monitoring of assets:

-  :ref:`Real-time monitoring <real_time_monitoring>`: The FIM module provides a ``realtime`` attribute that enables continuous monitoring of specified directories. This feature is particularly useful for monitoring critical directories and tracking changes immediately after they occur. Wazuh allows you to specify the directories or files in the monitored endpoints that would be reported in real-time if file changes occur.
-  :ref:`Scheduled monitoring <scheduled_scans>`: The ``frequency`` option in the Wazuh FIM module allows users to customize the scheduling of each FIM scan performed in your monitored endpoints. The default scan interval for the FIM module is 12 hours (43200 seconds) and can be customized on each endpoint. Alternatively, scans can be scheduled using the :ref:`scan_time <reference_ossec_syscheck_scan_time>` and the :ref:`scan_day <reference_ossec_syscheck_scan_day>` options. These options help users to set up FIM scans outside business hours or during holidays. 
-  :ref:`Who-data monitoring <who-data-monitoring>`: Wazuh captures advanced insights into file changes using the who-data functionality. This functionality uses audit tools like the Linux Audit subsystem and Microsoft Windows SACL to determine important information about the detected file changes. The who-data monitoring functionality allows the FIM module to obtain information on when the change event occurred, who or what made the change, and what content was changed. This is useful in maintaining accountability and validating if changes made to monitored files or directories were authorized and performed using approved processes.

   Below is an example of an alert generated when a monitored file is changed on a Windows endpoint.

   .. thumbnail:: /images/getting-started/use-cases/fim/fim-modified-file-alert.png
      :title: File Integrity Monitoring modified file alert
      :alt: File Integrity Monitoring modified file alert
      :align: center
      :width: 80%

   In alert fields, the *who-data* metadata shows that the user ``wazuh`` added the word ``Hello`` to the ``audit_docu.txt`` file using the ``Notepad.exe`` process.

   .. thumbnail:: /images/getting-started/use-cases/fim/fim-modified-file-alert-details.png
      :title: FIM modified file alert details
      :alt: FIM modified file alert details
      :align: center
      :width: 80%

-  :ref:`Reporting changes in file values <report_changes_in_file_values>`: The FIM module provides a ``report_changes`` attribute that records and reports the exact content changed in a text file to the Wazuh server. The attribute enables the Wazuh agent to make copies of monitored files to a private location on each endpoint for further review.  This monitoring option is helpful when users want to initiate specific responses when file changes in monitored directories match the behavior of known malicious activities. For example, the alert below indicates when Wazuh detects the creation of a web shell scripting file ``webshell-script.php`` in a monitored directory.

   .. thumbnail:: /images/getting-started/use-cases/fim/web-shell-scripting-alert.png
      :title: Web shell scripting file creation alert
      :alt: Web shell scripting file creation alert
      :align: center
      :width: 80%

-  :ref:`Recording file attributes <record_file_attributes>`: Users can configure the FIM module to record specific attributes of a monitored file. Wazuh supports various file attributes that users can use to specify the file metadata that the FIM module will record or ignore. For example, this monitoring option would be useful when users want to record only the SHA-256 hash of a configuration file, excluding other hash types.

Detecting and responding to malware
-----------------------------------

The Wazuh FIM module integrates with other Wazuh capabilities and third-party threat intelligence solutions to create a comprehensive security monitoring environment. This is imperative to enhance malware detection and response capabilities, ensuring robust defense against cyber threats.

The Wazuh FIM module supports various integrations, including but not limited to:

-  **File integrity monitoring and YARA**: By combining the Wazuh FIM module and the YARA tool, it is possible to detect malware when suspicious file additions or modifications are identified. The YARA rule files contain samples of malware indicators that are downloaded to the monitored endpoints. When the FIM module detects a change in the monitored file or directory, it executes a YARA scan using a script to determine if it is malware. If the YARA rule finds a match with a file, it will send the scan results to the Wazuh server for decoding and alerting. This would be reported according to the custom rule and decoder configurations configured on the Wazuh server. Check this documentation for more information on :doc:`how to integrate the Wazuh FIM module with YARA </user-manual/capabilities/malware-detection/fim-yara>`.
-  **File integrity monitoring and active response**: The :doc:`Wazuh active response </user-manual/capabilities/active-response/index>` module automatically responds to threats identified in a timely manner. This combination enables the FIM module to not only detect but also respond to malicious activities. You can configure active response scripts to execute when the FIM module detects file changes in your monitored environment.  Additionally, it also generates alerts for the response performed. This reduces the Mean Time To Respond (MTTR) as malicious changes detected are remediated in a timely manner.

-  **File integrity monitoring and CDB list**: Wazuh FIM module also detects malicious files by checking the presence of known malware signatures when combined with :doc:`CDB lists (constant database) </user-manual/capabilities/malware-detection/cdb-lists-threat-intelligence>`. CDB lists are used to store known malware indicators of Compromise (IOCs) such as file hashes, IP addresses, and domain names. When CDB lists are created, Wazuh checks if field values from FIM alerts such as file hash match the keys stored in the CDB lists. If matched, it generates an alert and response based on how you configure your custom rule.

   .. thumbnail:: /images/getting-started/use-cases/fim/malware-hash-file-alerts.png
      :title: File with known malware hash detected and removed alerts
      :alt: File with known malware hash detected and removed alerts
      :align: center
      :width: 80%

Monitoring Windows Registry
---------------------------

The Wazuh FIM module periodically scans Windows Registry entries, stores its checksums and attributes in a local database, and alerts when changes in registry values are detected. This would keep users informed about registry modifications resulting from user activities or software installations whether malicious or not.

You can configure the Wazuh open source FIM module to monitor :doc:`Windows Registry values </user-manual/capabilities/file-integrity/windows-registry-monitoring>` using various configuration options. The ``report_changes`` attribute in the :ref:`windows_registry <reference_ossec_syscheck_windows_registry>` option provides a granular breakdown of modification detected in the monitored Windows Registry value. You can configure which Windows Registry attributes the module would record or ignore. For example, you can choose to record the ``check_sha1sum`` attribute and ignore the ``check_md5sum`` attribute, if your CDB list only contains SHA1 hashes of malicious files.

The image below shows the event of a modified Windows registry value in a monitored endpoint.

.. thumbnail:: /images/getting-started/use-cases/fim/fim-modified-registry-key-alert.png
   :title: FIM modified registry key alert
   :alt: FIM modified registry key alert
   :align: center
   :width: 80%

The alert when expanded shows the modified field.

.. thumbnail:: /images/getting-started/use-cases/fim/fim-modified-registry-key-alert-details.png
   :title: FIM modified registry key alert details
   :alt: FIM modified registry key alert details
   :align: center
   :width: 80%

Threat actors maintain persistence by commonly adding programs for their malicious activities to the *Run* and *RunOnce* keys in the Registry. Additionally, Wazuh detects any suspicious programs added to the startup registry keys. This allows you to take appropriate action to remove them before they cause harm to your system.

.. thumbnail:: /images/getting-started/use-cases/fim/fim-registry-value-added-alerts.png
   :title: FIM registry value added alert
   :alt: FIM registry value added alert
   :align: center
   :width: 80%

Meeting regulatory compliance
-----------------------------

Meeting regulatory compliance requirements is an important consideration for organizations in various industries. File integrity monitoring is a requirement for achieving compliance with regulations such as PCI DSS, SOX, HIPAA, NIST SP 800-53, among others.

You can customize the Wazuh FIM module to monitor specific files and directories where your organization’s sensitive and confidential data are stored. Wazuh provides a comprehensive report that outlines the changes made to the files and directories being monitored. This feature is particularly useful for ensuring compliance with various regulatory standards.

For example, organizations can meet the :ref:`CM-3 Configuration change control <detecting_change-actors_to_ufw_firewall_rules_using_who-data>` requirement in NIST SP 800-53 standard by using Wazuh. The control requires organizations to protect information at rest and monitor configuration changes in their infrastructure. The image below shows an event generated when the permissions for Uncomplicated Firewall (UFW) rule files are modified on a monitored endpoint.

.. thumbnail:: /images/getting-started/use-cases/fim/ufw-user-rules-modification-alert.png
   :title: UFW user rules file modification alert
   :alt: UFW user rules file modification alert
   :align: center
   :width: 80%
