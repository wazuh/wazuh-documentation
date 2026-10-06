.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to change settings to optimize the Wazuh indexer performance in this section of te documentation.

Wazuh indexer tuning
====================

This guide shows how to change settings to optimize the Wazuh indexer performance. To change the Wazuh indexer password, see the :doc:`Password management </user-manual/user-administration/password-management>` section.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Memory locking
--------------

When the system is swapping memory, the Wazuh indexer may not work as expected. Therefore, it is important for the health of the Wazuh indexer node that none of the Java Virtual Machine (JVM) is ever swapped out to disk. To prevent any Wazuh indexer memory from being swapped out, configure the Wazuh indexer to lock the process address space into RAM as follows.

.. note::

   You require root user privileges to run the commands described below.

#. Add the below line to the ``/etc/wazuh-indexer/opensearch.yml`` configuration file on the Wazuh indexer to enable memory locking:

   .. code-block:: yaml

      bootstrap.memory_lock: true

#. Modify the limit of system resources. Configuring system settings depends on the operating system of the Wazuh indexer installation.

   .. tabs::

      .. group-tab:: Systemd

         #. Create a new directory for the file that specifies the system limits:

            .. code-block:: console

               # mkdir -p /etc/systemd/system/wazuh-indexer.service.d/

         #. Run the following command to create the ``wazuh-indexer.conf`` file in the newly created directory with the new system limit added:

            .. code-block:: console

               # cat > /etc/systemd/system/wazuh-indexer.service.d/wazuh-indexer.conf << EOF
               [Service]
               LimitMEMLOCK=infinity
               EOF

      .. group-tab:: SysVinit

         #. Create a new directory for the file that specifies the system limits:

            .. code-block:: console

               # mkdir -p /etc/init.d/wazuh-indexer.service.d/

         #. Run the following command to create the ``wazuh-indexer.conf`` file in the newly created directory with the new system limit added:

            .. code-block:: console

               # cat > /etc/init.d/wazuh-indexer.service.d/wazuh-indexer.conf << EOF
               [Service]
               LimitMEMLOCK=infinity
               EOF

#. Edit the ``/etc/wazuh-indexer/jvm.options`` file and change the JVM flags. Set a Wazuh indexer heap size value to limit memory usage. JVM heap limits prevent the ``OutOfMemory`` exception if the Wazuh indexer tries to allocate more memory than is available due to the configuration in the previous step. The recommended value is half of the system RAM. For example, set the size as follows for a system with 8 GB of RAM.

   .. code-block:: none

      -Xms4g
      -Xmx4g

   Where the total heap space:

   -  ``-Xms4g`` - initial size is set to 4Gb of RAM.
   -  ``-Xmx4g`` - maximum size is to 4Gb of RAM.

   .. warning::

      To prevent performance degradation due to JVM heap resizing at runtime, the minimum (Xms) and maximum (Xmx) size values must be the same.

#. Restart the Wazuh indexer service:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart wazuh-indexer

#. Verify that the setting was changed successfully, by running the following command to check that ``mlockall`` value is set to  ``true``:

   .. code-block:: console

      # curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> "https://<INDEXER_IP_ADDRESS>:9200/_nodes?filter_path=**.mlockall&pretty"

   .. code-block:: output
      :class: output
      :emphasize-lines: 5

      {
        "nodes" : {
          "sRuGbIQRRfC54wzwIHjJWQ" : {
            "process" : {
              "mlockall" : true
            }
          }
        }
      }

   If the output is ``false``, the request has failed, and the following line appears in the ``/var/log/wazuh-indexer/wazuh-indexer.log`` file:

   .. code-block:: output

      Unable to lock JVM Memory

Shards and replicas
-------------------

The Wazuh indexer offers the possibility of splitting an index into multiple segments called shards. Each shard is a fully functional and independent "index" that can be hosted on any node in the Wazuh indexer cluster. The splitting is important for two main reasons:

-  Horizontal scaling.
-  Distribution and parallelization operations across shards, increasing performance and throughput.

In addition, the Wazuh indexer allows users to make one or more copies of the index shards in what are called replica shards, or replicas for short. Replication is important for two reasons:

-  Provides high availability in case a shard or a node fails.
-  Allows the search volume and throughput to scale since searches can be executed on all replicas in parallel.

Number of shards for an index
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Before creating the first index, consider carefully how many shards will be needed. It is not possible to change the number of shards without re-indexing.

The number of shards needed for optimal performance depends on the number of nodes in the Wazuh indexer cluster. As a general rule, the number of shards must be the same as the number of nodes. For example, a cluster with three nodes should have three shards, while a cluster with only one node would only need one.

Number of replicas for an index
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The number of replicas depends on the available storage for the indices. Here is an example of how a Wazuh indexer cluster with three nodes and three shards could be set up.

-  **No replica**: Each node has one shard. If one node goes down, an incomplete index of only two shards is available.
-  **One replica**: Each node has one shard and one replica. If one node goes down, a full index is still available.
-  **Two replicas**: Each node has the full index with one shard and two replicas. With this setup, the cluster continues to operate even if two nodes go down. Although this seems to be the best solution, it increases the storage requirements.

The image below shows a Wazuh indexer cluster with three nodes, each containing a primary shard and two replica shards.

.. thumbnail:: /images/manual/wazuh-indexer/indexer-cluster-with-shard-replicas-diagram.png
   :title: Wazuh indexer cluster with shards and replicas diagram
   :alt: Wazuh indexer cluster with shards and replicas diagram
   :align: center
   :width: 80%

Setting the number of shards
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. warning::

   The number of shards and replicas are defined per index at the time of index creation. Once the index is created, although the number of replicas can be changed dynamically, the number of shards cannot be changed without :doc:`re-indexing <re-indexing>`.

The default installation of a Wazuh indexer node creates each index with three primary shards and no replicas. You can modify the number of primary shards and replicas by loading a new template using the Wazuh API.

In the following example, we set the number of shards for a single-node Wazuh indexer to 1. Perform the following steps on the Wazuh indexer node or any central component allowed to authenticate using the Wazuh API.

#. Download the Wazuh indexer template:

   .. code-block:: console

      # curl https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json -o w-indexer-template.json

#. Edit ``w-indexer-template.json`` to set ``index.number_of_shards`` to ``1``. To avoid Filebeat overwriting the existing template, set the ``order`` to ``1``. Multiple matching templates in the same order result in a non-deterministic merging order.

   .. code-block:: none
      :emphasize-lines: 2, 9

      {
        "order": 1,
        "index_patterns": [
          "wazuh-alerts-4.x-*",
          "wazuh-archives-4.x-*"
        ],
        "settings": {
          "index.refresh_interval": "5s",
          "index.number_of_shards": "1",
          "index.number_of_replicas": "0",
          "index.auto_expand_replicas": "0-1",
          "index.mapping.total_fields.limit": 10000,
          ...

#. Load the new settings.

   .. code-block:: console

      # curl -X PUT "https://<INDEXER_IP_ADDRESS>:9200/_template/wazuh-custom" -H 'Content-Type: application/json' -d @w-indexer-template.json -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD>

   .. code-block:: output
      :class: output

      {"acknowledged":true}

#. Confirm that the configuration was successfully updated.

   .. code-block:: console

      # curl "https://<INDEXER_IP_ADDRESS>:9200/_template/wazuh-custom?pretty&filter_path=wazuh-custom.settings" -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD>

   .. code-block:: output
      :class: output
      :emphasize-lines: 11

      {
        "wazuh-custom" : {
          "settings" : {
            "index" : {
              "mapping" : {
                "total_fields" : {
                  "limit" : "10000"
                }
              },
              "refresh_interval" : "5s",
              "number_of_shards" : "1",
              "auto_expand_replicas" : "0-1",
              "number_of_replicas" : "0",
              ...

If the index has already been created, it must be :doc:`re-indexed <re-indexing>`.

Setting the number of replicas
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The number of replicas can be changed dynamically using the Wazuh indexer API. In a single-node cluster, the number of replicas should be set to zero. This is accomplished by running the following command on the Wazuh indexer node or any central component allowed to authenticate using the Wazuh API:

.. code-block:: console
   :emphasize-lines: 1, 5

   curl -k -u "<INDEXER_USERNAME>:<INDEXER_PASSWORD>" -XPUT "https://<INDEXER_IP_ADDRESS>:9200/wazuh-alerts-" -H 'Content-Type: application/json' -d'
   {
     "settings": {
       "index": {
         "number_of_replicas": 0
       }
     }
   }'

Configure shard allocation awareness or forced awareness
--------------------------------------------------------

This is most applicable in cases where the Wazuh indexer nodes are spread across geographically dispersed zones.

To configure awareness, add zone attributes to the ``/etc/wazuh-indexer/opensearch.yml`` file on the Wazuh indexer nodes for the different zones.

For example: You have two zones named zone A and B. You will add the following configuration to the ``/etc/wazuh-indexer/opensearch.yml`` file on each Wazuh indexer node in zone A and B respectively:

.. code-block:: yaml

   node.attr.zone: zoneA

.. code-block:: yaml

   node.attr.zone: zoneB

Allocation awareness is best used if storage on the Wazuh indexer nodes in zone A and zone B is less than 50% utilized. This allows for adequate storage capacity to allocate replicas in the zone.

Forced awareness is an option if Wazuh indexer nodes in both zone A and B lack sufficient capacity to store all primary and replica shards. This ensures that if there's a zone failure, the Wazuh indexer won't overwhelm your remaining zone, preventing your cluster from being locked due to storage shortage.

Choosing allocation awareness or forced awareness depends on how much space you have in each zone to balance your primary and replica shards.

Shard allocation awareness
^^^^^^^^^^^^^^^^^^^^^^^^^^

Shard allocation awareness attempts to spread primary and replica shards across multiple zones. It is used to allocate a replica shard to a zone different from its primary zone.

In the event of node failure within a zone, you can be rest assured that your replica shards are distributed among your remaining zones. This enhances fault tolerance, safeguarding your data against zone failures and individual node failures.

To configure shard allocation awareness, update the cluster settings:

.. code-block:: none

   PUT _cluster/settings
   {
     "persistent": {
       "cluster.routing.allocation.awareness.attributes": "zone"
     }
   }

You can either use ``persistent`` or ``transient`` settings. We recommend using the ``persistent`` setting because it persists through a cluster reboot. The ``transient`` setting does not persist through a cluster reboot.

.. note::

   If only one zone is available (such as after zone failures), the Wazuh indexer allocates replica shards to the only remaining zone.

Forced awareness
^^^^^^^^^^^^^^^^^

Using the forced awareness implies that primary and replica shards are never allocated to the same zone.

To configure forced awareness, specify all the possible values for your zone attributes:

.. code-block:: none
   :emphasize-lines: 5

   PUT _cluster/settings
   {
     "persistent": {
       "cluster.routing.allocation.awareness.attributes": "zone",
       "cluster.routing.allocation.awareness.force.zone.values":["zoneA", "zoneB"]
     }
   }

In case there are other zones, add the other zones to the ``cluster.routing.allocation.awareness.force.zone.values`` field.

.. warning::

   If a node fails, forced awareness does not allocate the replicas to another node in the same zone. Instead, the cluster enters a yellow state and only allocates the replicas when nodes in the other zone(s) come online.

Allocation filtering
^^^^^^^^^^^^^^^^^^^^^

This allows a node to be excluded from shard allocation. A common use case is when you want to decommission a node within a zone.

To move shards off a node before decommissioning it, create a filter that excludes the node using its IP address. This will move all shards allocated to that node before it is shut down. You can also use a wildcard ``*`` in a situation where there are more than one node within an IP range to be decommissioned.

.. code-block:: none
   :emphasize-lines: 4

   PUT _cluster/settings
   {
     "persistent": {
       "cluster.routing.allocation.exclude._ip": "192.168.0.*"
     }
   }

Set node attributes for each node in a cluster
----------------------------------------------

By default, each Wazuh indexer node is a master-eligible, data, ingest, and coordinating node. Deciding on the number of nodes, assigning node types, and choosing the hardware for each node type depends on your use case.

Cluster manager nodes
^^^^^^^^^^^^^^^^^^^^^

Cluster manager nodes manage all cluster-wide configurations and modifications, including adding, removing, and allocating shards to nodes, as well as generating and deleting indices and fields.

A distributed consensus technique is used to elect a single cluster-manager node from among the cluster-manager eligible nodes. This cluster-manager node is reelected in the event that the incumbent node fails.

You can specify that a Wazuh indexer node is the cluster manager node, even though this is already done by default.

Set a Wazuh indexer node role to ``cluster_manager`` by adding the following configuration to the ``/etc/wazuh-indexer/opensearch.yml`` file:

.. code-block:: yaml

   node.roles: [ cluster_manager ]

Data nodes
^^^^^^^^^^

The data node is responsible for storing and searching data. It performs all data related operations (indexing, searching, aggregating) on local shards. These are the worker nodes of your Wazuh indexer cluster and need more disk space than any other node type.

Set a Wazuh indexer node role as a data node by adding the following configuration to the ``/etc/wazuh-indexer/opensearch.yml`` file:

.. code-block:: yaml

   node.roles: [ data, ingest ]

As you add data nodes it is important  to keep them balanced between zones. For example, if you have three zones, add a data node for each zone. We recommend using storage and RAM-heavy nodes.

Coordinating nodes
^^^^^^^^^^^^^^^^^^

The coordinating node delegates client requests to the shards on the data nodes, collects and aggregates the results into one final result, and sends it back to the Wazuh dashboard.

Every node is a coordinating node by default, however to make a node a dedicated coordinating node, set ``node.roles`` to an empty list:

.. code-block:: yaml

   node.roles: []
