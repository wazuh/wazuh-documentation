.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: A system inventory is a resource that contains information about the hardware and software assets within an IT infrastructure. Learn more about it here.

System inventory
================

A system inventory is a resource that contains information about the hardware and software assets within an IT infrastructure. Keeping an inventory of all assets helps organizations maximize the visibility of hardware and software in their environment. An up-to-date system inventory is essential for maintaining good IT hygiene within an enterprise network.

Wazuh agents collect system information from monitored endpoints and forward it to the Wazuh manager to maintain a centralized system inventory. This information is processed on the Wazuh manager and then sent to the Wazuh indexer, where it is stored as global state data. The Wazuh Syscollector module on the Wazuh agent collects hardware, operating system, package, network interface, network address, network protocol, port, process, service, browser extension, user, and group information from each endpoint. The Wazuh agent also collects data about Windows updates from Windows endpoints. You can configure what kind of information you want the Syscollector module to collect or ignore.

You can generate system inventory reports from the Wazuh dashboard. These reports are valuable resources during threat hunting and IT hygiene exercises. You can use the information in the report to identify unwanted applications, processes, services, and malicious artifacts.


.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      how-it-works
      configuration
      viewing-system-inventory-data
      generating-system-inventory-reports
      available-inventory-fields
      syscollector-information-findings
      use-cases
      compatibility-matrix
