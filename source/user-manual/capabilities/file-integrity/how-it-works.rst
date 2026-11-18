.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module runs on the Wazuh agent, monitoring files and directories using scheduled scans or real-time monitoring. Learn more about how FIM works in this section.

How it works
============

The Wazuh File Integrity Monitoring (FIM) module runs on the Wazuh agent, enabled and preconfigured by default. It monitors files and directories using scheduled scans or real-time monitoring, detecting changes at fixed intervals or the moment they occur. Although the default configuration provides basic monitoring, review and customize it to meet your environment's requirements.

The FIM module stores checksums and other attributes of monitored files in a dedicated database on the monitored endpoint. During scans, it compares the current file checksums and attributes with the previously stored values to identify additions, modifications, and deletions. When changes are detected, the Wazuh agent reports them to the Wazuh manager, where they are processed and forwarded to the Wazuh indexer. If an event matches a detection rule, Wazuh generates a security finding.

The detection rules for FIM events belong to the ``wazuh-fim`` integration, which is enabled by default. Wazuh generates FIM findings only while this integration is enabled. To check it, go to **Ruleset management** → **Overview** on the Wazuh dashboard and search for ``wazuh-fim``.

When the Wazuh agent starts, the FIM module runs a full scan of the monitored files to record their baseline. FIM reports changes once this scan ends, and the Wazuh agent logs this message:

.. code-block:: none
   :class: output

   (6009): File integrity monitoring scan ended.

Changes made to monitored files before this message appears become part of the baseline. Real-time and who-data monitoring start when the scan ends. On Windows, the Wazuh agent logs ``(6019): File integrity monitoring real-time Whodata engine started.`` when the who-data engine starts. The Wazuh agent log file is ``C:\Program Files (x86)\ossec-agent\ossec.log`` on Windows, ``/var/ossec/logs/ossec.log`` on Linux, and ``/Library/Ossec/logs/ossec.log`` on macOS.

Some text editors write temporary swap or backup files next to the file you edit. When you edit a file in a monitored directory with one of these editors, FIM also reports the creation and deletion of these temporary files.

The Wazuh agent uses a local SQLite database to store the current state of monitored files. The Wazuh agent FIM database is located at:

-  ``C:\Program Files (x86)\ossec-agent\queue\fim\db`` on Windows.
-  ``/var/ossec/queue/fim/db`` on Linux.
-  ``/Library/Ossec/queue/fim/db`` on macOS.

.. thumbnail:: ../../../images/manual/fim/fim-flow.png
  :title: FIM how it works
  :alt: FIM how it works
  :align: center
  :width: 80%

The Wazuh agent also synchronizes the current state of the monitored files with the Wazuh manager, which stores it in the ``wazuh-states-fim-files`` index of the Wazuh indexer. The **Inventory** tab of the **File Integrity Monitoring** module on the Wazuh dashboard shows this state.

The Wazuh manager processes the FIM events it receives from the Wazuh agents using the Wazuh normalization engine. The normalization engine converts the events into JSON documents that conform to the Wazuh Common Schema (WCS). The indexer connector component on the Wazuh manager then securely forwards the normalized events to the Wazuh indexer for indexing, storage, and threat detection.

On Windows, the FIM module monitors only files and directories located on local file systems. UNC network paths (for example, ``\\server\share\folder``) and mapped drives (for example, ``Z:\folder``) are not supported. Any such paths configured for monitoring are ignored and do not generate FIM events. This restriction helps mitigate security risks such as NetNTLMv2 hash theft and remote code execution that can arise when accessing files over network shares through NTLM authentication.

