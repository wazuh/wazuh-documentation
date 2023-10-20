.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The ossec.conf file is the main configuration file on the Wazuh manager and also important on the agents. Learn more about FIM settings with configuration examples here.

.. _reference_ossec_syscheck:

syscheck
========

.. topic:: XML section name

	.. code-block:: xml

		<syscheck>
		</syscheck>


Configuration options for file integrity monitoring:

- `alert_new_files`_
- `allow_remote_prefilter_cmd`_
- `database`_
- `file_limit`_
- `registry_limit`_
- `diff`_
- `directories`_
- `disabled`_
- `frequency`_
- `ignore`_
- `max_eps`_
- `max_files_per_second`_
- `prefilter_cmd`_
- `process_priority`_
- `registry_ignore`_
- `scan_day`_
- `scan_time`_
- `skip_dev`_
- `skip_nfs`_
- `skip_proc`_
- `skip_sys`_
- `synchronization`_
- `whodata`_
- `windows_audit_interval`_
- `windows_registry`_

.. _reference_ossec_syscheck_alert_new_files:

alert_new_files
---------------

Specifies if FIM should alert when new files are created.

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

Example:

.. code-block:: xml

 <alert_new_files>yes</alert_new_files>

.. note::

	This setting is applied in the manager configuration, but it only takes effect on agents with versions lower than 3.12.

.. _reference_ossec_syscheck_allow_remote_prefilter_cmd:

allow_remote_prefilter_cmd
--------------------------

Allows ``prefilter_cmd`` option apply in remote configuration (*agent.conf*).

+--------------------+--------------------------------+
| **Default value**  | no                             |
+--------------------+--------------------------------+
| **Allowed values** | yes, no                        |
+--------------------+--------------------------------+

Example:

.. code-block:: xml

  <allow_remote_prefilter_cmd>yes</allow_remote_prefilter_cmd>


.. note::

   This option only can be activated from the agent side, on its own ``ossec.conf``.

.. _reference_ossec_syscheck_database:

database
--------

Specifies where the database is going to be stored.

+--------------------+---------------------------------------+
| **Default value**  | disk                                  |
+--------------------+---------------------------------------+
| **Allowed values** | disk, memory                          |
+--------------------+---------------------------------------+


.. _reference_ossec_syscheck_directories:

directories
-----------

List of directories to be monitored. The directories can be comma-separated or multiple lines may be entered to include multiple directories.

All files and subdirectories within the noted directories will also be monitored.

Drive letters without directories are valid. It's possible to configure them by removing the last backslash, for example ``D:``.

This is to be set on the system to be monitored (or in the ``agent.conf``, if appropriate).

There is a limit of 64 directories, comma-separated, that can be written in one line .

Wildcard characters (``?`` and ``*``) can be used to monitor paths that fulfill the given pattern.
These wildcards will be reloaded every time a scheduled scan is run.

+--------------------+------------------------------------+
| **Default value**  | /etc,/usr/bin,/usr/sbin,/bin,/sbin |
+--------------------+------------------------------------+
| **Allowed values** | Any directory                      |
+                    +                                    +
|                    | Any environment variable           |
+--------------------+------------------------------------+

Attributes:

+--------------------------+-----------------------------------------------------------------------------------------------------------------------+
| **realtime**             | This will enable real-time/continuous monitoring on Linux (using the inotify system calls) and Windows systems.       |
+                          +                                                                                                                       +
|                          | Real time only works with directories, not individual files.                                                          |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | no                                                       |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **whodata**              | This will enable who-data monitoring on Linux and Windows systems.                                                    |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | no                                                       |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **report_changes**       | Report file changes. This is limited to text files at this time.                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | no                                                       |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **diff_size_limit**      | Limit the maximum size of the file which will report diff information with ``report_changes`` enabled.                |
+                          +                                                                                                                       +
|                          | Files bigger than this value will not report diff information.                                                        |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | 50MB                                                     |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | Any positive number followed by KB/MB/GB                 |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_all**            | It modifies the value of all attributes with the prefix ``check_``.                                                   |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_sum**            | Check the MD5, SHA-1 and SHA-256 hashes of the files.                                                                 |
+                          +                                                                                                                       +
|                          | Same as using ``check_md5sum="yes"``, ``check_sha1sum="yes"`` and ``check_sha256sum="yes"`` at the same time.         |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_sha1sum**        | Check only the SHA-1 hash of the files.                                                                               |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_md5sum**         | Check only the MD5 hash of the files.                                                                                 |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_sha256sum**      | Check only the SHA-256 hash of the files.                                                                             |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_size**           | Check the size of the files.                                                                                          |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_owner**          | Check the owner of the files.                                                                                         |
|                          |                                                                                                                       |
|                          | On Windows, uid will always be 0.                                                                                     |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_group**          | Check the group owner of the files/directories.                                                                       |
+                          +                                                                                                                       +
|                          | Available for UNIX. On Windows, gid will always be 0 and the group name will be blank.                                |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_perm**           | Check the permission of the files/directories.                                                                        |
+                          +                                                                                                                       +
|                          | On Windows, a list of denied and allowed permissions will be given for each user or group since version 3.8.0.        |
+                          +                                                                                                                       +
|                          | Only works on NTFS partitions on Windows systems.                                                                     |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_attrs**          | Check the attributes of the files.                                                                                    |
|                          | Available for Windows.                                                                                                |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_mtime**          | Check the modification time of a file.                                                                                |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_inode**          | Check the file inode.                                                                                                 |
|                          | Available for UNIX. On Windows, inode will always be 0.                                                               |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **restrict**             | Limit checks to files containing the entered string in the file name.                                                 |
+                          +                                                                                                                       +
|                          | Any directory or file path is allowed.                                                                                |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | N/A                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed value                                              | sregex                                                   |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **tags**                 | Add tags to alerts for monitored directories.                                                                         |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | N/A                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | Tags list separated by commas                            |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **recursion_level**      | Limits the maximum level of recursion allowed.                                                                        |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | 256                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | Any integer between 0 and 320                            |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **follow_symbolic_link** | The setting is available for UNIX systems and only applies when a symbolic link is set in the configuration directly. |
+                          +                                                                                                                       +
|                          | When this flag is enabled, the link is followed and its content is monitored. Otherwise, the own link is monitored.   |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | no                                                       |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+

When there is a conflict between options that modify the same attribute, **the last one configured overrides**. For instance:

.. code-block:: xml

  <directories check_all="no" check_sha256="yes">/etc</directories>

The configuration above, set the option ``check_sha256`` to ``YES``.

.. code-block:: xml

  <directories check_sha256="yes" check_all="no">/etc</directories>

Nevertheless, the second one disables the SHA-256 hash check.

If there is a conflict between a block with wildcards and another without them, the block without wildcards will be used for the specific case. As an example:

.. code-block:: xml

  <directories>C:\Users\*\Downloads</directories>

The above block will set the ``Downloads`` folder of all users to be monitored in scheduled mode.

.. code-block:: xml

  <directories realtime="yes">C:\Users\vagrant\Downloads</directories>

Even though the above block is included in the previous one, ``C:\Users\vagrant\Downloads`` will be monitored in real time because it has no wildcards.

.. _reference_ossec_syscheck_disabled:

disabled
--------

Indicates if the syscheck scan is disabled or not.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

Example:

.. code-block:: xml

 <disabled>no</disabled>


.. _reference_ossec_syscheck_frequency:

frequency
---------

Frequency that the syscheck will be run. Given in seconds.

+--------------------+-------------------------------------+
| **Default value**  | 43200                               |
+--------------------+-------------------------------------+
| **Allowed values** | A positive number, time in seconds. |
+--------------------+-------------------------------------+

Example:

.. code-block:: xml

 <frequency>43200</frequency>


.. _reference_ossec_syscheck_ignore:

ignore
------

List of files or directories to be ignored. Introduced as one entry per line. Multiple lines may be entered to include multiple files or directories. Ignored files and directories are still scanned, but the results are not reported.

+--------------------+-----------------------------------------------------------------------+
| **Default value**  | The default configuration may vary depending on the operating system. |
+--------------------+-----------------------------------------------------------------------+
| **Allowed values** | Any directory or file name.                                           |
+--------------------+-----------------------------------------------------------------------+

Attributes:

+----------+----------------------------------------------------------------------------------+
| **type** | This is a simple regex pattern to filter out files, so alerts are not generated. |
+          +--------------------------------------------+-------------------------------------+
|          | Allowed values                             | sregex                              |
+----------+--------------------------------------------+-------------------------------------+

Example:

.. code-block:: xml

 <ignore>/etc/mtab</ignore>
 <ignore type="sregex">.log$|.swp$</ignore>


.. _reference_ossec_syscheck_max_eps:

max_eps
-------

Sets the maximum event reporting throughput. Events are messages that will produce an alert.

+--------------------+---------------------------------------------------------+
| **Default value**  | 50                                                      |
+--------------------+---------------------------------------------------------+
| **Allowed values** | Integer number between 0 and 1000000. 0 means disabled. |
+--------------------+---------------------------------------------------------+

Example:

.. code-block:: xml

 <max_eps>50</max_eps>


.. _reference_ossec_syscheck_max_files_per_second:

max_files_per_second
--------------------

Sets the maximum number of files scanned per second. If this option is set to 0, there will be no limit on the number of files scanned per second.

+--------------------+---------------------------------------------------------+
| **Default value**  | 0                                                       |
+--------------------+---------------------------------------------------------+
| **Allowed values** | Integer positive number. 0 means no limit.              |
+--------------------+---------------------------------------------------------+

Example:

.. code-block:: xml

 <max_files_per_second>100</max_files_per_second>


.. _reference_ossec_syscheck_prefilter_cmd:

prefilter_cmd
-------------

Run to prevent prelinking from creating false positives.

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | Command to prevent prelinking. |
+--------------------+--------------------------------+

Example:

.. code-block:: xml

 <prefilter_cmd>/usr/sbin/prelink -y</prefilter_cmd>


.. note::

  This option may negatively impact performance as the configured command will be run for each file checked.

.. note::

  This option is ignored when defined at *agent.conf* if ``allow_remote_prefilter_cmd`` is set to ``no`` at *ossec.conf*.


.. _reference_ossec_syscheck_process_priority:

process_priority
----------------

Sets the nice value for Syscheck process.

+--------------------+------------------------------------+
| **Default value**  | 10                                 |
+--------------------+------------------------------------+
| **Allowed values** | Integer number between -20 and 19. |
+--------------------+------------------------------------+

The "niceness" scale in Linux goes from -20 to 19, whereas -20 is the highest priority and 19 the lowest priority.

For Windows the scale is translated as described in the following table:

+------------+------------------------------+
| -20 to -10 | THREAD_PRIORITY_HIGHEST      |
+------------+------------------------------+
| -9 to -5   | THREAD_PRIORITY_ABOVE_NORMAL |
+------------+------------------------------+
| -4 to 0    | THREAD_PRIORITY_NORMAL       |
+------------+------------------------------+
| 1 to 5     | THREAD_PRIORITY_BELOW_NORMAL |
+------------+------------------------------+
| 6 to 10    | THREAD_PRIORITY_LOWEST       |
+------------+------------------------------+
| 11 to 19   | THREAD_PRIORITY_IDLE         |
+------------+------------------------------+

Example:

.. code-block:: xml

 <process_priority>10</process_priority>


.. _reference_ossec_syscheck_registry_ignore:

registry_ignore
---------------

List of registry entries to be ignored. One entry per line. Multiple lines may be entered to include multiple registry entries.

+--------------------+-----------------------------------------------------------------------+
| **Default value**  | The default configuration may vary depending on the operating system. |
+--------------------+-----------------------------------------------------------------------+
| **Allowed values** | Any registry entry.                                                   |
+--------------------+-----------------------------------------------------------------------+

Attributes:

+----------+--------------------------------------------------------------------------------+
| **arch** | Select the Registry to ignore depending on the architecture.                   |
+          +------------------+-------------------------------------------------------------+
|          | Default value    | 32bit                                                       |
|          +------------------+-------------------------------------------------------------+
|          | Allowed values   | 32bit, 64bit, both                                          |
+----------+------------------+-------------------------------------------------------------+
| **type** | This is a simple regex pattern to filter out files so alerts are not generated.|
+          +------------------+-------------------------------------------------------------+
|          | Allowed values   |  sregex                                                     |
+----------+------------------+-------------------------------------------------------------+

Example:

.. code-block:: xml

 <registry_ignore>HKEY_LOCAL_MACHINE\Security\Policy\Secrets</registry_ignore>
 <registry_ignore type="sregex">\Enum$</registry_ignore>


.. _reference_ossec_syscheck_scan_day:

scan_day
--------

Day of the week to run the scans, one entry per line.

+--------------------+-------------------+
| **Default value**  | n/a               |
+--------------------+-------------------+
| **Allowed values** | Day of the week.  |
+--------------------+-------------------+

Example:

.. code-block:: xml

 <scan_day>thursday</scan_day>


.. _reference_ossec_syscheck_scan_time:

scan_time
---------

Time to run the scans. Times may be represented as 9pm or 8:30.

+--------------------+---------------+
| **Default value**  | n/a           |
+--------------------+---------------+
| **Allowed values** | Time of day.  |
+--------------------+---------------+

Example:

.. code-block:: xml

 <scan_time>8:30</scan_time>

.. note::

  This may delay the initialization of real-time scans.


.. _reference_ossec_syscheck_skip_dev:

skip_dev
--------

Specifies if syscheck should scan the ``/dev`` directory. This option works on Linux and FreeBSD systems.

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

Example:

.. code-block:: xml

 <skip_dev>yes</skip_dev>


.. _reference_ossec_syscheck_skip_nfs:

skip_nfs
--------

Specifies if syscheck should scan network mounted filesystems. This option works on Linux and FreeBSD systems. Currently, ``skip_nfs`` will exclude checking files on CIFS or NFS mounts.

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

Example:

.. code-block:: xml

 <skip_nfs>yes</skip_nfs>


.. _reference_ossec_syscheck_skip_proc:

skip_proc
---------

Specifies if syscheck should scan the ``/proc`` directory. This option works on Linux and FreeBSD systems.

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

Example:

.. code-block:: xml

 <skip_proc>yes</skip_proc>


.. _reference_ossec_syscheck_skip_sys:

skip_sys
--------

Specifies if syscheck should scan the ``/sys`` directory. This option works on Linux systems.

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

Example:

.. code-block:: xml

 <skip_sys>yes</skip_sys>



file_limit
----------

Specifies a limit on the number of files that FIM monitors. It ignores files added once the database reached the limit.

.. code-block:: xml

    <!-- Maximum number of files to be monitored -->
    <file_limit>
      <enabled>yes</enabled>
      <entries>100000</entries>
    </file_limit>


**enabled**

Specifies if the number of monitored entries has a limit.

+--------------------+---------------------------------------+
| **Default value**  | yes                                   |
+--------------------+---------------------------------------+
| **Allowed values** | yes/no                                |
+--------------------+---------------------------------------+


**entries**

Specifies the maximum number of files to monitor.

+--------------------+------------------------------------------+
| **Default value**  | 100000                                   |
+--------------------+------------------------------------------+
| **Allowed values** | Integer number between 1 and 2147483647. |
+--------------------+------------------------------------------+


registry_limit
--------------

.. note::

   This section only applies to Windows agents.

Specifies a limit on the number of registry entries that FIM monitors. It ignores registry values created once the database reached the limit.

.. code-block:: xml

   <!-- Maximum number of registries to be monitored -->
   <registry_limit>
     <enabled>yes</enabled>
     <entries>100000</entries>
   </registry_limit>

**enabled**

Specifies if the number of monitored entries has a limit.

+--------------------+---------------------------------------+
| **Default value**  | yes                                   |
+--------------------+---------------------------------------+
| **Allowed values** | yes/no                                |
+--------------------+---------------------------------------+

**entries**

Specifies the maximum number of registry entries to monitor.

+--------------------+------------------------------------------+
| **Default value**  | 100000                                   |
+--------------------+------------------------------------------+
| **Allowed values** | Integer number between 1 and 2147483647. |
+--------------------+------------------------------------------+


.. _reference_ossec_syscheck_synchronization:

synchronization
---------------

The database synchronization settings are configured inside this tag.

.. code-block:: xml

    <!-- Database synchronization settings -->
    <synchronization>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <max_interval>1h</max_interval>
      <response_timeout>30</response_timeout>
      <queue_size>16384</queue_size>
      <thread_pool>1</thread_pool>
      <max_eps>10</max_eps>
    </synchronization>


**enabled**

Specifies performing periodic inventory synchronizations.

+--------------------+---------------------------------------+
| **Default value**  | yes                                   |
+--------------------+---------------------------------------+
| **Allowed values** | yes/no                                |
+--------------------+---------------------------------------+

**registry_enabled**

On Windows agents, enables inventory synchronizations for registry entries. If ``enabled`` is set to no,
this parameter is ignored.

+--------------------+---------------------------------------+
| **Default value**  | yes                                   |
+--------------------+---------------------------------------+
| **Allowed values** | yes/no                                |
+--------------------+---------------------------------------+

**interval**

Specifies the initial time interval between every inventory synchronization. If the synchronization fails the value is duplicated until it reaches the value of ``max_interval``. If the synchronization succeds the value is restored.

+--------------------+-----------------------------------------------------------------------+
| **Default value**  | 5 m                                                                   |
+--------------------+-----------------------------------------------------------------------+
| **Allowed values** | Any number greater than or equal to 0. Allowed suffixes (s, m, h, d). |
+--------------------+-----------------------------------------------------------------------+

**max_interval**

Maximum time interval to trigger a synchronization. When a synchronization fails the interval is duplicated up to this maximum value.

+--------------------+-----------------------------------------------------------------------------------+
| **Default value**  | 1 h                                                                               |
+--------------------+-----------------------------------------------------------------------------------+
| **Allowed values** | Any integer greater than or equal to ``interval``. Allowed suffixes (s, m, h, d). |
+--------------------+-----------------------------------------------------------------------------------+

**response_timeout**

Waiting time in seconds since a sync message is sent or received for the next synchronization activity. If the agent doesn't send or receive a message in this interval the synchronization is marked as successful. If a synchronization is unsuccessful, the synchronization interval is doubled up to the ``max_interval`` value. This mechanism avoids synchronization overlapping.

+--------------------+----------------------------------------------------------------------+
| **Default value**  | 30                                                                   |
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Any number between 0 and ``interval``.                               |
+--------------------+----------------------------------------------------------------------+

**queue_size**

Specifies the queue size of the manager synchronization responses.

+--------------------+---------------------------------------+
| **Default value**  | 16384                                 |
+--------------------+---------------------------------------+
| **Allowed values** | Integer number between 2 and 1000000. |
+--------------------+---------------------------------------+

**thread_pool**

Specifies the number of threads that FIM database synchronization uses. FIM uses the lesser value of the configured value and the number of system CPU cores.

+--------------------+-----------------------------------------------------+
| **Default value**  | 1                                                   |
+--------------------+-----------------------------------------------------+
| **Allowed values** |  Any integer greater than 0.                        |
+--------------------+-----------------------------------------------------+

**max_eps**

Sets the maximum synchronization message throughput.

+--------------------+---------------------------------------------------------+
| **Default value**  | 10                                                      |
+--------------------+---------------------------------------------------------+
| **Allowed values** | Integer number between 0 and 1000000. 0 means disabled. |
+--------------------+---------------------------------------------------------+

.. _reference_ossec_syscheck_diff:

diff
----

The diff settings will be configured inside this tag.

.. code-block:: xml

    <diff>
      <disk_quota>
        <enabled>yes</enabled>
        <limit>1GB</limit>
      </disk_quota>
      <file_size>
        <enabled>yes</enabled>
        <limit>50MB</limit>
      </file_size>

      <nodiff>/etc/ssl/private.key</nodiff>
    </diff>

disk_quota
""""""""""

This option can be used to limit the size of the ``queue/diff/local`` folder where Wazuh stores the compressed files used to perform the diff operation when ``report_changes`` is enabled. After reaching this size, alerts will not show the diff information until the size is smaller than the configured limit.

**enabled**

Set the disk quota limit option to enabled or disabled.

+--------------------+---------------------------------------+
| **Default value**  | yes                                   |
+--------------------+---------------------------------------+
| **Allowed values** | yes/no                                |
+--------------------+---------------------------------------+

**limit**

Specifies the limit for the size of the ``queue/diff/local`` folder.

+--------------------+---------------------------------------------+
| **Default value**  | 1GB                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | Any positive number followed by KB/MB/GB    |
+--------------------+---------------------------------------------+

file_size
"""""""""

This option can be used to limit the size of the file which will report diff information with ``report_changes`` enabled. Files bigger than this limit will not report diff information until the size is smaller than the configured limit again.

**enabled**

Set the size limit of a file to enabled or disabled.

+--------------------+---------------------------------------+
| **Default value**  | yes                                   |
+--------------------+---------------------------------------+
| **Allowed values** | yes/no                                |
+--------------------+---------------------------------------+

**limit**

Specifies the limit for the size of files monitored with ``report_changes``.

+--------------------+---------------------------------------------+
| **Default value**  | 50MB                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any positive number followed by KB/MB/GB    |
+--------------------+---------------------------------------------+

.. _reference_ossec_syscheck_nodiff:

nodiff
""""""

List of files to not compute the diff (one entry per line). It could be used for sensitive files like a private key, credentials stored in a file, or database configuration, avoiding data leaking by sending the file content changes through alerts.

+--------------------+----------------------+
| **Allowed values** | Any file name.       |
+--------------------+----------------------+
| **Example**        | /etc/ssl/private.key |
+--------------------+----------------------+

Attributes:

+----------+---------------------------------------------------------------------------------+
| **type** | This is a simple regex pattern to filter out files so alerts are not generated. |
+          +--------------------------------------------+------------------------------------+
|          | Allowed values                             | sregex                             |
+----------+--------------------------------------------+------------------------------------+

.. _reference_ossec_syscheck_registry_nodiff:

registry_nodiff
"""""""""""""""

List of values to not compute the diff (one entry per line).

+--------------------+----------------------------------------------------+
| **Allowed values** | Any registry path, with value_name added.          |
+--------------------+----------------------------------------------------+
| **Example**        | HKEY_LOCAL_MACHINE\\SOFTWARE\\test_key\\value_name |
+--------------------+----------------------------------------------------+

Attributes:

+----------+---------------------------------------------------------------------------------+
| **type** | This is a simple regex pattern to filter out files so alerts are not generated. |
+          +--------------------------------------------+------------------------------------+
|          | Allowed values                             | sregex                             |
+----------+--------------------------------------------+------------------------------------+

.. _reference_ossec_syscheck_whodata:

whodata
-------

The Whodata options will be configured inside this tag.

.. code-block:: xml

    <!-- Whodata options -->
    <whodata>
        <restart_audit>yes</restart_audit>
        <audit_key>auditkey1,auditkey2</audit_key>
        <startup_healthcheck>yes</startup_healthcheck>
    </whodata>


**restart_audit**

Allows the system to restart ``Auditd`` after installing the plugin. Note that by setting this field to ``no`` the new
whodata rules won't be applied automatically.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+


**audit_key**

Sets up the FIM engine to collect the Audit events using keys with ``audit_key``. Wazuh will include in its FIM baseline those events being monitored by Audit using `audit_key`. For those systems where Audit is already set to monitor folders for other purposes, Wazuh can collect events generated as a key from `audit_key`. This option is only available for **Linux systems with Audit**.

+--------------------+------------------------------------+
| **Default value**  | Empty                              |
+--------------------+------------------------------------+
| **Allowed values** | Any string separated by commas     |
+--------------------+------------------------------------+


.. note:: Audit allow inserting spaces inside the keys, so the spaces inserted inside the field ``<audit_key>`` will be part of the key.


**startup_healthcheck**

Allows disabling the Audit health check during the Whodata engine starting. This option is only available for **Linux systems with Audit**.

+--------------------+------------+
| **Default value**  | yes        |
+--------------------+------------+
| **Allowed values** | yes, no    |
+--------------------+------------+

.. warning:: The health check ensures that the rules required by Whodata can be set in Audit correctly and also that the generated events can be obtained. Disabling the health check may cause functioning problems in Whodata and loss of FIM events.

For more information, please read :ref:`auditing who-data <who-data-monitoring>`


.. _reference_ossec_syscheck_windows_audit_interval:

windows_audit_interval
----------------------

Sets the frequency in seconds with which the Windows agent checks that the Local Audit Policies and the SACLs of the directories monitored in whodata mode are correct.

+--------------------+------------------------------------+
| **Default value**  | 300 seconds                        |
+--------------------+------------------------------------+
| **Allowed values** | Any number from 1 to 9999          |
+--------------------+------------------------------------+

Example:

.. code-block:: xml

 <windows_audit_interval>300</windows_audit_interval>


.. _reference_ossec_syscheck_windows_registry:

windows_registry
----------------

List of registry entries to be monitored. One entry per line. Multiple lines may be entered to include multiple registry entries.

.. versionadded:: 4.6.0

   To scan paths matching a pattern, you can use the wildcard characters ``?`` and ``*``. For example ``HKEY_LOCAL_MACHINE\SOFTWARE\*``. FIM uses these wildcards during scheduled scan.

+--------------------+----------------------------------------------------------------------+
| **Default value**  | The default configuration may vary depending on the operating system.|
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Any registry entry.                                                  |
+--------------------+----------------------------------------------------------------------+

Attributes:

+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **arch**                 | Select the Registry view depending on the architecture.                                                               |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | 32bit                                                    |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | 32bit, 64bit, both                                       |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **tags**                 | Add tags to alerts for monitored registry entries.                                                                    |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | Tags list separated by commas                            |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **report_changes**       | Report registry value changes. This is limited to REG_SZ, REG_MULTI_SZ, REG_DWORD, REG_DWORD_BIG_ENDIAN,              |
+                          +                                                                                                                       +
|                          | REG_QWORD value.                                                                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | no                                                       |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **diff_size_limit**      | Limit the maximum size of the value which will report diff information with ``report_changes`` enabled.               |
+                          +                                                                                                                       +
|                          | Values bigger than this size will not report diff information.                                                        |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | 50MB                                                     |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | Any positive number followed by KB/MB/GB                 |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_all**            | It modifies the value of all attributes with the prefix ``check_``.                                                   |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_sum**            | Check the MD5, SHA-1 and SHA-256 hashes of the registry.                                                              |
+                          +                                                                                                                       +
|                          | Same as using ``check_md5sum="yes"``, ``check_sha1sum="yes"`` and ``check_sha256sum="yes"`` at the same time.         |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_sha1sum**        | Check only the SHA-1 hash of the registries.                                                                          |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_md5sum**         | Check only the MD5 hash of the registries.                                                                            |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_sha256sum**      | Check only the SHA-256 hash of the registries.                                                                        |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_size**           | Check the size of the registries.                                                                                     |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_owner**          | Check the owner of the registries.                                                                                    |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_group**          | Check the group owner of the registries.                                                                              |
+                          +                                                                                                                       +
|                          | Just gid will be checked, group name will be blank.                                                                   |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_perm**           | Check the permission of the registries.                                                                               |
+                          +                                                                                                                       +
|                          | A list of denied and allowed permissions will be given for each user or group.                                        |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_mtime**          | Check the modification time of a registry.                                                                            |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_type**           | Check the type of a value. It is used to notify changes in the values of the monitored registry.                      |
+                          +                                                                                                                       +
|                          | This is limited to REG_NONE, REG_SZ, REG_EXPAND_SZ, REG_BINARY, REG_DWORD, REG_DWORD_BIG_ENDIAN, REG_LINK,            |
+                          +                                                                                                                       +
|                          | REG_MULTI_SZ, REG_RESOURCE_LIST, REG_FULL_RESOURCE_DESCRIPTOR, REG_RESOURCE_REQUIREMENTS_LIST, REG_QWORD.             |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **restrict_key**         | Limit checks to registries containing the entered sregex in the registry name.                                        |
+                          +                                                                                                                       +
|                          | Any registry is allowed.                                                                                              |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | N/A                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed value                                              | sregex                                                   |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **restrict_value**       | Limit checks to registry values containing the entered sregex in the value name.                                      |
+                          +                                                                                                                       +
|                          | Any registry value is allowed.                                                                                        |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | N/A                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed value                                              | sregex                                                   |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **recursion_level**      | Limits the maximum level of recursion allowed.                                                                        |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | 512                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | Any integer between 0 and 512                            |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+

Example:

.. code-block:: xml

 <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Classes\Protocols</windows_registry>
 <windows_registry arch="both" restrict_value="^some_value_name$">HKEY_LOCAL_MACHINE\Software\Policies</windows_registry>
 <windows_registry tags="services-registry">HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services</windows_registry>
 <windows_registry arch="both" check_sum="no">HKEY_LOCAL_MACHINE\SOFTWARE\test_key</windows_registry>
 <windows_registry arch="64bit" recursion_level="3">HKEY_LOCAL_MACHINE\SYSTEM\Setup</windows_registry>


.. versionadded:: 4.6.0

Configurations with specific registry keys take precedence over those that use wildcards. The following configuration block provides an example. The first settings line enables scanning the ``SOFTWARE`` keys of all users without checking any hashes.

.. code-block:: xml
   :emphasize-lines: 1

   <windows_registry arch="both" check_sum="no">HKEY_LOCAL_MACHINE\SOFTWARE\*</windows_registry>
   <windows_registry arch="both" check_sum="yes">HKEY_LOCAL_MACHINE\SOFTWARE\TEST_KEY</windows_registry>

However, the second line does enable hash checking for ``TEST_KEY``. This is a specific key and this setting takes precedence here.

.. code-block:: xml
   :emphasize-lines: 2

   <windows_registry arch="both" check_sum="no">HKEY_LOCAL_MACHINE\SOFTWARE\*</windows_registry>
   <windows_registry arch="both" check_sum="yes">HKEY_LOCAL_MACHINE\SOFTWARE\TEST_KEY</windows_registry>

.. _reference_ossec_syscheck_default_configuration:

Default syscheck configuration:
-------------------------------



.. tabs::

 .. group-tab:: Wazuh manager

  .. code-block:: xml

   <!-- File integrity monitoring -->
   <syscheck>
    <disabled>no</disabled>
    <!-- Frequency that syscheck is executed default every 12 hours -->
    <frequency>43200</frequency>
    <scan_on_start>yes</scan_on_start>
    <!-- Generate alert when new file detected -->
    <alert_new_files>yes</alert_new_files>
    <!-- Don't ignore files that change more than 'frequency' times -->
    <auto_ignore frequency="10" timeframe="3600">no</auto_ignore>
    <!-- Directories to check  (perform all possible verifications) -->
    <directories>/etc,/usr/bin,/usr/sbin</directories>
    <directories>/bin,/sbin,/boot</directories>
    <!-- Files/directories to ignore -->
    <ignore>/etc/mtab</ignore>
    <ignore>/etc/hosts.deny</ignore>
    <ignore>/etc/mail/statistics</ignore>
    <ignore>/etc/random-seed</ignore>
    <ignore>/etc/random.seed</ignore>
    <ignore>/etc/adjtime</ignore>
    <ignore>/etc/httpd/logs</ignore>
    <ignore>/etc/utmpx</ignore>
    <ignore>/etc/wtmpx</ignore>
    <ignore>/etc/cups/certs</ignore>
    <ignore>/etc/dumpdates</ignore>
    <ignore>/etc/svc/volatile</ignore>
    <!-- File types to ignore -->
    <ignore type="sregex">.log$|.swp$</ignore>
    <!-- Check the file, but never compute the diff -->
    <nodiff>/etc/ssl/private.key</nodiff>
    <skip_nfs>yes</skip_nfs>
    <skip_dev>yes</skip_dev>
    <skip_proc>yes</skip_proc>
    <skip_sys>yes</skip_sys>
    <!-- Nice value for Syscheck process -->
    <process_priority>10</process_priority>
    <!-- Maximum output throughput -->
    <max_eps>50</max_eps>
    <!-- Database synchronization settings -->
    <synchronization>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <max_eps>10</max_eps>
    </synchronization>
   </syscheck>

 .. group-tab:: Wazuh agent - Linux/Unix

  .. code-block:: xml

   <!-- File integrity monitoring -->
   <syscheck>
    <disabled>no</disabled>
    <!-- Frequency that syscheck is executed default every 12 hours -->
    <frequency>43200</frequency>
    <scan_on_start>yes</scan_on_start>
    <!-- Directories to check  (perform all possible verifications) -->
    <directories>/etc,/usr/bin,/usr/sbin</directories>
    <directories>/bin,/sbin,/boot</directories>
    <!-- Files/directories to ignore -->
    <ignore>/etc/mtab</ignore>
    <ignore>/etc/hosts.deny</ignore>
    <ignore>/etc/mail/statistics</ignore>
    <ignore>/etc/random-seed</ignore>
    <ignore>/etc/random.seed</ignore>
    <ignore>/etc/adjtime</ignore>
    <ignore>/etc/httpd/logs</ignore>
    <ignore>/etc/utmpx</ignore>
    <ignore>/etc/wtmpx</ignore>
    <ignore>/etc/cups/certs</ignore>
    <ignore>/etc/dumpdates</ignore>
    <ignore>/etc/svc/volatile</ignore>
    <!-- File types to ignore -->
    <ignore type="sregex">.log$|.swp$</ignore>
    <!-- Check the file, but never compute the diff -->
    <nodiff>/etc/ssl/private.key</nodiff>
    <skip_nfs>yes</skip_nfs>
    <skip_dev>yes</skip_dev>
    <skip_proc>yes</skip_proc>
    <skip_sys>yes</skip_sys>
    <!-- Nice value for Syscheck process -->
    <process_priority>10</process_priority>
    <!-- Maximum output throughput -->
    <max_eps>50</max_eps>
    <!-- Database synchronization settings -->
    <synchronization>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <max_eps>10</max_eps>
    </synchronization>
   </syscheck>


 .. group-tab:: Wazuh agent - Windows

  .. code-block:: xml

   <!-- File integrity monitoring -->
   <syscheck>
    <disabled>no</disabled>
    <!-- Frequency that syscheck is executed default every 12 hours -->
    <frequency>43200</frequency>
    <!-- Default files to be monitored. -->
    <directories recursion_level="0" restrict="regedit.exe$|system.ini$|win.ini$">%WINDIR%</directories>
    <directories recursion_level="0" restrict="at.exe$|attrib.exe$|cacls.exe$|cmd.exe$|eventcreate.exe$|ftp.exe$|lsass.exe$|net.exe$|net1.exe$|netsh.exe$|reg.exe$|regedt32.exe|regsvr32.exe|runas.exe|sc.exe|schtasks.exe|sethc.exe|subst.exe$">%WINDIR%\SysNative</directories>
    <directories recursion_level="0">%WINDIR%\SysNative\drivers\etc</directories>
    <directories recursion_level="0" restrict="WMIC.exe$">%WINDIR%\SysNative\wbem</directories>
    <directories recursion_level="0" restrict="powershell.exe$">%WINDIR%\SysNative\WindowsPowerShell\v1.0</directories>
    <directories recursion_level="0" restrict="winrm.vbs$">%WINDIR%\SysNative</directories>
    <!-- 32-bit programs. -->
    <directories recursion_level="0" restrict="at.exe$|attrib.exe$|cacls.exe$|cmd.exe$|eventcreate.exe$|ftp.exe$|lsass.exe$|net.exe$|net1.exe$|netsh.exe$|reg.exe$|regedit.exe$|regedt32.exe$|regsvr32.exe$|runas.exe$|sc.exe$|schtasks.exe$|sethc.exe$|subst.exe$">%WINDIR%\System32</directories>
    <directories recursion_level="0">%WINDIR%\System32\drivers\etc</directories>
    <directories recursion_level="0" restrict="WMIC.exe$">%WINDIR%\System32\wbem</directories>
    <directories recursion_level="0" restrict="powershell.exe$">%WINDIR%\System32\WindowsPowerShell\v1.0</directories>
    <directories recursion_level="0" restrict="winrm.vbs$">%WINDIR%\System32</directories>
    <directories realtime="yes">%PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs\Startup</directories>
    <ignore>%PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs\Startup\desktop.ini</ignore>
    <ignore type="sregex">.log$|.htm$|.jpg$|.png$|.chm$|.pnf$|.evtx$</ignore>
    <!-- Windows registry entries to monitor. -->
    <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\batfile</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\cmdfile</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\comfile</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\exefile</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\piffile</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\AllFilesystemObjects</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\Directory</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\Folder</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Classes\Protocols</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Policies</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\Security</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Internet Explorer</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\KnownDLLs</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\SecurePipeServers\winreg</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnce</windows_registry>
    <windows_registry>HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnceEx</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\URL</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Windows</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Winlogon</windows_registry>
    <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Active Setup\Installed Components</windows_registry>
    <!-- Windows registry entries to ignore. -->
    <registry_ignore>HKEY_LOCAL_MACHINE\Security\Policy\Secrets</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\Security\SAM\Domains\Account\Users</registry_ignore>
    <registry_ignore type="sregex">\Enum$</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\AppCs</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\DHCP</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\IPTLSIn</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\IPTLSOut</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\RPC-EPMap</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\Teredo</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\PolicyAgent\Parameters\Cache</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnceEx</registry_ignore>
    <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\ADOVMPPackage\Final</registry_ignore>
    <!-- Frequency for ACL checking (seconds) -->
    <windows_audit_interval>60</windows_audit_interval>
    <!-- Nice value for Syscheck module -->
    <process_priority>10</process_priority>
    <!-- Maximum output throughput -->
    <max_eps>50</max_eps>
    <!-- Database synchronization settings -->
    <synchronization>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <max_eps>10</max_eps>
    </synchronization>
   </syscheck>



 .. group-tab:: Wazuh agent - MacOS X

  .. code-block:: xml

   <!-- File integrity monitoring -->
   <syscheck>
    <disabled>no</disabled>
    <!-- Frequency that syscheck is executed default every 12 hours -->
    <frequency>43200</frequency>
    <scan_on_start>yes</scan_on_start>
    <!-- Directories to check  (perform all possible verifications) -->
    <directories>/etc,/usr/bin,/usr/sbin</directories>
    <directories>/bin,/sbin</directories>
    <!-- Files/directories to ignore -->
    <ignore>/etc/mtab</ignore>
    <ignore>/etc/hosts.deny</ignore>
    <ignore>/etc/mail/statistics</ignore>
    <ignore>/etc/random-seed</ignore>
    <ignore>/etc/random.seed</ignore>
    <ignore>/etc/adjtime</ignore>
    <ignore>/etc/httpd/logs</ignore>
    <ignore>/etc/utmpx</ignore>
    <ignore>/etc/wtmpx</ignore>
    <ignore>/etc/cups/certs</ignore>
    <ignore>/etc/dumpdates</ignore>
    <ignore>/etc/svc/volatile</ignore>
    <!-- File types to ignore -->
    <ignore type="sregex">.log$|.swp$</ignore>
    <!-- Check the file, but never compute the diff -->
    <nodiff>/etc/ssl/private.key</nodiff>
    <skip_nfs>yes</skip_nfs>
    <skip_dev>yes</skip_dev>
    <skip_proc>yes</skip_proc>
    <skip_sys>yes</skip_sys>
    <!-- Nice value for Syscheck process -->
    <process_priority>10</process_priority>
    <!-- Maximum output throughput -->
    <max_eps>50</max_eps>
    <!-- Database synchronization settings -->
    <synchronization>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <max_eps>10</max_eps>
    </synchronization>
   </syscheck>
