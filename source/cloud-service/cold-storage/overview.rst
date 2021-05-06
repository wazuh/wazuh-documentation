.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_cold_storage_overview:

.. meta::
  :description: Learn about cold storage

Overview
========

Wazuh provides two types of storage for your indexed data: hot storage and cold storage.

Wazuh ingests and indexes the events sent by the agents, making the data searchable and analyzable on the Wazuh WUI. This information is available in hot storage and limited by the :ref:`tier <cloud_glossary_tier>`.

At the same time, data is sent to cold storage, with a delay of a maximum of 30 minutes since it is first processed by Wazuh. The cold storage is an AWS S3 bucket to store your logs for longer periods of time and meet compliance requirements. Also, you can reindex the data to other environments for investigations.


- This is an example of how Wazuh manages storaging data:

  An environment with a tier of 100GB has 50 agents connected, and each one of them generates 100MB per day. Wazuh ingests 5GB per day (50 agents x 100MB/day = 5000MB = 5GB).
  Assuming that 20% of the events generate an alert, Wazuh indexes 1GB per day (20% 5GB = 1GB). In this scenario, the hot storage contains 100 days (100GB / 1GB/day = 100 days).

  When those 100GB of data are exceeded, the oldest data is rotated and sent to cold storage where the information remains accesible, keeping 100GB of total data in the hot storage.
