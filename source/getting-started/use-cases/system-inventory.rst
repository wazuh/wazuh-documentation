.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the rootkit component of Wazuh. The Wazuh agent periodically scans the monitored system to detect rootkits both at the kernel and the user space level.  

System inventory
----------------

The :doc:`Wazuh agent <../components/wazuh-agent>` system inventory module collects hardware and software information from the monitored system. This tool helps to identify assets and evaluate the efficacy of patch management.

The collected inventory data, for each of the monitored endpoints, can be queried via the Wazuh RESTful API and from the web user interface. This includes memory usage, disk space, CPU specs, network interfaces, open ports, running processes, and a list of installed applications.

In order to gather the data, the Wazuh agent runs periodic scans (the time interval is configurable). Once a scan is completed, the agent compares the new inventory data with the old one from the previous scan. This way the agent identifies system events, for example when a new port has been opened, a process has been stopped, or a new application has been installed.

Example of hardware inventory, network interfaces, open ports, and network settings:

.. thumbnail:: /images/getting-started/system-inventory.png
   :title: System inventory
   :alt: System inventory
   :align: center
   :wrap_image: No

Example of software inventory:

.. thumbnail:: /images/getting-started/software-inventory.png
   :title: Software inventory
   :alt: Software inventory
   :align: center
   :wrap_image: No

Example of running processes:

.. thumbnail:: /images/getting-started/running-processes.png
   :title: Running processes
   :alt: Running processes
   :align: center
   :wrap_image: No

You can find more information about the Wazuh system inventory module in the :doc:`user manual </user-manual/capabilities/system-inventory/index>`.
