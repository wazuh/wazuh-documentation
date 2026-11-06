.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Common Schema (WCS) event field sets from A to M, other than wazuh, threat, and process.

Other field sets: A to M
========================

This page lists the event field sets whose name starts with a letter from A to M, other than ``wazuh``, ``threat``, and ``process``, which have their own pages. Each field set starts with a one-sentence description.

Example: Extract the domain name of a DNS query
-----------------------------------------------

``dns.question.name`` holds the domain name that a client asked a DNS server to resolve. This decoder extracts it from the query log of a DNS server.

The decoder is a child of the root decoder of your integration, ``decoder/core-wazuh-message/0``, as in :ref:`Create a security analytics detection workflow <data_analysis_detection_workflow>`. Create it in **Ruleset management** > **Normalization** > **Decoders**, then check the output in **Log test**. The highlighted lines show where ``dns.question.name`` is used and where it appears in the output.

**Sample log**

.. code-block:: none

   acme-dns: client=192.168.1.20 query=updates.example.com type=A rcode=NOERROR

**Decoder**

.. code-block:: yaml
   :emphasize-lines: 12

   name: decoder/acme-dns/0
   enabled: true
   metadata:
     title: Acme DNS query logs
     author: Security Team
     description: Decodes the query log of the Acme DNS server.
   parents:
     - decoder/core-wazuh-message/0
   check:
     - event.original: starts_with("acme-dns:")
   parse|event.original:
     - "acme-dns: client=<client.ip> query=<dns.question.name> type=<dns.question.type> rcode=<dns.response_code>"
   normalize:
     - map:
         - event.kind: "event"
         - event.dataset: "acme-dns"
         - dns.type: "query"

**Output event (excerpt)**

.. code-block:: json
   :emphasize-lines: 6

   {
     "client": { "ip": "192.168.1.20" },
     "dns": {
       "type": "query",
       "question": {
         "name": "updates.example.com",
         "type": "A"
       },
       "response_code": "NOERROR"
     }
   }

.. note::

   -  IOC enrichment checks ``dns.question.name`` against known malicious domains, so mapping it lets Wazuh flag those queries.


Field sets
----------

.. wcs-field-tables:: stateless/events/main
   :exclude-field-sets: wazuh threat process
   :letters: a-m
   :collapsible:
