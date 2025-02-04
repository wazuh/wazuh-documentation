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

Configuration
-------------

Perform the following steps to integrate Microsoft Intune with Wazuh:

-  Configure the Microsoft Graph API permissions.
-  Configure the relationships.
-  Extend the Wazuh ruleset (optional).
-  Import custom dashboards.

Configure the Microsoft Graph API permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This integration allows Wazuh to pull data from the Microsoft Graph API. Before Wazuh can pull logs and other content from the Microsoft Graph API, it must be authorized and pass through an authentication process. Wazuh must provide the ``tenant_id``, ``client_id``, and ``secret_value`` of an authorized application that is registered through Azure.

This step involves configuring the API permissions required to access Microsoft Intune events via the Microsoft Graph API. The required permissions are:

-  ``DeviceManagementApps.Read.All``: Read ``auditEvents`` and ``detectedApps`` relationship data from your tenant.
-  ``DeviceManagementManagedDevices.Read.All``: Read ``auditEvents`` and ``managedDevices`` relationship data from your tenant.

.. thumbnail:: /images/cloud-security/azure/ms-intune/configuring-api-permissions.png
   :align: center
   :width: 80%

For further information, please refer to the :ref:`Microsoft Graph API setup <permissions-ms-graph-api-setup>` guide.

Configure the relationships
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The relationships ``auditEvents``, ``managedDevices``, and ``detectedApps`` need to be configured within the Wazuh module for Microsoft Graph in the Wazuh agent. This configuration enables Wazuh to search for logs created by Microsoft Graph resources and relationships.

In the example below, we search for ``auditEvents``, ``managedDevices``, and ``detectedApps`` type events within the ``deviceManagement`` resource at an interval of ``5m``. The logs will only be those that were created after the module was started.

Perform the following steps on the Wazuh agent:

#. Edit the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf`` and add the following to enable the Wazuh module for Microsoft Graph with the desired relationships:

   .. code-block:: xml
      :emphasize-lines: 10-12, 16-19

      <ossec_config>
        <ms-graph>
          <enabled>yes</enabled>
          <only_future_events>yes</only_future_events>
          <curl_max_size>10M</curl_max_size>
          <run_on_start>yes</run_on_start>
          <interval>5m</interval>
          <version>v1.0</version>
          <api_auth>
            <tenant_id><YOUR_TENANT_ID></tenant_id>
            <client_id><YOUR_CLIENT_ID></client_id>
            <secret_value><YOUR_SECRET_VALUE></secret_value>
            <api_type>global</api_type>
          </api_auth>
          <resource>
            <name>deviceManagement</name>
            <relationship>auditEvents</relationship>
            <relationship>managedDevices</relationship>
            <relationship>detectedApps</relationship>
          </resource>
        </ms-graph>
      </ossec_config>

   Replace:

   -  ``<YOUR_TENANT_ID>`` with the tenant ID of the application registered in Azure.
   -  ``<YOUR_CLIENT_ID>`` with the client ID of the application registered in Azure.
   -  ``<YOUR_SECRET_VALUE>`` with the secret associated with the application registered in Azure.

#. Save the changes and restart the Wazuh agent to effect the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

For more configuration details, refer to the :doc:`ms-graph configuration reference </user-manual/reference/ossec-conf/ms-graph-module>` documentation.

.. note::

   To avoid duplicate alerts, this setting should be added to only one Wazuh agent.

Extend the Wazuh ruleset
^^^^^^^^^^^^^^^^^^^^^^^^

You can extend the ruleset to customize the hierarchy of detection rules. The Wazuh manager includes a basic ruleset to detect events and inventory items collected by the Wazuh agent. To customize detection rules for Microsoft Intune data, extend the Wazuh ruleset by following the :doc:`ruleset customization documentation </user-manual/ruleset/rules/custom>`. This allows you to tailor the hierarchy and behavior of detection rules to meet specific requirements.

.. note::

   The Wazuh manager includes a set of inbuilt rules that aid in classifying the importance and context of different events.

The official rules associated with Microsoft Intune are:

.. code-block:: xml

   <group name="ms-graph,">
     <rule id="99651" level="3">
          <if_sid>99500</if_sid>
          <options>no_full_log</options>
          <field name="ms-graph.resource">deviceManagement</field>
          <description>MS Graph message: MDM Intune event.</description>
      </rule>

      <rule id="99652" level="3">
          <if_sid>99651</if_sid>
          <options>no_full_log</options>
          <field name="ms-graph.relationship">auditEvents</field>
          <description>MS Graph message: MDM Intune audit event.</description>
      </rule>

      <rule id="99653" level="3">
          <if_sid>99651</if_sid>
          <options>no_full_log</options>
          <field name="ms-graph.relationship">managedDevices</field>
          <description>MS Graph message: MDM Intune device.</description>
      </rule>

      <rule id="99654" level="3">
          <if_sid>99651</if_sid>
          <options>no_full_log</options>
          <field name="ms-graph.relationship">detectedApps</field>
          <description>MS Graph message: MDM Intune app.</description>
      </rule>
   </group>

The image below shows Microsoft Intune alerts generated on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/azure/ms-intune/ms-intune-alerts-on-wazuh-dashboard.png
   :align: center
   :width: 80%

Below, we show sample alerts for some of the relationships we configured previously.

**Sample alert for** ``detectedApps``:

In the example below, Microsoft Intune detects the application Freeform on one of the managed devices. As a result, the JSON below is generated:

.. code-block:: javascript

   {
     "_index": "wazuh-alerts-4.x-2025.01.21",
     "_id": "m3R0iZQBy8z-qvGHPpVH",
     "_score": null,
     "_source": {
       "input": {
         "type": "log"
       },
       "agent": {
         "ip": "X.X.X.X",
         "name": "Windows-10",
         "id": "001"
       },
       "manager": {
         "name": "wazuh-server"
       },
       "data": {
         "ms-graph": {
           "deviceCount": "1",
           "resource": "deviceManagement",
           "displayName": "Freeform",
           "managedDevices": [
             {
               "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
               "deviceName": "xxxxxxxx"
             }
           ],
           "id": "cb7d25a27a1d420817229d272fd27a039b4c330380fc29b2ccc1d3f01e1cfa78",
           "relationship": "detectedApps",
           "version": "2.0",
           "sizeInByte": "0",
           "platform": "macOS"
         },
         "integration": "ms-graph",
         "scan_id": "594315551"
       },
       "rule": {
         "firedtimes": 865,
         "mail": false,
         "level": 3,
         "description": "MS Graph message: MDM Intune app.",
         "groups": [
           "ms-graph"
         ],
         "id": "99654"
       },
       "location": "ms-graph",
       "decoder": {
         "name": "json-msgraph"
       },
       "id": "1737472881.2773328",
       "timestamp": "2025-01-21T15:21:21.941+0000"
     },
     "fields": {
       "timestamp": [
         "2025-01-21T15:21:21.941Z"
       ]
     },
     "sort": [
       1737472881941
     ]
   }

.. thumbnail:: /images/cloud-security/azure/ms-intune/detectedapps-sample-alert.png
   :align: center
   :width: 80%

**Sample alert for** ``managedDevices``:

In the example below, Microsoft Intune detects information about a managed device. As a result, the JSON below is generated:

.. code-block:: javascript

   {
     "_index": "wazuh-alerts-4.x-2025.01.21",
     "_id": "ynR3iZQBy8z-qvGHYZae",
     "_score": null,
     "_source": {
       "input": {
         "type": "log"
       },
       "agent": {
         "ip": "X.X.X.X",
         "name": "Windows-10",
         "id": "001"
       },
       "manager": {
         "name": "wazuh-server"
       },
       "data": {
         "ms-graph": {
           "azureADRegistered": "true",
           "deviceRegistrationState": "registered",
           "deviceActionResults": [],
           "easDeviceId": "XXXXXXXXXXXXXXXXXXX",
           "complianceState": "noncompliant",
           "partnerReportedThreatState": "unknown",
           "deviceName": "XXXXXXXXXXXXXXXXXXX",
           "operatingSystem": "Windows",
           "manufacturer": "HP",
           "osVersion": "10.0.22631.4037",
           "lastSyncDateTime": "2024-09-23T18:38:44Z",
           "isEncrypted": "false",
           "exchangeAccessStateReason": "none",
           "totalStorageSpaceInBytes": "478772461568.000000",
           "model": "HP Pavilion Laptop 15-cs0xxx",
           "wiFiMacAddress": "XXXXXXXXXXXXXXXXXXX",
           "id": "XXXXXXXXXXXXXXXXXXX",
           "managedDeviceOwnerType": "company",
           "exchangeLastSuccessfulSyncDateTime": "0001-01-01T00:00:00Z",
           "relationship": "managedDevices",
           "userPrincipalName": "XXXXXXXXXXXXXXXXXXX",
           "easActivationDateTime": "0001-01-01T00:00:00Z",
           "jailBroken": "Unknown",
           "serialNumber": "XXXXXX",
           "resource": "deviceManagement",
           "easActivated": "true",
           "exchangeAccessState": "none",
           "deviceEnrollmentType": "deviceEnrollmentManager",
           "userDisplayName": "Tomás",
           "freeStorageSpaceInBytes": "153643646976.000000",
           "managedDeviceName": "XXXXXXXXXXXXXXXXXXX",
           "userId": "XXXX-XXXX-XXXX-XXXXXXX",
           "managementAgent": "mdm",
           "isSupervised": "false",
           "azureADDeviceId": "XXXX-XXXX-XXXX-XXXXXXX",
           "deviceCategoryDisplayName": "Unknown",
           "physicalMemoryInBytes": "0",
           "managementCertificateExpirationDate": "2025-08-29T20:39:04Z",
           "complianceGracePeriodExpirationDateTime": "2024-10-23T23:52:11Z",
           "enrolledDateTime": "2024-08-30T19:48:53Z"
         },
         "integration": "ms-graph",
         "scan_id": "1365180664"
       },
       "rule": {
         "firedtimes": 6,
         "mail": false,
         "level": 3,
         "description": "MS Graph message: MDM Intune device.",
         "groups": [
           "ms-graph"
         ],
         "id": "99653"
       },
       "location": "ms-graph",
       "decoder": {
         "name": "json-msgraph"
       },
       "id": "1737473086.3097425",
       "timestamp": "2025-01-21T15:24:46.407+0000"
     },
     "fields": {
       "data.ms-graph.exchangeLastSuccessfulSyncDateTime": [
         "0001-01-01T00:00:00.000Z"
       ],
       "timestamp": [
         "2025-01-21T15:24:46.407Z"
       ],
       "data.ms-graph.enrolledDateTime": [
         "2024-08-30T19:48:53.000Z"
       ],
       "data.ms-graph.complianceGracePeriodExpirationDateTime": [
         "2024-10-23T23:52:11.000Z"
       ],
       "data.ms-graph.managementCertificateExpirationDate": [
         "2025-08-29T20:39:04.000Z"
       ],
       "data.ms-graph.lastSyncDateTime": [
         "2024-09-23T18:38:44.000Z"
       ],
       "data.ms-graph.easActivationDateTime": [
         "0001-01-01T00:00:00.000Z"
       ]
     },
     "sort": [
       1737473086407
     ]
   }

.. thumbnail:: /images/cloud-security/azure/ms-intune/manageddevices-sample-alert.png
   :align: center
   :width: 80%

Import custom dashboards
^^^^^^^^^^^^^^^^^^^^^^^^

Import the predefined dashboards to visualize Microsoft Intune alerts in the Wazuh dashboard. These dashboards are not configured out-of-the-box on Wazuh deployments and are provided as separate packages. Perform the following steps to import the Microsoft Intune dashboards:

#. Download the `MS graph Intune events <https://raw.githubusercontent.com/wazuh/wazuh-documentation/refs/heads/|WAZUH_CURRENT_MINOR|/resources/dashboards/MS-graph%20Intune%20events.ndjson>`__ and `Intune managed devices and apps <https://raw.githubusercontent.com/wazuh/wazuh-documentation/refs/heads/|WAZUH_CURRENT_MINOR|/resources/dashboards/MS-graph%20Intune%20managed%20devices%20and%20apps.ndjson>`__ dashboards.
#. Import the downloaded dashboards using the Wazuh dashboard import functionality. Navigate to **Dashboard management** > **Dashboards Management** > **Saved objects** on the Wazuh dashboard. Click **Import**.
#. Select one of the downloaded files and click on **Import**. Repeat this step for the other file.

   .. thumbnail:: /images/cloud-security/azure/ms-intune/import-saved-object.gif
      :align: center
      :width: 80%

#. Access the dashboards from the **Saved objects** tab. Alternatively, navigate to **Explore** > **Dashboards** to view the dashboards.

Dashboard examples
~~~~~~~~~~~~~~~~~~

.. thumbnail:: /images/cloud-security/azure/ms-intune/dahsboard-example1.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/azure/ms-intune/dahsboard-example2.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/azure/ms-intune/dahsboard-example3.png
   :align: center
   :width: 80%
