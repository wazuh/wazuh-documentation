.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh manager is the central component of the Wazuh architecture. It transforms and enriches data from Wazuh agents and agentless devices.

Wazuh manager
=============

The Wazuh manager is the central component of the Wazuh architecture. It is responsible for transforming data received from :doc:`Wazuh agents </getting-started/components/wazuh-agent>` and agentless devices into standardized schema documents using the Wazuh Common Schema (WCS). The Wazuh manager then enriches this data with threat intelligence and forwards it to designated destinations, including the Wazuh indexer and other configured sources.

The Wazuh manager leverages multiple threat intelligence sources and enriches events with contextual data to enhance detection accuracy. This includes mapping events to the MITRE ATT&CK framework, detecting vulnerabilities with the Wazuh CTI service, and aligning findings with regulatory standards such as PCI DSS, GDPR, HIPAA, CIS benchmarks, and NIST 800-53. These capabilities provide security teams with actionable insights for threat hunting, vulnerability detection, and regulatory compliance monitoring.

Architecture
------------

The Wazuh manager includes the normalization engine, Wazuh manager API, agent enrollment service, agent connection service, cluster daemon, and indexer connector. It runs on Linux across physical endpoints, virtual machines, containers, or cloud instances.

The diagram below shows the Wazuh manager architecture and its components.

.. thumbnail:: /images/getting-started/server-architecture.png
   :title: Wazuh manager architecture
   :alt: Wazuh manager architecture
   :align: center
   :width: 80%

Components
----------

The Wazuh manager comprises several components listed below that have different functions, such as enrolling new Wazuh agents, validating the identity of each Wazuh agent, and encrypting the communications between the Wazuh agent and the Wazuh manager.

-  **Agent enrollment service:** Registers new Wazuh agents and generates and distributes unique authentication keys to each agent. It runs as a network service and supports TLS/SSL certificate-based authentication, or enrollment using a fixed password.

-  **Agent connection service:** Manages communication between Wazuh agents and the Wazuh manager. It validates Wazuh agent identities using enrollment keys, enforces encryption for secure data transfer, and enables centralized configuration management to push updated agent settings remotely.

-  **Normalization engine:** It transforms raw data received from the Wazuh agents and agentless devices into standardized schema documents. It decodes and enriches this data with threat intelligence. The normalization engine includes a built-in standard policy that covers all supported log sources and integrations. Each incoming event travels through the following ordered stages inside a policy:

   -  **Pre-filter** *(optional)*: Evaluated before decoding. If configured, events that do not satisfy the filter conditions are discarded immediately, avoiding unnecessary decoding work. If no pre-filter is configured, all events proceed to the decoding stage unconditionally.
   -  **Decoding**: Decoders normalize and extract fields from the raw event, mapping them to the Wazuh Common Schema (WCS). This stage is mandatory as every event must traverse the decoder tree.
   -  **Enrichment** *(optional)*: This stage involves plugins that augment the normalized event with additional context after decoding. Built-in plugins include GeoIP geolocation and Indicator of Compromise (IoC) matching. Enrichment can be fully disabled at the policy level. When disabled, the normalized event is passed directly to the next stage.
   -  **Post-filter** *(optional)*: Evaluated after enrichment (or after decoding if enrichment is disabled). If configured, events that do not satisfy the filter conditions are discarded before reaching the outputs. If no post-filter is configured, all events are forwarded unconditionally.
   -  **Outputs**: Sends the final processed events to configured destinations, such as ``wazuh-indexer`` or other downstream components.

-  **Wazuh manager API:** Provides a programmatic interface for interacting with the Wazuh manager. It allows administrators using the Wazuh dashboard or command line to perform the following, but not limited to:

   -  Managing, testing, and validating security policies.
   -  Querying geolocation data for an IP address.
   -  Managing events received from monitored endpoints.
   -  Getting the status of the raw event indexer.
   -  Testing log events.

-  **Wazuh cluster daemon:** Enables horizontal scaling by linking multiple Wazuh managers into a cluster. Using a load balancer provides high availability, fault tolerance, and load distribution.

-  **Indexer connector:** Forwards events from the Wazuh normalization engine to the Wazuh indexer.

Visit the :doc:`installation guide </installation-guide/wazuh-server/index>` to learn how to install the Wazuh manager.