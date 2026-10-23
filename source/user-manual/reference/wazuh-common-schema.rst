.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Common Schema (WCS) defines the fields the Wazuh indexer uses to store events. Learn about the WCS modules and field sets, and browse the field reference.

.. _reference_wazuh_common_schema:

WCS field reference
===================

The Wazuh Common Schema (WCS) defines the fields the Wazuh indexer uses to store events. WCS is based on the Elastic Common Schema (ECS) 9.1.0 and includes all ECS fields. Data from every source is normalized to the same field names and types, so you can search and correlate events from different integrations in the same way. To learn how the Wazuh indexer applies WCS templates and event categories, see :doc:`Wazuh Common Schema (WCS) </user-manual/wazuh-indexer/wazuh-common-schema>`.

WCS extends ECS with field sets specific to Wazuh security monitoring:

-  ``wazuh``: Wazuh agent and host details, cluster information, the integration, decoders, and rules that processed the event, the ingestion protocol, and the schema version.
-  ``check`` and ``policy``: Security Configuration Assessment (SCA) check results, including the condition, result, rationale, and remediation, and the policies that group them.
-  ``compliance``: The compliance requirements an event relates to, for CMMC, FedRAMP, GDPR, HIPAA, ISO 27001, NIS2, NIST 800-171, NIST 800-53, PCI DSS, and TSC. SCA checks use the same structure under ``check.compliance``.
-  ``mitre``: The MITRE ATT&CK tactics, techniques, and subtechniques an event relates to, with their IDs and names.
-  ``host``, ``interface``, ``network``, and ``observer`` extensions: Hardware inventory, network interface details, and network traffic counters.
-  Additional fields in ECS field sets: ``agent.groups``, ``event.changed_fields``, ``event.collector``, ``file.diff``, ``vulnerability.scanner.reference``, ``process.state``, ``process.previous.*``, ``service.previous.state``, and ``package.previous.installed``. These record changes in inventory and file integrity monitoring events and add context to vulnerabilities.

The Wazuh indexer doesn't add fields that aren't in the schema to the index mappings, so you can't search on them. It still stores them in the original event (``_source``).

WCS modules
-----------

WCS is organized in modules. Each module defines the data model of one type of index, and the ``fields.csv`` file in its ``docs`` folder lists the fields of that index. The modules are in two folders of the `wazuh-indexer-plugins repository <https://github.com/wazuh/wazuh-indexer-plugins/tree/|WAZUH_CURRENT|/wcs/>`__:

-  `Stateless modules <https://github.com/wazuh/wazuh-indexer-plugins/tree/|WAZUH_CURRENT|/wcs/stateless>`__: Data streams and time-series indices, which store events, findings, and metrics as they happen. The main module, ``stateless/events/main``, is the base template for all of them. Its fields are the ones in the tables below.
-  `Stateful modules <https://github.com/wazuh/wazuh-indexer-plugins/tree/|WAZUH_CURRENT|/wcs/stateful>`__: State indices, which store the latest known state of each monitored endpoint, such as its monitored files, installed packages, and vulnerabilities.

Each field set table lists its fields with the following columns:

-  ``Field``: The full name of the field as it appears in an event, including its field set prefix. For example, ``file.path`` or ``wazuh.agent.id``.
-  ``Type``: The data type the Wazuh indexer uses to store the field's value. For example, ``keyword`` for text such as ``user.name``, ``long`` for whole numbers such as ``file.size``, ``date`` for timestamps such as ``@timestamp``, and ``ip`` for IP addresses.
-  ``Level``: Where the field comes from. ``core`` and ``extended`` fields come from ECS. ``core`` fields are the most widely used, such as ``@timestamp`` and ``user.name``, and ``extended`` fields cover more specific cases. ``custom`` fields are added by WCS, such as ``agent.groups``.
-  ``Normalization``: ``array`` means the field is expected to hold a list of values, for example ``process.args``. An empty cell means the schema sets no expectation. Any field can still hold a list of values of its type, as some examples show, for example ``gen_ai.response.finish_reasons``.
-  ``Indexed``: Whether the Wazuh indexer indexes the field so you can search on it. Almost all fields are ``true``. Fields marked ``false``, such as ``event.original``, are stored in the event, but you can't search or filter on them.
-  ``Example``: A sample value for the field, as it would appear in an event. For example, ``/home/alice/example.png`` for ``file.path``.
-  ``Description``: A short explanation of what the field contains. For example, the description of ``file.size`` is "File size in bytes."

The following tables show the `WCS field reference <|WCS_FIELDS_PAGE_URL|>`__, grouped by field set.

Each field set table starts with a one-sentence description of the field set. ECS field sets use their short description from `ECS 9.1.0 <https://github.com/elastic/ecs/tree/v9.1.0/schemas>`__. The field sets that WCS adds use the following descriptions:

-  ``wazuh``: Fields Wazuh adds to describe how it collected and processed the event.
-  ``check``: The results of Security Configuration Assessment (SCA) checks, including the condition, the result, the rationale, and the remediation.
-  ``policy``: The SCA policies that group the checks.
-  ``compliance``: The compliance requirements an event relates to.
-  ``mitre``: The MITRE ATT&CK tactics, techniques, and subtechniques an event relates to.

.. wcs-field-tables::
