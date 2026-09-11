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

   .. note::

      To prevent performance degradation due to JVM heap resizing at runtime, the minimum (Xms) and maximum (Xmx) size values must be the same.

#. Restart the Wazuh indexer service:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart wazuh-indexer

#. Verify that the setting was changed successfully, by running the following command to check that ``mlockall`` value is set to ``true``:

   .. code-block:: console

      # curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> "https://<INDEXER_IP_ADDRESS>:9200/_nodes?filter_path=**.mlockall&pretty"

   **Output**

   .. code-block:: json
      :class: output

      {
        "nodes" : {
          "BtGND4BjQ02Um5KONfFZUg" : {
            "process" : {
              "mlockall" : true
            }
          }
        }
      }

#. If the output is ``false``, the request has failed, and the following line appears in the ``/var/log/wazuh-indexer/wazuh-indexer.log`` file:

   **Output**

   .. code-block:: none

      Unable to lock JVM Memory
