.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This document provides information about the configurations in the Wazuh indexer API.

Configuration
=============

Wazuh indexer API configuration file
------------------------------------

The Wazuh indexer API configuration is in the ``/etc/wazuh-indexer/opensearch.yml`` file on each Wazuh indexer node.

For more information on each available setting, see :ref:`Wazuh indexer API configuration options <configuration_options>`. The following are the default settings of the ``/etc/wazuh-indexer/opensearch.yml`` file in an all-in-one deployment. The installation fills in the ``network.host``, ``node.name``, and distinguished name (DN) values for each node. ``<NODE_CERTIFICATE_CN>`` is the common name (CN) of the node certificate, ``/etc/wazuh-indexer/certs/indexer.pem``.

.. code-block:: yaml

   network.host: "127.0.0.1"
   node.name: "node-1"
   cluster.initial_cluster_manager_nodes:
   - "node-1"
   #- "node-2"
   #- "node-3"
   cluster.name: "wazuh-cluster"
   #discovery.seed_hosts:
   #  - "node-1-ip"
   #  - "node-2-ip"
   #  - "node-3-ip"
   node.max_local_storage_nodes: "3"
   path.data: /var/lib/wazuh-indexer
   path.logs: /var/log/wazuh-indexer

   plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/indexer.pem
   plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/indexer-key.pem
   plugins.security.ssl.http.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
   plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/indexer.pem
   plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/indexer-key.pem
   plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
   plugins.security.ssl.http.enabled: true
   transport.ssl.enforce_hostname_verification: true
   transport.ssl.resolve_hostname: false

   # Filled in by resolve-credentials.sh with the DN of the admin certificate.
   plugins.security.authcz.admin_dn:
   - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=admin"
   plugins.security.check_snapshot_restore_write_privileges: true
   plugins.security.enable_snapshot_restore_privilege: true
   # Filled in by resolve-credentials.sh with the DN of this node's own certificate.
   plugins.security.nodes_dn:
   - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=<NODE_CERTIFICATE_CN>"
   plugins.security.restapi.roles_enabled:
   - "all_access"
   - "security_rest_api_access"

   plugins.security.system_indices.enabled: true
   plugins.security.system_indices.indices: [".opendistro-alerting-config", ".opendistro-alerting-alert*", ".opendistro-reports-*", ".opensearch-notifications-*", ".replication-metadata-store", ".wazuh-internal-state"]
   cluster.default_number_of_replicas: 0
   bootstrap.memory_lock: true

   # Resilience under heap pressure (small heaps, e.g. 2 GB): shed work — reject (429)
   # and cancel runaway searches instead of letting the JVM heap exhaust and crash.
   search_backpressure.mode: enforced                    # actually cancel heavy search tasks (default only logs)
   indices.breaker.total.use_real_memory: true           # account real heap used, not just reserved bytes
   indices.breaker.total.limit: 80%                      # trip early (default 95%); leaves headroom for Lucene flush/merge
   indexing_pressure.memory.limit: 10%                   # cap in-flight indexing bytes; reject excess bulk

   # Use no replicas by default on ISM internal indices
   plugins.index_state_management.history.number_of_replicas: 0
   # Default max scroll context keep alive
   search.max_keep_alive: "4h"

The following table describes the main settings of this file.

+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Setting**                                                                                       | **Description**                                                                                                                                                        |
+===================================================================================================+========================================================================================================================================================================+
| ``network.host``                                                                                  | The address where the Wazuh indexer node listens for HTTP and transport connections.                                                                                   |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``node.name``                                                                                     | The name of the Wazuh indexer node.                                                                                                                                    |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cluster.initial_cluster_manager_nodes``                                                         | The nodes that can be elected as cluster manager when the cluster starts for the first time.                                                                           |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cluster.name``                                                                                  | The name of the Wazuh indexer cluster.                                                                                                                                 |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``plugins.security.ssl.http.* and plugins.security.ssl.transport.*``                              | The certificate, key, and root CA files that encrypt the HTTP (API) and transport (node-to-node) layers. The files are in ``/etc/wazuh-indexer/certs/``.               |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``transport.ssl.enforce_hostname_verification``                                                   | Verifies the host name in the certificates of the other nodes on the transport layer.                                                                                  |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``plugins.security.authcz.admin_dn``                                                              | The distinguished name of the admin certificate, ``/etc/wazuh-indexer/certs/admin.pem``. Requests authenticated with this certificate have full administrative access. |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``plugins.security.nodes_dn``                                                                     | The distinguished names of the node certificates allowed to join the cluster.                                                                                          |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``plugins.security.restapi.roles_enabled``                                                        | The roles that can use the security REST API, ``_plugins/_security/api``.                                                                                              |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cluster.default_number_of_replicas``                                                            | The default number of replicas for new indexes.                                                                                                                        |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``bootstrap.memory_lock``                                                                         | Locks the Wazuh indexer memory to prevent swapping.                                                                                                                    |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search_backpressure.mode``, ``indices.breaker.total.*``, and ``indexing_pressure.memory.limit`` | Protect the node under heap pressure. The node rejects or cancels heavy requests instead of running out of memory.                                                     |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``search.max_keep_alive``                                                                         | The maximum keep-alive time for search contexts, such as scroll requests.                                                                                              |
+---------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. warning::

   When you run a Wazuh indexer cluster, the nodes don't share their ``/etc/wazuh-indexer/opensearch.yml`` configuration file. Each node keeps its own Wazuh indexer API configuration. If you change the configuration file on one node, you must update the configuration on each of the other nodes to keep the cluster consistent. Don't overwrite the node-specific values, such as ``network.host``, ``node.name``, and ``plugins.security.nodes_dn``, on each node.

Restart the Wazuh indexer
-------------------------

After you change the configuration file, restart the Wazuh indexer service to apply the changes.

.. include:: /_templates/installations/indexer/common/restart_indexer.rst

.. _configuration_options:

Wazuh indexer API configuration options
---------------------------------------

You can check the value that a node uses for any of these settings with the following request:

.. code-block:: console

   # curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> "https://<WAZUH_INDEXER_IP>:9200/_cluster/settings?include_defaults=true&flat_settings=true&pretty"

network
^^^^^^^

+------------------+-------------------------------------------+---------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| **Sub-fields**   | **Allowed values**                        | **Default value**                                                   | **Description**                                                                          |
+==================+===========================================+=====================================================================+==========================================================================================+
| ``host``         | A list of valid IP addresses or hostnames | Set during installation. ``127.0.0.1`` in an all-in-one deployment. | IP addresses or hostnames of the Wazuh indexer node where the Wazuh indexer API runs.    |
+------------------+-------------------------------------------+---------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| ``bind_host``    | IP address                                | The value of ``network.host``                                       | Binds a node to one or more addresses for incoming connections.                          |
+------------------+-------------------------------------------+---------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| ``publish_host`` | IP address                                | The value of ``network.host``                                       | The address that a node publishes to other nodes in a cluster so they can connect to it. |
+------------------+-------------------------------------------+---------------------------------------------------------------------+------------------------------------------------------------------------------------------+

.. note::

   The address must be the same as the node address set in the ``config.yml`` file used during the Wazuh component installation or the certificate generation.

http
^^^^

+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Sub-fields**               | **Allowed values**                                                                      | **Default value**                                            | **Description**                                                                                                                                                                                                                                             |
+==============================+=========================================================================================+==============================================================+=============================================================================================================================================================================================================================================================+
| ``port``                     | Any value between 1 and 65535, or a range                                               | ``9200-9300``                                                | The port where the Wazuh indexer API listens. If you specify a range, the node binds to the first available port in the range.                                                                                                                              |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_content_length``       | Any data size value followed by a valid unit, such as ``b``, ``kb``, ``mb``, or ``gb``  | ``100mb``                                                    | The maximum size of HTTP request bodies, including documents, bulk operations, and queries.                                                                                                                                                                 |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``connect_timeout``          | Any time value followed by a valid unit, such as ``ms``, ``s``, or ``m``                | ``0ms``                                                      | The maximum time the HTTP client waits to connect with a remote server. The value ``0`` disables the timeout.                                                                                                                                               |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_chunk_size``           | Any data size value followed by a valid unit, such as ``b``, ``kb``, or ``mb``          | ``8192b``                                                    | The maximum size of a chunk in HTTP responses when chunked transfer encoding is used.                                                                                                                                                                       |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``compression``              | ``true``, ``false``                                                                     | ``false``                                                    | Enables support for compression using ``Accept-Encoding`` when applicable. When HTTPS is enabled, the default value is ``false``. Otherwise, the default is ``true``. Disabling compression for HTTPS helps mitigate security risks such as BREACH attacks. |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``compression_level``        | Any integer between 1 and 9                                                             | ``3``                                                        | The compression level for HTTP responses when HTTP compression is enabled. Lower values use less CPU and give faster response times.                                                                                                                        |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_initial_line_length``  | Any data size value followed by a valid unit, such as ``b``, ``kb``, or ``mb``          | ``4096b``                                                    | The maximum length of the initial line of an HTTP request. The initial line contains the HTTP method, URL, and protocol version.                                                                                                                            |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                     | Any supported HTTP implementation                                                       | ``org.opensearch.security.http.SecurityHttpServerTransport`` | The HTTP implementation or HTTP server module that handles HTTP requests.                                                                                                                                                                                   |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pipelining.max_events``    | Any positive integer                                                                    | ``10000``                                                    | The maximum number of HTTP pipelined events that the server handles for a single connection.                                                                                                                                                                |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type.default``             | Any supported HTTP implementation                                                       | ``netty4``                                                   | The default HTTP server implementation when ``http.type`` isn't set.                                                                                                                                                                                        |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``content_type.required``    | ``true``, ``false``                                                                     | ``true``                                                     | Specifies whether requests sent to the Wazuh indexer must include a ``Content-Type`` header, such as ``application/json``.                                                                                                                                  |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``host``                     | IP address                                                                              | ``[]``                                                       | The address for HTTP communication on a Wazuh indexer node.                                                                                                                                                                                                 |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``publish_port``             | Any value between 1 and 65535                                                           | ``-1``                                                       | The port on which the node advertises its HTTP service to external clients. The value ``-1`` uses the port set in ``http.port``.                                                                                                                            |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``read_timeout``             | Any time value followed by a valid unit, such as ``ms``, ``s``, or ``m``                | ``0ms``                                                      | The maximum time the HTTP server waits to receive a complete client request. The server closes the connection if it doesn't receive the request in time.                                                                                                    |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``bind_host``                | IP address                                                                              | ``[]``                                                       | The addresses a Wazuh indexer node binds to for incoming HTTP connections.                                                                                                                                                                                  |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``reset_cookies``            | ``true``, ``false``                                                                     | ``false``                                                    | Controls whether the Wazuh indexer sends a ``Set-Cookie`` header with an empty value in HTTP responses, which clears cookies that the client set before.                                                                                                    |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_warning_header_count`` | Any positive integer, or ``-1``                                                         | ``-1``                                                       | The maximum number of warning headers in an HTTP response. The value ``-1`` means unlimited.                                                                                                                                                                |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tracer.include``           | A glob pattern that matches the request URI, such as ``/_search``, ``/_bulk``, or ``*`` | ``[]``                                                       | The HTTP requests to include in tracing logs. Tracing logs are detailed logs of incoming and outgoing HTTP requests, used mainly for debugging or monitoring.                                                                                               |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tracer.exclude``           | A glob pattern that matches the request URI, such as ``/favicon.ico`` or ``/_cat/*``    | ``[]``                                                       | The HTTP requests to exclude from tracing logs, even if they match ``http.tracer.include``.                                                                                                                                                                 |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_warning_header_size``  | Any data size value followed by a valid unit, such as ``b``, ``kb``, or ``mb``          | ``-1b``                                                      | The maximum total size of the warning headers in an HTTP response. Warning headers carry deprecation warnings, potential issues, and other messages related to the request. The value ``-1b`` means unlimited.                                              |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``detailed_errors.enabled``  | ``true``, ``false``                                                                     | ``true``                                                     | Controls whether HTTP responses include detailed error messages when requests fail.                                                                                                                                                                         |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_header_size``          | Any data size value followed by a valid unit, such as ``b``, ``kb``, or ``mb``          | ``16384b``                                                   | The maximum combined size of the HTTP headers of a request.                                                                                                                                                                                                 |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``publish_host``             | IP address                                                                              | ``[]``                                                       | The addresses that a Wazuh indexer node publishes to other nodes for HTTP communication.                                                                                                                                                                    |
+------------------------------+-----------------------------------------------------------------------------------------+--------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

http.cors
^^^^^^^^^

+-----------------------+-------------------------------------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| **Sub-fields**        | **Allowed values**                  | **Default value**                                | **Description**                                                                                                                           |
+=======================+=====================================+==================================================+===========================================================================================================================================+
| ``enabled``           | ``true``, ``false``                 | ``false``                                        | Enables or disables Cross-Origin Resource Sharing (CORS) for HTTP requests.                                                               |
+-----------------------+-------------------------------------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| ``max-age``           | Any time value, in seconds          | ``1728000``                                      | How long browsers can cache the results of a CORS preflight request.                                                                      |
+-----------------------+-------------------------------------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| ``allow-origin``      | Any string that represents a domain | ``""``                                           | The domains allowed to access the Wazuh indexer. Wildcards are supported.                                                                 |
+-----------------------+-------------------------------------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| ``allow-headers``     | Any HTTP header                     | ``X-Requested-With,Content-Type,Content-Length`` | The HTTP headers allowed in the request.                                                                                                  |
+-----------------------+-------------------------------------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| ``allow-credentials`` | ``true``, ``false``                 | ``false``                                        | Controls whether cross-origin requests to the Wazuh indexer can include cookies and authentication information, such as HTTP credentials. |
+-----------------------+-------------------------------------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| ``allow-methods``     | Any HTTP method                     | ``OPTIONS,HEAD,GET,POST,PUT,DELETE``             | The HTTP methods allowed for cross-origin requests, such as ``GET``, ``POST``, and ``PUT``.                                               |
+-----------------------+-------------------------------------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------+

logger
^^^^^^

+----------------+----------------------------------------------------------------+-------------------+-------------------------------------------------------------------------------------------+
| **Sub-fields** | **Allowed values**                                             | **Default value** | **Description**                                                                           |
+================+================================================================+===================+===========================================================================================+
| ``level``      | ``TRACE``, ``DEBUG``, ``INFO``, ``WARN``, ``ERROR``, ``FATAL`` | ``INFO``          | The logging verbosity, which controls the kind of log messages the Wazuh indexer records. |
+----------------+----------------------------------------------------------------+-------------------+-------------------------------------------------------------------------------------------+

path
^^^^

+-----------------+--------------------+------------------------------+--------------------------------------------------------------------------------------------+
| **Sub-fields**  | **Allowed values** | **Default value**            | **Description**                                                                            |
+=================+====================+==============================+============================================================================================+
| ``data``        | Any valid path     | ``/var/lib/wazuh-indexer``   | The directory where the Wazuh indexer stores its data.                                     |
+-----------------+--------------------+------------------------------+--------------------------------------------------------------------------------------------+
| ``logs``        | Any valid path     | ``/var/log/wazuh-indexer``   | The directory where the Wazuh indexer stores its log files.                                |
+-----------------+--------------------+------------------------------+--------------------------------------------------------------------------------------------+
| ``shared_data`` | Any valid path     | ``""``                       | The directory where the Wazuh indexer stores shared data files.                            |
+-----------------+--------------------+------------------------------+--------------------------------------------------------------------------------------------+
| ``home``        | Any valid path     | ``/usr/share/wazuh-indexer`` | The root directory of the Wazuh indexer core files and directories.                        |
+-----------------+--------------------+------------------------------+--------------------------------------------------------------------------------------------+
| ``repo``        | Any valid path     | ``[]``                       | The directories where the Wazuh indexer stores repository data for snapshots and restores. |
+-----------------+--------------------+------------------------------+--------------------------------------------------------------------------------------------+

search
^^^^^^

+-----------------------------------+--------------------------------------------------------------------------+-----------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Sub-fields**                    | **Allowed values**                                                       | **Default value**                             | **Description**                                                                                                                                                                             |
+===================================+==========================================================================+===============================================+=============================================================================================================================================================================================+
| ``max_buckets``                   | Integer                                                                  | ``65535``                                     | The maximum number of aggregation buckets allowed in a single search response.                                                                                                              |
+-----------------------------------+--------------------------------------------------------------------------+-----------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``default_allow_partial_results`` | ``true``, ``false``                                                      | ``true``                                      | Controls whether the Wazuh indexer returns partial results when a search request times out or a shard fails. The ``allow_partial_search_results`` request parameter overrides this setting. |
+-----------------------------------+--------------------------------------------------------------------------+-----------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cancel_after_time_interval``    | Any time value followed by a valid unit, such as ``ms``, ``s``, or ``m`` | ``-1``                                        | The time after which the Wazuh indexer cancels a search request automatically. The value ``-1`` means no timeout.                                                                           |
+-----------------------------------+--------------------------------------------------------------------------+-----------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``default_search_timeout``        | Any time value followed by a valid unit, such as ``ms``, ``s``, or ``m`` | ``-1``                                        | The default maximum time a search waits for results before it times out. Use it with ``allow_partial_search_results`` to return partial results. The value ``-1`` means no timeout.         |
+-----------------------------------+--------------------------------------------------------------------------+-----------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_keep_alive``                | Any time value followed by a valid unit, such as ``m`` or ``h``          | ``4h`` in the default ``opensearch.yml`` file | The maximum keep-alive time for search contexts, such as scroll requests.                                                                                                                   |
+-----------------------------------+--------------------------------------------------------------------------+-----------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
