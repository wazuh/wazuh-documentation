.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager is one of the three central components of the Wazuh architecture. It receives security data from Wazuh agents, processes it, and forwards it to the Wazuh indexer.

Wazuh manager
=============

The Wazuh manager is one of the three central components of the Wazuh architecture. It receives security data from :doc:`Wazuh agents </getting-started/components/wazuh-agent>`, processes the data, and forwards it to the Wazuh indexer and other configured destinations.

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

The Wazuh manager components perform functions such as agent enrollment, agent identity validation, and secure communication with Wazuh agents.

-  **Agent enrollment service:** Registers new Wazuh agents and provides each agent with a unique authentication key. Wazuh 5.x agents enroll through the HTTPS agent API with an enrollment token or the shared enrollment password. The default configuration requires the shared password. A TLS listener on port 1515 serves legacy Wazuh 4.x agents and supports certificate-based agent identity verification.

-  **Agent connection service:** Manages communication between Wazuh agents and the Wazuh manager through the HTTPS agent API. After enrollment, the service authenticates each request with a bearer token that the Wazuh agent signs with its key. It receives events and inventory data from Wazuh agents and delivers pending tasks, such as configuration updates and upgrades, when Wazuh agents request them.

-  **Normalization engine:** It transforms raw data received from Wazuh agents into standardized schema documents. It decodes and enriches this data with threat intelligence. The normalization engine includes a built-in standard policy that covers all supported log sources and integrations. Each incoming event travels through the following ordered stages inside a policy:

   -  **Pre-filter** *(optional)*: Evaluated before decoding. If configured, events that do not satisfy the filter conditions are discarded immediately, avoiding unnecessary decoding work. If no pre-filter is configured, all events proceed to the decoding stage unconditionally.
   -  **Decoding**: Decoders normalize and extract fields from the raw event, mapping them to the Wazuh Common Schema (WCS). This stage is mandatory as every event must traverse the decoder tree.
   -  **Pre-enrichment**: Runs on every event after decoding. It adds the policy space to the event, drops events marked as discarded unless the policy indexes them, and removes temporary decoder variables.
   -  **Enrichment** *(optional)*: This stage involves plugins that augment the normalized event with additional context after pre-enrichment. Built-in plugins include GeoIP geolocation and Indicator of Compromise (IoC) matching. Enrichment can be fully disabled at the policy level. When disabled, the normalized event is passed directly to the next stage.
   -  **Post-filter** *(optional)*: Evaluated after enrichment, or after pre-enrichment if enrichment is disabled. If configured, events that do not satisfy the filter conditions are discarded before reaching the outputs. If no post-filter is configured, all events are forwarded unconditionally.
   -  **Outputs** *(optional)*: Sends the final processed events to configured destinations, such as the Wazuh indexer or other downstream components. If no outputs are configured, processing ends after the last filter.

-  **Content manager:** Downloads the vulnerability feed and makes it available to the vulnerability detection module, its only consumer. The Wazuh normalization engine synchronizes its own content with the Wazuh indexer.

-  **Wazuh manager API:** Provides a RESTful programmatic interface for interacting with the Wazuh manager. Administrators use it from the Wazuh dashboard or the command line to manage Wazuh agents, groups, and cluster nodes. It also enforces role-based access control (RBAC) and reports the status of Wazuh manager services.

-  **Wazuh cluster daemon:** Enables horizontal scaling by linking multiple Wazuh manager nodes into a cluster. A load balancer in front of the cluster nodes provides high availability, fault tolerance, and load distribution.

-  **Indexer connector:** Forwards events from the Wazuh normalization engine to the Wazuh indexer.

Visit the :doc:`Wazuh manager installation guide </installation-guide/wazuh-manager/index>` to learn how to install the Wazuh manager.
