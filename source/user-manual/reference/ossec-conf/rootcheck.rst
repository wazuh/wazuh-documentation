.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the configuration options for policy monitoring and anomaly detection in the rootcheck section of the Wazuh documentation.
  
.. _reference_ossec_rootcheck:

rootcheck
=========

.. topic:: XML section name

	.. code-block:: xml

		<rootcheck>
		</rootcheck>

Configuration options for policy monitoring and anomaly detection.

Options
-------

- `base_directory`_
- `ignore`_
- `rootkit_files`_
- `rootkit_trojans`_
- `windows_audit`_
- `system_audit`_
- `windows_apps`_
- `windows_malware`_
- `scanall`_
- `readall`_
- `frequency`_
- `disabled`_
- `check_dev`_
- `check_files`_
- `check_if`_
- `check_pids`_
- `check_ports`_
- `check_sys`_
- `check_trojans`_
- `check_unixaudit`_
- `check_winapps`_
- `check_winaudit`_
- `check_winmalware`_
- `skip_nfs`_

base_directory
^^^^^^^^^^^^^^^

The base directory that will be prefixed to the following options:

- Check rootkits
- Check trojans
- Scan the ``/dev`` directory
- Check the hidden files using system calls

+-----------------------------+---------------------+
| **Default value (UNIX)**    | /                   |
+-----------------------------+---------------------+
| **Default value (Windows)** | C:\\                |
+-----------------------------+---------------------+
| **Allowed values**          | Path to a directory |
+-----------------------------+---------------------+

ignore
^^^^^^

List of files or directories to be ignored (one entry per line). Multiple lines may be entered to include multiple files or directories. These files and directories will be ignored during scans.

+--------------------+-----------------------------------+
| **Allowed values** | sregex                            |
+--------------------+-----------------------------------+
| **Valid for**      | check_sys, check_dev, check_files |
+--------------------+-----------------------------------+

Attributes:

+----------+----------------------------------------------------------+
| **type** | Simple regex expression to ignore files and directories. |
+          +---------------------+------------------------------------+
|          | Allowed values      | sregex                             |
+----------+---------------------+------------------------------------+

.. _reference_ossec_rootcheck_rootkit_files:

rootkit_files
^^^^^^^^^^^^^

Change the location of the rootkit files database.

+--------------------+------------------------------------------+
| **Default value**  | etc/shared/rootkit_files.txt             |
+--------------------+------------------------------------------+
| **Allowed values** | A file with the rootkit files signatures |
+--------------------+------------------------------------------+

.. note::
  Paths can be referred to as relative paths under the Wazuh installation directory or full paths.

.. _reference_ossec_rootcheck_rootkit_trojans:

rootkit_trojans
^^^^^^^^^^^^^^^

Change the location of the rootkit trojans database.

+--------------------+-------------------------------------------+
| **Default value**  | etc/shared/rootkit_trojans.txt            |
+--------------------+-------------------------------------------+
| **Allowed values** | A file with the trojans signatures        |
+--------------------+-------------------------------------------+

windows_audit
^^^^^^^^^^^^^

Specifies the path to a Windows audit definition file.

+--------------------+-----------------------------------------+
| **Default value**  | n/a                                     |
+--------------------+-----------------------------------------+
| **Allowed values** | Path to a Windows audit definition file |
+--------------------+-----------------------------------------+

.. _reference_ossec_rootcheck_audit:

system_audit
^^^^^^^^^^^^

Specifies the path to an audit definition file for Unix-like systems.

+--------------------+---------------------------------------------+
| **Default value**  | n/a                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | Audit definition file for Unix-like systems |
+--------------------+---------------------------------------------+

windows_apps
^^^^^^^^^^^^

Specifies the path to a Windows application definition file.

+--------------------+-----------------------------------------+
| **Default value**  | n/a                                     |
+--------------------+-----------------------------------------+
| **Allowed values** | Path to a Windows application def. file |
+--------------------+-----------------------------------------+

windows_malware
^^^^^^^^^^^^^^^

Specifies the path to a Windows malware definitions file.

+--------------------+--------------------------------------------+
| **Default value**  | n/a                                        |
+--------------------+--------------------------------------------+
| **Allowed values** | Path to a Windows malware definitions file |
+--------------------+--------------------------------------------+

scanall
^^^^^^^

Tells rootcheck to scan the entire system.  This option may lead to some false positives.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

readall
^^^^^^^

Allow Rootcheck read all system files and compare the bytes read with files size.
With ``readall`` set to no, only these folders are checked: ``/bin``, ``/sbin``, ``/usr/bin``, ``/usr/sbin``, ``/dev``, ``/lib``, ``/etc``, ``/root``, ``/var/log``, ``/var/mail``, ``/var/lib``, ``/var/www``, ``/usr/lib``, ``/usr/include``, ``/tmp``, ``/boot``, ``/usr/local``, ``/var/tmp`` and ``/sys``.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. _reference_ossec_rootcheck_frequency:

frequency
^^^^^^^^^

Frequency that the rootcheck is going to be executed (in seconds).

+--------------------+-----------------------------+
| **Default value**  | 43200                       |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

disabled
^^^^^^^^

Disables the execution of rootcheck.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_dev
^^^^^^^^^

Enable or disable the checking of /dev.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_files
^^^^^^^^^^^

Enable or disable the checking of files.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_if
^^^^^^^^

Enable or disable the checking of network interfaces.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_pids
^^^^^^^^^^

Enable or disable the checking of process ID's.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_ports
^^^^^^^^^^^

Enable or disable the checking of network ports.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_sys
^^^^^^^^^

Enable or disable checking for anomalous file system objects.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_trojans
^^^^^^^^^^^^^

Enable or disable checking for trojans.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_unixaudit
^^^^^^^^^^^^^^^

Enable or disable the checking of unixaudit.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_winapps
^^^^^^^^^^^^^

Enable or disable the checking of winapps.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_winaudit
^^^^^^^^^^^^^^

Enable or disable the checking of winaudit.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_winmalware
^^^^^^^^^^^^^^^^

Enable or disable checking for Windows malware.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

skip_nfs
^^^^^^^^

Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD).
Currently, skip_nfs will exclude checking files on CIFS or NFS mounts.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

Default Unix configuration
--------------------------

.. code-block:: xml

    <!-- Policy monitoring -->
    <rootcheck>
      <disabled>no</disabled>
      <check_unixaudit>yes</check_unixaudit>
      <check_files>yes</check_files>
      <check_trojans>yes</check_trojans>
      <check_dev>yes</check_dev>
      <check_sys>yes</check_sys>
      <check_pids>yes</check_pids>
      <check_ports>yes</check_ports>
      <check_if>yes</check_if>
      <ignore type="sregex">^/etc/</ignore>

      <!-- Frequency that rootcheck is executed - every 12 hours -->
      <frequency>43200</frequency>

      <rootkit_files>etc/shared/rootkit_files.txt</rootkit_files>
      <rootkit_trojans>etc/shared/rootkit_trojans.txt</rootkit_trojans>

      <skip_nfs>yes</skip_nfs>
    </rootcheck>
