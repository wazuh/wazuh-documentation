.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR IV (The General Data Protection Regulation of the European Union). 
  
GDPR IV, Controller and processor <gdpr_IV>
===========================================

In this chapter, GDPR describes requirements related to managing, controlling, and processing personal data.

Chapter IV, Article 24, Head 2
------------------------------

**Responsibility of the controller, Head 2**: *“Where proportionate in relation to processing activities, the measures referred to in paragraph 1 shall include the implementation of appropriate data protection policies by the controller.”*

This article requires that adequate technical and organizational measures assist in complying with data security and protection policies. Therefore, the entity in charge of processing and storing data must comply with these policies.

Using the :doc:`Security Configuration Assessment (SCA) </getting-started/use-cases/configuration-assessment>` module, Wazuh performs configuration assessments to ensure that endpoints comply with security policies, standards, and hardening guides. Refer to the :doc:`SCA documentation </user-manual/capabilities/sec-config-assessment/index>` section for more details on configuring SCA checks.

Use case: Ensure that the shadow group is empty
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, Wazuh runs SCA checks to find out if the ``shadow`` user group on an Ubuntu 22.04 endpoint is empty. The ``/etc/shadow`` file in Linux systems stores encrypted user passwords. Any user in the ``shadow`` group can read the contents of the ``/etc/shadow`` file. Unauthorized access to this file can lead to system compromise by malicious actors. The SCA check ID is *28690*. When the SCA check runs, if there are no users assigned to the ``shadow`` group, the SCA check passes.

The image below shows the result of the SCA check on the Wazuh dashboard.

.. thumbnail:: /images/compliance/gdpr/SCA-28690-no-alerts.png
    :title: Filtering SCA 28690 check alerts
    :align: center
    :width: 80%

Chapter IV, Article 28, Head 3 (c)
----------------------------------

**Processor, Head 3 (c)**: *“Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: takes all measures required pursuant to Article 32.”*

According to this article, organizational and technical safeguards must be in place to protect data during processing. This is necessary to avoid any unauthorized alterations.

Using the :doc:`File Integrity Monitoring (FIM) </user-manual/capabilities/file-integrity/index>` module, Wazuh ensures that certain established protection measures are met. Wazuh uses the FIM module to help enhance security in the processing of data. It logs information about who modified the data, when the modification occurred, and all related events impacting the data of interest.

Use case: Detect changes to file attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you have to configure the Wazuh agent to detect changes to ``/root/personal_data`` or its attributes, as well as detect who made the changes. The configuration in this use case is specific to an Ubuntu 22.04 endpoint. Then, you need to change the owner of a file to trigger an alert.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Switch to the ``root`` user:

	.. code-block:: console

		$ sudo su

#. Create the directory ``personal_data`` in the ``/root`` directory:

	.. code-block:: console

		# mkdir /root/personal_data

#. Create the file ``subject_data.txt`` in the ``/root/personal_data`` directory  and include some content:

	.. code-block:: console

		# touch /root/personal_data/subject_data.txt
		# echo "User01= user03_ID" >> /root/personal_data/subject_data.txt

#. Install *auditd* to get information about who made changes in a monitored directory using the Linux Auditing System:

	.. code-block:: console

		# apt-get install auditd

#. Add the configuration highlighted to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

	.. code-block:: xml
		:emphasize-lines: 2

		<syscheck>
		  <directories check_all="yes" whodata="yes" >/root/personal_data</directories>
		</syscheck>

#. Restart the Wazuh agent to apply the changes:

	.. code-block:: console

		# systemctl restart wazuh-agent

#. Change the owner of ``subject_data.txt`` from ``root`` to a regular user:

	.. code-block:: console

		# chown <YOUR_REGULAR_USER>:<YOUR_REGULAR_USER> /root/personal_data/subject_data.txt

The FIM module generates the alert below showing the changed attributes.

.. thumbnail:: /images/compliance/gdpr/fim-file-mod-who1.png
   :title: Changed attributes full alert visualization
   :align: center
   :width: 80%

.. thumbnail:: /images/compliance/gdpr/fim-file-mod-who2.png
   :title: Changed attributes alert visualization
   :align: center
   :width: 80%

Chapter IV, Article 30, Head 1 (g)
----------------------------------

**Records of processing activities. Head 1 (g)**: *“Each controller and, where applicable, the controller's representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: where possible, a general description of the technical and organizational security measures referred to in Article 32 (1).”*

This article requires that organizations document, inventory, and audit data processing activities. This helps keep a record of all data processing activities.

Wazuh supports the storage of information about file integrity monitoring and system events. It uses the :doc:`log data collection </user-manual/capabilities/log-data-collection/how-it-works>` capability to store all the events the Wazuh server receives in the archives file ``/var/ossec/logs/archives/archives.log``. Additionally, the ``/var/ossec/logs/archives/alerts.log`` file stores alerts from rules triggered. These logs help in performing various activities, such as data audits and threat hunting.

Use case: Store all logs generated from an endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you have to set storage of all events from monitored endpoints in the Wazuh archives, whether they generate an alert or not.

Wazuh server
~~~~~~~~~~~~

#. Edit the Wazuh server configuration file ``/var/ossec/etc/ossec.conf`` and set the ``<logall>`` option to ``yes``. We have highlighted the ``<logall>`` option in the configuration block below:

	.. code-block:: xml
		:emphasize-lines: 4

		<global>
		  <jsonout_output>yes</jsonout_output>
		  <alerts_log>yes</alerts_log>
		  <logall>yes</logall>
		  <logall_json>no</logall_json>
		  <email_notification>no</email_notification>
		  <smtp_server>smtp.example.wazuh.com</smtp_server>
		  <email_from>wazuh@example.wazuh.com</email_from>
		  <email_to>recipient@example.wazuh.com</email_to>
		  <email_maxperhour>12</email_maxperhour>
		  <email_log_source>alerts.log</email_log_source>
		  <agents_disconnection_time>10m</agents_disconnection_time>
		 <agents_disconnection_alert_time>0</agents_disconnection_alert_time>
		</global>

#. Restart the Wazuh manager to apply the configuration:

	.. code-block:: console

		# systemctl restart wazuh-manager

#. Check the contents of the ``/var/ossec/logs/archives/archives.log`` file on the Wazuh manager, you can see events including those that do not trigger an alert:

	.. code-block:: console

		# tail -f /var/ossec/logs/archives/archives.log

	.. code-block:: none
		:class: output

		2022 Sep 30 09:57:25 wazuh-manager->/var/log/syslog Sep 30 09:57:25 wazuh-manager multipathd[504]: sda: failed to get sgio uid: No data available
		2022 Sep 30 09:57:25 wazuh-manager->/var/log/syslog Sep 30 09:57:25 wazuh-manager multipathd[504]: sda: failed to get sysfs uid: No data available
		2022 Sep 30 09:57:30 (Ubuntu) any->/var/log/auth.log Sep 30 09:57:30 Ubuntu su: pam_unix(su:session): session closed for user root
		2022 Sep 30 09:57:30 (Ubuntu) any->/var/log/auth.log Sep 30 09:57:30 Ubuntu sudo: pam_unix(sudo:session): session closed for user root
		2022 Sep 30 09:57:31 wazuh-manager->/var/log/syslog Sep 30 09:57:30 wazuh-manager multipathd[504]: sda: add missing path
		2022 Sep 30 09:57:31 wazuh-manager->/var/log/syslog Sep 30 09:57:30 wazuh-manager multipathd[504]: sda: failed to get sysfs uid: No data available
		2022 Sep 30 09:57:31 wazuh-manager->/var/log/syslog Sep 30 09:57:30 wazuh-manager multipathd[504]: sda: failed to get udev uid: Invalid argument
		2022 Sep 30 09:57:31 wazuh-manager->/var/log/syslog Sep 30 09:57:30 wazuh-manager multipathd[504]: sda: failed to get sgio uid: No data available
		2022 Sep 30 09:57:31 wazuh-manager->/var/log/syslog Sep 30 09:57:31 wazuh-manager multipathd[504]: sdb: add missing path
		2022 Sep 30 09:57:31 wazuh-manager->/var/log/syslog Sep 30 09:57:31 wazuh-manager multipathd[504]: sdb: failed to get udev uid: Invalid argument

Chapter IV, Article 32,  Head 2
-------------------------------

**Security of processing, Head 2**: *“In assessing the appropriate level of security, account shall be taken in particular of the risks that are presented by processing, in particular from accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to personal data transmitted, stored or otherwise processed.”*

This article requires carrying out risk assessments to find out what risks processing actions pose to personal user data. The Wazuh log data analysis module and default ruleset help meet aspects of this article by monitoring actions taken by data administrators. With this, the data protection officer is able to check who is accessing and processing the data, whether they are authorized to do so, and whether they are who they say they are.

Use case: Invalid SSH login attempts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, there is an example of a Wazuh rule to detect SSH authentication attempts with an invalid user. The Wazuh server receives SSH authentication logs from the monitored endpoint. Then, the log data analysis module subsequently decodes and evaluates these logs against default Wazuh rules to determine if they match the behavior of interest.

-  **Rule 5710 - sshd: Attempt to login using a non-existent user.**

	.. code-block:: xml
		:emphasize-lines: 5

		<rule id="5710" level="5">
		  <if_sid>5700</if_sid>
		  <match>illegal user|invalid user</match>
		  <description>sshd: Attempt to login using a non-existent user</description>
		  <group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gdpr_IV_35.7.d,gdpr_IV_32.2,</group>
		</rule>

When an invalid login attempt triggers rule 5710, you can see the alert below on the Wazuh dashboard.

.. thumbnail:: /images/compliance/gdpr/invalid-ssh-login-attempt1.png
   :title: Invalid SSH login attempt alert visualization
   :align: center
   :width: 80%

.. thumbnail:: /images/compliance/gdpr/invalid-ssh-login-attempt2.png
   :title: Invalid SSH login attempt alert details
   :align: center
   :width: 80%

Chapter IV, Article 33, Head 1
------------------------------

**Notification of a personal data breach to the supervisory authority, Head 1**: *“In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the supervisory authority competent in accordance with Article 55, unless the personal data breach is unlikely to result in a risk to the rights and freedoms of natural persons. Where the notification to the supervisory authority is not made within 72 hours, it shall be accompanied by reasons for the delay.”*

This article requires that organizations report data breaches to the appropriate authorities within a stipulated time frame. Wazuh facilitates this communication by sending email notifications when events trigger a specific alert or a group of alerts related to events about personal data. Refer to the Wazuh :doc:`email alerts </user-manual/manager/manual-email-report/index>` section of the documentation for more information on configuring email notifications.

Use case: Email alert on failed login
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you configure Wazuh to generate an alert and send notifications to the specified email addresses whenever a user login attempt via SSH fails.

#. Edit the email section of the Wazuh manager configuration file ``/var/ossec/etc/ossec.conf`` as follows to implement email notifications:

	.. code-block:: xml
		:emphasize-lines: 3, 4, 5, 6

		<ossec_config>
		  <global>
		    <email_notification>yes</email_notification>
		    <email_to>data_protection_officer@test.example</email_to>
		    <smtp_server>mail.test.example</smtp_server>
		    <email_from>wazuh@test.example</email_from>
		  </global>
		</ossec_config>

#. Restart the Wazuh manager to apply the configuration changes:

	.. code-block:: console

		# systemctl restart wazuh-manager

The changes made enable sending alerts via email to ``data_protection_officer@test.example``.

The sample email sent after an alert is generated looks like the following:

.. code-block:: none

	From: Wazuh <wazuh@test.example>               5:03 PM (2 minutes ago)
	to: me
	-----------------------------
	Wazuh Notification.
	2022 Jun 20 17:03:05

	Received From: Ubuntu->/var/log/secure
	Rule: 5503 fired (level 5) -> "PAM: User login failed."
	Src IP: 192.168.1.37
	Portion of the log(s):

	Jun  20 22:03:04 Ubuntu sshd[67231]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.37
	uid: 0
	euid: 0
	tty: ssh

	 --END OF NOTIFICATION

Chapter IV, Article 35, Head 1
------------------------------

**Data protection impact assessment, Head 1**: *“Where a type of processing in particular using new technologies, and taking into account the nature, scope, context and purposes of the processing, is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall, prior to the processing, carry out an assessment of the impact of the envisaged processing operations on the protection of personal data. A single assessment may address a set of similar processing operations that present similar high risks.”*

This article recommends performing a risk assessment on data processing channels and the impact of the risks identified on data protection. Wazuh can support the risk assessment outcome by categorizing FIM alerts for certain files or directories and increasing the alert levels based on the risk assessment reports.

Use case: Increase the alert level of a file modification event
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you have to set a high alert level for a file modification event if the file is in a specific directory. In the example below, you can find a rule with an alert level 15 for data changes  in the ``/customers/personal_data`` directory. Then, you need to modify files to trigger alerts.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Create the directory ``/customers``:

	.. code-block:: console

		# mkdir /customers

#. Create the directory ``personal_data`` in the ``/customers`` directory:

	.. code-block:: console

		# mkdir /customers/personal_data

#. Add the configuration highlighted to the ``syscheck`` block of the agent configuration file ``/var/ossec/etc/ossec.conf``:

	.. code-block:: xml
		:emphasize-lines: 2

		<syscheck>
		  <directories realtime="yes" check_all="yes" report_changes="yes">/customers/</directories>
		</syscheck>

#. Restart the Wazuh agent to apply the changes:

	.. code-block:: console

		# systemctl restart wazuh-agent

Wazuh server
~~~~~~~~~~~~

#. Add the following rules in the ``/var/ossec/etc/rules/local_rules.xml`` file:

	.. code-block:: xml

		<rule id="100002" level="15">
		    <if_matched_group>syscheck</if_matched_group>
		    <match>/customers/personal_data</match>
		    <description>Changes made to a sensitive file - $(file).</description>
		</rule>

#. Restart the Wazuh manager for the configuration changes to apply:

	.. code-block:: console

		# systemctl restart wazuh-manager

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Create the file ``regular_data.txt`` in the ``/customers`` directory and add some content:

	.. code-block:: console

		# touch /customers/regular_data.txt
		# echo "this is regular data" >> /customers/regular_data.txt 

	You can see a level 7 alert generated in the **File Integrity Monitoring** section of the Wazuh dashboard to show that a file in the monitored directory was modified.

	.. thumbnail:: /images/compliance/gdpr/integrity-monitoring-level-7.png
	   :title: File Integrity Monitoring level 7 alert visualization
	   :align: center
	   :width: 80%

#. Create the file ``sensitive_data.txt`` in the ``/customers/personal_data`` directory and add some content:

	.. code-block:: console

		# touch /customers/personal_data/sensitive_data.txt
		# echo "User01= user03_ID" >> /customers/personal_data/sensitive_data.txt

	You can see a level 15 alert generated to show that a sensitive file in the monitored directory was modified.

	.. thumbnail:: /images/compliance/gdpr/integrity-monitoring-level-15.png
	   :title: File Integrity Monitoring level 15 alert visualization
	   :align: center
	   :width: 80%

Chapter IV, Article 35, Head 7 (d)
----------------------------------

**Data protection impact assessment, Head 7 (d)**: *"The assessment shall contain at least the measures envisaged to address the risks, including safeguards, security measures and mechanisms to ensure the protection of personal data and to demonstrate compliance with this Regulation taking into account the rights and legitimate interests of data subjects and other persons concerned."*

This article recommends that you implement necessary security measures to protect subject data. These security measures include threat detection and response on endpoints that contain personal user data.

Wazuh helps meet this article of the GDPR by providing security measures such as:

-  :doc:`/user-manual/capabilities/malware-detection/index`.
-  :doc:`Integrating with VirusTotal to detect and remove malware </proof-of-concept-guide/detect-remove-malware-virustotal>`.
-  :doc:`Integrating with YARA to detect malware </proof-of-concept-guide/detect-malware-yara-integration>`.
-  `Using constant database (CDB) lists to detect and remove malicious files <https://wazuh.com/blog/detecting-and-responding-to-malicious-files-using-cdb-lists-and-active-response/>`__.
-  :doc:`Active response </getting-started/use-cases/incident-response>`.
-  :doc:`Vulnerability detection </getting-started/use-cases/vulnerability-detection>`.
