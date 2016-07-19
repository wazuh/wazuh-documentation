.. _ossec_pci_dss:

PCI DSS
=================

Introduction
------------

The **Payment Card Industry Data Security Standard (PCI DSS)** is a proprietary information security standard for organizations that handle branded credit cards from the major card schemes including *Visa*, *MasterCard*, *American Express*, *Discover*, and *JCB*. The standard was created to increase controls around cardholder data to reduce credit card fraud.

OSSEC helps to implement PCI DSS by performing log analysis, file integrity checking, policy monitoring, intrusion detection, real-time alerting and active response. This guide (`pdf <http://ossec.wazuh.com/ruleset/PCI_Guide.pdf>`_, `excel <http://ossec.wazuh.com/ruleset/PCI_Guide.xlsx>`_) explains how these capabilities help with each of the standard requirements.

In the following section we will elaborate some specific use cases that are use as an example on how to use OSSEC main capabilities to meet the standard requirements.

Log analysis
------------

Here we will use OSSEC log analysis collection and analysis capabilities to meet the following PCI DSS controls:

+ *10.2.4 Invalid logical access attempts*

+ *10.2.5 Use of and changes to identification and authentication mechanisms—including but not limited to creation of new accounts and elevation of privileges—and all changes, additions, or deletions to accounts with root or administrative privileges*

These controls require us to log invalid logical access attempts, multiple invalid login attempts (possible brute force attacks), elevation privileges, changes in accounts, etc. To achieve this, we have added PCI DSS tags to OSSEC log analysis rules, mapping them to the corresponding requirement. This way, it will be easy to analyze and visualize our PCI DSS related alerts.

The syntax used for rule tagging is **pci_dss_** followed by the number of the requirement. In this case those would be: pci_dss_10.2.4 and pci_dss_10.2.5.

See below examples of OSSEC rules tagged for PCI requirements 10.2.4 and 10.2.5:

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


Use cases
^^^^^^^^^

As an example, in this scenario, we try to open the file *cardholder_data.txt*. Since our current user doesn't have read access to the file, we run *sudo* to elevate privileges.

.. image:: images/pci/log_analysis_1.png
    :align: center
    :width: 100%

Using *sudo* log analysis decoder and rules, OSSEC will generate an alert for this particular action. Since we have JSON output enabled, we can see the alert in both files *alerts.log* and *alerts.json*. Using the rule tags we can also see which PCI DSS requirements are specifically related to this alert.

.. image:: images/pci/log_analysis_2.png
    :align: center
    :width: 100%

Kibana displays information in an organized way, allowing filtering by different type of alert fields, including compliance controls. We have also developed some specific dashboards to display the PCI DSS related alerts.

.. image:: images/pci/log_analysis_3.png
    :align: center
    :width: 100%

.. image:: images/pci/log_analysis_4.png
    :align: center
    :width: 100%

Rootcheck - Policy monitoring
-----------------------------

OSSEC rootcheck module can be used to enforce and monitor your security policy. This is the process of verifying that all systems conform to a set of pre-defined rules surrounding configuration settings and approved application usage.

There are several PCI DSS requirements to verify that systems are properly hardened. An example would be:

*2.2 Develop configuration standards for all system components. Assure that these standards address all known security vulnerabilities and are consistent with industry-accepted system hardening standards. Sources of industry-accepted system hardening standards may include, but are not limited to: Center for Internet Security (CIS), International Organization for Standardization (ISO), SysAdmin Audit Network Security (SANS), Institute National Institute of Standards Technology (NIST).*

OSSEC includes out-of-the-box CIS baselines for Debian and Redhat and other baselines could be created for other systems or applications, just by adding the corresponding rootcheck file:

::

    <rootcheck>
        <system_audit>/var/ossec/etc/shared/cis_debian_linux_rcl.txt</system_audit>
        <system_audit>/var/ossec/etc/shared/cis_rhel_linux_rcl.txt</system_audit>
        <system_audit>/var/ossec/etc/shared/cis_rhel5_linux_rcl.txt</system_audit>
    </rootcheck>

Other PCI DSS requirements will ask us to check that applications (specially network services) are configured in a secure way. One example is the following control:

*2.2.4 Configure system security parameters to prevent misuse.*

Here is a good examples of rootcheck rules developed to check the configuration of SSH services:

::

    [SSH Configuration - Protocol version 1 enabled {PCI_DSS: 2.2.4}] [any]
    f:/etc/ssh/sshd_config -> !r:^# && r:Protocol\.+1;

    [SSH Configuration - Root login allowed {PCI_DSS: 2.2.4}] [any]
    f:/etc/ssh/sshd_config -> !r:^# && r:PermitRootLogin\.+yes;

In our :ref:`OSSEC Wazuh fork <wazuh_installation>`, your rootcheck rules use this syntax in the rootcheck name: **{PCI_DSS: X.Y.Z}**. Meaning that all rootchecks already have the PCI DSS requirement tag.

Use cases
^^^^^^^^^

In order to check the security parameters of SSH (and meet the requirement 2.2.4), we have developed the rootchecks *system_audit_ssh*. In our example, when OSSEC run the rootcheck scan, it is able to detect some errors in the SSH configuration.

.. image:: images/pci/policy_monitoring_1.png
    :align: center
    :width: 100%

Kibana shows the full information about the alert.

.. image:: images/pci/policy_monitoring_2.png
    :align: center
    :width: 100%

.. image:: images/pci/policy_monitoring_3.png
    :align: center
    :width: 100%

Rootcheck - Rootkits detection
------------------------------

Rootkit and trojan detection is performed using two files: *rootkit_files.txt* and *rootkit_trojans.txt*. Also some tests are performed to detect kernel-level rootkits. You can use this capabilities adding the files to *ossec.conf*:

::

    <rootcheck>
        <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
        <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
    </rootcheck>

As well these are the option availables for `rootcheck component <http://ossec-docs.readthedocs.org/en/latest/syntax/head_ossec_config.rootcheck.html>`_:

+ rootkit_files: Contains the Unix-based application level rootkit signatures.

+ rootkit_trojans: Contains the Unix-based application level trojan signatures.

+ check_files: Enable or disable the rootkit checks. Default yes.

+ check_trojans: Enable or disable the trojan checks. Default yes.

+ check_dev: Check for suspicious files in the /dev filesystem. Default yes.

+ check_sys: Scan the whole system for anomalies detection. Default yes.

+ check_pids: Check processes. Default yes.

+ check_ports: Check all ports. Default yes.

+ check_if: Check interfaces. Default yes.

Rootcheck helps to meet PCI DSS requeriment 11.4 related with intrusions, trojans and malware in general:

*11.4 Use intrusion-detection and/or intrusion-prevention techniques to detect and/or prevent intrusions into the network. Keep all intrusion-detection and prevention engines, baselines, and signatures up to date. Intrusion detection and/or intrusion prevention techniques (such as IDS/IPS) compare the traffic coming into the network with known “signatures” and/or behaviors of thousands of compromise types (hacker tools, Trojans, and other malware), and send alerts and/or stop the attempt as it happens.*

Use cases
^^^^^^^^^

OSSEC performs several tests to detect rootkits, one of them is to check the hidden files in /dev. The */dev* directory should only contain device-specific files such as the primary IDE hard disk (/dev/hda), the kernel random number generators (/dev/random and /dev/urandom), etc. Any additional files, outside of the expected device-specific files, should be inspected because many rootkits use /dev as a storage partition to hide files. In the following example we have created the file .hid which is detected by OSSEC and generates the corresponding alert.

::

    [root@manager /]# ls -a /dev | grep '^\.'
    .
    ..
    .hid
    [root@manager /]# tail -n 25 /var/ossec/logs/alerts/alerts.log
    Rule: 502 (level 3) -> 'Ossec server started.'
    ossec: Ossec started.

    ** Alert 1454086362.26393: mail  - ossec,rootcheck
    2016 Jan 29 16:52:42 manager->rootcheck
    Rule: 510 (level 7) -> 'Host-based anomaly detection event (rootcheck).'
    File '/dev/.hid' present on /dev. Possible hidden file.

File Integrity Monitoring
--------------------------

File integrity Monitoring (syscheck) is performed by comparing the cryptographic checksum of a known good file against the checksum of the file after it has been modified. The OSSEC agent scans the system at an interval you specify, and it sends the checksums of the monitored files and registry keys (Windows systems) to the OSSEC server. The server stores the checksums and looks for modifications by comparing the newly received checksums against the historical checksum values of that file or registry key. An alert is sent if anything changes.

`Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_  can be used to meet the PCI DSS requirement 11.5:

*11.5 Deploy a change-detection mechanism (for example, file-integrity monitoring tools) to alert personnel to unauthorized modification (including changes, additions, and deletions) of critical system files, configuration files, or content files; and configure the software to perform critical file comparisons at least weekly.*

Use cases
^^^^^^^^^

In this example, we have configured OSSEC to detect changes in the file */home/credit_cards*.

::

    <syscheck>
        <directories check_all="yes">/home/credit_cards</directories>
    </syscheck>

So, when we modify the file, OSSEC generates an alert.

.. image:: images/pci/fim_1.png
    :align: center
    :width: 100%

As you can see, syscheck alerts are tagged with the requirement 11.5.

.. image:: images/pci/fim_2.png
    :align: center
    :width: 100%

.. image:: images/pci/fim_3.png
    :align: center
    :width: 100%

.. image:: images/pci/fim_4.png
    :align: center
    :width: 100%


Active response
---------------

Although `active response <http://ossec-docs.readthedocs.org/en/latest/manual/ar/index.html>`_ is not explicitely discussed in PCI DSS, it is important to mention that an automated remediation to security violations and threats is a powerful tool that reduce the risk. Active response allows a scripted action to be performed whenever a rules matched in your OSSEC ruleset. Remedial action could be firewall block/drop, traffic shaping or throttling, account lockout, etc.

ELK
---

`OSSEC Wazuh integration with ELK Stack <http://documentation.wazuh.com/en/latest/ossec_elk.html>`_ comes with out-of-the-box dashboards for PCI DSS compliance and CIS benchmark. You can do forensic and historical analysis of the alerts and store your data for several years, in a reliable and scalable platform.

The following requirements can be met with a combination of OSSEC + ELK Stack:

+ *10.5 Secure audit trails so they cannot be altered.*

+ *10.6.1 Review the following at least daily: All security events, Logs of all critical system components, etc.*

+ *10.7 Retain audit trail history for at least one year, with a minimum of three months immediately available for analysis*

What's next
-----------

Once you know how OSSEC can help with PCI DSS, we encourage you to move forward and try out ELK integration or the OSSEC Wazuh ruleset, check them on:

* :ref:`ELK Stack integration guide <ossec_elk>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
