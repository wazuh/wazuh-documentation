.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Query and visualize centralized FIM and system inventory data across endpoints using Wazuh global queries for improved visibility and compliance.

Wazuh global queries
====================

You can now use the global queries feature to query and visualize File Integrity Monitoring (FIM) and system inventory data across your monitored endpoints directly from the Wazuh dashboard. This feature provides real-time visibility into monitored assets by centralizing and indexing a unified, up-to-date copy of FIM and system inventory data from all Wazuh agents. The centralized data, known as the global state data, is stored in the Wazuh indexer and can be queried using built-in or custom dashboards. This unified view enhances security and compliance by providing deeper insights into the system status and configuration. You can use this feature in single-node and multiple-node environments.

The Wazuh global queries feature offers more ways to interact with the FIM and system inventory global state data. These allow for:

-  **Centralized storage of FIM and system inventory data**: System inventory and FIM information are unified and stored within the Wazuh indexer as global state data.

-  **Custom queries and visualization of global state data**: This feature allows you to run specific queries directly on the Wazuh indexer. You can filter global state data using fields for file path, file name, IP address, and others. The built-in dashboard visualizes global state data, allowing users to view monitored files and registry changes across all monitored endpoints. System inventory data, like installed packages, active processes, open ports, and network configurations, can also be viewed centrally.

Data flow
---------

The Wazuh global queries feature relies on the Wazuh Inventory Harvester component on the Wazuh manager to process FIM and system inventory data received from Wazuh agents. This data is transmitted using FlatBuffer messages, a compact format designed for fast and efficient communication between Wazuh components. After processing, the data is stored in the Wazuh indexer, where it can be queried and visualized through the Wazuh dashboard. Ingested data flows through the Wazuh Inventory Harvester component across the following steps:

#. **Message ingestion**: The Wazuh manager receives data from the Wazuh Syscollector and FIM modules via the existing :doc:`remoted </user-manual/reference/daemons/wazuh-remoted>` and :doc:`wazuh-db </user-manual/reference/daemons/wazuh-db>` protocols. These messages are then transformed into Flatbuffer messages for processing.
#. **Deserialization and validation**: Flatbuffer messages are converted into native data structures suitable for indexing. The data is checked against the Wazuh Common Schema (WCS) to maintain consistency, structure, and integrity. Wazuh Common Schema is a framework for structuring and normalizing security event data across the Wazuh platform.
#. **Batching and forwarding**: After validation, the FIM and system inventory data are batched and sent from the Wazuh manager to the Wazuh indexer in bulk, reducing processing overhead.
#. **Storage**: The data is stored in a dedicated global state index, following Wazuh Common Schemas (WCS). One index is created for each type of inventory data.
#. **Monitoring and feedback**: Any indexing issues or failures are reported to the relevant components for retries or error handling.

Data sources
^^^^^^^^^^^^

The Wazuh agent collects system inventory and FIM data from monitored endpoints using the Wazuh :ref:`Syscollector <global_queries_syscollector>` and :ref:`FIM <global_queries_fim>` modules.

.. _global_queries_syscollector:

Wazuh Syscollector module
~~~~~~~~~~~~~~~~~~~~~~~~~

The Wazuh agent uses the Wazuh Syscollector module to periodically scan the monitored endpoint, collect system inventory data, and forward it to the Wazuh server. The Wazuh Syscollector module is enabled with all available scans by default in all compatible systems.  For more information, refer to the :doc:`system inventory configuration </user-manual/capabilities/system-inventory/configuration>`.

The Wazuh Syscollector module is responsible for collecting the following system inventory data:

-  Operating system.
-  Installed programs and packages.
-  Programs and processes running at the time of the scan.
-  CPU and memory information.
-  Detected network interfaces.
-  Current network connection.
-  Details about open ports on the endpoint.

.. _global_queries_fim:

Wazuh FIM module
~~~~~~~~~~~~~~~~

The Wazuh :doc:`FIM </user-manual/capabilities/file-integrity/index>` module is enabled by default in all compatible systems, and can be customized to monitor specific files and the Windows registry. The Wazuh agent reports any changes the Wazuh FIM module finds in the monitored paths to the Wazuh server.
File integrity monitoring is achieved by tracking:

-  Changes to monitored files (creation, deletion, modification).
-  Changes to monitored registries on Windows endpoints (creation, deletion, modification).

Indexing
^^^^^^^^

The system inventory and file integrity data collected from the Wazuh agent are passed through the Wazuh Inventory Harvester component on the Wazuh manager for processing. It is then sent to the Wazuh indexer, where it is stored in a dedicated index. Some of the newly added indices are outlined below:

-  ``wazuh-states-fim-files``
-  ``wazuh-states-fim-registries``
-  ``wazuh-states-inventory-hardware``
-  ``wazuh-states-inventory-hotfixes``
-  ``wazuh-states-inventory-interfaces``
-  ``wazuh-states-inventory-networks``
-  ``wazuh-states-inventory-packages``
-  ``wazuh-states-inventory-ports``
-  ``wazuh-states-inventory-processes``
-  ``wazuh-states-inventory-protocols``
-  ``wazuh-states-inventory-system``

Visualization
^^^^^^^^^^^^^

You can use the Wazuh dashboard for querying and visualization. In addition to the built-in dashboards, custom visualizations and queries can be created directly using the global state data, which is stored in dedicated indices for inventory and FIM. This allows you to search across all endpoints for data like installed packages, running processes, or file changes.

Use cases
---------

This section shows how to utilize the Wazuh global queries feature.

Resource monitoring using Wazuh global queries
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, we demonstrate how to monitor memory usage across all endpoints by applying the ``host.memory.free: exists`` filter using the IT Hygiene dashboard. This query retrieves and displays memory-related data, and helps you assess system performance and identify devices with low available memory. To achieve this:

#. Navigate to the **Security operations** tab and select **IT Hygiene**.
#. Click on the **System** tab and select **Hardware**.
#. Apply a filter by clicking on **Add filter**, where **Field** is ``host.memory.free`` and **Operator** is ``exists``.

.. thumbnail:: /images/wazuh-dashboard/global-queries/resource-monitoring.png
   :align: center
   :width: 80%
   :title: Resource monitoring using Wazuh global queries
   :alt: Resource monitoring using Wazuh global queries

Threat hunting with Wazuh global queries
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, we demonstrate how to check if a specific process is running by applying the ``process.name:sudo`` filter using the IT Hygiene dashboard. Filtering this command successfully isolated all instances of the ``sudo`` command being executed across monitored endpoints. This helps in threat hunting to detect unauthorized or malicious software running within the network. To implement this, perform the following:

#. Navigate to the **Security operations** tab and select **IT Hygiene**.
#. Click on **Processes**.
#. Apply a filter by selecting **Add filter**.

Where:

-  **Field** is ``process.name``
-  **Operator**: ``is``
-  **Value** is ``sudo``

.. thumbnail:: /images/wazuh-dashboard/global-queries/threat-hunting.jpg
   :align: center
   :width: 80%
   :title: Threat hunting with Wazuh global queries
   :alt: Threat hunting with Wazuh global queries
