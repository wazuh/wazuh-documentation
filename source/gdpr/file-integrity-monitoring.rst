.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr_file_integrity_monitoring:

File integrity monitoring
=========================

File integrity monitoring (Syscheck) is performed by comparing the cryptographic checksum and other attributes of a known good file against the checksum and attributes of that file after it has been modified.

First, the Wazuh agent scans the system at an interval you specify, and it sends the checksums of the monitored files and registry keys (for Windows systems) to the Wazuh server. Then, the server stores the checksums and looks for modifications by comparing the newly received checksums against the historical checksum values for those files and/or registry keys. An alert is sent if the checksum (or another file attribute) changes. Wazuh also supports near real-time file integrity checking where this is desired.

`Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_  can be used to meet the GDPR requirement found in chapter II Principles, article 5, head 1(f).

**Article 5**  Principles relating to processing of personal data. **Head 1(f)**. processed in a manner that ensures appropriate security of the personal data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organisational measures ('integrity and confidentiality').

The syntax used for rule tagging is gdpr_ followed by the chapter, article and, where appropriate, the section and paragraph to which the requirement belongs.  (e.g., gdpr_II_5.1.f).

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
---------

In this example, we have configured Wazuh to detect changes in the file ``/root/personal_data``.

.. code-block:: xml

    <syscheck>
        <directories check_all="yes" report_changes="yes">/root/personal_data</directories>
    </syscheck>

So, when we modify the file, Wazuh generates an alert.

