.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_tuning:

Elasticsearch tuning
====================

This guide summarizes the relevant configurations that allow for the optimization of Elasticsearch.

#. `Memory locking`_
#. `Shards and replicas`_

Memory locking
--------------

Elasticsearch performs poorly when the system is swapping the memory. It is vitally important to the health of your node that none of the JVM is ever swapped out to disk.

In this guide, we will show how to set the *bootstrap.memory_lock* setting to true so Elasticsearch will lock the process address space into RAM. This prevents any Elasticsearch memory from being swapped out.

1. Set ``bootstrap.memory_lock``

  Uncomment or add this line to the ``/etc/elasticsearch/elasticsearch.yml`` file:

  .. code-block:: yaml

    bootstrap.memory_lock: true

2. Edit the limit of system resources

  Where to configure systems settings depends on which package and operating system you choose to use for the Elasticsearch installation.

  - In a case where **systemd** is used, system limits need to be specified via systemd. To do this, create the folder executing the command:

  .. code-block:: console

    # mkdir -p /etc/systemd/system/elasticsearch.service.d/

  Then, in the new directory, add a file called ``elasticsearch.conf`` and specify any changes in that file:

  .. code-block:: ini

    [Service]
    LimitMEMLOCK=infinity

  In other cases, edit the proper file ``/etc/sysconfig/elasticsearch`` for RPM or ``/etc/default/elasticsearch`` for Debian:

  .. code-block:: bash

    MAX_LOCKED_MEMORY=unlimited

3. Limit memory

  The previous configuration might cause node instability or even node death with an ``OutOfMemory`` exception if Elasticsearch tries to allocate more memory than is available. JVM heap limits will help limit the memory usage and prevent this situation.

  There are two rules to apply when setting the Elasticsearch heap size:

    - Use no more than 50% of available RAM.
    - Use no more than 32 GB.

  In addition, it is important to take into account the memory usage of the operating system, services and software that are running on the host.

  By default, Elasticsearch is configured with a 1 GB heap. You can change the heap size via JVM flags using the ``/etc/elasticsearch/jvm.options`` file:

  .. code-block:: bash

    # Xms represents the initial size of total heap space
    # Xmx represents the maximum size of total heap space

    -Xms4g
    -Xmx4g

  .. warning::

    Ensure that the min (Xms) and max (Xmx) sizes are the same to prevent JVM heap resizing at runtime as this is a very costly process.

4. Restart Elasticsearch

  a) For Systemd:

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart elasticsearch

  b) For SysV Init:

    .. code-block:: console

      # service elasticsearch restart

After starting Elasticsearch, you can see whether this setting was successfully applied by checking the value of ``mlockall`` in the output of the next request:

.. code-block:: console

    # curl "http://localhost:9200/_nodes?filter_path=**.mlockall&pretty"

.. code-block:: json

    {
      "nodes" : {
        "sRuGbIQRRfC54wzwIHjJWQ" : {
          "process" : {
            "mlockall" : true
          }
        }
      }
    }

If the output of the ``"mlockall"`` field is **false**, the request has failed. You will also find the line *Unable to lock JVM Memory* in the logs (located at ``/var/log/elasticsearch/elasticsearch.log``).

Reference:

  - `Memory lock check <https://www.elastic.co/guide/en/elasticsearch/reference/current/_memory_lock_check.html>`_.
  - `bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#bootstrap.memory_lock>`_.
  - `Enable bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration-memory.html#mlockall>`_.
  - `Heap: Sizing and Swapping <https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html>`_.
  - `Limiting memory usage <https://www.elastic.co/guide/en/elasticsearch/guide/current/_limiting_memory_usage.html#_limiting_memory_usage>`_.

Shards and replicas
-------------------

Elasticsearch provides the ability to split an index into multiple segments called shards. Each shard is, in and of itself, a fully-functional and independent "index" that can be hosted on any node in the cluster. Sharding is important for two primary reasons:

- you can horizontally split/scale your content volume, and

- you can distribute and parallelize operations across shards which increases performance and throughput.

Also, Elasticsearch allows you to make one or more copies of your index’s shards into what are called replica shards, or replicas for short. Replication is important for two primary reasons:

- it provides high availability in case a shard or node fails, and

- it allows you to scale out your search volume and throughput, since searches can be executed on all replicas in parallel.

.. warning::

  The number of shards and replicas can be defined per index at the time the index is created. After the index is created, you may change the number of *replicas* dynamically, however, you cannot change the number of *shards* after-the-fact.

How many shards should my index have?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As it is not possible to *reshard* (changing the number of shards) without reindexing, careful consideration should be given to how many shards you will need *before* the first index is created. The number of nodes that you plan in your installation will influence how many shards you should plan for. In general, the most optimal performance will be realized by using the same number of shards as there are nodes. So, a cluster with three nodes should have three shards, while a cluster with one node would only need one shard.

How many replicas should my index have?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Let's look at some options for how a cluster with three nodes and three shards could be set up:

- No replica: Each node has one shard. If a node goes down, we will be left with an incomplete index of two shards.

- One replica: Each node has one shard and one replica. If a node goes down, we will still have a complete index.

- Two replicas: Each node has one shard and two replicas (the full index). With this set up, the cluster can still function even if two nodes go down. This appears to be the best solution, however, it does increase the storage requirements.

Setting the number of shards and replicas
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The default installation of Elastic Stack with :ref:`RPM <elastic_server_rpm>` or :ref:`Debian <elastic_server_deb>` packages will configure each index with five primary shards and one replica.

If you want to change these settings, you will need to edit the Elasticsearch template. In the following example, the proper values for shards and replicas are configured in a cluster with only one node.

.. warning::

  If your index has already been created, you will have to `reindex <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html>`_ after editing the template.

1. Download the Wazuh Elasticsearch template:

  .. code-block:: console

    # curl https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json -o w-elastic-template.json

2. Edit the template in order to set one shard with no replicas:

  .. code-block:: console

    # vi w-elastic-template.json

  .. code-block:: json

    {
      "order": 1,
      "index_patterns": ["wazuh-alerts-3.x-*"],
      "settings": {
        "index.refresh_interval": "5s",
        "index.number_of_shards": "3",
        "index.number_of_replicas": "0",
        "index.auto_expand_replicas": "0-1",
        "index.mapping.total_fields.limit": 2000
      },
      "mappings": {
      "...": "..."
      }
    }

  .. note::

    We set "order" to "1", otherwise Filebeat will overwrite your template. Multiple matching templates with the same order value will result in a non-deterministic merging order.

3. Load the template:

  .. code-block:: console

    # curl -X PUT "http://localhost:9200/_template/wazuh-custom" -H 'Content-Type: application/json' -d @w-elastic-template.json

  .. code-block:: json

    { "acknowledged" : true }

4. *Optional*. Confirm your configuration was updated successfully:

  .. code-block:: console

    # curl "http://localhost:9200/_template/wazuh-custom?pretty&filter_path=wazuh-custom.settings"

  .. code-block:: json

    {
      "wazuh-custom" : {
        "settings" : {
          "index" : {
            "mapping" : {
              "total_fields" : {
                "limit" : "2000"
              }
            },
            "refresh_interval" : "5s",
            "number_of_shards" : "3",
            "auto_expand_replicas" : "0-1",
            "number_of_replicas" : "1"
          }
        }
      }
    }


Changing the number of replicas
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The number of replicas can be changed dynamically using the Elasticsearch API.

In a cluster with one node, the number of replicas should be set to zero:

.. code-block:: none

  # curl -X PUT "http://localhost:9200/wazuh-alerts-\*/_settings?pretty" -H 'Content-Type: application/json' -d'
  {
    "settings" : {
      "number_of_replicas" : 0
    }
  }'

Reference:

  - `Shards & Replicas <https://www.elastic.co/guide/en/elasticsearch/reference/6.x/getting-started-concepts.html#getting-started-shards-and-replicas>`_.
