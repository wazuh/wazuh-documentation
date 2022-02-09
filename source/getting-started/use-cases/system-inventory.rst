.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
    :description: The Wazuh agent system inventory module collects hardware and software information from the monitored system. Learn more about this capability here.
    
.. _system_inventory:

System inventory
================

The :ref:`Wazuh agent <wazuh_agent>` system inventory module collects hardware and software information from the monitored system. This capability helps to identify assets and evaluate the efficacy of patch management.

The collected inventory data, for each of the monitored endpoints, can be queried via the Wazuh RESTful API and from the web user interface. This includes memory usage, disk space, CPU specs, network interfaces, open ports, running processes, and a list of installed applications.

In order to gather the data, the Wazuh agent runs periodic scans (the time interval is configurable). Once a scan is completed, the agent compares the new inventory data with the old one from the previous scan. This way the agent identifies system events, for example when a new port has been opened, a process has been stopped, or a new application has been installed.

Example of hardware inventory, network interfaces, open ports, and network settings:

.. thumbnail:: ../../images/getting_started/use_case_inventory_1.png
    :align: center
    :wrap_image: No

Example of software inventory:

.. thumbnail:: ../../images/getting_started/use_case_inventory_2.png
    :align: center
    :wrap_image: No

Example of running processes:

.. thumbnail:: ../../images/getting_started/use_case_inventory_3.png
    :align: center
    :wrap_image: No

More information about the Wazuh system inventory module can be found at the :ref:`user manual <syscollector>`.
