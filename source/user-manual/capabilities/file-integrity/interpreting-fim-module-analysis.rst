.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh dashboard shows the files and registry entries that the FIM module monitors, and the findings generated when they change. Learn more about it in this section.

Interpreting FIM scans
=======================

The Wazuh dashboard shows the files and registry entries that the FIM module monitors, and the findings generated when they change. To view them, go to **Endpoint security** > **File Integrity Monitoring** on the Wazuh dashboard. Results appear in the following tabs:

-  :ref:`Dashboard <dashboard>`
-  :ref:`Inventory <inventory>`
-  :ref:`Findings <findings>`

.. _dashboard:

Dashboard
---------

The **Dashboard** tab summarizes the current state of the files that the FIM module monitors, for all monitored endpoints or a single endpoint you select. Changes to monitored files appear in the **Findings** tab.

The image below shows the **Dashboard** tab for all monitored endpoints.

.. thumbnail:: /images/manual/fim/dashboard.png
   :title: Dashboard
   :alt: FIM Dashboard tab for all monitored endpoints, with top agents, OS platforms, file owners, and recently modified files
   :align: center
   :width: 80%

The image below shows the **Dashboard** tab for an Ubuntu endpoint.

.. thumbnail:: /images/manual/fim/fim-overview.png
   :title: Overview of FIM scan results
   :alt: Overview of FIM scan results
   :align: center
   :width: 80%

.. _inventory:

Inventory
---------

This section displays an inventory of all files the FIM module has indexed, including each file's path, modification date, owner, UID, and size. For Windows endpoints, the **Registry keys** and **Registry values** tabs list the monitored registry entries.

The image below shows the file inventory of an Ubuntu endpoint.

.. thumbnail:: /images/manual/fim/inventory.png
   :title: Inventory
   :alt: FIM Inventory Files tab for an Ubuntu endpoint, listing file path, modification time, owner, UID, and size
   :align: center
   :width: 80%

Click a file entry to view its attributes and other details. The image below shows the details for the ``/etc/resolv.conf`` file.

.. thumbnail:: /images/manual/fim/entry-details.png
  :title: Entry details
  :alt: Entry details
  :align: center
  :width: 80%

.. _findings:

Findings
--------

This section displays the Wazuh FIM findings. A finding is generated when a FIM event matches a Wazuh detection rule. It provides details such as the Wazuh agent name, the monitored file path, the type of FIM event, the rule title, and the rule level associated with the finding.

Each FIM event that a default rule of the ``wazuh-fim`` integration matches generates one finding. The finding title names the event type and the file path:

-  ``Wazuh FIM - File created - <FILE_PATH>``: low level, MITRE ATT&CK techniques T1105 and T1036.
-  ``Wazuh FIM - File modified - <FILE_PATH>``: medium level, MITRE ATT&CK techniques T1565 and T1036.
-  ``Wazuh FIM - File deleted - <FILE_PATH>``: medium level, MITRE ATT&CK techniques T1070 and T1485.

On Windows endpoints, the file path in a finding is in lowercase, for example ``c:\users\test\documents\audit_docu.txt``. Write the path in lowercase when you filter findings on ``file.path``.

.. thumbnail:: /images/manual/fim/findings.png
   :title: Findings
   :alt: FIM Findings tab with a histogram and a table of findings for Windows and Ubuntu endpoints
   :align: center
   :width: 80%

In addition, you can expand each finding entry to display additional information about the event that triggered the finding.

.. thumbnail:: /images/manual/fim/expanded-findings.png
   :title: Expanded findings
   :alt: Expanded findings
   :align: center
   :width: 80%

Troubleshooting missing findings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If a change to a monitored file doesn't appear in the **Findings** tab, check the following in order:

#. The configuration reached the Wazuh agent. The ``<directories>`` option names the path you changed, and the directory exists on the endpoint. If you use centralized configuration, the Wazuh agent belongs to the group whose ``agent.conf`` file holds the block.
#. The first scan ended. The Wazuh agent log contains ``(6009): File integrity monitoring scan ended.`` Changes made before this message become part of the baseline. Repeat the change after it.
#. Who-data started, if the directory uses ``whodata="yes"``. On Linux with the eBPF provider, the log contains ``(6048)``. On Linux with the audit provider and on Windows, it contains ``(6019)``. If the log contains ``(6913)`` instead, who-data didn't start, and the FIM module monitors the directory in real time. On Linux, install and start the audit daemon as described in :ref:`Requirements <who_data_audit_requirements>`.
#. The filter matches the finding. On Windows endpoints, the ``file.path`` value in a finding is in lowercase.
#. The ``wazuh-fim`` integration is enabled in **Ruleset management** → **Overview**.
