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

..
   References:

     - `Memory lock check <https://www.elastic.co/guide/en/elasticsearch/reference/current/_memory_lock_check.html>`_.
     - `bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#bootstrap.memory_lock>`_.
     - `Enable bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration-memory.html#mlockall>`_.
     - `Heap: Sizing and Swapping <https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html>`_.
     - `Limiting memory usage <https://www.elastic.co/guide/en/elasticsearch/guide/current/_limiting_memory_usage.html#_limiting_memory_usage>`_.

