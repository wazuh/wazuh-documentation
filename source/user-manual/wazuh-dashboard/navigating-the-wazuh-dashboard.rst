.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to navigate the Wazuh dashboard, from endpoint security and ruleset management dashboards to agents, server, indexer, and dashboard management.

Navigating the Wazuh dashboard
==============================

The Wazuh dashboard is designed to provide an overview of security-related incidents and activities across your environment. It aggregates and visualizes data from multiple sources, enabling administrators and security analysts to identify, investigate, and respond to potential threats. The Wazuh dashboard features a user-friendly interface that provides dashboards for endpoint security, threat intelligence, security operations, ruleset management, and cloud security.

The Wazuh dashboard provides an overview of the security posture of monitored environments. It summarizes Wazuh agent status, security findings, and MITRE ATT&CK activity, providing quick access to the corresponding dashboard sections for further investigation.

It also presents information across Wazuh capabilities, including configuration assessment, file integrity monitoring, malware detection, threat hunting, vulnerability detection, IT hygiene, incident response, and regulatory compliance. It also provides information about available threat intelligence content and access to supported cloud and SaaS integrations.

.. thumbnail:: /images/wazuh-dashboard/navigating/dashboards.png
   :align: center
   :width: 80%
   :title: Wazuh dashboard Overview
   :alt: Wazuh dashboard Overview

Dashboards
----------

The Wazuh dashboard provides prebuilt visualizations and reports that help users monitor, analyze, and investigate security events across their environment. These dashboards present security, operational, and compliance data collected and processed by Wazuh. The Wazuh dashboard includes interactive dashboards for endpoint security, threat intelligence, security operations, cloud security, and ruleset management. It also provides management interfaces for Wazuh agents and central components, including the Wazuh manager, indexer, and dashboard.

Click **☰** to open the menu. **Home** contains **Overview** and **AI Assistant**. **Explore** contains **Discover**, **Dashboards**, **Visualize**, **Reporting**, **Alerting**, **Maps**, **Notifications**, and **Active Responses**. The following sections describe the other menu groups.

Endpoint security
^^^^^^^^^^^^^^^^^

This section of the Wazuh dashboard provides dashboards for endpoint security capabilities, including configuration assessment, malware detection, and file integrity monitoring.

Configuration Assessment
~~~~~~~~~~~~~~~~~~~~~~~~

This dashboard shows configuration assessment results, compliance status, failed checks, and security policy violations detected across monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoint-security.png
   :align: center
   :width: 80%
   :title: Configuration Assessment
   :alt: Configuration Assessment

Malware detection
~~~~~~~~~~~~~~~~~

This dashboard shows malware detection events, threat intelligence matches, malicious file activity, and other indicators of compromise detected on monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoint-security-malware.png
   :align: center
   :width: 80%
   :title: Malware detection
   :alt: Malware detection

File integrity monitoring
~~~~~~~~~~~~~~~~~~~~~~~~~

This dashboard shows file activity over time, monitored file inventory, and events related to changes in monitored files and directories.

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoint-security-fim.png
   :align: center
   :width: 80%
   :title: File integrity monitoring
   :alt: File integrity monitoring

Threat intelligence
^^^^^^^^^^^^^^^^^^^

This section of the Wazuh dashboard provides dashboards for threat intelligence capabilities, including threat hunting, MITRE ATT\&CK analysis, vulnerability detection, and case management. The **Case Management** dashboard shows investigation cases by status, severity, and priority on its **Cases** tab.

Threat Hunting
~~~~~~~~~~~~~~

This dashboard provides visibility into security events and suspicious activity to support proactive threat investigation and analysis.

.. thumbnail:: /images/wazuh-dashboard/navigating/threat-intelligence-hunting.png
   :align: center
   :width: 80%
   :title: Threat Hunting
   :alt: Threat Hunting

Vulnerability detection
~~~~~~~~~~~~~~~~~~~~~~~

This dashboard shows detected vulnerabilities, affected endpoints, severity levels, and remediation-related information across monitored systems.

.. thumbnail:: /images/wazuh-dashboard/navigating/threat-intelligence-vuln.png
   :align: center
   :width: 80%
   :title: Vulnerability detection
   :alt: Vulnerability detection

MITRE ATT\&CK
~~~~~~~~~~~~~

This dashboard maps detected security events and techniques to the MITRE ATT\&CK framework to support threat analysis and adversary behavior tracking.

.. thumbnail:: /images/wazuh-dashboard/navigating/threat-intelligence-mitre.png
   :align: center
   :width: 80%
   :title: MITRE ATT&CK
   :alt: MITRE ATT&CK

Security operations
^^^^^^^^^^^^^^^^^^^

This section shows dashboards for IT hygiene data, such as system inventory and vulnerabilities, as well as regulatory standards.

IT Hygiene
~~~~~~~~~~

This dashboard shows IT hygiene data, including system inventory information, installed packages, running processes, open ports, and detected vulnerabilities across monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/navigating/security-operations-it-hygiene.png
   :align: center
   :width: 80%
   :title: IT Hygiene
   :alt: IT Hygiene

Regulatory compliance
~~~~~~~~~~~~~~~~~~~~~

This dashboard shows compliance monitoring data mapped to regulatory frameworks: PCI DSS, CMMC, FedRAMP, GDPR, HIPAA, ISO 27001, NIS2, NIST 800-53, NIST 800-171, and TSC.

.. thumbnail:: /images/wazuh-dashboard/navigating/security-operations-compliance.png
   :align: center
   :width: 80%
   :title: Regulatory compliance
   :alt: Regulatory compliance

Incident response
~~~~~~~~~~~~~~~~~

This dashboard shows incident response activity, including the actions that active response scripts perform on monitored endpoints. The image below shows the **Responses** tab with the responses recorded after an active response script ran on a monitored endpoint.

.. thumbnail:: /images/wazuh-dashboard/navigating/security-operations-incident-response.png
   :align: center
   :width: 80%
   :title: Incident response
   :alt: Incident response

Cloud security
^^^^^^^^^^^^^^

This section shows dashboards for monitoring cloud workloads, cloud service activity, security events, and compliance data across supported cloud platforms and services, including Docker, Amazon Web Services (AWS), Google Cloud, GitHub, Office 365, and Microsoft Graph API.

.. thumbnail:: /images/wazuh-dashboard/navigating/cloud-security.png
   :align: center
   :width: 80%
   :title: Cloud security
   :alt: Cloud security

Ruleset management
^^^^^^^^^^^^^^^^^^

The **Ruleset management** section provides a centralized interface for managing integrations, decoders, key-value databases (KVDBs), detectors, and detection rules. It also includes a log test tool for testing Wazuh rules and decoders directly from the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/ruleset-management.png
   :align: center
   :width: 80%
   :title: Ruleset management
   :alt: Ruleset management

Overview
~~~~~~~~

The **Overview** page lists the integrations in the space you select in **Space** (Draft, Test, Custom, or Standard), with their status and associated metadata. An :ref:`integration <dashboard_configurations_integration>` is the top-level organizational unit in Ruleset Management that groups related decoders, KVDBs, and rules for a specific log source or use case.

.. thumbnail:: /images/wazuh-dashboard/navigating/integrations.png
   :align: center
   :width: 80%
   :title: Overview
   :alt: Overview

Decoders
~~~~~~~~

The **Decoders** section allows users to query existing decoders and manage custom decoders.

.. thumbnail:: /images/wazuh-dashboard/navigating/decoders.png
   :align: center
   :width: 80%
   :title: Decoders
   :alt: Decoders page of Ruleset management

KVDBs
~~~~~

The **KVDBs** section allows users to query existing Key-Value Databases and manage custom KVDBs. A KVDB is a lookup table that can be referenced in the decoder or rule logic to enrich events with additional context. KVDB lists can act as either allow or deny lists and replace the Constant database lists used in Wazuh 4.x.

.. thumbnail:: /images/wazuh-dashboard/navigating/kvdb.png
   :align: center
   :width: 80%
   :title: KVDBs
   :alt: KVDBs

Detectors
~~~~~~~~~

The **Detectors** section allows users to query existing detectors and manage custom detectors. A :ref:`Detector <dashboard_configurations_detectors>` connects detection rules to a specific data source (an index or alias) and runs continuously to identify security findings. This allows organizations to apply specific detection logic to selected log sources for continuous threat monitoring.

.. thumbnail:: /images/wazuh-dashboard/navigating/detectors.png
   :align: center
   :width: 80%
   :title: Detectors
   :alt: Detectors page of Ruleset management

Rules
~~~~~

The **Rules** section allows users to query existing rules and manage custom rules.

.. thumbnail:: /images/wazuh-dashboard/navigating/rules.png
   :align: center
   :width: 80%
   :title: Rules
   :alt: Rules page of Ruleset management

Log test
~~~~~~~~

The Wazuh **Log test** tool allows users to test Wazuh rules and decoders from the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/log-test.png
   :align: center
   :width: 80%
   :title: Log test
   :alt: Log test

Agents management
^^^^^^^^^^^^^^^^^

The **Agents management** section provides the **Summary**, **Groups**, and **Enrollment tokens** views for managing Wazuh agents.

.. thumbnail:: /images/wazuh-dashboard/navigating/agents-management.png
   :align: center
   :width: 80%
   :title: Agents management
   :alt: Agents management

Summary
~~~~~~~

This section provides an overview of monitored endpoints and agent management options. It lists every enrolled Wazuh agent with its IP address, group membership, operating system, version, and connection status.

You can view endpoint details, deploy Wazuh agents, organize them into groups, remove agents, upgrade agents, and perform actions on individual agents.

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoints-summary.png
   :align: center
   :width: 80%
   :title: Endpoints summary
   :alt: Endpoints summary

Groups
~~~~~~

This section describes how to manage agent groups from the Wazuh dashboard. An agent group organizes Wazuh agents that share a common purpose, such as a platform, location, or workload. Each group has a shared configuration that applies to every agent in the group.

You can create groups, assign agents to one or more groups, and edit each group's shared configuration. The Wazuh manager stores the shared configuration centrally, and each agent retrieves its group configuration through its connection to the Wazuh manager. In a Wazuh manager cluster, the master node distributes the shared configuration to worker nodes.

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoint-groups.png
   :align: center
   :width: 80%
   :title: Endpoint groups
   :alt: Endpoint groups

Enrollment tokens
~~~~~~~~~~~~~~~~~

This section describes how to manage enrollment tokens from the Wazuh dashboard. An enrollment token is a credential that a Wazuh 5.x agent uses to enroll with the Wazuh manager. It carries the Wazuh manager address, the pin of the certificate authority to trust, and an enrollment credential. By default, a token can enroll any number of agents. To limit it, set **Enrollments allowed** when you create the token.

The Wazuh dashboard manages tokens through the Wazuh manager API. You can create a token when deploying a new Wazuh agent, list active tokens, and revoke tokens that are no longer needed. Tokens expire after 30 days by default. In a Wazuh manager cluster, the master node creates, consumes, and revokes all tokens.

.. thumbnail:: /images/wazuh-dashboard/navigating/enrollment-tokens.png
   :align: center
   :width: 80%
   :title: Enrollment tokens
   :alt: Enrollment tokens

Server management
^^^^^^^^^^^^^^^^^

The **Server management** section provides options for managing the Wazuh manager and its security configuration. It includes **Status**, **Statistics**, **Logs**, **Settings**, **Dev Tools**, and **API access control**. Statistics shows Wazuh manager event-processing metrics, such as bytes and events received, events processed and dropped, events per second, and queue usage.

.. thumbnail:: /images/wazuh-dashboard/navigating/server-management.png
   :align: center
   :width: 80%
   :title: Server management
   :alt: Server management

Status
~~~~~~

Users can view the status of different Wazuh daemons, the overall Wazuh agent status, Wazuh manager information, and more.

.. thumbnail:: /images/wazuh-dashboard/navigating/status.png
   :align: center
   :width: 80%
   :title: Status
   :alt: Status page of Server management

Logs
~~~~

The **Logs** page shows the Wazuh manager log, ``/var/wazuh-manager/logs/wazuh-manager.log``. You can filter it by daemon, log level, and node, and turn on **Realtime** to follow new entries.

.. thumbnail:: /images/wazuh-dashboard/navigating/logs.png
   :align: center
   :width: 80%
   :title: Logs
   :alt: Logs page of Server management

Settings
~~~~~~~~

Users can modify the Wazuh manager configuration file located at ``/etc/wazuh-manager/wazuh-manager.conf`` from the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/settings.png
   :align: center
   :width: 80%
   :title: Settings
   :alt: Settings page of Server management

Dev Tools
~~~~~~~~~

This section allows users to send queries using the Wazuh manager API. It can be used to retrieve information and perform operations related to agent management, security configuration, cluster management, file integrity monitoring, security events, inventory data, vulnerabilities, and other Wazuh platform features.

.. thumbnail:: /images/wazuh-dashboard/navigating/dev-tools.png
   :align: center
   :width: 80%
   :title: Dev Tools
   :alt: Dev Tools

API access control
~~~~~~~~~~~~~~~~~~

This section provides role-based access control (RBAC) configuration options for the Wazuh platform. It allows administrators to manage Wazuh manager API users, roles, role mappings, and policies used to control access to Wazuh resources and features.

.. thumbnail:: /images/wazuh-dashboard/navigating/users-security.png
   :align: center
   :width: 80%
   :title: API access control - Users
   :alt: API access control - Users

The **Roles** tab shows the existing roles alongside the policies assigned to those roles. It also includes the option for creating roles.

.. thumbnail:: /images/wazuh-dashboard/navigating/roles-security.png
   :align: center
   :width: 80%
   :title: API access control - Roles
   :alt: API access control - Roles

The **Policies** tab shows the policies that define the actions that can be performed by Wazuh manager API users. These policies are assigned to roles.

.. thumbnail:: /images/wazuh-dashboard/navigating/policies-security.png
   :align: center
   :width: 80%
   :title: API access control - Policies
   :alt: API access control - Policies

The **Roles mapping** tab gives Wazuh roles to the users who sign in to the Wazuh dashboard. Each role mapping gives its roles to the users who match its rules, such as a user name, backend role, or indexer role.

.. thumbnail:: /images/wazuh-dashboard/navigating/roles-mapping-security.png
   :align: center
   :width: 80%
   :title: API access control - Roles mapping
   :alt: API access control - Roles mapping

Indexer management
^^^^^^^^^^^^^^^^^^

The Wazuh indexer is a scalable search and analytics engine that stores and indexes events forwarded by the Wazuh manager, enabling near real-time data analysis. It manages threat intelligence updates, including decoders, detection rules, vulnerability feeds, and Indicators of Compromise (IoCs) from the Wazuh Cyber Threat Intelligence (CTI) platform.

.. thumbnail:: /images/wazuh-dashboard/navigating/indexer-management.png
   :align: center
   :width: 80%
   :title: Indexer management
   :alt: Indexer management

Index Management
~~~~~~~~~~~~~~~~

The **Index Management** section provides tools for managing the storage, organization, and lifecycle of data in the Wazuh indexer. It allows users to create and manage state management policies, indices, data streams, templates, aliases, rollup jobs, and transform jobs. Please see the :doc:`Wazuh indexer </user-manual/wazuh-indexer/index>` documentation to find out more.

.. thumbnail:: /images/wazuh-dashboard/navigating/index-snapshot-management.png
   :align: center
   :width: 80%
   :title: Index management
   :alt: Index management

Snapshot Management
~~~~~~~~~~~~~~~~~~~

The **Snapshot Management** section provides tools for creating, storing, and managing backups of data in the Wazuh indexer. It allows users to configure snapshot policies for automated backups, view and manage existing snapshots, and configure snapshot repositories where snapshots are stored.

.. thumbnail:: /images/wazuh-dashboard/navigating/snapshot-management.png
   :align: center
   :width: 80%
   :title: Snapshot management
   :alt: Snapshot management

Users and data access
~~~~~~~~~~~~~~~~~~~~~

This section includes the configuration for access to Wazuh resources based on the roles and permissions assigned to the users. Please see the :doc:`Wazuh RBAC </user-manual/user-administration/rbac>` documentation to find out more.

.. thumbnail:: /images/wazuh-dashboard/navigating/security-indexer.png
   :align: center
   :width: 80%
   :title: Users and data access
   :alt: Users and data access

Dev Tools
~~~~~~~~~

This section allows users to send queries using the Wazuh indexer API. It can be used for indexer operations such as cluster management, querying index data, troubleshooting issues, and debugging errors.

.. thumbnail:: /images/wazuh-dashboard/navigating/dev-tools2.png
   :align: center
   :width: 80%
   :title: Dev Tools - Indexer
   :alt: Dev Tools - Indexer

Settings
~~~~~~~~

This section allows you to enable or disable indexing of raw events into the ``wazuh-events-raw-v5`` indices. The ``wazuh-events-raw-v5*`` index stores all events received from the Wazuh manager regardless of whether they trigger an alert. In Wazuh 4.x, similar data was stored in the ``wazuh-archives-*`` indices.

.. thumbnail:: /images/wazuh-dashboard/navigating/settings-indexer.png
   :align: center
   :width: 80%
   :title: Settings - Indexer
   :alt: Settings - Indexer

Dashboard management
^^^^^^^^^^^^^^^^^^^^

The **Dashboard management** section includes **Dashboards Management**, **Server API**, **About**, and **Health Check**. Dashboards Management includes the options for creating and managing index patterns, data sources, saved objects, and advanced settings. Server API shows the Wazuh manager API connection that the Wazuh dashboard uses and its status. About shows the Wazuh dashboard version. Health Check shows the results of the checks the Wazuh dashboard runs on its saved objects, index patterns, and Wazuh manager API connection.

.. thumbnail:: /images/wazuh-dashboard/navigating/dashboards-management.png
   :align: center
   :width: 80%
   :title: Dashboard management
   :alt: Dashboard management

Data sources
~~~~~~~~~~~~

The Data sources section allows you to manage direct query data source connections.

.. thumbnail:: /images/wazuh-dashboard/navigating/data-sources.png
   :align: center
   :width: 80%
   :title: Data sources
   :alt: Data sources

Saved Objects
~~~~~~~~~~~~~

The Saved Objects section allows users to query, import, and export existing saved objects.

.. thumbnail:: /images/wazuh-dashboard/navigating/saved-objects.png
   :align: center
   :width: 80%
   :title: Saved objects
   :alt: Saved objects

Advanced settings
~~~~~~~~~~~~~~~~~

The **Advanced Settings** section provides options for customizing the behavior and appearance of the Wazuh dashboard. The settings are grouped into General, Appearance, Discover, Notifications, Reporting, Search, Timeline, VisBuilder, and Visualization. These settings help tailor the dashboard to specific monitoring, analysis, and operational requirements.

.. thumbnail:: /images/wazuh-dashboard/navigating/advanced-settings.png
   :align: center
   :width: 80%
   :title: Advanced settings
   :alt: Advanced settings