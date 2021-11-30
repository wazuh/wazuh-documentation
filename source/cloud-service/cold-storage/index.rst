.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_accessing_cold_storage:

.. meta::
  :description: Wazuh provides two types of storage for your indexed data: hot storage and cold storage. Learn more about the cold storage in this section. 

Cold storage
============

Wazuh provides two types of storage for your indexed data: hot storage and cold storage.

Wazuh ingests and indexes the events sent by the agents, making the data searchable and analyzable on the Wazuh WUI. This information is available in hot storage and limited by the :ref:`tier <cloud_glossary_tier>`. At the same time, data is sent to cold storage, with a delay of a maximum of 30 minutes since it is first processed by Wazuh. The cold storage is an AWS S3 bucket to store your logs for longer periods of time and meet compliance requirements. Also, you can reindex the data to other environments for investigations.

This is an example of how Wazuh manages the storing of data:

Let's suppose that an environment with a tier of 100GB has 50 agents connected. Wazuh ingests 5GB on a daily basis and, assuming that 20% of events generate an alert, indexes 1GB per day. In this scenario, the hot storage contains 100 days of alerts (1 GB per day). When that 100 GB of data is exceeded, the oldest data is rotated. All information is still accessible in cold storage.


Read the following sections to learn more about Wazuh Cloud service's cold storage:

.. toctree::
  :maxdepth: 1

  configuration
  filename-format
  access
