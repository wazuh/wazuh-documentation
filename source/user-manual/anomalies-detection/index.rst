.. _manual_anomalies_detection:

Intrusions and anomalies detection
===================================

.. warning::
	Draft document.

Introduction
-----------------------------------

Anomaly detection refers to the action of finding patterns in the system that do not match the expected behavior. Once a malware (e.g rootkits) is installed on a system, it modifies the system to be hidden from the user. Although the malware uses a lot of techniques for this purpose, Wazuh is able to detect a pattern in them and alert about possible intruders.

The component responsible for this task is *rootcheck*, although *syscheck* also plays an important role.

How it works
-----------------------------------

This section describes the checks performed by Wazuh to find the anomalies caused by an intruder or a malware.

File integrity monitoring
    Malware replaces files, directories and command, so performing file integrity check in the main directories allow to detect these actions.

Check running processes
    A malicious process can prevent from being visible in the system's list of processes (trojan version of *ps* command). Rootcheck inspects all process IDs (PID) looking for discrepancies with different system calls (getsid, getpgid).

Check hidden ports
    Malware uses hiddend ports to communicate with the attacker. Rootcheck checks every port in the system using *bind()* and if it is not possible to bind to a port and it is not in the *netstat* output, a malware could be using that port.

Check unusual files and permissions
    Scan the entire file system looking for unusual files and permissions. Files owned by root with write permissions for other user accounts, suid files, hidden directories, and files are all inspected.

Check hidden files using system calls
    Scan the entire system comparing the differences between the *stat size* and the files size when using the *fopen* + *read* calls. The number of nodes in each directory is also compared with the output of *opendir* + *readdir*. If any results do not match, you might have a malware installed.

Scan */dev* directory
    The */dev* directory should only contain device-specific files. Any additional file should be inspected because malware use this partition to hide files.

Scan network interfaces
    Scan all network interfaces on the system with *promiscuous mode* enabled. If the interface is in *promiscuous mode*, the output of the *ifconfig* command will show that. If not, we might have a malware installed.

Rootkit checks
    Rootcheck perform several checks using its own database of rootkits signatures: *rootkit_files.txt*, *rootkit_trojans.txt* and *win_malware_rcl.txt*. Unfortunately, the signatures are out of date.

HOWTOs
-----------------------------------

Ignoring false positives
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: xml

    <rule id="100100" level="0">
        <if_group>rootcheck</if_group>
        <match>/dev/.blkid.tab</match>
        <description>Ignore false positive for /dev/.blkid.tab</description>
    </rule>



Reference
-----------------------------------

Link to <rootcheck> in ossec.conf
