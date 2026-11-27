.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the architecture of Wazuh, our open source cybersecurity platform, in this section of our documentation. 
  
Architecture
============

The Wazuh architecture consists of a multi-platform :doc:`Wazuh agent </getting-started/components/wazuh-agent>` and three central components: the :doc:`Wazuh manager </getting-started/components/wazuh-manager>`, the :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>`, and the :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`.

You can deploy the Wazuh central components in different ways, depending on scalability and availability needs:

-  **All-in-one deployment:** All Wazuh components (manager, indexer, and dashboard) are installed on a single server. This deployment is best suited for labs and small environments with a limited number of monitored endpoints.
-  **Single-node deployment:** Each central component runs as a single node on a separate server. We recommend this architecture for medium-sized environments that require higher performance than an *all-in-one* deployment.
-  **Multi-node deployment:** A typical deployment consists of one Wazuh dashboard instance, a :doc:`Wazuh manager cluster </user-manual/wazuh-server-cluster/index>`, and a :doc:`Wazuh indexer cluster </user-manual/wazuh-indexer-cluster/index>`. Each node runs on a separate server. The number of instances depends on your deployment requirements. We recommend this architecture for large environments with high event throughput or requirements for fault tolerance and high availability.

The two clusters use different node roles:

-  A Wazuh manager cluster has one master node and one or more worker nodes.
-  A Wazuh indexer cluster elects a cluster manager node from among its cluster-manager-eligible nodes.

These roles are independent and serve different purposes.

Visit the :doc:`installation guide </installation-guide/index>` to learn how to deploy the Wazuh central components and the Wazuh agent.

The diagram below represents a Wazuh deployment architecture. It shows the Wazuh manager and Wazuh indexer nodes configured as clusters for load balancing and high availability. The numbered markers match the steps in Data flow.

.. thumbnail:: /images/getting-started/architecture.png
   :title: Deployment architecture
   :alt: Deployment architecture
   :align: center
   :width: 80%

Data flow
---------

The following steps describe how security data moves through a Wazuh deployment:

#. The Wazuh agent collects security data on the monitored endpoint and sends it to the Wazuh manager. In a Wazuh manager cluster, the Wazuh agent can connect to any node, usually through a :doc:`load balancer </user-manual/wazuh-server-cluster/agent-connections>`.
#. The Wazuh manager decodes and normalizes the data, enriches it with threat intelligence, and forwards the resulting events to the Wazuh indexer.
#. The Wazuh indexer stores the events and checks them against the detection rules. Events that match a rule generate findings.
#. When a finding triggers an :doc:`Active Response </user-manual/capabilities/active-response/index>`, the Wazuh indexer queues the request. The Wazuh manager then sends the response to the Wazuh agent, which runs it.
#. The Wazuh indexer keeps the detection content, indicators of compromise (IoCs), and vulnerability data up to date from :ref:`Wazuh Cyber Threat Intelligence (CTI) <getting_started_wazuh_cti>`. The Wazuh manager gets the decoders, IoCs, and vulnerability data it needs from the Wazuh indexer, not from Wazuh CTI. The Wazuh manager still connects to the internet for GeoIP updates and Wazuh agent upgrade packages.
#. The Wazuh dashboard queries the Wazuh indexer to display events, findings, and inventory data. It uses the :doc:`Wazuh manager API </user-manual/api/index>` to manage the Wazuh manager and Wazuh agents.

Component communication
-----------------------

Wazuh components communicate over separate paths, each with its own default port, transport protocol, encryption, and authentication method. Use these details to plan firewall rules and secure your deployment.

Wazuh 5.0 changes the agent-manager communication transport. A Wazuh 5.x agent communicates with the Wazuh manager over HTTPS on port ``1517/TCP``.

Wazuh agent to Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh agent collects security data from monitored endpoints and forwards it to the :doc:`Wazuh manager </getting-started/components/wazuh-manager>`, where the :doc:`Wazuh normalization engine </user-manual/manager/wazuh-normalization-engine>` transforms and enriches the data. A Wazuh 5.x agent uses an HTTPS channel for communication with the Wazuh manager. The channel carries enrollment, event reporting, state synchronization, control messages, and file downloads. The Wazuh manager serves this channel on port ``1517/TCP``. The Wazuh agent also enrolls through this channel.

Wazuh 4.x agents connect to the Wazuh manager on port ``1514`` and enroll on port ``1515/TCP``. You can disable these legacy services after all Wazuh agents run Wazuh 5.x.

Wazuh manager to Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager forwards processed events and vulnerability data to the Wazuh indexer for indexing, storage, and search. It uses TLS certificates to secure communications between the Wazuh manager and the Wazuh indexer. The :doc:`Wazuh indexer connector </user-manual/manager/wazuh-indexer-connector>` handles this communication. It is a shared library that replaces Filebeat in Wazuh 5.0. The Wazuh indexer listens on port ``9200/TCP`` by default.

Between Wazuh manager nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^

In a multi-node deployment, Wazuh manager nodes form a cluster and communicate with each other over port ``1516/TCP`` by default. A Wazuh manager cluster consists of one master node and one or more worker nodes. All nodes share a key that encrypts cluster communication.

The master node coordinates cluster operations. It handles Wazuh agent enrollment and synchronizes the Wazuh agent keys and shared configuration with the worker nodes.

Wazuh dashboard to Wazuh manager API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh dashboard queries the Wazuh manager API to retrieve information and perform management operations. It displays configuration and status information about the :doc:`Wazuh manager </getting-started/components/wazuh-manager>` and enrolled :doc:`Wazuh agents </getting-started/components/wazuh-agent>`. It also performs operations such as :doc:`agent enrollment </user-manual/agent/agent-enrollment/index>`, group assignment, and :doc:`remote upgrades </user-manual/agent/agent-management/upgrade-agents-remotely>`. The Wazuh manager API listens on port ``55000/TCP`` by default and exposes a REST interface over HTTPS. Only the master node runs the Wazuh manager API.

The Wazuh manager API authenticates every request and applies :doc:`role-based access control (RBAC) </user-manual/api/rbac/index>`, so each user can perform only the actions that their roles allow.

Wazuh dashboard to Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh dashboard queries the Wazuh indexer to retrieve indexed security data for its visualizations, tables, and findings. It sends search, aggregation, and management requests to the Wazuh indexer REST API over HTTPS on port ``9200/TCP`` by default. The Wazuh indexer processes each request and returns the matching documents, which the Wazuh dashboard renders. This communication is encrypted with TLS and authenticated with Wazuh indexer credentials.

.. _default_ports:

Required ports
--------------

Wazuh components communicate through several services, each with a specific default port. The following table lists these default ports. You can change the ports as required.

+-----------------+--------------------+----------------------------------------+--------------------------------------------------------------+
| Component       | Default port       | Transport and encryption               | Purpose                                                      |
+=================+====================+========================================+==============================================================+
| Wazuh manager   | 1517/TCP           | HTTPS, TLS                             | Wazuh 5.x agent enrollment and connection                    |
+                 +--------------------+----------------------------------------+--------------------------------------------------------------+
|                 | 1514/TCP (default) | Wazuh message protocol, AES encryption | Wazuh 4.x agent connection                                   |
|                 | or 1514/UDP        |                                        |                                                              |
+                 +--------------------+----------------------------------------+--------------------------------------------------------------+
|                 | 1515/TCP           | TLS 1.3                                | Wazuh 4.x agent enrollment                                   |
+                 +--------------------+----------------------------------------+--------------------------------------------------------------+
|                 | 1516/TCP           | Wazuh cluster protocol, encrypted with | Wazuh manager cluster communication                          |
|                 |                    | the cluster key                        |                                                              |
+                 +--------------------+----------------------------------------+--------------------------------------------------------------+
|                 | 55000/TCP          | HTTPS, TLS                             | Wazuh manager API (master node only)                         |
+-----------------+--------------------+----------------------------------------+--------------------------------------------------------------+
| Wazuh indexer   | 9200/TCP           | HTTPS, TLS                             | Wazuh indexer API                                            |
+                 +--------------------+----------------------------------------+--------------------------------------------------------------+
|                 | 9300 - 9400/TCP    | TLS                                    | Wazuh indexer cluster communication                          |
+-----------------+--------------------+----------------------------------------+--------------------------------------------------------------+
| Wazuh dashboard | 443/TCP            | HTTPS                                  | Wazuh web user interface                                     |
+-----------------+--------------------+----------------------------------------+--------------------------------------------------------------+

.. note::

   Wazuh 5.x agents communicate exclusively through port ``1517``. Ports ``1514`` and ``1515`` serve Wazuh 4.x agents.

Outbound connections
--------------------

Wazuh CTI content, GeoIP updates, remote agent upgrades, and package installation need outbound internet access from the Wazuh central components. If your environment restricts outbound traffic, allow the connections in the following table.

+------------------------+-----------------------------+---------+-------------------------------------------------+
| Source                 | Destination                 | Port    | Purpose                                         |
+========================+=============================+=========+=================================================+
| Wazuh indexer          | ``api.pre.cloud.wazuh.com`` | 443/TCP | Wazuh CTI content updates (ruleset, IoCs, and   |
|                        |                             |         | vulnerability data), the update check, and a    |
|                        |                             |         | daily telemetry ping                            |
+------------------------+-----------------------------+---------+-------------------------------------------------+
| Wazuh manager          | ``api.pre.cloud.wazuh.com`` | 443/TCP | GeoIP database updates for event enrichment     |
+------------------------+-----------------------------+---------+-------------------------------------------------+
| Wazuh dashboard        | ``api.pre.cloud.wazuh.com`` | 443/TCP | Wazuh CTI registration of the environment       |
+------------------------+-----------------------------+---------+-------------------------------------------------+
| Wazuh manager          | ``packages.wazuh.com``      | 443/TCP | Wazuh Package Kit (WPK) files for remote Wazuh  |
|                        |                             |         | agent upgrades                                  |
+------------------------+-----------------------------+---------+-------------------------------------------------+
| All central components | ``packages.wazuh.com``      | 443/TCP | Installation and upgrade of the Wazuh central   |
|                        |                             |         | components                                      |
+------------------------+-----------------------------+---------+-------------------------------------------------+

.. _getting_started_wazuh_cti:

Wazuh CTI
---------

The Wazuh CTI service is a publicly accessible platform that provides cyber threat intelligence and security content. Wazuh maintains and regularly updates this content as new intelligence becomes available.

The Wazuh CTI API publishes content for the following use cases:

-  **Detection content**: Rules, decoders, integrations, key-value databases (KVDBs), and routing policies.
-  **Indicators of compromise (IoCs)**: IP addresses, file hashes, and URLs used to enrich events with threat context during event processing.
-  **Vulnerability intelligence**: Common Vulnerabilities and Exposures (CVE) information that the :doc:`Vulnerability Scanner module </user-manual/capabilities/vulnerability-detection/index>` uses to identify vulnerabilities affecting monitored endpoints.

Wazuh aggregates vulnerability intelligence from trusted sources, including operating system vendors and major vulnerability databases. It normalizes the data into a common structure and enriches it with information about affected products and versions. The `Wazuh CTI website <https://cti.wazuh.com/>`__ provides public access to vulnerability intelligence without requiring registration or a Wazuh installation. You can search for vulnerabilities by CVE ID, affected application, Common Vulnerability Scoring System (CVSS) score, severity, and publication date.

For more information, see the :doc:`Wazuh CTI </wazuh-cti/index>` documentation.
