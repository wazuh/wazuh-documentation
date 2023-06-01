.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to use Wazuh log collection and analysis capabilities to meet the following PCI DSS controls. 
  
System inventory
================

Wazuh  uses the system inventory module to gather information about a monitored endpoint. This information includes hardware details, OS information, network details, and running processes. The agent runs periodic scans on the endpoint and sends the information to the manager. The manager then updates the appropriate system information. See the :doc:`System inventory section </user-manual/capabilities/system-inventory/index>` for more information about the system inventory module.

The system inventory module helps to meet the following PCI DSS requirement:

-  **Requirement 2 - Apply Secure Configuration to All System Components**: Malicious individuals, both external and internal to an entity, often use default passwords and other vendor default settings to compromise systems. These passwords and settings are well known and are easily determined via public information. Applying secure configurations to system components reduces the means available to an attacker to compromise the system. Changing default passwords, removing unnecessary software, functions, and accounts, and disabling or removing unnecessary services all help to reduce the potential attack surface. 

The system inventory module helps to achieve some of the objectives of this requirement. It keeps an inventory of all endpoints and the processes/daemons running on them. The system inventory module also gets information about the endpoint hardware, OS, and network details. This allows visibility into the PCI DSS relevant assets, enabled network ports, and running processes/daemons, to individuals in an organization.

Use cases
---------

-  PCI DSS 2.2.4 requires keeping only necessary services, protocols, daemons, and functions enabled and removing or disabling all unnecessary functionality. Using the system inventory module, you can see what processes are running on a specific endpoint and determine if the running process or protocol is necessary for the operation of the asset. You can find this information on the Wazuh dashboard for a specific agent:

   .. thumbnail:: ../images/pci/processes-are-running-on-a-specific-endpoint-01.png
      :title: Processes running on a specific endpoint 
      :align: center
      :width: 80%

   .. thumbnail:: ../images/pci/processes-are-running-on-a-specific-endpoint-02.png
      :title: Processes running on a specific endpoint 
      :align: center
      :width: 80%

   .. thumbnail:: ../images/pci/processes-are-running-on-a-specific-endpoint-03.png
      :title: Processes running on a specific endpoint 
      :align: center
      :width: 80%

   The system inventory module is enabled with all available scans by default in all compatible systems.
