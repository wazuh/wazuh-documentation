.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description:

Global queries
==============

The Wazuh global queries feature allows centralized querying and visualization of data collected by the Wazuh FIM and Syscollector modules. This is made possible using the Wazuh Inventory Harvester component, which receives both file integrity and inventory data and stores it in the Wazuh indexer. To utilize this feature:

#. Navigate to **File Integrity Monitoring** on the Wazuh dashboard as displayed below.

   .. thumbnail:: /images/manual/fim/navigate-to-fim.png
      :align: center
      :width: 80%
      :title: Navigate to FIM
      :alt: Navigate to FIM

   The **Files** tab provides more details on monitored files, including file paths, file owners, and a summary data table with detailed file inventory across all monitored endpoints.

#. Navigate to the **Registry keys** tab.

   .. thumbnail:: /images/manual/fim/navigate-to-registry-keys.png
      :align: center
      :width: 80%
      :title: Navigate to Registry keys tab
      :alt: Navigate to Registry keys tab

   This section monitors Windows Registry key activity, highlights the top registry paths, and shows the number of registry keys alongside their owners and groups.

#. Navigate to the **Registry values** tab.

   .. thumbnail:: /images/manual/fim/navigate-to-registry-values.png
      :align: center
      :width: 80%
      :title: Navigate to Registry values tab
      :alt: Navigate to Registry values tab

   This section monitors Windows Registry value activity, highlights the top modified registry paths, shows the top five registry values, and lists the most modified data types.