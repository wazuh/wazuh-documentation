.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh supports the TSC common criteria CC7.1 by correlating endpoint inventory using the IT Hygiene and vulnerability detection capabilities.

Common criteria 7.1
=====================

The TSC **common criteria CC7.1** states that: *“To meet its objectives, the entity uses detection and monitoring procedures to identify (1) changes to configurations that result in the introduction of new vulnerabilities, and (2) susceptibilities to newly discovered vulnerabilities”.* This control indicates the depth and rigor required to monitor configuration changes. It ensures that changes do not introduce new vulnerabilities or make the system more susceptible to them.

Wazuh supports CC7.1 by correlating endpoint inventory using the :doc:`IT Hygiene </user-manual/capabilities/system-inventory/index>` and vulnerability detection capabilities. Wazuh helps meet this requirement with the :doc:`vulnerability detection </user-manual/capabilities/vulnerability-detection/index>` capability, which uses curated Wazuh CTI data to detect known vulnerabilities in the operating systems and software packages installed on monitored endpoints.

Use case: Detecting vulnerabilities on an Ubuntu endpoint
-------------------------------------------------------------

The use case below shows how Wazuh detects vulnerable packages on an Ubuntu 24.04 endpoint. You do not need to perform any actions because the Syscollector and Vulnerability Scanner modules are enabled by default on the Ubuntu endpoint and the Wazuh manager, respectively. Visit the :doc:`vulnerability detection guide </user-manual/capabilities/vulnerability-detection/index>` and :doc:`system inventory </user-manual/capabilities/system-inventory/index>` documentation for more information.

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Open the menu (**☰**) and go to **Threat intelligence** > **Vulnerability Detection**.

   .. thumbnail:: /images/compliance/tsc/common-criteria/overview-vulnerability-detection-card.png
      :title: Wazuh Overview dashboard - Vulnerability Detection
      :alt: Wazuh Overview dashboard - Vulnerability Detection
      :align: center
      :width: 80%

#. Select a severity level to view more details. In this case, we selected a **Critical** severity level.

   .. thumbnail:: /images/compliance/tsc/common-criteria/vulnerability-detection-critical-severity.png
      :title: Vulnerability Detection dashboard - Critical severity
      :alt: Vulnerability Detection dashboard - Critical severity
      :align: center
      :width: 80%

#. Select the **Inventory** section to view details regarding the selected severity level.

   .. thumbnail:: /images/compliance/tsc/common-criteria/vulnerability-detection-inventory.png
      :title: Vulnerability Detection inventory
      :alt: Vulnerability Detection inventory
      :align: center
      :width: 80%
