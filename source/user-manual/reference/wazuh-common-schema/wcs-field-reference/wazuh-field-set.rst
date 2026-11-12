.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The fields of the wazuh field set of the Wazuh Common Schema (WCS), grouped by name prefix, with an example of how to use wazuh.protocol.location.

``wazuh`` field set
===================

The ``wazuh`` field set is the largest group of event fields, so its tables are grouped by name prefix, for example ``wazuh.*`` for its top-level fields. Expand a table under its heading, or use the search and filter bar to find a field.

Example: Accept only the events of one log file
-----------------------------------------------

Wazuh fills the ``wazuh.*`` fields itself, so you don't map them in a decoder, but you can read them. ``wazuh.protocol.location`` holds the log file the Wazuh agent read the event from. This decoder uses it in its ``check`` stage to accept only the events of ``/var/log/payments/api.log``.

The decoder is a child of the root decoder of the space, ``decoder/core-wazuh-message/0``, as in :ref:`Create a security analytics detection workflow <data_analysis_detection_workflow>`. Create it in **Ruleset management** > **Normalization** > **Decoders**, then check the output in **Log test**. The highlighted lines show where ``wazuh.protocol.location`` is used and where it appears in the output.

**Sample log, from** ``/var/log/payments/api.log``

.. code-block:: none

   2026-11-05T10:12:01.204Z WARN login failed for user alice from 203.0.113.50

**Decoder**

.. code-block:: yaml
   :emphasize-lines: 10

   name: decoder/payments-api/0
   enabled: true
   metadata:
     title: Payments API logs
     author: Security Team
     description: Decodes the log file of the payments API.
   parents:
     - decoder/core-wazuh-message/0
   check:
     - wazuh.protocol.location: string_equal("/var/log/payments/api.log")
   parse|event.original:
     - "<event.start/ISO8601Z> <log.level> <message>"
   normalize:
     - map:
         - event.kind: "event"
         - event.dataset: "payments-api"

**Output event (excerpt)**

.. code-block:: json
   :emphasize-lines: 4

   {
     "wazuh": {
       "protocol": {
         "location": "/var/log/payments/api.log"
       },
       "integration": {
         "decoders": [ "decoder/core-wazuh-message/0", "decoder/payments-api/0" ]
       }
     },
     "event": { "dataset": "payments-api", "kind": "event" },
     "message": "login failed for user alice from 203.0.113.50"
   }

.. note::

   -  The same log line from any other file doesn't pass the ``check``, so this decoder never processes it.
   -  ``wazuh.integration.decoders`` confirms that ``decoder/payments-api/0`` processed the event.


Fields
------

.. wcs-field-tables:: stateless/events/main
   :field-sets: wazuh
   :group-by-prefix:
   :collapsible:
