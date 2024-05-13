.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: FIM analysis results appear on the Wazuh dashboard whenever there’s an addition, modification, or deletion of monitored files. Learn more about it in this section. 
  
Interpreting the FIM module analysis
====================================

FIM analysis results appear on the Wazuh dashboard whenever there’s an addition, modification, or deletion of monitored files. You can view the FIM results in three different sections of the dashboard. To view results from the FIM module, navigate to **File Integrity Monitoring** on the Wazuh dashboard. The results are in the following sections:

- :ref:`Inventory <inventory>` 
- :ref:`Dashboard <dashboard>`
- :ref:`Events <events>`

.. _inventory:

Inventory 
---------

This section displays an inventory of all files that the FIM module has indexed. The FIM database contains the inventory information including the filename, last modification date, user, user id, group, and file size. The image below shows the file inventory of an Ubuntu 22.04 endpoint.

.. thumbnail:: /images/manual/fim/inventory.png
  :title: Inventory
  :alt: Inventory
  :align: center
  :width: 80%

You can click a file entry to view the entry details such as the last time the FIM module analyzed the file and the file attributes. You can also view FIM alerts related to the file. The image below shows this information for the ``/etc/ld.so.preload`` file.

.. thumbnail:: /images/manual/fim/entry-details.png
  :title: Entry details
  :alt: Entry details
  :align: center
  :width: 80%

.. _dashboard:

Dashboard
---------

The dashboard section shows an overview of the analysis results of the Wazuh FIM module for:

- All agents within an infrastructure.
- A selected agent within an infrastructure.

You can view an example of the overview of FIM scan results for all monitored endpoints in the image below. 

.. thumbnail:: /images/manual/fim/dashboard.png
  :title: Dashboard
  :alt: Dashboard
  :align: center
  :width: 80%

You can view an example of the overview of FIM scan results for an Ubuntu endpoint in the image below. 

.. thumbnail:: /images/manual/fim/fim-overview.png
  :title: Overview of FIM scan results
  :alt: Overview of FIM scan results
  :align: center
  :width: 80%

.. _events:

Events
------

This section shows the alerts the Wazuh FIM module triggered. Here you can see details such as the agent name, the file path of the monitored file, the type of FIM event, a description of the alert, and the rule level of the alert.

.. thumbnail:: /images/manual/fim/events.png
  :title: Events
  :alt: Events
  :align: center
  :width: 80%

In addition, you can expand each alert entry to display additional information about the event that triggered the alert.

.. thumbnail:: /images/manual/fim/expanded-alert-entry.png
  :title: Expanded alert entry
  :alt: Expanded alert entry
  :align: center
  :width: 80%