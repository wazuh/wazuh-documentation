.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Reference information for the Wazuh manager daemons, normalization engine modules, shared libraries, and CLI tools. Learn more in this section of the documentation.

Reference
=========

This section provides additional information about the Wazuh manager, including lookup tables for daemons, normalization engine modules, shared libraries, and CLI tools.

.. _wazuh_manager_daemons:

Daemons
-------

.. list-table::
   :header-rows: 1
   :widths: 20 30 50

   * - Daemon
     - Binary
     - Purpose
   * - Normalization engine
     - ``wazuh-manager-analysisd``
     - Event processing and event generation (replaces legacy ``analysisd``)
   * - Remoted
     - ``wazuh-manager-remoted``
     - Wazuh agent communication gateway that decrypts, enriches, and forwards events to the Wazuh normalization engine
   * - Wazuh DB
     - ``wazuh-manager-db``
     - SQLite-based database daemon for the Wazuh agent and global state.
   * - Monitord
     - ``wazuh-manager-monitord``
     - Wazuh agent monitoring and log rotation
   * - Auth
     - ``wazuh-manager-authd``
     - Wazuh agent registration and enrollment via TLS port ``1515``
   * - Wazuh manager API
     - ``wazuh-manager-apid``
     - REST API (Python/Starlette, HTTPS) with JWT auth and RBAC
   * - Modulesd
     - ``wazuh-manager-modulesd``
     - Hosts manager-side modules: vulnerability scanner, inventory sync, agent upgrade, task manager, and control (restart/reload)
   * - Clusterd
     - ``wazuh-manager-clusterd``
     - Multi-node Wazuh manager master-worker synchronization (Python, asyncio)

.. _normalization_engine_modules:

Normalization engine modules
----------------------------

The modules of the Wazuh normalization engine work together to transform raw events into structured and enriched security data. Each module is responsible for a specific stage of the :ref:`event processing pipeline <event_processing_pipeline>`, including event reception, decoding, normalization, enrichment, and output generation. This modular architecture constitutes a unified event processing workflow.

Server
   The Server module includes two HTTP servers. The events socket receives raw events from the :ref:`Remoted <wazuh_manager_daemons>` module or the Vulnerability Detector module. The management API socket exposes operations that internal client dev tools and other Wazuh manager components use. These operations include managing routes, running tester sessions, applying content changes, querying GeoIP and IOC state, toggling raw event indexing, and reading metrics. Both sockets use HTTP with JSON bodies. Protocol buffers (protobuf) define the schema for every request and response.

.. _orchestrator_module:

Orchestrator
   The Orchestrator is the runtime hub of the Wazuh normalization engine. It owns the routes table that maps each :ref:`space <spaces>` to the active security policy and the priority at which events are evaluated, plus the session table used by the tester. When an event arrives, the Orchestrator forwards an independent copy to each active policy, allowing a single incoming event to produce multiple output documents, one for each active policy. Routes can be added, replaced, or removed at runtime without restarting the normalization engine, which is what makes hot-swapping of synchronized content possible.

Builder
   The Builder turns the declarative content stored in the :ref:`Engine Content Manager <engine_content_manager_module>` into an executable graph that the :ref:`Backend <backend_module>` can run. It validates field types against the :ref:`Schema <schema_module>`, resolves variables and definitions, and links every helper function used in ``check``, ``parse``, and ``normalize`` stages. The Engine Content Manager calls the Builder whenever content changes allowing the :ref:`Orchestrator <orchestrator_module>` to register the resulting graph as a route.

.. _backend_module:

Backend
   The Backend is the runtime that executes the compiled graph for every event. It goes through the stages described in :ref:`event policy processing <event_processing_pipeline>`: pre-filter, decoders (including KVDB lookups), enrichment (Geo and IOC), post-filter, and outputs.

.. _engine_content_manager_module:

Engine Content Manager
   This is the local mirror of the content managed in the Wazuh indexer. It is organized by :ref:`spaces <spaces>`. The Engine Content Manager has three responsibilities:

   -  Storage of decoders, filters, KVDBs, integrations, and policies on the normalization engine endpoint.
   -  :ref:`Synchronization <synchronization_process>` with the Wazuh indexer (CMSync), which periodically compares per-space content hashes and pulls the full content when they differ.
   -  CRUD which validates and applies any mutations issued through the management API.

   After every applied change, the Engine Content Manager hands the affected policies to the Builder and asks the Orchestrator to swap the corresponding routes.

.. _schema_module:

Schema
   The Schema module loads the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>` document at startup and exposes it to the Builder for build-time field validation and to the Backend for runtime validation of dynamic values. It guarantees that every document the engine emits is type-consistent with the mappings configured in the Wazuh indexer.

KVDB
   Per-space key-value databases that decoders and filters consult during event processing, for example, mapping identifiers to canonical names or merging default values into events. Regular KVDBs are part of the per-space content which are synchronized along with the rest of the space's assets and rebuilt on the normalization engine when their source changes.

IOC
   Indicators of compromise databases are used at the :ref:`IOC enrichment <ioc_enrichment>` stage to match fields in incoming events against threat intelligence. These databases are shared across spaces and are independent of the regular content sync. They are kept up to date by a dedicated IOC synchronizer that downloads updates into a temporary database and then atomically swaps it in, so readers never observe a partially updated database.

Geo
   The Geo module performs GeoIP and ASN lookups using ``MaxMind MMDB`` databases. Like the IOC databases, the Geo databases are global rather than per-space. They are refreshed in the background and hot-reloaded without restarting the Wazuh normalization engine. Refer to the :ref:`Geo enrichment <geo_enrichment>` section of the documentation for more information.

Indexer connector
   The :doc:`indexer connector <wazuh-indexer-connector>` is the single component that communicates with the Wazuh indexer. It manages three traffic flows: outbound processed events (driven by policy outputs), inbound content (consumed by the Engine Content Manager and the IOC synchronizer), and inbound runtime configuration (consumed by the Configuration module). Concentrating all Wazuh indexer traffic in one place is what allows the rest of the normalization engine to stay independent of the Wazuh indexer transport details.

Stream Log
   Stream Log provides asynchronous, rotating log channels with size-based and time-based rotation, gzip compression, and retention by file count and total size. It backs the file outputs that policies can configure, and it is also what the optional event dumper uses to persist raw events for forensic investigation. Hot-path writes never block on disk I/O.

Configuration
   The local configuration is loaded from the Wazuh manager ``XML/ini`` at startup, allowing every module to read from it. A subset of runtime parameters is also pulled periodically from the Wazuh indexer as remote configuration, so operators can tune behavior without restarting the engine. Remote configuration changes are applied with rollback if a module rejects the new values.

Shared libraries
----------------

The table below lists the shared libraries provided by the Wazuh manager, their roles, and the components that use them.

.. list-table::
   :header-rows: 1
   :widths: 18 27 30 25

   * - Library
     - Source
     - Consumers
     - Purpose
   * - Indexer connector
     - ``shared_modules/indexer_connector``
     - Normalization engine, Vulnerability scanner, Inventory sync, Content manager
     - Client library for pushing data to the Wazuh indexer
   * - Content manager
     - ``shared_modules/content_manager``
     - Vulnerability scanner, Modulesd
     - Plugin framework for downloading and managing content (feeds, rulesets)
   * - Router
     - ``shared_modules/router``
     - Remoted, Wazuh DB, Auth, Inventory Sync, Agent Upgrade
     - Pub/sub IPC messaging between daemons via per-topic sockets under ``queue/router/``
   * - Keystore
     - ``shared_modules/keystore``
     - Indexer connector
     - AES-256 encrypted credential store (RocksDB)

CLI tools
---------

The Wazuh manager provides a set of command-line interface (CLI) tools for managing, monitoring, and troubleshooting its components. The table below lists the available CLI tools and their purposes within the Wazuh manager.

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Binary
     - Purpose
   * - ``wazuh-manager-control``
     - The Wazuh manager service control script is used to start, stop, restart, and check the status of all daemons
   * - ``wazuh-manager-keystore``
     - Manage secrets in the encrypted keystore (AES-256, RocksDB)
   * - ``verify-agent-conf``
     - Validate ``agent.conf`` syntax for shared group configurations
   * - ``agent_groups``
     - Manage Wazuh agent group assignments
   * - ``agent_upgrade``
     - Orchestrate agent WPK upgrades
   * - ``cluster_control``
     - Query cluster status and node health
   * - ``rbac_control``
     - Manage RBAC policies and role assignments
