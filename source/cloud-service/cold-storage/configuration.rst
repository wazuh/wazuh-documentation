.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_cold_storage_configuration:

.. meta::
  :description: Learn about cold storage

Configuration
=============

Your environment is configured by default to send the following data to cold storage:

- `Wazuh output`_
- `Wazuh configuration`_

Wazuh output
------------

There are two types of Wazuh output files:

- The file ``/var/ossec/logs/archives/archives.json`` contains all events whether they tripped a rule or not. This will be sent to cold storage if the setting ``logall_json`` is set to ``yes``.
- The file ``/var/ossec/logs/alerts/alerts.json`` contains only events that tripped a rule with high enough priority (the threshold is configurable). This is always sent to cold storage.

Both files are delivered to cold storage as soon they are rotated and compressed. This usually takes between 10 to 30 minutes since the event is received.

There is no limit on the amount of data stored in the cold storage, but the time limit is one year. After that year, the data is removed.

.. note::

  Files with ``.log`` extension are never sent to cold storage.

Wazuh configuration
-------------------

Data corresponding to Wazuh configuration such us ``/var/ossec/etc`` or ``/var/ossec/api/configuration`` is compressed and backed up once a day.

Configuration backup is stored in cold storage for up to 30 days, after which it is deleted.
