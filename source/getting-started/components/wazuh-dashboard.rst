.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh dashboard is a flexible and intuitive web interface for visualizing, analyzing, and managing security data.

Wazuh dashboard
===============

The Wazuh dashboard is a flexible and intuitive web interface for visualizing security data. It queries the Wazuh indexer to visualize alerts, events, and security analytics. It enables users to perform the following tasks.

-  Investigate events and alerts.
-  Wazuh manager configuration and API tooling.
-  Enforce role-based access control (RBAC) and single sign-on (SSO).
-  Manage Wazuh agents and enrollment workflows.
-  Health checks, notifications, and alerting integrations.
-  Custom branding.

Data visualization and analysis
-------------------------------

The Wazuh dashboard enables users to navigate security data collected from Wazuh agents and agentless devices. It includes dashboards for configuration assessment, threat hunting, malware detection, file integrity monitoring, IT hygiene, and regulatory compliance (for example, PCI DSS, GDPR, HIPAA, and NIST 800-53), among others. You can generate reports and create custom visualizations and dashboards.

.. thumbnail::  /images/getting-started/data-visualization.png 
   :align: center
   :width: 80% 
   :title: Data visualization
   :alt: Data visualization

Wazuh manager and indexer management
------------------------------------

The Wazuh dashboard provides a user interface to manage a Wazuh deployment. This includes monitoring the status, logs, and statistics of Wazuh components, configuring the Wazuh manager, and creating custom rules and decoders for log analysis and threat detection.

.. thumbnail::  /images/getting-started/platform-management.png
   :align: center
   :width: 100%
   :title: Wazuh manager and indexer management
   :alt: Wazuh manager and indexer management

Monitoring performance and cluster health of the Wazuh components.

.. thumbnail::  /images/getting-started/cluster-health.png
   :align: center
   :width: 100%
   :title: Wazuh components health monitoring
   :alt: Wazuh components health monitoring

Wazuh agents management
-----------------------

The Wazuh dashboard allows users to manage Wazuh agents in several ways including:

-  Deployment and registration
-  Centralized configuration
-  Grouping agents
-  Monitoring and troubleshooting agent status
-  Agent upgrades

.. thumbnail::  /images/getting-started/agents-monitoring.png 
   :align: center
   :width: 80% 
   :title: Wazuh agents management
   :alt: Wazuh agents management

.. thumbnail::  /images/getting-started/agent-upgrades.png
   :align: center
   :width: 80%
   :title: Agent upgrades
   :alt: Agent upgrades

For each monitored endpoint, users can define which Wazuh agent modules are enabled, which log files are read, which files are monitored for integrity changes, and which configuration checks are performed.

.. thumbnail::  /images/getting-started/agent-modules-config.png
   :align: center
   :width: 80%
   :title: Endpoint agent configuration
   :alt: Endpoint agent configuration

Notifications and alerting integrations
---------------------------------------

The Wazuh dashboard provides the ability to integrate external APIs and services for enhanced alerting, incident management, and threat intelligence capabilities. It supports integration with Slack, PagerDuty, Shuffle, and others.

.. thumbnail::  /images/getting-started/notifications-integrations.png
   :align: center
   :width: 100%
   :title: Notifications and alerting integrations
   :alt: Notifications and alerting integrations

Developer tools
---------------

The Wazuh dashboard includes a ruleset testing tool (Log Test) that processes log messages to show how they are decoded by the Wazuh Normalization engine and whether they match a detection rule. This tool is useful for testing custom decoders and rules.

.. thumbnail::  /images/getting-started/ruleset-test.png
   :align: center
   :width: 80% 
   :title: Log test
   :alt: Log test

The Wazuh dashboard also provides API consoles for interacting with the Wazuh manager API and the Wazuh indexer API. These consoles are used to manage Wazuh manager capabilities and interact with Wazuh indexer indices.

.. thumbnail::  /images/getting-started/api-consoles.png
   :align: center
   :width: 100%
   :title: API consoles
   :alt: API consoles
