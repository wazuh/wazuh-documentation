.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Navigating the Wazuh dashboard.

Navigating the Wazuh dashboard
==============================

The Wazuh dashboard is designed to provide an overview of security-related incidents and activities across your environment. It aggregates and visualizes data from multiple sources, enabling administrators and security analysts to identify, investigate, and respond to potential threats. The Wazuh dashboard features a user-friendly interface that provides dashboards for endpoint security, threat intelligence, security operations, security analytics, and cloud security.

The Wazuh dashboard also displays summaries of connected and disconnected Wazuh agents and highlights the severity levels of alerts triggered within the last 24 hours. In addition to monitoring and visualization capabilities, the Wazuh dashboard allows users to manage and configure various Wazuh platform settings from a centralized interface. It provides a user-friendly interface for Wazuh indexer, manager, dashboard, and agent management.

.. thumbnail:: /images/wazuh-dashboard/navigating/dashboards.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Dashboards
   :alt: Navigating the Wazuh dashboard: Dashboards

.. thumbnail:: /images/wazuh-dashboard/navigating/dashboards2.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Overview
   :alt: Navigating the Wazuh dashboard: Overview

Dashboards
----------

The Wazuh dashboard provides prebuilt visualizations and reports that help users monitor, analyze, and investigate security events across their environment. These dashboards present security, operational, and compliance data collected and processed by Wazuh. The Wazuh dashboard includes interactive dashboards for endpoint security, threat intelligence, security operations, cloud security, and security analytics. It also provides management interfaces for Wazuh agents and central components, including the Wazuh manager, indexer, and dashboard.

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

This section of the Wazuh dashboard provides dashboards for threat intelligence capabilities, including threat hunting, vulnerability detection, and MITRE ATT\&CK analysis.

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

This dashboard shows compliance monitoring data mapped to regulatory standards and security benchmarks, including PCI DSS, HIPAA, GDPR, and CIS controls.

.. thumbnail:: /images/wazuh-dashboard/navigating/security-operations-compliance.png
   :align: center
   :width: 80%
   :title: Regulatory compliance
   :alt: Regulatory compliance

Cloud security
^^^^^^^^^^^^^^

This section shows dashboards for monitoring cloud workloads, cloud service activity, security events, and compliance data across supported cloud platforms and services, including Docker, Amazon Web Services (AWS), Google Cloud, GitHub, Office 365, and Microsoft Graph Services.

.. thumbnail:: /images/wazuh-dashboard/navigating/cloud-security.png
   :align: center
   :width: 80%
   :title: Cloud security
   :alt: Cloud security

Security analytics
^^^^^^^^^^^^^^^^^^

Wazuh **Security Analytics** section provides options to manage the full lifecycle of log normalization and event-based detection. It centralizes the configuration of integrations, decoders, key-value databases (KVDBs), detectors, and detection rules within a unified interface. The **Security Analytics** dashboard also includes a log test tool that allows users to test Wazuh rules and decoders directly from the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/security-analytics.gif
   :align: center
   :width: 80%
   :title: Security analytics
   :alt: Security analytics

Integrations
~~~~~~~~~~~~

This section allows users to view and manage integrations available across the active spaces (Draft, Test, Custom, and Standard). An :ref:`integration <dashboard_configurations_integration>` is the top-level organizational unit in Security Analytics that groups related decoders and rules for a specific log source or use case. This section displays all integrations available across the active spaces, along with their status and associated metadata.

.. thumbnail:: /images/wazuh-dashboard/navigating/integrations.png
   :align: center
   :width: 80%
   :title: Integrations
   :alt: Integrations

Decoders
~~~~~~~~

The **Decoders** section allows users to query existing decoders and manage custom decoders.

.. thumbnail:: /images/wazuh-dashboard/navigating/decoders.png
   :align: center
   :width: 80%
   :title: Decoders
   :alt: Decoders

Key-Value Database (KVDB)
~~~~~~~~~~~~~~~~~~~~~~~~~

The **KVDB** section allows users to query existing KVDBs and manage custom KVDBs. A KVDB is a lookup table that can be referenced in the decoder or rule logic to enrich events with additional context. KVDB lists can act as either allow or deny lists and replace the Constant database lists used in Wazuh 4.x version.

.. thumbnail:: /images/wazuh-dashboard/navigating/kvdb.png
   :align: center
   :width: 80%
   :title: KVDB
   :alt: KVDB

Detectors
~~~~~~~~~

The **Detectors** section allows users to query existing detectors and manage custom detectors. A detector connects detection rules to a specific data source (an index or alias) and runs continuously to identify security findings. This allows organizations to apply specific detection logic to selected log sources for continuous threat monitoring.

.. thumbnail:: /images/wazuh-dashboard/navigating/detectors.png
   :align: center
   :width: 80%
   :title: Detectors
   :alt: Detectors

Rules
~~~~~

The **Rules** section allows users to query existing rules and manage custom rules.

.. thumbnail:: /images/wazuh-dashboard/navigating/rules.png
   :align: center
   :width: 80%
   :title: Rules
   :alt: Rules

Log test
~~~~~~~~

The Wazuh **Log Test** tool allows users to test Wazuh rules and decoders from the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/log-test.png
   :align: center
   :width: 80%
   :title: Log test
   :alt: Log test

Agents management
-----------------

Wazuh **Agents management** section offers options for managing agents, agent groups, and agent configurations.

.. thumbnail:: /images/wazuh-dashboard/navigating/agents-management.png
   :align: center
   :width: 80%
   :title: Agents management
   :alt: Agents management

Summary
^^^^^^^

This section shows details of monitored endpoints and options for deploying Wazuh agents.

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoints-summary.png
   :align: center
   :width: 80%
   :title: Endpoints summary
   :alt: Endpoints summary

Groups
^^^^^^

Users can view existing groups, create new endpoint groups, and organize endpoints based on these groups.

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoint-groups.png
   :align: center
   :width: 80%
   :title: Endpoint groups
   :alt: Endpoint groups

Server management
-----------------

Wazuh **Server Management** section provides options for managing the Wazuh manager and security configurations. It allows users to manage users, roles, policies, and review Wazuh manager logs on the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/server-management.png
   :align: center
   :width: 80%
   :title: Server management
   :alt: Server management

Status
^^^^^^

Users can view the status of different Wazuh daemons, the overall Wazuh agent status, Wazuh manager information, and more.

.. thumbnail:: /images/wazuh-dashboard/navigating/status.png
   :align: center
   :width: 80%
   :title: Status
   :alt: Status

Logs
^^^^

Logs stored in ``/var/wazuh-manager/logs/wazuh-manager.log`` in the Wazuh manager are shown in the section below.

.. thumbnail:: /images/wazuh-dashboard/navigating/logs.png
   :align: center
   :width: 80%
   :title: Logs
   :alt: Logs

Settings
^^^^^^^^

Users can modify the Wazuh manager configuration file located at ``/var/wazuh-manager/etc/ossec.conf`` from the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/settings.png
   :align: center
   :width: 80%
   :title: Settings
   :alt: Settings

Dev Tools
^^^^^^^^^

This section allows users to send queries using the Wazuh manager API. It can be used to retrieve information and perform operations related to agent management, security configuration, cluster management, file integrity monitoring, security events, inventory data, vulnerabilities, and other Wazuh platform features.

.. thumbnail:: /images/wazuh-dashboard/navigating/dev-tools.png
   :align: center
   :width: 80%
   :title: Dev Tools
   :alt: Dev Tools

Security
^^^^^^^^

This section provides role-based access control (RBAC) configuration options for the Wazuh platform. It allows administrators to manage internal users, roles, role mappings, and policies used to control access to Wazuh resources and features.

.. thumbnail:: /images/wazuh-dashboard/navigating/users-security.png
   :align: center
   :width: 80%
   :title: Security - Users
   :alt: Security - Users

The **Roles** tab shows the existing roles alongside the policies assigned to those roles. It also includes the option for creating users.

.. thumbnail:: /images/wazuh-dashboard/navigating/roles-security.png
   :align: center
   :width: 80%
   :title: Security - Roles
   :alt: Security - Roles

The **Policies** tab shows the policies that define the actions that can be performed by the internal users. These policies are assigned to roles.

.. thumbnail:: /images/wazuh-dashboard/navigating/policies-security.png
   :align: center
   :width: 80%
   :title: Security - Policies
   :alt: Security - Policies

The Roles mapping tab presents users with the option to assign different roles and policies to internal users.

.. thumbnail:: /images/wazuh-dashboard/navigating/roles-mapping-security.png
   :align: center
   :width: 80%
   :title: Security - Roles mapping
   :alt: Security - Roles mapping

Indexer management
------------------

The Wazuh indexer is a scalable search and analytics engine that stores and indexes events forwarded by the Wazuh manager, enabling near real-time data analysis. It manages threat intelligence updates, including decoders, detection rules, vulnerability feeds, and Indicators of Compromise (IoCs) from the Wazuh Cyber Threat Intelligence (CTI) platform.

.. thumbnail:: /images/wazuh-dashboard/navigating/indexer-management.png
   :align: center
   :width: 80%
   :title: Indexer management
   :alt: Indexer management

Index Management
^^^^^^^^^^^^^^^^

The **Indexer Management** section provides tools for managing the storage, organization, and lifecycle of data in the Wazuh indexer. It allows users to create and manage state management policies, indices, data streams, templates, aliases, rollup jobs, and transform jobs. Please see the Wazuh indexer documentation to find out more.

.. thumbnail:: /images/wazuh-dashboard/navigating/index-snapshot-management.png
   :align: center
   :width: 80%
   :title: Index management
   :alt: Index management

Snapshot Management
^^^^^^^^^^^^^^^^^^^

The **Snapshot Management** section provides tools for creating, storing, and managing backups of data in the Wazuh indexer. It allows users to configure snapshot policies for automated backups, view and manage existing snapshots, and configure snapshot repositories where snapshots are stored.

.. thumbnail:: /images/wazuh-dashboard/navigating/snapshot-management.png
   :align: center
   :width: 80%
   :title: Snapshot management
   :alt: Snapshot management

Security (Indexer)
^^^^^^^^^^^^^^^^^^

This section includes the configuration for access to Wazuh resources based on the roles and permissions assigned to the users. Please see the Wazuh RBAC documentation to find out more.

.. thumbnail:: /images/wazuh-dashboard/navigating/security-indexer.png
   :align: center
   :width: 80%
   :title: Security - Indexer
   :alt: Security - Indexer

Dev Tools
^^^^^^^^^

This section allows users to send queries using the Wazuh indexer API. It can be used for indexer operations such as cluster management, querying index data, troubleshooting issues, and debugging errors.

.. thumbnail:: /images/wazuh-dashboard/navigating/dev-tools2.png
   :align: center
   :width: 80%
   :title: Dev Tools - Indexer
   :alt: Dev Tools - Indexer

Settings
^^^^^^^^

This section allows you to enable or disable indexing of raw events into the ``wazuh-events-raw-v5`` indices. The ``wazuh-events-raw-v5\*`` index stores all events received from the Wazuh manager regardless of whether they trigger an alert. In Wazuh 4.x, similar data was stored in the ``wazuh-archives-\*`` indices.

.. thumbnail:: /images/wazuh-dashboard/navigating/settings-indexer.png
   :align: center
   :width: 80%
   :title: Settings - Indexer
   :alt: Settings - Indexer

Dashboard management
--------------------

The Wazuh Dashboard Management section includes the options for creating and managing your index patterns, data sources, saved objects, and advanced settings you can make to your Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/dashboards-management.png
   :align: center
   :width: 80%
   :title: Dashboard management
   :alt: Dashboard management

Data sources
^^^^^^^^^^^^

The Data sources section allows you to manage direct query data source connections.

.. thumbnail:: /images/wazuh-dashboard/navigating/data-sources.png
   :align: center
   :width: 80%
   :title: Data sources
   :alt: Data sources

Saved Objects
^^^^^^^^^^^^^

The Saved Objects section allows users to query, import, and export existing saved objects.

.. thumbnail:: /images/wazuh-dashboard/navigating/saved-objects.png
   :align: center
   :width: 80%
   :title: Saved objects
   :alt: Saved objects

Advanced settings
^^^^^^^^^^^^^^^^^

The **Advanced Settings** section provides options for customizing the behavior and appearance of the Wazuh dashboard. Users can configure settings related to features such as Detection Insights, Discover, Notifications, Search, Timeline, VisBuilder, Visualization, as well as dashboard appearance and user experience preferences. These settings help tailor the dashboard to specific monitoring, analysis, and operational requirements.

.. thumbnail:: /images/wazuh-dashboard/navigating/advanced-settings.png
   :align: center
   :width: 80%
   :title: Advanced settings
   :alt: Advanced settings