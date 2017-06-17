.. _elastic_tuning:

Elasticsearch tuning
========================================

This guide summarizes the relevant configurations that allow us to optimize Elasticsearch.

Memory locking
----------------------------------------

Elasticsearch performs poorly when the system is swapping the memory. It is vitally important to the health of your node that none of the JVM is ever swapped out to disk.

We will set the *bootstrap.memory_lock* setting to true, so Elasticsearch will lock the process address space into RAM, preventing any Elasticsearch memory from being swapped out.

Step 1: Set bootstrap.memory_lock
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Uncomment or add this line to the ``/etc/elasticsearch/elasticsearch.yml`` file:

.. code-block:: yaml

    bootstrap.memory_lock: true

Step 2: Edit limit of system resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Where to configure systems settings depends on which package and operating system you choose to use for Elasticsearch installation.

 - In a case where **systemd** is used, system limits need to be specified via systemd. First, create the folder executing the command: ``mkdir -p /etc/systemd/system/elasticsearch.service.d/``, add a file called ``elasticsearch.conf`` and specify any changes in that file:

 .. code-block:: ini

    [Service]
    LimitMEMLOCK=infinity

 - In other case, edit the proper file ``/etc/sysconfig/elasticsearch`` for RPM or ``/etc/default/elasticsearch`` for Debian:

 .. code-block:: bash

     MAX_LOCKED_MEMORY=unlimited

Step 3: Limit memory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The previous configuration might cause node instability or even node death (with an *OutOfMemory* exception) if Elasticsearch tries to allocate more memory than is available. JVM heap limits will help us to define the memory usage and prevent this situation.

There are two rules to apply when setting the Elasticsearch heap size:

  - No more than 50% of available RAM.
  - No more than 32 GB.

In addition, you must take into account the memory usage by the operating system, services and software running on the host.

By default, Elasticsearch is configured with a 1 GB heap. You can change the heap size via JVM flags using the ``/etc/elasticsearch/jvm.options`` file:

.. code-block:: bash

    # Xms represents the initial size of total heap space
    # Xmx represents the maximum size of total heap space

    -Xms4g
    -Xmx4g

.. warning::
  Ensure that the min (Xms) and max (Xmx) sizes are the same, this prevents JVM heap resizing at runtime, a very costly process.

Step 4: Restart Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Finally, restart Elasticsearch service:

    a) For Systemd:

      .. code-block:: bash

        systemctl daemon-reload
        systemctl restart elasticsearch

    b) For SysV Init:

      .. code-block:: bash

        service elasticsearch restart

After starting Elasticsearch, you can see whether this setting was successfully applied by checking the value of ``mlockall`` in the output of the next request:

.. code-block:: bash

    curl -XGET 'localhost:9200/_nodes?filter_path=**.mlockall&pretty'

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

The request has failed when you see the above output have ``"mlockall" : false`` field. You will also see a line with more information in the logs (*/var/log/elasticsearch/elasticsearch.log*) with the words *Unable to lock JVM Memory*.

Reference:

  - `Memory lock check <https://www.elastic.co/guide/en/elasticsearch/reference/current/_memory_lock_check.html>`_.
  - `bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#bootstrap.memory_lock>`_.
  - `Enable bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration-memory.html#mlockall>`_.
  - `Heap: Sizing and Swapping <https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html>`_.
  - `Limiting memory usage <https://www.elastic.co/guide/en/elasticsearch/guide/current/_limiting_memory_usage.html#_limiting_memory_usage>`_.
