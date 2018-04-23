.. Copyright (C) 2018 Wazuh, Inc.

How it works
============

This section describes the checks performed by Wazuh to find the anomalies caused by an intruder or malware.

.. thumbnail:: ../../../images/manual/intrusion-anomaly/rootcheck-flow.png
  :title: Intrusion and anomaly detection
  :align: center
  :width: 100%


File integrity monitoring
----------------------------
Malware can replace files, directories and commands on it's host system.  Performing file integrity checks on the main directories of a system allows for the detection of these actions. More information :ref:`File Integrity Monitoring Section <manual_file_integrity>`

Example::

	** Alert 1460948255.25442: mail  - ossec,syscheck,pci_dss_11.5,
	2016 Apr 17 19:57:35 (ubuntu) 10.0.0.144->syscheck
	Rule: 550 (level 7) -> 'Integrity checksum changed.'
	Integrity checksum changed for: '/test/hello'
	Size changed from '12' to '17'
	Old md5sum was: 'e59ff97941044f85df5297e1c302d260'
	New md5sum is : '7947eba5d9cc58d440fb06912e302949'
	Old sha1sum was: '648a6a6ffffdaa0badb23b8baf90b6168dd16b3a'
	New sha1sum is : '379b74ac9b2d2b09ff6ad7fa876c79f914a755e1'

Check running processes
-----------------------
A malicious process can prevent itself from being seen in a system's list of processes (trojan version of *ps* command). **Rootcheck** inspects all process IDs (PID) looking for discrepancies with different system calls (getsid, getpgid).

Example:

Diamorphine is a kernel-mode rootkit that is able to hide itself and other processes from `ps`. If we install this package and hide a process, we will get an alert like this::

  ** Alert 1460225922.841535: mail  - ossec,rootcheck
  2017 Feb 15 10:00:42 (localhost) 192.168.1.240->rootcheck
  Rule: 510 (level 7) -> 'Host-based anomaly detection event (rootcheck).'
  Process '495' hidden from /proc. Possible kernel level rootkit.

Check hidden ports
------------------
Malware can use hidden ports to communicate with the attacker. **Rootcheck** checks every port in the system using *bind()*. If it can not bind to a port and that port is not in the *netstat* output, malware may be present.

Check unusual files and permissions
-----------------------------------

Wazuh scans the entire file system looking for unusual files and permissions. Files owned by root with write permissions for other user accounts like *suid* files, hidden directories and files, are all inspected.

Check hidden files using system calls
-------------------------------------

Wazuh scans the entire system comparing the differences between the *stat size* and the file size when using the *fopen* + *read* calls. The number of nodes in each directory is also compared with the output of *opendir* + *readdir*. If any results do not match, malware may be present.

Alert Example::

  ** Alert 1460225922.51190: mail  - ossec,rootcheck
  2017 Feb 15 10:30:42 (localhost) 192.168.1.240->rootcheck
  Rule: 510 (level 7) -> 'Host-based anomaly detection event (rootcheck).'
  Files hidden inside directory '/etc'. Link count does not match number of files (128,129)

Scan the */dev* directory
-------------------------
The */dev* directory should only contain device-specific files. Any additional file(s) should be inspected because malware uses this partition to hide files.

Example:

  If you create a hidden file on ``/dev``, Wazuh should alert because there is a hidden file in a directory that should only contain device-specific files. The following is the alert generated in that case::

    ** Alert 1487182293.37491: - ossec,rootcheck,
    2017 Feb 15 10:11:33 localhost->rootcheck
    Rule: 510 (level 7) -> 'Host-based anomaly detection event (rootcheck).'
    File '/dev/.hiddenfile' present on /dev. Possible hidden file.
    title: File present on /dev.
    file: /dev/.hiddenfile

Scan network interfaces
-----------------------
Wazuh scans for any network interfaces on the system with *promiscuous mode* enabled. If the interface is in *promiscuous mode*, the output of the *ifconfig* command will indicate it. This may be an indicator that malware is present.

Rootkit checks
--------------
**Rootcheck** performs several checks using its own database of rootkit signatures: *rootkit_files.txt*, *rootkit_trojans.txt* and *win_malware_rcl.txt*. Unfortunately, these signatures are out of date.
