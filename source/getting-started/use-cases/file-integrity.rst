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

You can find a dedicated **Integrity monitoring** module in the Wazuh dashboard where all file integrity events triggered from monitored endpoints are reported. This increases visibility as it provides valuable information on the status of monitored directories and their potential impact on the security posture. The :doc:`Wazuh FIM dashboard </user-manual/capabilities/file-integrity/interpreting-fim-module-analysis>` has three different sections to view FIM analysis results; **Inventory, Dashboard, and Events**.

#. The **Inventory** section displays a list of all files that the FIM module has indexed. Each file has entry information including the filename, last modification date, user, user ID, group, and file size.

   .. thumbnail:: /images/getting-started/use-cases/fim/integrity-monitoring-module-inventory.png
      :title: Integrity monitoring module inventory
      :alt: Integrity monitoring module inventory
      :align: center
      :width: 80%

#. The **Dashboard** section shows an overview of the events triggered by the FIM module for all monitored endpoints. You can also streamline it to show the events for a selected monitored endpoint.

   .. thumbnail:: /images/getting-started/use-cases/fim/integrity-monitoring-dashboard.png
      :title: Integrity monitoring dashboard
      :alt: Integrity monitoring dashboard
      :align: center
      :width: 80%

#.