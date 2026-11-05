.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The fields of the Wazuh Common Schema (WCS) vulnerabilities state indices, with an example document and an example of how to use vulnerability.severity.

Vulnerabilities
===============

The ``wazuh-states-vulnerabilities`` index stores the vulnerabilities that Wazuh detects in the packages of each endpoint, with the affected package, the CVE details, and the severity.

The following example shows a document from the ``wazuh-states-vulnerabilities`` index. It records a vulnerability in the ``python3-pip`` package of the Ubuntu endpoint:

.. code-block:: json

   {
     "_index" : "wazuh-states-vulnerabilities",
     "_id" : "003_5b3f27522bf23ee77f1c543392105c99ccc3cde7_CVE-2025-66471",
     "_score" : 1.0,
     "_source" : {
       "package" : {
         "path" : null,
         "size" : 7026688,
         "name" : "python3-pip",
         "description" : "Python package installer",
         "type" : "deb",
         "version" : "24.0+dfsg-1ubuntu1.3",
         "architecture" : "all"
       },
       "host" : {
         "os" : {
           "kernel" : "7.0.0-38-generic",
           "name" : "Ubuntu",
           "type" : "linux",
           "version" : "24.04.4",
           "platform" : "ubuntu",
           "full" : "Ubuntu 24.04.4 LTS (Noble Numbat)"
         }
       },
       "wazuh" : {
         "schema" : {
           "version" : "1.0.0"
         },
         "cluster" : {
           "name" : "wazuh"
         },
         "agent" : {
           "host" : {
             "hostname" : "ubuntu-QEMU-Virtual-Machine",
             "os" : {
               "name" : "Ubuntu",
               "type" : "linux",
               "version" : "24.04.4 LTS (Noble Numbat)",
               "platform" : "ubuntu"
             },
             "architecture" : "aarch64"
           },
           "name" : "Ubuntu",
           "groups" : [
             "default"
           ],
           "id" : "003",
           "version" : "v5.0.0"
         }
       },
       "state" : {
         "document_version" : 298,
         "modified_at" : "2026-10-29T08:02:08.403Z"
       },
       "vulnerability" : {
         "severity" : "High",
         "detected_at" : "2026-10-29T08:01:38.721Z",
         "score" : {
           "version" : "4.0",
           "base" : 8.9
         },
         "scanner" : {
           "reference" : "https://cti.wazuh.com/vulnerabilities/cves/CVE-2025-66471",
           "condition" : "Fixed in 24.0+dfsg-1ubuntu1.3+esm3",
           "vendor" : "Wazuh",
           "source" : "Canonical Security Tracker"
         },
         "id" : "CVE-2025-66471",
         "category" : "Packages",
         "published_at" : "2025-12-05T17:16:04Z",
         "under_evaluation" : false
       }
     }
   }

Example: Detect high-severity vulnerabilities, then list the ones still open
----------------------------------------------------------------------------

The Wazuh manager sends a vulnerability event each time it detects a vulnerability on an endpoint. ``vulnerability.severity`` is in that event and in the ``wazuh-states-vulnerabilities`` index. A rule flags each new High vulnerability, then a query lists the High vulnerabilities still open in a package, highest score first.

Create the rule in **Ruleset management** > **Detection** > **Rules**. ``logsource.product`` names the integration whose events the rule evaluates. The events come from a built-in integration, so add the rule to a custom integration whose title is the same as the built-in one, for example ``wazuh-fim``. Then promote it to the custom space and add it to a custom detector in **Ruleset management** > **Detection** > **Detectors**. In the query, replace ``<WAZUH_INDEXER_IP_ADDRESS>``, ``<USERNAME>``, and ``<PASSWORD>`` with your values. The highlighted lines show where ``vulnerability.severity`` is used and where it appears in the output.

**1. Rule on vulnerability events**

.. code-block:: yaml
   :emphasize-lines: 11

   logsource:
     product: wazuh-vd
   level: high
   status: experimental
   enabled: true
   detection:
     condition: selection
     selection:
       event.dataset: wazuh.vd
       event.action: vulnerability-detected
       vulnerability.severity: High
   metadata:
     title: High vulnerability detected
     author: Security Team
     description: Detects a newly detected vulnerability with High severity.

**2. Finding (excerpt)**

.. code-block:: json
   :emphasize-lines: 5

   {
     "event": { "dataset": "wazuh.vd", "action": "vulnerability-detected" },
     "vulnerability": {
       "id": "CVE-2025-66418",
       "severity": "High",
       "score": { "base": 8.9 }
     },
     "package": { "name": "python3-pip", "version": "24.0+dfsg-1ubuntu1.3" },
     "wazuh": {
       "agent": { "name": "Ubuntu" },
       "rule": { "title": "High vulnerability detected" }
     }
   }

**3. Query on the state index**

.. code-block:: bash
   :emphasize-lines: 7

   curl -k -u <USERNAME>:<PASSWORD> -X GET "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/wazuh-states-vulnerabilities/_search?pretty" \
     -H 'Content-Type: application/json' -d '
   {
     "query": { "bool": { "filter": [
       { "term": { "wazuh.agent.name": "Ubuntu" } },
       { "term": { "package.name": "python3-pip" } },
       { "term": { "vulnerability.severity": "High" } }
     ] } },
     "sort": [ { "vulnerability.score.base": "desc" } ],
     "_source": [ "vulnerability.id", "vulnerability.severity", "vulnerability.score.base", "package.name", "package.version" ]
   }'

**4. Result (excerpt)**

.. code-block:: json
   :emphasize-lines: 7

   "hits": [
     {
       "_index": "wazuh-states-vulnerabilities",
       "_source": {
         "vulnerability": {
           "id": "CVE-2025-66471",
           "severity": "High",
           "score": { "base": 8.9 }
         },
         "package": { "name": "python3-pip", "version": "24.0+dfsg-1ubuntu1.3" }
       }
     }
   ]

.. note::

   -  ``event.action: vulnerability-detected`` keeps the rule from also firing on ``vulnerability-resolved`` events.
   -  Severity values start with a capital letter: ``Critical``, ``High``, ``Medium``, and ``Low``.
   -  A vulnerability stays in the state index until it's fixed, so the query shows what is still open, not only what is new.


Fields
------

.. wcs-field-tables:: stateful/vulnerabilities
   :single-table:
