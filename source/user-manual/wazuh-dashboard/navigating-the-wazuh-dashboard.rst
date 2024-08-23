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

The Decoders section allows users to query existing decoders using :ref:`Wazuh Query Language <>` and manage custom decoders.

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
