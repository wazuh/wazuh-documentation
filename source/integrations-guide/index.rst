.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to export the Wazuh events and findings data streams from the Wazuh indexer to Elasticsearch, OpenSearch, and Splunk.

Integrations guide: Elastic, OpenSearch, Splunk, Amazon Security Lake
=====================================================================

The Wazuh integrations export the data stored in the Wazuh indexer to third-party platforms. A Logstash
pipeline reads the events and findings data streams of the :doc:`Wazuh Common Schema (WCS) </user-manual/wazuh-indexer/wazuh-common-schema>` and delivers
them to the following platforms:

-  Elasticsearch
-  OpenSearch
-  Splunk

The integration files are in the ``integrations`` folder of the ``wazuh-indexer-plugins`` repository. Clone
the repository at the tag that matches the version of your Wazuh indexer, for example:

.. code-block:: bash

   git clone --depth 1 --branch v|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV| https://github.com/wazuh/wazuh-indexer-plugins.git
   cd wazuh-indexer-plugins

Run the commands in this guide from the ``wazuh-indexer-plugins`` folder.

Architecture
------------

Every integration is a Logstash pipeline. On a schedule, the pipeline reads the ``wazuh-events-v5-*`` and
``wazuh-findings-v5-*`` data streams, and optionally custom data streams, from the Wazuh indexer. It
identifies the source of each document and writes it to the destination: ``logs-wazuh.*`` data streams in
Elasticsearch and OpenSearch, or ``wazuh-*`` indexes through the HTTP Event Collector (HEC) in Splunk.

The pipeline consists of the following files, in this order. All the integrations share the first two files.

+-------------------------------------------------------------------+------------------------------------------------------------------------+
| File                                                              | Purpose                                                                |
+===================================================================+========================================================================+
| ``integrations/logstash/pipeline/wazuh-indexer-input.conf``       | Reads the documents to export from the Wazuh indexer, on a schedule.   |
+-------------------------------------------------------------------+------------------------------------------------------------------------+
| ``integrations/logstash/pipeline/wazuh-source.conf``              | Identifies the source of every document: events, findings, or custom,  |
|                                                                   | and its category.                                                      |
+-------------------------------------------------------------------+------------------------------------------------------------------------+
| ``integrations/logstash/pipeline/wazuh-data-stream.conf``         | Names the destination data stream of every document. Elasticsearch and |
|                                                                   | OpenSearch only.                                                       |
+-------------------------------------------------------------------+------------------------------------------------------------------------+
| ``<INTEGRATION>/logstash/pipeline/indexer-to-<INTEGRATION>.conf`` | Writes the documents to the destination.                               |
+-------------------------------------------------------------------+------------------------------------------------------------------------+

The pipelines read every setting from environment variables or from the `Logstash keystore
<https://www.elastic.co/docs/reference/logstash/keystore>`__, so you don't need to edit any pipeline file to
deploy an integration.

.. _integrations_what_is_exported:

What is exported
----------------

By default, the integrations export the findings and events data streams, ``wazuh-findings-v5-*`` and
``wazuh-events-v5-*``. To export other data streams, set ``WAZUH_EXPORT_INDICES`` to a comma-separated list of
data stream names or patterns:

+-------------------------------+----------------------------------------------------------------+
| Scenario                      | ``WAZUH_EXPORT_INDICES``                                       |
+===============================+================================================================+
| Findings and events (default) | ``wazuh-findings-v5-*,wazuh-events-v5-*``                      |
+-------------------------------+----------------------------------------------------------------+
| Findings only                 | ``wazuh-findings-v5-*``                                        |
+-------------------------------+----------------------------------------------------------------+
| Events only                   | ``wazuh-events-v5-*``                                          |
+-------------------------------+----------------------------------------------------------------+
| Custom data streams           | Their names or patterns, alone or with the above. For example, |
|                               | ``wazuh-findings-v5-*,my-stream``.                             |
+-------------------------------+----------------------------------------------------------------+

The read-only user that Logstash uses must have read access to every data stream in the list. See
:ref:`integrations_wazuh_indexer_user`.

.. note::

   **Findings embed their event.** A finding is a copy of the event that matched a rule, plus the rule
   (``wazuh.rule.*``) and a reference to the event (``event.doc_id`` and ``event.index``). If you
   export both events and findings, the destination stores every matched event twice. This uses more
   storage and, on platforms licensed by volume, more licenses. Export events only if the destination
   needs the events that matched no rule.

The integrations export documents as they are stored in the Wazuh indexer, as WCS documents. The Elasticsearch
and OpenSearch integrations add the ``data_stream`` fields that name the destination data stream.

.. _integrations_destination_of_every_source:

Destination of every source
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The destination keeps every source separate:

+----------------------------------+-------------------------------------------------+--------------------------------------------------------------------+
| Source                           | Elasticsearch and OpenSearch data stream        | Splunk index, sourcetype, and source                               |
+==================================+=================================================+====================================================================+
| ``wazuh-findings-v5-<CATEGORY>`` | ``logs-wazuh.findings.<CATEGORY>-<NAMESPACE>``  | ``wazuh-findings``, ``wazuh:findings``, and the source data stream |
+----------------------------------+-------------------------------------------------+--------------------------------------------------------------------+
| ``wazuh-events-v5-<CATEGORY>``   | ``logs-wazuh.events.<CATEGORY>-<NAMESPACE>``    | ``wazuh-events``, ``wazuh:events``, and the source data stream     |
+----------------------------------+-------------------------------------------------+--------------------------------------------------------------------+
| Any other data stream            | ``logs-wazuh.custom.<DATA_STREAM>-<NAMESPACE>`` | ``wazuh-custom``, ``wazuh:custom``, and the source data stream     |
+----------------------------------+-------------------------------------------------+--------------------------------------------------------------------+

Export window
-------------

Logstash searches the Wazuh indexer on a schedule. Events and findings are stored in append-only data streams,
so every run reads the documents whose ``@timestamp`` falls in the following time window:

.. code-block:: none

   [now - WAZUH_EXPORT_DELAY - WAZUH_EXPORT_LOOKBACK, now - WAZUH_EXPORT_DELAY)

Both ends of the window are rounded down to the minute. With the default settings, Logstash runs every minute
and reads a one-minute window that ends five minutes before the current time. For example, the run at 10:06
reads from 10:00 to 10:01, and the run at 10:07 reads from 10:01 to 10:02. Consecutive runs read consecutive
windows, so Logstash reads every document once.

.. _integrations_export_delay:

Export delay
^^^^^^^^^^^^

The ``@timestamp`` field is the time the Wazuh engine received the event, and a finding carries the
``@timestamp`` of its event. However, the Ruleset Management detectors write findings on their own schedule,
every ``plugins.content_manager.security_analytics.detector_interval`` minutes, 2 by default. As a result, a
finding is indexed up to one detector interval plus the detector run duration after its ``@timestamp``.

The scheduled export never reads a document that is indexed after the run that covers its window. To avoid
this, keep the delay longer than the following sum:

.. code-block:: none

   WAZUH_EXPORT_DELAY > longest detector interval + detector run time + refresh interval

The default delay of 5 minutes covers the default detector interval with a margin. Increase the delay if you
increase the detector interval, or if the detectors fall behind under load. The delay is also the export
latency: Logstash reads a document between ``WAZUH_EXPORT_DELAY`` and ``WAZUH_EXPORT_DELAY +
WAZUH_EXPORT_LOOKBACK`` after its ``@timestamp``.

.. _integrations_interruptions:

Interruptions
^^^^^^^^^^^^^

The export doesn't keep a checkpoint. While Logstash or the Wazuh indexer is down, it doesn't export the
missed windows. To export a missed time range, run ``wazuh-indexer-backfill.conf`` once in place of
``wazuh-indexer-input.conf``, and set the range in ``WAZUH_BACKFILL_FROM`` and ``WAZUH_BACKFILL_TO``, in ISO
8601 format and UTC.

.. _integrations_duplicates:

Duplicates
^^^^^^^^^^

-  Elasticsearch and OpenSearch: The exported document uses the source document ID, and the destination
   drops documents it already has. Reading a window twice, during a backfill or after a restart, adds
   no duplicates. This check only covers the backing index that holds the document. A copy written
   after the destination data stream rolls over is stored as a new document.
-  Splunk: Splunk keeps every copy it receives, so give a backfill only the missing range. Every event
   carries the ID of its source document in the ``wazuh_document_id`` indexed field. Use this field to
   remove duplicates at search time, for example, ```wazuh_findings` | dedup wazuh_document_id``.

.. _integrations_security:

Security
--------

The integrations need two users, and neither needs administrator privileges: a read-only user on the Wazuh
indexer, described below, and a writer user on the destination, described in the section of each integration.
Logstash connects to the Wazuh indexer on port ``9200``, and to the destination on its own port: ``9200`` for
Elasticsearch and OpenSearch, and ``8088`` for the Splunk HEC.

.. _integrations_wazuh_indexer_user:

Wazuh indexer user
^^^^^^^^^^^^^^^^^^

Logstash reads from the Wazuh indexer with a read-only user. Using a Wazuh indexer user with permission to
manage security, create a role that can search the exported data streams, and a user mapped to that role. For
example, with the security REST API:

.. code-block:: bash
   :emphasize-lines: 1,9,10,11

   curl --cacert root-ca.pem -u admin -X PUT "https://<WAZUH_INDEXER_IP>:9200/_plugins/_security/api/roles/wazuh-export" \
     -H 'Content-Type: application/json' -d '{
     "description": "Read-only access to export the Wazuh events and findings data streams",
     "cluster_permissions": ["cluster:monitor/main", "indices:data/read/scroll", "indices:data/read/scroll/clear"],
     "index_permissions": [
       { "index_patterns": ["wazuh-events-v5-*", "wazuh-findings-v5-*"], "allowed_actions": ["read"] }
     ]
   }'
   curl --cacert root-ca.pem -u admin -X PUT "https://<WAZUH_INDEXER_IP>:9200/_plugins/_security/api/internalusers/wazuh-export" \
     -H 'Content-Type: application/json' -d '{"password": "<WAZUH_EXPORT_PASSWORD>"}'
   curl --cacert root-ca.pem -u admin -X PUT "https://<WAZUH_INDEXER_IP>:9200/_plugins/_security/api/rolesmapping/wazuh-export" \
     -H 'Content-Type: application/json' -d '{"users": ["wazuh-export"]}'

To export custom data streams, add them to ``index_patterns``.

.. _integrations_tls_credentials:

TLS and credentials
^^^^^^^^^^^^^^^^^^^

All connections use TLS and are verified against the CA certificate of each side, set in ``WAZUH_INDEXER_CA``,
``ELASTIC_CA``, ``OPENSEARCH_CA``, and ``SPLUNK_CA``. If a side uses a certificate from a public certificate
authority, such as Elastic Cloud, set its CA setting to the CA bundle of the operating system, for example,
``/etc/ssl/certs/ca-certificates.crt``.

Store the passwords and the HEC token in the `Logstash keystore
<https://www.elastic.co/docs/reference/logstash/keystore>`__, not in environment variables.

Settings
--------

The following settings apply to the shared pipeline files. The section of each integration lists the settings
of its output. Set them in the environment of the Logstash service, in ``/etc/default/logstash`` on Debian and
Ubuntu or ``/etc/sysconfig/logstash`` on Red Hat, and store the secrets in the Logstash keystore.

The defaults for the settings marked required only fit the repository's development environments. Set them in
every deployment.

+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| Setting                    | Default                                   | Description                                                           |
+============================+===========================================+=======================================================================+
| ``WAZUH_INDEXER_HOST``     | required                                  | Wazuh indexer node, in ``host:port`` format. It takes one node. To    |
|                            |                                           | spread the reads over a cluster, point it to a load balancer, or list |
|                            |                                           | the nodes in ``hosts`` of ``wazuh-indexer-input.conf``.               |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| ``WAZUH_INDEXER_USERNAME`` | required                                  | Read-only user that Logstash exports with.                            |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| ``WAZUH_INDEXER_PASSWORD`` | required                                  | Password of that user.                                                |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| ``WAZUH_INDEXER_CA``       | required                                  | CA certificate of the Wazuh indexer.                                  |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| ``WAZUH_EXPORT_INDICES``   | ``wazuh-findings-v5-*,wazuh-events-v5-*`` | Comma-separated data streams or patterns to export.                   |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| ``WAZUH_EXPORT_LOOKBACK``  | ``1m``                                    | Length of the window that every run reads. Keep it equal to the       |
|                            |                                           | interval of the schedule.                                             |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| ``WAZUH_EXPORT_DELAY``     | ``5m``                                    | How far behind the current time the window ends. See                  |
|                            |                                           | :ref:`integrations_export_delay`.                                     |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| ``WAZUH_EXPORT_SCHEDULE``  | ``* * * * *``                             | Cron schedule of the runs.                                            |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| ``WAZUH_EXPORT_NAMESPACE`` | ``default``                               | Namespace of the destination data streams. Elasticsearch and          |
|                            |                                           | OpenSearch only.                                                      |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+
| ``WAZUH_BACKFILL_FROM``,   |                                           | Time range to read, in ISO 8601 format.                               |
| ``WAZUH_BACKFILL_TO``      |                                           | ``wazuh-indexer-backfill.conf`` only.                                 |
+----------------------------+-------------------------------------------+-----------------------------------------------------------------------+

Sizing
------

-  Logstash: The integrations are tested with a 1 GB heap and the default number of workers and batch
   size. Size the persisted queue (``queue.max_bytes``) for the longest destination outage that
   Logstash must absorb: export rate × outage duration.
-  Destination: Every exported document is written once. Exporting both findings and events stores
   every matched event twice. See :ref:`integrations_what_is_exported`.

Several integrations
^^^^^^^^^^^^^^^^^^^^

To export to several destinations, run one pipeline per integration, each in its own folder and with its own
``pipeline.id`` in ``pipelines.yml``. Every pipeline reads the Wazuh indexer independently, so the read load
adds up.

Monitoring
----------

The Logstash monitoring API reports, for every pipeline, the documents read, written, and waiting in the
queue:

.. code-block:: bash

   curl -s "http://localhost:9600/_node/stats/pipelines/<PIPELINE_ID>?pretty"

-  ``events.in`` and ``events.out`` grow with every run. If ``events.in`` stops growing, the runs are
   failing. Check the Logstash log for errors of the ``wazuh-indexer`` input.
-  ``queue.events_count`` grows while the destination doesn't accept documents.

Upgrading
---------

Upgrade the integration every time you upgrade the Wazuh indexer. Run these steps from the
``wazuh-indexer-plugins`` folder of the new version:

#. Install the index template again and, for OpenSearch, the ISM policy, as described in the
   integration section. A new template applies only to backing indices created after it. To apply it
   immediately, roll over every data stream with ``POST <DATA_STREAM>/_rollover``.
#. Replace the pipeline files and restart Logstash.
#. Import the dashboards again with ``overwrite=true``. For Splunk, install the new package of the
   Splunk app instead: ``splunk install app wazuh_integration.tgz -update 1``.

.. _integrations_compatibility:

Compatibility
-------------

The integrations are tested with the following versions:

.. list-table::
   :header-rows: 1

   * - Wazuh indexer
     - Logstash
     - Elasticsearch
     - OpenSearch
     - Splunk
   * - |WAZUH_CURRENT|
     - 8.19.23
     - 9.5.4
     - 3.9.0
     - 10.6.0

.. toctree::
   :hidden:

   elastic-stack/index
   opensearch/index
   splunk/index
