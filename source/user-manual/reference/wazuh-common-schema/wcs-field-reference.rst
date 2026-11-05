.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Browse the Wazuh Common Schema (WCS) field reference: event fields by field set, findings fields, and state index fields, with a worked example for each page.

.. _reference_wcs_field_reference:

WCS field reference
===================

This section lists the fields of each WCS module. You can learn how the schema is organized in :doc:`How WCS works <how-wcs-works>`, how Wazuh fills the fields in :doc:`How Wazuh uses WCS fields <how-wazuh-uses-wcs-fields>`, and which fields to use first in :doc:`Key WCS fields <key-wcs-fields>`.

-  :doc:`Event fields <wcs-field-reference/event-fields>`: The fields of the normalized events in the ``wazuh-events-v5-<CATEGORY>`` data streams, grouped by field set.
-  :doc:`Findings fields <wcs-field-reference/findings-fields>`: The fields that findings add to the event fields, in the ``wazuh-findings-v5-*`` data streams.
-  :doc:`State index fields <wcs-field-reference/state-index-fields>`: The fields of the ``wazuh-states-*`` indices, which store the latest known state of each endpoint.

Each page starts with a worked example that follows one field through a decoder, a rule, or a query, and highlights where the field is used and where it appears in the output. Every page has a search and filter bar above its tables: search a field by name or description, or filter by type, level, or whether the field is indexed. Most queries and rules only need the ``core`` fields. Set **Level** to ``core`` to see only those.

Table columns
-------------

Every table in this section describes one field per row. Each field set table lists its fields with the following columns:

-  ``Field``: The full name of the field as it appears in an event, including its field set prefix. For example, ``file.path`` or ``wazuh.agent.id``.
-  ``Type``: The data type the Wazuh indexer uses to store the field's value. For example, ``keyword`` for text such as ``user.name``, ``long`` for whole numbers such as ``file.size``, ``date`` for timestamps such as ``@timestamp``, and ``ip`` for IP addresses.
-  ``Level``: Where the field comes from. ``core`` and ``extended`` fields come from ECS. ``core`` fields are the most widely used, such as ``@timestamp`` and ``user.name``, and ``extended`` fields cover more specific cases. ``custom`` fields are added by WCS, such as ``agent.groups``.
-  ``Normalization``: ``array`` means the field is expected to hold a list of values, for example, ``process.args``. An empty cell means the schema sets no expectation. Any field can still hold a list of values of its type; for example, ``gen_ai.response.finish_reasons``.
-  ``Indexed``: Whether the Wazuh indexer indexes the field so you can search on it. Almost all fields are ``true``. Fields marked ``false``, such as ``event.original``, are stored in the event, but you can't search or filter on them.
-  ``Example``: A sample value for the field, as it would appear in an event. For example, ``/home/alice/example.png`` for ``file.path``.
-  ``Description``: A short explanation of what the field contains. For example, the description of ``file.size`` is "File size in bytes."

.. toctree::
   :maxdepth: 2
   :hidden:

   wcs-field-reference/event-fields
   wcs-field-reference/findings-fields
   wcs-field-reference/state-index-fields
