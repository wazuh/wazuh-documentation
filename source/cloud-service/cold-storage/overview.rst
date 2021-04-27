.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_cold_storage_overview:

.. meta::
  :description: Learn about cold storage

Overview
========

Wazuh ingests the events sent by the agents and indexes them in order to make them searchable and analyzable. This data is available in :ref:`hot storage <cloud_glossary_hot_storage>` and limited by the :ref:`tier <cloud_glossary_tier>`. At the same time, data is sent to :ref:`cold storage <cloud_glossary_cold_storage>` (within a delay of 10 to 30 minutes since it was processed by Wazuh). The cold storage is an AWS S3 bucket to store your logs for longer periods of time and meet compliance requirements. Also, you can re-index it to other environments for investigations.

As an example:

- An environment with a tier of 100GB has 50 agents connected.
- Each agent generates 100MB per day.
- Wazuh will ingest 5GB per day (50 agents x 100MB/day = 5000MB = 5GB)
- Assuming that 20% of the events will generate an alert, Wazuh will index 1GB per day (20% 5GB = 1GB).
- In this case, the hot storage will contain 100 days (100GB / 1GB/day = 100 days).
- When those 100GB of data are exceeded, the oldest data is rotated (keeping 100GB of total data in the hot storage), but will remain accessible as cold storage.
