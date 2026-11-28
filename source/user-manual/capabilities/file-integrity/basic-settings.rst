.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Configure the Wazuh FIM module to monitor files and directories locally on each Wazuh agent or remotely through centralized configuration. Learn how in this section of the Wazuh documentation.

Basic configuration
===================

The Wazuh FIM module runs scans on Windows, Linux, and macOS. Real-time and who-data monitoring work on Linux and Windows endpoints, and Windows Registry monitoring works on Windows endpoints only. On macOS endpoints, the FIM module detects changes during scheduled scans.

The Wazuh FIM module monitors files within the specified directories and detects file creation, modification, and deletion events. It does not detect directory creation, modification, or deletion events. You can configure monitored files and directories either locally in the Wazuh agent :doc:`configuration </user-manual/reference/ossec-conf/index>` file or remotely via :doc:`centralized configuration </user-manual/reference/centralized-configuration>`.

Wazuh agents include a :ref:`default <default_syscheck_configuration>` FIM configuration you can modify as needed. To monitor file integrity on a Wazuh manager endpoint, install a Wazuh agent on the same host. Find all FIM configuration options in the :doc:`syscheck </user-manual/reference/ossec-conf/syscheck>` section.

Use the ``<directories>`` option to specify the files and directories the FIM module monitors. Include multiple entries as a comma-separated list or on separate lines. FIM directories support ``*`` and ``?`` wildcards, as a shell or Command Prompt does. For example, ``C:\Users\*\Downloads``.

This example configures the FIM module to monitor a file and directory. Replace ``<FILEPATH_OF_MONITORED_FILE>`` and ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own file paths.

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2,3

      <syscheck>
         <directories><FILEPATH_OF_MONITORED_FILE></directories>
         <directories><FILEPATH_OF_MONITORED_DIRECTORY></directories>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

.. note::

   If you specify a directory both in a :doc:`centralized configuration </user-manual/reference/centralized-configuration>` and in the :doc:`configuration </user-manual/reference/ossec-conf/index>` file of the Wazuh agent, the centralized configuration takes precedence and overrides the local configuration.

   On Windows, the FIM module monitors local file system paths only, in every FIM mode. It ignores UNC network paths and mapped network drives.

   The Wazuh agent reads only the settings inside the ``<ossec_config>`` block. A ``<syscheck>`` block outside it stops the Wazuh agent with the error ``(1230): Invalid element in the configuration: 'syscheck'.``

To apply FIM settings to a group of Wazuh agents from the Wazuh dashboard, go to **Agents management** > **Groups** and click the **Edit group configuration** icon of the group. Add the ``<syscheck>`` block inside the ``<agent_config>`` block and click **Save**. Each Wazuh agent in the group receives the new configuration and reloads it automatically. See :doc:`centralized configuration </user-manual/reference/centralized-configuration>`.

.. thumbnail:: /images/manual/fim/edit-group-configuration.png
   :title: Edit group configuration
   :alt: agent.conf of the default group in the Wazuh dashboard with a syscheck block inside the agent_config block
   :align: center
   :width: 80%

.. _real_time_monitoring:

Real-time monitoring
---------------------

The ``realtime`` option enables real-time monitoring of file changes in configured directories on Windows and Linux endpoints.

To enable real-time monitoring, set the ``realtime`` option of the :ref:`directories <reference_ossec_syscheck_directories>` option to ``yes``. Real-time detection pauses during scheduled FIM scans and resumes once they finish.

The following example configures the FIM module to monitor a directory in real time. Replace ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own file path.

.. note::

   When configuring a file or directory for real-time monitoring, create it before you restart the Wazuh agent. If the path doesn't exist yet, the FIM module adds it at the next scheduled scan and monitors it in real time from then on.

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
         <directories realtime="yes"><FILEPATH_OF_MONITORED_DIRECTORY></directories>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name WazuhSvc``

After the restart, the Wazuh agent log shows ``(6016): Directory set for real time monitoring: '<FILEPATH_OF_MONITORED_DIRECTORY>'.`` for each monitored directory. When the first scan ends, it shows ``(6012): Real-time file integrity monitoring started``.

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

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

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
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

.. _scheduled_scans:

Scheduled scans
----------------

To modify the FIM scan schedule, configure the ``<frequency>`` option in the Wazuh FIM module. This option is global and defines the interval between scheduled scans for all monitored files and directories. You can also schedule scans for a specific time or day of the week using the ``scan_time`` and ``scan_day`` options. Scheduled scans help prevent finding floods when monitoring frequently updated files, such as log files.

By default, the FIM module runs scans every 12 hours (43200 seconds). The following example configures the FIM module to run scans every 15 minutes (900 seconds).

#. Modify the ``<frequency>`` option in the default ``<syscheck>`` block of the Wazuh agent configuration file to change the default FIM scan frequency:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
         <frequency>900</frequency>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

After each scan, the Wazuh agent log shows ``(6009): File integrity monitoring scan ended``.

The configuration example below shows you how to run the scans of the specified directories every *Saturday* at *10 pm*.

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

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
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

.. _report_changes_in_file_values:

Report changes in file values
------------------------------

The ``report_changes`` option allows the FIM module to report the exact content changed in a text file. This works with both directories and individual files on Windows, macOS, and Linux.

Use the ``report_changes`` option with caution, as enabling it copies every monitored file to a private location, increasing storage usage. You can find the copies at:

-  ``/var/ossec/queue/diff/*`` on Linux.
-  ``/Library/Ossec/queue/diff/*`` on macOS.
-  ``C:\Program Files (x86)\ossec-agent\queue\diff\file\*`` on Windows.

The Wazuh agent clears these copies when it restarts, so after a restart, the first change to a file that the FIM module already monitored shows ``Unable to calculate diff due to no previous data stored for this file.`` instead of the changed content. Later changes show the content. The changed content appears in the ``file.diff`` field of the finding and in the ``content_changes`` field inside ``event.original``. The following configuration sets up the FIM module to report file changes. Replace ``<FILEPATH_OF_MONITORED_FILE>`` with your own file path.

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

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
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

In the configuration example below, you can see how to use the ``report_changes`` option for all files in the ``<FILEPATH_OF_MONITORED_DIRECTORY>`` directory. You can prevent the FIM module from reporting the exact content changes to the ``<FILEPATH_OF_MONITORED_DIRECTORY>/private.txt`` file. Replace ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own file path.

When using the ``report_changes`` option, you can use the ``nodiff`` option to create an exception. This option allows a finding to be created for file modifications, but it prevents the Wazuh FIM module from reporting the exact content changed in a text file. Using the ``nodiff`` option avoids data leakage that might occur by sending the file content changes through findings.

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

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
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

Adding exclusions
------------------

Configure the FIM module to exclude specific files or directories from FIM scans using the ``ignore`` option. Each line excludes one file or directory; add multiple lines to exclude multiple paths.

The following example shows how to configure the FIM module to ignore a specific file path and files with the ``.log`` and ``.tmp`` extensions using a regular expression. Replace ``<FILEPATH_OF_MONITORED_FILE>`` with your own file paths.

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

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
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

#. Check the exclusion. Change the ignored file and a monitored file next to it that isn't ignored. Only the change to the second file appears in **Endpoint security** > **File Integrity Monitoring** > **Findings**. If the directory isn't monitored in real time, the finding appears after the next scheduled scan.
