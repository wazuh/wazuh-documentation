.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: A finding is the security record the Wazuh detection engine produces when an event matches a rule. Learn how Wazuh generates findings in this section.

.. _data_analysis_findings:

Findings
========

A finding is the resulting security record produced by the detection engine after an incoming event passes through the policy pipeline, which includes pre-filtering, decoding, optional enrichment, optional post-filtering, and output delivery. Each active policy receives its own copy of the raw event, which means a single incoming event can generate multiple findings when multiple policies are enabled. Findings in Wazuh 5.0 serve the same role that alerts served in Wazuh 4.x.

The Wazuh normalization engine converts raw logs into Wazuh Common Schema documents. As a result, findings are standardized JSON records that support indexing, querying, correlation, and visualization in the Wazuh indexer and Wazuh dashboard. This schema-first model ensures findings are consistent across supported integrations and remain usable for search, aggregation, and analytics.

Findings preserve the original source log in ``event.original`` while adding structured fields such as ``event.category``, ``event.type``, ``event.action``, and integration-specific schema fields. When enrichment is enabled, findings can also include geo/ASN context and threat intelligence matches, for example, under ``source.geo``, ``source.as``, and ``wazuh.threat``.

Final findings are forwarded to the configured outputs, typically the Wazuh indexer, where they are routed to the appropriate data stream according to their integration category or unclassified status.

Conceptually, the flow is:

**raw log → decoder → normalized event → rule/detector → finding**
