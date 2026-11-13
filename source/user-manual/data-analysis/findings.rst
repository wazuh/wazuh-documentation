.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: A finding is the security record the Wazuh detection engine produces when an event matches a rule. Learn how Wazuh generates findings in this section.

.. _data_analysis_findings:

Findings
========

A finding is the security record that the Wazuh detection engine creates on the Wazuh indexer when a normalized event matches a detector rule. First, the Wazuh normalization engine on the Wazuh manager runs the incoming event through the policy pipeline: pre-filtering, decoding, optional enrichment, optional post-filtering, and output delivery. The result is a normalized event, indexed in the ``wazuh-events-v5-<category>`` data stream. On each scheduled run, a detector evaluates the indexed events against its rules and writes a finding for every match to the ``wazuh-findings-v5-<category>`` data stream. Each active policy processes its own copy of the raw event, so an event that both the standard and the custom policy decode is indexed twice, and each copy can produce a finding. Findings in Wazuh 5.0 serve the same role that alerts served in Wazuh 4.x.

The Wazuh normalization engine converts raw logs into Wazuh Common Schema documents. As a result, findings are standardized JSON records that support indexing, querying, correlation, and visualization in the Wazuh indexer and Wazuh dashboard. This schema-first model ensures findings are consistent across supported integrations and remain usable for search, aggregation, and analytics.

Findings preserve the original source log in ``event.original`` while adding structured fields such as ``event.category``, ``event.type``, ``event.action``, and integration-specific schema fields. When enrichment is enabled, findings can also include geo/ASN context and threat intelligence matches, for example, under ``source.geo``, ``source.as``, and ``wazuh.threat``.

The detection engine stores each finding in the ``wazuh-findings-v5-<category>`` data stream that matches the category of the event that triggered it.

Conceptually, the flow is:

**raw log → decoder (Wazuh manager) → normalized event → events data stream → detector rule match (Wazuh indexer) → finding**
