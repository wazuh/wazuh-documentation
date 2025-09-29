.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh global queries allow users to search and visualize global state data directly on the Wazuh dashboard. Learn more in this section of the documentation.

Wazuh global queries
====================

Wazuh global queries allow users to search and visualize global state data directly on the Wazuh dashboard. Global state data represents aggregated information collected from all monitored endpoints, stored centrally in the Wazuh indexer under dedicated indices. This provides a comprehensive view of system configurations, installed software, vulnerabilities, and other critical details.

Previously, users could only retrieve inventory and vulnerability information per agent. With global queries, all relevant data is collected and centralized in the Wazuh indexer. This enables users to view and analyze system inventory and vulnerability information for all monitored endpoints from one single place. This centralization improves monitoring efficiency, streamlines threat hunting, and accelerates incident response.

How it works
------------

Wazuh agents run modules such as the Syscollector module, which periodically collect system inventory data from monitored endpoints. This includes running processes, network interfaces, software packages, and more. 

The Wazuh agents forward this data securely to the Wazuh manager using protocols such as ``wazuh-remoted`` and ``wazuh-db``. The Wazuh Inventory Harvester module on the Wazuh manager processes the incoming data and standardizes it using Wazuh Common Schemas (WCS).  It then forwards the processed data to the Wazuh indexer, where it is stored as global state data.

This data is stored under dedicated indices for each data type, so users can efficiently run targeted queries and generate visualizations directly on the dashboard. For example, the vulnerabilities inventory is indexed as ``wazuh-states-vulnerabilities-*``. It is also part of the global state data and provides up-to-date information about discovered endpoint vulnerabilities. 

The image below illustrates how the Wazuh global queries feature works.

.. thumbnail:: /images/wazuh-dashboard/global-queries/illustration.png
   :align: center
   :width: 80%
   :title: Wazuh global queries workflow
   :alt: Wazuh global queries workflow

Wazuh Inventory Harvester module
--------------------------------

The Wazuh Inventory Harvester module on the Wazuh manager processes the collected data in sequential steps:

1. **Message ingestion**: The Wazuh manager receives data from the Wazuh Syscollector module via the :doc:`wazuh-remoted </user-manual/reference/daemons/wazuh-remoted>` and :doc:`wazuh-db </user-manual/reference/daemons/wazuh-db>` protocols. These messages are transformed into FlatBuffer messages, a compact format designed for fast and efficient communication between Wazuh components for processing. 

2. **Deserialization and validation**: The FlatBuffer messages are converted into native data structures and validated against the Wazuh Common Schema (WCS). This ensures all data maintains a consistent structure, format, and integrity.

3. **Batching and forwarding:** The validated data is grouped into batches for performance. These batches are forwarded in bulk from the Wazuh manager to the Wazuh indexer for storage. 

4. **Storage**: The data is stored in a dedicated global state index for each data type, following Wazuh Common Schemas (WCS). This logical separation allows for efficient and targeted queries.

5. **Monitoring and feedback**: The module reports any indexing issues or failures for retries or error handling.

Indexing
--------

The Wazuh indexer organizes global state data into indices, each representing a category of information collected by Wazuh modules. These indices enable precise queries and visualizations in the Wazuh dashboard. The global state data indices are outlined below:

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Index Pattern
     - Description
   * - ``wazuh-states-inventory-hardware-*``
     - Basic information about hardware components on a monitored endpoint.
   * - ``wazuh-states-inventory-hotfixes-*``
     - Updates installed on a Windows endpoint.
   * - ``wazuh-states-inventory-interfaces-*``
     - Status and packet transfer information for network interfaces.
   * - ``wazuh-states-inventory-networks-*``
     - IPv4 and IPv6 addresses for each network interface.
   * - ``wazuh-states-inventory-packages-*``
     - Currently installed software packages on an endpoint.
   * - ``wazuh-states-inventory-ports-*``
     - Open network ports on a monitored endpoint.
   * - ``wazuh-states-inventory-processes-*``
     - System processes running on a monitored endpoint.
   * - ``wazuh-states-inventory-protocols-*``
     - Network routing configuration details and protocols per interface.
   * - ``wazuh-states-inventory-system-*``
     - Operating system, hostname, and architecture on an endpoint.
   * - ``wazuh-states-vulnerabilities-*``
     - Information about vulnerabilities detected on a monitored endpoint.

Querying and visualization
--------------------------

Users can query and visualize global state data directly from the Wazuh dashboard. The centralized and enriched index structure enables prompt reporting, compliance checks, and detection of risks across the environment.

.. thumbnail:: /images/wazuh-dashboard/global-queries/query-and-visualization.png
   :align: center
   :width: 80%
   :title: Global queries visualization
   :alt: Global queries visualization
