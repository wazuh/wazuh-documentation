.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to change settings to optimize the Wazuh indexer cluster performance in this section of the documentation.

Wazuh indexer cluster tuning
============================

This guide shows how to change settings to optimize the Wazuh indexer cluster performance. To change the Wazuh indexer password, see the :doc:`Password management </user-manual/user-administration/password-management>` section.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

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
