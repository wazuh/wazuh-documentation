.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out how to export the Wazuh findings and events from the Wazuh indexer to OpenSearch data streams with Logstash, and how to import the OpenSearch Dashboards dashboards.

OpenSearch integration
======================

The OpenSearch integration exports the Wazuh findings and events from the Wazuh indexer to the data streams of
another OpenSearch cluster through Logstash, and provides OpenSearch Dashboards dashboards to explore them.
Before you start, read the :doc:`overview </integrations-guide/index>` at the beginning of this guide. It describes what the integrations export,
the export window, and the settings that all integrations share.

Architecture
------------

Logstash reads the ``wazuh-findings-v5-*`` data streams and, optionally, the ``wazuh-events-v5-*`` data
streams from the Wazuh indexer with the ``wazuh-export`` user. It writes every source data stream to its own
OpenSearch data stream, ``logs-wazuh.findings.*-default`` or ``logs-wazuh.events.*-default``, with the
``wazuh-logstash`` user. See :ref:`integrations_destination_of_every_source`. The ``wazuh`` index template
maps the WCS fields of all these data streams, the ``wazuh-logs`` Index State Management (ISM) policy rolls
them over, and OpenSearch Dashboards shows them in the Wazuh dashboards.

Prerequisites
-------------

-  Wazuh indexer |WAZUH_CURRENT|, and a read-only user to export with. See :ref:`integrations_security`.
-  OpenSearch and OpenSearch Dashboards with the security plugin, in a version listed in
   :ref:`integrations_compatibility`.
-  Logstash, with the ``logstash-input-opensearch`` and ``logstash-output-opensearch`` plugins.
-  The ``integrations`` folder of the same version as the Wazuh indexer.

The commands in this section use ``opensearch-ca.pem`` for the CA certificate of the destination OpenSearch
cluster, and ``root-ca.pem`` for the CA certificate of the Wazuh indexer.

Preparing OpenSearch
--------------------

Run these steps as an OpenSearch administrator.

Install the index template of the ``logs-wazuh.*-*`` data streams:

.. code-block:: bash
   :emphasize-lines: 1

   curl --cacert opensearch-ca.pem -u admin -X PUT "https://<OPENSEARCH_IP>:9200/_index_template/wazuh" \
     -H 'Content-Type: application/json' -d @integrations/opensearch/templates/wazuh-index-template.json

Install the ISM policy. It applies to the backing indices of ``logs-wazuh.*-*`` created after it, and rolls
them over at 30 days or 50 GB per primary shard. It doesn't delete any data.

.. code-block:: bash
   :emphasize-lines: 1

   curl --cacert opensearch-ca.pem -u admin -X PUT "https://<OPENSEARCH_IP>:9200/_plugins/_ism/policies/wazuh-logs" \
     -H 'Content-Type: application/json' -d @integrations/opensearch/templates/wazuh-ism-policy.json

To install the policy again, for example during an upgrade, OpenSearch needs its current version. Get
``_seq_no`` and ``_primary_term`` with ``GET _plugins/_ism/policies/wazuh-logs``, and add
``?if_seq_no=<SEQ_NO>&if_primary_term=<PRIMARY_TERM>`` to the request.

Retention
^^^^^^^^^

Every upgrade of the integration installs the ``wazuh-logs`` policy again. To delete data, create your own
policy instead, with a higher ``ism_template`` priority than ``wazuh-logs`` (200), so that it takes over the
new backing indices. For example, to delete them 90 days after they roll over:

.. code-block:: bash
   :emphasize-lines: 1

   curl --cacert opensearch-ca.pem -u admin -X PUT "https://<OPENSEARCH_IP>:9200/_plugins/_ism/policies/wazuh-logs-90-days" \
     -H 'Content-Type: application/json' -d '{
     "policy": {
       "description": "Rolls over the Wazuh data streams and deletes their indices 90 days after rollover",
       "default_state": "hot",
       "states": [
         {
           "name": "hot",
           "actions": [{ "rollover": { "min_index_age": "30d", "min_primary_shard_size": "50gb" } }],
           "transitions": [{ "state_name": "delete", "conditions": { "min_rollover_age": "90d" } }]
         },
         { "name": "delete", "actions": [{ "delete": {} }], "transitions": [] }
       ],
       "ism_template": [{ "index_patterns": ["logs-wazuh.*-*"], "priority": 300 }]
     }
   }'

The existing backing indices keep their policy. To move them to the new one, use ``POST
_plugins/_ism/change_policy/.ds-logs-wazuh*`` with ``{"policy_id": "wazuh-logs-90-days"}``.

Writer user
^^^^^^^^^^^

Create the role and the user that Logstash writes with. The role allows creating the data streams, appending
to them, and adding the mappings of fields that appear for the first time. The security plugin rejects the
writes if any of these actions is missing.

.. code-block:: bash
   :emphasize-lines: 1,15,16,17

   curl --cacert opensearch-ca.pem -u admin -X PUT "https://<OPENSEARCH_IP>:9200/_plugins/_security/api/roles/wazuh-logstash-writer" \
     -H 'Content-Type: application/json' -d '{
     "description": "Write the Wazuh events and findings exported by Logstash",
     "cluster_permissions": ["cluster:monitor/main", "indices:data/write/bulk"],
     "index_permissions": [
       {
         "index_patterns": ["logs-wazuh.*-*"],
         "allowed_actions": [
           "indices:data/write/index", "indices:data/write/bulk*",
           "indices:admin/create", "indices:admin/data_stream/create", "indices:admin/mapping/put"
         ]
       }
     ]
   }'
   curl --cacert opensearch-ca.pem -u admin -X PUT "https://<OPENSEARCH_IP>:9200/_plugins/_security/api/internalusers/wazuh-logstash" \
     -H 'Content-Type: application/json' -d '{"password": "<WAZUH_LOGSTASH_PASSWORD>"}'
   curl --cacert opensearch-ca.pem -u admin -X PUT "https://<OPENSEARCH_IP>:9200/_plugins/_security/api/rolesmapping/wazuh-logstash-writer" \
     -H 'Content-Type: application/json' -d '{"users": ["wazuh-logstash"]}'

Configuring Logstash
--------------------

Install the plugins:

.. code-block:: bash

   /usr/share/logstash/bin/logstash-plugin install --version 1.0.0 logstash-input-opensearch
   /usr/share/logstash/bin/logstash-plugin install --version 2.1.1 logstash-output-opensearch

Copy the pipeline files to a dedicated folder, in this order:

.. code-block:: bash

   mkdir -p /etc/logstash/wazuh
   cp integrations/logstash/pipeline/wazuh-indexer-input.conf /etc/logstash/wazuh/10-wazuh-indexer-input.conf
   cp integrations/logstash/pipeline/wazuh-source.conf /etc/logstash/wazuh/20-wazuh-source.conf
   cp integrations/logstash/pipeline/wazuh-data-stream.conf /etc/logstash/wazuh/30-wazuh-data-stream.conf
   cp integrations/opensearch/logstash/pipeline/indexer-to-opensearch.conf /etc/logstash/wazuh/40-indexer-to-opensearch.conf

Declare the pipeline in ``/etc/logstash/pipelines.yml``, with a persisted queue and the dead letter queue. The
pipeline is tested with ECS compatibility disabled.

.. code-block:: yaml

   - pipeline.id: wazuh-opensearch
     path.config: "/etc/logstash/wazuh/*.conf"
     pipeline.ecs_compatibility: disabled
     queue.type: persisted
     queue.max_bytes: 4gb
     dead_letter_queue.enable: true

Set the pipeline settings in the environment of the Logstash service, and the secrets in the Logstash
keystore. See :ref:`integrations_tls_credentials`. In addition to the shared settings, the output uses the
following settings:

+-------------------------+----------+-------------------------------------------------------------------+
| Setting                 | Default  | Description                                                       |
+=========================+==========+===================================================================+
| ``OPENSEARCH_HOST``     | required | OpenSearch URL, ``https://<OPENSEARCH_IP>:9200``, or several URLs |
|                         |          | separated by spaces. The pipeline authenticates with a user and   |
|                         |          | password only.                                                    |
+-------------------------+----------+-------------------------------------------------------------------+
| ``OPENSEARCH_USERNAME`` | required | User that Logstash writes with, ``wazuh-logstash`` in this guide. |
+-------------------------+----------+-------------------------------------------------------------------+
| ``OPENSEARCH_PASSWORD`` | required | Password of that user.                                            |
+-------------------------+----------+-------------------------------------------------------------------+
| ``OPENSEARCH_CA``       | required | CA certificate of OpenSearch.                                     |
+-------------------------+----------+-------------------------------------------------------------------+

Restart Logstash to apply the changes.

Importing the dashboards
------------------------

Import ``integrations/opensearch/dashboards.ndjson`` in OpenSearch Dashboards from Dashboards Management >
Saved objects > Import, or with the API:

.. code-block:: bash
   :emphasize-lines: 1

   curl --cacert opensearch-ca.pem -u admin -X POST "https://<OPENSEARCH_DASHBOARDS_IP>:5601/api/saved_objects/_import?overwrite=true" \
     -H 'osd-xsrf: true' -H 'Expect:' --form file=@integrations/opensearch/dashboards.ndjson

The file contains the ``logs-wazuh.findings.*-*`` and ``logs-wazuh.events.*-*`` index patterns, and the
findings dashboards of the Wazuh dashboard, with the same layout and the same filters:

-  Threat hunting, MITRE ATT&CK, Malware detection, and Case management.
-  Docker, AWS, Azure, Google Cloud, GitHub, and Office: the findings of each integration.
-  PCI, GDPR, HIPAA, NIST 800-53, NIST 800-171, ISO 27001, TSC, CMMC, FedRAMP, and NIS2: findings for
   each compliance framework.
-  The Agent dashboard of each module, which the Wazuh dashboard shows when you pin a Wazuh agent.
   Select the Wazuh agent in the control at the top.
-  The drilldowns of GitHub and Office, which the Wazuh dashboard shows when you click a value in a
   table. Filter for one value, such as an actor, organization, user, or IP address, in the table at
   the top.

The dashboard titles start with ``Wazuh -``. The Wazuh - Events overview dashboard shows the events. With
multi-tenancy enabled, the API imports the dashboards into the tenant of the request. To share them with every
user, add ``-H 'securitytenant: global'`` to the request. The ``-H 'Expect:'`` option turns off the ``Expect:
100-continue`` header that curl adds to uploads larger than 1 MB. With multi-tenancy enabled, OpenSearch
Dashboards 3.9.0 stops when it receives that header with the dashboards file.

.. thumbnail:: /images/integrations/opensearch-threat-hunting-dashboard.png
   :title: Wazuh - Threat hunting - Overview dashboard in OpenSearch Dashboards
   :alt: Wazuh - Threat hunting - Overview dashboard in OpenSearch Dashboards
   :align: center
   :width: 80%

.. thumbnail:: /images/integrations/opensearch-events-overview-dashboard.png
   :title: Wazuh - Events overview dashboard in OpenSearch Dashboards
   :alt: Wazuh - Events overview dashboard in OpenSearch Dashboards
   :align: center
   :width: 80%

Validating the integration
--------------------------

After the export delay (5 minutes by default) plus one minute, check that the Wazuh data streams exist and
that the ISM policy manages their backing indices:

.. code-block:: bash

   curl --cacert opensearch-ca.pem -u admin "https://<OPENSEARCH_IP>:9200/_data_stream/logs-wazuh.*?filter_path=data_streams.name"
   curl --cacert opensearch-ca.pem -u admin "https://<OPENSEARCH_IP>:9200/_plugins/_ism/explain/.ds-logs-wazuh*?filter_path=*.policy_id"

Compare the document count of a closed time range with the source, as described in
:ref:`elastic_validating_integration` for Elasticsearch.

Troubleshooting
---------------

+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| Symptom                                      | Cause and solution                                                                            |
+==============================================+===============================================================================================+
| No data stream is created, and the Logstash  | The export user can't read the data streams in                                                |
| log shows a ``security_exception`` from the  | ``WAZUH_EXPORT_INDICES``. Add them to its role.                                               |
| Wazuh indexer.                               |                                                                                               |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| ``security_exception`` or ``no permissions`` | The writer role lacks a permission on ``logs-wazuh.*-*``, or the data                         |
| from OpenSearch.                             | stream namespace is outside that pattern.                                                     |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| A data stream is created as a plain index.   | The index template wasn't installed before the first document arrived.                        |
|                                              | Delete the index, install the template, and export the range again.                           |
|                                              | See :ref:`integrations_interruptions`.                                                        |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| Findings are missing at the destination, but | The findings were indexed after the run that read their window.                               |
| events are present.                          | Increase ``WAZUH_EXPORT_DELAY`` above the detector interval, and                              |
|                                              | export the range again. See :ref:`integrations_export_delay` and                              |
|                                              | :ref:`integrations_interruptions`.                                                            |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| Documents in the dead letter queue.          | OpenSearch rejected them. Inspect them with the `dead_letter_queue                            |
|                                              | input                                                                                         |
|                                              | <https://www.elastic.co/docs/reference/logstash/plugins/plugins-inputs-dead_letter_queue>`__. |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
| ``version_conflict_engine_exception``        | Not an error. A document read twice, during a backfill or after a                             |
|                                              | restart, is dropped as a duplicate. The output doesn't log it.                                |
+----------------------------------------------+-----------------------------------------------------------------------------------------------+
