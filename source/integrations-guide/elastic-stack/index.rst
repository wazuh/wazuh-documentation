.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out how to export the Wazuh findings and events from the Wazuh indexer to Elasticsearch data streams with Logstash, and how to import the Kibana dashboards.

Elasticsearch integration
=========================

The Elasticsearch integration exports the Wazuh findings and events from the Wazuh indexer to Elasticsearch
data streams through Logstash, and provides Kibana dashboards to explore them. Before you start, read the
:doc:`overview </integrations-guide/index>` at the beginning of this guide. It describes what the integrations export, the export window, and the
settings that all integrations share.

Architecture
------------

Logstash reads the ``wazuh-findings-v5-*`` data streams and, optionally, the ``wazuh-events-v5-*`` data
streams from the Wazuh indexer with the ``wazuh-export`` user. It writes every source data stream to its own
Elasticsearch data stream, ``logs-wazuh.findings.*-default`` or ``logs-wazuh.events.*-default``, with the
``wazuh-logstash`` user. See :ref:`integrations_destination_of_every_source`. The ``wazuh`` index template
maps the WCS fields of all these data streams, and Kibana shows them in the Wazuh dashboards.

Prerequisites
-------------

-  Wazuh indexer |WAZUH_CURRENT|, and a read-only user to export with. See :ref:`integrations_security`.
-  Elasticsearch and Kibana, in a version listed in :ref:`integrations_compatibility`.
-  Logstash, with the ``logstash-input-opensearch`` plugin to read from the Wazuh indexer. The
   ``elasticsearch`` output plugin is bundled with Logstash.
-  The ``integrations`` folder of the same version as the Wazuh indexer.

The commands in this section use ``ca.crt`` for the CA certificate of Elasticsearch, and ``root-ca.pem`` for
the CA certificate of the Wazuh indexer.

Preparing Elasticsearch
-----------------------

Run these steps as an Elasticsearch administrator.

Install the index template of the ``logs-wazuh.*-*`` data streams. The template maps the WCS fields and
assigns the built-in ``logs`` lifecycle policy to the data streams: they roll over at 30 days or 50 GB per
primary shard, and no data is deleted. Elasticsearch creates the data streams in the ``logsdb`` index mode,
which it applies to every ``logs-*-*`` data stream to reduce storage.

.. code-block:: bash
   :emphasize-lines: 1

   curl --cacert ca.crt -u elastic -X PUT "https://<ELASTICSEARCH_IP>:9200/_index_template/wazuh" \
     -H 'Content-Type: application/json' -d @integrations/elastic/templates/wazuh-index-template.json

Retention and other settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Every upgrade of the integration installs the template again. To change its settings or mappings, create the
``logs-wazuh@custom`` component template instead. The index template uses this component template when it
exists, and upgrades keep it. For example, to delete the data 90 days after it rolls over, create a lifecycle
policy and select it in the component template:

.. code-block:: bash
   :emphasize-lines: 1,10

   curl --cacert ca.crt -u elastic -X PUT "https://<ELASTICSEARCH_IP>:9200/_ilm/policy/wazuh-90-days" \
     -H 'Content-Type: application/json' -d '{
     "policy": {
       "phases": {
         "hot": { "actions": { "rollover": { "max_age": "30d", "max_primary_shard_size": "50gb" } } },
         "delete": { "min_age": "90d", "actions": { "delete": {} } }
       }
     }
   }'
   curl --cacert ca.crt -u elastic -X PUT "https://<ELASTICSEARCH_IP>:9200/_component_template/logs-wazuh@custom" \
     -H 'Content-Type: application/json' -d '{"template": {"settings": {"index.lifecycle.name": "wazuh-90-days"}}}'

The change applies to the backing indices created after it. To apply it to the current backing indices
immediately, roll over every data stream with ``POST <DATA_STREAM>/_rollover``.

Writer user
^^^^^^^^^^^

Create the role and the user that Logstash writes with. The ``create_doc`` privilege appends documents, and
``auto_configure`` creates the data streams when their first document arrives:

.. code-block:: bash
   :emphasize-lines: 1,7,8

   curl --cacert ca.crt -u elastic -X PUT "https://<ELASTICSEARCH_IP>:9200/_security/role/wazuh-logstash-writer" \
     -H 'Content-Type: application/json' -d '{
     "description": "Write the Wazuh events and findings exported by Logstash",
     "cluster": ["monitor"],
     "indices": [{ "names": ["logs-wazuh.*-*"], "privileges": ["create_doc", "auto_configure"] }]
   }'
   curl --cacert ca.crt -u elastic -X PUT "https://<ELASTICSEARCH_IP>:9200/_security/user/wazuh-logstash" \
     -H 'Content-Type: application/json' -d '{"password": "<WAZUH_LOGSTASH_PASSWORD>", "roles": ["wazuh-logstash-writer"]}'

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
   cp integrations/logstash/pipeline/wazuh-data-stream.conf /etc/logstash/wazuh/30-wazuh-data-stream.conf
   cp integrations/elastic/logstash/pipeline/indexer-to-elastic.conf /etc/logstash/wazuh/40-indexer-to-elastic.conf

Declare the pipeline in ``/etc/logstash/pipelines.yml``, with a persisted queue and the dead letter queue. The
pipeline is tested with ECS compatibility disabled.

.. code-block:: yaml

   - pipeline.id: wazuh-elastic
     path.config: "/etc/logstash/wazuh/*.conf"
     pipeline.ecs_compatibility: disabled
     queue.type: persisted
     queue.max_bytes: 4gb
     dead_letter_queue.enable: true

Set the pipeline settings in the environment of the Logstash service, and the secrets in the Logstash
keystore. See :ref:`integrations_tls_credentials`. In addition to the shared settings, the output uses the
following settings:

+----------------------+----------+--------------------------------------------------------------------+
| Setting              | Default  | Description                                                        |
+======================+==========+====================================================================+
| ``ELASTIC_HOST``     | required | Elasticsearch URL, ``https://<ELASTICSEARCH_IP>:9200``, or several |
|                      |          | URLs separated by spaces. On Elastic Cloud, use the Elasticsearch  |
|                      |          | endpoint of the deployment, on port ``443``.                       |
+----------------------+----------+--------------------------------------------------------------------+
| ``ELASTIC_USERNAME`` | required | User that Logstash writes with, ``wazuh-logstash`` in this guide.  |
+----------------------+----------+--------------------------------------------------------------------+
| ``ELASTIC_PASSWORD`` | required | Password of that user.                                             |
+----------------------+----------+--------------------------------------------------------------------+
| ``ELASTIC_CA``       | required | CA certificate of Elasticsearch.                                   |
+----------------------+----------+--------------------------------------------------------------------+

Restart Logstash to apply the changes.

Importing the dashboards
------------------------

Import ``integrations/elastic/dashboards.ndjson`` in Kibana from Stack Management > Saved objects > Import, or
with the API:

.. code-block:: bash
   :emphasize-lines: 1

   curl --cacert ca.crt -u elastic -X POST "https://<KIBANA_IP>:5601/api/saved_objects/_import?overwrite=true" \
     -H 'kbn-xsrf: true' --form file=@integrations/elastic/dashboards.ndjson

The file contains the ``logs-wazuh.findings.*-*`` and ``logs-wazuh.events.*-*`` data views, and the findings
dashboards of the Wazuh dashboard, with the same layout and the same filters:

-  Threat hunting, MITRE ATT&CK, Malware detection, and Case management.
-  Docker, AWS, Azure, Google Cloud, GitHub, and Office: the findings of each integration.
-  PCI, GDPR, HIPAA, NIST 800-53, NIST 800-171, ISO 27001, TSC, CMMC, FedRAMP, and NIS2: findings for
   each compliance framework.
-  The Agent dashboard of each module, which the Wazuh dashboard shows when you pin a Wazuh agent.
   Select the Wazuh agent in the control at the top.
-  The drilldowns of GitHub and Office, which the Wazuh dashboard shows when you click a value in a
   table. Filter for one value, such as an actor, organization, user, or IP address, in the table at
   the top.

The dashboard titles start with ``Wazuh -``. The Wazuh - Events overview dashboard shows the events. The API
imports the dashboards into the default space. To import them into another space, use
``https://<KIBANA_IP>:5601/s/<SPACE>/api/saved_objects/_import``. If Kibana doesn't use TLS, which is its
default, replace ``https`` with ``http`` and remove ``--cacert ca.crt`` from the request.

.. thumbnail:: /images/integrations/elastic-threat-hunting-dashboard.png
   :title: Wazuh - Threat hunting - Overview dashboard in Kibana
   :alt: Wazuh - Threat hunting - Overview dashboard in Kibana
   :align: center
   :width: 80%

.. thumbnail:: /images/integrations/elastic-events-overview-dashboard.png
   :title: Wazuh - Events overview dashboard in Kibana
   :alt: Wazuh - Events overview dashboard in Kibana
   :align: center
   :width: 80%

.. _elastic_validating_integration:

Validating the integration
--------------------------

After the export delay (5 minutes by default) plus one minute, check that the Wazuh data streams exist:

.. code-block:: bash

   curl --cacert ca.crt -u elastic "https://<ELASTICSEARCH_IP>:9200/_data_stream/logs-wazuh.*?filter_path=data_streams.name"

Compare the document count of a closed time range with the source. For example, count the findings of an hour
that ended more than the export delay ago:

.. code-block:: bash
   :emphasize-lines: 2,3

   range='{"query":{"range":{"@timestamp":{"gte":"2026-10-22T08:00:00Z","lt":"2026-10-22T09:00:00Z"}}}}'
   curl --cacert root-ca.pem -u wazuh-export "https://<WAZUH_INDEXER_IP>:9200/wazuh-findings-v5-*/_count" -H 'Content-Type: application/json' -d "$range"
   curl --cacert ca.crt -u elastic "https://<ELASTICSEARCH_IP>:9200/logs-wazuh.findings.*-*/_count" -H 'Content-Type: application/json' -d "$range"

Both commands return the same ``count``.

Troubleshooting
---------------

+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| Symptom                                      | Cause and solution                                                                            |
+==============================================+===============================================================================================+
| No data stream is created, and the Logstash  | The export user can't read the data streams in                                                |
| log shows a ``security_exception`` from the  | ``WAZUH_EXPORT_INDICES``. Add them to its role.                                               |
| Wazuh indexer.                               |                                                                                               |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| ``security_exception`` from Elasticsearch.   | The writer role lacks ``create_doc`` or ``auto_configure`` on                                 |
|                                              | ``logs-wazuh.*-*``, or the data stream namespace is outside that                              |
|                                              | pattern.                                                                                      |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| Findings are missing at the destination, but | The findings were indexed after the run that read their window.                               |
| events are present.                          | Increase ``WAZUH_EXPORT_DELAY`` above the detector interval, and                              |
|                                              | export the range again. See :ref:`integrations_export_delay` and                              |
|                                              | :ref:`integrations_interruptions`.                                                            |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| Documents in the dead letter queue.          | Elasticsearch rejected them, for example, because of a field mapped                           |
|                                              | with another type in ``logs-wazuh@custom``. Inspect them with the                             |
|                                              | `dead_letter_queue input                                                                      |
|                                              | <https://www.elastic.co/docs/reference/logstash/plugins/plugins-inputs-dead_letter_queue>`__. |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| ``version_conflict_engine_exception``        | Not an error. A document read twice, during a backfill or after a                             |
|                                              | restart, is dropped as a duplicate. The output doesn't log it.                                |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| The dashboards are empty.                    | Check the time range of the dashboard against the data, and the data                          |
|                                              | views against the data stream names. A custom                                                 |
|                                              | ``WAZUH_EXPORT_NAMESPACE`` still matches ``logs-wazuh.findings.*-*``.                         |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
