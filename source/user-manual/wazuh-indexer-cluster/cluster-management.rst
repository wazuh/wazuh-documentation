.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section covers cluster management including health checks and node details.

Cluster management
==================

Using the Wazuh indexer API
---------------------------

Perform the following cluster management queries on the Wazuh dashboard console by navigating to **Indexer management** > **Dev Tools**.

-  Check the general Wazuh indexer cluster health:

   .. code-block:: none

      GET _cluster/health

-  To check cluster health based on awareness attribute, use the following:

   .. code-block:: none

      GET _cluster/health?level=awareness_attributes

-  To check the cluster health based on a specific index, use the following:

   .. code-block:: none

      GET _cluster/health/<INDEX-PATTERN>

-  List all Wazuh indexer nodes and their roles:

   .. code-block:: none

      GET _cat/nodes

-  Check the Wazuh indexer node where an index is stored:

   .. code-block:: none

      GET _cat/shards/wazuh-alerts-*?v

-  Check ISM policy for an index pattern:

   .. code-block:: none

      GET _opendistro/_ism/explain/wazuh-alerts-*

-  Check statistics about the Wazuh indexer cluster:

   .. code-block:: none

      GET _cluster/stats/nodes/*

-  Check storage allocation. This can be used to determine if the Wazuh indexer node is full. If the indexer node is full, implement the :doc:`index lifecycle management <wazuh-indexer/index-lifecycle-management>` to free up old indices.

   .. code-block:: none

      GET _cat/allocation?v&s=node

-  Check Wazuh indexer node attributes:

   .. code-block:: none

      GET _cat/nodeattrs?v&h=node,attr,value
