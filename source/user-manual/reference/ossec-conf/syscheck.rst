.. _reference_ossec_syscheck:


syscheck
=============

.. topic:: XML section name

	.. code-block:: xml

		<syscheck>


Configuration options for file integrity monitoring.

Options
-------

- `directories`_
- `ignore`_
- `frequency`_
- `scan_time`_
- `scan_day`_
- `auto_ignore`_
- `alert_new_files`_
- `scan_on_start`_
- `windows_registry`_
- `registry_ignore`_
- `prefilter_cmd`_
- `skip_nfs`_

.. _reference_ossec_syscheck_directories:

directories
^^^^^^^^^^^

Use this option to add or remove directories to be monitored. The directories must be comma separated.

All files and subdirectories within the noted directories will also be monitored.

Drive letters without directories are not valid. At a minimum the '.' should be included (``D:\.``).

This is to be set on the system to be monitored (or in the ``agent.conf``, if appropriate).

+--------------------+------------------------------------+
| **Default Value**  | /etc,/usr/bin,/usr/sbin,/bin,/sbin |
+--------------------+------------------------------------+
| **Allowed values** | Any directory                      |
+--------------------+------------------------------------+

Atributes:

+--------------------+-----------------------------------------------------------------------------------------------------------------+
| **realtime**       | This will enable real-time/continuous monitoring on Linux (using the inotify system calls) and Windows systems. |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **report_changes** | Report file changes. This is limited to text files at this time.                                                |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **check_all**      | All the following check_* options are used together.                                                            |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **check_sum**      | Check the MD5 and SHA-1 hashes of the files.                                                                    |
|                    |                                                                                                                 |
|                    | Same as using both check_sha1sum="yes" and check_md5sum="yes"                                                   |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **check_sha1sum**  | Check only the SHA-1 hash of the files.                                                                         |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **check_md5sum**   | Check only the MD5 hash of the files.                                                                           |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **check_size**     | Check the size of the files.                                                                                    |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **check_owner**    | Check the owner of the files.                                                                                   |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **check_group**    | Check the group owner of the files/directories.                                                                 |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **check_perm**     | Check the UNIX permission of the files/directories.                                                             |
|                    |                                                                                                                 |
|                    | On Windows, this will only check the POSIX permissions.                                                         |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | yes                                                |
+--------------------+------------------------------------------------------------+----------------------------------------------------+
| **restrict**       | Limit checks to files containing the entered string in the file name.                                           |
|                    |                                                                                                                 |
|                    | Any directory or file name (but not a path) is allowed                                                          |
+                    +------------------------------------------------------------+----------------------------------------------------+
|                    | Allowed Value                                              | string                                             |
+--------------------+------------------------------------------------------------+----------------------------------------------------+

.. _reference_ossec_syscheck_ignore:

ignore
^^^^^^

List of files or directories to be ignored (one entry per line). Multiple lines may be entered to include multiple files or directories.  These files and directories are still checked, but the results are ignored.

+--------------------+----------------------------+
| **Default Value**  | /etc/mtab                  |
+--------------------+----------------------------+
| **Allowed values** | Any directory or file name |
+--------------------+----------------------------+

Attributes:

+----------+--------------------------------------------------------------------------------+
| **type** | This is a simple regex pattern to filter out files so alerts are not generated |
+          +--------------------------------------------+-----------------------------------+
|          | Allowed Values                             | sregex                            |
+----------+--------------------------------------------+-----------------------------------+

.. _reference_ossec_syscheck_frequency:

frequency
^^^^^^^^^^^

Frequency that the syscheck will be run (in seconds)

+--------------------+------------------------------------+
| **Default Value**  | 21600                              |
+--------------------+------------------------------------+
| **Allowed values** | A positive number, time in seconds |
+--------------------+------------------------------------+

scan_time
^^^^^^^^^^^

Time to run the scans. Times may be represented as 21pm or 8:30

+--------------------+-------------+
| **Default Value**  | n/a         |
+--------------------+-------------+
| **Allowed values** | Time of day |
+--------------------+-------------+

.. note::

   This may delay the initialization of real-time scans.

scan_day
^^^^^^^^^

Day of the week to run the scans(one entry per line). Multiple lines may be entered to include multiple registry entries.

+--------------------+-----------------+
| **Default Value**  | n/a             |
+--------------------+-----------------+
| **Allowed values** | Day of the week |
+--------------------+-----------------+

auto_ignore
^^^^^^^^^^^

Specifies whether or not syscheck will ignore files that change too many times (after the third change)

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. note::

   It is valid on: server and local

.. _reference_ossec_syscheck_alert_new_files:

alert_new_files
^^^^^^^^^^^^^^^^

Specifies if syscheck should alert when new files are created

+--------------------+---------+
| **Default Value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. note::

   New files will only be detected on a full scan (server or local). This option does not work in realtime.

.. _reference_ossec_syscheck_scan_start:

scan_on_start
^^^^^^^^^^^^^

Specifies if syscheck scans immediately when started.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+


windows_registry
^^^^^^^^^^^^^^^^

Use this option to monitor specified Windows registry entries (one entry per line). Multiple lines may be entered to include multiple registry entries.

+--------------------+------------------------------+
| **Default Value**  | HKEY_LOCAL_MACHINE\\Software |
+--------------------+------------------------------+
| **Allowed values** | Any registry entry           |
+--------------------+------------------------------+

Atributes:

+----------+---------------------------------------------------------+
| **arch** | Select the Registry view depending on the architecture. |
+          +------------------+--------------------------------------+
|          | Default value    | 32bit                                |
|          +------------------+--------------------------------------+
|          | Allowed values   | 32bit, 64bit, both                   |
+----------+------------------+--------------------------------------+


.. note::

   New entries will not trigger alerts, only changes to existing entries.

registry_ignore
^^^^^^^^^^^^^^^

List of registry entries to be ignored.  (one entry per line). Multiple lines may be entered to include multiple registry entries.

+--------------------+--------------------+
| **Default Value**  | ..CryptographyRNG  |
+--------------------+--------------------+
| **Allowed values** | Any registry entry |
+--------------------+--------------------+

prefilter_cmd
^^^^^^^^^^^^^^

Run to prevent prelinking from creating false positives.

+--------------------+-------------------------------+
| **Default Value**  | n/a                           |
+--------------------+-------------------------------+
| **Allowed values** | Command to prevent prelinking |
+--------------------+-------------------------------+

Example:
.. code-block:: xml

  <prefilter_cmd>/usr/sbin/prelink -y</prefilter_cmd>


.. note::

   This option may negatively impact performance as the configured command will be run for each file checked.

skip_nfs
^^^^^^^^

Specifies if syscheck should scan network mounted filesystems (Works on Linux and FreeBSD). Currently, skip_nfs will exclude checking files on CIFS or NFS mounts.

+--------------------+---------+
| **Default Value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+
