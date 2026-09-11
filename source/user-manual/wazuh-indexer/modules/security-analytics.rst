.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Security Analytics module evaluates incoming events against Wazuh Sigma rules to generate findings. Find more information in this section of the documentation.

Security Analytics module
=========================

The Security Analytics module is a component of the Wazuh Indexer that evaluates incoming events against :doc:`Wazuh Sigma rules </user-manual/wazuh-indexer/wazuh-sigma-rules>` to generate findings.

It generates findings when events match Sigma rules and correlates related findings across detectors. The module runs within the Wazuh Indexer and provides the detection engine used by Security Analytics.

Detectors
---------

A detector evaluates events against a set of Sigma rules for a specific log category. When creating or updating a detector, the following constraints apply:

+----------------------------+---------------------+-----------------------------------------------------------------------------------------------------------------------+
| Constraint                 | Value               | Description                                                                                                           |
+============================+=====================+=======================================================================================================================+
| Rule space type            | One space type only | A detector can reference either Standard rules or Custom rules. A detector cannot use both rule types simultaneously. |
+----------------------------+---------------------+-----------------------------------------------------------------------------------------------------------------------+
| Maximum rules per detector | 100                 | A detector can reference up to 100 Sigma rules.                                                                       |
+----------------------------+---------------------+-----------------------------------------------------------------------------------------------------------------------+

.. warning::

   Requests that violate either constraint are rejected with 400 Bad Request. Both constraints apply to detector creation and update operations.

Findings
--------

A finding is generated when a monitored event matches a Sigma detection rule. SAP creates one finding for each matching event.

A raw finding contains references to the matching event and detector, but does not include the event payload or Sigma rule metadata.

The following fields are included in a raw finding:

+---------------------+---------------------------------------------------------------+
| Field               | Description                                                   |
+=====================+===============================================================+
| ``id``              | Unique finding identifier.                                    |
+---------------------+---------------------------------------------------------------+
| ``detector_id``     | Identifier of the detector that generated the finding.        |
+---------------------+---------------------------------------------------------------+
| ``related_doc_ids`` | Identifiers of the source documents that triggered the match. |
+---------------------+---------------------------------------------------------------+
| ``queries``         | Sigma rule or rules that matched the event.                   |
+---------------------+---------------------------------------------------------------+
| ``index``           | Source index containing the triggering event.                 |
+---------------------+---------------------------------------------------------------+
| ``timestamp``       | The time when the finding was created.                        |
+---------------------+---------------------------------------------------------------+

To provide a complete alert context in the Wazuh dashboard, SAP enriches each raw finding with additional information.

The enriched finding includes:

+-------------------------+-------------------------------------------------------------------------------+
| Enrichment              | Description                                                                   |
+=========================+===============================================================================+
| Triggering event source | Full event document retrieved from the source index.                          |
+-------------------------+-------------------------------------------------------------------------------+
| ``wazuh.rule`` metadata | Rule name, severity level, compliance mappings, and MITRE ATT&CK information. |
+-------------------------+-------------------------------------------------------------------------------+

Enriched findings are stored in indices matching the ``wazuh-findings-v5-{category}*`` pattern, where ``{category}`` represents the log category associated with the triggering event.

Finding workflow
^^^^^^^^^^^^^^^^

When SAP receives an event from a Wazuh manager, it performs the following actions:

#. Evaluates the event against active Sigma rules for the corresponding log category.
#. Creates a raw finding if a rule match occurs.
#. Executes the correlation engine.
#. Retrieves the triggering event and associated rule metadata.
#. Creates an enriched finding and stores it in the findings index.

.. note::

   Finding enrichment is performed asynchronously and does not block finding creation. If enrichment fails, the raw finding remains available.

Configuration
-------------

The Security Analytics module is configured through settings in ``/etc/wazuh-indexer/opensearch.yml``, all using the ``plugins.security_analytics`` prefix. Almost every setting is dynamic, and you can change it at runtime through the Cluster Settings API.

Settings reference
^^^^^^^^^^^^^^^^^^

+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| Setting                                           | Type    | Default   | Description                                                                                                             |
+===================================================+=========+===========+=========================================================================================================================+
| ``alert_finding_enabled``                         | Boolean | ``true``  | Enable rollover and retention management for the finding history indices.                                               |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``alert_finding_max_docs``                        | Long    | ``1000``  | Deprecated. Maximum document count for a finding history index before rollover. Minimum 0.                              |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``alert_finding_rollover_period``                 | Time    | ``12h``   | How often the finding history rollover job runs.                                                                        |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``alert_history_enabled``                         | Boolean | ``true``  | Enable rollover and retention management for the alert history indices.                                                 |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``alert_history_max_age``                         | Time    | ``30d``   | Maximum age of an alert history index before rollover.                                                                  |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``alert_history_max_docs``                        | Long    | ``1000``  | Maximum document count for an alert history index before rollover. Minimum 0.                                           |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``alert_history_retention_period``                | Time    | ``60d``   | Retention period after which alert history indices are deleted.                                                         |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``alert_history_rollover_period``                 | Time    | ``12h``   | How often the alert history rollover job runs.                                                                          |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``auto_correlations_enabled``                     | Boolean | ``false`` | Automatically generate correlation rules from new findings.                                                             |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``correlation.detector_cache_ttl``                | Time    | ``5m``    | TTL for the in-memory monitor-id to detector cache. Set to 0s to disable the cache.                                     |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``correlation.max_in_flight_findings``            | Integer | ``50``    | Maximum number of correlation pipelines running concurrently. Valid range: 1-1000.                                      |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``correlation.metadata_cache_ttl``                | Time    | ``5m``    | TTL for the in-memory caches of log-type list and correlation rules by detector type. Set to 0s to disable both caches. |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``correlation_history_max_age``                   | Time    | ``30d``   | Maximum age of a correlation history index before rollover.                                                             |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``correlation_history_max_docs``                  | Long    | ``1000``  | Maximum document count for a correlation history index before rollover. Minimum 0.                                      |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``correlation_history_retention_period``          | Time    | ``60d``   | Retention period after which correlation history indices are deleted.                                                   |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``correlation_history_rollover_period``           | Time    | ``12h``   | How often the correlation history rollover job runs.                                                                    |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``correlation_time_window``                       | Time    | ``5m``    | Time window used to group findings into correlations.                                                                   |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``enable_detectors_with_dedicated_query_indices`` | Boolean | ``true``  | Create dedicated query indices for new detectors.                                                                       |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``enable_workflow_usage``                         | Boolean | ``true``  | Use Alerting composite workflows when running detectors.                                                                |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``enriched_findings_index_enabled``               | Boolean | ``true``  | Toggle the enriched findings pipeline.                                                                                  |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``filter_by_backend_roles``                       | Boolean | ``false`` | Restrict access to detectors, rules, and findings based on the requester's backend roles.                               |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``finding_history_max_age``                       | Time    | ``30d``   | Maximum age of a finding history index before rollover.                                                                 |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``finding_history_retention_period``              | Time    | ``60d``   | Retention period after which finding history indices are deleted.                                                       |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``index_timeout``                                 | Time    | ``60s``   | Timeout for Security Analytics index operations.                                                                        |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+
| ``max_detectors``                                 | Integer | ``10``    | Maximum number of user-created detectors (Content Manager detectors do not count). Minimum 0.                           |
+---------------------------------------------------+---------+-----------+-------------------------------------------------------------------------------------------------------------------------+

All settings use the ``plugins.security_analytics`` prefix shown in the examples below.

History indices
^^^^^^^^^^^^^^^

Each history group (alerts, findings, correlations) is managed by an independent rollover job with the same five controls:

+--------------------+----------------------------------------------------+
| Control            | Purpose                                            |
+====================+====================================================+
| Enable toggle      | Turns rollover and retention management on or off. |
+--------------------+----------------------------------------------------+
| Rollover period    | How often the rollover job runs.                   |
+--------------------+----------------------------------------------------+
| Max age            | Maximum index age before rollover.                 |
+--------------------+----------------------------------------------------+
| Max document count | Maximum document count before rollover.            |
+--------------------+----------------------------------------------------+
| Retention period   | Age after which old indices are deleted.           |
+--------------------+----------------------------------------------------+

To tune retention for the alert history indices in the ``/etc/wazuh-indexer/opensearch.yml`` file:

.. code-block:: yaml

   plugins.security_analytics.alert_history_enabled: true
   plugins.security_analytics.alert_history_rollover_period: 12h
   plugins.security_analytics.alert_history_max_age: 30d
   plugins.security_analytics.alert_history_max_docs: 1000
   plugins.security_analytics.alert_history_retention_period: 60d

The same pattern applies to finding history (``finding_history_*``) and correlation history (``correlation_history_*``).

.. warning::

   ``plugins.security_analytics.alert_finding_max_docs`` is deprecated. Configure finding history rollover through the ``finding_history_*`` settings.

Correlation tuning
^^^^^^^^^^^^^^^^^^

The correlation engine runs after every matched finding and consults two in-memory caches plus a concurrency limiter. The following blocks in the ``/etc/wazuh-indexer/opensearch.yml`` file are responsible for correlation tuning:

.. code-block:: yaml

   plugins.security_analytics.correlation_time_window: 5m
   plugins.security_analytics.auto_correlations_enabled: false
   plugins.security_analytics.correlation.detector_cache_ttl: 5m
   plugins.security_analytics.correlation.metadata_cache_ttl: 5m
   plugins.security_analytics.correlation.max_in_flight_findings: 50

Both ``detector_cache_ttl`` and ``metadata_cache_ttl`` accept ``0s`` to disable the cache entirely, which forces a lookup against the corresponding system index on every finding. Lower ``correlation.max_in_flight_findings`` on resource-constrained nodes to bound peak demand on the search thread pool.

Detector behavior
^^^^^^^^^^^^^^^^^

.. code-block:: yaml

   plugins.security_analytics.enable_detectors_with_dedicated_query_indices: true
   plugins.security_analytics.enriched_findings_index_enabled: true
   plugins.security_analytics.enable_workflow_usage: true
   plugins.security_analytics.filter_by_backend_roles: false

.. note::

   Setting ``enriched_findings_index_enabled`` to false disables the Wazuh enriched findings pipeline. Raw SAP findings continue to be written to ``.opensearch-sap-{category}-findings-*``, but no ``wazuh-findings-v5-{category}*`` documents are produced.

Updating a setting at runtime
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Almost every Security Analytics setting is dynamic. To change one without restarting the node, use the Cluster Settings API:

.. code-block:: none

   # curl -sk -u admin:admin -X PUT "https://127.0.0.1:9200/_cluster/settings" \
     -H 'Content-Type: application/json' -d '{
     "persistent": {
       "plugins.security_analytics.correlation.max_in_flight_findings": 100
     }
   }'

**Output**

.. code-block:: json
   :class: output

   {"acknowledged":true,"persistent":{"plugins":{"security_analytics":{"correlation":{"max_in_flight_findings":"100"}}}},"transient":{}}

.. note::

   -  Changes to ``/etc/wazuh-indexer/opensearch.yml`` require a restart of the Wazuh Indexer to take effect. Dynamic settings can additionally be updated at runtime through the Cluster Settings API shown above.
   -  ``index.correlation`` is an index-scope setting and must be applied to individual indices (for example, through an index template or the ``_settings`` API), not to the cluster as a whole.
   -  The OpenSearch Job Scheduler enforces rollover jobs. Actual rollover timing may vary slightly depending on cluster load.

Case management
---------------

Case management enables analysts to track and manage the lifecycle of findings generated by the Security Analytics detectors.

By default, findings contain only detection information. Case management extends findings with a ``wazuh.case`` object that supports investigation and triage workflows directly from the Wazuh dashboard.

Case management provides the following capabilities:

-  Status tracking throughout the investigation lifecycle.
-  Analyst comments and investigation notes.
-  Tags for classification and filtering.
-  User attribution for case updates.
-  Creation and modification timestamps.

Case fields
^^^^^^^^^^^

Case information is stored under the ``wazuh.case`` field in enriched findings.

+---------------------------+-----------------+----------------------------------------------+
| Field                     | Type            | Description                                  |
+===========================+=================+==============================================+
| ``wazuh.case.status``     | keyword         | Current case status.                         |
+---------------------------+-----------------+----------------------------------------------+
| ``wazuh.case.comment``    | match_only_text | Analyst comment associated with the finding. |
+---------------------------+-----------------+----------------------------------------------+
| ``wazuh.case.tags``       | keyword[]       | Tags used for organization and filtering.    |
+---------------------------+-----------------+----------------------------------------------+
| ``wazuh.case.created_at`` | date            | The time when the case was created.          |
+---------------------------+-----------------+----------------------------------------------+
| ``wazuh.case.updated_at`` | date            | The time when the case was last updated.     |
+---------------------------+-----------------+----------------------------------------------+
| ``wazuh.case.user.name``  | keyword         | The user who last updated the case.          |
+---------------------------+-----------------+----------------------------------------------+

The following case statuses are supported:

+------------------+-----------------------------------------------------------+
| Status           | Description                                               |
+==================+===========================================================+
| ``ACTIVE``       | Finding requires investigation.                           |
+------------------+-----------------------------------------------------------+
| ``ACKNOWLEDGED`` | The finding has been reviewed and is under investigation. |
+------------------+-----------------------------------------------------------+
| ``COMPLETED``    | Investigation has been completed.                         |
+------------------+-----------------------------------------------------------+
| ``ERROR``        | An error occurred during processing.                      |
+------------------+-----------------------------------------------------------+
| ``DELETED``      | The case was deleted.                                     |
+------------------+-----------------------------------------------------------+
| ``AUDIT``        | Case update recorded for auditing purposes.               |
+------------------+-----------------------------------------------------------+

Updating findings
^^^^^^^^^^^^^^^^^

You can update case information using the Security Analytics findings update API.

**Request**

.. code-block:: none

   PUT /_plugins/_security_analytics/findings/_update

The request body contains one or more findings to update.

.. code-block:: json

   {
     "findings": [
       {
         "_id": "<finding-document-id>",
         "_index": "<finding-index-name>",
         "case": {
           "status": "ACKNOWLEDGED",
           "comment": "Reviewed by SOC analyst",
           "tags": ["critical", "reviewed"]
         }
       }
     ]
   }

All fields within the case object are optional. Updates are applied as partial updates and only the supplied fields are modified, and a request can update up to 50 findings.

.. note::

   The ``created_at``, ``updated_at``, and ``user.name`` fields are automatically managed by the Wazuh dashboard and are not to be modified manually.

Response codes
^^^^^^^^^^^^^^

+-------------+---------------------------------------------------------------------------------------------------+
| Status code | Description                                                                                       |
+=============+===================================================================================================+
| ``200``     | Finding updated successfully.                                                                     |
+-------------+---------------------------------------------------------------------------------------------------+
| ``207``     | Partial success. Some findings were updated while others failed.                                  |
+-------------+---------------------------------------------------------------------------------------------------+
| ``400``     | Invalid request, missing required fields, empty findings array, or maximum update limit exceeded. |
+-------------+---------------------------------------------------------------------------------------------------+

Investigation workflow
^^^^^^^^^^^^^^^^^^^^^^

A typical investigation workflow consists of the following stages:

#. A Sigma rule matches an event and creates a finding.
#. An analyst reviews the finding and changes its status to ``ACKNOWLEDGED``.
#. The analyst adds investigation notes and tags to the case.
#. The finding status is updated to ``COMPLETED`` when the investigation is finished.

Case management operations are typically performed through the Wazuh dashboard, which automatically manages user attribution and timestamps.

Querying findings by status
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can filter findings using the ``wazuh.case.status`` field.

The following example returns all acknowledged findings:

.. code-block:: console

   curl -k -u admin:admin -X GET "https://127.0.0.1:9200/wazuh-findings-v5-*/_search" \
     -H "Content-Type: application/json" \
     -d '{
     "query": {
       "term": {
         "wazuh.case.status": {
           "value": "ACKNOWLEDGED"
         }
       }
     }
   }'
