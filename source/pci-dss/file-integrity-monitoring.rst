.. Copyright (C) 2018 Wazuh, Inc.

.. _pci_dss_file_integrity_monitoring:

File integrity monitoring
=========================

File integrity monitoring (Syscheck) is performed by comparing the cryptographic checksum and other attributes of a known good file against the checksum and attributes of that file after it has been modified.

First, the Wazuh agent scans the system at an interval you specify, and it sends the checksums of the monitored files and registry keys (for Windows systems) to the Wazuh server. Then, the server stores the checksums and looks for modifications by comparing the newly received checksums against the historical checksum values for those files and/or registry keys. An alert is sent if the checksum (or another file attribute) changes.  Wazuh also supports near real-time file integrity checking where this is desired.

`Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_  can be used to meet PCI DSS requirement 11.5:

| **11.5** Deploy a change-detection mechanism (for example, file-integrity monitoring tools) to alert personnel to unauthorized modification (including changes, additions, and deletions) of critical system files, configuration files, or content files; and configure the software to perform critical file comparisons at least weekly.
|

Use cases
---------

In this example, we have configured Wazuh to detect changes in the file ``/root/credit_cards``.

.. code-block:: xml

    <syscheck>
        <directories check_all="yes" report_changes="yes">/root/credit_cards</directories>
    </syscheck>

So, when we modify the file, Wazuh generates an alert.

.. code-block:: console

    [root@centos ~]# ls -l credit_cards
    +total 4
    -rw-r--r--. 1 root root 14 Jan 10 19:33 cardholder_data.txt
    [root@centos ~]# cat credit_cards/cardholder_data.txt
    User1 = card4
    [root@centos ~]# echo "User1 = card5" > credit_cards/cardholder_data.txt
    [root@centos ~]# cat credit_cards/cardholder_data.txt
    User1 = card5

As you can see, syscheck alerts are tagged with the requirement 11.5.

.. code-block:: console

    root@ubuntu:~# tail -n28 /var/ossec/logs/alerts/alerts.log

    ** Alert 1484071804.77110: - ossec,syscheck,pci_dss_11.5,
    2017 Jan 10 19:10:04 (CentOS) 192.168.56.4->syscheck
    Rule: 550 (level 7) -> 'Integrity checksum changed.'
    Integrity checksum changed for: '/root/credit_cards/cardholder_data.txt'
    Old md5sum was: '713f9c28cee03fc39f611d8e6ded6333'
    New md5sum is : '313eba655eba3ebd814deee1b7bd7be1'
    Old sha1sum was: '41f840a0f1335144d973e2bebb496e48fd3592e9'
    New sha1sum is : 'a4e70ed0ca7bf67b4f5559a9d34a0d6a200927b2'

    File: /root/credit_cards/cardholder_data.txt
    New size: 14
    New permissions: 100644
    New user: root (0)
    New group: root (0)
    Old MD5: 713f9c28cee03fc39f611d8e6ded6333
    New MD5: 313eba655eba3ebd814deee1b7bd7be1
    Old SHA1: 41f840a0f1335144d973e2bebb496e48fd3592e9
    New SHA1: a4e70ed0ca7bf67b4f5559a9d34a0d6a200927b2
    Old date: Tue Jan 10 19:02:07 2017
    New date: Tue Jan 10 19:09:58 2017
    New inode: 1110
    What changed: 1c1
    < User1 = card4
    ---
    > User1 = card5

.. thumbnail:: ../images/pci/fim_1.png
    :title: Alert visualization at Kibana Discover
    :align: center
    :width: 100%

.. thumbnail:: ../images/pci/fim_2.png
    :title: Filtering alerts by PCI DSS and file path
    :align: center
    :width: 100%

.. thumbnail:: ../images/pci/fim_pci.png
    :title: Filtering alerts by PCI DSS on Wazuh App
    :align: center
    :width: 100%
