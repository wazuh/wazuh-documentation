.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Common Schema (WCS) defines the fields the Wazuh indexer uses to store events. Learn about the WCS field sets and browse the complete field reference.

.. _reference_wazuh_common_schema:

Wazuh Common Schema (WCS)
=========================

The Wazuh Common Schema (WCS) defines the fields the Wazuh indexer uses to store events. WCS is based on the Elastic Common Schema (ECS) 9.1.0 and includes all ECS fields. Data from every source is normalized to the same field names and types, so you can search and correlate events from different integrations in the same way.

WCS extends ECS with field sets specific to Wazuh security monitoring:

-  ``wazuh``: Wazuh agent and host details, cluster information, the integration, decoders, and rules that processed the event, the ingestion protocol, and the schema version.
-  ``check`` and ``policy``: Security Configuration Assessment (SCA) check results, including the condition, result, rationale, and remediation, and the policies that group them.
-  ``compliance``: The compliance frameworks an event relates to, such as PCI DSS, HIPAA, GDPR, NIST 800-53, ISO 27001, and MITRE ATT&CK. SCA checks use the same structure under ``check.compliance``.
-  ``host``, ``interface``, ``network``, and ``observer`` extensions: Hardware inventory, network interface details, and network traffic counters.
-  Additional fields in ECS field sets: ``agent.groups``, ``event.changed_fields``, ``event.collector``, ``file.diff``, ``vulnerability.scanner.reference``, ``process.state``, ``process.previous.*``, ``service.previous.state``, and ``package.previous.installed``. These record changes in inventory and file integrity monitoring events and add context to vulnerabilities.

The Wazuh indexer doesn't add fields that aren't in the schema to the index mappings, so you can't search on them. It still stores them in the original event (``_source``).

The WCS field reference lists every field with the following columns:

-  ``ECS_Version``: The version of the Elastic Common Schema (ECS) that WCS is based on. All fields use 9.1.0.
-  ``Indexed``: Whether the Wazuh indexer indexes the field so you can search on it. Almost all fields are ``true``. Fields marked ``false``, such as ``event.original``, are stored in the event, but you can't search or filter on them.
-  ``Field_Set``: A field set is a named group of related fields that share a prefix. For example, the ``file`` field set contains ``file.name``, ``file.path``, and ``file.size``, which all describe a file. Values include ``agent``, ``file``, and ``wazuh``.
-  ``Field``: The full name of the field as it appears in an event, including its field set prefix. For example, ``file.path`` or ``wazuh.agent.id``.
-  ``Type``: The data type the Wazuh indexer uses to store the field's value. For example, ``keyword`` for text such as ``user.name``, ``long`` for whole numbers such as ``file.size``, ``date`` for timestamps such as ``@timestamp``, and ``ip`` for IP addresses.
-  ``Level``: Where the field comes from. ``core`` and ``extended`` fields come from ECS. ``core`` fields are the most widely used, such as ``@timestamp`` and ``user.name``, and ``extended`` fields cover more specific cases. ``custom`` fields are added by WCS, such as ``agent.groups``.
-  ``Normalization``: Whether the field can hold more than one value. ``array`` means it can, for example ``process.args``. If this column is empty, the field holds a single value.
-  ``Example``: A sample value for the field, as it would appear in an event. For example, ``/home/alice/example.png`` for ``file.path``.
-  ``Description``: A short explanation of what the field contains. For example, the description of ``file.size`` is "File size in bytes."

The following tables show the `WCS field reference <https://github.com/wazuh/wazuh-indexer-plugins/blob/main/wcs/stateless/events/main/docs/fields.csv>`__, grouped by field set.

.. wcs-field-tables::
