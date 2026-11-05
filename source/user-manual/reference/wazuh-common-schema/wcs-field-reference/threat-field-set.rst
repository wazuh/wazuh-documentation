.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The fields of the threat field set of the Wazuh Common Schema (WCS), grouped by name prefix, with an example of how to use threat.technique.id.

``threat`` field set
====================

The ``threat`` field set is the largest group of event fields, so its tables are grouped by name prefix, for example ``threat.*`` for its top-level fields. Expand a table under its heading, or use the search and filter bar to find a field.

Example: Map the MITRE ATT&CK technique of a security tool's alert
------------------------------------------------------------------

``threat.technique.id`` holds the MITRE ATT&CK technique that the log source reports. This decoder reads it from the ``technique_id`` key of a JSON alert. The field is an array, so the decoder fills it with ``array_append()``.

The decoder is a child of the root decoder of your integration, ``decoder/core-wazuh-message/0``, as in :ref:`Create a security analytics detection workflow <data_analysis_detection_workflow>`. Create it in **Ruleset management** > **Normalization** > **Decoders**, then check the output in **Log test**. The highlighted lines show where ``threat.technique.id`` is used and where it appears in the output.

**Sample log**

.. code-block:: none

   {"product":"acme-edr","host":"Windows","tactic_id":"TA0002","technique_id":"T1059.001","technique":"PowerShell"}

**Decoder**

.. code-block:: yaml
   :emphasize-lines: 18

   name: decoder/acme-edr/0
   enabled: true
   metadata:
     title: Acme EDR alerts
     author: Security Team
     description: Decodes the JSON alerts of the Acme EDR.
   parents:
     - decoder/core-wazuh-message/0
   check:
     - event.original: contains("acme-edr")
   normalize:
     - map:
         - _json: parse_json($event.original)
         - event.kind: "alert"
         - event.dataset: "acme-edr"
         - threat.framework: "MITRE ATT&CK"
         - threat.tactic.id: array_append($_json.tactic_id)
         - threat.technique.id: array_append($_json.technique_id)
         - threat.technique.name: array_append($_json.technique)

**Output event (excerpt)**

.. code-block:: json
   :emphasize-lines: 6

   {
     "threat": {
       "framework": "MITRE ATT&CK",
       "tactic": { "id": [ "TA0002" ] },
       "technique": {
         "id": [ "T1059.001" ],
         "name": [ "PowerShell" ]
       }
     },
     "event": { "dataset": "acme-edr", "kind": "alert" }
   }

.. note::

   -  A rule can now match ``threat.technique.id: T1059.001`` on the events of this decoder.
   -  ``_json`` is a temporary field. Wazuh removes it before indexing.


Fields
------

.. wcs-field-tables:: stateless/events/main
   :field-sets: threat
   :group-by-prefix:
   :collapsible:
