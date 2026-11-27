.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Security enrichment augments normalized events with contextual data such as geo/ASN attributes and threat intelligence matches. Learn more in this section.

.. _data_analysis_enrichment:

Enrichment
==========

Enrichment adds context to normalized events. Geo enrichment adds the geographic location and autonomous system number (ASN) of IP addresses, and IOC enrichment adds threat intelligence matches from the Wazuh Cyber Threat Intelligence (CTI) feed. To turn them on, select them in the settings of the space, as shown at the end of this section. Enrichment only adds fields defined in the Wazuh Common Schema (WCS).

.. _data_analysis_pre_enrichment:

Pre-enrichment
--------------

Pre-enrichment runs right after decoding: it tags each event with its space in ``wazuh.space.name``, removes temporary fields whose names start with ``_``, and drops events that a decoder marked as discarded unless **Index discarded events** is on. To change that setting, go to **Ruleset Management** > **Overview**, select the draft or standard space, and click **Space actions** > **Edit**.

Enrichment
----------

The available enrichments are:

-  Geo enrichment (geo/ASN lookups)

-  IOC enrichment (threat intelligence / CTI matching): one for each indicator type in the Wazuh CTI feed, such as IP addresses, domain names, URLs, and file hashes. The space settings list every type the feed provides.

Enrichment only adds context when lookups or matches succeed. Events continue even if no enrichment applies.

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

.. thumbnail:: /images/manual/data-analysis/ruleset-management-enrichment.png
   :title: Ruleset Management enrichment
   :alt: Ruleset Management enrichment
   :align: center
   :width: 80%

To choose the enrichments that a space applies, open the settings of the space:

.. thumbnail:: /images/manual/data-analysis/security-analytics-space-enrichment-settings.png
   :title: Space enrichment data source settings
   :alt: Space enrichment data source settings
   :align: center
   :width: 80%
