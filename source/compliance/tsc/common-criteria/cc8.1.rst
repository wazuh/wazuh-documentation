.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the TSC common criteria CC8.1 requirement by providing capabilities for configuration assessment, vulnerability detection, IT hygiene, and file integrity monitoring.

Common criteria 8.1
=====================

The TSC **Common Criterion CC8.1** addresses change management. It states that: “*The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives.*” To support CC8.1, an organization should maintain defined change-management processes and evidence showing that relevant changes were reviewed, tested, approved, implemented, and monitored in accordance with those processes.

Wazuh helps meet the **TSC common criteria CC8.1** requirement by providing several capabilities for security configuration assessment, vulnerability detection, IT Hygiene, and file integrity monitoring.

Use case: Monitoring installed packages using the IT Hygiene capability
----------------------------------------------------------------------------

This use case shows how Wazuh monitors system inventory on a Windows 11 endpoint and detects a vulnerable 7-Zip package.

Windows endpoint
^^^^^^^^^^^^^^^^^

#. Download and install 7-Zip 19.00 with the `7z1900-x64.exe <https://www.7-zip.org/a/7z1900-x64.exe>`__ installer. This use case uses this outdated version on purpose because it has known vulnerabilities. Install it only on a lab endpoint, never on a production endpoint.

#. The package appears in the inventory after the next scan, which runs hourly by default. To trigger a scan now, restart the Wazuh agent and wait a few minutes. Run the following command in PowerShell as an administrator:

   .. code-block:: ps1con

      > Restart-Service -Name WazuhSvc

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Open the menu (**☰**) and go to **Security operations** > **IT Hygiene** > **Software** > **Packages**.

   .. thumbnail:: /images/compliance/tsc/common-criteria/it-hygiene-software-packages.png
      :title: IT Hygiene - Software - Packages
      :alt: IT Hygiene - Software - Packages
      :align: center
      :width: 80%

#. Switch on Advanced filters at the right of the filter bar, then enter the following query: ``package.name: "7-Zip 19.00 (x64)"``.

   .. thumbnail:: /images/compliance/tsc/common-criteria/it-hygiene-packages-7zip-filter.png
      :title: IT Hygiene packages filtered by 7-Zip
      :alt: IT Hygiene packages filtered by 7-Zip
      :align: center
      :width: 80%

   The above inventory shows that the package is installed on the monitored Windows endpoint.

#. Open the menu (**☰**) and go to **Threat intelligence** > **Vulnerability Detection**.

   .. thumbnail:: /images/compliance/tsc/common-criteria/overview-vulnerability-detection-card-windows.png
      :title: Wazuh Overview dashboard - Vulnerability Detection
      :alt: Wazuh Overview dashboard - Vulnerability Detection
      :align: center
      :width: 80%

#. Switch to the **Inventory** tab and filter using the following parameters: ``package.name: "7-Zip 19.00 (x64)"``

   .. thumbnail:: /images/compliance/tsc/common-criteria/vulnerability-detection-inventory-7zip-filter.png
      :title: Vulnerability Detection inventory filtered by 7-Zip
      :alt: Vulnerability Detection inventory filtered by 7-Zip
      :align: center
      :width: 80%

Wazuh contributes to the **CC8.1** requirement by maintaining an accurate, up-to-date record of the software installed on each monitored agent. This information helps you understand the overall system configuration and supports compliance. The vulnerability finding for the package maps to CC7.1 and helps organizations prioritize patching or mitigating vulnerable packages, reducing the risk of exploitation.
