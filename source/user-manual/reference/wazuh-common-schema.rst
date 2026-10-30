.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Common Schema (WCS) defines the fields the Wazuh indexer uses to store events. Learn about the WCS field sets, and find pages on how WCS works, how Wazuh uses WCS fields, the key fields, and the field reference.

.. _reference_wazuh_common_schema:

Wazuh Common Schema (WCS)
=========================

The Wazuh Common Schema (WCS) defines the fields the Wazuh indexer uses to store events. WCS is based on the Elastic Common Schema (ECS) 9.1.0 and includes all ECS fields. Data from every source is normalized to the same field names and types, so you can search and correlate events from different integrations in the same way. To learn how the Wazuh indexer applies WCS templates and event categories, see :doc:`Wazuh Common Schema (WCS) </user-manual/wazuh-indexer/wazuh-common-schema>`.

WCS extends ECS with field sets specific to Wazuh security monitoring:

-  ``wazuh``: Wazuh agent and host details, cluster information, the integration, decoders, and rules that processed the event, the ingestion protocol, and the schema version.
-  ``check`` and ``policy``: Security Configuration Assessment (SCA) check results, including the condition, result, rationale, and remediation, and the policies that group them.
-  ``compliance``: The compliance requirements an event relates to, for CMMC, FedRAMP, GDPR, HIPAA, ISO 27001, NIS2, NIST 800-171, NIST 800-53, PCI DSS, and TSC. SCA checks use the same structure under ``check.compliance``.
-  ``mitre``: The MITRE ATT&CK tactics, techniques, and subtechniques an event relates to, with their IDs and names.
-  ``host``, ``interface``, ``network``, and ``observer`` extensions: Hardware inventory, network interface details, and network traffic counters.
-  Additional fields in ECS field sets: ``agent.groups``, ``event.changed_fields``, ``event.collector``, ``file.diff``, ``vulnerability.scanner.reference``, ``process.state``, ``process.previous.*``, ``service.previous.state``, and ``package.previous.installed``. These record changes in inventory and file integrity monitoring events and add context to vulnerabilities.

In this section
---------------

Each page covers one part of WCS, from how the schema is organized to the complete list of fields. The WCS documentation is organized in the following pages:

.. toctree::
   :maxdepth: 1

   How WCS works <wazuh-common-schema/how-wcs-works>
   How Wazuh uses WCS fields <wazuh-common-schema/how-wazuh-uses-wcs-fields>
   Key WCS fields <wazuh-common-schema/key-wcs-fields>
   WCS field reference <wazuh-common-schema/wcs-field-reference>
