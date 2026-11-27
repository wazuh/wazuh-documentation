.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out how to export the Wazuh findings and events from the Wazuh indexer to Splunk with Logstash and the HTTP Event Collector, and how to install the Splunk app.

Splunk integration
==================

The Splunk integration exports the Wazuh findings and events from the Wazuh indexer to Splunk through Logstash
and the HTTP Event Collector (HEC). A Splunk app provides the indexes, sourcetypes, and dashboards to explore
them. Before you start, read the :doc:`overview </integrations-guide/index>` at the beginning of this guide. It describes what the integrations
export, the export window, and the settings that all integrations share.

Architecture
------------

Logstash reads the ``wazuh-findings-v5-*`` data streams and, optionally, the ``wazuh-events-v5-*`` data
streams from the Wazuh indexer with the ``wazuh-export`` user. It sends every document to the Splunk HEC
endpoint with an HEC token, in batches of one HEC request per pipeline batch (125 events by default). Splunk
stores the events in the ``wazuh-findings``, ``wazuh-events``, or ``wazuh-custom`` index, and the
``wazuh_integration`` app shows them in its dashboards.

Every document becomes an HEC event in the index of its kind of source, with the data stream it was read from
as its source. See :ref:`integrations_destination_of_every_source`. The HEC event has the following fields:

+----------------+---------------------------------------------------------------------+
| HEC field      | Value                                                               |
+================+=====================================================================+
| ``time``       | The ``@timestamp`` of the document.                                 |
+----------------+---------------------------------------------------------------------+
| ``host``       | The name of the Wazuh agent that collected the document             |
|                | (``wazuh.agent.name``), or ``wazuh``.                               |
+----------------+---------------------------------------------------------------------+
| ``source``     | The data stream the document was read from, for example             |
|                | ``wazuh-findings-v5-security``.                                     |
+----------------+---------------------------------------------------------------------+
| ``sourcetype`` | ``wazuh:findings``, ``wazuh:events``, or ``wazuh:custom``.          |
+----------------+---------------------------------------------------------------------+
| ``index``      | ``wazuh-findings``, ``wazuh-events``, or ``wazuh-custom``. You can  |
|                | change them in the settings.                                        |
+----------------+---------------------------------------------------------------------+
| ``fields``     | ``wazuh_document_id``, the ID of the source document, as an indexed |
|                | field.                                                              |
+----------------+---------------------------------------------------------------------+
| ``event``      | The document. Splunk extracts its fields at search time.            |
+----------------+---------------------------------------------------------------------+

Prerequisites
-------------

-  Wazuh indexer |WAZUH_CURRENT|, and a read-only user to export with. See :ref:`integrations_security`.
-  Splunk Enterprise, in a version listed in :ref:`integrations_compatibility`.
-  Logstash, with the ``logstash-input-opensearch`` plugin to read from the Wazuh indexer. The ``http``
   output plugin is bundled with Logstash.
-  The ``integrations`` folder of the same version as the Wazuh indexer.

The commands in this section use ``splunk-ca.pem`` for the CA certificate of Splunk, and ``root-ca.pem`` for
the CA certificate of the Wazuh indexer. The REST API commands connect to the Splunk management port, 8089,
which uses the certificate set in ``serverCert`` of the ``[sslConfig]`` stanza of ``server.conf``, not the HEC
certificate. The default certificate, ``SplunkServerDefaultCert``, isn't issued for the Splunk host name, so
curl rejects it. Replace it with a certificate issued for the Splunk host name, or use Splunk Web instead.

Installing the Splunk app
-------------------------

The ``integrations/splunk/app/wazuh_integration`` app contains the following files:

-  ``indexes.conf``: the ``wazuh-findings``, ``wazuh-events``, and ``wazuh-custom`` indexes, of up to
   500 GB each (``maxTotalDataSizeMB``), with the default Splunk retention (``frozenTimePeriodInSecs``,
   about 6 years). To change them, edit ``local/indexes.conf`` in the app.
-  ``props.conf``: the ``wazuh:findings``, ``wazuh:events``, and ``wazuh:custom`` sourcetypes, which
   extract the JSON fields of every event at search time.
-  ``limits.conf``: raises ``[kv] maxchars`` to 102400. Splunk extracts no fields from an event longer
   than ``maxchars``, 10240 characters by default, and findings often exceed it. This setting applies
   to every app.
-  ``macros.conf``: the ``wazuh_findings``, ``wazuh_events``, and ``wazuh_custom`` macros, which the
   dashboards use as their searches. They are shared with every app.
-  The Dashboard Studio dashboards, in the Dashboards menu of the app, with one submenu per module.
   They are the findings dashboards of the Wazuh dashboard translated to Splunk searches, with the same
   panels, layout, and filters.

The app includes the following dashboards:

-  Threat hunting, MITRE ATT&CK, Malware detection, and Case management.
-  Docker, AWS, Azure, Google Cloud, GitHub, and Office: the findings of each integration.
-  PCI, GDPR, HIPAA, NIST 800-53, NIST 800-171, ISO 27001, TSC, CMMC, FedRAMP, and NIS2: the findings
   of the rules of each compliance framework.
-  The Agent dashboard of each module, which the Wazuh dashboard shows when you pin a Wazuh agent.
   Select the Wazuh agent in the input at the top.
-  The drilldowns of GitHub and Office, which the Wazuh dashboard shows when you click a value in a
   table. Select the value in the input at the top.
-  Wazuh - Events overview, which shows the events.

.. thumbnail:: /images/integrations/splunk-threat-hunting-dashboard.png
   :title: Wazuh - Threat hunting - Overview dashboard in Splunk
   :alt: Wazuh - Threat hunting - Overview dashboard in Splunk
   :align: center
   :width: 80%

.. thumbnail:: /images/integrations/splunk-events-overview-dashboard.png
   :title: Wazuh - Events overview dashboard in Splunk
   :alt: Wazuh - Events overview dashboard in Splunk
   :align: center
   :width: 80%

Package the app and install it from Apps > Manage Apps > Install app from file, or with the CLI:

.. code-block:: bash

   tar -czf wazuh_integration.tgz -C integrations/splunk/app wazuh_integration
   /opt/splunk/bin/splunk install app wazuh_integration.tgz -auth admin
   /opt/splunk/bin/splunk restart

In a distributed deployment, install the indexes on the indexers and the whole app on the search heads.

Upgrading the app keeps the settings in its ``local/`` folder. If Logstash writes to other indexes, create
them and override the macros in ``local/macros.conf``. For example:

.. code-block:: ini

   [wazuh_findings]
   definition = index="my-findings" sourcetype="wazuh:findings"

Setting up the HTTP Event Collector
-----------------------------------

Enable HEC with TLS from Settings > Data inputs > HTTP Event Collector > Global Settings, with All Tokens
enabled and Enable SSL selected, or with the REST API:

.. code-block:: bash
   :emphasize-lines: 1

   curl --cacert splunk-ca.pem -u admin -X POST "https://<SPLUNK_IP>:8089/servicesNS/nobody/splunk_httpinput/data/inputs/http/http" \
     -d disabled=0 -d enableSSL=1

Logstash verifies the HEC certificate and its host name. The default Splunk certificate is issued to
``SplunkServerDefaultCert``, not to the Splunk host name, so the connection fails with it. Configure HEC with
a certificate issued for the host name in ``SPLUNK_HEC_URL``, with ``serverCert`` in the ``[http]`` stanza of
``inputs.conf``.

Create a token that can write to the Wazuh indexes only, from New Token on the same page, or with the REST
API:

.. code-block:: bash
   :emphasize-lines: 1

   curl --cacert splunk-ca.pem -u admin -X POST "https://<SPLUNK_IP>:8089/servicesNS/nobody/splunk_httpinput/data/inputs/http" \
     -d name=wazuh-logstash -d index=wazuh-findings -d indexes=wazuh-findings,wazuh-events,wazuh-custom

The response contains the token. Keep indexer acknowledgment disabled, which is the default. The Logstash
``http`` output doesn't use it.

Configuring Logstash
--------------------

Install the input plugin:

.. code-block:: bash

   /usr/share/logstash/bin/logstash-plugin install --version 1.0.0 logstash-input-opensearch

Copy the pipeline files to a dedicated folder, in this order:

.. code-block:: bash

   mkdir -p /etc/logstash/wazuh
   cp integrations/logstash/pipeline/wazuh-indexer-input.conf /etc/logstash/wazuh/10-wazuh-indexer-input.conf
   cp integrations/logstash/pipeline/wazuh-source.conf /etc/logstash/wazuh/20-wazuh-source.conf
   cp integrations/splunk/logstash/pipeline/indexer-to-splunk.conf /etc/logstash/wazuh/40-indexer-to-splunk.conf

Declare the pipeline in ``/etc/logstash/pipelines.yml``, with a persisted queue. The pipeline is tested with
ECS compatibility disabled.

.. code-block:: yaml

   - pipeline.id: wazuh-splunk
     path.config: "/etc/logstash/wazuh/*.conf"
     pipeline.ecs_compatibility: disabled
     queue.type: persisted
     queue.max_bytes: 4gb

Set the pipeline settings in the environment of the Logstash service, and the secrets in the Logstash
keystore. See :ref:`integrations_tls_credentials`. Keep ``WAZUH_EXPORT_LOOKBACK`` equal to the interval of
``WAZUH_EXPORT_SCHEDULE``, which is the default, because Splunk keeps every copy of a document it receives.
See :ref:`integrations_duplicates`. In addition to the shared settings, the output uses the following
settings:

+---------------------------+--------------------+---------------------------------------------------------------------+
| Setting                   | Default            | Description                                                         |
+===========================+====================+=====================================================================+
| ``SPLUNK_HEC_URL``        | required           | HEC event endpoint,                                                 |
|                           |                    | ``https://<SPLUNK_IP>:8088/services/collector/event``. It takes one |
|                           |                    | URL. To spread the load over several indexers or heavy forwarders,  |
|                           |                    | point it to a load balancer.                                        |
+---------------------------+--------------------+---------------------------------------------------------------------+
| ``SPLUNK_HEC_TOKEN``      | required           | HEC token.                                                          |
+---------------------------+--------------------+---------------------------------------------------------------------+
| ``SPLUNK_CA``             | required           | CA certificate of the HEC endpoint.                                 |
+---------------------------+--------------------+---------------------------------------------------------------------+
| ``SPLUNK_INDEX_FINDINGS`` | ``wazuh-findings`` | Index for findings.                                                 |
+---------------------------+--------------------+---------------------------------------------------------------------+
| ``SPLUNK_INDEX_EVENTS``   | ``wazuh-events``   | Index for events.                                                   |
+---------------------------+--------------------+---------------------------------------------------------------------+
| ``SPLUNK_INDEX_CUSTOM``   | ``wazuh-custom``   | Index for any other data stream.                                    |
+---------------------------+--------------------+---------------------------------------------------------------------+

Restart Logstash to apply the changes.

Validating the integration
--------------------------

After the export delay (5 minutes by default) plus one minute, the indexes contain events. Compare the
document count of a closed time range with the source. For example, count the findings of an hour that ended
more than the export delay ago. In Splunk, run the following search:

.. code-block:: none

   `wazuh_findings` earliest=1792656000 latest=1792659600 | stats count, dc(wazuh_document_id) as unique

On the Wazuh indexer, run the following command:

.. code-block:: bash
   :emphasize-lines: 1

   curl --cacert root-ca.pem -u wazuh-export "https://<WAZUH_INDEXER_IP>:9200/wazuh-findings-v5-*/_count" -H 'Content-Type: application/json' \
     -d '{"query":{"range":{"@timestamp":{"gte":"2026-10-22T08:00:00Z","lt":"2026-10-22T09:00:00Z"}}}}'

The Splunk search takes the range in epoch seconds; in this example, 2026-10-22 08:00 to 09:00 UTC, from
``date -u -d 2026-10-22T08:00:00Z +%s``. Splunk reads a date written as text in the time zone of the Splunk
user, not in UTC like the Wazuh indexer. ``count`` and ``unique`` differ when Splunk receives a document
twice.

Troubleshooting
---------------

+-----------------------------------------------+-----------------------------------------------------------------------+
| Symptom                                       | Cause and solution                                                    |
+===============================================+=======================================================================+
| No events in Splunk, and the Logstash log     | The export user can't read the data streams in                        |
| shows a ``security_exception`` from the Wazuh | ``WAZUH_EXPORT_INDICES``. Add them to its role.                       |
| indexer.                                      |                                                                       |
+-----------------------------------------------+-----------------------------------------------------------------------+
| The Logstash log shows HTTP ``403`` or        | The HEC token is wrong or disabled.                                   |
| ``Invalid token``.                            |                                                                       |
+-----------------------------------------------+-----------------------------------------------------------------------+
| The Logstash log shows a certificate or host  | The HEC certificate isn't issued for the host name in                 |
| name error.                                   | ``SPLUNK_HEC_URL``, or ``SPLUNK_CA`` isn't its CA.                    |
+-----------------------------------------------+-----------------------------------------------------------------------+
| The Logstash log shows HTTP ``400``           | The token can't write to one of the indexes, or the index doesn't     |
| ``Incorrect index``.                          | exist.                                                                |
+-----------------------------------------------+-----------------------------------------------------------------------+
| Events in Splunk have no extracted fields.    | The event is longer than ``[kv] maxchars``. Check the effective value |
|                                               | with ``splunk btool limits list kv --debug``, and check that the app  |
|                                               | is installed on the search heads.                                     |
+-----------------------------------------------+-----------------------------------------------------------------------+
| Dashboards are empty, but events are present. | The indexes differ from the ones in the macros. Override the macros.  |
+-----------------------------------------------+-----------------------------------------------------------------------+
| Findings are missing, but events are present. | The findings were indexed after the run that read their window.       |
|                                               | Increase ``WAZUH_EXPORT_DELAY`` above the detector interval, and      |
|                                               | export the range again. See :ref:`integrations_export_delay` and      |
|                                               | :ref:`integrations_interruptions`.                                    |
+-----------------------------------------------+-----------------------------------------------------------------------+
| Duplicated events.                            | A failed HEC request was sent again, or a backfill overlapped the     |
|                                               | scheduled export. Remove them at search time with ``dedup             |
|                                               | wazuh_document_id``.                                                  |
+-----------------------------------------------+-----------------------------------------------------------------------+
