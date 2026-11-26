.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh Syscollector module supports NIST 800-53 compliance by collecting system inventory data on monitored endpoints.

System inventory
================

The Wazuh Syscollector module gathers system resource information from each monitored endpoint. The information gathered includes hardware details, OS information, network details, and running processes. On the Wazuh dashboard, the **IT Hygiene** page shows this data for each monitored endpoint. To open it, go to **Security operations** > **IT Hygiene**. The Wazuh Syscollector module helps to meet the following NIST 800-53 controls:

-  **CM-7 Least functionality:** Turn off the functions, ports, protocols, and services that a system doesn't need, so each component runs only what it requires.

-  **CM-8 System component inventory:** Keep an accurate, up-to-date inventory of the hardware, software, and firmware components in each system.

The Wazuh Syscollector module helps meet part of this control by providing detailed information on running processes, installed packages, and open ports on a monitored endpoint.

Use case
--------

Inventory applications on a Windows endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the CM-8 System component inventory control by providing a module for system inventory.

Using the Wazuh Syscollector module for this use case, you can see all packages installed on a monitored Windows endpoint. You can find this information on the Wazuh dashboard for the specific agent. The Wazuh Syscollector module runs all available scans once every hour by default on all compatible operating systems. Restarting the Wazuh agent triggers a new scan right away.

#. Run the following command in PowerShell as an administrator to restart the Wazuh agent and trigger a new system inventory scan:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

#. Click the upper-left menu icon (**☰**) and go to **Security operations > IT Hygiene**, select a Windows endpoint, and click the **Software** tab to see the installed packages. Then click the **Processes** tab to see the running processes.

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
