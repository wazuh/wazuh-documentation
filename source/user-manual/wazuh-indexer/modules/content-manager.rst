.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Content Manager module manages detection content used by Wazuh. Find more information in this section of the documentation.

Content Manager module
======================

The Content Manager module manages detection content used by Wazuh. It synchronizes threat intelligence content from the Wazuh Cyber Threat Intelligence (CTI) service, manages user-created content, and deploys content to the Wazuh manager and Security Analytics module.

The module is installed as part of the Wazuh indexer and exposes a REST API under ``/_plugins/_content_manager/``.

The Content Manager module:

-  Synchronizes content from the Wazuh Cyber Threat Intelligence (CTI) service.
-  Manages Sigma rules, decoders, integrations, KVDBs, filters, and security policies.
-  Validates content before deployment.
-  Promotes content between development stages.
-  Synchronizes Security Analytics detectors and rules.
-  Runs logtest validations.
-  Loads content into the Wazuh indexer.

.. _wazuh_indexer_content_manager_content_spaces:

Content spaces
--------------

The Content Manager module organizes content into four spaces that support content development and promotion workflows.

+----------+-----------------------------------------------------------+
| Space    | Description                                               |
+==========+===========================================================+
| Standard | Official content synchronized from the Wazuh CTI service. |
+----------+-----------------------------------------------------------+
| Draft    | Working area for newly created or modified content.       |
+----------+-----------------------------------------------------------+
| Test     | Validation area used before production deployment.        |
+----------+-----------------------------------------------------------+
| Custom   | Production-ready user content.                            |
+----------+-----------------------------------------------------------+

User-generated (custom) content is promoted through the *Draft* -> *Test* -> *Custom* spaces as illustrated in the diagram below:

.. thumbnail:: /images/manual/wazuh-indexer/content-spaces-promotion-diagram.png
   :title: Content spaces promotion diagram
   :alt: Content spaces promotion diagram
   :align: center
   :width: 80%

This workflow allows content to be validated before it is deployed to production environments.

.. _wazuh_indexer_content_manager_cti_synchronization:

CTI synchronization
-------------------

The Content Manager module automatically synchronizes content from the Wazuh CTI service. The synchronization process downloads and updates the following:

-  Rules
-  Decoders
-  Integrations
-  KVDBs
-  Policies
-  Filters
-  Indicators of Compromise (IoC)
-  Common Vulnerabilities and Exposures (CVE) data

By default, synchronization runs every 60 minutes. The ``plugins.content_manager.catalog.sync_interval`` setting changes the interval.

When new content becomes available, the Content Manager module updates the local content repository and automatically synchronizes related Security Analytics resources.

Security Analytics integration
------------------------------

The Content Manager module automatically synchronizes Security Analytics resources created from the Wazuh CTI content. This includes:

-  Sigma rules
-  Security Analytics detectors
-  Security Analytics integrations

When CTI content changes, Content Manager updates the corresponding Security Analytics resources automatically.

.. note::

   By default, a Security Analytics detector can reference up to 50 Sigma rules. Detector creation or updates that exceed this limit are rejected. The limit also applies to the detectors that the Content Manager module creates from Wazuh CTI integrations. The ``plugins.security_analytics.max_rules_per_detector`` setting changes this limit. See the :ref:`settings reference <wazuh_indexer_security_analytics_configuration>` of the Security Analytics module.

Content management
------------------

The Content Manager module also provides APIs for creating, updating, and deleting the following resources:

-  Rules
-  Decoders
-  Integrations
-  KVDBs
-  Policies
-  Filters

User-created content is stored in the Draft space and can be promoted through the standard content workflow.

Content validation
^^^^^^^^^^^^^^^^^^

Before content is promoted, the Content Manager module validates the configuration with the Wazuh Engine that ships with the Wazuh indexer. The Wazuh indexer starts this Engine as a child process and reaches it through the ``/usr/share/wazuh-indexer/engine/sockets/engine-api-http.sock`` socket. Validation helps identify:

-  Syntax errors
-  Invalid references
-  Configuration inconsistencies

Content that fails validation cannot be promoted. The following validation errors are common:

-  ``Missing root decoder``: the space still holds decoders or KVDBs, which always belong to an integration, but its policy has no root decoder. Delete them, or set a new root decoder, and promote the space again.
-  ``Cannot reach the Wazuh Engine: its API socket is not available``: the Wazuh Engine that ships with the Wazuh indexer isn't running, so its socket, ``/usr/share/wazuh-indexer/engine/sockets/engine-api-http.sock``, doesn't exist. The Wazuh indexer doesn't restart the Engine if it stops. Check ``/var/log/wazuh-indexer/wazuh-engine.log`` for the cause, then restart the Wazuh indexer.
-  ``Failed to communicate with the Engine``: the socket exists, but the Wazuh indexer can't use it, for example because its permissions changed. The socket must belong to the ``wazuh-indexer`` user with mode ``660`` (``srw-rw----``).

Log test
^^^^^^^^

The Content Manager module provides log test capabilities through the Wazuh indexer. Logtest allows you to:

-  Validate decoder behavior.
-  Verify rule matching.
-  Test event processing before deployment.

Content promotion
-----------------

Content promotion is the process of moving content between spaces. Before promotion, the Content Manager generates a preview of the proposed changes. The preview identifies:

-  New resources
-  Updated resources
-  Deleted resources

After validation succeeds, Content Manager applies the changes to the target space and synchronizes any affected Security Analytics resources.

Promotion workflow
^^^^^^^^^^^^^^^^^^

Content moves through the Draft, Test, and Custom spaces in that order, one space at a time. The Custom space is the last one and can't be promoted. The Standard space can't be promoted either. Each promotion goes through the following steps:

#. **Preview:** ``GET /_plugins/_content_manager/promote?space=<SPACE>`` lists the resources that the promotion adds, updates, or deletes in the next space. It doesn't change any content.
#. **Promotion request:** ``POST /_plugins/_content_manager/promote`` sends the source space and the changes from the preview.
#. **Validation:** the Wazuh Engine that ships with the Wazuh indexer validates the target space with the changes applied. It runs when the changes include decoders, KVDBs, or filters, or when the target space already holds them. Content that fails validation isn't promoted.
#. **Apply:** the Content Manager module writes the changes to the target space. If a write fails, the module reverts the changes, as described in :ref:`Rollback protection <wazuh_indexer_content_manager_rollback_protection>`.
#. **Security Analytics sync:** the module adds, updates, or deletes the matching integrations and rules in the Security Analytics module. If this step fails, the module logs the error and doesn't revert the promotion.

.. thumbnail:: /images/manual/wazuh-indexer/content-promotion-workflow.png
   :title: Content promotion workflow
   :alt: Content promotion workflow
   :align: center
   :width: 80%

.. _wazuh_indexer_content_manager_rollback_protection:

Rollback protection
^^^^^^^^^^^^^^^^^^^

The Content Manager module automatically protects promotions from partial failures. If an error occurs during promotion, previously applied changes are reverted, and the original content state is restored. This prevents incomplete promotions from leaving content in an inconsistent state.

Update notifications
--------------------

The Content Manager module sends a daily telemetry ping to the Wazuh CTI service. The ping carries the cluster UUID and the installed Wazuh version. It does not send rules, events, or logs. The ping is enabled by default. To turn it off, set ``plugins.content_manager.telemetry.enabled`` to ``false``.

The setting does not turn off update notifications. The Wazuh dashboard checks for newer Wazuh releases through ``GET /_plugins/_content_manager/version/check``, which works whether the ping is on or off. Content updates follow the schedule described in :ref:`CTI synchronization <wazuh_indexer_content_manager_cti_synchronization>`.

Configuration
-------------

The Content Manager module settings are configured in the ``/etc/wazuh-indexer/opensearch.yml`` file using the ``plugins.content_manager`` prefix. Changes take effect after you restart the Wazuh indexer. You can also change the settings marked dynamic at runtime through the Cluster Settings API.

+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| Setting                                         | Type    | Default                                                          | Description                                                                                                                                     |
+=================================================+=========+==================================================================+=================================================================================================================================================+
| ``catalog.sync_interval``                       | Integer | ``60``                                                           | Interval, in minutes, between scheduled CTI synchronizations. Valid range: 10-1440. Dynamic.                                                    |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``catalog.update_on_start``                     | Boolean | ``true``                                                         | Synchronizes content when the Wazuh indexer starts.                                                                                             |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``catalog.update_on_schedule``                  | Boolean | ``true``                                                         | Runs the scheduled CTI synchronization. When ``false``, no content is downloaded on a schedule. Dynamic.                                        |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``catalog.update_on_demand``                    | Boolean | ``true``                                                         | Allows on-demand updates through ``POST /_plugins/_content_manager/update``. When ``false``, the endpoint returns ``403`` for every caller.     |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``catalog.create_detectors``                    | Boolean | ``true``                                                         | Creates Security Analytics detectors from Wazuh CTI integrations during synchronization.                                                        |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``telemetry.enabled``                           | Boolean | ``true``                                                         | Sends the daily telemetry ping. It does not turn off update notifications in the Wazuh dashboard. Dynamic.                                      |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_integrations``                            | Integer | ``100``                                                          | Maximum number of user-created integrations in the Draft space. Minimum 0. Dynamic.                                                             |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_decoders``                                | Integer | ``200``                                                          | Maximum number of user-created decoders in the Draft space. Minimum 0. Dynamic.                                                                 |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_rules``                                   | Integer | ``200``                                                          | Maximum number of user-created Sigma rules in the Draft space. Minimum 0. Dynamic.                                                              |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_kvdbs``                                   | Integer | ``100``                                                          | Maximum number of user-created KVDBs in the Draft space. Minimum 0. Dynamic.                                                                    |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_filters``                                 | Integer | ``100``                                                          | Maximum number of user-created filters in each space. Minimum 0. Dynamic.                                                                       |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``catalog.policy_update.enabled``               | Boolean | ``true``                                                         | Allows policy updates through ``PUT /_plugins/_content_manager/policy/{space}``. When ``false``, the endpoint returns ``403`` for every caller. |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``catalog.ruleset``                             | String  | ``Empty``                                                        | Full CTI consumer URL for ruleset content.                                                                                                      |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``catalog.iocs``                                | String  | ``Empty``                                                        | Full CTI consumer URL for IoC content.                                                                                                          |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``catalog.vulnerabilities``                     | String  | ``Empty``                                                        | Full CTI consumer URL for vulnerability (CVE) content.                                                                                          |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cti.api``                                     | String  | ``https://api.pre.cloud.wazuh.com/api/v1``                       | Base URL of the Wazuh CTI API, for both the catalog and the CTI Console endpoints.                                                              |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cti.console.timeout``                         | Integer | ``5``                                                            | Timeout, in seconds, for CTI Console requests, such as instance registration and token exchange. Valid range: 1-120.                            |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``client.timeout``                              | Long    | ``10``                                                           | HTTP client timeout, in seconds, for CTI API requests. Valid range: 10-50.                                                                      |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``client.max_retries``                          | Integer | ``3``                                                            | Number of times a CTI API request is retried after a ``429`` response, a timeout, or a closed or reset connection. Valid range: 0-10.           |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``client.retry_backoff_base_seconds``           | Integer | ``30``                                                           | Base delay, in seconds, of the exponential backoff between CTI API retries. Valid range: 1-300.                                                 |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``logtest.max_body_bytes``                      | Long    | ``1048576``                                                      | Maximum size, in bytes, of a log test request body. Valid range: 1024-16777216. Dynamic.                                                        |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_bulk_bytes``                              | Long    | ``5242880``                                                      | Maximum size, in bytes, of a single bulk indexing request. Valid range: 1048576-104857600.                                                      |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``engine.socket_path``                          | String  | ``/usr/share/wazuh-indexer/engine/sockets/engine-api-http.sock`` | Path of the Unix socket of the Wazuh Engine API.                                                                                                |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``setup_wait.max_retries``                      | Integer | ``4``                                                            | Number of times the synchronization job retries while it waits for the Setup module to be ready at startup. Valid range: 0-10.                  |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``setup_wait.backoff_base_seconds``             | Integer | ``20``                                                           | Base delay, in seconds, of the exponential backoff between those retries. Valid range: 1-120.                                                   |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``job_schedule.max_retries``                    | Integer | ``3``                                                            | Number of attempts to register a periodic job with the job scheduler. Valid range: 0-10.                                                        |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``security_analytics.sync_timeout_seconds``     | Integer | ``60``                                                           | Maximum time, in seconds, of a Security Analytics bulk synchronization step. Valid range: 1-3600.                                               |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``security_analytics.detector_timeout_seconds`` | Integer | ``30``                                                           | Time, in seconds, to wait for the first detector creation to complete. Valid range: 1-3600.                                                     |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``security_analytics.cleanup_timeout_seconds``  | Integer | ``120``                                                          | Time, in seconds, to wait for stale Security Analytics rules and integrations to be deleted. Valid range: 120-3600.                             |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``update_sub_batch_size``                       | Integer | ``50``                                                           | Maximum number of update offsets batched into one request while a catalog change set is applied. Valid range: 1-1000.                           |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``offset_flush_interval``                       | Integer | ``10``                                                           | Number of batches or bulk requests processed between consumer offset checkpoints. Valid range: 1-1000.                                          |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search_page_size``                            | Integer | ``1000``                                                         | Page size of the paginated IoC reconciliation scan and the IoC export to the Wazuh Engine. Valid range: 100-10000.                              |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``bulk.retry.shed.max_retries``                 | Integer | ``3``                                                            | Number of times a bulk operation that the cluster shed under load is resubmitted. Valid range: 0-10. Dynamic.                                   |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``bulk.retry.shed.initial_backoff_millis``      | Long    | ``1000``                                                         | Delay, in milliseconds, before the first resubmission of a shed bulk operation. Valid range: 100-60000. Dynamic.                                |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``bulk.retry.shed.max_backoff_millis``          | Long    | ``30000``                                                        | Maximum delay, in milliseconds, between resubmissions of a shed bulk operation. Valid range: 100-60000. Dynamic.                                |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``bulk.retry.topology.max_retries``             | Integer | ``5``                                                            | Number of times a bulk operation deferred by a transient cluster topology change is resubmitted. Valid range: 0-10. Dynamic.                    |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``bulk.retry.topology.initial_backoff_millis``  | Long    | ``5000``                                                         | Delay, in milliseconds, before the first resubmission of a deferred bulk operation. Valid range: 100-60000. Dynamic.                            |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``bulk.retry.topology.max_backoff_millis``      | Long    | ``30000``                                                        | Maximum delay, in milliseconds, between resubmissions of a deferred bulk operation. Valid range: 100-60000. Dynamic.                            |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``resource_lock.max_retries``                   | Integer | ``20``                                                           | Number of attempts to acquire the resource-creation lock before the request is rejected with ``503``. Valid range: 1-100. Dynamic.              |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``resource_lock.retry_backoff_millis``          | Long    | ``100``                                                          | Delay, in milliseconds, between attempts to acquire the resource-creation lock. Valid range: 10-10000. Dynamic.                                 |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| ``resource_lock.stale_threshold_millis``        | Long    | ``30000``                                                        | Age, in milliseconds, after which a held resource-creation lock is treated as orphaned. Valid range: 5000-600000. Dynamic.                      |
+-------------------------------------------------+---------+------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+

A create request that would exceed a ``max_*`` limit is rejected with ``400 Bad Request``.

REST API
--------

The Content Manager API is available under ``/_plugins/_content_manager/`` on the Wazuh indexer. The API supports:

-  Subscription management
-  Content synchronization
-  Content management operations
-  Policy management
-  Promotion workflows
-  Logtest execution
-  Content validation

For a complete list of endpoints, see the :doc:`Wazuh indexer API reference </user-manual/indexer-api/reference>` documentation.

.. note::

   The on-demand update endpoint, ``/_plugins/_content_manager/update``, and the policy update endpoint, ``/_plugins/_content_manager/policy/{space}``, require the ``cluster:admin/content_manager/update/trigger`` and ``cluster:admin/content_manager/policy/update`` permissions. No default role holds them, so out of the box only users with the ``all_access`` role, such as admin, can call them.

   To delegate them, create a role that grants these permissions. The policy update also reads and writes the Content Manager indices with the caller's permissions, so that role also needs the ``cluster_composite_ops`` cluster permission and ``read`` and ``index`` on ``wazuh-threatintel-*``. The on-demand update needs only its own permission. You can also turn each endpoint off with ``plugins.content_manager.catalog.update_on_demand`` or ``plugins.content_manager.catalog.policy_update.enabled``. A turned-off endpoint returns 403 Forbidden for every caller, including admin.
