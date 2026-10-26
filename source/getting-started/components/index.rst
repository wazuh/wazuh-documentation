.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: The Wazuh components are the Wazuh agent, the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard.

Components
==========

The Wazuh platform provides XDR and SIEM features to protect your cloud, container, and server workloads. These include log data analysis, intrusion and malware detection, file integrity monitoring, configuration assessment, vulnerability detection, IT hygiene, and support for regulatory compliance.

The Wazuh solution consists of the Wazuh agent, which runs on monitored endpoints, and three central components. These are the Wazuh indexer, the Wazuh manager, and the Wazuh dashboard.

-  The :doc:`Wazuh indexer <wazuh-indexer>` is a highly scalable, full-text search and analytics engine. It serves as the central data store for the Wazuh platform. It indexes and stores security events, findings, vulnerability data, and system inventory. Purpose-built plugins provide access control, reporting, threat detection, and content management. Managed content includes rules, decoders, integrations, key-value databases (KVDBs), and indicators of compromise (IoCs). Near real-time search and analytics help security teams investigate threats, monitor compliance, and gain visibility into their infrastructure.
-  The :doc:`Wazuh manager <wazuh-manager>` transforms raw data received from Wazuh agents into standardized schema documents using the Wazuh Common Schema (WCS). It decodes and enriches this data with threat intelligence and forwards it to the Wazuh indexer and other defined outputs. A single Wazuh manager processes data from hundreds or thousands of Wazuh agents. Multiple Wazuh manager nodes form a cluster to scale horizontally.
-  The :doc:`Wazuh dashboard <wazuh-dashboard>` provides the user interface for configuring the Wazuh manager and viewing analyzed security data. It also supports the management of the Wazuh agent configuration, health status, notifications, and alerting integrations. Out-of-the-box dashboards cover threat hunting, regulatory compliance, detected vulnerable applications, file integrity monitoring data, configuration assessment results, and cloud infrastructure monitoring events.
-  The :doc:`Wazuh agent <wazuh-agent>` runs on operating systems such as Linux, Windows, and macOS to provide threat prevention, detection, and response capabilities. You install the Wazuh agent on endpoints such as laptops, desktops, servers, cloud instances, or virtual machines.

The Wazuh platform also monitors devices that can't run a Wazuh agent, such as firewalls, switches, routers, or network intrusion detection systems (IDS). These devices send syslog messages to a collection endpoint, where a Wazuh agent reads them and forwards them to the Wazuh manager.

The diagram below represents the Wazuh components and data flow.

.. thumbnail:: /images/getting-started/components-data-flow.jpg
   :title: Wazuh components and data flow
   :alt: Wazuh components and data flow
   :align: center
   :width: 80%

.. toctree::
   :maxdepth: 1
   :hidden:
    
   wazuh-indexer
   wazuh-manager
   wazuh-dashboard
   wazuh-agent
