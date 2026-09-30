.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager is one of the three central components of the Wazuh architecture. It receives security data from Wazuh agents and agentless devices, processes it, and forwards it to the Wazuh indexer.

Wazuh manager
=============

The Wazuh manager is one of the three central components of the Wazuh architecture. It receives security data from :doc:`Wazuh agents </getting-started/components/wazuh-agent>` and agentless devices, processes the data, and forwards it to the Wazuh indexer and other configured destinations.

The Wazuh manager uses the :doc:`Wazuh normalization engine </user-manual/manager/wazuh-normalization-engine>` to decode events and normalize them into standardized documents using the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>`. It also enriches events with additional context, such as geolocation and indicators of compromise, to enhance detection accuracy. The Wazuh manager forwards processed events to the Wazuh indexer through the :doc:`Wazuh indexer connector </user-manual/manager/wazuh-indexer-connector>`. The connector also retrieves content and other data required by manager services. The Wazuh manager provides services for agent enrollment, agent communication, vulnerability detection, inventory synchronization, and cluster management.

Architecture
------------

The Wazuh manager includes the normalization engine, Wazuh manager API, agent enrollment service, agent connection service, cluster daemon, indexer connector, and content manager. It runs on Linux across physical endpoints, virtual machines, containers, or cloud instances.

The diagram below shows the Wazuh manager architecture and its components.

.. thumbnail:: /images/getting-started/server-architecture.png
   :title: Wazuh manager architecture
   :alt: Wazuh manager architecture
   :align: center
   :width: 80%

Components
----------

The Wazuh manager comprises several components that perform functions such as agent enrollment, agent identity validation, and secure communication between Wazuh agents and the Wazuh manager.

-  **Agent enrollment service:** Registers new Wazuh agents and provides each agent with a unique authentication key. Wazuh 5.x agents enroll through the HTTPS agent API, while a TLS network service supports legacy Wazuh 4.x agents. The service supports enrollment with a shared password, enabled by default, and certificate-based agent identity verification.

-  **Agent connection service:** Manages communication between Wazuh agents and the Wazuh manager through the HTTPS agent API. The service authenticates every request with the Wazuh agent bearer token. It receives events and inventory data from Wazuh agents and delivers pending tasks, such as configuration updates and upgrades, when Wazuh agents request them.

-  **Normalization engine:** It transforms raw data received from the Wazuh agents and agentless devices into standardized schema documents. It decodes and enriches this data with threat intelligence. The normalization engine includes a built-in standard policy that covers all supported log sources and integrations. Each incoming event travels through the following ordered stages inside a policy:

   -  **Pre-filter** *(optional)*: Evaluated before decoding. If configured, events that do not satisfy the filter conditions are discarded immediately, avoiding unnecessary decoding work. If no pre-filter is configured, all events proceed to the decoding stage unconditionally.
   -  **Decoding**: Decoders normalize and extract fields from the raw event, mapping them to the Wazuh Common Schema (WCS). This stage is mandatory as every event must traverse the decoder tree.
   -  **Enrichment** *(optional)*: This stage involves plugins that augment the normalized event with additional context after decoding. Built-in plugins include GeoIP geolocation and Indicator of Compromise (IoC) matching. Enrichment can be fully disabled at the policy level. When disabled, the normalized event is passed directly to the next stage.
   -  **Post-filter** *(optional)*: Evaluated after enrichment (or after decoding if enrichment is disabled). If configured, events that do not satisfy the filter conditions are discarded before reaching the outputs. If no post-filter is configured, all events are forwarded unconditionally.
   -  **Outputs**: Sends the final processed events to configured destinations, such as the Wazuh indexer or other downstream components.

-  **Content manager:** Retrieves ruleset and content updates and makes them available to the Wazuh normalization engine and the vulnerability detection module.

-  **Wazuh manager API:** Provides a RESTful programmatic interface for interacting with the Wazuh manager. Administrators can access it through the Wazuh dashboard or command line to manage Wazuh agents and groups, manage cluster nodes, enforce role-based access control (RBAC), and monitor Wazuh manager services. The API also exposes normalization engine operations, such as testing log events and querying geolocation data.

-  **Wazuh cluster daemon:** Enables horizontal scaling by linking multiple Wazuh manager nodes into a cluster. Using a load balancer provides high availability, fault tolerance, and load distribution.

-  **Indexer connector:** Forwards events from the Wazuh normalization engine to the Wazuh indexer.

Visit the :doc:`installation guide </installation-guide/wazuh-server/index>` to learn how to install the Wazuh manager.
