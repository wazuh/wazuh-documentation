.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Common Schema (WCS) event field sets from N to Z, other than wazuh, threat, and process.

Other field sets: N to Z
========================

This page lists the event field sets whose name starts with a letter from N to Z, other than ``wazuh``, ``threat``, and ``process``, which have their own pages. Each field set starts with a one-sentence description.

Example: Map the domain of a URL from a web proxy log
-----------------------------------------------------

``url.domain`` holds the domain part of a URL. This decoder parses the URL with the ``uri`` parser into a temporary field, then maps the domain into ``url.domain``.

The decoder is a child of the root decoder of the space, ``decoder/core-wazuh-message/0``, as in :ref:`Create a security analytics detection workflow <data_analysis_detection_workflow>`. Create it in **Ruleset management** > **Normalization** > **Decoders**, then check the output in **Log test**. The highlighted lines show where ``url.domain`` is used and where it appears in the output.

**Sample log**

.. code-block:: none

   acme-proxy: src=10.0.0.15 user=alice url=https://downloads.example.com/tools/setup.exe ua="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"

**Decoder**

.. code-block:: yaml
   :emphasize-lines: 18

   name: decoder/acme-proxy/0
   enabled: true
   metadata:
     title: Acme web proxy logs
     author: Security Team
     description: Decodes the access log of the Acme web proxy.
   parents:
     - decoder/core-wazuh-message/0
   check:
     - event.original: starts_with("acme-proxy:")
   parse|event.original:
     - "acme-proxy: src=<source.ip> user=<user.name> url=<_url/uri> ua=\"<user_agent.original>\""
   normalize:
     - map:
         - event.kind: "event"
         - event.dataset: "acme-proxy"
         - url.original: $_url.original
         - url.domain: $_url.domain
         - url.path: $_url.path

**Output event (excerpt)**

.. code-block:: json
   :emphasize-lines: 4

   {
     "url": {
       "original": "https://downloads.example.com/tools/setup.exe",
       "domain": "downloads.example.com",
       "path": "/tools/setup.exe"
     },
     "source": { "ip": "10.0.0.15" },
     "user": { "name": "alice" }
   }

.. note::

   -  The ``uri`` parser needs a literal after it, here ``ua=``, to know where the URL ends.


Field sets
----------

.. wcs-field-tables:: stateless/events/main
   :exclude-field-sets: wazuh threat process
   :letters: n-z
   :collapsible:
