.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module runs on the Wazuh agent, monitoring files and directories using scheduled scans or real-time monitoring. Learn more about how FIM works in this section.

How it works
============

The Wazuh File Integrity Monitoring (FIM) module runs on the Wazuh agent, enabled and preconfigured by default. It monitors files and directories using scheduled scans or real-time monitoring, detecting changes at fixed intervals or the moment they occur. Although the default configuration provides basic monitoring, review and customize it to meet your environment's requirements.

The detection rules for FIM events belong to the ``wazuh-fim`` integration, which is enabled by default. Wazuh generates FIM findings only while this integration is enabled. To check it, go to **Ruleset management** → **Overview** on the Wazuh dashboard and search for ``wazuh-fim``.

When the Wazuh agent starts, the FIM module runs a full scan of the monitored files to record their baseline. FIM reports changes once this scan ends, and the Wazuh agent logs this message:

.. code-block:: none
   :class: output

   (6009): File integrity monitoring scan ended.

Changes made to monitored files before this message appears become part of the baseline. Real-time and who-data monitoring start when the scan ends. On Windows, the Wazuh agent logs ``(6019): File integrity monitoring real-time Whodata engine started.`` when the who-data engine starts. The Wazuh agent log file is ``C:\Program Files (x86)\ossec-agent\ossec.log`` on Windows, ``/var/ossec/logs/ossec.log`` on Linux, and ``/Library/Ossec/logs/ossec.log`` on macOS.

Some text editors write temporary swap or backup files next to the file you edit. When you edit a file in a monitored directory with one of these editors, FIM also reports the creation and deletion of these temporary files.

.. thumbnail:: ../../../images/manual/fim/fim-flow.png
  :title: FIM how it works
  :alt: FIM how it works
  :align: center
  :width: 80%

The Wazuh agent also synchronizes the current state of the monitored files with the Wazuh manager, which stores it in the ``wazuh-states-fim-files`` index of the Wazuh indexer. The **Inventory** tab of the **File Integrity Monitoring** module on the Wazuh dashboard shows this state.
