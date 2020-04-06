.. Copyright (C) 2019 Wazuh, Inc.

.. _reference_ossec_syscheck:

syscheck
=============

.. topic:: XML section name

	.. code-block:: xml

		<syscheck>
		</syscheck>


Configuration options for file integrity monitoring.

Options
-------

- `directories`_
- `ignore`_
- `nodiff`_
- `frequency`_
- `scan_time`_
- `scan_day`_
- `auto_ignore`_
- `alert_new_files`_
- `scan_on_start`_
- `windows_registry`_
- `registry_ignore`_
- `allow_remote_prefilter_cmd`_
- `prefilter_cmd`_
- `skip_nfs`_
- `skip_dev`_
- `skip_sys`_
- `skip_proc`_
- `remove_old_diff`_
- `restart_audit`_
- `windows_audit_interval`_
- `whodata`_
- `process_priority`_
- `synchronization`_
- `max_eps`_
- `database`_

.. _reference_ossec_syscheck_directories:

directories
^^^^^^^^^^^

Use this option to add or remove directories to be monitored. The directories must be comma separated.

All files and subdirectories within the noted directories will also be monitored.

Drive letters without directories are not valid. At a minimum the '.' should be included (``D:\.``).

This is to be set on the system to be monitored (or in the ``agent.conf``, if appropriate).

There exists a limit in the number of directories that can be written in one line separated by commas, this is limited to 64 directories.

+--------------------+------------------------------------+
| **Default value**  | /etc,/usr/bin,/usr/sbin,/bin,/sbin |
+--------------------+------------------------------------+
| **Allowed values** | Any directory                      |
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
+                          +                                                                                                                       +
|                          | Available for Windows.                                                                                                |
+                          +                                                                                                                       +
|                          | .. versionadded:: 3.8.0                                                                                               |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_mtime**          | Check the modification time of a file.                                                                                |
+                          +                                                                                                                       +
|                          | .. versionadded:: 2.0                                                                                                 |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **check_inode**          | Check the file inode.                                                                                                 |
+                          +                                                                                                                       +
|                          | Available for UNIX. On Windows, inode will always be 0.                                                               |
+                          +                                                                                                                       +
|                          | .. versionadded:: 2.0                                                                                                 |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | yes                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | yes, no                                                  |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **restrict**             | Limit checks to files containing the entered string in the file name.                                                 |
+                          +                                                                                                                       +
|                          | Any directory or file name (but not a path) is allowed                                                                |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | N/A                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed value                                              | sregex                                                   |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **tags**                 | Add tags to alerts for monitored directories.                                                                         |
+                          +                                                                                                                       +
|                          | .. versionadded:: 3.6.0                                                                                               |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | N/A                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | Tags list separated by commas                            |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **recursion_level**      | Limits the maximum level of recursion allowed.                                                                        |
+                          +                                                                                                                       +
|                          | .. versionadded:: 3.6.0                                                                                               |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Default value                                              | 256                                                      |
+                          +------------------------------------------------------------+----------------------------------------------------------+
|                          | Allowed values                                             | Any integer between 0 and 320                            |
+--------------------------+------------------------------------------------------------+----------------------------------------------------------+
| **follow_symbolic_link** | The setting is available for UNIX systems and only applies when a symbolic link is set in the configuration directly. |
+                          +                                                                                                                       +
|                          | When this flag is enabled, the link is followed and its content is monitored. Otherwise, the own link is monitored.   |
+                          +                                                                                                                       +
|                          | .. versionadded:: 3.8.0                                                                                               |
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

.. _reference_ossec_syscheck_ignore:

ignore
^^^^^^

List of files or directories to be ignored (one entry per line). Multiple lines may be entered to include multiple files or directories.  These files and directories are still checked, but the results are ignored.

+--------------------+-----------------------------+
| **Allowed values** | Any directory or file name. |
+--------------------+-----------------------------+
| **Example**        | /etc/mtab                   |
+--------------------+-----------------------------+

Attributes:

+----------+---------------------------------------------------------------------------------+
| **type** | This is a simple regex pattern to filter out files so alerts are not generated. |
+          +--------------------------------------------+------------------------------------+
|          | Allowed values                             | sregex                             |
+----------+--------------------------------------------+------------------------------------+

nodiff
^^^^^^

List of files to not compute the diff (one entry per line). It could be used for sensitive files like a private key, credentials stored in a file or database configuration, avoiding data leaking by sending the file content changes through alerts.

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

.. _reference_ossec_syscheck_frequency:

frequency
^^^^^^^^^^^

Frequency that the syscheck will be run (in seconds).

+--------------------+-------------------------------------+
| **Default value**  | 43200                               |
+--------------------+-------------------------------------+
| **Allowed values** | A positive number, time in seconds. |
+--------------------+-------------------------------------+

scan_time
^^^^^^^^^^^

Time to run the scans. Times may be represented as 9pm or 8:30.

+--------------------+---------------+
| **Default value**  | n/a           |
+--------------------+---------------+
| **Allowed values** | Time of day.  |
+--------------------+---------------+

.. note::

   This may delay the initialization of real-time scans.

scan_day
^^^^^^^^^

Day of the week to run the scans(one entry per line). Multiple lines may be entered to include multiple registry entries.

+--------------------+-------------------+
| **Default value**  | n/a               |
+--------------------+-------------------+
| **Allowed values** | Day of the week.  |
+--------------------+-------------------+

auto_ignore
^^^^^^^^^^^

Specifies whether or not syscheck will ignore files that change too many times (manager only).

+--------------------+----------+
| **Default value**  | no       |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

Attributes:

+---------------+------------------------------------------------------------------------------+
| **frequency** | Number of times the alert can be repeated in the'timeframe' time interval.   |
|               +------------------+-----------------------------------------------------------+
|               | Default value    | 10                                                        |
|               +------------------+-----------------------------------------------------------+
|               | Allowed values   | Any number between 1 and 99.                              |
+---------------+------------------+-----------------------------------------------------------+
| **timeframe** | Time interval in which the number of alerts generated by a file accumulates. |
|               +------------------+-----------------------------------------------------------+
|               | Default value    | 3600                                                      |
|               +------------------+-----------------------------------------------------------+
|               | Allowed values   | Any number between 1 and 43200.                           |
+---------------+------------------+-----------------------------------------------------------+

.. note::

   It is valid on: server and local.

.. _reference_ossec_syscheck_alert_new_files:

alert_new_files
^^^^^^^^^^^^^^^^

Specifies if syscheck should alert when new files are created.

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

.. note::

   It is valid on: server and local.

.. _reference_ossec_syscheck_scan_start:

scan_on_start
^^^^^^^^^^^^^

Specifies if syscheck scans immediately when started.

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+


windows_registry
^^^^^^^^^^^^^^^^

Use this option to monitor specified Windows registry entries (one entry per line). Multiple lines may be entered to include multiple registry entries.

+--------------------+------------------------------+
| **Default value**  | HKEY_LOCAL_MACHINE\\Software |
+--------------------+------------------------------+
| **Allowed values** | Any registry entry.          |
+--------------------+------------------------------+

Attributes:

+----------+---------------------------------------------------------+
| **arch** | Select the Registry view depending on the architecture. |
+          +------------------+--------------------------------------+
|          | Default value    | 32bit                                |
|          +------------------+--------------------------------------+
|          | Allowed values   | 32bit, 64bit, both                   |
+----------+------------------+--------------------------------------+
| **tags** | Add tags to alerts for monitored registry entries.      |
+          +                                                         +
|          | .. versionadded:: 3.6.0                                 |
+          +------------------+--------------------------------------+
|          | Allowed values   | Tags list separated by commas        |
+----------+------------------+--------------------------------------+


.. note::

   New entries will not trigger alerts, only changes to existing entries.

registry_ignore
^^^^^^^^^^^^^^^

List of registry entries to be ignored. (one entry per line). Multiple lines may be entered to include multiple registry entries.

+--------------------+---------------------+
| **Default value**  | n/a                 |
+--------------------+---------------------+
| **Allowed values** | Any registry entry. |
+--------------------+---------------------+

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

allow_remote_prefilter_cmd
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 3.11.0

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

   This option only can be activate from the agent side, in its own ``ossec.conf``.

prefilter_cmd
^^^^^^^^^^^^^^

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

skip_nfs
^^^^^^^^

Specifies if syscheck should scan network mounted filesystems (Works on Linux and FreeBSD). Currently, skip_nfs will exclude checking files on CIFS or NFS mounts.

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

skip_dev
^^^^^^^^

.. versionadded:: 3.12.0

Specifies if syscheck should scan the `/dev` directory. (Works on Linux and FreeBSD).

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

skip_sys
^^^^^^^^

.. versionadded:: 3.12.0

Specifies if syscheck should scan the `/sys` directory. (Works on Linux).

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

skip_proc
^^^^^^^^^

.. versionadded:: 3.12.0

Specifies if syscheck should scan the `/proc` directory. (Works on Linux and FreeBSD).

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

remove_old_diff
^^^^^^^^^^^^^^^

.. versionadded:: 3.4.0
.. deprecated:: 3.8.0

Specifies if Syscheck should delete the local snapshots that are not currently being monitored. Since version 3.8.0, Syscheck will always purge those snapshots.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

restart_audit
^^^^^^^^^^^^^

.. versionadded:: 3.5.0
.. deprecated:: 3.9.0

.. note::  This option is set inside the ``<whodata>`` tag since version 3.9.0.

Allow the system to restart `Auditd` after installing the plugin. Note that setting this field to ``no`` the new
whodata rules won't be applied automatically.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

windows_audit_interval
^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 3.5.0

This option sets the frequency in seconds with which the Windows agent will check that the SACLs of the directories monitored in whodata mode are correct.

+--------------------+------------------------------------+
| **Default value**  | 300 seconds                        |
+--------------------+------------------------------------+
| **Allowed values** | Any number from 1 to 9999          |
+--------------------+------------------------------------+


whodata
^^^^^^^

.. versionadded:: 3.7.1

The Whodata options will be configured inside this tag.

.. code-block:: xml

    <!-- Whodata options -->
    <whodata>
        <restart_audit>yes</restart_audit>
        <audit_key>auditkey1,auditkey2</audit_key>
        <startup_healthcheck>yes</startup_healthcheck>
    </whodata>


**restart_audit**

.. versionadded:: 3.9.0

Allow the system to restart `Auditd` after installing the plugin. Note that setting this field to ``no`` the new
whodata rules won't be applied automatically.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+


**audit_key**

.. versionadded:: 3.7.1

Set up the FIM engine to collect the Audit events using keys with ``audit_key``. Wazuh will include in its FIM baseline those events being monitored by Audit using `audit_key`. For those systems where Audit is already set to monitor folders for other purposes, Wazuh can collect events generated as a key from `audit_key`. This option is only available for **Linux systems with Audit**.

+--------------------+------------------------------------+
| **Default value**  | Empty                              |
+--------------------+------------------------------------+
| **Allowed values** | Any string separated by commas     |
+--------------------+------------------------------------+


.. note:: Audit allow inserting spaces inside the keys, so the spaces inserted inside the field ``<audit_key>`` will be part of the key.


**startup_healthcheck**

.. versionadded:: 3.9.0

This option allows to disable the Audit health check during the Whodata engine starting. This option is only available for **Linux systems with Audit**.

+--------------------+------------+
| **Default value**  | yes        |
+--------------------+------------+
| **Allowed values** | yes, no    |
+--------------------+------------+

.. warning:: The health check ensures that the rules required by Whodata can be set in Audit correctly and also that the generated events can be obtained. Disabling the health check may cause functioning problems in Whodata and loss of FIM events.


process_priority
^^^^^^^^^^^^^^^^

.. versionadded:: 3.12.0

Set the nice value for Syscheck process.

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


max_eps
^^^^^^^

.. versionadded:: 3.12.0

Set the maximum event reporting throughput. Events are messages that will produce an alert.

+--------------------+---------------------------------------------------------+
| **Default value**  | 100                                                     |
+--------------------+---------------------------------------------------------+
| **Allowed values** | Integer number between 0 and 1000000. 0 means disabled. |
+--------------------+---------------------------------------------------------+


database
^^^^^^^^

.. versionadded:: 3.12.0

Specify where is the database going to be stored.

+--------------------+---------------------------------------+
| **Default value**  | disk                                  |
+--------------------+---------------------------------------+
| **Allowed values** | disk, memory                          |
+--------------------+---------------------------------------+

.. _reference_ossec_syscheck_synchronization:

synchronization
^^^^^^^^^^^^^^^

.. versionadded:: 3.12.0

The database synchronization settings will be configured inside this tag.

.. code-block:: xml

    <!-- Database synchronization settings -->
    <synchronization>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <max_interval>1h</max_interval>
      <response_timeout>30</response_timeout>
      <sync_queue_size>16384</sync_queue_size>
      <max_eps>10</max_eps>
    </synchronization>


**enabled**

.. versionadded:: 3.12.0

Specifies whether there will be periodic inventory synchronizations or not.

+--------------------+---------------------------------------+
| **Default value**  | yes                                   |
+--------------------+---------------------------------------+
| **Allowed values** | yes/no                                |
+--------------------+---------------------------------------+

**interval**

.. versionadded:: 3.12.0

Specifies the initial number of seconds between every inventory synchronization. If synchronization fails
the value will be duplicated until it reaches the value of ``max_interval``.

+--------------------+----------------------------------------------------------------------+
| **Default value**  | 300 s                                                                |
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Any number greater than or equal to 0. Allowed sufixes (s, m, h, d). |
+--------------------+----------------------------------------------------------------------+

**max_interval**

.. versionadded:: 3.12.0

Specifies the maximum number of seconds between every inventory synchronization.

+--------------------+-----------------------------------------------------------------------------+
| **Default value**  | 1 h                                                                         |
+--------------------+-----------------------------------------------------------------------------+
| **Allowed values** | Any number greater than or equal to interval. Allowed sufixes (s, m, h, d). |
+--------------------+-----------------------------------------------------------------------------+

**response_timeout**

.. versionadded:: 3.12.0

Specifies the time elapsed in seconds since the agent sends the message to the manager and receives the response.
If the response is not received in this interval, the message is marked as unanswered (timed-out) and the agent
may start a new synchronization session at the defined interval.

+--------------------+---------------------------------------+
| **Default value**  | 30                                    |
+--------------------+---------------------------------------+
| **Allowed values** | Any number greater than or equal to 0.|
+--------------------+---------------------------------------+

**queue_size**

.. versionadded:: 3.12.0

Specifies the queue size of the manager synchronization responses.

+--------------------+---------------------------------------+
| **Default value**  | 16384                                 |
+--------------------+---------------------------------------+
| **Allowed values** | Integer number between 2 and 1000000. |
+--------------------+---------------------------------------+

**max_eps**

.. versionadded:: 3.12.0

Set the maximum synchronization message throughput.

+--------------------+---------------------------------------------------------+
| **Default value**  | 10                                                      |
+--------------------+---------------------------------------------------------+
| **Allowed values** | Integer number between 0 and 1000000. 0 means disabled. |
+--------------------+---------------------------------------------------------+



Default Unix configuration
--------------------------

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
    <max_eps>100</max_eps>

    <!-- Database synchronization settings -->
    <synchronization>
      <interval>5m</interval>
      <max_interval>1h</max_interval>
      <max_eps>10</max_eps>
    </synchronization>
  </syscheck>
