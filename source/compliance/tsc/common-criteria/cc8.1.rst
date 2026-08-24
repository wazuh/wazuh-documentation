.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the TSC common criteria CC8.1 requirement by providing capabilities for configuration assessment, vulnerability detection, IT hygiene, and file integrity monitoring.

Common criteria 8.1
=====================

The TSC **Common Criterion CC8.1** addresses change management. It states that: “*The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives.*” To support CC8.1, an organization should maintain defined change-management processes and evidence showing that relevant changes were reviewed, tested, approved, implemented, and monitored in accordance with those processes.

Wazuh helps meet the **TSC common criteria CC8.1** requirement by providing several capabilities for security configuration assessment, vulnerability detection, IT hygiene, and file integrity monitoring.

Use case: Monitoring installed packages using the IT Hygiene capability
----------------------------------------------------------------------------

This use case shows how Wazuh monitors system inventory on a Windows 11 endpoint and detects a vulnerable 7-Zip package.

Windows endpoint
^^^^^^^^^^^^^^^^^

#. Download and install 7-Zip. We used the `7z1900-x64.exe <https://www.7-zip.org/a/7z1900-x64.exe>`__ installer for this use case.

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Navigate to **IT Hygiene** > **Software** > **Packages**.

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

#. Navigate to **Vulnerability Detection** on your Wazuh **Overview** dashboard.

   .. thumbnail:: /images/compliance/tsc/common-criteria/overview-vulnerability-detection-card-windows.png
      :title: Wazuh Overview dashboard - Vulnerability Detection
      :alt: Wazuh Overview dashboard - Vulnerability Detection
      :align: center
      :width: 80%

#. Navigate to the **Inventory** section of the **Vulnerability Detection** dashboard and filter using the following parameters: ``package.name: 7-Zip 19.00 (x64)``

   .. thumbnail:: /images/compliance/tsc/common-criteria/vulnerability-detection-inventory-7zip-filter.png
      :title: Vulnerability Detection inventory filtered by 7-Zip
      :alt: Vulnerability Detection inventory filtered by 7-Zip
      :align: center
      :width: 80%

Wazuh contributes to the **CC8.1** requirement by maintaining an accurate, up-to-date record of the software installed on each monitored agent, along with the vulnerabilities it contains. This information is vital for understanding the overall system configuration, tracking licenses, and ensuring compliance. This information allows organizations to prioritize patching or mitigating vulnerable packages, reducing the risk of exploitation.
