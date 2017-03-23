.. _reference_ossec_rootcheck:


rootcheck
=========

.. topic:: XML section name

	.. code-block:: xml

		<rootcheck>

Configuration options for policy monitoring and anomaly detection.

Options
-------

- `base_directory`_
- `rootkit_files`_
- `rootkit_trojans`_
- `windows_audit`_
- `system_audit`_
- `windows_apps`_
- `windows_malware`_
- `scanall`_
- `frequency`_
- `disabled`_
- `check_dev`_
- `check_files`_
- `check_if`_
- `check_pids`_
- `check_policy`_
- `check_ports`_
- `check_sys`_
- `check_trojans`_
- `check_unixaudit`_
- `check_winapps`_
- `check_winapps`_
- `check_winmalware`_
- `skip_nfs`_

base_directory
^^^^^^^^^^^^^^^

The base directory that will be appended to the following options:

rootkit_files
rootkit_trojans
windows_malware
windows_audit
windows_apps
systems_audit

+--------------------+---------------------+
| **Default Value**  | /var/ossec          |
+--------------------+---------------------+
| **Allowed values** | Path to a directory |
+--------------------+---------------------+

.. _reference_ossec_rootcheck_rootkit_files:

rootkit_files
^^^^^^^^^^^^^^^

Change the location of the rootkit files database

+--------------------+------------------------------------------+
| **Default Value**  | /var/ossec/etc/shared/rootkit_files.txt  |
+--------------------+------------------------------------------+
| **Allowed values** | A file with the rootkit files signatures |
+--------------------+------------------------------------------+

.. _reference_ossec_rootcheck_rootkit_trojans:

rootkit_trojans
^^^^^^^^^^^^^^^

Change the location of the rootkit trojans database

+--------------------+-------------------------------------------+
| **Default Value**  | /var/ossec/etc/shared/rootkit_trojans.txt |
+--------------------+-------------------------------------------+
| **Allowed values** | A file with the trojans signatures        |
+--------------------+-------------------------------------------+

windows_audit
^^^^^^^^^^^^^^^

Specifies the path to a Windows audit definition file.

+--------------------+-----------------------------------------+
| **Default Value**  | n/a                                     |
+--------------------+-----------------------------------------+
| **Allowed values** | Path to a Windows audit definition file |
+--------------------+-----------------------------------------+

.. _reference_ossec_rootcheck_audit:

system_audit
^^^^^^^^^^^^^^^

Specifies the path to an audit definition file for Unix-like systems

+--------------------+---------------------------------------------+
| **Default Value**  | n/a                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | Audit definition file for Unix-like systems |
+--------------------+---------------------------------------------+

windows_apps
^^^^^^^^^^^^^^^

Specifies the path to a Windows application definition file

+--------------------+-----------------------------------------+
| **Default Value**  | n/a                                     |
+--------------------+-----------------------------------------+
| **Allowed values** | Path to a Windows application def. file |
+--------------------+-----------------------------------------+

windows_malware
^^^^^^^^^^^^^^^

Specifies the path to a Windows malware definitions file

+--------------------+--------------------------------------------+
| **Default Value**  | n/a                                        |
+--------------------+--------------------------------------------+
| **Allowed values** | Path to a Windows malware definitions file |
+--------------------+--------------------------------------------+

scanall
^^^^^^^^^^^^^^^

Tells rootcheck to scan the entire system.  This option may lead to some false positives.

+--------------------+---------+
| **Default Value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. _reference_ossec_rootcheck_frequency:

frequency
^^^^^^^^^^^^^^^

Frequency that the rootcheck is going to be executed (in seconds).

+--------------------+-----------------------------+
| **Default Value**  | 36000                       |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

disabled
^^^^^^^^^^^^^^^

Disables the execution of rootcheck.

+--------------------+---------+
| **Default Value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_dev
^^^^^^^^^^^^^^^

Enable or disable the checking of /dev.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_files
^^^^^^^^^^^^^^^

Enable or disable the checking of files.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_if
^^^^^^^^^^^^^^^

Enable or disable the checking of network interfaces.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_pids
^^^^^^^^^^^^^^^

Enable or disable the checking of process ID's.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_policy
^^^^^^^^^^^^^^^

Enable or disable the checking of policy.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_ports
^^^^^^^^^^^^^^^

Enable or disable the checking of network ports.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_sys
^^^^^^^^^^^^^^^

Enable or disable checking for anomalous file system objects.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_trojans
^^^^^^^^^^^^^^^

Enable or disable checking for trojans.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_unixaudit
^^^^^^^^^^^^^^^

Enable or disable the checking of unixaudit.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_winapps
^^^^^^^^^^^^^^^

Enable or disable the checking of winapps.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

check_winaudit
^^^^^^^^^^^^^^^

Enable or disable the checking of winaudit.

+--------------------+-------+
| **Default Value**  | 1     |
+--------------------+-------+
| **Allowed values** | 0 , 1 |
+--------------------+-------+

check_winmalware
^^^^^^^^^^^^^^^^

Enable or disable checking for Windows malware.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

skip_nfs
^^^^^^^^^^^^^^^

Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD).
Currently, skip_nfs will exclude checking files on CIFS or NFS mounts.

+--------------------+---------+
| **Default Value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+
