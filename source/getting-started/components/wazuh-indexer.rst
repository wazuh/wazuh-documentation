.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh indexer is a highly scalable, full-text search and analytics engine.

Wazuh indexer
=============

The Wazuh indexer is a highly scalable, full-text search and analytics engine. It serves as the central data store for the Wazuh platform. It indexes and stores security events, findings, vulnerability data, and system inventory. Purpose-built plugins provide access control, reporting, threat detection, and content management. Managed content includes rules, decoders, integrations, key-value databases (KVDBs), and indicators of compromise (IoCs). Near real-time search and analytics help security teams investigate threats, monitor compliance, and gain visibility into their infrastructure.

The Wazuh indexer includes the Ruleset management plugin, which provides threat detection and analysis. The plugin uses threat detectors that apply Sigma-based rules to identify threats, anomalies, and suspicious activity in the monitored environment.

You can deploy the Wazuh indexer as a single-node instance for development and small environments. For production workloads that need high availability and horizontal scalability, deploy a multi-node cluster.

The following diagram shows a Wazuh indexer cluster.

.. thumbnail:: /images/getting-started/indexer-cluster.png
   :title: Wazuh indexer
   :alt: Wazuh indexer
   :align: center
   :width: 80%

The Wazuh indexer stores data as JSON documents. Each document maps a set of keys, also called field names or properties, to their values. Values can be strings, numbers, Boolean values, dates, arrays, geolocations, or other data types.

An index is a collection of related documents. The Wazuh indexer distributes documents across containers called shards and spreads the shards across cluster nodes. This distribution provides redundancy against hardware failures and increases query capacity as you add nodes. Wazuh stores different event types in separate indices and data streams.

The Wazuh indexer is well-suited for time-sensitive use cases like security analytics and infrastructure monitoring, as it is a near real-time search platform. Wazuh events and findings become searchable within about 2 seconds of indexing, because their index templates set a 2-second refresh interval.

The Wazuh indexer also includes built-in features that make storing and searching data more efficient. These features include index rollups, alerting, notifications, and Index State Management (ISM).

Visit the :doc:`Wazuh indexer installation guide </installation-guide/wazuh-indexer/index>` to learn how to install the Wazuh indexer.
