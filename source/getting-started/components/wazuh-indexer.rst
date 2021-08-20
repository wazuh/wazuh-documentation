.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_indexer:

[WIP] Wazuh indexer
===================

The Wazuh indexer is an open, highly scalable, full-text search and analytics engine. The component is distributed, meaning the data indices are divided into shards and each shard can have zero or more replicas. Wazuh uses different indices for alerts data, raw events, and status monitoring information.

A Wazuh index is a collection of documents that have somewhat similar characteristics, like certain common fields and shared data retention requirements. Wazuh utilizes as many as three different indices, created daily, to store different event types. When a search is run on a Wazuh index, the search is executed on all the shards in parallel and the results are merged. Dividing Wazuh indexes into multiple shards and replicas is used in Wazuh indexer multi-node clusters with the purpose of scaling out searches and for high availability. Wazuh indexer single-node clusters normally have only one shard per index and no replicas.


Wazuh indexer data flow


The Wazuh indexer functionality is based on data ingestion, which means that it parses, normalizes, and enriches data before it is indexed. Once the Wazuh server analyzes the data received from the agents, the Wazuh indexer ingests it. Additionally, the Wazuh dashboard runs on top of the indexed data and allows you to create powerful visualizations for managing, mining, analyzing the information.


.. thumbnail::  ../../images/getting_started/wazuh-indexer-dataflow.png
      :align: center
      :title: API Console