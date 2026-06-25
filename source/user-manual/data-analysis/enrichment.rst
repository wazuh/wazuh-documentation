.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Security enrichment augments normalized events with contextual data such as geo/ASN attributes and threat intelligence matches. Learn more in this section.

.. _data_analysis_enrichment:

Enrichment
==========

The security enrichment stage in the Wazuh 5.0 data analysis engine runs after decoding and before post-filtering, augmenting normalized events with contextual information such as geo/ASN attributes and threat intelligence matches. Enrichment is strictly schema-driven: only fields defined in the Wazuh Common Schema (WCS) are considered, ensuring additional context remains indexable and consistent.

Security enrichment is implemented as two consecutive pipeline stages inside each policy:

-  Pre-enrichment: control and preparation.

-  Enrichment: context providers (geo, IOC, etc.).

Pre-enrichment
--------------

Pre-enrichment is the first part of the security enrichment process and executes immediately after the decoding stage. It finalizes the decoded event, attaches policy context, and determines eligibility for further enrichment.

Pre-enrichment runs in the following order:

#. Space enrichment

#. Discarded-events filter

#. Cleanup of decoder temporary variables

Space enrichment
^^^^^^^^^^^^^^^^

The normalization engine annotates each event with the space from which the policy is being executed. This allows downstream components (dashboards, routing, reporting) to differentiate Wazuh standard security policies from custom user-defined security policies at the event level.

Conceptually, pre-enrichment ensures that every event is annotated with the following field:

.. code-block:: json

   {
     "wazuh": {
       "space": {
         "name": "standard|custom"
       }
     }
   }

This field is later used by outputs and analytics to slice data per content space and identify which security policy pipeline produced a specific document.

Discarded events filter
^^^^^^^^^^^^^^^^^^^^^^^

The discarded-events filter decides whether events that have been marked as "discarded" during decoding or filtering are allowed to continue into enrichment and outputs. The behavior is controlled at the policy level:

-  If discarded-events indexing is enabled, discarded events still traverse the remainder of the pipeline and can be indexed for observability and troubleshooting.

-  If discarded-events indexing is disabled and the event is marked as discarded, the pipeline stops at pre-enrichment, and the event is dropped. Otherwise, events proceed normally.

This decision is implemented using a helper condition (see the `helper functions <https://github.com/wazuh/wazuh/blob/main/docs/ref/modules/engine/ref-helper-functions.md>`__ reference) so that the "discard or keep" semantics can be centrally enforced and consistently reused across policies.

Cleanup of decoder temporary variables
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Decoders in the normalization engine can write to temporary variables during event processing. Temporary variables are fields whose names start with ``_`` (for example, ``_raw_message``, ``_parsed_ts``). These fields act as scratch space for intermediate parsing results and cross-decoder communication while the event traverses the decoder tree.

At the end of pre-enrichment, the normalization engine performs a mandatory cleanup step that removes all temporary variables from the event. After this cleanup:

-  Every remaining field is guaranteed to belong to the Wazuh Common Schema.

-  The event is safe to send to the Wazuh indexer, which only accepts schema-conformant fields.

This invariant is critical for avoiding ingestion failures and keeping the index mappings stable over time.

Enrichment
----------

Once pre-enrichment completes and the event has been validated, the normalization engine enters the enrichment stage. At this point, the event is already normalized, schema-compliant, and annotated with its space, so enrichment can focus purely on adding contextual data without affecting pipeline control flow.

Enrichments are defined in the policy document as an ordered array, and each configured enrichment is evaluated sequentially for every event. Typical enrichments in Wazuh 5.0 include:

-  Geo enrichment (geo/ASN lookups)

-  IOC enrichment (threat intelligence / CTI matching)

Unlike pre-enrichment, the enrichment stage does not decide whether an event should continue in the pipeline. It only adds context when lookups or matches succeed. Events continue even if no enrichment applies.

Geo enrichment
^^^^^^^^^^^^^^

Geo enrichment evaluates the event fields declared in the geo/ASN source definitions and, when applicable, adds geographic and autonomous system context to the event. Typically, the observed fields are IP addresses that appear in standard WCS locations such as ``source.ip`` or ``destination.ip``.

When a valid IP is found and a lookup succeeds, geo enrichment may populate fields such as:

-  Geographic attributes: country, city, region, continent, timezone.

-  Coordinate data: latitude and longitude (for mapping and geo-dashboards).

-  ASN attributes: AS number and AS organization name.

**Processed event**:

.. code-block:: json

   {
     "source": {
       "ip": "8.8.8.8",
       "geo": {
         "country_name": "United States",
         "location": {
           "lat": 37.751,
           "lon": -97.822
         }
       },
       "as": {
         "number": 15169,
         "organization": {
           "name": "Google LLC"
         }
       }
     }
   }

By attaching geo/ASN context at the normalization level, Wazuh enables location-aware detections, AS-based allow/deny logic, and richer visualizations without requiring every integration to implement its own geo logic.

IOC enrichment
^^^^^^^^^^^^^^

IOC enrichment inspects the fields declared in the IOC source definitions and checks them against known indicators of compromise. The observation rules can cover different indicator types, for example:

-  IP addresses and connection-based indicators.

-  Domains and hostnames.

-  URLs.

-  Hashes and other supported indicator values.

For network IOC enrichment, the normalization engine explicitly supports connection-based semantics: it builds a connection key (for example, ``source.ip:source.port``) from the event and matches it against CTI data, rather than restricting matching to standalone IPs.

If an IOC match is found, the event is enriched with threat context under ``wazuh.threat``, which can include:

-  Indicator metadata (type, ID, feed/provider, first/last seen).

-  Software or campaign information (name, alias, malware type).

-  Tags used by the CTI provider (for example, "Botnet", "C2", AS number tags).

-  The event fields that triggered the match (for example, ``source.ip``, ``destination.ip``).

**Processed event**:

.. code-block:: json

   {
     "wazuh": {
       "threat": {
         "indicator": {
           "type": "ipv4-addr",
           "ip": "203.0.113.10"
         },
         "enrichments": [
           {
             "matched": {
               "field": "destination.ip"
             }
           }
         ]
       }
     }
   }

This model makes IOC enrichment an augmenting step: the event continues to output, now carrying CTI-backed context that downstream detection rules, dashboards, or response playbooks can consume.

.. thumbnail:: /images/manual/data-analysis/security-analytics-enrichment.png
   :title: Security Analytics enrichment
   :alt: Security Analytics enrichment
   :align: center
   :width: 80%

You can specify the enrichment data source from the settings within your Space.

.. thumbnail:: /images/manual/data-analysis/security-analytics-space-enrichment-settings.png
   :title: Space enrichment data source settings
   :alt: Space enrichment data source settings
   :align: center
   :width: 80%
