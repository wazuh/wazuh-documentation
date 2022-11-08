.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to use Wazuh log collection and analysis capabilities to meet the following PCI DSS controls. 
  
System inventory
================

Wazuh is able to gather information relevant to the monitored endpoint using the system inventory module. The information gathered for each endpoint includes hardware details, OS information, network details, and running processes. The agent runs periodic scans on the endpoint and sends the information gathered to the manager for updates on the appropriate system information. See the :doc:`System inventory section </user-manual/capabilities/syscollector>` for more information about the system inventory module.

The system inventory module helps to meet the following PCI DSS requirement:

- **Requirement 2 - Apply Secure Configuration to All System Components**: Malicious individuals, both external and internal to an entity, often use default passwords and other vendor default settings to compromise systems. These passwords and settings are well known and are easily determined via public information. Applying secure configurations to system components reduces the means available to an attacker to compromise the system. Changing default passwords, removing unnecessary software, functions, and accounts, and disabling or removing unnecessary services all help to reduce the potential attack surface. 

The system inventory module of Wazuh help in achieving some of the objectives of this requirement by keeping an inventory of all endpoints and the processes/daemons running on them. The system inventory module will also get information about the endpoint hardware, OS, and network details. This will provide individuals in an organization with visibility into the PCI DSS relevant assets, their enabled network ports, and running processes/daemons.

Use cases
---------

PCI DSS 2.2.4 requires that only necessary services, protocols, daemons, and functions are enabled, and all unnecessary functionality is removed or disabled. Using the system inventory module, you can see what processes are running on a specific endpoint and determine if the running process or protocol is necessary for the operation of the asset. You can find this information on the Wazuh dashboard for a specific agent:

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
