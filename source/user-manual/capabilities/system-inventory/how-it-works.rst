.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent uses the Syscollector module to gather relevant information from the monitored endpoint. Learn how Syscollector works in this section.

How it works
============

The Wazuh agent uses the Syscollector module to gather relevant information from the monitored endpoint. Once the Wazuh agent service starts on a monitored endpoint, the Syscollector module runs periodic scans and collects data on the system properties defined in your configuration. The data is first stored in a local database on the endpoint.

The Wazuh agent then synchronizes the newly collected data from its local database to the Wazuh manager. The Wazuh manager processes this data, normalizes it using Wazuh Common Schemas (WCS), and forwards it to the Wazuh indexer through the indexer connector, where it is stored as global state data.

Wazuh global state data represents the current state of all monitored endpoints and provides a consolidated view of endpoint security and compliance information. You can query and visualize centralized system inventory data from all monitored endpoints in the IT Hygiene section on the Wazuh dashboard. The system inventory global state data is organized under dedicated indices for each data type. You can run targeted queries and generate visualizations directly from the Wazuh dashboard. For example, the packages inventory is indexed as ``wazuh-states-inventory-packages`` in the Wazuh indexer. You can also query the system inventory data using the Wazuh indexer API. The Wazuh Vulnerability Detection module then uses the :ref:`packages <syscollector_packages>` and :ref:`Windows updates <syscollector_hotfixes>` information collected by the Syscollector module to detect vulnerable and patched software on monitored endpoints.
