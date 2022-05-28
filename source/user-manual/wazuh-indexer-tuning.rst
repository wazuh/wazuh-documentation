.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section of the Wazuh documentation, you will find more information on memory locking, and shards and replicas for the Wazuh indexer.

Wazuh indexer tuning
====================

This guide shows how to change settings to optimize the Wazuh indexer performance. To change the default passwords, see the :doc:`/user-manual/securing-wazuh/index` section.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Memory locking
--------------

It is important for the health of the Wazuh indexer node that none of the JVM is ever swapped out to disk. When the system is swapping memory, the Wazuh indexer may not work as expected.

To prevent any Wazuh indexer memory from being swapped out, configure the Wazuh indexer to lock the process address space into RAM as follows.


.. note::
   
   Root user privileges are required to run the commands described below.

#. Add this line to the ``/etc/wazuh-indexer/opensearch.yml`` configuration file to enable memory locking.

   .. code-block:: yaml

      bootstrap.memory_lock: true

#. Modify the limit of system resources. Configuring system settings depends on the operating system of the Wazuh indexer installation.

   .. tabs::

      .. group-tab:: Systemd

         #. Create the folder where to specify a file with the system limits.

            .. code-block:: console

               # mkdir -p /etc/systemd/system/wazuh-indexer.service.d/

         #. Run the following command to create the file ``wazuh-indexer.conf`` with the new limit in the newly created directory.

            .. code-block:: console

               # cat > /etc/systemd/system/wazuh-indexer.service.d/wazuh-indexer.conf << EOF
               [Service]
               LimitMEMLOCK=infinity
               EOF

      .. group-tab:: SysV Init

         #. Edit the configuration file and set the following parameter.

            .. code-block:: pkgconfig

               MAX_LOCKED_MEMORY=unlimited
               
            -  For RPM, ``/etc/sysconfig/wazuh-indexer``
            -  For Debian, ``/etc/default/wazuh-indexer``

#. Edit ``/etc/wazuh-indexer/jvm.options`` and change the JVM flags. Set the Wazuh indexer heap size to limit the memory usage.

   -  JVM heap limits prevent the ``OutOfMemory`` exception if the Wazuh indexer tried to allocate more memory than available due to the configuration in the previous step.

   -  **Recommended value**: Half of system RAM. For example, set the size as follows for a 8 GB of RAM system.

      .. code-block:: yaml

         # Xms represents the initial size of total heap space
         # Xmx represents the maximum size of total heap space

         -Xms4g
         -Xmx4g

      .. warning::

         Since JVM heap resizing at runtime is a very costly process, the minimum (``Xms``) and maximum (``Xmx``) size values must be the same to prevent this.

#. Restart the Wazuh indexer service.

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl restart wazuh-indexer

      .. group-tab:: SysV Init

         .. code-block:: console

            # service wazuh-indexer restart

#. Run the following request. Check that ``mlockall`` is ``true`` to verify that the setting was changed successfully.

   .. code-block:: console

      # curl -k -u <USERNAME>:<PASSWORD> "https://localhost:9200/_nodes?filter_path=**.mlockall&pretty"

   .. code-block:: json
       :class: output

       {
         "nodes" : {
           "sRuGbIQRRfC54wzwIHjJWQ" : {
             "process" : {
               "mlockall" : true
             }
           }
         }
       }

   If the output is ``false``, the request has failed and the following line appears in ``/var/log/wazuh-indexer/wazuh-indexer.log``:

   .. code-block:: none
      :class: output

      Unable to lock JVM Memory

Shards and replicas
-------------------

The Wazuh indexer offers the possibility to split an index into multiple segments called shards. Each shard is in itself a fully functional and independent "index" that can be hosted on any node in the cluster. The splitting is important for two main reasons:

-  Horizontal scalation.
-  Distribute and parallelize operations across shards, increasing the performance and throughput.

In addition, the Wazuh indexer allows the user to make one or more copies of the index shards in what are called replica shards, or replicas for short. Replication is important for two main reasons:

-  Provides high availability in case a shard or a node fails.
-  Allows the search volume and the throughput to scale since searches can be executed on all replicas in parallel.

**Number of shards for an index**

Before creating the first index, consider carefully how many shards will be needed. It is not possible to change the number of shards without re-indexing.

The number of shards for optimal performance depends on the number of nodes in the Wazuh indexer cluster. As a general rule, the number of shards must be the same as the number of nodes. For example, a cluster with three nodes should have three shards, while a cluster with one node would only need one.

**Number of replicas for an index**

The number of replicas depends on the available storage for the indices. Here is an example of how a Wazuh indexer cluster with three nodes and three shards could be set up.

-  No replica: Each node has one shard. If one node goes down, an incomplete index of only two shards is available.
-  One replica: Each node has one shard and one replica. If one node goes down, a full index is still available.
-  Two replicas: Each node has the full index with one shard and two replicas. With this setup, the cluster continues operating even if two nodes go down. Although this seems to be the best solution, it increases the storage requirements.

Setting the number of shards
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. warning::

   The number of shards and replicas gets defined per index at the time of index creation. Once the index is created, although the number of replicas can be changed dynamically, the number of shards cannot be changed without `re-indexing <https://opensearch.org/docs/latest/opensearch/reindex-data/>`__.

The default installation of the Wazuh indexer creates each index with three primary shards and no replicas. To change this, the new settings must be loaded on a template using the Wazuh indexer API.

In the following example, we configure shards and replicas for a single-node Wazuh indexer cluster.

#. Download the Wazuh indexer template.

   .. code-block:: console

      # curl https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/wazuh-indexer/7.x/wazuh-template.json -o w-indexer-template.json

#. Edit ``w-indexer-template.json`` in order to set one shard. Set ``order`` to ``1`` to avoid Filebeat overwriting the existing template. Multiple matching templates with the same order result in a nondeterministic merging order.

   .. code-block:: none
      :class: output

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

      # curl -X PUT "https://localhost:9200/_template/wazuh-custom" -H 'Content-Type: application/json' -d @w-indexer-template.json -k -u <ADMIN_USER>:<ADMIN_USER_PASSWORD>

   .. code-block:: json
      :class: output

      {"acknowledged":true}

#. Confirm that the configuration was successfully updated.

   .. code-block:: console

      # curl "https://localhost:9200/_template/wazuh-custom?pretty&filter_path=wazuh-custom.settings" -k -u <ADMIN_USER>:<ADMIN_USER_PASSWORD>

   .. code-block:: none
      :class: output

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

If the index had already been created, it must be `re-indexed <https://opensearch.org/docs/latest/opensearch/reindex-data/>`__.
 
Changing the number of replicas
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The number of replicas can be changed dynamically using the Wazuh indexer API. In a single-node cluster, the number of replicas should be set to zero.

.. code-block:: bash

   curl -k -u <ADMIN_USER>:<ADMIN_USER_PASSWORD> -X PUT "https://localhost:9200/wazuh-alerts-\*/_settings?pretty" -H 'Content-Type: application/json' -d'
   {
     "settings" : {
       "number_of_replicas" : 0
     }
   }'
