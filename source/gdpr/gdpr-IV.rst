.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr_IV:

GDPR IV
=======

Chapter IV, Controller and processor
------------------------------------

Management of the control and processing of the data. Formal requirement. 

Chapter IV, Article 24, Head 2
------------------------------

.. note::
	Article

Be able to demonstrate GDPR compliance by complying with data protection policies. In most cases, it will be necessary to comply with additional security and data protection policies, therefore, the entity in charge of processing and storing the data must be able to comply with these policies.

With the service of Policy and compliance monitoring, Wazuh monitors configuration files to ensure they are compliant with your security policies, standards and/or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, unpatched, or insecurely configured. 
Policy monitoring is the process of verifying that all systems conform to a set of predefined rules regarding configuration settings and approved application usage. Wazuh uses three components to perform this task: Rootcheck, OpenSCAP and CIS-CAT.

Use cases
^^^^^^^^^

Chapter IV, Article 28, Head 3 (c) 
----------------------------------

.. note::
	Article

Ensuring data protection during processing, through technical and organizational measures. In the process of processing data, it is necessary to ensure the protection and integrity of the same in order to avoid any alteration that may be harmful to the individual to whom the information belongs.

By using `Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_ and through technical measures, Wazuh can ensure this protection, monitoring and ensuring that the protection measures established in the security policies are complied with.

Use cases
^^^^^^^^^

Chapter IV, Article 30, head 1 (g)
----------------------------------

.. note::
	Article

It is necessary to keep all processing activities documented, to carry out an inventory of data from beginning to end and an audit, in order to know all the places where personal and sensitive data are located, processed, stored or transmitted.

Wazuh facilitates the development of documentation with a large amount of information about file access and security. It offers the possibility to store all the events that the manager receives in archives logs, in addition to storing alerts in alert logs and being able to use more logs and databases for various purposes, such as possible audits.

Use cases
^^^^^^^^^

Chapter IV, Article 32, Head 1, (c)
-----------------------------------

.. note::
	Article

Tools may be needed to block or quarantine such data streams as a DLP might do. Properly classify current data to determine specific categories of data that will be subject to GDPR.

Through active response, Wazuh can execute an action according to Syscheck alerts. These actions can create the desired quarantine zone for the specified data. Wazuh also provides the ability to create specific rules for categorizing files. It also performs various countermeasures to address active threats, such as blocking access to an agent from the source of the threat when certain criteria are met and executes a script in response to the activation of specific alerts based on the alert level or rule group. Any number of scripts can be started in response to a trigger.

Use cases
^^^^^^^^^

Chapter IV, Article 32,  Head 2
-------------------------------

.. note::
	Article

To control access to data, you will need account management tools that closely monitor actions taken by standard administrators and users using standard or privileged account credentials. In this way, the data protection officer will be able to check who is accessing and processing the data, whether they are authorized to do so and whether they are who they say they are.

Wazuh offers functionalities to monitor access and use of standard or privileged accounts through its multiple monitoring tools.

Use cases
^^^^^^^^^

Chapter IV, Article 33 
----------------------

.. note::
	Article

Notify the supervisory authority of a violation of the data in 72 hours and in certain cases, the injured parties. It is a required obligation, any breach of security that endangers the data stored or any violation of the integrity and security of the same must be reported within the established period of time with a maximum delay of 72 hours.

Wazuh can facilitate this communication, for example, with the notice by mail when a specific alert is triggered, or a group of alerts, related to the monitoring of the files that contain the personal data. The rules used in event analysis can be configured to send emails to the relevant security officers.

Use cases
^^^^^^^^^

Chapter IV, Article 35, Head 1
------------------------------

.. note::
	Article

Perform a data protection impact evaluation for elevated risk processes. Implement appropriate technical measures to safeguard the rights and freedoms of data subjects, informed by an assessment of the risks to these rights and freedoms.

Wazuh has security measures in place to safeguard personal data, as well as the ability to support risk assessment by categorizing Syschek alerts for certain files. For example, you can add the alert level of an event to support a risk assessment.

Use cases
^^^^^^^^^

Chapter IV, Article 35, Head 7 (d)
----------------------------------

.. note::
	Article

Necessary security measures include data breach identification, blocking and forensic investigation capabilities for rapid understanding of access attempts through active breaches by malicious actors, such as through compromised credentials, unauthorized network access, active advanced persistent threats and verification of the correct operation of all components.

Security tools will be needed to prevent the entry of unwanted data types and malicious threats, and to ensure that endpoints are not compromised when requesting access to the network, system and data. Anti-malware and anti-ransomware to ensure the integrity, availability, and resilience of data systems, blocking and preventing malware and rescue threats from entering devices.

Behavioral analysis services that use machine intelligence to identify people who do anomalous things on the network may be required to provide early visibility and alert employees who become corrupt. Such tools can also highlight bizarre activities, such as employees logged on to devices in two different countries, which almost certainly means they are at risk for accounts.


To meet these security requirements, Wazuh provides solutions such as Intrusion and anomaly detection. Agents scan the system looking for malware, rootkits or suspicious anomalies. They can detect hidden files, cloaked processes or unregistered network listeners, as well as inconsistencies in system call responses. In addition, the integration of Wazuh with NIDS is viable.

Anomaly detection refers to the action of finding patterns in the system that do not match the expected behavior. Once malware (e.g., a rootkit) is installed on a system, it modifies the system to hide itself from the user. Although malware uses a variety of techniques to accomplish this, Wazuh uses a broad-spectrum approach to finding anomalous patterns that indicate possible intruders. The main component responsible for this task is Rootcheck, however, Syscheck also plays a significant role.

We may be aware of application or system errors, misconfigurations, attempted and/or successful malicious activity, policy violations and a variety of other operational and security issues through Wazuh rules. Using Automated logs analysis Wazuh agents read operating system and application logs, and securely forward them to a central manager for rule-based analysis and storage. 
It is worth highlighting the ability to detect vulnerabilities. Now agents are able to natively collect a list of installed applications, sending it periodically to the manager (where it is stored in local sqlite databases, one per agent). In addition, the manager builds a global vulnerabilities database, using public OVAL CVE repositories, using it later to cross correlate this information with agent’s applications inventory data.

Use cases
^^^^^^^^^


Chapter IV, Article 37
----------------------

Designate a data protection officer. Formal requirement. 