.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn the key terms of Wazuh data analysis, such as policy, space, promotion, integration, decoder, rule, detector, and finding.

.. _data_analysis_key_concepts:

Key concepts
============

The following terms are used across the Wazuh 5.0 data analysis documentation:

-  **Policy**: The routing document of a space. It sets which integrations and filters are active and in what order, the root decoder, the enrichments, and whether unclassified and discarded events are indexed. Each space has its own policy: the standard policy runs the Wazuh content, and the custom policy runs yours.

-  **Space**: A storage location for detection content: draft, test, custom, or standard. You create and edit content only in the draft space. See :ref:`Space <data_analysis_space>`.

-  **Promotion**: Copying the content of a space to the next space in the chain draft → test → custom. Content runs on live events only after you promote it to the custom space. See :ref:`Promotion workflow <data_analysis_promotion_workflow>`.

-  **Integration**: The container for the content of one log source: its decoders, KVDBs, and rules. Its category sets the ``wazuh-events-v5-<category>`` data stream where its events are indexed. See :ref:`Integration <data_analysis_integration>`.

-  **Decoder**: A YAML asset that checks, parses, and normalizes raw events into WCS fields. See :ref:`Decoders <data_analysis_decoders>`.

-  **Root decoder**: The decoder where every event enters the decoders of a space. Each space sets its own root decoder in its policy.

-  **Decoder tree**: The decoders of a space, linked to each other by their ``parents`` field and starting from the root decoder.

-  **Asset**: A unit of content that the normalization engine loads, such as a decoder or a filter.

-  **Filter**: An asset that keeps or drops events before decoding (pre-filter) or after it (post-filter). See :ref:`Filters <data_analysis_filters>`.

-  **KVDB**: Key-value database: a named set of key-value pairs that decoders and rules look up to match or enrich events. See :ref:`Key-Value Databases (KVDBs) <data_analysis_kvdb>`.

-  **Event**: A normalized event: the WCS document that the normalization engine produces from a raw log and indexes in ``wazuh-events-v5-<category>``.

-  **Unclassified event**: An event that no decoder of the policy accepts. Wazuh indexes it only when the **Index unclassified events** setting of the space is on.

-  **Discarded event**: An event that a filter or a decoder marks to be dropped. Wazuh indexes it only when the **Index discarded events** setting of the space is on.

-  **Rule**: A detection rule in Sigma format with Wazuh extensions. The detection engine evaluates it against indexed events. See :ref:`Rules <data_analysis_rules>`.

-  **Detector**: A scheduled job on the Wazuh indexer that evaluates the events of one integration against a set of rules. See :ref:`Detectors <data_analysis_detectors>`.

-  **Finding**: The record a detector creates when an event matches a rule, stored in ``wazuh-findings-v5-<category>``. See :ref:`Findings <data_analysis_findings>`.

-  **Content Manager**: The Wazuh indexer plugin that stores all detection content, synchronizes the standard content from Wazuh CTI, provides the API for custom content, and runs promotions.

-  **Content synchronization (CMSync)**: The Wazuh manager service that pulls the policy and content of each space from the Wazuh indexer and loads them into the normalization engine.

-  **CTI**: Wazuh Cyber Threat Intelligence, the service that publishes the standard detection content, vulnerability data, and indicators of compromise (IOCs).

-  **WCS**: Wazuh Common Schema, the field schema of normalized events and findings.
