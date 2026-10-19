.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps security teams investigate incidents, respond to malware, contain threats with active response, and automate incident response workflows.

Incident response
=================

Incident response involves detecting, investigating, containing, and remediating security incidents to limit their impact on an organization. As environments generate increasing volumes of security events, security teams need centralized visibility and automated response capabilities to handle incidents efficiently.

Wazuh supports incident response by collecting security telemetry, generating findings from detected activity, and providing tools to investigate and respond to security incidents. The :doc:`Wazuh Active Response module </user-manual/capabilities/active-response/index>` automates predefined response actions when configured detection rules are triggered. Security teams can use these capabilities to investigate suspicious activity, contain threats, and automate repetitive response tasks.

Investigating security incidents
--------------------------------

Wazuh centralizes security findings from monitored endpoints and other configured data sources in the Wazuh dashboard. Security teams can search and filter findings by monitored endpoint, severity, event type, and other fields to investigate suspicious activity and identify affected assets.

The **Threat Hunting** section of the Wazuh dashboard shows security findings detected on monitored endpoints.

.. thumbnail:: /images/getting-started/use-cases/incident-response/security-findings.png
   :title: Threat Hunting section showing security findings detected on monitored endpoints
   :alt: Threat Hunting section showing security findings detected on monitored endpoints
   :align: center
   :width: 80%

The finding details provide additional information about the detected activity, helping security teams determine what happened and identify the systems involved.

.. thumbnail:: /images/getting-started/use-cases/incident-response/security-finding-details.png
   :title: Finding details showing the detected activity and the systems involved
   :alt: Finding details showing the detected activity and the systems involved
   :align: center
   :width: 80%

Responding to malware activity
------------------------------

Wazuh detects malware-related activity using capabilities such as :doc:`File Integrity Monitoring </user-manual/capabilities/file-integrity/index>`, threat intelligence, and security event analysis. Security teams can investigate the resulting findings and configure :doc:`Active Response </user-manual/capabilities/active-response/index>` to perform predefined actions when specific detection rules are triggered.

For example, an organization can configure a response to remove a known malicious file or block an associated source address. The **Threat Hunting** section on the Wazuh dashboard below shows the removal of the EICAR file downloaded to a Windows endpoint.

.. thumbnail:: /images/getting-started/use-cases/incident-response/eicar-file-removal-finding.png
   :title: Threat Hunting section showing the removal of the EICAR file downloaded to a monitored endpoint
   :alt: Threat Hunting section showing the removal of the EICAR file downloaded to a monitored endpoint
   :align: center
   :width: 80%

The **Incident Response** section on the Wazuh dashboard shows the active response action that is triggered to remove the suspicious file.

.. thumbnail:: /images/getting-started/use-cases/incident-response/file-removal-response.png
   :title: Incident Response section showing the active response action that removed the suspicious file
   :alt: Incident Response section showing the active response action that removed the suspicious file
   :align: center
   :width: 80%

Containing threats with active response
---------------------------------------

Wazuh Active Response automatically executes configured actions when a detection rule matches specified activity. It can block a malicious IP address, disable a user account, or execute a custom script on the affected endpoint, depending on the configuration. Predefined containment actions reduce the time between threat detection and response, helping security teams contain threats more quickly.

The **Threat Hunting** section on the Wazuh dashboard below shows the detection of a cross-site scripting attack against a monitored Ubuntu endpoint.

.. thumbnail:: /images/getting-started/use-cases/incident-response/cross-site-scripting-finding.png
   :title: Threat Hunting section showing a cross-site scripting attack detected on an Ubuntu endpoint
   :alt: Threat Hunting section showing a cross-site scripting attack detected on an Ubuntu endpoint
   :align: center
   :width: 80%

The **Incident Response** section on the Wazuh dashboard shows the active response action that is triggered to block the IP address of the endpoint that initiated the attack.

.. thumbnail:: /images/getting-started/use-cases/incident-response/ip-block-response.png
   :title: Incident Response section showing the active response action that blocked the attacking IP address
   :alt: Incident Response section showing the active response action that blocked the attacking IP address
   :align: center
   :width: 80%

You can view details of active response findings, including the rule that triggered the response action and the IP address associated with the detected activity. These details help security teams understand why the response was triggered and investigate the associated activity.

.. thumbnail:: /images/getting-started/use-cases/incident-response/active-response-finding-details.png
   :title: Active response finding details showing the triggering rule and the associated IP address
   :alt: Active response finding details showing the triggering rule and the associated IP address
   :align: center
   :width: 80%

Monitoring response actions
---------------------------

Wazuh provides visibility into security findings and configured response activity, allowing security teams to investigate whether predefined response actions were triggered for detected threats. This information helps teams review incident handling and verify that configured response procedures operated as expected.

The **Dashboard** tab of the **Incident Response** section on the Wazuh dashboard below provides a summary of the active response actions triggered in your environment.

.. thumbnail:: /images/getting-started/use-cases/incident-response/incident-response-dashboard.png
   :title: Dashboard tab of the Incident Response section summarizing triggered active response actions
   :alt: Dashboard tab of the Incident Response section summarizing triggered active response actions
   :align: center
   :width: 80%

The **Responses** tab of the **Incident Response** section shows the active response actions triggered in your environment, allowing you to investigate any occurring incidents.

.. thumbnail:: /images/getting-started/use-cases/incident-response/responses-tab.png
   :title: Responses tab of the Incident Response section listing triggered active response actions
   :alt: Responses tab of the Incident Response section listing triggered active response actions
   :align: center
   :width: 80%

Automating incident response workflows
--------------------------------------

Organizations can create :ref:`custom detection rules <data_analysis_create_custom_rule>` and associate them with active response actions to automate repetitive response tasks. This process allows security teams to define specific actions for known threats while retaining control over which detections trigger automated responses.

Predefined automated tasks allow security teams to handle recurring response actions consistently and focus manual investigation on incidents that require further analysis.

