.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR III (The General Data Protection Regulation of the European Union). 
  
GDPR III, Rights of the data subject <gdpr_III>
===============================================

In this chapter, the GDPR sets out individuals' rights regarding the management of their personal data by third parties.

Chapter III, Article 18, Head 2
-------------------------------

**Information to be provided where personal data have not been obtained from the data subject, Head 2 (c)**: *“Where processing has been restricted under paragraph 1, such personal data shall, with the exception of storage, only be processed with the data subject’s consent or for the establishment, exercise or defence of legal claims or for the protection of the rights of another natural or legal person or for reasons of important public interest of the Union or of a Member State.”*

This article requires that, when an individual requests a temporary restriction on processing his user data, there be no access to that data unless explicit consent has been granted.

Using :doc:`File Integrity Monitoring (FIM) </user-manual/capabilities/file-integrity/index>` and the Wazuh dashboard, you can perform searches to confirm that no user data has been modified or deleted during the specified restriction period.

Use case: Search for FIM events within a certain time frame
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, from the Wazuh dashboard, filter for ``syscheck`` events to confirm that there have been no FIM events involving modification or deletion of restricted data during specific time intervals.

.. thumbnail:: /images/compliance/gdpr/syscheck-no-alerts.png
    :title: Filtering syscheck alerts
    :align: center
    :width: 80%

We can see that an event exists from the previous use case.

Chapter III, Article 17, Head 1
-------------------------------

**Right to erasure (right to be forgotten)**: *“The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay, and the controller shall have the obligation to erase personal data without undue delay.”*

The Wazuh :doc:`File Integrity Monitoring </user-manual/capabilities/file-integrity/index>` module helps meet this GDPR requirement. It monitors specified files and folders containing personal data and generates alerts when modifications or deletions occur. File deletion alerts can confirm that an individual’s personal data has been permanently deleted in response to their request.

Use case: Detect file deletion
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you have to configure the Wazuh agent on an Ubuntu 22.04 endpoint to detect file deletion in the ``/root/personal_data`` directory. Then, you need to delete a file to trigger an alert.

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

#. Add the configuration highlighted to the ``syscheck`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

	.. code-block:: xml
		:emphasize-lines: 2

		<syscheck>
		  <directories check_all="yes" realtime="yes">/root/personal_data</directories>
		</syscheck>

#. Restart the Wazuh agent to apply the changes:

	.. code-block:: console

		# systemctl restart wazuh-agent

#. Delete the file ``subject_data.txt``:

	.. code-block:: console

		# rm /root/personal_data/subject_data.txt

On the Wazuh dashboard, an alert shows that the ``subject_data.txt`` file has been deleted.

.. thumbnail:: /images/compliance/gdpr/fim-file-del.png
    :title: File deletion alert visualization
    :align: center
    :width: 80%
