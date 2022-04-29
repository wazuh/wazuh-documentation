.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: In this section of the Wazuh documentation, you will find more information on how to tune Elasticsearch: changing user passwords, memory locking, and shards and replicas.
  
.. _elastic_tuning:

Elasticsearch tuning
====================

This guide summarizes the relevant settings that enable Elasticsearch optimization.

- `Memory locking`_
- `Shards and replicas`_

.. _change_elastic_pass:

.. _memory_locking:

Memory locking
--------------

Elasticsearch malfunctions when the system is swapping memory. It is crucial for the health of the node that none of the JVM is ever swapped out to disk. The following steps show how to set the ``bootstrap.memory_lock`` setting to true so Elasticsearch will lock the process address space into RAM. This prevents any Elasticsearch memory from being swapped out.

#. Set ``bootstrap.memory_lock``:

    Uncomment or add this line to the ``/etc/elasticsearch/elasticsearch.yml`` file:

    .. code-block:: yaml

      bootstrap.memory_lock: true

#. Edit the limit of system resources:

    Where to configure system settings depends on which package and operating system used for the Elasticsearch installation.

    .. tabs::

        .. group-tab:: Systemd

          In a case where **systemd** is used, system limits need to be specified via systemd. To do this, create the folder executing the command:

          .. code-block:: console

            # mkdir -p /etc/systemd/system/elasticsearch.service.d/

          Then, in the new directory, add a file called ``elasticsearch.conf`` and specify any changes in that file:

          .. code-block:: console

            # cat > /etc/systemd/system/elasticsearch.service.d/elasticsearch.conf << EOF
            [Service]
            LimitMEMLOCK=infinity
            EOF            

        .. group-tab:: SysV Init

          Edit the proper file ``/etc/sysconfig/elasticsearch`` for RPM or ``/etc/default/elasticsearch`` for Debian:

          .. code-block:: pkgconfig

            MAX_LOCKED_MEMORY=unlimited

#. Limit memory:

    The previous configuration might cause node instability or even node death with an ``OutOfMemory`` exception if Elasticsearch tries to allocate more memory than is available. JVM heap limits will help limit memory usage and prevent this situation. Two rules must be applied when setting Elasticsearch's heap size:


      - Use no more than 50% of available RAM.
      - Use no more than 32 GB.

    It is also important to consider the memory usage of the operating system, services and software running on the host. By default, Elasticsearch is configured with a heap of 1 GB. It can be changed via JVM flags using the ``/etc/elasticsearch/jvm.options`` file:

    .. code-block:: yaml

      # Xms represents the initial size of total heap space
      # Xmx represents the maximum size of total heap space

      -Xms4g
      -Xmx4g

    .. warning::

      The values min ``(Xms)`` and max ``(Xmx)`` sizes must be the same to prevent JVM heap resizing at runtime as this is a very costly process.

#. Restart Elasticsearch:

.. tabs::


    .. group-tab:: Systemd


      .. code-block:: console

        # systemctl daemon-reload
        # systemctl restart elasticsearch



    .. group-tab:: SysV Init


      .. code-block:: console

        # service elasticsearch restart

After starting Elasticsearch, run the following request to verify that the setting was successfully changed by checking the value of ``mlockall``:

.. code-block:: console

    # curl "http://localhost:9200/_nodes?filter_path=**.mlockall&pretty"

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

If the output of the ``"mlockall"`` field is **false**, the request has failed.  In addition, the following line will appear in ``/var/log/elasticsearch/elasticsearch.log``:

.. code-block:: none
  :class: output

  Unable to lock JVM Memory

References:

  - `Memory lock check <https://www.elastic.co/guide/en/elasticsearch/reference/current/_memory_lock_check.html>`_.
  - `bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#bootstrap.memory_lock>`_.
  - `Enable bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration-memory.html#mlockall>`_.
  - `Heap: Sizing and Swapping <https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html>`_.
  - `Limiting memory usage <https://www.elastic.co/guide/en/elasticsearch/guide/current/_limiting_memory_usage.html#_limiting_memory_usage>`_.

Shards and replicas
-------------------

Elasticsearch offers the possibility to split an index into multiple segments called shards. Each shard is in itself a fully functional and independent "index" that can be hosted on any node in the cluster. The splitting is important for two main reasons:

- Horizontal scalation.

- Distribute and parallelize operations across shards, increasing the performance and throughput.

In addition, Elasticsearch allows the user to make one or more copies of the index shards in what are called replica shards, or replicas for short. Replication is important for two main reasons.

- It provides high availability in case a shard or node fails.

- It allows search volume and throughput to scale since searches can be executed on all replicas in parallel.

.. warning::

  The number of shards and replicas can be defined per index at the time of their creation. Once the index is created, the number of replicas must be changed dynamically, whereas the number of fragments cannot be changed afterward. 

How many shards should an index have?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As it is not possible to *reshard* (changing the number of shards) without reindexing, careful consideration should be given to how many shards will be needed *before* creating the first index. The number of nodes in the installation will influence the number of shards to be planned. In general, the most optimal performance will be realized by using the same number of shards as nodes. Thus, a cluster with three nodes should have three shards, while a cluster with one node would only need one shard.

How many replicas should an index have?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Here is an example of how a cluster with three nodes and three shards could be set up:

- **No replica:** Each node has one shard. If a node goes down, an incomplete index of two fragments will remain.

- **One replica:** Each node has one shard and one replica.  If a node goes down, a full index will remain.

- **Two replicas:** Each node has one shard and two replicas (the full index). With this setup, the cluster can continue to operate even if two nodes go down. Although this seems to be the best solution, it increases the storage requirements.

Setting the number of shards and replicas
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The default installation of :ref:`Elasticsearch <installation_guide>` will configure each index with 3 primary shards and no replicas.

To change these settings, the Elasticsearch's template will have to be edited. In the following example, the proper values for shards and replicas are configured in a cluster with only one node.

.. warning::

  If the index has already been created, it must be `reindexed <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html>`_ after editing the template.

#. Download the Wazuh Elasticsearch template:

    .. code-block:: console

      # curl https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json -o w-elastic-template.json

#. Edit the template ``w-elastic-template.json`` in order to set one shard with no replicas:

    .. code-block:: json
      :class: output

      {
        "order": 1,
        "index_patterns": ["wazuh-alerts-4.x-*"],
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

    .. warning::

      The value "order" is set to "1". Otherwise, Filebeat will overwrite the existing template. Multiple matching templates with the same order value will result in a non-deterministic merging order.

#. Load the template:

    .. code-block:: console

      # curl -X PUT "http://localhost:9200/_template/wazuh-custom" -H 'Content-Type: application/json' -d @w-elastic-template.json

    .. code-block:: json
      :class: output

      { "acknowledged" : true }

#. *Optional*. Confirm that the configuration was successfully updated:

    .. code-block:: console

      # curl "https://localhost:9200/_template/wazuh-custom?pretty&filter_path=wazuh-custom.settings" -k -u admin:admin

    In case of having changed the admin's user credentials, the ``admin:admin`` must be modified in consequence.

    .. code-block:: json
      :class: output

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

The number of replicas can be changed dynamically using the Elasticsearch API. In a cluster with one node, the number of replicas should be set to zero:

.. code-block:: none

  # curl -X PUT "http://localhost:9200/wazuh-alerts-\*/_settings?pretty" -H 'Content-Type: application/json' -d'
  {
    "settings" : {
      "number_of_replicas" : 0
    }
  }'

More information about configuring shards and replicas can be found in the Wazuh dashboard configuration section.

Reference:

  - `Shards & Replicas <https://www.elastic.co/guide/en/elasticsearch/reference/6.x/getting-started-concepts.html#getting-started-shards-and-replicas>`_.
