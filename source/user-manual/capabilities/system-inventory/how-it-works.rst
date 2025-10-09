.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent uses the Syscollector module to gather relevant information from the monitored endpoint. Learn how Syscollector works in this section.

How it works
============

The Wazuh agent uses the Syscollector module to gather relevant information from the monitored endpoint. Once the agent service starts on a monitored endpoint, the Syscollector module runs periodic scans and collects data on the system properties defined in your configuration. The data is first stored in a temporary local database on the endpoint.

The Wazuh agent then forwards the newly collected data from its local database to the Wazuh server. Each agent uses a separate database on the Wazuh server, which updates the appropriate tables of its inventory database using the received information. For example, the Wazuh server stores hardware-related information in a table called ``sys_hwinfo``.

The Wazuh Inventory Harvester module on the Wazuh manager processes this data, standardizes it using Wazuh Common Schemas (WCS), and forwards it to the Wazuh indexer, where it is stored as global state data. This global state data is organized under dedicated indices for each data type, allowing users to efficiently run targeted queries and generate visualizations directly from the Wazuh dashboard. For example, the packages inventory is indexed as ``wazuh-states-inventory-packages-*`` in the Wazuh indexer.

You can query and visualize centralized system inventory data from all monitored endpoints in the IT Hygiene section on the Wazuh dashboard. In addition, you can query the system inventory data using the Wazuh indexer API, the Wazuh server API, or the ``SQLite`` tool. The :doc:`Vulnerability Detector </user-manual/capabilities/vulnerability-detection/index>` module uses :ref:`packages <syscollector_packages>` and :ref:`Windows updates <syscollector_hotfixes>` information in the inventory to detect vulnerable and patched software on monitored endpoints.
