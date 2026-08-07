.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module runs on the Wazuh agent, monitoring files and directories using scheduled scans or real-time monitoring. Learn more about how FIM works in this section.

How it works
============

The Wazuh File Integrity Monitoring (FIM) module runs on the Wazuh agent, enabled and preconfigured by default. It monitors files and directories using scheduled scans or real-time monitoring, detecting changes at fixed intervals or the moment they occur. Although the default configuration provides basic monitoring, review and customize it to meet your environment's requirements.

The FIM module stores checksums and other attributes of monitored files in a dedicated database on the monitored endpoint. During scans, it compares the current file checksums and attributes with the previously stored values to identify additions, modifications, and deletions. When changes are detected, the Wazuh agent reports them to the Wazuh manager, where they are processed and forwarded to the Wazuh indexer. If an event matches a detection rule, Wazuh generates a security finding.

The FIM module maintains dedicated databases on both the monitored endpoint and the Wazuh manager. The Wazuh agent uses a local SQLite database to store the current state of monitored files. The Wazuh agent FIM database is located at:

-  ``C:\Program Files (x86)\ossec-agent\queue\fim\db`` on Windows.
-  ``/var/ossec/queue/fim/db`` on Linux.
-  ``/Library/Ossec/queue/fim/db`` on macOS.

.. thumbnail:: ../../../images/manual/fim/fim-flow.png
  :title: FIM how it works
  :alt: FIM how it works
  :align: center
  :width: 80%

The Wazuh manager keeps a synchronized copy of each agent's FIM database. The ``wazuh-db`` daemon manages a separate database per registered agent, identified by agent ID and stored in ``/var/wazuh-manager/queue/db``. During synchronization, the Wazuh agent sends updated file metadata, such as checksums and file attribute changes, to its corresponding database on the Wazuh manager. This synchronization ensures that FIM-related queries to the Wazuh manager API return accurate and up-to-date information.

The Wazuh manager processes the FIM events it receives from the Wazuh agents using the Wazuh normalization engine. The normalization engine converts the events into JSON documents that conform to the Wazuh Common Schema (WCS). The indexer connector component on the Wazuh manager then securely forwards the normalized events to the Wazuh indexer for indexing, storage, and threat detection.

On Windows, the FIM module monitors only files and directories located on local file systems. UNC network paths (for example, ``\\server\share\folder``) and mapped drives (for example, ``Z:\folder``) are not supported. Any such paths configured for monitoring are ignored and do not generate FIM events. This restriction helps mitigate security risks such as NetNTLMv2 hash theft and remote code execution that can arise when accessing files over network shares through NTLM authentication.

