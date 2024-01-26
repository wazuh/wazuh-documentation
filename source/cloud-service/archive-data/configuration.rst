.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides two types of storage for your data: indexed and archive. Learn more about the archive data in this section. 


Configuration
=============

Your environment is configured by default to send Wazuh output files to archive data.


There are two Wazuh output files in JSON format:

- ``/var/ossec/logs/archives/archives.json``: If  you set ``logall_json`` to ``yes``, Wazuh stores all events in this file and sends it to archive data, regardless of whether they triggered an alert.

- ``/var/ossec/logs/alerts/alerts.json``: This file contains only events that tripped a rule with high enough priority, according to a configurable threshold. This is always sent to archive data.

Both files are delivered to archive data as soon as they are rotated and compressed. This process usually takes between 10 and 30 minutes from the moment the event is received.

The oldest files in the archive data are rotated based on the **archive data** setting.

.. note::

  Files with a ``.log`` extension are never sent to archive data.
