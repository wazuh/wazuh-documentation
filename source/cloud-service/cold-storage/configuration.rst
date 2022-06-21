.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh provides two types of storage for your indexed data: hot storage and cold storage. Learn more about the cold storage configuration in this section. 

.. _cloud_cold_storage_configuration:

Configuration
=============

Your environment is configured by default to send Wazuh output files to cold storage.


There are two types of Wazuh output files:

- The file ``/var/ossec/logs/archives/archives.json`` contains all events whether they tripped a rule or not. This is sent to cold storage if the setting ``logall_json`` is set to ``yes``.
- The file ``/var/ossec/logs/alerts/alerts.json`` contains only events that tripped a rule with high enough priority, according to a configurable threshold. This is always sent to cold storage.

Both files are delivered to cold storage as soon as they are rotated and compressed. This process usually takes between 10 to 30 minutes from the moment the event is received.

There is no limit on the amount of data stored in the cold storage, but the time limit is one year. After this period of time, the data is removed.

.. note::

  Files with a ``.log`` extension are never sent to cold storage.
