.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh Syscollector module supports PCI DSS compliance by collecting hardware, OS, network, and process data to build a complete system inventory and identify unnecessary services.

System inventory
================

Wazuh uses the Syscollector module to gather information about a monitored endpoint. This information includes hardware details, OS information, network details, services, browser extensions, running processes, users, and groups. The agent runs periodic scans on the endpoint and sends the information to the manager. The manager then updates the appropriate system information. See the :doc:`System inventory section </user-manual/capabilities/system-inventory/index>` for more information about the Wazuh Syscollector module.

The Wazuh Syscollector module helps to meet the following PCI DSS requirement:

-  **Requirement 2 - Apply Secure Configuration to All System Components**: Malicious individuals, both external and internal to an entity, often use default passwords and other vendor default settings to compromise systems. These passwords and settings are well known and are easily determined via public information. Applying secure configurations to system components reduces the means available to an attacker to compromise the system. Changing default passwords, removing unnecessary software, functions, and accounts, and disabling or removing unnecessary services all help to reduce the potential attack surface.

The Wazuh Syscollector module helps to achieve some of the objectives of this requirement. It keeps an inventory of all endpoints and the processes/daemons running on them. The Wazuh Syscollector module also gets information about the endpoint hardware, OS, network details, services, browser extensions, users, and groups. This allows visibility into the PCI DSS relevant assets, enabled network ports, and running processes/daemons, to individuals in an organization.

Use cases
---------

PCI DSS 2.2.4 requires keeping only necessary services, protocols, daemons, and functions enabled and removing or disabling all unnecessary functionality. Using the Wazuh Syscollector module, you can see what processes are running on a specific endpoint and determine if the running process or protocol is necessary for the operation of the asset. You can find this information in the **IT Hygiene** section on the Wazuh dashboard.

   .. thumbnail:: /images/compliance/pci/it-hygiene-dashboard.png
      :title: IT Hygiene dashboard
      :align: center
      :width: 80%

   The Wazuh Syscollector module is enabled with all available scans by default in all compatible systems.
