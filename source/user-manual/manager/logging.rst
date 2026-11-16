.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager stores operational logs that are rotated and retained for 31 days by default. Learn more in this section of the documentation.

Logging
=======

The Wazuh manager generates and stores operational logs in the ``/var/wazuh-manager/logs/`` directory. Rotated ``wazuh-manager.log`` and ``wazuh-manager.json`` files are kept for 31 days by default. To change this retention period, set the ``wazuh_modules.manager_task_log_keep_days`` option in the ``/etc/wazuh-manager/wazuh-manager-internal-options.conf`` file.

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
   * - ``/var/wazuh-manager/logs/api.json``
     - Stores the Wazuh manager API logs in JSON.
   * - ``/var/wazuh-manager/logs/cluster.log``
     - Stores all Wazuh cluster logs in plaintext.

Configuration
-------------

The following ``<logging>`` block represents the default logging configuration in the Wazuh manager ``/etc/wazuh-manager/wazuh-manager.conf`` file:

.. code-block:: xml
   :emphasize-lines: 3-5

   <wazuh_config>
     ...
     <logging>
       <log_format>plain</log_format>
     </logging>
     ...
   </wazuh_config>

Where:

-  The ``<log_format>`` specifies the format of internal logs (JSON or plaintext). The default value is ``plain`` for plaintext logs. The allowed value is any of the following formats, including ``plain``, ``json``, and ``plain,json``.
-  The ``<logging>`` block configures logs written by Wazuh manager daemons and the Wazuh normalization engine, including ``wazuh-manager.log`` and ``wazuh-manager.json``. It does not affect Wazuh manager API logs.

Log compression and rotation
----------------------------

Log files can quickly accumulate and consume significant disk space on the Wazuh manager endpoint. To prevent this behavior, the Wazuh manager compresses logs during its rotation process, helping to manage disk usage efficiently and maintain system performance.

The Wazuh manager rotates ``wazuh-manager.log`` and ``wazuh-manager.json`` daily, shortly after midnight, and whenever either file exceeds 512 MB. By default, it compresses rotated files with ``gzip`` and retains them for 31 days. The files are stored in ``/var/wazuh-manager/logs/wazuh/<YEAR>/<MONTH>/`` with the names ``wazuh-<DAY>.log.gz`` and ``wazuh-<DAY>.json.gz``. If a file rotates more than once in a day, the Wazuh manager appends a ``-<NNN>`` counter to each additional filename.

The Wazuh manager API and cluster daemons rotate ``api.log`` and ``cluster.log`` daily at midnight. Each daemon creates a new file with the original filename and continues writing to it. The Wazuh manager does not delete the rotated ``api.log`` and ``cluster.log`` files.

The Wazuh manager API can also rotate ``api.log`` based on file size. Configure this behavior with the ``logs.max_size`` option in ``/var/wazuh-manager/api/configuration/api.yaml``.

Each daemon stores the compressed ``api.log`` and ``cluster.log`` files in nested directories in the format ``.../<FILENAME>/<YEAR>/<MONTH>/``, where:

-  The ``<FILENAME>`` indicates the name of the original log file.
-  The ``<YEAR>`` indicates the current year.
-  The ``<MONTH>`` indicates the current month of the year.

For example, the log file ``/var/wazuh-manager/logs/cluster.log`` compressed on ``June 1, 2026`` is stored in the ``/var/wazuh-manager/logs/cluster/2026/Jun/`` directory. You can list the contents of the directory by executing the command below:

.. code-block:: console

   # ls -la /var/wazuh-manager/logs/cluster/2026/Jun/

The command output looks similar to this:

.. code-block:: none
   :class: output
   :emphasize-lines: 4

   total 24
   drwxr-x--- 2 wazuh-manager wazuh-manager  4096 Jun  2 09:13 .
   drwxr-x--- 3 wazuh-manager wazuh-manager  4096 Jun  2 09:13 ..
   -rw-r----- 1 wazuh-manager wazuh-manager 12728 Jun  2 09:13 cluster.log-01.gz

The Wazuh manager appends the suffix ``-<DAY_OF_THE_MONTH>`` to the original filename as the output shows (``cluster.log-01.gz``).

The ``wazuh_modules.manager_task_log_*`` internal options in the ``/etc/wazuh-manager/wazuh-manager-internal-options.conf`` file control the rotation schedule, size threshold, compression, daily rotation slots, and retention period of the ``wazuh-manager.log`` and ``wazuh-manager.json`` files. The Wazuh manager reads these options when it starts, so restart the Wazuh manager after you change them. For example, add ``wazuh_modules.manager_task_log_keep_days=7`` to keep rotated files for 7 days.

The following table lists the options, their default values, and their allowed values.

.. list-table::
   :header-rows: 1
   :widths: 35 10 15 40

   * - Option
     - Default
     - Allowed values
     - Description
   * - ``wazuh_modules.manager_task_log_rotate``
     - 1
     - 0 - 1
     - Turns log rotation on (1) or off (0). 0 turns off both the daily and the size-based rotation.
   * - ``wazuh_modules.manager_task_log_size_rotate``
     - 512
     - 0 - 4096
     - Size, in MB, at which a log file is rotated. 0 turns off size-based rotation and keeps the daily rotation.
   * - ``wazuh_modules.manager_task_log_compress``
     - 1
     - 0 - 1
     - Compresses rotated files with gzip (1) or keeps them uncompressed (0).
   * - ``wazuh_modules.manager_task_log_daily_rotations``
     - 12
     - 1 - 256
     - Maximum number of rotated files per day for each log file.
   * - ``wazuh_modules.manager_task_log_day_wait``
     - 10
     - 1 - 600
     - Seconds after local midnight at which the daily rotation runs.
   * - ``wazuh_modules.manager_task_log_keep_days``
     - 31
     - 0 - 500
     - Number of days to keep rotated files. 0 keeps none.

You can configure the removal of compressed files after a specified period to suit your needs. You can move them to log management systems, backup servers, or cloud-based storage devices for longer-term retention.
