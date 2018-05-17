.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr_II:

GDPR II
=======

In this chapter the requirements concerning the basic principles of the regulation are mentioned, having as main purpose the personal data and how they are to be processed. 

Chapter II, Article 5 Head 1(f)
-------------------------------

**Article 5**  Principles relating to processing of personal data. **Head 1(f)**. processed in a manner that ensures appropriate security of the personal data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organisational measures ('integrity and confidentiality').

Ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services, verifying its modifications, accesses, locations and guarantee the safety of them. File sharing protection and file sharing technologies that meet the requirements of data protection. 

One of the solutions that Wazuh offers us is file integrity monitoring. Wazuh monitors the file system, identifying changes in content, permissions, ownership, and attributes of files that you need to keep an eye on.

Wazuh’s File integrity monitoring (FIM) watches specified files triggering alerts when these files are modified. The component responsible for this task is called `Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_. This component stores the cryptographic checksum and other attributes of a known good file or Windows registry key and regularly compares it to the current file being used by the system, watching for changes, being possible multiple configurations, for example to do the monitoring in real time, in intervals of time, only on specific objectives, etc. In the same way that personal data files are monitored, Wazuh can monitor the sharing files to make sure they are protected.


Here are some examples of OSSEC rules tagged gdpr_II_5.1.f:

.. code-block:: xml

	<rule id="550" level="7">
	    <category>ossec</category>
	    <decoded_as>syscheck_integrity_changed</decoded_as>
	    <description>Integrity checksum changed.</description>
	    <group>syscheck,pci_dss_11.5,gpg13_4.11,gdpr_II_5.1.f,</group>
	</rule>

	<rule id="554" level="5">
	    <category>ossec</category>
	    <decoded_as>syscheck_new_entry</decoded_as>
	    <description>File added to the system.</description>
	    <group>syscheck,pci_dss_11.5,gpg13_4.11,gdpr_II_5.1.f,</group>
  	</rule>


Use cases
^^^^^^^^^

In this example, we have configured Wazuh to detect changes in the file ``/root/personal_data``.

.. code-block:: xml

    <syscheck>
        <directories check_all="yes" report_changes="yes">/root/personal_data</directories>
    </syscheck>

So, when we modify the file, Wazuh generates an alert.

.. code-block:: console

	root@agent:~# ls -l personal_data
	total 4
	-rw-r--r-- 1 root root 18 may 16 11:39 subject_data.txt
	root@agent:~# cat personal_data/subject_data.txt
	User01= user03_ID
	root@agent:~# echo "User01= user02_ID" > personal_data/subject_data.txt
	root@agent:~# cat personal_data/subject_data.txt
	User01= user02_ID

As you can see, syscheck alerts are tagged with gdpr_II_5.1.f.

.. code-block:: console

	** Alert 1526470666.11377: - ossec,syscheck,pci_dss_11.5,gpg13_4.11,gdpr_II_5.1.f,
	2018 May 16 13:37:46 (agent01) 192.168.1.50->syscheck
	Rule: 550 (level 7) -> 'Integrity checksum changed.'
	Integrity checksum changed for: '/root/personal_data/subject_data.txt'
	Old md5sum was: 'c86fc18b025cb03c698548a5a7e04bc1'
	New md5sum is : '425e63943d8ae5491f1769033da66456'
	Old sha1sum was: '3bef1dc414e7fe247cdca4d4900c23047e003a06'
	New sha1sum is : '048af26252c3b9eb6fd4335d5e218891f90c9037'
	What changed:
	1c1
	< User01= user03_ID
	---
	> User01= user02_ID

	File: /root/personal_data/subject_data.txt
	New size: 18
	New permissions: 100644
	New user: root (0)
	New group: root (0)
	Old MD5: c86fc18b025cb03c698548a5a7e04bc1
	New MD5: 425e63943d8ae5491f1769033da66456
	Old SHA1: 3bef1dc414e7fe247cdca4d4900c23047e003a06
	New SHA1: 048af26252c3b9eb6fd4335d5e218891f90c9037
	Old date: Wed May 16 12:18:15 2018
	New date: Wed May 16 13:32:54 2018
	New inode: 19690


.. thumbnail:: ../images/gdpr/fim_1.png
    :title: Alert visualization at Kibana Discover
    :align: center
    :width: 100%

.. thumbnail:: ../images/gdpr/fim_2.png
    :title: Filtering alerts by GDPR and file path
    :align: center
    :width: 100%

.. thumbnail:: ../images/gdpr/fim_3.png
    :title: Filtering alerts by GDPR on Wazuh App
    :align: center
    :width: 100%




