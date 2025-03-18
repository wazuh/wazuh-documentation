.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This document provides information about the configurations in the Wazuh indexer API.
   
Configuration
=============

Wazuh indexer API configuration file
------------------------------------

The Wazuh indexer API configuration is located in the ``/etc/wazuh-indexer/opensearch.yml`` file on the Wazuh indexer.

For more information on each of the available settings, check the :ref:`configuration options <configuration_options>`. Here are the default settings in the ``/etc/wazuh-indexer/opensearch.yml`` configuration file:

.. code-block:: yaml

   network.host: "127.0.0.1"
   node.name: "node-1"
   cluster.initial_master_nodes:
   - "node-1"
   cluster.name: "wazuh-cluster"

   node.max_local_storage_nodes: "3"
   path.data: /var/lib/wazuh-indexer
   path.logs: /var/log/wazuh-indexer

   plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/wazuh-indexer.pem
   plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
   plugins.security.ssl.http.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
   plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/wazuh-indexer.pem
   plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
   plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
   plugins.security.ssl.http.enabled: true
   plugins.security.ssl.transport.enforce_hostname_verification: false
   plugins.security.ssl.transport.resolve_hostname: false
   plugins.security.ssl.http.enabled_ciphers:
     - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
     - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
     - "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
     - "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
   plugins.security.ssl.http.enabled_protocols:
     - "TLSv1.2"
   plugins.security.authcz.admin_dn:
   - "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
   plugins.security.check_snapshot_restore_write_privileges: true
   plugins.security.enable_snapshot_restore_privilege: true
   plugins.security.nodes_dn:
   - "CN=indexer,OU=Wazuh,O=Wazuh,L=California,C=US"
   plugins.security.restapi.roles_enabled:
   - "all_access"
   - "security_rest_api_access"

   plugins.security.system_indices.enabled: true
   plugins.security.system_indices.indices: [".opendistro-alerting-config", ".opendistro-alerting-alert*", ".opendistro-anomaly-results*", ".opendistro-anomaly-detector*", ".opendistro-anomaly-checkpoints", ".opendistro-anomaly-detection-state", ".opendistro-reports-*", ".opendistro-notifications-*", ".opendistro-notebooks", ".opensearch-observability", ".opendistro-asynchronous-search-response*", ".replication-metadata-store"]

   ### Option to allow Filebeat-oss 7.10.2 to work ###
   compatibility.override_main_response_version: true

.. warning::

   When running a Wazuh indexer cluster, the master node does not automatically send its local Wazuh indexer API configuration file to the worker nodes. Each node maintains its own Wazuh indexer API configuration. Therefore, if any changes are made to the configuration file on the master node, you must manually update the configuration on each worker node to ensure consistency. Ensure that the IP address and port are not overwritten in each worker's local configuration.

After any change is made to the configuration file, you must restart the Wazuh indexer API using the Wazuh indexer service:

.. include:: /_templates/installations/indexer/common/restart_indexer.rst

.. _configuration_options:

Wazuh indexer API configuration options
---------------------------------------

network
^^^^^^^

+----------------------+----------------------------------------+-------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Sub-fields**       | **Allowed values**                     | **Default value** | **Description**                                                                                                                 |
+======================+========================================+===================+=================================================================================================================================+
| ``host``             | A list of valid IP address(es)         | ``127.0.0.1``     | IP addresses or hostnames of the Wazuh indexer where the Wazuh indexer API is running.                                          |
|                      | or hostname(s)                         |                   |                                                                                                                                 |
+----------------------+----------------------------------------+-------------------+---------------------------------------------------------------------------------------------------------------------------------+
| ``bind_host``        | IP address                             | ``127.0.0.1``     | This setting binds a node to an address(es) for incoming connections. The default value is the value specified in the           |
|                      |                                        |                   | ``network.host`` setting.                                                                                                       |
+----------------------+----------------------------------------+-------------------+---------------------------------------------------------------------------------------------------------------------------------+
| ``publish_host``     | IP address                             | ``127.0.0.1``     | This is the address(es) that a node publishes to other nodes in a cluster to enable them to connect.                            |
+----------------------+----------------------------------------+-------------------+---------------------------------------------------------------------------------------------------------------------------------+

.. note::

   The address must be the same as the node address set in the ``config.yml`` file
   used during Wazuh component installation or during certificate generation.

http
^^^^

+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Sub-fields**                | **Allowed values**                            | **Default value**                                            | **Description**                                                                                                                                                |
+===============================+===============================================+==============================================================+================================================================================================================================================================+
| ``port``                      | Any value between 1 and 65535                 | ``9200-9300``                                                | The port is where the Wazuh indexer API will listen. If a range of ports is specified, the node will bind to the first available port in the range.            |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``node``                      | Any valid alphanumeric string                 | ``n/a``                                                      | The name of the Wazuh indexer node is defined in the ``config.yml`` file during certificate generation. For example, node-1.                                   |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_content_length``        | Any valid numerical value. Different units    | ``100mb``                                                    | Sets the maximum payload size for Wazuh indexer API requests.                                                                                                  |
|                               | like bytes, kilobytes (KB), megabytes (MB),   |                                                              |                                                                                                                                                                |
|                               | and gigabytes (GB) are supported.             |                                                              |                                                                                                                                                                |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``connect_timeout``           | Any time value followed by a valid unit       | ``0ms``                                                      | Specifies the maximum time the HTTP client will wait to connect with a remote server. Setting the value to 0 disables the timeout.                             |
|                               | (i.e. ms, s, m)                               |                                                              |                                                                                                                                                                |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_chunk_size``            | Any data size value followed by a valid unit  | ``8192b``                                                    | Controls the maximum size of a chunk in HTTP responses when chunked transfer encoding is used.                                                                 |
|                               | (i.e. b, kb, mb)                              |                                                              |                                                                                                                                                                |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``compression``               | ``true``, ``false``                           | ``false``                                                    | This setting enables support for compression using ``Accept-Encoding`` when applicable. When HTTPS is enabled, the default value is false. Otherwise,          |
|                               |                                               |                                                              | the default is ``true``. Disabling compression for HTTPS helps mitigate potential security risks, such as BREACH attacks.                                      |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``compression_level``         | Any integer between 1 - 9                     | ``3``                                                        | Specifies the compression level used for HTTP responses when HTTP compression is enabled. The lower the value, the lower the CPU usage and faster response     |
|                               |                                               |                                                              | times.                                                                                                                                                         |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_initial_line_length``   | Any data size value followed by a valid unit  | ``4096b``                                                    | Specifies the maximum allowed length of the initial line of an HTTP request. The "initial line" refers to the line containing the HTTP method, URL, and        |
|                               |  (i.e. b, kb, mb)                             |                                                              | protocol version.                                                                                                                                              |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type``                      | Any supported HTTP implementation.            | ``org.opensearch.security.http.SecurityHttpServerTransport`` | Specifies the type of HTTP implementation or HTTP server module to use for handling HTTP requests.                                                             |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``pipelining.max_events``     | Any positive integer                          | ``10000``                                                    | Controls the maximum number of HTTP pipelined events that the server can handle for a single connection.                                                       |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``type.default``              | Any supported HTTP implementation.            | ``netty4``                                                   | This is the default HTTP server implementation used if no custom ``http.type`` is explicitly specified.                                                        |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``content_type.required``     | ``true``, ``false``                           | ``true``                                                     | Specifies whether requests sent to the Wazuh indexer must include a Content-Type header (e.g., ``application/json``). This setting enforces stricter           |
|                               |                                               |                                                              | HTTP request validation, ensuring that the content format is explicitly declared.                                                                              |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``host``                      | IP address                                    | ``[]``                                                       | Sets the address for HTTP communication on a Wazuh indexer node.                                                                                               |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``publish_port``              | Any value between 1 and 65535                 | ``-1``                                                       | Specifies the port on which the node advertises its HTTP service to external clients. Setting the value to ``-1`` uses the value set in ``http.port``.         |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``read_timeout``              | Any time value followed by a valid unit       | ``0ms``                                                      | Configures the maximum time the HTTP server will wait for a complete client request to be received. The connection will be closed if the request is not        |
|                               | (i.e. ms, s, m)                               |                                                              | received within the timeframe.                                                                                                                                 |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_content_length``        | Any data size value followed by a valid unit  | ``100mb``                                                    | Specifies the maximum size of HTTP request bodies that the Wazuh indexer will accept. This includes the payload of incoming HTTP requests, such as             |
|                               | (i.e. b, kb, mb)                              |                                                              | documents, bulk operations, or queries.                                                                                                                        |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``bind_host``                 | IP address                                    | ``[]``                                                       | Specifies an address(es) a Wazuh indexer node binds to listen for incoming HTTP connections.                                                                   |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``reset_cookies``             | ``true``, ``false``                           | ``false``                                                    | Controls whether the Wazuh indexer should send a ``Set-Cookie`` header with an empty value in HTTP responses, effectively clearing any cookies previously      |
|                               |                                               |                                                              | set by the client.                                                                                                                                             |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_warning_header_count``  | Any positive integer                          | ``-1``                                                       | Specifies the maximum number of warning headers that can be included in an HTTP response. Setting the value to ``-1`` means the number of warning headers is   |
|                               |                                               |                                                              | unlimited.                                                                                                                                                     |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tracer.include``            | A glob pattern (wildcard-based) that matches  | ``[]``                                                       | Specifies which HTTP requests should be included in tracing logs. Tracing logs are detailed logs of incoming and outgoing HTTP requests, primarily used for    |
|                               | the request's URI. e.g.: /_search, /_bulk,    |                                                              | debugging or monitoring.                                                                                                                                       |
|                               | or * (all requests).                          |                                                              |                                                                                                                                                                |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``tracer.exclude``            | A glob pattern (wildcard-based) that matches  | ``[]``                                                       | Specifies which HTTP requests should be excluded from tracing logs, even if they match the pattern in ``http.tracer.include``.                                 |
|                               | the URI of requests. Example: /favicon.ico,   |                                                              |                                                                                                                                                                |
|                               | /_cat/\*.                                     |                                                              |                                                                                                                                                                |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_warning_header_size``   | Any data size value followed by a valid unit  | ``-1b``                                                      | Specifies the maximum cumulative size of all warning headers in an HTTP response. These headers are used to communicate deprecation warnings, potential        |
|                               | (i.e. b, kb, mb)                              |                                                              | issues, or other alerts related to the request.                                                                                                                |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``detailed_errors.enabled``   | ``true``, ``false``                           | ``true``                                                     | Controls whether detailed error messages are included in HTTP responses when requests fail.                                                                    |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``max_header_size``           | Any data size value followed by a valid unit  | ``8192b``                                                    | Specifies the maximum size of an HTTP request header that the Wazuh indexer server will accept.                                                                |
|                               | (i.e. b, kb, mb)                              |                                                              |                                                                                                                                                                |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``publish_host``              | IP address                                    | ``[]``                                                       | Specifies the address(es) that a Wazuh indexer node publishes to other nodes for HTTP communication.                                                           |
+-------------------------------+-----------------------------------------------+--------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

http.cors
^^^^^^^^^

+-------------------------+--------------------------------------+----------------------------------------------------------+----------------------------------------------------------------------------------------------+
| **Sub-fields**          | **Allowed values**                   | **Default value**                                        | **Description**                                                                              |
+=========================+======================================+==========================================================+==============================================================================================+
| ``enabled``             | ``true``, ``false``                  | ``false``                                                | This setting enables or disables Cross-Origin Resource Sharing (CORS) for HTTP requests.     |
+-------------------------+--------------------------------------+----------------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``max-age``             | Any time value representing          | ``1728000``                                              | Defines how long the results of a preflight request (for CORS) can be cached.                |
|                         | duration in seconds.                 |                                                          |                                                                                              |
+-------------------------+--------------------------------------+----------------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``allow-origin``        | Any string representing a domain.    | ``""``                                                   | Specifies which domains are allowed to access the Wazuh indexer. Wildcards are supported.    |
+-------------------------+--------------------------------------+----------------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``allow-headers``       | Any HTTP header                      | ``X-Requested-With,Content-Type,Content-Length``         | Specifies which HTTP headers can be included in the request.                                 |
+-------------------------+--------------------------------------+----------------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``allow-credentials``   | ``true``, ``false``                  | ``false``                                                | Controls whether cookies and authentication information (such as HTTP credentials) are       |
|                         |                                      |                                                          | included in cross-origin requests made to the Wazuh indexer server.                          |
+-------------------------+--------------------------------------+----------------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``allow-methods``       | Any HTTP method                      | ``OPTIONS,HEAD,GET,POST,PUT,DELETE``                     | Defines which HTTP methods (e.g., GET, POST, PUT) are allowed for cross-origin requests.     |
+-------------------------+--------------------------------------+----------------------------------------------------------+----------------------------------------------------------------------------------------------+

logger 
^^^^^^

+------------------+-------------------------------------------+--------------------+----------------------------------------------------------------------------------------------+
| **Sub-fields**   | **Allowed values**                        | **Default value**  | **Description**                                                                              |
+==================+===========================================+====================+==============================================================================================+
| ``level``        | ``TRACE``, ``DEBUG``, ``INFO``, ``WARN``, | ``INFO``           | Defines the logging verbosity of the system, controlling what kind of log messages are       |
|                  |   ``ERROR``, ``FATAL``                    |                    | captured and recorded.                                                                       |
+------------------+-------------------------------------------+--------------------+----------------------------------------------------------------------------------------------+

path 
^^^^

+-----------------+---------------------------+------------------------------+---------------------------------------------------------------------------------------------+
| **Sub-fields**  | **Allowed values**        | **Default value**            | **Description**                                                                             |
+=================+===========================+==============================+=============================================================================================+
| ``data``        | Any valid path            | ``/var/lib/wazuh-indexer``   | Specifies a path to the directory where the Wazuh indexer data is stored.                   |
+-----------------+---------------------------+------------------------------+---------------------------------------------------------------------------------------------+
| ``logs``        | Any valid path            | ``/var/log/wazuh-indexer``   | Specifies the path to store Wazuh indexer log files.                                        |
+-----------------+---------------------------+------------------------------+---------------------------------------------------------------------------------------------+
| ``shared_data`` | Any valid path            | ``""``                       | Specifies the directory path where the Wazuh indexer stores shared data files.              |
+-----------------+---------------------------+------------------------------+---------------------------------------------------------------------------------------------+
| ``home``        | Any valid path            | ``/usr/share/wazuh-indexer`` | Specifies the root directory where the Wazuh indexer core files and directories are stored. |
+-----------------+---------------------------+------------------------------+---------------------------------------------------------------------------------------------+
| ``repo``        | Any valid path            | ``[]``                       | Specifies the directory or directories where the Wazuh indexer will store repository data   |
|                 |                           |                              | for snapshots and restores.                                                                 |
+-----------------+---------------------------+------------------------------+---------------------------------------------------------------------------------------------+

search 
^^^^^^

+------------------------------------+-----------------------+-------------------+------------------------------------------------------------------------------------------------+
| **Sub-fields**                     | **Allowed values**    | **Default value** | **Description**                                                                                |
+=================================+==========================+===================+================================================================================================+
| ``max_buckets``                    | integer               | ``65535``         | This refers to the maximum aggregation buckets allowed in a single search response.            |
+------------------------------------+-----------------------+-------------------+------------------------------------------------------------------------------------------------+
| ``default_allow_partial_results``  | ``true``, ``false``   | ``true``          | Controls if partial search results are returned or not when a search request times out or a    |
|                                    |                       |                   | shard encounters an issue. If the search request includes an ``allow_partial_search_results``  |
|                                    |                       |                   | parameter, it will override this default behavior.                                             |
+------------------------------------+-----------------------+-------------------+------------------------------------------------------------------------------------------------+
| ``cancel_after_time_interval``     | Any time value        | ``-1``            | This sets the time to automatically cancel a search request if it exceeds the specified        |
|                                    | followed by a valid   |                   | duration. When set to ``-1``, there is no timeout.                                             |
|                                    | unit (i.e. ms, s, m)  |                   |                                                                                                |
+------------------------------------+-----------------------+-------------------+------------------------------------------------------------------------------------------------+
| ``search.default_search_timeout``  | Any time value        | ``-1``            | Defines the default maximum time a query will wait for results before timing out. It helps     |
|                                    | followed by a valid   |                   | enforce time limits for searches while allowing partial results if                             |
|                                    | unit (i.e. ms, s, m)  |                   | ``allow_partial_search_results`` is enabled.                                                   |
+------------------------------------+-----------------------+-------------------+------------------------------------------------------------------------------------------------+
