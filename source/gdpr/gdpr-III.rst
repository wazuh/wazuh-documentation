.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr_III:

GDPR III 
============

In this chapter we can observe that the necessary requirements for the fulfillment of the regulation are centered in the regulation of the rights of the interested parties related to their personal data. 

Chapter III, Article 14, Head 2 (c)
-----------------------------------

**Article 14**  Information to be provided where personal data have not been obtained from the data subject. **Head 2(c)**. In addition to the information referred to in paragraph 1, the controller shall provide the data subject with the following information necessary to ensure fair and transparent processing in respect of the data subject: the existence of the right to request from the controller access to and rectification or erasure of personal data or restriction of processing concerning the data subject and to object to processing as well as the right to data portability.

Occasionally, an individual may request that the processing of his or her personal data be temporarily restricted. The entity in charge of processing and storing such data must ensure that within the stipulated period of time there is no access to such data.

`Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_  can be used to meet the GDPR requirement found in chapter III Rights of the data subject, article 14, head 2(c).

Temporary access restrictions (Syscheck) is possible with Wazuh, we can review the alerts generated checking that there are no alerts in the period stipulated using Syscheck.

Use cases
^^^^^^^^^

We have the ability to control access to data through Syscheck and can control that there are no accesses to such data using time intervals with the Kibana application.

.. thumbnail:: ../images/gdpr/time_alert.png
    :title: Filtering alerts by Syscheck alert
    :align: center
    :width: 100%

.. thumbnail:: ../images/gdpr/time_no_alert.png
    :title: Filtering alerts by Syscheck no alert
    :align: center
    :width: 100% 


Chapter III, Article 17
-----------------------

**Article 17**  Right to erasure ('right to be forgotten'). 

In some scenarios, an individual may request the permanent deletion of their personal information. In this case, the entity in charge of the processing and storing of the subject's data must delete such information as long as the individual's request for deletion is accepted, normally when the storage of the same is meaningless.

`Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_  can be used again to meet the GDPR requirement found in chapter III Rights of the data subject, article 17.

Permanent data deletion (Syscheck). Wazuh has the ability to monitor deleted files using Syscheck, ensuring that the individual's personal data has been permanently deleted in response to your request. 


Use cases
^^^^^^^^^

Using Syscheck to monitor in real time using ``realtime`` we can see if the data has been deleted, helping the task of this requirement. 

.. code-block:: console

	<syscheck>
		<directories check_all="yes" realtime="yes" report_changes="yes">/root/personal_data</directories>
	</syscheck>

Getting the following alert in case of deleting a file in that directory:

.. code-block:: console

	** Alert 1526485921.128966: - ossec,syscheck,pci_dss_11.5,gpg13_4.11,gdpr_II_5.1.f,
	2018 May 16 17:52:01 (agent01) 192.168.1.50->syscheck
	Rule: 553 (level 7) -> 'File deleted. Unable to retrieve checksum.'
	File '/root/personal_data/subject_data_secret.txt' was deleted. Unable to retrieve checksum.
	File: /root/personal_data/subject_data_secret.txt

.. thumbnail:: ../images/gdpr/deleted.png
    :title: Filtering alerts by Syscheck alert
    :align: center
    :width: 100%
