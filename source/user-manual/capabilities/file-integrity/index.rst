.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh File integrity monitoring (FIM) is a key capability of our platform. Learn how you can capitalize on this feature to protect your system.

.. _manual_file_integrity:

File integrity monitoring
=========================

File Integrity Monitoring (FIM) is a security process used to monitor the integrity of system and application files. FIM is an important security defense layer for any organization monitoring sensitive assets. It provides protection for sensitive data, application, and device files by monitoring, routinely scanning, and verifying their integrity. It helps organizations detect changes to critical files on their systems which reduces the risk of data being stolen or compromised. This process can save time and money in lost productivity, lost revenue, reputation damage, and legal and regulatory compliance penalties.

Wazuh has a built-in capability for file integrity monitoring. The Wazuh FIM module monitors files and directories and triggers an alert when a user or process creates, modifies, and deletes monitored files. It runs a baseline scan, storing the cryptographic checksum and other attributes of the monitored files. When a user or process changes a file, the module compares its checksum and attributes to the baseline. It triggers an alert if it finds a mismatch. The FIM module performs real-time and scheduled scans depending on the FIM configuration for agents and manager. 

Some benefits of the Wazuh FIM capability include change management, threat detection and response, and regulatory compliance as follows.  

Change management
-----------------

The Wazuh FIM capability is an essential tool for verifying that the change management processes are working correctly. This Wazuh capability allows you to examine files to see if they change, how and when they change, and who or what changes them. The Wazuh FIM module compares the baseline information against the information of latest version of the file. This comparison provides visibility into alterations and updates of critical files. For example, you can use this to detect incorrect updates to applications or unauthorized changes made to configuration files.

Threat detection and response
-----------------------------

You can combine FIM with other Wazuh capabilities for threat detection and response. The FIM capability monitors file integrity, detects permission changes, and monitors user and file activities. It provides detailed alerts for quick responses to detected threats.

Regulatory compliance
---------------------

The FIM capability helps organizations meet regulatory requirements for data security, privacy, and data retention. Monitoring critical files for changes is an important requirement for regulations such as PCI DSS, HIPAA, and GDPR. 

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        how-to-configure-fim
        interpreting-fim-module-analysis
        basic-settings
        fim-fields-rule-mapping
        fim-configuration
