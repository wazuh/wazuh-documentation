.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to change settings to optimize the Wazuh indexer performance in this section of the documentation.

Wazuh indexer tuning
====================

This guide shows how to change settings to optimize the Wazuh indexer performance. To change the Wazuh indexer password, see the :doc:`Password management </user-manual/user-administration/password-management>` section.

Memory locking
--------------

When the system is swapping memory, the Wazuh indexer may not work as expected. Therefore, it is important for the health of the Wazuh indexer node that none of the Java Virtual Machine (JVM) is ever swapped out to disk. To prevent any Wazuh indexer memory from being swapped out, configure the Wazuh indexer to lock the process address space into RAM as follows.

.. note::

   You require root user privileges to run the commands described below.

#. Make sure the following line is present in the ``/etc/wazuh-indexer/opensearch.yml`` configuration file to enable memory locking. It is set by default. Add it if it was removed or if you are using a custom configuration file:

   .. code-block:: yaml

      bootstrap.memory_lock: true

#. Modify the limit of system resources. Configuring system settings depends on the operating system of the Wazuh indexer installation.

   .. tabs::

      .. group-tab:: Systemd

         The ``wazuh-indexer`` service unit already sets ``LimitMEMLOCK=infinity``. The following steps are needed only if ``systemctl show wazuh-indexer -p LimitMEMLOCK`` shows another value.

         #. Create a new directory for the file that specifies the system limits:

            .. code-block:: console

               # mkdir -p /etc/systemd/system/wazuh-indexer.service.d/

         #. Run the following command to create the ``wazuh-indexer.conf`` file in the newly created directory with the new system limit added:

            .. code-block:: console

               # cat > /etc/systemd/system/wazuh-indexer.service.d/wazuh-indexer.conf << EOF
               [Service]
               LimitMEMLOCK=infinity
               EOF

      .. group-tab:: SysV init

         The Wazuh indexer init script sets ``MAX_LOCKED_MEMORY=unlimited`` and applies it with ``ulimit -l`` when the service starts, so memory locking needs no extra system limit by default. To set the value explicitly, add or update the following line in the service defaults file:

         -  Debian-based systems: ``/etc/default/wazuh-indexer``
         -  RPM-based systems: ``/etc/sysconfig/wazuh-indexer``

         .. code-block:: ini

            MAX_LOCKED_MEMORY=unlimited

#. Edit the ``/etc/wazuh-indexer/jvm.options`` file and change the JVM flags. Set a Wazuh indexer heap size value to limit memory usage. JVM heap limits prevent the ``OutOfMemory`` exception if the Wazuh indexer tries to allocate more memory than is available due to the configuration in the previous step. Set the heap to no more than half of the system RAM, or a quarter of it when the Wazuh manager or the Wazuh dashboard runs on the same host. Don't set it above about 32 GB, above that size, the JVM can't use compressed object pointers, which wastes memory. For example, set the size as follows for a system with 8 GB of RAM. The Wazuh installation assistant already sets both values to half of the system RAM, or to a quarter of it on an all-in-one deployment. A step-by-step installation keeps the package default of ``1g``.

   .. code-block:: none

      -Xms4g
      -Xmx4g

   Where the total heap space:

   -  ``-Xms4g`` - initial size is set to 4Gb of RAM.
   -  ``-Xmx4g`` - maximum size is to 4Gb of RAM.

   .. note::

      To prevent performance degradation due to JVM heap resizing at runtime, the minimum (``Xms``) and maximum (``Xmx``) size values must be the same.

#. Restart the Wazuh indexer service:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl restart wazuh-indexer

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-indexer restart

#. Verify that the setting was changed successfully, by running the following command to check that ``mlockall`` value is set to ``true``:

   .. code-block:: console

      # curl -k -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> "https://<INDEXER_IP_ADDRESS>:9200/_nodes?filter_path=**.mlockall&pretty"

   **Output**

   .. code-block:: json
      :class: output
      :emphasize-lines: 5

      {
        "nodes" : {
          "BtGND4BjQ02Um5KONfFZUg" : {
            "process" : {
              "mlockall" : true
            }
          }
        }
      }

#. If the output is ``false``, memory locking failed, and the following line appears in the ``/var/log/wazuh-indexer/wazuh-cluster.log`` file. On a node bound to a non-loopback address, the Wazuh indexer doesn't start, and the line follows ``bootstrap checks failed``:

   **Output**

   .. code-block:: none

      memory locking requested for opensearch process but memory is not locked

Virtual memory
--------------

The Wazuh indexer uses memory-mapped files to store its indices and needs ``vm.max_map_count`` set to at least ``262144``. The Wazuh indexer packages set this value in ``/usr/lib/sysctl.d/wazuh-indexer.conf``. To check the current value, run the following command:

.. code-block:: console

   # sysctl vm.max_map_count

When the Wazuh indexer runs in a container, set the value on the host.
