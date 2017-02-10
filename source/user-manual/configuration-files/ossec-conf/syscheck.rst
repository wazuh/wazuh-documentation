.. _reference_ossec_syscheck:


Syscheck
=============

.. topic:: XML section name

	.. code-block:: xml

		<syscheck>


Configuration related to file integrity monitoring.

+---------------------+----------------------------------------------+
| Options             | Allowed values                               |
+=====================+==============================================+
| `directories`_      | Any directory                                |
+---------------------+----------------------------------------------+
| `ignore`_           | Any directory or file name                   |
+---------------------+----------------------------------------------+
| `frequency`_        | A positive number (seconds)                  |
+---------------------+----------------------------------------------+
| `scan_time`_        | Time                                         |
+---------------------+----------------------------------------------+
| `scan_day`_         | Day of the week                              |
+---------------------+----------------------------------------------+
| `auto_ignore`_      | yes, no                                      |
+---------------------+----------------------------------------------+
| `alert_new_files`_  | yes, no                                      |
+---------------------+----------------------------------------------+
| `scan_on_start`_    | yes, no                                      |
+---------------------+----------------------------------------------+
| `windows_registry`_ | Any registry entry (one per element)         |
+---------------------+----------------------------------------------+
| `registry_ignore`_  | Any registry entry (one per element)         |
+---------------------+----------------------------------------------+
| `prefilter_cmd`_    | Command to prevent prelinking                |
+---------------------+----------------------------------------------+
| `skip_nfs`_         | yes, no                                      |
+---------------------+----------------------------------------------+

.. _reference_ossec_syscheck_directories:

``directories``
---------------

Use this option to add or remove directories to be monitored. They must be comma separated.

All files and subdirectories will also be monitored.

Drive letters without directories are not valid. At a minimum the '.' should be included (``D:\.``).

This should be set on the system you wish tomonitor (or in the agent.conf if appropriate).

.. topic:: Default value

  .. code-block:: xml

 	  <directories>/etc,/usr/bin,/usr/sbin,/bin,/sbin</directories>

.. topic:: Allowed values

  Any directory

.. topic:: Attributes

    realtime
      This will enable realtime/continuous monitoring on Linux (using the inotify system calls) and Windows systems.

      Allowed value: yes
    report_changes
      Report diffs of file changes.  This is limited to text files at this time.

      Allowed value: yes

      .. note ::
        This option is only available on Unix-like systems.

    check_all
      All the following check_* options are used together.

      Allowed value: yes
    check_sum
      Check the md5 and sha1 hashes of the  of the files will be checked. This is the same as using both check_sha1sum="yes" and check_md5sum="yes"

      Allowed value: yes
    check_sha1sum
      When used only the sha1 hash of the files will be checked.

      Allowed value: yes
    check_md5sum
      The md5 hash of the files will be checked.

      Allowed value: yes
    check_size
      The size of the files will be checked.

      Allowed value: yes
    check_owner
      Check the owner of the files selected.

      Allowed value: yes
    check_group
      Check the group owner of the files/directories selected.

      Allowed value: yes

    check_perm
      Check the UNIX permission of the files/directories selected. On windows this will only check the POSIX permissions.

      Allowed value: yes
    restrict
      A string that will limit checks to files containing that string in the file name. Any directory or file name (but not a path) are allowed

      Allowed value: string

.. _reference_ossec_syscheck_ignore:

``ignore``
----------

List of files or directories to be ignored (one entry per element). The files and directories are still checked, but the results are ignored.

.. topic:: Default value

  .. code-block:: xml

 	  <ignore>/etc/mtab</ignore>

.. topic:: Allowed values

  Any directory or file name

.. topic:: Attributes

  type
    This is a simple regex pattern to filter out files so alerts are not generated

    Allowed value: sregex

.. _reference_ossec_syscheck_frequency:

``frequency``
-------------

Frequency that the syscheck is going to be executed (in seconds)

.. topic:: Default value

  .. code-block:: xml

	  <frequency>21600</frequency>

.. topic:: Allowed values

  A positive number, time in seconds



``scan_time``
-------------

Time to run the scans. It can be in the formats: 21pm, 8:30

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Time (Examples: 8am, 12:30)

.. note::

   This may delay the initialization of realtime scans.

``scan_day``
------------

Day of the week to run the scans


.. topic:: Default value

  n/a

.. topic:: Allowed values

  Day of the week (Examples: saturday, monday)


``auto_ignore``
---------------

Specifies if syscheck will ignore files that change too often (after the third change)

.. topic:: Default value

  .. code-block:: xml

	  <auto_ignore>yes</auto_ignore>

.. topic:: Allowed values

  The options are: yes or no

  .. note::

     It valid on: server and local

.. _reference_ossec_syscheck_alert_new_files:

``alert_new_files``
-------------------

Specifies if syscheck should alert on new files created

.. topic:: Default value

  .. code-block:: xml

	  <auto_ignore>no</auto_ignore>

.. topic:: Allowed values

  The options are: yes or no

.. note::

   New files will only be detected on a full scan, this option does not work in realtime.
   It valid on: server and local

``scan_on_start``
-----------------

Specifies if syscheck should do the first scan as soon as it is started.

.. topic:: Default value

  .. code-block:: xml

	  <auto_ignore>yes</auto_ignore>

.. topic:: Allowed values

  The options are: yes or no


``windows_registry``
--------------------

Use this option to add Windows registry entries to be monitored (Windows-only).

.. topic:: Default value

  .. code-block:: xml

	  <windows_registry>HKEY_LOCAL_MACHINE\Software</windows_registry>

.. topic:: Allowed values

  Any registry entry (one per element)


.. note::

   New entries will not trigger alerts, only changes to existing entries.

``registry_ignore``
-------------------

List of registry entries to be ignored.

.. topic:: Default value

  .. code-block:: xml

	  <registry_ignore>..CryptographyRNG</registry_ignore>

.. topic:: Allowed values

  Any registry entry (one per element)

``prefilter_cmd``
-----------------

Command to run to prevent prelinking from creating false positives.


.. topic:: Default value

  n/a

.. topic:: Allowed values

  Command to prevent prelinking

  .. code-block:: xml

    <prefilter_cmd>/usr/sbin/prelink -y</prefilter_cmd>


.. note::

   This option can potentially impact performance negatively. The configured command will be run for each and every file checked.

``skip_nfs``
------------

Specifies if syscheck should scan network mounted filesystems.
Works on Linux and FreeBSD.Currently skip_nfs will abort checks running against CIFS or NFS mounts.

.. topic:: Default value

  .. code-block:: xml

	  <skip_nfs>no</skip_nfs>

.. topic:: Allowed values

  The options are: yes or no
