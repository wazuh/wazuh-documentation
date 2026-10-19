.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh Syscollector module supports NIST 800-53 compliance by collecting system inventory data on monitored endpoints.

System inventory
================

The Wazuh Syscollector module gathers system resource information from each monitored endpoint. The information gathered includes hardware details, OS information, network details, and running processes. The Wazuh agent runs periodic scans on the endpoint and updates the appropriate system information at each scan. In the dashboard, this data is surfaced through the **IT Hygiene** view. The Wazuh Syscollector module helps to meet the following NIST 800-53 controls:

-  **CM-7 Least functionality:** "*Systems provide a wide variety of functions and services. Some of the functions and services routinely provided by default may not be necessary to support essential organizational missions, functions, or operations. Additionally, it is sometimes convenient to provide multiple services from a single system component, but doing so increases risk over limiting the services provided by that single component. Where feasible, organizations limit component functionality to a single function per component. Organizations consider removing unused or unnecessary software and disabling unused or unnecessary physical and logical ports and protocols to prevent unauthorized connection of components, transfer of information, and tunneling. Organizations employ network scanning tools, intrusion detection and prevention systems, and end-point protection technologies, such as firewalls and host-based intrusion detection systems, to identify and prevent the use of prohibited functions, protocols, ports, and services. Least functionality can also be achieved as part of the fundamental design and development of the system (see SA-8, SC-2, and SC-3).*"

-  **CM-8 System component inventory:** "*System components are discrete, identifiable information technology assets that include hardware, software, and firmware. Organizations may choose to implement centralized system component inventories that include components from all organizational systems. In such situations, organizations ensure that the inventories include system-specific information required for component accountability. The information necessary for effective accountability of system components includes the system name, software owners, software version numbers, hardware inventory specifications, software license information, and for networked components, the machine names and network addresses across all implemented protocols (e.g., IPv4, IPv6). Inventory specifications include date of receipt, cost, model, serial number, manufacturer, supplier information, component type, and physical location.*"

The NIST 800-53 controls above require you to maintain an inventory of system components, including ports, protocols, applications, and services, and their authorized usage. The CM-7 Least functionality requirement specifies that you must permit only a minimum useful set of features necessary for software or systems functioning. The Wazuh Syscollector module helps meet part of this control by providing detailed information on running processes, installed packages, and open ports on a monitored endpoint.

Use case
--------

Inventory applications on a Windows endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the CM-8 System component inventory control by providing a module for system inventory.

Using the Wazuh Syscollector module for this use case, you can see all packages installed on a monitored Windows endpoint. You can find this information on the Wazuh dashboard for the specific agent.

#. Run the following command in PowerShell as an administrator to restart the Wazuh agent and trigger a new system inventory scan:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

#. Click the upper-left menu icon (**☰**) and go to **Security operations > IT Hygiene**, select a Windows endpoint, and click the **Software** tab.

   .. thumbnail:: /images/compliance/nist/it-hygiene-dashboard.png
      :title: IT Hygiene dashboard
      :alt: IT Hygiene dashboard
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/nist/it-hygiene-software.png
      :title: IT Hygiene Software tab
      :alt: IT Hygiene Software tab
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/nist/it-hygiene-processes.png
      :title: IT Hygiene Processes tab
      :alt: IT Hygiene Processes tab
      :align: center
      :width: 80%

The Wazuh Syscollector module runs all available scans once every hour by default on all compatible operating systems.
