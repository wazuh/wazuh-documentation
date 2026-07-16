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

#. Update or uninstall the vulnerable software packages.

Use case 3: Detecting new software installations
------------------------------------------------

Identify new software installed across your fleet to catch potential unauthorized or shadow-IT applications shortly after they appear.

#. Click the menu icon, then navigate to **Threat intelligence** > **Threat Hunting**.
#. Switch to the **Findings** tab.
#. Click **+ Add filter** and configure it as follows:

   -  **Field**: ``wazuh.rule.title``
   -  **Operator**: ``is``
   -  **Value**: ``Wazuh IT Hygiene - Item created``

#. Add a second filter:

   -  **Field**: ``event.action``
   -  **Operator**: ``is``
   -  **Value**: ``package-installed``

   .. thumbnail:: /images/manual/system-inventory/use-case-3-detecting-new-software-installations.png
      :title: Detecting new software installations
      :alt: Detecting new software installations
      :align: center
      :width: 80%

   The filtered view lists every package installation across your fleet as it is detected, including the endpoint, the package name, and the installation time.

#. To see the full installation history of a specific package, note its name and pivot to **Security operations** > **IT Hygiene** > **Software** > **Packages**, then filter on ``package.name``.

   .. thumbnail:: /images/manual/system-inventory/package-installation-history.png
      :title: Package installation history across endpoints
      :alt: Package installation history across endpoints
      :align: center
      :width: 80%

Use case 4: Auditing privileged account hygiene
-----------------------------------------------

Review user accounts for unexpected privileged group membership.

#. Click the menu icon, then navigate to **Security operations** > **IT Hygiene**.
#. Select the **Identity** tab and then **Groups**.
#. Click **+ Add filter** and configure it as follows:

   -  **Field**: ``group.name``
   -  **Operator**: ``is``
   -  **Value**: A group name associated with administrative access in your environment. In this case ``Administrators``

   The filtered view shows every account which is a member of the ``Administrators`` group.

   .. thumbnail:: /images/manual/system-inventory/use-case-4-privileged-group-membership.jpg
      :title: Privileged group membership
      :alt: Privileged group membership
      :align: center
      :width: 80%

Use case 5: Reviewing open ports and attack surface
---------------------------------------------------

Find endpoints with unexpected listening services to reduce your attack surface.

#. Click the menu icon, then navigate to **Security operations** > **IT Hygiene**.
#. Select the **Network** tab and then **Listeners**.
#. Click **+ Add filter** and configure it as follows:

   -  **Field**: ``source.ip``
   -  **Operator**: ``is``
   -  **Value**: ``0.0.0.0``

   The filtered view shows every listening socket bound to all network interfaces, rather than only localhost, across your fleet. Sockets bound this way are reachable from other machines on the network and deserve closer review.

   .. thumbnail:: /images/manual/system-inventory/use-case-5-listening-services.jpg
      :title: Listening services bound to all interfaces
      :alt: Listening services bound to all interfaces
      :align: center
      :width: 80%
