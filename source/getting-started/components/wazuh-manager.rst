.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager is one of the three central components of the Wazuh architecture. It receives security data from Wazuh agents, processes it, and forwards it to the Wazuh indexer.

Wazuh manager
=============

The Wazuh manager is one of the three central components of the Wazuh architecture. It receives security data from :doc:`Wazuh agents </getting-started/components/wazuh-agent>`, processes the data, and forwards it to the Wazuh indexer and other configured destinations.

The Wazuh manager uses the :doc:`Wazuh normalization engine </user-manual/manager/wazuh-normalization-engine>` to decode events and normalize them into standardized documents using the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>`. It also enriches events with additional context, such as geolocation and indicators of compromise, to enhance detection accuracy. The Wazuh manager forwards processed events to the Wazuh indexer through the :doc:`Wazuh indexer connector </user-manual/manager/wazuh-indexer-connector>`. The connector also retrieves content and other data required by manager services. The Wazuh manager provides services for agent enrollment, agent communication, vulnerability detection, inventory synchronization, and cluster management.

Architecture
------------

The Wazuh manager includes the normalization engine, Wazuh manager API, agent enrollment service, agent connection service, cluster daemon, indexer connector, content manager, Wazuh DB, and modules daemon. It runs on Linux across physical endpoints, virtual machines, containers, or cloud instances.

The diagram below shows the Wazuh manager architecture and its components.

.. thumbnail:: /images/getting-started/server-architecture.png
   :title: Wazuh manager architecture
   :alt: Wazuh manager architecture
   :align: center
   :width: 80%

Components
----------

The Wazuh manager components perform functions such as agent enrollment, agent identity validation, and secure communication with Wazuh agents.

-  **Agent enrollment service:** Registers new Wazuh agents and provides each agent with a unique client key. Wazuh 5.x agents enroll with an enrollment token or the enrollment password. A separate legacy service enrolls Wazuh 4.x agents.

-  **Agent connection service:** Manages communication between Wazuh agents and the Wazuh manager through the HTTPS agent API. The service receives events and inventory data from Wazuh agents and delivers pending tasks, such as configuration updates and upgrades, when Wazuh agents request them.

-  **Normalization engine:** Transforms raw data received from Wazuh agents into standardized schema documents. It decodes and enriches this data with threat intelligence. The normalization engine includes a built-in standard policy that covers all supported log sources and integrations. It synchronizes its content, such as decoders, integrations, and policies, with the Wazuh indexer. Each event goes through decoding, enrichment such as GeoIP geolocation and IoC matching, and optional filters before the Wazuh manager sends it to the configured outputs.

-  **Content manager:** Downloads the vulnerability feed from the Wazuh indexer and makes it available to the Vulnerability Scanner, its only consumer. The content manager is separate from the Content Manager module of the Wazuh indexer, which manages the ruleset.

-  **Wazuh manager API:** Provides a RESTful programmatic interface for interacting with the Wazuh manager. Administrators use it from the Wazuh dashboard or the command line to manage Wazuh agents, groups, and cluster nodes. It also enforces role-based access control (RBAC) and reports the status of Wazuh manager services. Only the master node of a Wazuh manager cluster runs the Wazuh manager API.

-  **Wazuh cluster daemon:** Enables horizontal scaling by linking multiple Wazuh manager nodes into a cluster. A load balancer in front of the cluster nodes provides high availability, fault tolerance, and load distribution.

-  **Indexer connector:** Forwards events from the Wazuh normalization engine to the Wazuh indexer.

-  **Wazuh DB:** Keeps the Wazuh agent records and agent state in SQLite databases on each node.

-  **Modules daemon:** Runs the manager-side modules. These modules include:

   -  **Vulnerability Scanner:** Detects vulnerabilities in the software inventory collected from Wazuh agents.
   -  **Inventory synchronization:** Receives Wazuh agent state data, such as system inventory, and indexes it in the Wazuh indexer.
   -  **Task manager:** Stores Wazuh agent tasks, such as upgrades and Active Response actions, and delivers them to the agents.
   -  **Keystore server:** Provides the Wazuh indexer credentials stored in the Wazuh manager keystore.

Visit the :doc:`Wazuh manager installation guide </installation-guide/wazuh-manager/index>` to learn how to install the Wazuh manager.
