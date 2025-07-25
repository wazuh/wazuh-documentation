.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use the Wazuh global queries feature to centrally view and analyze FIM and system inventory data across your monitored endpoints using the IT Hygiene dashboards.

Global queries
==============

The Wazuh global queries feature allows centralized querying and visualization of data collected by the Wazuh FIM and Syscollector modules. This is made possible using the Wazuh Inventory Harvester component, which receives both file integrity and inventory data and stores it in the Wazuh indexer. To utilize this feature:

#. Navigate to **IT Hygiene** on your Wazuh dashboard as displayed below.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-it-hygiene.png
      :align: center
      :width: 80%
      :title: Navigate to IT Hygiene
      :alt: Navigate to IT Hygiene

   The **IT Hygiene** page consists of **Dashboard**, **System**, **Software**, **Processes**, and **Network** inventory data. It shows a consolidated view of the system inventory data across multiple or selected monitored endpoints.

   It visualizes key metrics such as operating system families, package types, installed packages, running packages, operating systems, host CPUs, source ports, and process start times.

#. Navigate to the **System** dashboard.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-system.png
      :align: center
      :width: 80%
      :title: Navigate to System dashboard
      :alt: Navigate to System dashboard

   This dashboard provides a breakdown of operating system and hardware information across all monitored endpoints.

#. Navigate to the **Hardware** tab under the **System** dashboard.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-system-hardware.png
      :align: center
      :width: 80%
      :title: Navigate to Hardware under System dashboard
      :alt: Navigate to Hardware under System dashboard

   This displays top CPU models, CPU cores, the most used memory, and a summary data table.

#. Navigate to the **Software** dashboard.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-software.png
      :align: center
      :width: 80%
      :title: Navigate to Software dashboard
      :alt: Navigate to Software dashboard

   The above dashboard displays Ubuntu package data, including top software vendors, the number of installed packages, the types of packages, and a summary data table.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-software-windows.png
      :align: center
      :width: 80%
      :title: Windows Knowledge Base data
      :alt: Windows Knowledge Base data

   The above dashboard displays the Windows Knowledge Base data, including the most and least common Knowledge Bases.

#. Navigate to the **Processes** dashboard.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-processes.png
      :align: center
      :width: 80%
      :title: Navigate to Processes dashboard
      :alt: Navigate to Processes dashboard

   This dashboard displays top running processes, process start time, and a summary data table containing process details for the monitored endpoints.

#. Navigate to the **Network** dashboard.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-network.png
      :align: center
      :width: 80%
      :title: Navigate to Network dashboard
      :alt: Navigate to Network dashboard

   This dashboard shows the **Addresses**, **Interfaces**, **Protocols**, and **Ports** tabs. The **Addresses** tab offers a detailed view of network types, unique network IPs, interface names, and a summary data table of detailed network address data.

   The **Interfaces** tab offers a detailed view of network interfaces, displaying average packet loss, interface states, interface types, and a summary data table of interface-level details.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-network-interfaces.png
      :align: center
      :width: 80%
      :title: Navigate to Network dashboard - Interfaces
      :alt: Navigate to Network dashboard - Interfaces

   The **Protocols** tab offers a detailed view of network types, network metrics, and DHCP status, and a summary table with more protocol-level details.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-network-protocols.png
      :align: center
      :width: 80%
      :title: Navigate to Network dashboard - Protocols
      :alt: Navigate to Network dashboard - Protocols

   The **Ports** tab provides a detailed view of active listening ports, including source ports, interface states, transport protocols, processes, and a summary data table for each endpoint.

   .. thumbnail:: /images/manual/system-inventory/navigate-to-network-ports.png
      :align: center
      :width: 80%
      :title: Navigate to Network dashboard - Ports
      :alt: Navigate to Network dashboard - Ports
