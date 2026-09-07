.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: In this section of the Wazuh documentation, you will find all the information related to the internal configuration of Wazuh managers and agents.

.. _reference_internal_options:

Internal configuration
=======================

The Wazuh internal configuration files contain advanced settings that control the behavior of Wazuh components. These settings are intended for advanced tuning, debugging, performance optimization, and troubleshooting.

Most Wazuh deployments do not require changes to the internal configuration. Before modifying any internal option, review the corresponding component documentation and change only the settings that are necessary for your environment.

Wazuh 5.0 uses separate internal configuration files for the manager and the agent.

+---------------------------------+--------------------------------------------------------------+
| Component                       | Configuration file                                           |
+=================================+==============================================================+
| Wazuh manager                   | /var/wazuh-manager/etc/wazuh-manager-internal-options.conf   |
+---------------------------------+--------------------------------------------------------------+
| Wazuh agent                     | /var/ossec/etc/internal_options.conf                         |
+---------------------------------+--------------------------------------------------------------+
| Wazuh agent (local overrides)   | /var/ossec/etc/local_internal_options.conf                   |
+---------------------------------+--------------------------------------------------------------+

- `Wazuh manager internal configuration`_
- `Wazuh agent internal configuration`_

Wazuh manager internal configuration
---------------------------------------

The ``/var/wazuh-manager/etc/wazuh-manager-internal-options.conf`` file allows you to override the default internal settings used by Wazuh manager components.

In Wazuh 5.0, the default values for manager internal options are compiled into the manager binaries. The ``wazuh-manager-internal-options.conf`` file is empty by default and should contain only the options that you want to override.

All of the following settings exist in ``/var/wazuh-manager/etc/wazuh-manager-internal-options.conf``. Edit the file and restart the Wazuh manager service for changes to take effect.

- `Analysisd`_
- `Remoted`_
- `Authd`_
- `Wazuh clusterd`_
- `Wazuh database`_
- `Wazuh modules`_
- `Vulnerability scanner`_
- `Recurring manager tasks (wazuh_modules.manager_task_*)`_
- `Wazuh DB`_

Analysisd
^^^^^^^^^^

The ``analysisd.*`` internal options configure the Wazuh Engine (``wazuh-manager-analysisd``), which processes, enriches, and evaluates events before forwarding them to configured outputs.

+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| Setting                                                      | Description                                                                                  | Default value   |
+==============================================================+==============================================================================================+=================+
| **analysisd.debug**                                          | Controls the Engine log verbosity level.                                                     | 0               |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.event_queue_size**                               | Maximum number of events waiting in the router input queue. Events can be dropped when this  | 131072          |
|                                                              | queue is full.                                                                               |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.event_queue_eps**                                | Maximum event ingestion rate. A value of 0 means unlimited.                                  | 0               |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.event_queue_max_bytes**                          | Maximum total byte size of events waiting in the router input queue. Events are dropped when | 32MB            |
|                                                              | this quota is full. A value of 0 means unlimited.                                            |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.agent_metadata_cache_ttl**                       | Time-to-live, in seconds, for cached agent metadata.                                         | 300             |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.agent_metadata_cache_clean_interval**            | Interval, in seconds, between best-effort evictions of stale agent metadata cache entries.   | 60              |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.indexer_queue_max_bytes**                        | Maximum number of bytes of events waiting in the indexer output queue. Events can be dropped | 64MB            |
|                                                              | when this queue is full.                                                                     |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.indexer_bulk_max_bytes**                         | Maximum byte size of the bulk payload accumulated before a _bulk request is dispatched to    | 8MB             |
|                                                              | the Wazuh indexer. When the buffered data reaches this threshold, a batch is flushed.        |                 |
|                                                              | Allowed range: 64KB to 100MB.                                                                |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.indexer_flush_interval**                         | Interval, in seconds, between periodic flushes of the asynchronous indexer bulk buffer.      | 20              |
|                                                              | Allowed range: 1 to 3600.                                                                    |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.indexer_logger_queue_size**                      | Maximum number of _bulk responses and their payloads that can wait in the indexer            | 8               |
|                                                              | error-logger queue. When the queue is full, error details are dropped and a warning is       |                 |
|                                                              | logged. Allowed range: 1 to 1024.                                                            |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.indexer_logger_threads**                         | Number of worker threads that parse _bulk error responses to log per-item failures. Allowed  | 1               |
|                                                              | range: 1 to 16.                                                                              |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.indexer_max_retry_delay**                        | Maximum exponential-backoff delay, in seconds, between retries of a failed _bulk request.    | 15              |
|                                                              | Allowed range: 1 to 3600.                                                                    |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.remote_conf_sync_interval**                      | Interval, in seconds, between remote Engine configuration synchronization cycles.            | 120             |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.remote_conf_indexer_connector_max_retries**      | Maximum retry attempts for remote configuration requests to the Wazuh indexer.               | 3               |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.remote_conf_indexer_connector_retry_interval**   | Interval, in seconds, between retry attempts for remote configuration synchronization.       | 5               |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.cm_sync_interval**                               | Interval, in seconds, between content synchronization cycles from the Wazuh indexer.         | 120             |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.cmsync_indexer_connector_sync_batch_size**       | Maximum number of content documents requested per Wazuh indexer page during content          | 100             |
|                                                              | synchronization.                                                                             |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.cmsync_indexer_connector_max_retries**           | Maximum retry attempts for content synchronization requests to the Wazuh indexer.            | 3               |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.cmsync_indexer_connector_retry_interval**        | Interval, in seconds, between retry attempts for content synchronization.                    | 5               |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.ioc_sync_interval**                              | Interval, in seconds, between IoC database synchronization cycles. A value of 0 disables IoC | 360             |
|                                                              | synchronization.                                                                             |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.ioc_indexer_connector_max_retries**              | Maximum retry attempts for IoC synchronization requests to the Wazuh indexer.                | 3               |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.ioc_indexer_connector_retry_interval**           | Interval, in seconds, between retry attempts for IoC synchronization.                        | 5               |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.ioc_indexer_connector_sync_batch_size**          | Maximum number of IoC documents streamed per Wazuh indexer page while synchronizing IoC      | 1000            |
|                                                              | databases.                                                                                   |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+
| **analysisd.geo_sync_interval**                              | Interval, in seconds, between GeoIP database synchronization cycles. A value of 0 disables   | 360             |
|                                                              | GeoIP synchronization.                                                                       |                 |
+--------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+

Remoted
^^^^^^^^^^^^^^^^^^^

The ``remoted.*`` internal options configure the Wazuh manager Remoted module.

+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| Setting                                          | Description                                                                                    | Default value            | Allowed values                       |
+==================================================+================================================================================================+==========================+======================================+
| **remoted.debug**                                | Debug logging level for the remoted module.                                                    | 0                        | 0 (disabled), 1 (basic), 2 (verbose) |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.receive_chunk**                        | Network receive buffer size in bytes.                                                          | 4096                     | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.send_timeout_to_retry**                | Timeout, in seconds, before retrying a failed send operation.                                  | 1                        | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.worker_pool**                          | Number of worker threads used to process agent messages.                                       | 4                        | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.sender_pool**                          | Number of sender threads used to forward events to the Engine.                                 | 8                        | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.control_msg_queue_size**               | Queue capacity for agent keepalive and control messages.                                       | 16384                    | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.batch_events_capacity**                | Queue capacity for batching events before forwarding them to the Engine.                       | 131072                   | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.queue_max_bytes**                      | Maximum number of bytes held in the input message queue. A value of 0 disables the byte limit. | 67108864                 | 0 or integer from 1024 upward        |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.batch_events_max_bytes**               | Maximum number of bytes held in the events queue before events are forwarded to the Engine. A  | 33554432                 | 0 or integer from 1024 upward        |
|                                                  | value of 0 disables the byte limit.                                                            |                          |                                      |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.enrich_cache_expire_time**             | Agent metadata cache expiration time, in seconds.                                              | 300                      | Integer from 60 to 86400             |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.keyupdate_interval**                   | Interval, in seconds, for reloading agent key files.                                           | 10                       | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.rlimit_nofile**                        | Maximum number of file descriptors that the Remoted process can open.                          | 458752                   | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.state_interval**                       | Interval, in seconds, for updating the Remoted state file. A value of 0 disables state-file    | 5                        | 0 or positive integer                |
|                                                  | updates.                                                                                       |                          |                                      |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.send_chunk**                           | Maximum number of bytes sent in a single write operation to an agent.                          | 4096                     | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.buffer_relax**                         | Send-buffer flushing mode.                                                                     | 1                        | 0 (strict), 1 (relaxed), 2 (lazy)    |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.send_buffer_size**                     | Size, in bytes, of the send buffer for each agent connection.                                  | 131072                   | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.recv_timeout**                         | Timeout, in seconds, for receiving data from agents.                                           | 1                        | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.tcp_keepidle**                         | Time, in seconds, that a TCP connection remains idle before keepalive probes begin.            | 30                       | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.tcp_keepintvl**                        | Interval, in seconds, between TCP keepalive probes.                                            | 10                       | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.tcp_keepcnt**                          | Number of unacknowledged TCP keepalive probes before the connection is considered unavailable. | 3                        | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.merge_shared**                         | Controls whether Remoted merges shared configuration files for agents.                         | yes                      | yes, no                              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.pass_empty_keyfile**                   | Controls whether Remoted starts when the client.keys file is empty.                            | yes                      | yes, no                              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.router_forwarding_disabled**           | Controls whether forwarding messages to the router component is disabled.                      | no                       | yes, no                              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.request_pool**                         | Size of the request pool used to handle agent communications.                                  | 1024                     | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.request_timeout**                      | Timeout, in seconds, for agent request operations.                                             | 10                       | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.response_timeout**                     | Timeout, in seconds, for manager responses to agent requests.                                  | 60                       | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.request_rto_sec**                      | Seconds component of the retransmission timeout for agent requests.                            | 1                        | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.request_rto_msec**                     | Milliseconds component of the retransmission timeout for agent requests.                       | 0                        | Integer from 0 to 999                |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.max_attempts**                         | Maximum number of attempts for failed agent communications.                                    | 4                        | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.shared_reload**                        | Interval, in seconds, for reloading shared configuration files.                                | 10                       | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.disk_storage**                         | Controls whether temporary shared configuration data is stored on disk.                        | no                       | yes, no                              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.verify_msg_id**                        | Controls whether Remoted verifies agent message identifier sequences.                          | no                       | yes, no                              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.batch_events_per_agent_capacity**      | Maximum number of events batched per agent before forwarding them to the Engine.               | 131072                   | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.recv_counter_flush**                   | Number of received messages after which receive counters are flushed to statistics.            | 128                      | Positive integer                     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.comp_average_printout**                | Number of processed events after which compression statistics are logged.                      | 19999                    | Integer from 10 to 999999            |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_io_threads**                      | I/O threads (accept + read/write) for the HTTPS agent server.                                  | 0 (auto: CPU count)      | Integer from 0 to 64                 |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_worker_threads**                  | Worker threads running endpoint handlers.                                                      | 0 (auto: 2x CPU count)   | Integer from 0 to 256                |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_read_timeout**                    | Seconds to wait for a full request to arrive.                                                  | 10                       | Integer from 1 to 300                |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_write_timeout**                   | Seconds to wait for a response write to complete (rearmed per chunk on streamed downloads).    | 10                       | Integer from 1 to 300                |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_request_timeout**                 | Seconds a request may take end-to-end.                                                         | 30                       | Integer from 1 to 600                |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_max_url_size**                    | Maximum accepted URL size, in bytes.                                                           | 2048                     | Integer from 1 to 65536              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_max_header_name_size**            | Maximum accepted HTTP header name size, in bytes.                                              | 256                      | Integer from 1 to 8192               |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_max_header_value_size**           | Maximum accepted HTTP header value size, in bytes.                                             | 8192                     | Integer from 1 to 65536              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_max_header_count**                | Maximum number of HTTP headers accepted per request.                                           | 64                       | Integer from 1 to 1024               |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_max_pipelined_requests**          | Max in-flight unanswered requests per connection.                                              | 4                        | Integer from 1 to 64                 |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_concurrent_accepts**              | Max concurrent in-progress TCP accepts.                                                        | 0 (auto, floored at 2)   | Integer from 0 to 64                 |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_buffer_size**                     | Socket read buffer size, in bytes.                                                             | 8192                     | Integer from 1 to 1048576            |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.max_inflight_bytes**                   | Max in-flight request payload bytes before shedding load with HTTP 503.                        | 268435456 (256 MiB)      | Integer from 1048576 to 1073741824   |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.max_parallel_connections**             | Max simultaneous HTTPS connections.                                                            | 512                      | Integer from 1 to 65536              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.max_deferred_requests**                | Max requests parked awaiting a downstream service before 503.                                  | 256                      | Integer from 1 to 65536              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_stream_chunk_size**               | Bytes per chunk when streaming POST /download.                                                 | 65536                    | Integer from 4096 to 1048576         |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.http_content_encoding_enabled**        | Accept Content-Encoding: zstd request bodies.                                                  | 1 (enabled)              | 0 or 1                               |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.downstream_connect_timeout**           | Seconds to wait for the downstream UDS connect to complete.                                    | 2                        | Integer from 1 to 60                 |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.downstream_write_timeout**             | Seconds to wait for the request body write to the downstream service.                          | 5                        | Integer from 1 to 300                |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.downstream_response_timeout**          | Seconds to wait for the downstream service's response after the write completes.               | 5                        | Integer from 1 to 300                |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.downstream_stateful_response_timeout** | Seconds to wait for the inventory sync server's answer to POST /stateful.                      | 20                       | Integer from 1 to 3600               |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.jwt_max_age**                          | Max age of an agent's bearer token the auth middleware accepts.                                | 60                       | Integer from 1 to 43200              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.jwt_clock_skew**                       | Tolerated clock difference between agent and manager.                                          | 30                       | Integer from 0 to 43200              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.auth_max_body_size**                   | Hard cap on authenticated request body size.                                                   | 10485760 (10 MiB)        | Integer from 1048576 to 67108864     |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.enroll_password_refresh_interval**     | Seconds between polls of etc/authd.pass for Password-mode POST /enroll.                        | 10                       | Integer from 1 to 3600               |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.authd_connect_timeout**                | Seconds remoted waits to connect to authd's local enrollment socket.                           | 2                        | Integer from 1 to 60                 |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.authd_response_timeout**               | Seconds remoted waits for authd's answer once connected.                                       | 0 (worker-aware default) | Integer from 0 to 120                |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.authd_max_queue_size**                 | Enrollment requests that may wait for an authd worker before further ones are refused.         | 256                      | Integer from 1 to 65536              |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+
| **remoted.authd_worker_threads**                 | Concurrent connections remoted keeps to authd for enrollment.                                  | 8                        | Integer from 1 to 32                 |
+--------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------+--------------------------------------+

Authd
^^^^^^

The ``authd.*`` and ``auth.*`` internal options configure the Wazuh enrollment service.

+----------------------------------------------------+------------------------------------------------------------------------------------------------+---------------+--------------------------------------+
| Setting                                            | Description                                                                                    | Default value | Allowed values                       |
+====================================================+================================================================================================+===============+======================================+
| **authd.debug**                                    | Debug logging level for the authd daemon.                                                      | 0             | 0 (disabled), 1 (basic), 2 (verbose) |
+----------------------------------------------------+------------------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **auth.timeout_seconds**                           | Seconds component of the timeout for agent enrollment requests.                                | 1             | Integer                              |
+----------------------------------------------------+------------------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **auth.timeout_microseconds**                      | Microseconds component of the timeout for agent enrollment requests.                           | 0             | Integer                              |
+----------------------------------------------------+------------------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **authd.max_agents**                               | Maximum number of agents that can be registered. A value of 0 means unlimited.                 | 0             | Non-negative integer                 |
+----------------------------------------------------+------------------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **authd.purge_delay**                              | Seconds an agent deletion waits before its indexer purge may run (0 = immediate). The deletion | 120           | 0 to 3600 (seconds)                  |
|                                                    | itself - client.keys and wazuh-db - is never delayed, only the indexer purge.                  |               |                                      |
+----------------------------------------------------+------------------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **authd.wdb_timeout**                              | Seconds authd allows for one wazuh-db round trip.                                              | 10            | 1 to 300 (seconds)                   |
+----------------------------------------------------+------------------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **wazuh_modules.manager_task_max_pending_deletes** | Deletions still waiting to reach the indexer before new ones are refused (0 = unlimited).      | 20000         | 0 (unlimited) to 1000000             |
+----------------------------------------------------+------------------------------------------------------------------------------------------------+---------------+--------------------------------------+

Wazuh clusterd
^^^^^^^^^^^^^^^

The ``wazuh_clusterd.*`` internal options configure the Wazuh cluster daemon.

+----------------------------+-----------------------------------------------------+-----------------+----------------------------------------+
| Setting                    | Description                                         | Default value   | Allowed values                         |
+============================+=====================================================+=================+========================================+
| **wazuh_clusterd.debug**   | Debug logging level for the Wazuh cluster daemon.   | 0               | 0 (disabled), 1 (basic), 2 (verbose)   |
+----------------------------+-----------------------------------------------------+-----------------+----------------------------------------+

Wazuh database
^^^^^^^^^^^^^^^

The ``wazuh_database.*`` internal options configure the Database Sync module.

+------------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------+
| Setting                            | Description                                                                                  | Default value   | Allowed values                |
+====================================+==============================================================================================+=================+===============================+
| wazuh_database.sync_agents         | Controls whether agent database synchronization is enabled.                                  | 1               | 0 (disabled), 1 (enabled)     |
+------------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------+
| wazuh_database.real_time           | Controls whether agent updates are synchronized immediately. When disabled, updates are      | 1               | 0 (disabled), 1 (enabled)     |
|                                    | synchronized according to wazuh_database.interval.                                           |                 |                               |
+------------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------+
| wazuh_database.interval            | Synchronization interval, in seconds, when real-time synchronization is disabled.            | 60              | Integer from 1 to 86400       |
+------------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------+
| wazuh_database.max_queued_events   | Maximum number of agent events queued before synchronization is triggered.                   | 10000           | Integer from 100 to 1000000   |
+------------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------+

Wazuh modules
^^^^^^^^^^^^^^

The ``wazuh_modules.*`` internal options configure the Inventory Sync module.

+------------------------------------------------------------+-----------------------------------------------------------------------------------+-----------------+----------------------------------+
| Setting                                                    | Description                                                                       | Default value   | Allowed values                   |
+============================================================+===================================================================================+=================+==================================+
| **wazuh_modules.max_sessions**                             | Maximum number of concurrent inventory synchronization sessions.                  | 1000            | Integer from 1 to 100000         |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+-----------------+----------------------------------+
| **wazuh_modules.inventory_sync_queue_size**                | Capacity of the input worker queue used to buffer incoming Router messages.       | 10000           | Integer from 100 to 1000000      |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+-----------------+----------------------------------+
| **wazuh_modules.inventory_sync_data_value_quota**          | Global DataValue quota shared across active inventory synchronization sessions.   | 500000          | Integer from 1 to 1000000000     |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+-----------------+----------------------------------+
| **wazuh_modules.inventory_sync_indexer_bulk_size_bytes**   | Indexer bulk-size threshold, in bytes, that triggers a synchronous flush.         | 10485760        | Integer from 4096 to 104857600   |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+-----------------+----------------------------------+
| **wazuh_modules.inventory_sync_indexer_flush_interval**    | Interval, in seconds, between periodic Indexer Connector flushes.                 | 20              | Integer from 1 to 3600           |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+-----------------+----------------------------------+

Vulnerability scanner
^^^^^^^^^^^^^^^^^^^^^^^

The ``wazuh_modules.*`` and ``vulnerability-detection.*`` internal options configure the Vulnerability Scanner module.

+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| Setting                                          | Description                                                                        | Default value | Allowed values                       |
+==================================================+====================================================================================+===============+======================================+
| **wazuh_modules.indexer_bulk_size_bytes**        | Indexer bulk-size threshold, in bytes, that triggers a synchronous flush.          | 10485760      | Integer from 4096 to 104857600       |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **wazuh_modules.indexer_flush_interval**         | Interval, in seconds, between periodic Indexer Connector flushes.                  | 20            | Integer from 1 to 3600               |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **vulnerability-detection.debug**                | Debug logging level for the Vulnerability Scanner module.                          | 0             | 0 (disabled), 1 (basic), 2 (verbose) |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **vulnerability-detection.translation_lru_size** | LRU cache size for OS/package to CPE translation lookups.                          | 2048          | 1 to 100000                          |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **vulnerability-detection.osdata_lru_size**      | LRU cache size for OS data lookups.                                                | 1000          | 1 to 100000                          |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **vulnerability-detection.remediation_lru_size** | LRU cache size for remediation lookups.                                            | 2048          | 1 to 100000                          |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **vulnerability-detection.scan_workers**         | Concurrent vulnerability scan slots (0 = half the host's cores, minimum 1).        | 0             | 0 to 64                              |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **vulnerability-detection.disable_scan_manager** | Disable vulnerability scanning of the manager node itself.                         | 1 (disabled)  | 0 (enabled) or 1 (disabled)          |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **vulnerability-detection.report_queue_size**    | Capacity of the internal report queue, in reports.                                 | 262144        | 0 to 2147483647                      |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **wazuh_modules.manager_task_max_pending_scans** | Pending on-demand (POST /scan/vd) scan tasks allowed before admission answers 503. | 64            |                                      |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **wazuh_modules.manager_task_vd_scan_timeout**   | Seconds the dispatcher allows one scan before abandoning and re-queueing it.       | 300           |                                      |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+
| **wazuh_modules.manager_task_create_timeout**    | Seconds admission allows for recording the scan task.                              | 2             |                                      |
+--------------------------------------------------+------------------------------------------------------------------------------------+---------------+--------------------------------------+

Recurring manager tasks (wazuh_modules.manager_task_*)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The manager's recurring jobs - log rotation and agent-disconnection/retention monitoring - are configured through the ``wazuh_modules.manager_task_*`` namespace.

+----------------------------------------------------+-------------------------------------------------------------+---------------+
| Setting                                            | Description                                                 | Default value |
+====================================================+=============================================================+===============+
| **wazuh_modules.manager_task_monitor_agents**      | Whether the retention sweep runs and disconnections are     | 1             |
|                                                    | logged.                                                     |               |
+----------------------------------------------------+-------------------------------------------------------------+---------------+
| **wazuh_modules.manager_task_log_rotate**          | Whether either kind of log rotation happens.                | 1             |
+----------------------------------------------------+-------------------------------------------------------------+---------------+
| **wazuh_modules.manager_task_log_day_wait**        | Offset from local midnight for daily rotation, in seconds.  | 10            |
+----------------------------------------------------+-------------------------------------------------------------+---------------+
| **wazuh_modules.manager_task_log_compress**        | Whether rotated logs are gzipped.                           | 1             |
+----------------------------------------------------+-------------------------------------------------------------+---------------+
| **wazuh_modules.manager_task_log_keep_days**       | How long rotated logs are kept.                             | 31            |
+----------------------------------------------------+-------------------------------------------------------------+---------------+
| **wazuh_modules.manager_task_log_size_rotate**     | Threshold for size-based rotation.                          | 512 MB        |
+----------------------------------------------------+-------------------------------------------------------------+---------------+
| **wazuh_modules.manager_task_log_daily_rotations** | Rotated slots per day per file.                             | 12            |
+----------------------------------------------------+-------------------------------------------------------------+---------------+
| **wazuh_modules.manager_task_delete_old_agents**   | Retention window in minutes for long-disconnected agents (0 | 0             |
|                                                    | = disabled).                                                |               |
+----------------------------------------------------+-------------------------------------------------------------+---------------+

.. note::
   ``agents_disconnection_time`` (in ``<global>``) is shared with remoted and still governs how often the disconnection sweep runs and how long an agent must be silent - it is not a ``monitord.*``/``wazuh_modules.*`` internal option. Renamed-key warning: if you had any of these set under the old ``monitord.*`` names in ``wazuh-manager-internal-options.conf`` from an earlier build, rename them - an override under the old name is silently ignored rather than erroring.

Wazuh DB
^^^^^^^^^

The ``wazuh_db.*`` internal options configure the Wazuh database daemon.

+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| Setting                                     | Description                                                                            | Default value   | Allowed values                         |
+=============================================+========================================================================================+=================+========================================+
| **wazuh_db.debug**                          | Debug logging level for Wazuh DB.                                                      | 0               | 0 (disabled), 1 (basic), 2 (verbose)   |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.worker_pool_size**               | Number of worker threads used by Wazuh DB.                                             | 8               | Integer from 1 to 32                   |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.commit_time_min**                | Minimum interval, in seconds, between database transaction commits.                    | 10              | Integer from 1 to 3600                 |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.commit_time_max**                | Maximum interval, in seconds, between database transaction commits.                    | 60              | Integer from 1 to 3600                 |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.open_db_limit**                  | Maximum number of database connections that can remain open.                           | 64              | Integer from 1 to 4096                 |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.rlimit_nofile**                  | Maximum number of file descriptors available to the Wazuh DB process.                  | 458752          | Integer from 1024 to 1048576           |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.fragmentation_threshold**        | Database fragmentation percentage at which maintenance is considered.                  | 75              | Integer from 0 to 100                  |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.fragmentation_delta**            | Additional fragmentation percentage required before a vacuum operation is triggered.   | 5               | Integer from 0 to 100                  |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.free_pages_percentage**          | Percentage of free database pages to maintain.                                         | 0               | Integer from 0 to 99                   |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.max_fragmentation**              | Maximum allowed database fragmentation percentage.                                     | 90              | Integer from 0 to 100                  |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **wazuh_db.check_fragmentation_interval**   | Interval, in seconds, between database fragmentation checks.                           | 7200            | Integer from 1 to 30758400             |
+---------------------------------------------+----------------------------------------------------------------------------------------+-----------------+----------------------------------------+

Wazuh agent internal configuration
--------------------------------------

The Wazuh agent uses the ``/var/ossec/etc/internal_options.conf`` file for its default internal settings.

To override an internal setting, add the option to ``/var/ossec/etc/local_internal_options.conf``. This file preserves custom settings when the Wazuh agent is upgraded.

All of the following settings exist in ``/var/ossec/etc/local_internal_options.conf``. Edit the file and restart the Wazuh agent service for changes to take effect.

- `Agent`_
- `Execd`_
- `Wazuh command`_
- `Syscheck`_
- `Logcollector`_
- `Rootcheck`_
- :ref:`Security configuration assessment <internal_options_sca>`

Agent
^^^^^^

The ``agent.*`` internal options configure the Wazuh agent daemon. The ``monitord.*`` options control agent log rotation.

+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| Setting                        | Description                                                                                  | Default value   | Allowed values                                                    |
+================================+==============================================================================================+=================+===================================================================+
| **agent.debug**                | Debug logging level for the Wazuh agent daemon.                                              | 0               | 0 (disabled), 1 (basic), 2 (verbose)                              |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.recv_timeout**         | Timeout, in seconds, for receiving data from the manager.                                    | 60              | Any integer between 1 and 600.                                    |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.send_timeout**         | Maximum time (in seconds) that ``send()`` may block on the agent → manager TCP socket before | 30              | Positive integer, 1-600                                           |
|                                | giving up. Bounds how long the agent can stay stuck behind a full send buffer (e.g. a        |                 |                                                                   |
|                                | stalled network path or a manager that stopped reading); once this expires, the agent closes |                 |                                                                   |
|                                | the socket and reconnects instead of blocking indefinitely.                                  |                 |                                                                   |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.tcp_keepidle**         | Time (in seconds) the connection needs to remain idle before TCP starts sending keepalive    | 60              | Positive integer, 1-7200                                          |
|                                | probes.                                                                                      |                 |                                                                   |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.tcp_keepintvl**        | Time (in seconds) between individual keepalive probes.                                       | 15              | Positive integer, 1-100                                           |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.tcp_keepcnt**          | Maximum number of unanswered keepalive probes before the kernel drops the connection.        | 4               | Positive integer, 1-50                                            |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.max_attempts**         | Maximum number of attempts for failed requests.                                              | 4               | Positive integer                                                  |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.request_pool**         | Size of the request pool used for manager communications.                                    | 1024            | Positive integer                                                  |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.request_rto_sec**      | Seconds component of the retransmission timeout for requests.                                | 1               | Positive integer                                                  |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.request_rto_msec**     | Milliseconds component of the retransmission timeout for requests.                           | 0               | Integer from 0 to 999                                             |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.remote_conf**          | Controls whether the agent accepts centralized configuration from the manager.               | 1               | 0 (disabled), 1 (enabled)                                         |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.min_eps**              | Minimum events per second permitted in <agent><batch> configuration.                         | 50              | Any integer between 1 and 1000.                                   |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.state_interval**       | Interval, in seconds, for updating the agent state information.                              | 5               | 0 (disables status file). Any other integer between 1 and 86400   |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.warn_level**           | Buffer usage percentage at which a warning state begins.                                     | 90              | Any integer between 1 and 100.                                    |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.normal_level**         | Buffer usage percentage at which the buffer returns to normal state.                         | 70              | Any integer between 0 and agent.warn_level - 1.                   |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **agent.tolerance**            | Percentage tolerance applied to buffer usage fluctuations.                                   | 10              | Any integer between 0 and 600.                                    |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **monitord.compress**          | Controls whether rotated logs are compressed.                                                | 1               | 0 (disabled), 1 (enabled)                                         |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **monitord.keep_log_days**     | Number of days to retain rotated logs.                                                       | 365             | Positive integer                                                  |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **monitord.day_wait**          | Time of day at which log rotation occurs.                                                    | 0               | Time value in hh:mm format                                        |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **monitord.size_rotate**       | Maximum log-file size, in megabytes, before rotation. A value of 0 means unlimited.          | 0               | 0 or positive integer                                             |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **monitord.daily_rotations**   | Number of daily log rotations to retain.                                                     | 12              | Positive integer                                                  |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+
| **monitord.rotate_log**        | Controls whether automatic log rotation is enabled.                                          | 1               | 0 (disabled), 1 (enabled)                                         |
+--------------------------------+----------------------------------------------------------------------------------------------+-----------------+-------------------------------------------------------------------+

Execd
^^^^^^

The ``execd.*`` internal options configure additional Active response settings.

+------------------------------+-----------------------------------------------------------------+-----------------+----------------------------------------+
| Setting                      | Description                                                     | Default value   | Allowed values                         |
+==============================+=================================================================+=================+========================================+
| **execd.debug**              | Debug logging level for the execd daemon.                       | 0               | 0 (disabled), 1 (basic), 2 (verbose)   |
+------------------------------+-----------------------------------------------------------------+-----------------+----------------------------------------+
| **execd.max_restart_lock**   | Maximum timeout that the agent cannot restart while updating.   | 600             | Any integer between 0 and 3600.        |
+------------------------------+-----------------------------------------------------------------+-----------------+----------------------------------------+

Wazuh command
^^^^^^^^^^^^^^

The ``wazuh_command.*`` internal options configure the Command wodle.

+-------------------------------------+---------------------------------------------------------------------------------------+-----------------+-----------------------------+
| Setting                             | Description                                                                           | Default value   | Allowed values              |
+=====================================+=======================================================================================+=================+=============================+
| **wazuh_command.remote_commands**   | Controls whether the Command wodle accepts commands from centralized configuration.   | 0               | 0 (disabled), 1 (enabled)   |
+-------------------------------------+---------------------------------------------------------------------------------------+-----------------+-----------------------------+

Syscheck
^^^^^^^^^^^^^^^^^^

The ``syscheck.*`` internal options configure the File Integrity Monitoring module.

+-------------------------+--------------------------------------------------------------------------+-----------------+----------------------------------------+
| Setting                 | Description                                                              | Default value   | Allowed values                         |
+=========================+==========================================================================+=================+========================================+
| **syscheck.sleep**      | Time to sleep between scans.                                             |                 |                                        |
+-------------------------+--------------------------------------------------------------------------+-----------------+----------------------------------------+
| **syscheck.debug**      | Controls debug-level logging for the File Integrity Monitoring module.   | 0               | 0 (disabled), 1 (basic), 2 (verbose)   |
+-------------------------+--------------------------------------------------------------------------+-----------------+----------------------------------------+
| **syscheck.rt_delay**   | Delay before processing real-time events.                                |                 |                                        |
+-------------------------+--------------------------------------------------------------------------+-----------------+----------------------------------------+

Logcollector
^^^^^^^^^^^^^

The ``logcollector.*`` internal options configure the Logcollector module.

+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| Setting                                   | Description                                                                                  | Default value   | Allowed values                         |
+===========================================+==============================================================================================+=================+========================================+
| **logcollector.loop_timeout**             | Interval, in seconds, for checking monitored log files for changes.                          | 2               | Positive integer                       |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.open_attempts**            | Number of attempts to open a log file before stopping retries. A value of 0 means unlimited  | 0               | 0 or integer from 2 to 998             |
|                                           | retries.                                                                                     |                 |                                        |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.remote_commands**          | Controls whether Logcollector accepts commands from centralized configuration.               | 0               | 0 (disabled), 1 (enabled)              |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.vcheck_files**             | Interval, in seconds, for checking file metadata changes such as rotation or deletion.       | 64              | Integer from 0 to 1024                 |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.max_lines**                | Maximum number of lines read from one file during a single iteration. A value of 0 disables  | 10000           | 0 or integer from 100 to 1000000       |
|                                           | the limit.                                                                                   |                 |                                        |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.max_files**                | Maximum number of files that Logcollector can monitor simultaneously.                        | 1000            | Integer from 1 to 100000               |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.sock_fail_time**           | Wait time, in seconds, before retrying a failed socket connection.                           | 300             | Integer from 1 to 3600                 |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.input_threads**            | Number of threads used to read log files.                                                    | 4               | Positive integer                       |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.queue_size**               | Size of the internal output queue for collected log events.                                  | 1024            | Integer from 128 to 220000             |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.sample_log_length**        | Maximum number of characters from a log sample included in error messages.                   | 64              | Integer from 1 to 4096                 |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.rlimit_nofile**            | Maximum number of file descriptors that Logcollector can open.                               | 1100            | Integer from 1024 to 1048576           |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.force_reload**             | Controls whether Logcollector periodically closes and reopens monitored files.               | 0               | 0 (disabled), 1 (enabled)              |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.reload_interval**          | Interval, in seconds, between forced file-handler reloads. Applies when                      | 64              | Integer from 1 to 86400                |
|                                           | logcollector.force_reload=1.                                                                 |                 |                                        |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.reload_delay**             | Delay, in milliseconds, between closing and reopening files during a forced reload.          | 1000            | Integer from 0 to 30000                |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.exclude_files_interval**   | Interval, in seconds, for refreshing the list of excluded files.                             | 86400           | Integer from 1 to 172800               |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.state_interval**           | Interval, in seconds, for updating the Logcollector state file. A value of 0 disables        | 60              | Integer from 0 to 3600                 |
|                                           | state-file creation and updates.                                                             |                 |                                        |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+
| **logcollector.debug**                    | Debug logging level for the Logcollector module.                                             | 0               | 0 (disabled), 1 (basic), 2 (verbose)   |
+-------------------------------------------+----------------------------------------------------------------------------------------------+-----------------+----------------------------------------+

Rootcheck
^^^^^^^^^^^^^^^^^^^

The ``rootcheck.*`` internal options configure the Rootcheck module.

+-----------------------+-------------------------------------------------------------------------------+-----------------+-----------------------------------+
| Setting               | Description                                                                   | Default value   | Allowed values                    |
+=======================+===============================================================================+=================+===================================+
| **rootcheck.sleep**   | Sleep time, in milliseconds, between iterations of the Rootcheck scan loop.   | 50              | Any integer between 0 and 1000.   |
+-----------------------+-------------------------------------------------------------------------------+-----------------+-----------------------------------+

.. _internal_options_sca:

SCA
^^^^

The ``sca.*`` internal options configure the Security Configuration Assessment module.

+----------------------------+----------------------------------------------------------------------------------------------+-----------------+-----------------------------+
| Setting                    | Description                                                                                  | Default value   | Allowed values              |
+============================+==============================================================================================+=================+=============================+
| **sca.remote_commands**    | Controls whether SCA policies received through shared configuration can execute commands.    | 0               | 0 (disabled), 1 (enabled)   |
|                            | Local policies can execute commands regardless of this setting.                              |                 |                             |
+----------------------------+----------------------------------------------------------------------------------------------+-----------------+-----------------------------+
| **sca.commands_timeout**   | Default timeout, in seconds, for commands executed during an SCA scan.                       | 30              | Integer from 1 to 300       |
+----------------------------+----------------------------------------------------------------------------------------------+-----------------+-----------------------------+
