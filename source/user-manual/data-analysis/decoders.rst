.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Decoders normalize raw events into structured documents that conform to the Wazuh Common Schema. Learn how to build custom decoders in this section.

.. _data_analysis_decoders:

Decoders
========

Decoders normalize raw events into structured documents that conform to the Wazuh Common Schema (WCS). When an event is accepted by a decoder, it applies a series of transformations to extract values, normalize fields, and map data to the appropriate schema fields.

All events enter the decoder tree through the root decoder and then move through a branch of child decoders. Each child decoder performs a more specialized layer of parsing, field extraction, and normalization, progressively refining the event until it reaches its final structured form.

.. thumbnail:: /images/manual/data-analysis/decoder-tree-flow.png
   :title: Decoder tree
   :alt: Decoder tree
   :align: center
   :width: 80%

The above image shows a logical decoder tree.

Custom decoders
---------------

Custom decoders are managed through the draft, test, and custom spaces on the Wazuh Security Analytics dashboard. They are organized within integrations, which serve as containers for grouping related decoders, rules, KVDBs, and supporting content.

A decoder is an asset that takes a raw event and normalizes it into the Wazuh Common Schema (WCS) using a small domain-specific language (DSL): ``check``, ``parse``, and ``normalize`` with map operations. Each operation in those stages is defined using literal values, field references, and `helper functions <https://github.com/wazuh/wazuh/blob/main/docs/ref/modules/engine/ref-helper-functions.md>`__. Decoders are arranged in a tree, starting from a root decoder, and each decoder can accept or reject an event based on its conditions before mapping fields.

Each decoder defines the:

-  ``check`` stage: boolean conditions to decide if this decoder applies.

-  ``parse|`` stage: parsing operations (e.g., parse JSON, key-value, CSV) on a field.

-  ``normalize`` stage: one or more blocks that run ``check/parse|/map`` in order to populate WCS fields. The ``map`` block is a transformation stage inside a decoder's normalize section that sets or modifies event fields (using literals, field references, or functions) without affecting whether the event is accepted.

Conceptually, a decoder asset looks like this:

.. code-block:: yaml

   name: decoder/custom-mylog/0
   enabled: true
   stages:
     check:
       - $event.original: contains("MyProduct")
     parse|:
       - $event.original: parse_json()
     normalize:
       - check:
           - $some.field: exists()
         map:
           event.category: "network"
           source.ip: $src_ip
           # ...

Identifying the input field and format
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Most decoders start from ``event.original`` for raw log text or JSON, or some field a previous decoder has already created (e.g., ``_message``, ``_json``). You decide which `helper function <https://github.com/wazuh/wazuh/blob/main/docs/ref/modules/engine/ref-helper-functions.md>`__ to use based on the events format:

-  ``parse_json()`` for JSON logs.

-  ``parse_key_value()`` for ``k=v`` style logs.

-  ``parse_csv()`` or ``parse_dsv()`` for delimited logs.

-  ``regex_extract()`` if you want custom regex capture into fields.

Example: Parse a JSON firewall log arriving as a string in ``event.original``:

.. code-block:: yaml
   :emphasize-lines: 5

   name: decoder/custom-firewall-json/0
   enabled: true
   stages:
     parse|:
       - _json: parse_json($event.original)

Here ``_json`` is a temporary variable used as scratch space during decoding and will later be cleaned in pre-enrichment. A scratch space refers to temporary fields (names starting with ``_``) that decoders use to store intermediate values during event processing, which are later cleaned up before indexing. Temporary variables are any fields whose names start with ``_``, like ``_raw_message`` or ``_parsed_ts``. They are not part of the Wazuh Common Schema. Decoders can read and write these fields as an event moves through the decoder tree, so different decoders can share intermediate parsing results or flags.

At pre-enrichment, there is a mandatory cleanup step that removes all temporary fields, ensuring the final event contains only WCS-compliant fields for indexing.

Adding a check stage to target the right events
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``check`` stage is used to target the right events. It uses filter helpers such as ``contains()`` and ``starts_with()`` to determine whether the decoder should process the event.

Example:

.. code-block:: yaml
   :emphasize-lines: 3-4

   stages:
     check:
       - $event.original: contains("firewall")
       - $event.original: starts_with("{")
     parse|:
       - _json: parse_json($event.original)

The above example shows that ``check`` lines use a filter helper (``contains``, ``starts_with``). Both conditions must evaluate to true for the decoder to accept the event.

Normalizing parsed data into WCS fields
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The normalize stage maps parsed fields to Wazuh Common Schema fields using mapping helpers, transforms, or direct references.

Example:

.. code-block:: yaml

   normalize:
     - map:
         event.kind: "event"
         event.category: "network"
         event.type: "connection"
         network.transport: $_json.transport
         source.ip: $_json.src_ip
         source.port: to_int($_json.src_port)
         destination.ip: $_json.dst_ip
         destination.port: to_int($_json.dst_port)
         event.outcome: $_json.action

In the above example, we use:

-  Direct references, such as ``$_json.src_ip``.

-  Map helpers like ``to_int()`` to change strings to integers.

Conditional normalize blocks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A ``normalize`` array can have multiple blocks, each with its own ``check`` and ``map``, evaluated in order.

Example: treat ``action=ALLOW`` vs ``DENY`` differently:

.. code-block:: yaml

   normalize:
     - check:
         - $_json.action: string_equal("ALLOW")
       map:
         event.outcome: "success"
     - check:
         - $_json.action: string_equal("DENY")
       map:
         event.outcome: "failure"

Here, ``string_equal`` is a filter helper used as a condition inside ``normalize``.

**Practical example**

The following log is a sample from a network device:

.. code-block:: none

   FW: conn src=10.0.0.5 src_port=34567 dst=192.168.1.10 dst_port=443 proto=tcp action=ALLOW

The following decoder YAML parses the key-value fields from the log and maps them to WCS fields:

.. code-block:: yaml

   name: decoder/custom-fw-kv/0
   enabled: true
   metadata:
     description: "Custom firewall key=value logs"
     version: "1.0.0"
   stages:
     check:
       - $event.original: starts_with("FW:")
       - $event.original: contains("conn ")
     parse|:
       - _kv: parse_key_value($event.original, " ", "=", true)
     normalize:
       - map:
           event.kind: "event"
           event.category: "network"
           event.type: "connection"
           source.ip: $_kv.src
           source.port: to_int($_kv.src_port)
           destination.ip: $_kv.dst
           destination.port: to_int($_kv.dst_port)
           network.transport: downcase($_kv.proto)
       - check:
           - $_kv.action: string_equal("ALLOW")
         map:
           event.outcome: "success"
       - check:
           - $_kv.action: string_equal("DENY")
         map:
           event.outcome: "failure"

In the above example:

-  ``parse_key_value`` from the Transformation helpers to split ``k=v`` pairs. In this context, "``k=v`` pairs" just means the key=value fragments inside the log line, like ``src=10.0.0.5``, ``src_port=34567``, ``dst=192.168.1.10``, etc.

-  ``starts_with``, ``contains``, and ``string_equal`` from Filter helpers.

-  ``to_int`` and ``downcase`` from Map helpers to convert types/normalize casing.

-  Scratch field ``_kv`` as temporary storage, later removed by the pre-enrichment cleanup.
