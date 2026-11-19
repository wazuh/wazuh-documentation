.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn which Wazuh output files your Wazuh Cloud environment sends to archive data and when they are delivered.

.. _cloud_archive_data_configuration:

Configuration
=============

Your Wazuh Cloud environment sends Wazuh output files to archive data by default. This page describes which files are sent and when.

.. TODO: Confirm with engineering the output files and paths that 5.0 environments send to archive data. The 4.x paths under /var/ossec/logs and the logall_json option may differ in 5.0.

Wazuh sends two output files in JSON format to archive data:

-  ``/var/ossec/logs/alerts/alerts.json``: Contains only the events that trigger a rule with a high enough priority, according to a configurable threshold. Wazuh always sends this file to archive data.
-  ``/var/ossec/logs/archives/archives.json``: Contains all events, whether or not they trigger an alert. Wazuh stores events in this file and sends it to archive data when ``logall_json`` is set to ``yes``.

Wazuh delivers both files to archive data as soon as they are rotated and compressed. This process usually takes between 10 and 30 minutes from the moment Wazuh receives the event.

Wazuh deletes the oldest files in archive data according to the **Archive Data Retention** setting of your environment. See :doc:`Environment settings </cloud-service/your-environment/settings>` for details.

.. note::

   Files with a ``.log`` extension are never sent to archive data.
