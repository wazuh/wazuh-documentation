.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Navigating the Wazuh dashboard.

Navigating the Wazuh dashboard
==============================

Dashboards
----------

The Wazuh dashboard is designed to provide an overview of security-related incidents and activities in your environment in real-time. The Wazuh dashboard aggregates and visualizes data from different sources, enabling administrators and security analysts to identify and respond to potential threats. It features a user-friendly interface that displays dashboards for endpoint security, threat intelligence, security operations and cloud security. It also shows the summary for the connected or disconnected Wazuh agents, and highlights the severity levels of alerts triggered within the last 24 hours.

.. thumbnail:: /images/wazuh-dashboard/navigating/dashboards.gif
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Dashboards
   :alt: Navigating the Wazuh dashboard: Dashboards

Endpoint security
^^^^^^^^^^^^^^^^^

This section shows dashboards for:

-  :doc:`Configuration Assessment </user-manual/capabilities/sec-config-assessment/index>`
-  :doc:`Malware Detection </user-manual/capabilities/malware-detection/index>`
-  :doc:`File Integrity Monitoring </user-manual/capabilities/file-integrity/index>`

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoint-security.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Endpoint security
   :alt: Navigating the Wazuh dashboard: Endpoint security

Threat intelligence
^^^^^^^^^^^^^^^^^^^

This section shows dashboards for:

-  :doc:`Threat Hunting </getting-started/use-cases/threat-hunting>`
-  :doc:`Vulnerability Detection </user-manual/capabilities/vulnerability-detection/index>`
-  :doc:`MITRE ATT&CK </user-manual/ruleset/mitre>`
-  :doc:`VirusTotal </user-manual/capabilities/malware-detection/virus-total-integration>`

.. thumbnail:: /images/wazuh-dashboard/navigating/threat-intelligence.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Threat intelligence
   :alt: Navigating the Wazuh dashboard: Threat intelligence

Security operations
^^^^^^^^^^^^^^^^^^^

This section shows the dashboards for regulatory standards including:

-  :doc:`PCI DSS </compliance/pci-dss/index>`
-  :doc:`GDPR </compliance/gdpr/index>`
-  :doc:`HIPAA </compliance/hipaa/index>`
-  :doc:`NIST 800-53 </compliance/nist/index>`
-  :doc:`TSC </compliance/tsc/index>`

.. thumbnail:: /images/wazuh-dashboard/navigating/security-operations.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Security operations
   :alt: Navigating the Wazuh dashboard: Security operations

Cloud security
^^^^^^^^^^^^^^

This section shows dashboards for:

-  :doc:`Docker </user-manual/capabilities/container-security/monitoring-docker>`
-  :doc:`Amazon Web Services </cloud-security/amazon/index>`
-  :doc:`Google Cloud </cloud-security/gcp/index>`
-  :doc:`GitHub </cloud-security/github/index>`
-  :doc:`Office 365 </cloud-security/office365/index>`

.. thumbnail:: /images/wazuh-dashboard/navigating/cloud-security.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Cloud security
   :alt: Navigating the Wazuh dashboard: Cloud security

Server management
-----------------

Wazuh server management offers options for managing rules, decoders, CDB lists, clusters, security configurations such as user, roles, policies and more. It also includes options for managing Wazuh agents installed on monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/navigating/server-management.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Server management
   :alt: Navigating the Wazuh dashboard: Server management

Endpoints Summary
^^^^^^^^^^^^^^^^^

This section shows details of monitored endpoints and options for deploying Wazuh agents.

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoints-summary.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Endpoints Summary
   :alt: Navigating the Wazuh dashboard: Endpoints Summary

Endpoint Groups
^^^^^^^^^^^^^^^

Users can view existing groups, create new endpoint groups, and organize endpoints based on these groups.

.. thumbnail:: /images/wazuh-dashboard/navigating/endpoint-groups.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Endpoint Groups
   :alt: Navigating the Wazuh dashboard: Endpoint Groups

Rules
^^^^^

The Rules section allows users to query existing rules using Wazuh Query Language and manage custom rules.

.. thumbnail:: /images/wazuh-dashboard/navigating/rules.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Rules
   :alt: Navigating the Wazuh dashboard: Rules

Decoders
^^^^^^^^

The Decoders section allows users to query existing decoders using :doc:`Wazuh Query Language <../wazuh-dashboard/queries>` and manage custom decoders.

.. thumbnail:: /images/wazuh-dashboard/navigating/decoders.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Decoders
   :alt: Navigating the Wazuh dashboard: Decoders

Constant Database (CDB) lists
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A CDB list is a text file you can use to save a list of users, file hashes, IP addresses, and domain names. :doc:`CDB lists </user-manual/ruleset/cdb-list>` can act as either allow or deny lists. You can learn more about CDB lists in the documentation.

.. thumbnail:: /images/wazuh-dashboard/navigating/cdb-lists.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: CDB lists
   :alt: Navigating the Wazuh dashboard: CDB lists

Status
^^^^^^

Users can view the status of different Wazuh daemons, the overall Wazuh agent status, Wazuh manager information, and more.

.. thumbnail:: /images/wazuh-dashboard/navigating/status.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Status
   :alt: Navigating the Wazuh dashboard: Status

Cluster
^^^^^^^

The **Cluster** section shows the information about your Wazuh cluster.

.. thumbnail:: /images/wazuh-dashboard/navigating/cluster.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Cluster
   :alt: Navigating the Wazuh dashboard: Cluster

Statistics
^^^^^^^^^^

Statistics of the **Listener Engine** and **Analysis Engine** of the Wazuh server are visible in this section.

.. thumbnail:: /images/wazuh-dashboard/navigating/statistics.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Statistics
   :alt: Navigating the Wazuh dashboard: Statistics

Logs
^^^^

Logs stored in ``/var/ossec/logs/ossec.log`` in the Wazuh manager are shown in the section below.

.. thumbnail:: /images/wazuh-dashboard/navigating/logs.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Logs
   :alt: Navigating the Wazuh dashboard: Logs

Settings
^^^^^^^^

Users can modify the Wazuh server configuration file located at ``/var/ossec/etc/ossec.conf`` from the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/settings.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Settings
   :alt: Navigating the Wazuh dashboard: Settings

Dev Tools
^^^^^^^^^

Users can make API calls to extract detailed information about security events, Wazuh agents, inventory, vulnerabilities, and more.

.. thumbnail:: /images/wazuh-dashboard/navigating/dev-tools.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Dev tools
   :alt: Navigating the Wazuh dashboard: Dev tools

Ruleset Test
^^^^^^^^^^^^

The **Ruleset Test** option allows users to test Wazuh rules from the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/ruleset-test.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Ruleset Test
   :alt: Navigating the Wazuh dashboard: Ruleset Test

Security
^^^^^^^^

This section includes the configurations for managing the internal users in Wazuh. It is available.

.. thumbnail:: /images/wazuh-dashboard/navigating/users-security.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Security: Users
   :alt: Navigating the Wazuh dashboard: Security: Users

The **Roles** tab shows the existing roles alongside the **Policies** assigned to those roles. It also includes the option for creating users.

.. thumbnail:: /images/wazuh-dashboard/navigating/roles-security.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Security: Roles
   :alt: Navigating the Wazuh dashboard: Security: Roles

The **Policies** tab shows the policies that define the actions that can be performed by the internal users. These policies are assigned to **Roles**.

.. thumbnail:: /images/wazuh-dashboard/navigating/policies-security.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Security: Policies
   :alt: Navigating the Wazuh dashboard: Security: Policies

The **Roles mapping** tab presents users with the option to assign different roles and policies to internal users.

.. thumbnail:: /images/wazuh-dashboard/navigating/roles-mapping-security.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Security: Roles mapping
   :alt: Navigating the Wazuh dashboard: Security: Roles mapping

Indexer management
------------------

The Wazuh indexer is a real-time, full-text search and analytics engine for security data. Log data ingested into the Wazuh server is analyzed and forwarded to the Wazuh indexer for indexing and storage.

.. thumbnail:: /images/wazuh-dashboard/navigating/indexer-management.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Indexer management
   :alt: Navigating the Wazuh dashboard: Indexer management

Index and Snapshot Management
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer management menu provides a graphical user interface for managing your Wazuh indexers, snapshots, and the security of who or what has access to them. Please see the :doc:`Wazuh indexer </user-manual/wazuh-indexer/index>` documentation to find out more.

.. thumbnail:: /images/wazuh-dashboard/navigating/index-snapshot-management.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Index and snapshot management
   :alt: Navigating the Wazuh dashboard: Index and snapshot management

Security
^^^^^^^^

This section includes the configuration for access to Wazuh resources based on the roles and permissions assigned to the users. Please see the :doc:`Wazuh RBAC </user-manual/user-administration/rbac>` documentation to find out more.

.. thumbnail:: /images/wazuh-dashboard/navigating/security.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Security
   :alt: Navigating the Wazuh dashboard: Security

Sample Data
^^^^^^^^^^^

This section gives you the option of adding sample data to any of the listed modules. These data can be seen on the module dashboard, giving you insight into how these modules can be utilized to your benefit.

.. thumbnail:: /images/wazuh-dashboard/navigating/sample-data.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Sample data
   :alt: Navigating the Wazuh dashboard: Sample data

Dev Tools
^^^^^^^^^

This section allows you to make API queries for Wazuh indexer operations, such as cluster management, exploring indexer data, debugging errors, and more.

.. thumbnail:: /images/wazuh-dashboard/navigating/dev-tools2.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Dev tools
   :alt: Navigating the Wazuh dashboard: Dev tools

Dashboard management
--------------------

Dashboard Management
^^^^^^^^^^^^^^^^^^^^

The Wazuh **Dashboard Management** section includes the options for creating and managing your index patterns and saved objects.

.. thumbnail:: /images/wazuh-dashboard/navigating/dashboards-management.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Dashboards management
   :alt: Navigating the Wazuh dashboard: Dashboards management

Reporting
^^^^^^^^^

The reporting section shows your generated reports.

.. thumbnail:: /images/wazuh-dashboard/navigating/reporting.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: Reporting
   :alt: Navigating the Wazuh dashboard: Reporting

Server APIs
^^^^^^^^^^^

In this section, you can list all your inserted API credentials. Each entry has multiple available actions to manage it. Remember that a functional API is needed to add or edit an entry. Check your API connection status before adding them to the Wazuh dashboard.

.. thumbnail:: /images/wazuh-dashboard/navigating/api-connections.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: API connections
   :alt: Navigating the Wazuh dashboard: API connections

Users can also receive notifications when a new Wazuh update is available, with the option to dismiss these notifications. You can opt out of future alerts by checking the **Disable updates notifications** option.

App Settings
^^^^^^^^^^^^

The **Configuration** tab gives a quick look at the Wazuh dashboard configuration file. It also allows the user to modify the Wazuh dashboard settings. The documentation for the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file can be found in the :doc:`Wazuh dashboard settings <settings>` section.

.. thumbnail:: /images/wazuh-dashboard/navigating/app-settings.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: App settings - Configuration
   :alt: Navigating the Wazuh dashboard: App settings - Configuration

From the **Miscellaneous** tab, you can run a health check on the Wazuh components.

.. thumbnail:: /images/wazuh-dashboard/navigating/app-settings2.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: App settings - Miscellaneous
   :alt: Navigating the Wazuh dashboard: App settings - Miscellaneous

About
^^^^^

This section provides information about your currently installed Wazuh dashboard package, such as version, revision, and installation date. If you want to discover what's new on each release, you can go to our `Changelog file <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v|WAZUH_CURRENT|/CHANGELOG.md>`__ to check it out.

.. thumbnail:: /images/wazuh-dashboard/navigating/about.png
   :align: center
   :width: 80%
   :title: Navigating the Wazuh dashboard: About
   :alt: Navigating the Wazuh dashboard: About
