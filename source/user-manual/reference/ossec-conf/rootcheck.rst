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
- `scanall`_
- `readall`_
- `frequency`_
- `disabled`_
- `check_dev`_
- `check_if`_
- `check_pids`_
- `check_ports`_
- `check_sys`_
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
| **Valid for**      | check_sys, check_dev              |
+--------------------+-----------------------------------+

Attributes:

+----------+----------------------------------------------------------+
| **type** | Simple regex expression to ignore files and directories. |
+          +---------------------+------------------------------------+
|          | Allowed values      | sregex                             |
+----------+---------------------+------------------------------------+

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
      <check_dev>yes</check_dev>
      <check_sys>yes</check_sys>
      <check_pids>yes</check_pids>
      <check_ports>yes</check_ports>
      <check_if>yes</check_if>
      <ignore type="sregex">^/etc/</ignore>

      <!-- Frequency that rootcheck is executed - every 12 hours -->
      <frequency>43200</frequency>

      <skip_nfs>yes</skip_nfs>
    </rootcheck>
