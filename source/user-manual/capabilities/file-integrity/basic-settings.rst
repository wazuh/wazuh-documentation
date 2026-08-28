.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Configure the FIM capability locally on each Wazuh agent or remotely through centralized configuration. Learn more about it in this section of the Wazuh documentation.

Basic configuration options
============================

Configure the FIM capability locally on each Wazuh agent or remotely through centralized configuration. Wazuh agents include a default FIM configuration you can modify as needed. To monitor file integrity on a Wazuh manager endpoint, install a Wazuh agent with the same major version as the Wazuh manager on the same host. Find all FIM configuration options in the ``syscheck`` section.

This section covers the common FIM configuration options used for file integrity monitoring. For additional settings, see the :doc:`advanced configuration options </user-manual/capabilities/file-integrity/advanced-settings>`.

.. _real_time_monitoring:

Real-time monitoring
---------------------

The ``realtime`` option enables real-time monitoring of file changes in configured directories on Windows and Linux endpoints.

To enable real-time monitoring, set the ``realtime`` option of the ``directories`` option to ``yes``. The allowed values for the ``realtime`` option are ``yes`` and ``no``. Real-time detection pauses during scheduled FIM scans and resumes once they finish.

The following example configures the FIM module to monitor a directory in real time. Replace ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own file path.

.. note::

   When configuring a file or directory for real-time monitoring, it must exist before restarting the Wazuh agent. If the specified path does not exist, the FIM module ignores it until a subsequent agent restart detects the file or directory. The FIM module does not support monitoring UNC network paths or mapped network drives on Windows. Only local file system paths are supported. This restriction applies to all monitoring modes (realtime, scheduled, and whodata) on Windows.

#. Add the following settings to the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
         <directories realtime="yes"><FILEPATH_OF_MONITORED_DIRECTORY></directories>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name wazuh``

.. _record_file_attributes:

Record file attributes
-----------------------

When you configure the FIM module to monitor specific files and directories, it records the metadata of those files and keeps track of changes. You can use the ``directories`` option to specify which metadata the FIM module collects or ignores; it supports various attributes.

The table below describes the supported attributes the FIM module records.

+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| Attribute           | Default value | Allowed values | Description                                                                              |
+=====================+===============+================+==========================================================================================+
| ``check_all``       | yes           | yes, no        | Records the values of all attributes below.                                              |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_sum``       | yes           | yes, no        | Records the MD5, SHA-1, and SHA-256 hashes of the files. Same as using                   |
|                     |               |                | ``check_md5sum="yes"``, ``check_sha1sum="yes"``, and ``check_sha256sum="yes"``           |
|                     |               |                | at the same time.                                                                        |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_sha1sum``   | yes           | yes, no        | Records the SHA-1 hash of the files.                                                     |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_md5sum``    | yes           | yes, no        | Records the MD5 hash of the files.                                                       |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_sha256sum`` | yes           | yes, no        | Records the SHA-256 hash of the files.                                                   |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_size``      | yes           | yes, no        | Records the size of the files.                                                           |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_owner``     | yes           | yes, no        | Records the owner of the files in Linux.                                                 |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_group``     | yes           | yes, no        | Records the group owner of the files/directories. On Windows, ``gid`` is always 0, and   |
|                     |               |                | the group name is blank.                                                                 |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_perm``      | yes           | yes, no        | Records the permission of the files/directories. On Windows, a list of denied and        |
|                     |               |                | allowed permissions is recorded for each user or group. It works on Linux and Windows    |
|                     |               |                | with NTFS partitions.                                                                    |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_attrs``     | yes           | yes, no        | Records the attributes of files in Windows.                                              |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_mtime``     | yes           | yes, no        | Records the modification time of a file.                                                 |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+
| ``check_inode``     | yes           | yes, no        | Records the file inode on Linux.                                                         |
+---------------------+---------------+----------------+------------------------------------------------------------------------------------------+

When there is a conflict between options that modify the same attribute, the last one configured takes precedence. In the configuration below, ``check_all="no"`` disables all attribute checks, but the later ``check_mtime="yes"`` overrides that setting, so the FIM module evaluates changes to the file's modification time.

.. code-block:: xml

   <directories check_all="no" check_mtime="yes">/etc</directories>

In contrast, the following configuration disables all attribute checks, including the modification time check, because ``check_all="no"`` is applied after ``check_mtime="yes"``.

.. code-block:: xml

   <directories check_mtime="yes" check_all="no">/etc</directories>

The following example shows how to disable SHA-1 hash calculation for a monitored file. Replace ``<FILEPATH_OF_MONITORED_FILE>`` with your own file path.

#. Add the following settings to the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
         <directories check_sha1sum="no"><FILEPATH_OF_MONITORED_FILE></directories>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name wazuh``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

.. note::

   Specified files or directories created after the initial FIM scan will be added for monitoring during the next scheduled scan.

.. _scheduled_scans:

Scheduled scans
----------------

To modify the FIM scan schedule, configure the ``frequency`` option in the Wazuh FIM module. This option is global and defines the interval between scheduled scans for all monitored files and directories. You can also schedule scans for a specific time or day of the week using the ``scan_time`` and ``scan_day`` options. Scheduled scans help prevent finding floods when monitoring frequently updated files, such as log files.

By default, the FIM module runs scans every 12 hours (43200 seconds). The following example configures the FIM module to run scans every 15 minutes (900 seconds).

#. Modify the ``frequency`` option in the Wazuh agent configuration file to change the default FIM scan frequency:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
         <frequency>900</frequency>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name wazuh``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

You can also schedule scans using the ``scan_time`` and the ``scan_day`` options to run FIM scans outside business hours.

The configuration example below shows you how to run the scans of the specified directories every *Saturday* at *10 pm*.

#. Add the following settings to the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
         <scan_time>10pm</scan_time>
         <scan_day>saturday</scan_day>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name wazuh``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

.. _report_changes_in_file_values:

Report changes in file values
------------------------------

The ``report_changes`` option allows the FIM module to report the exact content changed in a text file. This records the text added to or deleted from a monitored file. Enable this functionality through the ``report_changes`` option of the ``directories`` options. Allowed values are ``yes`` and ``no``. This works with both directories and individual files on Windows, macOS, and Linux.

Use the ``report_changes`` option with caution, as enabling it copies every monitored file to a private location, increasing storage usage. You can find the copies at:

-  ``/var/ossec/queue/diff/*`` on Linux.
-  ``/Library/Ossec/queue/diff/*`` on macOS.
-  ``C:\Program Files (x86)\ossec-agent\queue\diff\file\*`` on Windows.

The following configuration sets up the FIM module to report file changes. Replace ``<FILEPATH_OF_MONITORED_FILE>`` with your own file path.

#. Add the following settings to the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
         <directories check_all="yes" report_changes="yes"><FILEPATH_OF_MONITORED_FILE></directories>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration changes:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name wazuh``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

In the configuration example below, you can see how to use the ``report_changes`` option for all files in the ``<FILEPATH_OF_MONITORED_DIRECTORY>`` directory. You can prevent the FIM module from reporting the exact content changes to the ``<FILEPATH_OF_MONITORED_DIRECTORY>/private.txt`` file. Replace ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own file path.

When using the ``report_changes`` option, you can use the ``nodiff`` option to create an exception. This option allows a finding to be created for file modifications, but it prevents the Wazuh FIM module from reporting the exact content changed in a text file. Using the ``nodiff`` option avoids data leakage that might occur by sending the file content changes through findings.

#. Add the following settings to the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2,3

      <syscheck>
         <directories check_all="yes" report_changes="yes"><FILEPATH_OF_MONITORED_DIRECTORY></directories>
         <nodiff><FILEPATH_OF_MONITORED_DIRECTORY>/private.txt</nodiff>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration changes:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name wazuh``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

Adding exclusions
------------------

Configure the FIM module to ignore findings for specific files or directories using the ``ignore`` option to exclude a path. Each line excludes one file or directory; add multiple lines to exclude multiple paths.

The following example shows how to configure the FIM module to ignore a specific file path and files with the ``.log`` and ``.tmp`` extensions using a regular expression. Replace ``<FILEPATH_OF_MONITORED_FILE>`` with your own file paths.

#. Add the following settings to the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2,3

      <syscheck>
         <ignore><FILEPATH_OF_MONITORED_FILE></ignore>
         <ignore type="sregex">.log$|.tmp$</ignore>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name wazuh``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``
