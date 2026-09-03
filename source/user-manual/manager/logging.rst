.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager stores operational logs that are rotated and retained for 31 days by default. Learn more in this section of the documentation.

Logging
=======

The Wazuh manager generates and stores operational logs in the ``/var/wazuh-manager/logs/`` directory. Rotated logs are kept for 31 days by default. To change the retention period, set the ``wazuh_modules.manager_task_log_keep_days`` option in the ``/var/wazuh-manager/etc/wazuh-manager-internal-options.conf`` file.

The table below describes the log files and their storage location on the Wazuh manager.

.. list-table::
   :header-rows: 1
   :widths: 45 55

   * - Log storage file
     - Description
   * - ``/var/wazuh-manager/logs/wazuh-manager.log``
     - Stores all Wazuh manager logs in plaintext.
   * - ``/var/wazuh-manager/logs/wazuh-manager.json``
     - Stores all Wazuh manager logs in JSON.
   * - ``/var/wazuh-manager/logs/api.log``
     - Stores the Wazuh manager API logs in plaintext.
   * - ``/var/wazuh-manager/logs/cluster.log``
     - Stores all Wazuh cluster logs in plaintext.

Configuration
-------------

The following ``<logging>`` block represents the default logging configuration in the Wazuh manager ``/var/wazuh-manager/etc/wazuh-manager.conf`` file:

.. code-block:: xml
   :emphasize-lines: 3-5

   <wazuh_config>
     ...
     <logging>
       <log_format>plain</log_format>
     </logging>
     ...
   </wazuh_config>

Where ``<log_format>`` specifies the format of internal logs (JSON or plaintext). The default value is ``plain`` for plaintext logs. The allowed value is any of the following formats, including ``plain``, ``json``, and ``plain,json``.

Log compression and rotation
----------------------------

Log files can quickly accumulate and consume significant disk space on the Wazuh manager endpoint. To prevent this behavior, the Wazuh manager compresses logs during its rotation process, helping to manage disk usage efficiently and maintain system performance.

The Wazuh manager rotates its log files daily, shortly after midnight, and whenever a log file exceeds 512 MB. Rotated files are compressed with ``gzip`` by default and kept for 31 days. During rotation, the Wazuh manager creates a new log file with the original filename and continues writing to it. It stores the compressed old file in the ``/var/wazuh-manager/logs/`` directory within nested directories in the format ``.../<FILENAME>/<YEAR>/<MONTH>/``, where:

-  The ``<FILENAME>`` indicates the name of the original log file.
-  The ``<YEAR>`` indicates the current year.
-  The ``<MONTH>`` indicates the current month of the year.

For example, the log file ``/var/wazuh-manager/logs/cluster.log`` compressed on ``June 01, 2026`` is stored in the ``/var/wazuh-manager/logs/cluster/2026/Jun/`` directory. You can list the contents of the directory by executing the command below:

.. code-block:: console

   # ls -la /var/wazuh-manager/logs/cluster/2026/Jun/

.. code-block:: none
   :class: output
   :emphasize-lines: 4

   total 24
   drwxr-x--- 2 wazuh-manager wazuh-manager  4096 Jun  2 09:13 .
   drwxr-x--- 3 wazuh-manager wazuh-manager  4096 Jun  2 09:13 ..
   -rw-r----- 1 wazuh-manager wazuh-manager 12728 Jun  2 09:13 cluster.log-01.gz

The Wazuh manager appends the suffix ``-<DAY_OF_THE_MONTH>`` to the original filename as seen in the highlighted output above (``cluster.log-01.gz``).

The ``wazuh_modules.manager_task_log_*`` internal options in the ``/var/wazuh-manager/etc/wazuh-manager-internal-options.conf`` file control the rotation schedule, size threshold, compression, daily rotation slots, and retention period.

Depending on your needs, you can configure the removal of compressed files after a specified period. You can move them to log management systems, backup servers, or cloud-based storage devices for longer-term retention.
