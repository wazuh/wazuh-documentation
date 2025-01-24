.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Integrate Microsoft Intune with Wazuh to enhance security monitoring, process audit logs, generate actionable alerts, and ensure compliance with device administration policies for improved endpoint visibility.

Microsoft Intune integration
============================

Microsoft Intune is a cloud-based solution for managing various devices, including virtual endpoints, physical computers, mobile devices, and IoT devices. Integrating Microsoft Intune with Wazuh provides the following benefits:

-  It allows Wazuh to retrieve and process audit logs from managed devices using built-in decoders and rules, and generate insightful and actionable security alerts.
-  It enhances visibility into all managed endpoint activities, strengthening security monitoring across the organization.
-  It helps organizations ensure device administration aligns with compliance requirements, thus helping with maintaining security policies.

Wazuh integration with Microsoft Intune is available from Wazuh 4.10.0 and builds on the existing :doc:`Microsoft Graph API integration <monitoring-ms-graph>`. It operates synchronously, retrieving logs from managed endpoints at scheduled intervals. This integration allows the Wazuh agent to collect and process three types of data from Intune:

-  **Audit events**: Logs of actions and changes occurring within the Intune environment.
-  **Managed devices**: Information about devices managed by Intune.
-  **Detected applications**: Applications installed on managed devices as reported by Intune.

The configuration of this integration is handled via the Wazuh module for Microsoft Graph in the Wazuh agent. You must configure the ``deviceManagement`` resource (i.e., specific API endpoint) on the Wazuh agent with the following relationships to enable the integration:

-  ``auditEvents``: Audit logs include a record of activities that generate a change in Microsoft Intune.
-  ``managedDevices``: List of devices managed by Microsoft Intune.
-  ``detectedApps``: List of applications managed by Microsoft Intune. The results will also include a list of devices where each app is installed.

Refer to the :doc:`ms-graph configuration reference </user-manual/reference/ossec-conf/ms-graph-module>` documentation for more information.
