.. _ossec_pci_dss:

OSSEC PCI DSS
=============

Introduction
------------

The **Payment Card Industry Data Security Standard (PCI DSS)** is a proprietary information security standard for organizations that handle branded credit cards from the major card schemes including *Visa*, *MasterCard*, *American Express*, *Discover*, and *JCB*. The standard was created to increase controls around cardholder data to reduce credit card fraud. Validation of compliance is performed annually, either by an external *Qualified Security Assessor (QSA)* that creates a *Report on Compliance (ROC)* for organizations handling large volumes of transactions, or by *Self-Assessment Questionnaire (SAQ)* for companies handling smaller volumes.

`Here <http://wazuh.com/resources/OSSEC_PCI_DSS_Guide.pdf>`_ you will find a **document** that describes what requirements of **PCI DSS 3.1** can be met with OSSEC and how each OSSEC component can help to meet them.

This section of the documentation shows a detailed example of how each OSSEC component (analysis logs, rootcheck, syscheck, active response) can help to meet PCI DSS requirements. Also it will show how the combination OSSEC + ELK is very useful for PCI DSS.

Analysis Logs
--------------
Take a look at the following requirements:

+ *10.2.4 Invalid logical access attempts*

+ *10.2.5 Use of and changes to identification and authentication mechanisms—including but not limited to creation of new accounts and elevation of privileges—and all changes, additions, or deletions to accounts with root or administrative privileges*

In order to meet these requirements we need to log invalid logical access attempts, multiple invalid login attempts (maybe it is a brute force attack), identification and authentication mechanisms, elevation privileges, changes in accounts, etc. Most of these events are already controlled by existing rules in OSSEC. We have added a **mapping** between each rule and its corresponding PCI requirement. On this way, it is easier to analyze and visualize PCI alerts. The syntax is **pci_dss_** followed by the number of the requirement, in the above example would be: pci_dss_10.2.4 and pci_dss_10.2.5.

Examples of rules tagged with PCI requirements 10.2.4 and 10.2.5:

::

    <!--apache: access attempt -->
    <rule id="30105" level="5">
        <if_sid>30101</if_sid>
        <match>denied by server configuration</match>
        <description>Attempt to access forbidden file or directory.</description>
        <group>access_denied,pci_dss_6.5.8,pci_dss_10.2.4,</group>
    </rule>
    
    <!-- syslog-sudo: elevation of privileges -->
    <rule id="5401" level="5">
        <if_sid>5400</if_sid>
        <match>incorrect password attempt</match>
        <description>Failed attempt to run sudo</description>
        <group>pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>
    
    <rule id="5402" level="3">
        <if_sid>5400</if_sid>
        <regex> ; USER=root ; COMMAND=| ; USER=root ; TSID=\S+ ; COMMAND=</regex>
        <description>Successful sudo to ROOT executed</description>
        <group>pci_dss_10.2.5,pci_dss_10.2.2,</group>
    </rule>
    
    <!-- ssh: identification and authentication mechanisms -->
    <rule id="5712" level="10" frequency="6" timeframe="120" ignore="60">
        <if_matched_sid>5710</if_matched_sid>
        <description>SSHD brute force trying to get access to </description>
        <description>the system.</description>
        <same_source_ip />
        <group>authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>
    
    <rule id="5720" level="10" frequency="6">
        <if_matched_sid>5716</if_matched_sid>
        <same_source_ip />
        <description>Multiple SSHD authentication failures.</description>
        <group>authentication_failures,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_11.4,</group>
    </rule>
    

Rootcheck
----------
OSSEC rootcheck process performs:

+ Rootkit detection on Linux, Unix, and BSD systems.

+ Policy monitoring/enforcement: It is the process of verifying that all systems conform to a set of pre-defined policies surrounding configuration settings and approved application usage.

Both features can help to meet PCI DSS requirements.

Policy Monitoring
^^^^^^^^^^^^^^^^^^
There are requirements to verify that system are meeting some hardening standards. An example would be:

*2.2 Develop configuration standards for all system components. Assure that these standards address all known security vulnerabilities and are consistent with industry-accepted system hardening standards. Sources of industry-accepted system hardening standards may include, but are not limited to: Center for Internet Security (CIS), International Organization for Standardization (ISO), SysAdmin Audit Network Security (SANS), Institute National Institute of Standards Technology (NIST).*

OSSEC includes out-of-the-box CIS baselines for Debian and Redhat and other baselines could be created for other system. Just add the corresponding rootcheck file:

::

    <rootcheck>
        <system_audit>/var/ossec/etc/shared/cis_debian_linux_rcl.txt</system_audit>
        <system_audit>/var/ossec/etc/shared/cis_rhel_linux_rcl.txt</system_audit>
        <system_audit>/var/ossec/etc/shared/cis_rhel5_linux_rcl.txt</system_audit>
    </rootcheck>

Others controls are based on check software configuration. An example would be:

*2.2.4 Configure system security parameters to prevent misuse.*

Develop a rootcheck to check the security parameters of a software like SSH is easy:

::

    [SSH Configuration - Protocol version 1 enabled {PCI_DSS: 2.2.4}] [any]
    f:/etc/ssh/sshd_config -> !r:^# && r:Protocol\.+1;

    [SSH Configuration - Root login allowed {PCI_DSS: 2.2.4}] [any]
    f:/etc/ssh/sshd_config -> !r:^# && r:PermitRootLogin\.+yes;

If you are using *OSSEC Wazuh fork*, you can tag each rootcheck using this syntax in the rootcheck name: **{PCI_DSS: X.Y.Z}**. All rootchecks already have the tag with its corresponding PCI requirement.

Rootkit Detection
^^^^^^^^^^^^^^^^^^
Rootkit and trojans detection is performed using two files: *rootkit_files.txt* and *rootkit_trojans.txt*. Also some tests are performed to detect kernel-level rootkits. Just add the files to *ossec.conf*:

::

    <rootcheck>
        <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
        <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
    </rootcheck>

    
These are the option availables for `rootcheck component <http://ossec-docs.readthedocs.org/en/latest/syntax/head_ossec_config.rootcheck.html>`_:

+ rootkit_files: Contains the Unix-based application level rootkit signatures.
+ 
+ rootkit_trojans: Contains the Unix-based application level Trojan signatures.
+ 
+ check_files: Enable or disable the checking of rootkits. Default yes.
+ 
+ check_trojans: Enable or disable the checking of trojans. Default yes.
+ 
+ check_dev: Check for files in the /dev filesystem. Default yes.
+ 
+ check_sys: Scan the whole system for additional issues. Default yes. 
+ 
+ check_pids: Check processes. Default yes.
+ 
+ check_ports: Check all ports. Default yes.
+ 
+ check_if: Check interfaces. Default yes.

Rootcheck helps to meet the requeriment 11.4 related with intrusions, trojans and malware in general:

*11.4 Use intrusion-detection and/or intrusion-prevention techniques to detect and/or prevent intrusions into the network.
Keep all intrusion-detection and prevention engines, baselines, and signatures up to date.
Intrusion detection and/or intrusion prevention techniques (such as IDS/IPS) compare the traffic coming into the network with known “signatures” and/or behaviors of thousands of compromise types (hacker tools, Trojans, and other malware), and send alerts and/or stop the attempt as it happens.*


File Integrity Monitoring
--------------------------
File integrity Monitoring (syscheck) is performed by comparing the cryptographic checksum of a known good file against the checksum of the file after it has been modified. The OSSEC agent scans the system at an interval you specify, and it sends the checksums of the monitored files and registry keys (Windows systems) to the OSSEC server. The server stores the checksums and looks for modifications by comparing the newly received checksums against the historical checksum values of that file or registry key. An alert is sent if anything changes.

`Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_  can be used to meet the requirement 11.5:

*11.5 Deploy a change-detection mechanism (for example, file-integrity monitoring tools) to alert personnel to unauthorized modification (including changes, additions, and deletions) of critical system files, configuration files, or content files; and configure the software to perform critical file comparisons at least weekly.*

Active response
----------------
Although `active response <http://ossec-docs.readthedocs.org/en/latest/manual/ar/index.html>`_ is not discussed in PCI DSS, it is important to mention that an automated remediation to security violations and threats is a powerful tool that reduce the risk. Active response allows a scripted action to be performed whenever a rules matched in your OSSEC ruleset. Remedial action could be firewall block/drop, traffic shaping or throttling, account lockout, etc.

ELK
----
`OSSEC Wazuh integration with ELK Stack <http://wazuh-documentation.readthedocs.org/en/latest/ossec_elk.html>`_ comes with out-of-the-box dashboards for PCI DSS compliance and CIS benchmark. You can do forensic and historical analysis of the alerts and store your data for several years, in a reliable and scalable platform.

The following requirements can be met with a combination of OSSEC + ELK:

+ *10.5 Secure audit trails so they cannot be altered.*
+ 
+ *10.6.1 Review the following at least daily: All security events, Logs of all critical system components, etc.*
+ 
+ *10.7 Retain audit trail history for at least one year, with a minimum of three months immediately available for analysis*

What's next
------------

Once you know how OSSEC can help with PCI DSS, we encourage you to move forward and try out ELK integration or the OSSEC Wazuh ruleset, check them on:


* :ref:`ELK Stack integration guide <ossec_elk>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
