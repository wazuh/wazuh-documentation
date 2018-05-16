.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr_IV:

GDPR IV
=======

Chapter IV, Controller and processor
------------------------------------

Management of the control and processing of the data. The requirements mentioned in this section are of a formal nature and the option of extracting technical requirements for compliance through the support of Wazuh is not viable. 

Chapter IV, Article 24, Head 2
------------------------------

.. code-block:: console

	**Article 24**  Responsibility of the controller. **Head 2**. Where proportionate in relation to processing activities, the measures referred to in paragraph 1 shall include the implementation of appropriate data protection policies by the controller.

Be able to demonstrate GDPR compliance by complying with data protection policies. In most cases, it will be necessary to comply with additional security and data protection policies, therefore, the entity in charge of processing and storing the data must be able to comply with these policies.

With the service of Policy and compliance monitoring, Wazuh monitors configuration files to ensure they are compliant with your security policies, standards and/or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, unpatched, or insecurely configured. 

Policy monitoring is the process of verifying that all systems conform to a set of predefined rules regarding configuration settings and approved application usage. Wazuh uses three components to perform this task: `Rootcheck <https://documentation.wazuh.com/current/user-manual/capabilities/policy-monitoring/rootcheck/how-it-works.html>`_, `OpenSCAP <https://documentation.wazuh.com/current/user-manual/capabilities/policy-monitoring/openscap/index.html>`_ and `CIS-CAT <https://documentation.wazuh.com/current/user-manual/capabilities/policy-monitoring/ciscat/ciscat.html>`_.

Use cases
^^^^^^^^^

We can use rootcheck to monitor security policies. The first thing to do is to enable the appropriate rootcheck file. 

.. code-block:: console

	root@agente:/home/agente# cat /var/ossec/etc/ossec.conf | grep system_audit_ssh -B 4 -A 2
	<rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
	<rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
	<system_audit>/var/ossec/etc/shared/cis_debian_linux_rcl.txt</system_audit>
	<system_audit>/var/ossec/etc/shared/system_audit_rcl.txt</system_audit>
	<system_audit>/var/ossec/etc/shared/system_audit_ssh.txt</system_audit>

If enabled, the file ``archives.log`` stores every log parsed by the Wazuh engine, whether it becomes an alert or not:

.. code-block:: console

	root@manager:/home/manager# tail -f /var/ossec/logs/archives/archives.log
	2018 May 16 17:14:45 (agent01) 192.168.1.50->rootcheck Ending syscheck scan.
	2018 May 16 17:14:58 manager->rootcheck Starting rootcheck scan.
	2018 May 16 17:15:06 manager->rootcheck System Audit: SSH Hardening - 3: Root can log in. File: /etc/ssh/sshd_config. Reference: 3 .
	2018 May 16 17:15:06 manager->rootcheck System Audit: SSH Hardening - 4: No Public Key authentication {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 4 .
	2018 May 16 17:15:06 manager->rootcheck System Audit: SSH Hardening - 5: Password Authentication {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 5 .
	2018 May 16 17:15:06 manager->rootcheck System Audit: SSH Hardening - 6: Empty passwords allowed {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 6 .
	2018 May 16 17:15:06 manager->rootcheck System Audit: SSH Hardening - 7: Rhost or shost used for authentication {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 7 .
	2018 May 16 17:15:06 manager->rootcheck System Audit: SSH Hardening - 8: Wrong Grace Time {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 8 .
	2018 May 16 17:15:06 manager->rootcheck System Audit: SSH Hardening - 9: Wrong Maximum number of authentication attempts {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 9 .


Chapter IV, Article 28, Head 3 (c) 
----------------------------------

.. code-block:: console

	**Article 28**  Processor. **Head 3 (c)**. Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: takes all measures required pursuant to Article 32

Ensuring data protection during processing, through technical and organizational measures. In the process of processing data, it is necessary to ensure the protection and integrity of the same in order to avoid any alteration that may be harmful to the individual to whom the information belongs.

By using `Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_ and through technical measures, Wazuh can ensure this protection, monitoring and ensuring that the protection measures established in the security policies are complied with.

Use cases
^^^^^^^^^

Chapter IV, Article 30, Head 1 (g)
----------------------------------

.. code-block:: console

	**Article 30** Records of processing activities. **Head 1 (g)**. Each controller and, where applicable, the controller's representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: where possible, a general description of the technical and organisational security measures referred to in Article 32(1).

It is necessary to keep all processing activities documented, to carry out an inventory of data from beginning to end and an audit, in order to know all the places where personal and sensitive data are located, processed, stored or transmitted.

Wazuh facilitates the development of documentation with a large amount of information about file access and security. It offers the possibility to store all the events that the manager receives in archives logs through `Log data collection <https://documentation.wazuh.com/current/user-manual/capabilities/log-data-collection/how-it-works.html>`_, in addition to storing alerts in alert logs and being able to use more logs and databases for various purposes, such as possible audits.

Here is an example of OSSEC rules tagged gdpr_IV_30.1.g:

.. code-block:: xml

	<rule id="516" level="3">
		<if_sid>510</if_sid>
		<match>^System Audit</match>
		<description>System Audit event.</description>
		<group>rootcheck,gdpr_IV_30.1.g,</group>
	</rule>

Use cases
^^^^^^^^^

Wazuh will generate an alert like this.

.. code-block:: console

	** Alert 1526470326.10972: - ossec,rootcheck,gdpr_IV_30.1.g,
	2018 May 16 13:32:06 (agent01) 192.168.1.50->rootcheck
	Rule: 516 (level 3) -> 'System Audit event.'
	System Audit: SSH Hardening - 9: Wrong Maximum number of authentication attempts {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 9 .
	title: SSH Hardening - 9: Wrong Maximum number of authentication attempts
	file: /etc/ssh/sshd_config

We can also see the event stored in our log file ``archives.log``, as long as the ``log_all`` option is activated.

.. code-block:: console

2018 May 16 16:03:55 manager->rootcheck System Audit: SSH Hardening - 9: Wrong Maximum number of authentication attempts {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 9 .

.. thumbnail:: ../images/gdpr/audit_1.png
    :title: Alert visualization at Kibana Discover
    :align: center
    :width: 100%

.. thumbnail:: ../images/gdpr/audit_2.png
    :title: Filtering alerts by GDPR on Wazuh App
    :align: center
    :width: 100%


Chapter IV, Article 32, Head 1, (c)
-----------------------------------

.. code-block:: console

	**Article 32** Security of processing. **Head 1 (c)**. Taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing as well as the risk of varying likelihood and severity for the rights and freedoms of natural persons, the controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including inter alia as appropriate: the ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident.


Tools may be needed to block or quarantine such data streams as a DLP might do. Properly classify current data to determine specific categories of data that will be subject to GDPR.

Through `active response <https://documentation.wazuh.com/current/user-manual/capabilities/active-response/index.html>`_, Wazuh can execute an action according to Syscheck alerts. These actions can create the desired quarantine zone for the specified data. Wazuh also provides the ability to create specific rules for categorizing files. It also performs various countermeasures to address active threats, such as blocking access to an agent from the source of the threat when certain criteria are met and executes a script in response to the activation of specific alerts based on the alert level or rule group. Any number of scripts can be started in response to a trigger.

Use cases
^^^^^^^^^

Chapter IV, Article 32,  Head 2
-------------------------------

.. code-block:: console

	**Article 32** Security of processing. **Head 2**. In assessing the appropriate level of security account shall be taken in particular of the risks that are presented by processing, in particular from accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to personal data transmitted, stored or otherwise processed.

To control access to data, you will need account management tools that closely monitor actions taken by standard administrators and users using standard or privileged account credentials. In this way, the data protection officer will be able to check who is accessing and processing the data, whether they are authorized to do so and whether they are who they say they are.

Wazuh offers functionalities to monitor access and use of standard or privileged accounts through its multiple monitoring tools.

Here is an example of OSSEC rules tagged gdpr_IV_32.2:

.. code-block:: xml

	<rule id="5710" level="5">
		<if_sid>5700</if_sid>
		<match>illegal user|invalid user</match>
		<description>sshd: Attempt to login using a non-existent user</description>
		<group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gdpr_IV_35.7.d,gdpr_IV_32.2,</group>
	</rule>


Use cases
^^^^^^^^^

Wazuh will generate an alert like this.

.. code-block:: console

	** Alert 1526481285.44363: - syslog,sshd,invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gdpr_IV_35.7.d,gdpr_IV_32.2,
	2018 May 16 16:34:45 (agent01) 192.168.1.50->/var/log/auth.log
	Rule: 5710 (level 5) -> 'sshd: Attempt to login using a non-existent user'
	Src IP: 192.168.1.64
	May 16 16:34:44 agente sshd[10485]: Failed password for invalid user Evil_User from 192.168.1.64 port 49806 ssh2

.. thumbnail:: ../images/gdpr/access_1.png
    :title: Alert visualization at Kibana Discover
    :align: center
    :width: 100%

.. thumbnail:: ../images/gdpr/access_2.png
    :title: Filtering alerts by GDPR on Wazuh App
    :align: center
    :width: 100%


Chapter IV, Article 33 
----------------------

.. code-block:: console

	**Article 33**  Notification of a personal data breach to the supervisory authority.

Notify the supervisory authority of a violation of the data in 72 hours and in certain cases, the injured parties. It is a required obligation, any breach of security that endangers the data stored or any violation of the integrity and security of the same must be reported within the established period of time with a maximum delay of 72 hours.

Wazuh can facilitate this communication, for example, with the notice by `mail <https://documentation.wazuh.com/current/user-manual/manager/manual-email-report/index.html>`_ when a specific alert is triggered, or a group of alerts, related to the monitoring of the files that contain the personal data. The rules used in event analysis can be configured to send emails to the relevant security officers.

Use cases
^^^^^^^^^

A sample email could be: 

.. code-block:: console

	From: Wazuh <watcher@example.com>               5:03 PM (2 minutes ago)
	to: me
	-----------------------------
	Wazuh Notification.
	2017 Mar 08 17:03:05

	Received From: localhost->/var/log/secure
	Rule: 5503 fired (level 5) -> "PAM: User login failed."
	Src IP: 192.168.1.37
	Portion of the log(s):

	Mar  8 17:03:04 localhost sshd[67231]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.37
	uid: 0
	euid: 0
	tty: ssh

	 --END OF NOTIFICATION

A basic configuration could be:	 

.. code-block:: xml

	<ossec_config>
	    <global>
	        <email_notification>yes</email_notification>
	        <email_to>data_protection_officer@test.com</email_to>
	        <smtp_server>mail.test.com..</smtp_server>
	        <email_from>wazuh@test.com</email_from>
	    </global>
	    ...
	</ossec_config>


Chapter IV, Article 35, Head 1
------------------------------

.. code-block:: console

	**Article 35** Data protection impact assessment. **Head 1 **.Where a type of processing in particular using new technologies, and taking into account the nature, scope, context and purposes of the processing, is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall, prior to the processing, carry out an assessment of the impact of the envisaged processing operations on the protection of personal data. A single assessment may address a set of similar processing operations that present similar high risks.

Perform a data protection impact evaluation for elevated risk processes. Implement appropriate technical measures to safeguard the rights and freedoms of data subjects, informed by an assessment of the risks to these rights and freedoms.

Wazuh has security measures in place to safeguard personal data, as well as the ability to support risk assessment by categorizing Syschek alerts for certain files. For example, you can add the alert level of an event to support a risk assessment.

Use cases
^^^^^^^^^

Chapter IV, Article 35, Head 7 (d)
----------------------------------

.. code-block:: console

	**Article 35** Data protection impact assessment. **Head 7 (f) ** The assessment shall contain at least the measures envisaged to address the risks, including safeguards, security measures and mechanisms to ensure the protection of personal data and to demonstrate compliance with this Regulation taking into account the rights and legitimate interests of data subjects and other persons concerned.

Necessary security measures include data breach identification, blocking and forensic investigation capabilities. Anti-malware and anti-ransomware to ensure the integrity, availability, and resilience of data systems, blocking and preventing malware and rescue threats from entering devices.Behavioral analysis services that use machine intelligence to identify people who do anomalous things on the network may be required to provide early visibility and alert employees who become corrupt. 
To meet these security requirements, Wazuh provides solutions such as Intrusion and anomaly detection. Agents scan the system looking for malware, rootkits or suspicious anomalies. They can detect hidden files, cloaked processes or unregistered network listeners, as well as inconsistencies in system call responses. In addition, the integration of Wazuh with NIDS is viable.

Anomaly detection refers to the action of finding patterns in the system that do not match the expected behavior. Once malware (e.g., a rootkit) is installed on a system, it modifies the system to hide itself from the user. Although malware uses a variety of techniques to accomplish this, Wazuh uses a broad-spectrum approach to finding anomalous patterns that indicate possible intruders. The main component responsible for this task is Rootcheck, however, Syscheck also plays a significant role.

We may be aware of application or system errors, misconfigurations, attempted and/or successful malicious activity, policy violations and a variety of other operational and security issues through Wazuh rules. Using Automated logs analysis Wazuh agents read operating system and application logs, and securely forward them to a central manager for rule-based analysis and storage. 

It is worth highlighting the ability to detect vulnerabilities. Now agents are able to natively collect a list of installed applications, sending it periodically to the manager (where it is stored in local sqlite databases, one per agent). In addition, the manager builds a global vulnerabilities database, using public OVAL CVE repositories, using it later to cross correlate this information with agent’s applications inventory data.

Here is an example of OSSEC rules tagged gdpr_IV_32.2:

.. code-block:: xml

	<rule id="5712" level="10" frequency="6" timeframe="120" ignore="60">
		<if_matched_sid>5710</if_matched_sid>
		<description>sshd: brute force trying to get access to </description>
		<description>the system.</description>
		<same_source_ip />
		<group>authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,gdpr_IV_35.7.d,gdpr_IV_32.2,</group>
	</rule>

Use cases
^^^^^^^^^

Wazuh will generate an alert like this.

.. code-block:: console

	** Alert 1526481936.95480: - syslog,sshd,authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,gdpr_IV_35.7.d,gdpr_IV_32.2,
	2018 May 16 16:45:36 (agent01) 192.168.1.50->/var/log/auth.log
	Rule: 5712 (level 10) -> 'sshd: brute force trying to get access to the system.'
	Src IP: 192.168.1.64
	May 16 16:45:35 agente sshd[10549]: Failed password for invalid user Evil_User from 192.168.1.64 port 49894 ssh2
	May 16 16:45:32 agente sshd[10549]: Invalid user Evil_User from 192.168.1.64 port 49894
	May 16 16:45:31 agente sshd[10547]: Failed password for invalid user Evil_User from 192.168.1.64 port 49892 ssh2
	May 16 16:45:28 agente sshd[10547]: Failed password for invalid user Evil_User from 192.168.1.64 port 49892 ssh2
	May 16 16:45:27 agente sshd[10547]: Failed password for invalid user Evil_User from 192.168.1.64 port 49892 ssh2
	May 16 16:45:24 agente sshd[10547]: Invalid user Evil_User from 192.168.1.64 port 49892
	May 16 16:44:58 agente sshd[10545]: Failed password for invalid user Evil_User from 192.168.1.64 port 49890 ssh2
	May 16 16:44:56 agente sshd[10545]: Failed password for invalid user Evil_User from 192.168.1.64 port 49890 ssh2


.. thumbnail:: ../images/gdpr/brute_1.png
    :title: Alert visualization at Kibana Discover
    :align: center
    :width: 100%

.. thumbnail:: ../images/gdpr/brute_2.png
    :title: Filtering alerts by GDPR on Wazuh App
    :align: center
    :width: 100%

Chapter IV, Article 37
----------------------

Designate a data protection officer. The requirements mentioned in this section are of a formal nature and the option of extracting technical requirements for compliance through the support of Wazuh is not viable. 