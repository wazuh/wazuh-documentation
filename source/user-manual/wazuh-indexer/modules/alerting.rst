.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer Alerting module monitors data stored in the Wazuh indexer and executes actions when trigger conditions are met. Find more information in this section of the documentation.

Alerting module
===============

The Wazuh indexer Alerting module monitors data stored in the Wazuh indexer, evaluates user-defined trigger conditions on a schedule, and executes actions when those conditions are met.

Alerting enables you to detect events of interest, monitor operational and security conditions, and automate response workflows. Depending on the monitor type and trigger configuration, actions can generate notifications, create findings, or initiate Wazuh-specific workflows such as Active Response.

Key capabilities
----------------

The Alerting module provides the following capabilities:

-  **Multiple monitor types:** Supports query-level, bucket-level, document-level, and the Wazuh-specific Active Response monitor.
-  **Flexible triggers:** Define trigger conditions using OpenSearch Query DSL queries, aggregation results, or per-document matching with percolate queries.
-  **Notification actions:** Deliver alerts through notification channels configured in the Notifications module, including Slack, Microsoft Teams, email, webhooks, Amazon SNS, PagerDuty, and other supported destinations.
-  **Workflows:** Combine multiple monitors into composite workflows to support advanced detection and monitoring scenarios.
-  **Alert lifecycle management:** Track alerts through the Active, Acknowledged, Completed, and Error states.
-  **Comments and collaboration:** Add comments to alerts to support investigation and operational workflows.
-  **Role-based access control (RBAC):** Control access to monitors, alerts, workflows, and notification destinations.
-  **Cross-cluster monitoring:** Monitor indices stored on remote clusters connected through cross-cluster search.
-  **REST API support:** Manage monitors, workflows, alerts, findings, and comments programmatically.
-  **Dashboard integration**: Create, manage, and monitor alerts from the Wazuh dashboard.

.. note::

   The Alerting module supports up to 10 custom monitors per user. This limit applies to all supported monitor types.

Monitor types
-------------

A monitor defines the data source, query, and schedule used to evaluate data and generate alerts. At each scheduled interval, the monitor retrieves data from the Wazuh indexer or cluster APIs and evaluates it against one or more trigger conditions.

Query-level monitors
^^^^^^^^^^^^^^^^^^^^

Query-level monitors execute a search query against one or more indices and evaluate the query results as a whole. They are best suited for detecting conditions based on aggregated search results, where a single alert represents the outcome of the entire query. These monitors use the ``QueryLevelTrigger`` trigger type with a ``SearchInput`` data source.

Common use cases include:

-  Detecting an excessive number of authentication failures.
-  Monitoring application error rates.
-  Identifying abnormal event volumes.
-  Tracking threshold-based operational metrics.

Bucket-level monitors
^^^^^^^^^^^^^^^^^^^^^

Bucket-level monitors evaluate aggregation buckets rather than individual search results. Each bucket can generate its own alert, making this monitor type suitable for monitoring individual hosts, users, services, applications, or other grouped entities. Bucket-level monitors use the ``BucketLevelTrigger`` trigger type with a ``SearchInput`` data source that includes aggregations.

Common use cases include:

-  Monitoring authentication failures per host.
-  Detecting excessive network activity by users.
-  Identifying the top systems generating security events.
-  Monitoring threshold violations across grouped resources.

Cluster metrics monitors
^^^^^^^^^^^^^^^^^^^^^^^^

Cluster metrics monitors evaluate the health and operational status of the Wazuh indexer cluster instead of indexed data. Rather than executing search queries, these monitors periodically call cluster APIs, such as cluster health and cluster statistics, and evaluate the responses against configured trigger conditions. Cluster metrics monitors use the ``QueryLevelTrigger`` trigger type with a ``ClusterMetricsInput`` data source.

Common use cases include:

-  Monitoring cluster health.
-  Detecting unavailable nodes.
-  Monitoring pending cluster tasks.
-  Tracking cluster performance and resource utilization.

Document-level monitors
^^^^^^^^^^^^^^^^^^^^^^^

Document-level monitors evaluate individual documents as they are indexed. When a document matches the configured conditions, the monitor generates a finding that records the matching document, query, and timestamp. Findings provide traceability and support investigation workflows. Document-level monitors use the ``DocumentLevelTrigger`` trigger type with a ``DocLevelMonitorInput`` data source.

These monitors are commonly used for:

-  Security detections.
-  Compliance monitoring.
-  Event correlation.
-  Threat detection workflows.

Active Response monitors
^^^^^^^^^^^^^^^^^^^^^^^^

Active Response monitors extend document-level monitoring to support automated response workflows within Wazuh. When trigger conditions are met, the monitor generates execution requests that are written to the ``wazuh-active-responses`` data stream. The Wazuh manager retrieves these requests and distributes the corresponding Active Response actions to managed agents. Active Response monitors use the ``DocumentLevelTrigger`` trigger type with a ``DocLevelMonitorInput`` data source.

Active Response monitors have the following requirements:

+----------------+-------------------------------------------------------------------+
| Requirement    | Description                                                       |
+================+===================================================================+
| Target indices | Must target indices matching the ``wazuh-findings-v5-*`` pattern. |
+----------------+-------------------------------------------------------------------+
| Schedule       | Maximum execution interval of 1 minute (60,000 milliseconds).     |
+----------------+-------------------------------------------------------------------+
| Trigger type   | Only ``DocumentLevelTrigger`` is supported.                       |
+----------------+-------------------------------------------------------------------+

Common use cases include:

-  Blocking malicious IP addresses.
-  Terminating malicious processes.
-  Disabling compromised accounts.
-  Executing custom response actions on affected endpoints.

Triggers
^^^^^^^^

A trigger defines the condition that determines whether a monitor generates an alert. Each monitor contains one or more triggers that evaluate the monitor results against user-defined conditions.

When a monitor runs, the trigger processes the monitor output and determines whether the configured conditions have been met. If a trigger evaluates to true, the Alerting module creates an alert and executes any associated actions.

The Alerting module supports the following trigger types.

**Query-level triggers**

Query-level triggers evaluate the complete results of a search query or cluster metrics request. These triggers use a Painless script to evaluate the query response, including search results, aggregations, and monitor metadata. An alert is generated when the script evaluates to true.

Query-level triggers are supported by Query-level monitors and Cluster metrics monitors.

**Bucket-level triggers**

Bucket-level triggers evaluate each aggregation bucket returned by a bucket-level monitor. Rather than evaluating the entire query result, each bucket is processed independently. A separate alert can be generated for every bucket that satisfies the configured condition.

This trigger type supports composite aggregations, allowing large result sets to be processed efficiently across multiple execution cycles. Bucket-level triggers are supported only by bucket-level monitors.

**Document-level triggers**

Document-level triggers evaluate individual documents using OpenSearch Query DSL and percolate queries. When a document matches the configured conditions, the monitor generates a finding that records the matching document. If configured, the monitor also generates an alert and executes the associated actions. Document-level triggers are supported by Document-level monitors and Active Response monitors.

**Chained alert triggers**

Chained alert triggers evaluate the alerts generated by monitors that participate in a workflow. Instead of evaluating indexed data directly, these triggers evaluate the results produced by other monitors. This enables multi-stage detection scenarios in which alerts are generated only after multiple monitoring conditions have been satisfied.

Chained alert triggers are used internally by workflows and are not configured independently.

How alerting works
------------------

The Alerting module evaluates data on a schedule to detect conditions that require attention. Each monitor runs independently according to its configured schedule and processes data through a series of stages before generating alerts or executing actions.

An alerting workflow consists of five main components.

+-----------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Component | Description                                                                                                                                            |
+===========+========================================================================================================================================================+
| Monitor   | Defines the data source, query, and schedule used to evaluate data.                                                                                    |
+-----------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Trigger   | Evaluates the monitor results against one or more user-defined conditions.                                                                             |
+-----------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Action    | Executes when a trigger condition is met, such as sending a notification.                                                                              |
+-----------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Alert     | Records the triggered condition and tracks its lifecycle.                                                                                              |
+-----------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Finding   | Records individual documents that match document-level monitor conditions. Findings are generated only by document-level and Active Response monitors. |
+-----------+--------------------------------------------------------------------------------------------------------------------------------------------------------+

Alert lifecycle
---------------

An alert is created when a trigger condition evaluates to true. Alerts represent the current state of a monitored condition and provide a mechanism for tracking, acknowledging, and resolving issues over time.

Each alert transitions through a series of states that reflect its status during the monitoring process.

+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| State        | Description                                                                                                                                                                         |
+==============+=====================================================================================================================================================================================+
| Active       | The trigger condition is currently satisfied, and the alert remains open.                                                                                                           |
+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Acknowledged | A user has acknowledged the alert through the Wazuh dashboard or the Alerting API. The trigger condition may still be active, but the alert has been marked as under investigation. |
+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Completed    | The trigger condition is no longer satisfied, and the alert has been resolved automatically.                                                                                        |
+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Error        | An error occurred while evaluating the monitor or executing one or more configured actions.                                                                                         |
+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Alerts are updated automatically each time the associated monitor executes. If the trigger condition remains true, the alert stays in the Active state unless it has been acknowledged. When the trigger condition is no longer met, the Alerting module automatically marks the alert as Completed.

An acknowledged alert does not resolve the underlying condition. It simply indicates that the alert is being investigated or has been reviewed by an operator.

.. note::

   Alert lifecycle states apply to alerts generated by all monitor types. Document-level and Active Response monitors additionally create findings for documents that match the configured trigger conditions.

Findings
--------

Findings are records created by document-level monitors when documents match the configured trigger conditions. They provide traceability between an alert and the specific documents that caused the trigger condition to be satisfied.

Unlike alerts, which represent the state of a monitored condition, findings record individual matching documents. A single alert can be associated with one or more findings, depending on the monitor configuration and the number of matching documents.

Each finding includes information such as:

-  The identifiers of the matching documents.
-  The source index contains the matching documents.
-  The query or rule that matched the documents.
-  The timestamp indicating when the match was detected.

Findings are stored in rolling history indices and retained according to the configured finding history settings.

.. note::

   Findings are generated only by document-level monitors and Active Response monitors. Query-level, bucket-level, and cluster metrics monitors do not create findings.

Findings and Security Analytics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The findings created by the Alerting module are different from the findings displayed by the Wazuh Security Analytics module.

Alerting findings contain the raw results generated by document-level monitors and are stored in the ``.opensearch-alerting-finding-history-*`` indices.

Security Analytics builds on this functionality by using document-level monitors internally to evaluate events against Sigma detection rules. When a rule matches, Security Analytics enriches the resulting findings with additional event data and rule metadata before storing them in the ``wazuh-findings-v5-*`` indices.

This enrichment provides additional context for investigation and enables downstream workflows such as Active Response.

The following table summarizes the differences between the two finding types.

+---------------------------------------------------------+--------------------------------------------------------------------------+
| Alerting findings                                       | Security Analytics findings                                              |
+=========================================================+==========================================================================+
| Generated by document-level monitors.                   | Generated by the Security Analytics module.                              |
+---------------------------------------------------------+--------------------------------------------------------------------------+
| Record matching documents and query information.        | Include enriched event data, Sigma rule metadata, and detection context. |
+---------------------------------------------------------+--------------------------------------------------------------------------+
| Stored in ``.opensearch-alerting-finding-history-*``.   | Stored in ``wazuh-findings-v5-*``.                                       |
+---------------------------------------------------------+--------------------------------------------------------------------------+
| Used primarily for monitor evaluation and traceability. | Used for threat detection, investigation, and response workflows.        |
+---------------------------------------------------------+--------------------------------------------------------------------------+

Workflows
---------

Workflows enable you to combine multiple monitors into a single monitoring pipeline for multi-stage detection and operational scenarios.

Each workflow coordinates the execution of multiple monitors and evaluates their combined results. This approach enables more sophisticated detection logic, where alerts are generated only after multiple monitoring conditions have been satisfied.

Workflows are particularly useful when a single event is insufficient to indicate suspicious activity, but multiple related events together represent a meaningful condition.

Examples include:

-  Correlating authentication failures with privilege escalation events.
-  Detecting suspicious activity across multiple data sources.
-  Building staged detection pipelines for complex attack scenarios.
-  Coordinating operational monitoring across multiple services or systems.

How workflows work
^^^^^^^^^^^^^^^^^^

A workflow consists of one or more monitors that execute according to their configured schedules.

Each monitor evaluates its own data source and generates alerts independently. The workflow then evaluates the combined results of those monitors to determine whether to run additional actions.

This approach enables the Alerting module to evaluate relationships between alerts generated by different monitors rather than relying on a single monitor execution.

Workflow management
^^^^^^^^^^^^^^^^^^^

Workflows are managed independently of individual monitors and support the same lifecycle operations.

You can use the Alerting API to:

-  Create workflows.
-  Retrieve workflow configurations.
-  Update existing workflows.
-  Delete workflows.
-  Execute workflows on demand.

The Wazuh dashboard also provides an interface for creating, managing, and monitoring workflows.

Wazuh integration points
------------------------

The Alerting module integrates with several Wazuh components to provide detection, notification, and automated response capabilities. These integrations extend the module beyond alert generation, enabling security monitoring, event correlation, and response automation across the Wazuh platform.

Security Analytics
^^^^^^^^^^^^^^^^^^

The Security Analytics module uses alerting monitors to evaluate incoming events against Sigma detection rules.

When an event matches a detection rule, Security Analytics creates a finding and can generate an alert. Alerting monitors drive this process by periodically querying newly indexed events and evaluating them against configured detectors.

This integration enables Security Analytics to leverage the Alerting framework for rule execution, alert generation, and lifecycle management while enriching findings with additional detection context.

Notifications
^^^^^^^^^^^^^

The Alerting module integrates with the Notifications module to deliver alert notifications to external communication platforms and services.

When a trigger condition is met, the Alerting module executes one or more configured actions. Notification actions are forwarded to the Notifications module, which delivers messages using the configured notification channel.

Supported notification destinations include:

-  Slack
-  Microsoft Teams
-  Amazon Chime
-  Email
-  Webhooks
-  Amazon SNS
-  PagerDuty
-  Jira
-  Shuffle

This integration allows the Alerting module to focus on evaluating monitoring conditions while the Notifications module manages message formatting, delivery, and channel-specific communication.

Active Response
^^^^^^^^^^^^^^^

The Alerting module includes a Wazuh-specific Active Response monitor type for automated response workflows.

When an Active Response monitor is triggered, it writes execution requests to the ``wazuh-active-responses`` data stream. The Wazuh manager retrieves these requests and distributes the corresponding Active Response actions to agents. Each execution request contains a reference to the event that triggered the response.

Active Response monitors have the following requirements:

+----------------+---------------------------------------------------------------+
| Requirement    | Description                                                   |
+================+===============================================================+
| Target indices | Must match the ``wazuh-findings-v5-*`` index pattern.         |
+----------------+---------------------------------------------------------------+
| Schedule       | Maximum execution interval of 1 minute (60,000 milliseconds). |
+----------------+---------------------------------------------------------------+
| Trigger type   | Only ``DocumentLevelTrigger`` is supported.                   |
+----------------+---------------------------------------------------------------+

Default monitors
----------------

If the Alerts functionality is available, the healthcheck mechanism attempts to create the following sample monitors on the Wazuh events stream (``wazuh-events*``). Wazuh does not create monitors if a required notification channel is missing:

+-------------------+-------------------+------------------------------------------------------------------------------------------------------+
| Monitor name      | Target channel    | Behavior                                                                                             |
+===================+===================+======================================================================================================+
| Sample: Slack     | Slack channel     | Queries for alerts with ``wazuh.rule.level > 3`` and sends notifications to Slack.                   |
+-------------------+-------------------+------------------------------------------------------------------------------------------------------+
| Sample: PagerDuty | PagerDuty channel | Queries for alerts with ``wazuh.rule.level > 3`` and sends sample events to PagerDuty via Events v2. |
+-------------------+-------------------+------------------------------------------------------------------------------------------------------+
| Sample: Jira      | Jira channel      | Queries for alerts with ``wazuh.rule.level > 3`` trigger a mock issue creation.                      |
+-------------------+-------------------+------------------------------------------------------------------------------------------------------+
| Sample: Shuffle   | Shuffle channel   | Queries for alerts with ``wazuh.rule.level > 3`` and sends a test payload to the Shuffle workflow.   |
+-------------------+-------------------+------------------------------------------------------------------------------------------------------+

You can review the created monitors under **Explore** > **Alerting** > **Monitors**. For more information about monitor configuration, see `OpenSearch Alerting Monitors Documentation <https://docs.opensearch.org/latest/observing-your-data/alerting/monitors/>`__.

Dependencies
------------

The Alerting module relies on several Wazuh indexer components and plugins to schedule monitor execution, enforce access controls, deliver notifications, and provide shared functionality. These dependencies work together to support alert generation, workflow execution, and alert management.

+----------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| Dependency                 | Purpose                                                                                                                                           |
+============================+===================================================================================================================================================+
| Notifications module       | Delivers alert notifications to configured channels, including Slack, Microsoft Teams, email, webhooks, Amazon SNS, PagerDuty, Jira, and Shuffle. |
+----------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| Security module            | Enforces role-based access control and backend-role filtering for monitors, alerts, workflows, and notification destinations.                     |
+----------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| Job Scheduler plugin       | Schedules and executes monitors and workflows according to their configured execution intervals.                                                  |
+----------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh-indexer-common-utils | Provides shared utility functions used by Wazuh indexer modules.                                                                                  |
+----------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+

Configuration
-------------

The Alerting module is configured through dynamic cluster settings under the ``plugins.alerting.*`` namespace. These settings control monitor execution, alert and finding retention, workflow behavior, timeout values, and general module operations.

Most settings can be updated without restarting the Wazuh indexer by using the Cluster Settings API. Changes take effect as soon as they are applied.

The following sections describe the available configuration settings.

Monitor settings
^^^^^^^^^^^^^^^^

Monitor settings control how the Alerting module creates, executes, and manages monitors. These settings define operational limits and configure the behavior of document-level monitors.

+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+
| Setting                                                                        | Type      | Default   | Description                                                                                    |
+================================================================================+===========+===========+================================================================================================+
| ``plugins.alerting.monitor.max_monitors``                                      | Integer   | ``1000``  | Maximum number of monitors that a user can create.                                             |
+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+
| ``plugins.alerting.monitor.max_triggers``                                      | Integer   | ``10``    | Maximum number of triggers allowed per monitor.                                                |
+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+
| ``plugins.alerting.monitor.doc_level_monitor_shard_fetch_size``                | Integer   | ``10000`` | Maximum number of documents retrieved from each shard during document-level monitor execution. |
+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+
| ``plugins.alerting.monitor.doc_level_monitor_fan_out_nodes``                   | Integer   | ``1000``  | Maximum number of nodes that participate in document-level monitor execution.                  |
+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+
| ``plugins.alerting.monitor.doc_level_monitor_fanout_max_duration``             | TimeValue | ``5m``    | Maximum duration allowed for fan-out execution.                                                |
+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+
| ``plugins.alerting.monitor.doc_level_monitor_execution_max_duration``          | TimeValue | ``5m``    | Maximum execution time for a document-level monitor.                                           |
+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+
| ``plugins.alerting.monitor.percolate_query_max_num_docs_in_memory``            | Integer   | ``50000`` | Maximum number of documents evaluated simultaneously by percolate queries.                     |
+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+
| ``plugins.alerting.monitor.percolate_query_docs_size_memory_percentage_limit`` | Integer   | ``10``    | Maximum percentage of JVM heap that percolate query processing can consume.                    |
+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+
| ``plugins.alerting.monitor.doc_level_monitor_query_field_names_enabled``       | Boolean   | ``true``  | Enables query field name optimization for document-level monitors.                             |
+--------------------------------------------------------------------------------+-----------+-----------+------------------------------------------------------------------------------------------------+

Timeout settings
^^^^^^^^^^^^^^^^

Timeout settings define how long the Alerting module waits for queries, indexing operations, and bulk requests before cancelling the operation.

+------------------------------------+-----------+---------+---------------------------------------------------------------+
| Setting                            | Type      | Default | Description                                                   |
+====================================+===========+=========+===============================================================+
| ``plugins.alerting.input_timeout`` | TimeValue | ``30s`` | Timeout for monitor query execution.                          |
+------------------------------------+-----------+---------+---------------------------------------------------------------+
| ``plugins.alerting.index_timeout`` | TimeValue | ``30s`` | Timeout for indexing alerts, findings, and other plugin data. |
+------------------------------------+-----------+---------+---------------------------------------------------------------+
| ``plugins.alerting.bulk_timeout``  | TimeValue | ``30s`` | Timeout for bulk indexing operations.                         |
+------------------------------------+-----------+---------+---------------------------------------------------------------+

Alert history settings
^^^^^^^^^^^^^^^^^^^^^^

Alert history settings control how alert records are stored, rolled over, and retained. These settings help manage the size of alert history indices while ensuring that historical alerts remain available for investigation and auditing.

+-----------------------------------------------------+-----------+----------+------------------------------------------------------------------------------------------------------------+
| Setting                                             | Type      | Default  | Description                                                                                                |
+=====================================================+===========+==========+============================================================================================================+
| ``plugins.alerting.alert_history_enabled``          | Boolean   | ``true`` | Enables storage of historical alert records.                                                               |
+-----------------------------------------------------+-----------+----------+------------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.alert_history_rollover_period``  | TimeValue | ``12h``  | Specifies how frequently alert history indices are rolled over.                                            |
+-----------------------------------------------------+-----------+----------+------------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.alert_history_max_age``          | TimeValue | ``30d``  | Specifies the maximum age of alert history indices before they are eligible for deletion.                  |
+-----------------------------------------------------+-----------+----------+------------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.alert_history_max_docs``         | Long      | ``1000`` | Specifies the maximum number of documents allowed in an alert history index before rollover occurs.        |
+-----------------------------------------------------+-----------+----------+------------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.alert_history_retention_period`` | TimeValue | ``60d``  | Specifies how long historical alert records are retained.                                                  |
+-----------------------------------------------------+-----------+----------+------------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.alert_backoff_millis``           | TimeValue | ``50ms`` | Specifies the delay between retry attempts when writing alert history.                                     |
+-----------------------------------------------------+-----------+----------+------------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.alert_backoff_count``            | Integer   | ``3``    | Specifies the maximum number of retry attempts when alert history indexing fails.                          |
+-----------------------------------------------------+-----------+----------+------------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.max_actionable_alert_count``     | Long      | ``50``   | Specifies the maximum number of actionable alerts that can be processed during a single monitor execution. |
+-----------------------------------------------------+-----------+----------+------------------------------------------------------------------------------------------------------------+

Finding history settings
^^^^^^^^^^^^^^^^^^^^^^^^

Finding history settings control how findings generated by document-level and Active Response monitors are stored and retained. These settings determine whether findings are indexed, when finding history indices are rolled over, and how long historical findings remain available for analysis.

+---------------------------------------------------------+-----------+----------+---------------------------------------------------------------------------------------------+
| Setting                                                 | Type      | Default  | Description                                                                                 |
+=========================================================+===========+==========+=============================================================================================+
| ``plugins.alerting.alert_finding_enabled``              | Boolean   | ``true`` | Enables storage of findings generated by document-level monitors.                           |
+---------------------------------------------------------+-----------+----------+---------------------------------------------------------------------------------------------+
| ``plugins.alerting.alert_finding_rollover_period``      | TimeValue | ``12h``  | Specifies how frequently finding history indices are rolled over.                           |
+---------------------------------------------------------+-----------+----------+---------------------------------------------------------------------------------------------+
| ``plugins.alerting.finding_history_max_age``            | TimeValue | ``30d``  | Specifies the maximum age of finding history indices before they are eligible for deletion. |
+---------------------------------------------------------+-----------+----------+---------------------------------------------------------------------------------------------+
| ``plugins.alerting.alert_findings_indexing_batch_size`` | Integer   | ``1000`` | Specifies the maximum number of findings indexed in a single bulk indexing operation.       |
+---------------------------------------------------------+-----------+----------+---------------------------------------------------------------------------------------------+

Comment settings
^^^^^^^^^^^^^^^^

Comment settings control the management and retention of comments added to alerts. These settings determine whether comments are enabled, define storage limits, and configure the retention and rollover of comment history indices.

+-------------------------------------------------------+-----------+----------+--------------------------------------------------------------------------------------------------------+
| Setting                                               | Type      | Default  | Description                                                                                            |
+=======================================================+===========+==========+========================================================================================================+
| ``plugins.alerting.comments_enabled``                 | Boolean   | ``true`` | Enables comments on alerts.                                                                            |
+-------------------------------------------------------+-----------+----------+--------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.comments_history_max_docs``        | Long      | ``1000`` | Specifies the maximum number of documents permitted in a comment history index before rollover occurs. |
+-------------------------------------------------------+-----------+----------+--------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.comments_history_max_age``         | TimeValue | ``30d``  | Specifies the maximum age of comment history indices before they are eligible for deletion.            |
+-------------------------------------------------------+-----------+----------+--------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.comments_history_rollover_period`` | TimeValue | ``12h``  | Specifies how frequently comment history indices are rolled over.                                      |
+-------------------------------------------------------+-----------+----------+--------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.max_comment_character_length``     | Integer   | ``2000`` | Specifies the maximum number of characters allowed in a single comment.                                |
+-------------------------------------------------------+-----------+----------+--------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.max_comments_per_alert``           | Integer   | ``500``  | Specifies the maximum number of comments that can be associated with a single alert.                   |
+-------------------------------------------------------+-----------+----------+--------------------------------------------------------------------------------------------------------+
| ``plugins.alerting.max_comments_per_notification``    | Integer   | ``3``    | Specifies the maximum number of comments included in a notification message.                           |
+-------------------------------------------------------+-----------+----------+--------------------------------------------------------------------------------------------------------+

General settings
^^^^^^^^^^^^^^^^

General settings control module-wide behavior, including role-based access control, action throttling, and cross-cluster monitoring.

+-------------------------------------------------------+-----------+-----------+---------------------------------------------------------------------------------------------------+
| Setting                                               | Type      | Default   | Description                                                                                       |
+=======================================================+===========+===========+===================================================================================================+
| ``plugins.alerting.filter_by_backend_roles``          | Boolean   | ``false`` | Restricts access to alerting resources based on backend roles configured by the Security plugin.  |
+-------------------------------------------------------+-----------+-----------+---------------------------------------------------------------------------------------------------+
| ``plugins.alerting.action_throttle_max_value``        | TimeValue | ``24h``   | Specifies the maximum notification throttle interval that can be configured for an alert action.  |
+-------------------------------------------------------+-----------+-----------+---------------------------------------------------------------------------------------------------+
| ``plugins.alerting.cross_cluster_monitoring_enabled`` | Boolean   | ``true``  | Enables monitors to query indices located on remote clusters configured for cross-cluster search. |
+-------------------------------------------------------+-----------+-----------+---------------------------------------------------------------------------------------------------+

Update dynamic settings
^^^^^^^^^^^^^^^^^^^^^^^

Most Alerting module settings can be updated dynamically without restarting the Wazuh indexer. Use the Cluster Settings API to apply persistent or transient settings.

The following example updates two Alerting module settings:

-  ``plugins.alerting.monitor.max_monitors``: Increases the maximum number of monitors a user can create to 20.
-  ``plugins.alerting.alert_history_max_age``: Extends the maximum age of alert history indices to 60d.

Run the following command from a terminal on a host that can communicate with the Wazuh indexer REST API.

.. code-block:: console

   curl -sk -u <USERNAME>:<PASSWORD> -X PUT \
     "https://localhost:9200/_cluster/settings" \
     -H "Content-Type: application/json" \
     -d '{
     "persistent": {
       "plugins.alerting.monitor.max_monitors": 20,
       "plugins.alerting.alert_history_max_age": "60d"
     }
   }'

**Output**

.. code-block:: json
   :class: output

   {
     "acknowledged": true,
     "persistent": {
       "plugins": {
         "alerting": {
           "monitor": {
             "max_monitors": "20"
           },
           "alert_history_max_age": "60d"
         }
       }
     },
     "transient": {}
   }

The acknowledged value confirms that the Wazuh indexer accepted the settings update. The updated values appear under the persistent section, which means they remain in effect after the Wazuh indexer restarts.
