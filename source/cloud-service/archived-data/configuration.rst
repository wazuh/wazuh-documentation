.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides two types of storage for your data: indexed and archived. Learn more about the archived data in this section. 

.. _cloud_archived_data_configuration:

Configuration
=============

Your environment is configured by default to send Wazuh output files to archived data.


There are two types of Wazuh output files:

- The file ``/var/ossec/logs/archives/archives.json`` contains all events whether they tripped a rule or not. This is sent to archived data if the setting ``logall_json`` is set to ``yes``.
- The file ``/var/ossec/logs/alerts/alerts.json`` contains only events that tripped a rule with high enough priority, according to a configurable threshold. This is always sent to archived data.

Both files are delivered to archived data as soon as they are rotated and compressed. This process usually takes between 10 to 30 minutes from the moment the event is received.

The oldest files in the archived data are rotated based on the *archived data* setting.

.. note::

  Files with a ``.log`` extension are never sent to archived data.
