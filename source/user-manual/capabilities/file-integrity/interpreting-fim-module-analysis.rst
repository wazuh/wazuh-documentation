.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh dashboard displays FIM events whenever a monitored file is added, modified, or deleted. Learn more about it in this section.

Interpreting FIM scans
=======================

The Wazuh dashboard displays FIM events whenever a monitored file is added, modified, or deleted. To view them, go to **Endpoint security** → **File Integrity Monitoring** on the Wazuh dashboard. Results appear in the following tabs:

-  :ref:`Dashboard <dashboard>`
-  :ref:`Inventory <inventory>`
-  :ref:`Findings <findings>`

.. _dashboard:

Dashboard
---------

The **Dashboard** tab summarizes the current state of the files that the FIM module monitors, for all monitored endpoints or a single endpoint you select.

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

This section displays an inventory of all files the FIM module has indexed, including each file's path, modification date, owner, UID, and size.

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

.. thumbnail:: /images/manual/fim/findings.png
   :title: Findings
   :alt: FIM Findings tab with a histogram and a table of file created and modified events for an Ubuntu endpoint
   :align: center
   :width: 80%

In addition, you can expand each finding entry to display additional information about the event that triggered the finding.

.. thumbnail:: /images/manual/fim/expanded-findings.png
   :title: Expanded findings
   :alt: Expanded findings
   :align: center
   :width: 80%