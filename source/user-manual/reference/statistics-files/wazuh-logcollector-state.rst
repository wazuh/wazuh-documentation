.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-logcollector.state file can be helpful to identify and measure if Wazuh is collecting and sending logs consistently. Learn more about it here.

.. _wazuh_logcollector_state_file:

wazuh-logcollector.state
========================

The statistics file for ``wazuh-logcollector`` is located at ``/var/ossec/var/run/wazuh-logcollector.state``.

It can be helpful to identify and measure whether Wazuh is collecting and sending logs consistently.

By default, this file is updated every 60 seconds. This interval can be changed by modifying ``logcollector.state_interval`` in the :ref:`internal configuration <reference_internal_options>` file.

Below is an example of the file content:

.. code-block:: json

   {
      "global": {
         "start": "2026-09-04T07:49:12Z",
         "end": "2026-09-04T15:38:12Z",
         "files": [
            {
               "location": "journald",
               "events": 3560,
               "bytes": 514282,
               "targets": [
                  { "name": "agent", "drops": 0 }
               ]
            },
            {
               "location": "/var/ossec/logs/active-responses.log",
               "events": 0,
               "bytes": 0,
               "targets": [
                  { "name": "agent", "drops": 0 }
               ]
            }
         ]
      },
      "interval": {
         "start": "2026-09-04T15:37:12Z",
         "end": "2026-09-04T15:38:12Z",
         "files": [
            {
               "location": "journald",
               "events": 12,
               "bytes": 1840,
               "targets": [
                  { "name": "agent", "drops": 0 }
               ]
            }
         ]
      }
   }
