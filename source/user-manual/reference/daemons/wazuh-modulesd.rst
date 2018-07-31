.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh-modulesd:

wazuh-modulesd
==============

The wazuh-modulesd program manages the Wazuh modules described below.

.. topic:: Database wodle

  The Wazuh core uses list-based databases to store information related to agent keys, and FIM/Rootcheck event data. This information is highly optimized to be handled by the core.

  In order to provide well-structured data that can be accessed by the user or the Wazuh API, new **SQLite-based databases** have been introduced in the Wazuh manager. The Database Synchronization Module is a **user-transparent component** that collects the following information from the core:

    - Agent information: name, address, encryption key, last connection time, operating system, version and shared configuration hash.
    - FIM data: creation, modification and deletion of regular files and Windows registry entries.
    - Rootcheck detected defects: issue message, first detection date and last alert time.
    - Static core settings: maximum permitted agents or SSL being enabled for Authd.

.. topic:: OpenSCAP wodle

  The OpenSCAP module integrates a SCAP scanner into the Wazuh agents providing security compliance under OpenSCAP policies as well as vulnerability assessments, identification and classification of vulnerabilities.

  The complete documentation on this wodle can be found in the :doc:`OpenSCAP integration <../../capabilities/policy-monitoring/openscap/index>` section.

.. topic:: CIS-CAT wodle

  The CIS-CAT wodle allows you to run CIS policy scans visualizing the results of assessments in the Wazuh App. See the :doc:`CIS-CAT integration <../../capabilities/policy-monitoring/ciscat/ciscat>` for more information on this functionality.

.. topic:: Command wodle

  The Command module allows running external commands asynchronously, one in each thread.

.. topic:: Syscollector wodle

  The Syscollector module performs periodic scans in the system to obtain information related to the installed hardware, operating system information, network information, installed packages, active ports, and running processes.

.. topic:: AWS Cloudtrail wodle

  The AWS Cloudtrail module adds a native way for ingesting AWS CloudTrail logs.
  Logs are fetched in JSON format from the bucket and they are sent to Wazuh socket.

.. topic:: Vulnerability detector wodle

  The Vulnerability Detector module detects applications that are known to be vulnerable (affected by a CVE).

wazuh-modulesd options
----------------------

+--------+---------------------------+
| **-d** | Increase debug mode.      |
+--------+---------------------------+
| **-f** | Run in the foreground.    |
+--------+---------------------------+
| **-h** | Display the help message. |
+--------+---------------------------+
| **-t** | Test configuration.       |
+--------+---------------------------+
