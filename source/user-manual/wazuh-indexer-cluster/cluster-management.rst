.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to manage and monitor the Wazuh indexer cluster from the Wazuh dashboard console or the Wazuh indexer API, and how to interpret the outputs.

Cluster management
==================

You can manage and monitor the Wazuh indexer cluster in two ways: from the Wazuh dashboard console or with the Wazuh indexer API from the command line.

-  **Wazuh dashboard console:** Navigate to the **Wazuh dashboard upper-left menu ☰** > **Indexer management** > **Dev Tools**, paste the request, and click the play button. The console is already authenticated with your dashboard session.

-  **Wazuh indexer API:** Run the ``curl`` commands from any Wazuh indexer node or the Wazuh server. Replace ``<INDEXER_USERNAME>`` and ``<INDEXER_PASSWORD>`` with the Wazuh indexer credentials. Replace ``WAZUH_INDEXER_IP`` with the IP address or FQDN of any Wazuh indexer node, and ``<REMOVED_WAZUH_INDEXER_IP>`` with the IP address of the node you are decommissioning.

+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Action                                                          | Wazuh dashboard console                                                                                       | Wazuh indexer API                                                                                                                                                                                                                              |
+=================================================================+===============================================================================================================+================================================================================================================================================================================================================================================+
| Verify the node and check the cluster name and version          | ``GET /``                                                                                                     | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200``                                                                                                                                                           |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Check the cluster health                                        | ``GET _cluster/health?pretty``                                                                                | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_cluster/health?pretty``                                                                                                                                    |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| List the cluster nodes and identify the elected cluster manager | ``GET _cat/nodes?v``                                                                                          | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v``                                                                                                                                              |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| List the Wazuh indices                                          | ``GET _cat/indices/wazuh-*?v``                                                                                | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_cat/indices/wazuh-*?v``                                                                                                                                    |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Check how shards are allocated across the nodes                 | ``GET _cat/shards/wazuh-*?v``                                                                                 | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_cat/shards/wazuh-*?v``                                                                                                                                     |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| View the cluster statistics                                     | ``GET _cluster/stats?pretty``                                                                                 | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_cluster/stats?pretty``                                                                                                                                     |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| View the persistent and transient cluster settings              | ``GET _cluster/settings?pretty``                                                                              | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_cluster/settings?pretty``                                                                                                                                  |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| List the Wazuh data streams                                     | ``GET _data_stream/wazuh-*``                                                                                  | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_data_stream/wazuh-*``                                                                                                                                      |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Verify the deployed Wazuh index templates                       | ``GET _index_template/wazuh*``                                                                                | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_index_template/wazuh*``                                                                                                                                    |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| List the ISM policies                                           | ``GET _plugins/_ism/policies``                                                                                | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_plugins/_ism/policies``                                                                                                                                    |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Check the ISM state of the Wazuh indices                        | ``GET _plugins/_ism/explain/wazuh-*``                                                                         | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_plugins/_ism/explain/wazuh-*``                                                                                                                             |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Verify that memory locking is enabled on every node             | ``GET _nodes?filter_path=**.mlockall``                                                                        | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> "https://<WAZUH_INDEXER_IP>:9200/_nodes?filter_path=**.mlockall&pretty"``                                                                                                                   |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Exclude a node from shard allocation before decommissioning it  | ``PUT _cluster/settings { "persistent": { "cluster.routing.allocation.exclude._ip": "<NODE_IP_ADDRESS>" } }`` | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> -XPUT https://<WAZUH_INDEXER_IP>:9200/_cluster/settings -H 'Content-Type: application/json' -d '{"persistent": {"cluster.routing.allocation.exclude._ip": "<REMOVED_WAZUH_INDEXER_IP>"}}'`` |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Clear the allocation exclusion after the node is removed        | ``PUT _cluster/settings { "persistent": { "cluster.routing.allocation.exclude._ip": null } }``                | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> -XPUT https://<WAZUH_INDEXER_IP>:9200/_cluster/settings -H 'Content-Type: application/json' -d '{"persistent": {"cluster.routing.allocation.exclude._ip": null}}'``                         |
+-----------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Interpreting the outputs
------------------------

Verifying the node with ``GET /`` returns the node name, the cluster name, and the version information:

+----------------------------+-------------------+-----------------------------------------------------------+
| Field                      | Example value     | Description                                               |
+============================+===================+===========================================================+
| ``name``                   | ``indexer-1``     | Name of the Wazuh indexer node that answered the request. |
+----------------------------+-------------------+-----------------------------------------------------------+
| ``cluster_name``           | ``wazuh-cluster`` | Name of the Wazuh indexer cluster.                        |
+----------------------------+-------------------+-----------------------------------------------------------+
| ``version.number``         | ``3.6.0``         | Version of the Wazuh indexer engine.                      |
+----------------------------+-------------------+-----------------------------------------------------------+
| ``version.lucene_version`` | ``10.4.0``        | Apache Lucene version in use.                             |
+----------------------------+-------------------+-----------------------------------------------------------+

Listing the nodes with ``GET _cat/nodes?v`` in a healthy three-node cluster produces an output similar to the following. The asterisk in the ``cluster_manager`` column marks the elected cluster manager node:

+-----------+--------------+-------------+-----+---------+-----------+------------------------------------------------------+-----------------+-----------+
| ip        | heap.percent | ram.percent | cpu | load_1m | node.role | node.roles                                           | cluster_manager | name      |
+===========+==============+=============+=====+=========+===========+======================================================+=================+===========+
| 10.0.0.10 | 34           | 68          | 12  | 0.42    | dimr      | cluster_manager, data, ingest, remote_cluster_client | *               | indexer-1 |
+-----------+--------------+-------------+-----+---------+-----------+------------------------------------------------------+-----------------+-----------+
| 10.0.0.11 | 29           | 64          | 9   | 0.31    | dimr      | cluster_manager, data, ingest, remote_cluster_client | -               | indexer-2 |
+-----------+--------------+-------------+-----+---------+-----------+------------------------------------------------------+-----------------+-----------+
| 10.0.0.12 | 31           | 66          | 10  | 0.36    | dimr      | cluster_manager, data, ingest, remote_cluster_client | -               | indexer-3 |
+-----------+--------------+-------------+-----+---------+-----------+------------------------------------------------------+-----------------+-----------+

Checking the cluster health with ``GET _cluster/health?pretty`` returns the overall state of the cluster:

+-------------------------------------+-------------------+------------------------------------------------------------+
| Field                               | Example value     | Description                                                |
+=====================================+===================+============================================================+
| ``cluster_name``                    | ``wazuh-cluster`` | Name of the Wazuh indexer cluster.                         |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``status``                          | ``green``         | Overall health of the cluster. See the status table below. |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``number_of_nodes``                 | ``3``             | Total number of nodes in the cluster.                      |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``number_of_data_nodes``            | ``3``             | Number of nodes that store data.                           |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``discovered_cluster_manager``      | ``true``          | Indicates that a cluster manager node has been elected.    |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``active_primary_shards``           | ``107``           | Number of active primary shards.                           |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``active_shards``                   | ``214``           | Number of active primary and replica shards.               |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``relocating_shards``               | ``0``             | Shards currently moving between nodes.                     |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``initializing_shards``             | ``0``             | Shards currently being created.                            |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``unassigned_shards``               | ``0``             | Shards that could not be allocated to any node.            |
+-------------------------------------+-------------------+------------------------------------------------------------+
| ``active_shards_percent_as_number`` | ``100.0``         | Percentage of active shards.                               |
+-------------------------------------+-------------------+------------------------------------------------------------+

The status field takes one of the following values:

+--------+--------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Status | Meaning                                                                                                                        | Recommended action                                                                                                                                                                                                                                  |
+========+================================================================================================================================+=====================================================================================================================================================================================================================================================+
| green  | All primary and replica shards are allocated.                                                                                  | None. The cluster is fully operational.                                                                                                                                                                                                             |
+--------+--------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| yellow | All primary shards are allocated, but one or more replica shards are unassigned. Data is available, but redundancy is reduced. | Investigate in any deployment. Wazuh indices are created with ``index.auto_expand_replicas`` set to ``0-1``, so a single-node deployment resolves to zero replicas and also reports green. Yellow on a single node means shards failed to allocate. |
|        |                                                                                                                                | Check shard allocation with ``GET _cat/shards/wazuh-*?v``, and check the disk usage watermarks. On a multi-node cluster, also confirm that every node is running.                                                                                   |
+--------+--------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| red    | One or more primary shards are unassigned. Part of the data is unavailable.                                                    | Check for stopped nodes, disk space, and allocation settings immediately.                                                                                                                                                                           |
+--------+--------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. _replica_shards:

Replica shards
--------------

Wazuh creates its indices with ``index.auto_expand_replicas`` set to ``0-1``. The setting resolves to no replica on a single-node deployment, so that deployment reports green rather than yellow, and to one replica as soon as a second Wazuh indexer node joins. The Wazuh data streams that hold event and state data need no change.

The OpenSearch plugins that ship with the Wazuh indexer create their own internal indices, such as ``.opendistro-*`` and ``.opensearch-*``, and some of those are created with a single copy of their data. They are managed by the plugin that owns them and are outside the scope of this check.

Verify the replica configuration after you build a multi-node cluster, after you enable new detection content, and after an upgrade. Replace ``<INDEXER_USERNAME>``, ``<INDEXER_PASSWORD>``, and ``<WAZUH_INDEXER_IP>`` with the Wazuh indexer credentials and the IP address of any Wazuh indexer node.

#. Confirm that the Wazuh indices carry the automatic replica setting. Every Wazuh index should return ``0-1``.

   +----------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Wazuh dashboard console                                                                                  | Wazuh indexer API                                                                                                                                                                       |
   +==========================================================================================================+=========================================================================================================================================================================================+
   | ``GET wazuh-*/_settings?filter_path=**.auto_expand_replicas,**.number_of_replicas&expand_wildcards=all`` | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> "https://<WAZUH_INDEXER_IP>:9200/wazuh-*/_settings?filter_path=**.auto_expand_replicas,**.number_of_replicas&expand_wildcards=all"`` |
   +----------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      {
        ".ds-wazuh-events-v5-system-activity-000001": {
          "settings": {
            "index": {
              "auto_expand_replicas": "0-1"
            }
          }
        },
        ".ds-wazuh-active-responses-000001": {
          "settings": {
            "index": {
              "auto_expand_replicas": "0-1"
            }
          }
        },
        ...
      }

   An index that returns ``number_of_replicas`` without ``auto_expand_replicas`` has a fixed replica count. Apply the setting to it with the command in step 3.

#. Confirm that no Wazuh index is left without a replica. On a cluster with two or more nodes, this command returns no rows.

   +----------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Wazuh dashboard console                                                                | Wazuh indexer API                                                                                                                                                                     |
   +========================================================================================+=======================================================================================================================================================================================+
   | ``GET _cat/indices/wazuh-*?v&h=index,pri,rep,health&s=rep,index&expand_wildcards=all`` | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> "https://<WAZUH_INDEXER_IP>:9200/_cat/indices/wazuh-*?v&h=index,pri,rep,health&s=rep,index&expand_wildcards=all" | awk '$3 == 0'`` |
   +----------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      index                                          pri rep health
      .ds-wazuh-events-v5-system-activity-000001       1   1 green
      .ds-wazuh-active-responses-000001                1   1 green
      .ds-wazuh-events-raw-v5-000001                   1   1 green
      ...

   The Wazuh dashboard console command lists every index sorted by replica count, so read the rows at the top of the output. Every row should show ``1`` in the ``rep`` column. The Wazuh indexer API command filters the list down to the indices with a replica count of 0 and prints nothing when the configuration is correct. A Wazuh index with ``0`` in the ``rep`` column on a multi-node cluster has a fixed replica count. Apply the setting to it with the command in step 3.

   .. note::

      Running the same command without the ``wazuh-*`` filter also returns the internal indices of the OpenSearch plugins. Several of those are created with a single copy of their data by design, so they appear with ``0`` in the ``rep`` column on a healthy cluster. Do not change them.

#. Apply the automatic replica setting to a Wazuh index that failed step 1 or step 2. Replace ``<INDEX_NAME>`` with the name of that index and repeat for each one.

   +-------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Wazuh dashboard console                                                       | Wazuh indexer API                                                                                                                                                                                       |
   +===============================================================================+=========================================================================================================================================================================================================+
   | ``PUT <INDEX_NAME>/_settings { "index": { "auto_expand_replicas": "0-1" } }`` | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> -XPUT "https://<WAZUH_INDEXER_IP>:9200/<INDEX_NAME>/_settings" -H 'Content-Type: application/json' -d '{"index": {"auto_expand_replicas": "0-1"}}'`` |
   +-------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      {"acknowledged":true}

   .. note::

      Do not send one request that covers several indices with a wildcard. The Wazuh indexer applies a settings request to all of its targets or to none of them, so a single rejected index makes the whole request fail and nothing is changed. ``curl`` exits with code 0 in that case, so confirm that each response contains ``"acknowledged": true``.
