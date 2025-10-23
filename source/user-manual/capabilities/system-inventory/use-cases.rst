.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following use cases show practical applications of visualizing system inventory data for security operations on the Wazuh dashboard.

Use cases
=========

The following use cases show practical applications of visualizing system inventory data for security operations on the Wazuh dashboard.

Use case 1. Resource monitoring
-------------------------------

Monitor memory usage across all endpoints to assess system performance and find devices with low available memory.

#. Navigate to the **Security operations** tab and select **IT Hygiene**.
#. Select the **System** tab and then **Hardware**.
#. Click **+ Add filter** and configure it as follows:

   -  **Field**: ``host.memory.free``
   -  **Operator**: ``exists``

.. thumbnail:: /images/manual/system-inventory/use-case-resource-monitoring.png
   :title: Resource monitoring
   :alt: Resource monitoring
   :align: center
   :width: 80%

Use case 2: Vulnerability management
------------------------------------

Identify all endpoints running a specific software package to assess vulnerability exposure. In this example, we identify all endpoints running a vulnerable version of ``systemd ( CVE-2025-4598)``.

#. Click the **☰** icon and navigate to the **Security operations** tab and select **IT Hygiene**.
#. Select the **Software** tab and then **Packages**.
#. Click **+ Add filter** and configure it as follows:

   -  **Field**: ``package.name``
   -  **Operator**: ``is``
   -  **Value** is ``systemd``

   .. thumbnail:: /images/manual/system-inventory/use-case-it-hygiene-add-package-name.png
      :title: Add package
      :alt: Add package
      :align: center
      :width: 80%

#. Click the **☰** icon at the top left corner and navigate to **Threat intelligence** and select **Vulnerability Detection**.
#. Select the **Inventory** tab.
#. Click **+ Add filter** and configure it as follows:

   -  **Field**: ``package.name``
   -  **Operator**: ``is``
   -  **Value** is ``systemd``

   .. thumbnail:: /images/manual/system-inventory/use-case-vd-add-package-name.png
      :title: Add package name
      :alt: Add package name
      :align: center
      :width: 80%
