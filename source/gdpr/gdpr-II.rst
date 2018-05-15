.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr_II:

GDPR II
=======

Chapter II, Principles
----------------------

Basic principles of the regulation. Formal requirement.


Chapter II, Article 5 Head 1(f)
-------------------------------

**Article 5**  Principles relating to processing of personal data. **Head 1(f)**. processed in a manner that ensures appropriate security of the personal data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organisational measures ('integrity and confidentiality').

It is necessary to ensure the confidentiality, integrity, availability and resilience of the processing systems and services, verifying their modifications, accesses, locations and guaranteeing their security, as well as of the stored data. To have controlled at all times the accesses to the data, when these accesses take place, by whom and to control the processing carried out on the data. 

Data protection and file sharing technologies that meet data protection requirements are also required, as it is vitally important to know the purpose of the data processing and whether the data processor is authorized to do so in the case of third parties.

One of the solutions that Wazuh offers us is file integrity monitoring. Wazuh monitors the file system, identifying changes in content, permissions, ownership, and attributes of files that you need to keep an eye on.

Wazuh’s File integrity monitoring (FIM) watches specified files triggering alerts when these files are modified. The component responsible for this task is called `Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`. This component stores the cryptographic checksum and other attributes of a known good file or Windows registry key and regularly compares it to the current file being used by the system, watching for changes, being possible multiple configurations, for example to do the monitoring in real time, in intervals of time, only on specific objectives, etc. In the same way that personal data files are monitored, Wazuh can monitor the sharing files to make sure they are protected.

File integrity monitoring (Syscheck) is performed by comparing the cryptographic checksum and other attributes of a known good file against the checksum and attributes of that file after it has been modified.

First, the Wazuh agent scans the system at an interval you specify, and it sends the checksums of the monitored files and registry keys (for Windows systems) to the Wazuh server. Then, the server stores the checksums and looks for modifications by comparing the newly received checksums against the historical checksum values for those files and/or registry keys. An alert is sent if the checksum (or another file attribute) changes. Wazuh also supports near real-time file integrity checking where this is desired.

The syntax used for rule tagging is **gdpr_** followed by the chapter, article and, where appropriate, the section and paragraph to which the requirement belongs.  (e.g., gdpr_II_5.1.f).

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

