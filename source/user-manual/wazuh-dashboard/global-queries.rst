.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh dashboard provides query capabilities to search, filter, analyze, and visualize security data collected from monitored endpoints. Learn more in this section of the documentation.

Querying security information on the Wazuh dashboard
====================================================

The Wazuh dashboard provides query capabilities that enable users to search, filter, analyze, and visualize security data collected from monitored endpoints. Users can query information related to system inventory, vulnerabilities, file integrity monitoring (FIM), security configuration assessments (SCA), and other security monitoring capabilities from a centralized interface. This information can be used to investigate security issues, assess compliance, monitor endpoint security posture, and support threat hunting activities. Much of this information is stored as Wazuh global state data, which represents the current state of all monitored endpoints and provides a consolidated view of endpoint security and compliance information.

Wazuh global state data
-----------------------

Wazuh global state data represents aggregated information collected from all monitored endpoints and stored centrally in the Wazuh indexer under dedicated indices. It provides a consolidated view of the current state of monitored systems, including system inventory, vulnerabilities, file integrity monitoring data, and security configuration assessment results.

Wazuh agents continuously collect and update this information from monitored endpoints. The data is processed and stored in dedicated ``wazuh-states-*`` indices, where it can be queried and visualized from the Wazuh dashboard. This centralized approach provides visibility into endpoint security and compliance information across the environment, improving monitoring efficiency, streamlining threat hunting, and accelerating incident response.

The following Wazuh capabilities collect and store information as global state data:

-  System inventory (IT Hygiene)
-  Vulnerability detection
-  File Integrity Monitoring (FIM)
-  Security Configuration Assessment (SCA)

System inventory (IT Hygiene)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

System inventory provides visibility into the hardware, software, network, and operating system information of monitored endpoints. It collects information such as installed software packages, running processes, open ports, network interfaces, users, groups, services, browser extensions, operating system details, and hardware characteristics.

Wazuh agents use the Syscollector module to periodically collect inventory information from monitored endpoints. The collected data is sent to the Wazuh manager, where it is processed and synchronized to the Wazuh indexer. The inventory information is stored as global state data in dedicated ``wazuh-states-inventory-*`` indices and can be queried and visualized from the Wazuh dashboard.

The following index patterns store system inventory data:

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Index pattern
     - Description
   * - ``wazuh-states-inventory-hardware-*``
     - Basic information about hardware components on a monitored endpoint.
   * - ``wazuh-states-inventory-hotfixes-*``
     - Updates installed on a Windows endpoint.
   * - ``wazuh-states-inventory-interfaces-*``
     - Status and packet transfer information for network interfaces.
   * - ``wazuh-states-inventory-networks-*``
     - IPv4 and IPv6 addresses for each network interface.
   * - ``wazuh-states-inventory-packages-*``
     - Currently installed software packages on an endpoint.
   * - ``wazuh-states-inventory-ports-*``
     - Open network ports on a monitored endpoint.
   * - ``wazuh-states-inventory-processes-*``
     - System processes running on a monitored endpoint.
   * - ``wazuh-states-inventory-protocols-*``
     - Network routing configuration details and protocols per interface.
   * - ``wazuh-states-inventory-system-*``
     - Operating system, hostname, and architecture on an endpoint.
   * - ``wazuh-states-inventory-browser-extensions-*``
     - Stores detected browser extensions and add-ons from supported browsers on monitored endpoints.
   * - ``wazuh-states-inventory-groups-*``
     - Stores information about groups configured on monitored endpoints.
   * - ``wazuh-states-inventory-services-*``
     - Stores information about system services detected on monitored endpoints, including Windows services, Linux systemd units, and macOS launchd services.
   * - ``wazuh-states-inventory-monitoring-*``
     - Stores Wazuh agent connection status history, including active, disconnected, pending, and never connected states.
   * - ``wazuh-states-inventory-users-*``
     - Stores information about users configured on monitored endpoints.

Navigate to **Security operations** > **IT Hygiene** on the Wazuh dashboard to view system inventory information, including hardware, operating system, software, network, user, and service data collected from monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/global-queries/system-inventory.png
   :align: center
   :width: 80%
   :title: System inventory on the Wazuh dashboard
   :alt: System inventory on the Wazuh dashboard

Vulnerability detection
^^^^^^^^^^^^^^^^^^^^^^^^

Vulnerability detection provides visibility into software vulnerabilities affecting monitored endpoints. It identifies vulnerable packages and applications by correlating endpoint inventory information with vulnerability data provided by the Wazuh Cyber Threat Intelligence (CTI) service, enabling security teams to prioritize remediation efforts and monitor the vulnerability posture of their environment.

The Wazuh agent collects inventory data such as installed packages, operating system details, and hardware information from monitored endpoints. The collected data is sent to the Wazuh manager, where the ``wazuh-remoted`` daemon publishes it to the Router inventory-states topic. The Inventory Sync module synchronizes the inventory state with the Wazuh indexer through the Indexer Connector and triggers the Vulnerability Scanner module.

The Vulnerability Scanner retrieves CVE feeds from the Wazuh indexer through the Content Manager and Indexer Connector. It then correlates the vulnerability information with the inventory data collected from monitored endpoints to identify affected systems and software packages. Vulnerability state information is stored as global state data in the ``wazuh-states-vulnerabilities-*`` index and can be queried and visualized from the Wazuh dashboard.

The following index pattern stores vulnerability detection data:

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Index pattern
     - Description
   * - ``wazuh-states-vulnerabilities-*``
     - Information about vulnerabilities detected on monitored endpoints.

Navigate to **Threat Intelligence** > **Vulnerability Detection** on the Wazuh dashboard to view and query vulnerability information collected from monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/global-queries/vulnerability-detection.png
   :align: center
   :width: 80%
   :title: Vulnerability detection on the Wazuh dashboard
   :alt: Vulnerability detection on the Wazuh dashboard

File integrity monitoring
^^^^^^^^^^^^^^^^^^^^^^^^^^

File Integrity Monitoring (FIM) provides visibility into changes made to monitored files, directories, and Windows registry entries. It helps security teams detect unauthorized modifications, track configuration changes, and monitor critical system files for signs of compromise or policy violations.

Wazuh agents continuously monitor configured files, directories, and registry entries on monitored endpoints. When a change is detected, the file integrity monitoring capability records information about the affected object, including its current state and relevant metadata. This information is synchronized to the Wazuh indexer and stored as Wazuh global state data.

FIM data can be queried and visualized from the Wazuh dashboard, providing centralized visibility into the integrity and status of monitored files and registry objects across the environment.

The following index patterns store file integrity monitoring data:

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Index pattern
     - Description
   * - ``wazuh-states-fim-registry-values-*``
     - Stores File Integrity Monitoring information about monitored Windows registry values.
   * - ``wazuh-states-fim-registry-keys-*``
     - Stores File Integrity Monitoring information about monitored Windows registry keys.
   * - ``wazuh-states-fim-files-*``
     - Stores File Integrity Monitoring information about monitored files and detected file changes.

Navigate to **Endpoint Security** > **File Integrity Monitoring** on the Wazuh dashboard to view and query file integrity monitoring data collected from monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/global-queries/file-integrity-monitoring.png
   :align: center
   :width: 80%
   :title: File integrity monitoring on the Wazuh dashboard
   :alt: File integrity monitoring on the Wazuh dashboard

Security Configuration Assessment (SCA)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Security Configuration Assessment (SCA) provides visibility into the security and compliance posture of monitored endpoints. It evaluates endpoint configurations against predefined security policies and benchmarks, helping organizations identify misconfigurations, verify compliance requirements, and monitor adherence to security best practices.

Wazuh agents perform SCA scans using policy files that contain security configuration checks. These checks evaluate files, directories, running processes, commands, and Windows registry settings against the defined policy requirements. The scan results are synchronized with the Wazuh manager and stored as Wazuh global state data in the Wazuh indexer.

SCA data can be queried and visualized from the Wazuh dashboard, providing centralized visibility into compliance status and security configuration findings across monitored endpoints.

The following index pattern stores Security Configuration Assessment data:

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Index pattern
     - Description
   * - ``wazuh-states-sca-*``
     - Stores Security Configuration Assessment (SCA) scan results and compliance evaluation data.

Navigate to **Endpoint Security** > **Configuration Assessment** on the Wazuh dashboard to view and query security configuration assessment (SCA) data collected from monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/global-queries/security-configuration-assessment.png
   :align: center
   :width: 80%
   :title: Security Configuration Assessment on the Wazuh dashboard
   :alt: Security Configuration Assessment on the Wazuh dashboard
