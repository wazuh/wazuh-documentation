.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the rootcheck configuration section of ossec.conf, which configures policy monitoring and anomaly detection.

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

+-------------------------------+-----------------------+
| **Default value (UNIX)**      | /                     |
+-------------------------------+-----------------------+
| **Default value (Windows)**   | C:\\                  |
+-------------------------------+-----------------------+
| **Allowed values**            | Path to a directory   |
+-------------------------------+-----------------------+

ignore
^^^^^^

List of files or directories to be ignored (one entry per line). Multiple lines may be entered to include multiple files or directories. These files and directories will be ignored during scans.

+----------------------+-------------------------+
| **Allowed values**   | Simple regex (sregex)   |
+----------------------+-------------------------+
| **Valid for**        | check_sys, check_dev    |
+----------------------+-------------------------+

Attributes:

+------------------+------------------------------------------------------------+
| type             | Simple regex expression to ignore files and directories.   |
+------------------+------------------------------------------------------------+
| Allowed values   | sregex                                                     |
+------------------+------------------------------------------------------------+

frequency
^^^^^^^^^

Frequency that the rootcheck is going to be executed (in seconds).

+----------------------+-------------------------------+
| **Default value**    | 43200                         |
+----------------------+-------------------------------+
| **Allowed values**   | A positive number (seconds)   |
+----------------------+-------------------------------+

disabled
^^^^^^^^

Enables or disables the rootcheck module.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

check_dev
^^^^^^^^^

Enable or disable the checking of ``/dev`` for suspicious files.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

check_if
^^^^^^^^

Enable or disable checking network interfaces for promiscuous mode.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

check_pids
^^^^^^^^^^

Enable or disable checking for hidden processes.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

check_ports
^^^^^^^^^^^^

Enable or disable the checking of hidden network ports.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

check_sys
^^^^^^^^^

Enable or disable checking for anomalous file system objects.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

skip_nfs
^^^^^^^^

Enable or disable scanning of network-mounted filesystems.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

Default Unix configuration
------------------------------

.. code-block:: xml

   <!-- Policy monitoring -->
   <rootcheck>
     <disabled>no</disabled>
     <check_unixaudit>yes</check_unixaudit>
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
