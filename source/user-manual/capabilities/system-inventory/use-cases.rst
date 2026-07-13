.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following use cases show practical applications of visualizing system inventory data for security operations on the Wazuh dashboard.

Use cases
=========

The following use cases show practical applications of visualizing system inventory data for security operations on the Wazuh dashboard.

Use case 1: Resource monitoring
--------------------------------

Monitor memory usage across all endpoints to assess system performance and find devices with low available memory.

#. Click the menu icon, then navigate to **Security operations** > **IT Hygiene**.
#. Select the **System** tab and then **Hardware**.
#. Click **+ Add filter** and configure it as follows:

   -  **Field**: ``host.memory.free``
   -  **Operator**: ``exists``

   .. thumbnail:: /images/manual/system-inventory/use-case-resource-monitoring.jpg
      :title: Use case 1: Resource monitoring
      :alt: Use case 1: Resource monitoring
      :align: center
      :width: 80%

Use case 2: Vulnerability management
--------------------------------------

Identify endpoints with critical vulnerabilities in your environment and use the system inventory to locate every endpoint running the affected software.

#. Click the menu icon, then navigate to **Threat intelligence** > **Vulnerability Detection**.
#. Switch to the **Inventory** tab.
#. Click **+ Add filter** and configure it as follows:

   -  **Field**: ``vulnerability.severity``
   -  **Operator**: ``is``
   -  **Value**: ``Critical``

   The filtered view lists the vulnerable packages and the endpoints where they are installed.

   .. thumbnail:: /images/manual/system-inventory/use-case-2-vulnerability-management.jpg
      :title: Use case 2: Vulnerability management
      :alt: Use case 2: Vulnerability management
      :align: center
      :width: 80%

#. Note the name of an affected package. Click the menu icon, then navigate to **Security operations** > **IT Hygiene**.
#. Select the **Software** tab and then **Packages**.
#. Click **+ Add filter** and configure it as follows:

   -  **Field**: ``package.name``
   -  **Operator**: ``is``
   -  **Value**: ``openssl``. The name of the affected package.

   .. thumbnail:: /images/manual/system-inventory/it-hygiene-vulnerable-package.jpg
      :title: IT Hygiene - Vulnerable package
      :alt: IT Hygiene - Vulnerable package
      :align: center
      :width: 80%
